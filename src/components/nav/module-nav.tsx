'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Target, Lightbulb, ShoppingCart, TrendingUp,
  Package, Globe, BarChart3, Radio, BookOpen, FlaskConical,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { visibleModules, isModuleActive } from '@/lib/modules'
import type { ModuleStats } from '@/lib/module-stats'
import { OelzWave } from '@/components/nav/oelz-wave'

const ICONS: Record<string, (props: { className?: string }) => React.ReactNode> = {
  Target, Lightbulb, ShoppingCart, TrendingUp, Package, Globe, BarChart3, Radio, BookOpen, FlaskConical,
}

/**
 * Modulnavigation für breite Bildschirme.
 *
 * Sie ist bewusst mehr als ein Verzeichnis: der Ungesehen-Zähler je Modul
 * macht aus der Spalte einen Statusanzeiger. Wer die App betritt, sieht ohne
 * Umweg über die Startseite, wo seit seinem letzten Besuch etwas dazugekommen
 * ist — das war der eigentliche Mangel, nicht der Platz.
 *
 * Der aktive Menüpunkt zeigt nie einen Zähler: Wer im Modul ist, sieht es
 * gerade. Der Lesestand wird im Hintergrund geschrieben (`ModulbesuchMelder`),
 * die übrigen Zähler frischen sich danach auf.
 *
 * Die Beschriftungen kommen aus `shortName`, wo der volle Modulname zu lang
 * ist. Vorher wurden sie stumm abgeschnitten („Produkt- & Innovati…").
 *
 * Ganz oben steht die Startseite, abgesetzt von der Gruppe „Module": Sie ist
 * kein Modul, aber sie ist ein Ort — und seit sie das Briefing trägt, muss man
 * von überall dorthin zurückfinden. Das Logo im Kopfbalken bleibt zusätzlich
 * verlinkt; als einziger Weg war es zu leise und zeigte keinen Aktiv-Zustand.
 */
export function ModuleNav({
  isAdmin = false,
  stats,
}: {
  isAdmin?: boolean
  stats?: Record<string, ModuleStats>
}) {
  const pathname = usePathname()
  const modules = visibleModules(isAdmin).filter((m) => m.status === 'active')
  const startseiteAktiv = pathname === '/'

  return (
    <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-border bg-secondary/25 dark:bg-card/40 sticky top-16 h-[calc(100vh-4rem)] overflow-hidden">
      <div className="px-2 pt-4 pb-3 border-b border-border/70">
        <Link
          href="/"
          aria-current={startseiteAktiv ? 'page' : undefined}
          className={cn(
            'flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-display transition-colors w-full',
            startseiteAktiv
              ? 'bg-oelz-orange text-oelz-on-orange font-semibold shadow-[0_1px_2px_0_rgba(90,58,41,0.20)]'
              : 'text-muted-foreground hover:text-foreground hover:bg-oelz-orange/12'
          )}
        >
          <Home className="w-4 h-4 shrink-0" />
          <span className="flex-1 leading-tight">Startseite</span>
        </Link>
      </div>

      <p className="px-3 pt-5 pb-2 text-[10px] uppercase tracking-[0.16em] font-bold text-oelz-orange-text">
        Module
      </p>

      <nav className="flex flex-col gap-0.5 px-2 overflow-y-auto">
        {modules.map((module) => {
          const Icon = ICONS[module.icon] ?? Target
          const active = isModuleActive(module, pathname)
          const ungesehen = active ? 0 : (stats?.[module.id]?.unseenCount ?? 0)

          return (
            <Link
              key={module.id}
              href={module.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-display transition-colors w-full',
                active
                  ? 'bg-oelz-orange text-oelz-on-orange font-semibold shadow-[0_1px_2px_0_rgba(90,58,41,0.20)]'
                  : 'text-muted-foreground hover:text-foreground hover:bg-oelz-orange/12'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1 leading-tight">{module.shortName ?? module.name}</span>
              {ungesehen > 0 && (
                <span
                  aria-label={`${ungesehen} ungesehen`}
                  className="shrink-0 text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center bg-oelz-orange text-oelz-on-orange"
                >
                  {ungesehen}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Fuß: der Wellenbogen schliesst die Spalte ab, statt sie ins Leere
          laufen zu lassen. Stark abgetönt und ohne die weisse Begleitlinie —
          die gehört auf eine volle orange Fläche, nicht auf einen Hauch. */}
      <OelzWave
        withLine={false}
        className="mt-auto h-8 w-full text-oelz-orange/15 shrink-0 rotate-180"
      />
    </aside>
  )
}
