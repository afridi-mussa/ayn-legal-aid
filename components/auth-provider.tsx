"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client"

export type Profile = {
  id: string
  email: string | null
  full_name: string | null
  username: string | null
  avatar_url: string | null
  plan: string
  created_at: string
}

type AuthContextValue = {
  user: User | null
  session: Session | null
  profile: Profile | null
  loading: boolean
  configured: boolean
  signUp: (params: { email: string; password: string; fullName?: string }) => Promise<{ error: string | null; needsConfirmation: boolean }>
  signIn: (params: { email: string; password: string }) => Promise<{ error: string | null }>
  signInWithGoogle: () => Promise<{ error: string | null }>
  resetPassword: (email: string) => Promise<{ error: string | null }>
  updatePassword: (password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
  updateUsername: (username: string) => Promise<{ error: string | null }>
  uploadAvatar: (file: File) => Promise<{ error: string | null }>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

/**
 * After Supabase processes an email-confirmation / OAuth redirect, the token
 * is left in the URL (e.g. #access_token=... or ?code=...). Supabase has
 * already read it by now, so we wipe it from the address bar for a clean URL.
 */
function cleanAuthParamsFromUrl() {
  if (typeof window === "undefined") return
  const { hash, search } = window.location
  const hasHashToken = hash.includes("access_token") || hash.includes("error")
  const hasQueryToken = /[?&](code|error|error_description|error_code|token_hash|type)=/.test(search)
  if (!hasHashToken && !hasQueryToken) return

  const url = new URL(window.location.href)
  url.hash = ""
  ;["code", "error", "error_description", "error_code", "token_hash", "type"].forEach((p) =>
    url.searchParams.delete(p),
  )
  window.history.replaceState({}, document.title, url.pathname + url.search)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(async (uid: string) => {
    try {
      const supabase = getSupabase()
      const { data } = await supabase.from("profiles").select("*").eq("id", uid).single()
      if (data) setProfile(data as Profile)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }
    const supabase = getSupabase()

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setUser(data.session?.user ?? null)
      if (data.session?.user) loadProfile(data.session.user.id)
      setLoading(false)
      cleanAuthParamsFromUrl()
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setUser(newSession?.user ?? null)
      if (newSession?.user) loadProfile(newSession.user.id)
      else setProfile(null)
      cleanAuthParamsFromUrl()
    })

    return () => sub.subscription.unsubscribe()
  }, [loadProfile])

  const refreshProfile = useCallback(async () => {
    if (user) await loadProfile(user.id)
  }, [user, loadProfile])

  const signUp: AuthContextValue["signUp"] = async ({ email, password, fullName }) => {
    try {
      const supabase = getSupabase()
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName ?? "" },
          emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
        },
      })
      // If email confirmation is required, Supabase returns a user but no session.
      const needsConfirmation = !!data?.user && !data?.session
      return { error: error?.message ?? null, needsConfirmation }
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Sign up failed", needsConfirmation: false }
    }
  }

  const signIn: AuthContextValue["signIn"] = async ({ email, password }) => {
    try {
      const supabase = getSupabase()
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      return { error: error?.message ?? null }
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Sign in failed" }
    }
  }

  const signInWithGoogle: AuthContextValue["signInWithGoogle"] = async () => {
    try {
      const supabase = getSupabase()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: typeof window !== "undefined" ? window.location.origin : undefined },
      })
      return { error: error?.message ?? null }
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Google sign in failed" }
    }
  }

  const resetPassword: AuthContextValue["resetPassword"] = async (email) => {
    try {
      const supabase = getSupabase()
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo:
          typeof window !== "undefined" ? `${window.location.origin}/reset-password` : undefined,
      })
      return { error: error?.message ?? null }
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Could not send reset email" }
    }
  }

  const updatePassword: AuthContextValue["updatePassword"] = async (password) => {
    try {
      const supabase = getSupabase()
      const { error } = await supabase.auth.updateUser({ password })
      return { error: error?.message ?? null }
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Could not update password" }
    }
  }

  const signOut = async () => {
    if (!isSupabaseConfigured) return
    await getSupabase().auth.signOut()
    setProfile(null)
  }

  const updateUsername: AuthContextValue["updateUsername"] = async (username) => {
    if (!user) return { error: "Not logged in" }
    try {
      const supabase = getSupabase()
      const { error } = await supabase.from("profiles").update({ username }).eq("id", user.id)
      if (error) return { error: error.message }
      await loadProfile(user.id)
      return { error: null }
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Could not update username" }
    }
  }

  const uploadAvatar: AuthContextValue["uploadAvatar"] = async (file) => {
    if (!user) return { error: "Not logged in" }
    try {
      const supabase = getSupabase()
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg"
      const path = `${user.id}/avatar_${Date.now()}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true, cacheControl: "3600" })
      if (uploadError) return { error: uploadError.message }

      const { data: pub } = supabase.storage.from("avatars").getPublicUrl(path)
      const publicUrl = pub.publicUrl

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", user.id)
      if (updateError) return { error: updateError.message }

      await loadProfile(user.id)
      return { error: null }
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Could not upload picture" }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        configured: isSupabaseConfigured,
        signUp,
        signIn,
        signInWithGoogle,
        resetPassword,
        updatePassword,
        signOut,
        refreshProfile,
        updateUsername,
        uploadAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>")
  return ctx
}
