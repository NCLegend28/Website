# Apps showroom, AI guide and PicPlace: launch handoff

Prepared 2026-11-07, updated 2026-11-08 (iPhone-only launch, support email, price, screenshots, badge, Xcode rename to PicPlace). `DOMAIN` below is `https://aferro.net`. I checked that it is the live host for this repo: it returns `x-powered-by: Express`, this site's page title, and this server's exact `/api/chat` validation error, and `http://` redirects to `https://`. If the site moves, change `SITE.url` in `src/config/site.js`. Canonical URLs, the sitemap and the URLs below all come from that one value.

## App Store Connect: route-to-field mapping

| App Store Connect field | Route | Full URL |
|---|---|---|
| **Marketing URL** | `/apps/picplace` | `DOMAIN/apps/picplace` → https://aferro.net/apps/picplace |
| **Privacy Policy URL** | `/apps/picplace/privacy` | `DOMAIN/apps/picplace/privacy` → https://aferro.net/apps/picplace/privacy |
| **Support URL** | `/apps/picplace/support` | `DOMAIN/apps/picplace/support` → https://aferro.net/apps/picplace/support |

The app links to the Privacy Policy and Support URLs from Home → Quick guide (`PicPlace/QuickGuide.swift`).

**App Privacy label:** the source supports **Data Not Collected**. It has no networking code, no third-party packages, `NSPrivacyTracking = false`, and no collected data types in `PrivacyInfo.xcprivacy`. Keep the label, the manifest and `src/content/apps/picplace.js` consistent if that changes.

## Files to edit

| What | File | Field |
|---|---|---|
| Domain | `src/config/site.js` | `SITE.url` |
| Publisher (name on policy, must match the App Store seller) | `src/config/site.js` | `SITE.publisher.name` |
| Publisher / site contact email | `src/config/site.js` | `SITE.publisher.email`, `SITE.contactEmail` |
| App support email | `src/data/apps.js` | `support.email` (currently `aferro@aferro.net`) |
| Release status | `src/data/apps.js` | `status`: `'coming-soon'` → `'live'` |
| App Store URL | `src/data/apps.js` | `storeUrl` (exact `https://apps.apple.com/…/id<digits>` listing) |
| App Store badge | `public/media/badges/app-store-badge-white.svg` (black variant beside it) | `APP_STORE_BADGE` in `src/data/apps.js` |
| Price (optional) | `src/data/apps.js` | `pricing` (confirmed: $0.99 one-time, US) |
| Screenshots | `public/media/apps/picplace/screens/` + `src/data/apps.js` | `artwork.screenshots: [{ src, alt, width, height }]` |
| Platform | `src/data/apps.js` | `platform`, `requirements` (currently iPhone, iOS 26 or later) |
| Policy effective date | `src/content/apps/picplace.js` | `privacy.effectiveDate` |
| Product, policy and support copy | `src/content/apps/picplace.js` | `privacy`, `support`, `details` |
| Avatar 3D model | `public/guide/<file>.glb` + `src/config/guide.js` | `modelUrl` (or build with `VITE_GUIDE_MODEL_URL=/guide/<file>.glb`) |
| Avatar illustration colors | `src/config/guide.js` | `appearance` |
| AI chat provider name shown in disclosures | `src/config/site.js` | `chatProvider` |

`npm run build` validates the catalog. It fails if an entry is malformed, if `storeUrl` isn't a real App Store listing URL, if an app is `live` without a `storeUrl` or without the badge file, or if a referenced image is missing.

## Going live on the App Store

1. Apple's badge is in place (`public/media/badges/app-store-badge-white.svg`). Verified rendering on the product page in the live state.
2. In `src/data/apps.js`, set `storeUrl` to the listing URL from App Store Connect and set `status: 'live'`.
3. The price is already confirmed: the page shows "$0.99 one-time purchase (US). Apple shows the price for your region." Set `pricing.confirmed: false` to hide it everywhere, including AI chat answers.
4. Run `npm run build && npm test` and deploy.

## Screenshots

**Launch is iPhone-only**, so App Store Connect needs only the iPhone 6.9" set; no iPad set is required. The Xcode project is set to iPhone only. Going iPhone-only can be undone later: adding iPad in a future update is allowed, but once an app has shipped with iPad support, an update can't drop it.

| Where | What |
|---|---|
| `PhotoCleanup/AppStoreAssets/screenshots/iphone-6.3/` | Seven unedited originals, 1206 × 2622. Keep them as masters. |
| `PhotoCleanup/AppStoreAssets/screenshots/iphone-6.9/` | All seven at 1320 × 2868 (scaled about 9%, 1 px trimmed top and bottom), RGB PNG, with personal thumbnails blurred in Organize, Old Screenshots and Large Videos. Upload these to the iPhone 6.9" slot. |
| `Website/public/media/apps/picplace/screens/` | Web copies (600 × 1304 WebP) of all seven, same blurring, shown on the product page in app order. |

