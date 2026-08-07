'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Sparkles, Upload } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { STRATEGIC_THEMES, type StrategicTheme } from '@/types/strategic-themes'
import {
  SUBJECT_TYPES,
  INGREDIENT_FUNCTIONS,
  MATURITY_LEVELS,
  EVIDENCE_LEVELS,
  missingForPublish,
  type EvidenceLevel,
  type IngredientSignal,
  type MaturityLevel,
  type SubjectType,
} from '@/types/ingredient-signals'

interface IngredientSignalFormProps {
  initialValues?: Partial<IngredientSignal>
  signalId?: string
}

/**
 * Leerer String heißt „noch nicht gewählt" — im Formular ist jedes Feld
 * zunächst offen, erst beim Veröffentlichen wird Vollständigkeit erzwungen.
 */
type FormState = {
  title: string
  subject_name: string
  subject_type: SubjectType
  what_is_new: string
  functions: string[]
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
  ai_generated: boolean
}

const EMPTY: FormState = {
  title: '', subject_name: '', subject_type: 'Ingredient', what_is_new: '',
  functions: [], maturity: '', evidence: '', source_name: '', source_url: '',
  source_date: '', strategic_theme: '', problem_solved: '', oelz_application: '',
  oelz_opportunity: '', next_step: '', ai_generated: false,
}

