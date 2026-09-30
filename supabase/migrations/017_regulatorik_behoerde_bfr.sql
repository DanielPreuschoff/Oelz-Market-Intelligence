-- 017: Regulatorik-Radar -- BfR als eigene Behoerde (30.09.2026)
--
-- Kai Heuberger, 30.09.2026: "Kannst du neben EFSA bitte auch das Amt fuer
-- Risikobewertung als Filter mit aufschalten." Bisher lief das BfR unter
-- 'national', zusammen mit AGES, BLV und den Parlamenten. Deutschland ist
-- Kais Fruehindikator fuer Oesterreich -- deshalb ein eigener Wert 'bfr'.
--
-- Bestehende Faelle werden am Quellennamen erkannt ("BfR, Stellungnahme ...")
-- und umgestellt. updated_at bleibt unberuehrt: Das ist eine Umsortierung,
-- keine inhaltliche Aenderung am Fall.
--
-- Idempotent: laeuft auch zweimal ohne Schaden.

alter table public.substance_watch drop constraint if exists substance_watch_authority_check;
alter table public.substance_watch add constraint substance_watch_authority_check
  check (authority is null or authority in ('efsa', 'bfr', 'eu_kommission', 'national', 'keine'));

update public.substance_watch
set authority = 'bfr'
where authority = 'national'
  and source_name ilike 'bfr%';
