-- 015: Regulatorik-Radar -- Kurzzeile, Behoerde, Geltungsbereich CH
-- (Auslieferung 2 vom 14.09.2026; Entscheidungen aus der Grilling-Runde,
-- siehe docs/unter-beobachtung-spec.md, Nachtrag 14.09.2026, und ADR 0006).
--
-- Drei Aenderungen an substance_watch:
--
--   1. teaser -- die Kurzzeile (sieben bis elf Woerter). Kai Heuberger,
--      11.09.2026: "kurz anteasern und dann Quellenverweis". Die Karte zeigt
--      kuenftig die Kurzzeile, der Sachverhalt wandert in den Detail-Dialog.
--   2. authority -- die Behoerde als strukturiertes Feld, weil Kai einen
--      Filter "EFSA / EU Regulation" wuenscht. Die Spec hatte das Feld
--      gestrichen ("steckt im Quellennamen"); fuer einen Filter reicht der
--      Quellenname nicht. 'keine' fuer Stufe "Oeffentliche Kritik" (Medien,
--      NGO, Verbraucherschutz).
--   3. scope um 'CH' -- Oelz verkauft in der Schweiz, und das Schweizer
--      Lebensmittelrecht ist nicht EU-harmonisiert. CZ/SK/SI bleiben ueber
--      EU-Recht abgedeckt (Spec, Abschnitt 13, Punkt 4).
--
-- Die Veroeffentlichungs-Huerde verlangt Kurzzeile und Behoerde ab jetzt
-- fuer JEDE Veroeffentlichung -- aber NOT VALID: Die 15 bestehenden Faelle
-- haben noch keine Kurzzeile, sie bekommen sie per Nachtrag-SQL (Kurzzeilen
-- werden vorher geprueft). Erst danach: validate constraint (steht am Ende
-- des Nachtrag-SQL). Bis dahin scheitert das Aendern oder Ausraeumen eines
-- Altfalls mit einer CHECK-Meldung -- gewollt, damit niemand einen Altfall
-- ohne Kurzzeile neu veroeffentlicht.
--
-- Idempotent: laeuft auch zweimal ohne Schaden.

alter table public.substance_watch add column if not exists teaser text;
alter table public.substance_watch add column if not exists authority text;

alter table public.substance_watch drop constraint if exists substance_watch_authority_check;
alter table public.substance_watch add constraint substance_watch_authority_check
  check (authority is null or authority in ('efsa', 'eu_kommission', 'national', 'keine'));

-- Der Name stammt aus Migration 013 (inline check -> <tabelle>_<spalte>_check).
alter table public.substance_watch drop constraint if exists substance_watch_scope_check;
alter table public.substance_watch add constraint substance_watch_scope_check
  check (scope in ('DE', 'AT', 'CH', 'EU'));

alter table public.substance_watch drop constraint if exists substance_watch_published_complete;
alter table public.substance_watch add constraint substance_watch_published_complete check (
  status = 'draft' or (
    coalesce(btrim(substance), '')   <> ''
    and coalesce(btrim(teaser), '')  <> ''
    and authority                     is not null
    and coalesce(btrim(situation), '') <> ''
    and array_length(product_categories, 1) >= 1
    and action                        is not null
    and coalesce(btrim(source_name), '') <> ''
    and coalesce(btrim(source_url), '')  <> ''
    and source_date                   is not null
  )
) not valid;

-- Fuer den Behoerdenfilter, wie der Kategorie-Index aus 013.
create index if not exists substance_watch_authority_idx on public.substance_watch(authority);
