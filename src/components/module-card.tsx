'use client'

import Link from 'next/link'
import {
  Target, Lightbulb, ShoppingCart, TrendingUp,
  Package, Globe, BarChart3, Radio, BookOpen, Lock, ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { IntelligenceModule } from '@/lib/modules'

const ICONS: Record<string, (props: { className?: string }) => React.ReactNode> = {
  Target, Lightbulb, ShoppingCart, TrendingUp, Package, Globe, BarChart3, Radio, BookOpen,
}

interface ModuleCardProps {
  module: IntelligenceModule
}

export function ModuleCard({ module }: ModuleCardProps) {
  const Icon = ICONS[module.icon] ?? Target
  const isActive = module.status === 'active'

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
        {isActive ? (
          <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-900/30">
            Aktiv
          </span>
        ) : (
          <span className="text-xs font-medium bg-muted/60 text-muted-foreground/80 px-2.5 py-0.5 rounded-full border border-border/30 flex items-center gap-1">
            <Lock className="w-3 h-3" />
            {module.eta ? `Demnächst ${module.eta}` : 'Demnächst'}
          </span>
        )}
      </div>

      <div className="space-y-2 flex-1">
        <h3 className="font-serif font-bold text-[15px] text-foreground tracking-wide leading-snug">
          {module.name}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {module.description}
        </p>
      </div>

      {isActive && (
        <div className="flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:text-primary/80 transition-colors mt-auto">
          Öffnen <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
