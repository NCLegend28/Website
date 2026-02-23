import { useState, useRef, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || ''
const MAX_HISTORY = 20

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: "Hello! I'm Tali's portfolio assistant. Ask me anything about his projects, experience, or technical skills.",
}

const ChatBot = () => {
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const messagesContainerRef = useRef(null)

  useEffect(() => {
    // Scroll within the messages container only — not the whole page
    const container = messagesContainerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [messages, isTyping])

  /**
   * Build the messages array for the API call:
   * - Filter to user/assistant only (no system messages)
   * - Apply sliding window
   */
  const buildApiMessages = (allMessages) => {
    const conversational = allMessages.filter(
      (m) => m.role === 'user' || m.role === 'assistant'
    )
    return conversational.slice(-MAX_HISTORY)
  }

  const handleSend = async () => {
    if (!input.trim() || isTyping) return

    const userMessage = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      const apiMessages = buildApiMessages([...messages, userMessage])

      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Request failed')
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I'm having trouble connecting right now. Try asking about Tali's projects, skills, or experience — or reach him at mosley.tali@gmail.com.",
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleClear = () => {
    setMessages([INITIAL_MESSAGE])
    setInput('')
  }

  return (
    <section id="chat" className="section-container bg-slate-900/30">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
          Chat With Tali
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-biotech-blue to-tech-purple mx-auto mb-8"></div>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Ask me anything about my projects, experience, or skills
        </p>
      </div>

      {/* Chat Interface */}
      <div className="max-w-4xl mx-auto">
        <div className="card-glow">
          {/* Avatar Section */}
          <div className="mb-8 p-8 bg-slate-800/50 rounded-lg text-center border-2 border-dashed border-slate-700">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-biotech-blue to-tech-purple flex items-center justify-center">
              <span className="text-6xl">&#x1F468;&#x1F3FF;&#x200D;&#x1F4BB;</span>
            </div>
            <p className="text-slate-400 text-sm">
              Future Avatar Space: 3D interactive Tali with voice-to-voice
              communication
            </p>
          </div>

          {/* Messages Container */}
          <div ref={messagesContainerRef} className="h-96 overflow-y-auto mb-4 space-y-4 p-4 bg-slate-950/50 rounded-lg">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-biotech-blue to-tech-purple text-white'
                      : 'bg-slate-800 text-slate-100 border border-slate-700'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800 text-slate-100 border border-slate-700 p-4 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-biotech-blue rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-biotech-blue rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-biotech-blue rounded-full animate-bounce"
                      style={{ animationDelay: '0.4s' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              placeholder="Ask about projects, experience, skills..."
              className="flex-1 px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-biotech-blue transition-colors disabled:opacity-50"
            />
            <button
              onClick={handleClear}
              disabled={isTyping || messages.length <= 1}
              title="Clear conversation"
              className="px-3 py-3 bg-slate-800 border border-slate-700 text-slate-400 rounded-lg hover:text-slate-100 hover:border-slate-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <button
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-biotech-blue to-tech-purple text-white rounded-lg font-medium hover:shadow-lg hover:shadow-biotech-blue/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChatBot
