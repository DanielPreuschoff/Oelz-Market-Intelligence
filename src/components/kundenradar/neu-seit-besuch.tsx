'use client'

import { useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { SIGNALTYP_NAME, type Signaltyp } from '@/types/kundenradar'

export interface NeuEintrag {
  id: string
  title: string
  signal_type: Signaltyp
  contact_trigger: boolean
  source_date: string | null
  haendler: string
  slug: string
}

/**
 * „Neu seit deinem letzten Besuch" — als Client-Komponente, damit die Liste
 * stehen bleibt.
 *
 * Der Grund: Sobald die Seite mit Ungesehenem öffnet, schreibt der
 * `ModulbesuchMelder` den Lesestand und lädt das Layout neu
 * (`revalidatePath('/', 'layout')`). Die Server-Seite läse dann einen Besuch
 * von eben und zeigte eine leere Liste, während man noch hinschaut. Der
 * erste Stand wird deshalb hier eingefroren; erst die nächste Navigation zeigt
 * den neuen.
 */
export function NeuSeitBesuch({
  eintraege,
  ueberschrift,
}: {
  eintraege: NeuEintrag[]
  ueberschrift: string
}) {
  const [liste] = useState(eintraege)
  const [titel] = useState(ueberschrift)
  if (liste.length === 0) return null

  return (
    <section className="space-y-3">
      <h2 className="dachzeile">
        {titel} <span className="font-normal normal-case tracking-normal text-muted-foreground">· {liste.length}</span>
      </h2>
      <div className="karte divide-y divide-border/70 overflow-hidden">
        {liste.map((e) => (
          <Link
            key={e.id}
            href={`/kundenradar/${e.slug}#${e.id}`}
            className="group flex items-start gap-4 px-4 py-3 transition-colors hover:bg-[var(--waesche)]"
          >
            <span className="min-w-0 flex-1">
              <span className="block font-display text-[15px] font-bold leading-snug transition-colors group-hover:text-primary">
                {e.title}
              </span>
              <span className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                <span>{e.haendler}</span>
                <span>· {SIGNALTYP_NAME[e.signal_type]}</span>
                {e.contact_trigger && (
                  <span className="inline-flex items-center gap-1 font-medium text-oelz-orange-text">
                    <span className="size-1.5 rounded-full bg-oelz-orange" aria-hidden />
                    Anlass
                  </span>
                )}
              </span>
            </span>
            {e.source_date && (
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {format(new Date(e.source_date), 'd. MMM', { locale: de })}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
