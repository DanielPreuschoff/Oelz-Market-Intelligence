/**
 * Ladezustand des Regulatorik-Radars: Kopf, Stufenzeile, Kategoriefilter und
 * die Kartenliste in der schmalen Spalte — dieselben Höhen wie die fertige
 * Seite, damit beim Erscheinen nichts nachrutscht.
 */
export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse" aria-busy="true" aria-label="Regulatorik-Radar wird geladen">
      <div className="space-y-2">
        <div className="h-8 w-64 rounded-lg bg-secondary" />
        <div className="h-4 w-full max-w-2xl rounded bg-secondary/70" />
      </div>

      <div className="space-y-5">
        <div className="h-3 w-full rounded bg-secondary/50" />
        <div className="flex flex-wrap items-center gap-1.5">
          <div className="h-3 w-20 rounded bg-secondary/60" />
          {[64, 88, 76, 70, 92].map((w, i) => (
            <div key={i} className="h-6 rounded-full bg-secondary/70" style={{ width: w }} />
          ))}
        </div>

        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2.5 rounded-xl rounded-l-none border border-l-4 border-border/70 bg-card p-5 pl-4">
              <div className="h-5 w-48 rounded bg-secondary" />
              <div className="h-4 w-56 rounded bg-secondary/70" />
              <div className="space-y-2 pt-1">
                <div className="h-3 w-full rounded bg-secondary/60" />
                <div className="h-3 w-5/6 rounded bg-secondary/60" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
