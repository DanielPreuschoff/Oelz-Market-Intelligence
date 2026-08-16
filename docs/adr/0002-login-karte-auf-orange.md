# Anmeldeseite: geteilter Schirm mit senkrechter Wellenkante und Europakarte

Die Anmeldeseite ist ein geteilter Schirm — orange Markenfläche links (60 %), Formular rechts —, getrennt durch die senkrechte Wellenkante nach CD-Manual S. 8. Auf der Fläche liegt eine Europakarte mit den Sitzen der beobachteten Wettbewerber aus `supabase/seed.sql`, Punkte pulsieren langsam. Entschieden am 16.08.2026 in zwei Prototyp-Runden auf dem Branch `prototype/login-2026-08` (neun Varianten A–H plus Ist-Zustand, umschaltbar über `/login?variant=`); Gewinner ist Variante E „Karte auf Orange".

Verworfen: die zentrierte Karte (Ist-Zustand — funktioniert überall, sieht aber aus wie jedes B2B-Werkzeug), Naht mit Radar-Strichzeichnung statt Karte (A/B), Vollfläche (C/G), Karte auf Creme neben dem Formular (D — der direkte Verwandte des H&F-Logins), Karte als Bühne hinter dem Formular (F) und die gespiegelte Anordnung mit Formular links (H). Die orange Fläche links ist bewusst spiegelverkehrt zum H&F-Login derselben Agentur, damit die beiden Kunden nicht wie dasselbe Produkt aussehen.

## Consequences

- Die Karte zeigt nur, was wahr ist: jeder Punkt ist ein nachgeschlagener Firmensitz (21 Punkte inklusive Ölz Dornbirn), keine Streuung. Deshalb Europa statt Welt — Ölz ist ein regionaler Champion, eine Weltkarte wäre zu 90 % leer oder eine Behauptung. Nicht auf der Karte: Gradski mlin (Sitz nicht nachprüfbar, Register „to be validated") und Bimbo (Mexiko). Ändert sich das Register, `node scripts/baue-europakarte.mjs` neu laufen lassen.
- Kartendaten kommen einmalig aus Natural Earth (`world-atlas`, `topojson-client`, `d3-geo` als Entwicklungsabhängigkeiten); im Betrieb ist die Karte eine statische Datei (`src/components/login/europa-karte-daten.ts`, ~106 KB), kein Paket, keine Anfrage, keine Kosten.
- Dauerbewegung ist eine bewusste Umkehr der ersten Grilling-Entscheidung („nichts, was sich dauerhaft bewegt") — auf ausdrücklichen Wunsch, aber gezähmt: nur der Ring, 16-s-Zyklus, gestreut (nie mehr als ~3 zugleich), stoppt bei Fokus im Formular, unter 1024 px und bei `prefers-reduced-motion`.
- Nicht enthalten, weil Pilot: Passwort-Zurücksetzen, SSO, Dark Mode, Ölz-Produktfotografie. Der Fuss des Formulars beschriftet die Sackgasse („Bitte bei Metadine melden"). Nur die zwei realistischen Supabase-Fehlermeldungen sind übersetzt.
- Das Logo liegt jetzt in 900 px vor (`public/oelz-logo-hd.png`, aus dem Manual bei 600 dpi freigestellt); die Navigation nutzt weiter das alte 315-px-Bild, weil sie es klein zeigt.
