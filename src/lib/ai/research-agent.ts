import OpenAI from 'openai'
import type { SignalCategory, ImportanceLevel, ResearchSource } from '@/types/database'

// Perplexity uses the OpenAI-compatible API
const perplexity = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: 'https://api.perplexity.ai',
})

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface ResearchCandidate {
  headline: string
  summary: string
  category: SignalCategory
  country_code: string | null
  signal_date: string | null
  source_url: string | null
  source_name: string | null
  importance: ImportanceLevel
  research_source: ResearchSource
}

export interface CompetitorInput {
  id: string
  name: string
  short_name: string
  country_ids: string[]
  description: string | null
}

interface RssArticle {
  title: string
  description: string
  url: string
  publishedDate: string | null
  sourceName: string | null
}

// ── Step 1a: Web search via Perplexity ───────────────────────

function buildPerplexityRequest(
  prompt: string,
  fromDate: Date,
  toDate: Date
) {
  const fmtDate = (d: Date) =>
    `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`

  return perplexity.chat.completions.create({
    model: 'sonar-pro',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 2000,
    search_after_date_filter: fmtDate(fromDate),
    search_before_date_filter: fmtDate(toDate),
  } as any)
}

async function searchViaPerplexityNews(
  competitor: CompetitorInput,
  fromDate: Date,
  toDate: Date
): Promise<{ content: string; citations: string[] }> {
  const fromDateStr = fromDate.toISOString().split('T')[0]
  const toDateStr = toDate.toISOString().split('T')[0]

  const countries = competitor.country_ids
    .map((c) => {
      const map: Record<string, string> = { AT: 'Austria', CZ: 'Czech Republic', SK: 'Slovakia', SI: 'Slovenia' }
      return map[c] ?? c
    })
    .join(', ')

  const prompt = `You are researching competitive intelligence for Rudolf Ölz Meisterbäcker, a leading Austrian bakery and convenience food company.

Search for ALL distinct news and developments SPECIFICALLY about "${competitor.name}" (also known as "${competitor.short_name}") published between ${fromDateStr} and ${toDateStr}.

IMPORTANT: Only report news SPECIFICALLY about ${competitor.name}. Do NOT include news about any other company, even in the same industry. Do NOT include articles from before ${fromDateStr}.

Focus specifically on:
- New product launches or product line extensions
- Packaging changes or redesigns
- New retail distribution or market entries
- Factory expansions or new production lines
- Mergers, acquisitions, investments
- Major marketing campaigns or brand moves
- Significant pricing changes or promotions
- Strategic hires (C-level, VP, Head of...)
- Technology investments or automation
- Sustainability claims or certifications
- New partnerships, retail listings, or licensing deals

Relevant markets: ${countries || 'global'} (focus on Austria, Czech Republic, Slovakia, Slovenia).

Report EVERY distinct development you find as a separate item. Do NOT summarize into a general overview.
For each development, provide the source URL and exact publication date.`

  const response = await buildPerplexityRequest(prompt, fromDate, toDate)
  const content = response.choices[0]?.message?.content ?? ''
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const citations: string[] = (response as any).citations ?? []
  return { content, citations }
}

async function searchViaPerplexityCommercial(
  competitor: CompetitorInput,
  fromDate: Date,
  toDate: Date
): Promise<{ content: string; citations: string[] }> {
  const fromDateStr = fromDate.toISOString().split('T')[0]
  const toDateStr = toDate.toISOString().split('T')[0]

  const countries = competitor.country_ids
    .map((c) => {
      const map: Record<string, string> = { AT: 'Austria', CZ: 'Czech Republic', SK: 'Slovakia', SI: 'Slovenia' }
      return map[c] ?? c
    })
    .join(', ')

  const prompt = `You are researching competitive intelligence for Rudolf Ölz Meisterbäcker, a leading Austrian bakery and convenience food company.

Search for ALL distinct commercial and product developments SPECIFICALLY about "${competitor.name}" (also known as "${competitor.short_name}") published between ${fromDateStr} and ${toDateStr}.

IMPORTANT: Only report developments SPECIFICALLY about ${competitor.name}. Do NOT include news about any other company, even in the same industry. Do NOT include articles from before ${fromDateStr}.

Focus specifically on:
- New product launches or product line extensions, new SKUs
- Packaging changes or redesigns
- New retail distribution or market entries (new retailer listings, shelf expansions)
- Promotional campaigns, pricing actions, or trade promotions
- New partnerships, co-branding, or licensing deals
- Strategic hires (C-level, VP, Head of...)
- Technology investments or automation announcements
- Sustainability certifications or product reformulations

Relevant markets: ${countries || 'global'} (focus on Austria, Czech Republic, Slovakia, Slovenia).

Report EVERY distinct development you find as a separate item. Do NOT summarize into a general overview.
For each development, provide the source URL and exact publication date.`

  const response = await buildPerplexityRequest(prompt, fromDate, toDate)
  const content = response.choices[0]?.message?.content ?? ''
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const citations: string[] = (response as any).citations ?? []
  return { content, citations }
}

