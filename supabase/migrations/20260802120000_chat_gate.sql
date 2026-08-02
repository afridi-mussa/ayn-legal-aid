-- ============================================================
-- Ayn Legal Aid - Phase 2: chat gate + abuse protection
-- Run in: Supabase Dashboard > SQL Editor > New snippet > Run
-- Safe to re-run.
--
-- WHAT THIS DOES
--   1. Rebuilds chat_usage so it can count BOTH guests and members.
--   2. Adds chat_rate_limit (per-IP abuse protection).
--   3. Adds atomic SQL functions the Edge Function calls with the
--      service_role key. Counting happens inside a row lock, so two
--      requests arriving at the same instant cannot both slip through.
--
-- SECURITY: RLS is ON with NO policies on both tables, and EXECUTE on
-- the functions is revoked from anon/authenticated. That means the
-- browser can neither read these tables nor call these functions --
-- only the Edge Function (service_role) can.
-- ============================================================

-- ---------- 1. chat_usage ----------
-- The old chat_usage was keyed by auth.users.id, so it could not hold
-- guests. Nothing has ever written to it (the gate was never built), so
-- dropping it loses no data.
drop table if exists public.chat_usage cascade;

create table public.chat_usage (
  id            text primary key,          -- 'user:<uuid>'  or  'guest:<uuid>'
  kind          text not null check (kind in ('user', 'guest')),
  user_id       uuid references auth.users (id) on delete cascade,
  prompt_count  integer not null default 0,
  first_used_at timestamptz not null default now(),
  last_used_at  timestamptz not null default now()
);

create index if not exists chat_usage_last_used_idx on public.chat_usage (last_used_at);

alter table public.chat_usage enable row level security;
-- (no policies on purpose -> service_role only)

-- ---------- 2. chat_rate_limit ----------
-- Fixed-window request counter keyed by a SALTED HASH of the caller IP.
-- The raw IP is never stored.
create table if not exists public.chat_rate_limit (
  ip_hash       text primary key,
  window_start  timestamptz not null default now(),
  request_count integer not null default 0
);

create index if not exists chat_rate_limit_window_idx on public.chat_rate_limit (window_start);

alter table public.chat_rate_limit enable row level security;
-- (no policies on purpose -> service_role only)

-- ---------- 3. guest gate: consume one free prompt ----------
-- Returns allowed=false once the guest has used up p_limit prompts.
create or replace function public.chat_consume_guest(p_key text, p_limit integer)
returns table (allowed boolean, used integer)
language plpgsql
security definer set search_path = public
as $$
declare
  v_used integer;
begin
  -- Lock this guest's row (if any) so concurrent requests serialise.
  select prompt_count into v_used
  from public.chat_usage
  where id = p_key
  for update;

  if v_used is null then
    insert into public.chat_usage (id, kind, prompt_count)
    values (p_key, 'guest', 1)
    on conflict (id) do update
      set prompt_count = public.chat_usage.prompt_count + 1,
          last_used_at = now()
    returning public.chat_usage.prompt_count into v_used;
    return query select true, v_used;

  elsif v_used >= p_limit then
    -- Already out of free prompts: do NOT increment further.
    return query select false, v_used;

  else
    update public.chat_usage
      set prompt_count = prompt_count + 1,
          last_used_at = now()
    where id = p_key
    returning prompt_count into v_used;
    return query select true, v_used;
  end if;
end;
$$;

-- ---------- 4. member usage: record only, never block ----------
create or replace function public.chat_record_user(p_user uuid)
returns integer
language plpgsql
security definer set search_path = public
as $$
declare
  v_used integer;
begin
  insert into public.chat_usage (id, kind, user_id, prompt_count)
  values ('user:' || p_user::text, 'user', p_user, 1)
  on conflict (id) do update
    set prompt_count = public.chat_usage.prompt_count + 1,
        last_used_at = now()
  returning public.chat_usage.prompt_count into v_used;
  return v_used;
end;
$$;

-- ---------- 5. per-IP rate limit (fixed window) ----------
-- Returns false when the caller has exceeded p_limit requests inside
-- the last p_window_seconds. Applies to guests AND members: it is
-- abuse/cost protection, not a product limit, so the ceiling is high.
create or replace function public.chat_rate_check(
  p_hash           text,
  p_limit          integer,
  p_window_seconds integer
)
returns boolean
language plpgsql
security definer set search_path = public
as $$
declare
  v_start timestamptz;
  v_count integer;
begin
  select window_start, request_count into v_start, v_count
  from public.chat_rate_limit
  where ip_hash = p_hash
  for update;

  if v_start is null then
    insert into public.chat_rate_limit (ip_hash, window_start, request_count)
    values (p_hash, now(), 1)
    on conflict (ip_hash) do update
      set window_start = now(), request_count = 1;
    return true;
  end if;

  -- Window expired -> start a fresh one.
  if v_start < now() - make_interval(secs => p_window_seconds) then
    update public.chat_rate_limit
      set window_start = now(), request_count = 1
    where ip_hash = p_hash;
    return true;
  end if;

  if v_count >= p_limit then
    return false;
  end if;

  update public.chat_rate_limit
    set request_count = request_count + 1
  where ip_hash = p_hash;
  return true;
end;
$$;

-- ---------- 6. housekeeping ----------
-- Clears rate-limit rows whose window is long gone. Call occasionally
-- (or schedule with pg_cron) so the table stays small.
create or replace function public.chat_rate_prune()
returns integer
language plpgsql
security definer set search_path = public
as $$
declare
  v_deleted integer;
begin
  delete from public.chat_rate_limit
  where window_start < now() - interval '1 day';
  get diagnostics v_deleted = row_count;
  return v_deleted;
end;
$$;

-- ---------- 7. lock the functions down to service_role ----------
-- Postgres grants EXECUTE to PUBLIC by default. Without these revokes a
-- visitor could call these over the REST API and burn another guest's
-- allowance or inflate the rate-limit counters.
revoke all on function public.chat_consume_guest(text, integer)      from public, anon, authenticated;
revoke all on function public.chat_record_user(uuid)                 from public, anon, authenticated;
revoke all on function public.chat_rate_check(text, integer, integer) from public, anon, authenticated;
revoke all on function public.chat_rate_prune()                      from public, anon, authenticated;

grant execute on function public.chat_consume_guest(text, integer)      to service_role;
grant execute on function public.chat_record_user(uuid)                 to service_role;
grant execute on function public.chat_rate_check(text, integer, integer) to service_role;
grant execute on function public.chat_rate_prune()                      to service_role;

-- ============================================================
-- Done. Verify in: Table Editor > chat_usage / chat_rate_limit
-- ============================================================