**Blurring.** The originals of Organize, Old Screenshots and Large Videos show personal content (a time-off email, an application essay, photos and faces). In the 6.9" and web copies, each photo and document thumbnail is pixelated and blurred inside its rounded corners, and the selection rings and expand buttons are restored on top, so the app interface stays sharp. The originals in `iphone-6.3/` are untouched; don't upload those.

## Launch inputs still needed

- [ ] **Publisher legal name.** The policy says "Tali Mosley". If you enrolled in the Apple Developer Program as an organization (e.g. BliqByte), change `SITE.publisher.name` to match the seller name.
- [x] **Support email.** `aferro@aferro.net`. The privacy policy contact line still shows `mosley.tali@gmail.com` from `SITE.publisher.email`; change it there if you want them to match.
- [ ] **Postal address / phone.** Not on the site. Only needed if you declare yourself a trader in App Store Connect for the EU (DSA). Apple shows those details on the listing, not your site.
- [ ] **Effective date.** Set to 2026-11-07. Update it if you change the policy before publishing.
- [x] **Price.** Confirmed: $0.99 one-time (US).
- [x] **Badge.** White badge in place.
- [ ] **App Store URL.** After approval, see "Going live".
- [x] **Screenshots.** Seven upload-ready iPhone 6.9" screenshots, three with blurred thumbnails; all seven on the site.
- [x] **Xcode: iPhone only.** Done (`TARGETED_DEVICE_FAMILY = 1`).
- [x] **Xcode rename.** Project, targets, folders and Swift types renamed PhotoCleanup → PicPlace; bundle ID `apollo.PicPlace` (tests `apollo.PicPlaceTests`, `apollo.PicPlaceUITests`). Pre-rename backup: `PhotoCleanup/.backup-before-picplace-rename.tgz`.
- [ ] **App ID.** Register `apollo.PicPlace` (Xcode automatic signing, or developer.apple.com → Identifiers) so it appears in App Store Connect's Bundle ID list.
- [ ] **Website logs.** The policy says the host *may* keep standard request logs. Confirm what your cPanel host retains if you want to be more specific.

## How the policy claims were verified

Checked against `/Volumes/P7/projects/PhotoCleanup` (Xcode project now `PicPlace.xcodeproj`):

- **No network or SDKs:** no `URLSession` or HTTP calls in any Swift file, and no Swift packages in `project.pbxproj`.
- **Photos access:** `PHPhotoLibrary.requestAuthorization(for: .readWrite)`. Limited access is handled (`ContentView.swift`). Album features need `.authorized` (`AlbumLibrary.swift`).
- **Local storage:** UserDefaults keys `photoReviewDecisions`, `pinnedPhotoAlbums`, `screenshotAgeInDays`, `includeFavoriteScreenshots`, `hasCompletedTour`, `videoMeasurementBatchSize`, `storageReviewBatchSize` (updated 2026-11-08: swipe review is always on and the welcome tour replaced the first-run guide). The manifest declares UserDefaults reason `CA92.1`.
- **iCloud:** storage checks use `isNetworkAccessAllowed = false`. Downloads happen only through "Download to check size", "Load from iCloud", and previews/playback in Old Screenshots, Large Videos and cloud items.
- **Album changes:** creates albums and adds assets only. There is no `removeAssets` call.
- **Deletion:** `PHAssetChangeRequest.deleteAssets` after the in-app review. Recently Deleted wording matches the app's own text.
- **Requirements:** iOS 26.0 deployment target, display name PicPlace, bundle `apollo.PicPlace`, iPhone only (`TARGETED_DEVICE_FAMILY = 1`). The site says "iPhone" and "Requires iOS 26 or later."

## cPanel deployment (your step)

The real path is the one in `docs/cicd-setup.md`: GitHub → cPanel Git Version Control → `.cpanel.yml` (`npm ci` + `npm run build`) → Passenger runs `server.cjs`. `DEPLOYMENT.md`'s Vercel/Netlify notes don't apply.

1. Commit and push. The repo has an invalid pack index from a `._pack-*.idx` sidecar, so repair it first. I left Git untouched.
2. Make sure cPanel's Node.js app uses **Node 20.19 or newer** (Vite 7 needs it) and `MOONSHOT_API_KEY` is set. `VITE_API_URL` can stay empty because the API is same-origin.
3. After the pull and build, **restart the Node.js app once** (cPanel → Node.js Apps → Restart, or `touch tmp/restart.txt` in the app root), because `server.cjs` changed. Later frontend-only deploys are picked up without a restart: the server re-reads `dist/index.html` and `dist/site-data.json` when they change.
4. Without `MOONSHOT_API_KEY`, every page still serves and `/api/chat` returns 503. The guide's quick topics keep working.

### Post-deploy checks

```bash
D=https://aferro.net
for p in / /apps /apps/picplace /apps/picplace/privacy /apps/picplace/support; do
  curl -s -o /tmp/p -w "%{http_code} $p  " "$D$p"; grep -o '<title>[^<]*' /tmp/p
done                                   # expect 200 + a distinct title on each
curl -sI "$D/apps/picplace/" | head -1  # expect 301 → /apps/picplace
curl -s -o /dev/null -w "%{http_code}\n" "$D/apps/nope"   # expect 404
curl -s "$D/sitemap.xml" | grep picplace                 # expect 3 URLs
curl -s "$D/api/chat" -X POST -H 'Content-Type: application/json' \
  -d '{"messages":[{"role":"user","content":"What does PicPlace do?"}]}'   # expect {"reply":…}
```

