import { test } from 'node:test'
import assert from 'node:assert/strict'
import { APPS, getApp, validateApp, validateCatalog, purchaseState, confirmedPrice, CatalogError } from '../src/data/apps.js'

const picplace = () => ({ ...structuredClone({ ...getApp('picplace'), copy: null }), copy: getApp('picplace').copy })

test('catalog loads and PicPlace is present with the required fields', () => {
  const app = getApp('picplace')
  assert.ok(app)
  assert.equal(app.name, 'PicPlace')
  assert.equal(app.tagline, 'Give every photo a place.')
  for (const key of ['slug', 'name', 'description', 'platform', 'status', 'artwork', 'features', 'support']) {
    assert.ok(app[key], `missing ${key}`)
  }
  assert.ok(APPS.length >= 1)
})

test('PicPlace defaults to coming soon with no store link and no unconfirmed price', () => {
  const s = purchaseState(getApp('picplace'))
  assert.equal(s.kind, 'coming-soon')
  assert.equal(s.label, 'Coming to the App Store')
  assert.equal(s.storeUrl, null)
  assert.equal(s.price, null, 'unconfirmed price must not be displayed')
})

test('live state requires a real App Store URL and then exposes it', () => {
  const app = picplace()
  app.status = 'live'
  assert.throws(() => validateApp(app), CatalogError, 'live without storeUrl is rejected')

  for (const bad of ['https://example.com/app', 'https://apps.apple.com/app/picplace/idXXXX', 'TODO', 'http://apps.apple.com/us/app/picplace/id1234567890']) {
    app.storeUrl = bad
    assert.throws(() => validateApp(app), CatalogError, `rejects ${bad}`)
  }

  app.storeUrl = 'https://apps.apple.com/us/app/picplace/id1234567890'
  validateApp(app)
  const s = purchaseState(app)
  assert.equal(s.kind, 'live')
  assert.equal(s.storeUrl, app.storeUrl)
})

test('a store URL on a coming-soon app does not show a badge', () => {
  const app = picplace()
  app.storeUrl = 'https://apps.apple.com/us/app/picplace/id1234567890'
  assert.equal(purchaseState(app).kind, 'coming-soon')
})

test('price shows only when confirmed', () => {
  const app = picplace()
  assert.equal(confirmedPrice(app), null)
  app.pricing.confirmed = true
  assert.deepEqual(confirmedPrice(app), { text: '$0.99 one-time purchase', region: 'US' })
  app.pricing = null
  assert.equal(confirmedPrice(app), null)
})

test('validation rejects bad slugs, missing copy, artwork outside /media, and duplicates', () => {
  const bad = (mutate, label) => {
    const app = picplace()
    mutate(app)
    assert.throws(() => validateApp(app), CatalogError, label)
  }
  bad((a) => { a.slug = 'Pic Place' }, 'slug')
  bad((a) => { a.features = [] }, 'features')
  bad((a) => { a.support.email = 'nope' }, 'email')
  bad((a) => { a.artwork.icon.png[256] = '/apps/picplace/icon.png' }, 'artwork under routed /apps')
  bad((a) => { a.artwork.screenshots = [{ src: '/media/x.png', alt: '', width: 1, height: 1 }] }, 'screenshot alt')
  bad((a) => { a.copy = { ...a.copy, privacy: { ...a.copy.privacy, effectiveDate: 'soon' } } }, 'effective date')
  bad((a) => { a.status = 'beta' }, 'status')
  assert.throws(() => validateCatalog([picplace(), picplace()]), CatalogError, 'duplicate slug')
})
