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
