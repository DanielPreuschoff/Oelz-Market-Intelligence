# Rohstoff-Register

Fortlaufende Liste aller Rohstoffe, Ingredients, Verfahren und Technologien, die durch die
Recherche gelaufen sind — **auch die verworfenen**. Zwei Aufgaben:

1. **Ausschlussliste für den Explorationslauf.** Der Platzhalter `{BEKANNT}` in
   `prompts/rohstoff-exploration.md` wird aus der Spalte „Gegenstand" gefüllt. Ohne das
   liefert die Recherche jeden Monat dieselben bekannten Kandidaten.
2. **Gedächtnis für Verworfenes.** Was nicht taugte, steht in keiner Datenbank — nur hier.
   Mit Begründung, damit dieselbe Sackgasse nicht zweimal recherchiert wird.

Wird beim Aufbereiten der Berichte fortgeschrieben, nicht von Hand gepflegt.

**Grenze:** Ein Rohstoffsignal, das direkt im Admin-Formular angelegt wurde ohne durch
diesen Ablauf zu laufen, steht hier nicht und kann erneut gemeldet werden. Die Dublette
fällt beim Durchsehen auf.

---

## Stand der Linsenrotation

| | |
|---|---|
| Bisherige Explorationsläufe | 0 |
| Nächste Linse | **1 — Verfahren und Prozesstechnik** |

Die Linse rotiert nach Zahl der Läufe, nicht nach Kalendermonat — ein ausgefallener Monat
verschiebt die Reihenfolge dadurch nicht. Reihenfolge siehe
`prompts/rohstoff-exploration.md`.

---

## Erfasste Gegenstände

Noch keine. Die Tabelle füllt sich mit dem ersten Import.

| Gegenstand | Art | Erhebung | Funktionen | Ergebnis |
|---|---|---|---|---|
| — | — | — | — | — |

**Ergebnis** ist einer von:
`veröffentlicht` · `Entwurf` · `verworfen: <Grund>` · `wartet auf Funktion: <welche>`

Der letzte Wert steht für Funde, die in keine der sieben Funktionen passen und deshalb
nicht veröffentlicht werden können. Häufen sie sich mit demselben Nenner, ist das der
Anlass, die Taxonomie zu erweitern — siehe `prompts/rohstoff-exploration.md`,
Abschnitt „Wenn nichts passt".
