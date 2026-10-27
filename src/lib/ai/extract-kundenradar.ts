import OpenAI from 'openai'
import { SIGNALTYPEN } from '@/types/kundenradar'

/**
 * Aufbereitung eines Deep-Research-Berichts für das Kundenradar — in der App
 * statt im Chat.
 *
 * Daniel, 27.10.2026: so wenig Arbeit wie möglich — Berichte als .md
 * hochladen, und es steht fertig da. Was bisher Claude im Chat erledigte
 * (Blöcke zerlegen, Flughöhe prüfen, Dubletten über die Dienste zusammenführen,
 * JSON bauen), macht hier ein Modellaufruf je Bericht. Das Ergebnis hat genau
 * die Form des JSON-Imports und läuft durch dieselbe Validierung; angelegt
 * wird immer als Entwurf (ein Klick zum Veröffentlichen, Entscheidung vom
 * 27.10.2026).
 *
 * Dubletten über Dienste hinweg: Die Berichte laufen nacheinander, und jeder
 * bekommt die schon erfassten Signale seiner Händler als BEREITS ERFASST mit —
 * auch die Entwürfe aus dem Bericht davor. So erkennt das Modell dasselbe
 * Ereignis, wenn ein zweiter Dienst es mit anderer Quelle meldet.
 */

const client = new OpenAI()

/** Länger wird ein Bericht nicht gelesen; Perplexity hängt teils Hunderte Quellen an. */
const MAX_ZEICHEN = 200_000

export interface HaendlerFuerModell {
  slug: string
  name: string
  country: string
}

export interface BekanntesSignal {
  slug: string
  signal_type: string
  title: string
  teaser: string | null
  source_date: string | null
}

export interface ExtraktionsErgebnis {
  /** Rohform wie im JSON-Import — geht durch validateKundenradarImport. */
  signals: unknown[]
  profiles: unknown[]
  /** Was das Modell bewusst nicht übernommen hat, mit Grund — für das Register. */
  verworfen: { titel: string; grund: string }[]
}

const SYSTEM_PROMPT = `Du bereitest Deep-Research-Berichte für das Kundenradar von Rudolf Ölz Meisterbäcker auf, einem österreichischen Premium-Hersteller von Feinbackwaren (Croissants, Plunder, süßes Gebäck, Toast, Brioche; verpackt im Regal und als Teiglinge für die SB-Backstation). Das Kundenradar sammelt je Händler (Kette × Land), welche Richtung die Zentrale einschlägt.

Du bekommst einen Bericht, die Liste der beobachteten Händler und die Liste BEREITS ERFASST. Gib genau ein JSON-Objekt zurück:

{
  "signals": [
    {
      "retailer_slug": "einer der Slugs aus der Händlerliste, exakt",
      "signal_type": "${SIGNALTYPEN.join(' | ')}",
      "title": "höchstens 70 Zeichen, was der Händler tut, als Schlagzeile",
      "teaser": "höchstens 100 Zeichen, sagt etwas ANDERES als der Titel: die konkreteste Zahl, Frist oder Beobachtung",
      "situation": "2-4 Sätze, nur was im Bericht steht, Zahlen und Fristen wörtlich",
      "oelz_relevance": "1-2 Sätze, beginnt mit 'Für Ölz', im Konjunktiv",
      "contact_trigger": true oder false,
      "source_name": "Medium oder Händler",
      "source_url": "die URL genau so, wie sie im Bericht für diesen Fund steht",
      "source_date": "YYYY-MM-DD oder null"
    }
  ],
  "profiles": [
    { "retailer_slug": "...", "profile": "3-6 Zeilen Kurzprofil", "sources": ["URL", "..."] }
  ],
  "verworfen": [ { "titel": "kurz, worum es ging", "grund": "warum nicht übernommen" } ]
}

REGELN
- Deutsch. Eigennamen bleiben.
- Erfinde nichts: keine Entscheidungen, Zahlen, Daten oder URLs, die nicht im Bericht stehen. Eine URL nur übernehmen, wenn sie im Bericht diesem Fund zugeordnet ist. Fehlt sie, source_url = null.
- Nur Händler aus der Liste. Meldungen zu anderen Ketten gehören in "verworfen".
- Flughöhe hoch: Entscheidungen der Zentrale, groß genug für die Lebensmittel Zeitung. Ins Feld "verworfen" gehören: einzelne Listungen, Auslistungen oder Preise; Werbeaktionen und Prospekte; Personalien; einzelne Filialen; Quartalszahlen ohne Richtungsaussage; einzelne neue Eigenmarken-Produkte ohne Strategie dahinter; Neuheiten von Backwarenherstellern; allgemeine Trends ohne konkreten Händler.
- Was unter BEREITS ERFASST steht, nicht erneut melden — auch nicht, wenn der Bericht dasselbe Ereignis mit anderer Quelle oder anderem Wortlaut bringt. Dann in "verworfen" mit Grund "bereits erfasst: <Titel des bekannten Signals>". Aber nur, wenn es eindeutig dasselbe Ereignis ist: derselbe Händler und derselbe konkrete Inhalt (gleiche Maßnahme, gleiche Zahl oder Frist). Gleicher Typ allein reicht nicht. Im Zweifel übernehmen — die Redaktion sieht doppelte Entwürfe, aber keine verschluckten.
- Meldet der Bericht dasselbe Ereignis zweimal, ein Signal daraus machen.
- contact_trigger nur true, wenn im Für-Ölz-Satz ein konkreter Gesprächsaufhänger steht.
- Typen: strategie (Schwerpunkt wie Eigenmarke, Protein, Bio, Convenience, Nachhaltigkeit), format_flaeche (Filialkonzept, Flächen, Platzierung), backstation_pos (SB-Backstation, Bäckerei im Markt), sortimentskonzept (Produktgruppe aus- oder abgebaut), investition_expansion (Logistik, Produktion, Filialnetz, Markteintritt), lieferkette (Lieferantenwechsel, Lieferproblem).
- Kurzprofile nur, wenn der Bericht welche enthält (Block KURZPROFIL oder klar erkennbare Profilangaben zu einem Händler). Sonst "profiles": [].
- Der Bericht kann bereits Blöcke "## SIGNAL" und "## KURZPROFIL" enthalten — dann deren Felder übernehmen und nur prüfen, nicht neu erfinden.
- Findest du nichts, gib leere Listen zurück. Ein leeres Ergebnis ist brauchbar, ein aufgefülltes nicht.`

