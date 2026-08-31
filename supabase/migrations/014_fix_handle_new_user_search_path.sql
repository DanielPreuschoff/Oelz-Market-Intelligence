-- handle_new_user() ohne search_path -- „Database error creating new user".
--
-- Der Trigger aus Migration 001 laeuft als SECURITY DEFINER und schreibt in
-- `user_profiles` ohne Schema-Qualifizierung. Der Auth-Dienst von Supabase
-- ruft ihn in einem Kontext auf, in dem `public` nicht zwangslaeufig im
-- search_path liegt; der Insert findet die Tabelle dann nicht und das Anlegen
-- eines neuen Nutzers scheitert mit „Database error creating new user".
--
-- Die Produktionsdatenbank ist an dieser Stelle vermutlich schon von Hand
-- gepatcht (siehe Projektnotiz zur Migrations-Drift). Diese Migration ist
-- trotzdem noetig, damit eine frisch aus supabase/migrations/ aufgebaute
-- Datenbank funktioniert -- und sie ist idempotent: `create or replace`
-- ueberschreibt eine bereits korrigierte Fassung mit derselben Logik.
--
-- Zwei Aenderungen gegenueber 001:
--   1. `set search_path = public, pg_temp` -- feste Aufloesung, unabhaengig
--      vom Aufrufer. pg_temp am Ende, damit keine temporaere Tabelle die
--      Aufloesung kapern kann.
--   2. `public.user_profiles` statt `user_profiles` -- Guertel und
--      Hosentraeger; die Qualifizierung allein wuerde schon reichen.
--
-- Zusaetzlich `on conflict do nothing`: Existiert das Profil bereits (etwa
-- weil es von Hand angelegt wurde, bevor der Auth-User entstand), soll der
-- Trigger den Nutzer nicht scheitern lassen.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  insert into public.user_profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Trigger neu binden, damit er sicher auf die qualifizierte Funktion zeigt.
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
