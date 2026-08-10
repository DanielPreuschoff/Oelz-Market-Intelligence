export interface TrendResonance {
  title: string
  description: string
}

export interface ImpulseRating {
  fitToOelz: number
  novelty: number
  feasibility: number
  claimPotential: number
  priority: 'Beobachten' | 'Prüfen' | 'Pilotieren'
}

export interface InnovationImpulse {
  id: string
  title: string
  radar_type: RadarType
  short_signal: string | null
  oelz_relevance_short: string | null
  tags: string[]
  image_url: string | null
  product_example: string | null
  category: string | null
  market: string | null
  channel: string | null
  main_claim: string | null
  what_is_new: string | null
  market_signal: string | null
  trend_resonance: TrendResonance[]
  oelz_development_relevance: string | null
  possible_oelz_transfer: string | null
  ratings: ImpulseRating | null
  source_url: string | null
  source_date: string | null
  status: 'draft' | 'published'
  ai_generated: boolean
  created_by: string | null
  created_at: string
  updated_at: string
}

export const RADAR_TYPES = [
  'Format',
  'Claim',
  'Rezeptur & Genuss',
  'Occasion',
  'Verpackung',
  'Saison',
  'Handel',
  'Internationaler Vorläufer',
] as const

export type RadarType = typeof RADAR_TYPES[number]

export const RADAR_TYPE_COLORS: Record<RadarType, { bg: string; text: string; border: string }> = {
  'Format':                   { bg: 'bg-blue-50',    text: 'text-blue-700',   border: 'border-blue-100' },
  'Claim':                    { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
  'Rezeptur & Genuss':        { bg: 'bg-amber-50',   text: 'text-amber-700',  border: 'border-amber-100' },
  'Occasion':                 { bg: 'bg-purple-50',  text: 'text-purple-700', border: 'border-purple-100' },
  'Verpackung':               { bg: 'bg-violet-50',  text: 'text-violet-700', border: 'border-violet-100' },
  'Saison':                   { bg: 'bg-orange-50',  text: 'text-orange-700', border: 'border-orange-100' },
  'Handel':                   { bg: 'bg-slate-100',  text: 'text-slate-700',  border: 'border-slate-200' },
  'Internationaler Vorläufer':{ bg: 'bg-rose-50',    text: 'text-rose-700',   border: 'border-rose-100' },
}

export const IMPULSE_TAGS = [
  'Sweet Bakery',
  'Croissant',
  'Toast',
  'Brot',
  'Snack',
  'Convenience',
  'Protein',
  'Clean Label',
  'Vegan',
  'Saison',
  'Premium',
  'Mini-Format',
  'Füllung',
  'Hybrid-Format',
  'Handel',
  'Private Label',
  'Social Media',
  'International',
  'Frühstück',
  'On-the-go',
] as const

export type ImpulseTag = typeof IMPULSE_TAGS[number]

export const PRIORITY_OPTIONS = ['Beobachten', 'Prüfen', 'Pilotieren'] as const
export type Priority = typeof PRIORITY_OPTIONS[number]

/**
 * Felder, ohne die eine Impulskarte für den Leser nicht trägt.
 *
 * Anders als beim Rohstoff-Radar steht das **nicht** als CHECK in der Datenbank:
 * `innovation_impulses` kennt keine Veröffentlichungs-Hürde, und eine
 * nachträglich hinzugefügte würde an den bereits veröffentlichten Impulsen
 * scheitern. Das hier ist deshalb eine Hilfe für die Durchsicht, keine Sperre —
 * der Import meldet, was fehlt, verhindert aber nichts.
 */
const IMPULSE_REQUIREMENTS: { label: string; ok: (i: ImpulseCandidate) => boolean }[] = [
  { label: 'Kurzsignal', ok: (i) => !!i.short_signal?.trim() },
  { label: 'Was ist neu', ok: (i) => !!i.what_is_new?.trim() },
  { label: 'Marktsignal', ok: (i) => !!i.market_signal?.trim() },
  { label: 'Markt', ok: (i) => !!i.market?.trim() },
  { label: 'Ölz-Relevanz', ok: (i) => !!i.oelz_development_relevance?.trim() },
  { label: 'möglicher Transfer', ok: (i) => !!i.possible_oelz_transfer?.trim() },
  { label: 'Quellen-URL', ok: (i) => !!i.source_url?.trim() },
  { label: 'Quellendatum', ok: (i) => !!i.source_date },
]

type ImpulseCandidate = Partial<
  Pick<
    InnovationImpulse,
    | 'short_signal' | 'what_is_new' | 'market_signal' | 'market'
    | 'oelz_development_relevance' | 'possible_oelz_transfer'
    | 'source_url' | 'source_date'
  >
>

export function missingForImpulse(impulse: ImpulseCandidate): string[] {
  return IMPULSE_REQUIREMENTS.filter((r) => !r.ok(impulse)).map((r) => r.label)
}
