import { Link } from '../lib/router.jsx'
import { SITE } from '../config/site.js'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'GitHub', url: SITE.social.github, icon: '💻' },
    { name: 'LinkedIn', url: SITE.social.linkedin, icon: '💼' },
    { name: 'Email', url: `mailto:${SITE.contactEmail}`, icon: '📧' },
  ]

  const quickLinks = [
    { to: '/apps', label: 'Apps' },
    { to: '/#about', label: 'About' },
    { to: '/#projects', label: 'Projects' },
    { to: '/#experience', label: 'Experience' },
    { to: '/#guide', label: 'AI guide' },
  ]

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="section-container py-12">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <p className="text-2xl font-bold gradient-text mb-4">TALI</p>
              <p className="text-slate-400">
                Biomedical Engineer & AI/ML Developer building solutions.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h2 className="text-lg font-semibold text-biotech-blue mb-4">Quick Links</h2>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-slate-400 hover:text-biotech-blue transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h2 className="text-lg font-semibold text-tech-purple mb-4">Connect</h2>
              <div className="flex flex-col space-y-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    {...(link.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex items-center gap-2 text-slate-400 hover:text-tech-purple transition-colors"
                  >
                    <span aria-hidden="true">{link.icon}</span>
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {currentYear} Tali. All rights reserved.
            </p>
          </div>

          {/* Philosophy Quote */}
          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm italic">
              "The richest place on Earth is the graveyard.
                    -- Les Brown"
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
