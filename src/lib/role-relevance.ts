import type { ImportanceLevel, SignalCategory, UserRole } from '@/types/database'

/**
 * Rollenzuordnung aus Kategorie und Wichtigkeit.
 *
 * Die Tabelle steht seit Projektbeginn in docs/role-definitions.md, war aber nie
 * implementiert — `role_relevance` wurde ausschliesslich von Hand gesetzt und bei
 * der Kandidaten-Uebernahme gar nicht. Bei einem Signal pro Woche faellt das nicht
 * auf, bei einem Monatsimport mit 60+ Signalen bliebe die Rollen-Hervorhebung im
 * Reader komplett leer.
 *
 * Die Ableitung ist ein Vorschlag, keine Festlegung: im Signal-Formular bleibt
 * jede Rolle einzeln an- und abwaehlbar.
 *
 * Aenderungen hier muessen mit docs/role-definitions.md abgeglichen werden — dort
 * steht die fachliche Wahrheit, hier nur ihre Ausfuehrung.
 */
const ROLE_RULES: {
  role: UserRole
  categories: SignalCategory[]
  /** Untere Grenze der Wichtigkeit. Nur Management filtert; alle anderen sehen auch schwache Signale. */
  minImportance: ImportanceLevel
}[] = [
  {
    role: 'management',
    categories: ['m_and_a', 'production_capacity', 'distribution', 'startup_signal', 'regulatory'],
    minImportance: '2',
  },
  {
    role: 'sales',
    categories: ['distribution', 'pricing', 'campaign', 'product_launch'],
    minImportance: '1',
  },
  {
    role: 'innovation',
    categories: ['product_launch', 'startup_signal', 'technology', 'sustainability'],
    minImportance: '1',
  },
  {
    role: 'marketing',
    categories: ['campaign', 'packaging_change', 'partnership', 'product_launch'],
    minImportance: '1',
  },
  {
    role: 'packaging',
    categories: ['packaging_change', 'sustainability', 'regulatory', 'technology'],
    minImportance: '1',
  },
]

export function deriveRoleRelevance(
  category: SignalCategory,
  importance: ImportanceLevel
): UserRole[] {
  // ImportanceLevel ist ein Text-Enum ('1' | '2' | '3'); numerisch vergleichen,
  // damit die Grenze nicht von der Zeichensortierung abhaengt.
  const level = Number(importance)
  return ROLE_RULES.filter(
    (rule) => rule.categories.includes(category) && level >= Number(rule.minImportance)
  ).map((rule) => rule.role)
}
