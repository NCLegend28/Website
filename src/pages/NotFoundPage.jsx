import { Link } from '../lib/router.jsx'

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-36 pb-32">
      <p className="font-mono text-sm text-sky-300">404</p>
      <h1 data-page-heading tabIndex={-1} className="mt-3 text-4xl font-bold text-white focus:outline-none">This page doesn’t exist</h1>
      <p className="mt-4 text-slate-300">The link may be old or mistyped.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/" className="btn-primary">Go home</Link>
        <Link to="/apps" className="btn-secondary">Browse apps</Link>
      </div>
    </div>
  )
}
