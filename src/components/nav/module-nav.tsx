'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Target, Lightbulb, ShoppingCart, TrendingUp,
  Package, Globe, BarChart3, Radio, Lock,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { MODULES } from '@/lib/modules'
import type { IntelligenceModule } from '@/lib/modules'

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Target, Lightbulb, ShoppingCart, TrendingUp, Package, Globe, BarChart3, Radio,
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
    <aside className="hidden md:flex flex-col w-52 shrink-0 border-r border-zinc-200 bg-white sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
      <nav className="flex flex-col gap-0.5 p-2 pt-3">
        {MODULES.map((module) => {
          const Icon = ICONS[module.icon] ?? Target
          const active = isModuleActive(module, pathname)
          const isLocked = module.status === 'coming_soon'

          return (
            <Link
              key={module.id}
              href={module.href}
              className={cn(
                'flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors w-full',
                active
                  ? 'bg-secondary font-medium text-foreground'
                  : isLocked
                  ? 'text-muted-foreground/60 hover:text-muted-foreground hover:bg-secondary/50'
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
