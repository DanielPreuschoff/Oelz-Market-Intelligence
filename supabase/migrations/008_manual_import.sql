-- Der Perplexity-Research-Agent ist entfernt. Kandidaten entstehen jetzt aus
-- Deep-Research-Berichten, die ausserhalb der App erstellt und als JSON
-- importiert werden. Die Aufnahmestrecke (signal_candidates, research_runs,
-- Review-Liste, Approve/Reject) bleibt unveraendert bestehen.
--
-- Tabellennamen bleiben wie sie sind: `signal_candidates` passt weiterhin,
-- und `research_runs` umzubenennen hiesse Fremdschluessel, Typen und mehrere
-- Dateien anzufassen, ohne dass sich fuer irgendjemanden etwas aendert.

ALTER TABLE signal_candidates DROP CONSTRAINT IF EXISTS signal_candidates_research_source_check;

ALTER TABLE signal_candidates
  ADD CONSTRAINT signal_candidates_research_source_check
  CHECK (research_source IN ('perplexity', 'google_news_rss', 'mixed', 'manual_import'));

-- Bezeichnung des Laufs, z.B. "August 2026". Vorher gab es dafuer keine Spalte,
-- weil ein Agentenlauf durch sein Datum ausreichend beschrieben war.
ALTER TABLE research_runs ADD COLUMN IF NOT EXISTS label text;

-- Der Import liest die Kandidaten eines Laufs; ohne diesen Index laeuft jede
-- Dublettenpruefung ueber die gesamte Tabelle.
CREATE INDEX IF NOT EXISTS idx_signal_candidates_source_url_pending
  ON signal_candidates(source_url)
  WHERE status <> 'rejected';
