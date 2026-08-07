'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { MonthPicker } from '@/components/admin/month-picker'
import type { Edition } from '@/types/database'
import { Loader2 } from 'lucide-react'

interface EditionFormProps {
  initialValues?: Partial<Edition>
  editionId?: string
}

export function EditionForm({ initialValues, editionId }: EditionFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(initialValues?.title ?? '')
  const [periodMonth, setPeriodMonth] = useState(
    initialValues?.period_month ? initialValues.period_month.slice(0, 7) : ''
  )
  const [editorialSummary, setEditorialSummary] = useState(initialValues?.editorial_summary ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSave() {
    if (!title || !periodMonth) return
    setSaving(true)
    setError(null)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const payload = {
      title,
      period_month: `${periodMonth}-01`,
      editorial_summary: editorialSummary || null,
      created_by: user?.id,
    }

    let result
    if (editionId) {
      result = await supabase.from('editions').update(payload).eq('id', editionId).select().single()
    } else {
      result = await supabase.from('editions').insert(payload).select().single()
    }

    if (result.error) {
      setError(result.error.message)
      setSaving(false)
      return
    }

    router.push(`/admin/editions/${result.data.id}`)
    router.refresh()
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Edition Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. March 2026 — Market Intelligence"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="period">Period (month)</Label>
        <MonthPicker id="period" value={periodMonth} onChange={setPeriodMonth} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">
          Editorial Summary <span className="font-normal text-muted-foreground">— optional</span>
        </Label>
        <Textarea
          id="summary"
          value={editorialSummary}
          onChange={(e) => setEditorialSummary(e.target.value)}
          placeholder="Optional: 2–3 paragraph opening that frames the key themes of this edition. Can be added later."
          rows={6}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-3">
        <Button
          onClick={handleSave}
          disabled={saving || !title || !periodMonth}
        >
          {saving ? <><Loader2 className="w-4 h-4 mr-1.5 animate-spin" />Saving...</> : 'Create Edition'}
        </Button>
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
