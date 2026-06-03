-- =============================================================
-- Ad-hoc Studien
-- =============================================================

CREATE TABLE studies (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title         text NOT NULL,
  summary       text,
  research_question text,
  methodology   text,
  date_published date,
  topic_tags    text[] DEFAULT '{}',
  pdf_url       text,
  status        text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  ai_generated  boolean NOT NULL DEFAULT false,
  created_by    uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- Reuse existing trigger function
CREATE TRIGGER update_studies_updated_at
  BEFORE UPDATE ON studies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS
ALTER TABLE studies ENABLE ROW LEVEL SECURITY;

-- Authenticated users see published studies
CREATE POLICY "Published studies visible to authenticated users"
  ON studies FOR SELECT
  TO authenticated
  USING (
    status = 'published'
    OR EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Admins can insert
CREATE POLICY "Admins can insert studies"
  ON studies FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Admins can update
CREATE POLICY "Admins can update studies"
  ON studies FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Admins can delete
CREATE POLICY "Admins can delete studies"
  ON studies FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );
