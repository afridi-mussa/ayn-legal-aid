"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Check, X, Eye, EyeOff, ShieldCheck, Loader2 } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { isValidPassword, passwordRules } from "@/lib/validation"

function fieldClasses(touched: boolean, valid: boolean) {
  if (!touched) return ""
  return valid
    ? "border-emerald-500 focus-visible:ring-emerald-500/40"
    : "border-red-500 focus-visible:ring-red-500/40"
}

export default function ResetPasswordPage() {
  const router = useRouter()
  const { user, loading, updatePassword, signOut, configured } = useAuth()

  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [pwTouched, setPwTouched] = useState(false)
  const [confirmTouched, setConfirmTouched] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)

  const pwValid = useMemo(() => isValidPassword(password), [password])
  const matches = confirm.length > 0 && confirm === password
  const formValid = pwValid && matches && configured

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!formValid) return
    setSaving(true)
    const { error } = await updatePassword(password)
    if (error) {
      setSaving(false)
      setError(error)
      return
    }
    // Sign out so the user logs in fresh with their new password.
    await signOut()
    setSaving(false)
    setDone(true)
    setTimeout(() => router.push("/login"), 2200)
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-24 bg-background">
      <Card className="w-full max-w-md border-border">
        <CardHeader className="space-y-1 text-center">
          <h1 className="text-2xl font-bold text-foreground">Set a new password</h1>
          <p className="text-sm text-muted-foreground">Choose a strong new password.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Loading state while the recovery session is read from the link */}
          {loading ? (
            <div className="flex justify-center py-6">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : done ? (
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15">
                <ShieldCheck className="h-7 w-7 text-emerald-400" />
              </div>
              <p className="text-sm text-foreground">
                Your password has been updated. Redirecting you to login...
              </p>
            </div>
          ) : !user ? (
            // No valid recovery session → link missing/expired
            <div className="space-y-4 text-center">
              <p className="text-sm text-red-400">
                This password reset link is invalid or has expired.
              </p>
              <Link href="/forgot-password">
                <Button className="w-full">Request a new link</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="space-y-2">
                <Label htmlFor="password">New password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPw ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setPwTouched(true)}
                    placeholder="New password"
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

              <div className="space-y-1.5">
                <Label htmlFor="confirm">Confirm new password</Label>
                <Input
                  id="confirm"
                  type={showPw ? "text" : "password"}
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  onBlur={() => setConfirmTouched(true)}
                  placeholder="Re-enter new password"
                  className={fieldClasses(confirmTouched, matches)}
                  aria-invalid={confirmTouched && !matches}
                />
                {confirmTouched && !matches && (
                  <p className="text-xs text-red-400">Passwords do not match.</p>
                )}
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <Button type="submit" className="w-full" disabled={!formValid || saving}>
                {saving ? "Updating..." : "Update password"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
