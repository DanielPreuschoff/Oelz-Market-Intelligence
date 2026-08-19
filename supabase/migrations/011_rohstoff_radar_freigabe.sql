-- Rohstoff-Radar freigeben: lesen duerfen jetzt alle angemeldeten Nutzer,
-- nicht mehr nur Admins.
--
-- Das Modul stand seit Migration 007 in der Ausrollstufe (siehe
-- docs/rohstoff-radar-spec.md, Abschnitt 5a): gesperrt auf drei Ebenen -
-- Registry (adminOnly), Route (notFound) und Daten (diese Policy). Die ersten
-- beiden fallen im Code, diese hier ist die dritte.
--
-- Sichtbar wird nur, was veroeffentlicht ist; Entwuerfe bleiben Admins
-- vorbehalten. Damit gilt hier dieselbe Leseregel wie fuer Impulse (005) und
-- Studien (004).
--
-- Rueckgaengig: diese Policy loeschen und die admin-only-Fassung aus
-- Migration 009 wieder anlegen.

drop policy if exists "ingredient_signals_read_admin_only" on public.ingredient_signals;

drop policy if exists "ingredient_signals_read_published" on public.ingredient_signals;
create policy "ingredient_signals_read_published" on public.ingredient_signals
  for select to authenticated
  using (status = 'published' or (select public.is_admin()));

-- Grants explizit: die aelteren Migrationen fuehren keine, und eine frische
-- Datenbank gibt authenticated damit kein Recht auf public-Tabellen. Ohne das
-- greift die Policy ins Leere (42501 permission denied).
grant select on public.ingredient_signals to authenticated;
grant insert, update, delete on public.ingredient_signals to authenticated;
