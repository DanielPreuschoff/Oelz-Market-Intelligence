/**
 * MUSTER Stufe 2 — Bausteine. Wegwerf-Code zur Abstimmung von Look und Aufbau
 * (Daniel, 05.11.2026). Nichts hiervon wird von den echten Seiten benutzt;
 * nach der Entscheidung fliegt der Ordner `muster/` komplett raus.
 *
 * - Markenzeichen: echtes Logo aus src/lib/haendler-logos.ts, sonst Initial in
 *   der Hausfarbe der Kette als Rückfall.
 * - Kennzahlen: von Hand aus den Kurzprofilen des Erstlaufs übertragen. In der
 *   Umsetzung wären das vier Spalten an `retailers` (kleine Migration).
 */
import {
  Building2,
  Compass,
  Croissant,
  Layers,
  LayoutGrid,
  Truck,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { haendlerLogo } from '@/lib/haendler-logos'
import type { Land, Signaltyp } from '@/types/kundenradar'

// ---------------------------------------------------------------- Marken

const MARKEN: Record<string, { bg: string; fg: string; zeichen: string }> = {
  Kaufland: { bg: '#E10915', fg: '#FFFFFF', zeichen: 'K' },
  Lidl: { bg: '#0050AA', fg: '#FFF000', zeichen: 'L' },
  'Aldi Süd': { bg: '#1E2A78', fg: '#FFFFFF', zeichen: 'A' },
  Hofer: { bg: '#1E2A78', fg: '#FFFFFF', zeichen: 'H' },
  REWE: { bg: '#CC071E', fg: '#FFFFFF', zeichen: 'R' },
  BILLA: { bg: '#FFE500', fg: '#E3000F', zeichen: 'B' },
  Edeka: { bg: '#FFD500', fg: '#1A4594', zeichen: 'E' },
  Norma: { bg: '#D6001C', fg: '#FFFFFF', zeichen: 'N' },
  SPAR: { bg: '#00843D', fg: '#FFFFFF', zeichen: 'S' },
  Coop: { bg: '#EE7203', fg: '#FFFFFF', zeichen: 'C' },
  Migros: { bg: '#FF6600', fg: '#FFFFFF', zeichen: 'M' },
  Mercator: { bg: '#E30613', fg: '#FFFFFF', zeichen: 'M' },
  Konzum: { bg: '#E2001A', fg: '#FFFFFF', zeichen: 'K' },
  Tesco: { bg: '#00539F', fg: '#FFFFFF', zeichen: 'T' },
  "Sainsbury's": { bg: '#F06C00', fg: '#FFFFFF', zeichen: 'S' },
}

export function Marke({ name, groesse = 'md' }: { name: string; groesse?: 'sm' | 'md' | 'lg' }) {
  const logo = haendlerLogo(name)
  if (logo) {
    // Weißes Kästchen wie bei den Wettbewerber-Logos; breiter als hoch, weil die
    // meisten Händler Wortmarken führen (Tesco, Migros, SPAR …).
    return (
      <span
        aria-hidden
        className={cn(
          'inline-flex shrink-0 items-center justify-center rounded-xl border border-border/60 bg-white shadow-sm',
          groesse === 'sm' && 'h-7 w-11 rounded-lg p-1',
          groesse === 'md' && 'h-11 w-16 p-1.5',
          groesse === 'lg' && 'h-16 w-24 rounded-2xl p-2'
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt="" className="max-h-full max-w-full object-contain" />
      </span>
    )
  }
  const m = MARKEN[name] ?? { bg: 'var(--muted)', fg: 'var(--foreground)', zeichen: name.slice(0, 1) }
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-xl font-display font-bold shadow-sm ring-1 ring-black/5',
        groesse === 'sm' && 'size-7 rounded-lg text-sm',
        groesse === 'md' && 'size-11 text-xl',
        groesse === 'lg' && 'size-16 rounded-2xl text-3xl'
      )}
      style={{ background: m.bg, color: m.fg }}
    >
      {m.zeichen}
    </span>
  )
}

// ---------------------------------------------------------------- Länder

/** Ländercode als ruhige Plakette — Flaggen-Emojis zeigt Windows nur als Buchstaben. */
export function LandCode({ land, className }: { land: Land; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-5 min-w-7 items-center justify-center rounded-md border border-border bg-background px-1 font-mono text-[10px] font-semibold tracking-wider text-foreground/80',
        className
      )}
    >
      {land}
    </span>
  )
}

// ---------------------------------------------------------------- Signaltypen

export const TYP_STIL: Record<Signaltyp, { icon: LucideIcon; chip: string; punkt: string }> = {
  strategie: { icon: Compass, chip: 'bg-indigo-50 text-indigo-800 border-indigo-200', punkt: 'bg-indigo-500' },
  format_flaeche: { icon: LayoutGrid, chip: 'bg-teal-50 text-teal-800 border-teal-200', punkt: 'bg-teal-500' },
  backstation_pos: { icon: Croissant, chip: 'bg-amber-50 text-amber-800 border-amber-200', punkt: 'bg-amber-500' },
  sortimentskonzept: { icon: Layers, chip: 'bg-violet-50 text-violet-800 border-violet-200', punkt: 'bg-violet-500' },
  investition_expansion: { icon: Building2, chip: 'bg-emerald-50 text-emerald-800 border-emerald-200', punkt: 'bg-emerald-500' },
  lieferkette: { icon: Truck, chip: 'bg-sky-50 text-sky-800 border-sky-200', punkt: 'bg-sky-500' },
}

