'use client'

import { useState, useTransition } from 'react'
import { CheckCircle, XCircle, ExternalLink } from 'lucide-react'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  IMPORTANCE_LABELS,
  IMPORTANCE_COLORS,
  type SignalCandidateWithRelations,
} from '@/types/database'

interface CandidateCardProps {
  candidate: SignalCandidateWithRelations
  onApprove: (id: string) => Promise<void>
  onReject: (id: string) => Promise<void>
  isAdmin?: boolean
}

export function CandidateCard({ candidate, onApprove, onReject, isAdmin }: CandidateCardProps) {
  const [status, setStatus] = useState(candidate.status)
  const [isPending, startTransition] = useTransition()

  function handleApprove() {
    startTransition(async () => {
      await onApprove(candidate.id)
      setStatus('approved')
    })
  }

  function handleReject() {
    startTransition(async () => {
      await onReject(candidate.id)
      setStatus('rejected')
    })
  }

  const isDone = status !== 'pending'

  return (
    <div
      className={cn(
        'border rounded-xl p-5 bg-white transition-opacity',
        isDone && 'opacity-40'
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0 space-y-2">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-1.5">
            {candidate.category && (
              <Badge variant="secondary" className={cn('text-xs', CATEGORY_COLORS[candidate.category])}>
                {CATEGORY_LABELS[candidate.category]}
              </Badge>
            )}
            <Badge variant="secondary" className={cn('text-xs', IMPORTANCE_COLORS[candidate.importance])}>
              {IMPORTANCE_LABELS[candidate.importance]}
            </Badge>
            {candidate.competitor && (
              <span className="text-xs text-muted-foreground">{candidate.competitor.short_name}</span>
            )}
            {candidate.country && (
              <span className="text-xs text-muted-foreground">{candidate.country.name}</span>
            )}
            {candidate.signal_date && (
              <span className="text-xs text-muted-foreground">
                {format(new Date(candidate.signal_date), 'MMM d, yyyy')}
              </span>
            )}
            {isAdmin && candidate.research_source && (
              <span className="text-[10px] font-mono text-muted-foreground/50 border border-muted-foreground/20 rounded px-1 py-0.5">
                {candidate.research_source === 'google_news_rss' ? 'Google News' : candidate.research_source === 'mixed' ? 'Mixed' : 'Perplexity'}
              </span>
            )}
          </div>

          {/* Headline */}
          <p className="text-sm font-semibold leading-snug">{candidate.headline}</p>

          {/* Summary */}
          {candidate.summary && (
            <p className="text-sm text-muted-foreground leading-relaxed">{candidate.summary}</p>
          )}

          {/* Source */}
          {candidate.source_url && (
            <a
              href={candidate.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
            >
              <ExternalLink className="w-3 h-3" />
              {candidate.source_name ?? 'Source'}
            </a>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 shrink-0">
          {status === 'pending' ? (
            <>
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 text-green-700 border-green-200 hover:bg-green-50 hover:border-green-300"
                onClick={handleApprove}
                disabled={isPending}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="gap-1.5 text-muted-foreground hover:text-red-600"
                onClick={handleReject}
                disabled={isPending}
              >
                <XCircle className="w-3.5 h-3.5" />
                Reject
              </Button>
            </>
          ) : (
            <span className={cn(
              'text-xs font-medium px-2 py-1 rounded-md',
              status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
            )}>
              {status === 'approved' ? 'Approved' : 'Rejected'}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
