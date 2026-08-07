'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

const MONTHS = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
]

/**
 * Monatsauswahl als Aufklapp-Feld.
 *
 * Ersetzt `<input type="month">`: den Typ unterstützt Safari nicht und zeigt
 * stattdessen ein nacktes Textfeld, in das man das Format erraten muss.
 *
 * Wert und Rückgabe im Format `YYYY-MM`.
 */
export function MonthPicker({
  id,
  value,
  onChange,
}: {
  id?: string
  value: string
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [year, setYear] = useState(() => {
    const parsed = Number(value?.slice(0, 4))
    return Number.isFinite(parsed) && parsed > 1900 ? parsed : new Date().getFullYear()
  })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onPointerDown(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const selectedYear = Number(value?.slice(0, 4))
  const selectedMonth = Number(value?.slice(5, 7)) // 1-12, NaN wenn leer

  const label = value && Number.isFinite(selectedMonth)
    ? `${MONTHS[selectedMonth - 1]} ${selectedYear}`
    : 'Monat wählen'

  function select(monthIndex: number) {
    onChange(`${year}-${String(monthIndex + 1).padStart(2, '0')}`)
    setOpen(false)
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        id={id}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          'flex h-9 w-full max-w-xs items-center justify-between gap-2 rounded-lg border border-input bg-transparent px-3 text-sm outline-none transition-colors',
          'focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50',
          !value && 'text-muted-foreground'
        )}
      >
        {label}
        <Calendar className="h-4 w-4 shrink-0 text-muted-foreground" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Monat wählen"
          className="absolute z-50 mt-1 w-64 rounded-xl border bg-background p-3 shadow-lg ring-1 ring-foreground/5"
        >
          <div className="mb-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setYear((y) => y - 1)}
              aria-label="Vorheriges Jahr"
              className="rounded-md p-1 hover:bg-secondary"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-semibold tabular-nums">{year}</span>
            <button
              type="button"
              onClick={() => setYear((y) => y + 1)}
              aria-label="Nächstes Jahr"
              className="rounded-md p-1 hover:bg-secondary"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1">
            {MONTHS.map((month, i) => {
              const isSelected = selectedYear === year && selectedMonth === i + 1
              return (
                <button
                  key={month}
                  type="button"
                  onClick={() => select(i)}
                  aria-pressed={isSelected}
                  className={cn(
                    'rounded-md px-2 py-1.5 text-xs transition-colors',
                    isSelected
                      ? 'bg-primary text-primary-foreground font-semibold'
                      : 'hover:bg-secondary'
                  )}
                >
                  {month.slice(0, 3)}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
