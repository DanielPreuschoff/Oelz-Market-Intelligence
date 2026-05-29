'use client'

import { CandidateCard } from './candidate-card'
import type { SignalCandidateWithRelations } from '@/types/database'

interface CandidateReviewListProps {
  candidates: SignalCandidateWithRelations[]
}

export function CandidateReviewList({ candidates }: CandidateReviewListProps) {
  async function handleApprove(id: string) {
    const res = await fetch(`/api/research/candidates/${id}/approve`, { method: 'POST' })
    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error ?? 'Approval failed')
    }
  }

  async function handleReject(id: string) {
    const res = await fetch(`/api/research/candidates/${id}/reject`, { method: 'POST' })
    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error ?? 'Rejection failed')
    }
  }

  const pending  = candidates.filter((c) => c.status === 'pending')
  const reviewed = candidates.filter((c) => c.status !== 'pending')

  return (
    <div className="space-y-8">
      {/* Pending */}
      {pending.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Pending review ({pending.length})
          </h2>
          <div className="space-y-3">
            {pending.map((c) => (
              <CandidateCard
                key={c.id}
                candidate={c}
                onApprove={handleApprove}
                onReject={handleReject}
                isAdmin
              />
            ))}
          </div>
        </section>
      )}

      {/* Already reviewed */}
      {reviewed.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Reviewed ({reviewed.length})
          </h2>
          <div className="space-y-3">
            {reviewed.map((c) => (
              <CandidateCard
                key={c.id}
                candidate={c}
                onApprove={handleApprove}
                onReject={handleReject}
                isAdmin
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
