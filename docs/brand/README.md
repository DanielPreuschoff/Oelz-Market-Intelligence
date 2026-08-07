# Ölz Corporate Design — Ableitung für die Web-App

Quelle: `2023_Oelz_CD_Manual_V1_09_2023.pdf` (V1, 09/2023, 42 Seiten).
Alle Werte hier sind aus dem Manual entnommen, nicht geschätzt. Seitenangaben beziehen
sich auf die im PDF gedruckte Seitenzahl.

## Farben

| Rolle | Definition im Manual | sRGB | Seite |
|---|---|---|---|
| **Orange, Bildschirm** | „Fläche Online" — M50 / Y100 | **`#F39200`** (R243 G146 B0) | 5 |
| Orange, Druck | „Fläche Print" — M45 / Y95 | `#F59D0F` (R245 G157 B15) | 5 |
| Orange, Sonderfarben | Pantone 2012 C (gestrichen), Pantone 142 U (matt), RAL 1037 Sonnengelb | — | 5 |
| **Ölz Braun** | Pantone 477c · CMYK 45/96/100/34 · RAL 8011 Nussbraun | `#5A3A29` | 4 |
| Ölz Rot | Pantone 1795c · CMYK 15/100/100 · RAL 3000 Feuerrot | `#C1272D` | 4 |

Die beiden Hex-Werte für Orange stehen wörtlich im Manual — Seite 5 zeigt zwei
Photoshop-Farbwähler mit `f39200` bzw. `f59d0f`. **Für die App gilt `#F39200`**, weil
das Manual diesen Wert ausdrücklich als „Fläche Online" führt.

Ölz Rot ist laut Manual der Banderole im Logo vorbehalten und wird in der App nur als
`destructive` (Fehler/Löschen) verwendet, nicht als Akzentfarbe.

### Kontrast

Weiss auf Ölz-Orange erreicht nur **2.35:1** und verfehlt damit das WCAG-AA-Minimum
(4.5:1 für Fließtext, 3:1 für Grosstext). Das Manual selbst setzt weisse Schrift auf
oranger Fläche nur in Display-Größe ein — Seite 18, „VARIANTE A", bei 46 pt.

Deshalb steht Text auf oranger Fläche in der App in einem abgedunkelten Ölz-Braun
(`--oelz-on-orange`, **6.2:1**) statt in Weiss. Das betrifft den Kopfbalken, aktive
Navigationselemente und alle `bg-primary`-Buttons.

## Typografie (Seite 3)

* **Grundschriftbild: MADE Tommy Soft** — geometrische Grotesk mit weichen Enden,
  einstöckiges `a` und `g`.
* Fließtext in Anzeigen: **Regular**. Umfangreiche Texte (Broschüren): **Light**.
* Für Office/Mail (PC, Word, Outlook): **Calibri** — für die Web-App nicht relevant.

**Lizenz:** Ölz hält die kommerzielle Lizenz für MADE Tommy Soft.

Die in diesem Ordner liegenden `.otf`-Dateien sind allerdings weiterhin die
Personal-Use-Ausgaben — ein eigener, eingeschränkter Release der Foundry, nicht
die lizenzierten Dateien. **Der Dateiname sagt das nicht mehr** (der Zusatz
„PERSONAL USE" wurde entfernt), das Metadatenfeld der Schrift aber schon:

```
Copyright:  Copyright (c) 2020 by MadeType. All rights reserved.
Lizenz:     Free for personal use ONLY
```

Prüfbar mit `fontTools`: `TTFont(datei)['name'].getDebugName(13)`.

Sie decken den vollen Zeichensatz für AT/CZ/SK/SI ab
(Umlaute, ß, č/š/ž/ě/ř/ů/ľ/ô, typografische Anführungszeichen — geprüft, 354 Glyphen),
weshalb sie sich fürs Erste einbauen ließen.

Sauber ist es erst, wenn die lizenzierten Dateien von Ölz kommen. Der Tausch ist
dann ein reiner Datei-Austausch: die drei `.woff2` in `src/app/fonts/` überschreiben,
Dateinamen beibehalten, fertig. Kein Code muss angefasst werden.

## Schnitte in der App

Aus den `.otf` erzeugt (fontTools, verlustfrei) nach `src/app/fonts/`:

| Datei | Gewicht | Größe |
|---|---|---|
| `MADETommySoft-Light.woff2` | 300 | 28 KB |
| `MADETommySoft-Regular.woff2` | 400–500 | 31 KB |
| `MADETommySoft-Bold.woff2` | 600–900 | 31 KB |

Die Gewichtsbereiche sind Absicht: es existieren nur drei Schnitte, und ohne die
Bereiche würde der Browser für `font-medium`/`font-semibold` künstlich fetten.

Die Outline-Schnitte sind dekorativ und in der App nicht eingebunden.

## Wellenbogen (Seite 6–8)

Signature-Element: orange Flächen enden nicht als harte Kante, sondern laufen in einem
weichen Bogen aus. Querformat: „von OBEN schmal nach UNTEN breiter werdend", spiegelbar.
Im Manual selbst an jedem Seitenfuß eingesetzt.

In der App umgesetzt als `src/components/nav/oelz-wave.tsx` unter dem Kopfbalken.

## Umsetzung im Code

Die Werte liegen als CSS-Custom-Properties in `src/app/globals.css` und sind als
Tailwind-Utilities verfügbar: `bg-oelz-orange`, `text-oelz-braun`, `text-oelz-on-orange`,
`bg-oelz-orange-print`, `text-oelz-rot`.

`--primary` ist auf Ölz-Orange gesetzt, `--foreground` auf den Braunton-Farbwinkel.

## Nicht übernommen

Das Manual behandelt zum großen Teil Print und Office: Briefbogen, Word-/Excel-Vorlagen,
Anzeigenlayouts, Verpackung, Fuhrpark. Diese Abschnitte sind für die App ohne Belang.
