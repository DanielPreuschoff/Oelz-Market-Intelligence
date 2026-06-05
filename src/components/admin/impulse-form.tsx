'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Sparkles, Upload, Plus, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  RADAR_TYPES, IMPULSE_TAGS, PRIORITY_OPTIONS,
  type InnovationImpulse, type RadarType, type Priority,
} from '@/types/innovation'
import { cn } from '@/lib/utils'

interface ImpulseFormProps {
  initialValues?: Partial<InnovationImpulse>
  impulseId?: string
}

type FormState = {
  title: string
  radar_type: RadarType
  short_signal: string
  oelz_relevance_short: string
  tags: string[]
  image_url: string
  product_example: string
  category: string
  market: string
  channel: string
  main_claim: string
  what_is_new: string
  market_signal: string
  trend_resonance: { title: string; description: string }[]
  oelz_development_relevance: string
  possible_oelz_transfer: string
  ratings: { fitToOelz: number; novelty: number; feasibility: number; claimPotential: number; priority: Priority }
  source_url: string
  source_date: string
  ai_generated: boolean
}

const EMPTY: FormState = {
  title: '', radar_type: 'Format', short_signal: '', oelz_relevance_short: '',
  tags: [], image_url: '', product_example: '', category: '', market: '',
  channel: '', main_claim: '', what_is_new: '', market_signal: '',
  trend_resonance: [], oelz_development_relevance: '', possible_oelz_transfer: '',
  ratings: { fitToOelz: 3, novelty: 3, feasibility: 3, claimPotential: 3, priority: 'Prüfen' },
  source_url: '', source_date: '', ai_generated: false,
}

