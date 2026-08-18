// PROTOTYP — Variante A „Scorecard-first" (Byzzer/Profitero-Muster).
//
// Nach dem Dichte-Grilling umgebaut. Gemessen hatte die erste Fassung 146
// Textelemente über der Falz — zehn gleich große Kacheln mit je vier
// Kennzahlen, einem Ring und zwei Zählern; das Auge fand keinen Anfang.
// Drei Eingriffe, keine Information verloren:
//   1. Was ist neu, steht oben (Meldungen, dann Ereigniszahlen) — bei einem
//      Monatsrhythmus die einzige Frage, die man nicht selbst stellen muss.
//   2. Händler ohne Lauf sind Zeilen statt Kacheln (sie belegten 48 % der
//      Fläche). Die Lücke bleibt sichtbar — sie ist Kais Freigabe-Argument.
//   3. Kacheln tragen zwei Kennzahlen statt vier, keinen Ring.

import { ALLE_KENNZAHLEN, EREIGNIS_NAME, LAUF_ISTS, LAUF_VOR, type EreignisTyp } from './modell'
import { HaendlerDetail, HaendlerKachel, HaendlerZeile, MeldungKarte } from './bausteine'

export const name = 'Scorecard-first'

export function VariantA({ haendler, basis }: { haendler?: string; basis: string }) {
  const detail = haendler ? ALLE_KENNZAHLEN.find((k) => k.haendler.id === haendler) : undefined
  if (detail) return <HaendlerDetail k={detail} zurueck={basis} />

  const alle = ALLE_KENNZAHLEN.flatMap((k) => k.ereignisse)
  const je: Partial<Record<EreignisTyp, number>> = {}
  alle.forEach((e) => (je[e.typ] = (je[e.typ] ?? 0) + 1))
  const meldungen = ALLE_KENNZAHLEN.flatMap((k) => k.haendler.meldungen.map((m) => ({ m, h: k.haendler })))
    .sort((a, b) => b.m.datum.localeCompare(a.m.datum))

  // Ein Schnitt, nicht zwei: erst danach, ob es einen Lauf gibt (das entscheidet,
  // was eine Kachel überhaupt zeigen kann), innerhalb dessen Kunden zuerst.
  const zuerstKunde = (a: (typeof ALLE_KENNZAHLEN)[number], b: (typeof ALLE_KENNZAHLEN)[number]) =>
    Number(b.haendler.kundenstatus === 'kunde') - Number(a.haendler.kundenstatus === 'kunde')
  const mitDaten = ALLE_KENNZAHLEN.filter((k) => k.hatDaten).sort(zuerstKunde)
  const ohneDaten = ALLE_KENNZAHLEN.filter((k) => !k.hatDaten).sort(zuerstKunde)

  return (
    <div className="space-y-6">
      {/* Kopfzeile: eine Zeile, keine Kachelwand */}
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 text-sm border-b border-border pb-3">
        <p className="font-display font-bold">Lauf {LAUF_ISTS}</p>
        <p className="text-muted-foreground">
          {mitDaten.length} von {ALLE_KENNZAHLEN.length} Händlern mit Daten · Vorlauf {LAUF_VOR}
        </p>
        <p className="text-muted-foreground">
          {(Object.keys(EREIGNIS_NAME) as EreignisTyp[])
            .filter((t) => je[t])
            .map((t) => `${je[t]} ${EREIGNIS_NAME[t].replace(' (1. fehlender Lauf)', '')}`)
            .join(' · ')}
        </p>
      </div>

      {/* Was ist neu — zuerst das Qualitative */}
      {meldungen.length > 0 && (
        <section>
          <h2 className="text-[11px] uppercase tracking-[0.14em] font-bold text-oelz-braun mb-2">
            Aus dem Handel{' '}
            <span className="text-muted-foreground font-normal normal-case tracking-normal">
              · was die Händler selbst tun
            </span>
          </h2>
          <div className="grid lg:grid-cols-2 gap-2">
            {meldungen.map(({ m, h }) => (
              <MeldungKarte key={h.id + m.datum} m={m} kette={h.kette.split(' (')[0]} land={h.land} kompakt />
            ))}
          </div>
        </section>
      )}

      {/* Händler mit Lauf */}
      <section>
        <h2 className="text-[11px] uppercase tracking-[0.14em] font-bold text-oelz-orange-text mb-2">
          Händler mit Lauf{' '}
          <span className="text-muted-foreground font-normal normal-case tracking-normal">
            · Ölz-Artikel und Preisabstand zur Eigenmarke
          </span>
        </h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
          {mitDaten.map((k) => (
            <HaendlerKachel key={k.haendler.id} k={k} href={`${basis}&haendler=${k.haendler.id}`} />
          ))}
        </div>
      </section>

      {/* Händler ohne Lauf — kompakt, aber sichtbar */}
      {ohneDaten.length > 0 && (
        <section>
          <h2 className="text-[11px] uppercase tracking-[0.14em] font-bold text-muted-foreground mb-2">
            Noch ohne Lauf{' '}
            <span className="font-normal normal-case tracking-normal">
              · {ohneDaten.filter((k) => k.haendler.kundenstatus === 'kunde').length} davon Kunden
            </span>
          </h2>
          <div className="space-y-1.5">
            {ohneDaten.map((k) => (
              <HaendlerZeile key={k.haendler.id} k={k} href={`${basis}&haendler=${k.haendler.id}`} />
            ))}
          </div>
        </section>
      )}

      <p className="text-xs text-muted-foreground border-t border-border pt-3">
        Nicht Teil des Moduls: Regalanteil (Share of Shelf) — online nicht messbar.
      </p>
    </div>
  )
}
