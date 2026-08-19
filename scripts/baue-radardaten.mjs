/**
 * Erzeugt aus den übersetzten Rohdaten die statischen TS-Dateien des Moduls.
 *
 *   node scripts/baue-radardaten.mjs
 *
 * Quellen: research/2026-08/foodregio-*-de.json   (Texte, übersetzt)
 *          research/2026-08/zellen-mehrheit.json  (Sektor+Ring je Eintrag)
 * Ziel:    src/data/food-radar/{future-food,food-ai,index}.ts
 *
 * POSITIONEN: Das foodRegio-Radar würfelt die Punktlagen bei jedem Laden neu —
 * fixe Koordinaten existieren im Original nicht. Verlässlich ist nur die Zelle
 * (Sektor + Ring), ermittelt per Mehrheit über fünf Ladungen. Innerhalb seiner
 * Zelle bekommt jeder Punkt hier eine EIGENE, deterministische Position:
 * gestreut über einen Hash seiner ID, Kollisionen beim Bauen aufgelöst.
 * Ergebnis: fachlich das Original, bei jedem Laden identisch.
 *
 * QUELLENVERWEISE: foodRegios Beschreibungen enden oft auf "Referenzen: …"
 * mit nackten Domainnamen, rohen Links oder Markdown-Resten. Die werden hier
 * aus dem Fließtext gelöst und als eigenes Feld `quellen` mitgegeben — die
 * Detailleiste zeigt sie unten, klickbar wo eine URL existiert.
 */
import { readFileSync, writeFileSync } from 'fs'

const FARBE_ZU_EBENE = {
  'rgb(54, 109, 197)': 'trend',
  'rgb(89, 200, 246)': 'cluster',
  'rgb(184, 242, 225)': 'signal',
}

/** Punktradien im Tafel-Koordinatensystem — Original-Proportion (~0,6–1,3 % von R). */
const PUNKT_RADIUS = { s: 3, m: 4.5, l: 6 }
const LOCH_ANTEIL = 0.1

const ZELLEN = JSON.parse(readFileSync('research/2026-08/zellen-mehrheit.json', 'utf-8'))

// ---------------------------------------------------------------------------
// Quellenverweise aus der Beschreibung lösen
// ---------------------------------------------------------------------------

function bereinige(text) {
  const quellen = []
  const merke = (name, url) => {
    const n = (name || '').trim().replace(/[.,;]+$/, '')
    if (!n && !url) return
    if (!quellen.some((q) => q.name === (n || url))) quellen.push({ name: n || url, ...(url ? { url } : {}) })
  }

  let t = text

  // Markdown-Links und -Reste: [text](url) sowie kaputt „wort](url)"
  t = t.replace(/\[([^\]]{1,80})\]\((https?:\/\/[^\s)]+)\)/g, (_, txt, url) => {
    merke(txt, url)
    return txt
  })
  t = t.replace(/([\wäöüß.]{1,40})\]\((https?:\/\/[^\s)]+)\)/g, (_, txt, url) => {
    merke(txt, url)
    return txt
  })

  // Unvollständige Markdown-Links — foodRegio schneidet URLs teils mit „…" ab.
  // Text behalten; die URL nur übernehmen, wenn sie vollständig aussieht.
  t = t.replace(/\[([^\]]{1,80})\]\((https?:\/\/[^\s)]*)\)?/g, (_, txt, url) => {
    if (/^https?:\/\/[\w.-]+\.[a-z]{2,}([\/\w#?=&.-]*)?$/i.test(url)) merke(txt, url)
    return txt
  })

  // Nachlaufende Seitennavigation des gescrapten Originals („Themen", Kategorienliste)
  t = t.replace(/\n\s*(?:Themen|Topics|Related news)\s*\n[\s\S]*$/i, '')

  // Eingeklammerte Quellenangaben: „(Quelle: Circus Group SE via Youtube)"
  t = t.replace(/\((?:Quelle|Source)s?:\s*([^)]{1,100})\)/gi, (_, inhalt) => {
    merke(inhalt)
    return ''
  })

  // Zeilenweise: Referenz-Zeilen und nackte Link-Zeilen herausziehen
  const zeilen = t.split('\n')
  const behalten = []
  let sammle = false
  for (const zeile of zeilen) {
    const z = zeile.trim()
    const kopf = z.match(/^(?:Referenzen|References|Zusätzliche Quellen|Additional sources?|Quellen?|Sources?)\s*:\s*(.*)$/i)
    if (kopf) {
      sammle = true
      if (kopf[1]) kopf[1].split(/\s*[&,;]\s*/).forEach((n) => merke(n))
      continue
    }
    if (/^https?:\/\/\S+$/.test(z)) {
      merke(z.replace(/^https?:\/\/(www\.)?/, '').split('/')[0], z)
      continue
    }
    if (sammle && z && z.length < 90 && !/[.!?]$/.test(z) && /^[\w.-]+(\s*[&,]\s*[\w.-]+)*$/.test(z)) {
      z.split(/\s*[&,;]\s*/).forEach((n) => merke(n))
      continue
    }
    sammle = false
    behalten.push(zeile)
  }
  t = behalten.join('\n')

  // Bediensätze des Originals („… Seite bitte mit »F5« aktualisieren …")
  t = t
    .split(/(?<=[.!?])\s+/)
    .filter((satz) => !/F5|aktualisieren Sie die Seite/i.test(satz))
    .join(' ')

  t = t.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').replace(/[ \t]{2,}/g, ' ').trim()
  return { text: t, quellen: quellen.slice(0, 8) }
}

