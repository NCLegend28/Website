import { Component, lazy, Suspense, useCallback, useState } from 'react'
import { GUIDE, isSameOriginModelUrl, webglAvailable } from '../../config/guide.js'
import StylizedGuide from './StylizedGuide.jsx'

const GuideModel = lazy(() => import('./GuideModel.jsx'))

/** Catches a failed chunk load or render error from the 3D path. */
class ModelBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(err) { this.props.onError(err) }
  render() { return this.state.failed ? null : this.props.children }
}

const STATE_LABEL = { idle: '', listening: 'Listening', thinking: 'Thinking', speaking: 'Speaking' }

/**
 * Reserves a fixed square so nothing shifts while a model loads. The illustration
 * shows immediately and stays as the fallback when there is no model, no WebGL,
 * or the model fails to load.
 */
export default function GuideAvatar({ state, reducedMotion }) {
  const [mode, setMode] = useState(() => {
    if (!GUIDE.modelUrl) return 'illustration'
    if (!isSameOriginModelUrl(GUIDE.modelUrl)) {
      console.warn('[guide] modelUrl must be a same-origin path ending in .glb or .gltf:', GUIDE.modelUrl)
      return 'illustration'
    }
    return webglAvailable() ? 'loading' : 'illustration'
  })
  const onReady = useCallback(() => setMode('model'), [])
  const onError = useCallback((err) => {
    console.warn('[guide] 3D model unavailable, showing illustration.', err?.message ?? err)
    setMode('failed')
  }, [])

  const showModel = mode === 'loading' || mode === 'model'
  return (
    <div
      className="guide-avatar relative aspect-square w-full"
      data-state={state}
      data-avatar={mode === 'model' ? 'model' : 'illustration'}
      role="img"
      aria-label={mode === 'model' ? GUIDE.modelAlt : GUIDE.illustrationAlt}
    >
      <div className={`absolute inset-0 transition-opacity duration-500 ${mode === 'model' ? 'opacity-0' : 'opacity-100'}`}>
        <StylizedGuide />
      </div>
      {showModel && (
        <div className={`absolute inset-0 transition-opacity duration-500 ${mode === 'model' ? 'opacity-100' : 'opacity-0'}`}>
          <ModelBoundary onError={onError}>
            <Suspense fallback={null}>
              <GuideModel url={GUIDE.modelUrl} state={state} reducedMotion={reducedMotion} onReady={onReady} onError={onError} />
            </Suspense>
          </ModelBoundary>
        </div>
      )}
      {STATE_LABEL[state] && (
        <span aria-hidden="true" className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full border border-sky-400/40 bg-slate-950/90 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-sky-300">
          {STATE_LABEL[state]}
        </span>
      )}
    </div>
  )
}
