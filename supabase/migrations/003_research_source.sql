-- =============================================================
-- Add research_source column to signal_candidates
-- Tracks whether a candidate was found via Perplexity, Google News RSS, or both
-- =============================================================

alter table signal_candidates
  add column if not exists research_source text check (research_source in ('perplexity', 'google_news_rss', 'mixed'));
