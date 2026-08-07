-- Rohstoff-Radar — Rohstoff-, Ingredient-, Technologie- und Verfahrenssignale.
-- Fachliche Grundlage: docs/rohstoff-radar-spec.md, Verortung: docs/adr/0001.
-- Bewusst eigene Tabelle statt neuntem radar_type in innovation_impulses:
-- die Feldmengen überlappen kaum (siehe ADR).

CREATE TABLE ingredient_signals (
  id                uuid PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Zone „Befund" — was die Quelle meldet
  title             text NOT NULL,
  subject_name      text NOT NULL,
  subject_type      text NOT NULL CHECK (subject_type IN (
                      'Rohstoff', 'Ingredient', 'Technologie', 'Verfahren'
                    )),
  what_is_new       text,
  functions         text[] NOT NULL DEFAULT '{}',
  maturity          text CHECK (maturity IN ('Labor', 'Pilot', 'Am Markt', 'Etabliert')),
  evidence          text CHECK (evidence IN ('Herstellerangabe', 'Einzelstudie', 'Mehrfach belegt')),
  source_name       text,
  source_url        text,
  source_date       date,

  -- Zone „Einschätzung" — die Relevanzkette, redaktionell verantwortet
  strategic_theme   text CHECK (strategic_theme IN (
                      'Proteinisierung', 'Clean Label', 'Premiumisierung',
                      'Convenience', 'Nachhaltigkeit'
                    )),
  problem_solved    text,
  oelz_application  text,
  oelz_opportunity  text,
  next_step         text,

  -- Workflow
  status            text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at      timestamptz,
  ai_generated      boolean NOT NULL DEFAULT false,
  created_by        uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),

  -- Veröffentlichungs-Hürde: ohne vollständige Relevanzkette kein published.
  -- Das ist die einzige Stelle, an der sich „kein generischer Newsfeed"
  -- strukturell durchsetzen lässt — Entwürfe dürfen unvollständig bleiben.
  CONSTRAINT ingredient_signals_published_complete CHECK (
    status <> 'published' OR (
      coalesce(btrim(what_is_new), '')       <> ''
      AND array_length(functions, 1)          >= 1
      AND maturity                            IS NOT NULL
      AND evidence                            IS NOT NULL
      AND coalesce(btrim(source_name), '')    <> ''
      AND coalesce(btrim(source_url), '')     <> ''
      AND source_date                         IS NOT NULL
      AND strategic_theme                     IS NOT NULL
      AND coalesce(btrim(problem_solved), '')   <> ''
      AND coalesce(btrim(oelz_application), '') <> ''
      AND coalesce(btrim(oelz_opportunity), '') <> ''
      AND coalesce(btrim(next_step), '')        <> ''
    )
  )
);

-- Indizes von Anfang an. Die Tabellen 004/005 haben keine — das soll sich
-- hier nicht wiederholen.
CREATE INDEX ingredient_signals_status_idx       ON ingredient_signals(status);
CREATE INDEX ingredient_signals_published_at_idx ON ingredient_signals(published_at DESC);
CREATE INDEX ingredient_signals_theme_idx        ON ingredient_signals(strategic_theme);
CREATE INDEX ingredient_signals_maturity_idx     ON ingredient_signals(maturity);
CREATE INDEX ingredient_signals_functions_idx    ON ingredient_signals USING gin(functions);

CREATE TRIGGER update_ingredient_signals_updated_at
  BEFORE UPDATE ON ingredient_signals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Der Admin-Check wiederholt das im Bestand übliche Subquery-Fragment. Sobald
-- eine `is_admin()`-Hilfsfunktion existiert (siehe 006_fix_rls_recursion), sollten
-- diese vier Policies darauf umgestellt werden.
ALTER TABLE ingredient_signals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ingredient_signals_read_published" ON ingredient_signals
  FOR SELECT TO authenticated
  USING (
    status = 'published'
    OR EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "ingredient_signals_admin_insert" ON ingredient_signals
  FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "ingredient_signals_admin_update" ON ingredient_signals
  FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "ingredient_signals_admin_delete" ON ingredient_signals
  FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND is_admin = true));
