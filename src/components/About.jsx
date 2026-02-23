const About = () => {
  return (
    <section id="about" className="section-container">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-biotech-blue to-tech-purple mx-auto"></div>
        </div>

        {/* Story Content */}
        <div className="space-y-8">
          <div className="card-glow">
            <h3 className="text-2xl font-semibold text-biotech-blue mb-4">The Journey</h3>
            <p className="text-slate-300 leading-relaxed">
              From the precision of biomedical engineering at UT Austin to the cutting edge of AI/ML development, 
              my path has been driven by one question: <span className="text-white font-semibold">How can we freely explore human potential?</span>
            </p>
          </div>

          <div className="card-glow">
            <h3 className="text-2xl font-semibold text-tech-purple mb-4">What I Do</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              Currently working as a Robotics/QC Technician at Ivy Technologies, 
              I bring the world of automation to sites across the country. But that's just the day job.
            </p>
            <p className="text-slate-300 leading-relaxed">
              By night (and weekends), I'm building: AI-powered systems that understand human needs, algorithmic trading platforms 
              that predict market movements, and hardware solutions that push the boundaries of what's possible - 
              like electromagnetic wristbands that capture kinetic energy.
            </p>
          </div>

          <div className="card-glow">
            <h3 className="text-2xl font-semibold text-neural-orange mb-4">My Superpowers</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-biotech-blue font-semibold mb-2">Technical Skills</h4>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-biotech-blue mr-2">▸</span>
                    Python (primary), JavaScript, and whatever language fits the problem
                  </li>
                  <li className="flex items-start">
                    <span className="text-biotech-blue mr-2">▸</span>
                    Machine Learning & AI model development
                  </li>
                  <li className="flex items-start">
                    <span className="text-biotech-blue mr-2">▸</span>
                    Algorithmic trading systems
                  </li>
                  <li className="flex items-start">
                    <span className="text-biotech-blue mr-2">▸</span>
                    Hardware prototyping & biomedical devices
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-tech-purple font-semibold mb-2">Approach</h4>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-tech-purple mr-2">▸</span>
                    Systematic, organized project execution
                  </li>
                  <li className="flex items-start">
                    <span className="text-tech-purple mr-2">▸</span>
                    Hands-on technical problem-solving
                  </li>
                  <li className="flex items-start">
                    <span className="text-tech-purple mr-2">▸</span>
                    Entrepreneurial mindset
                  </li>
                  <li className="flex items-start">
                    <span className="text-tech-purple mr-2">▸</span>
                    Mentorship & lifting others up
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card-glow border-l-4 border-l-biotech-blue">
            <p className="text-lg text-slate-300 italic">
              "2025-2026 has been transformative; traveling the country, allowing ideas to breathe and be iterated on. Not searching for perfection but something that works, that solves the problem.
              My  I'm actively seeking AI/ML engineering positions where I can bring 
              this unique blend of biomedical expertise and cutting-edge technical skills."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
