# Ölz Sortimentskontext

**Status: abgeleitet, noch nicht mit Ölz validiert.** Wie `category-taxonomy.md` und
`competitor-registry.md`. Beim nächsten Termin mit Kai Heuberger durchgehen — es ist ein
Dokument von zehn Minuten, und danach steht die Grundlage für alle KI-Prompts.

Dieses Dokument versorgt die Recherche-Prompts mit dem Wissen, das sie über Ölz brauchen,
um brauchbare Anwendungsvorschläge zu machen. Ohne es formuliert eine Deep Research
„könnte im Backwarenbereich relevant sein" statt „Laminierteig beim Croissant".

Es ist bewusst zweigeteilt: **Abschnitt 1 und 2 sind Fakten** aus dem Repo und gehen als
solche in die Prompts. **Abschnitt 3 sind Annahmen** und werden in Prompts ausdrücklich als
Annahme gekennzeichnet. Der Unterschied ist nicht formal: eine erfundene Produktkategorie
fällt sofort auf, ein erfundenes Entwicklungsproblem nicht — es kommt als plausibel
klingende Ölz-Relevanz zurück und wandert unbemerkt in ein veröffentlichtes Signal. Genau
dagegen ist die Trennung von Befund und Einschätzung gebaut.

---

## 1. Produktkategorien

Aus `docs/ui-ux-optimization-plan.md` Kap. 10 (dort als „Ölz-Produktkategorien als Filter"
vorgeschlagen, im Code noch nicht umgesetzt):

- **Croissant & Plunder**
- **Süßes Gebäck**
- **Toast & Sandwich**
- **Snack & Mini-Format**
- **Saisonal**

## 2. Produktsprache und Märkte

Begriffe, die in Ölz-Kontexten vorkommen und die eine Recherche verwenden soll statt
generischer Umschreibungen (`ui-ux-optimization-plan.md` Z. 716-718):

> Croissant, Kipferl, Laugengebäck, Gugelhupf, Striezel, Plundergebäck, Toastbrot

Selbstbeschreibung aus dem Impuls-Extraktor (`src/lib/ai/extract-impulse.ts`):

> österreichischer Premium-Bäcker: Croissants, süßes Gebäck, Convenience-Backwaren

**Märkte.** Hier widersprechen sich die Quellen, das ist beim Validieren zu klären:

| Quelle | Märkte |
|---|---|
| `supabase/seed.sql`, `competitor-registry.md` | AT (Heimatmarkt), CZ (Exportmarkt), SK, SI |
| `src/lib/ai/extract-impulse.ts`, UI/UX-Plan Kap. 10 | AT, DE, CH primär · CZ, SK, SI sekundär |

Bis zur Klärung nennen die Prompts **AT als Heimatmarkt, CZ/SK/SI als weitere Märkte** —
das ist der Stand, den die Datenbank abbildet.

---

## 3. Vermutete Entwicklungsthemen — ANNAHMEN, nicht bestätigt

Abgeleitet aus dem Sortiment und den Eigenheiten industrieller Feinbackwaren. **Keine
Aussage von Ölz.** In Prompts nur als Annahme kenntlich gemacht verwenden, und niemals als
Tatsachenbehauptung über Ölz in ein Signal übernehmen.

| Annahme | Warum plausibel | Zugehörige Funktion |
|---|---|---|
| Weichhaltung von Laminier- und Hefefeinteigen über die MHD-Dauer im LEH | Feingebäck trocknet schneller als Brot; Retouren wegen Trockenheit sind der typische Verlustposten | Frischhaltung |
| Emulgatoren als E-Nummern in der Zutatenliste, besonders im Laminierteig | E471 ist der übliche Grund, warum Croissant-Deklarationen eine E-Nummer tragen | Clean Label |
| Zuckerreduktion bei süßem Gebäck ohne Verlust von Bräunung, Volumen und Biss | Zucker ist dort nicht nur Süße, sondern Struktur- und Farbgeber | Zuckerreduktion |
| Ballaststoff- oder Proteinauslobung bei Toast ohne Krumenverdichtung | Anreicherung geht klassisch zulasten von Volumen und Mundgefühl | Ballaststoffanreicherung, Proteinanreicherung, Textur & Mundgefühl |
| Prozessstabilität beim Laminieren im Industriemaßstab | Butteranteil und Temperaturfenster sind bei hohen Durchsätzen eng | Prozessstabilität |
| Kurze Läufe und Umstellkosten bei Saisonartikeln | Saisonsortimente laufen wenige Wochen bei voller Rüstzeit | Prozessstabilität |

**Zu klären mit Ölz:** Welche dieser Themen sind real, welche fehlen, und wo liegt heute
der größte Entwicklungsdruck? Die Antwort schärft jeden Rohstoff-Prompt sofort.

---

## Verwendung

- `prompts/rohstoff-funktion.md` — Quartalslauf je funktionalem Nutzen
- `prompts/rohstoff-exploration.md` — Monatslauf mit wechselnder Linse

Beide zitieren Abschnitt 1 und 2 als Fakt und Abschnitt 3 als Annahme. Änderungen hier
wirken sich auf beide Prompts aus — die Prompts halten keine eigene Sortimentsbeschreibung.
