const Philosophy = () => {
  const principles = [
    {
      title: 'Carpe Diem',
      subtitle: 'Seize the Day',
      icon: '⚡',
      description: 'Uncertainty is not an excuse for inaction. Every moment is an opportunity to build, learn, and push boundaries. The future belongs to those who act today.',
      color: 'biotech-blue'
    },
    {
      title: 'As You Climb, You Must Lift',
      subtitle: 'Mentorship & Community',
      icon: '🤝',
      description: 'Success is meaningless if it\'s not shared. As I grow in my technical journey, I\'m committed to mentoring others and building systems that elevate everyone.',
      color: 'tech-purple'
    },
    {
      title: 'Technology Amplifies Humanity',
      subtitle: 'Purpose-Driven Innovation',
      icon: '🧬',
      description: 'The best technology doesn\'t replace human capability - it extends it. From biomedical devices to AI systems, I build tools that make people more powerful.',
      color: 'neural-orange'
    }
  ]

  const vision = [
    {
      area: 'AI/ML Engineering',
      goal: 'Join a forward-thinking team building transformative AI applications'
    },
    {
      area: 'Healthcare Technology',
      goal: 'Continue bridging biomedical engineering and artificial intelligence'
    },
    {
      area: 'Entrepreneurship',
      goal: 'Scale multiple ventures simultaneously - SaaS, trading systems, hardware innovations'
    },
    {
      area: 'Mentorship',
      goal: 'Help other engineers navigate the transition from traditional engineering to AI/ML'
    }
  ]

  return (
    <section id="philosophy" className="section-container">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Philosophy & Vision</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-biotech-blue to-tech-purple mx-auto mb-8"></div>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          What I believe in and where I'm headed
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {principles.map((principle, index) => (
          <div 
            key={index}
            className="card-glow text-center group hover:scale-105 transition-transform duration-300"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
              {principle.icon}
            </div>
            <h3 className={`text-2xl font-bold text-${principle.color} mb-2`}>
              {principle.title}
            </h3>
            <p className="text-slate-400 font-semibold mb-4">
              {principle.subtitle}
            </p>
            <p className="text-slate-300 leading-relaxed">
              {principle.description}
            </p>
          </div>
        ))}
      </div>

      {/* Vision & Goals */}
      <div className="max-w-4xl mx-auto">
        <div className="card-glow">
          <h3 className="text-3xl font-bold text-center mb-8 gradient-text">
            What I'm Building Toward
          </h3>
          
          <div className="space-y-6">
            {vision.map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors"
              >
                <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-biotech-blue"></div>
                <div>
                  <h4 className="text-lg font-semibold text-biotech-blue mb-1">
                    {item.area}
                  </h4>
                  <p className="text-slate-300">
                    {item.goal}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className="mt-8 pt-8 border-t border-slate-800 text-center">
            <p className="text-xl text-slate-300 italic">
              "2024-2025 represents a transformation - from conventional paths to creating my own. 
              I'm looking for opportunities that match this ambition."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Philosophy
