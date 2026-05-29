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
  sales: 'Sales',
  innovation: 'Innovation',
  marketing: 'Marketing',
  packaging: 'Packaging',
}

export const CATEGORY_COLORS: Record<SignalCategory, string> = {
  product_launch: 'bg-emerald-100 text-emerald-800',
  packaging_change: 'bg-violet-100 text-violet-800',
  distribution: 'bg-blue-100 text-blue-800',
  production_capacity: 'bg-orange-100 text-orange-800',
  m_and_a: 'bg-red-100 text-red-800',
  campaign: 'bg-pink-100 text-pink-800',
  pricing: 'bg-yellow-100 text-yellow-800',
  hiring_signal: 'bg-slate-100 text-slate-800',
  technology: 'bg-cyan-100 text-cyan-800',
  sustainability: 'bg-green-100 text-green-800',
  startup_signal: 'bg-purple-100 text-purple-800',
  regulatory: 'bg-amber-100 text-amber-800',
  partnership: 'bg-indigo-100 text-indigo-800',
}

export const IMPORTANCE_COLORS: Record<ImportanceLevel, string> = {
  '1': 'bg-slate-100 text-slate-600',
  '2': 'bg-amber-100 text-amber-700',
  '3': 'bg-red-100 text-red-700',
}

// ============================================================
// Research Agent types
// ============================================================

export type ResearchRunStatus = 'running' | 'completed' | 'failed'
export type CandidateStatus = 'pending' | 'approved' | 'rejected'
export type ResearchSource = 'perplexity' | 'google_news_rss' | 'mixed'

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
