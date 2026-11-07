import { useEffect, useLayoutEffect } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Philosophy from './components/Philosophy'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CircuitBackground from './components/CircuitBackground'
import AppsPage from './pages/AppsPage.jsx'
import AppDetailPage from './pages/AppDetailPage.jsx'
import { AppPrivacyPage, AppSupportPage } from './pages/AppPolicyPages.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { RouterProvider, useRouter } from './lib/router.jsx'
import { routeMeta } from './lib/routes.js'
import { absoluteUrl } from './config/site.js'
import { useDocumentMeta, useReducedMotion } from './lib/hooks.js'

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Philosophy />
    </>
  )
}

function Page({ route }) {
  switch (route.name) {
    case 'home': return <HomePage />
    case 'apps': return <AppsPage />
    case 'app': return <AppDetailPage app={route.app} />
    case 'app-privacy': return <AppPrivacyPage app={route.app} />
    case 'app-support': return <AppSupportPage app={route.app} />
    default: return <NotFoundPage />
  }
}

function focusWithoutScroll(el) {
  if (!el) return
  if (!el.hasAttribute('tabindex') && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}

function Shell() {
  const { route, location } = useRouter()
  const reducedMotion = useReducedMotion()
  const meta = routeMeta(route)
  useDocumentMeta({ ...meta, canonical: route.name === 'not-found' ? null : absoluteUrl(route.path) })

  // Scroll + focus management for client-side navigation (and #hash on first load).
  useLayoutEffect(() => {
    const id = location.hash ? decodeURIComponent(location.hash.slice(1)) : ''
    if (location.initial) {
      if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
      return
    }
    if (id) {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
        focusWithoutScroll(el)
        return
      }
    }
    window.scrollTo(0, 0)
    focusWithoutScroll(document.querySelector('[data-page-heading]'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key, location.pathname])

  // The circuit background belongs to the home page; product and policy pages stay calm.
  const isHome = route.name === 'home'
  useEffect(() => { document.documentElement.dataset.page = route.name }, [route.name])

  return (
    <div className="min-h-screen relative">
      {/* Accessible skip link */}
      <a
        href="#main"
        onClick={(e) => { e.preventDefault(); const m = document.getElementById('main'); m?.focus(); m?.scrollIntoView() }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-biotech-blue focus:text-white focus:rounded-lg focus:font-medium focus:outline-none"
      >
        Skip to main content
      </a>

      {isHome && <CircuitBackground />}

      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          <Page route={route} />
        </main>
        <Footer />
      </div>
    </div>
  )
}

function App() {
  return (
    <RouterProvider>
      <Shell />
    </RouterProvider>
  )
}

export default App
