import Link from 'next/link'
import { format } from 'date-fns'
import {
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  IMPORTANCE_LABELS,
  IMPORTANCE_COLORS,
  ROLE_LABELS,
  type SignalWithRelations,
} from '@/types/database'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { ExternalLink } from 'lucide-react'

interface SignalCardProps {
  signal: SignalWithRelations
  variant?: 'default' | 'compact'
  highlightRole?: string
}

export function SignalCard({ signal, variant = 'default', highlightRole }: SignalCardProps) {
  const isRoleHighlighted = highlightRole && signal.role_relevance.includes(highlightRole as never)

  return (
    <article
      className={cn(
        'bg-white border rounded-xl p-5 space-y-3 transition-shadow hover:shadow-sm',
        signal.importance === '3' && 'border-red-200 bg-red-50/30',
        isRoleHighlighted && 'ring-1 ring-primary/20'
      )}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 min-w-0">
          <Badge
            variant="secondary"
            className={cn('text-xs font-medium shrink-0', CATEGORY_COLORS[signal.category])}
          >
            {CATEGORY_LABELS[signal.category]}
          </Badge>
          <Badge
            variant="secondary"
            className={cn('text-xs shrink-0', IMPORTANCE_COLORS[signal.importance])}
          >
            {IMPORTANCE_LABELS[signal.importance]}
          </Badge>
          {signal.competitor && (
            <Link
              href={`/competitors/${signal.competitor.id}`}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              {signal.competitor.short_name}
            </Link>
          )}
          {signal.country && (
            <span className="text-xs text-muted-foreground shrink-0">
              {signal.country.name}
            </span>
          )}
        </div>
        {signal.signal_date && (
          <time className="text-xs text-muted-foreground shrink-0">
            {format(new Date(signal.signal_date), 'MMM d, yyyy')}
          </time>
        )}
      </div>

      {/* Headline */}
      <h3 className={cn(
        'font-semibold leading-snug',
        variant === 'compact' ? 'text-sm' : 'text-base'
      )}>
        {signal.headline}
      </h3>

      {/* Summary — hidden in compact mode */}
      {variant === 'default' && (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {signal.summary}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex flex-wrap gap-1">
          {signal.role_relevance.map((role) => (
            <span
              key={role}
              className={cn(
                'text-xs px-1.5 py-0.5 rounded bg-secondary text-muted-foreground',
                role === highlightRole && 'bg-primary text-primary-foreground'
              )}
            >
              {ROLE_LABELS[role]}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {signal.ai_generated && (
            <span className="text-xs text-muted-foreground/60">AI</span>
          )}
          {signal.source_url && (
            <a
              href={signal.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-0.5"
            >
              {signal.source_name ?? 'Source'}
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {!signal.source_url && signal.source_name && (
            <span className="text-xs text-muted-foreground">{signal.source_name}</span>
          )}
        </div>
      </div>
    </article>
  )
}
