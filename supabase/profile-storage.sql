-- ============================================================
-- Ayn Legal Aid - Phase 1b: profile fields + avatar storage
-- Run in: Supabase Dashboard > SQL Editor > New snippet > Run
-- Safe to re-run.
-- ============================================================

-- ---------- extra profile columns ----------
alter table public.profiles add column if not exists username   text;
alter table public.profiles add column if not exists avatar_url text;

-- ---------- avatar storage bucket (public read) ----------
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Anyone can VIEW avatars (they're public images).
drop policy if exists "avatars_public_read" on storage.objects;
create policy "avatars_public_read"
  on storage.objects for select
  using (bucket_id = 'avatars');

-- A logged-in user can upload only into their own folder: avatars/<user-id>/...
drop policy if exists "avatars_user_insert" on storage.objects;
create policy "avatars_user_insert"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- A logged-in user can replace/update only their own files.
drop policy if exists "avatars_user_update" on storage.objects;
create policy "avatars_user_update"
  on storage.objects for update
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- A logged-in user can delete only their own files.
drop policy if exists "avatars_user_delete" on storage.objects;
create policy "avatars_user_delete"
  on storage.objects for delete
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- ============================================================
-- Done.
-- ============================================================
