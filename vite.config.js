import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync, readdirSync, statSync, unlinkSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { SITE } from './src/config/site.js'
import { APPS, APP_STORE_BADGE } from './src/data/apps.js'
import { buildRouteTable, publicPaths } from './src/lib/routes.js'
import { buildAiFacts } from './src/lib/guideKnowledge.js'

/**
 * siteData(): validates catalog assets and emits files the Express server reads:
 *   dist/site-data.json  per-route titles/descriptions/canonicals + guide app facts
 *   dist/sitemap.xml, dist/robots.txt
 * Also strips macOS "._*" AppleDouble sidecars that the external drive creates.
 */
function siteData() {
  let outDir = 'dist'
  let publicDir = 'public'
  return {
    name: 'site-data',
    configResolved(config) {
      outDir = config.build.outDir
      publicDir = config.publicDir
    },
    buildStart() {
      // Importing src/data/apps.js already validated the catalog shape.
      const missing = []
      for (const app of APPS) {
        const files = [
          ...Object.values(app.artwork.icon.png),
          ...Object.values(app.artwork.icon.webp ?? {}),
          ...app.artwork.screenshots.map((s) => s.src),
        ]
        if (app.status === 'live') files.push(APP_STORE_BADGE)
        for (const f of files) if (!existsSync(join(publicDir, f))) missing.push(`${app.slug}: public${f}`)
      }
      if (missing.length) this.error(`App catalog references missing files:\n  ${missing.join('\n  ')}`)
    },
    generateBundle() {
      const data = {
        siteUrl: SITE.url,
        routes: buildRouteTable(),
        aiFacts: buildAiFacts(),
      }
      this.emitFile({ type: 'asset', fileName: 'site-data.json', source: JSON.stringify(data, null, 2) })
      const urls = publicPaths().map((p) => `  <url><loc>${SITE.url}${p === '/' ? '/' : p}</loc></url>`).join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\nSitemap: ${SITE.url}/sitemap.xml\n` })
    },
    closeBundle() {
      const sweep = (dir) => {
        if (!existsSync(dir)) return
        for (const name of readdirSync(dir)) {
          const p = join(dir, name)
          if (name.startsWith('._') || name === '.DS_Store') { try { unlinkSync(p) } catch { /* ignore */ } continue }
          if (statSync(p).isDirectory()) sweep(p)
        }
      }
      sweep(resolve(outDir))
    },
  }
}

export default defineConfig({
  plugins: [react(), siteData()],
  build: {
    // Lets tests build variants (e.g. with a guide model) without touching dist/.
    outDir: process.env.SITE_OUT_DIR || 'dist',
    // three.js (only for an optional 3D guide model) is a lazy ~160 kB gzip chunk.
    chunkSizeWarningLimit: 700,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})
