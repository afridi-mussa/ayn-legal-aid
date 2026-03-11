"use client"

import { useEffect, useRef, useState } from "react"
import { MessageCircle, X } from "lucide-react"
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
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "I am the Ayn Legal AI assistant (not a lawyer). I can share general legal information. For real legal advice, please contact our lawyers through the Contact section on this website.",
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
              "You are the Ayn Legal AI assistant (a chatbot), not a lawyer. Always clearly state that you are a bot and do NOT provide formal legal advice. Provide only general legal information and guidance in simple language. If the user asks how to contact a lawyer, you MUST answer with these exact contact details: Lawyer contact details: Name: Syed Shahzaib Bukhari. Phone: +92 339 3383379. Email: aynlegalaid.club@gmail.com. Also remind them to use the Contact section on the website for appointments.",
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
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="w-80 sm:w-96 rounded-xl border border-zinc-800 bg-zinc-950/95 text-zinc-50 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
            <div>
              <p className="text-sm font-semibold">Ask Ayn Legal</p>
              <p className="text-xs text-zinc-400">
                Chat with our assistant about services and support.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-zinc-800/80 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div
            ref={messagesContainerRef}
            className="flex flex-col gap-3 px-4 py-3 text-xs max-h-72 overflow-y-auto"
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
                {message.role === "assistant" ? (
                  <>
                    <p className="mb-1 text-[10px] font-semibold text-emerald-300">
                      Ayn Legal AI assistant (bot, not a lawyer)
                    </p>
                    <p>{message.content}</p>
                  </>
                ) : (
                  <p>{message.content}</p>
                )}
              </div>
            ))}
            {error && <div className="text-[10px] text-red-400">{error}</div>}
          </div>
          <form
            onSubmit={handleSend}
            className="border-t border-zinc-800 px-3 py-2"
          >
            <input
              type="text"
              placeholder={
                loading ? "Waiting for response..." : "Type your message..."
              }
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs outline-none focus:border-zinc-500 disabled:opacity-60"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  )
}