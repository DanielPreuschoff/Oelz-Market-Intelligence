'use client'

import { X } from 'lucide-react'
import { EBENEN_NAME, ringFuer, type RadarEintrag, type RadarTafel } from '@/data/food-radar/types'

/**
 * Detailleiste rechts vom Radar — folgt dem Aufbau des Originals:
 * Bild, Titel, Typplakette, Sektor und Ring, Beschreibungstext, Datumsangaben.
 *
 * Zwei Ergänzungen gegenüber foodRegio:
 * - **Relevanz für Ölz** als eigener Abschnitt. Das ist der Grund, warum ein
 *   eigenes Modul überhaupt Sinn ergibt statt einer Einbettung: kein frei
 *   verfügbares Food-Trend-Radar sagt, was ein Fund für einen
 *   Feinbackwarenhersteller bedeutet.
 * - **Quellenangabe** je Eintrag, solange die Inhalte foodRegios sind.
 *
 * Bilder fehlen bewusst — foodRegio nutzt KI-generierte Illustrationen, die
 * ihnen gehören. Bis Ölz eigene hat, steht hier ein Platzhalter.
 */
export function DetailLeiste({
  eintrag,
  tafel,
  onClose,
}: {
  eintrag: RadarEintrag
  tafel: RadarTafel
  onClose: () => void
}) {
  const ring = ringFuer(tafel, eintrag.radius)

  return (
    /* `flex-1 min-h-0` statt `h-full`: Die Leiste hängt in einem Behälter, der
       nur eine Maximalhöhe hat. `height: 100%` löst sich gegen eine solche
       Elternhöhe nicht auf — der Inhalt wuchs deshalb über den Rahmen hinaus,
       statt zu scrollen. Auf schmalen Bildschirmen ist der Behälter keine
       Flexbox; dort greifen beide Angaben nicht und der Text fließt einfach,
       was dort auch richtig ist. */
    <div className="flex flex-col min-h-0 flex-1">
      <div className="relative h-32 shrink-0 bg-gradient-to-br from-oelz-orange/25 to-oelz-orange/5 flex items-center justify-center">
        <span className="font-display text-5xl font-bold text-oelz-orange/30" aria-hidden="true">
          {eintrag.titel.slice(0, 1)}
        </span>
        <span className="absolute bottom-2 right-3 text-[10px] text-muted-foreground/70">
          Bild folgt
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Detail schließen"
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-oelz-braun flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* min-h-0 ist Pflicht: In einer Spalten-Flexbox schrumpft ein Kind sonst
          nicht unter seine Inhaltshöhe, und overflow-y-auto bleibt wirkungslos —
          der Text war dadurch abgeschnitten und nicht scrollbar. */}
      <div className="p-5 space-y-4 overflow-y-auto min-h-0 flex-1">
        <h2 className="font-display text-lg font-bold leading-snug">{eintrag.titel}</h2>

        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="font-bold px-2.5 py-1 rounded-full bg-oelz-orange text-oelz-on-orange">
            {EBENEN_NAME[eintrag.ebene]}
          </span>
          <span className="text-muted-foreground">
            {eintrag.sektor} · {ring.name}
          </span>
        </div>

        <p className="text-sm leading-relaxed whitespace-pre-line">{eintrag.beschreibung}</p>

        <div className="border-l-2 border-oelz-orange pl-3 py-1">
          <p className="text-[10px] uppercase tracking-[0.14em] font-bold text-oelz-orange-text mb-1">
            Relevanz für Ölz
          </p>
          <p className="text-sm text-muted-foreground italic">
            Redaktionelle Einschätzung folgt.
          </p>
        </div>

        <div className="pt-3 border-t border-border space-y-1">
          {eintrag.daten && (
            <p className="text-[11px] text-muted-foreground">{eintrag.daten}</p>
          )}
          {eintrag.titelOriginal && eintrag.titelOriginal !== eintrag.titel && (
            <p className="text-[11px] text-muted-foreground/80">
              Original: {eintrag.titelOriginal}
            </p>
          )}
          <p className="text-[10px] text-muted-foreground/70 leading-relaxed">
            Quelle: foodRegio Innovation, {tafel.name}-Radar (öffentliches Embed, Stand
            10.08.2026). Übersetzung maschinell.
          </p>
        </div>
      </div>
    </div>
  )
}