// ---------------------------------------------------------------------------
// Deterministisches Layout innerhalb der Zellen
// ---------------------------------------------------------------------------

/** FNV-1a — stabiler Hash, damit jede ID bei jedem Bau dieselbe Lage bekommt. */
function hash(s, salz) {
  let h = 0x811c9dc5 ^ salz
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return (h >>> 0) / 0xffffffff
}

function layout(eintraege, nSektoren, ringGrenzen) {
  const R = 470 // Arbeitsmaßstab = Tafelradius der Komponente
  const breite = 180 / nSektoren
  const margA = nSektoren > 6 ? 2 : 2.5
  const margR = 0.035

  const zelleVon = (e) => {
    const a1 = 180 - e.sektor * breite - margA
    const a0 = 180 - (e.sektor + 1) * breite + margA
    const r0 = (e.ring === 0 ? LOCH_ANTEIL + 0.04 : ringGrenzen[e.ring - 1]) + margR
    const r1 = ringGrenzen[e.ring] - margR
    return { a0, a1, r0, r1 }
  }

  // Startlage aus dem ID-Hash
  const punkte = eintraege.map((e) => {
    const z = zelleVon(e)
    const u = hash(e.id, 1), v = hash(e.id, 2)
    return { ...e, ...z, winkel: z.a0 + u * (z.a1 - z.a0), radius: z.r0 + v * (z.r1 - z.r0) }
  })

  const xy = (p) => {
    const rad = (p.winkel * Math.PI) / 180
    return [R * p.radius * Math.cos(rad), -R * p.radius * Math.sin(rad)]
  }

  // Abstoßung überlappender Paare, dann zurück in die Zelle klemmen
  for (let runde = 0; runde < 250; runde++) {
    let bewegt = false
    for (let i = 0; i < punkte.length; i++) {
      for (let j = i + 1; j < punkte.length; j++) {
        const a = punkte[i], b = punkte[j]
        const [ax, ay] = xy(a), [bx, by] = xy(b)
        const dx = bx - ax, dy = by - ay
        const dist = Math.hypot(dx, dy) || 0.001
        const soll = PUNKT_RADIUS[a.groesse] + PUNKT_RADIUS[b.groesse] + 3
        if (dist >= soll) continue
        bewegt = true
        const schub = ((soll - dist) / dist) * 0.5
        const wende = (p, vx, vy) => {
          let x = 0, y = 0
          ;[x, y] = xy(p)
          x += vx; y += vy
          p.radius = Math.min(p.r1, Math.max(p.r0, Math.hypot(x, y) / R))
          let w = (Math.atan2(-y, x) * 180) / Math.PI
          p.winkel = Math.min(p.a1, Math.max(p.a0, w))
        }
        wende(a, -dx * schub, -dy * schub)
        wende(b, dx * schub, dy * schub)
      }
    }
    if (!bewegt) break
  }

  return punkte.map((p) => ({
    ...p,
    winkel: +p.winkel.toFixed(2),
    radius: +p.radius.toFixed(4),
    a0: undefined, a1: undefined, r0: undefined, r1: undefined, sektor: undefined, ring: undefined,
  }))
}

