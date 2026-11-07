require('dotenv').config();

const express = require('express');
const fs = require('fs');
const path = require('path');
const rateLimit = require('express-rate-limit');
const OpenAI = require('openai');
const systemPrompt = require('./systemPrompt.cjs');

const DIST = path.resolve(__dirname, process.env.DIST_DIR || 'dist');

const app = express();

app.disable('x-powered-by');
app.use(express.json({ limit: '64kb' }));

// Trust proxy for cPanel / reverse-proxy deployments
app.set('trust proxy', 1);

app.use((req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// --- Build output written by `npm run build` (see vite.config.js siteData plugin) ---
// Re-read when the file changes on disk, so a cPanel rebuild is picked up even if
// Passenger does not restart the app (the original server read index.html per request).
function fileCache(file, parse, fallback) {
  let mtime = -1;
  let value = fallback;
  return () => {
    try {
      const m = fs.statSync(file).mtimeMs;
      if (m !== mtime) {
        value = parse(fs.readFileSync(file, 'utf8'));
        mtime = m;
      }
    } catch {
      if (mtime !== -2) console.warn(`${path.basename(file)} not found in ${DIST}; run \`npm run build\`.`);
      mtime = -2;
      value = fallback;
    }
    return value;
  };
}
const siteData = fileCache(path.join(DIST, 'site-data.json'), JSON.parse, { routes: {}, aiFacts: '' });
const template = fileCache(path.join(DIST, 'index.html'), (t) => t, null);

// --- Moonshot (Kimi K2) client ---
// Created lazily so the site (including app privacy/support pages) still serves
// when MOONSHOT_API_KEY is missing. The key never leaves the server.
let client = null;
function getClient() {
  if (!process.env.MOONSHOT_API_KEY) return null;
  if (!client) {
    client = new OpenAI({
      apiKey: process.env.MOONSHOT_API_KEY,
      baseURL: 'https://api.moonshot.ai/v1',
      timeout: 30_000,
      maxRetries: 1,
    });
  }
  return client;
}

// Persona + verified app facts generated from the site's app catalog.
const fullSystemPrompt = () => {
  const facts = siteData().aiFacts;
  return facts ? `${systemPrompt}\n\n${facts}` : systemPrompt;
};

// --- Rate limiter: 20 requests per 15 minutes per IP, /api/chat only ---
const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again in a few minutes.' },
});

const MAX_MESSAGE_CHARS = 2000;

// --- POST /api/chat ---
// Transcripts are not stored: messages are forwarded to the provider and discarded.
app.post('/api/chat', chatLimiter, async (req, res) => {
  try {
    const { messages } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    // Only user/assistant turns with text; the client can never inject a system prompt.
    // Enforce 20-message sliding window (server-side)
    const trimmed = messages
      .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
      .slice(-20)
      .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_CHARS) }));

    if (trimmed.length === 0 || trimmed[trimmed.length - 1].role !== 'user') {
      return res.status(400).json({ error: 'a user message is required' });
    }

    const ai = getClient();
    if (!ai) {
      return res.status(503).json({ error: 'Chat is unavailable right now.' });
    }

    // Prepend system prompt (server-side only — client never sends it)
    const fullMessages = [
      { role: 'system', content: fullSystemPrompt() },
      ...trimmed,
    ];

    const completion = await ai.chat.completions.create({
      model: 'kimi-k2-0905-preview',
      messages: fullMessages,
    });

    const reply = completion.choices?.[0]?.message?.content;
    if (typeof reply !== 'string' || !reply.trim()) throw new Error('Empty completion');
    res.json({ reply });
  } catch (err) {
    console.error('Moonshot API error:', err.message);

    if (err.status === 429) {
      return res.status(429).json({ error: 'AI service is busy. Please try again shortly.' });
    }

    res.status(502).json({ error: 'Something went wrong. Please try again.' });
  }
});

app.all('/api/{*path}', (req, res) => res.status(404).json({ error: 'Not found' }));

// --- Static files (AFTER API routes) ---
// Hashed bundles are immutable; everything else revalidates.
app.use('/assets', express.static(path.join(DIST, 'assets'), { immutable: true, maxAge: '1y', index: false }));
app.use(express.static(DIST, { index: false, redirect: false, maxAge: '1h' }));

// --- HTML routes: inject per-route <title>, description, canonical, noscript fallback ---
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

function renderPage(meta, noscript) {
  const head = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    meta.canonical && `<link rel="canonical" href="${esc(meta.canonical)}" />`,
    meta.robots && `<meta name="robots" content="${esc(meta.robots)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    meta.canonical && `<meta property="og:url" content="${esc(meta.canonical)}" />`,
    meta.image && `<meta property="og:image" content="${esc(meta.image)}" />`,
    `<meta name="twitter:card" content="summary" />`,
  ].filter(Boolean).join('\n    ');
  const html = template();
  if (!html) return null;
  return html
    .replace(/<!--route-meta:start-->[\s\S]*?<!--route-meta:end-->/, head)
    .replace('<!--route-noscript-->', noscript || '');
}

const NOT_FOUND_META = { title: 'Page not found', description: 'This page does not exist.', robots: 'noindex' };

app.get('{*path}', (req, res, next) => {
  // Paths that look like files and weren't served above are real 404s, not the SPA.
  if (path.extname(req.path)) return res.status(404).type('text/plain').send('Not found');

  let pathname = req.path.replace(/\/{2,}/g, '/');
  if (pathname.length > 1 && pathname.endsWith('/')) {
    const query = req.originalUrl.slice(req.path.length);
    return res.redirect(301, pathname.slice(0, -1) + query);
  }

  try {
    const route = siteData().routes[pathname];
    const html = route ? renderPage(route, route.noscript) : renderPage(NOT_FOUND_META, '');
    if (!html) return res.status(503).type('text/plain').send('Site is building. Try again shortly.');
    res.set('Cache-Control', 'no-cache');
    return res.status(route ? 200 : 404).type('html').send(html);
  } catch (err) {
    return next(err);
  }
});

// Always listen: cPanel's Passenger loads this file through its own loader,
// so a require.main check would stop the production server from starting.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}${getClient() ? '' : ' (chat disabled: MOONSHOT_API_KEY not set)'}`);
});
