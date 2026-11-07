/**
 * AI guide settings. Owner-editable. Browser-only (not imported by the build config).
 *
 * 3D model (optional):
 *   1. Export a .glb (glTF binary). Keep it small: under ~3 MB, ideally Draco-free.
 *      Optional animation clips named "idle", "listening", "speaking" are played
 *      for each state; without clips the model gets a gentle procedural motion.
 *   2. Put it in public/guide/, e.g. public/guide/tali-guide.glb
 *   3. Set modelUrl below to '/guide/tali-guide.glb' (or build with
 *      VITE_GUIDE_MODEL_URL=/guide/tali-guide.glb). Same-origin paths only.
 *   4. npm run build. If the file is missing, WebGL is unavailable, or loading fails,
 *      the stylized illustration is shown instead.
 */
export const GUIDE = {
  name: 'Tali’s AI guide',
  // Shown next to the guide everywhere it appears.
  disclosure: 'An AI guide based on Tali’s public portfolio. Not Tali in real time.',

  modelUrl: import.meta.env.VITE_GUIDE_MODEL_URL || '',
  modelAlt: '3D model of Tali’s AI guide',
  illustrationAlt: 'Stylized illustration of Tali’s AI guide wearing a headset',

  // Colors for the stylized illustration.
  appearance: {
    skin: '#5c3a24',
    skinShade: '#4a2e1c',
    hair: '#171310',
    top: '#1e293b',
    accent: '#38bdf8',
  },
}

/** Same-origin .glb/.gltf path only (no protocol-relative or absolute URLs). */
export const isSameOriginModelUrl = (url) => typeof url === 'string' && /^\/(?!\/)[^?#\s]+\.(?:glb|gltf)$/i.test(url)

export function webglAvailable() {
  try {
    if (!window.WebGLRenderingContext) return false
    const c = document.createElement('canvas')
    const gl = c.getContext('webgl2') || c.getContext('webgl')
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
    return Boolean(gl)
  } catch {
    return false
  }
}
