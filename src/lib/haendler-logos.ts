/**
 * Händler-Logos für das Kundenradar als statische Dateien unter
 * public/logos/haendler/, zugeordnet über den Kettennamen (`retailers.name`) —
 * ein Logo gilt für alle Länder einer Kette. Muster wie wettbewerber-logos.ts:
 * Logos ändern sich praktisch nie, gehören ins Repo und brauchen keinen Upload.
 *
 * Quelle: Wikimedia Commons bzw. englische Wikipedia (Mercator), geladen am
 * 05.11.2026 auf Daniels Freigabe. BILLA als aktuelle Fassung (gelb auf rot,
 * 2025) statt der alten SVG, die nur den gelben Schriftzug ohne Grund hat.
 *
 * Nachtrag 06.11.2026: neun Händler aus Kais Liste. Carrefour als PNG mit
 * Schriftzug (italienische Wikipedia), weil die Commons-SVG nur das Symbol
 * zeigt; Conad ebenfalls aus der italienischen Wikipedia; M&S als Kurzmarke,
 * Waitrose als schlichte Wortmarke.
 */
const LOGOS: Record<string, string> = {
  Kaufland: '/logos/haendler/kaufland.svg',
  Lidl: '/logos/haendler/lidl.svg',
  'Aldi Süd': '/logos/haendler/aldi-sued.svg',
  Hofer: '/logos/haendler/hofer.svg',
  REWE: '/logos/haendler/rewe.svg',
  BILLA: '/logos/haendler/billa.png',
  Edeka: '/logos/haendler/edeka.svg',
  Norma: '/logos/haendler/norma.svg',
  SPAR: '/logos/haendler/spar.svg',
  Coop: '/logos/haendler/coop.svg',
  Migros: '/logos/haendler/migros.svg',
  Mercator: '/logos/haendler/mercator.svg',
  Konzum: '/logos/haendler/konzum.svg',
  Tesco: '/logos/haendler/tesco.svg',
  "Sainsbury's": '/logos/haendler/sainsburys.svg',
  // 06.11.2026 — Kais Liste (Migration 020)
  'Aldi Nord': '/logos/haendler/aldi-nord.svg',
  Sutterlüty: '/logos/haendler/sutterluety.svg',
  'Marks & Spencer': '/logos/haendler/marks-spencer.svg',
  Waitrose: '/logos/haendler/waitrose.svg',
  Carrefour: '/logos/haendler/carrefour.png',
  Conad: '/logos/haendler/conad.svg',
  Mercadona: '/logos/haendler/mercadona.svg',
  Walmart: '/logos/haendler/walmart.svg',
  Costco: '/logos/haendler/costco.svg',
  // 10.11.2026 — Simons A-Kunden (Migration 021). Aldi in CH, HU und UK
  // tritt mit dem Logo von Aldi Süd auf.
  Aldi: '/logos/haendler/aldi-sued.svg',
}

/** Logo-Pfad für einen Kettennamen — null, wenn keins vorliegt. */
export function haendlerLogo(name: string | null | undefined): string | null {
  if (!name) return null
  return LOGOS[name] ?? null
}
