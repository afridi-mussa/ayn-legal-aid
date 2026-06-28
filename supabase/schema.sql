-- ============================================================
-- Ayn Legal Aid - Database schema (Phase 1)
-- Run this in: Supabase Dashboard > SQL Editor > New query > Run
-- Safe to re-run (uses IF NOT EXISTS / OR REPLACE).
-- ============================================================

-- ---------- profiles: one row per registered visitor ----------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text,
  full_name   text,
  plan        text not null default 'free',   -- 'free' | 'premium' (used later)
  created_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Each user can see and edit only their own profile.
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- ---------- chat_usage: prompt counting (guests + members) ----------
create table if not exists public.chat_usage (
  user_id      uuid primary key references auth.users (id) on delete cascade,
  prompt_count integer not null default 0,
  last_used_at timestamptz not null default now()
);

alter table public.chat_usage enable row level security;

drop policy if exists "chat_usage_select_own" on public.chat_usage;
create policy "chat_usage_select_own"
  on public.chat_usage for select
  using (auth.uid() = user_id);

-- (Writes to chat_usage will be done server-side by the Edge Function in
--  Phase 2 using the service_role key, which bypasses RLS.)

-- ---------- auto-create a profile when a user signs up ----------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- Done. Verify in: Table Editor > profiles / chat_usage
-- ============================================================
