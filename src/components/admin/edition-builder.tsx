'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  IMPORTANCE_LABELS,
  IMPORTANCE_COLORS,
  type EditionWithSignals,
  type SignalWithRelations,
} from '@/types/database'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import {
  Plus,
  X,
  ArrowUp,
  ArrowDown,
  Send,
  Loader2,
} from 'lucide-react'

interface EditionBuilderProps {
  edition: EditionWithSignals
  unaddedSignals: SignalWithRelations[]
}

export function EditionBuilder({ edition, unaddedSignals }: EditionBuilderProps) {
  const router = useRouter()
  const [includedRows, setIncludedRows] = useState(
    [...edition.edition_signals].sort((a, b) => a.position - b.position)
  )
  const [available, setAvailable] = useState(unaddedSignals)
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function addSignal(signal: SignalWithRelations) {
    const newRow = {
      id: `temp-${signal.id}`,
      edition_id: edition.id,
      signal_id: signal.id,
      position: includedRows.length,
      created_at: new Date().toISOString(),
      signal,
    }
    setIncludedRows((prev) => [...prev, newRow])
    setAvailable((prev) => prev.filter((s) => s.id !== signal.id))
  }

  function removeSignal(signalId: string) {
    const removed = includedRows.find((r) => r.signal_id === signalId)
    if (!removed) return
    setIncludedRows((prev) => prev.filter((r) => r.signal_id !== signalId))
    setAvailable((prev) => [removed.signal, ...prev])
  }

  function moveUp(index: number) {
    if (index === 0) return
    setIncludedRows((prev) => {
      const arr = [...prev]
      ;[arr[index - 1], arr[index]] = [arr[index], arr[index - 1]]
      return arr.map((r, i) => ({ ...r, position: i }))
    })
  }

  function moveDown(index: number) {
    if (index === includedRows.length - 1) return
    setIncludedRows((prev) => {
      const arr = [...prev]
      ;[arr[index], arr[index + 1]] = [arr[index + 1], arr[index]]
      return arr.map((r, i) => ({ ...r, position: i }))
    })
  }

  async function saveOrder() {
    setSaving(true)
    setError(null)
    const supabase = createClient()

    // Delete all existing edition_signals for this edition
    await supabase.from('edition_signals').delete().eq('edition_id', edition.id)

    // Insert new ordered set
    if (includedRows.length > 0) {
      const { error: insertError } = await supabase.from('edition_signals').insert(
        includedRows.map((row, i) => ({
          edition_id: edition.id,
          signal_id: row.signal_id,
          position: i,
        }))
      )
      if (insertError) {
        setError(insertError.message)
        setSaving(false)
        return
      }

      // If the edition is already published, automatically publish any new signals added to it
      if (edition.status === 'published') {
        const signalIds = includedRows.map((r) => r.signal_id)
        await supabase.from('signals').update({ status: 'published' }).in('id', signalIds)
      }
    }

    setSaving(false)
    router.refresh()
  }

  async function publish() {
    setPublishing(true)
    setError(null)
    const supabase = createClient()

    // Save order first
    await supabase.from('edition_signals').delete().eq('edition_id', edition.id)
    if (includedRows.length > 0) {
      await supabase.from('edition_signals').insert(
        includedRows.map((row, i) => ({
          edition_id: edition.id,
          signal_id: row.signal_id,
          position: i,
        }))
      )
    }

    // Mark signals as published
    const signalIds = includedRows.map((r) => r.signal_id)
    if (signalIds.length > 0) {
      await supabase.from('signals').update({ status: 'published' }).in('id', signalIds)
    }

    // Publish edition
    const { error: pubError } = await supabase
      .from('editions')
      .update({ status: 'published', published_at: new Date().toISOString() })
      .eq('id', edition.id)

    if (pubError) {
      setError(pubError.message)
      setPublishing(false)
      return
    }

    router.push(`/editions/${edition.id}`)
    router.refresh()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Included signals */}
      <div className="lg:col-span-3 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">
            Included signals <span className="text-muted-foreground">({includedRows.length})</span>
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={saveOrder}
              disabled={saving}
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Save Order'}
            </Button>
            {edition.status !== 'published' && (
              <Button
                size="sm"
                onClick={publish}
                disabled={publishing || includedRows.length === 0}
              >
                {publishing
                  ? <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />Publishing...</>
                  : <><Send className="w-3.5 h-3.5 mr-1.5" />Publish Edition</>
                }
              </Button>
            )}
          </div>
        </div>

        {error && <p className="text-xs text-destructive">{error}</p>}

        {includedRows.length === 0 ? (
          <div className="border-2 border-dashed rounded-xl p-12 text-center text-sm text-muted-foreground">
            Add signals from the panel on the right.
          </div>
        ) : (
          <div className="space-y-2">
            {includedRows.map((row, index) => {
              const signal = row.signal
              return (
                <div
                  key={row.signal_id}
                  className="border rounded-xl px-4 py-3 bg-white flex items-start gap-3"
                >
                  <div className="flex flex-col gap-0.5 pt-0.5">
                    <button
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveDown(index)}
                      disabled={index === includedRows.length - 1}
                      className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Badge
                        variant="secondary"
                        className={cn('text-xs', CATEGORY_COLORS[signal.category])}
                      >
                        {CATEGORY_LABELS[signal.category]}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={cn('text-xs', IMPORTANCE_COLORS[signal.importance])}
                      >
                        {IMPORTANCE_LABELS[signal.importance]}
                      </Badge>
                      {signal.competitor && (
                        <span className="text-xs text-muted-foreground">{signal.competitor.short_name}</span>
                      )}
                    </div>
                    <p className="text-sm font-medium leading-snug">{signal.headline}</p>
                  </div>
                  <button
                    onClick={() => removeSignal(signal.id)}
                    className="text-muted-foreground hover:text-destructive shrink-0 mt-0.5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Available signals to add */}
      <div className="lg:col-span-2 space-y-3">
        <h2 className="text-sm font-medium">
          Available signals <span className="text-muted-foreground">({available.length})</span>
        </h2>
        <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
          {available.length === 0 ? (
            <p className="text-xs text-muted-foreground py-4 text-center">
              All reviewed signals are included.
            </p>
          ) : (
            available.map((signal) => (
              <button
                key={signal.id}
                onClick={() => addSignal(signal)}
                className="w-full text-left border rounded-lg px-3 py-2.5 bg-white hover:bg-secondary/60 transition-colors space-y-1 group"
              >
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Badge
                    variant="secondary"
                    className={cn('text-xs', CATEGORY_COLORS[signal.category])}
                  >
                    {CATEGORY_LABELS[signal.category]}
                  </Badge>
                  {signal.competitor && (
                    <span className="text-xs text-muted-foreground">{signal.competitor.short_name}</span>
                  )}
                  {signal.signal_date && (
                    <span className="text-xs text-muted-foreground ml-auto">
                      {format(new Date(signal.signal_date), 'MMM d')}
                    </span>
                  )}
                </div>
                <p className="text-xs font-medium leading-snug line-clamp-2">{signal.headline}</p>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus className="w-3 h-3 text-primary" />
                  <span className="text-xs text-primary">Add to edition</span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
