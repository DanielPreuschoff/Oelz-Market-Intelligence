# Startseite als Briefing mit Bühne — hell, bild-optional, Orange als einziger Akzent

Die Startseite wird vom Modul-Verteiler zum Briefing: Sie beantwortet „Was hat sich seit dem letzten Mal getan?" über Wettbewerbs-, Produkt-, Rohstoff-Radar und Studien, mit der jüngsten Edition als Aufmacher und dem Monatsstand darunter; die Module folgen erst danach als kompakter Zugang. Damit hebt sie drei Festlegungen der Design-Analyse (`docs/design-analyse.md`, §4) für genau diese eine Seite auf: Sie darf Fotos zeigen (bild-optional — Bild wo vorhanden, sonst gestalteter Ersatz), sie darf die volle Breite neben der Seitenleiste nutzen statt `max-w-5xl`, und sie bekommt eine große, ruhige Bühne oben (orange oder dunkelbraun) statt durchgehender Kartendichte. Entschieden am 18.08.2026 in einer Grilling-Runde mit Trendhunter (`trendhunter.com/food`) als Referenz für „sieht gestaltet aus statt zusammengesetzt".

## Considered Options

- **Vollständig dunkler Grund wie Trendhunter** — verworfen: koppelt die Startseite von allen anderen Seiten ab (Dark Mode ist laut ADR 0002 nicht im Pilot) und bricht die Erwartung an Ölz — warm, hell, Papierweiß laut CD-Manual S. 19. Die Bühne holt den „designten" Moment, ohne die Plattform zu spalten.
- **Bildgeführt (Karte ohne Bild bekommt keinen Platz)** — verworfen: Editionen, Rohstoffsignale und Studien haben kein Bildfeld; wie viele Signale eins tragen, ist unbekannt. Ein Konzept, das Bilder *braucht*, wäre eine Behauptung. Prüfmaß: Die Seite muss auch ohne ein einziges Foto gestaltet aussehen.
- **Magazin-Feed als Job der Seite** — verworfen: ein Feed lebt von Fülle, die Plattform liefert eine Edition und eine Handvoll Impulse im Monat. Das Briefing zeigt Neues, nie alles.
- **Rollen-gefärbte Startseite** — verschoben: „Rolle steuert Hervorhebung" bleibt gültig, ist aber eine spätere Schicht; ohne echte Nutzer nicht prüfbar und verdoppelt jede Gestaltungsarbeit.

## Consequences

- **Orange ist auf der Startseite der einzige Akzent** — für Neu, `critical` und Aufrufe. Modulfarben (`iconBg`/`iconColor` in `src/lib/modules.ts`) und die dreizehn Kategoriefarben werden dort nicht verwendet; Kategorien sind neutrale Text-Chips. Die globale Zähmung der Kategoriefarben (Design-Analyse §3e) bleibt ein eigenes, modulweites Ticket.
- **CI-Signaturen sind verbindlich, nicht optional:** Welle mit weißer Begleitlinie (Manual S. 6), Braun auf Orange (nie weißer Text auf Orange, 2,35:1), MADE Tommy Soft für alle Display-Größen, Papierweiß statt hartem Weiß bei Karten. Sie sind der Unterschied zwischen „Ölz-typisch" und „dekoriert".
- **Bewegung: Mikro + Choreografie, kein Ambient.** Hover und Farbwechsel ≤ 200 ms, gestaffeltes Einblenden beim Laden; nichts bewegt sich dauerhaft (das gehört der Login-Bühne). `prefers-reduced-motion` wird respektiert. Erst CSS; eine Bibliothek nur, wenn ein Prototyp konkret zeigt, dass CSS nicht reicht.
- **Keine Datenbankänderung.** Das Briefing liest ausschließlich, was existiert (`module-stats.ts`, veröffentlichte Editionen/Impulse/Rohstoffsignale/Studien). Kein Redaktions-Flag „Rohstoff des Monats", kein Lesestand pro Nutzer — „Neu" bleibt zeitbasiert (Glossar).
- **Sichtbarkeit bleibt die einzige Wand.** Das Design nimmt den freigeschalteten Rohstoff-Radar an; die echte Seite gated weiterhin über `visibleModules()`. Retailer- und Food-Radar kommen ins Briefing, sobald sie belastbare Daten haben — bis dahin zeigt das Briefing nichts Leeres.
- **Klick-Ziele nur so tief wie das Modul heute kann.** Edition → Editionsseite, Rohstoffsignal → `?signal=`, Studie → Studienseite; Impuls und Signal führen in die Modulliste (ggf. mit Filter). Detailrouten für Impuls und Signal sind Folge-Tickets, nicht Teil des Vorhabens.
- **Kein Produkt-H1, keine Begrüßung, der Monat ist der Anker.** Der kanonische Produktname ist „Ölz Intelligence Radar" (bereits `<title>`); Login („Market & Competitor Intelligence") und Startseite-H1 („Ölz Market Intelligence") ziehen bei der Umsetzung nach.
- Die drei Prototyp-Archetypen und alle Gestaltungsregeln stehen in `docs/startseite-brief.md`; dieser ADR hält nur fest, *dass* und *warum* die Startseite von der Design-Analyse abweicht.
