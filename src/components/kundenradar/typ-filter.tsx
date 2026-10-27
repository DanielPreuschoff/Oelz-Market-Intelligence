import { cn } from '@/lib/utils'
import { SIGNALTYPEN, SIGNALTYP_NAME, type Signaltyp } from '@/types/kundenradar'

/**
 * Filter nach Signaltyp im Dossier — Links, keine Zustände, wie die
 * Filterreihen im Regulatorik-Radar. Gezeigt werden nur Typen, die beim
 * Händler vorkommen: Ein Chip, der in eine leere Liste führt, ist Rauschen.
 */
export function TypFilter({
  vorhanden,
  aktiv,
  href,
}: {
  vorhanden: ReadonlySet<Signaltyp>
  aktiv?: Signaltyp
  href: (typ?: Signaltyp) => string
}) {
  const typen = SIGNALTYPEN.filter((t) => vorhanden.has(t))
  if (typen.length < 2 && !aktiv) return null

  const chip = (an: boolean) =>
    cn(
      'rounded-full border px-2.5 py-1 text-xs transition-colors',
      an ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:bg-secondary'
    )

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <a href={href(undefined)} className={chip(!aktiv)}>Alle</a>
      {typen.map((t) => (
        <a key={t} href={href(t)} className={chip(aktiv === t)}>
          {SIGNALTYP_NAME[t]}
        </a>
      ))}
    </div>
  )
}
