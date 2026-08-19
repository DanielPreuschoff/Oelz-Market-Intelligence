import type { SignalCategory } from '@/types/database'

/**
 * Deutsche Kategoriebeschriftungen für die Startseite.
 *
 * Die Plattform führt in `CATEGORY_LABELS` (types/database.ts) noch die
 * englischen Bezeichnungen, die im Reader an mehreren Stellen sichtbar sind.
 * Die Startseite ist durchgehend deutsch; sie bekommt deshalb ihre eigene
 * Tabelle, bis die Umstellung modulweit nachgezogen ist.
 */
export const CATEGORY_LABELS_DE: Record<SignalCategory, string> = {
  product_launch: 'Produktlaunch',
  packaging_change: 'Verpackung',
  distribution: 'Distribution',
  production_capacity: 'Produktion',
  m_and_a: 'M&A',
  campaign: 'Kampagne',
  pricing: 'Preis',
  hiring_signal: 'Personal',
  technology: 'Technologie',
  sustainability: 'Nachhaltigkeit',
  startup_signal: 'Start-up',
  regulatory: 'Regulatorik',
  partnership: 'Partnerschaft',
}
