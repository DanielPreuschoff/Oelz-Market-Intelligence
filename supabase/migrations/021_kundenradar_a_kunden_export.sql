-- 021: Kundenradar -- A-Kunden im Export laut Simon (10.11.2026)
--
-- Simon Greiner hat am 10.11.2026 per Mail alle A-Kunden im Export geschickt,
-- die Vertriebspartner Merit und Silisan schon in ihre Handelsketten
-- aufgeloest. Abgleich mit dem Bestand (30 Haendler):
--   * 27 Ketten fehlen und kommen hier dazu, darunter Ungarn als neues Land.
--   * Aldi Nord, Carrefour und Conad stehen auf seiner Liste -> Status kunde.
--   * Grossmann (IT) fehlt noch: unklar, ob Handelskette oder Grosshandel.
--
-- Kundenstatus: kunde fuer alles auf Simons Liste. Ausnahme wie seit 019:
-- SI, HR und UK laufen ueber Vertriebspartner (ausser Kaufland HR, das
-- Kaufland International direkt bedient). Welche Ketten genau Merit und
-- Silisan beliefern, ist bei Simon nachzufragen.
--
-- Konzerne: neue Ketten bekommen ihre Gruppe, damit die Uebersicht sie neben
-- die Schwestern in anderen Laendern stellt. Bestehende Zeilen ohne Gruppe
-- werden nur dort ergaenzt, wo group_name noch leer ist.
--
-- ASCII-only fuer den Supabase-Editor; Umlaute als U&-Escape. Idempotent:
-- zweimal einspielen aendert nichts.

alter table public.retailers drop constraint if exists retailers_country_check;
alter table public.retailers add constraint retailers_country_check check (country in (
  'DE', 'AT', 'CH', 'CZ', 'SK', 'SI', 'HR', 'RO', 'HU', 'UK', 'FR', 'IT', 'ES', 'US'
));

insert into public.retailers (name, slug, country, group_name, customer_status, sort_order)
select v.name, v.slug, v.country, v.group_name, v.customer_status, v.sort_order
  from (values
    -- DE
    ('Netto Marken-Discount', 'netto-md-de', 'DE', 'Edeka-Gruppe',   'kunde', 310),
    ('Penny',                 'penny-de',    'DE', 'REWE Group',     'kunde', 320),
    ('Globus',                'globus-de',   'DE', null,             'kunde', 330),
    -- CH
    ('Aldi',                  'aldi-ch',     'CH', U&'Aldi S\00FCd', 'kunde', 310),
    ('Lidl',                  'lidl-ch',     'CH', 'Schwarz-Gruppe', 'kunde', 320),
    -- CZ
    ('Lidl',                  'lidl-cz',     'CZ', 'Schwarz-Gruppe', 'kunde', 310),
    ('Albert',                'albert-cz',   'CZ', 'Ahold Delhaize', 'kunde', 320),
    ('Tesco',                 'tesco-cz',    'CZ', 'Tesco',          'kunde', 330),
    ('Penny',                 'penny-cz',    'CZ', 'REWE Group',     'kunde', 340),
    ('BILLA',                 'billa-cz',    'CZ', 'REWE Group',     'kunde', 350),
    -- SK
    ('Lidl',                  'lidl-sk',     'SK', 'Schwarz-Gruppe', 'kunde', 310),
    ('BILLA',                 'billa-sk',    'SK', 'REWE Group',     'kunde', 320),
    ('Tesco',                 'tesco-sk',    'SK', 'Tesco',          'kunde', 330),
    ('Coop Jednota',          'coop-jednota-sk', 'SK', null,         'kunde', 340),
    -- SI (ueber Partner)
    ('Hofer',                 'hofer-si',    'SI', U&'Aldi S\00FCd', 'ueber_partner', 310),
    (U&'Tu\0161',             'tus-si',      'SI', null,             'ueber_partner', 320),
    ('Eurospin',              'eurospin-si', 'SI', null,             'ueber_partner', 330),
    -- HR (ueber Partner)
    ('SPAR',                  'spar-hr',     'HR', 'SPAR',           'ueber_partner', 310),
    ('Studenac',              'studenac-hr', 'HR', null,             'ueber_partner', 320),
    ('Plodine',               'plodine-hr',  'HR', null,             'ueber_partner', 330),
    ('Tommy',                 'tommy-hr',    'HR', null,             'ueber_partner', 340),
    -- HU (neues Land)
    ('Aldi',                  'aldi-hu',     'HU', U&'Aldi S\00FCd', 'kunde', 310),
    ('Lidl',                  'lidl-hu',     'HU', 'Schwarz-Gruppe', 'kunde', 320),
    -- FR
    ('E.Leclerc',             'leclerc-fr',  'FR', null,             'kunde', 310),
    -- UK (ueber Partner)
    ('Aldi',                  'aldi-uk',     'UK', U&'Aldi S\00FCd', 'ueber_partner', 310),
    ('Lidl',                  'lidl-uk',     'UK', 'Schwarz-Gruppe', 'ueber_partner', 320),
    ('Asda',                  'asda-uk',     'UK', null,             'ueber_partner', 330)
  ) as v(name, slug, country, group_name, customer_status, sort_order)
 where not exists (
   select 1 from public.retailers r
    where r.slug = v.slug or (r.name = v.name and r.country = v.country)
 );

-- Simons Liste bestaetigt drei Haendler aus Kais Liste als Kunden.
update public.retailers set customer_status = 'kunde'
 where slug in ('aldi-nord-de', 'carrefour-fr', 'conad-it')
   and customer_status = 'unbekannt';

-- Konzerne fuer Bestandszeilen, die bisher ohne Gruppe stehen.
update public.retailers set group_name = 'Edeka-Gruppe'
 where slug = 'edeka-de' and group_name is null;
update public.retailers set group_name = 'Tesco'
 where slug = 'tesco-uk' and group_name is null;
update public.retailers set group_name = 'Fortenova'
 where slug in ('konzum-hr', 'mercator-si') and group_name is null;

-- Pruefung: 57 Haendler in 14 Laendern.
select count(*) as haendler, count(distinct country) as laender
  from public.retailers where active;
