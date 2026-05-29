import { MODULES } from '@/lib/modules'
import { ModuleCard } from '@/components/module-card'

export default function ModuleHubPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Ölz Market Intelligence</h1>
        <p className="text-sm text-muted-foreground">
          Plattform-Übersicht — wähle ein Modul, um loszulegen.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MODULES.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  )
}
