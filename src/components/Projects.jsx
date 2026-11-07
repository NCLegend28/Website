import { useState } from 'react'
import projects from '../data/projects'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai-ml', label: 'AI/ML' },
    { id: 'biomedical', label: 'Biomedical' },
    { id: 'fintech', label: 'FinTech' },
  ]

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="section-container">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
          Projects
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-biotech-blue to-tech-purple mx-auto mb-8"></div>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          From algorithms that predict markets to hardware that harvests energy
          from movement
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
              activeFilter === filter.id
                ? 'bg-gradient-to-r from-biotech-blue to-tech-purple text-white shadow-lg shadow-biotech-blue/50'
                : 'bg-slate-900 text-slate-400 hover:text-slate-100 border border-slate-800'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Projects Grid — 2 columns for readability */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {filteredProjects.map((project, index) => (
          <div
            key={index}
            className="card-glow group hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="space-y-4">
              {/* Title */}
              <h3 className={`text-2xl font-bold text-${project.color}`}>
                {project.title}
              </h3>

              {/* Description — detailed paragraph */}
              <p className="text-slate-300 leading-relaxed">
                {project.description}
              </p>

              {/* Tools / Frameworks pills */}
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full font-mono border border-slate-700"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Highlights */}
              <div className="space-y-2 pt-4 border-t border-slate-800">
                {project.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start">
                    <span className="text-biotech-blue mr-2 mt-1">&#10003;</span>
                    <span className="text-sm text-slate-300">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Conditional links */}
              {(project.repo || project.liveUrl || project.demoUrl) && (
                <div className="flex flex-wrap gap-3 pt-4">
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-biotech-blue hover:text-white transition-colors"
                    >
                      View Source &rarr;
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-tech-purple hover:text-white transition-colors"
                    >
                      Visit Site &rarr;
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-neural-orange hover:text-white transition-colors"
                    >
                      Demo &rarr;
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
