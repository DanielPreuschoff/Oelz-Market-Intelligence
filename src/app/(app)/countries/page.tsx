import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Country } from '@/types/database'
import { ChevronRight } from 'lucide-react'

export default async function CountriesPage() {
  const supabase = await createClient()

  const { data: countries } = await supabase
    .from('countries')
    .select('*')
    .eq('active', true)
    .order('name')

  const countryIds = (countries ?? []).map((c: Country) => c.id)
  const { data: signalCounts } = countryIds.length > 0
    ? await supabase
        .from('signals')
        .select('country_id')
        .in('country_id', countryIds)
        .eq('status', 'published')
    : { data: [] }

  const countMap: Record<string, number> = {}
  ;(signalCounts ?? []).forEach((row: { country_id: string }) => {
    countMap[row.country_id] = (countMap[row.country_id] ?? 0) + 1
  })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Länder</h1>

      <div className="divide-y border rounded-xl bg-card overflow-hidden">
        {(countries ?? []).map((country: Country) => (
          <Link
            key={country.id}
            href={`/countries/${country.id}`}
            className="flex items-center justify-between px-5 py-4 hover:bg-secondary/40 transition-colors group"
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-secondary px-1.5 py-0.5 rounded text-muted-foreground">
                  {country.id}
                </span>
                <p className="text-sm font-medium">{country.name}</p>
              </div>
              {country.market_context && (
                <p className="text-xs text-muted-foreground line-clamp-1 max-w-xl">
                  {country.market_context}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">
                {countMap[country.id] ?? 0} signals
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
