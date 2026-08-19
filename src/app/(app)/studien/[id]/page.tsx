import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { Study } from '@/types/studies'
import { cn } from '@/lib/utils'

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
    // Zwei Spalten: links die Lesestrecke wie bisher (max-w-2xl), rechts das
    // Titelbild der Studie — die erste PDF-Seite, beim Hochladen erzeugt. Ohne
    // Titelbild fällt die Seite auf die eine Spalte zurück.
    <div className={cn('space-y-8', s.cover_url ? 'lg:grid lg:grid-cols-[minmax(0,42rem)_minmax(0,1fr)] lg:gap-x-12 lg:space-y-0' : 'max-w-2xl')}>
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
        <h1 className="font-display text-3xl font-bold leading-tight">{s.title}</h1>
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
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm bg-primary text-primary-foreground transition-opacity hover:opacity-90"
        >
          <ExternalLink className="w-4 h-4" />
          Studie als PDF öffnen
        </a>
      )}

      {/* Detail sections */}
      <div className="space-y-6 border-t pt-6">
        {s.research_question && (
          <div className="space-y-1.5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-oelz-orange-text">Fragestellung / Ausgangslage</h2>
            <p className="text-sm leading-relaxed">{s.research_question}</p>
          </div>
        )}
        {s.methodology && (
          <div className="space-y-1.5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-oelz-orange-text">Methodik / Vorgehen</h2>
            <p className="text-sm leading-relaxed">{s.methodology}</p>
          </div>
        )}
      </div>
      </div>

      {s.cover_url && (
        <aside className="lg:pt-9" aria-label="Titelbild der Studie">
          <a
            href={s.pdf_url ?? s.cover_url}
            target="_blank"
            rel="noreferrer"
            className="group block w-full max-w-[22rem] rounded-md bg-white p-1.5 shadow-[0_1px_2px_rgba(34,28,26,0.06),0_18px_40px_-24px_rgba(34,28,26,0.35)] ring-1 ring-border/80 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(34,28,26,0.08),0_26px_48px_-24px_rgba(34,28,26,0.45)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.cover_url} alt={`Titelseite: ${s.title}`} className="block w-full rounded-sm" />
          </a>
          <p className="mt-2 max-w-[22rem] text-center text-xs text-muted-foreground">
            Titelseite · {s.pdf_url ? 'Klick öffnet das PDF' : 'Vorschau'}
          </p>
        </aside>
      )}
    </div>
  )
}