export async function extrahiereKundenradarBericht({
  text,
  dateiname,
  haendler,
  bekannt,
}: {
  text: string
  dateiname: string
  haendler: HaendlerFuerModell[]
  bekannt: BekanntesSignal[]
}): Promise<ExtraktionsErgebnis> {
  const haendlerListe = haendler.map((h) => `- ${h.slug} (${h.name}, ${h.country})`).join('\n')
  const bekanntListe =
    bekannt.length > 0
      ? bekannt
          .map((b) => `- ${b.slug} | ${b.signal_type} | ${b.title}${b.teaser ? ` — ${b.teaser}` : ''}${b.source_date ? ` | ${b.source_date}` : ''}`)
          .join('\n')
      : '(noch nichts)'
  const bericht = text.length > MAX_ZEICHEN ? `${text.slice(0, MAX_ZEICHEN)}\n\n[… gekürzt]` : text

  const response = await client.chat.completions.create({
    model: 'gpt-4o',
    temperature: 0.1,
    max_tokens: 8000,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `HÄNDLERLISTE:\n${haendlerListe}\n\nBEREITS ERFASST:\n${bekanntListe}\n\nBERICHT (${dateiname}):\n---\n${bericht}\n---`,
      },
    ],
  })

  const raw = response.choices[0]?.message?.content ?? ''
  if (response.choices[0]?.finish_reason === 'length') {
    throw new Error('Die Antwort des Modells wurde abgeschnitten — der Bericht ist zu lang. Bitte aufteilen.')
  }
  let parsed: Record<string, unknown>
  try {
    parsed = JSON.parse(raw) as Record<string, unknown>
  } catch {
    throw new Error('Das Modell hat kein lesbares JSON geliefert. Bitte erneut versuchen.')
  }

  const verworfenRoh = Array.isArray(parsed.verworfen) ? parsed.verworfen : []
  return {
    signals: Array.isArray(parsed.signals) ? parsed.signals : [],
    profiles: Array.isArray(parsed.profiles) ? parsed.profiles : [],
    verworfen: verworfenRoh
      .map((v) => v as Record<string, unknown>)
      .map((v) => ({ titel: String(v.titel ?? ''), grund: String(v.grund ?? '') }))
      .filter((v) => v.titel),
  }
}
