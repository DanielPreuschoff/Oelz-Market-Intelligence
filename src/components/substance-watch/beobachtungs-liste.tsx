/**
 * Der Reiter „Unter Beobachtung" im Rohstoff-Radar.
 *
 * Spec: docs/unter-beobachtung-spec.md
 *
 * Zwei Gestaltungsentscheidungen, die zusammengehören:
 *
 * **Form unterscheidet die Art, Farbe den Grad.** Ein Risikosignal ist keine
 * Chance, und das muss man sehen, ohne zu lesen — sonst wäre die Trennung, die
 * im Datenmodell steckt, unsichtbar. Sie trägt deshalb ein Warnzeichen und eine
 * durchgezogene Kante links. Die vier Stufen laufen dagegen auf der Farbskala,
 * die die Plattform schon für Schwere benutzt (Wettbewerbsradar: Grau → Braun →
 * Orange). Rot kommt nicht vor: Es ist in der Ölz-Palette nicht vorgesehen, und
 * eine zweite Farbsprache kostet mehr, als sie bringt. Präzedenzfall im Haus ist
 * das Trend Radar, wo die unterste Ebene aus demselben Grund über die Form statt
 * über die Farbe unterschieden wird.
 *
 * **Ausgeräumte Einträge stehen unten und still.** Sie verschwinden nicht — ohne
 * den Abschlusszustand wüchse die Liste nur und verrottete —, aber sie
 * konkurrieren nicht mit dem, was offen ist.
 */

import { AlertTriangle, ExternalLink, Check } from 'lucide-react'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import {
  STUFEN,
  STUFE_NAME,
  STUFE_CHIP,
  STUFE_ERKLAERUNG,
  STUFE_RANG,
  GELTUNGSBEREICH_NAME,
  HANDLUNG_NAME,
  type Risikosignal,
  type Stufe,
  type Geltungsbereich,
  type Handlung,
} from '@/types/substance-watch'

const datum = (iso: string) => format(new Date(iso), 'd. MMM yyyy', { locale: de })

function StufenChip({ stufe }: { stufe: Stufe }) {
  return (
    <span
      title={`${STUFE_NAME[stufe]} — ${STUFE_ERKLAERUNG[stufe]}`}
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium',
        STUFE_CHIP[stufe]
      )}
    >
      {STUFE_NAME[stufe]}
    </span>
  )
}

function Karte({ s }: { s: Risikosignal }) {
  const ausgeraeumt = s.status === 'ausgeraeumt'
  return (
    <article
      className={cn(
        'rounded-xl border border-border/80 bg-card p-5 transition-colors duration-[var(--motion-mikro)]',
        // Die Kante links macht die Art sichtbar, bevor man liest.
        ausgeraeumt
          ? 'rounded-l-none border-l-4 border-l-border pl-4 opacity-70'
          : 'rounded-l-none border-l-4 border-l-oelz-orange pl-4 hover:bg-[var(--waesche)]'
      )}
    >
      <div className="flex items-start gap-3">
        {ausgeraeumt ? (
          <Check className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
        ) : (
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-oelz-orange-text" aria-hidden />
        )}

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="font-display text-base font-bold leading-snug tracking-wide text-foreground">
              {s.substance}
            </h3>
            {s.e_number && (
              <span className="rounded bg-secondary/70 px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                {s.e_number}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
            <StufenChip stufe={s.stage} />
            <span>{GELTUNGSBEREICH_NAME[s.scope as Geltungsbereich] ?? s.scope}</span>
            {s.action && (
              <>
                <span className="opacity-50">·</span>
                <span className="font-semibold text-foreground">
                  {HANDLUNG_NAME[s.action as Handlung] ?? s.action}
                </span>
              </>
            )}
            {ausgeraeumt && (
              <>
                <span className="opacity-50">·</span>
                <span className="font-medium">ausgeräumt</span>
              </>
            )}
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">{s.situation}</p>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap gap-1">
              {s.product_categories.map((k) => (
                <span
                  key={k}
                  className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground"
                >
                  {k}
                </span>
              ))}
            </div>
            {s.source_url && (
              <a
                href={s.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-oelz-orange-text"
              >
                {s.source_name ?? 'Quelle'}
                {s.source_date && <span className="opacity-70">· {datum(s.source_date)}</span>}
                <ExternalLink className="size-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export function BeobachtungsListe({
  signale,
  kategorie,
  baueUrl,
  kategorien,
}: {
  signale: Risikosignal[]
  kategorie?: string
  baueUrl: (patch: Record<string, string | undefined>) => string
  kategorien: readonly string[]
}) {
  const aktiv = signale
    .filter((s) => s.status !== 'ausgeraeumt')
    .sort((a, b) => STUFE_RANG[a.stage] - STUFE_RANG[b.stage] || a.substance.localeCompare(b.substance, 'de'))
  const erledigt = signale.filter((s) => s.status === 'ausgeraeumt')

  if (signale.length === 0) {
    return (
      <div className="rounded-xl border-2 border-dashed border-border py-12 text-center text-sm text-muted-foreground">
        <p className="font-medium">Kein Stoff unter Beobachtung</p>
        <p className="mt-1 text-xs">
          Hier stehen Stoffe, die unter regulatorischem oder öffentlichem Druck stehen.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Was die vier Stufen bedeuten — eine stille Zeile statt eines
          Hilfe-Symbols. Die Frage stellt sich beim ersten Blick; wer sie
          beantwortet hat, liest darüber hinweg. */}
      <p className="text-[11px] leading-relaxed text-muted-foreground/80">
        {STUFEN.map((st) => `${STUFE_NAME[st]}: ${STUFE_ERKLAERUNG[st]}`).join('  ·  ')}
      </p>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="w-20 text-xs font-medium text-muted-foreground">Kategorie</span>
        {kategorien.map((k) => (
          <a
            key={k}
            href={baueUrl({ kategorie: kategorie === k ? undefined : k })}
            className={cn(
              'rounded-full border px-2.5 py-1 text-xs transition-colors',
              kategorie === k
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border hover:bg-secondary'
            )}
          >
            {k}
          </a>
        ))}
      </div>

      {aktiv.length === 0 ? (
        <div className="rounded-xl border bg-card py-10 text-center text-sm text-muted-foreground">
          Für diese Kategorie steht nichts unter Beobachtung.
        </div>
      ) : (
        <div className="space-y-3">
          {aktiv.map((s) => (
            <Karte key={s.id} s={s} />
          ))}
        </div>
      )}

      {erledigt.length > 0 && (
        <section className="space-y-3 pt-2">
          <h2 className="dachzeile text-muted-foreground">
            Ausgeräumt{' '}
            <span className="font-normal normal-case tracking-normal">
              · Entwarnung gegeben, zur Nachvollziehbarkeit erhalten
            </span>
          </h2>
          {erledigt.map((s) => (
            <Karte key={s.id} s={s} />
          ))}
        </section>
      )}
    </div>
  )
}
