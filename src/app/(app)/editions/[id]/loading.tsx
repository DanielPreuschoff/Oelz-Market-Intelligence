/**
 * Ladezustand der Editionsseite.
 *
 * Das Gerüst der Gruppe (`(app)/loading.tsx`) zeichnet ein Kachelraster — die
 * Edition ist aber eine Lesespalte aus Artikelzeilen. Ein Gerüst, das die
 * falsche Form zeigt, irritiert mehr, als es beruhigt; deshalb hier ein
 * eigenes, das den Umriss trifft: Rücksprung, Dachzeile, Titel, Filterchips,
 * dann Zeilen mit Logo links und Text rechts.
 *
 * Der eigentliche Gewinn ist nicht die Ähnlichkeit, sondern dass der Klick
 * sofort etwas tut. Kai Heuberger im Termin vom 27.08.2026, nachdem er eine
 * Edition geöffnet hatte: „warum dauert das so lange?" — gewartet hat er rund
 * eine Sekunde, gestört hat ihn, dass nichts darauf hindeutete.
 */
export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse" aria-busy="true" aria-label="Edition wird geladen">
      <div className="h-4 w-28 rounded bg-secondary/70" />

      <div className="space-y-3">
        <div className="h-3 w-56 rounded bg-secondary/70" />
        <div className="h-9 w-3/4 max-w-xl rounded-lg bg-secondary" />
        <div className="h-4 w-full max-w-2xl rounded bg-secondary/60" />
        <div className="h-3 w-40 rounded bg-secondary/60" />
      </div>

      <div className="space-y-2.5">
        {[[64, 72, 56, 80, 68], [88, 60, 76]].map((reihe, r) => (
          <div key={r} className="flex flex-wrap items-center gap-1.5">
            <div className="h-3 w-20 rounded bg-secondary/60" />
            {reihe.map((w, i) => (
              <div key={i} className="h-6 rounded-full bg-secondary/70" style={{ width: w }} />
            ))}
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-5 rounded-xl border border-border/70 bg-card p-5">
            <div className="hidden size-16 shrink-0 rounded-lg bg-secondary sm:block" />
            <div className="flex-1 space-y-2.5">
              <div className="flex gap-2">
                <div className="h-4 w-16 rounded-full bg-secondary" />
                <div className="h-4 w-24 rounded bg-secondary/70" />
              </div>
              <div className="h-5 w-4/5 rounded bg-secondary" />
              <div className="h-3 w-full rounded bg-secondary/60" />
              <div className="h-3 w-5/6 rounded bg-secondary/60" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
