/**
 * Tiny inline formatter shared by React pages and the build-time HTML renderer.
 * Supports [label](href) links and **strong** text. Everything else is plain text.
 */
const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g

export function parseInline(input) {
  const out = []
  let last = 0
  for (const m of input.matchAll(TOKEN)) {
    if (m.index > last) out.push({ type: 'text', text: input.slice(last, m.index) })
    if (m[1] !== undefined) out.push({ type: 'link', text: m[1], href: m[2] })
    else out.push({ type: 'strong', text: m[3] })
    last = m.index + m[0].length
  }
  if (last < input.length) out.push({ type: 'text', text: input.slice(last) })
  return out
}

export const isInternalHref = (href) => href.startsWith('/') && !href.startsWith('//')

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
export const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ESC[c])

const safeHref = (href) => (/^(https?:|mailto:|\/(?!\/)|#)/.test(href) ? href : '#')

export function inlineToHtml(input) {
  return parseInline(input)
    .map((seg) => {
      if (seg.type === 'link') return `<a href="${escapeHtml(safeHref(seg.href))}">${escapeHtml(seg.text)}</a>`
      if (seg.type === 'strong') return `<strong>${escapeHtml(seg.text)}</strong>`
      return escapeHtml(seg.text)
    })
    .join('')
}

/** Plain text (for meta descriptions and the AI prompt). */
export const inlineToText = (input) => parseInline(input).map((s) => s.text).join('')

/** Render content blocks ({p}|{ul}|{ol}) to HTML. */
export function blocksToHtml(blocks) {
  return blocks
    .map((b) => {
      if (b.p) return `<p>${inlineToHtml(b.p)}</p>`
      const tag = b.ul ? 'ul' : 'ol'
      return `<${tag}>${(b.ul ?? b.ol).map((li) => `<li>${inlineToHtml(li)}</li>`).join('')}</${tag}>`
    })
    .join('')
}
