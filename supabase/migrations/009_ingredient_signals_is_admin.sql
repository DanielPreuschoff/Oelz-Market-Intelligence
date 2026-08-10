-- Rohstoff-Radar: Policies auf die zentrale is_admin()-Hilfsfunktion umstellen.
--
-- Migration 006 hat das 17-fach duplizierte Admin-Subquery-Fragment durch
-- public.is_admin() ersetzt — kannte ingredient_signals aber noch nicht, weil
-- 007 danach entstand und zuerst eingespielt wurde. Diese vier Policies sind
-- die letzten mit dem alten Muster.
--
-- Gleicher Effekt wie in 006: die Pruefung laeuft als initPlan einmal pro
-- Statement statt einmal pro Zeile, und der Admin-Check steht nur noch an
-- einer Stelle im Schema.
--
-- Die Leseregel bleibt admin-only — das Modul ist noch in der Ausrollstufe
-- (siehe docs/rohstoff-radar-spec.md, Abschnitt 5a).

drop policy if exists "ingredient_signals_read_admin_only" on public.ingredient_signals;
create policy "ingredient_signals_read_admin_only" on public.ingredient_signals
  for select to authenticated
  using ((select public.is_admin()));

drop policy if exists "ingredient_signals_admin_insert" on public.ingredient_signals;
create policy "ingredient_signals_admin_insert" on public.ingredient_signals
  for insert to authenticated
  with check ((select public.is_admin()));

drop policy if exists "ingredient_signals_admin_update" on public.ingredient_signals;
create policy "ingredient_signals_admin_update" on public.ingredient_signals
  for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "ingredient_signals_admin_delete" on public.ingredient_signals;
create policy "ingredient_signals_admin_delete" on public.ingredient_signals
  for delete to authenticated
  using ((select public.is_admin()));

-- Zum Freischalten fuer alle Nutzer spaeter die Leseregel ersetzen durch:
--
--   drop policy "ingredient_signals_read_admin_only" on public.ingredient_signals;
--   create policy "ingredient_signals_read_published" on public.ingredient_signals
--     for select to authenticated
--     using (status = 'published' or (select public.is_admin()));
