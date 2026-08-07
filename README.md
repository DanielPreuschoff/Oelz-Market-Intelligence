# Ölz Intelligence Radar

Market and competitor intelligence platform for Rudolf Ölz Meisterbäcker GmbH & Co KG.

## Setup

See [scripts/setup-instructions.md](scripts/setup-instructions.md) for full setup steps.

Quick start:
```bash
cp .env.local.example .env.local
# Fill in Supabase + Anthropic API keys
npm install
npm run dev
```

## Stack

- **Frontend:** Next.js 15 (App Router), Tailwind CSS, shadcn/ui
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL + Auth + Storage)
- **AI:** OpenAI API (on-demand extraction of signals, studies, impulses)
- **Deployment:** Vercel

## Project structure

```
docs/               Planning docs — taxonomy, roles, competitors, content guidelines
prompts/            AI prompt templates
supabase/           DB migrations and seed data
scripts/            Setup instructions
src/
  app/(app)/        Reader views (editions, signals, competitors, countries, profile)
  app/admin/        Admin views (signal creation, edition builder, management)
  app/api/          API routes (AI extraction endpoint)
  components/       Shared UI components (signal card, edition builder, forms, nav)
  lib/              Supabase client, AI extraction helper
  types/            TypeScript types + UI constants
```

## Key concepts

- **Signal** — atomic unit of intelligence (one event = one card)
- **Edition** — monthly intelligence issue (curated container of signals)
- **Competitor** — tracked company with profile and signal history
- **Role** — user role for signal relevance filtering: management / sales / innovation / marketing / packaging

## Workflow

**Monthly, in bulk** — the main path for competitor signals:

```
Deep research per competitor (outside the app)
  → one report file per competitor in research/JJJJ-MM/
  → extract to JSON
  → paste at /admin/import
  → candidates
  → review one by one, bulk-reject the rest
  → edition assembly → publish → readers
```

The research prompt lives in `prompts/wettbewerber-deep-research.md`. Approving a
candidate derives its `role_relevance` from category and importance — see
`src/lib/role-relevance.ts` and `docs/role-definitions.md`.

**Ad hoc, single signal** — still available at `/admin/signals/new`:

```
Source → paste into admin → AI extraction → human review → publish
```
