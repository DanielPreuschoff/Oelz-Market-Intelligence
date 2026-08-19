/**
 * Wettbewerber-Logos als statische Dateien unter public/logos/wettbewerber/,
 * zugeordnet über den Kurznamen aus dem Wettbewerbsregister (competitors.short_name).
 *
 * Bewusst eine Datei-Zuordnung und kein Storage-Bucket: Logos ändern sich
 * praktisch nie, gehören ins Repo und brauchen keinen Upload-Weg. Sobald
 * `competitors.logo_url` gepflegt ist, hat die Datenbank Vorrang — diese
 * Tabelle ist der Rückfall (und für den Prototyp die einzige Quelle).
 *
 * Fehlende Logos (Stand 19.08.2026): Gradski mlin, Wittmann.
 */
const LOGOS: Record<string, string> = {
  'Harry-Brot': '/logos/wettbewerber/harry-brot.jpg',
  Lieken: '/logos/wettbewerber/lieken.png',
  Backaldrin: '/logos/wettbewerber/backaldrin.jpg',
  Penam: '/logos/wettbewerber/penam.png',
  'Delta Pekárny': '/logos/wettbewerber/delta-pekarny.jpg',
  Manner: '/logos/wettbewerber/manner.png',
  Mestemacher: '/logos/wettbewerber/mestemacher.png',
  'La Boulangère': '/logos/wettbewerber/la-boulangere.png',
  'La Fournée Dorée': '/logos/wettbewerber/la-fournee-doree.png',
  'St Michel': '/logos/wettbewerber/st-michel.png',
  'Dan Cake': '/logos/wettbewerber/dan-cake.png',
  Kuchenmeister: '/logos/wettbewerber/kuchenmeister.png',
  Warburtons: '/logos/wettbewerber/warburtons.svg',
  Hovis: '/logos/wettbewerber/hovis.png',
  ABF: '/logos/wettbewerber/abf.png',
  Lantmännen: '/logos/wettbewerber/lantmaennen.svg',
  Schulstad: '/logos/wettbewerber/schulstad.webp',
  Fazer: '/logos/wettbewerber/fazer.png',
  ARYZTA: '/logos/wettbewerber/aryzta.webp',
  Spitz: '/logos/wettbewerber/spitz.png',
  '7DAYS': '/logos/wettbewerber/7days.jpg',
  Vandemoortele: '/logos/wettbewerber/vandemoortele.png',
  Bimbo: '/logos/wettbewerber/bimbo.png',
  Barilla: '/logos/wettbewerber/barilla.png',
}

/** Logo-Pfad für einen Wettbewerber-Kurznamen — null, wenn keins vorliegt. */
export function wettbewerberLogo(shortName: string | null | undefined): string | null {
  if (!shortName) return null
  return LOGOS[shortName] ?? null
}
