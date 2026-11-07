/**
 * Route table + per-route metadata. Pure module: used by the browser router,
 * by vite.config.js (to emit dist/site-data.json and the sitemap), and by tests.
 */
import { SITE, absoluteUrl } from '../config/site.js'
import { APPS, getApp, appPaths, purchaseState, formatDate } from '../data/apps.js'
import { escapeHtml, blocksToHtml, inlineToHtml } from './inline.js'

export function normalizePath(pathname = '/') {
  let p = pathname.replace(/\/{2,}/g, '/')
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1)
  return p || '/'
}

export function matchRoute(pathname) {
  const path = normalizePath(pathname)
  if (path === '/') return { name: 'home', path }
  if (path === '/apps') return { name: 'apps', path }
  const m = path.match(/^\/apps\/([a-z0-9-]+)(?:\/(privacy|support))?$/)
  const app = m && getApp(m[1])
  if (app) return { name: m[2] ? `app-${m[2]}` : 'app', path, app }
  return { name: 'not-found', path }
}

const HOME_TITLE = `${SITE.ownerName} — Biomedical Engineer & AI/ML Developer`
const HOME_DESCRIPTION =
  `Portfolio and app workshop of ${SITE.ownerName}: AI/ML, biomedical, and fintech projects, apps like PicPlace, and an AI guide to show you around.`

export function routeMeta(route) {
  const { app } = route
  switch (route.name) {
    case 'home':
      return { title: HOME_TITLE, description: HOME_DESCRIPTION }
    case 'apps':
      return {
        title: `Apps by ${SITE.ownerName}`,
        description: `Apps designed and built by ${SITE.ownerName}, starting with ${APPS.map((a) => a.name).join(', ')}. Browse features, privacy, and support.`,
      }
    case 'app':
      return {
        title: `${app.name} — ${app.tagline.replace(/\.$/, '')} | ${app.platform}`,
        description: `${app.benefit} ${purchaseState(app).label}.`,
        image: app.artwork.icon.png[512],
      }
    case 'app-privacy':
      return {
        title: `${app.name} Privacy Policy`,
        description: `How ${app.name} handles your Photos library, data saved on your device, iCloud requests, and deletion. Effective ${formatDate(app.copy.privacy.effectiveDate)}.`,
      }
    case 'app-support':
      return {
        title: `${app.name} Support`,
        description: `Get help with ${app.name}: Photos permissions, iCloud originals, filing into albums, and recovering items from Recently Deleted.`,
      }
    default:
      return { title: `Page not found — ${SITE.ownerName}`, description: 'This page does not exist.', robots: 'noindex' }
  }
}

/** Every public, indexable path. */
export function publicPaths() {
  return ['/', '/apps', ...APPS.flatMap((a) => Object.values(appPaths(a)))]
}

/** Minimal no-JavaScript fallback markup so policy pages read without scripts. */
export function noscriptHtml(route) {
  const { app } = route
  const contact = (email) => `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`
  if (route.name === 'app-privacy') {
    const p = app.copy.privacy
    return [
      `<h1>${escapeHtml(app.name)} Privacy Policy</h1>`,
      `<p>Effective ${escapeHtml(formatDate(p.effectiveDate))}. Publisher: ${escapeHtml(SITE.publisher.name)}. Contact: ${contact(SITE.publisher.email)}</p>`,
      ...p.intro.map((t) => `<p>${inlineToHtml(t)}</p>`),
      ...p.sections.map((s) => `<h2>${escapeHtml(s.heading)}</h2>${blocksToHtml(s.blocks)}`),
    ].join('')
  }
  if (route.name === 'app-support') {
    const s = app.copy.support
    return [
      `<h1>${escapeHtml(app.name)} Support</h1>`,
      `<p>Email ${contact(app.support.email)}. ${inlineToHtml(s.intro)}</p>`,
      ...s.faq.map((f) => `<h2>${escapeHtml(f.q)}</h2>${blocksToHtml(f.a)}`),
    ].join('')
  }
  const meta = routeMeta(route)
  return `<p>${escapeHtml(meta.description)} This site works best with JavaScript enabled.</p>`
}

/** Data the Express server needs at runtime (written to dist/site-data.json at build). */
export function buildRouteTable() {
  const routes = {}
  for (const path of publicPaths()) {
    const route = matchRoute(path)
    const meta = routeMeta(route)
    routes[path] = {
      ...meta,
      canonical: absoluteUrl(path),
      image: meta.image ? absoluteUrl(meta.image) : null,
      noscript: noscriptHtml(route),
    }
  }
  return routes
}
