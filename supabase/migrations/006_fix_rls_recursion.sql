-- =============================================================
-- Fix RLS: Rekursion in profiles_read_own + Admin-Check-Performance
-- Migration: 006_fix_rls_recursion.sql
-- =============================================================
--
-- Problem 1 — Endlosrekursion (Postgres-Fehler 42P17):
-- "profiles_read_own" auf user_profiles selektiert in der eigenen
-- USING-Klausel aus user_profiles. Jede authenticated-Abfrage auf
-- user_profiles schlägt fehl mit "infinite recursion detected in
-- policy for relation user_profiles".
--
-- Problem 2 — Admin-Subquery pro Zeile:
-- 17 Policies duplizieren das Fragment
--   exists (select 1 from user_profiles where id = auth.uid() and is_admin = true)
-- Da auth.uid() nicht in (select ...) gewrappt ist, greift der
-- initPlan-Optimierer nicht und die Subquery wird pro Zeile statt
-- einmal pro Statement ausgewertet.
--
-- Lösung: zentrale Hilfsfunktion public.is_admin() als STABLE
-- SECURITY DEFINER. Sie läuft als Funktions-Owner (postgres) und
-- umgeht damit RLS auf user_profiles — das bricht die Rekursion.
-- Alle Policies nutzen (select public.is_admin()) bzw.
-- (select auth.uid()), damit beides als initPlan einmal pro
-- Statement ausgewertet wird.

-- ---------------------------------------------------------------
-- Hilfsfunktion
-- ---------------------------------------------------------------

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    (select is_admin
       from public.user_profiles
      where id = (select auth.uid())),
    false
  );
$$;

comment on function public.is_admin() is
  'True, wenn der aufrufende User in user_profiles als Admin markiert ist. SECURITY DEFINER, um RLS-Rekursion auf user_profiles zu vermeiden.';

revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- ---------------------------------------------------------------
-- 001_initial_schema.sql — user_profiles (die rekursive Policy)
-- ---------------------------------------------------------------

drop policy if exists "profiles_read_own" on public.user_profiles;
create policy "profiles_read_own" on public.user_profiles
  for select to authenticated
  using (id = (select auth.uid()) or (select public.is_admin()));

drop policy if exists "profiles_update_own" on public.user_profiles;
create policy "profiles_update_own" on public.user_profiles
  for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- ---------------------------------------------------------------
-- 001_initial_schema.sql — übrige Admin-Policies
-- ---------------------------------------------------------------

drop policy if exists "competitors_write" on public.competitors;
create policy "competitors_write" on public.competitors
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "signals_read_published" on public.signals;
create policy "signals_read_published" on public.signals
  for select to authenticated
  using (status = 'published' or (select public.is_admin()));

drop policy if exists "signals_write_admin" on public.signals;
create policy "signals_write_admin" on public.signals
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "editions_read_published" on public.editions;
create policy "editions_read_published" on public.editions
  for select to authenticated
  using (status = 'published' or (select public.is_admin()));

drop policy if exists "editions_write_admin" on public.editions;
create policy "editions_write_admin" on public.editions
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "edition_signals_write_admin" on public.edition_signals;
create policy "edition_signals_write_admin" on public.edition_signals
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- ---------------------------------------------------------------
-- 002_research_agent.sql
-- ---------------------------------------------------------------

drop policy if exists "research_runs_admin" on public.research_runs;
create policy "research_runs_admin" on public.research_runs
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "signal_candidates_admin" on public.signal_candidates;
create policy "signal_candidates_admin" on public.signal_candidates
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- ---------------------------------------------------------------
-- 004_studies.sql
-- ---------------------------------------------------------------

drop policy if exists "Published studies visible to authenticated users" on public.studies;
create policy "Published studies visible to authenticated users"
  on public.studies for select to authenticated
  using (status = 'published' or (select public.is_admin()));

drop policy if exists "Admins can insert studies" on public.studies;
create policy "Admins can insert studies"
  on public.studies for insert to authenticated
  with check ((select public.is_admin()));

drop policy if exists "Admins can update studies" on public.studies;
create policy "Admins can update studies"
  on public.studies for update to authenticated
  using ((select public.is_admin()));

drop policy if exists "Admins can delete studies" on public.studies;
create policy "Admins can delete studies"
  on public.studies for delete to authenticated
  using ((select public.is_admin()));

-- ---------------------------------------------------------------
-- 005_innovation_impulses.sql
-- ---------------------------------------------------------------

drop policy if exists "Published impulses visible to authenticated users" on public.innovation_impulses;
create policy "Published impulses visible to authenticated users"
  on public.innovation_impulses for select to authenticated
  using (status = 'published' or (select public.is_admin()));

drop policy if exists "Admins can insert impulses" on public.innovation_impulses;
create policy "Admins can insert impulses"
  on public.innovation_impulses for insert to authenticated
  with check ((select public.is_admin()));

drop policy if exists "Admins can update impulses" on public.innovation_impulses;
create policy "Admins can update impulses"
  on public.innovation_impulses for update to authenticated
  using ((select public.is_admin()));

drop policy if exists "Admins can delete impulses" on public.innovation_impulses;
create policy "Admins can delete impulses"
  on public.innovation_impulses for delete to authenticated
  using ((select public.is_admin()));
