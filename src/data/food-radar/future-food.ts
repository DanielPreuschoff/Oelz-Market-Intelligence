/**
 * Food Radar — Tafel „Future Food".
 *
 * ERZEUGT von scripts/baue-radardaten.mjs — nicht von Hand ändern.
 * Inhalte: foodRegio Innovation / FIBRES, öffentliches Embed, gelesen 2026-08-10.
 * Texte übersetzt und redaktionell überarbeitet (docs/food-radar-textregeln.md).
 * Zellen (Sektor+Ring) per Mehrheit aus fünf
 * Ladungen des Originals; Punktlagen innerhalb der Zelle eigenes,
 * deterministisches Layout — das Original würfelt sie bei jedem Laden neu.
 *
 * 34 Einträge
 */
import type { RadarTafel } from './types'

export const FUTURE_FOOD: RadarTafel = {
  "key": "future-food",
  "name": "Future Food",
  "achsenName": "Zeit bis zur Wirkung",
  "ringe": [
    {
      "name": "Heute",
      "bis": 0.4
    },
    {
      "name": "1–3 Jahre",
      "bis": 0.6
    },
    {
      "name": "3–5 Jahre",
      "bis": 0.8
    },
    {
      "name": "5–10 Jahre",
      "bis": 1
    }
  ],
  "sektoren": [
    "Digitalisierung/KI",
    "Additive Fertigung",
    "Alternative Proteine",
    "Personalisierung",
    "Nachhaltigkeit",
    "Regulatorik"
  ],
  "eintraege": [
    {
      "id": "989613",
      "titel": "3D-Druck von Milchprodukten",
      "beschreibung": "Milchproteinkonzentrate, Molkenproteinisolate und weitere Milchbestandteile werden als Druckmedium erprobt, um Struktur und Textur gezielt zu gestalten. Gedruckt wurden bislang Milchproteingele, Emulsionen auf Kaseinbasis und funktionalisierte Joghurts. Die Anwendungen liegen in personalisierter Ernährung und in neuartigen Texturen. Das Verfahren steht noch in der Forschung.",
      "sektor": "Additive Fertigung",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 125.63,
      "radius": 0.6832,
      "daten": "15. August 2024",
      "titelOriginal": "Dairy 3D printing"
    },
    {
      "id": "874304",
      "titel": "3D-Druck von Lebensmitteln im Produktionsmaßstab",
      "beschreibung": "Der Lebensmittel-3D-Druck soll von Einzelstücken auf industrielle Mengen übertragen werden: Anlagen fertigen Nahrung schichtweise in Serie statt in Kleinserien für Schaustücke. Erwartet werden ein genauerer Materialeinsatz, weniger Lebensmittelverschwendung und kürzere Transportwege, weil die Fertigung nah am Verbrauchsort stehen kann. Die Druckverfahren selbst sind erprobt; offen ist ihre Skalierung auf Durchsatz und Geschwindigkeit einer Massenproduktion.",
      "sektor": "Additive Fertigung",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 140.96,
      "radius": 0.6782,
      "daten": "20. Oktober 2023",
      "titelOriginal": "Large-scale 3D printed food production"
    },
    {
      "id": "874284",
      "titel": "Insektenprotein für die menschliche Ernährung",
      "beschreibung": "Insekten dienen als Proteinquelle in Lebensmitteln für den Menschen, etwa in Proteinriegeln und in Mehlen aus getrockneten Insekten. Für sie sprechen ein hoher Proteingehalt, eine effiziente Futterverwertung und geringe Treibhausgasemissionen gegenüber konventioneller Tierhaltung. Der Ansatz gilt als Antwort auf wachsende Weltbevölkerung und knappe Ressourcen in der Proteinversorgung. In einigen Esskulturen sind Insekten seit Langem Nahrungsmittel; in den westlichen Märkten steht die breite Akzeptanz noch aus.",
      "sektor": "Alternative Proteine",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 97.62,
      "radius": 0.6931,
      "daten": "20. Oktober 2023",
      "titelOriginal": "Insect protein for human consumption"
    },
    {
      "id": "874303",
      "titel": "Individuell gedruckte Süßwaren",
      "beschreibung": "3D-Drucker tragen Zutaten präzise dosiert Schicht für Schicht auf und erzeugen so Süßwaren und Desserts mit frei wählbarer Form, Geschmacksrichtung und Nährwertzusammensetzung. Damit lassen sich filigrane Strukturen und Muster herstellen, die Gieß- und Formverfahren nicht erreichen. Genutzt wird die Technik bislang vor allem in gehobenen Konditoreien und bei Veranstaltungen, wo einzelne Stücke auf Anlass oder Person zugeschnitten werden.",
      "sektor": "Additive Fertigung",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 145.33,
      "radius": 0.6944,
      "daten": "20. Oktober 2023",
      "titelOriginal": "Customized 3D-printed confectionery"
    },
    {
      "id": "874282",
      "titel": "Pilzproteine als Fleischersatz",
      "beschreibung": "Mykoprotein aus Pilzen, gewonnen vor allem aus Fusarium venenatum, dient als Rohstoff für Fleischalternativen. Aus der Pilzbiomasse entstehen unter anderem Burger-Patties und getrocknete Streifen nach Art von Jerky. Forschungsgruppen und Lebensmittelhersteller erproben solche Erzeugnisse als nährstoffreichen und ressourcenschonenden Ersatz für Fleisch. Die Produktentwicklung befindet sich in einem frühen Stadium.",
      "sektor": "Alternative Proteine",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 99.54,
      "radius": 0.7031,
      "daten": "20. Oktober 2023",
      "titelOriginal": "Fungal proteins as meat replacements"
    },
    {
      "id": "874302",
      "titel": "3D-Druck für personalisierte Ernährung",
      "beschreibung": "Der 3D-Druck von Lebensmitteln wird genutzt, um Mahlzeiten auf individuellen Nährstoffbedarf, gesundheitliche Ziele und Unverträglichkeiten zuzuschneiden. Portionsgröße und Nährstoffverhältnis lassen sich dabei je Person festlegen.",
      "sektor": "Additive Fertigung",
      "ebene": "trend",
      "groesse": "l",
      "winkel": 141.96,
      "radius": 0.7043,
      "daten": "20. Oktober 2023",
      "titelOriginal": "3D printing for personalized nutrition"
    },
    {
      "id": "874306",
      "titel": "KI-gestützte Pflanzenzüchtung",
      "beschreibung": "Algorithmen aus KI und maschinellem Lernen verkürzen die klassische Pflanzenzüchtung, indem sie aus vorhandenen Daten vorhersagen, welche Kreuzungen die gewünschten Eigenschaften ergeben. Ziel sind höhere Erträge, Widerstandsfähigkeit gegen Krankheiten und ein höherer Nährstoffgehalt. Die Auswahl erwünschter Merkmale wird damit präziser und schneller als in Programmen, die allein auf Feldbeobachtung über mehrere Generationen beruhen. Verfahren dieser Art werden in Forschung und laufenden Zuchtprogrammen bereits eingesetzt.",
      "sektor": "Digitalisierung/KI",
      "ebene": "trend",
      "groesse": "l",
      "winkel": 172.7,
      "radius": 0.6886,
      "daten": "20. Oktober 2023",
      "titelOriginal": "AI-optimized crop breeding"
    },
    {
      "id": "874259",
      "titel": "Breitere Rohstoffbasis pflanzlicher Proteine",
      "beschreibung": "Über Soja und Weizen hinaus rücken weitere Rohstoffe als pflanzliche Proteinquellen in den Blick: Hülsenfrüchte, Quinoa, Algen und Pilze. Sie gelten als nährstoffreich und umweltverträglicher als tierische Proteine und beantworten die Nachfrage nach nachhaltigen und vielfältigen Proteinoptionen. Entsprechende Produkte sind im Handel bereits in großer Zahl verfügbar, womit die Entwicklung weiter fortgeschritten ist als bei anderen Proteinalternativen.",
      "sektor": "Alternative Proteine",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 112.26,
      "radius": 0.901,
      "daten": "20. Oktober 2023",
      "titelOriginal": "Plant-based protein diversity"
    },
    {
      "id": "874301",
      "titel": "3D-Lebensmitteldruck in der Spitzengastronomie",
      "beschreibung": "Restaurants der gehobenen Küche setzen 3D-Drucker ein, um Speisen mit exakt platzierten Zutaten und filigranen Geometrien anzurichten. Die Geräte tragen die Zutaten dosiert und schichtweise auf und erlauben so Muster und Strukturen, die sich von Hand nicht formen lassen. Bekannte Köche nutzen die Technik als Erweiterung ihres Repertoires und stellen sie als Teil des Menüerlebnisses aus. Die Zahl der Häuser, die damit arbeiten, nimmt zu.",
      "sektor": "Additive Fertigung",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 143.49,
      "radius": 0.6817,
      "daten": "20. Oktober 2023",
      "titelOriginal": "3D food printing in high-end restaurants"
    },
    {
      "id": "874239",
      "titel": "KI-gestützte Überwachung von Feldbeständen",
      "beschreibung": "Kameras und Sensoren an Drohnen oder bodengestützten Systemen erfassen detaillierte Aufnahmen von Feldbeständen, die Verfahren der Computer Vision auf den Zustand der Pflanzen hin auswerten. Die Algorithmen erkennen frühe Anzeichen von Krankheiten, Nährstoffmangel und Schädlingsbefall. Auf dieser Grundlage lassen sich Dünger und Pflanzenschutzmittel gezielt an der betroffenen Stelle ausbringen statt flächendeckend, was den Ressourceneinsatz senkt. Die Verfahren sind technisch weit entwickelt und werden in unterschiedlichen landwirtschaftlichen Zusammenhängen erprobt.",
      "sektor": "Digitalisierung/KI",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 159.37,
      "radius": 0.7031,
      "daten": "20. Oktober 2023",
      "titelOriginal": "AI-driven crop monitoring"
    },
    {
      "id": "1176259",
      "titel": "Fermentierte Proteine als Zutat der Lebensmittelindustrie",
      "beschreibung": "Fermentation erzeugt Proteine mit Mikroorganismen statt mit Tieren und benötigt dafür weniger Fläche als die Tierhaltung. Nach einer Analyse von McKinsey könnten solche neuartigen Proteine bis 2050 rund 4 % der weltweiten Proteinproduktion stellen — ein Markt von 100 bis 150 Milliarden US-Dollar. Über 4 Milliarden US-Dollar Kapital sind in Präzisions- und Biomassefermentation geflossen. Die Herstellkosten liegen bislang um eine Größenordnung über den 2 bis 15 US-Dollar je Kilogramm konventionellen Proteins; bessere Prozesse und lebensmitteltaugliche Bioreaktoren könnten sie etwa halbieren.",
      "sektor": "Alternative Proteine",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 107.63,
      "radius": 0.6478,
      "daten": "13. März 2025",
      "titelOriginal": "Ingredients for the future: Bringing the biotech revolution to food"
    },
    {
      "id": "1159084",
      "titel": "Hybrid-Burger aus dem 3D-Drucker",
      "beschreibung": "An der Prager Universität für Chemie und Technologie entwickeln Forscher um Stepan Janoud eine druckbare Burgermasse, die einen Fleischanteil behält. Der Hybridansatz soll Geschmack, Geruch und Textur näher an konventionelles Fleisch bringen als rein pflanzliche Ersatzprodukte. Tschechien ist dafür ein aufschlussreicher Markt: Der Fleischkonsum liegt höher als in Deutschland, vegetarische Alternativen gewinnen dennoch an Zuspruch.",
      "sektor": "Additive Fertigung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 133.19,
      "radius": 0.6532,
      "daten": "10. Oktober 2024",
      "titelOriginal": "Forschung in Tschechien Hybrid-Fleisch aus dem 3D-Drucker"
    },
    {
      "id": "989618",
      "titel": "KI in der Milchviehhaltung",
      "beschreibung": "In der Milchwirtschaft werten KI-Systeme Daten aus Herde, Melkstand und Verarbeitung aus, um Tiergesundheit, Milchqualität und betriebliche Entscheidungen zu verbessern. Die Anwendungen reichen von der Auswahl geeigneter Behandlungen für einzelne Kühe über die Prognose der Nachfrage bis zum Nachweis von Verfälschungen in Milcherzeugnissen. In der Käseherstellung übernimmt Computer Vision die Qualitätsbeurteilung, weitere Systeme erkennen Hitzestress im Bestand. Über bildgebende Verfahren lassen sich zudem Milchleistung, Methanemissionen und Herdengröße schätzen.",
      "sektor": "Digitalisierung/KI",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 154.75,
      "radius": 0.6857,
      "daten": "15. August 2024",
      "titelOriginal": "AI Dairy Farming"
    },
    {
      "id": "187607",
      "titel": "Kühlschränke mit Kamera-KI erkennen Lebensmittel",
      "beschreibung": "Samsung und LG zeigten auf der CES 2020 Kühlschränke, deren Innenkameras den Inhalt per Bilderkennung identifizieren. Samsungs Family Hub und LGs InstaView ThinQ melden daraufhin, welche Zutaten zur Neige gehen, und schlagen Gerichte aus dem vorhandenen Bestand vor; Samsung nutzt dafür die 2019 übernommene Anwendung Whisk, die Wochenpläne und Einkaufslisten erstellt. LGs Modelle haben ein 22 Zoll großes Display, das sich transparent schalten lässt, sodass der Inhalt ohne Öffnen der Tür sichtbar wird. Die Preise der Vorgängermodelle lagen zwischen 4.500 und 6.000 US-Dollar.",
      "sektor": "Digitalisierung/KI",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 174.94,
      "radius": 0.4954,
      "daten": "2. Januar 2020",
      "titelOriginal": "AI-powered fridges that recognize food"
    },
    {
      "id": "874317",
      "titel": "Nutrigenomik in der Sporternährung",
      "beschreibung": "Ernährungspläne für Sportler werden anhand genetischer Marker zugeschnitten, die den Stoffwechsel einzelner Nährstoffe und die körperliche Leistungsfähigkeit beeinflussen. Die Nutrigenomik untersucht, wie individuelle Genvarianten die Reaktion auf Nährstoffe verändern; aus solchen Profilen werden Empfehlungen für Belastung und Regeneration abgeleitet. Die Anwendung in der Sporternährung weitet sich mit der Forschung aus, steht aber noch in einem frühen Stadium.",
      "sektor": "Personalisierung",
      "ebene": "trend",
      "groesse": "l",
      "winkel": 70.3,
      "radius": 0.8881,
      "daten": "20. Oktober 2023",
      "titelOriginal": "Nutrigenomics-based sports nutrition"
    },
    {
      "id": "187372",
      "titel": "Hülsenfrüchte als Rohstoff neuer Produktkategorien",
      "beschreibung": "Bohnen, Erbsen und Linsen werden in den USA über die Beilage hinaus zu eigenständigen Produktkategorien verarbeitet. Die Marke BRAMi aus Brooklyn verkauft marinierte Lupinenkerne als Snack; sie enthalten je Kalorie mehr Protein und Ballaststoffe als Kichererbsen und Mandeln. LUPii bietet Riegel aus derselben Bohne im New Yorker Handel an, Ripple gewinnt aus gelben Erbsen Protein für Milchalternativen, und Ancient Harvest, Modern Table sowie Tolerant Organics stellen Nudeln aus Linsen her. Lupine und gelbe Erbse kommen mit wenig Bewässerung aus; die Lupine gilt als möglicher Ersatz für Soja.",
      "sektor": "Alternative Proteine",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 94.27,
      "radius": 0.6899,
      "daten": "31. Januar 2020",
      "titelOriginal": "Beans, Peas & Other Legumes"
    },
    {
      "id": "874305",
      "titel": "3D-Lebensmitteldruck für Raumfahrt und Marsmissionen",
      "beschreibung": "Für lange Raumflüge und mögliche Siedlungen auf dem Mars wird untersucht, ob 3D-Drucker Mahlzeiten aus vor Ort verfügbaren Zutaten herstellen können. Statt fertige Rationen mitzuführen, sollen Besatzungen aus Grundstoffen nach Bedarf drucken, was dem Nährstoffbedarf und dem Geschmack der Einzelnen entspricht. Forschungsgruppen prüfen dafür Zutaten und Druckverfahren, die unter Weltraumbedingungen funktionieren. Erhebliche technische und logistische Hürden sind bislang ungelöst.",
      "sektor": "Additive Fertigung",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 142.6,
      "radius": 0.8871,
      "daten": "20. Oktober 2023",
      "titelOriginal": "Space and Mars colonisation"
    },
    {
      "id": "1159083",
      "titel": "Kultiviertes Fett als Biotinte für den 3D-Fleischdruck",
      "beschreibung": "An der Hochschule Reutlingen gewinnen Forschende um Petra Kluger aus Schlachtabfällen Vorläuferzellen, lassen sie in einem eigens entwickelten Nährmedium zu Fettzellen reifen und im Bioreaktor zu Sphäroiden verklumpen. Die Sphäroide werden in eine essbare Biotinte gemischt und im 3D-Drucker zum Fleischstück verarbeitet. Zehn Wissenschaftler arbeiten seit rund fünf Jahren daran; bis zu einem massentauglichen Verfahren rechnet Kluger mit mindestens drei bis fünf weiteren Jahren. Das Nährmedium enthält bislang das umstrittene fötale Kälberserum; Algenextrakte sollen es ersetzen.",
      "quellen": [
        {
          "name": "mehr",
          "url": "https://www.tagesschau.de/wirtschaft/verbraucher/fleischersatz-beliebter-100.html"
        }
      ],
      "sektor": "Additive Fertigung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 135.42,
      "radius": 0.6549,
      "daten": "1. Dezember 2024",
      "titelOriginal": "Kommt Fleisch aus dem 3D-Drucker bald in den Handel?"
    },
    {
      "id": "910679",
      "titel": "Grofit: Sensorkapsel und digitaler Zwilling im Gewächshaus",
      "beschreibung": "Das israelische Unternehmen Grofit entwickelt Sensoren und Software für den Präzisionsanbau in Gewächshäusern. Die Messstation Grofit Capsule hat nach Unternehmensangaben die Größe einer Getränkedose, ist in einer Minute betriebsbereit und erfasst Lufttemperatur, Strahlung, relative Luftfeuchte sowie Werte zu Boden, Bewässerung und Düngung. Daraus erzeugt das System Virtual Plant ein digitales Abbild des Bestands, das mit maschinellem Lernen dessen Wuchs vorhersagen soll. Zu den Anwendern zählen Syngenta, Bayer und Hazera; in Spanien läuft ein Pilotprojekt mit der Genossenschaft UNICA.",
      "sektor": "Digitalisierung/KI",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 169.7,
      "radius": 0.7173,
      "daten": "19. April 2023",
      "titelOriginal": "AI Precision Farming"
    },
    {
      "id": "149673",
      "titel": "Personalisierte Ernährung nach Mikrobiomdaten",
      "beschreibung": "Das israelische Weizmann-Institut für Wissenschaften untersucht im Personalized Nutrition Project die Darmflora von Menschen mit Prädiabetes. Ersten Ergebnissen zufolge lässt sich aus den Mikrobiomdaten mithilfe eines Algorithmus eine individuell zugeschnittene Ernährungsempfehlung ableiten.",
      "sektor": "Personalisierung",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 66.95,
      "radius": 0.7524,
      "daten": "27. November 2019",
      "titelOriginal": "Personalised Nutrition"
    },
    {
      "id": "141749",
      "titel": "Kultiviertes Fleisch und Insekten als Proteinquellen",
      "beschreibung": "Zwei Ansätze sollen den weiter wachsenden Fleischbedarf decken, ohne die Tierhaltung im bisherigen Umfang fortzuführen. Kultiviertes Fleisch, auch Clean Meat genannt, entsteht im Labor aus Stammzellen von Rind, Schwein oder Huhn; zahlreiche Arbeitsgruppen befassen sich mit seiner Herstellung. Daneben werden Insekten als effiziente, nährstoffreiche und umweltverträgliche Proteinquelle für die künftige Ernährung diskutiert. Treiber beider Ansätze ist die wachsende Bedeutung von Ressourcenschonung, Umweltverträglichkeit und sozialer Gerechtigkeit beim Lebensmitteleinkauf.",
      "sektor": "Alternative Proteine",
      "ebene": "cluster",
      "groesse": "m",
      "winkel": 115.17,
      "radius": 0.6865,
      "daten": "14. August 2019",
      "titelOriginal": "Lab-grown Meat & Insects"
    },
    {
      "id": "910671",
      "titel": "Enzymofit: Biokatalysatoren für pflanzliche Alternativen",
      "beschreibung": "Enzymofit liefert Herstellern pflanzlicher Alternativprodukte maßgeschneiderte Biokatalysatoren für den Einsatz in der Produktion. Nach Angaben des Anbieters verstärken sie in Ersatzprodukten für Fleisch, Fisch und Ei den fleischartigen Geschmack sowie Struktur, Bindung und Konsistenz, lassen pflanzliche Fette sich beim Erhitzen und Schmelzen wie tierische verhalten und erzeugen Kohlenhydrate, Ballaststoffe und Hydrokolloide mit Clean-Label-Eignung. Das Unternehmen gibt an, damit Zusatzstoffe und starke Verarbeitungsschritte zu ersetzen.",
      "sektor": "Alternative Proteine",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 108.92,
      "radius": 0.3013,
      "daten": "23. Februar 2024",
      "titelOriginal": "Making alt-protein sensational"
    },
    {
      "id": "874271",
      "titel": "3D-gedruckte Bauteile für Vertical Farming",
      "beschreibung": "Additive Fertigung liefert Bauteile für den Anbau in Innenräumen: Tragstrukturen und Pflanzgefäße werden gedruckt und dabei auf den verfügbaren Raum und die Anforderungen der jeweiligen Kultur zugeschnitten. Weil sich Komponenten vor Ort und in kleiner Stückzahl herstellen lassen, sollen Material effizienter genutzt und die Erzeugung von Lebensmitteln stärker lokalisiert werden. Bislang gibt es nur wenige praktische Umsetzungen; Kosten und Skalierbarkeit sind offene Punkte.",
      "sektor": "Additive Fertigung",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 129.37,
      "radius": 0.838,
      "daten": "20. Oktober 2023",
      "titelOriginal": "3D-printed vertical farms"
    },
    {
      "id": "141750",
      "titel": "Personalisierte Pizza aus dem 3D-Drucker",
      "beschreibung": "Das Start-up BeeHex druckt Pizza schichtweise mit einem Roboterkoch; Teig und Belag werden zuvor über eine App zusammengestellt und an den Ernährungsplan des Bestellers angepasst. Der Ansatz überträgt die additive Fertigung auf zubereitete Speisen: Statt eines festen Rezepts entsteht jede Portion nach individuellen Vorgaben. Die Quelle erwartet, dass der 3D-Druck das heutige Schnellrestaurant-Angebot binnen 20 Jahren ablöst.",
      "sektor": "Additive Fertigung",
      "ebene": "cluster",
      "groesse": "m",
      "winkel": 131.4,
      "radius": 0.6931,
      "daten": "14. August 2019",
      "titelOriginal": "Food from 3D printer"
    },
    {
      "id": "874243",
      "titel": "KI-gestützte Betriebsführung in der Landwirtschaft",
      "beschreibung": "Betriebsführungssysteme führen Wetterprognosen, Bodendaten, Bestandsüberwachung und Marktentwicklungen in einer Auswertung zusammen und leiten daraus Empfehlungen für den einzelnen Hof ab. KI und maschinelles Lernen werten die großen Datenmengen aus, die dabei anfallen. Landwirte nutzen die Ergebnisse für die Wahl der Kulturen, die Bewässerungsplanung und die Verteilung von Betriebsmitteln. Da datengestützte Entscheidungen in der Landwirtschaft an Gewicht gewinnen, sind solche Systeme bereits weit verbreitet.",
      "sektor": "Digitalisierung/KI",
      "ebene": "cluster",
      "groesse": "m",
      "winkel": 170.5,
      "radius": 0.4959,
      "daten": "20. Oktober 2023",
      "titelOriginal": "AI Farm Management Systems"
    },
    {
      "id": "989629",
      "titel": "Vet Vision AI: Kameras für das Wohlbefinden von Milchkühen",
      "beschreibung": "Der britische Händler Sainsbury's erprobt auf 30 Höfen seiner Dairy Development Group eine Kameraauswertung, die nicht nur Krankheiten früh erkennt, sondern misst, wann es einer Kuh gut geht. Entwickelt hat sie Vet Vision AI, eine Ausgründung der University of Nottingham; die Kameras liefern rund um die Uhr Bilder, aus denen Verhaltensmuster wie Liegezeiten ausgelesen werden. Das System schlägt Landwirten Maßnahmen vor, etwa Umbauten im Stall oder Kuhbürsten zur Stressminderung. Der 2007 gegründeten Gruppe gehören rund 170 Milchbetriebe an; eine Ausweitung ist vorgesehen.",
      "sektor": "Digitalisierung/KI",
      "ebene": "cluster",
      "groesse": "m",
      "winkel": 167.15,
      "radius": 0.7513,
      "daten": "1. Juli 2024",
      "titelOriginal": "AI Veterinary Technology"
    },
    {
      "id": "141761",
      "titel": "Proteinquellen",
      "beschreibung": "Mehr als die Hälfte der Befragten einer deutschen Studie erwartet für die Zukunft eine gesündere und ressourcenschonende Mischkost. Damit gewinnen In-vitro-Fleisch sowie Proteinquellen wie Algen und Insekten an Bedeutung. Das Fraunhofer-Institut hatte bereits 2010 festgestellt, dass Fleischkonsum entlang der Wertschöpfungskette weder effizient noch nachhaltig ist. Fortschritte in Verarbeitung und alternativen Proteinen sollen kostengünstige Fleischalternativen ermöglichen; entscheidend wird deren Herstellbarkeit im Maßstab.",
      "sektor": "Alternative Proteine",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 115.57,
      "radius": 0.4844,
      "daten": "15. August 2019",
      "titelOriginal": "Protein Sources"
    },
    {
      "id": "989780",
      "titel": "Milch von einer einzelnen Kuh",
      "beschreibung": "Das niederländische Technologieunternehmen TOP aus Wageningen hat ein Verfahren vorgestellt, mit dem Milchbetriebe die Milch einzelner Kühe getrennt pasteurisieren und abfüllen können. Verbraucher können damit gezielt die Milch einer bestimmten Kuh von einem bestimmten Tag bestellen. Das überträgt ein Muster auf ein Grundnahrungsmittel, das Coca-Cola, Marmite und Snickers mit personalisierten Etiketten etabliert haben: Der Neuheitswert gewinnt Kunden, die Produktqualität hält sie. Vor allem Molkereien mit kleinem Einzugsgebiet können solche Angebote darstellen.",
      "sektor": "Personalisierung",
      "ebene": "trend",
      "groesse": "s",
      "winkel": 63.34,
      "radius": 0.4931,
      "daten": "18. Juni 2018",
      "titelOriginal": "Customization of products"
    },
    {
      "id": "989631",
      "titel": "Bioplastikflasche für Molkereiprodukte von NaKu",
      "beschreibung": "Das österreichische Unternehmen NaKu stellt Behälter für Molkereiprodukte aus Biokunststoff her, dessen Grundstoff Milchsäure aus pflanzlichem Zucker und Stärke ist. Synthetische Weichmacher werden nicht eingesetzt, das Material ist vollständig biologisch abbaubar. Der Anbieter gibt an, dass die Verpackung 20-mal leichter als Glas und zehnmal günstiger als Kunststoff sei.",
      "sektor": "Nachhaltigkeit",
      "ebene": "trend",
      "groesse": "s",
      "winkel": 46.76,
      "radius": 0.2529,
      "daten": "3. April 2024",
      "titelOriginal": "Biodegradable packaging"
    },
    {
      "id": "874316",
      "titel": "Verpackungen mit Sensoren für die Lebensmittelqualität",
      "beschreibung": "Sensoren und Indikatoren werden in die Verpackung eingebaut und zeigen an, wie frisch der Inhalt ist, ob er verdorben ist und ob er noch sicher verzehrt werden kann. Händler und Verbraucher erhalten damit eine Information über den tatsächlichen Zustand der Ware statt nur ein aufgedrucktes Haltbarkeitsdatum. Weil Ware nicht mehr allein nach Ablaufdatum aussortiert wird, sinkt die Lebensmittelverschwendung. Wie schnell sich solche Verpackungen durchsetzen, hängt am Fortschritt der Sensortechnik.",
      "sektor": "Nachhaltigkeit",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 40.39,
      "radius": 0.4876,
      "daten": "20. Oktober 2023",
      "titelOriginal": "Smart packaging with food quality sensors"
    },
    {
      "id": "874287",
      "titel": "KI gegen Lebensmittelverschwendung",
      "beschreibung": "KI und Datenanalyse werden eingesetzt, um Lieferketten auf geringere Verluste auszulegen: Nachfrage vorhersagen, Mindesthaltbarkeiten verfolgen, Distribution steuern und Bestände genauer führen. Die Verluste sinken damit an mehreren Stufen der Kette statt nur am Regal. Ergänzend dient Blockchain dazu, Herkunft nachvollziehbar zu machen, Landwirte fair zu vergüten und CO₂-Bilanzen zu messen.",
      "sektor": "Digitalisierung/KI",
      "ebene": "cluster",
      "groesse": "s",
      "winkel": 158.39,
      "radius": 0.498,
      "daten": "20. Oktober 2023",
      "titelOriginal": "AI Food Waste Reduction"
    },
    {
      "id": "874318",
      "titel": "Lebensmittel für das Darmmikrobiom",
      "beschreibung": "Probiotisch angereicherte und mit Präbiotika versetzte Produkte werden auf die Darmflora einzelner Personen zugeschnitten und sollen gezielt die nützlichen Bakterien im Darm ernähren. Grundlage sind persönliche Messdaten zur Zusammensetzung des Mikrobioms. Die Forschung verbindet das Mikrobiom mit Verdauung, Immunfunktion und allgemeinem Befinden; untersucht wird auch die Darm-Hirn-Achse. Mit dem wachsenden Verständnis dieser Zusammenhänge entstehen entsprechende Produkte.",
      "sektor": "Personalisierung",
      "ebene": "trend",
      "groesse": "l",
      "winkel": 71.96,
      "radius": 0.6813,
      "daten": "20. Oktober 2023",
      "titelOriginal": "Gut microbiome-targeted foods"
    },
    {
      "id": "874320",
      "titel": "Ernährungspläne auf Basis des Genprofils",
      "beschreibung": "Gentests liefern die Grundlage für Ernährungsempfehlungen, die auf das Erbgut einzelner Personen zugeschnitten sind — von der Nährstoffzufuhr über den Speiseplan bis zu Hinweisen zur Lebensweise. Fortschritte in Genomik und Ernährungswissenschaft machen es möglich, genetische Veranlagungen mit persönlichen Gesundheitszielen zu verknüpfen. Da Gentests günstiger und leichter zugänglich werden, wächst das Interesse der Verbraucher an solchen Angeboten.",
      "sektor": "Personalisierung",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 71.37,
      "radius": 0.7091,
      "daten": "20. Oktober 2023",
      "titelOriginal": "DNA-based diets and meal plans"
    },
    {
      "id": "908542",
      "titel": "3D-Druck von Lebensmitteln",
      "beschreibung": "Essbare Erzeugnisse werden Schicht für Schicht gedruckt, was Formen und Zusammensetzungen erlaubt, die sich anders nicht herstellen lassen. Israelische Unternehmen treiben das Verfahren voran: Steakholder Foods druckt pflanzliche Nachbildungen von Aal und Garnele, Oshi ein pflanzliches Lachsfilet am Stück, SavorEat konfigurierbare pflanzliche Fleischalternativen. MeaTech 3D stellte im Druckverfahren nach eigenen Angaben das bislang größte Steak aus kultiviertem Fleisch her. Die Übertragung in industrielle Mengen hängt an Material- und Verfahrenstechnik.",
      "sektor": "Additive Fertigung",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 135.01,
      "radius": 0.9615,
      "daten": "20. Februar 2024",
      "titelOriginal": "3D Printing of Food"
    }
  ]
}
