import OpenAI from 'openai'
import type { SignalCategory, ImportanceLevel } from '@/types/database'

const client = new OpenAI()

export interface ExtractedSignal {
  headline: string
  summary: string
  category: SignalCategory
  competitor_name: string | null
  country_code: string | null
  signal_date: string | null
  importance: ImportanceLevel
  source_name: string | null
}

const SYSTEM_PROMPT = `You are an expert competitive intelligence analyst for the food and bakery industry in Central Europe (Austria, Czech Republic, Slovakia, Slovenia).

Your task is to extract structured intelligence from a raw text snippet or article.

The client is Rudolf Ölz Meisterbäcker GmbH & Co KG — an Austrian premium bakery company known for croissants, pastry, and sweet bakery products. You are analyzing competitor or market activity that may be relevant to Ölz.

Extract the following fields and return them as a JSON object:

{
  "headline": string,
  "summary": string,
  "category": string,
  "competitor_name": string | null,
  "country_code": string | null,
  "signal_date": string | null,
  "importance": number,
  "source_name": string | null
}

Field rules:
- headline: max 80 chars. Plain language. Include competitor name and action.
- summary: 2-5 sentences. What happened, detail/scope, why it matters for Ölz. Last sentence starts with "This" or "For Ölz".
- category: exactly one of: product_launch, packaging_change, distribution, production_capacity, m_and_a, campaign, pricing, hiring_signal, technology, sustainability, startup_signal, regulatory, partnership
- competitor_name: as it appears in the source, or null if market-level
- country_code: ISO 2-letter code (AT, CZ, SK, SI) or null if not determinable
- signal_date: ISO 8601 date (YYYY-MM-DD) when the event happened, or null
- importance: 1 (notable), 2 (important), 3 (critical). Default 1 if uncertain. 3 = direct competitive threat or major M&A.
- source_name: short source name e.g. "APA", "LinkedIn", "Lebensmittel Zeitung", or null

Do not hallucinate details not in the source. Return only the JSON object, no other text.`

export async function extractSignal(rawText: string): Promise<ExtractedSignal> {
  const response = await client.chat.completions.create({
    model: 'gpt-4o',
    max_tokens: 1024,
    temperature: 0.2,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Extract a competitive intelligence signal from the following text:\n\n---\n${rawText}\n---`,
      },
    ],
  })

  const raw = response.choices[0]?.message?.content ?? ''
  const parsed = JSON.parse(raw)

  return {
    headline: String(parsed.headline ?? ''),
    summary: String(parsed.summary ?? ''),
    category: (parsed.category ?? 'product_launch') as SignalCategory,
    competitor_name: parsed.competitor_name ?? null,
    country_code: parsed.country_code ?? null,
    signal_date: parsed.signal_date ?? null,
    importance: String(parsed.importance ?? 1) as ImportanceLevel,
    source_name: parsed.source_name ?? null,
  }
}
