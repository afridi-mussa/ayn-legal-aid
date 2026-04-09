"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, X, Minimize2, Maximize2, Send } from "lucide-react"
import Groq from "groq-sdk"

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY
const client = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY!,
  dangerouslyAllowBrowser: true,
})

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        `This AI tool is not a lawyer and provides only general information and educational insights about legal concepts.
                It is not legal advice. For personalized guidance or representation, contact Ayn Legal Aid & Club.
                Feel free to contact us⚖️`,
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesContainerRef = useRef<HTMLDivElement | null>(null)

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage: ChatMessage = { role: "user", content: input.trim() }
    const nextMessages = [...messages, userMessage]

    setMessages(nextMessages)
    setInput("")
    setLoading(true)
    setError(null)

    try {
      const completion = await client.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are Insaf Legal AI. Respond professionally like a lawyer, addressing queries and questions with legal precision. Provide only factual legal information based on established laws and regulations. Do not give opinions or general advice - stick to legal principles and statutes.",
          },
          ...nextMessages,
        ],
        temperature: 0.3,
      })

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content:
          completion.choices[0]?.message?.content ??
          "I could not generate a response.",
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      setError("Something went wrong. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const el = messagesContainerRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [messages, open])

  return (
    <div className={`fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 ${isFullscreen ? 'inset-0' : ''}`}>
      {open && !minimized && (
        <div className={`rounded-xl border border-zinc-800 bg-zinc-950/95 text-zinc-50 shadow-2xl backdrop-blur-md ${isFullscreen ? 'w-full h-full flex flex-col' : 'w-80 sm:w-96'}`}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
            <div>
              <p className="text-sm font-semibold">Ask Ayn Legal</p>
              <p className="text-xs text-zinc-400">
                Chat with our assistant about services and support.
              </p>
            </div>
            <div className="flex items-center gap-1">
              {/*{!isFullscreen && (
                <button
                  type="button"
                  onClick={() => setMinimized(true)}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-zinc-800/80 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                  aria-label="Minimize chat"
                >
                  <Minimize2 className="h-4 w-4" />
                </button>
              )}*/}
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-zinc-800/80 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                aria-label={isFullscreen ? "Exit fullscreen" : "Maximize chat"}
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  setMinimized(false)
                  setIsFullscreen(false)
                }}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-zinc-800/80 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div
            ref={messagesContainerRef}
            className={`flex flex-col gap-3 px-4 py-3 text-xs overflow-y-auto ${isFullscreen ? 'flex-1' : 'max-h-72'}`}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  "max-w-[85%] rounded-lg px-3 py-2 " +
                  (message.role === "assistant"
                    ? "self-start bg-zinc-900/80"
                    : "self-end bg-emerald-600 text-white")
                }
              >
                {message.role === "assistant" && index === 0 ? (
                  <>
                    <p className="mb-1 text-[10px] font-semibold text-emerald-300">
                      Insaf Legal AI assistant (bot, not a lawyer)
                    </p>
                    <div
                      className="prose prose-invert prose-xs max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: message.content
                          .replace(/\n/g, '<br>')
                          .replace(/•\s/g, '<li>• ')
                          .replace(/(\d+\.\s)/g, '<li>$1')
                          .replace(/<li>/g, '<li class="ml-4">')
                      }}
                    />
                  </>
                ) : (
                  <div
                    className="prose prose-invert prose-xs max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: message.content
                        .replace(/\n/g, '<br>')
                        .replace(/•\s/g, '<li>• ')
                        .replace(/(\d+\.\s)/g, '<li>$1')
                        .replace(/<li>/g, '<li class="ml-4">')
                    }}
                  />
                )}
              </div>
            ))}
            {error && <div className="text-[10px] text-red-400">{error}</div>}
          </div>
          <form
            onSubmit={handleSend}
            className="border-t border-zinc-800 px-3 py-2 flex gap-2"
          >
            <input
              type="text"
              placeholder={
                loading ? "Waiting for response..." : "Type your message..."
              }
              className="flex-1 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs outline-none focus:border-zinc-500 disabled:opacity-60"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {open && minimized && (
        <div className="w-80 sm:w-96 rounded-xl border border-zinc-800 bg-zinc-950/95 text-zinc-50 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm font-semibold">Ask Ayn Legal</p>
              <p className="text-xs text-zinc-400">Chat minimized</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMinimized(false)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-zinc-800/80 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                aria-label="Restore chat"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  setMinimized(false)
                  setIsFullscreen(false)
                }}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-zinc-800/80 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ UPDATED BUTTON (FROM CODE 2 STYLE) */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative h-20 w-20 rounded-full bg-black flex items-center justify-center shadow-xl shadow-black/50 focus:outline-none"
          aria-label="Open chat"
        >
          {/* Glow pulse */}
          <span className="absolute inset-0 rounded-full bg-white/20 animate-[pulse_2s_infinite]" />

          {/* Ring animation */}
          <span className="absolute inset-0 rounded-full border border-green-400 animate-[ping_2s_infinite]" />

          {/* Bot Icon */}
          <span className="relative z-10">
            <Bot size={40} className="text-white animate-[bounce_1.2s_infinite]" />
          </span>

          {/* Lightning effects */}
          <span className="absolute top-0 left-1/2 w-1 h-6 bg-green-400 rounded animate-[flash_1s_infinite]" />
          <span className="absolute bottom-0 right-1/2 w-1 h-6 bg-green-300 rounded animate-[flash_1.2s_infinite]" />
        </button>
      )}
    </div>
  )
}