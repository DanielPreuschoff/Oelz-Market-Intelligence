// PROTOTYP — Variante B „Matrix-first" (Price2Spy/Wiser-„My Products"-Muster):
// Einstieg ist die Preismatrix Ölz-Artikel × Händler — Regalpreis in EUR
// umgerechnet, €/kg, Δ zum Vorlauf, günstigster/teuerster Händler je Zeile farbig.
// Nur Händler MIT Lauf bekommen eine Spalte: eine leere Tabellenspalte ist die
// teuerste Art, eine Lücke zu zeigen — sie kostet Breite auf jeder der 69
// Zeilen. Die übrigen Händler stehen einmal als Fußzeile darunter. Rechts der
// Streifen: Meldungen zuoberst, darunter die Ereignisse.

import { Fragment } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ALLE_KENNZAHLEN, HAENDLER, KATEGORIE_NAME, LAUF_ISTS, LAUF_VOR, KURS_CZK_EUR, fmtPct, preismatrix, type Produktkategorie } from './modell'
import { EreignisZeile, HaendlerDetail, Kundenplakette, MeldungKarte } from './bausteine'

export const name = 'Matrix-first'

export function VariantB({ haendler, basis }: { haendler?: string; basis: string }) {
  const detail = haendler ? ALLE_KENNZAHLEN.find((k) => k.haendler.id === haendler) : undefined
  if (detail) return <HaendlerDetail k={detail} zurueck={basis} />

  const zeilen = preismatrix()
  const spalten = HAENDLER.filter((h) => ALLE_KENNZAHLEN.find((k) => k.haendler.id === h.id)!.hatDaten)
  const ohneLauf = ALLE_KENNZAHLEN.filter((k) => !k.hatDaten)
  const meldungen = ALLE_KENNZAHLEN.flatMap((k) => k.haendler.meldungen.map((m) => ({ m, h: k.haendler })))
    .sort((a, b) => b.m.datum.localeCompare(a.m.datum))
  const ereignisse = ALLE_KENNZAHLEN.flatMap((k) => k.ereignisse).filter((e) => e.listung.herkunft === 'oelz' || e.typ === 'neue_eigenmarke' || e.typ === 'auslistung')
  // Kategorie-Kopfzeilen vorab bestimmen, statt beim Rendern eine Variable
  // fortzuschreiben (react-hooks/immutability).
  const katKopfBei = new Set<string>()
  {
    let letzte: Produktkategorie | null = null
    for (const z of zeilen) { if (z.kategorie !== letzte) katKopfBei.add(z.schluessel); letzte = z.kategorie }
  }

  return (
    <div className="grid xl:grid-cols-[1fr_22rem] gap-6">
      <section className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-baseline justify-between flex-wrap gap-2">
          <h2 className="font-display font-bold">Ölz-Artikel × Händler <span className="text-muted-foreground font-normal text-sm">Regalpreis in € · €/kg · Δ regulär zum Vorlauf</span></h2>
          <p className="text-[11px] text-muted-foreground">Lauf {LAUF_ISTS} · Vorlauf {LAUF_VOR} · CZK→EUR {KURS_CZK_EUR.toFixed(1)}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left">
                <th className="sticky left-0 bg-card px-4 py-2 font-bold text-[10px] uppercase tracking-wider text-muted-foreground min-w-[16rem]">Artikel</th>
                {spalten.map((h) => {
                  const k = ALLE_KENNZAHLEN.find((x) => x.haendler.id === h.id)!
                  return (
                    <th key={h.id} className="px-3 py-2 align-top min-w-[8.5rem]">
                      <Link href={`${basis}&haendler=${h.id}`} className="block hover:text-oelz-orange-text">
                        <span className="font-display font-bold text-sm">{h.kette.split(' (')[0]}<span className="text-muted-foreground font-normal">/{h.land}</span></span>
                      </Link>
                      <div className="mt-1 flex flex-col gap-1 items-start font-normal">
                        <Kundenplakette status={h.kundenstatus} />
                        <span className="text-[10px] text-muted-foreground">{k.oelz} Ölz · {k.artikel} gesamt</span>
                      </div>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {zeilen.map((z) => {
                const werte = Object.values(z.zellen).map((c) => c.kgEur).filter((x): x is number => x != null)
                const min = Math.min(...werte), max = Math.max(...werte)
                const katKopf = katKopfBei.has(z.schluessel)
                return (
                  <Fragment key={z.schluessel}>
                    {katKopf && (
                      <tr className="bg-secondary/60"><td colSpan={spalten.length + 1} className="px-4 py-1 text-[10px] uppercase tracking-wider font-bold text-oelz-orange-text">{KATEGORIE_NAME[z.kategorie]}</td></tr>
                    )}
                    <tr className="border-t border-border/60 hover:bg-secondary/30">
                      <td className="sticky left-0 bg-card px-4 py-1.5">
                        <span className="line-clamp-1" title={z.name}>{z.name}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {z.menge}
                          {z.ueberGtin && <> · GTIN {z.schluessel}</>}
                          {z.ueberName && <span className="ml-1 text-amber-700 font-medium" title="Ohne gemeinsame GTIN über Namensmerkmale zusammengeführt — im echten Modul ein Fall für die Prüfliste">· über Namen zusammengeführt</span>}
                        </span>
                      </td>
                      {spalten.map((h) => {
                        const c = z.zellen[h.id]
                        if (!c) return <td key={h.id} className="px-3 py-1.5 text-center text-muted-foreground/50">—</td>
                        const farbe = werte.length > 1 && c.kgEur != null ? (c.kgEur === min ? 'text-emerald-800' : c.kgEur === max ? 'text-red-800' : '') : ''
                        return (
                          <td key={h.id} className="px-3 py-1.5 tabular-nums whitespace-nowrap">
                            <span className={cn('font-medium', farbe)}>{c.eur.toFixed(2).replace('.', ',')} €</span>
                            {c.listung.jetzt?.aktion && <span className="ml-1 text-[9px] font-bold text-oelz-orange-text">AKT</span>}
                            <br />
                            <span className="text-[10px] text-muted-foreground">{c.kgEur != null ? `${c.kgEur.toFixed(2).replace('.', ',')} €/kg` : '–'}</span>
                            {c.delta != null && Math.abs(c.delta) >= 0.005 && <span className={cn('ml-1 text-[10px] font-medium', c.delta > 0 ? 'text-red-700' : 'text-emerald-700')}>{fmtPct(c.delta)}</span>}
                          </td>
                        )
                      })}
                    </tr>
                  </Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="px-4 py-2 text-[11px] text-muted-foreground border-t border-border">
          Zeile = Artikel über Händler hinweg. Mercator liefert GTINs, Košík nicht — die vier Zeilen mit zwei Zellen sind über
          <span className="text-amber-700 font-medium"> Namensmerkmale</span> zusammengeführt (Füllmenge ± 5 % und ≥ 60 % Merkmalsdeckung); im echten Modul ginge das in die Prüfliste.
          Mit der GTIN-Liste von Ölz entfällt dieses Raten. Grün = günstigster, Rot = teuerster Händler je Zeile (€/kg).
        </p>
        {ohneLauf.length > 0 && (
          <p className="px-4 py-2 text-[11px] text-muted-foreground border-t border-border bg-secondary/30">
            <span className="font-medium text-foreground">Ohne Lauf, daher ohne Spalte:</span>{' '}
            {ohneLauf.map((k, i) => (
              <span key={k.haendler.id}>
                {i > 0 && ' · '}
                <Link href={`${basis}&haendler=${k.haendler.id}`} className="underline hover:text-foreground">
                  {k.haendler.kette.split(' (')[0]}/{k.haendler.land}
                </Link>
                <span className="text-muted-foreground/70">
                  {' '}({k.haendler.vollsortiment.zugang === 'freigabe' ? 'Freigabe' : k.haendler.vollsortiment.zugang === 'browser' ? 'Adapter' : 'kein Vollsortiment'})
                </span>
              </span>
            ))}
          </p>
        )}
      </section>

      <aside className="space-y-4">
        {meldungen.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-[11px] uppercase tracking-[0.14em] font-bold text-oelz-braun">Aus dem Handel</h3>
            {meldungen.map(({ m, h }) => (
              <MeldungKarte key={h.id + m.datum} m={m} kette={h.kette.split(' (')[0]} land={h.land} kompakt />
            ))}
          </div>
        )}
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="font-display font-bold mb-1">Ereignisse Ölz & Eigenmarken</h3>
          <p className="text-[11px] text-muted-foreground mb-2">seit {LAUF_VOR} · alle Händler mit Daten</p>
          <div className="max-h-[70vh] overflow-y-auto pr-1">
            {ereignisse.slice(0, 80).map((e, i) => <EreignisZeile key={i} e={e} mitHaendler />)}
          </div>
        </div>
      </aside>
    </div>
  )
}
