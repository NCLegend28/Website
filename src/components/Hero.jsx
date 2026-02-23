const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-biotech-blue/10 rounded-full blur-3xl top-20 -left-48 animate-pulse-slow"></div>
        <div className="absolute w-96 h-96 bg-tech-purple/10 rounded-full blur-3xl bottom-20 -right-48 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="section-container relative z-10 text-center">
        <div className="space-y-8">
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold">
              Hi, I'm <span className="gradient-text">Tali</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-400">
              Biomedical Engineer → AI/ML Developer
            </p>
          </div>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Building the future at the intersection of{' '}
            <span className="text-biotech-blue font-semibold">healthcare technology</span>,{' '}
            <span className="text-tech-purple font-semibold">artificial intelligence</span>, and{' '}
            <span className="text-neural-orange font-semibold">financial systems</span>
          </p>

          {/* Philosophy Pills */}
          <div className="flex flex-wrap justify-center gap-4 pt-8">
            <div className="card-glow inline-block">
              <p className="text-biotech-blue font-mono">Carpe Diem</p>
            </div>
            <div className="card-glow inline-block">
              <p className="text-tech-purple font-mono">As You Climb, You Must Lift</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-8">
            <a href="#projects" className="btn-primary">
              View My Work
            </a>
            <a href="#chat" className="btn-secondary">
              Chat With Me
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-16 animate-bounce">
            <svg
              className="w-6 h-6 mx-auto text-biotech-blue"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
