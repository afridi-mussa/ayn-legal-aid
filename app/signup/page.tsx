"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Check, X, Eye, EyeOff, MailCheck } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { isValidEmail, isValidPassword, passwordRules } from "@/lib/validation"

function fieldClasses(touched: boolean, valid: boolean) {
  if (!touched) return ""
  return valid
    ? "border-emerald-500 focus-visible:ring-emerald-500/40"
    : "border-red-500 focus-visible:ring-red-500/40"
}

export default function SignupPage() {
  const router = useRouter()
  const { signUp, signInWithGoogle, configured } = useAuth()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [emailTouched, setEmailTouched] = useState(false)
  const [pwTouched, setPwTouched] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const emailValid = useMemo(() => isValidEmail(email), [email])
  const pwValid = useMemo(() => isValidPassword(password), [password])
  const formValid = emailValid && pwValid && configured

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!formValid) return
    setLoading(true)
    const { error, needsConfirmation } = await signUp({ email, password, fullName })
    setLoading(false)
    if (error) {
      setError(error)
      return
    }
    if (needsConfirmation) {
      // Email confirmation is required → show the "check your email" popup.
      setConfirmOpen(true)
    } else {
      // Confirmation disabled in Supabase → user is already signed in.
      router.push("/")
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-24 bg-background">
      <Card className="w-full max-w-md border-border">
        <CardHeader className="space-y-1 text-center">
          <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
          <p className="text-sm text-muted-foreground">Join Ayn Legal Aid &amp; Club</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {!configured && (
            <p className="rounded-md bg-amber-500/10 px-3 py-2 text-xs text-amber-500">
              Sign-up is not connected yet (Supabase keys missing).
            </p>
          )}

          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={!configured || loading}
            onClick={() => signInWithGoogle()}
          >
            Continue with Google
          </Button>

          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your name"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                placeholder="you@example.com"
                className={fieldClasses(emailTouched, emailValid)}
                aria-invalid={emailTouched && !emailValid}
              />
              {emailTouched && !emailValid && (
                <p className="text-xs text-red-400">Enter a valid email address.</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setPwTouched(true)}
                  placeholder="Create a password"
                  className={`pr-10 ${fieldClasses(pwTouched, pwValid)}`}
                  aria-invalid={pwTouched && !pwValid}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPw ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              <ul className="space-y-1 pt-1">
                {passwordRules.map((rule) => {
                  const ok = rule.test(password)
                  return (
                    <li
                      key={rule.key}
                      className={`flex items-center gap-2 text-xs ${
                        ok ? "text-emerald-400" : password ? "text-red-400" : "text-muted-foreground"
                      }`}
                    >
                      {ok ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                      {rule.label}
                    </li>
                  )
                })}
              </ul>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <Button
              type="submit"
              className="w-full transition-opacity"
              disabled={!formValid || loading}
            >
              {loading ? "Creating account..." : "Sign up"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>

      {/* Confirmation popup */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader className="items-center">
            <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15">
              <MailCheck className="h-7 w-7 text-emerald-400" />
            </div>
            <DialogTitle className="text-center">Check your email</DialogTitle>
            <DialogDescription className="text-center">
              A confirmation link has been sent to{" "}
              <span className="font-medium text-foreground break-all">{email}</span>.
              Please open it to verify your account. After confirming, you&apos;ll be
              signed in automatically.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button onClick={() => router.push("/login")} className="w-full sm:w-auto">
              Go to login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
