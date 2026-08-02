# memory.md — Ayn Legal Aid: full session log

A complete record of everything done in the Cowork session, so Claude Code can
reconstruct the state and continue. Newest context is in CLAUDE.md; this file is
the chronological "what happened and why."

---

## Starting point (before this session)

- Live Next.js static site on Hostinger, v0-scaffolded. Marketing pages + an AI chatbot.
- **Critical problem found:** the Groq API key was exposed in the browser bundle
  (`chat-widget.tsx` used `NEXT_PUBLIC_GROQ_API_KEY` + `dangerouslyAllowBrowser`,
  and the literal `gsk_...` key was present in the deployed `out/` bundle).
- Dead/duplicate Next API routes existed (`app/api/chat/*`, `pages/api/chat/*`) that
  are incompatible with `output: 'export'`.
- Chatbot system prompt contradicted the disclaimer ("act like a lawyer" vs "not a lawyer").
- Contact form used `mailto:` with inconsistent addresses.

## What we built / changed (in order)

1. **Interim chat key fix (later superseded):** added a PHP proxy (`public/chat.php`) and
   pointed the widget at it. This was REPLACED by the Supabase Edge Function and the
   PHP file was deleted.

2. **Chose the backend stack:** Supabase (Postgres + Auth + Edge Functions), frontend
   stays static on Hostinger. Rejected Vercel (free tier is non-commercial) and
   Firebase (NoSQL). Auth method chosen: **email/password + Google**.

3. **Supabase project created** (`vuygdelhcxbikybzsush`), keys added to `.env.local`
   (new *publishable* key format `sb_publishable_...`).

4. **Database:** wrote and ran `supabase/schema.sql` (profiles + chat_usage tables, RLS,
   auto-create-profile trigger) and `supabase/profile-storage.sql` (username/avatar_url
   columns + `avatars` storage bucket + policies).

5. **Auth system built:**
   - `lib/supabase/client.ts`, `components/auth-provider.tsx` (AuthContext).
   - `app/login/page.tsx`, `app/signup/page.tsx` with **live red/green validation**,
     password rules checklist (8+ chars, letter, number), disabled-until-valid button,
     show/hide password.
   - Signup shows a **"Check your email" popup** (confirmation), and the auth provider
     **strips the token from the URL** after email-confirmation / OAuth redirect.
   - `components/profile-menu.tsx`: avatar in nav → settings dialog (username, avatar
     upload to Supabase Storage, plan + member-since, red Log out with hover).
   - `components/navigation.tsx`: logged-out shows only **Log in**; logged-in shows the
     avatar. Mobile hamburger: **profile row at the top**, and a **red Log out at the
     bottom** (dialog logout hidden on mobile via `hidden md:flex`). Auth UI gated behind
     a `mounted` flag to fix a hydration error.

6. **Password reset flow:** "Forgot password?" on login → `app/forgot-password/page.tsx`
   (secure **generic** message, no email enumeration) → email link → `app/reset-password/page.tsx`
   (new + confirm password, validation) → updates password → signs out → redirect to login.
   Requires `/reset-password` redirect URLs added in Supabase.

7. **Secure chatbot via Edge Function:** created `supabase/functions/chat/index.ts`
   (holds `GROQ_API_KEY` secret, relays to Groq, CORS, contact-shortcut). Widget now uses
   `supabase.functions.invoke("chat")`. Deployed in the Supabase dashboard as function
   **`chat`** with **Verify JWT OFF** and the `GROQ_API_KEY` secret set.
   (Earlier it was mistakenly deployed as `hyper-worker`; recreated as `chat`.)

8. **Cleanup / hardening:**
   - Deleted dead API routes (`app/api`, `pages/api`) and `public/chat.php`.
   - Cleaned `next.config.mjs` (removed unsupported `eslint` key + Turbopack-ignored option).
   - Removed the Groq key from `.env.local` entirely (now only Supabase vars).
   - Fixed chat **XSS**: message HTML is now escaped before render (`formatMessage`).
   - Fixed chat label branding "Insaf Legal AI" → "Ayn Legal AI".
   - Wrote `supabase/security-hardening.sql` (trigger locking `plan`/`id`/`created_at`/`email`
     from client edits) — **still needs to be run in Supabase**.

9. **Git:** committed everything and removed the guide `.md` files
   (HOSTINGER_DEPLOYMENT_GUIDE, DEPLOY, WEBINAR_*, STANDALONE_CODE_BLOCKS, supabase/SETUP).
   A commit `b33b4f7` was pushed but got attributed to the wrong identity
   (`developmentehb@gmail.com` → GitHub account **dev-ehb**). We did `git reset --soft HEAD~1`
   to undo it locally and cleared the repo's local git identity.
   **UNRESOLVED:** `origin/main` on GitHub still points at `b33b4f7` — the user must run
   `git push --force origin main` from their machine to remove it, AND set the correct git
   email (owner is `syedmussa06@gmail.com` / afridi-mussa) before re-committing.

---

# Session 2 — 2026-08-02 (Claude Code)

## Resolved from session 1

- Git identity is now correct (`syedmussa06@gmail.com` / afridi-mussa) and `origin/main`
  is `cac8e88`, which contains all the auth work. The dev-ehb commit `b33b4f7` is orphaned
  and on no branch — the force-push item is **done**.
