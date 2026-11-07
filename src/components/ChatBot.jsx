import { useCallback, useEffect, useRef, useState } from 'react'
import { SITE } from '../config/site.js'
import { SmartLink } from '../lib/router.jsx'

const API_URL = import.meta.env.VITE_API_URL || ''
const MAX_HISTORY = 20
const MAX_INPUT = 1000

let nextId = 1
const mkId = () => `m${nextId++}`

/**
 * Conversation state + the existing POST /api/chat call.
 * Nothing is persisted: the transcript lives in memory and is gone on reload.
 */
export function useChat(initialMessage) {
  const initial = useRef([{ id: mkId(), role: 'assistant', content: initialMessage }])
  const [messages, setMessages] = useState(initial.current)
  const [isTyping, setIsTyping] = useState(false)
  const messagesRef = useRef(messages)
  messagesRef.current = messages

  /**
   * Build the messages array for the API call:
   * - user/assistant only, excluding local error notices
   * - sliding window (the server enforces the same limit)
   */
  const buildApiMessages = (all) =>
    all
      .filter((m) => (m.role === 'user' || m.role === 'assistant') && m.kind !== 'error')
      .map(({ role, content }) => ({ role, content }))
      .slice(-MAX_HISTORY)

  const send = useCallback(async (text) => {
    const content = text.trim().slice(0, MAX_INPUT)
    if (!content || isTyping) return
    const userMessage = { id: mkId(), role: 'user', content }
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)
    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: buildApiMessages([...messagesRef.current, userMessage]) }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || typeof data.reply !== 'string') {
        const err = new Error(data.error || 'Request failed')
        err.status = res.status
        throw err
      }
      setMessages((prev) => [...prev, { id: mkId(), role: 'assistant', content: data.reply, kind: 'ai' }])
    } catch (err) {
      setMessages((prev) => [...prev, { id: mkId(), role: 'assistant', kind: 'error', status: err.status ?? 0, content: '' }])
    } finally {
      setIsTyping(false)
    }
  }, [isTyping])

  /** Curated answers run locally: no network call, no AI provider. */
  const addGuided = useCallback((label, answer, text) => {
    setMessages((prev) => [
      ...prev,
      { id: mkId(), role: 'user', content: label, kind: 'guided' },
      { id: mkId(), role: 'assistant', content: text, answer, kind: 'guided' },
    ])
  }, [])

  const clear = useCallback(() => setMessages(initial.current), [])

  return { messages, isTyping, send, addGuided, clear }
}

function ErrorNotice({ status }) {
  return (
    <p className="text-sm leading-relaxed">
      {status === 429
        ? 'That’s a lot of questions in a short time. Try again in a few minutes.'
        : 'I couldn’t reach the AI service just now.'}{' '}
      The quick topics above still work, or email Tali at{' '}
      <a className="underline decoration-sky-400/60 underline-offset-2 hover:text-white" href={`mailto:${SITE.contactEmail}`}>
        {SITE.contactEmail}
      </a>.
    </p>
  )
}

function GuidedAnswer({ answer }) {
  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {answer.text.map((t, i) => <p key={i}>{t}</p>)}
      {answer.bullets?.length > 0 && (
        <ul className="space-y-1.5 pl-1">
          {answer.bullets.map((b, i) => (
            <li key={i} className="flex gap-2"><span aria-hidden="true" className="text-sky-400">▸</span><span>{b}</span></li>
          ))}
        </ul>
      )}
      {answer.links?.length > 0 && (
        <ul className="flex flex-wrap gap-2 pt-1" aria-label="Links">
          {answer.links.map((l) => (
            <li key={l.href}>
              <SmartLink href={l.href} className="inline-flex items-center rounded-md border border-sky-400/40 px-2.5 py-1 text-xs font-medium text-sky-300 hover:bg-sky-400/10 hover:text-white">
                {l.label}
              </SmartLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/**
 * Transcript + input. Same UI as the original chat section, now embedded in the guide.
 * `renderMessageActions(message)` lets the guide add per-message controls (Listen/Stop).
 */
const ChatBot = ({ chat, disclosureId, disclosure, onInputActivity, renderMessageActions }) => {
  const { messages, isTyping, send, clear } = chat
  const [input, setInput] = useState('')
  const messagesContainerRef = useRef(null)

  useEffect(() => {
    // Scroll within the messages container only — not the whole page
    const container = messagesContainerRef.current
    if (container) container.scrollTop = container.scrollHeight
  }, [messages, isTyping])

  useEffect(() => { onInputActivity?.({ hasText: input.length > 0 }) }, [input, onInputActivity])

  const handleSend = () => {
    if (!input.trim() || isTyping) return
    send(input)
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleClear = () => {
    clear()
    setInput('')
  }

  return (
    <div>
      {/* Messages Container */}
      <div
        ref={messagesContainerRef}
        role="log"
        aria-live="polite"
        aria-label="Conversation with the AI guide"
        tabIndex={0}
        className="h-64 overflow-y-auto mb-3 space-y-3 p-3 bg-slate-950/60 rounded-lg border border-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
      >
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[88%] px-3.5 py-2.5 rounded-lg ${
                message.role === 'user'
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-800/90 text-slate-100 border border-slate-700'
              }`}
            >
              <span className="sr-only">{message.role === 'user' ? 'You: ' : 'Guide: '}</span>
              {message.kind === 'error' ? (
                <ErrorNotice status={message.status} />
              ) : message.answer ? (
                <GuidedAnswer answer={message.answer} />
              ) : (
                <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
              )}
              {message.role === 'assistant' && renderMessageActions?.(message)}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-800 text-slate-100 border border-slate-700 px-4 py-3 rounded-lg">
              <span className="sr-only">The guide is typing</span>
              <div className="flex space-x-2" aria-hidden="true">
                <div className="w-2 h-2 bg-sky-400 rounded-full motion-safe:animate-bounce"></div>
                <div className="w-2 h-2 bg-sky-400 rounded-full motion-safe:animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-sky-400 rounded-full motion-safe:animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Disclosure, shown before anything is submitted */}
      <p id={disclosureId} className="mb-2 text-xs leading-relaxed text-slate-400">
        {disclosure}
      </p>

      {/* Input Area */}
      <div className="flex gap-2">
        <label htmlFor="guide-input" className="sr-only">Ask the AI guide a question</label>
        <input
          id="guide-input"
          type="text"
          value={input}
          maxLength={MAX_INPUT}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => onInputActivity?.({ focused: true })}
          onBlur={() => onInputActivity?.({ focused: false })}
          aria-describedby={disclosureId}
          placeholder="Ask about projects, apps, skills…"
          className="min-w-0 flex-1 px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-400 focus-visible:ring-2 focus-visible:ring-sky-400/40"
        />
        <button
          type="button"
          onClick={handleClear}
          disabled={isTyping || messages.length <= 1}
          aria-label="Clear conversation"
          title="Clear conversation"
          className="px-3 py-2.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg hover:text-white hover:border-slate-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
        <button
          type="button"
          onClick={handleSend}
          disabled={isTyping || !input.trim()}
          className="px-4 py-2.5 bg-sky-500 text-slate-950 rounded-lg font-semibold hover:bg-sky-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatBot
