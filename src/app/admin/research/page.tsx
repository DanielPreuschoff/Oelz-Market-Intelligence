'use client'

import { useState, useEffect, useTransition } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { Play, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import type { ResearchRun } from '@/types/database'

const STATUS_CONFIG = {
  running:   { icon: Clock,       color: 'bg-amber-100 text-amber-700',  label: 'Running'   },
  completed: { icon: CheckCircle, color: 'bg-green-100 text-green-700',  label: 'Completed' },
  failed:    { icon: AlertCircle, color: 'bg-red-100 text-red-700',      label: 'Failed'    },
}

const DATE_RANGE_OPTIONS = [7, 14, 30] as const

interface CompetitorRow {
  id: string
  short_name: string
  name: string
}

export default function AdminResearchPage() {
  const [runs, setRuns] = useState<ResearchRun[]>([])
  const [competitors, setCompetitors] = useState<CompetitorRow[]>([])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [dateRangeDays, setDateRangeDays] = useState<14 | 7 | 30>(14)
  const [loading, setLoading] = useState(true)
  const [isRunning, startTransition] = useTransition()
  const [runResult, setRunResult] = useState<{ candidatesFound: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function loadData() {
    const supabase = createClient()
    const [{ data: runsData }, { data: competitorsData }] = await Promise.all([
      supabase
        .from('research_runs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20),
      supabase
        .from('competitors')
        .select('id, short_name, name')
        .eq('active', true)
        .order('short_name', { ascending: true }),
    ])
    const allCompetitors = (competitorsData as CompetitorRow[]) ?? []
    setRuns((runsData as ResearchRun[]) ?? [])
    setCompetitors(allCompetitors)
    setSelectedIds(new Set(allCompetitors.map((c) => c.id)))
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  function toggleCompetitor(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function selectAll() {
    setSelectedIds(new Set(competitors.map((c) => c.id)))
  }

  function deselectAll() {
    setSelectedIds(new Set())
  }

  function handleRunResearch() {
    setError(null)
    setRunResult(null)
    startTransition(async () => {
      try {
        const res = await fetch('/api/research/run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dateRangeDays,
            competitorIds: Array.from(selectedIds),
          }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error ?? 'Research run failed')
        setRunResult({ candidatesFound: data.candidatesFound })
        await loadData()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Research Agent</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Scan the web for competitor news and review AI-generated signal candidates.
        </p>
      </div>

      {/* Configuration card */}
      {!loading && (
        <div className="border rounded-xl bg-white p-5 space-y-5">
          {/* Date range */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Date range</p>
            <div className="flex gap-2">
              {DATE_RANGE_OPTIONS.map((days) => (
                <button
                  key={days}
                  onClick={() => setDateRangeDays(days as typeof dateRangeDays)}
                  className={cn(
                    'px-3 py-1.5 rounded-md text-sm border transition-colors cursor-pointer',
                    dateRangeDays === days
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-white text-foreground border-border hover:bg-secondary/60'
                  )}
                >
                  {days} days
                </button>
              ))}
            </div>
          </div>

          {/* Competitor selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                Competitors
                <span className="ml-1.5 text-muted-foreground font-normal">
                  ({selectedIds.size} of {competitors.length} selected)
                </span>
              </p>
              <div className="flex gap-2">
                <button
                  onClick={selectAll}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Select all
                </button>
                <span className="text-xs text-muted-foreground">·</span>
                <button
                  onClick={deselectAll}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Deselect all
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {competitors.map((c) => (
                <label
                  key={c.id}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors text-sm',
                    selectedIds.has(c.id)
                      ? 'border-foreground/30 bg-secondary/40'
                      : 'border-border bg-white text-muted-foreground hover:bg-secondary/20'
                  )}
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.has(c.id)}
                    onChange={() => toggleCompetitor(c.id)}
                    className="w-3.5 h-3.5 accent-foreground"
                  />
                  {c.short_name}
                </label>
              ))}
            </div>
          </div>

          {/* Run button */}
          <div className="flex justify-end pt-1">
            <Button
              onClick={handleRunResearch}
              disabled={isRunning || selectedIds.size === 0}
              className="gap-2"
            >
              <Play className="w-4 h-4" />
              {isRunning ? `Researching ${selectedIds.size} competitors…` : 'Start Research'}
            </Button>
          </div>
        </div>
      )}

      {/* Result banner */}
      {runResult && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          Research complete — <strong>{runResult.candidatesFound} candidates</strong> found and queued for review.
          {runResult.candidatesFound > 0 && (
            <> Open the latest run below to review them.</>
          )}
        </div>
      )}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      )}

      {/* Run history */}
      {runs.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Run history
          </h2>
          <div className="border rounded-xl bg-white overflow-hidden">
            <div className="divide-y">
              {runs.map((run) => {
                const cfg = STATUS_CONFIG[run.status as keyof typeof STATUS_CONFIG]
                const Icon = cfg?.icon ?? XCircle

                return (
                  <Link
                    key={run.id}
                    href={`/admin/research/${run.id}`}
                    className="flex items-center gap-4 px-5 py-4 hover:bg-secondary/40 transition-colors"
                  >
                    <Icon className={cn(
                      'w-4 h-4 shrink-0',
                      run.status === 'completed' ? 'text-green-600'
                        : run.status === 'failed' ? 'text-red-500'
                        : 'text-amber-500'
                    )} />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {format(new Date(run.created_at), 'MMM d, yyyy · HH:mm')}
                        </span>
                        <Badge variant="secondary" className={cn('text-xs', cfg?.color)}>
                          {cfg?.label}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {run.candidates_found} candidates · last {run.date_range_days} days
                        {run.error_message && ` · ⚠ ${run.error_message}`}
                      </p>
                    </div>

                    {run.status === 'completed' && (
                      <span className="text-xs text-muted-foreground shrink-0">
                        Review →
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {!loading && runs.length === 0 && !isRunning && (
        <div className="rounded-xl border-2 border-dashed p-10 text-center text-muted-foreground text-sm space-y-2">
          <p className="font-medium text-foreground">No research runs yet</p>
          <p>Configure your search above and click <strong>Start Research</strong>.</p>
          <p className="text-xs">The agent will search each selected competitor and extract signal candidates for your review.</p>
        </div>
      )}
    </div>
  )
}
