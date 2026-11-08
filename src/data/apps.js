/**
 * App catalog — the single source for the /apps showroom, each product page,
 * policy/support pages, page titles, the sitemap, and the AI guide's verified facts.
 *
 * Add an app: append an entry below, add its artwork under public/media/apps/<slug>/,
 * and its copy under src/content/apps/<slug>.js. Navigation and templates pick it up.
 * The catalog is validated on import; `npm run build` fails on an invalid entry.
 *
 * Paths for artwork are site-absolute under /media/ (never under /apps/, which is routed).
 */
import { SITE } from '../config/site.js'
import * as picplaceCopy from '../content/apps/picplace.js'

// Apple's official "Download on the App Store" badge, downloaded from
// https://developer.apple.com/app-store/marketing/guidelines/ (App Store Marketing Tools)
// and saved at public/media/badges/app-store-badge.svg. Required before any app goes live;
// the build fails if a live app exists and this file is missing.
export const APP_STORE_BADGE = '/media/badges/app-store-badge-white.svg'

export const APP_STATUSES = {
  'coming-soon': 'Coming to the App Store',
  live: 'Available on the App Store',
}

const RAW_APPS = [
  {
    slug: 'picplace',
    name: 'PicPlace',
    tagline: 'Give every photo a place.',
    // One-line benefit for showroom cards and link previews.
    benefit: 'Review, file, and tidy your photo library, with every deletion staged for your review.',
    description:
      'PicPlace helps you review the photos and videos in your library, file them into albums, pin the albums you use most, find old screenshots, and review large videos. It shows which originals are on your device and which need iCloud, when Photos can tell. Deletions wait in a queue until you confirm them.',
    platform: 'iPhone',
    requirements: 'Requires iOS 26 or later.',
    category: 'Photo & Video',

    // 'coming-soon' | 'live'. Set to 'live' only together with a verified storeUrl.
    status: 'coming-soon',
    // Paste the exact App Store listing URL from App Store Connect, e.g.
    // https://apps.apple.com/us/app/picplace/id1234567890 — leave null until it exists.
    storeUrl: null,

    // Optional. Shown only when confirmed: true. Apple shows the real local price.
    pricing: { model: 'one-time', amount: 0.99, currency: 'USD', region: 'US', confirmed: true },

    artwork: {
      icon: {
        png: { 128: '/media/apps/picplace/icon-128.png', 256: '/media/apps/picplace/icon-256.png', 512: '/media/apps/picplace/icon-512.png' },
        webp: { 128: '/media/apps/picplace/icon-128.webp', 256: '/media/apps/picplace/icon-256.webp', 512: '/media/apps/picplace/icon-512.webp' },
      },
      // Real captures only. Add { src, alt, width, height } entries after capturing
      // with sample media; the gallery stays hidden while this is empty.
      screenshots: [
        { src: '/media/apps/picplace/screens/home.webp', width: 600, height: 1304,
          alt: 'PicPlace home screen with Old Screenshots and Large Videos shortcuts, and Photos, Screenshots, and Videos left to review' },
        { src: '/media/apps/picplace/screens/photo_review.webp', width: 600, height: 1304,
          alt: 'Reviewing a photo with Keep, Skip, Mark for deletion, Add to album, and three pinned albums' },
        { src: '/media/apps/picplace/screens/organize.webp', width: 600, height: 1304,
          alt: 'Organize screen for selecting a batch of photos and videos to file into an album (thumbnails blurred for privacy)' },
        { src: '/media/apps/picplace/screens/old_screenshots.webp', width: 600, height: 1304,
          alt: 'Old Screenshots filtered to older than 90 days, with favorites excluded (thumbnails blurred for privacy)' },
        { src: '/media/apps/picplace/screens/large_videos.webp', width: 600, height: 1304,
          alt: 'Large Videos listing the longest videos with their local file sizes and lengths (thumbnails blurred for privacy)' },
        { src: '/media/apps/picplace/screens/review_storage.webp', width: 600, height: 1304,
          alt: 'Review by storage, grouping items on this device, in iCloud, and with storage unknown' },
        { src: '/media/apps/picplace/screens/final_review.webp', width: 600, height: 1304,
          alt: 'Final review of eight items marked for deletion, with an estimate of known local media size' },
      ],
      accent: '#6a3fc1',
    },

    features: [
      { title: 'Review at your pace', detail: 'Go through Photos, Screenshots, or Videos one item at a time. Swipe right to keep or left to mark for deletion, or use the buttons. Your progress is saved.' },
      { title: 'File into albums', detail: 'Add items to an existing or new Photos album, or pin up to three albums for one-tap filing. Needs Full Photos access.' },
      { title: 'Find old screenshots', detail: 'Show screenshots older than 30, 90, 180, or 365 days. Favorites stay out unless you include them.' },
      { title: 'Review large videos', detail: 'Starts with your longest videos and checks local file sizes in batches, without downloading iCloud originals.' },
      { title: 'See what’s on this device', detail: 'Review by storage groups items as On this device, In iCloud, or Storage unknown when Photos can tell, with no downloads.' },
      { title: 'Deletions you confirm', detail: 'Marked items wait in a cleanup queue. Confirm in Photos and they move to Recently Deleted, where you can recover them.' },
    ],

    support: { email: 'aferro@aferro.net' },
    copy: picplaceCopy,
  },
]

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Real App Store listing URLs only (no placeholders): https://apps.apple.com/[cc/]app/<name>/id<digits>
const STORE_URL = /^https:\/\/apps\.apple\.com\/(?:[a-z]{2}\/)?app\/[^/?#\s]+\/id\d{6,}(?:[?#].*)?$/
const MEDIA_PATH = /^\/media\/[A-Za-z0-9._/-]+\.(?:png|webp|jpe?g|avif)$/
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

export class CatalogError extends Error {}

export function validateApp(app) {
  const where = `app "${app?.slug ?? app?.name ?? '?'}"`
  const fail = (msg) => { throw new CatalogError(`${where}: ${msg}`) }
  const need = (key) => {
    if (typeof app[key] !== 'string' || !app[key].trim()) fail(`"${key}" must be a non-empty string`)
  }

  if (!app || typeof app !== 'object') throw new CatalogError('catalog entry must be an object')
  ;['slug', 'name', 'tagline', 'benefit', 'description', 'platform', 'status'].forEach(need)
  if (!SLUG.test(app.slug)) fail('slug must be lowercase letters, digits and hyphens')
  if (!(app.status in APP_STATUSES)) fail(`status must be one of ${Object.keys(APP_STATUSES).join(', ')}`)

  if (app.storeUrl != null && !STORE_URL.test(app.storeUrl)) {
    fail('storeUrl must be a real App Store listing (https://apps.apple.com/…/id<digits>) or null')
  }
  if (app.status === 'live' && !app.storeUrl) fail('status "live" requires storeUrl')

  if (app.pricing != null) {
    const p = app.pricing
    if (typeof p.amount !== 'number' || !(p.amount >= 0)) fail('pricing.amount must be a number')
    if (!/^[A-Z]{3}$/.test(p.currency ?? '')) fail('pricing.currency must be an ISO code like USD')
    if (typeof p.confirmed !== 'boolean') fail('pricing.confirmed must be true or false')
  }

  const icon = app.artwork?.icon
  if (!icon?.png?.[256] || !icon?.png?.[512]) fail('artwork.icon.png needs 256 and 512 sizes')
  for (const set of [icon.png, icon.webp ?? {}]) {
    for (const src of Object.values(set)) if (!MEDIA_PATH.test(src)) fail(`artwork path "${src}" must live under /media/`)
  }
  if (!Array.isArray(app.artwork.screenshots)) fail('artwork.screenshots must be an array (may be empty)')
  for (const shot of app.artwork.screenshots) {
    if (!MEDIA_PATH.test(shot?.src ?? '')) fail('each screenshot needs a src under /media/')
    if (!shot.alt?.trim()) fail(`screenshot ${shot.src} needs alt text`)
    if (!(shot.width > 0 && shot.height > 0)) fail(`screenshot ${shot.src} needs width and height`)
  }

  if (!Array.isArray(app.features) || app.features.length === 0) fail('features must be a non-empty array')
  for (const f of app.features) if (!f?.title?.trim() || !f?.detail?.trim()) fail('each feature needs title and detail')

  if (!EMAIL.test(app.support?.email ?? '')) fail('support.email must be an email address')

  const privacy = app.copy?.privacy
  if (!privacy || !ISO_DATE.test(privacy.effectiveDate ?? '')) fail('copy.privacy.effectiveDate must be YYYY-MM-DD')
  if (!Array.isArray(privacy.sections) || privacy.sections.length === 0) fail('copy.privacy.sections is required')
  if (!Array.isArray(app.copy?.support?.faq) || app.copy.support.faq.length === 0) fail('copy.support.faq is required')

  return app
}

export function validateCatalog(apps) {
  if (!Array.isArray(apps) || apps.length === 0) throw new CatalogError('catalog must list at least one app')
  const seen = new Set()
  for (const app of apps) {
    validateApp(app)
    if (seen.has(app.slug)) throw new CatalogError(`duplicate slug "${app.slug}"`)
    seen.add(app.slug)
  }
  return Object.freeze(apps.map((a) => Object.freeze(a)))
}

export const APPS = validateCatalog(RAW_APPS)

export const getApp = (slug) => APPS.find((a) => a.slug === slug) ?? null

export const appPaths = (app) => ({
  page: `/apps/${app.slug}`,
  privacy: `/apps/${app.slug}/privacy`,
  support: `/apps/${app.slug}/support`,
})

/** What the purchase area shows. Badge only for live apps with a verified store URL. */
export function purchaseState(app) {
  const live = app.status === 'live' && Boolean(app.storeUrl)
  return {
    kind: live ? 'live' : 'coming-soon',
    label: APP_STATUSES[live ? 'live' : 'coming-soon'],
    storeUrl: live ? app.storeUrl : null,
    price: confirmedPrice(app),
  }
}

/** A display price only when the owner has confirmed it; otherwise null. */
export function confirmedPrice(app) {
  const p = app.pricing
  if (!p || p.confirmed !== true) return null
  const amount = p.amount === 0 ? 'Free' : new Intl.NumberFormat('en-US', { style: 'currency', currency: p.currency }).format(p.amount)
  const model = p.amount === 0 ? '' : p.model === 'one-time' ? ' one-time purchase' : ''
  return { text: `${amount}${model}`, region: p.region ?? null }
}

export const formatDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