// ── Step 1b: Google News RSS fetch ───────────────────────────

async function fetchGoogleNewsRSS(
  competitor: CompetitorInput,
  fromDate: Date,
  toDate: Date
): Promise<RssArticle[]> {
  const fromStr = fromDate.toISOString().split('T')[0]
  const toStr = toDate.toISOString().split('T')[0]

  // Google News RSS supports after: / before: date operators in query
  const query = `"${competitor.name}" after:${fromStr} before:${toStr}`
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=de&gl=AT&ceid=AT:de`

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; research-agent/1.0)' },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return []

    const xml = await res.text()
    return parseRssXml(xml, competitor)
  } catch (err) {
    console.warn('[research-agent] Google News RSS fetch failed:', err)
    return []
  }
}

function parseRssXml(xml: string, competitor: CompetitorInput): RssArticle[] {
  const items: RssArticle[] = []
  const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g)

  const nameVariants = [
    competitor.name.toLowerCase(),
    competitor.short_name.toLowerCase(),
  ]

  for (const match of itemMatches) {
    const block = match[1]

    const title = extractXmlTag(block, 'title')
    const description = extractXmlTag(block, 'description')
    const link = extractXmlTag(block, 'link') || extractXmlTag(block, 'guid')
    const pubDate = extractXmlTag(block, 'pubDate')
    const sourceEl = extractXmlTag(block, 'source')

    if (!title) continue

    // Post-filter: article must mention competitor name or short_name
    const searchText = `${title} ${description}`.toLowerCase()
    const mentionsCompetitor = nameVariants.some((v) => searchText.includes(v))
    if (!mentionsCompetitor) continue

    // Parse publish date to ISO
    let publishedDate: string | null = null
    if (pubDate) {
      try {
        publishedDate = new Date(pubDate).toISOString().split('T')[0]
      } catch {
        // leave null
      }
    }

    items.push({
      title: stripHtml(title),
      description: stripHtml(description),
      url: link ? cleanGoogleNewsUrl(link) : '',
      publishedDate,
      sourceName: sourceEl ? stripHtml(sourceEl) : null,
    })
  }

  return items
}

function extractXmlTag(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i'))
    || xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'))
  return match?.[1]?.trim() ?? ''
}

function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, '').trim()
}

function cleanGoogleNewsUrl(url: string): string {
  // Google News wraps URLs in their redirect — extract the actual URL if possible
  // Format: https://news.google.com/rss/articles/...?... — keep as-is, it's still a valid link
  return url
}

// ── Step 2: Extract structured candidates from combined sources

export async function extractCandidatesFromSearch(
  competitorName: string,
  perplexityContent: string,
  perplexityCitations: string[],
  rssArticles: RssArticle[]
): Promise<ResearchCandidate[]> {
  const hasPerplexity = perplexityContent.trim().length > 0
  const hasRss = rssArticles.length > 0

  if (!hasPerplexity && !hasRss) return []

  // Build available URLs list — Perplexity citations + RSS article URLs
  const allUrls = [
    ...perplexityCitations,
    ...rssArticles.map((a) => a.url).filter(Boolean),
  ]
  const citationsText = allUrls.length > 0
    ? `\n\nAvailable source URLs (only use these for source_url — do NOT construct or guess other URLs):\n${allUrls.map((u, i) => `${i + 1}. ${u}`).join('\n')}`
    : '\n\n(No source URLs available — set source_url to null for all signals.)'

  // Build RSS articles section for the prompt
  const rssSection = rssArticles.length > 0
    ? `\n\n--- Google News RSS articles ---\n${rssArticles.map((a) =>
        `Title: ${a.title}\nDate: ${a.publishedDate ?? 'unknown'}\nSource: ${a.sourceName ?? 'unknown'}\nURL: ${a.url}\nDescription: ${a.description}`
      ).join('\n\n')}`
    : ''

  const perplexitySection = hasPerplexity
    ? `\n\n--- Perplexity web search results ---\n${perplexityContent}`
    : ''

  const prompt = `You are extracting competitive intelligence signals from web search results about "${competitorName}".

IMPORTANT: Only extract information that is explicitly stated in the search results below. Do NOT invent facts, dates, URLs, or company names. If you are not certain about a specific detail, use null rather than guessing.

Extract ALL distinct signal events as a JSON array. Each event must be a separate object. Return at most 6 signals — if you find more, return only the 6 with the highest importance.

Rules for each signal:
- headline: max 80 chars, must include the competitor name and an action verb (e.g. "Harry-Brot launches...")
- summary: 2–4 sentences describing what happened, why it matters, and ending with a sentence starting "For Ölz, this..."
- category: exactly one of: product_launch, packaging_change, distribution, production_capacity, m_and_a, campaign, pricing, hiring_signal, technology, sustainability, startup_signal, regulatory, partnership
- importance: "1" (notable but minor), "2" (strategically relevant), "3" (critical / major move)
- country_code: one of AT, CZ, SK, SI — or null if unclear
- signal_date: ISO date YYYY-MM-DD when the event occurred. Only use a date that is explicitly stated in the search results. If no date is clearly stated, use null.
- source_url: use only a URL from the "Available source URLs" list above. Do NOT construct or guess URLs. If no matching URL exists, use null.
- source_name: short publication/source name (e.g. "APA", "Lebensmittel Zeitung", "LinkedIn", "company website"), or null

Return format:
{ "signals": [ { ...signal }, ... ] }

If no relevant signals are found, return:
{ "signals": [] }

Search results:${perplexitySection}${rssSection}${citationsText}`

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    temperature: 0.1,
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: 'You extract structured competitive intelligence signals from text. Return only valid JSON.',
      },
      { role: 'user', content: prompt },
    ],
  })

  const raw = response.choices[0]?.message?.content ?? '{}'

  try {
    const parsed = JSON.parse(raw)
    const signals = Array.isArray(parsed.signals) ? parsed.signals : []

    const rssUrls = new Set(rssArticles.map((a) => a.url).filter(Boolean))
    const perplexityUrls = new Set(perplexityCitations)

    return signals
      .filter((s: Partial<ResearchCandidate>) => s.headline && s.summary && s.category)
      .map((s: Partial<ResearchCandidate>) => {
        // Determine research_source based on which source provided the URL
        let research_source: ResearchSource = 'perplexity'
        if (s.source_url) {
          const inRss = rssUrls.has(s.source_url)
          const inPerplexity = perplexityUrls.has(s.source_url)
          if (inRss && inPerplexity) research_source = 'mixed'
          else if (inRss) research_source = 'google_news_rss'
          else research_source = 'perplexity'
        } else {
          // No URL — attribute to whichever source is available, prefer combined
          if (hasPerplexity && hasRss) research_source = 'mixed'
          else if (hasRss) research_source = 'google_news_rss'
          else research_source = 'perplexity'
        }
        return { ...s, research_source } as ResearchCandidate
      })
  } catch {
    console.error('[research-agent] Failed to parse extraction response:', raw)
    return []
  }
}

// ── Full pipeline for one competitor ─────────────────────────

export async function runResearchForCompetitor(
  competitor: CompetitorInput,
  dateRangeDays: number
): Promise<{ candidates: ResearchCandidate[]; rawResponse: string }> {
  const toDate = new Date()
  const fromDate = new Date(Date.now() - dateRangeDays * 24 * 60 * 60 * 1000)

  // Run both Perplexity angles and Google News RSS in parallel
  const [newsResult, commercialResult, rssArticles] = await Promise.all([
    searchViaPerplexityNews(competitor, fromDate, toDate),
    searchViaPerplexityCommercial(competitor, fromDate, toDate),
    fetchGoogleNewsRSS(competitor, fromDate, toDate),
  ])

  // Merge Perplexity results — combine content and deduplicate citations
  const mergedContent = [newsResult.content, commercialResult.content]
    .filter((c) => c.trim().length > 0)
    .join('\n\n---\n\n')
  const mergedCitations = [...new Set([...newsResult.citations, ...commercialResult.citations])]

  const candidates = await extractCandidatesFromSearch(competitor.name, mergedContent, mergedCitations, rssArticles)
  return { candidates, rawResponse: mergedContent }
}
