'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  CATEGORY_LABELS,
  IMPORTANCE_LABELS,
  ROLE_LABELS,
  type Competitor,
  type Country,
  type SignalCategory,
  type ImportanceLevel,
  type UserRole,
  type Signal,
} from '@/types/database'
import { Sparkles, Loader2 } from 'lucide-react'

interface SignalFormProps {
  competitors: Competitor[]
  countries: Country[]
  initialValues?: Partial<Signal>
  signalId?: string
}

const EMPTY_FORM = {
  headline: '',
  summary: '',
  category: '' as SignalCategory | '',
  competitor_id: '',
  country_id: '',
  importance: '1' as ImportanceLevel,
  role_relevance: [] as UserRole[],
  source_url: '',
  source_name: '',
  signal_date: '',
  status: 'draft' as Signal['status'],
  ai_generated: false,
}

export function SignalForm({ competitors, countries, initialValues, signalId }: SignalFormProps) {
  const router = useRouter()
  const [form, setForm] = useState<typeof EMPTY_FORM>({
    ...EMPTY_FORM,
    ...(initialValues ? {
      headline: initialValues.headline ?? '',
      summary: initialValues.summary ?? '',
      category: (initialValues.category ?? '') as SignalCategory | '',
      competitor_id: initialValues.competitor_id ?? '',
      country_id: initialValues.country_id ?? '',
      importance: (initialValues.importance ?? '1') as ImportanceLevel,
      role_relevance: (initialValues.role_relevance ?? []) as UserRole[],
      source_url: initialValues.source_url ?? '',
      source_name: initialValues.source_name ?? '',
      signal_date: initialValues.signal_date ?? '',
      status: (initialValues.status ?? 'draft') as Signal['status'],
      ai_generated: initialValues.ai_generated ?? false,
    } : {}),
  })
  const [rawText, setRawText] = useState('')
  const [extracting, setExtracting] = useState(false)
  const [extractError, setExtractError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  function setField<K extends keyof typeof EMPTY_FORM>(key: K, value: typeof EMPTY_FORM[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function toggleRole(role: UserRole) {
    setForm((prev) => ({
      ...prev,
      role_relevance: prev.role_relevance.includes(role)
        ? prev.role_relevance.filter((r) => r !== role)
        : [...prev.role_relevance, role],
    }))
  }

  async function handleExtract() {
    if (!rawText.trim()) return
    setExtracting(true)
    setExtractError(null)

    try {
      const res = await fetch('/api/extract-signal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText }),
      })
      const data = await res.json()

      if (!res.ok) {
        setExtractError(data.error ?? 'Extraction failed')
        return
      }

      // Match competitor by name
      const matchedCompetitor = data.competitor_name
        ? competitors.find((c) =>
            c.name.toLowerCase().includes(data.competitor_name.toLowerCase()) ||
            c.short_name.toLowerCase().includes(data.competitor_name.toLowerCase())
          )
        : null

      setForm((prev) => ({
        ...prev,
        headline: data.headline ?? prev.headline,
        summary: data.summary ?? prev.summary,
        category: data.category ?? prev.category,
        competitor_id: matchedCompetitor?.id ?? prev.competitor_id,
        country_id: countries.some((c) => c.id === data.country_code) ? data.country_code : prev.country_id,
        importance: String(data.importance ?? prev.importance) as ImportanceLevel,
        source_name: data.source_name ?? prev.source_name,
        signal_date: data.signal_date ?? prev.signal_date,
        ai_generated: true,
      }))
    } catch {
      setExtractError('Network error — try again')
    } finally {
      setExtracting(false)
    }
  }

  async function handleSave(status: Signal['status']) {
    setSaving(true)
    setSaveError(null)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const payload = {
      headline: form.headline,
      summary: form.summary,
      category: form.category || null,
      competitor_id: form.competitor_id || null,
      country_id: form.country_id || null,
      importance: form.importance,
      role_relevance: form.role_relevance,
      source_url: form.source_url || null,
      source_name: form.source_name || null,
      signal_date: form.signal_date || null,
      status,
      ai_generated: form.ai_generated,
      reviewed_by: status === 'reviewed' || status === 'published' ? user?.id : null,
      created_by: user?.id,
    }

    let error
    if (signalId) {
      ;({ error } = await supabase.from('signals').update(payload).eq('id', signalId))
    } else {
      ;({ error } = await supabase.from('signals').insert(payload))
    }

    if (error) {
      setSaveError(error.message)
      setSaving(false)
      return
    }

    router.push('/admin/signals')
    router.refresh()
  }

  return (
    <div className="space-y-6">
      {/* AI Extraction */}
      <div className="border rounded-xl p-4 space-y-3 bg-secondary/30">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">AI Extraction</span>
          <span className="text-xs text-muted-foreground">— paste raw text to auto-fill fields</span>
        </div>
        <Textarea
          placeholder="Paste article text, press release, LinkedIn post, or any raw text..."
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          rows={4}
          className="bg-white text-sm"
        />
        {extractError && (
          <p className="text-xs text-destructive">{extractError}</p>
        )}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={handleExtract}
          disabled={extracting || !rawText.trim()}
        >
          {extracting ? (
            <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />Extracting...</>
          ) : (
            <><Sparkles className="w-3.5 h-3.5 mr-1.5" />Extract with AI</>
          )}
        </Button>
      </div>

      <Separator />

      {/* Form fields */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="headline">
            Headline
            {form.ai_generated && <span className="ml-2 text-xs text-muted-foreground">AI draft — review before saving</span>}
          </Label>
          <Input
            id="headline"
            value={form.headline}
            onChange={(e) => setField('headline', e.target.value)}
            placeholder="Competitor name + what happened (max 80 chars)"
            maxLength={120}
          />
          <p className="text-xs text-muted-foreground">{form.headline.length}/80 recommended</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            id="summary"
            value={form.summary}
            onChange={(e) => setField('summary', e.target.value)}
            placeholder="2–5 sentences. What happened, scope, and why it matters for Ölz."
            rows={5}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={form.category} onValueChange={(v) => setField('category', v as SignalCategory)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {(Object.entries(CATEGORY_LABELS) as [SignalCategory, string][]).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Importance</Label>
            <Select value={form.importance} onValueChange={(v) => setField('importance', v as ImportanceLevel)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.entries(IMPORTANCE_LABELS) as [ImportanceLevel, string][]).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{key} — {label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Competitor</Label>
            <Select value={form.competitor_id ?? ''} onValueChange={(v) => setField('competitor_id', v ?? '')}>
              <SelectTrigger>
                <SelectValue placeholder="Select competitor (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None (market-level)</SelectItem>
                {competitors.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.short_name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Country</Label>
            <Select value={form.country_id ?? ''} onValueChange={(v) => setField('country_id', v ?? '')}>
              <SelectTrigger>
                <SelectValue placeholder="Select country (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {countries.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Role Relevance</Label>
          <div className="flex flex-wrap gap-2">
            {(Object.entries(ROLE_LABELS) as [UserRole, string][]).map(([role, label]) => (
              <button
                key={role}
                type="button"
                onClick={() => toggleRole(role)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  form.role_relevance.includes(role)
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border hover:bg-secondary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="signal_date">Signal Date</Label>
            <Input
              id="signal_date"
              type="date"
              value={form.signal_date}
              onChange={(e) => setField('signal_date', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="source_name">Source Name</Label>
            <Input
              id="source_name"
              value={form.source_name}
              onChange={(e) => setField('source_name', e.target.value)}
              placeholder="e.g. APA, LinkedIn, LEBENSMITTELpraxis"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="source_url">Source URL (optional)</Label>
          <Input
            id="source_url"
            type="url"
            value={form.source_url}
            onChange={(e) => setField('source_url', e.target.value)}
            placeholder="https://..."
          />
        </div>
      </div>

      {saveError && (
        <p className="text-sm text-destructive">{saveError}</p>
      )}

      {/* Save actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          disabled={saving}
          onClick={() => handleSave('draft')}
        >
          Save as Draft
        </Button>
        <Button
          type="button"
          disabled={saving || !form.headline || !form.summary || !form.category}
          onClick={() => handleSave('reviewed')}
        >
          {saving ? <><Loader2 className="w-4 h-4 mr-1.5 animate-spin" />Saving...</> : 'Save as Reviewed'}
        </Button>
      </div>
    </div>
  )
}
