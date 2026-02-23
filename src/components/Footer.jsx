const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/NCLegend28', icon: '💻' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/tali-mosley', icon: '💼' },
    { name: 'Email', url: 'mailto:mosley.tali@gmail.com', icon: '📧' },
  ]

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="section-container py-12">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-4">TALI</h3>
              <p className="text-slate-400">
                Biomedical Engineer & AI/ML Developer building solutions.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-biotech-blue mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-slate-400 hover:text-biotech-blue transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-slate-400 hover:text-biotech-blue transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#experience" className="text-slate-400 hover:text-biotech-blue transition-colors">
                    Experience
                  </a>
                </li>
                <li>
                  <a href="#chat" className="text-slate-400 hover:text-biotech-blue transition-colors">
                    Chat
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-lg font-semibold text-tech-purple mb-4">Connect</h4>
              <div className="flex flex-col space-y-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="flex items-center gap-2 text-slate-400 hover:text-tech-purple transition-colors"
                  >
                    <span>{link.icon}</span>
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
