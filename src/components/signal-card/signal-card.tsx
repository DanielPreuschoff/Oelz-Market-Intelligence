import Link from 'next/link'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
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
import { ExternalLink, Sparkles } from 'lucide-react'

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
        'bg-card border border-border/80 rounded-xl p-5 space-y-3 transition-all duration-300 hover:shadow-md hover:border-primary/10 relative',
        signal.importance === '3' && 'border-l-4 border-l-primary pl-4 rounded-l-none',
        signal.importance !== '3' && isRoleHighlighted && 'border-l-4 border-l-accent pl-4 rounded-l-none'
      )}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 min-w-0">
          <Badge
            variant="secondary"
            className={cn('text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full shrink-0', CATEGORY_COLORS[signal.category])}
          >
            {CATEGORY_LABELS[signal.category]}
          </Badge>
          <Badge
            variant="secondary"
            className={cn('text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full shrink-0', IMPORTANCE_COLORS[signal.importance])}
          >
            {IMPORTANCE_LABELS[signal.importance]}
          </Badge>
          {signal.competitor && (
            <Link
              href={`/competitors/${signal.competitor.id}`}
              className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors shrink-0"
            >
              {signal.competitor.short_name}
            </Link>
          )}
          {signal.country && (
            <span className="text-xs text-muted-foreground/80 shrink-0 flex items-center gap-1">
              • {signal.country.name}
            </span>
          )}
        </div>
        {signal.signal_date && (
          <time className="text-xs text-muted-foreground shrink-0 font-medium">
            {format(new Date(signal.signal_date), 'd. MMM yyyy', { locale: de })}
          </time>
        )}
      </div>

      {/* Headline */}
      <h3 className={cn(
        'font-display font-bold text-foreground leading-snug tracking-wide',
        variant === 'compact' ? 'text-sm' : 'text-base sm:text-[17px]'
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
                'text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded border transition-colors',
                role === highlightRole
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-secondary/40 text-muted-foreground border-border/40'
              )}
            >
              {ROLE_LABELS[role]}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {signal.ai_generated && (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 px-1 py-0.5 rounded bg-muted/30">
              <Sparkles className="w-2.5 h-2.5" />AI
            </span>
          )}
          {signal.source_url && (
            <a
              href={signal.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-muted-foreground hover:text-primary flex items-center gap-0.5 transition-colors"
            >
              {signal.source_name ?? 'Quelle'}
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {!signal.source_url && signal.source_name && (
            <span className="text-xs text-muted-foreground font-medium">{signal.source_name}</span>
          )}
        </div>
      </div>
    </article>
  )
}
