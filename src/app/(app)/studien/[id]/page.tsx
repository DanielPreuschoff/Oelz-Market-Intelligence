import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { Study } from '@/types/studies'

export default async function StudyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: study } = await supabase
    .from('studies')
    .select('*')
    .eq('id', id)
    .single()

  if (!study) notFound()

  const s = study as Study

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Back */}
      <Link
        href="/studien"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Ad-hoc Studien
      </Link>

      {/* Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {s.topic_tags.map((tag) => (
            <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-100 font-medium">
              {tag}
            </span>
          ))}
          {s.date_published && (
            <span className="text-xs text-muted-foreground">
              {format(new Date(s.date_published), 'dd. MMMM yyyy')}
            </span>
          )}
        </div>
        <h1 className="font-serif text-3xl font-bold leading-tight">{s.title}</h1>
        {s.summary && (
          <p className="text-base text-muted-foreground leading-relaxed">{s.summary}</p>
        )}
      </div>

      {/* PDF Download */}
      {s.pdf_url && (
        <a
          href={s.pdf_url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#F07D00' }}
        >
          <ExternalLink className="w-4 h-4" />
          Studie als PDF öffnen
        </a>
      )}

      {/* Detail sections */}
      <div className="space-y-6 border-t pt-6">
        {s.research_question && (
          <div className="space-y-1.5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Fragestellung / Ausgangslage</h2>
            <p className="text-sm leading-relaxed">{s.research_question}</p>
          </div>
        )}
        {s.methodology && (
          <div className="space-y-1.5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Methodik / Vorgehen</h2>
            <p className="text-sm leading-relaxed">{s.methodology}</p>
          </div>
        )}
      </div>
    </div>
  )
}