export function TypChip({ typ, name, klein = false }: { typ: Signaltyp; name: string; klein?: boolean }) {
  const s = TYP_STIL[typ]
  const Icon = s.icon
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border font-medium',
        klein ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-[11px]',
        s.chip
      )}
    >
      <Icon className={klein ? 'size-3' : 'size-3.5'} />
      {name}
    </span>
  )
}

// ---------------------------------------------------------------- Kennzahlen

export interface Kennzahlen {
  filialen: string
  stellung: string
  backen: string
  eigenmarken: string
}

/** Von Hand aus den Kurzprofilen (Erstlauf 11/2026) — nur fürs Muster. */
export const KENNZAHLEN: Record<string, Kennzahlen> = {
  'kaufland-de': { filialen: 'über 790', stellung: 'Großfläche, ~30.000 Artikel', backen: 'Backshop nahe Obst & Gemüse', eigenmarken: 'K-Classic, K-Gold Edition' },
  'aldi-sued-de': { filialen: 'rund 2.000', stellung: 'Discount, ~90 % Eigenmarke', backen: 'Meine Backwelt, ~60 Artikel', eigenmarken: 'Meine Backwelt, Goldähren' },
  'lidl-de': { filialen: 'über 3.250', stellung: 'Discount, ~4.300 Artikel', backen: 'Backstation, bis ~50 Artikel', eigenmarken: 'Unser Brot, Deluxe' },
  'rewe-de': { filialen: 'rund 3.800', stellung: 'Vollsortiment, 100–5.000 m²', backen: 'Backstation „Brot & Mehr“', eigenmarken: 'ja!, REWE Bio, Feine Welt' },
  'edeka-de': { filialen: '6.438 Märkte', stellung: 'Genossenschaft, Kaufleute', backen: '14 eigene Backbetriebe', eigenmarken: 'EDEKA, EDEKA Regional' },
  'norma-de': { filialen: 'über 1.450 (Verbund)', stellung: 'Harddiscount', backen: 'täglich frische Backwaren', eigenmarken: 'BIO SONNE' },
  'hofer-at': { filialen: 'rund 540', stellung: 'Diskonter Nr. 1, ~90 % Eigenmarke', backen: 'BACKBOX, bis 42 Sorten', eigenmarken: 'BACKBOX, Zurück zum Ursprung' },
  'lidl-at': { filialen: 'über 255', stellung: 'Diskont, 2 Mrd. € Umsatz', backen: 'Backshop, ~50 Artikel', eigenmarken: 'Ein gutes Stück Heimat, Vemondo' },
  'billa-at': { filialen: 'fast 1.300', stellung: 'BILLA und BILLA PLUS', backen: 'Bäckerei in BILLA PLUS', eigenmarken: 'clever, BILLA immer gut' },
  'spar-at': { filialen: '1.514', stellung: 'Marktführer Österreich', backen: '8 INTERSPAR-Bäckereien', eigenmarken: 'S-BUDGET, Natur*pur, PREMIUM' },
  'coop-ch': { filialen: '1.000 Supermärkte', stellung: 'will Nr. 1 werden', backen: 'Panofina, 75 Hausbäckereien', eigenmarken: 'Prix Garantie, Naturaplan' },
  'migros-ch': { filialen: '659 Supermärkte', stellung: 'Genossenschaft, M/MM/MMM', backen: 'FFB-Group, ~90 Hausbäckereien', eigenmarken: 'Dachmarke Migros, M-Budget' },
  'kaufland-cz': { filialen: '149', stellung: 'Nr. 2 im Lebensmittelhandel', backen: 'eigene Bäckerei an der Hauptlaufroute', eigenmarken: 'K-Jarmark, K-Classic' },
  'kaufland-sk': { filialen: '88', stellung: 'Schwarz-Gruppe, 26.000 Artikel', backen: 'eigene Bäckerei im Markt', eigenmarken: 'K-Classic, K-Z lásky k tradícii' },
  'kaufland-hr': { filialen: '53', stellung: 'Schwarz-Gruppe, ~15.000 Artikel', backen: 'Bake-off, 27 Lieferanten', eigenmarken: 'K-Classic' },
  'kaufland-ro': { filialen: 'über 200', stellung: 'Marktführer nach Umsatz', backen: 'Brutărie in jedem Markt', eigenmarken: 'Vreau din România' },
  'spar-si': { filialen: '113 + 48 Partner', stellung: 'SPAR, INTERSPAR, Partner', backen: 'Pekarna SPAR, vorerst extern', eigenmarken: 'SPAR, S-BUDGET, Despar' },
  'mercator-si': { filialen: '392', stellung: 'rund ein Viertel Marktanteil', backen: 'Sosedova pekarna, >120 Brote', eigenmarken: '>3.000 Eigenmarkenartikel' },
  'konzum-hr': { filialen: 'über 600', stellung: 'Marktführer Kroatien', backen: 'SB-Bäckereien, ~100 Lieferanten', eigenmarken: 'Konzum pekarnica' },
  'tesco-uk': { filialen: '2.967 ohne One Stop', stellung: '28,5 % Marktanteil', backen: 'In-Store-Bäckereien, Bake-off', eigenmarken: 'Finest, Tesco' },
  'sainsburys-uk': { filialen: '1.510', stellung: 'Nr. 2 im britischen Handel', backen: 'nur noch Bake-off', eigenmarken: 'Taste the Difference' },
}

export function MusterHinweis() {
  return (
    <div className="rounded-lg border border-dashed border-oelz-orange/50 bg-oelz-orange/8 px-4 py-2 text-xs text-oelz-orange-text">
      <strong>Muster Stufe 2</strong> — zur Abstimmung, nicht für Nutzer. Die Logos sind echt (Wikimedia),
      die Kennzahlen von Hand aus den Kurzprofilen übertragen.
    </div>
  )
}
