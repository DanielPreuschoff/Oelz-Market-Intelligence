import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { KundenradarImportForm } from '@/components/admin/kundenradar-import-form'

// Ein Bericht wird in einem Modellaufruf aufbereitet; das dauert bei langen
// Perplexity-Berichten bis zu einer Minute. Die Server-Actions dieser Seite
// laufen in ihrer Funktion und erben diese Grenze.
export const maxDuration = 300

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
          Die Berichte der Läufe je Land (Prompt: <code className="text-xs">prompts/kundenradar.md</code>)
          einfach als .md hochladen. Die App zerlegt sie in Signale und Kurzprofile, lässt
          Unterhalb-der-Flughöhe und schon Erfasstes weg, prüft jede Quelle und legt Entwürfe an.
          Danach genügt ein Klick auf „Alle vollständigen veröffentlichen“.
        </p>
      </div>

      <KundenradarImportForm />
    </div>
  )
}
