-- ============================================================
-- Ayn Legal Aid - unique usernames + scheduled rate-limit pruning
-- Safe to re-run.
-- ============================================================

-- ---------- 1. normalise blank usernames to NULL ----------
-- Postgres allows many NULLs in a unique index but only one '', so empty
-- strings would collide with each other once the index exists.
update public.profiles
set username = null
where username is not null and btrim(username) = '';

-- ---------- 2. de-duplicate existing usernames ----------
-- Keeps the earliest-registered holder of each name unchanged and suffixes
-- everyone else with a short slice of their user id, which is collision-free.
with ranked as (
  select
    id,
    row_number() over (
      partition by lower(username)
      order by created_at, id
    ) as rn
  from public.profiles
  where username is not null
)
update public.profiles p
set username = p.username || '_' || left(replace(p.id::text, '-', ''), 6)
from ranked r
where p.id = r.id
  and r.rn > 1;

-- ---------- 3. enforce uniqueness, case-insensitively ----------
-- 'Ali' and 'ali' must not both be claimable.
create unique index if not exists profiles_username_lower_key
  on public.profiles (lower(username))
  where username is not null;

-- ---------- 4. schedule the rate-limit prune ----------
-- chat_rate_limit gains a row per IP per window. chat_rate_prune() clears
-- anything older than a day; this runs it nightly at 03:00 UTC.
-- Wrapped so the migration still succeeds if pg_cron is unavailable on the
-- plan — the function stays callable by hand either way.
do $$
begin
  create extension if not exists pg_cron;
  perform cron.schedule(
    'chat-rate-prune',
    '0 3 * * *',
    $cron$select public.chat_rate_prune();$cron$
  );
  raise notice 'scheduled chat-rate-prune nightly at 03:00 UTC';
exception
  when others then
    raise notice 'pg_cron unavailable (%), run select public.chat_rate_prune(); manually if the table grows', sqlerrm;
end
$$;

-- ============================================================
-- Done.
-- ============================================================
