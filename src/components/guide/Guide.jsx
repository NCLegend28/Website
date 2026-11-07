import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ChatBot, { useChat } from '../ChatBot.jsx'
import GuideAvatar from './GuideAvatar.jsx'
import { useNarration } from './useNarration.js'
import { GUIDE } from '../../config/guide.js'
import { SITE } from '../../config/site.js'
import { guideTopics, answerToText } from '../../lib/guideKnowledge.js'
import { useReducedMotion } from '../../lib/hooks.js'

const GREETING =
  'Hi! I’m Tali’s AI guide. Pick a topic for a quick tour, or type your own question about his projects, apps, or experience.'

/**
 * The home page host: a stylized (or owner-provided 3D) guide, curated topics that
 * work offline, and the existing chat for open-ended questions.
 */
export default function Guide() {
  const chat = useChat(GREETING)
  const narration = useNarration()
  const reducedMotion = useReducedMotion()
  const [input, setInput] = useState({ focused: false, hasText: false })
  const [talking, setTalking] = useState(false)
  const lastAssistant = useRef(chat.messages.at(-1)?.id)

  // Brief "speaking" animation when a new answer appears (visual only, no audio).
  useEffect(() => {
    const last = [...chat.messages].reverse().find((m) => m.role === 'assistant')
    if (!last || last.id === lastAssistant.current) return undefined
    lastAssistant.current = last.id
    const words = (last.content || '').split(/\s+/).length
    setTalking(true)
    const t = setTimeout(() => setTalking(false), Math.min(3200, 600 + words * 60))
    return () => clearTimeout(t)
  }, [chat.messages])

  const state = narration.speakingId || talking
    ? 'speaking'
    : chat.isTyping
      ? 'thinking'
      : input.focused || input.hasText
        ? 'listening'
        : 'idle'

  const onInputActivity = useCallback((patch) => setInput((s) => ({ ...s, ...patch })), [])

  const askTopic = (topic) => {
    narration.stop()
    const answer = topic.answer()
    chat.addGuided(topic.label, answer, answerToText(answer))
  }

  const renderMessageActions = useMemo(() => {
    if (!narration.available) return undefined
    return (message) => {
      if (!message.content || message.kind === 'error') return null
      const speaking = narration.speakingId === message.id
      return (
        <button
          type="button"
          onClick={() => (speaking ? narration.stop() : narration.speak(message.id, message.content))}
          className="mt-2 inline-flex items-center gap-1.5 rounded border border-slate-600 px-2 py-0.5 text-xs text-slate-300 hover:border-sky-400 hover:text-white"
          aria-label={speaking ? 'Stop reading aloud' : 'Listen to this answer'}
        >
          <span aria-hidden="true">{speaking ? '■' : '▶'}</span>
          {speaking ? 'Stop' : 'Listen'}
        </button>
      )
    }
  }, [narration])

  return (
    <section id="guide" aria-labelledby="guide-title" className="card-glow !p-5 md:!p-6 scroll-mt-24">
      <div className="flex items-center gap-4">
        <div className="w-32 shrink-0 sm:w-44">
          <GuideAvatar state={state} reducedMotion={reducedMotion} />
        </div>
        <div className="min-w-0">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-sky-300">Host · AI</p>
          <h2 id="guide-title" className="text-xl font-semibold text-white sm:text-2xl">{GUIDE.name}</h2>
          <p className="mt-1 text-sm leading-snug text-slate-400">{GUIDE.disclosure}</p>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="mb-2 text-sm font-medium text-slate-300" id="guide-topics-label">Quick tour <span className="font-normal text-slate-500">· works offline</span></h3>
        <ul className="flex flex-wrap gap-2" aria-labelledby="guide-topics-label">
          {guideTopics.map((topic) => (
            <li key={topic.id}>
              <button
                type="button"
                onClick={() => askTopic(topic)}
                className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-sm text-slate-200 transition-colors hover:border-sky-400 hover:text-white"
              >
                {topic.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <ChatBot
          chat={chat}
          disclosureId="guide-ai-disclosure"
          disclosure={`Typed questions are sent to ${SITE.chatProvider}, an external AI provider, to write a reply. This site doesn’t save chat transcripts. Please don’t include personal information.`}
          onInputActivity={onInputActivity}
          renderMessageActions={renderMessageActions}
        />
      </div>
    </section>
  )
}