export function ImpulseForm({ initialValues, impulseId }: ImpulseFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [form, setForm] = useState<FormState>({
    ...EMPTY,
    ...initialValues,
    short_signal: initialValues?.short_signal ?? '',
    oelz_relevance_short: initialValues?.oelz_relevance_short ?? '',
    image_url: initialValues?.image_url ?? '',
    product_example: initialValues?.product_example ?? '',
    category: initialValues?.category ?? '',
    market: initialValues?.market ?? '',
    channel: initialValues?.channel ?? '',
    main_claim: initialValues?.main_claim ?? '',
    what_is_new: initialValues?.what_is_new ?? '',
    market_signal: initialValues?.market_signal ?? '',
    oelz_development_relevance: initialValues?.oelz_development_relevance ?? '',
    possible_oelz_transfer: initialValues?.possible_oelz_transfer ?? '',
    source_url: initialValues?.source_url ?? '',
    source_date: initialValues?.source_date ?? '',
    trend_resonance: initialValues?.trend_resonance ?? [],
    ratings: initialValues?.ratings ?? EMPTY.ratings,
  })
  const [researchText, setResearchText] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [extracting, setExtracting] = useState(false)
  const [extractError, setExtractError] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function toggleTag(tag: string) {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }))
  }

  function setRating(key: keyof FormState['ratings'], value: number | Priority) {
    setForm((prev) => ({ ...prev, ratings: { ...prev.ratings, [key]: value } }))
  }

  function addTrendResonance() {
    if (form.trend_resonance.length >= 3) return
    setForm((prev) => ({ ...prev, trend_resonance: [...prev.trend_resonance, { title: '', description: '' }] }))
  }

  function updateTrendResonance(i: number, key: 'title' | 'description', value: string) {
    setForm((prev) => {
      const updated = [...prev.trend_resonance]
      updated[i] = { ...updated[i], [key]: value }
      return { ...prev, trend_resonance: updated }
    })
  }

  function removeTrendResonance(i: number) {
    setForm((prev) => ({ ...prev, trend_resonance: prev.trend_resonance.filter((_, idx) => idx !== i) }))
  }

  async function handleExtract() {
    if (!researchText.trim()) return
    setExtracting(true)
    setExtractError(null)
    try {
      const res = await fetch('/api/extract-impulse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: researchText }),
      })
      if (!res.ok) { setExtractError('Extraktion fehlgeschlagen'); return }
      const data = await res.json()
      setForm((prev) => ({
        ...prev,
        title: data.title || prev.title,
        radar_type: data.radar_type || prev.radar_type,
        short_signal: data.short_signal || prev.short_signal,
        oelz_relevance_short: data.oelz_relevance_short || prev.oelz_relevance_short,
        tags: data.tags?.length ? data.tags : prev.tags,
        product_example: data.product_example || prev.product_example,
        category: data.category || prev.category,
        market: data.market || prev.market,
        channel: data.channel || prev.channel,
        main_claim: data.main_claim || prev.main_claim,
        what_is_new: data.what_is_new || prev.what_is_new,
        market_signal: data.market_signal || prev.market_signal,
        trend_resonance: data.trend_resonance?.length ? data.trend_resonance : prev.trend_resonance,
        oelz_development_relevance: data.oelz_development_relevance || prev.oelz_development_relevance,
        possible_oelz_transfer: data.possible_oelz_transfer || prev.possible_oelz_transfer,
        ratings: data.ratings || prev.ratings,
        source_url: data.source_url || prev.source_url,
        source_date: data.source_date || prev.source_date,
        ai_generated: true,
      }))
    } catch {
      setExtractError('Netzwerkfehler — bitte erneut versuchen')
    } finally {
      setExtracting(false)
    }
  }

  async function handleSave(status: 'draft' | 'published') {
    setSaveError(null)
    if (!form.title) { setSaveError('Titel ist erforderlich'); return }

    startTransition(async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      let imageUrl = form.image_url

      if (imageFile) {
        const ext = imageFile.name.split('.').pop()
        const path = `${crypto.randomUUID()}.${ext}`
        const { error: uploadError } = await supabase.storage
          .from('innovation-images')
          .upload(path, imageFile, { contentType: imageFile.type })
        if (uploadError) { setSaveError(`Bild-Upload fehlgeschlagen: ${uploadError.message}`); return }
        const { data: urlData } = supabase.storage.from('innovation-images').getPublicUrl(path)
        imageUrl = urlData.publicUrl
      }

      const payload = {
        title: form.title,
        radar_type: form.radar_type,
        short_signal: form.short_signal || null,
        oelz_relevance_short: form.oelz_relevance_short || null,
        tags: form.tags,
        image_url: imageUrl || null,
        product_example: form.product_example || null,
        category: form.category || null,
        market: form.market || null,
        channel: form.channel || null,
        main_claim: form.main_claim || null,
        what_is_new: form.what_is_new || null,
        market_signal: form.market_signal || null,
        trend_resonance: form.trend_resonance,
        oelz_development_relevance: form.oelz_development_relevance || null,
        possible_oelz_transfer: form.possible_oelz_transfer || null,
        ratings: form.ratings,
        source_url: form.source_url || null,
        source_date: form.source_date || null,
        status,
        ai_generated: form.ai_generated,
        created_by: user?.id,
      }

      let error
      if (impulseId) {
        ;({ error } = await supabase.from('innovation_impulses').update(payload).eq('id', impulseId))
      } else {
        ;({ error } = await supabase.from('innovation_impulses').insert(payload))
      }

      if (error) { setSaveError(error.message); return }
      router.push('/admin/produkt-radar')
      router.refresh()
    })
  }

  return (
    <div className="space-y-8 max-w-2xl">

      {/* AI Extraction */}
      <div className="border rounded-xl p-5 space-y-3 bg-secondary/20">
        <h2 className="text-sm font-semibold">Research-Text einfügen & AI strukturieren</h2>
        <Textarea
          value={researchText}
          onChange={(e) => setResearchText(e.target.value)}
          rows={8}
          placeholder="Perplexity-Research-Ergebnis hier einfügen…"
        />
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleExtract}
            disabled={!researchText.trim() || extracting}
            className="gap-1.5"
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

      {/* Image */}
      <div className="space-y-3">
        <Label>Bild (optional)</Label>
        <div className="space-y-2">
          <Input
            type="url"
            value={form.image_url}
            onChange={(e) => setField('image_url', e.target.value)}
            placeholder="Bild-URL einfügen (z.B. von Instagram oder Retailer-Website)"
          />
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">oder</span>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="flex-1"
            />
          </div>
          {form.image_url && !imageFile && (
            <p className="text-xs text-muted-foreground">Aktuelles Bild: <a href={form.image_url} target="_blank" rel="noreferrer" className="underline">Vorschau</a></p>
          )}
        </div>
      </div>

      {/* Core fields */}
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="title">Impulstitel * <span className="text-xs text-muted-foreground font-normal">(konzeptzentriert, nicht akteurszentriert)</span></Label>
          <Input id="title" value={form.title} onChange={(e) => setField('title', e.target.value)} placeholder="z.B. Pistazie wird LEH-tauglich" />
        </div>

        <div className="space-y-2">
          <Label>Radar-Typ *</Label>
          <div className="flex flex-wrap gap-2">
            {RADAR_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setField('radar_type', type)}
                className={cn(
                  'text-xs px-2.5 py-1 rounded-full border transition-colors',
                  form.radar_type === type
                    ? 'bg-foreground text-background border-foreground'
                    : 'border-border hover:bg-secondary'
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="short_signal">Kurzsignal</Label>
          <Textarea id="short_signal" value={form.short_signal} onChange={(e) => setField('short_signal', e.target.value)} rows={2} placeholder="1-2 Sätze: Was ist das übergeordnete Produktsignal?" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="oelz_relevance_short">Ölz-Relevanz (1 Satz)</Label>
          <Input id="oelz_relevance_short" value={form.oelz_relevance_short} onChange={(e) => setField('oelz_relevance_short', e.target.value)} placeholder="Warum ist das für Ölz Produktentwicklung relevant?" />
        </div>

        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="flex flex-wrap gap-1.5">
            {IMPULSE_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={cn(
                  'text-xs px-2.5 py-1 rounded-full border transition-colors',
                  form.tags.includes(tag)
                    ? 'bg-foreground text-background border-foreground'
                    : 'border-border hover:bg-secondary'
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Detail fields */}
      <div className="space-y-4 border-t pt-6">
        <h3 className="text-sm font-semibold text-muted-foreground">Detail-Felder (für Modal)</h3>
        {[
          ['product_example', 'Produktbeleg / Marktbeispiel', 'Konkretes Produkt, Marke, Händler als Beleg'],
          ['category', 'Kategorie', 'z.B. Croissant, Toast, Snack'],
          ['market', 'Markt', 'z.B. Deutschland, Österreich, UK'],
          ['channel', 'Kanal', 'z.B. LEH, Discount, Coffee Chain'],
          ['main_claim', 'Hauptclaim', 'z.B. High Protein, Clean Label, Premium'],
        ].map(([key, label, placeholder]) => (
          <div key={key} className="space-y-1.5">
            <Label htmlFor={key}>{label}</Label>
            <Input id={key} value={String((form as unknown as Record<string, unknown>)[key] ?? '')} onChange={(e) => setField(key as keyof FormState, e.target.value)} placeholder={placeholder} />
          </div>
        ))}

        <div className="space-y-1.5">
          <Label htmlFor="what_is_new">Was ist neu oder bemerkenswert?</Label>
          <Textarea id="what_is_new" value={form.what_is_new} onChange={(e) => setField('what_is_new', e.target.value)} rows={3} placeholder="2-3 Sätze Einordnung" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="market_signal">Marktsignal</Label>
          <Textarea id="market_signal" value={form.market_signal} onChange={(e) => setField('market_signal', e.target.value)} rows={2} placeholder="Welches größere Marktmuster steckt dahinter?" />
        </div>
      </div>

      {/* Trend resonance */}
      <div className="space-y-3 border-t pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-muted-foreground">Trend-Resonanz (max. 3)</h3>
          {form.trend_resonance.length < 3 && (
            <Button type="button" variant="outline" size="sm" onClick={addTrendResonance} className="gap-1">
              <Plus className="w-3.5 h-3.5" /> Hinzufügen
            </Button>
          )}
        </div>
        {form.trend_resonance.map((tr, i) => (
          <div key={i} className="border rounded-lg p-3 space-y-2 bg-amber-50/50">
            <div className="flex items-center justify-between gap-2">
              <Input
                value={tr.title}
                onChange={(e) => updateTrendResonance(i, 'title', e.target.value)}
                placeholder="Trendname"
                className="flex-1"
              />
              <button type="button" onClick={() => removeTrendResonance(i)} className="text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <Textarea
              value={tr.description}
              onChange={(e) => updateTrendResonance(i, 'description', e.target.value)}
              rows={2}
              placeholder="Kurze Erklärung wie dieser Trend auf den Impuls einzahlt"
            />
          </div>
        ))}
      </div>

      {/* Ölz transfer + relevance */}
      <div className="space-y-4 border-t pt-6">
        <div className="space-y-1.5">
          <Label htmlFor="oelz_development_relevance">Relevanz für Ölz</Label>
          <Textarea id="oelz_development_relevance" value={form.oelz_development_relevance} onChange={(e) => setField('oelz_development_relevance', e.target.value)} rows={3} placeholder="2-3 Sätze aus Sicht Produktentwicklung / Innovation" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="possible_oelz_transfer">Möglicher Ölz-Transfer</Label>
          <Input id="possible_oelz_transfer" value={form.possible_oelz_transfer} onChange={(e) => setField('possible_oelz_transfer', e.target.value)} placeholder="Konkrete Prüffrage oder Produktidee" />
        </div>
      </div>

      {/* Source */}
      <div className="space-y-4 border-t pt-6">
        <h3 className="text-sm font-semibold text-muted-foreground">Quelle</h3>
        <div className="space-y-3">
          <Input value={form.source_url} onChange={(e) => setField('source_url', e.target.value)} placeholder="https://..." type="url" />
          <Input value={form.source_date} onChange={(e) => setField('source_date', e.target.value)} type="date" />
        </div>
      </div>

      {saveError && <p className="text-sm text-destructive">{saveError}</p>}

      <div className="flex items-center gap-3 pt-2">
        <Button type="button" variant="outline" onClick={() => handleSave('draft')} disabled={!form.title || isPending}>
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Als Entwurf speichern'}
        </Button>
        <Button type="button" onClick={() => handleSave('published')} disabled={!form.title || isPending} style={{ backgroundColor: '#F07D00', borderColor: '#F07D00', color: 'white' }}>
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Upload className="w-4 h-4" /> Veröffentlichen</>}
        </Button>
      </div>
    </div>
  )
}