/** Auswahl-Chip in der Optik der Filter-Chips auf den Listenseiten. */
function Chip({
  active, onClick, children,
}: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
        active ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-secondary'
      }`}
    >
      {children}
    </button>
  )
}

export function IngredientSignalForm({ initialValues, signalId }: IngredientSignalFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [form, setForm] = useState<FormState>({
    ...EMPTY,
    ...initialValues,
    what_is_new: initialValues?.what_is_new ?? '',
    functions: initialValues?.functions ?? [],
    maturity: initialValues?.maturity ?? '',
    evidence: initialValues?.evidence ?? '',
    source_name: initialValues?.source_name ?? '',
    source_url: initialValues?.source_url ?? '',
    source_date: initialValues?.source_date ?? '',
    strategic_theme: initialValues?.strategic_theme ?? '',
    problem_solved: initialValues?.problem_solved ?? '',
    oelz_application: initialValues?.oelz_application ?? '',
    oelz_opportunity: initialValues?.oelz_opportunity ?? '',
    next_step: initialValues?.next_step ?? '',
  })
  const [researchText, setResearchText] = useState('')
  const [extracting, setExtracting] = useState(false)
  const [extractError, setExtractError] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function toggleFunction(fn: string) {
    setForm((prev) => ({
      ...prev,
      functions: prev.functions.includes(fn)
        ? prev.functions.filter((f) => f !== fn)
        : [...prev.functions, fn],
    }))
  }

  /** Leerer String heißt „nicht gesetzt" — die DB will dort NULL sehen. */
  const nullable = (v: string) => (v.trim() ? v.trim() : null)

  const missing = missingForPublish({
    what_is_new: form.what_is_new,
    functions: form.functions,
    maturity: form.maturity || null,
    evidence: form.evidence || null,
    source_name: form.source_name,
    source_url: form.source_url,
    source_date: form.source_date,
    strategic_theme: form.strategic_theme || null,
    problem_solved: form.problem_solved,
    oelz_application: form.oelz_application,
    oelz_opportunity: form.oelz_opportunity,
    next_step: form.next_step,
  })
  const canPublish = missing.length === 0 && !!form.title.trim() && !!form.subject_name.trim()

  async function handleExtract() {
    if (!researchText.trim()) return
    setExtracting(true)
    setExtractError(null)
    try {
      const res = await fetch('/api/extract-ingredient-signal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: researchText }),
      })
      if (!res.ok) { setExtractError('Extraktion fehlgeschlagen'); return }
      const data: Record<string, unknown> = await res.json()
      // Feldweise übernehmen: ein leeres KI-Feld darf bereits eingetippten
      // Text nicht löschen. Entspricht dem Verhalten in impulse-form.tsx.
      setForm((prev) => {
        const merged = { ...prev } as Record<string, unknown>
        for (const [key, value] of Object.entries(data)) {
          if (!(key in prev)) continue
          const isEmpty =
            value == null ||
            (typeof value === 'string' && value.trim() === '') ||
            (Array.isArray(value) && value.length === 0)
          if (!isEmpty) merged[key] = value
        }
        return { ...(merged as FormState), ai_generated: true }
      })
    } catch {
      setExtractError('Extraktion fehlgeschlagen')
    } finally {
      setExtracting(false)
    }
  }

  function handleSave(status: 'draft' | 'published') {
    if (status === 'published' && !canPublish) {
      setSaveError(`Zum Veröffentlichen fehlt noch: ${missing.join(', ')}.`)
      return
    }
    setSaveError(null)

    startTransition(async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      const payload = {
        title: form.title.trim(),
        subject_name: form.subject_name.trim(),
        subject_type: form.subject_type,
        what_is_new: nullable(form.what_is_new),
        functions: form.functions,
        maturity: nullable(form.maturity),
        evidence: nullable(form.evidence),
        source_name: nullable(form.source_name),
        source_url: nullable(form.source_url),
        source_date: nullable(form.source_date),
        strategic_theme: nullable(form.strategic_theme),
        problem_solved: nullable(form.problem_solved),
        oelz_application: nullable(form.oelz_application),
        oelz_opportunity: nullable(form.oelz_opportunity),
        next_step: nullable(form.next_step),
        status,
        // Der Stand des Moduls leitet sich aus published_at ab. Einmal gesetzt,
        // bleibt das Datum stehen — auch beim Zurücksetzen auf Entwurf. Sonst
        // würde ein später erneut veröffentlichtes Altsignal wieder als „neu"
        // gelten und den Stand des ganzen Moduls nach vorn ziehen.
        published_at:
          initialValues?.published_at ??
          (status === 'published' ? new Date().toISOString() : null),
        ai_generated: form.ai_generated,
      }

      // created_by nur beim Anlegen — beim Bearbeiten bliebe sonst der
      // Bearbeiter als Ersteller zurück.
      const { error } = signalId
        ? await supabase.from('ingredient_signals').update(payload).eq('id', signalId)
        : await supabase.from('ingredient_signals').insert({ ...payload, created_by: user?.id })

      if (error) { setSaveError(error.message); return }
      router.push('/admin/rohstoff-radar')
      router.refresh()
    })
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="border rounded-xl p-5 space-y-3 bg-secondary/20">
        <h2 className="text-sm font-semibold">Research-Text einfügen & AI strukturieren</h2>
        <Textarea
          value={researchText}
          onChange={(e) => setResearchText(e.target.value)}
          rows={8}
          placeholder="Lieferantenmeldung, Studie, Patentauszug oder Messebericht hier einfügen…"
        />
        <div className="flex items-center gap-3">
          <Button
            type="button" variant="outline" size="sm" className="gap-1.5"
            onClick={handleExtract}
            disabled={!researchText.trim() || extracting}
          >
            {extracting
              ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Strukturiere…</>
              : <><Sparkles className="w-3.5 h-3.5" /> Mit AI strukturieren</>}
          </Button>
          {form.ai_generated && (
            <p className="text-xs text-emerald-600 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Felder von AI vorausgefüllt — bitte prüfen
            </p>
          )}
        </div>
        {extractError && <p className="text-xs text-destructive">{extractError}</p>}
      </div>

      {/* Zone „Befund" — was die Quelle meldet */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground">Was gemeldet wurde</h3>

        <div className="space-y-1.5">
          <Label htmlFor="title">Titel * (was der Rohstoff ermöglicht, nicht wer ihn verkauft)</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => setField('title', e.target.value)}
            placeholder="z.B. Enzym hält süßes Hefegebäck weich ohne Deklaration"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="subject_name">Gegenstand *</Label>
          <Input
            id="subject_name"
            value={form.subject_name}
            onChange={(e) => setField('subject_name', e.target.value)}
            placeholder="z.B. Maltogene Alpha-Amylase"
          />
        </div>

        <div className="space-y-1.5">
          <span className="block text-sm font-medium">Art</span>
          <div role="group" aria-label="Art" className="flex flex-wrap gap-1.5">
            {SUBJECT_TYPES.map((t) => (
              <Chip key={t} active={form.subject_type === t} onClick={() => setField('subject_type', t)}>
                {t}
              </Chip>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="what_is_new">Was ist neu?</Label>
          <Textarea
            id="what_is_new"
            rows={4}
            value={form.what_is_new}
            onChange={(e) => setField('what_is_new', e.target.value)}
            placeholder="2–3 Sätze, nur Inhalt aus der Quelle. Keine Ölz-Deutung."
          />
        </div>

        <div className="space-y-1.5">
          <span className="block text-sm font-medium">Funktionaler Nutzen (Mehrfachauswahl)</span>
          <div role="group" aria-label="Funktionaler Nutzen" className="flex flex-wrap gap-1.5">
            {INGREDIENT_FUNCTIONS.map((f) => (
              <Chip key={f} active={form.functions.includes(f)} onClick={() => toggleFunction(f)}>
                {f}
              </Chip>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <span className="block text-sm font-medium">Reifegrad <span className="text-muted-foreground font-normal">— der Lösung</span></span>
            <div role="group" aria-label="Reifegrad" className="flex flex-wrap gap-1.5">
              {MATURITY_LEVELS.map((m) => (
                <Chip key={m} active={form.maturity === m} onClick={() => setField('maturity', form.maturity === m ? '' : m)}>
                  {m}
                </Chip>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <span className="block text-sm font-medium">Evidenz <span className="text-muted-foreground font-normal">— der Aussage</span></span>
            <div role="group" aria-label="Evidenz" className="flex flex-wrap gap-1.5">
              {EVIDENCE_LEVELS.map((e) => (
                <Chip key={e} active={form.evidence === e} onClick={() => setField('evidence', form.evidence === e ? '' : e)}>
                  {e}
                </Chip>
              ))}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="source_name">Quellenname</Label>
            <Input
              id="source_name"
              value={form.source_name}
              onChange={(e) => setField('source_name', e.target.value)}
              placeholder="z.B. Lieferantenankündigung, Patentschrift"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="source_date">Veröffentlichungsdatum der Quelle</Label>
            <Input id="source_date" type="date" value={form.source_date} onChange={(e) => setField('source_date', e.target.value)} />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="source_url">Quellen-URL</Label>
          <Input id="source_url" type="url" value={form.source_url} onChange={(e) => setField('source_url', e.target.value)} placeholder="https://…" />
        </div>
      </div>

      {/* Zone „Einschätzung" — die Relevanzkette */}
      <div className="space-y-4 border-t pt-6">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground">Was wir daraus machen</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Redaktionelle Einschätzung. Alle Glieder sind Pflicht zum Veröffentlichen —
            ein kurzer Satz genügt je Glied.
          </p>
        </div>

        <div className="space-y-1.5">
          <span className="block text-sm font-medium">Strategisches Thema</span>
          <div role="group" aria-label="Strategisches Thema" className="flex flex-wrap gap-1.5">
            {STRATEGIC_THEMES.map((t) => (
              <Chip key={t} active={form.strategic_theme === t} onClick={() => setField('strategic_theme', form.strategic_theme === t ? '' : t)}>
                {t}
              </Chip>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="problem_solved">Gelöstes Problem / eröffnete Möglichkeit</Label>
          <Textarea id="problem_solved" rows={3} value={form.problem_solved} onChange={(e) => setField('problem_solved', e.target.value)} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="oelz_application">Anwendung bei Ölz</Label>
          <Textarea
            id="oelz_application"
            rows={3}
            value={form.oelz_application}
            onChange={(e) => setField('oelz_application', e.target.value)}
            placeholder="Welches Sortiment? Croissant, Plunder, Toast, süßes Gebäck, Snack, Saison."
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="oelz_opportunity">Produkt- oder Portfoliochance</Label>
          <Textarea id="oelz_opportunity" rows={3} value={form.oelz_opportunity} onChange={(e) => setField('oelz_opportunity', e.target.value)} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="next_step">Nächster Schritt</Label>
          <Input
            id="next_step"
            value={form.next_step}
            onChange={(e) => setField('next_step', e.target.value)}
            placeholder="Beobachten / Prüfen / Pilotieren: konkreter Schritt"
          />
        </div>
      </div>

      {missing.length > 0 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-xs font-semibold text-amber-900">
            Zum Veröffentlichen fehlt noch ({missing.length}):
          </p>
          <p className="text-xs text-amber-800 mt-1">{missing.join(' · ')}</p>
          <p className="text-[11px] text-amber-700 mt-1.5">
            Als Entwurf speichern geht jederzeit.
          </p>
        </div>
      )}

      {saveError && <p className="text-sm text-destructive">{saveError}</p>}

      <div className="flex items-center gap-3 pt-2">
        <Button
          type="button" variant="outline"
          onClick={() => handleSave('draft')}
          disabled={!form.title.trim() || !form.subject_name.trim() || isPending}
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Als Entwurf speichern'}
        </Button>
        <Button type="button" onClick={() => handleSave('published')} disabled={!canPublish || isPending}>
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Upload className="w-4 h-4" /> Veröffentlichen</>}
        </Button>
      </div>
    </div>
  )
}
