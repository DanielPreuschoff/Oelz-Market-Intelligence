import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { RegulatorikImportForm } from '@/components/admin/regulatorik-import-form'

export default async function RegulatorikImportPage() {
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
          href="/admin/unter-beobachtung"
          className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Regulatorik-Radar
        </Link>
        <h1 className="text-2xl font-semibold">Regulatorik-Einträge importieren</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Der Behörden-Lauf (monatlich, erste Befüllung ab 01.01.2026) wird ausserhalb der App
          aufbereitet und hier als JSON eingespielt. Prompt und JSON-Form:{' '}
          <code className="text-xs">prompts/regulatorik-behoerden.md</code>. Jeder Treffer landet
          als Entwurf — veröffentlicht wird erst nach Prüfung gegen die amtliche Primärquelle.
        </p>
      </div>

      <RegulatorikImportForm />
    </div>
  )
}
