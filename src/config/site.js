/**
 * Site-wide settings. Owner-editable.
 *
 * Imported by the browser bundle AND by the build (vite.config.js) to generate
 * per-route titles, canonical URLs, the sitemap, and the AI guide's verified facts.
 * Keep this file free of browser-only APIs and image imports.
 */

export const SITE = {
  // Production origin, no trailing slash. Verified 2026-11-07: aferro.net serves
  // this Express app (x-powered-by: Express, same /api/chat validation error).
  // Change this if the site moves; canonical URLs and the handoff URLs derive from it.
  url: 'https://aferro.net',

  ownerName: 'Tali Mosley',
  brandMark: 'TALI',
  role: 'Biomedical Engineer → AI/ML Developer',

  // Publisher shown on app policies and support pages. Must match the seller name
  // on your App Store listing (individual name, or your company if you enroll as one).
  publisher: {
    name: 'Tali Mosley',
    email: 'mosley.tali@gmail.com',
  },

  // Same links as the original footer.
  contactEmail: 'mosley.tali@gmail.com',
  social: {
    github: 'https://github.com/NCLegend28',
    linkedin: 'https://www.linkedin.com/in/tali-mosley',
  },

  // The external provider used by the optional free-text chat (server.cjs).
  chatProvider: 'Moonshot AI',
}

export const absoluteUrl = (path = '/') => `${SITE.url}${path === '/' ? '/' : path}`
