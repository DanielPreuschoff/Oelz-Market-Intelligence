import OpenAI from 'openai'
import { STRATEGIC_THEMES } from '@/types/strategic-themes'
import {
  SUBJECT_TYPES,
  INGREDIENT_FUNCTIONS,
  MATURITY_LEVELS,
  EVIDENCE_LEVELS,
  NEXT_STEP_VERBS,
  type EvidenceLevel,
  type MaturityLevel,
  type SubjectType,
} from '@/types/ingredient-signals'
import type { StrategicTheme } from '@/types/strategic-themes'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export interface IngredientSignalExtraction {
  title: string
  subject_name: string
  subject_type: SubjectType
  what_is_new: string
  functions: string[]
  // Leerer String, wenn die KI keinen gültigen Wert geliefert hat — die
  // Redaktion muss dann selbst wählen.
  maturity: MaturityLevel | ''
  evidence: EvidenceLevel | ''
  source_name: string
  source_url: string
  source_date: string
  strategic_theme: StrategicTheme | ''
  problem_solved: string
  oelz_application: string
  oelz_opportunity: string
  next_step: string
}

/**
 * Übernimmt einen KI-Wert nur, wenn er zur erlaubten Liste gehört — sonst leer.
 *
 * Bewusst kein inhaltlicher Rückfallwert: Reifegrad, Evidenz und strategisches
 * Thema sind Angaben, die die Veröffentlichungs-Hürde erfüllen. Ein geratener
 * Standardwert würde die Hürde still nehmen, statt die Redaktion zur Wahl zu
 * zwingen — genau das soll die Hürde verhindern.
 */
const pick = <T extends readonly string[]>(list: T, value: unknown): T[number] | '' =>
  typeof value === 'string' && (list as readonly string[]).includes(value) ? value : ''

export async function extractIngredientSignal(text: string): Promise<IngredientSignalExtraction> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.2,
    max_tokens: 1500,
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: `Du bist Rohstoff- und Technologie-Analyst für Rudolf Ölz Meisterbäcker (österreichischer Premium-Bäcker: Croissants, Plundergebäck, süßes Gebäck, Toast, Convenience-Backwaren; Märkte AT/DE/CH/CZ/SK/SI).

Analysiere den Text und extrahiere ein Rohstoffsignal als JSON.

GRUNDREGEL: Ein Rohstoffsignal ist nur relevant, wenn es die vollständige Relevanzkette herstellt:
strategisches Thema → funktionale Lösung → gelöstes Problem → Anwendung bei Ölz → Chance → nächster Schritt.
Eine reine Meldung "Rohstoff X ist neu am Markt" ohne Funktion, Problembezug und Ölz-Anwendung ist KEIN Signal.
Fülle deshalb jedes Kettenglied — auch wenn du dafür begründet schlussfolgern musst.

TRENNE STRIKT ZWEI ZONEN:
- Befund (title, subject_name, subject_type, what_is_new, functions, maturity, evidence, source_*):
  nur, was im Text tatsächlich steht. Erfinde keine Zahlen, Daten, Firmennamen oder URLs.
- Einschätzung (strategic_theme, problem_solved, oelz_application, oelz_opportunity, next_step):
  hier schlussfolgerst du aus Ölz-Sicht. Formuliere im Konjunktiv oder als Prüffrage,
  nie als Tatsachenbehauptung über Ölz.

Formuliere konzeptzentriert, nicht lieferantenzentriert: der Titel benennt, was der Rohstoff
ermöglicht, nicht wer ihn verkauft.

Erlaubte subject_type: ${SUBJECT_TYPES.join(', ')}
Erlaubte functions (wähle 1-3 zutreffende): ${INGREDIENT_FUNCTIONS.join(', ')}
Erlaubte maturity (Reife der Lösung): ${MATURITY_LEVELS.join(', ')}
Erlaubte evidence (Belastbarkeit der Aussage, unabhängig von maturity): ${EVIDENCE_LEVELS.join(', ')}
Erlaubte strategic_theme: ${STRATEGIC_THEMES.join(', ')}

Zu evidence: "Herstellerangabe" wenn die Quelle der Anbieter selbst ist. "Einzelstudie" bei einer
Untersuchung oder einem Anwendungsbericht. "Mehrfach belegt" nur bei mehreren unabhängigen Quellen.
Im Zweifel die schwächere Stufe wählen.

Zu next_step: beginne mit einem dieser Verben — ${NEXT_STEP_VERBS.join(', ')} — gefolgt von einem
Doppelpunkt und einem konkreten Schritt. "Beobachten" ist ein vollwertiger Wert und die richtige
Wahl, wenn Verfügbarkeit oder Reife noch ungeklärt sind.

Extrahiere folgendes JSON:
{
  "title": "Was der Rohstoff ermöglicht, z.B. 'Enzym hält süßes Hefegebäck weich ohne Deklaration'",
  "subject_name": "Name des Rohstoffs, Ingredients, Verfahrens oder der Technologie",
  "subject_type": "einer der erlaubten Werte",
  "what_is_new": "2-3 Sätze: Was wurde gemeldet? Nur Inhalt aus der Quelle.",
  "functions": ["1-3 Werte aus der erlaubten Liste"],
  "maturity": "einer der erlaubten Werte",
  "evidence": "einer der erlaubten Werte",
  "source_name": "z.B. Lieferantenankündigung, Fachpublikation, Patentschrift, Messebericht",
  "source_url": "URL falls im Text vorhanden, sonst leer",
  "source_date": "YYYY-MM-DD falls vorhanden, sonst leer",
  "strategic_theme": "einer der erlaubten Werte",
  "problem_solved": "1-2 Sätze: Welches Entwicklungsproblem löst das, oder welche Möglichkeit eröffnet es?",
  "oelz_application": "1-2 Sätze: In welchem Ölz-Sortiment könnte das greifen? Croissant, Plunder, Toast, süßes Gebäck, Snack, Saisonartikel.",
  "oelz_opportunity": "1-2 Sätze: Welche Produkt- oder Portfoliochance entstünde daraus?",
  "next_step": "Verb, Doppelpunkt, konkreter Prüfschritt"
}

Antworte ausschließlich mit validem JSON. Keine Erklärungen davor oder danach.`,
      },
      { role: 'user', content: text.slice(0, 14000) },
    ],
  })

  const parsed = JSON.parse(response.choices[0]?.message?.content ?? '{}')

  return {
    title: parsed.title ?? '',
    subject_name: parsed.subject_name ?? '',
    // Die Art ist im Formular ohnehin vorbelegt und keine Hürden-Angabe.
    subject_type: pick(SUBJECT_TYPES, parsed.subject_type) || 'Ingredient',
    what_is_new: parsed.what_is_new ?? '',
    functions: Array.isArray(parsed.functions)
      ? parsed.functions
          .filter((f: string) => (INGREDIENT_FUNCTIONS as readonly string[]).includes(f))
          .slice(0, 3)
      : [],
    maturity: pick(MATURITY_LEVELS, parsed.maturity),
    evidence: pick(EVIDENCE_LEVELS, parsed.evidence),
    source_name: parsed.source_name ?? '',
    source_url: parsed.source_url ?? '',
    source_date: /^\d{4}-\d{2}-\d{2}$/.test(parsed.source_date ?? '') ? parsed.source_date : '',
    strategic_theme: pick(STRATEGIC_THEMES, parsed.strategic_theme),
    problem_solved: parsed.problem_solved ?? '',
    oelz_application: parsed.oelz_application ?? '',
    oelz_opportunity: parsed.oelz_opportunity ?? '',
    next_step: parsed.next_step ?? '',
  }
}
