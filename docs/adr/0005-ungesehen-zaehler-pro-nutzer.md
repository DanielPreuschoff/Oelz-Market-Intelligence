# Ungesehen-Zähler pro Nutzer — Lesestand je Modul, „Neu" bleibt zeitbasiert

Die orangen Zähler in der Navigation (Seitenleiste, Mobile-Navigation) und in den Modul-Zeilen der Startseite werden pro Nutzer: Sie zählen, was seit seinem letzten Besuch des jeweiligen Moduls veröffentlicht wurde, und verschwinden, sobald er das Modul öffnet. Dafür gibt es einen Lesestand je Nutzer und Modul (`module_visits`: Nutzer, Modul, zuletzt gesehen am). Das Glossar hatte bewusst das Gegenteil festgelegt („zeitbasiert, nicht pro Nutzer — es gibt keinen Lesestand"); dieser ADR hebt das für die Zähler auf und lässt es für alles andere stehen. Entschieden am 19.08.2026 in einer Grilling-Runde.

## Considered Options

- **Gesehen = Eintrag geöffnet** (Lesestand je Signal/Impuls) — verworfen: Der Zähler würde erst null, wenn alle 45 Signale einzeln aufgeklappt sind; er wäre eine Schuld, die niemand abträgt. Modulbesuch als Ereignis entspricht dem Muster ungelesener Nachrichten in einem Kanal und braucht je Nutzer und Modul einen Zeitstempel statt einer Gesehen-Liste je Eintrag.
- **Schnittmenge aus Neu und Ungesehen** (verschwindet auch ohne Besuch nach 30 Tagen) — verworfen: Eine Zahl, die von selbst verschwindet, ist keine, der man vertraut — genau das Problem des bisherigen Zählers. „Veröffentlicht nach deinem letzten Besuch" ist die einfachere und ehrlichere Regel; wer drei Monate fort war, sieht drei Erhebungen.
- **Alles pro Nutzer** (auch Bühne, Briefing, Stand-Zeile, Kachel-Abzeichen) — verworfen: Das Briefing ist redaktionell — es beschreibt die jüngste Erhebung, nicht den Leser — und wird als *eine* Seite gedacht und geschrieben (Monatstext). Kachel-Abzeichen, die im Moment des Hinsehens verschwinden, wären sinnlos. Deshalb zwei Begriffe: **Neu** (Erhebung, für alle gleich) und **Ungesehen** (Nutzer).
- **Lesestand als Spalte auf `user_profiles`** — verworfen: Der Nutzer muss seinen Lesestand selbst schreiben; auf `user_profiles` liegt `is_admin`. Eine eigene Tabelle mit eigener RLS trennt das sauber.
- **Besuch beim Rendern der Seite vermerken** — verworfen: Next.js rendert Seiten hinter Links vorab; ein Modul gälte als gesehen, sobald jemand mit der Maus über den Menüpunkt fährt. Der Besuch wird aus dem Browser gemeldet, wenn die Seite steht (Server Action aus `ModulbesuchMelder`).

## Consequences

- **`ModuleStats` trägt zwei Zahlen:** `newCount` (neu, zeitbasiert, wie bisher) und `unseenCount` (ungesehen, gegen den Lesestand). Ohne Lesestand gilt ungesehen = neu — der Rollout ist dadurch unsichtbar, und ein neuer Nutzer startet mit der aktuellen Erhebung, nicht mit dem Gesamtbestand und nicht mit null.
- **Jede Seite des Moduls zählt als Besuch**, auch der Sprung von der Startseite in eine Edition oder auf ein Rohstoffsignal. Die Zuordnung Route → Modul ist `isModuleActive`/`moduleForPath` in `src/lib/modules.ts` — dieselbe Liste, die den Menüpunkt hervorhebt. Ein neuer Pfad eines Moduls gehört dorthin, sonst zählt er weder als aktiv noch als gesehen.
- **Der aktive Menüpunkt zeigt nie einen Zähler.** Die Zahl ist beim Ankommen weg; der Lesestand wird im Hintergrund geschrieben und das Layout danach neu validiert, damit die übrigen Zähler stimmen, bevor der Nutzer weiterklickt. Geschrieben wird nur, wenn es Ungesehenes gibt — jeder Schreibvorgang zieht eine Neuvalidierung nach sich.
- **Die Stand-Zeilen der Modulköpfe sagen „Jüngste Erhebung/Edition: Datum · N Signale"** statt „N neue Signale", und die Zahl nur, solange die Erhebung als neu gilt. Sonst stünde neben einer leeren Seitenleiste ein Kopf, der 45 behauptet.
- **Zählbasis je Modul unverändert:** Wettbewerb zählt Signale der Editionen, die nach dem Besuch veröffentlicht wurden; Rohstoff `published_at`; Produkt und Studien `created_at`. Startseite markiert nichts. Admins ohne Sonderfall. Kein Deckel für die Zahl.
- **Migration 010** legt `module_visits` mit RLS (nur eigene Zeilen) und expliziten Grants an. Fehlt die Tabelle, fällt alles auf ungesehen = neu zurück — die Seite bricht nicht.
- ADR 0004 („kein Lesestand pro Nutzer") trägt einen Nachtrag; die dortige Aussage gilt weiter für Bühne und Briefing.
