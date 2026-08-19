/**
 * Eine Signalzeile im Editionsverlauf.
 *
 * Anatomie: das Logo des Wettbewerbers links als Absender, daneben die
 * Kopfzeile (Wichtigkeit → Wettbewerber → Land → Kategorie, Datum rechts), der
 * Text darunter über die volle Restbreite und ein Fuß aus Rollen und Quelle.
 *
 * Zwei Festlegungen aus der Design-Analyse stecken darin: Farbe trägt nur die
 * Wichtigkeit (`IMPORTANCE_DE`), die Kategorie bleibt ein neutraler Chip; und
 * die Zeile ist kein Link, hebt sich beim Überfahren deshalb per Farbwäsche
 * statt per Schatten — dieselbe Hover-Sprache wie auf der Startseite.
 *
 * Das Logo steht bewusst nur einmal je Zeile: neben dem Namen in der Kopfzeile
 * wäre es dasselbe Bild ein zweites Mal.
 */

import Link from 'next/link'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { ExternalLink, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ROLE_LABELS, type SignalWithRelations } from '@/types/database'
import { CATEGORY_LABELS_DE, IMPORTANCE_DE } from '@/lib/labels'
import { wettbewerberLogo } from '@/lib/wettbewerber-logos'

const datum = (iso: string) => format(new Date(iso), 'd. MMM yyyy', { locale: de })

/** Neutraler Text-Chip — Farbe trägt in diesem Modul nur die Wichtigkeit. */
export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center whitespace-nowrap rounded-full border border-border bg-background/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
      {children}
    </span>
  )
}

export function WichtigkeitChip({ stufe }: { stufe: SignalWithRelations['importance'] }) {
  const w = IMPORTANCE_DE[stufe]
  return (
    <span className={cn('inline-flex items-center whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-bold', w.chip)}>
      {w.label}
    </span>
  )
}

function Rollen({ signal, highlightRole }: { signal: SignalWithRelations; highlightRole?: string }) {
  return (
    <div className="flex flex-wrap gap-1">
      {signal.role_relevance.map((role) => (
        <span
          key={role}
          className={cn(
            'rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider',
            // Nur die eigene Rolle ist für den Leser relevant; die übrigen sind
            // Metadaten und bleiben still.
            role === highlightRole ? 'bg-oelz-orange text-oelz-on-orange' : 'bg-secondary/60 text-muted-foreground/80'
          )}
        >
          {ROLE_LABELS[role]}
        </span>
      ))}
    </div>
  )
}

function Quelle({ signal }: { signal: SignalWithRelations }) {
  return (
    <div className="flex items-center gap-2">
      {signal.ai_generated && (
        <span className="inline-flex items-center gap-0.5 rounded bg-muted/30 px-1 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
          <Sparkles className="size-2.5" />AI
        </span>
      )}
      {signal.source_url ? (
        <a
          href={signal.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-0.5 text-xs font-medium text-muted-foreground transition-colors hover:text-oelz-orange-text"
        >
          {signal.source_name ?? 'Quelle'}
          <ExternalLink className="size-3" />
        </a>
      ) : (
        signal.source_name && <span className="text-xs font-medium text-muted-foreground">{signal.source_name}</span>
      )}
    </div>
  )
}

export function SignalZeile({
  signal,
  highlightRole,
}: {
  signal: SignalWithRelations
  highlightRole?: string
}) {
  const kritisch = signal.importance === '3'
  const logo = signal.competitor?.logo_url ?? wettbewerberLogo(signal.competitor?.short_name)

  return (
    <article
      className={cn(
        'flex gap-5 rounded-xl border border-border/80 bg-card p-5 transition-colors duration-[var(--motion-mikro)] hover:bg-[var(--waesche)]',
        kritisch && 'rounded-l-none border-l-4 border-l-oelz-orange pl-4'
      )}
    >
      <div className="hidden w-16 shrink-0 sm:block">
        {logo ? (
          <span className="flex size-16 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-white p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo}
              alt={signal.competitor?.short_name ?? ''}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
            />
          </span>
        ) : (
          <span className="flex size-16 items-center justify-center rounded-lg bg-secondary font-display text-base font-bold text-muted-foreground">
            {signal.competitor?.short_name.slice(0, 2) ?? '·'}
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
            {signal.importance !== '1' && <WichtigkeitChip stufe={signal.importance} />}
            {signal.competitor && (
              <Link
                href={`/competitors/${signal.competitor.id}`}
                className="min-w-0 truncate text-xs font-semibold text-foreground transition-colors hover:text-oelz-orange-text"
              >
                {signal.competitor.short_name}
              </Link>
            )}
            {signal.country && <span>{signal.country.name}</span>}
            <Chip>{CATEGORY_LABELS_DE[signal.category]}</Chip>
          </div>
          {signal.signal_date && (
            <time className="shrink-0 text-xs font-medium tabular-nums text-muted-foreground">
              {datum(signal.signal_date)}
            </time>
          )}
        </div>

        <h3 className="font-display text-base font-bold leading-snug tracking-wide text-foreground sm:text-[17px]">
          {signal.headline}
        </h3>

        <p className="text-sm leading-relaxed text-muted-foreground">{signal.summary}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <Rollen signal={signal} highlightRole={highlightRole} />
          <Quelle signal={signal} />
        </div>
      </div>
    </article>
  )
}
