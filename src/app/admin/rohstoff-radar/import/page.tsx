import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { IngredientImportForm } from '@/components/admin/ingredient-import-form'

export default async function IngredientImportPage() {
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
          href="/admin/rohstoff-radar"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Rohstoff-Radar
        </Link>
        <h1 className="text-2xl font-semibold">Rohstoffsignale importieren</h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
          Die Deep-Research-Berichte (Funktionsläufe quartalsweise, Exploration monatlich)
          werden ausserhalb der App aufbereitet und hier als JSON eingespielt. Prompts:{' '}
          <code className="text-xs">prompts/rohstoff-funktion.md</code> und{' '}
          <code className="text-xs">prompts/rohstoff-exploration.md</code>.
        </p>
      </div>

      <IngredientImportForm />
    </div>
  )
}
