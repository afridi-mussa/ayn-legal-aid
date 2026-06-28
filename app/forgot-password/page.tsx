"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { MailCheck, ArrowLeft } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { isValidEmail } from "@/lib/validation"

function fieldClasses(touched: boolean, valid: boolean) {
  if (!touched) return ""
  return valid
    ? "border-emerald-500 focus-visible:ring-emerald-500/40"
    : "border-red-500 focus-visible:ring-red-500/40"
}

export default function ForgotPasswordPage() {
  const { resetPassword, configured } = useAuth()
  const [email, setEmail] = useState("")
  const [touched, setTouched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  const emailValid = useMemo(() => isValidEmail(email), [email])
  const formValid = emailValid && configured

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!formValid) return
    setLoading(true)
    const { error } = await resetPassword(email)
    setLoading(false)
    if (error) {
      setError(error)
      return
    }
    // Secure generic confirmation — we don't reveal whether the email exists.
    setSent(true)
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-24 bg-background">
      <Card className="w-full max-w-md border-border">
        <CardHeader className="space-y-1 text-center">
          <h1 className="text-2xl font-bold text-foreground">Reset your password</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and we&apos;ll send you a reset link.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {!configured && (
            <p className="rounded-md bg-amber-500/10 px-3 py-2 text-xs text-amber-500">
              Password reset is not connected yet (Supabase keys missing).
            </p>
          )}

          {sent ? (
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15">
                <MailCheck className="h-7 w-7 text-emerald-400" />
              </div>
              <p className="text-sm text-foreground">
                If an account exists for{" "}
                <span className="font-medium break-all">{email}</span>, a password reset
                link has been sent. Please check your inbox (and spam folder).
              </p>
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back to login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(true)}
                  placeholder="you@example.com"
                  className={fieldClasses(touched, emailValid)}
                  aria-invalid={touched && !emailValid}
                />
                {touched && !emailValid && (
                  <p className="text-xs text-red-400">Enter a valid email address.</p>
                )}
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <Button type="submit" className="w-full" disabled={!formValid || loading}>
                {loading ? "Sending..." : "Send reset link"}
              </Button>

              <Link href="/login" className="block text-center text-sm text-primary hover:underline">
                Back to login
              </Link>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
