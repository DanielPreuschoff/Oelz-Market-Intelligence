-- 022: Modul-Freigaben je Nutzer + Schutz von is_admin (18.11.2026)
--
-- 1. Modul-Freigaben
--    Ein Modul in der Ausrollstufe (adminOnly in src/lib/modules.ts) sehen
--    bisher nur Admins. Kai Heuberger soll das Kundenradar vorab bekommen
--    (CEO-Termin am 20.11.2026), ohne Admin zu werden. Deshalb eine Zeile je
--    Nutzer und Modul. Lesen darf jeder seine eigenen Freigaben, vergeben und
--    entziehen nur Admins.
--    Bewusst eine eigene Tabelle und keine Spalte auf user_profiles: die
--    eigene Profilzeile darf der Nutzer bearbeiten (Name, Rolle) - eine
--    Freigabe dort koennte er sich selbst geben. Gleiche Begruendung wie
--    module_visits in 010.
--    module_id ist der Schluessel aus src/lib/modules.ts (z. B. 'kunden').
--
-- 2. Sicherheitsfix user_profiles
--    Die Policy profiles_update_own (006) laesst jeden angemeldeten Nutzer
--    seine eigene Zeile aendern - ueber die Tabellenrechte auch die Spalte
--    is_admin. Damit koennte sich jeder per API selbst zum Admin machen.
--    Die App aendert in der Profilzeile nur full_name und role
--    (src/components/profile-form.tsx). Deshalb: Tabellenrecht UPDATE
--    entziehen, nur diese zwei Spalten wieder erlauben. Die Policy bleibt.
--    Neue Profilzeilen legt der Trigger handle_new_user (security definer)
--    an, dafuer braucht der Nutzer kein INSERT-Recht.
--
-- ASCII-only fuer den Supabase-Editor. Idempotent.

-- ------------------------------------------------------------ Freigaben

create table if not exists public.modul_freigaben (
  user_id    uuid        not null references auth.users(id) on delete cascade,
  module_id  text        not null,
  created_at timestamptz not null default now(),
  primary key (user_id, module_id)
);

alter table public.modul_freigaben enable row level security;

drop policy if exists modul_freigaben_read on public.modul_freigaben;
create policy modul_freigaben_read on public.modul_freigaben
  for select to authenticated
  using (user_id = (select auth.uid()) or (select public.is_admin()));

drop policy if exists modul_freigaben_write on public.modul_freigaben;
create policy modul_freigaben_write on public.modul_freigaben
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

grant select, insert, update, delete on public.modul_freigaben to authenticated;

-- ------------------------------------------------- is_admin schuetzen

revoke insert, update, delete on public.user_profiles from anon, authenticated;
grant select on public.user_profiles to authenticated;
grant update (full_name, role) on public.user_profiles to authenticated;

-- Pruefung: darf "authenticated" is_admin noch aendern? Erwartet: false.
-- Darunter alle Admins - bitte pruefen, dass nur die erwarteten Konten
-- darin stehen.
select
  has_column_privilege('authenticated', 'public.user_profiles', 'is_admin', 'UPDATE') as is_admin_aenderbar,
  u.email as admin
from public.user_profiles p
join auth.users u on u.id = p.id
where p.is_admin
order by u.email;
