/**
 * Ladezustand des Rohstoff-Radars: Kopf, Suche mit drei Filterreihen und das
 * Kartenraster. Die Reiterleiste vom 31.08.2026 ist mit dem Umzug von „Unter
 * Beobachtung" ins Regulatorik-Radar (14.09.2026) entfallen und deshalb auch
 * hier nicht mehr vorgesehen — sonst rutschte der Inhalt beim Erscheinen um
 * ihre Höhe nach oben.
 */
export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse" aria-busy="true" aria-label="Rohstoff-Radar wird geladen">
      <div className="space-y-2">
        <div className="h-8 w-56 rounded-lg bg-secondary" />
        <div className="h-4 w-full max-w-2xl rounded bg-secondary/70" />
        <div className="h-3 w-52 rounded bg-secondary/60" />
      </div>

      <div className="space-y-2.5">
        <div className="h-8 w-full max-w-xs rounded-lg bg-secondary/70" />
        {[[70, 90, 84, 66, 78], [72, 60, 88, 64], [56, 52, 68, 60]].map((reihe, r) => (
          <div key={r} className="flex flex-wrap items-center gap-1.5">
            <div className="h-3 w-20 rounded bg-secondary/60" />
            {reihe.map((w, i) => (
              <div key={i} className="h-6 rounded-full bg-secondary/70" style={{ width: w }} />
            ))}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3 rounded-xl border border-border/70 bg-card p-5">
            <div className="flex gap-1.5">
              <div className="h-4 w-20 rounded bg-secondary" />
              <div className="h-4 w-14 rounded bg-secondary/70" />
            </div>
            <div className="h-5 w-full rounded bg-secondary" />
            <div className="h-5 w-2/3 rounded bg-secondary" />
            <div className="space-y-2 pt-2">
              <div className="h-3 w-full rounded bg-secondary/60" />
              <div className="h-3 w-4/6 rounded bg-secondary/60" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
