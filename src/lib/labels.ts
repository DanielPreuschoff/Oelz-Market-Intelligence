/**
 * Deutsche Beschriftungen für Signale.
 *
 * `CATEGORY_LABELS` in `types/database.ts` führt noch die englischen
 * Bezeichnungen, die im Admin-Bereich und in der Signal-Bibliothek sichtbar
 * sind. Startseite und Wettbewerbsradar sind durchgehend deutsch und teilen
 * sich deshalb diese Tabelle, bis die Umstellung modulweit nachgezogen ist.
 */

import type { ImportanceLevel, SignalCategory } from '@/types/database'

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

/**
 * Wichtigkeit als einzige Farbskala: Grau → Braun → Orange.
 *
 * Die dreizehn Kategorienfarben aus `CATEGORY_COLORS` kämpfen gegen die CI —
 * im Wettbewerbsradar trägt Farbe deshalb nur die Wichtigkeit, die Kategorie
 * bleibt ein neutraler Text-Chip (Design-Analyse 3e). „Kritisch" nimmt das
 * Orange auf, das auch der Randbalken der Zeile führt; `--oelz-orange-text`
 * statt `--primary`, weil letzteres auf Versalien nur 2,3:1 Kontrast bringt.
 */
export const IMPORTANCE_DE: Record<ImportanceLevel, { label: string; chip: string }> = {
  '1': { label: 'Beachtenswert', chip: 'border border-border text-muted-foreground' },
  '2': { label: 'Wichtig', chip: 'border border-oelz-braun/25 bg-oelz-braun/10 text-oelz-braun' },
  '3': { label: 'Kritisch', chip: 'border border-oelz-orange/35 bg-oelz-orange/12 text-oelz-orange-text' },
}
