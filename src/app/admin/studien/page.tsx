import Link from 'next/link'
import { format } from 'date-fns'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { buttonVariants } from '@/components/ui/button-variants'
import { DeleteButton } from '@/components/admin/delete-button'
import { cn } from '@/lib/utils'
import { deleteStudy } from './actions'
import type { Study } from '@/types/studies'

export default async function AdminStudienPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('user_profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) redirect('/')

  const { data: studies } = await supabase
    .from('studies')
    .select('*')

  const sortedStudies = (studies as Study[] ?? []).sort((a, b) => {
    const dateA = a.date_published || a.created_at
    const dateB = b.date_published || b.created_at
    return new Date(dateB).getTime() - new Date(dateA).getTime()
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Ad-hoc Studien</h1>
        <Link href="/admin/studien/new" className={cn(buttonVariants({ size: 'sm' }))}>
          Studie hochladen
        </Link>
      </div>

      {!sortedStudies.length ? (
        <div className="py-16 text-center text-muted-foreground text-sm">Noch keine Studien angelegt.</div>
      ) : (
        <div className="divide-y border rounded-xl bg-card overflow-hidden">
          {sortedStudies.map((study) => (
            <div key={study.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-secondary/30 transition-colors">
              <div className="space-y-0.5 flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{study.title}</p>
                <p className="text-xs text-muted-foreground">
                  {study.status === 'published'
                    ? <span className="text-emerald-600 font-medium">Veröffentlicht</span>
                    : <span className="text-amber-600 font-medium">Entwurf</span>
                  }
                  {study.date_published && ` · ${format(new Date(study.date_published), 'dd.MM.yyyy')}`}
                  {study.topic_tags.length > 0 && ` · ${study.topic_tags.join(', ')}`}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Link href={`/admin/studien/${study.id}/edit`} className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
                  Bearbeiten
                </Link>
                <DeleteButton label="Studie löschen" onDelete={deleteStudy.bind(null, study.id)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
