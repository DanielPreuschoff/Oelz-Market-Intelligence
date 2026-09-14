# Regulatorik-Radar als eigenes Modul — „Unter Beobachtung" zieht aus dem Rohstoff-Radar um

Die Risikosignale („Unter Beobachtung") verlassen den Reiter im Rohstoff-Radar und werden ein eigenes Modul `/regulatorik-radar` mit eigenem Menüpunkt. Tabelle, Eintragstyp, Kartenform und Admin-Bereich bleiben, wie Spec und Migration 013 sie festlegen; es ändert sich der Ort. Entschieden am 14.09.2026 in einer Grilling-Runde nach dem Termin mit Kai Heuberger vom 11.09.2026. Dort hatte Kai die Trennung vom Rohstoff-Radar ausdrücklich begrüßt („so ein Legal Radar") und per E-Mail zwei Ziele benannt, die der Reiter nicht abdeckt: früh erfahren, **wenn die EFSA neue Rohstoffe zulässt**, und **wenn die EU rechtliche Schritte plant — bei Rohstoffen und Produkten**. Der Reiter kannte nur Risiken, und nur für benennbare Stoffe.

Der Name lehnt sich an „Rohstoff-Radar" an; „Kritische Rohstoffe" bleibt aus dem Grund verworfen, den die Spec nennt (Beschaffungsrisiko), und ein Name, der nur nach Gefahr klingt, passt nicht mehr, sobald Zulassungen dazukommen.

## Considered Options

- **Reiter behalten, Kai erst zeigen** — verworfen: Kai hatte den Reiter am 27.08. selbst gewünscht, am 11.09. aber nicht mehr gewusst, wie das Vorhaben hieß, und die Trennung begrüßt. Die inhaltliche Trennung (eigener Eintragstyp, eigene Tabelle, eigene Kartenform) war ohnehin schon gebaut; es fehlte nur der eigene Platz in der Navigation.
- **Eigener Menüpunkt, der auf den bestehenden Reiter führt** — verworfen: Zwei Wege zum selben Inhalt, und der Reiter hätte die Rohstoff-URLs weiter mitgeschleppt.
- **Zulassungen als Chance ins Rohstoff-Radar** — verworfen: Zulassung und Risiko kommen aus denselben Behördenquellen (EFSA, PAFF, EUR-Lex); getrennte Module hießen zwei Suchläufe über dieselben Quellen. Kai denkt quellengetrieben („Filter um EFSA und EU erweitern").
- **Freigabe je Nutzer** (Admins plus benannte Personen) — verworfen: neuer Mechanismus für eine Ausrollstufe von wenigen Wochen. Es bleibt beim bestehenden `adminOnly`-Schalter, der einen Deploy braucht.

## Consequences

- **Route `/regulatorik-radar`**, Modul-`id: 'regulatorik'`, Position hinter dem Rohstoff-Radar. Eigene Wurzel, nicht unterhalb von `/rohstoff-radar` — sonst ordnete `isModuleActive` (Präfixprüfung) die Seite dem Rohstoff-Radar zu.
- **Ausrollstufe:** `adminOnly: true` plus `notFound()` in der Route. Die RLS auf `substance_watch` bleibt, wie Migration 013 sie setzt (Veröffentlichtes für alle Angemeldeten lesbar): Die Einträge sind öffentliche Behördenmeldungen, und so braucht das Freischalten kein SQL — `adminOnly` entfernen, deployen. Bis dahin sehen Nicht-Admins den Inhalt nirgends, auch den alten Reiter nicht mehr.
- **Alte Links** `/rohstoff-radar?ansicht=beobachtung` leiten auf das neue Modul weiter, samt Kategorie.
- **Der Querverweis geht vorerst verloren.** Die Spec nannte die Doppelung — derselbe Stoff links als Chance, rechts als Risiko — den Erkenntniswert des Reiters (Akzeptanzkriterium 6). Ein Hinweis auf der Rohstoff-Karte, wenn derselbe Stoff im Regulatorik-Radar steht, ist der Folgeschritt nach dem Hauptlauf vom 30.09./01.10.2026; er braucht einen verlässlichen Abgleich über Stoffname und E-Nummer.
- **Nicht auf der Startseite**, weder Briefing-Block noch Zähler — die Begründung aus Spec §8 gilt weiter. Das Modul erscheint dort nur in der Modulzeile, sobald es freigeschaltet ist. Kein Eintrag in `SOURCES` (`src/lib/module-stats.ts`), deshalb auch kein Ungesehen-Zähler und kein Lesestand.
- **Geplant für dasselbe Modul, nicht Teil dieses ADR:** Kurzzeile je Eintrag, Detail-Dialog, Feld „Behörde" mit Filter, Geltungsbereich CH, die Eintragstypen „Zulassung" und „Indirekt relevant", ein Behörden-Prompt mit Import als Entwurf. Die Spec wird fortgeschrieben, wenn sie gebaut sind.
- Spec §8, §11 und Akzeptanzkriterium 4 tragen einen Nachtrag; `CONTEXT.md` („Sichtbarkeit") ist berichtigt: Der Schalter braucht einen Deploy.
