/**
 * Ladezustand des Regulatorik-Radars: Kopf, Stufenzeile, drei Filterreihen
 * (Typ, Behörde, Kategorie) und die Kartenliste in der schmalen Spalte — dieselben
 * Höhen wie die fertige Seite, damit beim Erscheinen nichts nachrutscht.
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
        <div className="space-y-2">
          {[[126, 82, 112], [52, 104, 72, 96], [118, 92, 112, 122, 70]].map((reihe, r) => (
            <div key={r} className="flex flex-wrap items-center gap-1.5">
              <div className="h-3 w-20 rounded bg-secondary/60" />
              {reihe.map((w, i) => (
                <div key={i} className="h-6 rounded-full bg-secondary/70" style={{ width: w }} />
              ))}
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2.5 rounded-xl rounded-l-none border border-l-4 border-border/70 bg-card p-5 pl-4">
              <div className="h-5 w-4/5 rounded bg-secondary" />
              <div className="h-3 w-40 rounded bg-secondary/60" />
              <div className="h-4 w-64 rounded bg-secondary/70" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
