'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Target, Lightbulb, ShoppingCart, TrendingUp,
  Package, Globe, BarChart3, Radio, BookOpen, FlaskConical,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { visibleModules } from '@/lib/modules'
import type { IntelligenceModule } from '@/lib/modules'

const ICONS: Record<string, (props: { className?: string }) => React.ReactNode> = {
  Target, Lightbulb, ShoppingCart, TrendingUp, Package, Globe, BarChart3, Radio, BookOpen, FlaskConical,
}

const WETTBEWERB_ROUTES = ['/editions', '/signals', '/competitors', '/countries']

function isModuleActive(module: IntelligenceModule, pathname: string): boolean {
  if (module.id === 'wettbewerb') {
    return WETTBEWERB_ROUTES.some((r) => pathname.startsWith(r))
  }
  return pathname.startsWith(module.href)
}

export function ModuleNav({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w-52 shrink-0 border-r-2 border-oelz-orange/30 bg-white/40 dark:bg-card/40 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <nav className="flex flex-col gap-0.5 p-2 pt-5">
        {visibleModules(isAdmin)
          .filter((m) => m.status === 'active')
          .map((module) => {
            const Icon = ICONS[module.icon] ?? Target
            const active = isModuleActive(module, pathname)

            return (
              <Link
                key={module.id}
                href={module.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-display transition-all duration-200 w-full relative',
                  active
                    ? 'bg-oelz-orange text-oelz-on-orange font-semibold shadow-[0_1px_2px_0_rgba(90,58,41,0.20)]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-oelz-orange/12'
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate flex-1">{module.name}</span>
              </Link>
            )
          })}
      </nav>
    </aside>
  )
}
