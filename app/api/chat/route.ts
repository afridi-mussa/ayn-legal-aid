import Groq from "groq-sdk"
import { NextResponse } from "next/server"

const apiKey = process.env.GROQ_API_KEY
const client = apiKey ? new Groq({ apiKey }) : null

const LAWYER_CONTACT_INFO =
  "Lawyer contact details:\n" +
  "Name: Syed Shahzaib Bukhari\n" +
  "Phone: +92 339 3383379\n" +
  "Email: aynlegalaid.club@gmail.com\n" +
  "For appointments or detailed legal advice, please use these contact details or the Contact section on our website."

export async function POST(request: Request) {
  try {
    if (!apiKey || !client) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not set on the server." },
        { status: 500 },
      )
    }
    const body = await request.json()
    const messages = body?.messages

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const lastMessage = messages[messages.length - 1]
    const lastContent = typeof lastMessage?.content === "string" ? lastMessage.content.toLowerCase() : ""

    if (
      lastContent.includes("contact") ||
      lastContent.includes("phone") ||
      lastContent.includes("call") ||
      lastContent.includes("email") ||
      lastContent.includes("number")
    ) {
      const reply =
        LAWYER_CONTACT_INFO +
        "\n\nI am an AI assistant (not a lawyer). Please reach out directly to Syed Shahzaib Bukhari for real legal advice."

      return NextResponse.json({ reply })
    }

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are the Ayn Legal AI assistant (a chatbot), not a lawyer. Always clearly state that you are a bot and do NOT provide formal legal advice. Provide only general legal information and guidance in simple language. If the user asks how to contact a lawyer, you MUST answer with these exact contact details: Lawyer contact details: Name: Syed Shahzaib Bukhari. Phone: +92 339 3383379. Email: aynlegalaid.club@gmail.com. Also remind them to use the Contact section on the website for appointments.",
        },
        ...messages,
      ],
      temperature: 0.3,
    })

    const reply = completion.choices[0]?.message?.content ?? "I could not generate a response."

    return NextResponse.json({ reply })
  } catch (error) {
    console.error("/api/chat error", error)
    const message =
      typeof error === "object" && error !== null && "message" in error
        ? String((error as any).message)
        : "Something went wrong"

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