// ---------------------------------------------------------------------------

/**
 * Das Datumsfeld der Quelle lautet „Aug 15th 2024  2 years ago" — englisch und
 * mit einer Altersangabe, die zum Auslesezeitpunkt richtig war und seither
 * falsch altert. Daraus wird ein deutsches Datum ohne Alter. Was sich nicht
 * lesen laesst, faellt weg statt halb uebersetzt stehenzubleiben.
 */
const MONATE = {
  Jan: 'Januar', Feb: 'Februar', Mar: 'März', Apr: 'April', May: 'Mai', Jun: 'Juni',
  Jul: 'Juli', Aug: 'August', Sep: 'September', Oct: 'Oktober', Nov: 'November', Dec: 'Dezember',
}

function datumDeutsch(roh) {
  if (!roh) return undefined
  const m = roh.match(/([A-Z][a-z]{2})\s+(\d{1,2})(?:st|nd|rd|th)?\s+(\d{4})/)
  if (!m) return undefined
  const monat = MONATE[m[1]]
  return monat ? `${+m[2]}. ${monat} ${m[3]}` : undefined
}

function groessenSkala(eintraege) {
  const werte = [...new Set(eintraege.map((e) => e.punktRadius))].sort((a, b) => a - b)
  const namen = ['s', 'm', 'l']
  const map = {}
  werte.forEach((w, i) => (map[w] = namen[Math.min(i, 2)]))
  return map
}

