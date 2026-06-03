import Link from 'next/link'
import { format } from 'date-fns'
import { FileText } from 'lucide-react'
import type { Study } from '@/types/studies'

interface StudyCardProps {
  study: Study
}

export function StudyCard({ study }: StudyCardProps) {
  return (
    <Link href={`/studien/${study.id}`} className="block group">
      <div className="border rounded-xl p-5 bg-white hover:shadow-md hover:border-foreground/20 transition-all duration-200 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {study.topic_tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-100 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          {study.date_published && (
            <span className="text-xs text-muted-foreground shrink-0">
              {format(new Date(study.date_published), 'dd.MM.yyyy')}
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          <h3 className="font-serif font-bold text-lg leading-snug group-hover:text-primary/80 transition-colors">
            {study.title}
          </h3>
          {study.summary && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {study.summary}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-foreground transition-colors pt-1">
          <FileText className="w-3.5 h-3.5" />
          Studie öffnen
        </div>
      </div>
    </Link>
  )
}
