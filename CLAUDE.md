# CLAUDE.md — Ayn Legal Aid & Club

Project context for Claude Code. Read this first before any work in this repo.

---

## What this project is

A **Next.js 16 (App Router) static-export** marketing site for **Ayn Legal Aid & Club**
(Pakistan legal services + a university ambassador program). Originally scaffolded
from v0.app. It is **currently live**.

- **Live site:** https://aynlegalaid.com
- **Hosting:** Hostinger **shared hosting** (static files only — no Node server, no PHP app server for the app itself)
- **Repo:** https://github.com/afridi-mussa/ayn-legal-aid  (branch `main`)
- **Backend:** **Supabase** (Postgres + Auth + Edge Functions) — this is the only backend; there is no server in this repo.

## Tech stack

- Next.js `^16.2.3`, React 18, TypeScript
- `output: 'export'` (static export → `out/` folder), `trailingSlash: true`, `images.unoptimized: true`
- Tailwind CSS v4 + shadcn/Radix UI components (in `components/ui/`)
- Supabase JS client (`@supabase/supabase-js`) for auth + database
- Groq (`llama-3.1-8b-instant`) for the AI chatbot, called via a Supabase Edge Function
- Deploy uses Turbopack for dev; `next build` produces `out/`

## Critical architecture rules (do not break)

1. **Static export only.** Hostinger shared hosting serves static files. **Never add Next.js API routes / route handlers** (`app/api/*` or `pages/api/*`) — they break `output: 'export'` and fail the build. All server logic goes in **Supabase Edge Functions**.
2. **No secrets in the frontend.** Only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (a *publishable* key, safe by design + protected by RLS) may live in the client. The Groq key lives **only** as a Supabase Edge Function secret (`GROQ_API_KEY`). Never reintroduce `NEXT_PUBLIC_GROQ_API_KEY`.
3. **Security is enforced by Supabase RLS**, not by hiding the publishable key.
4. **The `chat` Edge Function is the only thing standing between the public and a paid
   Groq key.** Never loosen its origin allow-list, rate limit, or guest gate without a
   replacement. Never move the guest counter into the browser — it is server-authoritative
   on purpose.

## Repo layout (key files)

```
app/
  layout.tsx            # wraps app in <AuthProvider>, renders <ChatWidget>
  page.tsx              # home (Navigation, Hero, About, Services, Ambassadors, Contact, Footer)
  login/page.tsx        # email+password + Google, live red/green validation, "Forgot password?" link
  signup/page.tsx       # signup w/ password rules checklist + "Check your email" popup
  forgot-password/page.tsx  # request reset link (secure generic message)
  reset-password/page.tsx   # set new password (lands here from email link)
  about/ services/ contact/ corporate-law/ tax-advisory/ cyberSecurity-services/
  ambassadors/ , ambassadors/[id]/   # dynamic route HAS generateStaticParams (required for export)
components/
  auth-provider.tsx     # AuthContext: user/session/profile + signUp/signIn/Google/resetPassword/updatePassword/updateUsername/uploadAvatar/signOut; also cleans auth token from URL
  navigation.tsx        # nav; shows Log in (logged out) or ProfileMenu avatar (logged in); mobile hamburger has profile row at top + red Log out at bottom
  profile-menu.tsx      # avatar button -> settings dialog (username, avatar upload, plan/member-since, logout). variant "icon" | "row"
  chat-widget.tsx       # floating chatbot; calls supabase.functions.invoke("chat"); escapes HTML
                        # (XSS-safe); holds guest id + remaining-prompt counter + sign-up wall
  ui/                   # shadcn components
lib/
  supabase/client.ts    # getSupabase() singleton + isSupabaseConfigured
  validation.ts         # isValidEmail, passwordRules (8+ chars, letter, number), isValidPassword
  ambassadors-data.ts
supabase/
  schema.sql            # profiles + chat_usage tables, RLS, auto-create-profile trigger
  profile-storage.sql   # adds username/avatar_url columns + avatars storage bucket + policies
  config.toml           # Supabase CLI config (local; created by `supabase init`)
  migrations/           # CLI-managed SQL, applied with `supabase db push`
    ..._chat_gate.sql          # chat_usage (guests+members) + chat_rate_limit + gate functions
    ..._security_hardening.sql # trigger locking plan/id/created_at/email from client edits
  functions/chat/index.ts # Edge Function: Groq key, origin allow-list, rate limit, guest gate
  NOTE: schema.sql + profile-storage.sql were applied BY HAND before the CLI existed.
        They are kept as reference only — do not add them to migrations/.
public/
  .htaccess             # Hostinger security headers, HTTPS redirect, caching, 404, file blocking
                        # (copied into out/ by the build — it is a HIDDEN file, upload it too)
.env.local              # NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY only (gitignored)
```