function bauen({ quelle, ziel, key, name, achsenName, ringe, sektoren, zellen, konstante }) {
  const roh = JSON.parse(readFileSync(quelle, 'utf-8'))
  const skala = groessenSkala(roh.eintraege)
  const grenzen = ringe.map((r) => r.bis)

  let ohneZelle = 0
  const vorbereitet = roh.eintraege.map((e) => {
    const zelle = zellen[e.id]
    if (!zelle) ohneZelle++
    // Quellenverweise stammen aus dem ROHTEXT der Quelle, nicht aus dem
    // redigierten Text: die Redaktion loest Domainnamen und Links aus dem
    // Fliesstext (siehe docs/food-radar-textregeln.md), es gaebe hier also
    // nichts mehr zu finden. `quellenText` haelt dafuer das Original bereit;
    // fehlt es, wird wie zuvor der angezeigte Text durchsucht.
    const sauber = bereinige(e.quellenText ?? e.beschreibung)
    return {
      id: e.id,
      titel: e.titel,
      beschreibung: e.quellenText ? e.beschreibung : sauber.text,
      quellen: sauber.quellen.length ? sauber.quellen : undefined,
      sektorName: sektoren[zelle ? zelle.sektor : 0],
      ebene: FARBE_ZU_EBENE[e.fill] ?? 'signal',
      groesse: skala[e.punktRadius] ?? 'm',
      daten: datumDeutsch(e.daten),
      titelOriginal: e.titelOriginal !== e.titel ? e.titelOriginal : undefined,
      sektor: zelle ? zelle.sektor : 0,
      ring: zelle ? zelle.ring : 0,
    }
  })

  const gelegt = layout(vorbereitet, sektoren.length, grenzen)
  const eintraege = gelegt.map((p) => ({
    id: p.id, titel: p.titel, beschreibung: p.beschreibung,
    ...(p.quellen ? { quellen: p.quellen } : {}),
    sektor: p.sektorName, ebene: p.ebene, groesse: p.groesse,
    winkel: p.winkel, radius: p.radius,
    ...(p.daten ? { daten: p.daten } : {}),
    ...(p.titelOriginal ? { titelOriginal: p.titelOriginal } : {}),
  }))

  const tafel = { key, name, achsenName, ringe, sektoren, eintraege }
  const kopf = `/**
 * Food Radar — Tafel „${name}".
 *
 * ERZEUGT von scripts/baue-radardaten.mjs — nicht von Hand ändern.
 * Inhalte: foodRegio Innovation / FIBRES, öffentliches Embed, gelesen ${roh.gelesen}.
 * Texte übersetzt und redaktionell überarbeitet (docs/food-radar-textregeln.md).
 * Zellen (Sektor+Ring) per Mehrheit aus fünf
 * Ladungen des Originals; Punktlagen innerhalb der Zelle eigenes,
 * deterministisches Layout — das Original würfelt sie bei jedem Laden neu.
 *
 * ${eintraege.length} Einträge
 */
import type { RadarTafel } from './types'

export const ${konstante}: RadarTafel = `

  writeFileSync(ziel, kopf + JSON.stringify(tafel, null, 2) + '\n', 'utf-8')

  const mitQuellen = eintraege.filter((e) => e.quellen).length
  console.log(ziel)
  console.log(`  ${eintraege.length} Einträge · ${ohneZelle} ohne Zellzuordnung · ${mitQuellen} mit Quellenverweisen`)
}

bauen({
  quelle: 'research/2026-08/foodregio-future-food-de.json',
  ziel: 'src/data/food-radar/future-food.ts',
  key: 'future-food',
  name: 'Future Food',
  achsenName: 'Zeit bis zur Wirkung',
  ringe: [
    { name: 'Heute', bis: 0.4 },
    { name: '1–3 Jahre', bis: 0.6 },
    { name: '3–5 Jahre', bis: 0.8 },
    { name: '5–10 Jahre', bis: 1 },
  ],
  sektoren: ['Digitalisierung/KI', 'Additive Fertigung', 'Alternative Proteine', 'Personalisierung', 'Nachhaltigkeit', 'Regulatorik'],
  zellen: ZELLEN['future-food'],
  konstante: 'FUTURE_FOOD',
})

bauen({
  quelle: 'research/2026-08/foodregio-food-ai-de.json',
  ziel: 'src/data/food-radar/food-ai.ts',
  key: 'food-ai',
  name: 'Food AI',
  achsenName: 'Zeit bis zur Wirkung',
  ringe: [
    { name: 'Heute', bis: 1 / 3 },
    { name: '1–3 Jahre', bis: 0.5 },
    { name: '3–5 Jahre', bis: 2 / 3 },
    { name: '5–10 Jahre', bis: 5 / 6 },
    { name: '10+ Jahre', bis: 1 },
  ],
  sektoren: ['Landwirtschaft', 'Herstellung & Verarbeitung', 'Verpackung', 'Logistik & Distribution', 'Handel & HoReCa', 'Konsum', 'Abfallströme'],
  zellen: ZELLEN['food-ai'],
  konstante: 'FOOD_AI',
})

writeFileSync(
  'src/data/food-radar/index.ts',
  `/** ERZEUGT von scripts/baue-radardaten.mjs — nicht von Hand ändern. */
import { FUTURE_FOOD } from './future-food'
import { FOOD_AI } from './food-ai'
import type { RadarTafel } from './types'

export const TAFELN: RadarTafel[] = [FUTURE_FOOD, FOOD_AI]
`,
  'utf-8'
)
console.log('src/data/food-radar/index.ts')
