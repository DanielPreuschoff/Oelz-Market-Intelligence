'use client'

import Image from 'next/image'
import { format } from 'date-fns'
import { ExternalLink, ArrowRight } from 'lucide-react'
import {
  Dialog, DialogTrigger, DialogContent, DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { RADAR_TYPE_COLORS, PRIORITY_OPTIONS } from '@/types/innovation'
import type { InnovationImpulse, RadarType } from '@/types/innovation'

// ── Shared sub-components ──────────────────────────────────────

function RadarTypeBadge({ type }: { type: RadarType }) {
  const c = RADAR_TYPE_COLORS[type]
  return (
    <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full border', c.bg, c.text, c.border)}>
      {type}
    </span>
  )
}

function ScoreDots({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            'w-1.5 h-1.5 rounded-full',
            i < value ? 'bg-foreground' : 'bg-muted-foreground/20'
          )}
        />
      ))}
    </span>
  )
}

function PriorityBadge({ priority }: { priority: string }) {
  const colors: Record<string, string> = {
    Beobachten: 'bg-slate-100 text-slate-700',
    Prüfen:     'bg-amber-100 text-amber-700',
    Pilotieren: 'bg-emerald-100 text-emerald-700',
  }
  return (
    <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', colors[priority] ?? 'bg-muted text-muted-foreground')}>
      {priority}
    </span>
  )
}

// ── Modal content ─────────────────────────────────────────────

function ImpulseModal({ impulse }: { impulse: InnovationImpulse }) {
  return (
    <div className="flex flex-col gap-5 overflow-y-auto max-h-[80vh] pr-1">
      {/* Image */}
      {impulse.image_url && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden -mx-0">
          <Image src={impulse.image_url} alt={impulse.title} fill className="object-cover" />
        </div>
      )}

      {/* Header */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <RadarTypeBadge type={impulse.radar_type} />
          {impulse.source_date && (
            <span className="text-xs text-muted-foreground">
              {format(new Date(impulse.source_date), 'dd.MM.yyyy')}
            </span>
          )}
        </div>
        <DialogTitle className="font-display text-xl font-bold leading-tight">
          {impulse.title}
        </DialogTitle>
        {impulse.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {impulse.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Meta row */}
      {(impulse.category || impulse.market || impulse.channel || impulse.main_claim) && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs border rounded-lg p-3 bg-secondary/30">
          {impulse.category && <div><span className="text-muted-foreground">Kategorie</span><br /><span className="font-medium">{impulse.category}</span></div>}
          {impulse.market && <div><span className="text-muted-foreground">Markt</span><br /><span className="font-medium">{impulse.market}</span></div>}
          {impulse.channel && <div><span className="text-muted-foreground">Kanal</span><br /><span className="font-medium">{impulse.channel}</span></div>}
          {impulse.main_claim && <div><span className="text-muted-foreground">Claim</span><br /><span className="font-medium">{impulse.main_claim}</span></div>}
        </div>
      )}

      {/* Product example */}
      {impulse.product_example && (
        <Section label="Produktbeleg / Marktbeispiel">{impulse.product_example}</Section>
      )}

      {/* What is new */}
      {impulse.what_is_new && (
        <Section label="Was ist neu oder bemerkenswert?">{impulse.what_is_new}</Section>
      )}

      {/* Market signal */}
      {impulse.market_signal && (
        <Section label="Marktsignal">{impulse.market_signal}</Section>
      )}

      {/* Trend resonance */}
      {impulse.trend_resonance.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Trend-Resonanz</p>
          <div className="space-y-1.5 bg-amber-50 border border-amber-100 rounded-lg p-3">
            {impulse.trend_resonance.map((tr, i) => (
              <div key={i} className="text-xs leading-relaxed">
                <span className="font-semibold text-amber-900">{tr.title}:</span>{' '}
                <span className="text-amber-800">{tr.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ölz relevance */}
      {impulse.oelz_development_relevance && (
        <Section label="Relevanz für Ölz">{impulse.oelz_development_relevance}</Section>
      )}

      {/* Transfer */}
      {impulse.possible_oelz_transfer && (
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Möglicher Ölz-Transfer</p>
          <div className="border-l-2 border-foreground/20 pl-3 text-sm italic text-foreground/80">
            {impulse.possible_oelz_transfer}
          </div>
        </div>
      )}

      {/* Source */}
      {impulse.source_url && (
        <a
          href={impulse.source_url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          Quelle öffnen
        </a>
      )}
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className="text-sm leading-relaxed">{children as string}</p>
    </div>
  )
}

function RatingRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-muted-foreground">{label}</span>
      <ScoreDots value={value} />
    </div>
  )
}

// ── Card ──────────────────────────────────────────────────────

interface ImpulseCardProps {
  impulse: InnovationImpulse
}

export function ImpulseCard({ impulse }: ImpulseCardProps) {
  return (
    <Dialog>
      <DialogTrigger className="block text-left w-full group">
        <div className="border rounded-xl overflow-hidden bg-card hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
          {/* Image or color fallback */}
          {impulse.image_url ? (
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <Image
                src={impulse.image_url}
                alt={impulse.title}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          ) : (
            <div className={cn(
              'w-full aspect-[4/3] flex items-center justify-center',
              RADAR_TYPE_COLORS[impulse.radar_type].bg
            )}>
              <span className={cn('text-3xl font-display font-bold opacity-20', RADAR_TYPE_COLORS[impulse.radar_type].text)}>
                {impulse.radar_type.slice(0, 1)}
              </span>
            </div>
          )}

          {/* Content */}
          <div className="p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <RadarTypeBadge type={impulse.radar_type} />
              {impulse.source_date && (
                <span className="text-xs text-muted-foreground shrink-0">
                  {format(new Date(impulse.source_date), 'dd.MM.yy')}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <h3 className="font-display font-bold text-base leading-snug group-hover:text-primary/80 transition-colors">
                {impulse.title}
              </h3>
              {impulse.short_signal && (
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {impulse.short_signal}
                </p>
              )}
            </div>

            {impulse.oelz_relevance_short && (
              <p className="text-xs text-foreground/70 leading-relaxed border-l-2 border-amber-300 pl-2 line-clamp-2">
                {impulse.oelz_relevance_short}
              </p>
            )}

            {impulse.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {impulse.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors pt-1">
              Detail ansehen <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-xl max-h-[90vh]"
        showCloseButton
      >
        <ImpulseModal impulse={impulse} />
      </DialogContent>
    </Dialog>
  )
}
