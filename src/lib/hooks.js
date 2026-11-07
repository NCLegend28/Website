import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia?.(QUERY).matches)
  useEffect(() => {
    const mq = window.matchMedia?.(QUERY)
    if (!mq) return
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

function setMeta(selector, attr, value, create) {
  let el = document.head.querySelector(selector)
  if (!value) { el?.remove(); return }
  if (!el) { el = create(); document.head.appendChild(el) }
  el.setAttribute(attr, value)
}

/** Keeps <title>, description, canonical and robots in sync on client-side navigation. */
export function useDocumentMeta({ title, description, canonical, robots }) {
  useEffect(() => {
    document.title = title
    const mk = (tag, attrs) => () => Object.assign(document.createElement(tag), attrs)
    setMeta('meta[name="description"]', 'content', description, mk('meta', { name: 'description' }))
    setMeta('link[rel="canonical"]', 'href', canonical, mk('link', { rel: 'canonical' }))
    setMeta('meta[name="robots"]', 'content', robots, mk('meta', { name: 'robots' }))
    setMeta('meta[property="og:title"]', 'content', title, () => { const m = document.createElement('meta'); m.setAttribute('property', 'og:title'); return m })
    setMeta('meta[property="og:description"]', 'content', description, () => { const m = document.createElement('meta'); m.setAttribute('property', 'og:description'); return m })
  }, [title, description, canonical, robots])
}
