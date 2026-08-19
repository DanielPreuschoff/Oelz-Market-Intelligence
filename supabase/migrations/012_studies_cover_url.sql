-- Titelbild einer Studie: die erste PDF-Seite als PNG, erzeugt beim Hochladen
-- im Admin (Browser, pdf.js) und im Bucket `studies` neben dem PDF abgelegt.
-- Nullbar: Bestandsstudien bekommen ihr Titelbild, sobald sie einmal im Admin
-- gespeichert werden. Kein Storage-Bucket, keine Policy-Aenderung noetig —
-- das PNG liegt im selben Bucket wie das PDF und erbt dessen Regeln.
alter table public.studies
  add column if not exists cover_url text;

comment on column public.studies.cover_url is
  'Titelbild (erste PDF-Seite als PNG) im Bucket studies; null, solange keins erzeugt wurde.';
