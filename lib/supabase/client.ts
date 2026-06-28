import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * Browser Supabase client (safe for static export).
 *
 * The anon key is PUBLIC by design — security is enforced by Row Level
 * Security policies in the database, not by hiding this key. Never put the
 * Supabase *service_role* key in the frontend.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let browserClient: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase env vars are missing. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local",
    )
  }
  if (!browserClient) {
    browserClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  }
  return browserClient
}

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)
