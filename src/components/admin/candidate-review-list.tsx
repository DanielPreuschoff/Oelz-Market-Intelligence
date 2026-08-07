'use client'

import { useState, useTransition } from 'react'
import { Loader2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CandidateCard } from './candidate-card'
import type { SignalCandidateWithRelations } from '@/types/database'

interface CandidateReviewListProps {
  candidates: SignalCandidateWithRelations[]
}

/**
 * Durchsicht der Importkandidaten.
 *
 * Sammel-Ablehnung, aber kein Sammel-Bestätigen: das Wegräumen des Ausschusses
 * ist die Massenbewegung, das Bestätigen die Stelle, an der die Redaktionsregel
 * greift, dass KI-Entwürfe vor der Veröffentlichung gelesen werden
 * (docs/content-guidelines.md).
 */
export function CandidateReviewList({ candidates }: CandidateReviewListProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [bulkRejected, setBulkRejected] = useState<Set<string>>(new Set())
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  async function handleApprove(id: string) {
    const res = await fetch(`/api/import/candidates/${id}/approve`, { method: 'POST' })
    if (!res.ok) throw new Error((await res.json()).error ?? 'Bestätigen fehlgeschlagen')
  }

  async function handleReject(id: string) {
    const res = await fetch(`/api/import/candidates/${id}/reject`, { method: 'POST' })
    if (!res.ok) throw new Error((await res.json()).error ?? 'Ablehnen fehlgeschlagen')
  }

  function toggle(id: string, isSelected: boolean) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (isSelected) next.add(id)
      else next.delete(id)
      return next
    })
  }

  const pending = candidates.filter((c) => c.status === 'pending' && !bulkRejected.has(c.id))
  const reviewed = candidates.filter((c) => c.status !== 'pending' || bulkRejected.has(c.id))
  const allSelected = pending.length > 0 && pending.every((c) => selected.has(c.id))

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(pending.map((c) => c.id)))
  }

  function rejectSelected() {
    const ids = [...selected]
    if (ids.length === 0) return
    setError(null)
    startTransition(async () => {
      const res = await fetch('/api/import/candidates/reject-many', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
      })
      if (!res.ok) {
        setError((await res.json()).error ?? 'Ablehnen fehlgeschlagen')
        return
      }
      setBulkRejected((prev) => new Set([...prev, ...ids]))
      setSelected(new Set())
    })
  }

  return (
    <div className="space-y-8">
      {pending.length > 0 && (
        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Offen ({pending.length})
            </h2>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleAll}
                className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
              >
                {allSelected ? 'Auswahl aufheben' : 'Alle auswählen'}
              </button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={rejectSelected}
                disabled={selected.size === 0 || isPending}
                className="gap-1.5"
              >
                {isPending
                  ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Lehne ab…</>
                  : <><XCircle className="w-3.5 h-3.5" /> {selected.size} ablehnen</>}
              </Button>
            </div>
          </div>

          {error && <p className="text-xs text-destructive">{error}</p>}

          <div className="space-y-3">
            {pending.map((c) => (
              <CandidateCard
                key={c.id}
                candidate={c}
                onApprove={handleApprove}
                onReject={handleReject}
                isAdmin
                selected={selected.has(c.id)}
                onSelectedChange={toggle}
              />
            ))}
          </div>
        </section>
      )}

      {reviewed.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Erledigt ({reviewed.length})
          </h2>
          <div className="space-y-3">
            {reviewed.map((c) => (
              <CandidateCard
                key={c.id}
                candidate={c}
                onApprove={handleApprove}
                onReject={handleReject}
                isAdmin
                overrideStatus={bulkRejected.has(c.id) ? 'rejected' : undefined}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
