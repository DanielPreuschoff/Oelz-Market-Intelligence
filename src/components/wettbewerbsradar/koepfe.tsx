/**
 * Die beiden Köpfe des Wettbewerbsradars.
 *
 * `RadarKopf` folgt dem Muster des Rohstoff-Radars (Titel → Einleitungssatz →
 * Stand-Zeile), damit die Modulübersichten sich als Geschwister lesen —
 * Design-Analyse 3g. Die Stand-Zeile beschreibt die jüngste Edition („neu",
 * für alle gleich), nicht den Lesestand des Nutzers („ungesehen", Zähler in
 * der Seitenleiste) — deshalb sagt sie „45 Signale", nicht „45 neue": sonst
 * stünde neben einer leeren Seitenleiste ein Kopf, der 45 behauptet.
 *
 * `EditionKopf` trägt eine orange Dachzeile: auf der Detailseite kam das Wort
 * „Wettbewerbsradar" sonst nirgends vor, die Zugehörigkeit hing allein an der
 * Seitenleiste.
 */

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'
import type { ModuleStats } from '@/lib/module-stats'
import type { Edition } from '@/types/database'

export const WETTBEWERBSRADAR_EINLEITUNG =
  'Kuratierte Beobachtung der wichtigsten Wettbewerber — neue Produkte, Claims, Kampagnen und strategische Bewegungen, monatlich als Edition gebündelt und redaktionell für Ölz eingeordnet.'

export function RadarKopf({ stats, isAdmin }: { stats?: ModuleStats; isAdmin: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-1">
        <h1 className="font-display text-3xl font-bold tracking-wide text-foreground">Wettbewerbsradar</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">{WETTBEWERBSRADAR_EINLEITUNG}</p>
        {stats?.stand && (
          <p className="pt-1 text-xs text-muted-foreground">
            Jüngste Edition: {format(new Date(stats.stand), 'd. MMMM yyyy', { locale: de })}
            {/* Die Zahl nur, solange die Edition als neu gilt — danach ist die
                Zeile ein Datum, keine Behauptung über 0 Signale. */}
            {stats.newCount > 0 && (
              <>
                <span className="mx-2">·</span>
                <span className="font-semibold text-foreground">
                  {stats.newCount} {stats.newCount === 1 ? 'Signal' : 'Signale'}
                </span>
              </>
            )}
          </p>
        )}
      </div>
      {isAdmin && (
        <Link href="/admin/editions/new" className={cn(buttonVariants({ size: 'sm' }), 'shrink-0')}>
          Neue Edition
        </Link>
      )}
    </div>
  )
}

export function EditionKopf({
  edition,
  signalAnzahl,
  kritischAnzahl,
}: {
  edition: Edition
  signalAnzahl: number
  kritischAnzahl: number
}) {
  return (
    <div className="space-y-6">
      <Link
        href="/editions"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Alle Editionen
      </Link>

      <div className="space-y-3">
        <p className="dachzeile">
          Wettbewerbsradar
          <span className="mx-1.5 opacity-60">·</span>
          Edition {format(new Date(edition.period_month), 'MMMM yyyy', { locale: de })}
        </p>
        <h1 className="font-display text-3xl font-bold leading-tight tracking-wide text-foreground sm:text-4xl">
          {edition.title}
        </h1>
        {edition.editorial_summary && (
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">{edition.editorial_summary}</p>
        )}
        <p className="pt-1 text-xs text-muted-foreground">
          {signalAnzahl} Signale
          {kritischAnzahl > 0 && (
            <>
              <span className="mx-2">·</span>
              <span className="font-semibold text-oelz-orange-text">{kritischAnzahl} kritisch</span>
            </>
          )}
          {edition.published_at && (
            <>
              <span className="mx-2">·</span>
              veröffentlicht am {format(new Date(edition.published_at), 'd. MMMM yyyy', { locale: de })}
            </>
          )}
        </p>
      </div>
    </div>
  )
}
