-- =============================================================
-- Research Agent — Migration 002
-- Adds research_runs and signal_candidates tables
-- =============================================================

-- Research run tracking
create table research_runs (
  id                  uuid primary key default uuid_generate_v4(),
  triggered_by        uuid references auth.users(id) on delete set null,
  started_at          timestamptz not null default now(),
  completed_at        timestamptz,
  status              text not null default 'running'
                        check (status in ('running', 'completed', 'failed')),
  date_range_days     integer not null default 14,
  competitors_searched uuid[] default '{}',
  candidates_found    integer default 0,
  error_message       text,
  created_at          timestamptz not null default now()
);

-- Signal candidates — AI-found, awaiting human review
create table signal_candidates (
  id                  uuid primary key default uuid_generate_v4(),
  research_run_id     uuid not null references research_runs(id) on delete cascade,

  -- Pre-filled signal fields
  headline            text,
  summary             text,
  category            signal_category,
  competitor_id       uuid references competitors(id) on delete set null,
  country_id          text references countries(id) on delete set null,
  importance          importance_level default '1',
  source_url          text,
  source_name         text,
  signal_date         date,

  -- Review workflow
  status              text not null default 'pending'
                        check (status in ('pending', 'approved', 'rejected')),
  reviewed_by         uuid references auth.users(id) on delete set null,
  reviewed_at         timestamptz,
  promoted_signal_id  uuid references signals(id) on delete set null,

  -- Debug
  ai_raw_response     text,

  created_at          timestamptz not null default now()
);

-- Indexes
create index idx_signal_candidates_run_id   on signal_candidates(research_run_id);
create index idx_signal_candidates_status   on signal_candidates(status);
create index idx_signal_candidates_source   on signal_candidates(source_url);
create index idx_research_runs_status       on research_runs(status);

-- RLS: admin only
alter table research_runs      enable row level security;
alter table signal_candidates  enable row level security;

create policy "research_runs_admin" on research_runs
  for all to authenticated
  using   (exists (select 1 from user_profiles where id = auth.uid() and is_admin = true))
  with check (exists (select 1 from user_profiles where id = auth.uid() and is_admin = true));

create policy "signal_candidates_admin" on signal_candidates
  for all to authenticated
  using   (exists (select 1 from user_profiles where id = auth.uid() and is_admin = true))
  with check (exists (select 1 from user_profiles where id = auth.uid() and is_admin = true));
