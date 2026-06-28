"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
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

export default function LoginPage() {
  const router = useRouter()
  const { signIn, signInWithGoogle, configured } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [emailTouched, setEmailTouched] = useState(false)
  const [pwTouched, setPwTouched] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const emailValid = useMemo(() => isValidEmail(email), [email])
  const pwValid = password.length > 0
  const formValid = emailValid && pwValid && configured

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!formValid) return
    setLoading(true)
    const { error } = await signIn({ email, password })
    setLoading(false)
    if (error) {
      setError(error)
      return
    }
    router.push("/")
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-24 bg-background">
      <Card className="w-full max-w-md border-border">
        <CardHeader className="space-y-1 text-center">
          <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Log in to your Ayn Legal account</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {!configured && (
            <p className="rounded-md bg-amber-500/10 px-3 py-2 text-xs text-amber-500">
              Login is not connected yet (Supabase keys missing).
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

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setPwTouched(true)}
                  placeholder="Your password"
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
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <Button type="submit" className="w-full transition-opacity" disabled={!formValid || loading}>
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Not registered yet?{" "}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Create an account
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
