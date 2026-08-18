# Darstellungsmuster von Preis-, Sortiments- und Regal-Monitoring — Recherche für den Retailer-Radar

Stand: 18.08.2026 · Recherche gegen Primärquellen (Hilfe-Center, Produktseiten, Blogs, Fachdokumente); je Muster *Was · Warum · Wer zeigt es · Für Lieferantensicht geeignet?*. Grundlage für die UI-Varianten des Retailer-Radars (siehe [retailer-radar-spec.md](retailer-radar-spec.md) Abschnitt 13/14).

**Kontext:** Retailer-Radar für einen Backwaren-Markenhersteller (Sicht des Lieferanten: „Wie stellt mich der Händler hin?"). Untersucht wurden öffentliche Hilfe-Center, Produktseiten, Blogs und Fachdokumente. **Methodische Einschränkung:** Der Abruf lieferte Text (Hilfe-Artikel, Produkttexte, Alt-Texte); Produkt-Screenshots selbst waren nicht einsehbar, außer in zwei PDFs (NIQ-Distributions-Job-Aid, GS1-CM-Dossier), die als Seitenbilder gelesen wurden. Wo Layout-Aussagen aus Textbeschreibungen der Anbieter stammen, ist das so gekennzeichnet; nichts wurde aus Screenshots „geraten".

Format je Muster: **Was** (Layout/Diagramm) · **Warum** (Nutzerfrage) · **Wer zeigt es** (Beleg) · **Für Lieferantensicht geeignet?**

---

## A) Werkzeuge mit öffentlicher Doku – Ansichten, Aufbau, Einstieg

### A1. NielsenIQ Byzzer (learn.byzzer.ai) – am besten dokumentierter Report-Katalog

Byzzer ist die für die Lieferantensicht wichtigste Quelle: Es ist ein Hersteller-Tool („Focus Brand" in einer Kategorie an Händlern/Märkten), und jeder Report ist im Hilfe-Center mit Aufbau und Kennzahlen beschrieben. Report-Katalog: https://learn.byzzer.ai/en/collections/3501060-my-reports (Core, Core Advanced/„Landscapes", Smart Reports, Shopper, Omni). Eine „Scorecard"-Ansicht gibt es nicht; die Startseite ist nicht dokumentiert (Getting-Started-Artikel beschreibt nur Onboarding: https://learn.byzzer.ai/en/articles/6211711-getting-started-with-byzzer).

**Brand Ranking Report** — https://learn.byzzer.ai/en/articles/6292152-the-brand-ranking-report-where-does-your-brand-stand
- **Was:** Eine Rangliste (Tabelle) aller Marken der Kategorie, sortiert nach Umsatz; Spalten: Umsatz, Umsatz VJ, %-Änderung, % Kategorie-Distribution, Distributionsänderung, $ je Distributionspunkt (Velocity), Units, Durchschnittspreis, TDP. Zusatzklassifikation „Best in Class" = Top-20 % nach Umsatz, Wachstum und Umsatz je Distributionspunkt.
- **Warum:** „Where does your brand stand?" – wer steigt/fällt, wessen Umsatz „mask[s] weakness in other KPIs like distribution".
- **Lieferantensicht:** Ja, angepasst – im Radar ohne Umsatz: Ranking der Marken je Händler nach Anzahl gelisteter SKUs, Preisniveau, Aktionsanteil.

**Distribution Landscape** — https://learn.byzzer.ai/en/articles/6301686-the-distribution-landscape-get-the-lay-of-the-land
- **Was:** Mehrteiliges Dashboard mit frei wählbarer Reihenfolge („in the order it makes most sense to you"): Distributionsänderung des Fokusprodukts; „Focus Product % of Category Distribution"; Eigenmarken- und Neuprodukt-Distribution; Distribution nach Subkategorie (Kreisdiagramm); **„Focus Product Distribution by Retailer" (Top-10-Märkte-Tabelle)**; Fair-Share-of-Distribution-Index; Item-Ranking-Tabelle. Schwellen: „20th Percentile", „At Risk", „Average", „Best in Class".
- **Warum:** „which brands in the category are receiving their fair share of distribution, measured by percentage of category sales compared to percentage of distribution".
- **Lieferantensicht:** Ja – exakt die Frage „Ist Ölz beim Händler unter- oder überrepräsentiert?"; im Radar Distribution = Anteil an gelisteten Backwaren-SKUs.

**Price and Promotion Landscape** — https://learn.byzzer.ai/en/articles/6224487-the-price-and-promotion-landscape-is-the-price-right
- **Was:** Nichtlineares Dashboard: Focus Product Average Price (mit VJ-Abweichung), Non-Promo Price je Marke, Price by Month (Trend mit Benchmarks), Sales by Price Point (Preispunkte in 0,50-$-Schritten), % on Deal, Average Discount vs. Kategorie, Wochen mit Feature/Display, Promo-Effizienz, Sales-Decomposition (Non-Promo/Incremental/Non-Incremental).
- **Warum:** „how your pricing and promotions stack up to category averages and other leading brands".
- **Lieferantensicht:** Ja, angepasst – Regalpreis/€/kg statt Umsatz je Preispunkt; Aktionsanteil statt %-Deal-Umsatz.

**Price Position and Trend Report** — https://learn.byzzer.ai/en/articles/6224488-the-price-position-and-trend-report-the-price-is-right
- **Was:** Drei Sektionen: (1) **Balkendiagramm** Durchschnitts-, Normal- und Aktionspreis der eigenen Marke neben den Top-9-Wettbewerbern und dem Kategoriedurchschnitt; (2) **Liniendiagramm** Wochenpreis je PPG (Promoted Product Group) der Marke; (3) KPI-Tabelle je Marke/PPG mit Preis, VJ-%, **Preis-Perzentil in der Kategorie**, Everyday- und Promo-Preis.
- **Warum:** „how your pricing move[s] in line with or against the category and how pricing affects performance".
- **Lieferantensicht:** Ja – Standardmuster „Marke vs. Top-Wettbewerber vs. Kategorie" pro Händler.

**Market Opportunity Report** — https://learn.byzzer.ai/en/articles/6224485-the-market-opportunity-report-get-your-fair-share
- **Was:** Eine Tabelle, ein Markt/Händler je Zeile, sortiert nach Umsatz; Spalten: Product Sales, Share of Distribution („the portion of all items available in the category that the product represents"), $ Share, Share of Price-Discount-/Display-/Feature-Sales, **$ Opportunity** („the increase in sales if you reach your fair share of distribution"; Beispiel: 37,9 % Kategorieumsatz bei nur 18,8 % Distribution).
- **Warum:** Bekommt das Produkt je Händler die Unterstützung, die sein Umsatzanteil rechtfertigt?
- **Lieferantensicht:** Ja – die klassische Key-Account-Argumentation; ohne Abverkaufsdaten nur als Distributions-Vergleich zwischen Händlern umsetzbar.

**Retailer Landscape Report** — https://learn.byzzer.ai/en/articles/6311091-the-retailer-landscape-report-a-closer-look
- **Was:** Oben Kennzahlen: „Retailer Category $ Sales", „Retailer Category Average Price", „Category % Sales on Promotion", **„Focus Brand Share of Category at Retailer"**; darunter Shopper-Demografie (Index, 100 = alle Outlets), Leakage-Tree, Loyalitätsklassen; unten „Retailer Landscape Table" mit Kategorie- und Marken-KPIs.
- **Warum:** „whether a retailer or market is a good fit for your CPG brand".
- **Lieferantensicht:** Ja – Muster „Händlerkopf mit 4 KPIs + Detailtabelle" ist das Vorbild für eine Händlerseite im Radar.

**Private Label Share of Category** — https://learn.byzzer.ai/en/articles/6224489-the-private-label-share-of-category-report-tracking-private-brand-progress
- **Was:** Zwei Sektionen: oben Eigenmarke vs. Marken über die Kategorie, unten dasselbe je Subkategorie mit VJ-Vergleich; KPIs Units, $, Distributionspunkte/% Kategorie-Distribution.
- **Warum:** „how susceptible your category is to private brand competition"; steigende EM-Distribution „could signal an increase in future sales volume share".
- **Lieferantensicht:** Ja – Eigenmarkenanteil an gelisteten SKUs je Händler und Segment, mit Änderung.

**Competitor Comparison** — https://learn.byzzer.ai/en/articles/6208325-the-competitor-comparison-report-keeping-tabs-on-the-competition
- **Was:** Liniendiagramm Wochenumsatz je Marke, darunter Tabelle bis 10 Marken mit identischen Spalten (Umsatz, Preis, Velocity, % Promo, TDP + Änderungen); Klick auf Marke filtert. Hinweis der Doku: „change in distribution often represents the greatest threat to your position in a retailer's assortment".
- **Lieferantensicht:** Ja, angepasst.

**Promotion Execution and Performance** — https://learn.byzzer.ai/en/articles/6224495-the-promotion-execution-and-performance-report-what-s-working
- **Was:** Oben **vier KPI-Kacheln** („% Lift on Promotion", „Weeks on Promotion per PPG", „Discount on Promotion", „Promotion Efficiency"); Balken je Promo-Taktik (Marke vs. Top-10); kombiniertes Balken/Linien-Diagramm über Wochen; Wochentabelle.
- **Lieferantensicht:** Ja, reduziert – Aktionswochen/-häufigkeit und Rabatttiefe je Händler sind aus Online-Erhebung ableitbar, Lift nicht.

**Weitere Layout-Muster bei Byzzer:** Attribute Performance (Summenkacheln + Attribut-Tabelle; https://learn.byzzer.ai/en/articles/8687452-the-attribute-performance-by-category-report-what-your-category-buyers-are-buying), Sales-Decomp-Baum (hierarchischer Flow Total → Penetration/$ je HH → $ je Trip/Frequenz; https://learn.byzzer.ai/en/articles/6212436-the-shopper-sales-decomp-tree-the-best-behaviors).

### A2. Wiser (help.wiser.com)

Sammlungen: Price Intelligence (32 Artikel), Market Intelligence (39), MAP Intelligence (28), Data Quality (http://help.wiser.com/en/). Keine eigenen Artikel zu „Dashboard"/„Preisindex" in Price Intelligence (http://help.wiser.com/en/collections/2449311-price-intelligence).

**Report-Typen** — http://help.wiser.com/en/articles/13106578-choosing-the-right-report-type-all-products-my-products-historical
- **Was:** „All Products" = jede Wettbewerber-Listung eine Zeile (Audit); **„My Products" = eigenes Produkt als Zeile, „price comparisons across all competitors in one row"** (Benchmark); „Historical" = 60–90 Tage Verlauf („why price differences occurred, not just what they are").
- **Lieferantensicht:** Ja – „My Products" wird zur Matrix Ölz-SKU × Händler.

**Competitive Intelligence Tab** — http://help.wiser.com/en/articles/13057470-competitive-intelligence-tab
- **Was:** „Performance Snapshot": **Kreisdiagramm** Anteil SKUs higher/lower/matched vs. Wettbewerb + Balkendiagramm auf feinerer Ebene; Filter Product Lists/Categories/Competitors/Brands; Drilldown-Reihenfolge: Fokus wählen → Wettbewerberfilter → Charts lesen → SKU-Drilldown („from broad posture (entire catalog) to tactical insights").
- **Warum:** „are you consistently above market, below, or aligned?"
- **Lieferantensicht:** Angepasst – Anteil Ölz-SKUs teurer/gleich/günstiger als Eigenmarke bzw. Kategorie-Median je Händler.

**SKU Details Page** — http://help.wiser.com/en/articles/13105925-sku-details-page
- **Was:** Preisverlaufs-Chart (bis 90 Tage), Produktblock (SKU, UPC, eigener Preis, MAP, 60-Tage High/Low/Avg), **Wettbewerber-Tabelle** (Preis, Versand, Gesamt, Durchschnitt, Abweichung zu eigenem Preis, 60-Tage High/Low, Listenpreis, Bestandsstatus), Match-Verwaltung.
- **Lieferantensicht:** Ja – Endpunkt jedes Drilldowns: SKU × Händler mit Verlauf.

**Notifications** — http://help.wiser.com/en/articles/13111031-how-to-create-notifications (siehe C).

**Market Intelligence (Produktseite)** — https://www.wiser.com/products/market-intelligence/ und https://www.wiser.com/products/digital-shelf-intelligence/
- **Was (Textbeschreibung):** Dashboards „Pricing & Promotions", „Out-Of-Stocks" (missing, incorrectly listed, failing to launch, je Händler), „Ratings & Reviews" je Händler, „Historical"; Kennzahlen: Verteilung der Produkte über **Preisstufen entry/mid/premium**, Sortimentstiefe je Händler („retailer investment levels"), Brand-Momentum; Weg „from market insight to SKU-level action".
- **Lieferantensicht:** Ja – Preisstufen-Verteilung und Sortimentstiefe je Händler sind Lieferanten-Fragen. Wiser CPG-Seite (https://www.wiser.com/shelf-intelligence/) enthält keine Layout-Beschreibungen.

### A3. Prisync

- **Dashboard** — https://intercom.help/prisync/en/articles/9891261-what-do-i-see-on-the-dashboard (Hilfe-Spiegel; helpcenter.prisync.com liefert 403)
  - **Was:** Sechs Blöcke von oben nach unten: (1) Tracking Summary (Anzahl Produkte/Marken/Kategorien), (2) **drei Kennzahl-Karten**: Price Changes, Out of Stock, Index, (3) Price Position (Stufen „cheapest, average, highest"), (4) Sites Summary (Tabelle: Website, Anzahl gebenchmarkter Produkte, Index je Site), (5) **Historical Index Chart** (Liniendiagramm Index je Website über Zeit, Legende zum Ein-/Ausblenden), (6) Related Articles.
  - **Warum:** Von Summen-KPIs oben zu Analyse unten; „wo stehe ich preislich gegen jede Site?".
- **Price Position** — https://prisync.com/features/price-positioning-comparison/ (Hilfeartikel https://helpcenter.prisync.com/hc/en-us/articles/213516025-Price-Position: 403; Suchauszug nennt Kreisdiagramm und Klick auf Position → Produktliste)
  - **Was:** Kategorisierung eigener Produkte in cheapest/average/highest gegenüber gewählter Wettbewerbergruppe, Klick → Produktliste.
  - **Lieferantensicht:** Angepasst – Positionsklassen für Ölz-SKUs innerhalb des Händlersortiments (günstigster/mittlerer/teuerster Anbieter im Segment).
- **Daily Price Change E-Mail** — https://prisync.com/features/daily-price-change-notifications/ (siehe C).

### A4. Competera

- **Price Index Tutorials** — https://competera.ai/resources/use-cases/price-index-tutorials
  - **Was:** Index auf Basis von „pricing pairs" (Produkte, die eigener Shop und Wettbewerber führen) und „pricing basket"; je Paar Prozentverhältnis eigener Preis/Wettbewerberpreis, gemittelt über Produkte und Wettbewerber; **Liniendiagramm** Preisposition über Zeit (eigener Shop grün gestrichelt, Marktdurchschnitt blau); Filter Wettbewerber/Kategorien/Marken/KVI; Vergleichsdiagramme für Wettbewerber mit maximaler/minimaler Differenz.
  - **Warum:** „How does your pricing correlate with market prices? … Which competitors materially influence your sales?"
  - **Lieferantensicht:** Händlerlogik (eigener Shop vs. Markt). Übertragbar als „Ölz-Preisindex je Händler vs. Ölz-Durchschnitt aller Händler" oder vs. Eigenmarke.
- Produktseite Preis-Monitoring nennt „prices, promotions, and availability in one view", Price-Change-Alerts, KVI – keine Layoutangaben (https://competera.ai/solutions/by-need/price-monitoring-software). Blog-Übersicht: 404 (https://competera.ai/blog).

### A5. XPLN

- Startseite listet Module (Data Steward, Live Tracker, Shelf Shifter, Gatekeeper, Judgment Day, Pure Data, Fight Club, Benchmarker): https://www.xpln.com/
- **Benchmarker** — https://www.xpln.com/solutions/benchmarker
  - **Was (Text):** Zwei Dashboards: **„Brand Dashboard"** (Sortimentsvergleich auf Markenebene) und **„Retailer Dashboard"** (Portfoliovergleich auf Händlerebene); Kennzahlen: Anzahl Items, NOS-Produkte, Preispunkte, Rabatte, Versand, Rankings, Ratings, Verfügbarkeit; Sortimentstrends: „Product additions, removals, bestsellers, exclusive offerings"; Vergleich über Kategorien.
  - **Lieferantensicht:** Ja – die Dualität Marke/Händler ist genau die Radar-Struktur; „additions/removals" = Listung/Auslistung.
- **Gatekeeper** — https://www.xpln.com/solutions/gatekeeper: Preisstatus, MAP/UVP-Verstöße, Rabattniveaus, „suspicious activity notifications"; nur Tablet-Mockup, keine Chart-Beschreibung. **Fight Club** (https://www.xpln.com/solutions/fight-club): nur Marketingtext.

### A6. Flywheel (Edge by Ascential / Retail Insight aufgegangen)

- https://www.flywheeldigital.com/market-intelligence und https://www.flywheeldigital.com/solution/analyze-digital-shelf-and-sales-performance-relative-to-category-competitors
  - **Was (Text):** „Market Share Dashboard" (wöchentlich, Item-Ebene, Umsatz und Anteil); „Digital Shelf Dashboard" (Share of Voice organisch/paid, Verfügbarkeit, Preis, Ratings, **Suchbegriffe je Händler**, Content-Compliance); „Retail Market Monitor Dashboards" (Händler/Kategorie/Markt, historisches Benchmarking + 5-Jahres-Prognose). Kein „Retailer Scorecard" auf den Seiten. Seite „Edge Retail Insight": 404 nach Redirect.
  - **Lieferantensicht:** Ja (Digital-Shelf-Dashboard ist Markenlogik), aber Suche/SoV sind für den Radar nachrangig.

### A7. Trax

- Blogs: https://traxretail.com/blog/from-gut-feel-to-data-driven-how-shelf-intelligence-is-reshaping-retail-execution/ (KPIs OSA, Planogramm-Compliance, Platzierung, **Share of Shelf**, Wettbewerberaktivität; „instant visibility"), https://traxretail.com/blog/use-share-shelf-data-identify-growth-opportunities/ (SOS nach Facings oder Regalmetern; Vergleich mit EPoS: „getting their fair share of shelf space compared to the contribution they make to category sales"), https://traxretail.com/blog/3-ways-to-improve-promotion-analysis-using-shelf-intelligence/ (**BI-Dashboards mit Ampelfarben**, die Promo-Präsenz der Marke vs. Wettbewerber über Regionen/Kanäle/Storetypen vergleichen; Compliance-Lücke je Marke und Store).
- Produktseiten ohne Layoutangaben (https://traxretail.com/solutions/trax-retail-watch/, https://traxretail.com/blog/how-to-optimize-your-category-assortment-using-shelf-data/).
- **Lieferantensicht:** Ja (Trax ist Herstellerwerkzeug), aber physisches Regal; übertragbar: **„Share of Assortment"** (Anteil Ölz an gelisteten SKUs) statt Regalmeter, Ampelmatrix Händler × KPI.

### A8. Circana Unify+ / Liquid Data Go

- Produktseiten lieferten keinen Inhalt (truncated/404): https://www.circana.com/solutions/unify-plus, https://www.circana.com/solutions/liquid-data-go, https://www.circana.com/solution-areas/technology, https://www.circana.com/unifyplus/. Ersatzquellen: App-Store-Text (https://apps.apple.com/us/app/circana-unify/id1391756057): „Reports & Dashboards", „Alerts & Predictive Insights", Kollaborationskanäle; ZA-Seite (https://www.circana.com/za/solutions/liquid-data-go): „on-demand and unlimited reporting stories", Vergleich von Händler-Rankings. **„Performance Narratives"** sind nur als Feature-Name belegt (Suchauszug der Unify+-Seite: „Data alerts and performance narratives"), Layout nicht.

### A9. Weitere Preisvergleichs-Werkzeuge

- **Price2Spy** — Price Matrix: https://www.price2spy.com/blog/new-report-released-price-matrix/ (**X-Achse = überwachte Sites, Y-Achse = Produkte; grün = niedrigster, rot = höchster Preis; bei Gleichstand keine Farbe**; Screenshot bewusst geblurrt); %-Änderung: https://www.price2spy.com/blog/price-matrix-report-price-change-percentage/ (**zusätzliche Spalte je Site „difference between previous and current prices"**, wahlweise Preis + % nebeneinander; 0 % = unverändert, leer = keine Vormessung); Dashboard: https://www.price2spy.com/pricing-dashboard.html (Widgets: „Pricing Dynamics" – Listen Produkte mit Preisanstieg/-senkung/unverändert; „Stock Dynamics"; „Pricing Landscape" – cheapest/most expensive/below/above average; „Price Index" 100 = Durchschnitt; „Product History Chart" mit MAP-Verstößen in Orange; „Assortment Coverage" – aktive URLs je Site; „Product Price Distribution").
- **Minderest (Brands/Manufacturers)** — https://www.minderest.com/brands-manufacturers: MAP/UVP-Dashboard, **Content-Compliance-% je Händler**, Wettbewerbspositionierung mit „simple colour coding … same, above, or below", **Katalog-/Sortimentsreports je Händler** („each retailer's entire catalogue … if your competitors have more items listed"), Distributionskanal-Karte. Keine Chart-Details.
- **Dealavo** — Preisindex-Formel = eigener Preis ÷ Ø Wettbewerberpreis × 100 (https://dealavo.com/en/price-index-formula/); „Segments"-Tab mit Graphen je Kategorie vs. jeden Wettbewerber, Verfügbarkeit, Historie; Freshdesk-Artikel zum Dashboard beschreibt nur zwei GA-gekoppelte Charts (https://dealavo.freshdesk.com/en/support/solutions/articles/204000073700-dashboard-sales-data).
- **Pricer24** — https://pricer24.com/price-monitoring-tool/: Price Comparison „in a table, pie chart, or bar chart", Price History „as a graph", außerdem Price Fluctuations, Market Analysis, Assortment Analysis, MAP-Historie; Reports als Widgets pinnbar.
- **Omnia Retail** — Produktseite ohne Layouts (https://www.omniaretail.com/price-monitoring-software); Hilfeseite hinter Login (https://help.omniaretail.com/dashboard). Der Suchauszug der Hilfeseite (nicht direkt verifiziert) beschreibt zwei Dashboards: Preisvergleich je Shop als Anteile lower/equal/higher in drei Lila-Abstufungen und „overlap rate" der Top-20-Seller.
- **PriceShape** — nur Marketingaussagen zu anpassbaren Widget-Dashboards (Suchergebnisse), keine Doku abgerufen.
- **Profitero** — Produktseite ohne Layouts (https://www.profitero.com/product/digital-shelf); Case Study: **Scorecards mit vier KPIs** „in-stock availability, share of search, star rating and reviews count, and product content quality", länderspezifisch, „60+ retailers" täglich, „monthly" für Leadership (https://www.profitero.com/case-studies/cpg); Search-Metriken-Blog mit Balkendiagrammen (Page-1-Präsenz, Rangposition, Top-10-Anteil, Keyword-Coverage) (https://www.profitero.com/blog/search-metrics-that-matter).
- **DataWeave** — Metrik-Guide (https://dataweave.com/blog/a-guide-to-digital-shelf-metrics-for-consumer-brands): Share of Search als **Balkendiagramme** (organisch vs. sponsored, je Marke/Händler/Keyword, Trend), Content-Scorecards, Pricing „split by price groups, brands, and regional variants", Availability als Graphen mit „automated stockout alerts"; Produktseite (https://dataweave.com/us/digital-shelf-analytics) ohne Layout.
- **Intelligence Node** — https://www.intelligencenode.com/solutions/by-need/digital-shelf-analytics/: Content-Audits, Preis-/Bestands-Alerts, MAP-Alerts, Review-Dashboard mit Keyword-Clouds; kein Layout.
- **e.fundamentals** (Digital Shelf Scorecard, https://www.efundamentals.com/digital-shelf-scorecards-2/): „a rolled up view of your brand's global health", Fragen „How are critical KPIs performing month-over-month? Where should teams focus?", Filter Händler/Kategorie/Marke, Drilldown von Roll-up zu Treibern.

**Zusammenfassung Einstiegsseiten (belegt):** Prisync = Summen-KPIs → drei Kennzahl-Karten → Positionsklassen → Site-Tabelle → Index-Zeitreihe; Price2Spy = frei konfigurierbare Widget-Wand mit Änderungs-Listen; Byzzer = Report-Katalog + wöchentliche Alerts; Wiser = Report-Typen (Zeile = Produkt oder Listung) + „Performance Snapshot" (Kreis + Balken) mit Drilldown zu SKU-Details.

---

## B) Category-Management-Standardgrafiken

**B1. Distributionsgrad (numerisch / gewichtet / TDP)**
- **Was:** NIQ-Job-Aid (PDF gelesen): numerische Distribution = % Geschäfte mit dem Artikel; gewichtete Distribution (%ACV) gewichtet die Geschäfte mit ihrem Gesamtumsatz („stores that sell more matter more"); **TDP** = Summe der gewichteten Distribution aller Items einer Marke („breadth and depth"); TDP ÷ %ACV = durchschnittliche Anzahl geführter Items. Grafik im PDF: Häuschen-Piktogramme (führend/nicht führend, Größe = Gewicht) und Tabelle Marke × (%ACV, # Items, TDP).
- **Warum:** „Does my item have its fair share of distribution?", „Did new items/line extensions add to a brand? Are they being swapped out?" (Business-Fragen im PDF).
- **Wer:** https://nielseniq.com/wp-content/uploads/sites/4/2021/02/measuring-and-improving-your-business-with-distribution-data.pdf; Byzzer nutzt TDP/„% of Category Distribution" durchgängig.
- **Lieferantensicht:** Ja, angepasst – im Online-Radar: „gelistet ja/nein je Händler" (numerisch über Händler) und Anzahl Ölz-SKUs je Händler (Tiefe, TDP-Analogon).

**B2. Preisindex / Preisposition**
- **Was:** Index = Ø Preis Marke ÷ Ø Preis Kategorie × 100; „80 … 20 % cheaper than the category average". Darstellungen: Balken Marke vs. Top-Wettbewerber vs. Kategorie (Byzzer), Preis-Perzentil-Tabelle (Byzzer Smart Alert), Index-Zeitreihe je Site (Prisync, Competera), Kreis/Balken „higher/same/lower" (Wiser).
- **Wer:** https://microsites.nielseniq.com/cpg-dictionary/dictionary/price-index-to-category-average/; Byzzer, Prisync, Competera, Dealavo, Price2Spy (s. o.).
- **Lieferantensicht:** Ja – aber Referenz wechseln: statt „mein Shop vs. Markt" → „Ölz vs. Kategorie-Ø / Eigenmarke / Hauptwettbewerber je Händler", zusätzlich Ölz-Preis Händler A vs. Ölz-Ø aller Händler.

**B3. Preisleiter (Price Ladder)**
- **Was:** „The deliberate sequence of price points that helps customers compare products within a category, subcategory, brand family, size range, quality tier" (Umbrex-Playbook, kein Diagrammtyp spezifiziert; Datenbedarf: Preise je Tier, Grundpreise je Packgröße, Wettbewerberpreise, Aktionsmechanik). Competera: Good-Better-Best, „around 40 % separates each rung". Nächstliegende Werkzeug-Umsetzung: Byzzer „Sales by Price Point" (Preispunkte in 0,50-$-Schritten) und Wiser „entry/mid/premium"-Verteilung.
- **Warum:** Sind Preisrelationen im Sortiment logisch (Einstieg → Mitte → Premium)? Wo sitzt die Marke relativ zur Eigenmarke?
- **Wer:** https://umbrex.com/resources/retail-industry-playbooks/retail-pricing-architecture-playbook/price-ladders-good-better-best-pack-price-strategy/; https://competera.ai/resources/articles/maximizing-revenue-with-retail-pricing-ladders
- **Lieferantensicht:** Ja – als sortierte €/kg-Leiter je Händler-Segment (Toast, Croissant, süßes Gebäck) mit Markierung Ölz/EM/Wettbewerber.

**B4. Fair-Share-Analyse / Fair Share Index**
- **Was:** „FSI (for a brand or segment) = Tactic share ÷ Dollar share", 100 = fair; „tactic share" = Anteil an Regal, Sortiment, Display oder Feature. Darstellung als Index (100-Linie) bzw. Gegenüberstellung Anteil-Sortiment vs. Anteil-Umsatz (Byzzer Distribution Alert: „Distribution Share" vs. „Share of Sales" mit Punktänderung VJ und Top-/Bottom-3-Märkte).
- **Warum:** „Is a brand receiving support proportional to its sales contribution?"; Byzzer: „whether you are under or over distributed in the market".
- **Wer:** https://blog.cmkg.org/blog/category-development-index-calculation_fair-share-index-calculation; https://seeklear.com/i-want-my-fair-share-category-management-fair-share-index-explained/ (Beispiel 25 % Anteil bei 35 % Benchmark → FSI 71,4); Byzzer Distribution Landscape/Market Opportunity/Distribution Alert.
- **Lieferantensicht:** Ja – Kernargument des Key Accounts; im Radar ohne Umsatz nur als Sortimentsanteil-Vergleich zwischen Händlern (Referenz z. B. Ölz-Anteil im Händler-Ø oder Marktanteil aus Panel).

**B5. Regalanteil vs. Umsatzanteil (Share of Shelf vs. Share of Sales)**
- **Was:** SOS nach Facings („how many facings … compared to the total number of facings") oder Regalmetern; Gegenüberstellung mit EPoS-Anteil, um „under-spaced or over-spaced" zu erkennen; Trax nennt für Promo-Compliance ampelfarbige Dashboards je Marke × Region/Kanal/Storetyp.
- **Wer:** https://traxretail.com/blog/use-share-shelf-data-identify-growth-opportunities/; https://traxretail.com/blog/3-ways-to-improve-promotion-analysis-using-shelf-intelligence/
- **Lieferantensicht:** Ja, angepasst – online kein Regal; Ersatz „Anteil an gelisteten SKUs" (Share of Assortment); Ampel-Matrix übernehmbar.

**B6. Preisabstand Marke vs. Eigenmarke**
- **Was:** cmkg: 52-Wochen-Vergleich der Wochenpreise; **Streudiagramm** X = äquivalenter Volumenpreis (nicht Stückpreis), Y = wahrgenommener Wert; Tiers farblich (Value orange, Mid blau, Premium grün), Eigenmarke gelb, Marke rot; Ziel „determine what the price gap threshold should be". Circana-Zahl (Sekundärquelle FoodNavigator, Europa-6): Preisabstand EM/Marke „22 %", Marken 34 % Units in Promotion vs. EM 14 %. LZ-Chart „Preisabstand … geschrumpft" nur als Paywall-Teaser sichtbar.
- **Wer:** https://blog.cmkg.org/blog/private-label-pricing-analysis; https://www.foodnavigator.com/Article/2024/05/03/Why-is-the-price-gap-between-private-labels-and-national-brands-narrowing/; https://www.lebensmittelzeitung.net/handel/charts/analyse-haendler-lassen-bei-marken-kaum-preiserhoehungen-zu-165425 (Paywall)
- **Lieferantensicht:** Ja – Preisabstand Ölz vs. EM in % je Händler und Segment (auf €/kg), als Zeitreihe; wichtiger als absoluter Preisindex.

**B7. Sortimentsbaum / Kaufentscheidungsbaum**
- **Was:** GS1-Dossier: 8-Schritte-CM-Prozess (Kategorie-Definition auf Basis des Kaufentscheidungsprozesses; Taktiken „Sortiment, Platzierung, Promotion und Kommunikation"; Hersteller geben „Empfehlungen … (z. B. Ein- oder Auslistung, Platzierung)"); Hoffrogge-Beitrag nennt „Category Decision Tree (CDT)" als Gruppierungsbasis. Baumlayout in Werkzeugen: Byzzer Sales-Decomp-Tree (Knoten mit VJ-% und Beitrag), Distribution nach Subkategorie als Kreisdiagramm.
- **Wer:** https://www.gs1-germany.de/fileadmin/gs1/Themen/shopper-experience/Downloads/gs1-germany-category-management-dossier.pdf (S. 8–9, 14, 23); Byzzer (s. o.). ECR-„CatMan2000"-PDF war zu groß für den Abruf.
- **Lieferantensicht:** Ja – Baum Backwaren → Segment → Marke/EM je Händler mit SKU-Zahl und Δ.

**B8. Promo-Kalender / Aktionsheatmap**
- **Was:** In den Quellen als Wochenzeitreihe umgesetzt: Byzzer Promotion Execution (Kacheln „Weeks on Promotion per PPG", „Discount on Promotion"; Balken/Linie je Woche; Wochentabelle), Byzzer P&P Landscape (Feature-/Display-Wochen), Numerator Promo-Shift-Dashboard (monatliches Promo-Volumen vs. VJ, TPR-Trend, Anteil EM vs. Marke an Ad-Blocks). Eine explizite Kalender-Heatmap „Händler × Woche" ist bei den geprüften Anbietern nicht öffentlich dokumentiert.
- **Wer:** https://learn.byzzer.ai/en/articles/6224495-the-promotion-execution-and-performance-report-what-s-working; https://www.numerator.com/promo-shift-dashboard/
- **Lieferantensicht:** Ja – Raster Händler × Monat mit „Ölz in Aktion / Wettbewerber in Aktion / EM in Aktion", Rabatttiefe als Farbe.

---

## C) Ereignis- und Alert-Darstellung

- **Wöchentlicher E-Mail-Digest je Themenalert (Byzzer):** 11 Alert-Typen (https://learn.byzzer.ai/en/collections/3501061-alerts). Distribution Alert: dienstags per Mail, „Distribution Share" vs. „Share of Sales", Punktänderung vs. VJ, **Top- und Bottom-3-Märkte** nach Distributionsgewinn/-verlust (https://learn.byzzer.ai/en/articles/6301662-meet-the-distribution-alert). Pricing Alert: Ø-Preis, Everyday-Preis + Δ, Promo-Preis + Δ, % Umsatz in Promotion, Price Ratio – „at-a-glance snapshot", welche Wettbewerber „most aggressively" verändert haben (https://learn.byzzer.ai/en/articles/6301673-meet-the-pricing-alert). Smart Price Position Trend Alert: E-Mail-Highlights in **vier Sektionen** (höchste/niedrigste Preis-Perzentile, größte Anstiege, Wettbewerberpositionen), **Änderung vs. 7-Wochen-Durchschnitt**, Link zum vollständigen Report (https://learn.byzzer.ai/en/articles/6206279-meet-the-smart-price-position-trend-alert). → Muster: *Highlights in der Mail, Detail im Tool.*
- **Tägliche Preisänderungs-Mail (Prisync):** Produktnamen, eigene Preise, Marktposition (cheapest/average/highest), günstigste/teuerste Website, Bestandsänderungen; täglich oder 3×/Tag; Schwellenwert ab Premium (https://prisync.com/features/daily-price-change-notifications/).
- **Konfigurierbare Benachrichtigungen (Wiser):** „Top Price Changes", MAP-Verstöße, „Report ready"; täglich oder je Crawl; Scope Kategorie/Produktliste; Filter (OOS ausschließen usw.); Doku nennt keine explizite Vorher/Nachher-Darstellung (http://help.wiser.com/en/articles/13111031-how-to-create-notifications).
- **Vorher/Nachher als Tabellenspalte (Price2Spy):** Price Matrix mit **%-Spalte je Site „previous vs. current"**, wahlweise Preis + % nebeneinander; Dashboard-Widget „Pricing Dynamics" = klickbare Listen „increased / dropped / no change" im Zeitraum, „Stock Dynamics" = in/aus Bestand (https://www.price2spy.com/blog/price-matrix-report-price-change-percentage/, https://www.price2spy.com/pricing-dashboard.html).
- **Vorher/Nachher als Kontext (Wiser SKU Details):** aktueller Preis neben 60-Tage High/Low/Avg und Abweichung zu eigenem Preis; Verlaufschart 90 Tage (http://help.wiser.com/en/articles/13105925-sku-details-page).
- **Sortimentsereignisse:** XPLN Benchmarker „product additions, removals" (https://www.xpln.com/solutions/benchmarker); Wiser MI „missing, incorrectly listed, or failing to launch" je Händler (https://www.wiser.com/products/market-intelligence/); Minderest Katalogvergleich je Händler; DataWeave „automated stockout alerts"; Circana Unify+ „Alerts & Predictive Insights" (App-Store-Text).
- **Nicht gefunden:** Ein öffentlich dokumentierter *Ereignis-Feed/Zeitstrahl* mit Badges (z. B. „neu gelistet", „ausgelistet") als UI-Element. Die dokumentierten Muster sind (a) Mail-Digest mit Highlights + Link, (b) Änderungslisten als Widget, (c) Δ-Spalten in Matrix/Tabelle, (d) Verlaufschart mit Markierungen (MAP-Verstöße orange bei Price2Spy).
- **Lieferantensicht:** Alle vier Muster geeignet; für monatliche Erhebung: Digest je Erhebung mit „Top-3-Händler mit Zuwachs/Verlust an Ölz-Listungen", Δ-Spalte in der SKU×Händler-Matrix, Ereignisliste je Händler.

---

## D) Muster für die Lieferantensicht („Brand at Retailer") und Händler-Scorecards

- **Explizite Brand-at-Retailer-Reports:** Byzzer Retailer Landscape (Kopf: Händler-Kategorieumsatz, Ø-Preis, % Umsatz in Promotion, **„Focus Brand Share of Category at Retailer"**; Detailtabelle Kategorie- und Marken-KPIs); Distribution Landscape („Focus Product Distribution by Retailer", Top-10-Tabelle); Market Opportunity (Zeile = Markt/Händler, Spalten Anteil Distribution/Umsatz/Feature/Display, $ Opportunity). XPLN Benchmarker mit getrennten Brand- und Retailer-Dashboards. Minderest: Content-Compliance-% je Händler, Katalog je Händler. Profitero: länderspezifische Scorecards über 60+ Händler.
- **Händler-Scorecard-Aufbau (belegte KPI-Sätze):**
  - Profitero: in-stock availability, share of search, star rating & reviews count, content quality (4 KPIs; täglich lokal, monatlich Leadership) – https://www.profitero.com/case-studies/cpg
  - e.fundamentals: Verfügbarkeit, Bild-/Namens-Compliance, Search (branded/sponsored/organic), Ratings & Reviews, Preis-/Promo-Compliance; Roll-up mit MoM-Vergleich, Filter Händler/Kategorie/Marke – https://www.efundamentals.com/digital-shelf-scorecards-2/
  - DataWeave: SoS, Share of Media, Content, Pricing & Promotions, Availability, Ratings – https://dataweave.com/blog/a-guide-to-digital-shelf-metrics-for-consumer-brands
  - Byzzer Retailer Landscape (oben): Kategorieumsatz, Ø-Preis, % Promo, Markenanteil – https://learn.byzzer.ai/en/articles/6311091-the-retailer-landscape-report-a-closer-look
  - NIQ Digital Shelf: „customised scorecard … rapid daily or weekly analysis summary" – https://nielseniq.com/global/en/insights/analysis/2022/how-to-win-on-the-digital-shelf/
  - CommerceIQ: „80+ KPIs filterable by seller type, sub-brand, category or keyword" ohne Layout – https://www.commerceiq.ai/blog/customizable-scorecards-reporting-in-digital-shelf-optimization
- **Händlerlogik, die für den Radar NICHT passt:** eigener Shop vs. Markt (Prisync/Competera/Dealavo/Omnia-Index), Repricing-Empfehlungen (Price2Spy „Clever Drop/Raise"), Buy-Box, Overlap-Rate zwischen Shops (Omnia). **Angepasst übernehmbar:** Preismatrix (Sites → Händler), Positionsklassen (günstigster/mittlerer/teuerster → Ölz relativ zum Segment), Index-Zeitreihe (Referenz wechseln), Assortment-Coverage-Widget (aktive URLs je Site → gelistete Ölz-SKUs je Händler).

---

## Priorisierte Muster für den Retailer-Radar (Kette × Land, monatlich, Lieferantensicht)

1. **Händler-Kachelreihe (4–6 KPIs) als Einstieg** – je Händler: gelistete Ölz-SKUs (+Δ), Anteil Ölz an Backwaren-SKUs (Share of Assortment), Ø €/kg-Index Ölz vs. Segment, Preisabstand zu EM, Aktionsanteil Ölz, Ereignisse im Monat. Belegt: Byzzer Retailer Landscape (Kopf-KPIs), Profitero-Scorecard (4 KPIs), Prisync (drei Kennzahl-Karten oben). Begründung: alle Quellen beginnen mit Summen-KPIs und drillen zur SKU.
2. **Preismatrix Ölz-SKU × Händler** (Regalpreis und €/kg, grün/rot günstigster/teuerster Händler, Δ-Spalte zum Vormonat) – Price2Spy Price Matrix + %-Spalte, Wiser „My Products". Beantwortet „Wo bin ich am teuersten/günstigsten hingestellt?" auf einen Blick.
3. **Preisleiter je Händler-Segment** (sortierte €/kg-Balken aller Backwaren des Segments, Ölz/EM/Wettbewerber farblich) – Byzzer Price Position (Marke vs. Top-9 vs. Kategorie), Umbrex/Competera Ladder-Logik, Wiser Preisstufen. Zeigt Position relativ zur Eigenmarke, nicht nur Index.
4. **Preisabstand Ölz vs. Eigenmarke in %** je Händler/Segment als Zeitreihe – cmkg-Analyse, Circana-Kennzahl; wichtigste einzelne Kennzahl für Marke-vs-EM-Diskussion.
5. **Fair-Share-/Distributionsvergleich über Händler** (Anteil Ölz an Listungen je Händler vs. Referenz, Index 100, Top-/Bottom-Händler) – Byzzer Distribution Landscape/Alert, cmkg FSI, NIQ-Distributions-Logik (Breite = gelistet ja/nein, Tiefe = SKU-Zahl).
6. **Ereignis-Digest je Erhebung + Änderungslisten** (Neu-/Aus-/Wiederlistung, Preisänderung mit alt→neu, neue EM, Ölz in Aktion; „Top-3-Händler mit Zuwachs/Verlust") – Byzzer-Alert-Muster (Highlights + Link), Price2Spy Pricing/Stock Dynamics, Prisync Daily Mail.
7. **Aktionsraster Händler × Monat** (Ölz/Wettbewerb/EM in Aktion, Rabatttiefe als Farbe) – Byzzer „Weeks on Promotion"/Discount-Kacheln, Trax-Ampelmatrix. Beantwortet „Wo und wie oft werde ich beworben?".
8. **Sortimentsbaum je Händler** (Backwaren → Segment → Marke/EM, SKU-Zahl und Δ) – GS1/ECR CDT-Prinzip, Byzzer Subkategorie-Kreis und Baum-Layout, XPLN Benchmarker additions/removals. Beantwortet „Wo baut der Händler EM aus, wo verliere ich Tiefe?".
9. **SKU × Händler-Detailseite mit Preisverlauf** (High/Low/Ø, Aktionsmarkierungen, Listungsstatus-Historie) – Wiser SKU Details, Price2Spy History Chart. Endpunkt jedes Drilldowns.
10. **Positionsklassen-Verteilung** (Anteil Ölz-SKUs „günstiger/gleich/teurer" als EM bzw. Segment-Median je Händler, Kreis/Balken mit Klick zur Liste) – Wiser Performance Snapshot, Prisync Price Position. Schnelle Lesart der Preisposition ohne Index-Interpretation.

Empfohlene Drilldown-Reihenfolge (aus Wiser/Byzzer/Prisync abgeleitet): Portfolio (alle Händler, Kacheln + Matrix) → Händler (Scorecard, Baum, Preisleiter, Ereignisse) → Segment → SKU-Detail.

---

## Abgerufene URLs (Inhalt erhalten)

Byzzer: https://learn.byzzer.ai/ · https://learn.byzzer.ai/en/collections/3501060-my-reports · https://learn.byzzer.ai/en/articles/6292152-the-brand-ranking-report-where-does-your-brand-stand · https://learn.byzzer.ai/en/articles/6301686-the-distribution-landscape-get-the-lay-of-the-land · https://learn.byzzer.ai/en/articles/6224487-the-price-and-promotion-landscape-is-the-price-right · https://learn.byzzer.ai/en/articles/6224488-the-price-position-and-trend-report-the-price-is-right · https://learn.byzzer.ai/en/articles/6224485-the-market-opportunity-report-get-your-fair-share · https://learn.byzzer.ai/en/articles/6311091-the-retailer-landscape-report-a-closer-look · https://learn.byzzer.ai/en/articles/6224489-the-private-label-share-of-category-report-tracking-private-brand-progress · https://learn.byzzer.ai/en/articles/6208325-the-competitor-comparison-report-keeping-tabs-on-the-competition · https://learn.byzzer.ai/en/articles/6224495-the-promotion-execution-and-performance-report-what-s-working · https://learn.byzzer.ai/en/articles/8687452-the-attribute-performance-by-category-report-what-your-category-buyers-are-buying · https://learn.byzzer.ai/en/articles/6212436-the-shopper-sales-decomp-tree-the-best-behaviors · https://learn.byzzer.ai/en/articles/6211711-getting-started-with-byzzer · https://learn.byzzer.ai/en/collections/3501061-alerts · https://learn.byzzer.ai/en/articles/6301662-meet-the-distribution-alert · https://learn.byzzer.ai/en/articles/6301673-meet-the-pricing-alert · https://learn.byzzer.ai/en/articles/6206279-meet-the-smart-price-position-trend-alert

Wiser: http://help.wiser.com/en/ · http://help.wiser.com/en/collections/2449311-price-intelligence · http://help.wiser.com/en/articles/13105925-sku-details-page · http://help.wiser.com/en/articles/13057470-competitive-intelligence-tab · http://help.wiser.com/en/articles/13106578-choosing-the-right-report-type-all-products-my-products-historical · http://help.wiser.com/en/articles/13111031-how-to-create-notifications · https://www.wiser.com/products/market-intelligence/ · https://www.wiser.com/products/digital-shelf-intelligence/ · https://www.wiser.com/shelf-intelligence/

Prisync: https://intercom.help/prisync/en/articles/9891261-what-do-i-see-on-the-dashboard · https://prisync.com/features/daily-price-change-notifications/ · https://prisync.com/features/price-positioning-comparison/

Competera: https://competera.ai/resources/use-cases/price-index-tutorials · https://competera.ai/solutions/by-need/price-monitoring-software · https://competera.ai/resources/articles/maximizing-revenue-with-retail-pricing-ladders

XPLN: https://www.xpln.com/ · https://www.xpln.com/solutions/benchmarker · https://www.xpln.com/solutions/gatekeeper · https://www.xpln.com/solutions/fight-club

Flywheel: https://www.flywheeldigital.com/market-intelligence · https://www.flywheeldigital.com/solution/analyze-digital-shelf-and-sales-performance-relative-to-category-competitors

Trax: https://traxretail.com/blog/from-gut-feel-to-data-driven-how-shelf-intelligence-is-reshaping-retail-execution/ · https://traxretail.com/blog/use-share-shelf-data-identify-growth-opportunities/ · https://traxretail.com/blog/3-ways-to-improve-promotion-analysis-using-shelf-intelligence/ · https://traxretail.com/blog/how-to-optimize-your-category-assortment-using-shelf-data/ (ohne Layoutangaben) · https://traxretail.com/solutions/trax-retail-watch/ (ohne Layoutangaben)

Circana: https://www.circana.com/za/solutions/liquid-data-go · https://apps.apple.com/us/app/circana-unify/id1391756057

Weitere Anbieter: https://www.price2spy.com/blog/new-report-released-price-matrix/ · https://www.price2spy.com/blog/price-matrix-report-price-change-percentage/ · https://www.price2spy.com/pricing-dashboard.html · https://www.profitero.com/product/digital-shelf · https://www.profitero.com/blog/search-metrics-that-matter · https://www.profitero.com/case-studies/cpg · https://www.minderest.com/brands-manufacturers · https://dealavo.com/en/price-index-formula/ · https://dealavo.freshdesk.com/en/support/solutions/articles/204000073700-dashboard-sales-data · https://dataweave.com/blog/a-guide-to-digital-shelf-metrics-for-consumer-brands · https://dataweave.com/us/digital-shelf-analytics · https://www.intelligencenode.com/solutions/by-need/digital-shelf-analytics/ · https://pricer24.com/price-monitoring-tool/ · https://www.omniaretail.com/price-monitoring-software · https://www.efundamentals.com/digital-shelf-scorecards-2/ · https://www.commerceiq.ai/blog/customizable-scorecards-reporting-in-digital-shelf-optimization · https://www.pricespider.com/blog/digital-shelf-analytics-kpis/ · https://www.numerator.com/promo-shift-dashboard/

CatMan/Fachquellen: https://nielseniq.com/wp-content/uploads/sites/4/2021/02/measuring-and-improving-your-business-with-distribution-data.pdf · https://microsites.nielseniq.com/cpg-dictionary/dictionary/price-index-to-category-average/ · https://nielseniq.com/global/en/insights/analysis/2022/how-to-win-on-the-digital-shelf/ · https://blog.cmkg.org/blog/category-development-index-calculation_fair-share-index-calculation · https://blog.cmkg.org/blog/private-label-pricing-analysis · https://seeklear.com/i-want-my-fair-share-category-management-fair-share-index-explained/ · https://umbrex.com/resources/retail-industry-playbooks/retail-pricing-architecture-playbook/price-ladders-good-better-best-pack-price-strategy/ · https://www.gs1-germany.de/fileadmin/gs1/Themen/shopper-experience/Downloads/gs1-germany-category-management-dossier.pdf · https://www.foodnavigator.com/Article/2024/05/03/Why-is-the-price-gap-between-private-labels-and-national-brands-narrowing/ (Sekundärquelle für Circana-Zahl)

## Nicht erreichbar / ohne verwertbaren Inhalt

- https://prisync.com/help/ (404); https://helpcenter.prisync.com/hc/en-us/articles/213844385-What-Do-I-See-on-the-Dashboard, …/213516025-Price-Position, …/213009269-Index, …/213009869-Brand-Reports (alle 403); https://intercom.help/prisync/en/ (nur Startseite ohne Artikelliste)
- https://competera.ai/blog (404)
- https://help.omniaretail.com/dashboard (Login erforderlich)
- https://www.circana.com/solutions/unify-plus, https://www.circana.com/solutions/liquid-data-go, https://www.circana.com/solution-areas/technology (Inhalt abgeschnitten/leer); https://www.circana.com/unifyplus/ (404)
- https://www.ascentialedge.com/solutions/edge-retail-insight → https://www.flywheeldigital.com/solutions/edge-retail-insight (404)
- https://www.ecr-deutschland.de/…/gs1-germany-category-management-dossier.pdf (Zertifikatsfehler; über gs1-germany.de erreichbar)
- https://www.ecr-community.org/wp-content/uploads/2020/11/CatMan2000.pdf (>10 MB, Abruf abgebrochen)
- https://paxcom.ai/blog/digital-shelf-scorecard-metrics/ (403)
- https://www.pricefx.com/learning-center/pricing-ladders-in-retail-5-tips-for-great-execution (kein Ladder-Inhalt auf der Seite)
- https://www.lebensmittelzeitung.net/handel/charts/analyse-haendler-lassen-bei-marken-kaum-preiserhoehungen-zu-165425 (Paywall, nur Teaser)
- https://traxretail.com/blog/the-shared-truth-behind-retail-excellence/ (Redirect zu survey.com, nicht gefolgt)
- PriceShape, Retail Insight/EDGE, Trax-Produktseiten: keine öffentliche Doku mit Layoutbeschreibung gefunden.
