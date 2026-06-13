import { createClient } from '@/lib/supabase/server'
import { StudyCard } from '@/components/study-card'
import { TOPIC_TAGS, type Study } from '@/types/studies'

interface PageProps {
  searchParams: Promise<{ tag?: string; q?: string }>
}

export default async function StudienPage({ searchParams }: PageProps) {
  const { tag: tagFilter, q: search } = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('studies')
    .select('*')
    .eq('status', 'published')
    .order('date_published', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })

  if (tagFilter) query = query.contains('topic_tags', [tagFilter])

  const { data: studies } = await query

  // Client-side text search (title + summary)
  const filtered = (studies ?? []).filter((s: Study) => {
    if (!search) return true
    const q = search.toLowerCase()
    return s.title.toLowerCase().includes(q) || (s.summary ?? '').toLowerCase().includes(q)
  })

  function toggleTag(tag: string) {
    const params = new URLSearchParams()
    if (tagFilter !== tag) params.set('tag', tag)
    if (search) params.set('q', search)
    const str = params.toString()
    return `/studien${str ? `?${str}` : ''}`
  }

  function searchUrl(q: string) {
    const params = new URLSearchParams()
    if (tagFilter) params.set('tag', tagFilter)
    if (q) params.set('q', q)
    const str = params.toString()
    return `/studien${str ? `?${str}` : ''}`
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="font-serif text-3xl font-bold tracking-wide text-foreground">Ad-hoc Studien</h1>
        <p className="text-sm text-muted-foreground">
          Gezielte Markt- und Trendstudien zu aktuellen Fragestellungen für Innovation, Produktentwicklung und Strategie.
        </p>
      </div>

      {/* Filter */}
      <div className="space-y-3">
        <form action="/studien" method="get" className="flex items-center gap-2">
          {tagFilter && <input type="hidden" name="tag" value={tagFilter} />}
          <input
            name="q"
            defaultValue={search ?? ''}
            placeholder="Studien durchsuchen…"
            className="h-8 w-full max-w-xs rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
          />
        </form>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-muted-foreground font-medium w-10">Tags</span>
          {TOPIC_TAGS.map((tag) => (
            <a
              key={tag}
              href={toggleTag(tag)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                tagFilter === tag
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'border-border hover:bg-secondary'
              }`}
            >
              {tag}
            </a>
          ))}
        </div>

        {(tagFilter || search) && (
          <a href="/studien" className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground">
            Filter zurücksetzen
          </a>
        )}
      </div>

      {/* Studien */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground text-sm">Keine Studien gefunden.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((study: Study) => (
            <StudyCard key={study.id} study={study} />
          ))}
        </div>
      )}
    </div>
  )
}
