-- 016: Regulatorik-Radar -- drei Eintragstypen: Unter Beobachtung, Zulassung,
-- Indirekt relevant (Auslieferung 3 vom 14.09.2026; Grilling-Runde Q9/Q22/
-- Q23/Q31, ADR 0006, Spec-Nachtrag).
--
-- Kai Heuberger will zweierlei frueh erfahren: wenn die EFSA neue Rohstoffe
-- ZULAESST (eine Chance) und wenn die EU rechtliche Schritte plant, bei
-- Rohstoffen UND Produkten. Bisher kannte die Tabelle nur Risiken zu
-- benennbaren Stoffen. Deshalb:
--
--   kind = 'risiko'     Unter Beobachtung -- wie bisher: Stoff, Stufe,
--                       Handlung, Produktkategorie Pflicht.
--   kind = 'zulassung'  Zulassung -- Stoff und Produktkategorie Pflicht
--                       ("wo koennte Oelz den Stoff einsetzen"); keine
--                       Stufe, keine Handlung (das Verfahren hat gesetzliche
--                       Fristen, die Quelle traegt das Datum).
--   kind = 'indirekt'   Indirekt relevant -- kein Stoff noetig, keine
--                       Kategorie noetig; stattdessen Pflichtsatz
--                       why_relevant: "Warum koennte das Oelz betreffen?"
--                       Faengt Zuckersteuer, Kennzeichnung, Praezedenzfaelle
--                       auf, ohne die Hauptliste zum Newsfeed zu machen.
--
-- Bestand: alle 15 Faelle werden 'risiko' (default). stage wird nullable,
-- weil zwei von drei Typen keine Stufe tragen; der bisherige Enum-CHECK
-- laesst NULL ohnehin durch.

alter table public.substance_watch add column if not exists kind text not null default 'risiko';
alter table public.substance_watch add column if not exists why_relevant text;

alter table public.substance_watch drop constraint if exists substance_watch_kind_check;
alter table public.substance_watch add constraint substance_watch_kind_check
  check (kind in ('risiko', 'zulassung', 'indirekt'));

alter table public.substance_watch alter column stage drop not null;

-- Die Veroeffentlichungs-Huerde, je Typ. Gemeinsam: Kurzzeile, Behoerde,
-- Sachverhalt, Quelle (Name, URL, Datum). Dann das Typspezifische.
alter table public.substance_watch drop constraint if exists substance_watch_published_complete;
alter table public.substance_watch add constraint substance_watch_published_complete check (
  status = 'draft' or (
    coalesce(btrim(teaser), '')      <> ''
    and authority                     is not null
    and coalesce(btrim(situation), '') <> ''
    and coalesce(btrim(source_name), '') <> ''
    and coalesce(btrim(source_url), '')  <> ''
    and source_date                   is not null
    and case kind
      when 'risiko' then
            coalesce(btrim(substance), '') <> ''
        and array_length(product_categories, 1) >= 1
        and stage  is not null
        and action is not null
      when 'zulassung' then
            coalesce(btrim(substance), '') <> ''
        and array_length(product_categories, 1) >= 1
      when 'indirekt' then
            coalesce(btrim(why_relevant), '') <> ''
      else false
    end
  )
);

-- substance ist bisher NOT NULL; fuer 'indirekt' darf es leer bleiben.
-- Leer heisst '' (die Spalte bleibt NOT NULL), damit Sortierung und
-- Dublettenpruefung keinen Sonderfall brauchen.

create index if not exists substance_watch_kind_idx on public.substance_watch(kind);
