-- =============================================================
-- Produkt- & Innovationsradar
-- =============================================================

CREATE TABLE innovation_impulses (
  id                        uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title                     text NOT NULL,
  radar_type                text NOT NULL CHECK (radar_type IN (
                              'Format', 'Claim', 'Rezeptur & Genuss',
                              'Occasion', 'Verpackung', 'Saison',
                              'Handel', 'Internationaler Vorläufer'
                            )),
  short_signal              text,
  oelz_relevance_short      text,
  tags                      text[] DEFAULT '{}',
  image_url                 text,
  product_example           text,
  category                  text,
  market                    text,
  channel                   text,
  main_claim                text,
  what_is_new               text,
  market_signal             text,
  trend_resonance           jsonb DEFAULT '[]'::jsonb,
  oelz_development_relevance text,
  possible_oelz_transfer    text,
  ratings                   jsonb,
  source_url                text,
  source_date               date,
  status                    text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  ai_generated              boolean NOT NULL DEFAULT false,
  created_by                uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at                timestamptz NOT NULL DEFAULT now(),
  updated_at                timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER update_innovation_impulses_updated_at
  BEFORE UPDATE ON innovation_impulses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE innovation_impulses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published impulses visible to authenticated users"
  ON innovation_impulses FOR SELECT TO authenticated
  USING (
    status = 'published'
    OR EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Admins can insert impulses"
  ON innovation_impulses FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Admins can update impulses"
  ON innovation_impulses FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Admins can delete impulses"
  ON innovation_impulses FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND is_admin = true));
