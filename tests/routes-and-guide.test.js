import { test } from 'node:test'
import assert from 'node:assert/strict'
import { matchRoute, routeMeta, publicPaths, buildRouteTable, normalizePath } from '../src/lib/routes.js'
import { guideTopics, buildAiFacts, answerToText } from '../src/lib/guideKnowledge.js'
import { inlineToHtml, parseInline } from '../src/lib/inline.js'
import { getApp } from '../src/data/apps.js'
import { SITE } from '../src/config/site.js'

const LAUNCH_ROUTES = ['/apps', '/apps/picplace', '/apps/picplace/privacy', '/apps/picplace/support']

test('the four app routes resolve', () => {
  assert.equal(matchRoute('/apps').name, 'apps')
  assert.equal(matchRoute('/apps/picplace').name, 'app')
  assert.equal(matchRoute('/apps/picplace/privacy').name, 'app-privacy')
  assert.equal(matchRoute('/apps/picplace/support/').name, 'app-support')
  assert.equal(matchRoute('/apps/unknown').name, 'not-found')
  assert.equal(matchRoute('/apps/picplace/terms').name, 'not-found')
  assert.equal(normalizePath('//apps//picplace/'), '/apps/picplace')
})

test('every public route has a distinct title and description', () => {
  const metas = publicPaths().map((p) => routeMeta(matchRoute(p)))
  const titles = new Set(metas.map((m) => m.title))
  const descriptions = new Set(metas.map((m) => m.description))
  assert.equal(titles.size, metas.length)
  assert.equal(descriptions.size, metas.length)
  for (const p of LAUNCH_ROUTES) assert.ok(publicPaths().includes(p), p)
})

test('route table has canonical URLs on the configured domain and policy noscript fallbacks', () => {
  const table = buildRouteTable()
  assert.equal(table['/apps/picplace/privacy'].canonical, `${SITE.url}/apps/picplace/privacy`)
  assert.match(table['/apps/picplace/privacy'].noscript, /Effective/)
  assert.match(table['/apps/picplace/privacy'].noscript, new RegExp(SITE.publisher.email.replace('.', '\\.')))
  assert.match(table['/apps/picplace/support'].noscript, /Recently Deleted/)
})

test('quick topics answer offline with real links and no invented price or date', () => {
  for (const topic of guideTopics) {
    const a = topic.answer()
    assert.ok(a.text.length > 0, topic.id)
    for (const l of a.links ?? []) {
      assert.match(l.href, /^(\/|https:\/\/|mailto:)/, `${topic.id}: ${l.href}`)
      if (l.href.startsWith('/') && !l.href.startsWith('/#')) {
        assert.notEqual(matchRoute(l.href.split('#')[0]).name, 'not-found', l.href)
      }
    }
    const text = answerToText(a)
    assert.doesNotMatch(text, /\$\d/, `${topic.id} must not state an unconfirmed price`)
  }
  const pp = guideTopics.find((t) => t.id === 'picplace').answer()
  assert.match(answerToText(pp), /Give every photo a place\./)
  assert.ok(pp.links.some((l) => l.href === '/apps/picplace/privacy'))
  assert.ok(pp.links.some((l) => l.href === '/apps/picplace/support'))
})

test('AI facts come from the catalog and forbid invented prices and dates', () => {
  const facts = buildAiFacts()
  const app = getApp('picplace')
  assert.match(facts, /PicPlace/)
  assert.ok(facts.includes(app.description))
  assert.match(facts, /Price: not announced/)
  assert.match(facts, /Launch date: not announced/)
  assert.doesNotMatch(facts, /0\.99/)
})

test('inline formatter escapes HTML and only allows safe link schemes', () => {
  assert.equal(inlineToHtml('<b>&'), '&lt;b&gt;&amp;')
  assert.equal(inlineToHtml('[x](javascript:alert)'), '<a href="#">x</a>')
  assert.equal(inlineToHtml('**Recover** [help](/apps/picplace/support)'), '<strong>Recover</strong> <a href="/apps/picplace/support">help</a>')
  assert.deepEqual(parseInline('plain').map((s) => s.type), ['text'])
})
