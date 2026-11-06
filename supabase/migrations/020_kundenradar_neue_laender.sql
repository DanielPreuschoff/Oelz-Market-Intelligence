-- 020: Kundenradar -- vier neue Laender, neun neue Haendler (06.11.2026)
--
-- Kai Heuberger, Regeltermin am 06.11.2026 (Teams-Chat): Diese Kunden fehlen
-- im Kundenradar -- Sutterluety (AT), Aldi Nord (DE), Marks & Spencer und
-- Waitrose (UK), Walmart und Costco (US), Mercadona (ES), Carrefour (FR),
-- Conad (IT). Kundenstatus "unbekannt", bis der Vertrieb ihn bestaetigt: Er
-- wird von Oelz gepflegt, nie geraten (siehe 019).
--
-- Sutterluety steht in der REWE Group: REWE Austria haelt 24,9 Prozent und
-- kauft seit 2003 gemeinsam mit Sutterluety ein. So hat Kai ihn auch eingeordnet.
--
-- Nachgetragen: die elf Inlandskunden, die am 27.10.2026 per SQL direkt in
-- Produktion angelegt wurden, damit die Migrationen allein das ganze Schema
-- ergeben. In Produktion aendert das nichts: Jede Zeile wird nur eingefuegt,
-- wenn es weder ihren Slug noch dieselbe Kette im selben Land schon gibt.
--
-- ASCII-only, Umlaute als U&-Escapes: Das Kopieren in den SQL-Editor
-- verfaelscht sonst die Zeichen. Idempotent.

-- =============================================================
-- LAENDER: + FR, IT, ES, US
-- =============================================================
-- Der CHECK aus 019 ist ohne Namen angelegt; Postgres nennt ihn
-- retailers_country_check.

alter table public.retailers drop constraint if exists retailers_country_check;
alter table public.retailers add constraint retailers_country_check check (country in (
  'DE', 'AT', 'CH', 'CZ', 'SK', 'SI', 'HR', 'RO', 'UK', 'FR', 'IT', 'ES', 'US'
));

-- =============================================================
-- HAENDLER
-- =============================================================

insert into public.retailers (name, slug, country, group_name, customer_status, sort_order)
select v.name, v.slug, v.country, v.group_name, v.customer_status, v.sort_order
  from (values
    -- Nachtrag: Inlandskunden aus Simons Mail, in Produktion seit 27.10.2026
    (U&'Aldi S\00FCd', 'aldi-sued-de', 'DE', U&'Aldi S\00FCd', 'kunde', 110),
    ('Lidl',           'lidl-de',      'DE', 'Schwarz-Gruppe',   'kunde', 120),
    ('REWE',           'rewe-de',      'DE', 'REWE Group',       'kunde', 130),
    ('Edeka',          'edeka-de',     'DE', null,               'kunde', 140),
    ('Norma',          'norma-de',     'DE', null,               'kunde', 150),
    ('Hofer',          'hofer-at',     'AT', U&'Aldi S\00FCd',   'kunde', 110),
    ('Lidl',           'lidl-at',      'AT', 'Schwarz-Gruppe',   'kunde', 120),
    ('BILLA',          'billa-at',     'AT', 'REWE Group',       'kunde', 130),
    ('SPAR',           'spar-at',      'AT', 'SPAR',             'kunde', 140),
    ('Coop',           'coop-ch',      'CH', null,               'kunde', 110),
    ('Migros',         'migros-ch',    'CH', null,               'kunde', 120),

    -- Neu: Kais Liste vom 06.11.2026
    ('Aldi Nord',          'aldi-nord-de',     'DE', null,         'unbekannt', 210),
    (U&'Sutterl\00FCty',   'sutterluety-at',   'AT', 'REWE Group', 'unbekannt', 210),
    ('Marks & Spencer',    'marks-spencer-uk', 'UK', null,         'unbekannt', 210),
    ('Waitrose',           'waitrose-uk',      'UK', null,         'unbekannt', 220),
    ('Carrefour',          'carrefour-fr',     'FR', null,         'unbekannt', 210),
    ('Conad',              'conad-it',         'IT', null,         'unbekannt', 210),
    ('Mercadona',          'mercadona-es',     'ES', null,         'unbekannt', 210),
    ('Walmart',            'walmart-us',       'US', null,         'unbekannt', 210),
    ('Costco',             'costco-us',        'US', null,         'unbekannt', 220)
  ) as v(name, slug, country, group_name, customer_status, sort_order)
 where not exists (
   select 1 from public.retailers r
    where r.slug = v.slug or (r.name = v.name and r.country = v.country)
 );

-- SPAR Slowenien gehoert zur selben Gruppe wie SPAR Oesterreich (in Produktion
-- seit 27.10.2026 so gesetzt; hier fuer frische Datenbanken).
update public.retailers set group_name = 'SPAR'
 where slug = 'spar-si' and group_name is null;

-- Pruefung: erwartet 30 Haendler in 13 Laendern.
select count(*) as haendler, count(distinct country) as laender
  from public.retailers where active;
