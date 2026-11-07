const Experience = () => {
  const experiences = [
    {
      title: 'Lab Assistant',
      company: 'Clinical Pathology Labs',
      period: 'Past',
      type: 'Healthcare Technology',
      description: 'Managing laboratory operations and quality control in clinical pathology settings.',
      skills: ['Quality Control', 'Lab Operations', 'Healthcare Tech', 'Precision Work']
    },
    {
      title: 'Robotics/QC Technician',
      company: 'Ivy Technologies / Amazon',
      period: 'Current',
      type: 'Robotics & Automation',
      description: 'Working with robotic systems and quality control processes in high-tech automation environments.',
      skills: ['Robotics', 'Quality Assurance', 'Automation', 'Technical Systems']
    },
    {
      title: 'Biomedical Engineering',
      company: 'University of Texas at Austin',
      period: 'Completed',
      type: 'Education',
      description: 'Computational specialization focusing on the intersection of engineering and medicine.',
      skills: ['Computational Biology', 'Medical Devices', 'Systems Engineering', 'Python']
    }
  ]

  return (
    <section id="experience" className="section-container bg-slate-900/30">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Experience</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-biotech-blue to-tech-purple mx-auto"></div>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="card-glow relative hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Timeline connector line */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-8 top-full h-8 w-0.5 bg-gradient-to-b from-biotech-blue to-transparent"></div>
              )}

              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Timeline dot and period */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-biotech-blue to-tech-purple flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-biotech-blue"></div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                      <p className="text-biotech-blue font-semibold">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm">
                        {exp.type}
                      </span>
                      <span className="text-slate-400 text-sm font-mono">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-300">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.skills.map((skill, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-biotech-blue/10 text-biotech-blue rounded-lg text-sm font-medium border border-biotech-blue/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center card-glow">
          <p className="text-lg text-slate-300 mb-6">
            Currently seeking <span className="text-biotech-blue font-semibold">AI/ML Engineering</span> positions 
            where I can bring this unique blend of biomedical expertise and technical skills
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#chat" className="btn-primary">
              Let's Connect
            </a>
            <a 
              href="/resume.pdf" 
              className="btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
