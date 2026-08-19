export interface Study {
  id: string
  title: string
  summary: string | null
  research_question: string | null
  methodology: string | null
  date_published: string | null
  topic_tags: string[]
  pdf_url: string | null
  /** Titelbild: erste PDF-Seite als PNG (Bucket studies). Null, bis es erzeugt wurde. */
  cover_url: string | null
  status: 'draft' | 'published'
  ai_generated: boolean
  created_by: string | null
  created_at: string
  updated_at: string
}

export const TOPIC_TAGS = [
  'Frühstück',
  'Konsumententreue',
  'Protein',
  'Private Label',
  'Convenience',
  'Health',
  'Nachhaltigkeit',
  'Innovation',
  'Snacking',
  'Trends',
  'Packaging',
  'Retail',
  'Ernährung',
  'Kaufverhalten',
  'Markenwahrnehmung',
] as const

export type TopicTag = typeof TOPIC_TAGS[number]
