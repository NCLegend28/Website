import { Blocks, Breadcrumbs, Inline } from '../components/apps/AppParts.jsx'
import { appPaths, formatDate } from '../data/apps.js'
import { SITE, absoluteUrl } from '../config/site.js'
import { Link } from '../lib/router.jsx'

/** Calm reading layout shared by the privacy and support pages. */
function DocPage({ app, crumb, children }) {
  return (
    <div className="doc mx-auto max-w-3xl px-6 pt-28 pb-24">
      <Breadcrumbs items={[{ label: 'Apps', to: '/apps' }, { label: app.name, to: appPaths(app).page }, { label: crumb }]} />
      <article className="mt-8">{children}</article>
    </div>
  )
}

export function AppPrivacyPage({ app }) {
  const p = app.copy.privacy
  return (
    <DocPage app={app} crumb="Privacy Policy">
      <header>
        <h1 data-page-heading tabIndex={-1} className="text-4xl font-bold tracking-tight text-white focus:outline-none">{app.name} Privacy Policy</h1>
        <dl className="mt-6 grid gap-x-6 gap-y-2 rounded-xl border border-slate-800 bg-slate-900/50 p-5 text-sm sm:grid-cols-[auto_1fr]">
          <dt className="text-slate-400">Effective date</dt>
          <dd className="text-slate-100"><time dateTime={p.effectiveDate}>{formatDate(p.effectiveDate)}</time></dd>
          <dt className="text-slate-400">Publisher</dt>
          <dd className="text-slate-100">{SITE.publisher.name}</dd>
          <dt className="text-slate-400">Contact</dt>
          <dd><a className="text-sky-300 underline underline-offset-2 hover:text-white" href={`mailto:${SITE.publisher.email}`}>{SITE.publisher.email}</a></dd>
          <dt className="text-slate-400">Applies to</dt>
          <dd className="text-slate-100">{app.name} for {app.platform}</dd>
        </dl>
      </header>
      <div className="doc-body mt-8">
        {p.intro.map((t, i) => <p key={i}><Inline text={t} /></p>)}
        {p.sections.map((s) => (
          <section key={s.id} aria-labelledby={`privacy-${s.id}`}>
            <h2 id={`privacy-${s.id}`}>{s.heading}</h2>
            <Blocks blocks={s.blocks} />
          </section>
        ))}
        <section aria-labelledby="privacy-contact">
          <h2 id="privacy-contact">Contact</h2>
          <p>
            {SITE.publisher.name}, <a href={`mailto:${SITE.publisher.email}`}>{SITE.publisher.email}</a>. For help using the app, visit{' '}
            <Link to={appPaths(app).support}>{app.name} Support</Link>.
          </p>
          <p className="text-sm text-slate-400">This policy’s address: {absoluteUrl(appPaths(app).privacy)}</p>
        </section>
      </div>
    </DocPage>
  )
}

export function AppSupportPage({ app }) {
  const s = app.copy.support
  const mailto = `mailto:${app.support.email}?subject=${encodeURIComponent(s.emailSubject ?? `${app.name} support`)}`
  return (
    <DocPage app={app} crumb="Support">
      <header>
        <h1 data-page-heading tabIndex={-1} className="text-4xl font-bold tracking-tight text-white focus:outline-none">{app.name} Support</h1>
        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <h2 className="text-lg font-semibold text-white">Contact support</h2>
          <p className="mt-2 text-slate-300">
            Email <a className="font-medium text-sky-300 underline underline-offset-2 hover:text-white" href={mailto}>{app.support.email}</a>
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-400"><Inline text={s.intro} /></p>
        </div>
      </header>
      <div className="doc-body mt-10">
        <h2 id="faq">Frequently asked questions</h2>
        {s.faq.map((f) => (
          <section key={f.id} aria-labelledby={`faq-${f.id}`}>
            <h3 id={`faq-${f.id}`}>{f.q}</h3>
            <Blocks blocks={f.a} />
          </section>
        ))}
        <p className="mt-10 text-sm text-slate-400">
          Read the <Link to={appPaths(app).privacy}>{app.name} Privacy Policy</Link>.
        </p>
      </div>
    </DocPage>
  )
}
