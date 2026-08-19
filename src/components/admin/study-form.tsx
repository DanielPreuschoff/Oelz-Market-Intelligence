'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Upload, Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { TOPIC_TAGS, type Study } from '@/types/studies'
import { titelbildAusPdf, titelbildPfad } from '@/lib/studien/titelbild'
import { cn } from '@/lib/utils'

interface StudyFormProps {
  initialValues?: Partial<Study>
  studyId?: string
}

const EMPTY: Omit<Study, 'id' | 'created_by' | 'created_at' | 'updated_at'> = {
  title: '',
  summary: '',
  research_question: '',
  methodology: '',
  date_published: '',
  topic_tags: [],
  pdf_url: '',
  cover_url: null,
  status: 'draft',
  ai_generated: false,
}

export function StudyForm({ initialValues, studyId }: StudyFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [form, setForm] = useState({ ...EMPTY, ...initialValues })
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [extracting, setExtracting] = useState(false)
  const [extractError, setExtractError] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [coverHinweis, setCoverHinweis] = useState<string | null>(null)

  function setField<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function toggleTag(tag: string) {
    setForm((prev) => ({
      ...prev,
      topic_tags: prev.topic_tags.includes(tag)
        ? prev.topic_tags.filter((t) => t !== tag)
        : [...prev.topic_tags, tag],
    }))
  }

  async function handleExtract() {
    if (!pdfFile) return
    setExtracting(true)
    setExtractError(null)

    try {
      const fd = new FormData()
      fd.append('pdf', pdfFile)
      const res = await fetch('/api/extract-study', { method: 'POST', body: fd })
      if (!res.ok) { setExtractError('Extraktion fehlgeschlagen'); return }
      const data = await res.json()
      setForm((prev) => ({
        ...prev,
        title: data.title || prev.title,
        summary: data.summary || prev.summary,
        research_question: data.research_question || prev.research_question,
        methodology: data.methodology || prev.methodology,
        topic_tags: data.topic_tags?.length ? data.topic_tags : prev.topic_tags,
        ai_generated: true,
      }))
    } catch {
      setExtractError('Netzwerkfehler — bitte erneut versuchen')
    } finally {
      setExtracting(false)
    }
  }

  async function handleSave(status: Study['status']) {
    setSaveError(null)
    if (!form.title) { setSaveError('Titel ist erforderlich'); return }

    startTransition(async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      let pdfUrl = form.pdf_url
      let coverUrl = form.cover_url ?? null

      // Upload PDF if new file selected
      if (pdfFile) {
        const ext = pdfFile.name.split('.').pop()
        const path = `${crypto.randomUUID()}.${ext}`
        const { error: uploadError } = await supabase.storage
          .from('studies')
          .upload(path, pdfFile, { contentType: 'application/pdf' })
        if (uploadError) { setSaveError(`PDF-Upload fehlgeschlagen: ${uploadError.message}`); return }
        const { data: urlData } = supabase.storage.from('studies').getPublicUrl(path)
        pdfUrl = urlData.publicUrl
        coverUrl = null // gehört zum alten PDF
      }

      // Titelbild: die erste PDF-Seite als PNG neben das PDF legen — bei neuem
      // Upload immer, sonst nachträglich, wenn eine Bestandsstudie noch keins hat.
      // Scheitert das (fehlerhaftes PDF, Netz), bleibt die Studie trotzdem
      // speicherbar; das Titelbild ist Zugabe, kein Pflichtfeld.
      if (pdfUrl && !coverUrl) {
        try {
          const quelle: Blob =
            pdfFile ?? (await fetch(pdfUrl).then((r) => (r.ok ? r.blob() : Promise.reject(new Error(r.statusText)))))
          const png = await titelbildAusPdf(quelle)
          const coverPath = titelbildPfad(pdfUrl)
          const { error: coverError } = await supabase.storage
            .from('studies')
            .upload(coverPath, png, { contentType: 'image/png', upsert: true })
          if (!coverError) {
            coverUrl = supabase.storage.from('studies').getPublicUrl(coverPath).data.publicUrl
          } else {
            setCoverHinweis(`Titelbild konnte nicht abgelegt werden: ${coverError.message}`)
          }
        } catch (e) {
          setCoverHinweis(`Titelbild konnte nicht erzeugt werden: ${e instanceof Error ? e.message : String(e)}`)
        }
      }

      const payload = {
        title: form.title,
        summary: form.summary || null,
        research_question: form.research_question || null,
        methodology: form.methodology || null,
        date_published: form.date_published || null,
        topic_tags: form.topic_tags,
        pdf_url: pdfUrl || null,
        cover_url: coverUrl,
        status,
        ai_generated: form.ai_generated,
        created_by: user?.id,
      }

      let error
      if (studyId) {
        ;({ error } = await supabase.from('studies').update(payload).eq('id', studyId))
      } else {
        ;({ error } = await supabase.from('studies').insert(payload))
      }

      if (error) { setSaveError(error.message); return }
      router.push('/admin/studien')
      router.refresh()
    })
  }

  const canSave = !!form.title

  return (
    <div className="space-y-8 max-w-2xl">

      {/* PDF Upload + AI Extraction */}
      <div className="border rounded-xl p-5 space-y-4 bg-secondary/20">
        <h2 className="text-sm font-semibold">PDF hochladen & AI-Extraktion</h2>

        <div className="space-y-2">
          <Label>PDF-Datei</Label>
          <div className="flex items-center gap-3">
            <Input
              type="file"
              accept=".pdf"
              onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleExtract}
              disabled={!pdfFile || extracting}
              className="shrink-0 gap-1.5"
            >
              {extracting
                ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Extrahiere…</>
                : <><Sparkles className="w-3.5 h-3.5" /> Mit AI ausfüllen</>
              }
            </Button>
          </div>
          {form.pdf_url && !pdfFile && (
            <p className="text-xs text-muted-foreground">
              Aktuell: <a href={form.pdf_url} target="_blank" rel="noreferrer" className="underline">PDF ansehen</a>
              {' '}— neue Datei hochladen um zu ersetzen
              {!form.cover_url && <> · Titelbild wird beim nächsten Speichern erzeugt</>}
            </p>
          )}
          {form.cover_url && !pdfFile && (
            <div className="flex items-center gap-3 pt-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={form.cover_url} alt="" className="h-20 w-auto rounded border border-border bg-white object-contain" />
              <p className="text-xs text-muted-foreground">Titelbild vorhanden — wird bei neuem PDF ersetzt.</p>
            </div>
          )}
          {coverHinweis && <p className="text-xs text-amber-700">{coverHinweis}</p>}
        </div>

        {extractError && <p className="text-xs text-destructive">{extractError}</p>}
        {form.ai_generated && <p className="text-xs text-emerald-600 flex items-center gap-1"><Sparkles className="w-3 h-3" /> Felder wurden von AI vorausgefüllt — bitte prüfen</p>}
      </div>

      {/* Felder */}
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="title">Titel *</Label>
          <Input id="title" value={form.title} onChange={(e) => setField('title', e.target.value)} placeholder="Titel der Studie" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date_published">Datum</Label>
          <Input id="date_published" type="date" value={form.date_published ?? ''} onChange={(e) => setField('date_published', e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Kurzbeschreibung</Label>
          <Textarea id="summary" value={form.summary ?? ''} onChange={(e) => setField('summary', e.target.value)} rows={3} placeholder="Was wurde untersucht? Was ist die Kernaussage? (2–3 Sätze)" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="research_question">Fragestellung / Ausgangslage</Label>
          <Textarea id="research_question" value={form.research_question ?? ''} onChange={(e) => setField('research_question', e.target.value)} rows={3} placeholder="Was war der Anlass für die Studie? (2–3 Sätze)" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="methodology">Methodik / Vorgehen</Label>
          <Textarea id="methodology" value={form.methodology ?? ''} onChange={(e) => setField('methodology', e.target.value)} rows={3} placeholder="Was wurde wie gemacht? (2–3 Sätze)" />
        </div>

        <div className="space-y-2">
          <Label>Themen-Tags</Label>
          <div className="flex flex-wrap gap-2">
            {TOPIC_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={cn(
                  'text-xs px-2.5 py-1 rounded-full border transition-colors',
                  form.topic_tags.includes(tag)
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'border-border hover:bg-secondary'
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {saveError && <p className="text-sm text-destructive">{saveError}</p>}

      <div className="flex items-center gap-3 pt-2">
        <Button type="button" variant="outline" onClick={() => handleSave('draft')} disabled={!canSave || isPending}>
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Als Entwurf speichern'}
        </Button>
        <Button type="button" onClick={() => handleSave('published')} disabled={!canSave || isPending} style={{ backgroundColor: '#F07D00', borderColor: '#F07D00', color: 'white' }}>
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Upload className="w-4 h-4" /> Veröffentlichen</>}
        </Button>
      </div>
    </div>
  )
}
