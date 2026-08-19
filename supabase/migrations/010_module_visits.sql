-- Lesestand je Nutzer und Modul: der Ungesehen-Zaehler.
--
-- Bisher war "neu" zeitbasiert und fuer alle gleich (veroeffentlicht in den
-- 30 Tagen vor dem Stand des Moduls). Der Zaehler in der Navigation wird damit
-- pro Nutzer: "ungesehen" heisst seit dem letzten Besuch des Moduls
-- veroeffentlicht. Siehe ADR 0005 und das Glossar in CONTEXT.md.
--
-- Eine Zeile je Nutzer und Modul, nur der Zeitstempel des letzten Besuchs.
-- Bewusst eine eigene Tabelle und keine Spalte auf user_profiles: der Nutzer
-- muss seinen Lesestand selbst schreiben duerfen, und auf user_profiles liegt
-- is_admin - Schreibrecht auf die eigene Profilzeile waere die falsche Tuer.
--
-- module_id ist der Schluessel aus src/lib/modules.ts (z. B. 'wettbewerb',
-- 'produkt', 'rohstoff', 'studien'); kein Enum, damit ein neues Modul keine
-- Migration braucht.

create table if not exists public.module_visits (
  user_id      uuid        not null references auth.users(id) on delete cascade,
  module_id    text        not null,
  last_seen_at timestamptz not null default now(),
  primary key (user_id, module_id)
);

alter table public.module_visits enable row level security;

-- Jeder liest und schreibt nur seine eigenen Zeilen. (select auth.uid())
-- statt auth.uid(): laeuft als initPlan einmal pro Statement statt je Zeile.
drop policy if exists "module_visits_select_own" on public.module_visits;
create policy "module_visits_select_own" on public.module_visits
  for select to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "module_visits_insert_own" on public.module_visits;
create policy "module_visits_insert_own" on public.module_visits
  for insert to authenticated
  with check (user_id = (select auth.uid()));

drop policy if exists "module_visits_update_own" on public.module_visits;
create policy "module_visits_update_own" on public.module_visits
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- Loeschen braucht niemand: der Lesestand wird nur vorgerueckt. Faellt der
-- Nutzer weg, raeumt der Fremdschluessel auf.

-- Grants explizit - die aelteren Migrationen haben keine, und eine frische
-- Datenbank gibt authenticated damit kein Recht auf public-Tabellen.
grant select, insert, update on public.module_visits to authenticated;
