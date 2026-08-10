'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import {
  Target, Lightbulb, ShoppingCart, TrendingUp,
  Package, Globe, BarChart3, Radio, BookOpen, FlaskConical, Lock, ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { IntelligenceModule } from '@/lib/modules'
import type { ModuleStats } from '@/lib/module-stats'

const ICONS: Record<string, (props: { className?: string }) => React.ReactNode> = {
  Target, Lightbulb, ShoppingCart, TrendingUp, Package, Globe, BarChart3, Radio, BookOpen, FlaskConical,
}

interface ModuleCardProps {
  module: IntelligenceModule
  /** Bestand und Aktualität. Fehlt bei Modulen, die noch keine Daten führen. */
  stats?: ModuleStats
}

export function ModuleCard({ module, stats }: ModuleCardProps) {
  const Icon = ICONS[module.icon] ?? Target
  const isActive = module.status === 'active'
  const hasStats = isActive && !!stats && stats.total > 0

  const card = (
    <div
      className={cn(
        'group relative flex flex-col gap-4 rounded-xl border p-5 transition-all duration-300',
        isActive
          ? 'bg-card border-border/80 shadow-[0_1px_2px_0_rgba(34,28,26,0.02)] hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5 cursor-pointer'
          : 'bg-secondary/20 border-dashed border-border/80 opacity-60 hover:opacity-75 cursor-default'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className={cn(
          'rounded-lg p-2.5 w-fit transition-colors', 
          isActive 
            ? 'bg-primary/5 text-primary group-hover:bg-primary/10' 
            : 'bg-muted/45 text-muted-foreground/60'
        )}>
          <Icon className="w-5 h-5" />
        </div>
        {!isActive && (
          <span className="text-xs font-medium bg-muted/60 text-muted-foreground/80 px-2.5 py-0.5 rounded-full border border-border/30 flex items-center gap-1">
            <Lock className="w-3 h-3" />
            {module.eta ? `Ab ${module.eta}` : 'Bald'}
          </span>
        )}
        {/* Der Neu-Zähler ist der einzige Grund, warum jemand diese Übersicht
            zweimal öffnet — deshalb steht er in Ölz-Orange und oben rechts,
            wo bei den kommenden Modulen das Schloss sitzt. */}
        {hasStats && stats.newCount > 0 && (
          <span className="text-xs font-bold bg-oelz-orange text-oelz-on-orange px-2.5 py-0.5 rounded-full shrink-0">
            {stats.newCount} neu
          </span>
        )}
      </div>

      <div className="space-y-2 flex-1">
        <h3 className="font-display font-bold text-[15px] text-foreground tracking-wide leading-snug">
          {module.name}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {module.description}
        </p>
      </div>

      {isActive && (
        <div className="mt-auto space-y-2">
          {hasStats && (
            <p className="text-[11px] text-muted-foreground pt-1 border-t border-border/60">
              {stats.total} {stats.total === 1 ? stats.unit.one : stats.unit.many}
              {stats.stand && (
                <>
                  <span className="mx-1.5">·</span>
                  Stand {format(new Date(stats.stand), 'd. MMM yyyy', { locale: de })}
                </>
              )}
            </p>
          )}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:text-primary/80 transition-colors">
            Öffnen <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      )}
    </div>
  )

  return (
    <Link 
      href={isActive ? module.href : '#'} 
      className={cn("block", !isActive && "pointer-events-none")}
      onClick={(e) => !isActive && e.preventDefault()}
    >
      {card}
    </Link>
  )
}
