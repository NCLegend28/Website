import { APPS, appPaths } from '../data/apps.js'
import { Link } from '../lib/router.jsx'
import { AppIcon, StatusBadge } from '../components/apps/AppParts.jsx'

export default function AppsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <header className="max-w-2xl">
        <p className="font-mono text-sm text-sky-300"><span aria-hidden="true">// </span>showroom</p>
        <h1 data-page-heading tabIndex={-1} className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl focus:outline-none">Apps</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-300">
          Small, focused apps I design and build. Each one has its own page with features, privacy details, and support.
        </p>
      </header>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {APPS.map((app) => (
          <li key={app.slug} className="group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-colors hover:border-sky-400/50">
            <div className="flex items-start gap-4">
              <AppIcon app={app} size={72} />
              <div className="min-w-0">
                <h2 className="text-xl font-semibold text-white">{app.name}</h2>
                <p className="text-sm text-slate-400">{app.platform}</p>
              </div>
            </div>
            <p className="mt-4 text-base font-medium text-slate-100">{app.tagline}</p>
            <p className="mt-1 flex-1 text-sm leading-relaxed text-slate-300">{app.benefit}</p>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <StatusBadge app={app} />
              {/* The whole card is clickable via this link's ::after overlay. */}
              <Link to={appPaths(app).page} className="text-sm font-semibold text-sky-300 after:absolute after:inset-0 after:rounded-2xl hover:text-white focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-sky-400">
                View {app.name} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-sm text-slate-400">
        More apps are in progress in the workshop. Questions? <Link to="/#guide" className="text-sky-300 underline underline-offset-2 hover:text-white">Ask the AI guide</Link>.
      </p>
    </div>
  )
}