- A stale, unfinished merge of that orphan commit was left in the working tree with live
  conflict markers in 6 files (`package.json` was truncated mid-string, so the project
  could not even `npm install`). Resolved with `git merge --abort` — the orphan was the
  *older* version, so nothing was lost.
- Verified the Groq key literal was **never committed** to git and `out/` was never
  committed. Only the variable name `NEXT_PUBLIC_GROQ_API_KEY` appears in history.

## Built this session

1. **3-free-prompts guest gate** (logged out = 3, logged in = unlimited), server-authoritative:
   - `supabase/chat-gate.sql`: rebuilt `chat_usage` keyed by text id so it holds guests
     (`guest:<uuid>`) and members (`user:<uuid>`); added `chat_rate_limit`; added atomic
     `chat_consume_guest` / `chat_record_user` / `chat_rate_check` / `chat_rate_prune`.
     RLS on with **no policies**, and EXECUTE revoked from anon/authenticated → service_role only.
   - The old `chat_usage` was dropped: it was keyed to `auth.users` (could not hold guests)
     and provably never written to.
   - Counting is inside `SELECT ... FOR UPDATE`, so simultaneous requests can't both pass.
2. **Hardened the `chat` Edge Function** — origin allow-list, 32 KB / 12 msg / 4000 char
   payload caps, per-IP rate limit (20/hr guest, 60/hr member; IP kept only as salted
   SHA-256), real auth via `admin.auth.getUser(token)`, client `system` turns stripped,
   upstream Groq errors no longer echoed to the browser, `max_tokens: 800`.
3. **Fixed the contact shortcut.** It substring-matched `call`/`number`/`email`, so
   "how do I re**call** a notice?" returned the lawyer's phone number. Now a narrow
   word-boundary intent regex.
4. **Chat widget**: guest UUID in `localStorage`, live "N free questions left" counter,
   sign-up wall at the limit, instant unlock on login, 2000-char input cap. Stops sending
   the UI-only disclaimer message to the model.
5. **`public/.htaccess`** (new): HTTPS redirect, HSTS, CSP, X-Frame-Options, nosniff,
   Referrer-Policy, Permissions-Policy, asset caching, no-cache HTML, `Options -Indexes`,
   sensitive-file blocking, `ErrorDocument 404 /404.html`, gzip.
6. **Cleanup**: removed `@vercel/analytics` (site is on Hostinger, the beacons 404'd),
   deleted the 3 dead `webinar-modal*.tsx` files, excluded `supabase/functions` (Deno)
   from the frontend tsconfig, and — since the frontend is now fully type-clean —
   turned **`typescript.ignoreBuildErrors` off**.

Verified: `npx tsc --noEmit` clean, `next build` green, `out/` contains `.htaccess` +
`404.html`, and the bundle contains no `gsk_` / `service_role` / `GROQ` strings.

## Supabase CLI hooked up (2026-08-02)

Founder ran `npx supabase login` + `link` themselves. Recent CLI versions provision a
temporary login role through the Management API, so **no DB password was needed**.
`supabase/config.toml` + `supabase/.temp/` now exist. SQL moved into `supabase/migrations/`.

## DEPLOYED to Supabase and verified live

- **Deleted the `hyper-worker` Edge Function.** It was the misfire from session 1 —
  never removed, still `ACTIVE`, `verify_jwt: false`, entrypoint `chat.ts`. It was a
  second, completely unprotected relay to the Groq key. Nothing in the repo referenced it.
  *Lesson: session 1's note said "recreated as chat" but never said "deleted the old one."*
- **`db push` applied both migrations** — `chat_usage`, `chat_rate_limit`, the atomic gate
  functions, and the profile-column lock trigger. `migration list` shows local == remote.
- **Deployed `chat` v3 with `--no-verify-jwt`.** It had been sitting at `verify_jwt: true`,
  contradicting the docs. Always deploy with that flag or it silently flips back on.

### Live tests run against production

| Test | Result |
|---|---|
| POST from `https://evil-example.com` | **403** |
| POST with no Origin header (curl) | **403** |
| Guest prompts 1/2/3 from aynlegalaid.com | 200, `remaining` 2 → 1 → 0 |
| Guest prompt 4 | **402** `guest_limit`, sign-up message |
| "how do I recall a legal notice?" | Real AI answer — old contact-hijack bug is fixed |
| "how can i contact a lawyer" | Contact shortcut, no Groq call |

## Current state

Supabase side is **fully live**. Frontend is built and waiting in `out/`.

## Immediate next steps

1. Upload `out/` to Hostinger `public_html`, **including the hidden `.htaccess`**.
2. Commit + push (`CLAUDE.md`, `memory.md`, `.htaccess`, migrations, `config.toml` untracked).

## Deliberately deferred (founder's call, 2026-08-02)

- **Groq key NOT rotated.** Founder has no Groq console access and judged the exposure
  risk acceptable. Note for whoever picks this up: the origin allow-list does **not**
  protect a leaked Groq key — a stolen key is used directly against `api.groq.com` and
  never touches our function. Detection signal is the bot suddenly failing on quota.
  Rotate whenever console access is available.
- Password-recovery hardening (`/reset-password` accepts any live session, so it does not
  ask for the current password).
