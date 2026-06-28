-- ============================================================
-- Ayn Legal Aid - Security hardening
-- Run in: Supabase Dashboard > SQL Editor > New snippet > Run
-- Safe to re-run.
--
-- WHY: The profiles update policy lets a user edit their own row.
-- Without this, a user could open the browser console and run
--   supabase.from('profiles').update({ plan: 'premium' })
-- to give themselves premium for free. This trigger prevents the
-- client from changing protected columns (plan, id, created_at, email).
-- Only the server (service_role, used by your Edge Functions) can.
-- ============================================================

create or replace function public.lock_protected_profile_columns()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  -- service_role (server-side) bypasses these locks.
  if auth.role() = 'service_role' then
    return new;
  end if;

  -- Keep protected columns at their existing values for client updates.
  new.plan       := old.plan;
  new.id         := old.id;
  new.created_at := old.created_at;
  new.email      := old.email;
  return new;
end;
$$;

drop trigger if exists protect_profile_columns on public.profiles;
create trigger protect_profile_columns
  before update on public.profiles
  for each row execute function public.lock_protected_profile_columns();

-- ============================================================
-- Result: users can still update username and avatar_url,
-- but plan/id/created_at/email are locked from the client.
-- ============================================================
