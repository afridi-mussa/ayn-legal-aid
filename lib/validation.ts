// Shared form validation for auth screens.

export const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

export function isValidEmail(email: string): boolean {
  return emailRegex.test(email.trim())
}

export type PasswordRule = {
  key: string
  label: string
  test: (pw: string) => boolean
}

export const passwordRules: PasswordRule[] = [
  { key: "len", label: "At least 8 characters", test: (pw) => pw.length >= 8 },
  { key: "alpha", label: "Contains a letter (a–z)", test: (pw) => /[A-Za-z]/.test(pw) },
  { key: "num", label: "Contains a number (0–9)", test: (pw) => /[0-9]/.test(pw) },
]

export function isValidPassword(pw: string): boolean {
  return passwordRules.every((r) => r.test(pw))
}

// Usernames are unique case-insensitively (see the profiles_username_lower_key
// index). Keep the character set tight so names stay URL- and display-safe.
export const USERNAME_MIN = 3
export const USERNAME_MAX = 32
const usernameRegex = /^[a-zA-Z0-9._]+$/

export function usernameError(name: string): string | null {
  const v = name.trim()
  if (v.length === 0) return null // empty just means "no username set"
  if (v.length < USERNAME_MIN) return `At least ${USERNAME_MIN} characters.`
  if (v.length > USERNAME_MAX) return `At most ${USERNAME_MAX} characters.`
  if (!usernameRegex.test(v)) return "Letters, numbers, dots and underscores only."
  return null
}

export function isValidUsername(name: string): boolean {
  return usernameError(name) === null
}
