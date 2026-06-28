// ============================================================
// Supabase Edge Function: chat
// Securely relays chat requests to Groq. The Groq API key is read
// from the GROQ_API_KEY secret (set in the Supabase dashboard) and
// never reaches the browser.
//
// Deploy: Supabase Dashboard > Edge Functions > Deploy a new function
//         > Via Editor > name it "chat" > paste this file > Deploy.
// Then:   turn OFF "Verify JWT" for this function (guests use it),
//         and add the GROQ_API_KEY secret under Edge Functions > Secrets.
// ============================================================

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

const SYSTEM_PROMPT =
  "You are the Ayn Legal AI assistant, a chatbot — not a lawyer. " +
  "Make clear you are a bot and do not provide formal legal advice. " +
  "Give general legal information and guidance in clear, simple language based on " +
  "established laws and regulations. If the user asks how to contact a lawyer, give " +
  "these details: Name: Syed Shahzaib Bukhari, Phone: +92 339 3383379, " +
  "Email: aynlegalaid.club@gmail.com, and point them to the Contact section of the website."

const CONTACT_REPLY =
  "Lawyer contact details:\n" +
  "Name: Syed Shahzaib Bukhari\n" +
  "Phone: +92 339 3383379\n" +
  "Email: aynlegalaid.club@gmail.com\n" +
  "For appointments or detailed legal advice, please use these details or the Contact section on our website."

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  })
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders })
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405)

  try {
    const body = await req.json()
    const messages = body?.messages

    if (!Array.isArray(messages) || messages.length === 0) {
      return json({ error: "Invalid request body" }, 400)
    }

    // Fast path: contact questions answered without an AI call.
    const last = messages[messages.length - 1]
    const lastContent = typeof last?.content === "string" ? last.content.toLowerCase() : ""
    if (["contact", "phone", "call", "email", "number"].some((k) => lastContent.includes(k))) {
      return json({ reply: CONTACT_REPLY })
    }

    const apiKey = Deno.env.get("GROQ_API_KEY")
    if (!apiKey) return json({ error: "Server is not configured (missing GROQ_API_KEY)." }, 500)

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        temperature: 0.3,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
    })

    const data = await groqRes.json()
    if (!groqRes.ok) {
      return json({ error: data?.error?.message ?? "Upstream error" }, 502)
    }

    const reply = data?.choices?.[0]?.message?.content ?? "I could not generate a response."
    return json({ reply })
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Something went wrong" }, 500)
  }
})
