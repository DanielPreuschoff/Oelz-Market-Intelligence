# Rohstoff-Radar — Ergebnis der Grilling-Session

Stand: 2026-08-07 · Status: **umgesetzt** — Migration `007_ingredient_signals.sql` ist noch einzuspielen
Begriffe: siehe [CONTEXT.md](../CONTEXT.md) · Verortungsentscheidung: [ADR-0001](adr/0001-rohstoff-radar-eigenes-modul-eigene-tabelle.md)

---

## 1. Zweck

Ausgewählte Rohstoff-, Ingredient-, Technologie- und Verfahrenssignale mit konkreter strategischer Bedeutung für Produktentwicklung und Portfoliomanagement bei Ölz. Kein Rohstoffkatalog, kein Newsfeed: **jedes veröffentlichte Signal trägt die vollständige Relevanzkette** (strategisches Thema → funktionale Lösung → gelöstes Problem → Anwendung bei Ölz → Chance → nächster Schritt). Eine Meldung ohne diese Verbindung wird nicht veröffentlicht.

## 2. Bezeichnung

- Sidebar-Eintrag und Seitentitel: **„Rohstoff-Radar"**
- Route: `/rohstoff-radar`, Modul-`id: 'rohstoff'`
- Position: zwischen „Produkt- & Innovationsradar" und „Ad-hoc Studien"
- Unterzeile der Übersichtsseite trägt den vollen Scope: „Rohstoffe, Ingredients, Technologien und Verfahren mit strategischer Bedeutung für Produktentwicklung und Portfolio."
- Der Gegenstandstyp (`Rohstoff / Ingredient / Technologie / Verfahren`) erscheint als Badge auf jeder Karte.

## 3. Wichtigste Nutzeraufgaben

1. **Neues erfassen**: „Was kam mit der letzten Erhebung dazu?" → Neu-Badge, Zähler und „Zuletzt aktualisiert" im Kopf.
2. **Nach Funktion suchen**: „Was gibt es für Frischhaltung / Zuckerreduktion?" → Funktionsfilter als primäre Einstiegsachse.
3. **Ein Signal beurteilen**: Was ist es, was kann es, wie reif ist die Lösung, wie belastbar die Aussage, was heißt es für Ölz? → Karte scanbar in ~15 Sekunden, Detail vollständig.
4. **Weitergeben**: „Das musst du dir ansehen" → Detailseite mit kopierbarem Link.
5. **Nächsten Schritt ablesen**: Beobachten / Prüfen / Pilotieren als Abschluss jeder Karte.

## 4. Informationsarchitektur

