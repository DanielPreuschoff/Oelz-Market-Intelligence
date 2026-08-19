/**
 * Die beiden Listen unter der Bühne: neue Signale und neue Rohstoffsignale.
 *
 * Beide Kästen sind halb/halb breit, gleich hoch (das Raster streckt sie) und
 * haben dieselbe Zeilen-Anatomie: Titel über maximal zwei Zeilen, darunter eine
 * Zeile Kontext. Nur so lesen sie sich als Geschwister und nicht als zwei
 * zufällig nebeneinander gestellte Blöcke.
 */

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { CATEGORY_LABELS_DE } from '@/lib/startseite/labels'
import { wettbewerberLogo } from '@/lib/wettbewerber-logos'
import type { RohstoffTeaser, SignalTeaser, StudieTeaser } from '@/lib/startseite/daten'

const tagKurz = (iso: string) => format(new Date(iso), 'd. MMM', { locale: de })

/**
 * Der erste Satz eines Anreissers. Bei Rohstoffsignalen trägt er die
 * Kernaussage, der Rest ist Beleg und gehört ins Modul. Ohne Satzende bleibt
 * der Text stehen; zu lange Sätze kappt das Layout mit „…".
 */
function ersterSatz(text: string): string {
  return text.match(/^.*?[.!?](?=\s|$)/)?.[0]?.trim() ?? text
}

/** Neutraler Text-Chip. Farbe trägt auf dieser Seite nur Orange. */
export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-background/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground whitespace-nowrap">
      {children}
    </span>
  )
}

export function ListenKopf({
  name,
  zusatz,
  href,
  linkText,
  style,
}: {
  name: string
  zusatz: string
  href: string
  linkText: string
  style?: React.CSSProperties
}) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-4 einblenden" style={style}>
      <h2 className="flex items-baseline gap-3">
        <span className="dachzeile">{name}</span>
        <span className="text-sm text-muted-foreground">{zusatz}</span>
      </h2>
      <Link
        href={href}
        className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-semibold text-primary hover:underline"
      >
        {linkText} <ArrowUpRight className="size-3.5" />
      </Link>
    </div>
  )
}

/** „N weitere …" — sitzt immer am Fuß des Kastens. */
export function RestZeile({ n, href, wo }: { n: number; href: string; wo: string }) {
  if (n <= 0) return null
  return (
    <Link
      href={href}
      className="mt-auto block px-4 py-2.5 text-xs font-semibold text-primary transition-colors duration-[var(--motion-mikro)] hover:bg-[var(--waesche)]"
    >
      {n} weitere {wo} →
    </Link>
  )
}

/** Signal: Produktfoto, sonst Wettbewerber-Logo, sonst nur Text. */
export function SignalZeile({ signal, href }: { signal: SignalTeaser; href: string }) {
  const logo = signal.wettbewerber?.logo_url ?? wettbewerberLogo(signal.wettbewerber?.short_name)
  return (
    <Link
      href={href}
      className="group flex flex-1 items-center gap-4 px-4 py-3 min-h-[4.5rem] transition-colors duration-[var(--motion-mikro)] hover:bg-[var(--waesche)]"
    >
      {signal.image_url ? (
        <span className="block size-14 shrink-0 overflow-hidden rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={signal.image_url} alt="" className="h-full w-full object-cover" loading="lazy" />
        </span>
      ) : logo ? (
        <span className="flex size-14 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-white p-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo}
            alt={signal.wettbewerber?.short_name ?? ''}
            className="max-h-full max-w-full object-contain"
            loading="lazy"
          />
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="font-display text-[15px] font-bold leading-snug line-clamp-2 transition-colors duration-[var(--motion-mikro)] group-hover:text-primary">
          {signal.headline}
        </span>
        <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          {signal.importance === '3' && (
            <span className="inline-flex items-center gap-1 font-bold text-oelz-orange-text">
              <span className="size-1.5 rounded-full bg-oelz-orange" /> Kritisch
            </span>
          )}
          {signal.wettbewerber && <span className="font-medium text-foreground/80">{signal.wettbewerber.short_name}</span>}
          {signal.land && <span>{signal.land}</span>}
          <Chip>{CATEGORY_LABELS_DE[signal.category]}</Chip>
          {signal.signal_date && <span className="ml-auto tabular-nums">{tagKurz(signal.signal_date)}</span>}
        </span>
      </span>
    </Link>
  )
}

/**
 * Rohstoffsignal: Gegenstand fett, darunter die Neuigkeit als Anreißer.
 * Bewusst nur der Befund — die Einschätzung der Redaktion hängt ohne die
 * Relevanzkette in der Luft und gehört ins Modul (Glossar: Befund/Einschätzung).
 */
export function RohstoffZeile({ signal }: { signal: RohstoffTeaser }) {
  return (
    <Link
      href={`/rohstoff-radar?signal=${signal.id}`}
      className="group flex flex-1 items-center gap-4 px-4 py-3 min-h-[4.5rem] transition-colors duration-[var(--motion-mikro)] hover:bg-[var(--waesche)]"
    >
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-3">
          <span className="font-display text-[15px] font-bold leading-snug line-clamp-2 transition-colors duration-[var(--motion-mikro)] group-hover:text-primary">
            {signal.subject_name}
          </span>
          {signal.published_at && (
            <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{tagKurz(signal.published_at)}</span>
          )}
        </span>
        {signal.what_is_new ? (
          <span className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-1">
            {ersterSatz(signal.what_is_new)}
          </span>
        ) : (
          <span className="mt-1 block text-xs text-muted-foreground">
            {signal.subject_type}
            {signal.maturity && <> · {signal.maturity}</>}
          </span>
        )}
      </span>
    </Link>
  )
}

export function StudieZeile({ studie }: { studie: StudieTeaser }) {
  return (
    <Link
      href={`/studien/${studie.id}`}
      className="group flex items-center gap-4 px-4 py-3 transition-colors duration-[var(--motion-mikro)] hover:bg-[var(--waesche)]"
    >
      <span className="min-w-0 flex-1">
        <span className="block font-display text-[15px] font-bold leading-snug transition-colors duration-[var(--motion-mikro)] group-hover:text-primary">
          {studie.title}
        </span>
        <span className="mt-1 text-xs text-muted-foreground line-clamp-1">
          {studie.summary}
          {studie.date_published && <> · {tagKurz(studie.date_published)}</>}
        </span>
      </span>
    </Link>
  )
}
