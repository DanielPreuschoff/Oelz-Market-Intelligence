'use client'

import { DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Motiv } from './motiv'
import { EBENEN_NAME, ringFuer, type RadarEintrag, type RadarTafel } from '@/data/food-radar/types'

/**
 * Detailansicht als Dialogfenster — dasselbe Muster wie im Rohstoff- und
 * Produkt-Radar. Zuvor war es eine fest reservierte Spalte neben der Tafel;
 * die hat dem Radar dauerhaft Breite genommen, ohne im Ruhezustand genug zu
 * bieten.
 *
 * Das Scrollen übernimmt `DialogContent` selbst (`max-h` plus `overflow-y-auto`),
 * nicht ein innerer Kasten — genau daran war die Leiste zuvor gescheitert.
 *
 * Zwei Abschnitte, die foodRegio nicht hat:
 * - **Relevanz für Ölz** — der Grund, warum ein eigenes Modul mehr ist als eine
 *   Einbettung des Originals.
 * - **Im Original genannte Quellen** — beim Datenaufbau aus dem Fließtext
 *   gelöst, wo sie vorher als nackte Domainnamen mitten im Satz standen.
 */
export function DetailDialog({
  eintrag,
  tafel,
}: {
  eintrag: RadarEintrag
  tafel: RadarTafel
}) {
  const ring = ringFuer(tafel, eintrag.radius)

  return (
    <DialogContent
      className="sm:max-w-2xl max-h-[86vh] overflow-y-auto p-0 gap-0"
      showCloseButton
    >
      {/* Gezeichnetes Motiv statt eines erzeugten Bildes — siehe motiv.tsx. */}
      <Motiv id={eintrag.id} sektor={eintrag.sektor} ebene={eintrag.ebene} />

      <div className="p-6 space-y-4">
        <DialogTitle className="font-display text-xl font-bold leading-snug pr-8">
          {eintrag.titel}
        </DialogTitle>

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

        {eintrag.quellen && eintrag.quellen.length > 0 && (
          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] font-bold text-muted-foreground mb-1">
              Im Original genannte Quellen
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {eintrag.quellen.map((q, i) => (
                <span key={q.name}>
                  {i > 0 && ' · '}
                  {q.url ? (
                    <a
                      href={q.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-foreground"
                    >
                      {q.name}
                    </a>
                  ) : (
                    q.name
                  )}
                </span>
              ))}
            </p>
          </div>
        )}

        <div className="pt-3 border-t border-border space-y-1">
          {eintrag.daten && <p className="text-[11px] text-muted-foreground">{eintrag.daten}</p>}
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
    </DialogContent>
  )
}
