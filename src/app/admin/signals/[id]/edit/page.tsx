import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SignalForm } from '@/components/admin/signal-form'
import type { Competitor, Country, Signal } from '@/types/database'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditSignalPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: signal }, { data: competitors }, { data: countries }] = await Promise.all([
    supabase.from('signals').select('*').eq('id', id).single(),
    supabase.from('competitors').select('id, name, short_name').eq('active', true).order('short_name'),
    supabase.from('countries').select('id, name').eq('active', true).order('name'),
  ])

  if (!signal) notFound()

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Edit Signal</h1>
        <p className="text-xs text-muted-foreground mt-1">ID: {id}</p>
      </div>
      <SignalForm
        competitors={(competitors ?? []) as Competitor[]}
        countries={(countries ?? []) as Country[]}
        initialValues={signal as Signal}
        signalId={id}
      />
    </div>
  )
}
