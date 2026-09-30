-- 018: Regulatorik-Radar -- Verlauf geaenderter Faelle (30.09.2026)
--
-- Daniel, 30.09.2026: Die Liste muss chronologisch sein, neueste Sachen vorne,
-- und Aenderungen muessen darunter fallen -- "da muss man als User sehen, dass
-- es eine Aenderung gab". Anlass war Glycerin (E 422): Das BfR wendet den
-- EFSA-Richtwert seit 08.09.2026 auch auf feine Backwaren an; der Fall wurde
-- auf die neue Quelle gehoben, der alte Stand waere dabei verloren gegangen.
--
-- Ein Eintrag je Stoff bleibt (Spec): Der Fall waechst mit, seine frueheren
-- Staende landen hier. Ein Trigger schreibt den alten Stand, sobald sich bei
-- einem veroeffentlichten oder ausgeraeumten Fall Kurzzeile, Stufe,
-- Geltungsbereich, Quellen-URL oder Quellendatum aendern -- egal ob ueber das
-- Formular oder per SQL. Reine Korrekturen am Sachverhalt, an Kategorien oder
-- an der Behoerde (Migration 017) erzeugen keinen Eintrag.
--
-- Idempotent: laeuft auch zweimal ohne Schaden.

create table if not exists public.substance_watch_history (
  id           uuid primary key default gen_random_uuid(),
  signal_id    uuid not null references public.substance_watch(id) on delete cascade,
  changed_at   timestamptz not null default now(),
  stage        text,
  scope        text,
  authority    text,
  action       text,
  teaser       text,
  situation    text,
  source_name  text,
  source_url   text,
  source_date  date
);

create index if not exists substance_watch_history_signal_idx
  on public.substance_watch_history(signal_id, changed_at desc);

alter table public.substance_watch_history enable row level security;

-- Lesen darf, wer den Fall lesen darf (Policy aus 013).
drop policy if exists "substance_watch_history_read" on public.substance_watch_history;
create policy "substance_watch_history_read" on public.substance_watch_history
  for select to authenticated
  using (exists (
    select 1 from public.substance_watch s
    where s.id = signal_id
      and (s.status in ('published', 'ausgeraeumt') or (select public.is_admin()))
  ));

drop policy if exists "substance_watch_history_write_admin" on public.substance_watch_history;
create policy "substance_watch_history_write_admin" on public.substance_watch_history
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create or replace function public.substance_watch_verlauf()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.status in ('published', 'ausgeraeumt')
     and (new.teaser, new.stage, new.scope, new.source_url, new.source_date)
         is distinct from (old.teaser, old.stage, old.scope, old.source_url, old.source_date) then
    insert into public.substance_watch_history
      (signal_id, stage, scope, authority, action, teaser, situation, source_name, source_url, source_date)
    values
      (old.id, old.stage, old.scope, old.authority, old.action, old.teaser, old.situation,
       old.source_name, old.source_url, old.source_date);
  end if;
  return new;
end;
$$;

drop trigger if exists substance_watch_verlauf on public.substance_watch;
create trigger substance_watch_verlauf
  after update on public.substance_watch
  for each row execute function public.substance_watch_verlauf();

-- Nachtrag Glycerin: Wurde der Fall schon vor dieser Migration auf das BfR
-- gehoben, fehlt sein EFSA-Stand im Verlauf. Werte aus
-- docs/unter-beobachtung-saat.json (Stand der Veroeffentlichung am 14.09.).
-- Greift nur einmal und nur, wenn der Fall schon auf dem BfR steht.
insert into public.substance_watch_history
  (signal_id, changed_at, stage, scope, authority, action, teaser, situation, source_name, source_url, source_date)
select s.id, '2026-09-30 12:00:00+02', 'bewertung', 'EU', 'efsa', E'beobachten',
       E'EFSA leitet akute Referenzdosis f\u00FCr Glycerin ab, Backwaren nicht adressiert',
       E'Die EFSA leitete erstmals eine akute Referenzdosis von 125 mg je kg K\u00F6rpergewicht und Verzehrereignis ab. Der Anlass lag au\u00DFerhalb der Backwaren: Das Mandat der Kommission war auf Slush-Eis-Getr\u00E4nke und entalkoholisierten Wein beschr\u00E4nkt, nachdem deutsche Landesuntersuchungs\u00E4mter Gehalte bis 142 g/l gemessen hatten. Die EFSA empfiehlt H\u00F6chstmengen ausdr\u00FCcklich f\u00FCr Getr\u00E4nke; eine an Backwarenhersteller gerichtete Warnung existiert nicht. F\u00FCr Backwaren bleibt E 422 als Gruppe-I-Zusatzstoff quantum satis zul\u00E4ssig \u2014 obwohl feine Backwaren laut EFSA-Re-Evaluierung von 2017 mit 14 bis 52 Prozent den gr\u00F6\u00DFten Einzelbeitrag zur Glycerin-Aufnahme liefern. Genau darin liegt das Risiko: Eine erstmals gesetzte numerische Grenze im Getr\u00E4nkebereich stellt die Freistellung in der Kategorie mit dem h\u00F6chsten Expositionsanteil zur Diskussion.',
       E'EFSA Journal 24(5):e10057', 'https://www.efsa.europa.eu/en/efsajournal/pub/10057', '2026-05-05'
from public.substance_watch s
where s.e_number = 'E 422'
  and s.source_name ilike 'bfr%'
  and not exists (select 1 from public.substance_watch_history h where h.signal_id = s.id);
