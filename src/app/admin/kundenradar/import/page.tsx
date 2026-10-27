import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { KundenradarImportForm } from '@/components/admin/kundenradar-import-form'

export default async function KundenradarImportPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase
    .from('user_profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) redirect('/')

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/kundenradar"
          className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Kundenradar
        </Link>
        <h1 className="text-2xl font-semibold">Kundensignale importieren</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Die Läufe je Land (monatlich, Erstbefüllung ab 01.01.2026) werden ausserhalb der App
          aufbereitet und hier als JSON eingespielt. Prompt und JSON-Form:{' '}
          <code className="text-xs">prompts/kundenradar.md</code>. Händler kommen als Adresse
          (<code className="text-xs">kaufland-sk</code>); jedes Signal landet als Entwurf.
        </p>
      </div>

      <KundenradarImportForm />
    </div>
  )
}
