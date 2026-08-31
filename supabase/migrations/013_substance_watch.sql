-- Unter Beobachtung — Risikosignale im Rohstoff-Radar.
-- Spec: docs/unter-beobachtung-spec.md (Stand 31.08.2026)
--
-- Eigene Tabelle, nicht ein Diskriminator in ingredient_signals: Dort erzwingt
-- ingredient_signals_published_complete die Relevanzkette bis hin zur
-- oelz_opportunity. Ein Risiko hat keine Chance -- es scheitert an drei
-- Gliedern, und die Huerde fuer alle aufzuweichen hiesse, die einzige
-- strukturelle Sperre gegen einen generischen Newsfeed aufzugeben.
--
-- Spaltennamen englisch wie im uebrigen Schema, Anzeigetexte deutsch im Code
-- (src/types/substance-watch.ts).

create table if not exists public.substance_watch (
  id                 uuid primary key default uuid_generate_v4(),

  -- Zone Befund: was gemeldet wurde
  substance          text not null,
  -- Optional: Prozesskontaminanten (Acrylamid, MOAH) tragen keine E-Nummer.
  e_number           text,
  stage              text not null check (stage in (
                       'kritik',              -- 1 oeffentliche Kritik, keine Behoerde
                       'bewertung',           -- 2 behoerdliche Bewertung, noch kein Recht
                       'rechtsakt_in_arbeit', -- 3 Entwurf, Konsultation, beschlossen
                       'geltendes_recht'      -- 4 in Kraft, mit Frist oder Hoechstmenge
                     )),
  -- Deutschland ist der Fruehindikator fuer Oesterreich (Kai Heuberger,
  -- 27.08.2026) -- deshalb ein eigenes Feld und keine Fussnote im Text.
  scope              text not null check (scope in ('DE', 'AT', 'EU')),
  situation          text not null,
  source_name        text,
  source_url         text,
  source_date        date,

  -- Zone Einschaetzung: redaktionell verantwortet
  -- Die Veroeffentlichungs-Huerde. Oelz-Rezepturen liegen nicht in der
  -- Plattform, „setzen wir den Stoff ein" ist also unbeantwortbar. Beantwortbar
  -- ist, welche Produktkategorie der Stoff beruehren wuerde -- aus der ueblichen
  -- Verwendung, ohne eine einzige Rezeptur zu kennen.
  product_categories text[] not null default '{}',
  action             text check (action in ('beobachten', 'pruefen', 'ersetzen')),

  -- Workflow. „ausgeraeumt" nimmt den Eintrag aus der aktiven Ansicht, loescht
  -- ihn aber nicht: Ohne diesen Zustand waechst die Liste nur und verrottet.
  status             text not null default 'draft'
                       check (status in ('draft', 'published', 'ausgeraeumt')),
  published_at       timestamptz,
  resolved_at        timestamptz,
  ai_generated       boolean not null default false,
  created_by         uuid references auth.users(id) on delete set null,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),

  -- Die Huerde in der Datenbank, nicht nur im Formular -- gleiche Begruendung
  -- wie bei der Relevanzkette: Sie muss auch bei direktem Schreibzugriff
  -- halten. Ein Entwurf darf unvollstaendig bleiben.
  constraint substance_watch_published_complete check (
    status = 'draft' or (
      coalesce(btrim(substance), '')   <> ''
      and coalesce(btrim(situation), '') <> ''
      and array_length(product_categories, 1) >= 1
      and action                        is not null
      and coalesce(btrim(source_name), '') <> ''
      and coalesce(btrim(source_url), '')  <> ''
      and source_date                   is not null
    )
  )
);

create index if not exists substance_watch_status_idx on public.substance_watch(status);
create index if not exists substance_watch_stage_idx  on public.substance_watch(stage);
create index if not exists substance_watch_published_idx
  on public.substance_watch(published_at desc nulls last);
-- Fuer den Kategoriefilter: dieselbe Wahl wie bei ingredient_signals.functions.
create index if not exists substance_watch_categories_idx
  on public.substance_watch using gin(product_categories);

alter table public.substance_watch enable row level security;

-- Lesen: veroeffentlichte und ausgeraeumte Eintraege fuer alle Angemeldeten;
-- Entwuerfe nur fuer Admins. (select public.is_admin()) laeuft als initPlan
-- einmal je Statement statt je Zeile -- Muster aus Migration 006.
drop policy if exists "substance_watch_read" on public.substance_watch;
create policy "substance_watch_read" on public.substance_watch
  for select to authenticated
  using (status in ('published', 'ausgeraeumt') or (select public.is_admin()));

drop policy if exists "substance_watch_write_admin" on public.substance_watch;
create policy "substance_watch_write_admin" on public.substance_watch
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- Grants: die Migrationen dieses Projekts vergaben bisher keine, und eine
-- frisch aufgebaute lokale Datenbank scheitert dadurch mit 42501.
grant select, insert, update, delete on public.substance_watch to authenticated;