| Route | Inhalt |
|---|---|
| `/rohstoff-radar` | Übersicht: Kopf (Titel, Erklärung, „Zuletzt aktualisiert", n neue), Filterleiste, Kartengrid, Empty-States |
| `/rohstoff-radar?signal=<id>` | Detail als Dialog über der Übersicht, teil- und reloadfest (siehe 7) |
| `/admin/rohstoff-radar` | Admin-Liste |
| `/admin/rohstoff-radar/new`, `/[id]/edit` | Formular mit KI-Extraktion |
| `/api/extract-ingredient-signal` | Extraktions-Endpoint (Admin-only, Bestandsmuster) |

Sidebar über den `MODULES`-Eintrag (kein Sonderfall im Active-Matching nötig — eine Route, `startsWith` reicht). Kein Homepage-Briefing-Slot im MVP (Erweiterung). Admin-Dropdown erhält „Rohstoff-Signal hinzufügen" und einen Manage-Link.

## 5. Fachliches Datenmodell

Entität **Rohstoffsignal** (Ereignis; ein Ereignis = eine Karte). Tabellenname-Vorschlag: `ingredient_signals` (englische Tabellennamen sind Bestandskonvention).

**Identität & Workflow** (Bestandskonvention wie `studies`/`innovation_impulses`):
`id`, `status` (`draft`/`published`), `ai_generated`, `created_by`, `created_at`, `updated_at`, `published_at`

**Zone Befund** (was gemeldet wurde):

| Feld | Typ | Inhalt |
|---|---|---|
| `title` | text | konzeptzentrierte Überschrift |
| `subject_name` | text | Name des Gegenstands (z.B. „Enzym X") |
| `subject_type` | enum | `Rohstoff / Ingredient / Technologie / Verfahren` |
| `what_is_new` | text | kurze Beschreibung des Neuen |
| `functions` | text[] | Funktions-Taxonomie, ≥1 (siehe 6) |
| `maturity` | enum | `Labor / Pilot / Am Markt / Etabliert` — Eigenschaft der Lösung |
| `evidence` | enum | `Herstellerangabe / Einzelstudie / Mehrfach belegt` — Eigenschaft der Aussage |
| `source_name`, `source_url`, `source_date` | text, text, date | Quelle & Veröffentlichungsdatum (Patente sind gewöhnliche Quellen, kein eigener Mechanismus) |

**Zone Einschätzung** (redaktionelle Deutung, sichtbar als solche ausgezeichnet):

| Feld | Typ | Kettenglied |
|---|---|---|
| `strategic_theme` | enum (geteilt) | strategischer Trend |
| `problem_solved` | text | gelöstes Problem / eröffnete Möglichkeit |
| `oelz_application` | text | mögliche Anwendung bei Ölz (Freitext — bewusst keine Produktbereichs-Taxonomie in diesem Modul) |
| `oelz_opportunity` | text | Produkt-/Portfoliochance |
| `next_step` | text | nächster Prüfschritt, ein Satz; „Beobachten" ist vollwertig. Vokabular: Beobachten / Prüfen / Pilotieren |

**Veröffentlichungs-Hürde** (zentrale Modellregel): `status = 'published'` erfordert alle sechs Kettenglieder plus Quelle (Name, URL, Datum), Reifegrad, Evidenz — und `what_is_new`. Entwürfe dürfen unvollständig sein. Jedes Glied darf ein einziger kurzer Satz sein — die Hürde erzwingt Nachdenken, nicht Gewissheit. **Review nach den ersten ~15 Signalen**, ob die Hürde zu viel wegfiltert; erst dann ggf. lockern.

`what_is_new` kam bei der Umsetzung dazu und stand nicht in der ursprünglichen Liste: ohne
Beschreibung bliebe die Zone „Grundlage" im Detail leer, und das Signal wäre für einen Leser
wertlos. Die Erweiterung ist bewusst und lässt sich in einer Zeile zurücknehmen
(`PUBLISH_REQUIREMENTS` in `src/types/ingredient-signals.ts` plus der CHECK in Migration 007).

**Durchgesetzt wird die Hürde in der Datenbank**, nicht nur im Formular: der CHECK
`ingredient_signals_published_complete` verhindert ein unvollständiges `published` auch bei
direktem Schreibzugriff. Das Formular benennt zusätzlich live, was noch fehlt. Damit ist
„kein generischer Newsfeed" strukturell und nicht bloß eine Absichtserklärung.

`strategic_theme` wird **zentral** abgelegt (Startwerte: `Proteinisierung, Clean Label, Premiumisierung, Convenience, Nachhaltigkeit` — aus dem UI/UX-Plan Kap. 10) und gehört der Plattform, nicht diesem Modul; das Produkt-Radar kann später dieselbe Taxonomie erhalten (dort als P4 geplant).

**Rhythmus ohne Ausgabe-Entität** (entschieden 2026-08-07): Die Erhebung läuft monatlich, aber es gibt
**keine Edition-Entität** — keine `rohstoff_editions`, keine Join-Tabelle, keinen Edition-Builder. Das
Modul ist ein Nachschlagewerk, kein Lesestück: ein Frischhalte-Enzym ist im November so relevant wie im
März, und eine Heft-Zuordnung würde genau die Funktionssuche begraben, die Nutzeraufgabe 2 trägt.
Der Wettbewerbsradar zeigt zudem, was passiert, wenn beides existiert — seine Bibliotheksansicht
`/signals` hat keinen einzigen eingehenden Link und ist faktisch verwaist.

Der **Stand** wird abgeleitet, nicht gespeichert: das jüngste `published_at` unter den veröffentlichten
Signalen. „Neu" heißt damit nicht mehr „unter 30 Tagen alt", sondern **„mit der letzten Erhebung
dazugekommen"** — der 30-Tage-Wert aus Q13 ist keine willkürliche Grenze mehr, sondern die technische
Umsetzung des Monatstakts.

Wichtig für die Umsetzung: Neuheit misst **gegen den Stand, nicht gegen heute**. Gemessen gegen
`Date.now()` wäre der Zähler nach einer Erhebungspause still null, obwohl der Kopf weiterhin ein
Standdatum zeigt — genau die zuletzt erhobenen Signale wären dann nirgends mehr als neu erkennbar.
`published_at` wird zudem nur einmal gesetzt und bleibt auch beim Zurücksetzen auf Entwurf stehen,
damit ein später erneut veröffentlichtes Altsignal nicht wieder als neu gilt und den Stand des
ganzen Moduls nach vorn zieht.

## 6. Filterdimensionen

Bewusst drei plus Suche (Filter-Overload-Befund aus dem Produkt-Radar nicht wiederholen):

1. **Funktion** — `Zuckerreduktion, Proteinanreicherung, Ballaststoffanreicherung, Frischhaltung, Textur & Mundgefühl, Prozessstabilität, Clean Label`
2. **Strategisches Thema** — die fünf geteilten Werte
3. **Reifegrad** — vier Stufen
4. Freitextsuche über Titel / Gegenstand / Beschreibung

**Nicht filterbar**: Evidenz (Kennzeichnung auf Karte/Detail), Quelle (sichtbar, aber keine Filterachse), Gegenstandstyp (Badge). Mechanik nach Bestandskonvention: Server Component, `searchParams`, Chip-Links, Toggle-Verhalten.

## 7. Übersicht und Detailansicht

**Entschieden am Prototyp (2026-08-07): Variante A — „Kette als Fluss".** Getestet wurden drei
strukturell verschiedene Ansätze; B trennte Befund und Einschätzung am ehrlichsten, brauchte auf der
Karte aber deutlich mehr Höhe, C stellte die Chance über den Befund und untergrub damit genau die
Zwei-Zonen-Logik. A trägt die Relevanzkette am klarsten.

**Karte** (scanbar in ~15 Sekunden): Typ-Badge + Reifegrad-Badge + ggf. Neu-Badge · Titel · Gegenstandsname ·
Relevanzkette als knappe Leiter (Thema / Funktion / Bei Ölz) hinter einer linken Akzentkante ·
Fußzeile mit dem Verb des nächsten Schritts links und Evidenz + Datum rechts. Ganze Karte verlinkt auf
die Detailseite (StudyCard-Muster).

**Korrektur aus dem Prototyp**: A verliert auf der Karte das „so what" — das Verb allein sagt nicht,
*warum*. Die Chance (`oelz_opportunity`) wandert als vierte Zeile in die Leiter oder ersetzt „Bei Ölz",
damit die Karte die Frage „warum sollte mich das interessieren" ohne Klick beantwortet.

**Detailansicht: Dialog** (entschieden 2026-08-07, ersetzt die ursprüngliche Entscheidung „eigene Seite").
Klick auf die Kachel öffnet ein Overlay, kein Seitenwechsel — wie beim Produkt-Radar. Zwei sichtbar
getrennte Zonen, vertikal gestapelt:

1. **„Grundlage"** zuerst, auf gedämpftem Hintergrund: Neuigkeit, dann Funktionen, Reifegrad, Evidenz,
   Quelle mit Link und Datum in einer kompakten Metazeile.
2. **„Was wir daraus machen"** darunter: die fünf Kettenglieder (Thema → Problem → Anwendung → Chance →
   nächster Schritt) als vertikaler, verbundener Fluss mit Punktmarkierungen.

**Die Reihenfolge kehrt sich gegenüber der Seitenvariante um.** Auf der Seite standen Kette und
Grundlage nebeneinander, man sah beides gleichzeitig. Im Dialog wird gestapelt — käme die Kette zuerst,
läse man fünf Einschätzungen, bevor klar ist, worum es überhaupt geht. Befund zuerst ist im gestapelten
Layout die einzig sinnvolle Ordnung.

**Bedingung: Der Dialogzustand muss in der URL liegen** (`?signal=<id>`). Die bestehende `ImpulseCard`
hält ihn nur im Komponenten-State — ein geöffneter Impuls ist deshalb weder teilbar noch nach einem
Reload wieder da. Für das Rohstoff-Radar ist das keine Kleinigkeit, weil „das musst du dir ansehen"
Nutzeraufgabe 4 ist. Der Prototyp zeigt, dass es geht: Klick setzt `?signal=` per `history.replaceState`
(kein Server-Roundtrip, sofortiges Öffnen), der Direktaufruf einer solchen URL rendert den Dialog offen.
Breite `sm:max-w-2xl` statt der `sm:max-w-xl` des Impuls-Dialogs — die Kette braucht die Zeilenlänge.

Damit entfällt die Route `/rohstoff-radar/[id]`.

**States**: Empty-State in zwei Varianten (gar keine Signale / Filter ohne Treffer, Zweizeiler-Muster mit Zurücksetzen-Hinweis). Loading/Error folgen der Bestandskonvention (server-gerendert, kein separates Loading-UI) — bewusste Entscheidung, kein Versehen.

## 8. Wiederverwendete Bestandteile

- `Badge`, `Button`/`buttonVariants`, `Input`, `Label`, `Textarea`, `Select` (Admin-Formular)
- Modul-Registry + Sidebar (nur Config-Eintrag), Admin-Layout mit Auth-Gate
- Filter-Chip-Muster und `searchParams`-Mechanik (Konvention, keine Komponente)
- KI-Extraktions-Muster: API-Route mit Admin-Check + `src/lib/ai/`-Funktion (OpenAI, JSON-Mode, Enum-Injektion in den Prompt, defensives Parsen)
- RLS-Muster aus Migration 005 (published-oder-Admin lesen, Admin schreiben)
- Vokabular `Beobachten / Prüfen / Pilotieren` (bestehende `PRIORITY_OPTIONS`)

## 9. Tatsächlich neu

- Migration `006_ingredient_signals.sql` — Tabelle, RLS, **Indizes von Anfang an** (status, published_at, GIN auf `functions`; Lehre aus 004/005, die ohne Indizes leben) und `updated_at`-Trigger
- Taxonomie-Konstanten: `SUBJECT_TYPES`, `INGREDIENT_FUNCTIONS`, `MATURITY_LEVELS`, `EVIDENCE_LEVELS` (modullokal) und `STRATEGIC_THEMES` (zentral, modulneutral)
- `IngredientSignalCard`, Übersichts- und Detailseite
- Admin-Formular + Extraktor (`extract-ingredient-signal`) mit Kettenglieder-Validierung vor „Veröffentlichen"
- Empfehlung, kein Beschluss: beim Bau der vierten Karte die gemeinsame Kartengrundstruktur (Container, Header-Zeile, Datumsformat) einmal herausziehen, statt sie ein viertes Mal zu kopieren — Entscheidung bei Implementierung

## 10. Integrationspunkte / Seams

- `src/lib/modules.ts`: neuer `active`-Eintrag → Sidebar & Homepage-Grid automatisch
- `module-nav.tsx`: kein Sonderfall nötig (im Gegensatz zu `wettbewerb`)
- `app-nav.tsx` Admin-Dropdown: New- und Manage-Link ergänzen
- `strategic_theme`-Konstante so ablegen, dass `innovation_impulses` sie später nutzen kann (P4 im UI/UX-Plan)
- KI-Provider: OpenAI nach Bestandscode (README nennt fälschlich Claude — bekannte Drift, hier nicht vergrößern)

## 11. MVP und spätere Erweiterungen

**MVP**: Übersicht mit Kopf/Zählern, drei Filter + Suche, Karte, Detailseite, Empty-States, Admin-Formular mit KI-Extraktion, Veröffentlichungs-Hürde, Neu-Badge (30 Tage).

**Erweiterungen (in dieser Reihenfolge sinnvoll)**:
0. **Anlass zur neuen Erhebung** — Benachrichtigung oder Mail „es gibt neue Rohstoffsignale". Das ist der eigentliche Nutzen, den man sich von einer Monatsausgabe erhofft, ohne deren Struktur. Optional dazu: die Signale der letzten Erhebung auf der Übersicht unter „Neu seit {Stand}" gruppieren
1. „Merken / Zur Diskussion vorschlagen" — wäre die **erste nutzergenerierte Datenhaltung der Plattform** (eigene Tabelle, RLS, Feedback-UI) und verdient eine eigene Entscheidung
2. Gegenstand zur Entität hochziehen (Dossier-Seite), sobald mehrere Signale je Gegenstand existieren
3. Homepage-Briefing-Slot für neueste Rohstoffsignale
4. `strategic_theme` auf das Produkt-Radar ausrollen
5. Pro-Nutzer-„Neu"-Tracking statt Zeitfenster
6. `procurement`-Rolle (offene Frage aus `role-definitions.md`)
7. Research-Agent-Quelle für Rohstoffsignale (automatische Beschaffung — bewusst nicht in v1)

## 12. Nicht-Ziele

Kein Redesign, kein eigenständiges Dashboard, kein Rohstoffkatalog (Ereignis-Modell, kein Bestandsverzeichnis), kein Newsfeed (Veröffentlichungs-Hürde), **kein Patentradar** (Patente sind gewöhnliche Quellen mit Evidenz-Einstufung), **keine Ausgabe-/Edition-Entität** (Nachschlagewerk, kein Lesestück — der Monatstakt liegt in der Erhebung, nicht im Artefakt), keine automatische Datenbeschaffung in v1, keine neue Designbibliothek, keine neue Rolle, keine Nutzer-Interaktionsfeatures in v1.

## 13. Akzeptanzkriterien

1. „Rohstoff-Radar" erscheint in der Sidebar zwischen Produkt-Radar und Studien und ist als aktiv markiert, wenn eine `/rohstoff-radar`-Route geöffnet ist.
2. Die Übersicht zeigt Titel, Erklärungszeile, „Zuletzt aktualisiert: {jüngstes published_at}" und „{n} neue Signale" (n = seit der letzten Erhebung, technisch: ≤ 30 Tage).
3. Karten zeigen: Typ-Badge, Reifegrad, Titel, Gegenstandsname, die Kettenleiter (Thema / Funktion / Chance) hinter einer Akzentkante und mit der Überschrift „Einschätzung der Redaktion", die Beschriftung des nächsten Schritts, Evidenz und Datum; Signale aus der letzten Erhebung tragen ein Neu-Badge. Folgt `next_step` nicht dem Vokabular Beobachten/Prüfen/Pilotieren, steht dort „Nächster Schritt" — die Zeile darf nie stumm verschwinden.
4. Filter Funktion / Thema / Reifegrad sind kombinierbar, spiegeln sich in der URL, sind per Link teilbar und einzeln abwählbar; die Trefferzahl ist sichtbar.
5. Suche filtert über Titel, Gegenstand und Beschreibung.
6. Klick auf eine Kachel öffnet den Detail-Dialog; er trennt „Grundlage" und „Was wir daraus machen" sichtbar und macht die Relevanzkette als Abfolge lesbar.
6a. Der geöffnete Dialog steht als `?signal=<id>` in der URL: Link kopieren und in einem neuen Tab öffnen zeigt dasselbe Signal geöffnet; Schließen entfernt den Parameter wieder.
7. Ein Signal ohne vollständige Relevanzkette (inkl. Quelle, Reifegrad, Evidenz) lässt sich nicht auf `published` setzen; als `draft` speichern geht jederzeit. Die Fehlermeldung benennt die fehlenden Glieder.
8. Nicht-Admins sehen ausschließlich veröffentlichte Signale (RLS). Ein `?signal=<id>` auf einen Entwurf oder eine unbekannte ID öffnet keinen Dialog und zeigt die Übersicht — seit der Dialog-Entscheidung gibt es keine Detailroute mehr, die 404 liefern könnte.
9. Der Admin-Flow „Text einfügen → Mit AI strukturieren → prüfen → speichern" befüllt alle Kettenglieder als Entwurf; `ai_generated` wird gesetzt.
10. Leere Liste und leere Filtermenge zeigen unterscheidbare, deutsche Empty-States mit Handlungsaufforderung.
11. Evidenz und Reifegrad erscheinen als benannte Stufen — nirgends als Zahl oder Punkteskala.

## 14. Offene Entscheidungen

- **Funktionsliste erweitern?** (Salzreduktion, Fettersatz, natürliche Färbung, Allergenfreiheit) — nach dem ersten Redaktionslauf entscheiden, nicht vorab.
- **Härte der Hürde**: nach ~15 Signalen prüfen, ob zu viel wegfiltert (Beschluss: erst dann lockern).
- **Ort der Erzwingung**: Formular-Validierung (Bestandskonvention) vs. zusätzlicher DB-Constraint — bei Implementierung.
- **Kartengrundstruktur herausziehen** oder viertes Copy-Paste — bei Implementierung.
- **Taxonomie-Validierung mit Ölz**: Funktionsliste und strategische Themen sind wie die Signal-Taxonomie („Validated with client: pending") noch nicht kundenbestätigt — im nächsten Review-Termin mit Kai Heuberger bestätigen lassen.

## 15. Prototyp — durchgeführt, Ergebnis eingearbeitet

Gefragt war: Trägt die Karte die Relevanzkette in ~15 Sekunden, und wie trennt die Detailansicht
Befund von Einschätzung? Vier Varianten, gebaut mit drei realistischen Beispielsignalen
(Frischhalte-Enzym, Treber-Ballaststoff, Lecithin statt E471).

| | Ansatz | Ergebnis |
|---|---|---|
| A | Kette als Fluss, Detail als eigene Seite | Karten gewinnen; Detail als Seite verworfen |
| B | Befund \| Einschätzung, harte Zweispaltigkeit | Am ehrlichsten, Karte zu hoch fürs Grid |
| C | Antwort zuerst | Stellt die Chance über den Befund, untergräbt die Zwei-Zonen-Logik |
| **D** | **A-Kacheln + Detail als Dialog** | **Gewählt** |

Drei Erkenntnisse sind in die Abschnitte 7 und 13 eingeflossen:

1. A verliert auf der Karte das „so what" — die Chance gehört in die Kettenleiter, sonst muss man
   für jedes Signal klicken.
2. Im gestapelten Dialog kehrt sich die Lesereihenfolge um: Grundlage vor Kette.
3. Der Teilbarkeits-Einwand gegen Dialoge ist lösbar — `?signal=<id>` per `history.replaceState`,
   im Prototyp in beide Richtungen verifiziert. Steht als Akzeptanzkriterium 6a fest, damit bei der
   Implementierung nicht das zustandslose `ImpulseCard`-Muster zurückkommt.

**Der Prototyp liegt auf dem Wegwerf-Branch `prototype/rohstoff-radar-ui`** (Commit `6c004d5`), nicht in
main. Dort liegen alle vier Varianten samt Umschalter als Primärquelle. Beim Implementieren neu
schreiben, nicht kopieren — der Code entstand unter Prototyp-Bedingungen, ohne Tests und ohne
Fehlerbehandlung.
