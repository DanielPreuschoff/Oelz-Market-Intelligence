import OpenAI from 'openai'
import { RADAR_TYPES, IMPULSE_TAGS, PRIORITY_OPTIONS } from '@/types/innovation'
import type { TrendResonance, ImpulseRating, RadarType } from '@/types/innovation'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export interface ImpulseExtraction {
  title: string
  radar_type: RadarType
  short_signal: string
  oelz_relevance_short: string
  tags: string[]
  product_example: string
  category: string
  market: string
  channel: string
  main_claim: string
  what_is_new: string
  market_signal: string
  trend_resonance: TrendResonance[]
  oelz_development_relevance: string
  possible_oelz_transfer: string
  ratings: ImpulseRating
  source_url: string
  source_date: string
}

export async function extractImpulse(text: string): Promise<ImpulseExtraction> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.2,
    max_tokens: 1500,
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: `Du bist ein Produktintelligenz-Analyst für Rudolf Ölz Meisterbäcker (österreichischer Premium-Bäcker: Croissants, süßes Gebäck, Convenience-Backwaren, Märkte AT/DE/CH/CZ/SK/SI).

Analysiere den gegebenen Research-Text und extrahiere einen strukturierten Innovationsimpuls als JSON. WICHTIG: Formuliere konzeptzentriert, NICHT akteurszentriert. Der Titel soll das Produktkonzept oder den Trend benennen, NICHT den Wettbewerber.

Erlaubte radar_type Werte: ${RADAR_TYPES.join(', ')}
Erlaubte tags (wähle 1-4 passende): ${IMPULSE_TAGS.join(', ')}
Erlaubte priority Werte: ${PRIORITY_OPTIONS.join(', ')}

Extrahiere folgendes JSON:
{
  "title": "Konzeptzentrierter Impulstitel (z.B. 'Pistazie wird LEH-tauglich', nicht 'ALDI launcht Pistazien-Croissant')",
  "radar_type": "einer der erlaubten Typen",
  "short_signal": "1-2 Sätze: Was ist das übergeordnete Produktsignal oder der Trend?",
  "oelz_relevance_short": "1 Satz: Warum ist das für Ölz Produktentwicklung relevant?",
  "tags": ["max. 4 Tags aus der erlaubten Liste"],
  "product_example": "Konkretes Produkt, Händler oder Marke als Beleg (Wettbewerber ok hier)",
  "category": "z.B. Croissant, Toast, Snack, Kuchen, Plundergebäck",
  "market": "z.B. Deutschland, Österreich, UK, USA",
  "channel": "z.B. LEH, Discount, Coffee Chain, Online, Private Label",
  "main_claim": "z.B. High Protein, Clean Label, Premium, Mini-Indulgence",
  "what_is_new": "2-3 Sätze: Was ist bemerkenswert und warum ist dieser Impuls relevant?",
  "market_signal": "1-2 Sätze: Welches größere Marktmuster oder Konsumentenbedürfnis steckt dahinter?",
  "trend_resonance": [
    {"title": "Trendname", "description": "Kurze Erklärung wie dieser Trend auf den Impuls einzahlt"},
    {"title": "Trendname", "description": "Kurze Erklärung"},
    {"title": "Trendname", "description": "Kurze Erklärung"}
  ],
  "oelz_development_relevance": "2-3 Sätze aus Sicht Produktentwicklung/Innovation: Formatfit, Rezepturansatz, Sortimentslücke",
  "possible_oelz_transfer": "Konkrete Prüffrage oder Produktidee für Ölz",
  "ratings": {
    "fitToOelz": 3,
    "novelty": 3,
    "feasibility": 3,
    "claimPotential": 3,
    "priority": "Prüfen"
  },
  "source_url": "URL falls vorhanden, sonst leer",
  "source_date": "YYYY-MM-DD falls vorhanden, sonst leer"
}

Antworte ausschließlich mit validem JSON. Keine Erklärungen davor oder danach.`,
      },
      {
        role: 'user',
        content: text.slice(0, 14000),
      },
    ],
  })

  const raw = response.choices[0]?.message?.content ?? '{}'
  const parsed = JSON.parse(raw)

  return {
    title: parsed.title ?? '',
    radar_type: RADAR_TYPES.includes(parsed.radar_type) ? parsed.radar_type : 'Format',
    short_signal: parsed.short_signal ?? '',
    oelz_relevance_short: parsed.oelz_relevance_short ?? '',
    tags: Array.isArray(parsed.tags)
      ? parsed.tags.filter((t: string) => (IMPULSE_TAGS as readonly string[]).includes(t)).slice(0, 4)
      : [],
    product_example: parsed.product_example ?? '',
    category: parsed.category ?? '',
    market: parsed.market ?? '',
    channel: parsed.channel ?? '',
    main_claim: parsed.main_claim ?? '',
    what_is_new: parsed.what_is_new ?? '',
    market_signal: parsed.market_signal ?? '',
    trend_resonance: Array.isArray(parsed.trend_resonance)
      ? parsed.trend_resonance.slice(0, 3).map((t: { title?: string; description?: string }) => ({
          title: t.title ?? '',
          description: t.description ?? '',
        }))
      : [],
    oelz_development_relevance: parsed.oelz_development_relevance ?? '',
    possible_oelz_transfer: parsed.possible_oelz_transfer ?? '',
    ratings: {
      fitToOelz: Math.min(5, Math.max(1, parseInt(parsed.ratings?.fitToOelz) || 3)),
      novelty: Math.min(5, Math.max(1, parseInt(parsed.ratings?.novelty) || 3)),
      feasibility: Math.min(5, Math.max(1, parseInt(parsed.ratings?.feasibility) || 3)),
      claimPotential: Math.min(5, Math.max(1, parseInt(parsed.ratings?.claimPotential) || 3)),
      priority: PRIORITY_OPTIONS.includes(parsed.ratings?.priority) ? parsed.ratings.priority : 'Prüfen',
    },
    source_url: parsed.source_url ?? '',
    source_date: parsed.source_date ?? '',
  }
}
