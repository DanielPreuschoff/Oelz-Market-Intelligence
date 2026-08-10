import { createClient } from '@/lib/supabase/server'
import { SignalForm } from '@/components/admin/signal-form'
import type { Competitor, Country } from '@/types/database'

export default async function NewSignalPage() {
  const supabase = await createClient()

  const [{ data: competitors }, { data: countries }] = await Promise.all([
    supabase.from('competitors').select('id, name, short_name').eq('active', true).order('short_name'),
    supabase.from('countries').select('id, name').eq('active', true).order('name'),
  ])

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Neues Signal</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Paste raw text to extract with AI, or fill in the fields manually.
        </p>
      </div>
      <SignalForm
        competitors={(competitors ?? []) as Competitor[]}
        countries={(countries ?? []) as Country[]}
      />
    </div>
  )
}
