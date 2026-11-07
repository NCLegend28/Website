/**
 * A ~100-line history router: enough for five routes without adding a dependency.
 * <Link> renders a real <a href>, so links work without JavaScript, open in new
 * tabs, and are announced correctly by screen readers.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { matchRoute, normalizePath } from './routes.js'

const RouterContext = createContext(null)

const readLocation = (key = 0) => ({
  pathname: normalizePath(window.location.pathname),
  hash: window.location.hash,
  key,
})

export function RouterProvider({ children }) {
  const [location, setLocation] = useState(() => ({ ...readLocation(), initial: true }))

  useEffect(() => {
    // Canonicalise a trailing slash without adding a history entry.
    if (window.location.pathname !== location.pathname) {
      window.history.replaceState(window.history.state, '', location.pathname + window.location.search + window.location.hash)
    }
    const onPop = () => setLocation(readLocation(Date.now()))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigate = useCallback((to, { replace = false } = {}) => {
    const url = new URL(to, window.location.href)
    if (url.origin !== window.location.origin) {
      window.location.assign(url.href)
      return
    }
    const pathname = normalizePath(url.pathname)
    const href = pathname + url.search + url.hash
    window.history[replace ? 'replaceState' : 'pushState']({}, '', href)
    setLocation({ pathname, hash: url.hash, key: Date.now() })
  }, [])

  const value = useMemo(() => ({ location, route: matchRoute(location.pathname), navigate }), [location, navigate])
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export const useRouter = () => useContext(RouterContext)

const isModified = (e) => e.metaKey || e.altKey || e.ctrlKey || e.shiftKey || e.button !== 0

export function Link({ to, onClick, target, children, ...rest }) {
  const { navigate } = useRouter()
  const handle = (e) => {
    onClick?.(e)
    if (e.defaultPrevented || isModified(e) || (target && target !== '_self')) return
    if (!to.startsWith('/') || to.startsWith('//')) return
    e.preventDefault()
    navigate(to)
  }
  return (
    <a href={to} onClick={handle} target={target} {...rest}>
      {children}
    </a>
  )
}

/** Internal paths use <Link>; everything else is a normal anchor (external opens in a new tab). */
export function SmartLink({ href, children, ...rest }) {
  if (href.startsWith('/') && !href.startsWith('//')) return <Link to={href} {...rest}>{children}</Link>
  const external = /^https?:/.test(href)
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  )
}
