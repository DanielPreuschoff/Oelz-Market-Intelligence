import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { ExternalLink } from 'lucide-react'
import { SIGNALTYP_NAME, type Kundensignal } from '@/types/kundenradar'

const datum = (iso: string) => format(new Date(iso), 'd. MMM yyyy', { locale: de })

/**
 * Ein Kundensignal als volle Karte im Dossier.
 *
 * Anders als im Regulatorik-Radar ohne Detail-Dialog: Wer das Dossier öffnet,
 * will sich einlesen, nicht Karten anklicken — Sachverhalt und „Für Ölz"
 * stehen deshalb gleich da. Die Karte trägt ihre ID als Anker, damit die
 * Startseite und die Übersicht direkt auf sie springen können.
 */
export function KundensignalKarte({ s }: { s: Kundensignal }) {
  return (
    <article id={s.id} className="scroll-mt-24 rounded-xl border border-border/80 bg-card p-5 target:ring-2 target:ring-oelz-orange/50">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
          {SIGNALTYP_NAME[s.signal_type]}
        </span>
        {s.contact_trigger && (
          <span className="rounded-full bg-oelz-orange px-2 py-0.5 text-[11px] font-bold text-oelz-on-orange">
            Anlass für Kundenkontakt
          </span>
        )}
        {s.source_date && (
          <span className="ml-auto text-xs tabular-nums text-muted-foreground">{datum(s.source_date)}</span>
        )}
      </div>

      <h3 className="mt-3 font-display text-lg font-bold leading-snug tracking-wide text-foreground">{s.title}</h3>
      {s.teaser && <p className="mt-1 text-sm text-muted-foreground">{s.teaser}</p>}

      {s.situation && (
        <div className="mt-4">
          <h4 className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-oelz-orange-text">
            Sachverhalt
          </h4>
          <p className="text-sm leading-relaxed">{s.situation}</p>
        </div>
      )}

      {s.oelz_relevance && (
        <div className="mt-4 rounded-lg border-l-2 border-oelz-orange/40 bg-muted/40 px-4 py-3">
          <h4 className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-oelz-orange-text">
            Für Ölz
          </h4>
          <p className="text-sm leading-relaxed">{s.oelz_relevance}</p>
        </div>
      )}

      {s.source_url && (
        <div className="mt-4 border-t border-border pt-3">
          <a
            href={s.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-oelz-orange-text"
          >
            {s.source_name ?? 'Quelle'}
            <ExternalLink className="size-3" />
          </a>
        </div>
      )}
    </article>
  )
}
