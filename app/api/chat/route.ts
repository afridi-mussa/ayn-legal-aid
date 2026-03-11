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

export async function POST() {
  return NextResponse.json({ reply: "test reply" })
}
