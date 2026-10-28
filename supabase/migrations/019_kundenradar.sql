-- 019: Kundenradar -- Haendler und Kundensignale (27.10.2026)
--
-- Simon Greiner (Vertrieb), Termin am 27.10.2026: Was der Handel in seinen
-- Laendern strategisch entscheidet, gesammelt je Haendler (Kette x Land), mit
-- einem Satz dazu, was das fuer Oelz heisst. Flughoehe "Lebensmittel Zeitung":
-- keine Listungen, keine Preise, keine Filialen.
-- Spec: docs/kundenradar-spec.md (Abschnitt 9), Entscheidung: ADR 0007.
--
-- Zwei Tabellen statt einer Erweiterung von competitors oder countries: Beide
-- gehoeren dem Wettbewerbsradar und steuern dessen Seiten. Das Land steht
-- deshalb als ISO-Code mit CHECK am Haendler, ohne Fremdschluessel.
--
-- Spaltennamen englisch wie im uebrigen Schema, Anzeigetexte deutsch im Code
-- (src/types/kundenradar.ts).
--
-- Idempotent: laeuft auch zweimal ohne Schaden.

-- =============================================================
-- HAENDLER
-- =============================================================

create table if not exists public.retailers (
  id                 uuid primary key default uuid_generate_v4(),
  -- Kettenname, "Kaufland". Das Land kommt aus country, nicht aus dem Namen.
  name               text not null,
  -- kette-land, "kaufland-sk". Adresse des Dossiers und Schluessel im Import.
  slug               text not null unique,
  country            text not null check (country in (
                       'DE', 'AT', 'CH', 'CZ', 'SK', 'SI', 'HR', 'RO', 'UK'
                     )),
  -- Konzern, "Schwarz-Gruppe". Fasst Haendler in der Uebersicht zusammen --
  -- daraus entsteht der Laendervergleich.
  group_name         text,
  -- Von Oelz gepflegt, nie aus Daten geraten. "ueber_partner": ein
  -- Vertriebspartner beliefert die Kette (SI, HR, UK).
  customer_status    text not null default 'unbekannt' check (customer_status in (
                       'kunde', 'ueber_partner', 'kein_kunde', 'unbekannt'
                     )),
  -- Kurzprofil, drei bis sechs Zeilen. Erster Entwurf aus dem Erstlauf, danach
  -- von Hand. Das Datum wird nur gesetzt, wenn sich der Text aendert.
  profile            text,
  profile_updated_at timestamptz,
  active             boolean not null default true,
  sort_order         integer not null default 0,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

-- =============================================================
-- KUNDENSIGNALE
-- =============================================================

create table if not exists public.retailer_signals (
  id              uuid primary key default uuid_generate_v4(),
  -- Loescht man einen Haendler, gehen seine Signale mit -- ohne Haendler
  -- haben sie keinen Ort. Die Admin-Liste nennt die Zahl vor dem Loeschen.
  retailer_id     uuid not null references public.retailers(id) on delete cascade,
  signal_type     text not null check (signal_type in (
                    'strategie',             -- Eigenmarke, Protein, Bio, Convenience, Nachhaltigkeit
                    'format_flaeche',        -- Filialkonzept, Flaechen, Platzierung
                    'backstation_pos',       -- SB-Backstation, Baeckerei im Markt
                    'sortimentskonzept',     -- Produktgruppe aus- oder abgebaut
                    'investition_expansion', -- Logistik, Produktion, Filialnetz
                    'lieferkette'            -- Lieferantenwechsel, Lieferproblem
                  )),

  -- Zone Befund: was die Quelle sagt
  title           text not null,
  teaser          text,
  situation       text,
  source_name     text,
  source_url      text,
  source_date     date,

  -- Zone Einschaetzung: redaktionell verantwortet
  -- Der Satz "Fuer Oelz ...". Ohne ihn ist ein Kundensignal eine Nachricht,
  -- und Nachrichten hat der Vertrieb genug -- deshalb die Huerde.
  oelz_relevance  text,
  -- Kais Ziel vom 02.10.2026: ein guter Zeitpunkt, den Haendler anzuschreiben.
  contact_trigger boolean not null default false,

  -- Workflow
  status          text not null default 'draft' check (status in ('draft', 'published')),
  published_at    timestamptz,
  ai_generated    boolean not null default false,
  created_by      uuid references auth.users(id) on delete set null,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  -- Die Huerde in der Datenbank, nicht nur im Formular -- gleiche Begruendung
  -- wie bei substance_watch: Sie muss auch bei direktem Schreibzugriff halten.
  -- Der Quellenname ist bewusst nicht dabei; die URL ist der Beleg.
  constraint retailer_signals_published_complete check (
    status = 'draft' or (
      coalesce(btrim(title), '')          <> ''
      and coalesce(btrim(teaser), '')     <> ''
      and coalesce(btrim(situation), '')  <> ''
      and coalesce(btrim(oelz_relevance), '') <> ''
      and coalesce(btrim(source_url), '') <> ''
      and source_date is not null
    )
  )
);

create index if not exists retailer_signals_retailer_idx on public.retailer_signals(retailer_id);
create index if not exists retailer_signals_status_idx   on public.retailer_signals(status);
create index if not exists retailer_signals_published_idx
  on public.retailer_signals(published_at desc nulls last);
-- Dublettensuche beim Import (Haendler + Quelle). Bewusst kein Unique-Index:
-- Ein Geschaeftsbericht darf zwei Signale verschiedenen Typs tragen.
create index if not exists retailer_signals_source_idx
  on public.retailer_signals(retailer_id, source_url);

-- =============================================================
-- UPDATED_AT
-- =============================================================

drop trigger if exists retailers_updated_at on public.retailers;
create trigger retailers_updated_at
  before update on public.retailers
  for each row execute function update_updated_at();

drop trigger if exists retailer_signals_updated_at on public.retailer_signals;
create trigger retailer_signals_updated_at
  before update on public.retailer_signals
  for each row execute function update_updated_at();

-- =============================================================
-- RLS
-- =============================================================

alter table public.retailers        enable row level security;
alter table public.retailer_signals enable row level security;

-- Haendler sind fuer alle Angemeldeten lesbar: Ein veroeffentlichtes Signal
-- braucht seinen Haendler im Join. Gesperrt wird das Modul waehrend der
-- Ausrollstufe ueber adminOnly und notFound() in der Route (ADR 0006/0007).
drop policy if exists "retailers_read" on public.retailers;
create policy "retailers_read" on public.retailers
  for select to authenticated
  using (true);

drop policy if exists "retailers_write_admin" on public.retailers;
create policy "retailers_write_admin" on public.retailers
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- Signale: Veroeffentlichtes fuer alle Angemeldeten, Entwuerfe nur fuer Admins.
-- (select public.is_admin()) laeuft einmal je Statement -- Muster aus 006.
drop policy if exists "retailer_signals_read" on public.retailer_signals;
create policy "retailer_signals_read" on public.retailer_signals
  for select to authenticated
  using (status = 'published' or (select public.is_admin()));

drop policy if exists "retailer_signals_write_admin" on public.retailer_signals;
create policy "retailer_signals_write_admin" on public.retailer_signals
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

grant select, insert, update, delete on public.retailers        to authenticated;
grant select, insert, update, delete on public.retailer_signals to authenticated;

-- =============================================================
-- STARTBESTAND (Spec Abschnitt 3)
-- =============================================================
-- Simons Export-Kunden. SI, HR und UK sind Annahmen -- welche Ketten die
-- Vertriebspartner beliefern, ist mit Simon zu bestaetigen. Bestehende Zeilen
-- bleiben unangetastet.

insert into public.retailers (name, slug, country, group_name, customer_status, sort_order) values
  ('Kaufland',     'kaufland-de',   'DE', 'Schwarz-Gruppe', 'kunde',          10),
  ('Kaufland',     'kaufland-cz',   'CZ', 'Schwarz-Gruppe', 'kunde',          20),
  ('Kaufland',     'kaufland-sk',   'SK', 'Schwarz-Gruppe', 'kunde',          30),
  ('Kaufland',     'kaufland-hr',   'HR', 'Schwarz-Gruppe', 'kunde',          40),
  ('Kaufland',     'kaufland-ro',   'RO', 'Schwarz-Gruppe', 'kunde',          50),
  ('SPAR',         'spar-si',       'SI', null,             'ueber_partner',  60),
  ('Mercator',     'mercator-si',   'SI', null,             'ueber_partner',  70),
  ('Konzum',       'konzum-hr',     'HR', null,             'ueber_partner',  80),
  ('Tesco',        'tesco-uk',      'UK', null,             'ueber_partner',  90),
  ('Sainsbury''s', 'sainsburys-uk', 'UK', null,             'ueber_partner', 100)
on conflict (slug) do nothing;
