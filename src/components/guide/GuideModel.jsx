/**
 * Renders an owner-provided same-origin .glb/.gltf. Loaded lazily (this module and
 * three.js are a separate chunk, fetched only when a model is configured and WebGL works).
 * Calls onError on any failure so the parent can fall back to the illustration.
 */
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const CLIP_MATCH = {
  idle: /idle|breath/i,
  listening: /listen|attent/i,
  thinking: /think|listen/i,
  speaking: /speak|talk/i,
}

export default function GuideModel({ url, state, reducedMotion, onReady, onError }) {
  const mountRef = useRef(null)
  const stateRef = useRef(state)
  const api = useRef(null)
  stateRef.current = state

  useEffect(() => {
    const mount = mountRef.current
    let disposed = false
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
    } catch (err) {
      onError?.(err)
      return undefined
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.domElement.setAttribute('aria-hidden', 'true')
    renderer.domElement.className = 'h-full w-full'
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(30, 1, 0.01, 100)
    scene.add(new THREE.HemisphereLight(0xdbeafe, 0x0f172a, 1.6))
    const key = new THREE.DirectionalLight(0xffffff, 1.8)
    key.position.set(1.5, 2, 2.5)
    scene.add(key)

    const timer = new THREE.Timer()
    let root = null
    let mixer = null
    let actions = {}
    let current = null
    let frame = 0
    let visible = true

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderOnce()
    }
    const renderOnce = () => renderer.render(scene, camera)

    const pickClip = (s) => {
      const names = Object.keys(actions)
      return names.find((n) => CLIP_MATCH[s]?.test(n)) || names.find((n) => CLIP_MATCH.idle.test(n)) || names[0]
    }
    const applyState = () => {
      if (!mixer) return
      const next = actions[pickClip(stateRef.current)]
      if (next && next !== current) {
        next.reset().fadeIn(0.3).play()
        current?.fadeOut(0.3)
        current = next
      }
    }

    const tick = () => {
      frame = 0
      if (disposed || !root) return
      timer.update()
      const dt = timer.getDelta()
      const t = timer.getElapsed()
      if (mixer) {
        applyState()
        mixer.update(dt)
      } else {
        // Procedural motion when the model has no animation clips.
        const s = stateRef.current
        root.rotation.y = Math.sin(t * 0.6) * 0.12 + (s === 'listening' || s === 'thinking' ? 0.18 : 0)
        root.position.y = root.userData.baseY + Math.sin(t * (s === 'speaking' ? 9 : 1.4)) * (s === 'speaking' ? 0.006 : 0.012)
      }
      renderOnce()
      if (visible && !document.hidden) frame = requestAnimationFrame(tick)
    }
    const start = () => {
      if (!frame && !disposed && root && !reducedMotion) {
        timer.update()
        frame = requestAnimationFrame(tick)
      }
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
    })
    io.observe(mount)
    const onVisibility = () => { if (!document.hidden) start() }
    document.addEventListener('visibilitychange', onVisibility)
    const ro = new ResizeObserver(resize)
    ro.observe(mount)

    new GLTFLoader().load(
      url,
      (gltf) => {
        if (disposed) return
        root = gltf.scene
        // Frame the model: fit its bounding sphere in view, slightly from above.
        const box = new THREE.Box3().setFromObject(root)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3()).length() || 1
        root.position.sub(center)
        root.userData.baseY = root.position.y
        scene.add(root)
        const dist = (size * 0.5) / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
        camera.position.set(0, size * 0.08, dist * 1.05)
        camera.near = dist / 100
        camera.far = dist * 10
        camera.lookAt(0, 0, 0)
        camera.updateProjectionMatrix()

        if (gltf.animations?.length) {
          mixer = new THREE.AnimationMixer(root)
          actions = Object.fromEntries(gltf.animations.map((clip) => [clip.name || 'clip', mixer.clipAction(clip)]))
          applyState()
          mixer.update(0)
        }
        resize()
        onReady?.()
        start()
      },
      undefined,
      (err) => { if (!disposed) onError?.(err) },
    )

    renderer.domElement.addEventListener('webglcontextlost', (e) => { e.preventDefault(); onError?.(new Error('WebGL context lost')) })

    api.current = { start, renderOnce }
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      mixer?.stopAllAction()
      timer.dispose?.()
      scene.traverse((o) => {
        o.geometry?.dispose?.()
        const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : []
        mats.forEach((m) => { Object.values(m).forEach((v) => v?.isTexture && v.dispose()); m.dispose?.() })
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [url, reducedMotion, onReady, onError])

  // State changes: restart the loop, or draw one frame when motion is reduced.
  useEffect(() => {
    if (reducedMotion) api.current?.renderOnce()
    else api.current?.start()
  }, [state, reducedMotion])

  return <div ref={mountRef} className="h-full w-full" data-testid="guide-model" />
}
