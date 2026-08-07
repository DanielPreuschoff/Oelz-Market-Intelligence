import { ArrowRight } from 'lucide-react'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { nextStepLabel, type IngredientSignal } from '@/types/ingredient-signals'

/**
 * Die Karte trägt die Relevanzkette als knappe Leiter — sie soll in etwa
 * 15 Sekunden beantworten: was ist es, was kann es, warum sollte mich das
 * interessieren. Die Leiter ist als redaktionelle Einschätzung beschriftet
 * und abgesetzt, damit sie nicht als Befund aus der Quelle gelesen wird.
 *
 * `isNew` kommt von außen, weil sich Neuheit am Stand des Moduls bemisst —
 * den kennt nur die Übersicht.
 */
export function IngredientSignalCard({
  signal,
  isNew = false,
}: {
  signal: IngredientSignal
  isNew?: boolean
}) {
  const stepLabel = nextStepLabel(signal.next_step)

  const chain: [string, string | null][] = [
    ['Thema', signal.strategic_theme],
    ['Funktion', signal.functions.join(' · ') || null],
    ['Chance', signal.oelz_opportunity],
  ]

  return (
    <article className="rounded-xl border border-border/80 bg-card p-5 h-full flex flex-col hover:shadow-md hover:border-primary/10 transition-shadow">
      <div className="flex items-center gap-1.5 flex-wrap mb-2">
        <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded bg-secondary">
          {signal.subject_type}
        </span>
        {signal.maturity && (
          <span className="text-[10px] px-2 py-0.5 rounded border border-border text-muted-foreground">
            {signal.maturity}
          </span>
        )}
        {isNew && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-oelz-orange text-oelz-on-orange">
            Neu
          </span>
        )}
      </div>

      <h3 className="font-display font-bold leading-tight mb-1">{signal.title}</h3>
      <p className="text-xs text-muted-foreground mb-4">{signal.subject_name}</p>

      <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground/70 font-semibold mb-1.5">
        Einschätzung der Redaktion
      </p>
      <div className="border-l-2 border-primary/25 pl-3 space-y-2.5">
        {chain.map(([label, value]) =>
          value ? (
            <div key={label} className="flex gap-2 items-start">
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold w-14 shrink-0 pt-px">
                {label}
              </span>
              <span className="text-xs leading-snug line-clamp-2">{value}</span>
            </div>
          ) : null
        )}
      </div>

      <div className="mt-auto pt-4">
        <div className="pt-3 border-t border-border/70 flex items-center justify-between gap-2 text-xs">
          {stepLabel ? (
            <span className="inline-flex items-center gap-1.5 font-semibold text-primary whitespace-nowrap shrink-0">
              {stepLabel} <ArrowRight className="w-3.5 h-3.5" />
            </span>
          ) : (
            <span />
          )}
          <span className="text-muted-foreground truncate text-right">
            {[signal.evidence, signal.source_date && format(new Date(signal.source_date), 'd. MMM yyyy', { locale: de })]
              .filter(Boolean)
              .join(' · ')}
          </span>
        </div>
      </div>
    </article>
  )
}
