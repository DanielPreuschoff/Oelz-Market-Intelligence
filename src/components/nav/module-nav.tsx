'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Target, Lightbulb, ShoppingCart, TrendingUp,
  Package, Globe, BarChart3, Radio, BookOpen, Lock,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { MODULES } from '@/lib/modules'
import type { IntelligenceModule } from '@/lib/modules'

const ICONS: Record<string, (props: { className?: string }) => React.ReactNode> = {
  Target, Lightbulb, ShoppingCart, TrendingUp, Package, Globe, BarChart3, Radio, BookOpen,
}

const WETTBEWERB_ROUTES = ['/editions', '/signals', '/competitors', '/countries']

function isModuleActive(module: IntelligenceModule, pathname: string): boolean {
  if (module.id === 'wettbewerb') {
    return pathname === '/' || WETTBEWERB_ROUTES.some((r) => pathname.startsWith(r))
  }
  return pathname.startsWith(module.href)
}

export function ModuleNav() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w-52 shrink-0 border-r border-border/70 bg-white/40 dark:bg-card/40 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <nav className="flex flex-col gap-0.5 p-2 pt-3">
        {MODULES.map((module) => {
          const Icon = ICONS[module.icon] ?? Target
          const active = isModuleActive(module, pathname)
          const isLocked = module.status === 'coming_soon'

          return (
            <Link
              key={module.id}
              href={isLocked ? '#' : module.href}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-all duration-200 w-full relative',
                active
                  ? 'bg-primary/5 text-primary font-semibold pl-4 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:rounded-r before:bg-primary'
                  : isLocked
                  ? 'text-muted-foreground/45 cursor-not-allowed'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate flex-1">{module.name}</span>
              {isLocked && <Lock className="w-3 h-3 shrink-0 opacity-40" />}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
