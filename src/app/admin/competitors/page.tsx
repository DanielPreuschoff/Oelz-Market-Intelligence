import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/badge'
import type { Competitor } from '@/types/database'

export default async function AdminCompetitorsPage() {
  const supabase = await createClient()

  const { data: competitors } = await supabase
    .from('competitors')
    .select('*')
    .order('short_name')

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Competitors</h1>

      <div className="border rounded-xl bg-card overflow-hidden">
        {(competitors ?? []).map((competitor: Competitor) => (
          <div
            key={competitor.id}
            className="flex items-center justify-between px-5 py-4 border-b last:border-b-0"
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{competitor.short_name}</span>
                {!competitor.active && (
                  <Badge variant="secondary" className="text-xs">Inactive</Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {competitor.country_ids.join(', ')} · {competitor.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        To add or edit competitors, update the seed SQL or run a migration.
        Full competitor management UI coming in a future update.
      </p>
    </div>
  )
}
