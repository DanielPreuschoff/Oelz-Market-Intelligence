-- =============================================================
-- Ölz Intelligence Radar — Initial Schema
-- Migration: 001_initial_schema.sql
-- =============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Enable full-text search
create extension if not exists "unaccent";

-- =============================================================
-- ENUMS
-- =============================================================

create type signal_category as enum (
  'product_launch',
  'packaging_change',
  'distribution',
  'production_capacity',
  'm_and_a',
  'campaign',
  'pricing',
  'hiring_signal',
  'technology',
  'sustainability',
  'startup_signal',
  'regulatory',
  'partnership'
);

create type signal_status as enum ('draft', 'reviewed', 'published');

create type edition_status as enum ('draft', 'review', 'published');

create type importance_level as enum ('1', '2', '3');

create type user_role as enum ('management', 'sales', 'innovation', 'marketing', 'packaging');

create type watch_priority as enum ('high', 'medium', 'low');

-- =============================================================
-- COUNTRIES
-- =============================================================

create table countries (
  id        text primary key,        -- ISO 2-letter code: AT, CZ, SK, SI
  name      text not null,
  market_context text,               -- short editorial description
  active    boolean not null default true,
  created_at timestamptz not null default now()
);

-- =============================================================
-- COMPETITORS
-- =============================================================

create table competitors (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  short_name    text not null,
  country_ids   text[] not null default '{}',   -- array of country ISO codes
  categories    text[] not null default '{}',   -- product categories
  logo_url      text,
  description   text,
  watch_priority watch_priority not null default 'medium',
  active        boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- =============================================================
-- SIGNALS
-- =============================================================

create table signals (
  id              uuid primary key default uuid_generate_v4(),
  headline        text not null check (char_length(headline) <= 120),
  summary         text not null,
  competitor_id   uuid references competitors(id) on delete set null,
  country_id      text references countries(id) on delete set null,
  category        signal_category not null,
  importance      importance_level not null default '1',
  role_relevance  user_role[] not null default '{}',
  source_url      text,
  source_name     text,
  signal_date     date,                         -- when the event happened
  status          signal_status not null default 'draft',
  image_url       text,
  ai_generated    boolean not null default false,
  reviewed_by     uuid references auth.users(id) on delete set null,
  created_by      uuid references auth.users(id) on delete set null,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  -- Full-text search vector
  fts_vector      tsvector generated always as (
    to_tsvector('english', coalesce(headline, '') || ' ' || coalesce(summary, ''))
  ) stored
);

create index signals_fts_idx on signals using gin(fts_vector);
create index signals_status_idx on signals(status);
create index signals_competitor_idx on signals(competitor_id);
create index signals_country_idx on signals(country_id);
create index signals_category_idx on signals(category);
create index signals_signal_date_idx on signals(signal_date desc);

-- =============================================================
-- EDITIONS
-- =============================================================

create table editions (
  id                uuid primary key default uuid_generate_v4(),
  title             text not null,
  period_month      date not null,              -- first day of the month this covers
  editorial_summary text,
  status            edition_status not null default 'draft',
  published_at      timestamptz,
  created_by        uuid references auth.users(id) on delete set null,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index editions_status_idx on editions(status);
create index editions_period_idx on editions(period_month desc);

-- =============================================================
-- EDITION_SIGNALS (join table — ordered)
-- =============================================================

create table edition_signals (
  id            uuid primary key default uuid_generate_v4(),
  edition_id    uuid not null references editions(id) on delete cascade,
  signal_id     uuid not null references signals(id) on delete cascade,
  position      integer not null default 0,    -- display order within edition
  created_at    timestamptz not null default now(),
  unique(edition_id, signal_id)
);

create index edition_signals_edition_idx on edition_signals(edition_id);

-- =============================================================
-- USER PROFILES (extends Supabase auth.users)
-- =============================================================

create table user_profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  role        user_role,
  is_admin    boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- =============================================================
-- UPDATED_AT TRIGGERS
-- =============================================================

create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger competitors_updated_at
  before update on competitors
  for each row execute function update_updated_at();

create trigger signals_updated_at
  before update on signals
  for each row execute function update_updated_at();

create trigger editions_updated_at
  before update on editions
  for each row execute function update_updated_at();

create trigger user_profiles_updated_at
  before update on user_profiles
  for each row execute function update_updated_at();

-- Auto-create user_profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into user_profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- =============================================================
-- ROW LEVEL SECURITY
-- =============================================================

alter table countries enable row level security;
alter table competitors enable row level security;
alter table signals enable row level security;
alter table editions enable row level security;
alter table edition_signals enable row level security;
alter table user_profiles enable row level security;

-- Countries: readable by all authenticated users
create policy "countries_read" on countries
  for select to authenticated using (true);

-- Competitors: readable by all authenticated users
create policy "competitors_read" on competitors
  for select to authenticated using (true);

-- Competitors: writable by admins only
create policy "competitors_write" on competitors
  for all to authenticated
  using (exists (select 1 from user_profiles where id = auth.uid() and is_admin = true))
  with check (exists (select 1 from user_profiles where id = auth.uid() and is_admin = true));

-- Signals: readers see only published; admins see all
create policy "signals_read_published" on signals
  for select to authenticated
  using (
    status = 'published'
    or exists (select 1 from user_profiles where id = auth.uid() and is_admin = true)
  );

create policy "signals_write_admin" on signals
  for all to authenticated
  using (exists (select 1 from user_profiles where id = auth.uid() and is_admin = true))
  with check (exists (select 1 from user_profiles where id = auth.uid() and is_admin = true));

-- Editions: readers see only published; admins see all
create policy "editions_read_published" on editions
  for select to authenticated
  using (
    status = 'published'
    or exists (select 1 from user_profiles where id = auth.uid() and is_admin = true)
  );

create policy "editions_write_admin" on editions
  for all to authenticated
  using (exists (select 1 from user_profiles where id = auth.uid() and is_admin = true))
  with check (exists (select 1 from user_profiles where id = auth.uid() and is_admin = true));

-- Edition signals: same as editions
create policy "edition_signals_read" on edition_signals
  for select to authenticated using (true);

create policy "edition_signals_write_admin" on edition_signals
  for all to authenticated
  using (exists (select 1 from user_profiles where id = auth.uid() and is_admin = true))
  with check (exists (select 1 from user_profiles where id = auth.uid() and is_admin = true));

-- User profiles: users see own profile; admins see all
create policy "profiles_read_own" on user_profiles
  for select to authenticated
  using (id = auth.uid() or exists (select 1 from user_profiles where id = auth.uid() and is_admin = true));

create policy "profiles_update_own" on user_profiles
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());
