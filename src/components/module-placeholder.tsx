import Link from 'next/link'
import {
  Target, Lightbulb, ShoppingCart, TrendingUp,
  Package, Globe, BarChart3, Radio, BookOpen, Lock, ArrowLeft, CheckCircle2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { MODULES } from '@/lib/modules'

const ICONS: Record<string, (props: { className?: string }) => React.ReactNode> = {
  Target, Lightbulb, ShoppingCart, TrendingUp, Package, Globe, BarChart3, Radio, BookOpen,
}

interface ModulePlaceholderProps {
  moduleId: string
}

export function ModulePlaceholder({ moduleId }: ModulePlaceholderProps) {
  const module = MODULES.find((m) => m.id === moduleId)
  if (!module) return null

  const Icon = ICONS[module.icon] ?? Target

  return (
    <div className="space-y-8 max-w-xl">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Alle Module
      </Link>

      <div className="space-y-4">
        <div className={cn('rounded-xl p-3.5 w-fit', module.iconBg)}>
          <Icon className={cn('w-7 h-7', module.iconColor)} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <h1 className="font-serif text-3xl font-bold tracking-wide text-foreground">{module.name}</h1>
            <span className="text-xs font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded-full flex items-center gap-1">
              <Lock className="w-3 h-3" />
              {module.eta ? `Demnächst ${module.eta}` : 'Demnächst'}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{module.description}</p>
        </div>
      </div>

      {module.plannedContent && module.plannedContent.length > 0 && (
        <div className="border rounded-xl p-5 space-y-3 bg-white">
          <h2 className="text-sm font-medium">Geplante Inhalte</h2>
          <ul className="space-y-2">
            {module.plannedContent.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-muted-foreground/50 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
