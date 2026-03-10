import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ChatWidget } from "@/components/chat-widget"
// import { WebinarModal } from "@/components/webinar-modal"
import "./globals.css"

export const metadata: Metadata = {
  title: "Ayn Legal Aid & Club - Justice for All",
  description:
    "Professional legal services, non-profit advocacy, and university club network across Pakistan. Join our ambassador program and make a difference.",
  generator: "v0.app",
  keywords: "legal aid, Pakistan, law firm, non-profit, university club, ambassador program, justice",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        {/* <WebinarModal /> */}
        <Analytics />
        <ChatWidget />
      </body>
    </html>
  )
}
