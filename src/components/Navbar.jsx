import { useEffect, useId, useRef, useState } from 'react'
import { Link, useRouter } from '../lib/router.jsx'
import { SITE } from '../config/site.js'

const SECTIONS = ['home', 'about', 'projects', 'experience', 'philosophy']

const navLinks = [
  { to: '/apps', label: 'Apps', isActive: (route) => route.name !== 'home' && route.path.startsWith('/apps') },
  { to: '/#about', label: 'About', section: 'about' },
  { to: '/#projects', label: 'Projects', section: 'projects' },
  { to: '/#experience', label: 'Experience', section: 'experience' },
  { to: '/#philosophy', label: 'Philosophy', section: 'philosophy' },
]

const Navbar = () => {
  const { route, location } = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const toggleRef = useRef(null)
  const isHome = route.name === 'home'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      if (!isHome) return
      // Update active section based on scroll position
      const scrollPosition = window.scrollY + 120
      for (const section of SECTIONS) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  // Close the mobile menu on navigation.
  useEffect(() => { setOpen(false) }, [location.key, location.pathname])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const current = (link) => {
    if (link.isActive) return link.isActive(route)
    return isHome && activeSection === link.section
  }

  const linkClass = (active) =>
    `text-sm font-medium transition-colors duration-200 ${active ? 'text-sky-300' : 'text-slate-300 hover:text-white'}`

  const solid = isScrolled || !isHome || open

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        solid ? 'bg-slate-950/95 backdrop-blur-lg border-b border-slate-800' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav aria-label="Main" className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          <Link to="/" className="text-2xl font-bold gradient-text" aria-label={`${SITE.ownerName}, home`}>
            {SITE.brandMark}
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={linkClass(current(link))} aria-current={current(link) ? (link.section ? 'location' : 'page') : undefined}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link to="/#guide" className="hidden md:inline-flex btn-primary !py-2 text-sm">Ask the AI guide</Link>

          {/* Mobile menu button */}
          <button
            ref={toggleRef}
            type="button"
            className="md:hidden inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 hover:border-sky-400"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
            Menu
          </button>
        </div>

        {/* Mobile Navigation */}
        <div id={menuId} hidden={!open} className="md:hidden">
          <ul className="mt-4 space-y-1 border-t border-slate-800 pt-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`block rounded-lg px-3 py-3 text-base ${current(link) ? 'bg-slate-900 text-sky-300' : 'text-slate-200 hover:bg-slate-900'}`}
                  aria-current={current(link) ? (link.section ? 'location' : 'page') : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link to="/#guide" className="btn-primary block text-center">Ask the AI guide</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
