/**
 * Händler-Logos für das Kundenradar als statische Dateien unter
 * public/logos/haendler/, zugeordnet über den Kettennamen (`retailers.name`) —
 * ein Logo gilt für alle Länder einer Kette. Muster wie wettbewerber-logos.ts:
 * Logos ändern sich praktisch nie, gehören ins Repo und brauchen keinen Upload.
 *
 * Quelle: Wikimedia Commons bzw. englische Wikipedia (Mercator), geladen am
 * 05.11.2026 auf Daniels Freigabe. BILLA als aktuelle Fassung (gelb auf rot,
 * 2025) statt der alten SVG, die nur den gelben Schriftzug ohne Grund hat.
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
}

/** Logo-Pfad für einen Kettennamen — null, wenn keins vorliegt. */
export function haendlerLogo(name: string | null | undefined): string | null {
  if (!name) return null
  return LOGOS[name] ?? null
}
