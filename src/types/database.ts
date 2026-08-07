// ============================================================
// Database types — mirrors the Supabase schema
// ============================================================

export type SignalCategory =
  | 'product_launch'
  | 'packaging_change'
  | 'distribution'
  | 'production_capacity'
  | 'm_and_a'
  | 'campaign'
  | 'pricing'
  | 'hiring_signal'
  | 'technology'
  | 'sustainability'
  | 'startup_signal'
  | 'regulatory'
  | 'partnership'

export type SignalStatus = 'draft' | 'reviewed' | 'published'
export type EditionStatus = 'draft' | 'review' | 'published'
export type ImportanceLevel = '1' | '2' | '3'
export type UserRole = 'management' | 'sales' | 'innovation' | 'marketing' | 'packaging'
export type WatchPriority = 'high' | 'medium' | 'low'

export interface Country {
  id: string
  name: string
  market_context: string | null
  active: boolean
  created_at: string
}

export interface Competitor {
  id: string
  name: string
  short_name: string
  country_ids: string[]
  categories: string[]
  logo_url: string | null
  description: string | null
  watch_priority: WatchPriority
  active: boolean
  created_at: string
  updated_at: string
}

export interface Signal {
  id: string
  headline: string
  summary: string
  competitor_id: string | null
  country_id: string | null
  category: SignalCategory
  importance: ImportanceLevel
  role_relevance: UserRole[]
  source_url: string | null
  source_name: string | null
  signal_date: string | null
  status: SignalStatus
  image_url: string | null
  ai_generated: boolean
  reviewed_by: string | null
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface SignalWithRelations extends Signal {
  competitor: Competitor | null
  country: Country | null
}

export interface Edition {
  id: string
  title: string
  period_month: string
  editorial_summary: string | null
  status: EditionStatus
  published_at: string | null
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface EditionSignal {
  id: string
  edition_id: string
  signal_id: string
  position: number
  created_at: string
}

export interface EditionWithSignals extends Edition {
  edition_signals: (EditionSignal & { signal: SignalWithRelations })[]
}

export interface UserProfile {
  id: string
  full_name: string | null
  role: UserRole | null
  is_admin: boolean
  created_at: string
  updated_at: string
}

// ============================================================
// UI helper types
// ============================================================

export const CATEGORY_LABELS: Record<SignalCategory, string> = {
  product_launch: 'Product Launch',
  packaging_change: 'Packaging',
  distribution: 'Distribution',
  production_capacity: 'Production',
  m_and_a: 'M&A',
  campaign: 'Campaign',
  pricing: 'Pricing',
  hiring_signal: 'Hiring',
  technology: 'Technology',
  sustainability: 'Sustainability',
  startup_signal: 'Startup',
  regulatory: 'Regulatory',
  partnership: 'Partnership',
}

export const IMPORTANCE_LABELS: Record<ImportanceLevel, string> = {
  '1': 'Notable',
  '2': 'Important',
  '3': 'Critical',
}

export const ROLE_LABELS: Record<UserRole, string> = {
  management: 'Management',
  sales: 'Vertrieb',
  innovation: 'Innovation',
  marketing: 'Marketing',
  packaging: 'Verpackung',
}

export const CATEGORY_COLORS: Record<SignalCategory, string> = {
  product_launch: 'bg-emerald-50/50 text-emerald-800 border border-emerald-200/50 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30',
  packaging_change: 'bg-violet-50/50 text-violet-800 border border-violet-200/50 dark:bg-violet-950/20 dark:text-violet-400 dark:border-violet-900/30',
  distribution: 'bg-blue-50/50 text-blue-800 border border-blue-200/50 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30',
  production_capacity: 'bg-orange-50/50 text-orange-800 border border-orange-200/50 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-900/30',
  m_and_a: 'bg-red-50/50 text-red-800 border border-red-200/50 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30',
  campaign: 'bg-pink-50/50 text-pink-800 border border-pink-200/50 dark:bg-pink-950/20 dark:text-pink-400 dark:border-pink-900/30',
  pricing: 'bg-yellow-50/50 text-yellow-800 border border-yellow-200/50 dark:bg-yellow-950/20 dark:text-yellow-400 dark:border-yellow-900/30',
  hiring_signal: 'bg-slate-50/50 text-slate-800 border border-slate-200/50 dark:bg-slate-950/20 dark:text-slate-400 dark:border-slate-900/30',
  technology: 'bg-cyan-50/50 text-cyan-800 border border-cyan-200/50 dark:bg-cyan-950/20 dark:text-cyan-400 dark:border-cyan-900/30',
  sustainability: 'bg-green-50/50 text-green-800 border border-green-200/50 dark:bg-green-950/20 dark:text-green-400 dark:border-green-900/30',
  startup_signal: 'bg-purple-50/50 text-purple-800 border border-purple-200/50 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-900/30',
  regulatory: 'bg-amber-50/50 text-amber-800 border border-amber-200/50 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30',
  partnership: 'bg-indigo-50/50 text-indigo-800 border border-indigo-200/50 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-900/30',
}

export const IMPORTANCE_COLORS: Record<ImportanceLevel, string> = {
  '1': 'bg-secondary text-muted-foreground border border-border/60 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700/50',
  '2': 'bg-amber-50/50 text-amber-800 border border-amber-200/50 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30',
  '3': 'bg-primary/5 text-primary border border-primary/20 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30',
}

// ============================================================
// Research Agent types
// ============================================================

export type ResearchRunStatus = 'running' | 'completed' | 'failed'
export type CandidateStatus = 'pending' | 'approved' | 'rejected'
/**
 * Herkunft eines Kandidaten. Die ersten drei stammen vom entfernten
 * Perplexity-Agenten und kommen nur noch in Altdaten vor; neue Kandidaten
 * entstehen ausschliesslich per `manual_import`.
 */
export type ResearchSource = 'perplexity' | 'google_news_rss' | 'mixed' | 'manual_import'

export interface ResearchRun {
  id: string
  triggered_by: string | null
  started_at: string
  completed_at: string | null
  status: ResearchRunStatus
  date_range_days: number
  competitors_searched: string[]
  candidates_found: number
  error_message: string | null
  /** Bezeichnung eines Importlaufs, z.B. „August 2026". Bei Agentenläufen leer. */
  label: string | null
  created_at: string
}

export interface SignalCandidate {
  id: string
  research_run_id: string
  headline: string | null
  summary: string | null
  category: SignalCategory | null
  competitor_id: string | null
  country_id: string | null
  importance: ImportanceLevel
  source_url: string | null
  source_name: string | null
  signal_date: string | null
  status: CandidateStatus
  reviewed_by: string | null
  reviewed_at: string | null
  promoted_signal_id: string | null
  ai_raw_response: string | null
  research_source: ResearchSource | null
  created_at: string
}

export interface SignalCandidateWithRelations extends SignalCandidate {
  competitor: Pick<Competitor, 'id' | 'short_name'> | null
  country: Pick<Country, 'id' | 'name'> | null
}
