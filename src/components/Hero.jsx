import { Link } from '../lib/router.jsx'
import Guide from './guide/Guide.jsx'

const Hero = () => {
  return (
    <section id="home" aria-labelledby="home-title" className="relative pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] items-start gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:gap-16">
        {/* Introduction */}
        <div className="lg:pt-10">
          <p className="font-mono text-sm text-sky-300">
            <span aria-hidden="true">// </span>the workshop
          </p>
          <h1 id="home-title" data-page-heading tabIndex={-1} className="mt-4 text-5xl font-bold tracking-tight text-white md:text-7xl focus:outline-none">
            Hi, I’m <span className="gradient-text">Tali</span>
          </h1>
          <p className="mt-4 text-xl text-slate-300 md:text-2xl">Biomedical Engineer → AI/ML Developer</p>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            Building the future at the intersection of{' '}
            <span className="font-semibold text-sky-300">healthcare technology</span>,{' '}
            <span className="font-semibold text-violet-300">artificial intelligence</span>, and{' '}
            <span className="font-semibold text-orange-300">financial systems</span>. I also build apps, and PicPlace is
            the first one in the showroom.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/apps" className="btn-primary">Explore my apps</Link>
            <Link to="/#guide" className="btn-secondary">Ask the AI guide</Link>
          </div>

          <p className="mt-10 font-mono text-sm text-slate-500">
            Carpe Diem <span aria-hidden="true" className="px-2 text-slate-700">/</span> As You Climb, You Must Lift
          </p>
        </div>

        {/* Host area */}
        <Guide />
      </div>
    </section>
  )
}

export default Hero
