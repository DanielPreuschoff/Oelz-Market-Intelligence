/**
 * Einmalige Übersetzung der foodRegio-Radardaten ins Deutsche.
 *
 *   node --env-file=.env.local scripts/uebersetze-radardaten.mjs [--test]
 *
 * Liest research/2026-08/foodregio-*.json, übersetzt Titel und Beschreibung je
 * Eintrag über gpt-4o-mini und schreibt research/2026-08/*-de.json.
 *
 * Nimmt bereits Übersetztes nicht erneut dran (die Zieldatei wird nach jedem
 * Eintrag fortgeschrieben) — ein Abbruch kostet also höchstens einen Eintrag,
 * und ein erneuter Lauf setzt dort fort, wo der letzte aufhörte.
 *
 * Bereits deutsche Texte bleiben unangetastet: zwei Einträge im Future-Food-Radar
 * stammen aus deutschsprachigen Quellen.
 */
import OpenAI from 'openai'
import { readFileSync, writeFileSync, existsSync } from 'fs'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const NUR_TEST = process.argv.includes('--test')

const ANWEISUNG = `Du übersetzt Fachtexte eines Food-Trend-Radars aus dem Englischen ins Deutsche.

REGELN
- Übersetze vollständig und sinngetreu. Nichts weglassen, nichts hinzufügen.
- Firmen-, Produkt- und Markennamen bleiben unverändert (z.B. "Nestlé", "ImaginDairy").
- Etablierte englische Branchenbegriffe bleiben stehen, wo sie im deutschen
  Fachgebrauch üblich sind (z.B. "Machine Learning", "Retail", "Startup",
  "Blockchain", "Clean Label").
- Der TITEL wird ebenfalls übersetzt, sofern er kein Eigenname ist. Beispiele:
  "Dairy 3D printing" → "3D-Druck von Milchprodukten"
  "AI Ingredients Discovery" → "KI-gestützte Zutatenentdeckung"
  "AI Food Scanners" → "KI-Lebensmittelscanner"
  Eine reine Schlagzeile aus einer Quelle bleibt dagegen erhalten, wenn sie
  einen Eigennamen trägt (z.B. "Polysense raises $10.7M ...").
- Absatzumbrüche und Aufzählungen beibehalten.
- Ist der Text bereits deutsch, gib ihn unverändert zurück.
- Antworte ausschließlich mit JSON: {"titel": "...", "beschreibung": "..."}`

function istDeutsch(t) {
  const de = (t.match(/\b(der|die|das|und|ist|nicht|werden|wird|für|mit|auch|eine|einer)\b/gi) || []).length
  const en = (t.match(/\b(the|and|is|not|will|for|with|also|a|an|of|to)\b/gi) || []).length
  return de > en
}

async function uebersetze(titel, beschreibung) {
  if (istDeutsch(beschreibung)) return { titel, beschreibung, uebersprungen: true }

  const antwort = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.2,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: ANWEISUNG },
      { role: 'user', content: JSON.stringify({ titel, beschreibung }) },
    ],
  })
  const roh = antwort.choices[0].message.content ?? '{}'
  const d = JSON.parse(roh)
  return {
    titel: d.titel || titel,
    beschreibung: d.beschreibung || beschreibung,
    tokens: antwort.usage,
  }
}

async function verarbeite(quelle, ziel) {
  const daten = JSON.parse(readFileSync(quelle, 'utf-8'))
  const fertig = existsSync(ziel) ? JSON.parse(readFileSync(ziel, 'utf-8')) : { ...daten, eintraege: [] }
  const schonDa = new Set(fertig.eintraege.map((e) => e.id))

  let offen = daten.eintraege.filter((e) => !schonDa.has(e.id))
  if (NUR_TEST) offen = offen.slice(0, 3)

  console.log(`\n${quelle}`)
  console.log(`  ${daten.eintraege.length} Einträge, ${schonDa.size} bereits übersetzt, ${offen.length} offen`)

  let ein = 0, aus = 0, uebersprungen = 0
  for (const [i, e] of offen.entries()) {
    try {
      const u = await uebersetze(e.titel, e.beschreibung)
      if (u.uebersprungen) uebersprungen++
      if (u.tokens) { ein += u.tokens.prompt_tokens; aus += u.tokens.completion_tokens }
      fertig.eintraege.push({ ...e, titel: u.titel, beschreibung: u.beschreibung, titelOriginal: e.titel })
      writeFileSync(ziel, JSON.stringify(fertig, null, 1), 'utf-8')
      if ((i + 1) % 20 === 0 || i === offen.length - 1) {
        const kosten = (ein / 1e6) * 0.15 + (aus / 1e6) * 0.6
        console.log(`  ${i + 1}/${offen.length}  ·  $${kosten.toFixed(3)}`)
      }
    } catch (fehler) {
      console.error(`  FEHLER bei ${e.id} (${e.titel.slice(0, 40)}): ${fehler.message}`)
      // Original behalten, damit kein Eintrag verlorengeht
      fertig.eintraege.push({ ...e, uebersetzungFehlgeschlagen: true })
      writeFileSync(ziel, JSON.stringify(fertig, null, 1), 'utf-8')
    }
  }
  const kosten = (ein / 1e6) * 0.15 + (aus / 1e6) * 0.6
  console.log(`  fertig: ${fertig.eintraege.length} Einträge, ${uebersprungen} waren schon deutsch, $${kosten.toFixed(3)}`)
  return kosten
}

const k1 = await verarbeite(
  'research/2026-08/foodregio-future-food.json',
  'research/2026-08/foodregio-future-food-de.json'
)
const k2 = await verarbeite(
  'research/2026-08/foodregio-food-ai.json',
  'research/2026-08/foodregio-food-ai-de.json'
)
console.log(`\nGesamtkosten dieses Laufs: $${(k1 + k2).toFixed(2)}`)
