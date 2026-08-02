"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Bot, X, Minimize2, Maximize2, Send, Lock } from "lucide-react"
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client"
import { useAuth } from "@/components/auth-provider"

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

// Logged-out visitors get this many prompts. Kept in sync with
// GUEST_PROMPT_LIMIT in supabase/functions/chat/index.ts. The server is the
// real gate — this constant only drives the on-screen counter.
const GUEST_PROMPT_LIMIT = 3
const GUEST_ID_KEY = "ayn_guest_id"

/** Stable per-browser id so the server can count a guest's free prompts. */
function getGuestId(): string {
  if (typeof window === "undefined") return ""
  try {
    let id = window.localStorage.getItem(GUEST_ID_KEY)
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now().toString(16)}-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, (c) => {
              const r = (Math.random() * 16) | 0
              return (c === "x" ? r : (r & 0x3) | 0x8).toString(16)
            })
      window.localStorage.setItem(GUEST_ID_KEY, id)
    }
    return id
  } catch {
    return ""
  }
}

// Escape HTML first so message content can't inject markup/scripts (XSS),
// then apply light formatting (line breaks + simple list bullets).
function formatMessage(raw: string): string {
  const escaped = raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
  return escaped
    .replace(/\n/g, "<br>")
    .replace(/•\s/g, '<li class="ml-4">• ')
    .replace(/(\d+\.\s)/g, '<li class="ml-4">$1')
}

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

  const { user } = useAuth()
  const [guestId, setGuestId] = useState("")
  const [remaining, setRemaining] = useState<number | null>(null)
  const [gateHit, setGateHit] = useState(false)

  // localStorage is only available in the browser, so read it after mount.
  useEffect(() => {
    setGuestId(getGuestId())
  }, [])

  // Signing in lifts the guest limit immediately.
  useEffect(() => {
    if (user) {
      setGateHit(false)
      setRemaining(null)
      setError(null)
    }
  }, [user])

  const isGuest = !user
  const locked = isGuest && gateHit

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || loading || locked) return

    const userMessage: ChatMessage = { role: "user", content: input.trim() }
    const nextMessages = [...messages, userMessage]

    setMessages(nextMessages)
    setInput("")
    setLoading(true)
    setError(null)

    try {
      if (!isSupabaseConfigured) {
        throw new Error("Chat is not configured yet.")
      }

      const supabase = getSupabase()
      // Only the conversation turns are sent; the opening disclaimer is UI-only.
      const history = nextMessages.slice(1)
      const { data, error: fnError } = await supabase.functions.invoke("chat", {
        body: { messages: history, guestId: guestId || getGuestId() },
      })

      if (fnError) {
        // The function's JSON body lives in .context on a non-2xx response.
        let detail = fnError.message
        let code: string | undefined
        const ctx = (fnError as { context?: Response }).context
        try {
          if (ctx && typeof ctx.json === "function") {
            const body = await ctx.json()
            if (body?.error) detail = body.error
            code = body?.code
          }
        } catch {
          /* ignore */
        }
        if (code === "guest_limit") {
          setGateHit(true)
          setRemaining(0)
          setError(null)
          return
        }
        throw new Error(detail)
      }

      if (typeof data?.remaining === "number") setRemaining(data.remaining)

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data?.reply ?? data?.error ?? "I could not generate a response.",
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again."
      setError(msg)
      console.error("chat error:", err)
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
                      Ayn Legal AI assistant (bot, not a lawyer)
                    </p>
                    <div
                      className="prose prose-invert prose-xs max-w-none"
                      dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                    />
                  </>
                ) : (
                  <div
                    className="prose prose-invert prose-xs max-w-none"
                    dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                  />
                )}
              </div>
            ))}
            {error && <div className="text-[10px] text-red-400">{error}</div>}
          </div>

          {locked ? (
            // Guest has used every free prompt -> sign-up wall replaces the input.
            <div className="border-t border-zinc-800 px-4 py-4 space-y-3 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15">
                <Lock className="h-5 w-5 text-emerald-400" />
              </div>
              <p className="text-xs font-semibold text-zinc-100">
                You&apos;ve used your {GUEST_PROMPT_LIMIT} free questions
              </p>
              <p className="text-[11px] text-zinc-400">
                Create a free account to keep chatting with Ayn Legal AI — no limits.
              </p>
              <div className="flex gap-2">
                <Link href="/signup" className="flex-1">
                  <span className="block rounded-lg bg-emerald-500 px-3 py-2 text-xs font-medium text-white hover:bg-emerald-400">
                    Sign up free
                  </span>
                </Link>
                <Link href="/login" className="flex-1">
                  <span className="block rounded-lg border border-zinc-700 px-3 py-2 text-xs font-medium text-zinc-200 hover:bg-zinc-900">
                    Log in
                  </span>
                </Link>
              </div>
            </div>
          ) : (
            <>
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
                  maxLength={2000}
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

              {isGuest && remaining !== null && (
                <p className="px-3 pb-2 text-[10px] text-zinc-500">
                  {remaining} free {remaining === 1 ? "question" : "questions"} left ·{" "}
                  <Link href="/signup" className="text-emerald-400 hover:underline">
                    sign up
                  </Link>{" "}
                  for unlimited
                </p>
              )}
            </>
          )}
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