Then in a browser: open the privacy URL in a private window and refresh; check the mobile menu; click "What does PicPlace do?" and ask one free-text question.

## What was verified (2026-11-07)

- **In this repo, on the Mac's linked shell:** `npm ci` passed. `vite build` passed: the default config loader hit a file-visibility lag on the P7 drive mount, the same failure your original config hits there, so the build ran with `--configLoader native` on the same `vite.config.js`. `npm test` passed 17/17. That includes starting `server.cjs` against `dist/` without `MOONSHOT_API_KEY` and checking direct navigation, distinct titles and descriptions, canonical URLs, the noscript policy text, 301/404 handling, assets and sitemap, and a clean 503 from chat.
- **In headless Chrome against the production server** (69/69 checks): direct load and refresh of all five routes; guide absent on app pages; Privacy Policy and Support buttons directly under the main info; client-side navigation, back button, title/description updates, focus moved to the page heading; offline topics with no network requests; disclosure shown before submit; chat failure notice with topics still working afterward; chat success via the same `/api/chat` payload (user/assistant only); no transcript in browser storage; mobile menu (open, Escape returns focus, closes on navigation, no horizontal overflow on any route at 390 px); keyboard tab order and skip link; reading order on the privacy page; reduced motion (no guide or circuit animation, state still shown statically); Listen/Stop narration with a local voice and Listen hidden without one; guide with a test `.glb` (renders in the reserved square, receives state, works with reduced motion), with the model 404ing (falls back), and with WebGL disabled (falls back, three.js never fetched); three.js not loaded when no model is configured; coming-soon state (no badge, no price); live state on a scratch copy (badge links to the listing in a new tab, confirmed price with the local-price note). The live build also refused to compile without the badge file.
- **Not verified:** a real Moonshot reply (no key here) and deployment to cPanel. Apple's real badge was verified later (2026-11-08).

## Adding another app

1. Add artwork under `public/media/apps/<slug>/` (icon 128/256/512 PNG, WebP optional). Use `/media/`, never `/apps/`, which is a routed path.
2. Add copy in `src/content/apps/<slug>.js` (same shape as `picplace.js`).
3. Import it and add an entry in `src/data/apps.js`.

The showroom, routes, titles, sitemap, guide topics and AI facts update on their own.

## What changed

| File | Before | After |
|---|---|---|
| `src/App.jsx` | Single page of sections, chat section at the bottom | Shell with a small history router: `/`, `/apps`, `/apps/:slug`, `…/privacy`, `…/support`, 404. Per-route title/description, focus and scroll handling. Circuit background on home only |
| `src/components/Hero.jsx` | Centered intro, "View My Work" / "Chat With Me" | Split layout: intro on the left with **Explore my apps** / **Ask the AI guide**, guide on the right |
| `src/components/ChatBot.jsx` | Chat section with a dashed "Future Avatar Space" placeholder | Same UI and `/api/chat` call, now a reusable `useChat` + transcript/input used inside the guide. Pre-submit disclosure, labeled input, failure notice that points to the offline topics |
| `src/components/Navbar.jsx` | Scroll-only buttons, links hidden on mobile | Real links. **Apps** is top-level. Mobile menu with `aria-expanded`, Escape and focus return |
| `src/components/Footer.jsx` | `#hash` links | Same links via the router, plus Apps and AI guide. Same contact links |
| `server.cjs` | Crashed at startup without `MOONSHOT_API_KEY`; SPA fallback for every path | Lazy provider client (503 without a key); only user/assistant messages accepted; per-route meta and noscript policy text; 301 for trailing slashes; real 404s; app facts added to the prompt |
| `systemPrompt.cjs` | Spoke as Tali in first person | Identifies as an AI guide based on Tali's public portfolio. Same facts. App facts only from the catalog |
| `vite.config.js` | React plugin only | Adds `siteData` plugin: catalog asset checks, `dist/site-data.json`, `sitemap.xml`, `robots.txt`, `._*` sidecar cleanup |
| `index.html` | Generic title, missing `/vite.svg` icon | Route-meta placeholders, `favicon.svg`, noscript slot |
| `src/index.css` | Always-on animations | Reduced-motion handling, guide state styles, reading styles for policy pages, `._*` excluded from Tailwind scanning |
| `package.json` | No tests | `three` (lazy-loaded only when a model is configured), `npm test`, `engines.node >= 20.19` |

New: `src/config/{site,guide}.js`, `src/data/apps.js`, `src/content/apps/picplace.js`, `src/lib/{routes,router,inline,guideKnowledge,hooks}.js(x)`, `src/components/guide/*`, `src/components/apps/AppParts.jsx`, `src/pages/*`, `public/media/apps/picplace/*` (icon copied from PicPlace and resized), `public/favicon.svg`, `tests/*`.

Unchanged: About, Projects, Experience, Philosophy content and `src/data/projects.js`.
