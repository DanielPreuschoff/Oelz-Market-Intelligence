# Kundenradar als eigenes Modul — strategische Bewegungen der Händler statt Listungen und Preise

Die Plattform bekommt ein Modul `/kundenradar`, das je Händler (Kette × Land) die
Entscheidungen der Zentrale sammelt, die Backwaren berühren, und zu jeder sagt, was sie
für Ölz heißt. Es ersetzt den Retailer-Radar-Ansatz vom August 2026 (Listungen, Preise,
Shop-Abrufe), der nicht weiterverfolgt wird. Entschieden am 27.10.2026 nach dem Termin
mit Simon Greiner (Vertrieb), der die Idee am 02.10.2026 über Kai Heuberger eingebracht
hatte. Spec: [kundenradar-spec.md](../kundenradar-spec.md).

Der Anlass ist Simons Priorisierung im Gespräch: Auf die Frage nach seinen drei
wichtigsten Informationsarten nannte er eine — Schlagzeilen auf dem Niveau der
Lebensmittel Zeitung, für die Länder, in denen es keine gibt. Die Listungen und Preise aus
seiner Mail verwarf er selbst („muss nicht im Detail sein"). Der alte Ansatz hatte genau
diese Listungen im Kern und „strategische Bewegungen" auf später verschoben; Simon dreht
die Reihenfolge um.

## Considered Options

- **Retailer-Radar-Spec fortschreiben, Nachrichten als Stufe 2 anbauen** — verworfen: Die
  Spec organisiert alles um Quellen, Läufe, Abrufe und Beobachtungen — Entitäten für
  Shop-Scraping, die für Nachrichten keinen Sinn ergeben. Ein Modul, dessen Kern (Preise
  je Listung) nie gebaut wird, trüge seine Begriffe als Ballast. Daniel wollte das neue
  Modul ausdrücklich ohne diese Vorprägung denken.
- **Händler als weitere Wettbewerber im Wettbewerbsradar** — verworfen: Dort ist der
  Absender ein Hersteller, die Signale fließen in Ausgaben, und der Nutzen für Simon liegt
  im Dossier über die Zeit, nicht in der Monatsausgabe. Außerdem würden Händler die
  Wettbewerberliste und die Länderseiten des Moduls verändern.
- **Ein Prompt je Händler** — verworfen: elf Läufe je Dienst, und drei Kaufland-Länder
  bekämen dieselben Konzernquellen dreimal. Ein Prompt je Land sucht in Landessprache
  und in der nationalen Fachpresse; die Händlerliste des Landes ist Parameter.
- **Länder in `countries` anlegen (HR, RO, UK)** — verworfen: Die Tabelle gehört dem
  Wettbewerbsradar und steuert dessen Länderseiten; neue Zeilen hießen dort leere
  Karten. Das Kundenradar führt das Land als ISO-Code mit CHECK, ohne Fremdschlüssel.
- **Wöchentlicher Lauf** — verworfen: Simon hat gesagt, monatlich reicht; ein zweiter
  Rhythmus neben dem Hauptlauf kostet mehr, als er bringt.
- **Vorab-Validierung mit einem Dossier von Hand** — verworfen (Daniel, 27.10.): direkt
  in den MVP, Feedback kommt aus der Nutzung.

## Consequences

- **Route `/kundenradar`**, Modul-`id: 'kunden'`, Dossier unter `/kundenradar/[slug]`.
  Eigene Wurzel wegen der Präfixprüfung in `isModuleActive`.
- **Zwei neue Tabellen** `retailers` und `retailer_signals` (Spec §9), RLS nach dem Muster
  von `substance_watch`. Die Veröffentlichungs-Hürde — der „Für Ölz"-Satz — steht als
  CHECK in der Datenbank.
- **Der Retailer-Radar-Prototyp** (`/retailer-radar`, Modul-`id: 'retailer'`, `adminOnly`)
  und sein Platzhalter in `src/lib/modules.ts` werden mit dem Kundenradar-PR entfernt.
  Zwei Module, die beide „Händler" sagen und Verschiedenes meinen, verwirren mehr, als der
  Prototyp noch zeigt. ADR 0003 und `docs/retailer-radar-spec.md` bleiben als Geschichte
  stehen; `CONTEXT.md` markiert die Retailer-Radar-Begriffe als abgelöst.
- **Auf der Startseite**, mit Eintrag in `SOURCES` (`src/lib/module-stats.ts`): Simons
  „wöchentlich zehn Minuten, was ist neu" ist genau der Zweck des Startseiten-Blocks.
  Das unterscheidet das Kundenradar vom Regulatorik-Radar (ADR 0006).
- **Ausrollstufe:** `adminOnly: true` plus `notFound()` in der Route, bis der Erstlauf
  gesichtet ist. Freischalten entscheidet Kai.
- **Erstbefüllung ab 01.01.2026** mit Kurzprofil je Händler; danach monatlich der Vormonat.
  Register `docs/kunden-register.md`.
- **Nicht Teil dieses ADR:** Inland-Händler, Industriekunden, Ländergrundwissen,
  kundenspezifische Präsentationen. Die Spec nennt sie als Nicht-Ziele und offene Punkte.
