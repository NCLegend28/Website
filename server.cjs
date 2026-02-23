require('dotenv').config();

const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');
const OpenAI = require('openai');
const systemPrompt = require('./systemPrompt.cjs');

const app = express();

app.use(express.json());

// Trust proxy for cPanel / reverse-proxy deployments
app.set('trust proxy', 1);

// --- Moonshot (Kimi K2) client ---
const client = new OpenAI({
  apiKey: process.env.MOONSHOT_API_KEY,
  baseURL: 'https://api.moonshot.ai/v1',
});

// --- Rate limiter: 20 requests per 15 minutes per IP, /api/chat only ---
const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again in a few minutes.' },
});

// --- POST /api/chat ---
app.post('/api/chat', chatLimiter, async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    // Enforce 20-message sliding window (server-side)
    const trimmed = messages.slice(-20);

    // Prepend system prompt (server-side only — client never sends it)
    const fullMessages = [
      { role: 'system', content: systemPrompt },
      ...trimmed,
    ];

    const completion = await client.chat.completions.create({
      model: 'kimi-k2-0905-preview',
      messages: fullMessages,
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error('Moonshot API error:', err.message);

    if (err.status === 429) {
      return res.status(429).json({ error: 'AI service is busy. Please try again shortly.' });
    }

    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// --- Static files + SPA fallback (AFTER API routes) ---
app.use(express.static(path.join(__dirname, 'dist')));

app.get('{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
