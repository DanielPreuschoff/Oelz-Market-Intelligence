import Link from 'next/link'
import {
  Target, Lightbulb, ShoppingCart, TrendingUp,
  Package, Globe, BarChart3, Radio, Lock, ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { IntelligenceModule } from '@/lib/modules'

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Target, Lightbulb, ShoppingCart, TrendingUp, Package, Globe, BarChart3, Radio,
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
        'group relative flex flex-col gap-4 rounded-xl border p-5 transition-all',
        isActive
          ? 'bg-white hover:shadow-md hover:border-foreground/20 cursor-pointer'
          : 'bg-secondary/30 border-dashed opacity-70 hover:opacity-90 cursor-pointer'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className={cn('rounded-lg p-2.5 w-fit', module.iconBg)}>
          <Icon className={cn('w-5 h-5', module.iconColor)} />
        </div>
        {isActive ? (
          <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
            Aktiv
          </span>
        ) : (
          <span className="text-xs font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded-full flex items-center gap-1">
            <Lock className="w-3 h-3" />
            {module.eta ? `Demnächst ${module.eta}` : 'Demnächst'}
          </span>
        )}
      </div>

      <div className="space-y-1.5 flex-1">
        <h3 className="font-semibold text-sm leading-snug">{module.name}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{module.description}</p>
      </div>

      {isActive && (
        <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors mt-auto">
          Öffnen <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      )}
    </div>
  )

  return <Link href={module.href}>{card}</Link>
}
