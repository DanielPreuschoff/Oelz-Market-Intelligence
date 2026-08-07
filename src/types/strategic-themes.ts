/**
 * Strategische Themen — modulübergreifende Trend-Taxonomie.
 *
 * Gehört bewusst der Plattform und nicht einem einzelnen Modul: das
 * Rohstoff-Radar nutzt sie zuerst, das Produkt- & Innovationsradar kann
 * später dieselben Werte übernehmen (im UI/UX-Plan als P4 vorgesehen).
 * Eine spätere aggregierende Sicht über diese Dimension ersetzt das
 * ursprünglich als eigenes Modul geplante Trend-Radar.
 *
 * Startwerte aus docs/ui-ux-optimization-plan.md Kap. 10.
 * Änderungen hier müssen mit dem CHECK in supabase/migrations/007 abgeglichen werden.
 */
export const STRATEGIC_THEMES = [
  'Proteinisierung',
  'Clean Label',
  'Premiumisierung',
  'Convenience',
  'Nachhaltigkeit',
] as const

export type StrategicTheme = (typeof STRATEGIC_THEMES)[number]
