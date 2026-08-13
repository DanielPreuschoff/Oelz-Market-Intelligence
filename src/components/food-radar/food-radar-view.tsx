'use client'

import { useEffect, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { Dialog } from '@/components/ui/dialog'
import { RadarTafelSvg } from './radar-tafel'
import { DetailDialog } from './detail-dialog'
import {
  EBENEN_FARBE,
  EBENEN_NAME,
  ringFuer,
  type RadarEbene,
  type RadarTafel,
} from '@/data/food-radar/types'

const EBENEN: RadarEbene[] = ['trend', 'cluster', 'signal']

/**
 * Das Modul: Umschalter zwischen den Tafeln, Radar über die volle Breite,
 * Detail als Dialogfenster.
 *
 * Zwischenzeitlich stand rechts eine fest reservierte Detailspalte. Sie hat das
 * Springen beim Anklicken beseitigt, dem Radar dafür aber dauerhaft ein Drittel
 * der Breite genommen — der schlechtere Tausch. Der Dialog löst beides: das
 * Radar behält seine Breite, und beim Öffnen verschiebt sich nichts, weil das
 * Fenster darüber liegt.
 *
 * Auf schmalen Bildschirmen ersetzt eine nach Sektor gruppierte Liste die
 * Halbscheibe; der Klick öffnet denselben Dialog. Gedrehte Sektorbeschriftungen
 * sind unter 768 px unlesbar, und Zoom-und-Schieben ist dort keine Bedienung.
 */
export function FoodRadarView({ tafeln }: { tafeln: RadarTafel[] }) {
  const [tafelKey, setTafelKey] = useState(tafeln[0].key)
  const [auswahl, setAuswahl] = useState<string | null>(null)
  const [nurEbene, setNurEbene] = useState<RadarEbene | null>(null)

  const tafel = tafeln.find((t) => t.key === tafelKey) ?? tafeln[0]

  const gefiltert = useMemo<RadarTafel>(
    () =>
      nurEbene
        ? { ...tafel, eintraege: tafel.eintraege.filter((e) => e.ebene === nurEbene) }
        : tafel,
    [tafel, nurEbene]
  )

  const eintrag = tafel.eintraege.find((e) => e.id === auswahl) ?? null

  // Adresse auswerten, damit ein geteilter Link seinen Eintrag öffnet —
  // dasselbe Muster wie im Rohstoff-Radar.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    const t = p.get('tafel')
    if (t && tafeln.some((x) => x.key === t)) setTafelKey(t)
    const e = p.get('eintrag')
    if (e) setAuswahl(e)
  }, [tafeln])

  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('tafel', tafelKey)
    if (auswahl) url.searchParams.set('eintrag', auswahl)
    else url.searchParams.delete('eintrag')
    window.history.replaceState(null, '', url.toString())
  }, [tafelKey, auswahl])

  function wechsleTafel(key: string) {
    setTafelKey(key)
    setAuswahl(null)
    setNurEbene(null)
  }

  const zaehler = useMemo(() => {
    const z: Record<string, number> = {}
    tafel.eintraege.forEach((e) => (z[e.ebene] = (z[e.ebene] ?? 0) + 1))
    return z
  }, [tafel])

  return (
    <div className="space-y-4">
      {/* Tafelumschalter */}
      <div className="flex items-center gap-2 flex-wrap">
        {tafeln.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => wechsleTafel(t.key)}
            aria-current={t.key === tafelKey ? 'true' : undefined}
            className={cn(
              'px-3.5 py-1.5 rounded-lg text-sm font-display transition-colors',
              t.key === tafelKey
                ? 'bg-oelz-orange text-oelz-on-orange font-bold'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            )}
          >
            {t.name}
            <span className="ml-1.5 opacity-70">{t.eintraege.length}</span>
          </button>
        ))}
      </div>

      {/* Legende, zugleich Filter nach Ebene */}
      <div className="flex items-center gap-4 flex-wrap text-xs text-muted-foreground">
        {EBENEN.filter((e) => zaehler[e]).map((e) => (
          <button
            key={e}
            type="button"
            onClick={() => setNurEbene(nurEbene === e ? null : e)}
            className={cn(
              'inline-flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors',
              nurEbene === e ? 'bg-secondary text-foreground font-medium' : 'hover:bg-secondary/60'
            )}
          >
            <span
              className="w-3 h-3 rounded-full shadow-sm"
              style={{
                backgroundColor: EBENEN_FARBE[e].fill,
                opacity: EBENEN_FARBE[e].opacity,
                border: `1.5px solid ${EBENEN_FARBE[e].stroke}`,
              }}
            />
            {EBENEN_NAME[e]} <span className="opacity-70">{zaehler[e]}</span>
          </button>
        ))}
        {nurEbene && (
          <button type="button" onClick={() => setNurEbene(null)} className="underline">
            Filter aufheben
          </button>
        )}
      </div>

      {/* Breite Bildschirme: das Radar allein, über die volle Breite.
          Die Höhe ist auf das Fenster begrenzt — die Halbscheibe ist fast
          doppelt so breit wie hoch, ohne Deckel läge die Zeitachse unterhalb
          des sichtbaren Bereichs und man müsste zum Ablesen scrollen. Der
          Deckel wirkt über die Breite, damit das Seitenverhältnis stimmt und
          keine leeren Ränder entstehen. */}
      <div
        className="hidden md:block mx-auto w-full"
        style={{ maxWidth: 'calc((100vh - 15rem) * 1.786)' }}
      >
        <RadarTafelSvg tafel={gefiltert} auswahl={auswahl} onAuswahl={setAuswahl} />
      </div>

      {/* Schmale Bildschirme: Liste nach Sektor, Klick öffnet denselben Dialog */}
      <div className="md:hidden space-y-5">
        {tafel.sektoren.map((s) => {
          const im = gefiltert.eintraege.filter((e) => e.sektor === s)
          if (im.length === 0) return null
          return (
            <section key={s}>
              <h3 className="text-[11px] uppercase tracking-[0.14em] font-bold text-oelz-orange-text mb-2">
                {s} <span className="text-muted-foreground font-normal">{im.length}</span>
              </h3>
              <div className="space-y-1.5">
                {im.map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setAuswahl(e.id)}
                    className="w-full text-left border border-border rounded-lg px-3 py-2 bg-card flex items-center gap-2.5"
                  >
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{
                        backgroundColor: EBENEN_FARBE[e.ebene].fill,
                        opacity: EBENEN_FARBE[e.ebene].opacity,
                        border: `1.5px solid ${EBENEN_FARBE[e.ebene].stroke}`,
                      }}
                    />
                    <span className="text-sm flex-1 leading-tight">{e.titel}</span>
                    <span className="text-[10px] text-muted-foreground shrink-0">
                      {ringFuer(tafel, e.radius).name}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      <Dialog open={!!eintrag} onOpenChange={(offen) => !offen && setAuswahl(null)}>
        {eintrag && <DetailDialog eintrag={eintrag} tafel={tafel} />}
      </Dialog>
    </div>
  )
}
