/**
 * Filterzeilen, Ergebniszeile und Seitenblättern der Editionsansicht.
 *
 * Chips und Ergebniszeile sitzen an derselben Stelle und tragen dieselben
 * Klassen wie in Produkt- und Rohstoff-Radar. Die Chips sind bewusst normale
 * `<a>`: der Filter steckt in der URL, das braucht kein JavaScript.
 */

import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CATEGORY_LABELS_DE } from '@/lib/labels'
import type { SignalCategory } from '@/types/database'

function Chip({ href, aktiv, children }: { href: string; aktiv: boolean; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className={cn(
        'rounded-full border px-2.5 py-1 text-xs transition-colors',
        aktiv ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:bg-secondary'
      )}
    >
      {children}
    </a>
  )
}

export function EditionFilter({
  categories,
  competitorMap,
  aktiveKategorie,
  aktiverWettbewerber,
  trefferAnzahl,
  hatFilter,
  toggle,
  resetHref,
}: {
  categories: SignalCategory[]
  competitorMap: Map<string, string>
  aktiveKategorie?: string
  aktiverWettbewerber?: string
  trefferAnzahl: number
  hatFilter: boolean
  toggle: (key: string, value: string) => string
  resetHref: string
}) {
  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="w-24 text-xs font-medium text-muted-foreground">Kategorie</span>
        {categories.map((cat) => (
          <Chip key={cat} href={toggle('category', cat)} aktiv={aktiveKategorie === cat}>
            {CATEGORY_LABELS_DE[cat]}
          </Chip>
        ))}
      </div>

      {competitorMap.size > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="w-24 text-xs font-medium text-muted-foreground">Wettbewerber</span>
          {[...competitorMap.entries()].map(([id, kurzname]) => (
            <Chip key={id} href={toggle('competitor', id)} aktiv={aktiverWettbewerber === id}>
              {kurzname}
            </Chip>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {trefferAnzahl} {trefferAnzahl === 1 ? 'Signal' : 'Signale'} gefunden
        </span>
        {hatFilter && (
          <a href={resetHref} className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground">
            Alle Filter zurücksetzen
          </a>
        )}
      </div>
    </div>
  )
}

export function EditionBlaettern({
  currentPage,
  totalPages,
  pageSize,
  gesamt,
  buildUrl,
}: {
  currentPage: number
  totalPages: number
  pageSize: number
  gesamt: number
  buildUrl: (patch: Record<string, string | undefined>) => string
}) {
  if (totalPages <= 1) return null
  return (
    <div className="flex items-center justify-between border-t pt-2">
      <span className="text-xs text-muted-foreground">
        {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, gesamt)} von {gesamt} Signalen
      </span>
      <div className="flex items-center gap-1">
        {currentPage > 1 && (
          <Link
            href={buildUrl({ page: String(currentPage - 1) })}
            className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs transition-colors hover:bg-secondary"
          >
            <ChevronLeft className="size-3.5" /> Zurück
          </Link>
        )}
        <span className="px-3 py-1.5 text-xs text-muted-foreground">
          {currentPage} / {totalPages}
        </span>
        {currentPage < totalPages && (
          <Link
            href={buildUrl({ page: String(currentPage + 1) })}
            className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs transition-colors hover:bg-secondary"
          >
            Weiter <ChevronRight className="size-3.5" />
          </Link>
        )}
      </div>
    </div>
  )
}

export function KeineSignale({ resetHref }: { resetHref: string }) {
  return (
    <div className="rounded-xl border bg-card py-12 text-center text-sm text-muted-foreground">
      <p className="font-medium">Keine Signale für diese Filter</p>
      <p className="mt-1 text-xs">
        Passe die Filter an oder{' '}
        <a href={resetHref} className="underline underline-offset-2 hover:text-foreground">
          setze sie zurück
        </a>
        .
      </p>
    </div>
  )
}
