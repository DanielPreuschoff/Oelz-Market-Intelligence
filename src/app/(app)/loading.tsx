/**
 * Ladezustand für alle Lesestrecken.
 *
 * Ohne ihn bleibt beim Seitenwechsel die alte Seite stehen, bis die neue
 * fertig ist — die App wirkt dann hängend, auch wenn sie nur wartet. Ein
 * Gerüst kostet nichts und macht sichtbar, dass etwas passiert.
 *
 * Bewusst grob: Titel, Zeile, Kachelraster. Es soll den Umriss der meisten
 * Seiten treffen, nicht eine bestimmte Seite nachbauen — ein zu genaues
 * Gerüst, das dann doch nicht passt, irritiert mehr als ein neutrales.
 *
 * Als `loading.tsx` der Gruppe gilt es für alle Routen darunter, die kein
 * eigenes mitbringen.
 */
export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse" aria-busy="true" aria-label="Inhalte werden geladen">
      <div className="space-y-2">
        <div className="h-8 w-64 rounded-lg bg-secondary" />
        <div className="h-4 w-96 max-w-full rounded bg-secondary/70" />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {[64, 88, 72, 56, 80].map((w, i) => (
          <div key={i} className="h-6 rounded-full bg-secondary/70" style={{ width: w }} />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border/70 bg-card p-5 space-y-3">
            <div className="flex gap-1.5">
              <div className="h-4 w-16 rounded bg-secondary" />
              <div className="h-4 w-12 rounded bg-secondary/70" />
            </div>
            <div className="h-5 w-full rounded bg-secondary" />
            <div className="h-5 w-2/3 rounded bg-secondary" />
            <div className="pt-2 space-y-2">
              <div className="h-3 w-full rounded bg-secondary/60" />
              <div className="h-3 w-5/6 rounded bg-secondary/60" />
              <div className="h-3 w-4/6 rounded bg-secondary/60" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
