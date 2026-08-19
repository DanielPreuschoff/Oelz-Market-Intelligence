/**
 * Der Text auf der Bühne der Startseite. Drei Stufen, in dieser Reihenfolge:
 *
 *  0. `INTRO_TEXT` — statischer Onboarding-Text der ersten Phase. Erklärt, was
 *     die Plattform tut; kein Monatsbezug, altert nicht.
 *  1. `monatstext()` — ein von Hand geschriebener Text je Monat. Später eine
 *     kleine Tabelle `briefings` (Monat, Text, Status) plus Feld im Admin:
 *     Claude schreibt beim Aufbereiten des Monatsimports einen Entwurf, ein
 *     Mensch gibt ihn frei — dasselbe Human-in-the-Loop-Modell wie überall.
 *  2. `analyseText()` — aus den geladenen Einträgen gerechnet. Nennt
 *     Verteilungen, die aktivsten Wettbewerber und den Schwerpunkt im
 *     Rohstoff-Radar. Nie erfunden, nie veraltet, kein Loch auf der Bühne.
 *
 * Umschalten auf Stufe 1/2 ist eine Zeile: `INTRO_TEXT` auf null setzen.
 *
 * Die Analyse ist bewusst nüchtern — Anteile und Zahlen statt Adjektive, keine
 * Prognosen. Sie ist damit auch die Schreibvorlage für die Texte von Hand.
 */

import { CATEGORY_LABELS_DE } from '@/lib/startseite/labels'
import type { StartseitenDaten } from '@/lib/startseite/daten'

/** Statischer Intro-Text der ersten Phase. Entschieden am 19.08.2026. */
export const INTRO_TEXT: string | null =
  'Hallo und herzlich willkommen. Märkte verschieben sich selten mit Ansage, meist in kleinen Signalen: ein neues Produkt, ein Claim, ein Rohstoff, der plötzlich überall auftaucht. Der Ölz Intelligence Radar fängt diese Signale ein, prüft sie redaktionell und bündelt sie hier zu einem Bild, damit sichtbar wird, was sich im Markt bewegt und was das für Ölz bedeutet.'

/** Obergrenze: drei bis vier Sätze. Längeres wird im Layout auf fünf Zeilen gekappt. */
export const MAX_ZEICHEN = 400

/** Von Hand geschriebene Texte je Monat (YYYY-MM) — bis zur `briefings`-Tabelle. */
const TEXTE: Record<string, string> = {}

/** Der redaktionelle Text zum Monat, oder null. */
export function monatstext(monatIso: string): string | null {
  const text = TEXTE[monatIso.slice(0, 7)]
  return text ? text.slice(0, MAX_ZEICHEN) : null
}

/** Häufigkeiten absteigend, ohne leere Schlüssel. */
function haeufigkeiten<T>(werte: (T | null | undefined)[]): [T, number][] {
  const zaehler = new Map<T, number>()
  for (const w of werte) {
    if (w === null || w === undefined || w === ('' as unknown as T)) continue
    zaehler.set(w, (zaehler.get(w) ?? 0) + 1)
  }
  return [...zaehler.entries()].sort((a, b) => b[1] - a[1])
}

function aufzaehlung(teile: string[]): string {
  if (teile.length === 0) return ''
  if (teile.length === 1) return teile[0]
  return `${teile.slice(0, -1).join(', ')} und ${teile.at(-1)}`
}

/** Analyse der geladenen Einträge — der Text, der ohne Redaktion trägt. */
export function analyseText(d: StartseitenDaten): string | null {
  const saetze: string[] = []

  if (d.signale.length > 0) {
    const wettbewerber = haeufigkeiten(d.signale.map((s) => s.wettbewerber?.short_name))
    const laender = haeufigkeiten(d.signale.map((s) => s.land))
    const kategorien = haeufigkeiten(d.signale.map((s) => s.category))

    const umfang =
      `${d.signale.length} neue Signale` +
      (wettbewerber.length > 0 ? ` von ${wettbewerber.length} Wettbewerbern` : '') +
      (laender.length > 1 ? ` in ${laender.length} Ländern` : laender.length === 1 ? ` in ${laender[0][0]}` : '')
    const top = kategorien.slice(0, 2).map(([k, n]) => `${CATEGORY_LABELS_DE[k]} (${n})`)
    saetze.push(top.length > 0 ? `${umfang}; Schwerpunkt ${aufzaehlung(top)}.` : `${umfang}.`)

    const aktiv = wettbewerber.filter(([, n]) => n > 1).slice(0, 3)
    const kritisch = d.signale.filter((s) => s.importance === '3').length
    if (aktiv.length > 0) {
      const namen = aufzaehlung(aktiv.map(([name, n]) => `${name} (${n})`))
      saetze.push(
        kritisch > 0
          ? `Am aktivsten ${aktiv.length === 1 ? 'war' : 'waren'} ${namen}; ${kritisch} ${kritisch === 1 ? 'Signal ist' : 'Signale sind'} als kritisch eingestuft.`
          : `Am aktivsten ${aktiv.length === 1 ? 'war' : 'waren'} ${namen}.`,
      )
    } else if (kritisch > 0) {
      saetze.push(`${kritisch} ${kritisch === 1 ? 'Signal ist' : 'Signale sind'} als kritisch eingestuft.`)
    }
  }

  if (d.rohstoffsignale.length > 0) {
    const funktionen = haeufigkeiten(d.rohstoffsignale.flatMap((r) => r.functions))
    const reif = d.rohstoffsignale.filter((r) => r.maturity === 'Am Markt' || r.maturity === 'Etabliert').length
    const top = funktionen.slice(0, 2).map(([f, n]) => `${f} (${n})`)
    saetze.push(
      `Im Rohstoff-Radar ${d.rohstoffsignale.length} neue Signale` +
        (top.length > 0 ? `, funktionaler Schwerpunkt ${aufzaehlung(top)}` : '') +
        (reif > 0 ? `; ${reif} davon bereits am Markt.` : '.'),
    )
  }

  const rest: string[] = []
  if (d.impulse.length > 0) {
    const typen = haeufigkeiten(d.impulse.map((im) => im.radar_type))
    rest.push(`${d.impulse.length} neue Impulse` + (typen.length > 0 ? ` (Schwerpunkt ${typen[0][0]})` : ''))
  }
  if (d.studien.length > 0) rest.push(`${d.studien.length} neue ${d.studien.length === 1 ? 'Studie' : 'Studien'}`)
  if (rest.length > 0) saetze.push(`Dazu ${aufzaehlung(rest)}.`)

  if (saetze.length === 0) return null
  return saetze.join(' ').slice(0, MAX_ZEICHEN)
}
