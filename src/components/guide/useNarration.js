import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Optional "Listen" narration with the browser's speech synthesis.
 * Only voices that run on the device (voice.localService) are used, so narrated
 * text is not sent to a cloud speech service. If none exist, Listen is hidden.
 */
export function useNarration() {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window
  const [voice, setVoice] = useState(null)
  const [speakingId, setSpeakingId] = useState(null)
  const utterRef = useRef(null)

  useEffect(() => {
    if (!supported) return undefined
    const synth = window.speechSynthesis
    const pick = () => {
      const local = synth.getVoices().filter((v) => v.localService && /^en(?:[-_]|$)/i.test(v.lang))
      setVoice(local.find((v) => v.default) ?? local.find((v) => /en[-_]US/i.test(v.lang)) ?? local[0] ?? null)
    }
    pick()
    synth.addEventListener?.('voiceschanged', pick)
    return () => {
      synth.removeEventListener?.('voiceschanged', pick)
      synth.cancel()
    }
  }, [supported])

  const stop = useCallback(() => {
    if (!supported) return
    utterRef.current = null
    window.speechSynthesis.cancel()
    setSpeakingId(null)
  }, [supported])

  const speak = useCallback((id, text) => {
    if (!supported || !voice) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text.replace(/•/g, ''))
    u.voice = voice
    u.lang = voice.lang
    u.rate = 1
    const done = () => { if (utterRef.current === u) { utterRef.current = null; setSpeakingId(null) } }
    u.onend = done
    u.onerror = done
    utterRef.current = u
    setSpeakingId(id)
    window.speechSynthesis.speak(u)
  }, [supported, voice])

  return { available: supported && Boolean(voice), speakingId, speak, stop }
}