## Chat gate (built)

- **Logged out → 3 prompts total. Logged in → unlimited.** Enforced server-side in the
  `chat` Edge Function; the browser only renders the counter and the sign-up wall.
- Guests are identified by a `ayn_guest_id` UUID in `localStorage`, counted in `chat_usage`
  under key `guest:<uuid>`. Members are recorded under `user:<uuid>` but never blocked.
- Login state is proven with `admin.auth.getUser(token)` — the client cannot fake it.
- Layers, in order: origin allow-list → payload caps (32 KB / 12 msgs / 4000 chars) →
  per-IP rate limit (20/hr guest, 60/hr member, IP stored only as a salted SHA-256) →
  guest gate → history sanitising (client `system` turns dropped).
- Counting happens inside a `SELECT ... FOR UPDATE` row lock so concurrent requests
  cannot both slip through.
- **Known limit:** clearing `localStorage` earns a guest 3 more prompts. This is inherent
  to anonymous gating; the per-IP rate limit is the actual cost ceiling. Tighten only if
  abuse appears — a hard per-IP prompt cap would break shared university/mobile networks.

## Supabase project

- Project URL: `https://vuygdelhcxbikybzsush.supabase.co`
- Auth: Email/password (email confirmation ON) + Google OAuth.
- Site URL: `https://aynlegalaid.com`. Redirect URLs must include `https://aynlegalaid.com`, `http://localhost:3000`, and the `/reset-password` variants of both.
- Edge Function `chat`: **Verify JWT = OFF**, secret `GROQ_API_KEY` set.
- Tables: `profiles` (id, email, full_name, username, avatar_url, plan[free/premium], created_at), `chat_usage` (user_id, prompt_count, last_used_at). Storage bucket `avatars` (public read, per-user write).

## Local dev & deploy

- Dev: `npm run dev` (http://localhost:3000). The chat calls the cloud Edge Function, so it works locally too.
- Build: `npm run build` → produces `out/`.
- Deploy: upload the **contents of `out/`** to Hostinger `public_html` (delete old files first).
  **Include the hidden `.htaccess`** — enable "show hidden files" in the File Manager.
- Future updates = build + upload `out/`.

### Supabase side (do this when the chat gate changes)

The project is managed with the Supabase CLI (`npx supabase`). One-time per machine:
`npx supabase login`, then `npx supabase link --project-ref vuygdelhcxbikybzsush`.

1. Database: `npx supabase db push` (applies everything in `supabase/migrations/`).
2. Edge Function: `npx supabase functions deploy chat --no-verify-jwt`.
   **Verify JWT must stay OFF** — guests have no JWT and the function verifies auth itself.
   Deploying without `--no-verify-jwt` silently turns it back on and breaks guest chat.
3. **Order matters:** the function calls DB functions created in step 1. Deploying the
   function before the migration makes every chat message return a 500.
3. Secrets: `GROQ_API_KEY` required. `ALLOWED_ORIGINS` and `CHAT_IP_SALT` optional —
   if `ALLOWED_ORIGINS` is unset the function falls back to the aynlegalaid.com +
   localhost list hard-coded at the top of the file. **Add any new domain there or the
   chat returns 403.**

## Known open items / TODO

1. **Groq key still needs rotating** (deferred 2026-08-02 — no console access). The original
   key was served in the deployed browser bundle, so treat it as public. Important: the
   Edge Function's origin allow-list does **not** protect it — a leaked key is used directly
   against `api.groq.com`. Rotate in the Groq console → set `GROQ_API_KEY` secret → delete old.
2. **Supabase side is deployed and verified live** (migrations applied, `chat` v3 running
   with Verify JWT off, `hyper-worker` deleted). Remaining: upload `out/` to Hostinger,
   including the hidden `.htaccess`.
3. Premium / Stripe monetization is a future phase (`plan` column + gating already scaffolded).
4. **Password-recovery hardening deliberately deferred** (2026-08-02): `/reset-password`
   accepts any live session, so it does not require the current password. Revisit later.
5. Minor: usernames not unique; old avatars not deleted on replace.
6. Supabase free tier pauses after ~1 week of no activity; upgrade to Pro (~$25/mo) at monetization for backups + no pausing.
7. `chat_rate_limit` grows one row per IP per window. `public.chat_rate_prune()` clears rows
   older than a day — schedule it with pg_cron if the table ever gets large.

## Conventions

- Static-export-safe client components (`"use client"`) for anything using hooks/Supabase.
- Auth-dependent UI must be gated behind a `mounted` flag to avoid hydration mismatches (see `navigation.tsx`).
- Keep the chatbot's system prompt aligned with the on-screen disclaimer ("a bot, not a lawyer, general info only").
