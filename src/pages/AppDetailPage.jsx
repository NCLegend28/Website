import { AppIcon, Breadcrumbs, PolicyButtons, PurchaseArea, StatusBadge } from '../components/apps/AppParts.jsx'

export default function AppDetailPage({ app }) {
  const { screenshots } = app.artwork
  const details = app.copy.details ?? {}
  return (
    <div className="mx-auto max-w-5xl px-6 pt-28 pb-24">
      <Breadcrumbs items={[{ label: 'Apps', to: '/apps' }, { label: app.name }]} />

      {/* Main information */}
      <section aria-labelledby="app-title" className="mt-8 grid gap-10 md:grid-cols-[minmax(0,1fr)_18rem]">
        <div>
          <div className="flex items-center gap-5">
            <AppIcon app={app} size={104} />
            <div>
              <p className="text-lg font-semibold text-slate-200">{app.name}</p>
              <p className="text-sm text-slate-400">{app.platform} · {app.category}</p>
              <div className="mt-2"><StatusBadge app={app} /></div>
            </div>
          </div>
          <h1 id="app-title" data-page-heading tabIndex={-1} className="mt-8 text-4xl font-bold tracking-tight text-white md:text-5xl focus:outline-none">
            {app.tagline}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">{app.description}</p>
          {app.requirements && <p className="mt-3 text-sm text-slate-400">{app.requirements}</p>}
          <div className="mt-6">
            <PolicyButtons app={app} />
          </div>
        </div>
        <div className="md:pt-2">
          <PurchaseArea app={app} />
        </div>
      </section>

      {screenshots.length > 0 && (
        <section aria-labelledby="screens" className="mt-16">
          <h2 id="screens" className="text-2xl font-semibold text-white">Screens</h2>
          <ul className="mt-6 flex gap-5 overflow-x-auto pb-4 snap-x">
            {screenshots.map((s) => (
              <li key={s.src} className="shrink-0 snap-start">
                <img src={s.src} alt={s.alt} width={s.width} height={s.height} loading="lazy" decoding="async"
                  className="h-[28rem] w-auto rounded-3xl border border-slate-800" />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="features" className="mt-16">
        <h2 id="features" className="text-2xl font-semibold text-white">What it does</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {app.features.map((f) => (
            <li key={f.title} className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
              <h3 className="font-semibold text-white">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{f.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      {details.howDeletionWorks && (
        <section aria-labelledby="deletion" className="mt-16 grid gap-8 md:grid-cols-2">
          <div>
            <h2 id="deletion" className="text-2xl font-semibold text-white">How deletion works</h2>
            <ol className="mt-5 space-y-3">
              {details.howDeletionWorks.map((step, i) => (
                <li key={i} className="flex gap-3 text-slate-300">
                  <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-sky-400/50 font-mono text-xs text-sky-300">{i + 1}</span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          {details.goodToKnow && (
            <div>
              <h2 className="text-2xl font-semibold text-white">Good to know</h2>
              <ul className="mt-5 list-disc space-y-3 pl-5 text-slate-300">
                {details.goodToKnow.map((t, i) => <li key={i} className="leading-relaxed">{t}</li>)}
              </ul>
            </div>
          )}
        </section>
      )}
    </div>
  )
}
