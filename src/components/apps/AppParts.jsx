import { Fragment } from 'react'
import { SmartLink, Link } from '../../lib/router.jsx'
import { parseInline } from '../../lib/inline.js'
import { APP_STORE_BADGE, appPaths, purchaseState } from '../../data/apps.js'

export function Inline({ text }) {
  return parseInline(text).map((seg, i) => {
    if (seg.type === 'strong') return <strong key={i} className="font-semibold text-slate-100">{seg.text}</strong>
    if (seg.type === 'link') return <SmartLink key={i} href={seg.href} className="text-sky-300 underline decoration-sky-400/50 underline-offset-2 hover:text-white">{seg.text}</SmartLink>
    return <Fragment key={i}>{seg.text}</Fragment>
  })
}

export function Blocks({ blocks }) {
  return blocks.map((b, i) => {
    if (b.p) return <p key={i}><Inline text={b.p} /></p>
    const items = b.ul ?? b.ol
    const List = b.ul ? 'ul' : 'ol'
    return (
      <List key={i} className={b.ul ? 'list-disc space-y-2 pl-6' : 'list-decimal space-y-2 pl-6'}>
        {items.map((li, j) => <li key={j}><Inline text={li} /></li>)}
      </List>
    )
  })
}

export function AppIcon({ app, size = 96, className = '' }) {
  const { png, webp } = app.artwork.icon
  const srcset = (set) => Object.entries(set).map(([w, src]) => `${src} ${w}w`).join(', ')
  return (
    <picture>
      {webp && <source type="image/webp" srcSet={srcset(webp)} sizes={`${size}px`} />}
      <img
        src={png[256]}
        srcSet={srcset(png)}
        sizes={`${size}px`}
        width={size}
        height={size}
        alt={`${app.name} app icon`}
        className={`rounded-[22%] shadow-lg shadow-black/40 ${className}`}
        loading="lazy"
        decoding="async"
      />
    </picture>
  )
}

export function StatusBadge({ app }) {
  const s = purchaseState(app)
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${s.kind === 'live' ? 'border-emerald-400/40 text-emerald-300' : 'border-amber-300/40 text-amber-200'}`}>
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${s.kind === 'live' ? 'bg-emerald-400' : 'bg-amber-300'}`} />
      {s.label}
    </span>
  )
}

/** Purchase area: Apple handles purchase and installation. No fake checkout. */
export function PurchaseArea({ app }) {
  const s = purchaseState(app)
  return (
    <section aria-labelledby="get-app" className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <h2 id="get-app" className="text-sm font-semibold uppercase tracking-wider text-slate-400">Get {app.name}</h2>
      {s.kind === 'live' ? (
        <div className="mt-3">
          <a href={s.storeUrl} target="_blank" rel="noopener noreferrer" className="inline-block rounded-[10px] focus-visible:ring-2 focus-visible:ring-sky-400">
            <img src={APP_STORE_BADGE} alt={`Download ${app.name} on the App Store`} width="150" height="50" className="h-[50px] w-auto" />
          </a>
        </div>
      ) : (
        <p className="mt-3 text-lg font-semibold text-white">{s.label}</p>
      )}
      {s.price && (
        <p className="mt-2 text-sm text-slate-300">
          {s.price.text}{s.price.region ? ` (${s.price.region})` : ''}. Apple shows the price for your region.
        </p>
      )}
      <p className="mt-2 text-sm text-slate-400">
        {s.kind === 'live'
          ? 'Purchase and installation happen on the App Store.'
          : 'Purchase and installation will happen on the App Store. This page will link there when it’s available.'}
      </p>
    </section>
  )
}

/** Labeled Privacy Policy and Support buttons, shown directly under the app’s main info. */
export function PolicyButtons({ app }) {
  const paths = appPaths(app)
  return (
    <div className="flex flex-wrap gap-3">
      <Link to={paths.privacy} className="btn-quiet">Privacy Policy</Link>
      <Link to={paths.support} className="btn-quiet">Support</Link>
    </div>
  )
}

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true" className="text-slate-600">/</span>}
            {item.to ? <Link to={item.to} className="hover:text-white underline-offset-2 hover:underline">{item.label}</Link> : <span aria-current="page" className="text-slate-300">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
