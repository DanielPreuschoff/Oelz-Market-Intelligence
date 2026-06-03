import OpenAI from 'openai'
import { TOPIC_TAGS } from '@/types/studies'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export interface StudyExtraction {
  title: string
  summary: string
  research_question: string
  methodology: string
  topic_tags: string[]
}

export async function extractStudyMetadata(pdfText: string): Promise<StudyExtraction> {
  const availableTags = TOPIC_TAGS.join(', ')

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.2,
    max_tokens: 800,
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: `Du bist ein Assistent der Metadaten aus Markt- und Trendstudien extrahiert.
Analysiere den gegebenen Studientext und extrahiere folgende Felder als JSON:

- title: Prägnanter Titel der Studie (max. 10 Wörter)
- summary: Kurzbeschreibung was untersucht wurde und was die Kernaussage ist (2-3 Sätze, deutsch)
- research_question: Fragestellung / Ausgangslage der Studie (2-3 Sätze, deutsch)
- methodology: Methodik und Vorgehen kurz beschrieben (2-3 Sätze, deutsch)
- topic_tags: Array mit 1-4 passenden Tags aus dieser Liste: ${availableTags}

Antworte ausschließlich mit validem JSON. Keine Erklärungen.`,
      },
      {
        role: 'user',
        content: pdfText.slice(0, 12000),
      },
    ],
  })

  const raw = response.choices[0]?.message?.content ?? '{}'
  const parsed = JSON.parse(raw)

  return {
    title: parsed.title ?? '',
    summary: parsed.summary ?? '',
    research_question: parsed.research_question ?? '',
    methodology: parsed.methodology ?? '',
    topic_tags: Array.isArray(parsed.topic_tags)
      ? parsed.topic_tags.filter((t: string) => (TOPIC_TAGS as readonly string[]).includes(t))
      : [],
  }
}
