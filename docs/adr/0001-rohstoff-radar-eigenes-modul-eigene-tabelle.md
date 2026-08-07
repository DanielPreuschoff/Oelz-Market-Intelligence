# Rohstoff-Radar als eigenes Modul mit eigener Tabelle

Rohstoff-, Ingredient-, Technologie- und Verfahrenssignale bekommen ein eigenes Modul (`/rohstoff-radar`) mit eigener Tabelle — nicht einen neunten `radar_type` in `innovation_impulses`, obwohl das eine einzeilige Migration gewesen wäre. Die acht bestehenden `radar_type`-Werte sind Marktperspektiven auf ein Konsumentenprodukt; ein Rohstoffsignal beschreibt eine andere Achse (die Lösung selbst statt ihres Marktwinkels) und braucht Felder, die für Impulse sinnlos sind (Funktion, Reifegrad, Evidenz, Relevanzkette) — und umgekehrt (`market`, `channel`, `main_claim`). Eine gemeinsame Tabelle hätte pro Zeile die halbe Spaltenmenge leer gelassen, und das Produkt-Radar hat laut UI/UX-Plan bereits Filter-Overload.

## Consequences

- Es entsteht bewusst ein viertes Parallelgebäude (Tabelle, Admin-Formular, Extraktor, Karte) — die Plattform hat keine geteilte Kartenbasis und keinen Data-Layer; das ist die bestehende Konvention, keine neue Schuld dieses Moduls.
- `strategic_theme` wird als geteilte, geschlossene Taxonomie eingeführt (nicht als Eigentum des Rohstoff-Radars), damit spätere Module darüber aggregieren können. Das frühere Platzhalter-Modul „Trend-Radar" wurde entfernt: ein Trend ist eine Dimension an Signalen, kein eigener Speicher.
- Der Gegenstand (z.B. „Enzym X") bleibt ein Attribut auf dem Signal. Sammeln sich mehrere Signale zum selben Gegenstand, kann er später zur eigenen Entität mit Detailseite hochgezogen werden (Vorbild: Wettbewerber im Wettbewerbsradar) — additiver Schritt, kein Umbau.
