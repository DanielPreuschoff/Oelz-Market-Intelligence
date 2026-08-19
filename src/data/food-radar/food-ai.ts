/**
 * Food Radar — Tafel „Food AI".
 *
 * ERZEUGT von scripts/baue-radardaten.mjs — nicht von Hand ändern.
 * Inhalte: foodRegio Innovation / FIBRES, öffentliches Embed, gelesen 2026-08-10.
 * Texte übersetzt und redaktionell überarbeitet (docs/food-radar-textregeln.md).
 * Zellen (Sektor+Ring) per Mehrheit aus fünf
 * Ladungen des Originals; Punktlagen innerhalb der Zelle eigenes,
 * deterministisches Layout — das Original würfelt sie bei jedem Laden neu.
 *
 * 356 Einträge
 */
import type { RadarTafel } from './types'

export const FOOD_AI: RadarTafel = {
  "key": "food-ai",
  "name": "Food AI",
  "achsenName": "Zeit bis zur Wirkung",
  "ringe": [
    {
      "name": "Heute",
      "bis": 0.3333333333333333
    },
    {
      "name": "1–3 Jahre",
      "bis": 0.5
    },
    {
      "name": "3–5 Jahre",
      "bis": 0.6666666666666666
    },
    {
      "name": "5–10 Jahre",
      "bis": 0.8333333333333334
    },
    {
      "name": "10+ Jahre",
      "bis": 1
    }
  ],
  "sektoren": [
    "Landwirtschaft",
    "Herstellung & Verarbeitung",
    "Verpackung",
    "Logistik & Distribution",
    "Handel & HoReCa",
    "Konsum",
    "Abfallströme"
  ],
  "eintraege": [
    {
      "id": "1142801",
      "titel": "KI in der Suche nach neuen Lebensmittelzutaten",
      "beschreibung": "KI-Verfahren verkürzen die Suche nach neuen Lebensmittelzutaten, indem sie große Mengen an Molekülen vorsortieren und deren Eigenschaften vorhersagen. Statt jede Kandidatensubstanz im Labor zu prüfen, engt die Auswertung das Feld vorab ein. Start-ups in diesem Feld führen Lebensmittel- und Datenwissenschaft zusammen und entwickeln Algorithmen, die in die Entwicklungsprozesse der Hersteller eingebunden werden.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 140.98,
      "radius": 0.447,
      "daten": "12. Februar 2025",
      "titelOriginal": "AI Ingredients Discovery"
    },
    {
      "id": "1142768",
      "titel": "KI-Auswertung von Verbraucherdaten in der Produktentwicklung",
      "beschreibung": "In der Produktentwicklung werten Hersteller mit KI aus, was Verbraucher äußern und tun: Beiträge in sozialen Medien, Suchbegriffe, per Chatbot geführte Befragungen, Bilder von Mahlzeiten sowie Daten vernetzter Küchengeräte. Maschinelles Lernen verbindet diese Signale mit historischen Verkaufszahlen und sagt Nachfrage und günstige Einführungszeitpunkte voraus. Anbieter sind unter anderem Tastewise, das in einer Serie-A-Runde 17 Millionen US-Dollar einwarb, Bite.ai mit Bilderkennung für Ernährungsprotokolle und Gastrograph AI mit einer Sensorikdatenbank für Geschmacksprognosen.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "trend",
      "groesse": "l",
      "winkel": 130.57,
      "radius": 0.465,
      "daten": "12. Februar 2025",
      "titelOriginal": "AI for Consumer Insights"
    },
    {
      "id": "1062472",
      "titel": "KI-Funktionen in Konsumprodukten",
      "beschreibung": "KI-Funktionen wandern aus Forschungslaboren in Geräte des Alltags — in Smartphones, vernetzte Haushaltsgeräte, Fahrzeuge und die zugehörigen Anwendungen. Treiber sind leistungsfähigere Modelle und Rechenkapazitäten, die Gewöhnung der Nutzer an Sprachassistenten, der Wettbewerb der großen Technologiekonzerne und leichter verfügbare Entwicklungswerkzeuge. Damit verschieben sich Bedienkonzepte und Erwartungen an Personalisierung; zugleich stellen sich Fragen zum Datenschutz. Als Hürden gelten hohe Entwicklungskosten und die Unterscheidung zwischen echtem Nutzen und bloßer Ausstattung.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "trend",
      "groesse": "l",
      "winkel": 130.57,
      "radius": 0.3802,
      "daten": "27. Januar 2025",
      "titelOriginal": "AI Product Launches"
    },
    {
      "id": "1180049",
      "titel": "AI4FoodDB: Datenbank für personalisierte Ernährungsforschung",
      "beschreibung": "Die öffentliche Datenbank AI4FoodDB bündelt die Daten einer einmonatigen Abnehmstudie mit 100 übergewichtigen und adipösen Teilnehmern. Erfasst wurden biologische Proben zu Beginn und am Ende, anthropometrische Messungen alle zwei Wochen, Fragebögen zu Ernährung und Lebensweise sowie zwei Wochen durchgehender Messung über tragbare Geräte. Nach Angaben der Autoren ist es die erste öffentliche Datenbank, die Essensfotos, Sensordaten, validierte Fragebögen und biologische Proben aus derselben Intervention zusammenführt. Sie soll KI-Verfahren in der personalisierten Ernährung voranbringen.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 152.29,
      "radius": 0.3683,
      "daten": "18. Juli 2024",
      "titelOriginal": "AI4FoodDB: a database for personalized e-Health nutrition and lifestyle through wearable devices and AI"
    },
    {
      "id": "909370",
      "titel": "Amai Proteins: Süßproteine aus rechnergestütztem Entwurf",
      "beschreibung": "Amai Proteins entwirft mit rechnergestützter Biophysik und KI Proteine, deren Funktion und Geschmackseigenschaften vorab am Rechner ausgelegt werden. Erstes Anwendungsfeld sind Süßproteine für Getränke, Milch- und Milchersatzprodukte, Saucen, Aufstriche, Snacks und Schokolade. Der Anbieter gibt an, damit 40 bis 70 % des zugesetzten Zuckers ersetzen zu können, ohne den Geschmack zu verändern. Hergestellt werden die Proteine über Präzisionsfermentation; das Entwurfsverfahren firmiert als Agile-Integrative Computational Protein Design.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 149.53,
      "radius": 0.424,
      "daten": "28. Oktober 2021",
      "titelOriginal": "AI supported Protein Design"
    },
    {
      "id": "909368",
      "titel": "ImaginDairy: Milchproteine ohne Kuh aus Fermentation",
      "beschreibung": "Das Start-up ImaginDairy stellt Milchproteine ohne Tier her: Das Gen für das Zielprotein wird in eine Wirtszelle eingebracht, die es per Fermentation produziert. Damit das Verfahren mit der herkömmlichen Herstellung preislich mithalten kann, wird das Erbgut der Wirtszelle umgebaut; welche Mutationen dafür nötig sind, berechnen Modelle und KI — so beschreibt es Mitgründer Tamir Tuller. Nach Angaben des Unternehmens erreichen die Proteine Geschmack, Funktion und Mundgefühl von Kuhmilchprotein und sind laktose-, wachstumshormon- und cholesterinfrei.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 145.33,
      "radius": 0.465,
      "daten": "22. Februar 2023",
      "titelOriginal": "ImaginDairy Start-Up: Tired of just imagining?"
    },
    {
      "id": "143829",
      "titel": "Bioaktive Peptide aus Lebensmitteln, per KI aufgespürt",
      "beschreibung": "Ein 2014 gegründetes irisches Biotechnologieunternehmen durchsucht Lebensmittel nach Peptiden, die den Ausbruch bestimmter chronischer Krankheiten hemmen. Deep Learning, Genomdaten und KI sagen voraus, welche Moleküle biologisch aktiv sind. Damit lassen sich aussichtsreiche Kandidaten schneller und mit weniger Aufwand herausfiltern als über das herkömmliche Screening im Labor.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 152.29,
      "radius": 0.4258,
      "daten": "10. September 2019",
      "titelOriginal": "Food-derived peptides discovered by AI"
    },
    {
      "id": "1777195",
      "titel": "Polysense: KI-Qualitätskontrolle in der Lebensmittelproduktion",
      "beschreibung": "Das belgische Start-up Polysense hat in einer Seed-Runde unter Führung von Felix Capital 10,7 Millionen US-Dollar eingesammelt. Die Software prüft per Kamera jedes Produkt der laufenden Linie, führt Qualitäts- und Prozessdaten zusammen und verstellt Maschinen selbsttätig, wenn die Rohware schwankt — Abweichungen werden korrigiert, bevor Ausschuss entsteht. Zu den Kunden zählen Agristo, Darta und Poppies Bakeries; die Linien laufen in Europa, den USA und dem Nahen Osten. Nach Eurostat entfallen 19 % der Lebensmittelverschwendung in der EU auf die Lebensmittel- und Getränkeherstellung.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 145.44,
      "radius": 0.3683,
      "daten": "8. Juli 2026",
      "titelOriginal": "Polysense raises $10.7M to scale AI quality control for food manufacturers"
    },
    {
      "id": "1777191",
      "titel": "Brainr: Betriebssystem für die Fleischverarbeitung",
      "beschreibung": "Das portugiesische Unternehmen Brainr aus Leiria erhält 1,5 Millionen Euro von Portugal Ventures als Aufstockung seiner im September 2025 abgeschlossenen Seed-Runde über 11 Millionen Euro. Die cloudbasierte Software bündelt Produktion, Planung, Qualität, Rückverfolgbarkeit und Lager fleischverarbeitender Betriebe auf einer Oberfläche. Nach Unternehmensangaben nutzen sie Hersteller, auf die mehr als 65 % der portugiesischen Geflügelproduktion entfallen; über die Plattform läuft eine Jahresproduktion von mehr als 1,3 Milliarden Euro. Die Mittel dienen der Ausweitung nach Europa.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 149.47,
      "radius": 0.396,
      "daten": "6. Juli 2026",
      "titelOriginal": "Brainr secures additional €1.5m from Portugal Ventures to support international expansion"
    },
    {
      "id": "1664493",
      "titel": "CarVe: Bildauswertung gegen Zuschnittverluste bei Cargill",
      "beschreibung": "Cargill wertet in der Rinderzerlegung mit dem System CarVe jeden Schnitt per Kamera aus und meldet den Mitarbeitern in Echtzeit farbig zurück, wie viel Fleisch am Knochen bleibt. Jeder Zerleger erhält eine Bewertung; der Ausbeutegewinn liegt nach Unternehmensangaben bei 3 bis 5 % je Schnitt. Seit April 2026 läuft es an drei Rinderstandorten — Friona (Texas), Fort Morgan (Colorado), High River (Kanada) —, vier weitere sind vorgesehen; pro Schicht laufen dort bis zu 3.500 Rinder durch die Linie. Fleisch, das sonst in die Tierkörperverwertung ginge, bleibt für den Verzehr erhalten.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 148,
      "radius": 0.4042,
      "daten": "26. Mai 2026",
      "titelOriginal": "Cargill is Using AI to Divert Thousands of Pounds of Meat Back on the Table"
    },
    {
      "id": "1197607",
      "titel": "upliance.ai: Küchengerät mit KI-Kochassistent",
      "beschreibung": "Das indische Start-up upliance.ai baut ein Küchengerät, das mehr als 16 Arbeitsschritte in einem Behälter zusammenfasst, darunter Zerkleinern, Rühren und Garen. Ein patentiertes Messer sowie Sensoren, die Hitze und Drehzahl regeln, sollen die Zubereitung ohne Küchenerfahrung ermöglichen; ein Bildschirm mit 8 Zoll führt Schritt für Schritt durch die Rezepte. Das Gerät richtet sich an Haushalte, denen für das Kochen Zeit oder Übung fehlt.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 53.43,
      "radius": 0.4434,
      "daten": "18. Mai 2025",
      "titelOriginal": "Kitchen Appliances Integrated with AI"
    },
    {
      "id": "1437392",
      "titel": "KI-gestützte Weinanalyse und Absatzprognose bei Tastry",
      "beschreibung": "Das Labor Tastry in San Luis Obispo, Kalifornien, analysiert eingesandte Weinproben chemisch und vergleicht die Verhältnisse von Zucker, Säure, Alkohol und weiteren Verbindungen per maschinellem Lernen mit einer Datenbank; erkannte Ungleichgewichte lässt der Winzer in einer zweiten Gärung korrigieren. Kunden kommen aus Kalifornien bis Australien, ein Profilabgleich dauert nach Angaben von Gründerin Katerina Axelsson 48 Stunden. Das 26-köpfige Team wertet zudem einen Fragebogen mit 150 Fragen von 200.000 Personen aus, um regionale Absatzchancen für einen Wein zu prognostizieren.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 149.98,
      "radius": 0.414,
      "daten": "20. Januar 2026",
      "titelOriginal": "Winemakers use AI for sales intel"
    },
    {
      "id": "1200754",
      "titel": "IBM Food Trust — Rückverfolgung entlang der Lieferkette",
      "beschreibung": "Eine Plattform von IBM, mit der Unternehmen ihre Produkte entlang der Lieferkette vorwärts und rückwärts verfolgen. Die Dokumentation nennt drei Anwendungsfelder: die Rückverfolgung von Produkten, das vertrauliche Teilen von Dokumenten mit Geschäftspartnern und den Nachweis von Echtheit und Herkunft gegenüber Verbrauchern. Zum Angebot gehören Schulungs- und Anleitungsmaterialien für einführende Organisationen.",
      "quellen": [
        {
          "name": "ibm.com",
          "url": "https://www.ibm.com/docs/de/food-trust?topic=overview"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 64.02,
      "radius": 0.4226,
      "daten": "23. Mai 2025",
      "titelOriginal": "IBM Food Trust"
    },
    {
      "id": "1391995",
      "titel": "AKA Studio — KI-Plattform für die Rezepturentwicklung",
      "beschreibung": "Das Food-Tech-Start-up AKA Foods hat 17,2 Mio. US-Dollar Seed-Kapital für den Start von AKA Studio eingesammelt, einer Plattform, die das Forschungswissen eines Herstellers bündelt: Messwerte zu Textur, Aroma und Geschmack aus Sensoriklaboren, Rohstoffspezifikationen und Zulassungsunterlagen. Darauf setzen KI-Assistenten auf, die Rezepturen vorschlagen und optimieren. Der Anbieter gibt an, Entwicklungszyklen von Jahren auf Wochen zu verkürzen; als Einsatzfelder nennt er Clean Label sowie Zucker- und Fettreduktion. Kundendaten fließen nach Firmenangaben nicht in das Training von Modellen ein.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 135.09,
      "radius": 0.4292,
      "daten": "20. November 2025",
      "titelOriginal": "AKA Foods secures $17.2m to launch AI system for food innovation"
    },
    {
      "id": "1177906",
      "titel": "Emotionserkennung aus Mimik als Grundlage für Speisenvorschläge",
      "beschreibung": "Verfahren der Emotionserkennung schließen aus Mimik, Augenbewegungen und weiteren Merkmalen auf den momentanen Gefühlszustand einer Person. Für die Lebensmittelbranche wird daraus die Kopplung an Speisenvorschläge abgeleitet: Empfehlung, Zubereitung oder Bestellung eines Gerichts passend zur erkannten Stimmung — Schokolade bei Traurigkeit, gehobene Küche zum Feiern, leichte Kost bei hoher Motivation.",
      "quellen": [
        {
          "name": "sciencedirect.com",
          "url": "https://www.sciencedirect.com/science/article/pii/S1566253523003354"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 69.79,
      "radius": 0.3683,
      "daten": "16. April 2025",
      "titelOriginal": "AI emotion recognition based on facial expression"
    },
    {
      "id": "1391991",
      "titel": "Barry Callebaut und NotCo entwickeln Schokolade mit KI",
      "beschreibung": "Der Schokoladenhersteller Barry Callebaut arbeitet mit dem Lebensmitteltechnologie-Unternehmen NotCo zusammen, um KI für die Entwicklung neuer Schokoladenrezepturen zu erproben. Angaben zu Umfang, Laufzeit oder ersten Ergebnissen der Zusammenarbeit liegen nicht vor.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 137.58,
      "radius": 0.3846,
      "daten": "25. November 2025",
      "titelOriginal": "Barry Callebaut Taps NotCo AI to Boost Chocolate Innovation"
    },
    {
      "id": "1187347",
      "titel": "Verkaufsautomaten mit Emotionserkennung",
      "beschreibung": "Verkaufsautomaten mit Kamera und Software zur Emotionserkennung lesen die Mimik der Nutzer aus und passen die angezeigten Produktvorschläge an die erkannte Stimmung an. Wirkt eine Person müde oder angespannt, rückt die Oberfläche etwa beruhigende Tees, herzhafte Snacks oder zuckerarme Varianten nach vorn. Als technische Grundlage dient Software zur Gesichtsanalyse, wie sie Anbieter wie Affectiva bereitstellen.",
      "quellen": [
        {
          "name": "affectiva.com",
          "url": "https://www.affectiva.com/"
        },
        {
          "name": "pagabogroup.com",
          "url": "https://pagabogroup.com/"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 56.52,
      "radius": 0.4515,
      "daten": "12. Mai 2025",
      "titelOriginal": "Mood-Responsive Vending AI"
    },
    {
      "id": "1241476",
      "titel": "CoDeveloper — KI-Assistent der IFT für die Produktentwicklung",
      "beschreibung": "Das Institute of Food Technologists hat auf der IFT FIRST 2025 in Chicago mit rund 15.000 Teilnehmern CoDeveloper vorgestellt, seine erste KI-gestützte Anwendung für die Produktentwicklung. Der Assistent „Sous“ greift auf die Datenbank begutachteter Forschung der Organisation zu und unterstützt bei Rezepturen, Nährwertauslobungen und Formulierungsproblemen; Beta-Nutzer berichten von deutlich kürzeren Entwicklungszyklen. Ebenfalls in Chicago zeigte Tastewise eine Anwendung, die Signale aus sozialen Netzwerken, Speisekarten, Bewertungen und Rezeptdatenbanken auf Geschmackstrends auswertet.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 152.29,
      "radius": 0.4325,
      "daten": "18. Juli 2025",
      "titelOriginal": "How AI is Disrupting Food Innovation – Here’s Why You Should be Paying Attention"
    },
    {
      "id": "1187343",
      "titel": "Mittagessen nach Wearable-Daten und Kalender",
      "beschreibung": "Ein Konzept, das den Zeitpunkt der Mittagsmahlzeit aus den Daten einer Smartwatch und dem Büroterminkalender bestimmt. Das Wearable liefert Werte zum Energieniveau, der Kalender die verfügbaren Zeitfenster; daraus errechnet das System den günstigsten Moment und löst die Lieferung einer Mahlzeit aus, ohne dass eine Entscheidung oder eine Bestellung in einer Anwendung nötig wäre. Als Bausteine genannt werden Fitness-Tracker und Kalenderdienste.",
      "quellen": [
        {
          "name": "fitbit.com",
          "url": "https://www.fitbit.com/global/us/technology"
        },
        {
          "name": "workspace.google.com",
          "url": "https://workspace.google.com/products/calendar/"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 55.88,
      "radius": 0.465,
      "daten": "12. Mai 2025",
      "titelOriginal": "Smart Lunch via Wearables"
    },
    {
      "id": "1221454",
      "titel": "Verkostungsroboter in chinesischen Lebensmittelfabriken",
      "beschreibung": "KI-gestützte Verkostungsroboter prüfen in der chinesischen Lebensmittelproduktion Qualität und Sortentreue traditioneller Erzeugnisse, darunter gepökelter Schweinebauch, schwarzer Reisessig, Trockennudeln und Tee. Laut einem Bericht des China National Light Industry Council an die Zentralregierung nehmen mehr als zehn Hersteller seit über drei Jahren an einem staatlich finanzierten Programm teil; seit 2015 haben die Roboter deren Gewinne um mehr als 300 Millionen Yuan (44,5 Mio. US-Dollar) erhöht. Beim Essighersteller Jiangsu Hengshun stieg der Umsatz um die Hälfte auf 1,8 Milliarden Yuan.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 140.91,
      "radius": 0.4081,
      "daten": "6. Mai 2019",
      "titelOriginal": "AI robots boost profits in Chinese food factories, paving way for mass use"
    },
    {
      "id": "1728244",
      "titel": "Foodics übernimmt die griechische KI-Firma Norma AI",
      "beschreibung": "Die saudi-arabische Software-Plattform Foodics für Gastronomiebetriebe hat die griechische KI-Firma Norma AI vollständig übernommen, nachdem sie im ersten Quartal 2025 einen Anteil erworben hatte. Norma, gegründet von George Henein und Anastasios Anastasiadis, brachte 2024 eine Business-Intelligence-Anwendung heraus, in der Gastronomen Fragen in normaler Sprache stellen und daraus Auswertungen und eigene Dashboards erzeugen. Die Technik läuft bereits in mehr als 10.000 Filialen von Foodics-Kunden; die Plattform zählt über 40.000 Filialen in den Golfstaaten und Nordafrika.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 75.14,
      "radius": 0.4468,
      "daten": "22. Juni 2026",
      "titelOriginal": "Foodics completes full takeover of Greek data intelligence startup Norma AI"
    },
    {
      "id": "1215873",
      "titel": "Planetary übernimmt Libre Foods samt Plattform Fungi.AI",
      "beschreibung": "Der Schweizer Fermentationshersteller Planetary hat Marke, Schutzrechte und Lieferverträge des spanischen Myzel-Start-ups Libre Foods übernommen; der Kaufpreis blieb offen. Libre Foods stellte ab Ende 2022 einen Speck-Ersatz aus Austernpilzen und Erbsenprotein her und erhielt 335.000 Euro Forschungsförderung von Neotec. Mit Microfy Systems und Software Logistik Artland entwickelte es die Plattform Fungi.AI, die per KI im Hochdurchsatz nach den besten Wachstumsbedingungen für Pilzstämme sucht. Planetary betreibt die einzige aktive industrielle Mykoprotein-Anlage auf dem europäischen Festland.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 144.07,
      "radius": 0.3683,
      "daten": "24. Juni 2025",
      "titelOriginal": "AI-led ingredient discovery: Mycelium Meat Startup Libre Foods"
    },
    {
      "id": "1680719",
      "titel": "allO — KI-Betriebssystem für Restaurants",
      "beschreibung": "Das Münchner Unternehmen allO hat 12 Mio. Euro in einer Serie-A-Runde unter Führung von Zigg Capital eingesammelt, um seine Plattform in Europa auszurollen. Die 2020 gegründete Firma bündelt Kasse, Zahlungen, Reservierung, Kiosk, Lieferung, Webshop und Backoffice in einem System und setzt darauf sogenannte digitale Mitarbeiter. Den Anfang macht ein Sprachagent, der eingehende Anrufe annimmt und Reservierungen sowie Abholbestellungen direkt einbucht; Agenten für Bestellwesen und Speisekarte sind angekündigt. allO zählt über 1.000 aktive Standorte in Deutschland.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 65.84,
      "radius": 0.4228,
      "daten": "2. Juni 2026",
      "titelOriginal": "Munich’s allO raises €12 million Series A to expand its AI operating system for restaurants across Europe"
    },
    {
      "id": "1215868",
      "titel": "Digitaler Zwilling für kultiviertes Geflügel bei Gourmey",
      "beschreibung": "Das Pariser Unternehmen Gourmey, das Stopfleber aus kultivierten Entenzellen im Bioreaktor herstellt, entwickelt mit der KI-Firma DeepLife einen digitalen Zwilling seiner Zellkultur. Das Modell wird mit Omics-Daten aus dem Produktionszyklus trainiert und mit Stoffwechselmodellen verbunden, um Nährmedien und Bioreaktorbedingungen virtuell durchzurechnen, bevor teure Laborversuche laufen. Eine techno-ökonomische Analyse beziffert die Kosten in einem 5.000-Liter-System auf 3,43 US-Dollar je Pfund. Gourmey betreibt Zulassungsverfahren in sechs Märkten, darunter die USA, die Schweiz und die EU.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 146.84,
      "radius": 0.4423,
      "daten": "26. Juni 2025",
      "titelOriginal": "Could AI Be the Solution for Cheap Cultivated Meat?"
    },
    {
      "id": "1664500",
      "titel": "KI-gestützte Abfallerfassung in Großküchen",
      "beschreibung": "Eine begutachtete Studie von 2025 hat die Erfassung von Lebensmittelabfällen an fünf gastronomischen Standorten in Deutschland, Griechenland und der Schweiz untersucht (Sigala et al.). Das eingesetzte KITRO-System verbindet Waage und Kamera mit Computer Vision und wiegt und klassifiziert Abfälle in Echtzeit, aufgeschlüsselt nach Warengruppe, Entstehungsort und Kosten. Die Betriebe reagierten mit häufigerem Nachlegen kleinerer Mengen, angepassten Portionsgrößen und überarbeiteten Speisekarten. Anbieter berichten Reduktionen von 30 bis 53 Prozent.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 75.14,
      "radius": 0.4076,
      "daten": "28. Mai 2026",
      "titelOriginal": "AI-Enabled Waste Tracking in Commercial Kitchens"
    },
    {
      "id": "1215866",
      "titel": "Shiru sucht per KI natürliche GLP-1-wirksame Proteine",
      "beschreibung": "Das Start-up Shiru öffnet seine KI-Plattform zur Zutatensuche für ein Firmenkonsortium, die GLP-1 Innovation Alliance, das natürliche Proteine und Peptide mit Bindung an GLP-1-Rezeptoren und weitere Rezeptoren der Appetitregulation finden soll. Über eine Weboberfläche lässt sich eine Datenbank aus Millionen Molekülen nach Proteinsequenz, Funktion und erwarteter Ausbeute in mikrobiellen Wirten durchsuchen; Shiru stellt Partnern auch Proteinmuster her. Gründerin Jasmin Hume bezeichnet das Feld natürlicher GLP-1-Wirkstoffe im Lebensmittelbereich als weitgehend unbesetzt.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 149.33,
      "radius": 0.3685,
      "daten": "23. Juni 2025",
      "titelOriginal": "Natural GLP‑1–stimulating proteins via AI platform and protein library"
    },
    {
      "id": "1664497",
      "titel": "Afresh — KI-Bestellvorschläge für Frischesortimente",
      "beschreibung": "Die Software von Afresh erzeugt filialgenaue Bestellvorschläge für Frischeabteilungen im Einzelhandel und wertet dafür Abverkäufe, Bestände, Saisonalität und Wetter aus; sie ist auf Verderblichkeit und Artikel ohne Barcode ausgelegt. Das System läuft in über 12.000 Filialabteilungen großer US-Ketten, darunter flächendeckend bei Albertsons für Fleisch und Fisch und bei WinCo Foods für Obst und Gemüse. 2026 wurde es auf das gesamte Sortiment ausgeweitet. Nach Angaben des Unternehmens wurden so hochgerechnet mehr als 200 Millionen Pfund Lebensmittelverluste je Jahr vermieden.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 59.76,
      "radius": 0.4471,
      "daten": "28. Mai 2026",
      "titelOriginal": "Afresh: Replacing Manual Forecasting with AI in Fresh Grocery"
    },
    {
      "id": "1215865",
      "titel": "Smey — fermentierte Fette statt Palmöl und Kakaobutter",
      "beschreibung": "Das deutsch-französische Unternehmen Smey gewinnt Öle aus Hefefermentation und wählt die Stämme per KI aus. Die Datenbank Neobank of Yeasts enthält nach Firmenangaben über 1.000 Hefestämme samt Stoffwechselprofilen; statt Hefen gentechnisch zu verändern, sucht das System Stämme, die das gewünschte Fettsäureprofil bereits natürlich bilden, etwa Stearinsäure für Kakaobutter-Ersatz. Das soll die Entwicklungszeit von zwei Jahren auf 30 Tage senken. Die Produkte cHOB für Kosmetik und cCB mit 35 % Stearinsäure zielen auf Abnehmer, die ihre Lieferketten vor der EU-Entwaldungsverordnung umstellen.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 136.31,
      "radius": 0.4184,
      "daten": "26. Juni 2025",
      "titelOriginal": "Using AI & Fermentation to Create Deforestation-Free Fats"
    },
    {
      "id": "1549230",
      "titel": "nFuse — Bestellungen des Handels über WhatsApp und Viber",
      "beschreibung": "Die B2B-Plattform nFuse nimmt Bestellungen von Händlern und Gastronomiebetrieben über WhatsApp, Viber und SMS entgegen, per Text, Sprachnachricht oder Foto und ohne eigene App. Gegründet haben sie Stoyan Ivanov und Stefan Radov, die zusammen rund 30 Jahre bei Coca-Cola in Vertrieb und Distribution gearbeitet haben; Eleven Ventures und LAUNCHub haben 2 Mio. US-Dollar investiert. Während klassische B2B-Portale im fragmentierten Handel bei 10 bis 15 % Nutzung stagnieren, nennt nFuse über 70 % bei Firmenkunden, 15 bis 30 % mehr Umsatz je Verkaufsstelle und acht Wochen Einführungszeit.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 70.92,
      "radius": 0.4266,
      "daten": "7. April 2026",
      "titelOriginal": "AI ordering layer for FMCG brands and distributors"
    },
    {
      "id": "1213977",
      "titel": "No-Pee Lollipop: KI-entwickeltes Produktkonzept",
      "beschreibung": "Ein Lutscher, der Getränke begleiten und den Flüssigkeitshaushalt stützen soll, ohne den Harndrang zu erhöhen — entwickelt mit der KI-Anwendung Giuseppe AI. Diese entwirft Produktkonzepte für eine Marke und Zielgruppe und stellt anschließend die Rezeptur aus tausenden skalierbaren Zutaten zusammen, wobei sie Kostenziele und regulatorische Vorgaben berücksichtigt. Der Anbieter gibt an, dadurch deutlich weniger Versuchsschleifen zu benötigen.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 130.57,
      "radius": 0.4572,
      "daten": "26. Juni 2025",
      "titelOriginal": "No-Pee Lollipop"
    },
    {
      "id": "1523606",
      "titel": "EPIC-KITCHENS — annotierter Bilddatensatz aus Privatküchen",
      "beschreibung": "Ein offener Datensatz für maschinelles Sehen in der Küche: 32 Hobbyköche aus zehn Nationen in vier Städten in Großbritannien, Kanada und den USA trugen mehrere Tage lang eine Kopfkamera, während sie kochten, putzten und aufräumten. Aus 55 Stunden Video entstanden 11,5 Millionen annotierte Einzelbilder, die die Teilnehmer selbst kommentierten. Geleitet wird es von Dima Damen von der University of Bristol gemeinsam mit der University of Toronto und der Universität Catania; Vorbild ist ImageNet, wo Deep-Learning-Verfahren die Erkennungsgenauigkeit von 85 % im Jahr 2012 auf rund 95 % hoben.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 71.87,
      "radius": 0.3683,
      "daten": "30. Mai 2018",
      "titelOriginal": "How An Obscure Academic Project May Have Just Started A Kitchen Robot Revolution"
    },
    {
      "id": "1209041",
      "titel": "KI in der Lebensmittelentwicklung: Anwendungen und Beispiele",
      "beschreibung": "Ein Überblick zu Einsatzfeldern von KI und maschinellem Lernen in der Produktentwicklung: Rezepturoptimierung über große Datensätze zu Zutatenwechselwirkungen, Vorhersage von Verbraucherpräferenzen aus Bewertungen und sozialen Medien sowie Lieferantenauswahl und Frühwarnung vor Rohstoffengpässen. Grand View Research beziffert den Weltmarkt für KI in Lebensmitteln und Getränken 2023 auf knapp 8,5 Milliarden US-Dollar und erwartet bis 2030 ein jährliches Wachstum von 39 %. Als Beispiele dienen McCormick, das seit 2019 mit IBM Research Aromadaten auswertet, und NotCo mit der Plattform Giuseppe.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 140.41,
      "radius": 0.3886,
      "daten": "6. Juni 2025",
      "titelOriginal": "How AI Is Reshaping Product Development"
    },
    {
      "id": "1523604",
      "titel": "Bezahlte Hausarbeit als Trainingsdaten für Roboter",
      "beschreibung": "In Los Angeles filmen Hunderte Gig-Arbeiter mit Kopf- und Handgelenkkameras alltägliche Hausarbeit — Geschirrspülen, Kochen, Putzen —, damit Robotermodelle menschliche Bewegungen lernen. Der Vermittler Instawork zahlt 80 US-Dollar für zwei Stunden Material, jede Aufnahme muss 2 bis 15 Minuten dauern; das Start-up Sunain verschickt Handgelenkkameras an mehr als 1.400 Beitragende in der Region. Encord nahm 60 Mio. US-Dollar auf, Scale AI sammelte 100.000 Stunden Videomaterial. Grand View Research erwartet für den Markt für Datenerhebung und -annotation bis 2030 bis zu 17 Milliarden US-Dollar.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 61.71,
      "radius": 0.4042,
      "daten": "12. März 2026",
      "titelOriginal": "Why hundreds of people in L.A. are strapping cameras on their bodies to do chores"
    },
    {
      "id": "1208822",
      "titel": "PREVAI: KI-Bedarfsprognose in der Frischkäseherstellung",
      "beschreibung": "Das Projekt PREVAI entwickelt eine Cloud-Plattform, die den Materialbedarf in der Frischkäseherstellung vorhersagt und Einkauf wie Produktion daran ausrichtet. Dafür werden Daten aus Einkauf, Vertrieb und Fertigung zusammengeführt und mit KI und maschinellem Lernen ausgewertet. Ziel ist, Fehlmengen und Überproduktion bei einem verderblichen Produkt zu vermeiden und die Nachfrageplanung von der direkten Kundenabsprache auf Datenauswertung umzustellen. Beteiligt sind der spanische Hersteller Innolact und Triple Alpha Innovation.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 137.88,
      "radius": 0.3963,
      "daten": "14. Juni 2025",
      "titelOriginal": "AI based demand forecasting and purchasing for end-to-end optimisation of cream cheese manufacturing"
    },
    {
      "id": "1497779",
      "titel": "Sprach-KI für Gästeanrufe in Restaurants und Hotels",
      "beschreibung": "Slang AI betreibt eine Sprachplattform, die eingehende Gästeanrufe in Restaurants, Hotels und Veranstaltungsorten rund um die Uhr annimmt: Sie nimmt Reservierungen entgegen, beantwortet Fragen, erkennt Stammgäste und leitet komplexe Anliegen an das Personal weiter. In einer Series-B-Runde unter Führung von US Venture Partners kamen 36 Mio. US-Dollar zusammen, davon 28 Mio. Eigen- und 8 Mio. Fremdkapital; die Gesamtfinanzierung steigt damit auf 68 Mio. US-Dollar. Das Kapital soll in den Ausbau der Sprach-KI, multimodale Funktionen und die Teams fließen.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 75.14,
      "radius": 0.465,
      "daten": "25. Februar 2026",
      "titelOriginal": "Slang AI raises $36m to advance hospitality voice platform"
    },
    {
      "id": "1208821",
      "titel": "Smart AI Orchestrator: Tagesplanung in der Milchverarbeitung",
      "beschreibung": "Smart AI Orchestrator ist ein KI-Modul für die Milchverarbeitung, das Prozessdaten und den laufenden Produktionsstatus erfasst und daraus tägliche Produktionspläne erzeugt. Ziel sind höhere Prozess- und Energieeffizienz bei gleichbleibender Produktqualität und -sicherheit; zugleich soll das Modul als Wissensbasis für das Produktionspersonal dienen. Bisherige Werkzeuge zur Mikroplanung lassen sich kaum an den laufenden Betrieb anpassen und erfassen Energie- und Wasserverbrauch nur unzureichend. Beteiligt sind die slowenische Molkerei Mlekarna Celeia und der Automatisierer Metronik.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 130.57,
      "radius": 0.391,
      "daten": "14. Juni 2025",
      "titelOriginal": "Smart AI Orchestrator"
    },
    {
      "id": "1415410",
      "titel": "Automatenkioske mit warmen Speisen bei Sodexo",
      "beschreibung": "Sodexo stattet in den USA betreute Standorte mit der Warmspeisentechnik von Automated Retail Technologies (ART) aus. Die Kioske arbeiten mit KI und Robotik und umfassen das System Just Baked Smart Bistro, an dem Gäste warme Gerichte von einfachen bis zu speziellen Varianten entnehmen können. Sodexo North America verweist auf den Ausbau seines Partnernetzes für KI-gestützte Speisenproduktion.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 55.77,
      "radius": 0.4326,
      "daten": "26. April 2024",
      "titelOriginal": "Automated Hot Food Kiosks"
    },
    {
      "id": "1208820",
      "titel": "R-AI-VQC: KI-Sichtprüfung in der Lebensmittelverpackung",
      "beschreibung": "Das Projekt R-AI-VQC rüstet die Qualitätskontrolle in der Lebensmittelverpackung mit Echtzeitüberwachung und KI-gestützter Videoanalyse aus. Beteiligt ist der ungarische Hersteller Varga-Szárnyas Kft., der die Prüfung bei wachsenden Produktionsmengen nicht mehr allein manuell abdecken kann. Ergänzend entsteht eine Cloud-Lösung für das Training der Modelle. Erwartet wird eine um 15 Prozent höhere Produktionseffizienz.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 138.23,
      "radius": 0.4165,
      "daten": "14. Juni 2025",
      "titelOriginal": "REACH Agrifood AI-supported Visual Quality Control"
    },
    {
      "id": "1415409",
      "titel": "WasteInsight: KI-Analyse gegen Verderb im Lebensmittelhandel",
      "beschreibung": "Retail Insight hat seine Plattform WasteInsight für die Bestandsführung im Lebensmitteleinzelhandel um drei Funktionen erweitert, die auf der bestehenden Abschriftsoptimierung aufsetzen: datengestützte Rabattierung für Ware am Ende der Haltbarkeit, eine Steuerung, die unverkaufte Lebensmittel an Spendenkanäle leitet, und Warnmeldungen zu Ablaufdaten als Hinweis auf Risiken der Lebensmittelsicherheit. Die Anwendung wertet Verkaufsmuster, Nachfrageschwankungen und Haltbarkeiten mit KI aus und leitet daraus Empfehlungen gegen Verderb ab.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 58.57,
      "radius": 0.4119,
      "daten": "21. September 2025",
      "titelOriginal": "Upgraded AI-Powered Grocer Platforms"
    },
    {
      "id": "1208819",
      "titel": "EggAI: Bedarfsprognose gegen Lebensmittelverschwendung",
      "beschreibung": "Das Projekt EggAI erweitert die Software des slowenischen Anbieters EggOS um KI-gestützte Bedarfsprognose, Bestandsführung und Menüplanung für die Betriebsverpflegung. Menüs sollen anhand von Gästeprofilen und tatsächlichem Verbrauch geplant und Bestellmengen laufend angepasst werden; der Weg der Lebensmittel wird über Blockchain dokumentiert. Der Anbieter gibt an, mit seinem System EggERP einen Marktanteil von 85 % in Slowenien zu halten, und erwartet bis zu 30 % weniger Lebensmittelverschwendung sowie bis zu 40 % geringeren Ressourceneinsatz. Die Laufzeit beträgt zwölf Monate.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 130.57,
      "radius": 0.4485,
      "daten": "15. Mai 2024",
      "titelOriginal": "EggAI: AI-Driven Solution for Reducing Food Waste in the Food Processing SME"
    },
    {
      "id": "1403849",
      "titel": "Funch: KI-gestütztes Mittagessen-Abonnement in Dubai",
      "beschreibung": "Funch betreibt in Dubai ein Mittagessen-Abonnement auf Guthabenbasis zu 19 AED pro Tag ohne Liefergebühr; Nutzer hinterlegen Vorlieben und Lieferfenster und können Mahlzeiten aussetzen, pausieren oder kündigen. KI dient der Nachfrageprognose, der Routenplanung, dem Menüwechsel und der Verringerung von Abfall — das Unternehmen führt dies auf vorab geplante Bestellungen und dadurch weniger Fahrten zurück. Gegründet wurde Funch 2025 von Ahmad Joehnny und Ghada Zanaty; in einer Pre-Seed-Runde unter Führung von Angelspark kamen 500.000 US-Dollar zusammen.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 53.43,
      "radius": 0.4315,
      "daten": "28. November 2025",
      "titelOriginal": "AI-powered food subscription operations"
    },
    {
      "id": "1178527",
      "titel": "NotCo öffnet seine KI-Plattform Giuseppe für Markenhersteller",
      "beschreibung": "NotCo vergibt seine KI-Plattform Giuseppe künftig über Lizenzen und Entwicklungspartnerschaften und tritt damit als B2B-Anbieter auf. Das Angebot Concept Quant erzeugt aus Social-Listening-Daten digitale Zwillinge realer Käufer und leitet daraus Produktkonzepte für bestimmte Märkte und Verzehranlässe ab. Erprobt wurde die Plattform zuvor an eigenen Entwicklungen, etwa einer pflanzlichen Variante des Mac & Cheese von Kraft Heinz und einem eifreien Custard für Shake Shack. Geschäftsführer Matias Muchnick nennt als Ausgangspunkt die üblichen zwei bis drei Jahre von der Idee bis ins Regal.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 130.57,
      "radius": 0.3686,
      "daten": "9. April 2025",
      "titelOriginal": "NotCo opens access to its AI technology to speed product innovation"
    },
    {
      "id": "1213067",
      "titel": "Green Dot Assist: KI-Assistent für Starbucks-Filialen",
      "beschreibung": "Starbucks hat mit Green Dot Assist einen generativen KI-Assistenten für Baristas und Filialleitungen vorgestellt und erprobt ihn in 35 Filialen. Die iPad-Anwendung läuft auf Microsoft Azure und unterstützt bei der Einarbeitung neuer Mitarbeiter, bei der Zubereitung einzelner Getränke und bei kurzfristigen Schichtänderungen. Sie hilft außerdem bei Gerätestörungen: In einem Demonstrationsvideo diagnostiziert ein Barista damit eine Espressomaschine mit ungleichmäßigem Bezug und erhält 3D-Anleitungen. Vorgestellt wurde die Anwendung auf einer Mitarbeiterkonferenz in Las Vegas.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 53.43,
      "radius": 0.4162,
      "daten": "12. Juni 2025",
      "titelOriginal": "Starbucks Unveils Green Dot Assist, a Generative AI Virtual Assistant for Coffee Shop Employees"
    },
    {
      "id": "1177975",
      "titel": "Blockchain und die Ziele des Lieferkettenmanagements",
      "beschreibung": "Eine Studie untersucht an Fallbeispielen, wie Blockchain auf Ziele des Lieferkettenmanagements wirkt: Kosten, Qualität, Risikominderung, Nachhaltigkeit und Flexibilität. Als zentrale Hebel gelten die Verbindung mit IoT-Sensorik, RFID und GPS zur Verfolgung von Waren sowie der Identitätsnachweis für Personen und Güter. Unveränderliche Aufzeichnungen erlauben Lieferanten eigene Prüfungen und machen Abweichungen bei Transportdauer und Lagerort sichtbar — wichtig etwa für Kühlware. Als Beispiel dient der E.-coli-Ausbruch bei Chipotle 2015 mit 55 Erkrankten und einem Kursverlust von 42 %.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 137.65,
      "radius": 0.465,
      "daten": "16. April 2018",
      "titelOriginal": "1 Blockchain’s roles in meeting key supply chain management objectives"
    },
    {
      "id": "1204199",
      "titel": "KI-Roboterköche in Küche und Gastronomie",
      "beschreibung": "Roboter mit Sensorik, Kameras und KI übernehmen Küchenarbeiten wie Rühren, Braten, Wenden von Burgern und Belegen von Pizzen. Moley Robotics bietet eine deckenmontierte Küche mit zwei Armen, die Temperaturen regelt, Zutaten mischt, Töpfe rührt und danach reinigt; der Anbieter nennt über 5.000 hinterlegte Rezepte und mehr als 1.200 ausgewertete Parameter je Mikrosekunde. Als Nutzen gelten Entlastung bei Personalmangel, weniger Abfall durch genaue Dosierung und geringeres Kontaminationsrisiko. Grenzen liegen in der Vorbereitung der Zutaten — Schälen, Würfeln, Schneiden — und im hohen Preis.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 71.95,
      "radius": 0.465,
      "daten": "5. Dezember 2022",
      "titelOriginal": "AI Robot Chefs: The Future of Cooking?"
    },
    {
      "id": "1177601",
      "titel": "AI4FoodDB: Datenbank zu Ernährung, Wearables und Gesundheit",
      "beschreibung": "Die AI4Food-Datenbank (AI4FoodDB) bündelt Daten aus einer einmonatigen Ernährungsintervention zur Gewichtsabnahme mit 100 übergewichtigen und adipösen Teilnehmern. Erhoben wurde manuell, klinisch und digital über tragbare Geräte; die Sammlung umfasst zehn Datensätze zu Anthropometrie, Lebensstil, Ernährung, Biomarkern, Darmmikrobiom, Vitalzeichen, Aktivität, Schlaf und Gemütszustand. Ziel ist, Zusammenhänge zwischen Lebensstil, biologischen und digitalen Größen und Gesundheitsergebnissen auswertbar zu machen und neue Biomarker zu finden. Beschrieben wurde sie 2023 in der Zeitschrift Database.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 140.43,
      "radius": 0.4359,
      "daten": "19. Juli 2023",
      "titelOriginal": "AI4FoodDB: A Database for Personalized e-Health Nutrition and Lifestyle through Wearable Devices and Artificial Intelligence"
    },
    {
      "id": "1204200",
      "titel": "KI-Kochroboter in Chinas Gastronomie",
      "beschreibung": "KI-gesteuerte Kochroboter übernehmen in China Arbeiten in Restaurantküchen; in einem Lokal im Bezirk Jinjiang in Chengdu arbeiten fünf Geräte, eines brät ein Gericht in 63 Sekunden. Bei einem Vergleich mit dem Hunan-Koch Yang Sun brauchte der Roboter für drei Gerichte 3 Minuten und 8 Sekunden, der Koch 9 Minuten und 32 Sekunden. Laut einem Bericht der China Hospitality Association von 2024 haben 65,7 % der befragten Betriebe Digitalisierung eingeplant. Die Marktaufsicht des Pekinger Bezirks Haidian erteilte dem Robotikunternehmen EncoSmart eine Betriebserlaubnis für Lebensmittel.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 72.06,
      "radius": 0.3907,
      "daten": "18. Dezember 2024",
      "titelOriginal": "AI-powered robots transform cooking with convenience and efficiency"
    },
    {
      "id": "1177599",
      "titel": "NotCos veganes Hühnerfleisch bei Burger King Chile",
      "beschreibung": "Burger King Chile nimmt das mit KI entwickelte vegane Hühnerfleisch von NotCo in zwei Sandwiches und als Nuggets ins Sortiment; zuvor hatte das chilenische Unternehmen bereits Menüartikel für die Kette in Chile und Paraguay geliefert. Zeitgleich stellen zwei chilenische Filialen ihr gesamtes Angebot befristet auf fleischfrei um. NotCo entwickelt pflanzliche Produkte mit seiner KI Giuseppe, sammelte in einer Serie-D-Runde 235 Mio. US-Dollar ein und wurde mit 1,5 Mrd. US-Dollar bewertet. Mit Kraft Heinz besteht ein Gemeinschaftsunternehmen für pflanzliche Varianten von deren Marken.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 152.29,
      "radius": 0.4256,
      "daten": "15. April 2025",
      "titelOriginal": "NotCo Brings AI-Developed Vegan Chicken to Burger King"
    },
    {
      "id": "1168237",
      "titel": "Florastor: KI-erzeugte Bildwelt für Probiotika-Werbung",
      "beschreibung": "Die Kampagne Innard City für das Probiotikum Florastor Dual Action stellt dessen Wirkung im Darm als begehbare Bildwelt dar. Statt einer Filmproduktion erzeugte das Kreativteam die Umgebungen mit KI und fügte reale Schauspieler erst in der Nachbearbeitung ein — ein Vorgehen, das an die Produktion von Videospielen angelehnt ist. Anlass ist, dass der Nutzen von Nahrungsergänzungsmitteln für Käufer nicht unmittelbar sichtbar ist.",
      "quellen": [
        {
          "name": "digitalproducer"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 62.69,
      "radius": 0.386,
      "daten": "12. März 2025",
      "titelOriginal": "AI-Driven Probiotic Campaigns"
    },
    {
      "id": "1177034",
      "titel": "Rivalz: KI-gestützte Rezeptur für proteinreiche Snacks",
      "beschreibung": "Der US-Anbieter Rivalz Snacks setzt prädiktive Analytik ein, um einen extrudierten Snack mit viel Protein und Ballaststoffen, niedrigem glykämischem Index und wenig Kohlenhydraten herzustellen. Erste Versuche scheiterten an Zellstruktur, geringer Expansion und hoher Schüttdichte. Nach Angaben von Geschäftsführer Peter Grant Barrick verringerte die Auswertung die geschätzten 500.000 sinnvollen Versuche auf 71 und brachte das Produkt in sechs statt der üblichen 18 Monate zur Marktreife. Marketingchefin Erica Pattni gibt sinkende Kundengewinnungskosten und eine Verdopplung der Kundenbindung an.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 143.8,
      "radius": 0.465,
      "daten": "13. März 2024",
      "titelOriginal": "Rivalz showcases nutritious snacking with “AI you can taste”"
    },
    {
      "id": "1163523",
      "titel": "Haribo: Spielaktionen an Flughäfen",
      "beschreibung": "Haribo bespielt Flughäfen in Großbritannien und Europa mit zwei Handyspielen, dem Giant Wheel of Fortune und Uncover More Fun, bei denen Reisende Markenartikel und Goldbären gewinnen können. Die Ansprache der Spieler wird mit KI personalisiert. Umgesetzt wurde die Aktion mit der Agentur Agency 72, die dafür ihre Plattform Retail+ für Inhalte, Gewinnspiele und digitale Erlebnisse einsetzt.",
      "quellen": [
        {
          "name": "marketing-beat"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 74.1,
      "radius": 0.465,
      "daten": "25. September 2024",
      "titelOriginal": "Gamified In-Airport Activations"
    },
    {
      "id": "1176257",
      "titel": "Starday: Datenplattform für Produktentwicklung und Eigenmarken",
      "beschreibung": "Starday entwickelt Lebensmittel auf Grundlage einer eigenen Datenplattform, die Verbraucherdaten auswertet und daraus Produktchancen ableitet. Das Unternehmen führt eigene Marken und arbeitet zugleich mit Händlern, Markenherstellern und Produzenten, denen es Sortimentsänderungen, Optimierungen bestehender Linien sowie aufkommende Geschmacksrichtungen, Formate und Produkteigenschaften vorhersagt. Zu den Eigenmarken zählen die allergenfreien Süßkartoffelcracker Habeya, die Kichererbsen-Topper All Day, die Low-FODMAP-Reismischungen Cozumi und der Schokoladen-Haselnuss-Aufstrich Gooey.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 141.05,
      "radius": 0.3686,
      "daten": "10. April 2025",
      "titelOriginal": "AI-powered food innovation"
    },
    {
      "id": "1163516",
      "titel": "Artly Barista Bot: neue Roboterhand für die Kaffeezubereitung",
      "beschreibung": "Artly AI hat für seinen Barista Bot eine neue Roboterhand vorgestellt, die die Beweglichkeit erhöht und den Umgang mit Tassen und Barista-Werkzeug verbessert. Bisherige Spezialgreifer sind auf einzelne Aufgaben zugeschnitten und für feinere Handgriffe zu unbeweglich. Der Roboter arbeitet mit einem Vision-Language-Action-Modell, das aus Bewegungsaufnahmen erfahrener Baristas gelernt wurde, und bereitet nach Angaben des Anbieters 28 warme und kalte Getränke zu. Eingesetzt wird er in Cafés, Veranstaltungsräumen und Restaurants.",
      "quellen": [
        {
          "name": "artly.coffee"
        },
        {
          "name": "prnewswire"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 69.52,
      "radius": 0.4101,
      "daten": "17. März 2025",
      "titelOriginal": "Advanced Robotic Baristas"
    },
    {
      "id": "1148746",
      "titel": "Cultivator: Chatbot zu kultiviertem Fleisch",
      "beschreibung": "Die Tierschutzorganisation World Animal Protection und das KI-Unternehmen PubTrawlr haben mit dem Cultivator einen Chatbot zu kultiviertem Fleisch veröffentlicht, der Fragen beantwortet und Zugang zu Forschungsergebnissen und Einschätzungen aus der Branche gibt. Er ist über die Website von World Animal Protection erreichbar und soll die Akzeptanz von Fleisch ohne Schlachtung erhöhen. Aus demselben Feld stammt das Clean Meat Terminal des New Yorker Unternehmens Pythag Tech, eine Marktdatenplattform für die zelluläre Landwirtschaft, die sich an Investoren, Forschende und Unternehmen richtet.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 143.77,
      "radius": 0.4504,
      "daten": "14. November 2024",
      "titelOriginal": "AI-Powered Cultivated Meat Chatbot"
    },
    {
      "id": "1197614",
      "titel": "Solarbetriebene tragbare Kochgeräte",
      "beschreibung": "Tragbare Kocher, die Sonnenlicht bündeln und ohne Strom oder Brennstoff garen. Der US-amerikanische Hersteller Sun Oven baut solche Geräte seit 1986 und richtet sich an Haushalte, die emissionsarm kochen oder ohne feste Energieversorgung auskommen wollen. Die technische Entwicklungslinie zielt auf eine stärkere Bündelung der Solarenergie auch bei teilweiser Bewölkung sowie auf Geräte, die den Garvorgang über KI und vernetzte Sensorik selbst steuern.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 53.5,
      "radius": 0.5991,
      "daten": "18. Mai 2025",
      "titelOriginal": "Solar-Powered Portable Appliances for Cooking"
    },
    {
      "id": "1161582",
      "titel": "Scorpion — einarmiger Getränkeroboter von Richtech Robotics",
      "beschreibung": "Einarmiger Serviceroboter, der Getränke ausschenkt und dabei Empfehlungen nach Vorlieben und Stimmung des Gastes ausspricht. Richtech Robotics setzt dafür NVIDIAs Rechenplattform Jetson Orin ein; der Anbieter gibt eine Genauigkeit von über 95 % bei Bewegungserkennung und Hindernisvermeidung an. Der Erstauftritt erfolgte im Wein- und Spirituosengeschäft 1936 Wine and Spirits in New York, wo Scorpion Verkostungen übernimmt. 500 Einheiten sind zur Auslieferung vorgesehen, vom gehobenen Barbetrieb bis zum stark frequentierten Spirituosenhandel.",
      "quellen": [
        {
          "name": "richtechrobotics"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 66.95,
      "radius": 0.3683,
      "daten": "24. September 2024",
      "titelOriginal": "Beverage Service Robots"
    },
    {
      "id": "1148745",
      "titel": "Betty Crocker Dream Bake Studio — KI-Pop-up für Tortenentwürfe",
      "beschreibung": "Pop-up-Fläche, auf der Besucher ihren Wunschkuchen per KI entwerfen. Im Trafford Centre in Manchester skizzieren Passanten ein Motiv digital und geben Textvorgaben ein; aus dem erzeugten Bild stellt das System die passenden Zutaten zusammen und gestaltet eine Backset-Verpackung mit dem eigenen Motiv, die kostenlos mitgenommen werden kann. Anlass der Aktion von Betty Crocker war eine Untersuchung der Agentur Momentum Worldwide, wonach viele Menschen aus Zweifel am eigenen Können gar nicht erst backen.",
      "quellen": [
        {
          "name": "bettycrocker"
        },
        {
          "name": "lbbonline"
        }
      ],
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 145.19,
      "radius": 0.465,
      "daten": "10. Oktober 2024",
      "titelOriginal": "AI-Powered Bakery Pop-Ups"
    },
    {
      "id": "1142855",
      "titel": "KI in Rezepturentwicklung und Prozessoptimierung",
      "beschreibung": "Einsatz von maschinellem Lernen, um Ausbeute und Kosten in der Lebensmittelproduktion zu steuern. Algorithmen sagen physikalische und chemische Eigenschaften eines Lebensmittels voraus und modellieren die Prozessbedingungen im großtechnischen Maßstab, sodass Rezepturen und Anlagenparameter rechnerisch statt im Versuch bestimmt werden. Dasselbe Vorgehen dient bei alternativen Proteinen, etwa kultiviertem Fleisch, dazu, aus Versuchsdaten die günstigsten Produktionsbedingungen für die Maßstabsvergrößerung abzuleiten.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 145.75,
      "radius": 0.2742,
      "daten": "12. Februar 2025",
      "titelOriginal": "AI Food R&D and Optimisation"
    },
    {
      "id": "1197578",
      "titel": "Drohnenlieferung bei Just Eat Takeaway.com",
      "beschreibung": "Auslieferung von Essensbestellungen per Drohne, betrieben von Just Eat Takeaway.com gemeinsam mit dem irischen Drohnenbetreiber Manna. Gestartet ist der Dienst in Dublin; Bestellungen erreichen die Kunden dort nach Angaben des Unternehmens in bis zu drei Minuten. Eine Ausweitung auf weitere Märkte ist vorgesehen. Ergänzend setzt der Lieferdienst KI-gestützte Assistenten ein, um Bestellabwicklung und Kundenbetreuung zu automatisieren.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 69.73,
      "radius": 0.5639,
      "daten": "18. Mai 2025",
      "titelOriginal": "AI and Drones: Transforming the Future of Food Delivery"
    },
    {
      "id": "1159651",
      "titel": "Byte by Yum — KI-Assistent für Taco-Bell-Restaurantleiter",
      "beschreibung": "Softwarepaket von Yum Brands, das Restaurantleitern Personaleinsatz, Bestandsführung und Öffnungszeiten vorschlägt. Auf einer Investorenveranstaltung in Brooklyn bezifferte der Konzern seine Investitionen in Digitales und Technik auf eine Milliarde US-Dollar und führte den Byte AI Restaurant Coach in einem gespielten Dialog mit einer Filialleitung vor. Rund 500 Taco-Bell-Filialen in den USA nehmen Bestellungen am Drive-through per Sprach-KI auf, gegenüber etwa 100 im Juli 2024; knapp 25.000 der 61.000 Restaurants von Yum weltweit nutzen ein Produkt der Reihe. Ob die gezeigten Aufgaben bereits im Betrieb laufen, ließ das Unternehmen offen.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 61.24,
      "radius": 0.4224,
      "daten": "6. März 2025",
      "titelOriginal": "Yum's Taco Bell shows off AI tool for fast-food managers"
    },
    {
      "id": "1145218",
      "titel": "Concept Genie — generative Produktkonzepte bei Ai Palette",
      "beschreibung": "Werkzeug des Singapurer Anbieters Ai Palette, das aus Trenddaten per generativer KI neue Produktkonzepte erzeugt. Es sitzt zwischen der Erkenntnisplattform Foresight Engine, die Bilder und Texte aus Onlinehandel, Speisekarten, Rezepten und sozialen Medien in 16 Sprachen aus 24 Ländern auswertet, und dem Prüfwerkzeug Screen Winner, das Konzepte auf Relevanz und Eigenständigkeit bewertet. Nach Angaben des Anbieters verkürzt sich die Konzeptentwicklung damit von drei bis sechs Monaten auf einen Tag, während Verfeinerung und Validierung im Markt weiterhin nötig bleiben. Zu den Nutzern der Plattform zählen Nestlé und Danone.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 148.29,
      "radius": 0.465,
      "daten": "18. April 2023",
      "titelOriginal": "AI Palette unveils generative AI tool to speed up new product development"
    },
    {
      "id": "1777197",
      "titel": "Terraflos übernimmt +NUTRI Co",
      "beschreibung": "Mehrheitsbeteiligung des uruguayischen Wirkstoffherstellers Terraflos am peruanischen Foodtech-Start-up +NUTRI Co, mit einem Kaufpreis im achtstelligen Bereich. Die Gründer Carlos Noceda und Daniel Nuñez bleiben beteiligt und führen das Geschäft weiter. +NUTRI Co formuliert funktionelle Lebensmittel über die eigene KI-Plattform Virgilio IA, ist in Peru, Chile und Mexiko aktiv und führt mehr als 50 Artikel in sieben Kategorien; über 30 Millionen Produkte wurden verkauft. Mit der Übernahme entsteht die Linie +NUTRI Co Functional auf Basis der Terraflos-Wirkstoffe; geplant ist der Eintritt in Argentinien, Kolumbien und Uruguay.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 151.75,
      "radius": 0.175,
      "daten": "15. Juli 2026",
      "titelOriginal": "Terraflos acquires +NUTRI Co in an eight-figure deal"
    },
    {
      "id": "1197565",
      "titel": "KI-Apps zur Bestimmung essbarer Pflanzen und Pilze",
      "beschreibung": "Anwendungen wie iNaturalist, PictureThis und Picture Mushroom bestimmen Pilze und Pflanzen anhand hochgeladener Fotos. Die Bilderkennung der Anbieter gleicht die Aufnahme mit den jeweiligen Datenbanken ab und liefert die Artbestimmung unmittelbar. Genutzt werden die Apps beim Sammeln in Wald und Gelände, wo essbare Arten ohne Bestimmungsbuch erkannt werden sollen.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 59.09,
      "radius": 0.6317,
      "daten": "18. Mai 2025",
      "titelOriginal": "AI Integrated Apps for Foraging"
    },
    {
      "id": "1159650",
      "titel": "Virtuelle KI-Manager bei McDonald's",
      "beschreibung": "Technikumbau in den rund 43.000 Restaurants von McDonald's mit vernetzter Küchentechnik, KI-gestütztem Drive-through und Anwendungen für die Filialleitung. Gemeinsam mit Google Cloud setzt die Kette Edge Computing ein, damit Daten in der Filiale statt in der Cloud ausgewertet werden; so sollen Ausfälle von Fritteusen oder Eismaschinen vorhergesagt und die Bestellgenauigkeit über KI-gestützte Kameras geprüft werden. Geplant ist zudem ein „generativer KI-Filialmanager“, der Verwaltungsaufgaben wie die Schichtplanung übernimmt. Vergleichbare Funktionen erproben auch Pizza Hut und Taco Bell des Wettbewerbers Yum Brands.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 64.02,
      "radius": 0.3687,
      "daten": "6. März 2025",
      "titelOriginal": "McDonald’s is Creating Virtual ‘AI Managers’"
    },
    {
      "id": "1145217",
      "titel": "Ai Palette — KI-Trendanalyse für die Produktentwicklung",
      "beschreibung": "Singapurer SaaS-Anbieter, dessen Software mit prädiktiver Analytik, Sprachverarbeitung und Computer Vision Geschmackstrends aus Blogs, sozialen Medien, Rezepten und Speisekarten ausliest. Die Algorithmen berücksichtigen 39 Merkmale und werten neben Englisch acht asiatische Sprachen aus, sodass sich Aromatrends über Ländergrenzen hinweg verfolgen lassen; ergänzend prüft die Plattform Produktkonzepte auf ihre Erfolgsaussicht. Nach Angaben des Anbieters sinkt die Entwicklungsdauer neuer Produkte von ein bis zwei Jahren auf sechs Monate. 2019 nahm das Unternehmen eine Seed-Runde über 1,04 Millionen US-Dollar unter Führung von Decacorn Capital auf.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 134.26,
      "radius": 0.3914,
      "daten": "23. August 2019",
      "titelOriginal": "AI Palette will revolutionize FMCG industry with FoodGPT"
    },
    {
      "id": "1224925",
      "titel": "KFC Kanada — Blindverkostung gegen ein KI-Rezept",
      "beschreibung": "Werbeaktion, bei der ein von KI erzeugtes Rezept für frittiertes Hähnchen in einer Blindverkostung gegen die Hausrezeptur von KFC antritt. KFC Kanada ließ dafür bestbewertete Brathähnchen-Rezepte aus dem Internet auswerten und daraus ein Konkurrenzrezept ableiten, gegen das sich die 85 Jahre alte, von Hand zubereitete Originalrezeptur behaupten sollte. Die Reaktionen der Testesser hielt die Agentur Courage Inc. in einem kurzen Film fest, ergänzt um eine öffentliche Verkostung in einer KFC-Filiale in Toronto.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 146.15,
      "radius": 0.2312,
      "daten": "12. März 2025",
      "titelOriginal": "AI-Generated Recipe Challenges"
    },
    {
      "id": "1197208",
      "titel": "KI-gestützte Warenwirtschaft in der Gastronomie",
      "beschreibung": "Bestandsführung für Restaurants, die Lagerbewegungen automatisch erfasst und Nachbestellungen selbst auslöst. Aus historischen Verkaufsdaten leitet die Software den künftigen Bedarf ab, überwacht die Bestände laufend und bestellt nach, sobald ein Mindestbestand unterschritten wird. Angestrebt werden damit geringerer Verderb und weniger Lebensmittelverschwendung bei durchgehender Verfügbarkeit der Zutaten.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 68.31,
      "radius": 0.535,
      "daten": "17. Mai 2025",
      "titelOriginal": "AI-Powered Inventory Management For Restaurants"
    },
    {
      "id": "1159085",
      "titel": "Circus Group — autonome Küchenrobotik und Zukäufe bei KI",
      "beschreibung": "Hamburger Anbieter autonomer Küchensysteme, der seine KI-Software CircusAI durch Übernahmen ausbauen will. Nach Unternehmensangaben liegen seit Markteintritt 8.400 Vorbestellungen vor, denen allein aus der Software ein jährliches Umsatzpotenzial von 1,1 Milliarden Euro zugerechnet wird; CircusAI ist mit mehr als 200 Millionen Datenpunkten trainiert, beherrscht über zwei Milliarden Rezepte und arbeitet mit Computer Vision. Den weltweiten Bedarf im Foodservice beziffert das Unternehmen auf rund 80 Millionen autonome Roboter und begründet ihn mit dem Fachkräftemangel. Eine erste Übernahme im KI-Bereich ist für das vierte Quartal angekündigt.",
      "quellen": [
        {
          "name": "Circus Group SE via Youtube"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 61.11,
      "radius": 0.3683,
      "daten": "6. November 2024",
      "titelOriginal": "Circus Group plant zeitnah strategische Übernahmen"
    },
    {
      "id": "1145213",
      "titel": "FoodGPT — Chatbot auf der Plattform von Ai Palette",
      "beschreibung": "Generativer Chatbot der Innovationsplattform von Ai Palette, der neben Webdaten auch die eigenen Marktberichte der Kunden auswertet; dafür wird je Kunde eine getrennte private Cloud betrieben. Die Plattform besteht aus drei Bausteinen: Foresight Engine liest Bilder und Texte aus Onlinehandel, Speisekarten, Rezepten und Suchmaschinen in 18 Sprachen und 24 Ländern aus, Concept Genie erzeugt daraus Produktkonzepte, Screen Winner bewertet deren Marktchancen. Genutzt wird sie unter anderem von Nestlé, Symrise, ADM, Kellogg, Mondelēz International, Diageo und Cargill. Zum Ausbau nahm Ai Palette 5,7 Millionen US-Dollar in einer Series A1 auf.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 130.57,
      "radius": 0.4019,
      "daten": "5. März 2024",
      "titelOriginal": "Ai Palette powered insights platform FoodGPT chatbot"
    },
    {
      "id": "1222156",
      "titel": "CoDeveloper — KI-Plattform des IFT für Lebensmittelentwickler",
      "beschreibung": "KI-Plattform für Lebensmitteltechnologen, vorgestellt vom Institute of Food Technologists auf dessen Fachmesse IFT First in Chicago. CoDeveloper bündelt Anwendungen, mit denen sich neue Rezepturen entwickeln, bestehende Produkte nachbilden und Jahrzehnte begutachteter lebensmittelwissenschaftlicher Literatur durchsuchen lassen; der Assistent tritt unter dem Namen Sous auf und ist auf die frühe Entwicklungsphase in Forschungsteams ausgelegt. Damit bringt offenbar erstmals ein Branchenverband der Lebensmittelwirtschaft ein eigenes KI-Werkzeug für die Arbeit seiner Mitglieder heraus.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 144.45,
      "radius": 0.2983,
      "daten": "3. Juli 2025",
      "titelOriginal": "IFT’s AI Tool For Food Scientists"
    },
    {
      "id": "1200779",
      "titel": "Mixed Reality in der Gastronomie mit Apple Vision Pro",
      "beschreibung": "Bestell- und Markenerlebnisse für Restaurants auf dem Mixed-Reality-Headset Apple Vision Pro, das über Blick- und Fingersteuerung ohne Tastatur oder Maus bedient wird. Als einfachste Anwendung gilt die Bestellung über eine Augmented-Reality-Oberfläche; die US-Kette Crumbl Cookies hat eine solche bereits veröffentlicht. Weitergehende Ansätze reichen von der dreidimensionalen Ansicht einzelner Gerichte über nachgebaute Restaurantszenen mit Warenverkauf und Treueprogramm bis zu geführten Rundgängen durch Herkunft und Zubereitung der Zutaten aus der Sicht von Koch oder Erzeuger.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 54.69,
      "radius": 0.5731,
      "daten": "16. Februar 2024",
      "titelOriginal": "Restaurants are set to win big with mixed reality experiences thanks to Apple"
    },
    {
      "id": "1156975",
      "titel": "Cafe X — Roboterbarista in Teslas Gigafactory Berlin",
      "beschreibung": "Robotergestützte Kaffeebar des US-Anbieters Cafe X, die in der Eingangshalle von Teslas Gigafactory Berlin Kaffee und Tee ausgibt; die Roboterarme sind rot lackiert und mit dem Tesla-Schriftzug versehen. Cafe X gehörte zu den frühen Anbietern von Servierrobotern im Gastraum, schloss zwischenzeitlich aber die meisten Standorte in San Francisco. Aus den Angaben zur Finanzierung über die Crowdfunding-Plattform Republic geht hervor, dass die Anlagen am Flughafen San Francisco 2022 rund 700.000 US-Dollar umsetzten und fünf Einheiten ausgeliefert wurden. Eine Anlage kostet 285.000 US-Dollar zuzüglich 15.000 US-Dollar jährlich für Software und Service.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 75.14,
      "radius": 0.3683,
      "daten": "10. November 2023",
      "titelOriginal": "Cafe X Robot Barista is Now Slinging Coffee in Tesla’s Berlin Giga Factory"
    },
    {
      "id": "1145171",
      "titel": "Bakteriennachweis in Lebensmitteln per Bilderkennung",
      "beschreibung": "Verfahren der University of California, Davis, das Bakterienkolonien auf Lebensmitteln im Mikroskopbild erkennt. Digitale Aufnahmen von Römersalat aus einem gewöhnlichen Lichtmikroskop wurden mit dem Objekterkennungsalgorithmus YOLO in Version 4 ausgewertet; erkannt wurden elf von zwölf mit E. coli belasteten Proben, und E. coli ließ sich mit einer mittleren Genauigkeit von 94 % von sieben weiteren lebensmittelrelevanten Bakterienarten wie Salmonellen unterscheiden. Die Auswertung dauert rund drei Stunden statt mehrerer Tage wie beim kulturbasierten Nachweis. Die Arbeit erschien in Applied and Environmental Microbiology.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 152.29,
      "radius": 0.3774,
      "daten": "24. Februar 2023",
      "titelOriginal": "How AI May Improve Food Safety: Rapid Bacteria Detection"
    },
    {
      "id": "1210038",
      "titel": "VitIA 5.0 — KI und Sensorik in der Weinerzeugung",
      "beschreibung": "Spanisches Verbundprojekt, das Weinbau und Kellerwirtschaft von der Rebfläche bis zum Regal datengestützt steuert. Vernetzte Sensorik erfasst Prozessdaten, prädiktive Modelle und Empfehlungssysteme leiten daraus Handlungsvorgaben ab, ergänzt um Cybersicherheit und Rückverfolgbarkeit über Blockchain. Koordiniert wird VitIA 5.0 vom Galicia Food Cluster (Clusaga); beteiligt sind die Kellereien Viña Costeira und Cooperativa Vitivinícola Arousana aus den Herkunftsgebieten Ribeiro und Rías Baixas, sechs Technologieunternehmen und das Weintechnologiezentrum Fundació Parc Tecnològic del Vi. Die Förderung stammt aus der Ausschreibung 2023 des spanischen Industrie- und Tourismusministeriums.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 148.65,
      "radius": 0.2983,
      "daten": "25. Oktober 2023",
      "titelOriginal": "VitIA 5.0"
    },
    {
      "id": "1200762",
      "titel": "Wearables als Messgeräte für Ernährungsempfehlungen",
      "beschreibung": "Kleine am Körper getragene Computer messen über Sensoren Körperfunktionen und liefern so die Datengrundlage für personalisierte Ernährungsempfehlungen. Fitnessarmbänder erfassen Schrittzahl, Herzfrequenz und Schlafphasen, Smartwatches zeigen nach Kopplung mit dem Smartphone auch Nachrichten und Wetter an; Datenbrillen haben sich wegen Bedenken beim Daten- und Verbraucherschutz nicht durchgesetzt. Mit Funktionen wie der Blutzuckermessung wächst der Einsatz in Medizin und Prävention. Offene Punkte sind Kompatibilität, Akkulaufzeit und Datenschutzlücken bei den verknüpften Apps.",
      "quellen": [
        {
          "name": "foodregio.de",
          "url": "https://foodregio.de/de/wearables--was-bringen-die-digitalen-aktivitaetstracker"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 53.43,
      "radius": 0.6317,
      "daten": "23. Mai 2025",
      "titelOriginal": "Wearables for Food Recommendations"
    },
    {
      "id": "1146016",
      "titel": "KI-Zusammenfassungen von Restaurantbewertungen bei Yelp",
      "beschreibung": "Yelp fasst Nutzerbewertungen maschinell zusammen und vergibt für einzelne Aspekte eines Restaurants — Essen, Service, Wartezeit, Getränke — Werte zwischen 1 und 100, die die gebündelte Stimmung der Rezensenten abbilden. Nach Angaben des Unternehmens erkennt das System den Zusammenhang auch, wenn diese Punkte nicht ausdrücklich genannt werden. Hinzu kommen ein personalisierter Startfeed, Trendsuchen und Werkzeuge für Werbetreibende. Restaurants stellen 17 % der Bewertungen der Plattform; die Werbeerlöse der Sparte Restaurants, Einzelhandel und Sonstiges lagen 6 % unter dem Vorjahr.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 63.7,
      "radius": 0.465,
      "daten": "12. Dezember 2024",
      "titelOriginal": "Yelp, now with more AI"
    },
    {
      "id": "1143223",
      "titel": "Pflanzlicher Babybel aus KI-gestützter Rezeptur",
      "beschreibung": "Bel Group entwickelt mit dem kalifornischen Start-up Climax Foods pflanzliche Varianten seiner Käsemarken, beginnend mit Mini Babybel; der Marktstart in Europa und den USA war für Ende 2024 geplant, gefertigt wird in Bel-Werken. Bel hat sich als Minderheitsgesellschafter an Climax beteiligt und will bis 2030 die Hälfte des Umsatzes mit pflanzlichen, fruchtbasierten oder tierfreien Produkten erzielen. Climax verändert Speicherproteine aus Saaten so, dass sie die Funktion von Milcheiweiß übernehmen. Der Einzelhandelsumsatz mit milchfreiem Käse stieg 2022 laut Euromonitor um 22 % auf 869 Mio. USD.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 152.29,
      "radius": 0.465,
      "daten": "11. April 2023",
      "titelOriginal": "AI-powered plant-based cheese"
    },
    {
      "id": "1177977",
      "titel": "RASFF — EU-Schnellwarnsystem für Lebensmittel und Futtermittel",
      "beschreibung": "Das Schnellwarnsystem für Lebensmittel und Futtermittel (RASFF) ist der Meldeweg, über den die Behörden der Mitgliedstaaten und die Europäische Kommission Gesundheitsrisiken aus der Lebensmittelkette melden. Rechtsgrundlage ist Artikel 50 der Verordnung (EG) Nr. 178/2002, des allgemeinen Lebensmittelrechts. Der Dienst läuft rund um die Uhr; auf Meldungen hin werden Produkte vom Markt zurückgerufen. Die öffentliche Datenbank RASFF Window enthält Zusammenfassungen der Meldungen ab 2020, nennt aber weder Marken noch Unternehmen; ein Verbraucherportal listet Rückrufe und Warnungen.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 152.29,
      "radius": 0.2983,
      "daten": "16. April 2025",
      "titelOriginal": "EU Rapid Alert System for Food and Feed applies a Bayesian network model to predict food fraud"
    },
    {
      "id": "1537266",
      "titel": "Samsung Bespoke AI Wine Cellar mit Flaschenerkennung",
      "beschreibung": "Ein Weinklimaschrank mit Kamera im Deckenbereich erfasst Etiketten und Flaschen und führt darüber ein Bestandsverzeichnis. Samsung zeigt das Gerät auf der CES 2026; die Bilderkennung beruht auf Google Gemini. Bei jedem Einlagern und Entnehmen aktualisiert der SmartThings AI Wine Manager den Bestand, sodass sich der Lagerort einer Flasche ohne Suchen abrufen lässt. Der Anbieter gibt an, dass das System aus dem vorhandenen Bestand zudem Empfehlungen für Speisekombinationen ableitet.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 44.23,
      "radius": 0.4594,
      "daten": "22. Dezember 2025",
      "titelOriginal": "AI Vision Wine Cellars"
    },
    {
      "id": "1200758",
      "titel": "Essen als Ausdrucksmittel und digitaler Ernährungsassistent",
      "beschreibung": "Junge Konsumenten geben nach Beobachtung von Peter Heshof, Gründer der Trendagentur Bloom, mehr Geld für Ess- und Trinkerlebnisse aus als für Kleidung; das Gegessene tritt als Mittel der Selbstdarstellung an die Stelle von Mode und wird über soziale Netzwerke wie Instagram geteilt. Daran knüpft die Vorstellung eines digitalen Zwillings an, der die Gesundheitsziele und die individuelle Food ID aus Lebensstil, DNA, Mikrobiom und Geschmacksvorlieben kennt. Ein solcher Assistent würde passende Speisen vorschlagen und sie zugleich online bestellen.",
      "quellen": [
        {
          "name": "foodregio.de",
          "url": "https://foodregio.de/de/trends-die-sich-durch-den-wandelnden-zeitgeist-erklaeren-lassen---interview-mit-peter-heshof-gruender-von-bloom-englisch"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 65.11,
      "radius": 0.5778,
      "daten": "23. Mai 2025",
      "titelOriginal": "Food as Fashion + personalized assistant"
    },
    {
      "id": "1145178",
      "titel": "Kennzeichenerkennung im Drive-in von McDonald's",
      "beschreibung": "McDonald's erprobt an einzelnen Standorten ein System, das im Drive-in das Kennzeichen des Fahrzeugs erkennt und daraus zusammen mit der früheren Bestellhistorie Vorschläge auf dem Touchscreen erzeugt; die Nutzung setzt die Zustimmung des Gastes voraus. Die Bildschirme passen ihre Empfehlungen bereits an Wetter, Wartezeit und Beliebtheit einzelner Artikel an. Das Unternehmen berichtet von einer nicht bezifferten Steigerung des Bestellwerts und will die Empfehlungsalgorithmen auf alle US-Drive-ins ausweiten. 2018 hatte McDonald's ein Umbauprogramm über 6 Mrd. USD angekündigt.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 69.56,
      "radius": 0.3879,
      "daten": "31. Oktober 2019",
      "titelOriginal": "McDonald’s drive-thru AI knows what you want before you order"
    },
    {
      "id": "1437389",
      "titel": "Rivalz — KI-gestützte Snackentwicklung im GLP-1-Umfeld",
      "beschreibung": "Das Start-up Rivalz entwickelt mit KI Snackprodukte für einen Markt, der von wenigen großen Herstellern und eingefahrenen Verzehrgewohnheiten geprägt ist. Als jüngster Treiber der Nachfrage nach Snacks mit besserem Nährwertprofil gelten GLP-1-Medikamente.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 140.29,
      "radius": 0.6041,
      "daten": "20. Januar 2026",
      "titelOriginal": "Snacking Reimagined Through AI"
    },
    {
      "id": "1143204",
      "titel": "In-silico-Rezepturen bei Knorr und Hellmann's",
      "beschreibung": "Unilever entwickelt Rezepturen zunehmend am Rechner: In-silico-Versuche simulieren Geschmack, Textur und Stabilität eines Produkts, bevor es hergestellt wird. Für einen salzfreien Gemüsebrühwürfel der Marke Knorr wurden auf diesem Weg Millionen Aromakombinationen in Tagen statt Monaten geprüft; das Ergebnis enthält unter anderem Kräuter, Karotten, Liebstöckelwurzel und Kurkuma. Bei Hellmann's Vegan Mayonnaise ersetzte modifizierte Maisstärke das Ei als Emulgator, ohne dass Rezepturversuche nötig waren; die Modelle sagten zugleich voraus, ob das Produkt auf den vorhandenen Linien laufen kann.",
      "quellen": [
        {
          "name": "Food tech",
          "url": "https://www.foodnavigator.com..."
        }
      ],
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 133.42,
      "radius": 0.3686,
      "daten": "25. Juli 2023",
      "titelOriginal": "Unilever uses AI for In Silico Testing"
    },
    {
      "id": "1143832",
      "titel": "Nuritas — Peptidsuche mit maschinellem Lernen",
      "beschreibung": "Das irische Biotech-Start-up Nuritas durchsucht mit maschinellem Lernen eine Datenbank von Peptiden aus Lebensmitteln nach gesundheitlich wirksamen Molekülen und verkauft daraus abgeleitete Zutaten an Lebensmittel-, Pharma- und Kosmetikhersteller. Eine Serie-A-Runde über 20 Mio. USD unter Führung von Cultivian Sandbox finanziert die Ausweitung auf den US-Markt. Zugleich wurde eine Partnerschaft mit dem Ernährungsbereich von BASF bekannt, aus der 2018 ein entzündungshemmender Wirkstoff für die Sportnahrung hervorgehen sollte. Zuvor kamen 3,28 Mio. USD von der EU für eine Zutat gegen Diabetes.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 152.29,
      "radius": 0.2289,
      "daten": "20. Dezember 2017",
      "titelOriginal": "Nuritas AI Ingredient Discovery Platform"
    },
    {
      "id": "989618",
      "titel": "KI in der Milchviehhaltung",
      "beschreibung": "In der Milchwirtschaft werten KI-Systeme Daten aus Herde, Melkstand und Verarbeitung aus, um Tiergesundheit, Milchqualität und betriebliche Entscheidungen zu verbessern. Die Anwendungen reichen von der Auswahl geeigneter Behandlungen für einzelne Kühe über die Prognose der Nachfrage bis zum Nachweis von Verfälschungen in Milcherzeugnissen. In der Käseherstellung übernimmt Computer Vision die Qualitätsbeurteilung, weitere Systeme erkennen Hitzestress im Bestand. Über bildgebende Verfahren lassen sich zudem Milchleistung, Methanemissionen und Herdengröße schätzen.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 158.64,
      "radius": 0.4169,
      "daten": "15. August 2024",
      "titelOriginal": "AI Dairy Farming"
    },
    {
      "id": "1335695",
      "titel": "Lebensmitteldatenbank mit Nährwert- und Umweltdaten",
      "beschreibung": "Lifesum und Consupedia führen ihre Datenbestände zu einer gemeinsamen Lebensmitteldatenbank zusammen, die neben Makronährstoffen und Vitaminen auch ökologischen Fußabdruck, Produktionsethik und Wirkung auf die Artenvielfalt ausweist. Lifesum bringt seine Tracking-Technik ein, darunter Bild- und Spracherkennung; Consupedia steuert Folgenabschätzungen bei, die mit schwedischen Hochschulen entwickelt wurden. Biometriedaten sollen zusammen mit den erweiterten Produktdaten individuellere Empfehlungen ermöglichen. Lifesum hatte zuvor das Biomarker-Unternehmen Lykon übernommen.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 49.43,
      "radius": 0.4613,
      "daten": "25. April 2025",
      "titelOriginal": "AI-Powered Food Databases"
    },
    {
      "id": "1178697",
      "titel": "Rabatt gegen Handyabgabe im Restaurant Eva",
      "beschreibung": "Das Restaurant Eva in Los Angeles gewährt 5 % Nachlass auf die Rechnung, wenn Gäste ihre Mobiltelefone für die Dauer des Essens ausschalten und abgeben. Inhaber und Küchenchef Mark Gold begründet die Regel nicht mit Störungen im Lokal, sondern mit dem Wunsch, Tischgesprächen ohne Ablenkung Raum zu geben. Knapp die Hälfte der Gäste nimmt das Angebot an; die übrigen zahlen den vollen Preis und behalten ihr Gerät. Verwandt ist das zeitweise verbreitete Tischspiel, bei dem alle Telefone in die Tischmitte gelegt werden und derjenige die Rechnung zahlt, der zuerst zugreift.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 75.14,
      "radius": 0.6226,
      "daten": "17. August 2012",
      "titelOriginal": "Restaurant's New Rule: Give Up Cell Phone, Receive Discount"
    },
    {
      "id": "1064773",
      "titel": "Chef Robotics — flexible Portionierroboter in der Produktion",
      "beschreibung": "Chef Robotics verbindet weitgehend serienmäßige Roboterhardware mit der eigenen Software ChefOS, um in der Lebensmittelherstellung wechselnde Zutaten in unterschiedlichen Portionsgrößen und Behältern zu portionieren. Anders als Anlagen mit je einer festen Aufgabe automatisiert das System den Betrieb nur teilweise; die an Produktionsstandorten in sechs nordamerikanischen Städten eingesetzten Geräte liefern zugleich die Trainingsdaten. Nach Unternehmensangaben wurden über 20 Millionen Portionen gefertigt; beim Kunden Chef Bombay sank der Produktverlust um 88 %, die Arbeitsproduktivität stieg um 33 %.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 53.43,
      "radius": 0.3905,
      "daten": "11. Juli 2024",
      "titelOriginal": "Chef Robotics Launches AI-Powered Food Robot"
    },
    {
      "id": "1398533",
      "titel": "Spore.bio — KI-gestützter Keimnachweis in Werken",
      "beschreibung": "Das Start-up Spore.bio setzt KI ein, um Krankheitserreger in Produktionswerken der Konsumgüterindustrie nachzuweisen. Das Unternehmen begründet den Ansatz damit, dass sich regulatorische Anforderungen verändern, die Technik weiter ist und der Bedarf an belastbaren Echtzeitdaten steigt; Ziel ist ein schneller, zuverlässiger und regelkonformer mikrobiologischer Nachweis. Rückrufe wegen Kontamination treffen Lebensmittel- und Getränkehersteller nicht nur über Bußgelder und Schadenersatz, sondern über einen lang nachwirkenden Schaden an Marke und Ruf.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 138.46,
      "radius": 0.6317,
      "daten": "24. Februar 2025",
      "titelOriginal": "Using AI to detect pathogens in CPG factories"
    },
    {
      "id": "1143187",
      "titel": "Darmmikrobiom-Forschung bei Unilever und Holobiome",
      "beschreibung": "Unilever wertet Mikrobiomdaten mit maschinellem Lernen und Hochleistungsrechnen aus, um Lebensmittelzutaten mit Wirkung auf die Darmflora zu finden. Von den rund 100 Billionen Bakterien im menschlichen Körper sitzen über 95 % im Darm; nach Angaben von Carla Hilhorst, Forschungschefin der Ernährungssparte, hängen mindestens 90 % der Gesundheitsfragen damit zusammen. Mit dem Biotechunternehmen Holobiome untersucht Unilever die Darm-Hirn-Achse: Holobiome hat einen Mikroorganismus gefunden, der den beruhigend wirkenden Botenstoff GABA bildet; hunderte Zutaten wurden auf diese Wirkung geprüft.",
      "quellen": [
        {
          "name": "Food tech",
          "url": "https://www.foodnavigator.com..."
        }
      ],
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 148.03,
      "radius": 0.3823,
      "daten": "25. Juli 2023",
      "titelOriginal": "AI Unilever analyses Gut Microbiome"
    },
    {
      "id": "1143222",
      "titel": "The Kraft Heinz Not Company — Gemeinschaftsunternehmen mit NotCo",
      "beschreibung": "Kraft Heinz und das chilenische Foodtech-Unternehmen NotCo gründen das Gemeinschaftsunternehmen The Kraft Heinz Not Company LLC, das pflanzliche Produkte unter beiden Marken entwickelt und in großem Maßstab herstellt. Die Kontrolle liegt bei Kraft Heinz, geführt wird es von Lucho Lopez-May, bis dahin Nordamerika-Chef von NotCo. Eingebracht wird NotCos patentierte KI-Plattform mit dem Algorithmus Giuseppe, mit dem bereits pflanzliche Entsprechungen von Milch, Fleisch, Mayonnaise und Speiseeis entstanden. NotCo hatte zuvor 235 Mio. USD eingesammelt und wurde mit 1,5 Mrd. USD bewertet.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 130.57,
      "radius": 0.2983,
      "daten": "23. Februar 2022",
      "titelOriginal": "AI Product Development Platform Heinz Kraft"
    },
    {
      "id": "910679",
      "titel": "Grofit: Sensorkapsel und digitaler Zwilling im Gewächshaus",
      "beschreibung": "Das israelische Unternehmen Grofit entwickelt Sensoren und Software für den Präzisionsanbau in Gewächshäusern. Die Messstation Grofit Capsule hat nach Unternehmensangaben die Größe einer Getränkedose, ist in einer Minute betriebsbereit und erfasst Lufttemperatur, Strahlung, relative Luftfeuchte sowie Werte zu Boden, Bewässerung und Düngung. Daraus erzeugt das System Virtual Plant ein digitales Abbild des Bestands, das mit maschinellem Lernen dessen Wuchs vorhersagen soll. Zu den Anwendern zählen Syngenta, Bayer und Hazera; in Spanien läuft ein Pilotprojekt mit der Genossenschaft UNICA.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 168.68,
      "radius": 0.447,
      "daten": "19. April 2023",
      "titelOriginal": "AI Precision Farming"
    },
    {
      "id": "1310779",
      "titel": "Desire-a-Bar — Schokoladentafel mit Mimikerkennung",
      "beschreibung": "Die finnische Schokoladenmarke Karl Fazer stellt in einem Einkaufszentrum eine großformatige Schokoladentafel auf, deren KI Gesichtsausdrücke auswertet und Passanten belohnt, die davor stehen bleiben und lächeln oder sehnsüchtig blicken. Nach Angaben des Unternehmens ist die Installation die erste ihrer Art. Senior Marketing Manager Niklas Lindroos begründet sie damit, Finnen in einer als zurückhaltend geltenden Kultur dazu zu bringen, ihr Verlangen offen zu zeigen.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 49.43,
      "radius": 0.4068,
      "daten": "1. Oktober 2025",
      "titelOriginal": "Desire-Detecting Chocolate Experiences"
    },
    {
      "id": "1178696",
      "titel": "Heart Attack Grill — Provokation als Ernährungsdebatte",
      "beschreibung": "Das Lokal Heart Attack Grill in Las Vegas führt Ernährungsfragen über bewusste Überzeichnung vor: Gäste mit mehr als 159 kg Körpergewicht essen kostenlos, und wer seine Portion nicht aufisst, wird von als Krankenschwestern verkleideten Bedienungen „bestraft“. Das Konzept ist als Provokation angelegt und soll die Auseinandersetzung über Ernährung und Gesundheit anstoßen.",
      "quellen": [
        {
          "name": "feelingvegas.com",
          "url": "https://www.feelingvegas.com/heart-attack-grill-las-vegas-menu-cost-hours/"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 70.34,
      "radius": 0.6317,
      "daten": "21. April 2025",
      "titelOriginal": "Drastical way to raise health awareness: the Heart Attack Grill"
    },
    {
      "id": "1064772",
      "titel": "Flippy 2 an der Fritteuse bei Wimpy in Dubai",
      "beschreibung": "Americana Restaurants, Betreiber von KFC, Pizza Hut und Hardee's im Nahen Osten und in Nordafrika, erprobt gemeinsam mit dem US-Unternehmen Miso Robotics den Küchenroboter Flippy 2. Das Gerät übernimmt mit maschinellem Lernen und Computer Vision die Arbeit einer kompletten Fritteusenstation. Erster Einsatzort ist das Wimpy-Restaurant in der Dubai Mall, weitere Standorte sollen folgen. Erwartet werden kürzere Zeiten von der Bestellung bis zur Ausgabe und gleichmäßigere Produkte. Americana ist nach eigenen Angaben der erste Schnellgastronomie-Betreiber der Region mit Robotern in der Küche.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 53.43,
      "radius": 0.3685,
      "daten": "17. Juni 2022",
      "titelOriginal": "Americana Restaurants Partners With Miso Robotics - Customized Robotics"
    },
    {
      "id": "1583799",
      "titel": "KI-Werkzeuge für die Rezeptkarten von HelloFresh",
      "beschreibung": "HelloFresh erstellt die Rezeptkarten seiner Kochboxen mit einer KI-gestützten Werkzeugsammlung, die den Ablauf bis zum druckfertigen Ergebnis zusammenfasst und die Bearbeitungszeit nach Unternehmensangaben von Monaten auf Stunden verkürzt. Die Karten enthalten Schritt-für-Schritt-Anleitungen, Zutatenlisten und Abbildungen; die Entwicklung der Gerichte selbst bleibt nach Darstellung des Unternehmens menschliche Arbeit. Zuerst erhalten Kunden in den USA die neu erstellten Karten, wenig später auch gedruckt in den Boxen; die weltweite Einführung ist bis Ende des ersten Quartals 2026 vorgesehen.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 60.3,
      "radius": 0.1981,
      "daten": "19. November 2025",
      "titelOriginal": "AI-Enhanced Recipe Cards"
    },
    {
      "id": "1384274",
      "titel": "KI-Modell für den Geschmack pflanzlicher Proteine",
      "beschreibung": "Die Non-Profit-Organisation NECTAR entwickelt mit Stanford-Informatikern ein Modell, das aus Zutatenliste und Molekülstruktur Geschmack, Textur und Verbraucherpräferenz vorhersagt. Finanziert wird es mit 2 Mio. US-Dollar aus der AI Grand Challenge des Bezos Earth Fund. Datengrundlage sind Blindverkostungen: 2025 prüften jeweils mindestens 100 Verbraucher 122 pflanzliche Fleischalternativen aus 14 Kategorien. Ein Abgleich mit öffentlichen Absatzdaten ergab, dass besser bewertete Produkte höhere Marktanteile halten, teils unabhängig vom Preis. Am Ende soll eine quelloffene Anwendung stehen.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 142.08,
      "radius": 0.5806,
      "daten": "13. November 2025",
      "titelOriginal": "Nectar: About Their Plans to Build an AI for Better Tasting Alt Proteins"
    },
    {
      "id": "1142862",
      "titel": "Zellkultur-Plattform für kultivierten Fisch bei Umami Bioworks",
      "beschreibung": "Umami Bioworks betreibt eine automatisierte Produktionsplattform für kultivierten Fisch, die Stammzellbiologie, maschinelles Lernen und Automatisierung verbindet. Der Anbieter gibt an, damit Erzeugnisse ohne Quecksilber, Antibiotika, Mikroplastik und sonstige Meeresschadstoffe herzustellen und überfischte Arten zu ersetzen, ohne den Geschmack der jeweiligen Fischart aufzugeben.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 131.51,
      "radius": 0.465,
      "daten": "18. Juli 2023",
      "titelOriginal": "AI support IP Development"
    },
    {
      "id": "1143219",
      "titel": "In-silico-Rezepturentwicklung bei Unilever",
      "beschreibung": "Unilever entwickelt Rezepturen zunehmend am Rechner statt am Herd. Für einen salzfreien Knorr-Brühwürfel analysierte der Konzern per digitaler Modellierung Millionen von Aromakombinationen in Tagen statt Monaten; das Ergebnis ist eine Mischung aus Gemüse und Kräutern. Bei der veganen Mayonnaise von Hellmann's ersetzte die In-silico-Modellierung das Ei als Emulgator durch modifizierte Maisstärke und sagte zugleich voraus, ob das Produkt auf den bestehenden Anlagen laufen würde. Dieselbe Datenbasis dient Reformulierungen, wenn Zutaten durch Störungen der Lieferkette ausfallen.",
      "quellen": [
        {
          "name": "Food tech",
          "url": "https://www.foodnavigator.com..."
        }
      ],
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 130.57,
      "radius": 0.2215,
      "daten": "25. Juli 2023",
      "titelOriginal": "Unilever uses AI for Reformulation"
    },
    {
      "id": "1777193",
      "titel": "Ernteroboter für Weichobst von Dogtooth Technologies",
      "beschreibung": "Der 2014 gegründete Robotikentwickler Dogtooth Technologies aus Cambridge hat über 14 Mio. Pfund Wachstumskapital für den Ausbau seiner Ernteroboter eingesammelt. Die Maschinen verbinden Computer Vision mit präziser Greiftechnik und pflücken empfindliche Früchte, ohne sie zu beschädigen. Das Kapital kommt als Eigenkapital von 24Haymarket, EMV Capital und ACF Investors, dazu Zuschüsse von Innovate UK und eine Leasinglinie von Kineo Finance. Im Einsatz stehen die Roboter unter anderem bei Dyson Farming; Treiber der Nachfrage ist der Mangel an Saisonarbeitskräften im Gartenbau.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 174.03,
      "radius": 0.3683,
      "daten": "8. Juli 2026",
      "titelOriginal": "Cambridge AI robotics group Dogtooth scores £14m investment"
    },
    {
      "id": "1303093",
      "titel": "KI-Rezeptgerät Kitchen Cosmo",
      "beschreibung": "Kitchen Cosmo ist ein Küchengerät, das per KI Rezeptvorschläge aus den vorhandenen Zutaten erzeugt. Eine eingebaute Webcam erfasst die Lebensmittel; über Knöpfe, Kippschalter und Schieberegler lassen sich zusätzlich Stimmung, Kocherfahrung und verfügbare Zeit einstellen. Die Anleitung druckt ein eingebauter Thermodrucker auf einen Papierbon, der abgerissen und im Gehäuse aufbewahrt werden kann. Entwickelt wurde der Prototyp im Stil eines Retro-Haushaltsgeräts von den MIT-Studierenden Jacob Payne und Ayah Mahmoud.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 43.88,
      "radius": 0.3887,
      "daten": "28. August 2025",
      "titelOriginal": "AI-Powered Recipe Appliances"
    },
    {
      "id": "1178695",
      "titel": "Rabatt nach Körpermaß in einem Restaurant in Chiang Mai",
      "beschreibung": "Das Restaurant Chiang Mai Breakfast World in Thailand staffelt Rabatte danach, durch welchen von fünf unterschiedlich breiten Metallbügeln vor dem Eingang ein Gast passt. Die Schilder darüber reichen von „Essen gratis“ am schmalsten Bügel über 20 %, 10 % und 5 % bis zum vollen Preis am breitesten, der etwa dreimal so weit ist wie der engste. Bekannt wurde die Praxis durch ein TikTok-Video vom Juli 2023 mit über 3,7 Millionen Aufrufen. Die Kommentare fielen geteilt aus: Ein Teil bewertete die Staffelung nach Körperumfang als diskriminierend, ein anderer als spielerischen Anreiz.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 72.65,
      "radius": 0.6317,
      "daten": "5. Juli 2023",
      "titelOriginal": "Viral Video Shows Restaurant Offering Discounts to Patrons Who Can Fit Through Bars"
    },
    {
      "id": "1064768",
      "titel": "Automatisiertes Kaffeebrühen bei Panera Bread",
      "beschreibung": "Panera Bread erprobt in zwei Filialen das System CookRight Coffee von Miso Robotics, das per KI Füllstand und Temperatur des Kaffees überwacht. Die Auswertung soll zugleich zeigen, welche Kaffeesorten die Gäste zu welcher Tageszeit bevorzugen. Miso berechnet für CookRight einige Hundert Dollar im Monat, für den Fritteusenroboter Flippy mehrere Tausend. Die Kette verbindet den Test mit ihrem Abo Unlimited Sip Club, das für 8,99 Dollar im Monat unbegrenzt Kaffee und Tee umfasst; Digitalchef George Hanson begründet den Einsatz nicht mit Personalkosten, sondern mit Zeit für die Gäste.",
      "quellen": [
        {
          "name": "Miso Robotics"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 65.32,
      "radius": 0.4444,
      "daten": "12. April 2022",
      "titelOriginal": "Panera Bread is testing automated coffee brewing with Miso Robotics"
    },
    {
      "id": "1583798",
      "titel": "Ernährungsassistent von Sainsbury's",
      "beschreibung": "Die britische Supermarktkette Sainsbury's setzt in ihren Filialen einen KI-gestützten Ernährungsassistenten ein, der Kaufempfehlungen nach den Vorgaben des Einkaufenden ausspricht. Erreichbar ist er über interaktive Kioske im Markt sowie über das eigene Mobilgerät. Hinterlegen lassen sich Ernährungseinschränkungen, Kalorienziele, Makronährstoffvorgaben und Lebensmittelallergien; darauf aufbauend liefert der Assistent Produktempfehlungen, Nährwertangaben zu einzelnen Artikeln und Hilfe bei der Menüplanung.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 62.96,
      "radius": 0.175,
      "daten": "15. November 2025",
      "titelOriginal": "AI-Powered Grocer Nutrition Assistants"
    },
    {
      "id": "1384257",
      "titel": "Bettani Farms und das pflanzliche Kasein Caseed",
      "beschreibung": "Der US-Hersteller pflanzlicher Käsealternativen Climax Foods firmiert nach einer Restrukturierung als Bettani Farms und hat 6,5 Mio. US-Dollar in einer Serie-A-Runde unter Führung von S2G Investments aufgenommen; insgesamt sind es 33,5 Mio. Dollar. Neuer Geschäftsführer ist Sandeep Patel, zuvor Finanzchef von Califia Farms. Das Unternehmen wechselt vom Blauschimmelkäse zu Mozzarella und Feta auf Basis von Caseed, einem aus Saaten gewonnenen Kasein-Ersatz ohne Nüsse und Soja mit 12 bis 20 g Protein je 100 g. Der US-Markt für Käsealternativen schrumpfte zuletzt um 4 % auf 218 Mio. Dollar.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 132.16,
      "radius": 0.5541,
      "daten": "7. Oktober 2025",
      "titelOriginal": "Climax Foods Rebrands to Bettani Farms & Raises $6.5M for Protein-Rich Vegan Cheese"
    },
    {
      "id": "1142859",
      "titel": "Shiru: KI-Suche nach funktionalen Pflanzenproteinen",
      "beschreibung": "Das 2019 gegründete Unternehmen Shiru hat 16 Mio. US-Dollar in einer Serie-B-Runde unter Führung von S2G Ventures aufgenommen. Seine Plattform ProteinDiscovery.ai durchsucht über 33 Millionen Moleküle nach Proteinsequenz, Funktion und Herstellbarkeit; Kunden nennen statt eines Proteins eine Anforderung, etwa einen bei niedrigem pH-Wert stabilen Emulgator. Modelle sagen zudem die Ausbeute bei mikrobieller Herstellung voraus. Erstes eigenes Produkt ist OleoPro, ein bei Raumtemperatur festes Strukturfett aus Öl und Pflanzenprotein mit nach Firmenangaben 80 % weniger gesättigten Fettsäuren.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 133.03,
      "radius": 0.4382,
      "daten": "14. Juli 2023",
      "titelOriginal": "AI supported protein development"
    },
    {
      "id": "1143188",
      "titel": "ADM und Brightseed: KI-Suche nach Synbiotika",
      "beschreibung": "Der Rohstoffkonzern ADM und das Biotechnologieunternehmen Brightseed entschlüsseln mit der KI-Plattform Forager, wie Pflanzeninhaltsstoffe und Darmbakterien zusammenwirken, um daraus synbiotische Zutaten zu entwickeln. Forager ordnet bioaktiven Pflanzenstoffen Wirkmechanismen auf Zellebene zu; ADM bringt seine Mikroorganismen-Sammlung ein. Die Partnerschaft von 2023 zielte auf erste Produkte 2025 für Nahrungsergänzungsmittel und funktionale Lebensmittel. Brightseed hat seit 2017 knapp 120 Mio. US-Dollar eingeworben und mit einem Ballaststoff aus Hanf eine erste Zutat auf den Markt gebracht.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 138.62,
      "radius": 0.2289,
      "daten": "13. April 2023",
      "titelOriginal": "ADM and Brightseed use AI to expand microbiome potential"
    },
    {
      "id": "1711760",
      "titel": "Feldassistent AI Agronomist von OneSoil",
      "beschreibung": "Das Zürcher Agrartechnikunternehmen OneSoil hat einen Chat-Assistenten in seine App integriert, der Landwirten täglich den Zustand ihrer Felder in natürlicher Sprache zusammenfasst. AI Agronomist weist auf überschwemmte Zonen oder Schädlingsrisiken hin, schlägt Maßnahmen vor und beantwortet Fragen zum Vergleich mehrerer Saisons. Technisch ist er ein multimodaler Agent aus Sprach- und Bildmodellen, ergänzt um eigene Modelle zur Erkennung von Feldgrenzen, Kulturen und Ertragszonen; Grundlage sind die seit 2017 gesammelten Satellitendaten. Für den Ausbau erhielt das Unternehmen 1 Mio. Euro.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 163.3,
      "radius": 0.4498,
      "daten": "18. Juni 2026",
      "titelOriginal": "OneSoil secures €1M to expand AI-powered farming assistant"
    },
    {
      "id": "1268401",
      "titel": "QuitSugar — App zur Senkung des Zuckerkonsums",
      "beschreibung": "QuitSugar ist eine Gesundheits-App, die den Zuckerkonsum erfasst und senken soll. Sie erkennt Lebensmittel über einen KI-gestützten Scan, zählt Kalorien und stellt personalisierte Aufgaben; versteckter Zucker in verarbeiteten Produkten wird dabei sichtbar. Über eine soziale Funktion können Freunde oder Teams gemeinsame Ziele verfolgen. Anwendungen dieser Art finden zunehmend Eingang in betriebliche Gesundheitsprogramme, in Anreizmodelle von Versicherern und in die Prävention.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 45.72,
      "radius": 0.403,
      "daten": "1. September 2025",
      "titelOriginal": "Sugar Reduction Tools"
    },
    {
      "id": "701108",
      "titel": "Konzentration im US-Online-Lebensmittelhandel",
      "beschreibung": "Große Ketten beherrschen den Online-Lebensmittelhandel in den USA: Händler mit mehr als 1 Mrd. Dollar Jahresumsatz, darunter Walmart, Amazon und Kroger, vereinten im Februar 2021 rund 70 % der Online-Umsätze auf sich, während kleinere regionale Anbieter Anteile verloren. Der Bericht von Brick Meets Click und Mercatus führt das auf die verlässlicheren Lieferzusagen der etablierten Marken zurück. Parallel entstehen virtuelle Verkaufsflächen: Die Plattform Obsess hat mit Ava einen Baukasten für dreidimensionale Läden vorgestellt, die sich per Smartphone, Tablet oder VR-Brille begehen lassen.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 65.45,
      "radius": 0.6292,
      "daten": "18. April 2023",
      "titelOriginal": "AI in Retail, online grocery, and virtual stores"
    },
    {
      "id": "1054368",
      "titel": "Vollautomatisiertes Restaurant CaliExpress in Pasadena",
      "beschreibung": "In Pasadena betreibt Miso Robotics mit CaliExpress by Flippy ein Restaurant, in dem Grill- und Frittierstation automatisiert arbeiten. Bestellung und Bezahlung laufen über Selbstbedienungskioske, die zugleich Empfehlungen aussprechen; die Zubereitung durch die Roboter ist vom Gastraum aus einsehbar. Nach Angaben des Betreibers ist es das erste vollständig autonom arbeitende Restaurant; auf der Karte stehen unter anderem Wagyu-Burger. Das Lokal dient zugleich als Ausstellungsraum für den Fritteusenroboter Flippy und weitere Küchenrobotik.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 58.16,
      "radius": 0.3902,
      "daten": "14. Juni 2024",
      "titelOriginal": "CaliExpress by Flippy"
    },
    {
      "id": "1438447",
      "titel": "Bestellassistent von Papa Johns auf Google Gemini",
      "beschreibung": "Die Pizzakette Papa Johns hat einen KI-gestützten Bestellassistenten eingeführt, der auf Google Gemini Enterprise for Customer Experience aufsetzt. Er ist über die App, die Website, das Telefon, Kioske und Fahrzeugsysteme erreichbar und führt die Bestellwege damit auf einer Plattform zusammen. Zu den Funktionen zählen Sprach- und Gruppenbestellung, ein Assistent für die Auswahl von Angeboten sowie Nachbestellungen ohne weitere Eingabe. Digitaltechnik-Vorstand Kevin Vasconi bezeichnet den Schritt als Umbau der digitalen Kundenbeziehung, nicht als bloße Aktualisierung der App.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 54.84,
      "radius": 0.1784,
      "daten": "14. Januar 2026",
      "titelOriginal": "AI-Powered Pizza Ordering Systems"
    },
    {
      "id": "1215864",
      "titel": "Sättigungspeptid GLP-1 Edge von Lembas",
      "beschreibung": "Das israelische Start-up Lembas hat mit GLP-1 Edge ein bioaktives Peptid entwickelt, das die körpereigene Ausschüttung von GLP-1 und weiteren appetitregulierenden Darmhormonen anregen soll. Vorgesehen sind eine Kapsel und Lebensmittel, die eine Mahlzeit am Tag ersetzen. Im Tierversuch erreicht das Präparat nach Firmenangaben rund zwei Drittel des Gewichtsverlusts von Semaglutid, dem Wirkstoff in Ozempic; eine Wirksamkeitsstudie am Menschen ist nicht geplant, da für Lebensmittel nur ein Sicherheitsnachweis verlangt wird. Das 2024 gegründete Unternehmen peilt den Markteintritt für 2027 an.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 139.14,
      "radius": 0.5814,
      "daten": "22. Juni 2025",
      "titelOriginal": "AI‑Powered GLP‑1 Peptide for Slimming – Israeli startup Lembas unveils food additive for slimming"
    },
    {
      "id": "1142853",
      "titel": "Forager — KI-Plattform für bioaktive Pflanzenstoffe",
      "beschreibung": "Brightseed sucht mit der KI-Plattform Forager nach bioaktiven Pflanzenstoffen mit gesundheitsfördernder Wirkung. Die so identifizierten Verbindungen dienen als Grundlage für die Entwicklung neuer Zutaten, die das Unternehmen neben Vitaminen und Mineralstoffen als eigene Wirkstoffklasse führt.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 136.67,
      "radius": 0.465,
      "daten": "21. Juli 2023",
      "titelOriginal": "Brightseed in the News"
    },
    {
      "id": "1143104",
      "titel": "Vivi Nova — mit KI entwickelte Limonade",
      "beschreibung": "Der Schweizer Getränkehersteller Vivi Kola hat die zuckerreduzierte, vegane Limonade Vivi Nova 2023 binnen zweier Tage mit generativen KI-Werkzeugen entwickelt. ChatGPT lieferte die Rezeptur aus Wasser, Limettensaft, Maibeersaft, Ingwersaft, Zichorienwurzelpulver und Rohrzucker sowie die Namensvorschläge; das Etikett entstand mit Midjourney und Unreal Engine. Vertrieben wird das Getränk über die Schweizer Handelskette Migros. Geschäftsführer Camilo Antezana bezeichnete die Werkzeuge als Hilfsmittel, das den Menschen derzeit nicht ersetzen könne.",
      "quellen": [
        {
          "name": "migros.ch",
          "url": "https://www.migros.ch/de/content/vivi-nova-kreiert-von-kuenstlicher-intelligenz"
        }
      ],
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 152.29,
      "radius": 0.2502,
      "daten": "14. Juni 2023",
      "titelOriginal": "AI designs soda for Swiss market"
    },
    {
      "id": "1661270",
      "titel": "Perplant: pflanzengenaues Spritzen vom Traktor",
      "beschreibung": "Das 2022 gegründete dänische Unternehmen Perplant baut traktormontierte Systeme, die Felder hochauflösend erfassen und Herbizide sowie Dünger pflanzengenau ausbringen. Die Sensoren lösen 2 bis 10 Zentimeter auf, wo Satellitenbilder üblicherweise 10 bis 30 Meter erreichen; gerechnet wird auf der Maschine, die über grundwassernahen Flächen zentimetergenau abschaltet. Nach Firmenangaben spart das bis zu 90 % Herbizid und 30 % Dünger, auf einem 200-Hektar-Betrieb rund 36.000 Euro im Jahr. Erfasst sind bislang über 200.000 Hektar in Europa; für die Ausweitung erhielt Perplant 1 Mio. Euro.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 178,
      "radius": 0.413,
      "daten": "25. Mai 2026",
      "titelOriginal": "Denmark’s Perplant raises €1 million for AI-based precision farming system"
    },
    {
      "id": "1241478",
      "titel": "Ernährungstracking mit Blutzuckerdaten bei Bevel",
      "beschreibung": "Das Gesundheitstechnik-Start-up Bevel hat seine Ernährungserfassung um eine KI-Funktion erweitert, die sich mit Blutzuckersensoren von Dexcom und Libre verbindet. Mahlzeiten erhalten eine Nährwertbewertung, und Essgewohnheiten werden mit weiteren Gesundheitswerten verknüpft, sodass sich der Einfluss einzelner Speisen auf den Blutzuckerverlauf ablesen lässt. Grundlage ist nach Angaben des Anbieters eine Datenbank mit über fünf Millionen geprüften Lebensmitteleinträgen; damit sollen die Abweichungen vermieden werden, die bei Plattformen auf Basis von Sprachmodellen auftreten.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 41.1,
      "radius": 0.4321,
      "daten": "6. Februar 2025",
      "titelOriginal": "AI-Powered Nutrition Tracking Tools"
    },
    {
      "id": "1187348",
      "titel": "Punktesysteme für gesunde Verpflegung am Arbeitsplatz",
      "beschreibung": "Betriebsverpflegung wird mit Spielmechaniken verknüpft: Beschäftigte sammeln Punkte für nährstoffreiche Auswahl, erreichte Bewegungsziele oder die Teilnahme an Gesundheitsprogrammen und lösen sie gegen Rabatte oder besondere Menüs ein. Als Plattformen dafür werden YuLife und Personify Health genannt. Die Kopplung an betriebliche Gesundheitsprogramme soll die Beteiligung erhöhen und das Verpflegungsangebot an die Gesundheitsziele des Unternehmens binden.",
      "quellen": [
        {
          "name": "yulife.com",
          "url": "https://yulife.com/"
        },
        {
          "name": "personifyhealth.com",
          "url": "https://personifyhealth.com/"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 57.41,
      "radius": 0.6048,
      "daten": "12. Mai 2025",
      "titelOriginal": "Gamified Workplace Meals"
    },
    {
      "id": "1054367",
      "titel": "Aniai Alpha Grill: Kochroboter für Burgerküchen",
      "beschreibung": "Das US-Unternehmen Aniai bietet mit Alpha Grill einen Kochroboter, der Burger nach hinterlegten Rezepten zubereitet und auf Personalmangel und Durchsatz in der Gastronomie zielt. Die zugehörige Plattform Alpha Cloud steuert die Geräte und wurde von der National Restaurant Association 2024 mit dem Kitchen Innovations Award ausgezeichnet.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 57.02,
      "radius": 0.3683,
      "daten": "26. Januar 2025",
      "titelOriginal": "Aniai: Automated Cooking"
    },
    {
      "id": "1213070",
      "titel": "Green Dot Assist — KI-Assistent für Starbucks-Baristas",
      "beschreibung": "Starbucks erprobt mit „Green Dot Assist“ einen generativen KI-Assistenten, der dem Personal hinter der Theke über iPads Rezepturen, Schritte zur Störungsbehebung an Geräten und Antworten aus dem Mitarbeiterhandbuch liefert. Filialleitungen können Dienstplanlücken schließen, indem das System verfügbare Kräfte ermittelt und anfragt. Der Test läuft in 35 Filialen, der breitere Rollout ist für das Geschäftsjahr 2026 vorgesehen. Die Anwendung nutzt OpenAI-Technik auf Microsoft Azure; zuvor waren kundenseitige Automatisierungsversuche hinter den Erwartungen geblieben.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 53.43,
      "radius": 0.253,
      "daten": "11. Juni 2025",
      "titelOriginal": "Starbucks brews up AI to support baristas instead of replace them"
    },
    {
      "id": "1209042",
      "titel": "KI und Robotermagen in Danones Joghurtentwicklung",
      "beschreibung": "Danone setzt KI in Produktentwicklung, Sensorik und Lieferkette ein, um sein Joghurtgeschäft zu erneuern. Datenauswertungen sollen Konsumtrends und aufkommende Geschmacksrichtungen früher erkennen, maschinelles Lernen wertet Gesundheitsprofile und Probenmaterial zur Analyse von Mikrobiomen aus. Ein eigens gebauter Robotermagen bildet die Verdauung nach und prüft, wie Probiotika den Verdauungstrakt passieren. Dafür investierte der Konzern in eine neue Forschungseinrichtung und arbeitet mit Microsoft Azure und Amazon Web Services zusammen.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 146.71,
      "radius": 0.5648,
      "daten": "12. August 2023",
      "titelOriginal": "Revolutionizing Yogurt with AI"
    },
    {
      "id": "1142848",
      "titel": "Arzeda entwirft Proteine und Enzyme rechnergestützt",
      "beschreibung": "Arzeda aus Seattle entwirft neue Proteine und Enzyme, indem es physikbasierte Proteinmodellierung mit KI verbindet. Der Anbieter gibt an, so Moleküle zu erzeugen, die auf natürlichem Weg nicht entstehen, und sie für Lebensmittel, Ernährung, nachhaltige Materialien und Haushaltsprodukte nutzbar zu machen. Im September 2024 schloss das Unternehmen eine Finanzierungsrunde über 38 Millionen US-Dollar ab, im Januar 2025 erhielt es Mittel der US-Forschungsagentur DARPA für Proteindesign mit wenig Daten. Seit September 2023 besteht eine gemeinsame Entwicklungsvereinbarung mit W. L. Gore & Associates.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 147.14,
      "radius": 0.4276,
      "daten": "12. Februar 2025",
      "titelOriginal": "AI created Proteins and Enzymes"
    },
    {
      "id": "1142861",
      "titel": "Mycofood — Pilzprotein aus Präzisionsfermentation",
      "beschreibung": "ETERNAL stellt mit Präzisionsfermentation Protein aus dem Pilz Fusarium venenatum her und vermarktet es unter dem Namen Mycofood. Nach Angaben des Unternehmens entsteht damit eine vollständig tierfreie Zutat, deren Fermentation auf Qualität, Skalierbarkeit und Kosten hin optimiert wird. Als Finalist der NASA-Ausschreibung Deep Space Food Challenge arbeitet ETERNAL zugleich an Verpflegungssystemen für lange Raumfahrtmissionen.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 139.59,
      "radius": 0.2983,
      "daten": "5. Mai 2022",
      "titelOriginal": "AI supported Biomass Fermentation"
    },
    {
      "id": "1415400",
      "titel": "BinSentry — KI-Sensoren für Futtersilos",
      "beschreibung": "BinSentry misst Füllstände in Futtersilos mit solarbetriebenen, selbstreinigenden Sensoren und wertet die Daten per KI aus, um Bestellungen, Touren und Bedarfsprognosen zu steuern; manuelle Kontrollen am Silo entfallen. Das Unternehmen aus Kitchener, Ontario, und Austin, Texas, überwacht nach eigenen Angaben mehr als 40.000 Futtersilos für Schweine- und Geflügelbetriebe in Nordamerika und Brasilien und arbeitet mit Cargill und Wayne-Sanderson Farms. Von CIBC Innovation Banking erhielt es 25 Millionen US-Dollar Wachstumskapital, zuvor 50 Millionen US-Dollar aus einer Serie-C-Runde.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 162.51,
      "radius": 0.425,
      "daten": "6. Januar 2026",
      "titelOriginal": "North American Agtech BinSentry Clinches $25M From CIBC Innovation Banking"
    },
    {
      "id": "1222153",
      "titel": "Vorwerk koppelt Thermomix an humanoide Roboter",
      "beschreibung": "Vorwerk verbindet seine Küchen- und Reinigungsgeräte mit humanoider Robotik. Auf der Messe Automatica in München zeigten Vorwerk und das Start-up Neura Robotics einen humanoiden Roboter, der Thermomix und Kobold-Sauger für Haushaltsaufgaben bedient; Neura-Chef David Reger nennt als Ziel eine Plattform, die selbstständiges Wohnen im Alter unterstützt. Parallel trainiert Vorwerk das offene Robotik-Basismodell NVIDIA Isaac GR00T N1 nach und erzeugt über die Datenpipeline Isaac GR00T-Mimic synthetische Bewegungsdaten für Aufgaben wie Kochen und Putzen.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 32.21,
      "radius": 0.3683,
      "daten": "9. Juli 2025",
      "titelOriginal": "Thermomix Has Long Been a Leader in Cooking Automation, But Now They’re Going Full Robot"
    },
    {
      "id": "1187344",
      "titel": "Kantinenmenüs nach Stimmungsdaten der Belegschaft",
      "beschreibung": "Das Konzept sieht Kantinenpläne vor, die nicht mehr fest stehen, sondern sich an Kennzahlen zur Lage der Belegschaft ausrichten. Eine KI wertet dafür Stimmung, Häufigkeit der Zusammenarbeit und Anzeichen von Erschöpfung aus Plattformen wie Slack und Microsoft Viva Pulse aus und passt das Angebot an: an Tagen mit niedrigem Energieniveau leichte, beruhigende Gerichte, an Tagen mit hoher Beanspruchung schnell verfügbare kohlenhydratreiche Speisen.",
      "quellen": [
        {
          "name": "microsoft.com",
          "url": "https://www.microsoft.com/en-us/microsoft-viva/pulse"
        },
        {
          "name": "slack.com",
          "url": "https://slack.com/intl/en-in/features/analytics"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 60.8,
      "radius": 0.6141,
      "daten": "12. Mai 2025",
      "titelOriginal": "Team-Aware Cafeteria Menus"
    },
    {
      "id": "1054338",
      "titel": "Generative KI als Assistenz für Restaurantpersonal",
      "beschreibung": "Brown Bacon AI hat eine generative KI-Anwendung für den Service im Restaurant in Betrieb genommen und bezeichnet sie als erste ihrer Art. Die Plattform „Server Empowerment & Manager Assist“ gibt Empfehlungen zu Speisen und Getränken, Hinweise zum Betriebsablauf und Antworten auf Fragen aus dem Mitarbeiterhandbuch; zusätzlich erstellt sie Beiträge für soziale Medien und Marketing-E-Mails in einer einzigen Anwendung. Erster Anwender ist das Restaurant Cibo Vino, dessen Inhaberin Wendy Becker damit vor allem die Einarbeitung neuer Servicekräfte verkürzen will.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 75.14,
      "radius": 0.4256,
      "daten": "5. November 2024",
      "titelOriginal": "AI Restaurant Servers"
    },
    {
      "id": "1145179",
      "titel": "OpenTable-Reservierungen über ChatGPT",
      "beschreibung": "OpenTable hat eine eigene Schnittstelle gebaut, über die ChatGPT auf Verfügbarkeiten, Restaurantdatenbank und redaktionelle Inhalte des Reservierungsdienstes zugreift; Anfragen wie nach dem besten Brunch in San Francisco führen so zu buchbaren Tischen. Der Zugang war zunächst auf einen kleinen Nutzerkreis begrenzt. OpenTable arbeitet mit über 50.000 Restaurants; Buchungen aus ChatGPT erscheinen den Betrieben als Partnerkanal, ohne dass sie etwas einrichten müssen. Nach Daten des Anbieters sank die Laufkundschaft in einem Sechsmonatszeitraum um 8 %, während Online-Buchungen um 9 % zunahmen.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 65.38,
      "radius": 0.2432,
      "daten": "30. März 2023",
      "titelOriginal": "AI Restaurant Reservations: OpenTable + ChatGPT"
    },
    {
      "id": "1182794",
      "titel": "Kamerabasierte Sensorik für Präzisionsfermentation",
      "beschreibung": "Konica Minolta und das Schweizer Unternehmen Planetary verbinden kamerabasierte Bildsensorik mit KI, um Fermentationsprozesse in Echtzeit zu überwachen und zu steuern. Erzeugt werden Proteine aus Präzisionsfermentation, die Milch, Eier, Fette und Mykoproteine ersetzen sollen. Nach Angaben der Partner sollen dadurch weniger Chargen verloren gehen und die Herstellkosten um 20 bis 30 % sinken, womit sich der Preisabstand zu konventionellen Milchprodukten verringern würde.",
      "quellen": [
        {
          "name": "konicaminolta"
        },
        {
          "name": "dairyreporter"
        }
      ],
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 138.97,
      "radius": 0.535,
      "daten": "17. Juni 2024",
      "titelOriginal": "AI Dairy Sensing Solutions"
    },
    {
      "id": "1142847",
      "titel": "Ginkgo Bioworks programmiert Zellen für neue Enzyme",
      "beschreibung": "Ginkgo Bioworks verbindet rechnergestütztes Design mit KI, um neue Proteine und Enzyme zu erzeugen. Das Unternehmen betreibt eine Plattform zur Zellprogrammierung und bietet darauf aufbauende Entwicklungsleistungen für Auftraggeber aus Lebensmittelwirtschaft und Landwirtschaft, Pharmazie sowie Industrie- und Spezialchemie an. Grundgedanke ist, die DNA einer Zelle wie Programmcode zu lesen und zu schreiben.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 146.71,
      "radius": 0.465,
      "daten": "12. Februar 2025",
      "titelOriginal": "AI created Proteins & Enzymes"
    },
    {
      "id": "1142773",
      "titel": "Gastrograph AI — Sensorikdatenbank für Produktentwicklung",
      "beschreibung": "Gastrograph betreibt nach eigenen Angaben die weltweit größte Sensorikdatenbank und wertet sie mit KI aus, um Geschmack, Aroma und Textur von Lebensmitteln und Getränken auf Verbraucherpräferenzen auszurichten. Hersteller können damit neue Produkte auslegen, bestehende an andere Märkte anpassen und Verschiebungen in den Vorlieben erkennen, ohne für jeden Markt eigene Verkostungsreihen aufzusetzen. Das Unternehmen nennt über eine Milliarde Datenpunkte; Vorhersagen lassen sich nach Region sowie nach Merkmalen wie Geschlecht, Alter und Geschmackserfahrung eingrenzen.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 142.56,
      "radius": 0.2514,
      "daten": "12. Februar 2025",
      "titelOriginal": "Gastrograph: World’s largest sensory database"
    },
    {
      "id": "1159656",
      "titel": "Avalo züchtet klimafestes Zuckerrohr für Coca-Cola",
      "beschreibung": "Avalo aus North Carolina nutzt interpretierbare KI, um in Pflanzengenomen jene Gene zu finden, die Merkmale wie Trockenheitstoleranz und Stickstoffeffizienz bestimmen, und beschleunigt damit klassische Züchtung. Für Coca-Cola Europacific Partners entwickelt das 2020 gegründete Unternehmen Zuckerrohr, das mit weniger Wasser und Stickstoffdünger auskommt und die Scope-3-Emissionen des Getränkeherstellers senken soll. Eine Serie-A-Runde brachte 11 Millionen US-Dollar. Statt zwölf Jahren soll eine neue Sorte in fünf bis sechs Jahren marktreif sein.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 169.2,
      "radius": 0.3683,
      "daten": "6. März 2025",
      "titelOriginal": "AI-powered plant breeding startup Avalo partners with Coca Cola to future proof sugarcane production"
    },
    {
      "id": "1537267",
      "titel": "AIChef Ultra — Kochautomat mit Zutatenerkennung",
      "beschreibung": "wan AIChef hat auf der Consumer Electronics Show 2026 in Las Vegas den AIChef Ultra vorgestellt und sein automatisiertes Kochsystem damit erstmals in den US-Markt gebracht. Das Gerät erkennt eingelegte Zutaten und steuert den Garvorgang selbstständig, einschließlich Garverfahren und Temperaturführung. Der Anbieter gibt an, das Rezeptsystem werde von erfahrenen Köchen eingelernt und laufend mit Betriebsdaten verfeinert; über die hauseigene Plattform AiOS soll das Gerät zudem persönliche Ernährungspläne erstellen.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 44.51,
      "radius": 0.6295,
      "daten": "8. Januar 2026",
      "titelOriginal": "AI Cooking Agents"
    },
    {
      "id": "1181556",
      "titel": "KODY 29 — Küchengerät mit 21 Garprogrammen",
      "beschreibung": "Der Kitchen Idea KODY 29 ist ein Küchengerät für die Arbeitsplatte, das über einen eingebauten Bildschirm mehr als 1.500 angeleitete Rezepte bereitstellt. Es bietet 21 Garprogramme, die nach Angaben des Anbieters KI-gestützt abgestimmt sind, und arbeitet nach dem Start ohne weitere Eingriffe. Wechselbare Messer decken Funktionen wie Kneten und Pfannenrühren ab; Dampfgareinsatz und Schmetterlingsrührer gehören zum Zubehör.",
      "quellen": [
        {
          "name": "kickstarter"
        },
        {
          "name": "gadgetify"
        }
      ],
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 49.43,
      "radius": 0.4292,
      "daten": "26. Mai 2023",
      "titelOriginal": "AI-Powered Cooking Appliances"
    },
    {
      "id": "1384269",
      "titel": "Tuidi — KI-Steuerung für den Lebensmitteleinzelhandel",
      "beschreibung": "Tuidi aus Putignano entwickelt Plattformen mit maschinellem Lernen für den Lebensmitteleinzelhandel und hat eine Seed-Runde über 3 Millionen Euro abgeschlossen, getragen von Vertis SGR, Azimut und dem Marktforscher QBerg. Kern des Angebots ist Delphi, das täglich Empfehlungen zu Beschaffung, Verkaufspreisen, Sortiment und Personaleinsatz gibt. Über die Plattform wurden nach Unternehmensangaben mehr als 620 Millionen Produkte gesteuert; Anwender wie Conad Centro Nord, Maiora und Ama Crai Est berichten von bis zu 2 % höheren Umsätzen und bis zu 10 % geringeren Bestellkosten.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 63.11,
      "radius": 0.557,
      "daten": "7. Oktober 2025",
      "titelOriginal": "Italy’s Tuidi secures €3 million to optimise grocery retail through AI-driven store management"
    },
    {
      "id": "1054333",
      "titel": "Marktprognose für Lebensmittelrobotik bis 2034",
      "beschreibung": "Der weltweite Markt für Lebensmittelrobotik wird für 2024 auf 2,29 Milliarden US-Dollar beziffert und soll bis 2034 auf 14,93 Milliarden US-Dollar wachsen, ein jährliches Wachstum von 20,61 %. Europa hielt 2023 mit 34 % den größten Anteil, getrieben von Arbeitskräftemangel und hohen Lohnkosten; am schnellsten wächst der asiatisch-pazifische Raum. Nach Robotertyp lagen Knickarmroboter 2023 mit 42 % vorn, nach Anwendung das Palettieren. Im August 2023 übernahm das Hamburger Unternehmen Circus das Berliner Küchenrobotik-Start-up Aitme.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 72.47,
      "radius": 0.4139,
      "daten": "30. Oktober 2024",
      "titelOriginal": "Food Robotics Market Size, Share and Trends 2024 to 2034"
    },
    {
      "id": "1145173",
      "titel": "Gesichtserkennung in Snackautomaten der Uni Waterloo",
      "beschreibung": "An der University of Waterloo sollen Snackautomaten vom Campus entfernt werden, nachdem Studierende auf einem Display die Fehlermeldung einer Gesichtserkennungs-Anwendung entdeckt hatten. Hersteller Invenda erklärt, die Software erkenne lediglich Anwesenheit, geschätztes Alter und Geschlecht, verarbeite die Bilddaten lokal und speichere oder übertrage sie nicht; Eigentümer der Automaten ist Mars. 2020 hatte die kanadische Datenschutzbehörde festgestellt, dass Kameras in Informationsstelen von Cadillac Fairview über fünf Millionen Bilder von Einkaufenden ohne deren Wissen erfasst hatten.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 75.14,
      "radius": 0.2162,
      "daten": "23. Februar 2024",
      "titelOriginal": "'Facial recognition' message on vending machine"
    },
    {
      "id": "1182792",
      "titel": "KI-gestützte Biosensoren für Bioreaktoren von The Cultivated B",
      "beschreibung": "Das Biotechnologieunternehmen The Cultivated B hat ein Biosensorsystem vorgestellt, das Zellkulturen in Bioreaktoren mit KI in Echtzeit überwacht. Die Sensoren erfassen Wachstum und Stoffwechselaktivität laufend und sollen physische Sonden sowie manuelle Probennahme während der Fermentation ersetzen; eine Echtzeit-Datenanalyse ist eingebunden. Gründer und Geschäftsführer Hamid Noori gibt an, die Sensortechnik verkürze die Lernkurve im Bioprozess und ermögliche stärker automatisierte, skalierbare Abläufe. Ein Anwendungsfeld ist die Herstellung von kultiviertem Fleisch.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 143.86,
      "radius": 0.5579,
      "daten": "6. Februar 2025",
      "titelOriginal": "AI-Powered Cultivated Meat Fermenters"
    },
    {
      "id": "1142771",
      "titel": "bite.ai: Bilderkennung für Lebensmittel",
      "beschreibung": "Das Start-up bite.ai erkennt Lebensmittel auf Fotos, um Ernährungsprotokolle zu vereinfachen und daraus Erkenntnisse über das Essverhalten zu gewinnen. Die Modelle ordnen Erkanntes hierarchisch ein, von der groben Warengruppe bis zum einzelnen Gericht. Sie lassen sich lokal oder auf Mobilgeräten betreiben, wo kurze Antwortzeiten oder Datenschutz das verlangen.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 143.61,
      "radius": 0.3905,
      "daten": "12. Februar 2025",
      "titelOriginal": "biteAI: Food Image Recognition"
    },
    {
      "id": "1069585",
      "titel": "„AI-conic“: KI-Kaffeemischung samt Name und Verpackungsdesign",
      "beschreibung": "Die Helsinkier Kaffa Roastery hat eine Kaffeemischung von einer KI zusammenstellen lassen; Name, Geschmacksbeschreibung und Verpackungsdesign stammen ebenfalls daraus. Eingesetzt wurden Modelle ähnlich ChatGPT und Copilot, gefüttert mit den Beschreibungen der vorhandenen Kaffeesorten. Das Ergebnis „AI-conic“ vereint vier statt der üblichen zwei bis drei Bohnensorten aus Brasilien, Kolumbien, Äthiopien und Guatemala, dominiert von einer Arabica-Bohne der Fazenda Pinhal. Nach Teströstung und Blindtests sahen die Röster keinen Nachbesserungsbedarf; die 250-Gramm-Packung kostet 12,90 Euro.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 130.57,
      "radius": 0.1928,
      "daten": "28. Dezember 2024",
      "titelOriginal": "KI kreiert überraschende Kaffeemischung – Rösterei begeistert von Ergebnis"
    },
    {
      "id": "1145180",
      "titel": "GreenView: Reifegrad-Erkennung per Computer Vision",
      "beschreibung": "Bitwise Agronomy aus Tasmanien wertet mit neuronalen Netzen und Computer Vision Videoaufnahmen von Beeren- und Weinkulturen aus und erkennt daraus Reifegrad, Frostschäden und Krankheiten. Die Bilder entstehen seitlich mit einer GoPro-Kamera an einem vorhandenen Betriebsfahrzeug und werden auf einer Karte in Bewirtschaftungsblöcke einsortiert. Die Plattform zählt Beeren und ordnet sie nach Reife, schätzt Erträge und erfasst im Weinbau Veraison, Laubwand- und Stockhöhe, Schnittqualität sowie fehlende Rebstöcke. Eine Ausweitung auf Gemüsekulturen ist geplant.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 160.3,
      "radius": 0.3817,
      "daten": "23. Juli 2022",
      "titelOriginal": "GreenView: Neural net computer vision pattern recognition to automatically detect ripeness"
    },
    {
      "id": "1497772",
      "titel": "Anemoia Device: KI übersetzt Fotografien in Düfte",
      "beschreibung": "Am MIT hat ein Team um Cyrus Clarke eine Maschine gebaut, die aus einem eingelegten Archivfoto einen Duft mischt. Ein Vision-Language-Modell beschreibt das Bild in einem Satz; über drei Drehregler werden Motiv, Alter des Motivs und Stimmung gewählt, woraus ein auf GPT-4o beruhendes Modell einen kurzen poetischen Text formt. Aus einer Bibliothek von zunächst 39, inzwischen 50 Duftstoffen — von altem Papier über Leder bis Erde — bestimmt das Modell Noten und Mengen, vier Pumpen dosieren sie in ein Becherglas. Der Name geht auf „anemoia“ zurück, die Sehnsucht nach einer nie erlebten Zeit.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 49.21,
      "radius": 0.6118,
      "daten": "5. März 2026",
      "titelOriginal": "AI powered machine turns photos into smells"
    },
    {
      "id": "1181554",
      "titel": "Perfecta: Grill mit KI-Steuerung von Seergrills",
      "beschreibung": "Das britische Start-up Seergrills hat auf der CES 2024 den Grill Perfecta gezeigt, der ein 2,5 Zentimeter dickes Ribeye in 90 Sekunden garen soll. Zwei senkrecht stehende Infrarotbrenner erhitzen das Gargut beidseitig auf bis zu 900 Grad Celsius, sodass kein Wenden nötig ist. Sensoren erfassen die Dicke von Steak oder Hähnchen; die Steuerung „NeuralFire“ mit Vierkernprozessor berechnet daraus Zeit, Temperatur und Brennerabstand für den gewünschten Gargrad. Daneben gibt es Ofen-, Drehspieß- und Handbetrieb. Die Auslieferung war für das vierte Quartal 2024 zu 3.500 US-Dollar angekündigt.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 47.28,
      "radius": 0.4186,
      "daten": "29. April 2025",
      "titelOriginal": "Seergrills Unveils AI-Powered Perfecta Grill at CES 2024"
    },
    {
      "id": "1054330",
      "titel": "Tops Chef Bot: KI-Einkaufsassistent von Central Food Retail",
      "beschreibung": "Central Food Retail, Betreiber der thailändischen Kette Tops, hat mit Central Retail Digital und Google Cloud einen generativen KI-Assistenten für den Lebensmitteleinkauf entwickelt. Er läuft über die Messenger-App LINE und startete im Dezember 2024 als Pilot in der Filiale Central Chidlom; geplant ist die Ausweitung auf alle Filialen. Grundlage sind Vertex AI Search und Gemini 1.5 Flash mit Zugriff auf Bestands-, Produkt- und Rezeptdaten aus BigQuery. Er empfiehlt Produkte, berechnet Zutatenmengen je Portionszahl unter Beachtung von Allergien und religiösen Vorgaben und bündelt Rabatte.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 73.01,
      "radius": 0.4534,
      "daten": "2. Dezember 2024",
      "titelOriginal": "Central Food Retail Group debuts AI-powered Tops Chef Bot"
    },
    {
      "id": "1144989",
      "titel": "TGI Fridays: Außer-Haus-Geschäft mit zugekaufter KI",
      "beschreibung": "Die Restaurantkette TGI Fridays hat ihren Außer-Haus-Umsatz binnen eines Jahres auf 150 Millionen US-Dollar verdoppelt und führt das auf KI zurück. Statt eines eigenen Systems kombinierte Chief Experience Officer Sherif Mityas drei zugekaufte Anwendungen: Amperity führt Daten aus Kassenbons, Treueprogramm und App zusammen und verschickt daraus mit maschinellem Lernen personalisierte Angebote; Conversable bedient per Sprachverarbeitung Facebook, Twitter, Amazon und Alexa; von Hypergiant stammt der virtuelle Barkeeper Flanagan mit über 300 Geschmacksprofilen aus Stimmung und Bestellhistorie.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 75.14,
      "radius": 0.2385,
      "daten": "27. Juni 2018",
      "titelOriginal": "TGI Fridays Using Out-of-the-Box AI"
    },
    {
      "id": "1177979",
      "titel": "PIPA: KI-Suche nach bioaktiven Molekülen",
      "beschreibung": "Der Anbieter PIPA vermarktet KI-Werkzeuge für Hersteller von Lebensmitteln, Zutaten und Nahrungsergänzung, die in Forschung, Entwicklung, Produktion und Vermarktung eingebunden werden sollen. Kern ist die rechnergestützte Suche nach bioaktiven Molekülen samt Profilbildung und Formulierung für funktionelle Lebensmittel, Snacks, Supplemente und Nutrazeutika. Für den Bereich Life Sciences gibt der Anbieter an, Modelle auf öffentlichen und eigenen klinischen Daten zu trainieren, um Krankheitsprädiktoren und Biomarker zu bestimmen und Studienkohorten auszuwählen.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 148.45,
      "radius": 0.6229,
      "daten": "28. März 2025",
      "titelOriginal": "AI for creating a sustainable and healthy future"
    },
    {
      "id": "1142770",
      "titel": "Tastewise: Datenanalyse für die Produktentwicklung",
      "beschreibung": "Das israelische Unternehmen Tastewise wertet mit KI Daten zu Speisekarten, Rezepten und Verbraucherverhalten aus und unterlegt damit Produktentwicklung und Marketing von Lebensmittelherstellern; erfasst werden nach eigenen Angaben über eine Million Restaurants weltweit. In einer Series-A-Runde nahm das 2017 gegründete Unternehmen 17 Millionen US-Dollar auf, angeführt von Disruptive neben PeakBridge und PICO Venture Partners; die Gesamtfinanzierung stieg auf 21,5 Millionen US-Dollar. Zu den Kunden zählen Nestlé, PepsiCo und Kraft Heinz sowie knapp 15 % der 100 größten Lebensmittelmarken.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 137.49,
      "radius": 0.465,
      "daten": "2. März 2022",
      "titelOriginal": "Tastewise: AI supported new product development"
    },
    {
      "id": "1069584",
      "titel": "KI-Kaffeemischung der Kaffa Roastery in Helsinki",
      "beschreibung": "Die Helsinkier Rösterei Kaffa hat eine Kaffeemischung von einer KI zusammenstellen lassen, die auch Name, Geschmacksbeschreibung und Verpackungsdesign lieferte. Die Modelle arbeiten ähnlich wie ChatGPT und Copilot; sie erhielten die Beschreibungen der vorhandenen Kaffeesorten und den Auftrag, eine neue Mischung zu entwickeln. Gewählt wurden Bohnen aus Brasilien, Kolumbien, Äthiopien und Guatemala — vier statt der sonst üblichen zwei bis drei Sorten, was Gründer Svante Hampf „etwas seltsam“ fand. Nach Blindtests hielten die Fachleute keine Nachbesserung für nötig; 250 Gramm kosten 12,90 Euro.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 143.42,
      "radius": 0.2098,
      "daten": "22. April 2024",
      "titelOriginal": "KI erstellt Kaffeemischung – und überrascht Experten"
    },
    {
      "id": "1143834",
      "titel": "Beewise: robotischer Bienenstock mit KI-Überwachung",
      "beschreibung": "Das israelische Unternehmen Beewise betreibt mit BeeHome einen robotischen Bienenstock, der Bilderfassung, Sensoren und Mechanik verbindet, den Zustand der Völker laufend überwacht und selbsttätig eingreift. Der Anbieter gibt an, die Verluste an Bienenvölkern damit um 70 bis 80 % zu senken; als Ausgangslage nennt er, dass 75 % der verzehrten Feldfrüchte von Bienen bestäubt werden und jährlich 40 % der Völker zusammenbrechen. Adressiert werden weit auseinanderliegende Standorte, zu späte Kontrollgänge und fehlendes Fachpersonal. Eine Series-C-Runde brachte 80 Millionen US-Dollar.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 178,
      "radius": 0.3683,
      "daten": "13. Februar 2025",
      "titelOriginal": "AI Supported Pollination"
    },
    {
      "id": "1474683",
      "titel": "Medi Water AI 2.0: personalisierte Wasser- und Nährstoffabgabe",
      "beschreibung": "Ceragem hat mit Medi Water AI 2.0 ein Gerät der Medizinprodukteklasse II vorgestellt, das Trinkwasser und Nährstoffe personalisiert abgibt. Über Fingerabdruckerkennung ordnet es die Ausgabe einer Person zu und berücksichtigt nach Angaben des Anbieters Krankengeschichte, eingenommene Medikamente, Schlaf, Ernährung und Bewegung; Mineralstoffgehalt, pH-Wert und Zusätze werden in Echtzeit angepasst. Ein zweiter Betriebsmodus gibt dosierte Kapseln aus und überwacht deren Bestand. Das Gerät ist Honoree der CES 2026 Innovation Awards in der Kategorie Food Tech.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 43.08,
      "radius": 0.5583,
      "daten": "2. Dezember 2025",
      "titelOriginal": "Personalized Hydration Systems"
    },
    {
      "id": "1148768",
      "titel": "GPT Food Cam: Kalorienschätzung aus dem Essensfoto",
      "beschreibung": "GPT Food Cam ist eine kostenlose iOS-Anwendung, die Mahlzeiten per Kamerabild erfasst und daraus einen Kalorienbereich statt eines exakten Werts schätzt. Sie öffnet direkt die Kamera, verzichtet auf Registrierung und Abonnement und finanziert sich über Werbung; die Nutzung ist auf sechs Aufnahmen je Tag begrenzt. Im Hintergrund zerlegt das Modell Gemini Flash die Aufgabe in Schritte: Zutaten einzeln erkennen, Portionsgrößen aus dem Kontext wie Schüssel oder Teller ableiten, Kalorien je Position schätzen und summieren. Initiator Raj Singh beziffert die Treffgenauigkeit auf etwa 95 %.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 30.94,
      "radius": 0.4298,
      "daten": "17. September 2024",
      "titelOriginal": "Future of Food Logging Apps: GPT Food Cam"
    },
    {
      "id": "1308304",
      "titel": "CA-1: Kochroboter von Circus mit Meta-Modell Llama",
      "beschreibung": "Das Hamburger Start-up Circus hat den Kochroboter CA-1 vorgestellt, eine rund sieben Quadratmeter große, verglaste Einheit, in der zwei Roboterarme vorgegarte Zutaten portionieren, garen, anrichten und anschließend spülen. Mehrere KI-Agenten überwachen Sensorik, Wartung und Zubereitung; Partner Meta steuert neben Kapital sein Sprachmodell Llama bei. Die Anlage arbeitet ohne Internetanbindung in einem geschlossenen System und kühlt die Zutaten konstant auf vier bis sechs Grad. Circus beziffert die Einsparung an Arbeitskosten auf bis zu 95 % und den Preis auf rund 250.000 Euro.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 65.5,
      "radius": 0.5461,
      "daten": "4. Oktober 2025",
      "titelOriginal": "Zubereitung mit KI-Hilfe Essen aus dem Kochroboter als Gastro-Zukunft?"
    },
    {
      "id": "1054327",
      "titel": "NextGen Food Robotics: Bestellanwendung Lily",
      "beschreibung": "Die kanadische NextGen Food Robotics Corp. entwickelt eine KI-gestützte Bestell- und Lieferanwendung namens Lily für ihre Ghost Kitchens und die eigene Lebensmittelherstellung. Bestellungen laufen über die Anwendung und werden in den Ghost-Kitchen-Standorten zubereitet; perspektivisch soll die Auslieferung per Drohne erfolgen, wo die Rechtslage es zulässt. Aus den Bestelldaten will das Unternehmen Markttrends ableiten und aggregiert an Lebensmittelhersteller verkaufen, Kundendaten selbst sollen geschützt bleiben. Die erste Fassung war für den 15. Mai 2023 angekündigt.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 68.26,
      "radius": 0.4278,
      "daten": "25. April 2023",
      "titelOriginal": "AI-powered App: NextGen Food Robotics"
    },
    {
      "id": "1144982",
      "titel": "Dishoom: KI-Bestandsführung gegen Lebensmittelverschwendung",
      "beschreibung": "Die Londoner Restaurantkette Dishoom setzt eine KI-Anwendung für die Bestandsführung ein. Die Lebensmittelverschwendung sank dadurch den vorliegenden Angaben zufolge um 20 %.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 62.74,
      "radius": 0.288,
      "daten": "14. Februar 2025",
      "titelOriginal": "AI tool for inventory management"
    },
    {
      "id": "1177978",
      "titel": "Periodic Table of Food Initiative: Multi-Omics-Daten zu Lebensmitteln",
      "beschreibung": "Die Periodic Table of Food Initiative erfasst mit Multi-Omics-Verfahren die Bestandteile von Lebensmitteln und stellt die Daten als öffentliches Gut bereit. Anlass ist die fehlende Vergleichbarkeit der Labormethoden: identische Proben ergaben in mehreren Laboren kaum überlappende metabolomische Befunde, obwohl jedes Labor für sich reproduzierbar arbeitete. Sie standardisiert deshalb Protokolle für Probennahme, Analytik und Metadaten und verteilt sie an Partnerlabore; genutzt werden ungezielte Metabolomik, Lipidomik, Ionomik und Fettsäureanalytik. Ausgewertet wird über die Plattform MarkerLab.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 145.81,
      "radius": 0.6209,
      "daten": "13. Februar 2024",
      "titelOriginal": "Periodic Table of Food"
    },
    {
      "id": "1142769",
      "titel": "Tastewise: Trenddaten aus Menüs, Rezepten und Netzinhalten",
      "beschreibung": "Tastewise ist ein Start-up, das mit KI Daten aus sozialen Netzwerken, Bewertungen, Speisekarten und Rezepten zusammenführt, um veränderte Ernährungsgewohnheiten und Geschmacksvorlieben zu erkennen. Lebensmittelkonzerne nutzen die Software als Grundlage für die Entwicklung neuer Produkte. Der Anbieter richtet die Auswertungen zudem auf Einzelhandel und Außer-Haus-Verpflegung aus.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 141.47,
      "radius": 0.465,
      "daten": "12. Februar 2025",
      "titelOriginal": "Tastewise: AI inspires New Product Development"
    },
    {
      "id": "1069583",
      "titel": "„AI-conic“: von KI komponierter Blend aus vier Bohnensorten",
      "beschreibung": "Die Kaffa Roastery in Helsinki, Finnlands drittgrößte Rösterei, hat mit der KI-Beratung Elev die Mischung „AI-conic“ auf den Markt gebracht, deren Zusammensetzung eine KI bestimmt hat. Die Modelle, laut Elev vergleichbar mit ChatGPT und Copilot, erhielten Beschreibungen aller Kaffeesorten und wählten Bohnen aus Brasilien, Kolumbien, Äthiopien und Guatemala; auch Etikett und Geschmacksbeschreibung stammen von der KI. Geschäftsführer Svante Hampf zeigte sich überrascht über vier statt der üblichen zwei bis drei Sorten; nach Blindverkostung hielten die Fachleute keine Korrektur für nötig.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 136.65,
      "radius": 0.2032,
      "daten": "21. April 2024",
      "titelOriginal": "A coffee roastery in Finland has launched an AI-generated blend. The results were surprising"
    },
    {
      "id": "1519879",
      "titel": "Living Models: Basismodelle für Pflanzengenomik",
      "beschreibung": "Living Models, ein Start-up mit Standorten in Paris und Berkeley, entwickelt Basismodelle für die Biologie, die auf DNA-, RNA- und Multi-Omics-Daten trainiert werden. Zum Marktstart hat das Unternehmen 7 Millionen US-Dollar Seed-Kapital eingesammelt und sich Zugang zu einem Rechencluster mit 120 Grafikprozessoren vom Typ NVIDIA B200 gesichert. Vorgestellt wurde BOTANIC, eine Familie von Transformer-Modellen für die Pflanzenbiologie, trainiert auf Genomsequenzen mehrerer Arten; sie sollen genetische Marker für Klimafestigkeit und Krankheitsresistenz erkennen.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 158.94,
      "radius": 0.5807,
      "daten": "11. März 2026",
      "titelOriginal": "Decoding DNA with AI: Living Models emerges from stealth with $7M"
    },
    {
      "id": "1143833",
      "titel": "ZoomAgri: KI-Scanner für Getreide- und Ölsaatenqualität",
      "beschreibung": "Ein Hardware-Scanner mit Computer Vision und KI bestimmt Sorte und Qualität von Getreide und Ölsaaten in einem Durchgang und digitalisiert damit die Prüf- und Zertifizierungsprozesse im Rohstoffhandel. ZoomAgri sammelte im Juli 2023 6 Millionen US-Dollar in einer Series A ein, angeführt vom australischen Agrarkonzern GrainCorp und GrainInnovate; die Gesamtfinanzierung stieg damit auf 11 Millionen US-Dollar. Die Algorithmen stützen sich nach Unternehmensangaben auf eine Datenbank von mehr als 250 Millionen Einzelbildern. Zu den Kunden in 25 Ländern zählen Cargill, ADM, LDC und ABInBev.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 178,
      "radius": 0.3907,
      "daten": "28. Juli 2023",
      "titelOriginal": "ZoomAgri AI-powered grain inspection"
    },
    {
      "id": "1065714",
      "titel": "nunc.: Siebträgermaschine mit Bohnenerkennung",
      "beschreibung": "Eine zweiteilige Siebträgermaschine mit separater Mühle erkennt die eingefüllten Bohnen über Sensoren selbst und übernimmt Wiegen, Mahlen und Brühen; von Hand bleibt das Tampen und Einsetzen des Siebträgers. Entwickelt hat sie das Start-up nunc. gemeinsam mit dem Stuttgarter Design- und Innovationsstudio Phoenix; im Gründungsteam sind ein zweifacher Barista-Champion sowie Ingenieure und IoT-Fachleute. Ein rundes Display zeigt das zu erwartende Geschmacksprofil an, Kuh-, Hafer- und Mandelmilch werden automatisch aufgeschäumt. Der Preis liegt bei 2.499 Euro, die Auflage bei 250 Stück.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 28.33,
      "radius": 0.4457,
      "daten": "29. März 2024",
      "titelOriginal": "Nunc Pairs German Engineering With AI to Brew Coffee Perfectly"
    },
    {
      "id": "1243559",
      "titel": "Florastor: KI-generierte Bildwelt für Probiotika-Werbung",
      "beschreibung": "Eine Werbekampagne für ein probiotisches Nahrungsergänzungsmittel ersetzt die klassische Filmproduktion durch KI-generierte Bildwelten. Für „Innard City“ rund um das Präparat Florastor Dual Action Probiotic entstand eine animierte Welt, die die Wirkung im Darm sichtbar machen soll; reale Schauspieler wurden erst in der Nachbearbeitung eingefügt. Das Kreativteam gibt an, sich dabei an der Produktionsweise von Videospielen orientiert und gegenüber einem Filmdreh Kosten gespart zu haben.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 55.29,
      "radius": 0.6162,
      "daten": "12. März 2025",
      "titelOriginal": "AI-Driven Probiotic Campaigns"
    },
    {
      "id": "1054322",
      "titel": "Tattle AI Coach: Gästefeedback als Aufgabenliste",
      "beschreibung": "Eine Anwendung wertet Gästefeedback aus Restaurantumfragen aus und leitet daraus konkrete Handlungsempfehlungen für einzelne Standorte ab. Die Plattform Tattle trainiert dafür eigene KI-Modelle auf Milliarden von Datenpunkten aus Feedbackbögen; der AI Coach benennt Filialleitung und Personal, woran zuerst zu arbeiten ist. Der Anbieter gibt an, die Empfehlungen seien auf die Standards der jeweiligen Marke zugeschnitten und passten sich neuem Feedback laufend an. Zu den Anwendern zählt die US-Restaurantkette Cotton Patch Cafe.",
      "quellen": [
        {
          "name": "get.tattleapp"
        },
        {
          "name": "restaurantnews"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 73.01,
      "radius": 0.4334,
      "daten": "20. Dezember 2024",
      "titelOriginal": "AI Restaurant Coaches"
    },
    {
      "id": "1144979",
      "titel": "Deep Brew: KI-Plattform von Starbucks",
      "beschreibung": "Deep Brew ist die 2019 gestartete KI-Plattform von Starbucks; sie steuert personalisierte Empfehlungen, Personaleinsatz und Warenwirtschaft der Filialen. Grundlage sind Daten aus der 2011 eingeführten App, über die rund ein Viertel der 100 Millionen wöchentlichen Transaktionen läuft und deren Mitglieder laut Yahoo Finance fast die Hälfte des Umsatzes tragen. Aus der Auswertung entstanden Produkte wie ungesüßte Eistees, nachdem sich zeigte, dass 43 % der Teetrinker zu Hause keinen Zucker nehmen. Deep Brew stützt zudem die Standortwahl und meldet Wartungsbedarf an vernetzten Espressomaschinen.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 72.75,
      "radius": 0.2934,
      "daten": "30. Juni 2021",
      "titelOriginal": "Starbucks AI:Deep Brew"
    },
    {
      "id": "1177049",
      "titel": "Bakteriennachweis per KI und Lichtmikroskopie",
      "beschreibung": "Ein KI-Verfahren erkennt und bestimmt Mikrokolonien unterschiedlicher Bakterien in Lebensmitteln anhand von Aufnahmen aus der Weißlichtmikroskopie und verkürzt so den Nachweis. Die Arbeit „Accelerating the Detection of Bacteria in Food using AI and Optical Imaging“ erschien im Dezember 2022 in der Fachzeitschrift Applied and Environmental Microbiology. Beteiligt waren Nitin Nitin und Mason Earles vom Forschungsinstitut AIFS sowie Luyao Ma, Nicharee Wisuthiphaet und Jiyoon Yi. Die Autoren sehen Anwendungen bei der Erregererkennung in der Lebensmittel-, Umwelt- und Biomedizinbranche.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 134.57,
      "radius": 0.5685,
      "daten": "9. Januar 2023",
      "titelOriginal": "Detection of Bacteria in Food Using AI and Optical Imaging"
    },
    {
      "id": "1140857",
      "titel": "Menucast: KI-Prognose für Geschmacks- und Zutatentrends",
      "beschreibung": "Eine Anwendung des Marktforschers Datassential prognostiziert aus Branchendaten künftige Geschmacks- und Zutatentrends und misst das Verbraucherinteresse an Tausenden von Speisen, Getränken und Aromen. Menucast dient in der Produktentwicklung für den Food Service dazu, Ideen zu sammeln und zu priorisieren. Das Werkzeug startete 2018 unter dem Namen Haiku. Der Anbieter gibt die Treffergenauigkeit der Vorhersagen mit 98 % an.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 152.29,
      "radius": 0.4508,
      "daten": "13. Oktober 2023",
      "titelOriginal": "AI-Powered Foodservice Tools"
    },
    {
      "id": "1065716",
      "titel": "AI-conic: Kaffeemischung aus einem Sprachmodell",
      "beschreibung": "Die Rösterei Kaffa Roastery in Helsinki verkauft mit „AI-conic“ eine Kaffeemischung, deren Zusammensetzung ein großes Sprachmodell vorgeschlagen hat. Entwickelt wurde sie gemeinsam mit der finnischen KI-Beratung Elev Consulting: Kaffa stellte Daten zu seinen meistverkauften Mischungen bereit, die Elev in das Modell einspeiste. Das Modell wertete diese Daten aus und schlug eine Kombination aus Bohnen aus Brasilien, Guatemala, Kolumbien und Äthiopien vor. Nach Angaben der Beteiligten ist es die erste mit Hilfe von KI zusammengestellte Kaffeemischung.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 130.57,
      "radius": 0.2706,
      "daten": "1. Mai 2024",
      "titelOriginal": "Helsinki's Kaffa Roastery unveils AI-conic: the world's first AI-designed coffee blend"
    },
    {
      "id": "1384271",
      "titel": "Orth: KI-Agronomieassistent des Start-ups Aydi",
      "beschreibung": "Orth ist ein KI-gestützter Agronomieassistent, der Satelliten- und Wetterdaten, Prognosemodelle und einen Dialogassistenten zu Empfehlungen auf Schlagebene verbindet. Das 2022 von Hassan Fayed gegründete Unternehmen Aydi sammelte dafür 7,5 Millionen US-Dollar in einer Seed-Runde von COTU Ventures, Daltex und Nuwa Capital ein. Der Anbieter gibt an, Landwirte erzielten damit über 20 % mehr Ertrag und Effizienz, und schätzt, dass 90 % der Erzeuger keinen Zugang zu agronomischer Beratung haben. Orth startete auf der Messe Fruit Attraction in Madrid, kostenlos und kostenpflichtig.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 167.59,
      "radius": 0.5825,
      "daten": "30. September 2025",
      "titelOriginal": "Aydi raises $7.5 million seed to launch its AI agronomy assistant"
    },
    {
      "id": "1141348",
      "titel": "KI in der Landwirtschaft: Anwendungsfelder und Marktwachstum",
      "beschreibung": "Ein Überblick des Wagniskapitalgebers SP Ventures ordnet die Einsatzfelder von KI in der Landwirtschaft: Präzisionslandwirtschaft auf Basis von Boden-, Klima- und Pflanzendaten, Prognose von Krankheiten und Schädlingen, Optimierung von Wasser-, Dünger- und Pestizideinsatz, autonome Roboter und Drohnen sowie Anwendungen in der Agrarfinanzierung, etwa bei der Risikobewertung für Versicherungen. Laut MarketsandMarkets wächst der Markt für KI in der Landwirtschaft von 2023 bis 2028 um 23,1 % pro Jahr; die FAO beziffert den bis 2050 nötigen Mehrbedarf an Nahrungsmitteln auf über 60 %.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 174.79,
      "radius": 0.3946,
      "daten": "26. September 2023",
      "titelOriginal": "AI harvest: Transforming agriculture"
    },
    {
      "id": "1423091",
      "titel": "ChatGPT Health: Ernährungshinweise aus Gesundheitsdaten",
      "beschreibung": "OpenAI hat mit ChatGPT Health eine Funktion gestartet, die medizinische Unterlagen sowie Daten aus Gesundheits- und Fitness-Apps wie Apple Health und MyFitnessPal einbindet. Daraus leitet der Dienst personalisierte Hinweise zu Ernährung und Gesundheit ab. Damit rückt ein breit genutztes Sprachmodell in die Rolle der Ernährungsberatung, mit einer Ausrichtung auf als gesund geltende Lebensmittel.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 43.15,
      "radius": 0.6086,
      "daten": "13. Januar 2026",
      "titelOriginal": "OpenAI launched ChatGPT Health"
    },
    {
      "id": "1054373",
      "titel": "Hellmann's Meal Reveal: Rezepte aus dem Kühlschrankinhalt",
      "beschreibung": "Eine Anwendung des Mayonnaise-Herstellers Hellmann's erfasst per Handykamera, welche Lebensmittel im Kühlschrank liegen, und schlägt dazu passende Rezepte vor. Foto oder Video werden von einer KI ausgewertet und die erkannten Zutaten mit einer Rezeptdatenbank abgeglichen; angebrochene Reste sollen so verwertet statt weggeworfen werden. Meal Reveal gehört zur Kampagne „Make Taste, Not Waste“, die Hellmann's 2021 gegen Lebensmittelverschwendung gestartet hat.",
      "quellen": [
        {
          "name": "hellmanns"
        },
        {
          "name": "greenqueen.hk"
        }
      ],
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 34.19,
      "radius": 0.3946,
      "daten": "9. April 2024",
      "titelOriginal": "AI-Powered Recipe Tools"
    },
    {
      "id": "1241473",
      "titel": "Agentische KI im Handel: Walmarts vier Super-Agenten",
      "beschreibung": "Walmart führt vier sogenannte Super-Agenten ein, also Softwaresysteme, die Aufgaben weitgehend ohne menschliches Zutun entscheiden und ausführen. Sparky richtet sich an Kunden, schlägt Produkte vor und fasst Bewertungen zusammen; er ist bereits verfügbar. „Associate“ unterstützt Beschäftigte bei Anträgen und Verkaufsdaten, „Marty“ Händler, Lieferanten und Werbetreibende bei Aufnahme, Auftragsverwaltung und Kampagnen, „Developer“ dient als Entwicklungsumgebung für weitere KI-Werkzeuge. Anbieter berichten aus dem Food Service von nahezu halbierten Fehlerquoten und kürzeren Wartezeiten.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 70.25,
      "radius": 0.6021,
      "daten": "31. Juli 2025",
      "titelOriginal": "Why Agentic AI Is the Food Industry’s Next Big Thing"
    },
    {
      "id": "1054320",
      "titel": "Pickpad: sensorgestützte Abholstationen für Restaurants",
      "beschreibung": "Pickpad ist ein modulares Abholsystem für Restaurants: Ablageflächen mit Sensoren erfassen, welche Bestellung abgestellt und wieder mitgenommen wird, und werten die Daten mit maschinellem Lernen aus. Das System prüft Bestellungen auf Vollständigkeit, aktualisiert den Status und sammelt Kennzahlen zur Abholung, ohne dass Einrichtung oder vorhandene Kassensysteme geändert werden müssen. Bei den CES Innovation Awards 2025 wurde es in der Kategorie KI ausgezeichnet.",
      "quellen": [
        {
          "name": "ces.tech"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 71.04,
      "radius": 0.4433,
      "daten": "10. Januar 2025",
      "titelOriginal": "AI-Powered Pickup Systems"
    },
    {
      "id": "1144976",
      "titel": "Dom: Sprachassistent für Telefonbestellungen bei Domino's",
      "beschreibung": "Domino's testet einen Sprachassistenten, der telefonische Pizzabestellungen ohne Mitarbeiter aufnimmt. „Dom“ ordnet anhand der Rufnummer die laufende Bestellung zu und gibt wie der Online-Tracker der Kette Auskunft über deren Status; die Software war 2014 zunächst als Sprach-App gestartet. Der Test läuft in 20 US-Filialen, weitere sollen folgen. Nach Unternehmensangaben entfallen 65 % der US-Umsätze auf digitale Kanäle; Vorstandschef J. Patrick Doyle nennt als Ziel einen vollständig digitalen Bestellvorgang.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 61.52,
      "radius": 0.2631,
      "daten": "25. April 2018",
      "titelOriginal": "Domino’s AI assistant handles incoming phone orders"
    },
    {
      "id": "1177043",
      "titel": "FoodAtlas: Wissensgraph zu Lebensmitteln und Chemikalien",
      "beschreibung": "FoodAtlas ist ein Wissensgraph, der aus der Fachliteratur zusammenträgt, welche Chemikalien in welchen Lebensmitteln vorkommen. Ein Team um Jason Youn und Fangzhou Li passte dafür das Sprachmodell BioBERT so an, dass es aus Sätzen wissenschaftlicher Artikel die Beziehung „Lebensmittel enthält Chemikalie“ ableitet; allein PubMed Central enthält rund eine Million Aufsätze zur Lebensmittelzusammensetzung. Ein auf FoodAtlas trainiertes Modell fand bislang unbekannte Zusammenhänge zwischen Lebensmitteln und Chemikalien. Rund 90 % der Chemikalien in Lebensmitteln sind bislang nicht quantifiziert.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 142.05,
      "radius": 0.535,
      "daten": "2. Oktober 2024",
      "titelOriginal": "What’s In Our Food? An AI Approach to Gather What We Know"
    },
    {
      "id": "1065711",
      "titel": "Maschinelles Lernen sagt Biergeschmack voraus",
      "beschreibung": "Maschinelle Lernmodelle sagen voraus, wie Verbraucher Biere geschmacklich bewerten. Ein Team um Kevin Verstrepen von der Katholischen Universität Löwen erfasste über 200 chemische Eigenschaften von 250 belgischen Bieren aus 22 Stilen und verknüpfte sie mit den Profilen eines geschulten Verkostungspanels aus 16 Personen und mehr als 180.000 Verbraucherbewertungen. Mit dem besten von zehn Modellen wurden ein alkoholisches und ein alkoholfreies Handelsbier verändert; beide schnitten in Verkostungen besser ab. Laut der Arbeit in „Nature Communications“ erkennen die Modelle nur Korrelationen.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 138.01,
      "radius": 0.4406,
      "daten": "27. März 2024",
      "titelOriginal": "KI soll Bier leckerer machen"
    },
    {
      "id": "1065717",
      "titel": "AI-conic: KI-Kaffeemischung aus vier Sorten",
      "beschreibung": "Die Mischung „AI-conic“ der Helsinkier Rösterei Kaffa Roastery vereint Bohnen aus Brasilien, Kolumbien, Äthiopien und Guatemala; dominierend ist eine Arabica-Bohne der brasilianischen Familienfarm Fazenda Pinhal. Ungewöhnlich ist die Zahl der Sorten: Üblich sind zwei bis drei, damit sich Geschmacksrichtungen und Herkünfte unterscheiden lassen. Nach Teströstung und Blindverkostung sahen die Fachleute der Rösterei keinen Bedarf an menschlichen Nachbesserungen. Auch Name, Geschmacksbeschreibung und Verpackungsdesign stammen von der KI. Die 250-Gramm-Packung kostet 12,90 Euro.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 140.68,
      "radius": 0.2756,
      "daten": "24. April 2024",
      "titelOriginal": "AI-conic: Eine KI-Kaffeemischung, die Experten überrascht"
    },
    {
      "id": "1384236",
      "titel": "ecoRobotix: 129,3 Millionen Euro für Präzisionsspritzen",
      "beschreibung": "Das Schweizer Unternehmen ecoRobotix hat 129,3 Millionen Euro eingesammelt, um die Produktion seiner KI-gestützten Spritzanhänger hochzufahren. Die Geräte bringen Pflanzenschutzmittel gezielt statt flächendeckend aus. Die in Europa entwickelte Technik wird auch in den USA eingesetzt.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 157.85,
      "radius": 0.5576,
      "daten": "13. Oktober 2025",
      "titelOriginal": "Swiss agtech startup Ecorobotix lands €129.3M"
    },
    {
      "id": "1141347",
      "titel": "CropLife/Purdue-Umfrage 2024: KI im US-Agrarhandel",
      "beschreibung": "Die Precision-Umfrage 2024 von CropLife und der Purdue University unter 108 US-Betriebsmittelhändlern erfasst den Einsatz von Automatisierung, Drohnen und KI im Agrarhandel. Eine KI zur Unkrauterkennung für gezieltes Spritzen bieten 11 % an, ein weiteres Viertel will binnen drei Jahren nachziehen. Knapp die Hälfte erwartet bessere agronomische Empfehlungen, die Mehrheit sieht in KI aber keinen Ersatz für Agronomen. Rentabel sind die Präzisionsangebote kaum: bei Bodenprobenahme und Düngung arbeiten 64 % bzw. 72 % der Händler kostendeckend, mit Bilddaten und Drohnen machen viele Verluste.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 171.12,
      "radius": 0.3905,
      "daten": "6. August 2024",
      "titelOriginal": "AI: move agronomic recommendations forward"
    },
    {
      "id": "1268402",
      "titel": "Thermomix TM7 mit Touchdisplay und digitalem Zwilling",
      "beschreibung": "Küchenmaschine mit 10-Zoll-Touchdisplay, das die Rezeptplattform Cookidoo einbindet und schrittweise durch die Zubereitung führt. Ein „digitaler Zwilling\" bildet Vorgänge wie das Wiegen von Zutaten in Echtzeit auf dem Bildschirm ab. Der Anbieter gibt an, der Motor arbeite leiser, der isolierte Mixtopf bleibe außen kühl und ein neuer Verschluss erlaube das Kochen bei offenem Deckel. Nutzerprofile und Rezepte lassen sich über Cookidoo anpassen. Rund 30 % des verbauten Materials sind nach Herstellerangaben recycelt; KI-Assistenz und Sprachsteuerung sind als spätere Funktionen angekündigt.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 47.95,
      "radius": 0.5569,
      "daten": "4. Juni 2025",
      "titelOriginal": "AI-Enabled Kitchen Appliances"
    },
    {
      "id": "1054370",
      "titel": "Samsung Food — KI-Rezeptdienst in 104 Ländern",
      "beschreibung": "Rezept- und Ernährungsplattform von Samsung Electronics, die in 104 Ländern und acht Sprachen startet und über 160.000 Rezepte bereitstellt. Die Anwendung empfiehlt Gerichte, erstellt Essenspläne und Einkaufslisten und schickt Garparameter an vernetzte Geräte wie den Bespoke-Backofen und die Family-Hub-Kühlschränke. Grundlage ist die Datenbank des 2019 von Samsung Next übernommenen Dienstes Whisk; gespeicherte Rezepte lassen sich per KI in vegane oder vegetarische Varianten umwandeln. Angekündigt sind die Kopplung mit Samsung Health und eine Bilderkennung für Lebensmittel ab 2024.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 35.36,
      "radius": 0.3772,
      "daten": "30. August 2023",
      "titelOriginal": "Samsung Announces Global Launch of AI-Powered, Personalized Food and Recipe Service"
    },
    {
      "id": "1204198",
      "titel": "Al Dente — KI-Kochsystem für Pasta und Risotto",
      "beschreibung": "Kochsystem des Automatisierungsanbieters Next Robot, das Pasta und Risotto ohne manuelle Überwachung zubereitet. Nach Angaben des Herstellers erfasst eine eigene KI Textur, Feuchtigkeit und Garfortschritt in Echtzeit und hält die Qualität auch bei hohem Bestellaufkommen gleich. Das System ist an ChefSight angebunden, die KI-Plattform des Unternehmens, und passt Garparameter während des Vorgangs an. Als Zielgruppe nennt der Anbieter Fast-Casual-Restaurants, Ghost Kitchens und die Gemeinschaftsverpflegung, die mit Personalmangel und Einarbeitungskosten zu tun haben.",
      "quellen": [
        {
          "name": "linkedin"
        },
        {
          "name": "prnewswire"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 67.84,
      "radius": 0.5855,
      "daten": "28. Mai 2025",
      "titelOriginal": "AI-Powered Cooking Systems"
    },
    {
      "id": "1054319",
      "titel": "Store Intelligence von SymphonyAI bei Carrefour Italien",
      "beschreibung": "Carrefour Italien setzt die Anwendung Store Intelligence von SymphonyAI ein, die per Computer Vision Personaleinsatz, Preisauszeichnung und Warenverfügbarkeit in der Filiale steuert. In einem Pilotbetrieb arbeiteten Beschäftigte mit Handgeräten, die falsch einsortierte Artikel, abweichende Preise und niedrige Bestände unmittelbar anzeigen und zur Behebung führen. SymphonyAI bezeichnet Carrefour Italien als ersten Anwender dieser Technik im italienischen Einzelhandel.",
      "quellen": [
        {
          "name": "carrefour.it"
        },
        {
          "name": "retailtechinnovationhub"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 58.36,
      "radius": 0.4362,
      "daten": "13. Januar 2025",
      "titelOriginal": "AI-Powered Retail Solutions"
    },
    {
      "id": "1142543",
      "titel": "Restaurantempfehlungen in Google Maps per Gemini",
      "beschreibung": "Google Maps empfiehlt Restaurants mit Hilfe des KI-Modells Gemini und belegt die Vorschläge mit Bewertungen. Die Funktion fasst passende Rezensionen zusammen, ruft thematische Sammlungen auf und beantwortet Fragen zu den Inhalten des Bewertungsbereichs; die üblichen Suchergebnisse bleiben darunter erreichbar. Maps-Leiterin Miriam Daniel verweist auf täglich 100 Millionen Aktualisierungen der Kartendaten, auf die die Antworten gestützt werden, damit nur tatsächlich existierende Orte erscheinen.",
      "quellen": [
        {
          "name": "googlemaps"
        },
        {
          "name": "theverge"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 73.95,
      "radius": 0.175,
      "daten": "1. November 2024",
      "titelOriginal": "AI-Powered Restaurant Recommendations"
    },
    {
      "id": "1177040",
      "titel": "Offene Referenzdatensätze für Lebensmittelsicherheit",
      "beschreibung": "Öffentliches Datenarchiv für Modelle des maschinellen Lernens in der Lebensmittelsicherheit, veröffentlicht als Cornell Food Safety ML Repository. Drei zuvor publizierte, neu bereinigte und annotierte Datensätze bilden den Bestand: Listeria spp. in Bodenproben aus den USA mit Boden-, Geo-, Klima- und Landnutzungsdaten; Salmonella und Campylobacter in Hähnchenschlachtkörpern aus Verarbeitungsbetrieben; sowie fäkale Verunreinigung und E.-coli-Konzentration in Wassereinzugsgebieten des Bundesstaats New York. Beigefügt sind anpassbare Skripte und LazyPredict-Skripte zum Training verschiedener Modelltypen.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 136.43,
      "radius": 0.5863,
      "daten": "26. Februar 2025",
      "titelOriginal": "Initializing a Public Repository for Hosting Benchmark Datasets to Facilitate Machine Learning Model Development in Food Safety"
    },
    {
      "id": "1054394",
      "titel": "Bioprocess Foresight — Simulation für Bioprozesse",
      "beschreibung": "Simulationssoftware des Londoner Unternehmens New Wave Biotech, mit der Hersteller alternativer Proteine Bioprozesse virtuell durchrechnen, bevor sie skalieren. Bioprocess Foresight liefert techno-ökonomische Analysen sowie Angaben zu Ausbeute und Umweltwirkung ab 83 Pfund (105 US-Dollar) im Monat; klassische Analysen dieser Art kosten nach Angaben des Unternehmens 20.000 bis 40.000 US-Dollar und dauern Monate. Die Boston Consulting Group beziffert den Anteil synthetisch-biologischer Verfahren, die an der Skalierung scheitern, auf über 90 %. Ein Zuschuss von 20.000 Euro kam aus dem EIT Food Accelerator Network.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 152.29,
      "radius": 0.3683,
      "daten": "21. November 2024",
      "titelOriginal": "AI Software to Help Alt-Protein Industry Scale Up"
    },
    {
      "id": "1065715",
      "titel": "AI-conic — von KI entwickelte Kaffeemischung aus Helsinki",
      "beschreibung": "Kaffeemischung, deren Zusammensetzung von einer KI entwickelt wurde: Die Helsinkier Rösterei Kaffa Roastery hat sie unter dem Namen „AI-conic\" auf den Markt gebracht. Der Versuch soll zeigen, ob Technik in einem Handwerk, das sich über manuelle Arbeit definiert, Arbeit abnehmen kann. Finnland zählt 5,6 Millionen Einwohner und liegt nach Zahlen der International Coffee Organization mit 12 Kilogramm pro Kopf und Jahr weltweit an der Spitze des Kaffeekonsums.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 135.34,
      "radius": 0.2856,
      "daten": "21. April 2024",
      "titelOriginal": "Finland gets AI-blended coffee"
    },
    {
      "id": "1384207",
      "titel": "Ceres AI — 13 Mio. US-Dollar für Bildanalyse von Ackerflächen",
      "beschreibung": "Das in San Francisco ansässige Unternehmen Ceres AI hat 13 Millionen US-Dollar unter Führung von Remus Capital eingesammelt. Die Plattform wertet hochauflösende Aufnahmen aus und bewertet Ertrag und Risiko landwirtschaftlicher Flächen für Agrarkonzerne, Kreditgeber und Versicherer; nach eigenen Angaben wurden bislang über 17 Milliarden Messwerte auf Pflanzenebene über 32 Millionen Acre erfasst. Geplant ist die Ausweitung auf mehr als 40 Kulturarten. Mit dem Abschluss zieht Remus-Partner John Tincoff in den Verwaltungsrat ein, dazu ein KI-Agent namens Arista — laut Unternehmen das erste KI-Mitglied eines Verwaltungsrats.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 167.09,
      "radius": 0.621,
      "daten": "6. November 2025",
      "titelOriginal": "Ceres AI, a US startup, raised $13M to grow its imagery platform that analyses crop performance and risk for agribusinesses and financial institutions"
    },
    {
      "id": "1140852",
      "titel": "Farmblox — solarbetriebene Sensorplattform für Höfe",
      "beschreibung": "Überwachungsplattform für landwirtschaftliche Betriebe, die vorhandene Sensoren Dritter an einen solarbetriebenen, vernetzten Monitor anbindet. Erfasst werden unter anderem Bodenfeuchte und Wasserverluste; die Daten sind aus der Ferne abrufbar, sodass Kontrollgänge entfallen. Gründer Nathan Rosenberg beschreibt das Ziel als Verbindung von Echtzeitdaten mit Automatisierungsabläufen, die als Bündel auf dem Betrieb eingerichtet werden können.",
      "quellen": [
        {
          "name": "farmblox.ag"
        },
        {
          "name": "techcrunch"
        }
      ],
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 178,
      "radius": 0.4407,
      "daten": "24. Juli 2024",
      "titelOriginal": "AI-Powered Farming Platforms"
    },
    {
      "id": "1054345",
      "titel": "Samsung Food Plus — Vorratsliste per Kameraerkennung",
      "beschreibung": "Kostenpflichtige Stufe der Anwendung Samsung Food, die Zutaten per Smartphone-Kamera erfasst und in eine Vorratsliste einträgt. Die Bilderkennung Vision AI unterscheidet nach Herstellerangaben über 40.000 Zutaten, weil sie in der Cloud rechnet; die Kameras im Family-Hub-Kühlschrank erkennen lokal nur 33. Aus der Liste entstehen Essenspläne, gekochte Zutaten werden abgezogen, Eingekauftes wird ergänzt, Produkte nahe dem Verbrauchsdatum werden bevorzugt eingeplant. Die Stufe kostet 6,99 US-Dollar im Monat oder 59,99 US-Dollar im Jahr; die kostenlose Version plant drei Tage statt einer Woche.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 34.1,
      "radius": 0.4387,
      "daten": "31. August 2024",
      "titelOriginal": "AI food recognition: Samsung Food could be the ultimate meal-planning app"
    },
    {
      "id": "1176462",
      "titel": "Rückbau der Küchenrobotik bei Kernel in New York",
      "beschreibung": "Das vegane Restaurant Kernel in New York, das Chipotle-Gründer Steve Ells mit einem großen Roboterarm in der Küche eröffnet hatte, ist nach rund einem Jahr geschlossen worden; an seine Stelle tritt das Konzept Counter Service mit Sandwiches und Roastbeef. COO Tom Cortese nennt als Gründe den Aufwand für Installation und Wartung, zusätzliche Sicherheitsregeln, nötige Schulungen und die Bausubstanz New Yorker Immobilien — auf Böden aus dem Jahr 1910 verschiebe sich ein empfindlich justierter Roboter mit der Zeit. Ells räumte ein, das ursprüngliche Konzept sei zu kühl geraten.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 56.77,
      "radius": 0.6317,
      "daten": "19. März 2025",
      "titelOriginal": "Less Robots, More Meat: Chipotle Founder’s Big Pivot"
    },
    {
      "id": "1054163",
      "titel": "Preferabli — Weinempfehlungen im Onlinehandel von Albertsons",
      "beschreibung": "Die US-Handelskette Albertsons bindet die Empfehlungsplattform Preferabli in ihren Weinversand Vine & Cellar Reserve ein, der ausschließlich Kunden in Kalifornien offensteht. Die Anwendung wertet nach Angaben des Anbieters mehrere Hundert Merkmale je Wein aus und leitet daraus Empfehlungen, Produktangaben und Vorschläge zur Speisenbegleitung ab; die Geschmacksvorlieben geben die Nutzer selbst ein. Preferabli deckt daneben Spirituosen, Bier, trinkfertige Getränke sowie Lebensmittel wie Käse ab.",
      "quellen": [
        {
          "name": "prnewswire"
        },
        {
          "name": "grocerydive"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 60.55,
      "radius": 0.3827,
      "daten": "8. Januar 2025",
      "titelOriginal": "AI-Driven Direct-To-Consumer Platforms"
    },
    {
      "id": "1064511",
      "titel": "Wendy's FreshAI — Sprachbestellung am Drive-thru",
      "beschreibung": "Wendy's setzt am Drive-thru einen Sprachassistenten ein, der Bestellungen entgegennimmt; die Technik stammt von Google Cloud und beruht auf generativer KI und großen Sprachmodellen. Der Pilotbetrieb beginnt in Columbus, Ohio. Die Modelle wurden auf Speisekarte, Geschäftsregeln und einen Gesprächsleitfaden trainiert und sollen unterschiedliche Bestellformulierungen sowie häufige Rückfragen bewältigen. Rund 80 % der Wendy's-Kunden nutzen den Drive-thru. Konzernchef Todd Penegor erwartet ein Gespräch, das von dem mit einem Mitarbeiter kaum zu unterscheiden sei.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 53.9,
      "radius": 0.2147,
      "daten": "10. Mai 2023",
      "titelOriginal": "AI Drive-thru: McDonald’s failed; Could Wendy’s FreshAI chatbots do better?"
    },
    {
      "id": "1146028",
      "titel": "Sensorbasierte Prüfung von Milch und Eiern",
      "beschreibung": "Zwei Unternehmen werten Sensordaten mit tiefergehender Analytik aus, um Frische und Sauberkeit empfindlicher Lebensmittel zu prüfen: FaunaTech aus Indien bei Milch, ORBEM aus Deutschland bei Eiern. FaunaTech wird von mehreren lokalen Wagniskapitalgebern finanziert; ORBEM schloss Ende 2022 eine Seed-Runde über 5,2 Millionen Euro ab.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 140.27,
      "radius": 0.5582,
      "daten": "12. Dezember 2022",
      "titelOriginal": "AI-powered imaging for object scanning and classification"
    },
    {
      "id": "1054390",
      "titel": "Coca-Cola Y3000 Zero Sugar — mit KI entwickelte Sorte",
      "beschreibung": "Limitierte Coca-Cola-Sorte, deren Geschmack und Gestaltung nach Unternehmensangaben gemeinsam von Menschen und KI entwickelt wurden. Grundlage waren weltweit gesammelte Vorstellungen von Konsumenten über die Zukunft — Emotionen, Farben, Aromen — verbunden mit KI-Auswertungen. Die zuckerfreie Variante erscheint befristet in ausgewählten Märkten, darunter die USA, Kanada, China, Europa und Afrika; in den USA und Kanada zusätzlich als Version mit Zucker. Ein QR-Code auf der Verpackung führt zu einer Kamerafunktion, die Fotos in eine Zukunftsansicht umrechnet. Dazu erscheint eine Kleidungskollektion mit dem Modelabel AMBUSH.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 149.67,
      "radius": 0.4427,
      "daten": "12. September 2023",
      "titelOriginal": "Coca‑Cola Imagines Year 3000 With AI-Powered Experience"
    },
    {
      "id": "1062470",
      "titel": "Digitalisierungsstrategie von Mondelez International",
      "beschreibung": "Unternehmensprofil zu den Technologieaktivitäten von Mondelez International, veröffentlicht im Januar 2024. Der Konzern hat ein globales Team für Beschaffungsdatenanalyse aufgebaut, das den Einkauf mit dem Visualisierungswerkzeug Tableau digitalisiert. In Indien setzt Mondelez Augmented und Virtual Reality ein, damit Projektteams beim Aufbau großer Produktionslinien länderübergreifend mit Fachleuten zusammenarbeiten und Engpässe in der Lieferkette umgehen. Der Vertrieb nutzt eine KI-gestützte Plattform, die Händlern Produkte anhand historischer Verkaufszahlen und der Vorlieben im jeweiligen Umfeld vorschlägt.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 130.57,
      "radius": 0.247,
      "daten": "10. Januar 2024",
      "titelOriginal": "Mondelez International Digital Transformation Strategy Report 2023: Accelerators, Incubators, and Other Innovation Programs"
    },
    {
      "id": "1234039",
      "titel": "Bloomiee — Steuerung für Innenraum-Anbau",
      "beschreibung": "Steuerungssystem für den Pflanzenanbau in Innenräumen, das Temperatur, Luftfeuchte, CO2-Gehalt, Beleuchtung und Bewässerung überwacht und regelt. Zum Aufbau gehören fünf Komponenten: eine Kamera, ein Controller, ein Umweltsensor für Licht, CO2, Temperatur und Luftfeuchte, ein Bodensensor sowie eine schaltbare Steckdosenleiste; dazu kommen die zugehörige Software mit App und Cloud-Dienst. Der Anbieter gibt an, das System eigne sich für Schrank, Anbauzelt oder Zimmerecke, sei nach mehrjähriger Erprobung entstanden und lasse sich aus der Ferne bedienen.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 159.65,
      "radius": 0.614,
      "daten": "3. April 2025",
      "titelOriginal": "Bloomiee | AI Grow Room Control System w/ Camera & Sensors"
    },
    {
      "id": "1140815",
      "titel": "FieldData — Dateneingabe für Weidebetriebe über WhatsApp",
      "beschreibung": "Erfassungssystem für Rinderbetriebe: Beschäftigte senden Sprach- oder Textnachrichten über WhatsApp — etwa den Wechsel von 20 Kühen zwischen zwei Feldern —, eine KI erzeugt daraus strukturierte Daten für eine Weboberfläche. Das Unternehmen mit Sitz in Argentinien schloss im Juni 2024 eine nicht bezifferte Pre-Seed-Runde ab und nennt über 400 angemeldete Betriebe, darunter eine Ranch mit 100.000 Hektar. Der Preis richtet sich nach der Herdengröße: 29,99 US-Dollar im Monat bis 500 Tiere, 110 US-Dollar über 5.000 Tiere. Kunden gibt es in den USA, Mexiko, Argentinien, Paraguay und Uruguay.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 167.39,
      "radius": 0.3926,
      "daten": "27. Januar 2025",
      "titelOriginal": "AI-powered data entry for ranch management"
    },
    {
      "id": "1232989",
      "titel": "SPICERR — App-gesteuerter Gewürzspender",
      "beschreibung": "Gewürzspender für die Küche, der Mengen aus Kapseln dosiert und über einen Touchscreen am Gerät oder eine Smartphone-App bedient wird. Nach Angaben des Anbieters portioniert das Gerät bei jeder Anwendung gleichbleibend und ersetzt das Abschätzen aus losen Vorräten. Zum Lieferumfang gehören zwölf Kapseln mit Grundgewürzen wie Salz, Pfeffer und Paprika; weitere Einheiten lassen sich koppeln.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 42.45,
      "radius": 0.5841,
      "daten": "21. März 2025",
      "titelOriginal": "AI-Powered Spice Dispensers"
    },
    {
      "id": "1054325",
      "titel": "KI-gestütztes Esstagebuch Eat n' Log",
      "beschreibung": "Eat n' Log ist eine App, in der Mahlzeiten nicht nur fotografisch, sondern auch mit Beschreibungen zu Geschmack und Textur festgehalten werden. Dabei hilft der KI-Assistent Roni, der die Angaben zu den einzelnen Gerichten ergänzt. Die Einträge lassen sich nach Kriterien wie Geschmacksprofil und Anlass ordnen, später wieder aufrufen und mit anderen teilen. Der Anbieter positioniert die Anwendung als digitales Esstagebuch für Restaurantbesucher und Reisende.",
      "quellen": [
        {
          "name": "eatnlog"
        }
      ],
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 46.57,
      "radius": 0.464,
      "daten": "3. Dezember 2024",
      "titelOriginal": "AI-Powered Food Journals"
    },
    {
      "id": "1176227",
      "titel": "Boogie Lab: KI-gesteuerte Sauerteigfermentation",
      "beschreibung": "Das kroatische Food-Tech-Unternehmen Boogie Lab steuert die Fermentation von Sauerteigbrot mit einer eigenen KI-Technologie, die Gärbedingungen regelt und die Qualität konstant halten soll. Gegründet wurde es von Karlo Vulin und Mladen Vidović. Für den Schritt nach Nordamerika entstand Boogie Lab USA unter Dennis Turcinovic, Miteigentümer des New Yorker Restaurants Delmonico's. Die Boogie Bakery in der Beaver Street sollte im Frühjahr 2024 öffnen und Sauerteigbrote, Gebäck und Sandwiches anbieten; für denselben Zeitraum war ein Großhandelsvertrieb in den USA angekündigt.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 55.2,
      "radius": 0.5407,
      "daten": "23. März 2024",
      "titelOriginal": "Boogie Lab: Croatian AI-Powered Sourdough Bakery Expands to New York City"
    },
    {
      "id": "1054092",
      "titel": "Sprach-KI und kontaktloses Bezahlen am Drive-in",
      "beschreibung": "Valyant AI und Paerpay verbinden in einer Partnerschaft eine sprachgesteuerte KI für die Bestellannahme mit einem kontaktlosen Bezahlsystem, das unter anderem Apple Pay und Google Pay einschließt. Bestellung und Zahlung am Drive-in laufen damit automatisiert, das Personal soll sich auf Betreuung und Auftragsgenauigkeit konzentrieren. Valyant AI arbeitet zudem mit CKE Restaurants an einer dialogfähigen KI für die Bestellannahme, Wendy's prüft generative KI von Google Cloud für den Drive-in. HubKonnect wertet für Dunkin Donuts Standortdaten aus, um das Angebot je Filiale anzupassen.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 53.43,
      "radius": 0.465,
      "daten": "18. Oktober 2023",
      "titelOriginal": "AI Voice-Based QSR Services"
    },
    {
      "id": "1064509",
      "titel": "Rückzug von der automatisierten Bestellannahme bei McDonald's",
      "beschreibung": "McDonald's stellt das 2021 mit IBM begonnene Experiment zur automatisierten Bestellannahme ein: Die Sprachbots liefen in mehr als 100 US-Restaurants und sollten bis zum 26. Juli 2024 überall entfernt sein. Die Trefferquote hatte das Unternehmen zuvor mit rund 85 % angegeben; auf TikTok verbreitete Videos zeigten Fehlbestellungen, darunter neun ungewollte Zusatzartikel und einen Auftrag über mehr als 250 Dollar. IBM erklärte, die Technik bleibe leistungsfähig, und testet sie mit Wendy's, Hardee's und Dunkin. McDonald's hält an Sprachbestellung fest und setzt generative KI von Google ein.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 75.14,
      "radius": 0.197,
      "daten": "18. Juni 2024",
      "titelOriginal": "McDonald’s Abandons AI for Drive-Thru Orders"
    },
    {
      "id": "1146014",
      "titel": "Kaseinkartoffeln aus molekularer Landwirtschaft",
      "beschreibung": "Das israelische Unternehmen Finally Foods verändert Kartoffeln so, dass sie Kasein bilden — die Pflanze wird damit zum Bioreaktor für Milchprotein. Rund zehn Monate nach Gründung beginnt der erste Feldversuch, der drei bis vier Monate dauert und zeigen soll, wie sich die Pflanzen außerhalb des Gewächshauses verhalten. Geprüft werden Ertrag und Proteinausbeute unter Freilandbedingungen.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 142.66,
      "radius": 0.6087,
      "daten": "12. Februar 2025",
      "titelOriginal": "AI Startup is Growing Dairy Proteins in Potatoes"
    },
    {
      "id": "1054389",
      "titel": "HELL A.I. — Energydrink mit KI-entwickelter Rezeptur",
      "beschreibung": "HELL ENERGY hat einen Energydrink auf den Markt gebracht, dessen Rezeptur nach Angaben des Unternehmens von KI-Systemen erstellt wurde. Ausgewertet wurden Zutaten, Verkaufszahlen, Studien und Verbraucherrückmeldungen; die Rezeptur enthält Vitamine, Aminosäuren und Kräuter und folgt den EFSA-Referenzmengen. Aus drei Varianten wurde der Geschmack Tutti-frutti & Berry-blast ausgewählt, auch die Dosengestaltung stammt aus dem Verfahren. Der Anbieter gibt an, die Entwicklungszeit von ein bis zwei Jahren auf etwa einen Monat zu verkürzen; das Produkt ist seit Sommer 2023 in über 60 Ländern erhältlich.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 142.3,
      "radius": 0.4292,
      "daten": "3. Juli 2023",
      "titelOriginal": "Hell Energy drink"
    },
    {
      "id": "1062469",
      "titel": "Oreo-Geschmacksentwicklung mit KI bei Mondelez",
      "beschreibung": "Mondelez International setzt KI ein, um neue Geschmacksrichtungen für Gebäckmarken wie Oreo zu entwickeln. Kevin Wallenstein, Bereichsleiter für digitale Forschung und Entwicklung im Keksgeschäft, nannte gegenüber dem Wall Street Journal vor allem das Tempo als Zweck: Die Iterationen bis zu dem vom Verbraucher gewünschten Geschmacksprofil liefen damit effizienter ab.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 145.52,
      "radius": 0.175,
      "daten": "3. Januar 2025",
      "titelOriginal": "Mondelez uses AI to create new Orea snack flavors"
    },
    {
      "id": "1215876",
      "titel": "OlsAro: KI-gestützte Züchtung salztoleranten Weizens",
      "beschreibung": "Das schwedische Agrartechnik-Unternehmen OlsAro züchtet mit KI und Pflanzenbiotechnologie Weizensorten, die Umweltstress standhalten; erster Schwerpunkt ist Salztoleranz, an Hitzetoleranz und effizienterer Stickstoffnutzung wird gearbeitet. Nach Angaben des Unternehmens lassen sich damit bislang unbrauchbare Flächen wieder bewirtschaften. Die Sorten gelangen über Partnerschaften mit Saatgutunternehmen zu den Landwirten. OlsAro ist eine Ausgründung der Universitäten Lund und Göteborg aus der Forschung von Henrik Aronsson und Olof Olsson; Investoren sind GU Ventures, Vasa Angels, Öste Ventures und Kaponjären.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 163.34,
      "radius": 0.5527,
      "daten": "10. April 2025",
      "titelOriginal": "Wheat supply through AI-enabled crop breeding"
    },
    {
      "id": "1140813",
      "titel": "KI in der regenerativen Landwirtschaft",
      "beschreibung": "KI-gestützte Sensorik, Drohnen und Bewässerungssteuerung finden Eingang in regenerative Anbausysteme. Sensoren erfassen Feuchte, pH-Wert und Nährstoffe in Echtzeit, Drohnen erkennen Krankheits- und Schädlingsbefall früh; in Trockenregionen wie Kaliforniens Central Valley und Südeuropa senkten algorithmisch gesteuerte Bewässerungssysteme den Wasserverbrauch um bis zu 30 % ohne Ertragseinbußen. In der Tierhaltung überwachen tragbare Geräte Vitalwerte und Verhalten und stützen die Weiderotation. Market.us beziffert den Markt für regenerative Landwirtschaft 2022 auf 8,7 Milliarden Dollar und erwartet bis 2032 rund 31,6 Milliarden.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 164.73,
      "radius": 0.3683,
      "daten": "27. Januar 2025",
      "titelOriginal": "AI partner to the regenerative agriculture"
    },
    {
      "id": "1181562",
      "titel": "DiFluid Omix — KI-Messgerät für Kaffeebohnen",
      "beschreibung": "Der DiFluid Omix misst Kenngrößen von Kaffee wie Feuchtegehalt, Dichte, Siebgröße und Wasseraktivität. Nach Angaben des chinesischen Herstellers DiFluid erkennt das Gerät über Algorithmen verschiedene Probenarten — Rohkaffee, getrocknete Frucht, Pergamentkaffee, Röstkaffee und gemahlenen Kaffee — und stellt die Messung darauf ein. Die Dichte wird dabei automatisch als tatsächliche Dichte berechnet. Die Messwerte laufen in eine begleitende App, in der sie verglichen und weitergegeben werden können.",
      "quellen": [
        {
          "name": "digitizefluid"
        },
        {
          "name": "sprudge"
        }
      ],
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 35.35,
      "radius": 0.5917,
      "daten": "21. Juni 2024",
      "titelOriginal": "AI Coffee Roast Analyzers"
    },
    {
      "id": "1054324",
      "titel": "Samsung AI Hybrid Cooling — Kühltechnik für Kühlschränke",
      "beschreibung": "Samsung zeigt auf der CES 2025 ein Kühlsystem für Haushaltskühlschränke, das einen Hochleistungsverdichter mit einem Peltier-Modul kombiniert und die Kühlleistung an Nutzungsspitzen anpasst. Ziel sind ein geringerer Energiebedarf und eine längere Haltbarkeit der eingelagerten Lebensmittel. Nach Angaben des Herstellers bleiben Schweinefleisch bis zum 1,4-Fachen und Lachs bis zum 1,2-Fachen länger frisch, was die Lebensmittelverschwendung im Haushalt verringern soll.",
      "quellen": [
        {
          "name": "news.samsung"
        },
        {
          "name": "geeky-gadgets"
        }
      ],
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 44.41,
      "radius": 0.4257,
      "daten": "21. Dezember 2024",
      "titelOriginal": "AI-Powered Appliance Cooling Technologies"
    },
    {
      "id": "1200763",
      "titel": "Stimmbiomarker zur Erkennung von Depressionen",
      "beschreibung": "Stimmbiomarker sollen die Diagnose und Verlaufskontrolle psychischer Erkrankungen objektivierbar machen. In Deutschland sind jährlich 27,8 % der Erwachsenen von einer psychischen Erkrankung betroffen; in der Mental Health Surveillance des Robert Koch-Instituts von 2023 berichteten 20 % der Befragten depressive Symptome, fast doppelt so viele wie 2019. Bisher stützen sich Diagnose und Verlaufsbeurteilung auf standardisierte Fragebögen. Rund 100 Studien zeigen, dass sich Depressionen per KI anhand der Stimme erkennen lassen; für den Praxiseinsatz fehlen den Modellen große, vielfältige Daten aus realen Situationen.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 53.59,
      "radius": 0.7983,
      "daten": "23. Mai 2025",
      "titelOriginal": "Voice profiling in psychosomatics"
    },
    {
      "id": "1174757",
      "titel": "Chef Robotics — KI-Roboter für die Portionierung von Speisen",
      "beschreibung": "Chef Robotics baut Roboterarme, die in der Lebensmittelproduktion portionieren, belegen und befüllen; gesteuert werden sie von KI-Modellen, die auf Millionen realer Beispiele trainiert sind. Das 2019 gegründete Unternehmen aus San Francisco nahm in einer Series-A-Runde 43,1 Millionen Dollar auf, angeführt von Avataar; einschließlich Gerätefinanzierung liegt das eingesammelte Kapital bei über 65 Millionen Dollar. Trainingsdaten liefern Kunden wie Amy's Kitchen und Fresh Prep, bislang wurden über 40 Millionen Mahlzeiten zusammengestellt. Die Systeme laufen in den USA und Kanada, Großbritannien soll folgen.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 72.64,
      "radius": 0.5624,
      "daten": "1. April 2025",
      "titelOriginal": "Food Assembly Robot Startup Chef Robotics"
    },
    {
      "id": "1054068",
      "titel": "Winnow Vision: Kamerabasierte Abfallerfassung bei Marriott",
      "beschreibung": "Marriott Hotels erfasst Küchenabfälle mit dem System Winnow Vision, das aus Kamera, vernetzter Waage und maschinellem Lernen besteht und die weggeworfenen Lebensmittel nach Art erkennt. Aus den Daten leitet die Kette ab, welche Posten regelmäßig im Abfall landen, und passt Einkauf, Zubereitung, Menüplanung und Portionsgrößen an. Der Einsatz gehört zum Nachhaltigkeitsprogramm des Konzerns, der die Lebensmittelverschwendung bis 2025 um 50 % senken will; neben der Abfallmenge sinken damit auch die Kosten.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 58.63,
      "radius": 0.465,
      "daten": "3. Oktober 2024",
      "titelOriginal": "AI Monitoring Helps Marriott Hotels to Slash Food Waste"
    },
    {
      "id": "1054395",
      "titel": "ChefOS — flexibler Küchenroboter für die Lebensmittelproduktion",
      "beschreibung": "Chef Robotics hat einen KI-gesteuerten Roboter für die Lebensmittelproduktion vorgestellt, der überwiegend auf Standardhardware aufsetzt und über die eigene Software ChefOS gesteuert wird. Er soll den Arbeitskräftemangel abfedern und die Produktionsmengen erhöhen, indem er einzelne Arbeitsschritte übernimmt, ohne vollständige Autonomie zu verlangen. Aus dem Betrieb an Kundenstandorten in sechs nordamerikanischen Städten fließen reale Daten in das Training von ChefOS zurück. Nach Angaben des Unternehmens wurden damit bereits über 20 Millionen Portionen hergestellt.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 67.7,
      "radius": 0.1954,
      "daten": "12. Juli 2024",
      "titelOriginal": "AI-Powered Food Robot"
    },
    {
      "id": "1692310",
      "titel": "Marble Technologies: automatisierte Verpackung im Schlachtbetrieb",
      "beschreibung": "Marble Technologies aus Lincoln, Nebraska, automatisiert mit Robotik und Bildverarbeitung den Pack-off, die letzte Stufe der Fleischverarbeitung, in der vakuumierte Teilstücke sortiert und versandfertig verpackt werden. Eine Linie kostet rund eine Million Dollar und verbindet Kameras mit lokalen Servern und eigenen KI-Modellen, trainiert auf über 30 Millionen selbst aufgenommenen Bildern. Die Anlagen laufen in Omaha, in Zentralkalifornien und in Kansas und sortieren nach Unternehmensangaben täglich 3 % der US-Rindfleischproduktion. 2025 arbeitete das Unternehmen profitabel und nahm 30 Millionen Dollar in einer Series-A-Runde auf.",
      "sektor": "Verpackung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 106.38,
      "radius": 0.4004,
      "daten": "3. Juni 2026",
      "titelOriginal": "With $30 million Series A raise, Marble Technologies is creating the future of meatpacking in Nebraska"
    },
    {
      "id": "1140793",
      "titel": "Bioprocess Foresight — Simulation von Bioprozessen",
      "beschreibung": "Die Plattform Bioprocess Foresight von New Wave Biotech simuliert Prozesse der Biofertigung und schätzt Ausbeuten, Kosten und Umweltwirkungen ab, bevor physische Versuche laufen. Das britische Unternehmen hat dafür 1,2 Millionen Euro aus Eigenkapital und Fördermitteln eingesammelt, beteiligt sind Innovate UK und EIT Food; zuvor investierte Big Idea Ventures. Adressiert wird ein Skalierungsproblem: Laut BCG erreichen 90 % der synthesebiologischen Technologien keine Serienreife, vor allem wegen Entwicklungszyklen von drei bis zehn Jahren und Kosten von 10.000 bis 100.000 Dollar je Versuch.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 134.24,
      "radius": 0.5982,
      "daten": "20. Dezember 2024",
      "titelOriginal": "AI Bioprocess Simulation Platform"
    },
    {
      "id": "1054388",
      "titel": "Von Stiehl Artificial Intelligence — Wein nach Chatbot-Auswertung",
      "beschreibung": "Die Weinkellerei Von Stiehl brachte im Sommer 2023 eine rote und eine weiße Cuvée unter der geschützten Marke Artificial Intelligence auf den Markt. Verkoster gaben ihre Bewertungen über die Website ab; die bis zum 20. März 2024 gesammelten Rückmeldungen wurden ChatGPT und Gemini vorgelegt und zu Empfehlungen für die Rezeptur verdichtet — geringere Restsüße, mehr Körper, veränderte Rebsortenanteile. Die Kellerei nutzte diese Auswertungen für die Version 2.0, die im Juni 2024 erschien; Rückmeldungen dazu werden über QR-Codes auf den Rückenetiketten erneut gesammelt.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 133.58,
      "radius": 0.4142,
      "daten": "1. Mai 2024",
      "titelOriginal": "Von Stihel Wines"
    },
    {
      "id": "1062468",
      "titel": "Y3000 Zero Sugar — Coca-Cola mit KI-gestützter Rezeptur",
      "beschreibung": "Coca-Cola hat mit Y3000 Zero Sugar eine limitierte Sorte veröffentlicht, deren Geschmacksprofil und Verpackung unter Einsatz generativer KI entstanden. Grundlage waren weltweit eingesammelte Rückmeldungen dazu, wie ein Getränk der Zukunft schmecken solle; daraus erzeugte die KI Aromaprofile sowie Logo und Schriftzug. Ein QR-Code auf der Dose führt zum Coca-Cola Creations Hub mit Bildfiltern. Das Getränk kam in den USA, China, Europa, Kanada und Afrika befristet in den Handel; für generative KI ist bei Coca-Cola Pratik Thakar zuständig.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 149.6,
      "radius": 0.2098,
      "daten": "27. Januar 2025",
      "titelOriginal": "Coca-Cola’s AI-Created Y3000 Zero Sugar Drink: A Taste of the Future"
    },
    {
      "id": "1215874",
      "titel": "Trait Foundry — KI-Plattform für komplexe Pflanzenmerkmale",
      "beschreibung": "Trait Foundry ist eine Technologieplattform, die komplexe Merkmale in Nutzpflanzen einbringen soll. Sie verbindet ein KI-Modell, das auf pflanzlichen Omics-Daten trainiert ist, mit multiplexer Genom-Editierung, präziser Züchtung und automatisierter Phänotypisierung. Der Anbieter nennt als Ziel widerstandsfähige Sorten, die auf Klimaveränderungen und Ernährungssicherheit antworten.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 165.71,
      "radius": 0.6001,
      "daten": "29. Juni 2025",
      "titelOriginal": "Engineer Complex Traits in Crops"
    },
    {
      "id": "1140808",
      "titel": "Bonsai Robotics — Autonomie für Erntemaschinen in Nussplantagen",
      "beschreibung": "Bonsai Robotics rüstet Erntemaschinen mit einem Bildverarbeitungssystem aus, das ohne GPS, Mobilfunk und Lidar auskommt und auch in Staub und Dunkelheit navigiert: Maschinelles Lernen erkennt Merkmale in den Kamerabildern und rekonstruiert daraus die räumliche Umgebung. Die Technik lässt sich an vorhandene Maschinen anbauen; über 40 Einheiten laufen in Nussplantagen in den USA und Australien. Mitgründer Tyler Niday nennt neben dem Arbeitsaufwand von bis zu 300 Personen je Plantage auch den Maschinenbedarf, der um 30 bis 50 % sinke. Das 2022 gegründete Unternehmen nahm 15 Millionen Dollar in einer Series-A-Runde unter Führung von Bison Ventures auf.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 156.39,
      "radius": 0.3929,
      "daten": "3. Februar 2025",
      "titelOriginal": "AI Harvest Robotics"
    },
    {
      "id": "1664502",
      "titel": "Mill: Küchengerät misst die Lebensmittelabfälle des Haushalts",
      "beschreibung": "Das Start-up Mill baut ein Küchengerät, das Lebensmittelreste im Haushalt aufbereitet und dabei erfasst, was weggeworfen wird. Sensoren und KI ordnen die Abfälle im Behälter Kategorien zu und verfolgen den Verlauf; eine App zeigt dem Haushalt seine eigenen Zahlen statt allgemeiner Statistiken. Nach drei bis vier Monaten Nutzung sank die eingeworfene Menge nach Angaben von Mitgründer Harry Tannenbaum um 20 %, bei gleichbleibender Gerätenutzung. In einer Nachbefragung gaben rund 60 % der Antwortenden an, seither anders zu kochen, 50 % anders einzukaufen.",
      "sektor": "Abfallströme",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 23.56,
      "radius": 0.3992,
      "daten": "28. Mai 2026",
      "titelOriginal": "Mill: Measurement as a Catalyst for Household Behavior Change"
    },
    {
      "id": "1181559",
      "titel": "AEG-Küchengeräte mit KI-Kochassistent AI TasteAssist",
      "beschreibung": "AEG zeigte auf der IFA 2024 in Berlin eine Küchengerätereihe aus Backöfen, Kochfeldern, Dunstabzügen, Kühlgeräten und Geschirrspülern, in die erstmals eine KI-gestützte Kochfunktion eingebaut ist. AI TasteAssist überträgt Rezepte an den Backofen und wählt Garzeit und Temperatur anhand der Art des verwendeten Proteins; ein Touch-Display führt Schritt für Schritt durch die Zubereitung. Als Anlass nennt der Hersteller eine Erhebung der Electrolux-Gruppe, nach der 80 % der Verbraucher Rezepte online suchen und viele unsicher im Umgang mit ihrem Backofen sind.",
      "quellen": [
        {
          "name": "aeg-appliances"
        },
        {
          "name": "electroluxgroup"
        }
      ],
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 47.2,
      "radius": 0.6052,
      "daten": "3. September 2024",
      "titelOriginal": "AI-Assisted Kitchen Ranges"
    },
    {
      "id": "1054323",
      "titel": "Hisense-Kühlschrank mit KI-Rezeptassistent Dish Designer",
      "beschreibung": "Hisense kündigte für die CES 2025 zwei vernetzte Kühlgeräte an, den Jumbo Side-by-Side und den FreshVault French Door. Das Side-by-Side-Modell hat ein eigenes Fach für Pizza, einen Bildschirm auf Basis der Plattform ConnectLife und eine antibakterielle Innenauskleidung. Über ConnectLife läuft der Rezeptassistent Dish Designer, den Hisense gemeinsam mit Microsoft auf Azure AI Studio entwickelt hat, sowie ein Essensplaner, der die Vorschläge an die Ernährungsweisen im Haushalt anpasst. Der Anbieter bezeichnet das Gerät als volumeneffizientesten vernetzten Kühlschrank am Markt.",
      "quellen": [
        {
          "name": "hisenseme"
        },
        {
          "name": "benzinga"
        }
      ],
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 47.01,
      "radius": 0.4419,
      "daten": "19. Dezember 2024",
      "titelOriginal": "AI Recipe Assistant Fridges"
    },
    {
      "id": "1562938",
      "titel": "Starbucks-Bestellhilfe in ChatGPT",
      "beschreibung": "Starbucks hat eine Beta-Anbindung an ChatGPT gestartet: Wer im Chat @starbucks nennt, öffnet eine App der Kette innerhalb der Oberfläche. Nutzer beschreiben Stimmung oder Gelüste oder laden ein Bild hoch und erhalten daraufhin mehrere Getränkevorschläge aus der Karte, darunter selten bestellte Positionen; die Auswahl lässt sich im Chat anpassen und anschließend in der Starbucks-App kaufen. Der Start war für den 15. April angesetzt. Die Kette ordnet den Schritt ihrem Sanierungsprogramm „Back to Starbucks“ zu. Ähnliche ChatGPT-Anbindungen betreiben Etsy und Walmart.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 42.12,
      "radius": 0.2523,
      "daten": "21. April 2026",
      "titelOriginal": "Starbucks’s ChatGPT experiment could quietly reshape how people order coffee"
    },
    {
      "id": "1156971",
      "titel": "Cibotica: Roboter-Fertigungslinie Remy für Bowls",
      "beschreibung": "Das kanadische Start-up Cibotica betreibt seinen ersten Küchenroboter im digitalen Food Hall „Food Republic“ in Vancouver. Die vollautomatische Fertigungslinie Remy stellt nach Unternehmensangaben bis zu 300 Salate pro Stunde zusammen; den Kern bildet eine eigene Dosiertechnik, die Zutaten unterschiedlicher Beschaffenheit und Temperatur mit einem System ausgibt und so Platz spart. Als weitere Einsatzfelder nennt Mitgründer Ashkan Mirnabavi Frischeverarbeitung und abgepackte Fertiggerichte. Die Anlage wird zum Kauf oder als monatlich bezahlte Robotics-as-a-Service angeboten.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 75.14,
      "radius": 0.5768,
      "daten": "7. Dezember 2023",
      "titelOriginal": "Bowl Food Robot: Dispensing Technology and Small Footprint as Differentiators"
    },
    {
      "id": "1054065",
      "titel": "NextGen Food Robotics: Bestell-App Lily für Ghost Kitchens",
      "beschreibung": "NextGen Food Robotics entwickelt eine KI-gestützte Bestell-App für seine Ghost Kitchens und die Lohnfertigung. Über die App mit dem Arbeitsnamen Lily bestellte Gerichte werden in den eigenen Küchen zubereitet; langfristig ist die Auslieferung per Drohne vorgesehen. Aus den Bestellungen leitet das Unternehmen nach eigenen Angaben Markttrends ab und verkauft diese aggregiert an Lebensmittelhersteller, während Kundendaten geschützt bleiben sollen. Der Anbieter gibt an, die App solle später Mahlzeiten selbst vorschlagen, auf Wunsch automatisch ausliefern und den wöchentlichen Einkauf übernehmen.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 69.81,
      "radius": 0.465,
      "daten": "25. April 2023",
      "titelOriginal": "AI App: NextGen Food Robotics"
    },
    {
      "id": "1054095",
      "titel": "GuacAImole: Rezeptgenerator von Avocados From Mexico",
      "beschreibung": "Avocados From Mexico hat mit der Digitalagentur 270B einen Rezeptgenerator für Guacamole veröffentlicht. Der GuacAImole-Generator arbeitet mit GPT-4, GPT-4 Vision und DALL-E: Nutzer fotografieren vorhandene Zutaten oder ein fertiges Gericht, laden das Bild hoch und erhalten daraus abgeleitete Rezeptvorschläge. Der Start lag kurz vor dem Super Bowl LVIII, zu dem Guacamole in den USA zu den verbreitetsten Beilagen zählt. Vorstandschef Alvaro Luque ordnet die Aktion dem Ziel zu, die Marke über aktuelle kulturelle Themen bekannter zu machen.",
      "quellen": [
        {
          "name": "avocadosfrommexico"
        },
        {
          "name": "marketingdive"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 54.62,
      "radius": 0.2957,
      "daten": "6. Februar 2024",
      "titelOriginal": "AI-Generated Avocado Recipes"
    },
    {
      "id": "1446766",
      "titel": "one.five: KI-Plattform für die Verpackungsentwicklung",
      "beschreibung": "Das Hamburger Unternehmen one.five hat 14 Millionen Euro in einer Series A aufgenommen, angeführt von der Dr. Hans Riegel Holding, Gesellschafterin von HARIBO. Die 2020 gegründete Firma übersetzt technische Leistung, Regulatorik, Kostenziele und Verbraucherakzeptanz in Anforderungsprofile für neue Verpackungen. Kernprodukt ist der „Product Market Fit Compass“, mit dem Papier- und Beschichtungshersteller ihr Sortiment gegen die Anforderungen von Markenherstellern abgleichen. Rund 60 % der Entwicklungsausgaben der Branche entfallen nach Angaben der Firma auf Produkte ohne Markterfolg.",
      "sektor": "Verpackung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 118.77,
      "radius": 0.387,
      "daten": "19. Januar 2026",
      "titelOriginal": "Hamburg-based one.five raises €14 million to solve the product-market-fit problem in packaging"
    },
    {
      "id": "1054375",
      "titel": "TasteGPT: Trendabfragen für die Produktentwicklung",
      "beschreibung": "TasteGPT ist ein dialogbasierter Zugang zur Datenbasis des Marktbeobachters Tastewise und beantwortet Fragen zur Produktentwicklung bei Lebensmitteln und Getränken. Auf die Frage nach Desserts mit Zuspruch bei Millennials nennt das System Mangonada mit 0,09 % Anteil an den ausgewerteten Nennungen und 80,1 % Zuwachs im Jahresvergleich, Basque Cheesecake mit 0,2 % und 48,4 % sowie Affogato mit 0,22 % und 35,9 %. Ausgewiesen werden ebenso Zubereitungsarten und Auslobungen, etwa „Local Produce“ mit 1,61 % Anteil und 12,72 % Zuwachs.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 134.87,
      "radius": 0.5374,
      "daten": "26. Oktober 2023",
      "titelOriginal": "TasteGPT: AI Product Development"
    },
    {
      "id": "1054329",
      "titel": "KI als Frühwarnung für die Lebensmittelsicherheit",
      "beschreibung": "Eine Arbeit der University of British Columbia und der University of Guelph schlägt vor, Rückrufe mit vorhersagenden Modellen zu vermeiden statt mit Prüfungen am Ende der Linie. Mängel fallen heute oft erst nach dem Verkauf auf; ein Rückruf wegen mikrobieller Kontamination kostet nach Angaben des Mitautors Rickey Yada im Mittel zehn Millionen US-Dollar. Zusätzlich soll Sprachverarbeitung Antworten aus wöchentlichen Mitarbeiterbefragungen zu einer messbaren Größe für die Sicherheitskultur verdichten. Die Studie erschien 2022 in Trends in Food Science & Technology.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 152.29,
      "radius": 0.4186,
      "daten": "10. August 2022",
      "titelOriginal": "How AI can make food safer"
    },
    {
      "id": "1062467",
      "titel": "Coca-Cola Y3000: mit KI entwickelte Sorte",
      "beschreibung": "Coca-Cola brachte 2023 mit Y3000 eine befristete Sorte der Reihe Creations heraus, deren Geschmacksprofil und Verpackung mit Unterstützung von KI entstanden. Das Unternehmen erhob zunächst, wie sich Menschen ein Getränk aus der Zukunft vorstellen, und ließ daraus zusätzliche Geschmacksnoten sowie ein Stimmungsbild für die Dosengestaltung ableiten; die Dose zeigt pixelige blaue und rosa Blasen und den Aufdruck „Co-Created with AI“. Y3000 erschien mit und ohne Zucker. Ein QR-Code auf der Dose führt zu Fotofiltern, die Aufnahmen digital verfremden.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 135.86,
      "radius": 0.175,
      "daten": "12. September 2023",
      "titelOriginal": "AI to Conjure Up a 'Coke From the Future'"
    },
    {
      "id": "1215872",
      "titel": "BlueRedGold: Safran aus automatisierter Indoor-Anlage",
      "beschreibung": "Das schwedische Start-up BlueRedGold hat 2,73 Millionen Euro eingesammelt, angeführt von PINC, dem Wagniskapitalarm des Lebensmittelkonzerns Paulig. Die Anlage bildet die Wachstumsbedingungen für Safran in geschlossenen Räumen nach, erlaubt mehrere Erntezyklen pro Jahr und automatisiert mit Robotik und KI das Pflücken der Blüten und das Trennen der Narben. Mit dem Geld entsteht eine modulare Erstanlage, die als Vorlage für weitere Standorte dienen soll. Nach Unternehmensangaben liegen Anfragen über mehrere Tonnen aus der Lebensmittel-, Nahrungsergänzungs- und Kosmetikbranche vor.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 165.15,
      "radius": 0.5752,
      "daten": "29. Juni 2025",
      "titelOriginal": "AI-based precise automation to transform saffron production"
    },
    {
      "id": "1140126",
      "titel": "Aisprid: Roboter für die Tomatenpflege im Gewächshaus",
      "beschreibung": "Das 2020 in Saint-Malo gegründete Unternehmen Aisprid baut autonome Roboter für Gewächshäuser; das patentierte Hauptgerät entblättert Tomatenpflanzen. Bis 2024 waren 30 Maschinen bei den fünf größten französischen Tomatenkooperativen im Einsatz, die zusammen 70 % des nationalen Gewächshausmarktes ausmachen. Die Roboter arbeiten auch nachts und wechseln selbstständig zwischen den Reihen. In einer Series-A-Runde nahm Aisprid zehn Millionen Euro auf, angeführt von Innovacom mit Bpifrance, Demeter, GO Capital und Breizh Up; das Geld fließt in Entwicklung, Fertigung und den Schritt ins Ausland.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 163.68,
      "radius": 0.3989,
      "daten": "21. Januar 2025",
      "titelOriginal": "AI Greenhouse: Aisprid to transform greenhouse agriculture"
    },
    {
      "id": "1178530",
      "titel": "ClearCOGS: Bedarfsprognose gegen Überproduktion im Restaurant",
      "beschreibung": "Das US-Unternehmen ClearCOGS hat 3,8 Millionen US-Dollar in einer Seed-Runde erhalten, angeführt von Closed Loop Partners mit Myriad Venture Partners und Level Up Ventures. Die Software prognostiziert mit maschinellem Lernen und Zeitreihenverfahren aus täglich über 100 Millionen Datenpunkten, wie viel vorbereitet, bestellt und besetzt werden muss, und zielt damit auf weniger Lebensmittelverschwendung. Bedient werden 100 Marken in vier Ländern. Ein Chat-Zugang wurde verworfen, weil Betreiber die Antworten lieber per E-Mail und über Toast oder SevenRooms zugestellt bekommen.",
      "sektor": "Abfallströme",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 12.15,
      "radius": 0.3917,
      "daten": "14. April 2025",
      "titelOriginal": "ClearCOGS's AI-Powered Forecasting Software Helps Restaurants Reduce Waste"
    },
    {
      "id": "1181558",
      "titel": "Yum-Yum Kids: Tellerscanner in Kitas in Seoul",
      "beschreibung": "Der Bezirk Jongno in Seoul stattet Kindertagesstätten gemeinsam mit dem Unternehmen Nuvilab mit KI-gestützten Essensscannern aus. Unter dem Namen Yum-Yum Kids erfassen die Geräte jeden Teller vor und nach der Mahlzeit und ermitteln daraus Kalorien, Eiweiß, Fett und Kohlenhydrate je Kind; Bildschirmfiguren begleiten den Vorgang für die Kinder, Eltern erhalten Tagesberichte über das Essverhalten. Der Bezirk begründet den Ausbau der Betreuungsangebote mit sinkenden Geburtenzahlen und nennt als Ziel gesündere Essgewohnheiten und weniger Übergewicht.",
      "quellen": [
        {
          "name": "media.newswire"
        }
      ],
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 49.43,
      "radius": 0.5738,
      "daten": "29. Februar 2024",
      "titelOriginal": "AI Food Scanners"
    },
    {
      "id": "1054318",
      "titel": "Bottle Raiders: App zur Bewertung von Spirituosen",
      "beschreibung": "Die von Dan Abrams gegründete Bewertungsplattform Bottle Raiders hat 2025 eine erste eigene App veröffentlicht. Sie erfasst mit der Kamera Etikett oder Strichcode einer Flasche und erkennt daraus über Texterkennung und Mustervergleich Hersteller und Produkt; anschließend zeigt sie die hinterlegten Bewertungen aus der Datenbank der Plattform an. Als Einsatzort nennt der Anbieter die Kaufentscheidung im Spirituosengeschäft. Bottle Raiders bezeichnet sich selbst als größte Bewertungsseite für Spirituosen.",
      "quellen": [
        {
          "name": "bottleraiders"
        },
        {
          "name": "bevnet"
        }
      ],
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 37.02,
      "radius": 0.4379,
      "daten": "16. Januar 2025",
      "titelOriginal": "AI-Powered Beverage-Rating Apps"
    },
    {
      "id": "1222169",
      "titel": "Pepsi The Sweetest: KI bewertet die Süße von Einsendungen",
      "beschreibung": "PepsiCo bewirbt in Großbritannien die Sorten Pepsi Zero Sugar Strawberries 'N' Cream und Cream Soda mit einer kanalübergreifenden Kampagne, deren Mittelpunkt ein KI-Werkzeug ist. Verbraucher reichen Personen, Tiere oder Gegenstände ein, das System bewertet deren Süße und gibt das Ergebnis zurück. Der Zweck ist, die Marke enger mit dem Begriff Süße zu verknüpfen. Verantwortlich ist Steven Hind, Marketingchef Getränke bei PepsiCo für Großbritannien und Irland.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 44.92,
      "radius": 0.2374,
      "daten": "1. April 2025",
      "titelOriginal": "AI-Integrated Soda Campaigns"
    },
    {
      "id": "1178698",
      "titel": "Dynamische Preise in der Gastronomie",
      "beschreibung": "In Restaurants werden Preise mit KI-Unterstützung laufend angepasst, abhängig von Lagerbeständen, Tageszeit und Nachfrage. Als Zweck werden geringere Lebensmittelverschwendung und bessere Margen genannt.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 70.08,
      "radius": 0.7897,
      "daten": "21. April 2025",
      "titelOriginal": "Dynamic Pricing by AI in Restaurants"
    },
    {
      "id": "1156967",
      "titel": "Chef Robotics: zehn Millionen zusammengesetzte Portionen",
      "beschreibung": "Chef Robotics hat nach eigenen Angaben zehn Millionen Portionen zusammengesetzt, keine zwei Jahre nach dem ersten Robotereinsatz im Juni 2022. Für die erste Million brauchte die Firma fast ein Jahr, zuletzt etwa zweieinhalb Wochen je Million. Die Anlagen stehen in zentralen Verarbeitungsbetrieben und füllen Joghurtbecher, Proteinplatten sowie Flugzeug- und Krankenhausmahlzeiten. Statt fester Dosiertechnik nutzt das Unternehmen Computer Vision, Bahnplanung und einen Roboterarm mit wechselnden Werkzeugen; die Software lernt aus den Einsätzen in fünf Städten in den USA und Kanada.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 75.14,
      "radius": 0.5377,
      "daten": "13. Februar 2024",
      "titelOriginal": "AI-Powered Robots Trained With Lots of Field Data"
    },
    {
      "id": "1054066",
      "titel": "CookRight: Garzeitüberwachung am Grill von Miso Robotics",
      "beschreibung": "Miso Robotics, Hersteller des Frittier-Roboters Flippy, bietet mit CookRight eine Software an, die ohne eigene Robotik in bestehenden Küchen läuft. Sensoren, maschinelles Lernen und Computer Vision verfolgen einzelne Stücke auf dem Grill und messen deren Garzeit automatisch, statt sie über Wanduhr oder Erfahrung des Personals abzuschätzen. Die US-Seuchenbehörde CDC beziffert die jährlichen Erkrankungen durch Lebensmittel auf 48 Millionen Fälle, 128.000 Krankenhausaufenthalte und 3.000 Todesfälle. Chipotle zahlte 25 Millionen US-Dollar im Zusammenhang mit Erkrankungen zwischen 2015 und 2018.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 61.74,
      "radius": 0.465,
      "daten": "4. Mai 2021",
      "titelOriginal": "Robot AI: Undercooked fast food burgers are toast"
    },
    {
      "id": "1054094",
      "titel": "Guacline: KI-Avatar von Rob Gronkowski für Avocado-Rezepte",
      "beschreibung": "Avocados From Mexico betreibt zum Super Bowl 2025 mit der Guacline eine Plattform mit generativer KI, auf der eine digitale Fassung des früheren NFL-Spielers Rob Gronkowski Rezepte ausgibt. Nutzer erfahren die Geschichte hinter dessen Guacamole-Variante „Buffalo Gronkamole“ und erhalten Vorschläge für Nachos oder Guacamole mit Speck; wer will, springt direkt zu den Rezepten. Der Vermarkter gibt an, am Wochenende des Endspiels rund 95 % des Avocadoabsatzes in den USA zu verantworten.",
      "quellen": [
        {
          "name": "avocadosfrommexico"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 57.14,
      "radius": 0.2813,
      "daten": "15. Januar 2025",
      "titelOriginal": "GenAI Avocado Campaigns"
    },
    {
      "id": "1182796",
      "titel": "Hennessy X.O mit algorithmisch erzeugtem Dekanter-Dekor",
      "beschreibung": "Für eine limitierte Auflage des Cognacs Hennessy X.O erzeugen Algorithmen zufällige Kompositionen, die ein Roboterarm auf die Karaffen aufträgt. Entwickelt hat die Serie der französische generative Künstler Florian Zumbrunn mit der Kreativagentur OK C’EST COOL. In der Boutique der Marke in Cognac wählen Gäste über ein Tablet Farbpaletten und beeinflussen so das Ergebnis mit. Ein Dekanter kostet 1.200 Euro, ein vom Künstler signierter Druck liegt bei. Die Arbeit ist eine von mehreren Künstlerkooperationen zur X.O-Abfüllung im Jahr 2024.",
      "quellen": [
        {
          "name": "bottleraiders"
        }
      ],
      "sektor": "Verpackung",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 115.78,
      "radius": 0.3769,
      "daten": "19. Dezember 2024",
      "titelOriginal": "Generative Art Cognac Bottles"
    },
    {
      "id": "1054374",
      "titel": "FoodGPT: Dialogsystem für die Produktentwicklung",
      "beschreibung": "Ai Palette bietet mit FoodGPT eine dialogbasierte KI-Anwendung für Hersteller von Konsumgütern, die Fragen zu Marktlage, Produktauslobungen und aufkommenden Zutaten beantwortet. Der Anbieter gibt an, das Modell auf 61 Milliarden Verbraucherdatenpunkte aus 24 Ländern und 18 Sprachen trainiert und auf den Lebensmittel- und Getränkebereich zugeschnitten zu haben. Adressiert werden Verbraucherforschung, Innovation, Marketing und Entwicklung. Typische Abfragen betreffen etwa neue Geschmacksrichtungen bei Snacks in den USA samt Rückfrage, ob Abverkaufsdaten das stützen.",
      "quellen": [
        {
          "name": "aipalette"
        },
        {
          "name": "theglobeandmail"
        }
      ],
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 137.33,
      "radius": 0.5591,
      "daten": "7. September 2023",
      "titelOriginal": "FoodGPT: AI Food Product Development"
    },
    {
      "id": "1054064",
      "titel": "Rome Call: Selbstverpflichtung zur Ethik von KI",
      "beschreibung": "Der „Rome Call for Artificial Intelligence Ethics“ verpflichtet seine Unterzeichner auf einen transparenten, inklusiven und verantwortlichen Einsatz von KI. Vorgelegt wurde das Dokument am 28. Februar 2020 von der Päpstlichen Akademie für das Leben, der Ernährungs- und Landwirtschaftsorganisation der Vereinten Nationen (FAO), Microsoft und IBM, unterstützt von der italienischen Regierung. FAO-Generaldirektor QU Dongyu verweist darauf, dass bis 2050 zehn Milliarden Menschen zu ernähren seien und KI dabei eine Schlüsselrolle für den Umbau der Agrar- und Ernährungssysteme spiele.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 150.36,
      "radius": 0.465,
      "daten": "13. März 2021",
      "titelOriginal": "The Ethics of AI to ensure food security and development"
    },
    {
      "id": "1062464",
      "titel": "Coca-Cola 3000 Zero Sugar: Geschmack mit KI entwickelt",
      "beschreibung": "Auf der Marken-Plattform Coca-Cola Creations erscheint mit 3000 Zero Sugar eine zeitlich begrenzte Sorte, deren Geschmacksprofil aus Verbraucherangaben und einer KI-Auswertung entstand. Gesammelt wurden weltweit Vorstellungen davon, wie sich Zukunft in Emotionen, Wünschen, Farben und Aromen ausdrückt. Auch die Gestaltung der Verpackung mit hellen Farbtönen und einer fließend wirkenden Flüssigkeit entstand mit KI. Ein Scan der Dose führt zu einem Creations Hub mit einer KI-Linse. Vertrieben wird die Sorte über ausgewählte Händler in Großbritannien.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 152.29,
      "radius": 0.1934,
      "daten": "22. September 2023",
      "titelOriginal": "Coca-Cola launches new flavour partially created by AI"
    },
    {
      "id": "1178532",
      "titel": "CrabScan360: biometrische Erfassung in der Krabbenfischerei",
      "beschreibung": "SeafoodAI erfasst mit dem Scanner CrabScan360 Krabben biometrisch und automatisiert Vermessung, Sortierung und Datenerfassung. Das Silicon-Valley-Studio NEC X gab am 9. April 2025 eine strategische Beteiligung bekannt; zugleich schloss SeafoodAI dessen Programm Elev X! Ignite ab. Das Unternehmen beziffert die jährlichen Verluste der Fischwirtschaft durch manuelle Abläufe auf über 50 Milliarden US-Dollar und den globalen Krabbensektor auf 11,5 Milliarden US-Dollar. Händler wie Whole Foods, Walmart und Costco wollen bis 2027 nur noch zertifiziert nachhaltige Meeresfrüchte verkaufen.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 166.92,
      "radius": 0.5566,
      "daten": "9. April 2025",
      "titelOriginal": "SeafoodAI Secures Investment from NEC X, Accelerating AI-Powered Biometrics to Enhance Seafood Sustainability"
    },
    {
      "id": "1054339",
      "titel": "Edge-KI: Algorithmen auf Landmaschinen und Feldsensoren",
      "beschreibung": "Bei Edge-KI laufen Algorithmen auf lokalen Geräten statt in einem zentralen Rechenzentrum. Eine in Nature Sustainability veröffentlichte Studie eines internationalen Teams aus den USA, Großbritannien, Australien, Deutschland und Afrika beschreibt, wie Sensoren und KI in Landmaschinen Wasser, Dünger und Agrarchemikalien einsparen. Anwendungsfelder sind Schädlingsbekämpfung, Nährstoffmanagement und Pflanzenzüchtung, etwa eine Kamera mit Computer Vision, die Pflanzentypen für Kreuzungen einordnet. Als Hürden nennen die Autoren Datenqualität, energieeffiziente Hardware und die digitale Kluft.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 174.63,
      "radius": 0.4201,
      "daten": "25. Januar 2025",
      "titelOriginal": "AI: Agriculture"
    },
    {
      "id": "1054344",
      "titel": "Automatic Waste Monitor: Bilderkennung am Küchenabfall",
      "beschreibung": "Der Automatic Waste Monitor erfasst in Profiküchen, welche Lebensmittel weggeworfen werden. Am Abfallbehälter sitzen Kameramodul, Waage, Näherungssensor und Bedienoberfläche; eine KI erkennt die Zutaten auf den Bildern, der Nutzer ergänzt, ob es sich um unverarbeitete Ware, Ausgabereste oder Zubereitungsabfall handelt. Nach sechs bis acht Wochen liefert das System Auswertungen nach Woche, Tag und Zutat. Entwickelt haben es das niederländische Unternehmen Orbisk und das Designbüro Studio Mango; Prototypen an rund 40 Standorten senkten die Lebensmittelverschwendung im Mittel um 50 %.",
      "sektor": "Abfallströme",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 10.56,
      "radius": 0.4428,
      "daten": "25. Januar 2025",
      "titelOriginal": "AI monitor slashes food waste"
    },
    {
      "id": "1181557",
      "titel": "BOTINKIT P MAX: Rührbratroboter für Profiküchen",
      "beschreibung": "In gewerblichen Küchen übernimmt der BOTINKIT P MAX das Rührbraten: Ein Algorithmus bildet den Ablauf eines Gerichts ab und passt die Führung während des Garens an. Das Gerät überwacht dabei den Zustand der Speisen an der Oberfläche und im Inneren und überträgt die Daten während des Kochens. Der Anbieter beschreibt es als erste Verbindung aus visuellem Modul, großen Datenmengen und einem neuartigen Rührarm. Gebaut ist es kompakt und für die Reinigung ausgelegt.",
      "quellen": [
        {
          "name": "prnewswire"
        }
      ],
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 46.03,
      "radius": 0.5899,
      "daten": "16. März 2023",
      "titelOriginal": "Stir-Frying Kitchen Robots"
    },
    {
      "id": "1054164",
      "titel": "SmartPlate: KI-Ernährungsplanung für Beratungsberufe",
      "beschreibung": "Ernährungsberater, Diätologen und Naturheilkundler erhalten mit SmartPlate eine Anwendung, die Speisepläne für einzelne Klienten erzeugt. Eingegeben werden Nährstoffziele, Unverträglichkeiten und gesundheitliche Vorgaben; daraus erstellt das System passende Vorschläge für Mahlzeiten. Der Anbieter gibt an, dass die Automatisierung den zeitaufwendigen Teil der Planung übernimmt und so mehr Zeit für die Arbeit mit Klienten bleibt.",
      "quellen": [
        {
          "name": "smartplate"
        }
      ],
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 42.49,
      "radius": 0.3683,
      "daten": "4. November 2024",
      "titelOriginal": "AI Meal Planning Solutions"
    },
    {
      "id": "1219653",
      "titel": "Vinst: Rezept-App mit KI-Auslese und Nährwertanpassung",
      "beschreibung": "Die kostenlose App Vinst liest Rezepte aus sozialen Netzwerken, Webseiten und dem privaten Umfeld ein und verschlagwortet sie automatisch. Eine KI passt die Nährwerte an, indem sie Ernährungsbedarf, vorhandene Zutaten, Portionsgrößen und Saison berücksichtigt; hinzu kommen automatisch gesetzte Timer und ein Chat für Rückfragen während des Kochens. Gesammelte Rezepte lassen sich als gedrucktes Kochbuch bestellen. Der Anbieter bezeichnet die Anwendung als erste ihrer Art.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 34.46,
      "radius": 0.2225,
      "daten": "30. Juni 2025",
      "titelOriginal": "AI-Powered Cooking Companions"
    },
    {
      "id": "1177901",
      "titel": "Air up: Geschmack über den Geruchssinn statt über Zusätze",
      "beschreibung": "Die Trinkflasche Air up erzeugt Geschmackseindrücke über Duft statt über Zusätze im Wasser. Ein Duftpod gibt beim Trinken Aromabläschen in den Strohhalm ab; der Geruch gelangt vom Mund zur Nase, sodass reines Wasser nach Cola oder Saft schmeckt. Übertragen auf feste Lebensmittel entsteht daraus die Idee, einen nährstoffreichen Riegel über Duft oder andere, von einer KI erzeugte Signale nach einem frei gewählten Gericht schmecken zu lassen.",
      "quellen": [
        {
          "name": "shop.air-up.com",
          "url": "https://shop.air-up.com/de/de"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 66.79,
      "radius": 0.7425,
      "daten": "16. April 2025",
      "titelOriginal": "\"Air up\": generate flavour based on sense of smell"
    },
    {
      "id": "1156962",
      "titel": "Figure 01: humanoider Roboter mit Sprachmodell in der Küche",
      "beschreibung": "Figure hat den humanoiden Roboter Figure 01 in einer Vorführung Lebensmittel erkennen und Küchenaufgaben abarbeiten lassen, darunter das Reichen eines Apfels samt gesprochener Begründung. Nach Angaben des Unternehmens liefern große Sprachmodelle von OpenAI die visuelle und sprachliche Verarbeitung, neuronale Netze steuern die Geschicklichkeit der Hände. Die Sprachausgabe enthält menschenähnliche Pausen und Fülllaute. Figure hat 754 Millionen US-Dollar eingesammelt; andere Finanzierungen der Küchenrobotik gingen an aufgabenspezifische Systeme von Picnic Robot und Chef Robotics.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 71.73,
      "radius": 0.535,
      "daten": "16. März 2024",
      "titelOriginal": "Figure 01 Robot Feed A Human"
    },
    {
      "id": "1054062",
      "titel": "KI in Schnellrestaurants als Antwort auf Personalmangel",
      "beschreibung": "Schnellrestaurants setzen KI ein, um Stellen zu kompensieren, die seit der Covid-19-Pandemie im Einzelhandel und in der Gastronomie unbesetzt bleiben. Bestellterminals nehmen Aufträge auf und wickeln Zahlungen ab, sprechen Empfehlungen aus und verkürzen Wartezeiten zu Stoßzeiten; Roboter schneiden Gemüse, überwachen Bestände in Echtzeit und prognostizieren die Nachfrage, außerdem werden Lieferwege optimiert. Als Einwände gelten Arbeitsplatzverluste, die Speicherung von Kunden- und Zahlungsdaten, Fehler bei Zubereitung und Lagerung sowie der fehlende persönliche Kontakt.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 66.12,
      "radius": 0.465,
      "daten": "22. Mai 2023",
      "titelOriginal": "The Labor Shortage Argument Behind The Rise Of AI Fast Food 'Workers'"
    },
    {
      "id": "1054087",
      "titel": "Valyant AI: Sprachdialog am Drive-in-Schalter",
      "beschreibung": "Valyant AI betreibt eine dialogfähige Sprachplattform, die in Schnellrestaurants Bestellungen am Drive-in entgegennimmt. Neben der Spracherfassung nennt der Anbieter Bestellwege über Mobilgerät, Textnachricht und Vorabanruf sowie die Beantwortung einfacher Fragen. Die Gespräche zwischen Gast und Personal werden ausgewertet und sollen Schulung und Leistung verbessern. Eingesetzt wird das System bislang bei Good Times Burgers & Frozen Custard in Denver.",
      "quellen": [
        {
          "name": "valyant.ai"
        },
        {
          "name": "verdictfoodservice"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 59.33,
      "radius": 0.2395,
      "daten": "22. Februar 2020",
      "titelOriginal": "AI Ordering Platform"
    },
    {
      "id": "1182795",
      "titel": "Sweet Cheeks: Markenbilder aus generativer KI",
      "beschreibung": "Die singapurische Gelato-Marke Sweet Cheeks hat mit der Designagentur Bravo ihren Auftritt überarbeitet und setzt dabei auf KI-erzeugte Landschaftsbilder. Zum Umbau gehören ein neues Logo, Speisekarten, Arbeitskleidung, Drucksachen und eine überarbeitete Webseite; jede Sorte erscheint als eigener Planet in einer surrealen Bildwelt. Kreativdirektor Edwin Tan begründet den Schritt damit, dass die Marke die einfachen Freuden am Gelato zeigen solle.",
      "quellen": [
        {
          "name": "sweetcheeks.sg"
        },
        {
          "name": "designboom"
        }
      ],
      "sektor": "Verpackung",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 114.64,
      "radius": 0.4031,
      "daten": "12. März 2024",
      "titelOriginal": "AI-Powered Gelato Packaging"
    },
    {
      "id": "1054346",
      "titel": "Generative KI als Vorsorge in der Lebensmittelsicherheit",
      "beschreibung": "Microsoft beschreibt generative KI als Weg von der nachträglichen Reaktion zur Vorbeugung in der Lebensmittelsicherheit: digitale statt papiergestützter Aufzeichnungen, IoT-Sensoren mit Bilderkennung für Sortierung, Klassierung und Kontrolle sowie Copilot-Agenten, die Unterbrechungen der Kühlkette, Fremdkörper und Regelverstöße früh melden. In den USA wurden 2024 über 740 Rückrufe von Lebensmitteln und Getränken gezählt, mehr als doppelt so viele wie 2023; weltweit erkranken jährlich schätzungsweise 600 Millionen Menschen an durch Lebensmittel übertragenen Krankheiten.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 135.69,
      "radius": 0.6242,
      "daten": "18. Dezember 2024",
      "titelOriginal": "Need for AI in food safety"
    },
    {
      "id": "1142858",
      "titel": "Maschinelles Lernen beim Hochskalieren der Produktion",
      "beschreibung": "Nach der Entwicklung im Labormaßstab folgt der Aufbau von Produktionslinien für die Großfertigung, zu wettbewerbsfähigen Kosten und ohne Änderung der Nährwert- und Sensorikeigenschaften. Maschinelles Lernen sagt dafür physikalische und chemische Eigenschaften voraus, etwa den pH-Wert bei der Käse- und Kakaofermentation, und modelliert Prozessbedingungen wie die Extraktion von Antioxidantien. Bei alternativen Proteinen wie kultiviertem Fleisch hängt der Maßstabssprung an enger Führung von Temperatur, pH-Wert, Nährstoffzufuhr und Wachstumsfaktoren; KI wertet dafür große Datenmengen aus.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "cluster",
      "groesse": "m",
      "winkel": 137.89,
      "radius": 0.3686,
      "daten": "12. Februar 2025",
      "titelOriginal": "AI Scale-Up Development"
    },
    {
      "id": "1062462",
      "titel": "Coca-Cola Y3000: Rezeptur und Dose mit KI entwickelt",
      "beschreibung": "Coca-Cola hat mit Y3000 eine limitierte Sorte auf den Markt gebracht, die als erster gemeinsam von Menschen und KI entwickelter Geschmack ausgelobt wird. Zunächst sammelten Mitarbeiter des Unternehmens Vorlieben und Trends dazu, wie Verbraucher sich den Geschmack der Zukunft vorstellen; ein KI-System leitete daraus Geschmacksprofile und Kombinationen ab. Wie die Sorte schmeckt, beschreibt das Unternehmen nicht; sie erscheint mit und ohne Zucker. Auch die Gestaltung der schlanken Dose mit pixeligem Logo und Chromtönen entstand mit KI.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 141.36,
      "radius": 0.1884,
      "daten": "12. September 2023",
      "titelOriginal": "Coca-Cola used AI to create flavor: The Y3000 soda"
    },
    {
      "id": "1177056",
      "titel": "KI-Geschmacksmodell für die Pflanzenzüchtung",
      "beschreibung": "Ein Team der University of Florida hat ein KI-Modell entwickelt, das aus der chemischen Zusammensetzung von Früchten auf den Geschmackseindruck von Verbrauchern schließt. Trainiert wurde es an sensorischen Bewertungen und Analysewerten hunderter Sorten von Blaubeeren, Tomaten und Erdbeeren; die Modellauswahl lief auf dem Supercomputer HiPerGator. Geleitet hat die Arbeit der Genetiker Marcio Resende, der die Methode auf Zuckermais und Kaffee ausweiten will. Neue Aromastoffe findet das Modell nicht, es kombiniert nur Verbindungen aus dem vorhandenen Datenbestand.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 163.54,
      "radius": 0.6114,
      "daten": "20. November 2023",
      "titelOriginal": "An AI taste ‘connoisseur’ could be the future of crop breeding"
    },
    {
      "id": "1054336",
      "titel": "IoT und KI für Malaysias Ernährungssicherheit",
      "beschreibung": "Malaysias Ministerium für Wissenschaft, Technologie und Innovation will Landwirte beim Einsatz von Internet der Dinge und KI unterstützen und arbeitet dafür mit privaten und staatlichen Stellen zusammen. Minister Adham Baba nannte Smart Farming und vertikale Landwirtschaft als Wege, die Versorgung zu erhöhen und Flächen für weitere Kulturen frei zu machen; geplant sind auch Techniken gegen Dürre- und Regenzeiten. Vorgestellt wurde der Ansatz im Kabinett, das über Lebenshaltungskosten und Lebensmittelversorgung beriet; kurz darauf entfiel die Genehmigungspflicht für Lebensmittelimporte.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 171.49,
      "radius": 0.465,
      "daten": "24. Mai 2022",
      "titelOriginal": "IoT and AI to improve food security"
    },
    {
      "id": "1054340",
      "titel": "Shoprite: KI-Absatzprognose gegen Lebensmittelverschwendung",
      "beschreibung": "Die südafrikanische Handelsgruppe Shoprite prognostiziert mit KI und maschinellem Lernen den Absatz ihrer Filialen und löst Nachbestellungen automatisch aus; in das Modell fließen Parameter wie ein Sportereignis in Filialnähe ein. Datenanalysen weisen Verlustschwerpunkte aus — im Feinkostbereich sank die Verschwendung durch ein angepasstes Sortiment um 11 %. Täglich gibt die Gruppe über 120.000 Mahlzeiten an mehr als 450 Hilfsorganisationen ab, wöchentlich gehen rund 44 Tonnen Trockenware in Tierfutter. In einem Geschäftsjahr hielt sie 3.305 Tonnen Lebensmittelabfall von Deponien fern.",
      "sektor": "Abfallströme",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 7.4,
      "radius": 0.4347,
      "daten": "6. Mai 2022",
      "titelOriginal": "Shoprite turns to AI to tackle food waste"
    },
    {
      "id": "1181553",
      "titel": "Perfecta: KI-gesteuerter Grill von SEERGRILLS",
      "beschreibung": "Der Perfecta von SEERGRILLS ist ein Grill, dessen Garvorgang von einer Software mit Sensorik gesteuert wird; vorgestellt wurde er auf der CES 2024. Der Anbieter gibt an, Ergebnisse auf Kochniveau in 90 Sekunden zu erreichen, die Garzeit um 90 % zu verkürzen und 50 % weniger Energie zu verbrauchen als herkömmliche Verfahren. Technische Grundlage sind die herstellereigene NeuralFire-Technik, ein Quad-Core-Prozessor und Sensoren; Garvorlieben lassen sich über eine Mobilanwendung einstellen. Softwareaktualisierungen sagt der Hersteller auf Lebenszeit zu.",
      "quellen": [
        {
          "name": "seergrills"
        }
      ],
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 49.05,
      "radius": 0.5927,
      "daten": "17. Januar 2024",
      "titelOriginal": "AI-Powered Cutting-Edge Grill Designs"
    },
    {
      "id": "1054162",
      "titel": "YouFitness: KI-gestützte Ernährungsplanung per App",
      "beschreibung": "YouFitness ist eine Anwendung, die Ernährungspläne aus den Angaben der Nutzer erzeugt. Eingetragen werden Ernährungsvorgaben, Lebensgewohnheiten und Gesundheitsziele; daraus entstehen Mahlzeitenvorschläge, die auf Gewichtsabnahme oder Gewichtserhaltung ausgerichtet sind. Der Verlauf lässt sich über Diagramme und Auswertungen verfolgen. Der Anbieter gibt an, gesunde Ernährung damit zu vereinfachen und Umstellungen zu erleichtern.",
      "quellen": [
        {
          "name": "youfitness.app"
        }
      ],
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 37.63,
      "radius": 0.3943,
      "daten": "5. August 2024",
      "titelOriginal": "AI Meal Planning"
    },
    {
      "id": "1062466",
      "titel": "Create Real Magic: Coca-Cola-Motive als KI-Weihnachtskarte",
      "beschreibung": "Coca-Cola öffnet mit der Plattform Create Real Magic sein Bildarchiv für selbst gestaltete Weihnachtskarten. Die Oberfläche verbindet GPT-4 und DALL-E 2 und greift auf klassische Motive der Marke zurück, darunter die Darstellungen des Weihnachtsmanns und den Eisbären. Aus vorgegebenen Stilen, Motiven und Szenen entstehen Entwürfe, die sich über Textvorgaben weiter anpassen lassen; drei eingeladene Gestalter setzten damit erste Beispiele um. Die Aktion baut auf früheren KI-Vorhaben des Konzerns auf.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 42.61,
      "radius": 0.1999,
      "daten": "18. Dezember 2023",
      "titelOriginal": "AI-Inspired Holiday Cheer with Coca-Cola"
    },
    {
      "id": "1054369",
      "titel": "Goodbytz: Küchenroboter mit Betriebssoftware",
      "beschreibung": "Goodbytz bietet Küchenroboter für die Gastronomie zusammen mit einer Softwareplattform an. Rezepte lassen sich ohne Programmierkenntnisse anlegen, ein Empfehlungssystem schlägt Ergänzungen zum Sortiment vor, und über eine Lizenzplattform lassen sich fremde Marken mitkochen. Die Plattform bindet Warenwirtschaft, Einkauf mit automatischen Bestellungen bei niedrigem Bestand, Preiskalkulation, Web-Shop und Kassensystem, HACCP-Verwaltung und Lieferabwicklung ein. Der Anbieter gibt an, dass eine solche Küche über 3.000 Gerichte am Tag herstellt und bis zu 80 % Personalkosten spart.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 60.45,
      "radius": 0.5551,
      "daten": "26. Januar 2025",
      "titelOriginal": "Goodbytz: AI powerd Cooking Robots"
    },
    {
      "id": "1054059",
      "titel": "KI in Schnellrestaurants: Bestellung, Drive-in, Kundendaten",
      "beschreibung": "Schnellrestaurantketten setzen KI vor allem bei der Bestellannahme und in der Bedarfsplanung ein. McDonald's hat in vielen Filialen Bestellterminals mit Touchscreen aufgestellt; KFC und Taco Bell erproben am Drive-in Systeme, die Empfehlungen aus früheren Bestellungen oder der Tageszeit ableiten und Zusatzverkäufe anstoßen sollen. Domino's Pizza wertet Kundendaten aus, um Vorlieben zu erfassen und Bestellungen vorzuschlagen. Als weitere Anwendungsfelder nennt die Branche Robotik in Zubereitung und Verpackung sowie Spracherkennung am Drive-in und am Telefon.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 62.39,
      "radius": 0.4415,
      "daten": "5. März 2024",
      "titelOriginal": "AI: Revolutionising Fast Food Through Technology"
    },
    {
      "id": "1054086",
      "titel": "KI-Spracherkennung am Drive-in bei Lee's Famous Recipe",
      "beschreibung": "Bei Lee's Famous Recipe Chicken in Ohio nimmt ein Sprachassistent die Bestellungen am Drive-in auf. Die Lösung stammt von Hi Auto und arbeitet auf KI-Technik von Intel; sie begrüßt Gäste unmittelbar am Bestellterminal und erfasst die Bestellung. Nach Angaben des Betreibers Chuck Doran in Englewood entfallen Wartezeiten, und die Spracherkennung nimmt Bestellungen zuverlässig auf. Das System schlägt passend zur Bestellung zusätzliche Artikel vor.",
      "quellen": [
        {
          "name": "intel"
        },
        {
          "name": "businesswire"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 69.68,
      "radius": 0.2245,
      "daten": "21. Mai 2021",
      "titelOriginal": "AI-Powered Drive-Thrus"
    },
    {
      "id": "1664495",
      "titel": "Strella: Ethylensensoren sagen Reifeverläufe im Lager voraus",
      "beschreibung": "Strella misst mit Sensoren in Lager- und Reifekammern das Ethylen, das Obst beim Reifen abgibt, und leitet daraus mit maschinellem Lernen Reifekurven ab. Die Modelle erkennen chemische Veränderungen Tage bis Wochen vor sichtbaren Mängeln und melden sie den Betreibern; bislang stützten sich Betriebe auf Stichproben und die Erfahrung von Reifespezialisten. Geschäftsführerin Katherine Sizov gibt an, über 1.500 Lagerräume überwacht und rund 20 Millionen Pfund Äpfel gerettet zu haben; bei Bananen habe sich der Schwund etwa halbiert und der Absatz um rund 6 % erhöht.",
      "sektor": "Logistik & Distribution",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 88.12,
      "radius": 0.407,
      "daten": "28. Mai 2026",
      "titelOriginal": "Strella: AI-Driven Quality Forecasting in Produce Storage"
    },
    {
      "id": "1054379",
      "titel": "The Twelve Elements: KI-Motive auf Glenlivet-Flaschen",
      "beschreibung": "Die schottische Brennerei The Glenlivet verwendet für die Abfüllung The Twelve Elements KI-erzeugte Motive auf der Verpackung. Jede Flasche zeigt ein Bild zu einem Element der Whiskyherstellung, von Feuer bis Herkunft; der enthaltene Whisky ist 50 Jahre alt, der Preis liegt bei 40.000 Euro je Flasche. Die Reihe erscheint zum 200-jährigen Bestehen der Brennerei, die als älteste legale Destillerie Schottlands gilt.",
      "quellen": [
        {
          "name": "theglenlivet"
        },
        {
          "name": "creativebloq"
        }
      ],
      "sektor": "Verpackung",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 112.09,
      "radius": 0.3683,
      "daten": "8. März 2024",
      "titelOriginal": "AI-Generated Whiskey Packaging"
    },
    {
      "id": "1054337",
      "titel": "KI-Vorhersage für Lebensmittelsicherheit in der Verarbeitung",
      "beschreibung": "Eine Studie der University of British Columbia und der University of Guelph beschreibt KI als vorbeugendes Mittel gegen Rückrufe in der Lebensmittelherstellung. Bisher zeigen sich Probleme meist erst, wenn Ware ausgeliefert oder verzehrt ist; ein Rückruf wegen mikrobieller Verunreinigung wie E. coli kostet im Mittel 10 Millionen US-Dollar. Maschinelles Lernen soll Anlagendaten bewerten und Frühindikatoren einbeziehen — etwa Befragungen der Beschäftigten zur Sicherheitskultur, ausgewertet per Sprachverarbeitung. Die Arbeit erschien 2022 in Trends in Food Science & Technology.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 149.6,
      "radius": 0.5934,
      "daten": "10. August 2022",
      "titelOriginal": "How AI can make our food safer"
    },
    {
      "id": "1142856",
      "titel": "KI in Rezepturentwicklung und Präzisionsfermentation",
      "beschreibung": "In der Produktentwicklung sagt KI sensorische und ernährungsphysiologische Eigenschaften voraus. Sie schlägt Zutatenverhältnisse für ein angestrebtes Geschmacksprofil vor, findet Ersatzstoffe, die den Geschmack erhalten, und richtet Rezepturen auf Ziele wie weniger Zucker oder mehr Protein aus, samt Vorhersage der Nährwerte für die Kennzeichnung. Mit Sensoren und Bildsystemen wird die Textur beurteilt, etwa die Knusprigkeit von Chips. In der Präzisionsfermentation helfen Modelle der Genexpression und der 3D-Proteinfaltung, Genomänderungen für bestimmte Proteine zu finden.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "cluster",
      "groesse": "m",
      "winkel": 145.17,
      "radius": 0.4149,
      "daten": "12. Februar 2025",
      "titelOriginal": "AI Lab-Scale Development"
    },
    {
      "id": "1062459",
      "titel": "Y3000 Zero Sugar: mit KI entwickelte Coca-Cola-Sorte",
      "beschreibung": "Coca-Cola hat mit Y3000 Zero Sugar eine zeitlich begrenzte Sorte auf den Markt gebracht, deren Geschmacksprofil und Verpackungsgestaltung mit KI entwickelt wurden. Grundlage waren Rückmeldungen von Konsumenten weltweit auf die Frage, wie ein Getränk der Zukunft schmecken solle; daraus entstanden Aromaprofile sowie Logo und Schriftzug. Ein QR-Code auf der Dose führt in den Coca-Cola Creations Hub mit einer Bildfunktion. Angeboten wird die Sorte in den USA, China, Europa, Kanada und Afrika; als globalen Leiter für generative KI hat der Konzern Pratik Thakar eingesetzt.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 147.51,
      "radius": 0.2522,
      "daten": "13. September 2023",
      "titelOriginal": "Cola from the future? Coca-Cola reveals AI-generated drink"
    },
    {
      "id": "1157030",
      "titel": "Bonsai: autonome Navigation in Obstplantagen",
      "beschreibung": "Das Start-up Bonsai entwickelt autonome Systeme für schwierige landwirtschaftliche Umgebungen und hat 15 Millionen US-Dollar in einer Serie-A-Runde eingesammelt, um Software, Plattform und Vermarktung auszubauen. Die Technik Visionsteer steuert Fahrzeuge in Obstplantagen auch bei Staub, Dunkelheit und unebenem Gelände und wertet dabei Daten aus. Nach Angaben des Unternehmens sind über 40 Einheiten im Einsatz, die Daten von mehr als 500.000 Acre gesammelt haben. Rückenwind gibt die auf der CES von NVIDIA-Chef Jensen Huang betonte Ausweitung von KI-Modellen auf physische Systeme.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 156.36,
      "radius": 0.6212,
      "daten": "3. Februar 2025",
      "titelOriginal": "‘Physical AI’ in Food & Ag"
    },
    {
      "id": "1054331",
      "titel": "KI in der Nahrungsmittelproduktion: Ausbildung als Engpass",
      "beschreibung": "Eine Arbeit von Darrell Burrell (Florida Institute of Technology) und Kollegen im International Journal of Society Systems Science ordnet KI als Mittel für Ernährungssicherheit ein. Ausgangspunkt sind rund 7,8 Milliarden Menschen im Jahr 2021, von denen mindestens eine Milliarde chronisch hungert, und knapp zehn Milliarden bis 2050. Als Ursachen nennen die Autoren ineffiziente Produktions- und Verteilsysteme sowie unerschlossene Agrarflächen. Sie fordern Ausbildungsangebote, die Landwirte und Studierende an Robotik, Informatik und Sicherheitstechnik heranführen.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 172.96,
      "radius": 0.4423,
      "daten": "25. Januar 2025",
      "titelOriginal": "AI for food security"
    },
    {
      "id": "1054334",
      "titel": "Crystal.eye: hyperspektrale Prüfung von Obst und Gemüse",
      "beschreibung": "Das israelische Agrartechnik-Unternehmen Neolithics prüft mit dem optischen System Crystal.eye Obst und Gemüse zerstörungsfrei. Statt der drei Farbkanäle des sichtbaren Lichts nutzt es hyperspektrale Aufnahmen mit über 400 Spektren, die in die Probe eindringen; aus dem Muster leiten Modelle Festigkeit, Feuchte, Zuckergehalt und Säure ab und werten ganze Chargen in Sekunden aus. Nach Angaben des Unternehmens lässt sich die Stichprobe von üblich 1 % auf 30 bis 40 % ausweiten. Das System ist bei Erzeugern, Händlern und Verarbeitern im Einsatz.",
      "sektor": "Abfallströme",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 19.8,
      "radius": 0.4371,
      "daten": "25. Januar 2025",
      "titelOriginal": "How Neolithics is using AI machine learning to reduce global food waste"
    },
    {
      "id": "1181552",
      "titel": "SmartyPans: Pfanne mit Sensorik und App-Anbindung",
      "beschreibung": "SmartyPans ist eine Kochpfanne mit Sensorik, die sich über eine Anwendung auf dem Smartphone steuern lässt; Gestaltung und Konstruktion stammen von Speck Design. Über die App lassen sich Gewicht, Zeit, Temperatur und Nährwertangaben der Zubereitung verfolgen. Der Anbieter ordnet das Produkt als serienreif und alltagstauglich ein und stellt es samt abgestimmter Verpackungsgestaltung vor.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 47.62,
      "radius": 0.5798,
      "daten": "11. September 2023",
      "titelOriginal": "AI Smart Cooking Pan"
    },
    {
      "id": "1054161",
      "titel": "OnlyPans: wöchentliche Essenspläne aus Haushaltsdaten",
      "beschreibung": "OnlyPans erstellt wöchentliche Essenspläne für Einzelpersonen und Haushalte. Die Anwendung wertet früher gewählte Gerichte, Ernährungsvorlieben, Haushaltsgröße, vorhandene Vorräte und das Budget aus und leitet daraus Vorschläge samt Einkauf ab. Reste werden eingerechnet, um Lebensmittelverschwendung zu verringern. Der Anbieter richtet den Dienst an Haushalte, die Planung und Einkauf mit geringem Zeitaufwand ordnen wollen.",
      "quellen": [
        {
          "name": "onlypans.app"
        }
      ],
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 38.52,
      "radius": 0.3683,
      "daten": "10. Januar 2025",
      "titelOriginal": "AI Meal Planners"
    },
    {
      "id": "1062463",
      "titel": "Coca-Cola: KI im Weihnachtsspot und im Automatengeschäft",
      "beschreibung": "Coca-Cola hat seinen Weihnachtsspot „Holidays Are Coming“ nach eigenen Angaben vollständig mit KI erstellen lassen; Javier Meza, Marketingchef für Europa, stellte die Neufassung in London vor. Über einen QR-Code auf Flaschen und Dosen entstehen personalisierte Schneekugel-Animationen. Grundlage ist eine 2023 geschlossene Allianz mit Bain & Company und OpenAI, aus der die Plattform Create Real Magic hervorging. Ein 2014 begonnener Versuch mit 60 vernetzten Automaten in Newcastle brachte 15 % mehr Transaktionen und 18 % weniger Nachfüllfahrten; daraus ging das Analyseunternehmen HIVERY hervor.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 38.62,
      "radius": 0.1863,
      "daten": "11. November 2024",
      "titelOriginal": "Coca-Cola and its Use of AI for Christmas and Beyond"
    },
    {
      "id": "1187345",
      "titel": "Snack-Lieferung per Drohne nach Wearable-Daten",
      "beschreibung": "Gesundheitsarmbänder wie WHOOP erfassen Einbrüche von Energie und Konzentration. In Verbindung mit KI und Lieferdrohnen für Innenräume ließe sich ein Snack ausliefern, bevor sich der Leistungsabfall auf die Arbeit auswirkt. Als Bausteine genannt sind der Armbandhersteller WHOOP und der Lieferroboter-Anbieter Starship.",
      "quellen": [
        {
          "name": "whoop.com",
          "url": "https://www.whoop.com/de/en/"
        },
        {
          "name": "starship.xyz",
          "url": "https://www.starship.xyz/"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 58.13,
      "radius": 0.7877,
      "daten": "12. Mai 2025",
      "titelOriginal": "Drone Snacks from Energy Tracking"
    },
    {
      "id": "1054343",
      "titel": "KI-Anwendungen in Food Service und Lebensmittelherstellung",
      "beschreibung": "Food Service und Lebensmittelherstellung setzen KI bereits für die Bestellannahme, die Bestandsführung, die Kommunikation mit Mitarbeitenden und die Vorhersage von Lebensmitteltrends ein. Der Fachdienst SmartBrief bündelte diese Anwendungsfelder beim erstmals ausgerichteten AI Impact Summit am 27. und 28. September 2023, mit einem Eröffnungsvortrag von Zack Kass, Zukunftsforscher bei OpenAI, und einem Gespräch mit Mutale Nkonde, Gründerin der Organisation AI for the People, die algorithmische Verzerrungen bekämpft. Eigene Sitzungen galten dem Omnichannel-Einkauf, der Sprach-KI in der Bestellannahme und der Bestandsführung.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 60.45,
      "radius": 0.5856,
      "daten": "14. August 2023",
      "titelOriginal": "How will AI transform the food industry?"
    },
    {
      "id": "186226",
      "titel": "Personalisierte Bestell-App bei Taco Bell",
      "beschreibung": "Taco Bell personalisiert seine Bestell-App gemeinsam mit dem Anbieter Certona: Maschinelles Lernen wählt die angezeigten Menüpunkte, Aktionen und Inhalte nach Vorlieben, Bestellhistorie, Standort, Wetter sowie filialspezifischen Karten und Preisen aus; beide Unternehmen arbeiten seit Anfang 2019 zusammen. Ein Bericht von PSFK nennt 79 % der Gäste, die Empfehlungen auf Basis früherer Bestellungen wünschen. Parallel stattet Chili's 1.250 Filialen mit Tischgeräten von Presto aus, und McDonald's nutzt nach der Übernahme von Dynamic Yield eine Entscheidungslogik an den Drive-in-Anzeigen.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 75.14,
      "radius": 0.3896,
      "daten": "14. Januar 2020",
      "titelOriginal": "Taco Bell deploys AI for in-app personalization"
    },
    {
      "id": "1054085",
      "titel": "Spanischsprachige Bestell-KI bei Rally's und Checkers",
      "beschreibung": "Die US-Schnellrestaurantketten Rally's und Checkers nehmen Bestellungen erstmals auch auf Spanisch per Sprach-KI entgegen. Der virtuelle Assistent erkennt die gesprochene Sprache und wechselt selbsttätig zwischen Englisch und Spanisch; zusätzlich schlägt er Zusatzverkäufe wie Desserts oder Pommes frites vor. Technikpartner ist Hi Auto, dessen Geschäftsführer Roy Baharav die Erweiterung als Angebot an spanischsprachige und zweisprachige Kundschaft beschreibt, das rund um die Uhr verfügbar sei.",
      "quellen": [
        {
          "name": "engadget"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 63.21,
      "radius": 0.2192,
      "daten": "22. August 2023",
      "titelOriginal": "Spanish Food-Order AI Chatbots"
    },
    {
      "id": "1210037",
      "titel": "PowerLog: KI und Quantenrechnen in der Seelogistik",
      "beschreibung": "PowerLog ist eine Plattform zur Optimierung internationaler Transporte, die See- und Landwege in einem System zusammenführt. KI-Algorithmen und Quantenrechnen sollen Schiffsrouten, Containerbeladung und Transportpläne berechnen und Lieferverzögerungen vorhersagen. Das Konsortium koordiniert DIHGIGAL; beteiligt sind der Lebensmittelcluster Clusaga, der Fischereikonzern Grupo Nueva Pescanova, Visual Trans, das Technologiezentrum ITG und das Start-up Cuatro Digital. Die Förderung stammt aus dem Programm Agrupaciones Empresariales Innovadoras des spanischen Industrieministeriums, Ausschreibung 2023.",
      "sektor": "Logistik & Distribution",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 93.24,
      "radius": 0.4484,
      "daten": "4. Dezember 2023",
      "titelOriginal": "Powerlog"
    },
    {
      "id": "1054378",
      "titel": "KI-gestaltete Flaschen für Rémy Martin 1738",
      "beschreibung": "Rémy Martin hat 50 limitierte Flaschen des Cognacs 1738 Accord Royal herausgebracht, deren Gestaltung eine KI aus eingegebenen Wörtern erzeugt hat. Als Eingabe diente nach Angaben der Marke das musikalische Vokabular des Sängers Usher, mit dem er seinen Geruchseindruck des Cognacs beschrieb. Zur Ausgabe gehört ein Non-Fungible Token, der auf der Handelsplattform BlockBar.com gehalten, weiterverkauft, verschenkt oder gegen die physische Flasche eingelöst werden kann. Die Edition begleitet die Kampagne A Taste of Passion zur Las-Vegas-Residenz des Sängers.",
      "quellen": [
        {
          "name": "prnewswire"
        }
      ],
      "sektor": "Verpackung",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 113.28,
      "radius": 0.3864,
      "daten": "26. Juli 2022",
      "titelOriginal": "AI-Generated Cognac Bottles"
    },
    {
      "id": "1054317",
      "titel": "Beck's Autonomous — von KI entwickeltes Jubiläumsbier",
      "beschreibung": "Beck's hat zum 150-jährigen Bestehen ein Bier auf den Markt gebracht, dessen Rezeptur, Name, Leitbild, Logo, Dosendesign, Website und Werbekampagne von einer KI erzeugt wurden. Nach Angaben der Brauerei kam ein Verfahren namens Compound Prompting zum Einsatz, bei dem jede Antwort der KI die nächste Eingabe bestimmte. Aus Millionen möglicher Kombinationen entstand eine Rezeptur aus Brauwasser, Hopfen, Malz und Hefe, die die Braumeister umsetzten. Auch Radiospot, Werbefilm und Influencer-Strategie stammen aus dem System; der Slogan lautet „Das Bier, das sich selbst kreierte“.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 137.89,
      "radius": 0.6069,
      "daten": "12. April 2023",
      "titelOriginal": "Becks Autonomous"
    },
    {
      "id": "1062471",
      "titel": "KI in der Rezeptentwicklung bei Mondelez",
      "beschreibung": "Mondelez International entwickelt Rezepturen für seine Snacks mit einer KI-Anwendung, die Geschmack, Aroma, Aussehen, Zutatenkosten, Umweltwirkung und Nährwertprofil gegeneinander abwägt und daraus Vorschläge für neue Varianten ableitet. Das verkürzt die Entwicklungszeit und verringert den Bedarf an menschlichen Verkostern; bislang wurde die Anwendung in über 70 Projekten eingesetzt, darunter eine Überarbeitung des klassischen Oreo. Grenzen setzt die Vorliebe der Käufer für Vertrautes: Markenverantwortliche begleiten die Vorschläge, damit die Produkte ihren Charakter behalten.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "cluster",
      "groesse": "m",
      "winkel": 130.57,
      "radius": 0.4295,
      "daten": "27. Januar 2025",
      "titelOriginal": "AI Food"
    },
    {
      "id": "1062458",
      "titel": "Coca-Cola Y3000 — Geschmack mit KI entwickelt",
      "beschreibung": "Coca-Cola Y3000 ist eine limitierte Sorte, deren Geschmacksrichtung nach Unternehmensangaben erstmals gemeinsam von Menschen und KI entwickelt wurde. Sie erscheint als Zero-Sugar- und als Zuckervariante in ausgewählten Märkten, darunter die USA, und ist die dritte Neuheit des Jahres innerhalb der 2022 gestarteten Reihe Coca-Cola Creations mit bislang sieben Sorten. Grundlage waren nach Firmenangaben weltweit erhobene Verbraucherperspektiven, verknüpft mit Auswertungen einer KI; auch die Verpackungsgestaltung entstand auf diesem Weg.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 152.29,
      "radius": 0.2813,
      "daten": "12. September 2023",
      "titelOriginal": "Coca-Cola launches beverage created with the help of AI"
    },
    {
      "id": "1148743",
      "titel": "Croptimus — Computer Vision zur Pflanzenüberwachung",
      "beschreibung": "Croptimus ist eine Computer-Vision-Plattform des Agrartechnik-Unternehmens Fermata, die Schädlinge, Krankheiten und andere Schäden an Kulturpflanzen erkennt. Die Bestände werden fortlaufend beobachtet, KI und maschinelles Lernen werten die Bilder in Echtzeit aus und liefern Hinweise für gezielte Behandlungen, was den Pflanzenschutzmitteleinsatz und die Betriebskosten senken soll. Nach Angaben des Anbieters halbiert die automatisierte Bestandskontrolle die Kosten der sonst manuellen Feldbegehung. Die Plattform erhielt 2025 den Innovation Award der Messe Fruit Logistica.",
      "quellen": [
        {
          "name": "newswire"
        },
        {
          "name": "fermata.tech"
        }
      ],
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 170.37,
      "radius": 0.6041,
      "daten": "21. Februar 2025",
      "titelOriginal": "Ai-Powered Agricultural Tools"
    },
    {
      "id": "1054328",
      "titel": "KI gegen Engpässe im Agrar- und Ernährungssektor",
      "beschreibung": "Die politische und gesellschaftliche Debatte über KI hat deren ursprünglichen Zweck in den Hintergrund gedrängt: die Effizienz von Lieferketten. Für den Agrar- und Ernährungssektor stellt sich damit die Frage, ob die Technik dazu beitragen kann, die infolge der aktuellen Krisen breit erwarteten Versorgungsengpässe abzufedern.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 175.8,
      "radius": 0.4595,
      "daten": "15. September 2022",
      "titelOriginal": "What if AI could make the agri-food sector more resilient?"
    },
    {
      "id": "1146015",
      "titel": "Orbisk — KI-Monitor gegen Lebensmittelverschwendung",
      "beschreibung": "Orbisk aus Utrecht erfasst mit dem Gerät „Orbi“ die Lebensmittelverschwendung in Profiküchen: Kamera und KI-Auswertung registrieren weggeworfene Lebensmittel, ordnen ihnen betriebliche Ursachen zu und liefern Handlungsempfehlungen über ein Dashboard. Das Unternehmen sammelte über 8 Millionen Euro in einer überzeichneten Series-A-Runde ein, angeführt von Regeneration.VC gemeinsam mit PeakBridge. Orbisk arbeitet in über 40 Ländern, rüstet ab 2025 ausgewählte Schiffe von Carnival Cruise Line aus und will mit Accor bis 2030 60 % der Lebensmittelabfälle in dessen Hotels vermeiden.",
      "sektor": "Abfallströme",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 12.74,
      "radius": 0.6168,
      "daten": "10. Dezember 2024",
      "titelOriginal": "Utrecht-based Orbisk bags €8M to reduce food waste using AI: Here’s how"
    },
    {
      "id": "1054082",
      "titel": "KI-Kühlschrank von Tomorrow verlängert die Haltbarkeit",
      "beschreibung": "Das Start-up Tomorrow aus Seattle baut einen Kühlschrank, der frisches Obst und Gemüse nach eigenen Angaben bis zu dreimal länger frisch hält als herkömmliche Geräte. Eine gesteuerte Atmosphäre und eine per Computer Vision geregelte Feuchtehaltung bremsen den Wasserverlust; in Tests hielt Koriander viermal, hielten Bananen achtmal mehr Wasser als in üblichen Geräten. Eine KI führt zudem Bestand und Frische und schlägt Rezepte aus den vorhandenen Zutaten vor. Angekündigt ist der Marktstart für den Sommer 2025; Haushalte verursachen 60 % der 2022 weltweit weggeworfenen 1,05 Milliarden Tonnen Lebensmittel.",
      "sektor": "Abfallströme",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 16.61,
      "radius": 0.4062,
      "daten": "22. Januar 2025",
      "titelOriginal": "AI Fridges - Tomorrow's Predictive Refrigeration System Extends Produce Life"
    },
    {
      "id": "1176243",
      "titel": "Project Mulberry — KI-Gesundheitscoach von Apple",
      "beschreibung": "Apple arbeitet nach einem Bericht von Bloomberg unter dem Namen Project Mulberry an einer überarbeiteten Health-App mit einem KI-Agenten, der Aufgaben eines Arztes in Teilen übernehmen soll. Der Agent wertet die gesammelten Aktivitäts- und Gesundheitsdaten aus und gibt darauf abgestimmte Empfehlungen; erkennt die Apple Watch etwa einen erhöhten Puls, spielt die App dazu ein Video eines Arztes aus. Trainiert wird das System mit Daten angestellter Ärzte, ergänzt um externe Fachleute für Schlaf, Ernährung, Physiotherapie, psychische Gesundheit und Kardiologie. Vorgesehen ist die Auslieferung mit dem Update iOS 19.4.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 31.04,
      "radius": 0.535,
      "daten": "30. März 2025",
      "titelOriginal": "Apple’s next major health bet could be an AI doctor"
    },
    {
      "id": "1054084",
      "titel": "Thirsty Bot — KI-Assistent für Cocktailrezepte",
      "beschreibung": "Thirsty Bot ist eine Anwendung, die aus den zu Hause vorhandenen Zutaten Cocktailrezepte erzeugt. Nach Eingabe der verfügbaren Spirituosen und Zutaten liefert das System binnen Sekunden ein passendes Rezept samt erzeugtem Bild des Getränks. Der Anbieter richtet sich damit an Laien, die ohne Barwissen neue Kombinationen ausprobieren wollen.",
      "quellen": [
        {
          "name": "thirsty.bot"
        }
      ],
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 38.95,
      "radius": 0.4165,
      "daten": "23. April 2024",
      "titelOriginal": "AI Cocktail Assistants"
    },
    {
      "id": "1054097",
      "titel": "Tastebuds — Rezeptgenerator für die Getränkebranche",
      "beschreibung": "Tastebuds ist eine KI-Anwendung des Marketingdienstleisters BrandMuscle, die Getränkerezepte für die Alkohol- und Getränkebranche erzeugt und dazu produktionsfertige Grafiken liefert. Neben der Abstimmung von Aromen und Mengenverhältnissen führt das System Vergleichsanalysen durch, die mögliche Markenrechtsverletzungen aufdecken und die Einhaltung von Branchenstandards prüfen sollen. Nach Angaben des Anbieters verkürzt das die Rezepterstellung und den Verkostungsprozess und senkt den Aufwand für Konformitätsprüfungen sowie die Zeit zwischen Kampagnenstart und Verkauf.",
      "quellen": [
        {
          "name": "content.brandmuscle"
        }
      ],
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 27.71,
      "radius": 0.2983,
      "daten": "31. Juli 2024",
      "titelOriginal": "AI Mixologists"
    },
    {
      "id": "1204202",
      "titel": "GRILL X — KI-gesteuerter Grillroboter für Profiküchen",
      "beschreibung": "Das südkoreanische Start-up Beyond Honeycomb hat auf der National Restaurant Association Show 2025 den Grillroboter GRILL X vorgestellt, der Garvorgänge in gewerblichen Küchen ohne Bedienung ausführt. Molekulare Sensorik erfasst chemische Veränderungen wie die Maillard-Reaktion, das Ausschmelzen von Fett, den Röstgrad und den Abbau von Kollagen; eine KI steuert daraus den Garprozess. Weiche Gelenkantriebe und Flammensensoren erlauben den Einsatz in beengten Küchen; entwickelt wurde das Gerät mit Michelin-erfahrenen Köchen. Der Anbieter nennt bis zu 80 gleichmäßig gegrillte Portionen je Stunde.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 70.29,
      "radius": 0.7301,
      "daten": "28. Mai 2025",
      "titelOriginal": "AI-Powered Grilling Robots"
    },
    {
      "id": "1054335",
      "titel": "Robotik im Food Service und die Folgen für Arbeitsplätze",
      "beschreibung": "Der Markt für Lebensmittelroboter wurde 2020 auf 1,9 Milliarden US-Dollar geschätzt und soll bis 2026 auf 4,0 Milliarden wachsen; im Einsatz sind der Bratroboter Flippy von Miso Robotics, der Barista-Automat Briggo und der Smoothie-Kiosk von Blendid, der bei Walmart und Jamba steht. Blendid-Mitgründer Vipin Jain hält dem Vorwurf des Arbeitsplatzverlusts entgegen, dass in der Gastronomie seit Jahren Stellen unbesetzt bleiben: Maschinen übernähmen die Routinearbeit, Menschen Bestückung, Reinigung und Wartung. Über ein Drittel der Kioskumsätze bei Walmart fällt außerhalb des Tagesgeschäfts an; die Amortisation beziffert Jain auf unter 18 Monate.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 72.64,
      "radius": 0.6061,
      "daten": "3. Juni 2021",
      "titelOriginal": "Do AI-powered food robots put human jobs at risk?"
    },
    {
      "id": "1144980",
      "titel": "KI in Küchenbetrieb und Bestandsführung",
      "beschreibung": "In Profiküchen übernimmt KI Zubereitungsschritte und die Bestandsplanung. Zume Pizza setzt Roboter ein, die die Sauce gleichmäßig verteilen und die Backzeit einschätzen, was Ausführung und Ergebnis vereinheitlicht. In der Bestandsführung leiten Systeme den Bedarf aus historischen Daten und vorliegenden Reservierungen ab und sollen so Überbestände wie Fehlmengen vermeiden.",
      "sektor": "Handel & HoReCa",
      "ebene": "cluster",
      "groesse": "l",
      "winkel": 65.55,
      "radius": 0.3963,
      "daten": "14. Februar 2025",
      "titelOriginal": "AI in Kitchen Operations & Management"
    },
    {
      "id": "1144988",
      "titel": "KI in Gastronomie-Marketing und Gästeanalyse",
      "beschreibung": "Restaurantketten werten Gästedaten mit KI aus, um Werbung gezielt auszuspielen. Die US-Kette Chili's erstellt auf diesem Weg personalisierte Werbebotschaften und führt darauf eine stärkere Kundenbindung und steigende Umsätze zurück. Ergänzend werten Systeme Rückmeldungen der Gäste automatisiert aus und liefern daraus Hinweise auf Schwachstellen im Service.",
      "sektor": "Handel & HoReCa",
      "ebene": "cluster",
      "groesse": "l",
      "winkel": 75.14,
      "radius": 0.2672,
      "daten": "14. Februar 2025",
      "titelOriginal": "AI in Marketing and Customer Analytics"
    },
    {
      "id": "1065672",
      "titel": "KI für Lebensmittelsicherheit in der Lieferkette",
      "beschreibung": "KI-gestützte Systeme überwachen Temperatur, Feuchte und Luftqualität in Transport und Lagerung fortlaufend über Sensoren und vernetzte Geräte und melden Abweichungen, bevor Ware verdirbt; RFID, GPS-Ortung und Blockchain verbessern zugleich die Rückverfolgbarkeit und beschleunigen Rückrufe. Die WHO zählt jährlich rund 600 Millionen Erkrankungsfälle durch belastete Lebensmittel. Für den Markt solcher Anwendungen wird bis 2029 ein Volumen von 48,99 Milliarden US-Dollar bei 38,30 % jährlichem Wachstum erwartet; Unilever, Tyson Foods, McDonald's, Domino's, Chipotle und Walmart nutzen sie, um Störungen abzufedern und Ersatzlieferanten zu finden.",
      "sektor": "Logistik & Distribution",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 94.67,
      "radius": 0.4276,
      "daten": "7. Juni 2024",
      "titelOriginal": "AI optimises food safety in logistics and streamlines supply chains"
    },
    {
      "id": "1054377",
      "titel": "Label 5 City Lights: KI-Etiketten, keine Flasche wie die andere",
      "beschreibung": "Eine limitierte Abfüllung des Scotch Whiskys Label 5 trägt auf jeder Flasche ein anderes Etikett: Die Motive sind zufällige Ausschnitte aus einer von KI erzeugten nächtlichen Stadtansicht, sodass keine zwei Flaschen gleich aussehen. Zur Edition gehört die digitale Plattform LABEL5-findyourlabel, über die sich der eigene Ausschnitt in der Gesamtansicht der Stadt wiederfinden lässt. Die Marke ordnet die City Lights Edition ihrem zeitgenössischen Auftritt zu.",
      "quellen": [
        {
          "name": "dramscotland"
        }
      ],
      "sektor": "Verpackung",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 110.44,
      "radius": 0.3853,
      "daten": "4. Januar 2024",
      "titelOriginal": "AI-Designed Whiskey Bottles"
    },
    {
      "id": "1054061",
      "titel": "LRQA: Sicherheitskultur als Vorbedingung für KI in der Produktion",
      "beschreibung": "Der Einsatz von KI, Blockchain und Internet der Dinge in der Lebensmittelsicherheit setzt nach Einschätzung der Prüforganisation LRQA erst eine belastbare Datenbasis und eine gelebte Sicherheitskultur voraus. Jan Kranghand, Leiter des Food Centre of Excellence bei LRQA, nennt als Nutzen die Mustererkennung in großen Datenmengen und die Nachverfolgung von Waren entlang der Lieferkette. Zuvor seien Prozesse zu prüfen und ein risikobasierter Ansatz herzustellen. Nach einer Erhebung der Agentur Tank liegt die britische Lebensmittel- und Getränkebranche bei der KI-Einführung auf Rang vier.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 143.69,
      "radius": 0.6317,
      "daten": "2. Januar 2024",
      "titelOriginal": "AI: No magic bullet for food safety issues"
    },
    {
      "id": "1062457",
      "titel": "Getränke mit KI-Rezeptur: von Beck's Autonomous bis Coca-Cola Y3000",
      "beschreibung": "Mehrere Getränkehersteller lassen Rezeptur, Name und Verpackung von KI entwerfen. Beck's Autonomous entstand zum 150-jährigen Markenjubiläum über Compound Prompting, bei dem jede Antwort der KI die nächste Eingabe formt; sie lieferte Rezeptur, Name, Dosendesign und Radiospots. Die Kellerei Von Stiehl ließ Verkostungsurteile zu ihren 2023 eingeführten Artificial-Intelligence-Weinen von ChatGPT und Google Gemini auswerten und leitete daraus Änderungen an Süße, Körper und Säure für die Version 2.0 vom Juni 2024 ab. Hinzu kommen Coca-Colas Y3000 Zero Sugar und ein Energydrink von Hell Energy.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "cluster",
      "groesse": "m",
      "winkel": 132.39,
      "radius": 0.465,
      "daten": "27. Januar 2025",
      "titelOriginal": "AI Beverages"
    },
    {
      "id": "1062455",
      "titel": "HELL A.I.: Energydrink mit von KI entwickelter Rezeptur",
      "beschreibung": "Hell Energy Drink aus Ungarn hat einen Energydrink auf den Markt gebracht, dessen Zusammensetzung und Verpackung von KI-Systemen bestimmt wurden. Die Software wertete Verbrauchererwartungen aus, wählte Zutaten samt Vitaminen, Aminosäuren und Botanicals und entwarf drei Geschmacksvarianten; durchgesetzt hat sich „Tutti-frutti & Berry-blast“. Das Unternehmen gibt an, die Entwicklungszeit damit von ein bis zwei Jahren auf etwa einen Monat verkürzt zu haben, und beansprucht den ersten so entwickelten Energydrink weltweit. Die Rezeptur liegt auf einem einzelnen Rechner im ungarischen Werk.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 150.02,
      "radius": 0.266,
      "daten": "28. Juli 2023",
      "titelOriginal": "'World’s first’ energy drink developed by artificial intelligence"
    },
    {
      "id": "1146019",
      "titel": "Quali'Cible: Satellitenerkennung von Nichtzielkulturen in Frankreich",
      "beschreibung": "Syngenta France und xFarm Technologies verbinden seit Dezember 2024 das Entscheidungshilfesystem Quali'Cible mit geodatenbasierter KI, die Nichtzielkulturen auf Satellitenbildern erkennt. In Frankreich ist die Anwendung bestimmter Pflanzenschutzmittel an Auflagen gebunden, wenn empfindliche Kulturen in der Nachbarschaft stehen; Quali'Cible sagt Landwirten, ob ein Mittel auf einem Schlag zulässig ist. Erkannt werden unter anderem Sorghum, Hirse, Buchweizen und Chia; xFarm hat dafür nach eigenen Angaben die gesamte Agrarfläche Frankreichs von rund 25 Millionen Hektar ausgewertet.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 169.36,
      "radius": 0.6272,
      "daten": "4. Dezember 2024",
      "titelOriginal": "Geospatial AI for crop detection"
    },
    {
      "id": "1054058",
      "titel": "KI gegen Engpässe in der Agrar- und Lebensmittellieferkette",
      "beschreibung": "Der ursprüngliche Zweck von KI — die Effizienz von Lieferketten zu verbessern — gerät in der politischen und gesellschaftlichen Debatte über die Technik aus dem Blick. Aufgeworfen wird die Frage, ob der Agrar- und Lebensmittelsektor als strategische Branche mit KI jene Verknappungen abfedern kann, die als Folge der gegenwärtigen Krisen erwartet werden.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 166.36,
      "radius": 0.4203,
      "daten": "15. September 2022",
      "titelOriginal": "AI make the agri-food sector more resilient"
    },
    {
      "id": "1141346",
      "titel": "Grenzen von KI in der Landwirtschaft: das unkontrollierte Umfeld",
      "beschreibung": "Maschinelles Lernen scheitert in der Landwirtschaft weniger an den Algorithmen als am unkontrollierten Umfeld: Boden, Witterung und Tageslänge wechseln von Schlag zu Schlag und von Kontinent zu Kontinent, was Test und Validierung aufwendiger macht als anderswo. Im Maisanbau in Zentral-Südafrika lieferte eine Sensordrohne in unter 15 Minuten eine Bestandsdichtekarte, wofür ein Jahr zuvor drei bis fünf Tage nötig gewesen wären — die in den USA trainierte Software zählte jedoch falsch. IBM fuhr sein 2011 in Haifa gestartetes Agrar-Cloud-Projekt später zugunsten medizinischer Anwendungen zurück.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 171.8,
      "radius": 0.2138,
      "daten": "20. Februar 2017",
      "titelOriginal": "Challenges for AI in agriculture"
    },
    {
      "id": "1054081",
      "titel": "SnapSnack: Rezeptvorschläge aus dem Foto vorhandener Zutaten",
      "beschreibung": "Eine Anwendung erzeugt Rezeptvorschläge aus einem Foto der vorhandenen Zutaten. Aufgenommen werden Reste und angebrochene Lebensmittel; die Bilderkennung bestimmt sie, anschließend schlägt die Anwendung Gerichte vor, die sich daraus zubereiten lassen. Der Anbieter SnapSnack gibt an, damit Lebensmittelverschwendung im Haushalt zu verringern und die Essensplanung zu vereinfachen.",
      "quellen": [
        {
          "name": "snapsnack.neochain.ro"
        }
      ],
      "sektor": "Abfallströme",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 13.97,
      "radius": 0.4179,
      "daten": "10. April 2024",
      "titelOriginal": "AI-Powered Food Waste Reduction"
    },
    {
      "id": "1218552",
      "titel": "Wonvita W-Robot: Küchenkomposter mit KI-Steuerung",
      "beschreibung": "Ein Küchengerät verarbeitet Speisereste, Obstschalen und kleine Knochen in zwei bis acht Stunden zu Kompost. Der W-Robot arbeitet mit geschlossener Luftführung gegen Geruch, einer Selbstreinigung sowie KI-gestützter Steuerung von Zerkleinerung und Fermentation; eine App übernimmt Fremdkörpererkennung und die Regelung von Temperatur und Feuchte. Nach Angaben des Anbieters Wonvita lassen sich auch Fette, Öle, Proteine und Stärken verarbeiten und der mit Lebensmittelabfällen verbundene CO2-Fußabdruck eines Haushalts um bis zu 90 % senken.",
      "sektor": "Abfallströme",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 4.63,
      "radius": 0.2613,
      "daten": "25. Juni 2025",
      "titelOriginal": "AI-Powered Kitchen Waste Robots"
    },
    {
      "id": "1176240",
      "titel": "Project Mulberry: Apples KI-Gesundheitsdienst mit Ernährungsteil",
      "beschreibung": "Apple arbeitet nach einem Bericht von Bloomberg an einem KI-Dienst, der Teile der Rolle eines Arztes übernehmen soll. Das intern Project Mulberry genannte Vorhaben, auch „Health+“, erweitert die Health-App um einen Gesundheitscoach, der aus Messwerten von iPhone und Apple Watch Empfehlungen ableitet; ein Schwerpunkt liegt auf der bislang fehlenden Ernährungserfassung. Fachleute für Schlaf, Ernährung, Physiotherapie, Psyche und Kardiologie sollen Erklärvideos beisteuern. Die Leitung hat Sumbul Desai, Ärztin und Vice President Health; ein Start wurde für iOS 19.4 in Aussicht gestellt.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 28.55,
      "radius": 0.5451,
      "daten": "1. April 2025",
      "titelOriginal": "Apple Quietly Working on AI Agent to \"Replica\" a Human Doctor"
    },
    {
      "id": "1054083",
      "titel": "Frazy Bot: modularer Getränkeroboter für den Haushalt",
      "beschreibung": "Ein Küchengerät bereitet Kaffeespezialitäten und alkoholfreie Cocktails vollständig selbst zu, vom Aufschäumen der Milch bis zur Garnitur. Der Frazy Bot besteht aus einer Basiseinheit, an die sich Module für Kaffee oder Cocktails anstecken lassen; eine sensorgestützte Zutatenerkennung soll geschichtete Milchkaffees oder gesalzene Glasränder ermöglichen. Der Hersteller Frazy bietet zusätzlich einen Lieferdienst für frische Zutaten an und stellte das Gerät auf der CES 2025 vor.",
      "quellen": [
        {
          "name": "prnewswire"
        }
      ],
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 41.57,
      "radius": 0.4043,
      "daten": "7. Januar 2025",
      "titelOriginal": "AI-Driven Robotic Beverage Machines"
    },
    {
      "id": "1054096",
      "titel": "Axelrad: Cocktailkarte im Vergleich Barkeeper gegen ChatGPT",
      "beschreibung": "Die Bar Axelrad in Houston hat eine Karte aufgelegt, auf der zu jeder Vorgabe ein von Barkeepern und ein von ChatGPT entwickelter Cocktail steht. Zur Vorgabe „fruchtiger Frozen Drink“ entstanden der Mango-rad-a der Barkeeper und GPT's Island Bliss. Gäste konnten beide Getränke als halbe Portion bestellen und abstimmen; der Mango-rad-a, ein gefrorener Mango-Daiquiri mit Tamarinde und Tajín, gewann und blieb auf der Karte. Inhaber Adam Brackman berichtet, ChatGPT habe überwiegend Rezepturen ausschließlich aus Likören vorgeschlagen.",
      "quellen": [
        {
          "name": "instagram"
        },
        {
          "name": "foodandwine"
        }
      ],
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 31.41,
      "radius": 0.2772,
      "daten": "13. November 2023",
      "titelOriginal": "AI Cocktail Menu Generation"
    },
    {
      "id": "1156978",
      "titel": "Cal Poly: NSF-Studie zu den Folgen der Küchenrobotik",
      "beschreibung": "Eine auf vier Jahre angelegte Studie untersucht die sozialen und ethischen Folgen von KI und Kochautomatisierung. Die National Science Foundation fördert das Vorhaben an der Cal Poly mit 700.000 US-Dollar; die Leitung hat Patrick Lin, Philosophieprofessor und Direktor der Ethics + Emerging Sciences Group. Betrachtet werden Auswirkungen auf familiäre und gemeinschaftliche Beziehungen, Kreativität und Kultur, Wirtschaft, Gesundheit sowie Umwelt und Sicherheit — im Haushalt wie in der Gastronomie. Ergebnis soll ein öffentlicher Bericht zur gesellschaftlichen Wirkung sein.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 74.47,
      "radius": 0.7137,
      "daten": "3. Juli 2023",
      "titelOriginal": "Social Impact of AI & Robotics on the World of Food"
    },
    {
      "id": "701948",
      "titel": "Caper: Einkaufswagen mit Warenerkennung und Bezahlung am Wagen",
      "beschreibung": "Ein Einkaufswagen erkennt eingelegte Artikel über Sensoren und einen Barcodeleser, führt einen virtuellen Warenkorb und wickelt die Zahlung am Wagen ab, sodass die Kasse entfällt. Ein Bildschirm führt zu Artikeln der Einkaufsliste und weist auf Angebote hin; die Filiale muss dafür nach Angaben des New Yorker Start-ups Caper nicht umgebaut werden. Caper gibt an, der Wagen erhöhe den durchschnittlichen Bonwert um 18 %. Im Einsatz war der Wagen zunächst in zwei Handelsketten, 150 weitere waren vorgesehen; eine Series-A-Runde über 8 Millionen Pfund führte Lux Capital an.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 68.02,
      "radius": 0.6317,
      "daten": "3. Oktober 2019",
      "titelOriginal": "AI grocery cart lets shoppers skip checkout lines"
    },
    {
      "id": "1064796",
      "titel": "Miso Robotics: Flippy, Robot on a Rail und CookRight Coffee",
      "beschreibung": "Miso Robotics baut Küchenautomaten für Restaurants: den Fritteusenroboter Flippy, den Prototyp Robot on a Rail mit zwei Armen für über ein Dutzend Frittiergerichte und das Brühüberwachungssystem CookRight Coffee. CookRight prüft Temperatur und Füllstand der Kaffeebehälter und ersetzt die manuelle Kontrolle; Panera Bread testet es als erste Fast-Casual-Kette und stützt damit sein Getränkeabo für 8,99 US-Dollar im Monat. Für CookRight nennt das Unternehmen einige hundert US-Dollar Monatsgebühr, für Flippy mehrere tausend. Das Lokal CaliExpress by Flippy in Pasadena dient als Schaufenster.",
      "sektor": "Handel & HoReCa",
      "ebene": "cluster",
      "groesse": "m",
      "winkel": 55.78,
      "radius": 0.4136,
      "daten": "29. Januar 2025",
      "titelOriginal": "Miso Restaurant Robotics"
    },
    {
      "id": "1144987",
      "titel": "KI in Menügestaltung und Rezeptentwicklung",
      "beschreibung": "Algorithmen werten Gästepräferenzen und Marktdaten aus und leiten daraus Änderungen an Speisekarten ab. Ein Sushi-Restaurant in Japan gestaltete seine Karte auf dieser Grundlage neu und verzeichnete anschließend eine um 10 % höhere Gästezufriedenheit. In der Rezeptentwicklung schlägt IBMs System Chef Watson Zutatenkombinationen vor, auf die Köche von sich aus kaum kämen; daraus entstanden in gehobenen Restaurants Gerichte wie ein Schokoladen-Burrito nach österreichischer Art und ein vietnamesischer Apfel-Kebab.",
      "sektor": "Handel & HoReCa",
      "ebene": "cluster",
      "groesse": "m",
      "winkel": 67.82,
      "radius": 0.2882,
      "daten": "14. Februar 2025",
      "titelOriginal": "AI in Menu Optimisation and Food Design"
    },
    {
      "id": "1474600",
      "titel": "Gather AI: Drohnen und Kameras für die Bestandsaufnahme im Lager",
      "beschreibung": "Gather AI wertet Bilder von Kameras an Staplern und von Drohnen aus und überträgt Bestandsdaten in Lagerverwaltungssysteme. Erfasst werden Barcodes, Chargennummern, Verfallsdaten und Stückzahlen, um Fehlbestände und falsch abgelegte Ware zu erkennen — auch in Kühl- und Tiefkühllagern. Die Technik beruht nach Angaben von Mitgründer Sankalp Arora nicht auf Sprachmodellen, sondern auf Bayes-Verfahren mit neuronalen Netzen. Das 2017 aus der Carnegie Mellon University hervorgegangene Unternehmen sammelte 40 Millionen US-Dollar in einer von Smith Point Capital geführten Series B ein.",
      "sektor": "Logistik & Distribution",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 82.05,
      "radius": 0.6138,
      "daten": "17. Februar 2026",
      "titelOriginal": "Gather AI, maker of ‘curious’ warehouse drones, lands $40M led by Keith Block’s firm"
    },
    {
      "id": "1054342",
      "titel": "Antuit.ai: KI-Absatzprognose und Bestandssteuerung für Konsumgüter",
      "beschreibung": "Antuit.ai bietet Absatzprognose, Auftragszusage und Bestandsoptimierung für Handel und Konsumgüterhersteller als Software as a Service an. Die Fachzeitschrift Food Logistics nahm das Unternehmen 2020 in ihre Liste FL100+ der führenden Software- und Technologieanbieter für die Lebensmittellieferkette auf. Hervorgehoben wurde die Lösung Intelligent Order Promising, die über echtzeitnahe Nachfrageerkennung die Lieferbereitschaft erhöhen und die Auftragsabwicklung an den Prioritäten wichtiger Kunden ausrichten soll.",
      "sektor": "Logistik & Distribution",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 85.74,
      "radius": 0.4356,
      "daten": "16. Dezember 2020",
      "titelOriginal": "Antuit.ai Named to Food Logistics Top Software Providers"
    },
    {
      "id": "1054347",
      "titel": "Lunchables Dunkables: Kinderzeichnungen gegen KI-Bilder",
      "beschreibung": "Die Kraft-Heinz-Marke Lunchables Dunkables stellt in einer Kampagne Zeichnungen von Kindern neben Bilder, die eine KI zur selben Vorgabe erzeugt hat. Die Aufgabe lautete, Mozza Sticks oder Pretzel Twists als etwas Fantastisches darzustellen; die KI-Ergebnisse blieben nach Angaben der Marke beim Essen, während Kinder Szenen wie Brezel-Ninjas gegen Erdnussbutter speiende Drachen entwarfen. Gezeigt werden beide Bilderreihen in Pop-up-Ausstellungen vor Museen in Los Angeles und Austin. Ein Wettbewerb sucht unter Kindern von fünf bis 13 Jahren einen „Head of Imagination“.",
      "sektor": "Verpackung",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 111.71,
      "radius": 0.4375,
      "daten": "12. März 2024",
      "titelOriginal": "Lunchables Dunkables pits AI against kids’ imaginations"
    },
    {
      "id": "1142368",
      "titel": "KI für Lebensmittelsicherheit und Ernährungssicherung",
      "beschreibung": "Mehrere Vorhaben verbinden KI mit Lebensmittelsicherheit und Ernährungssicherung. LLENA (AI) Health Solutions erstellt mit der Southern University personalisierte Speisepläne aus Blutzuckerwerten und Vorlieben — gegen Ernährungsarmut in afroamerikanischen Gemeinden. Der am 28. Februar 2020 veröffentlichte „Rome Call for Artificial Intelligence Ethics“, unterstützt von Microsoft und IBM, verlangt Transparenz und Verantwortung beim Entwurf von KI. Malaysias Wissenschaftsminister Adham Baba will Landwirte beim Einsatz von Internet der Dinge und KI zur Ernährungssicherung unterstützen.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "cluster",
      "groesse": "l",
      "winkel": 141.06,
      "radius": 0.6317,
      "daten": "11. Februar 2025",
      "titelOriginal": "AI Food Safety & Security"
    },
    {
      "id": "1054393",
      "titel": "KI-gestützte Rezeptentwicklung bei Mondelez",
      "beschreibung": "Eine auf maschinellem Lernen basierende Anwendung entwirft bei Mondelez International Rezepturen für Kekse und Backwaren. Lebensmitteltechnologen im Forschungszentrum in New Jersey geben Merkmale wie Vanilleintensität, Aroma und Anzahl der Schokostücke sowie Zutatenkosten und Nährwert vor; die Anwendung schlägt passende Rezepturen vor. Entwickelt wurde sie ab 2019 mit der Beratungsfirma Fourkind, später von Thoughtworks übernommen. Nach Unternehmensangaben erreichen Produkte Pilotversuche vier- bis fünfmal schneller; über 70 Projekte nutzten sie, darunter das glutenfreie Golden Oreo.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "cluster",
      "groesse": "m",
      "winkel": 152.29,
      "radius": 0.393,
      "daten": "26. Januar 2025",
      "titelOriginal": "Mondelez tweaks its Classic Oreo"
    },
    {
      "id": "1054341",
      "titel": "KI-Einsatzfelder in der Lebensmittel- und Getränkeindustrie",
      "beschreibung": "KI-Anwendungen in der Lebensmittel- und Getränkeindustrie konzentrieren sich auf Absatzprognose, Bestandsplanung, Lieferkette und Qualitätssortierung. Für den Markt wurde ausgehend von 3,07 Milliarden US-Dollar im Jahr 2020 ein jährliches Wachstum von 45,77 % erwartet. Händler werten wiederkehrende Käufe aus, um Bestände vorauszuplanen; Kundenstimmungen werden über natürliche Sprachverarbeitung aus Beiträgen in sozialen Medien abgeleitet. In der Verarbeitung übernehmen sensorbasierte optische Sortierverfahren das Trennen nach Größe und Farbe, etwa bei Kartoffeln und Tomaten.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 135.89,
      "radius": 0.2571,
      "daten": "18. Juli 2022",
      "titelOriginal": "AI revolutionizing the food and beverage industry"
    },
    {
      "id": "910268",
      "titel": "Robotergestützte Vertical Farms von MAIM Farms",
      "beschreibung": "MAIM Farms ist ein israelisches Agrartechnik-Unternehmen, das Robotik und maschinelles Lernen in Indoor-Vertical-Farms einsetzt. Die Roboter übernehmen Aussaat, Pflanzung, Beschnitt, Ernte und Entfernung, sodass menschliche Eingriffe im Bestand weitgehend entfallen; der Anbieter begründet das mit dem Kontaminationsrisiko und ungleichmäßiger Arbeitsqualität. Die Auswertung von Anbaudaten soll Entscheidungen zur Kultivierung einzelner Pflanzen in Echtzeit stützen. Nach eigenen Angaben richtet sich das Unternehmen über Israel hinaus auf die USA, Europa, die Golfstaaten und Asien aus.",
      "sektor": "Landwirtschaft",
      "ebene": "cluster",
      "groesse": "m",
      "winkel": 164.97,
      "radius": 0.6317,
      "daten": "22. Februar 2024",
      "titelOriginal": "AI Indoor Vertical Farming"
    },
    {
      "id": "989629",
      "titel": "Vet Vision AI: Kameras für das Wohlbefinden von Milchkühen",
      "beschreibung": "Der britische Händler Sainsbury's erprobt auf 30 Höfen seiner Dairy Development Group eine Kameraauswertung, die nicht nur Krankheiten früh erkennt, sondern misst, wann es einer Kuh gut geht. Entwickelt hat sie Vet Vision AI, eine Ausgründung der University of Nottingham; die Kameras liefern rund um die Uhr Bilder, aus denen Verhaltensmuster wie Liegezeiten ausgelesen werden. Das System schlägt Landwirten Maßnahmen vor, etwa Umbauten im Stall oder Kuhbürsten zur Stressminderung. Der 2007 gegründeten Gruppe gehören rund 170 Milchbetriebe an; eine Ausweitung ist vorgesehen.",
      "sektor": "Landwirtschaft",
      "ebene": "cluster",
      "groesse": "m",
      "winkel": 165.87,
      "radius": 0.465,
      "daten": "1. Juli 2024",
      "titelOriginal": "AI Veterinary Technology"
    },
    {
      "id": "1054060",
      "titel": "Nuvilab AI Food Scanner für Tellerreste",
      "beschreibung": "Der AI Food Scanner des Anbieters Nuvilab erfasst Speisereste berührungslos und ohne Wägung. Gemessen wird vor und nach der Mahlzeit, sodass sich Tellerreste und Küchenabfälle getrennt erfassen lassen; angeboten werden eine Variante für einzelne Tabletts und eine für Großküchen. Aus den Daten leitet das System Menüvorschläge und ernährungsbezogene Auswertungen ab, gebündelt in den Modulen Diet Manager, Footprint Manager und Inventory Manager. Version 3.0 wurde auf der CES 2024 vorgestellt.",
      "quellen": [
        {
          "name": "nuvilab"
        },
        {
          "name": "prnewswire"
        }
      ],
      "sektor": "Abfallströme",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 15.49,
      "radius": 0.629,
      "daten": "23. November 2023",
      "titelOriginal": "AI Food Scanners"
    },
    {
      "id": "874287",
      "titel": "KI gegen Lebensmittelverschwendung",
      "beschreibung": "KI und Datenanalyse werden eingesetzt, um Lieferketten auf geringere Verluste auszulegen: Nachfrage vorhersagen, Mindesthaltbarkeiten verfolgen, Distribution steuern und Bestände genauer führen. Die Verluste sinken damit an mehreren Stufen der Kette statt nur am Regal. Ergänzend dient Blockchain dazu, Herkunft nachvollziehbar zu machen, Landwirte fair zu vergüten und CO₂-Bilanzen zu messen.",
      "sektor": "Abfallströme",
      "ebene": "cluster",
      "groesse": "m",
      "winkel": 6.97,
      "radius": 0.4093,
      "daten": "20. Oktober 2023",
      "titelOriginal": "AI Food Waste Reduction"
    },
    {
      "id": "1054057",
      "titel": "TRAYS — Bordverpflegungsplanung bei KLM",
      "beschreibung": "Die Fluggesellschaft KLM plant die Zahl der an Bord geladenen Mahlzeiten anhand einer Vorhersage der tatsächlich erscheinenden Fluggäste. Je nach Klasse treten 3 bis 5 % der gebuchten Passagiere die Reise nicht oder nicht rechtzeitig an. Das System TRAYS beginnt 17 Tage vor Abflug mit Prognosen und verfeinert sie bis 20 Minuten vor dem Start. KLM gibt an, damit bis zu 63 % weniger Lebensmittelverschwendung zu erreichen und jährlich 111.000 Kilogramm Bordverpflegung einzusparen; auf Interkontinentalflügen ab Schiphol werden 2,5 Mahlzeiten je Flug weniger entsorgt.",
      "sektor": "Abfallströme",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 15.07,
      "radius": 0.2279,
      "daten": "11. Februar 2024",
      "titelOriginal": "KLM uses AI to reduce inflight food waste"
    },
    {
      "id": "1148763",
      "titel": "Anova Precision Oven 2.0 mit Garraumkamera",
      "beschreibung": "Der Kombidämpfer Anova Precision Oven 2.0 verbindet eine Garraumkamera mit einer KI-Funktionssammlung namens Anova Intelligence. Nach Herstellerangaben erkennt das Gerät Zutaten im Garraum, schlägt Garverfahren vor, liest Angaben auf Fertigproduktverpackungen aus und rechnet Rezepte auf die eigenen Einstellungen um. Angekündigt sind Garpunkterkennung über die Kamera, automatische Abschaltung und Reinigungshinweise. Drei Temperatursensoren sollen Temperatur- und Dampfführung verbessern. Das Gerät kostet 1.199 US-Dollar, das Doppelte des Einführungspreises der ersten Generation.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 30.76,
      "radius": 0.6101,
      "daten": "11. November 2024",
      "titelOriginal": "Helping of AI for Anova Precision Oven 2.0"
    },
    {
      "id": "1054063",
      "titel": "LLENA und Southern University gegen Lebensmittelwüsten",
      "beschreibung": "LLENA (AI) Health Solutions arbeitet seit Juni 2021 mit der Southern University in Baton Rouge, Louisiana, an Erhebungen zu Ernährungsunsicherheit, Lebensmittelwüsten und ernährungsbedingten Gesundheitsunterschieden bei Afroamerikanern. Das Vorhaben gehört zu einem vom US-Landwirtschaftsministerium geförderten Exzellenzzentrum für Ernährung und Gesundheit am Agricultural Research and Extension Center der Universität; die Leitung hat Fatemeh Malekian. Die Plattform stellt nach Anbieterangaben Mahlzeiten anhand des glykämischen Index zusammen und berücksichtigt Blutzucker und Blutdruck.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 41.09,
      "radius": 0.4627,
      "daten": "28. Juni 2021",
      "titelOriginal": "AI: LLENA Health Solutions Inc. tackles food deserts"
    },
    {
      "id": "1054098",
      "titel": "KI-Generatoren für Rezepte und Cocktails",
      "beschreibung": "Mehrere Anbieter erzeugen Rezepte für Speisen und Cocktails aus vorhandenen Zutaten. Die App Thirsty Bot liefert dazu ein Cocktailrezept samt Bild; Tastebuds von BrandMuscle erzeugt Cocktailrezepte und prüft sie zugleich auf werberechtliche Vorgaben. Avocados From Mexico brachte zur Super Bowl LVIII mit der Agentur 270B einen Guacamole-Generator heraus, der Vorschläge aus einem hochgeladenen Foto von Zutaten ableitet. Die Bar Axelrad in Houston stellte unter dem Namen „Humans vs. Machines“ Drinks des Barpersonals gegen Drinks von ChatGPT; Gäste stimmen ab, der Sieger bleibt auf der Karte.",
      "sektor": "Konsum",
      "ebene": "cluster",
      "groesse": "s",
      "winkel": 31.38,
      "radius": 0.2963,
      "daten": "24. Januar 2025",
      "titelOriginal": "AI Recipe Generation"
    },
    {
      "id": "1144990",
      "titel": "Immersive Gastronomie mit VR und AR",
      "beschreibung": "Restaurants sollen Virtual und Augmented Reality mit KI verbinden, um das Essen mit begleitenden Bildwelten zu unterlegen. Genannt werden virtuelle Rundgänge durch Weinberge zur Weinverkostung und thematisch gestaltete Menüerlebnisse. Belege für bereits umgesetzte Anwendungen enthält die Quelle nicht.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 67.92,
      "radius": 0.7177,
      "daten": "14. Februar 2025",
      "titelOriginal": "Immersive Dining"
    },
    {
      "id": "701943",
      "titel": "KI im Lebensmitteleinzelhandel — Wagen, Regal, Roboter",
      "beschreibung": "Im Lebensmitteleinzelhandel bündeln sich KI-Anwendungen an Einkaufswagen, Regal und Lager. Der Caper Cart trägt Kameras an vier Ecken, eine Waage und Sensoren, erfasst die eingelegten Waren und schlägt passende Artikel vor; die kanadische Kette Sobeys erprobt ihn. Amazon Go verzichtet mit Kameras und Sensoren ganz auf Kassen; Walmart lässt Roboter Regale auffüllen und Bestände scannen, beim britischen Händler Ocado kommissionieren Roboter die Kundenaufträge. Als wichtigste Einsatzfelder nennt die Beratung Itrex Group Kundenbetreuung, Qualitätskontrolle, Bestandsführung und Betrugserkennung.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 66.91,
      "radius": 0.6091,
      "daten": "17. Juni 2022",
      "titelOriginal": "The Future of Grocery Stores Lies with AI Technology"
    },
    {
      "id": "1054088",
      "titel": "Sprach-KI an der Drive-thru-Spur",
      "beschreibung": "An Drive-thru-Schaltern und am Telefon nehmen Sprachsysteme Bestellungen auf. White Castle rüstete mit SoundHound bis Ende 2024 über 100 Standorte aus; Torchy’s Tacos lässt von SoundHound sämtliche eingehenden Anrufe annehmen. Lee’s Famous Recipe Chicken in Ohio nutzt eine Lösung von Hi Auto auf Intel-Technik; Rally’s und Checkers erkennen mit einem Chatbot, ob Englisch oder Spanisch gesprochen wird, und schlagen Zusatzartikel vor. Valyant AI verbindet seine Sprachplattform mit dem kontaktlosen Bezahldienst Paerpay. McDonald’s setzte ein Vorhaben mit IBM nach Bestellfehlern aus.",
      "sektor": "Handel & HoReCa",
      "ebene": "cluster",
      "groesse": "m",
      "winkel": 68.25,
      "radius": 0.4473,
      "daten": "24. Januar 2025",
      "titelOriginal": "AI Drive-thru Ordering"
    },
    {
      "id": "1144971",
      "titel": "KI im Gästekontakt der Gastronomie",
      "beschreibung": "In Restaurants übernehmen KI-Systeme Reservierungen, Bestellannahme und Personalisierung. McDonald’s kaufte dafür das Sprachtechnik-Unternehmen Apprente und setzt dessen Technik an Drive-thru-Schaltern ein. Taco Bell personalisiert seine App gemeinsam mit Certona und spielt Menüvorschläge, Aktionen und Inhalte nach Vorlieben, Kaufverlauf und Standort aus; auch Chili’s und Sonic setzen Personalisierungstechnik ein. Die Plattform Brown Bacon AI unterstützt Servicekräfte mit Speise- und Getränkeempfehlungen, Betriebsanweisungen und Auskünften aus dem Mitarbeiterhandbuch.",
      "sektor": "Handel & HoReCa",
      "ebene": "cluster",
      "groesse": "m",
      "winkel": 68.95,
      "radius": 0.2633,
      "daten": "14. Februar 2025",
      "titelOriginal": "AI in Customer Service & Interaction"
    },
    {
      "id": "1148756",
      "titel": "Digitale Übertragung von Düften bei Osmo und NotCo",
      "beschreibung": "Das Unternehmen Osmo digitalisiert Gerüche und stellt sie an anderem Ort wieder her. Eine Probe wird per Gaschromatographie-Massenspektrometrie in ihre Moleküle zerlegt, bei festen Proben über die Luft um das Objekt herum; die Daten ergeben einen Punkt auf der firmeneigenen „Principal Odor Map“, die den Geruchseindruck einer Molekülkombination vorhersagt. Ein Formulierungsroboter mischt daraus die Nachbildung. Bei NotCo erzeugt ein generatives Modell Duft- und Aromaformeln aus einer sprachlichen Beschreibung und bildet Moleküle dafür als Token ab.",
      "sektor": "Logistik & Distribution",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 90.81,
      "radius": 0.7206,
      "daten": "6. November 2024",
      "titelOriginal": "Food ‘Teleportation’ - AI Is Finally Making Distributed Digital Food Replication a Reality"
    },
    {
      "id": "1241468",
      "titel": "Batterielose Funkmarken für Kühlkette und Haltbarkeit",
      "beschreibung": "Briefmarkengroße, batterielose Bluetooth-Marken sollen Temperatur und Standort von Paletten, Packungen und einzelnen Erzeugnissen fortlaufend melden. Steve Statler, Geschäftsführer und Mitgründer von AmbAI, beschreibt die heutige Rückverfolgung über Barcodes und einzelne Kontrollpunkte als lückenhaft. Aus der gemessenen Temperaturgeschichte ließen sich dynamische Haltbarkeitsdaten statt pauschaler Schätzungen ableiten. Die Marken gehören zu einer Entwicklung hin zur Serialisierung, bei der jedes Einzelprodukt einen digitalen Pass für Echtheit und Frische erhält.",
      "sektor": "Logistik & Distribution",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 97,
      "radius": 0.5555,
      "daten": "14. August 2025",
      "titelOriginal": "AI Could Help Keep Your Food Fresher"
    },
    {
      "id": "1054069",
      "titel": "SymphonyAI CINDE bei Good Food Holdings",
      "beschreibung": "Die kalifornische Handelsgruppe Good Food Holdings führt die Software CINDE von SymphonyAI in ihren fünf Ketten Bristol Farms, Lazy Acres Natural Market, Metropolitan Market, New Seasons Market und New Leaf Community Markets ein. Eingesetzt werden Module für Nachfrage-, Filial- und Regalauswertung sowie Sortimentssteuerung samt Stammdatenverwaltung, dazu Bedarfsprognose, Filialnachschub, Frische- und Küchensteuerung und verteilte Auftragsabwicklung. In einem Pilotversuch prüft der Händler CINDE Store Intelligence, das Regalzustände per Computer Vision in Echtzeit erfasst.",
      "sektor": "Logistik & Distribution",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 91.36,
      "radius": 0.465,
      "daten": "6. Juni 2024",
      "titelOriginal": "AI connected retail solutions"
    },
    {
      "id": "1062461",
      "titel": "Real Magic Creative Academy von Coca-Cola",
      "beschreibung": "Coca-Cola veranstaltete in der Konzernzentrale in Atlanta einen dreitägigen Workshop unter dem Namen „Real Magic Creative Academy“. Eingeladen waren Gestalter aus mehreren Ländern, die mit generativer KI und Material aus dem Markenarchiv des Unternehmens Bildarbeiten entwickelten. Pratik Thakar, beim Konzern für generative KI zuständig, ordnet das Format einem Vorgehen zu, neue Technik zunächst zu erproben und dann zu skalieren. Aus dem Umfeld der Veranstaltung gingen Auftragsarbeiten von 16 Gestaltern hervor.",
      "sektor": "Verpackung",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 117.78,
      "radius": 0.5478,
      "daten": "13. September 2023",
      "titelOriginal": "Coca-Cola Joins In On The AI Conversation"
    },
    {
      "id": "1054321",
      "titel": "Hennessy X.O mit generativ erzeugtem Dekor",
      "beschreibung": "Für eine limitierte Auflage des Cognacs Hennessy X.O erzeugen Algorithmen zufällige Kompositionen, die ein Roboterarm auf die Karaffen aufträgt. Entwickelt wurde die Serie mit dem französischen Künstler Florian Zumbrunn und der Agentur OK C’EST COOL. In der Boutique der Marke in Cognac wählen Gäste über ein Tablet Farbpaletten und beeinflussen so das Ergebnis. Eine Karaffe kostet 1.200 Euro und enthält einen vom Künstler signierten Druck. Die Ausgabe gehört zu mehreren Künstlerkooperationen um den X.O im Jahr 2024.",
      "quellen": [
        {
          "name": "bottleraiders"
        }
      ],
      "sektor": "Verpackung",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 122.74,
      "radius": 0.4368,
      "daten": "19. Dezember 2024",
      "titelOriginal": "Generative Art Cognac Bottles"
    },
    {
      "id": "1062448",
      "titel": "KI-Plattformen für die Produktentwicklung",
      "beschreibung": "Dialogbasierte Anwendungen liefern der Lebensmittel- und Getränkeentwicklung Marktdaten auf Abfrage. FoodGPT von Ai Palette wertet Verbraucherdaten aus und gibt Auskunft über Markttrends, Produktauslobungen und aufkommende Zutaten. TasteGPT von Tastewise nennt als bei Millennials wachsende Desserts Mangonada, Basken-Käsekuchen, Snickerdoodle und Affogato sowie Auslobungen wie regionale Erzeugung, Natürlichkeit und Nachhaltigkeit. Menucast von Datassential sagt nach Anbieterangaben Lebensmittel- und Geschmackstrends mit 98 % Treffergenauigkeit voraus und ist seit 2018 im Einsatz.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "cluster",
      "groesse": "l",
      "winkel": 145.19,
      "radius": 0.5929,
      "daten": "27. Januar 2025",
      "titelOriginal": "AI Food Development Platforms"
    },
    {
      "id": "1054376",
      "titel": "AI-CONIC — Kaffee einer Helsinkier Rösterei",
      "beschreibung": "AI-CONIC ist ein Kaffee einer Rösterei im Helsinkier Stadtteil Punavuori, die ihr Sortiment über einen eigenen Netzladen vertreibt. Neben AI-CONIC führt sie Sorten wie AINA, AINA Tumma, Espresso Inferno, Espresso Super und einen entkoffeinierten Kaffee zu Preisen ab etwa 7,50 US-Dollar. Zu jeder Charge weist die Rösterei Röster, Startzeit, Röstdauer und Gewicht aus. Worauf sich der Namensbestandteil AI bezieht, geht aus der Quelle nicht hervor.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "cluster",
      "groesse": "m",
      "winkel": 134.64,
      "radius": 0.4504,
      "daten": "26. Januar 2025",
      "titelOriginal": "AI-CONIC Coffee"
    },
    {
      "id": "1062465",
      "titel": "Coca-Cola 3000 Zero Sugar aus KI-gestützter Entwicklung",
      "beschreibung": "Coca-Cola 3000 Zero Sugar ist eine zeitlich begrenzte Sorte aus der Reihe Coca-Cola Creations. Für die Geschmacksrichtung wertete das Unternehmen Vorstellungen von Konsumenten aus aller Welt über die Zukunft aus — Gefühle, Wünsche, Farben und Aromen — und verband sie mit maschinellen Auswertungen. Auch die Verpackung entstand auf diesem Weg; sie zeigt Flüssigkeit in wechselnder Form. Ein Scan der Dose führt zu einem KI-Filter, der ein Bild des künftigen Selbst erzeugt. Verkauft wird die Sorte in ausgewählten Geschäften in Großbritannien.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "cluster",
      "groesse": "s",
      "winkel": 146.98,
      "radius": 0.1926,
      "daten": "22. September 2023",
      "titelOriginal": "Coca-Cola launches new flavour created by AI"
    },
    {
      "id": "874244",
      "titel": "Robotische Bestäubung von Kulturpflanzen",
      "beschreibung": "Kleine, wendige Roboter mit Bürsten oder ähnlichen Mechanismen übertragen Pollen von Blüte zu Blüte und sollen so den weltweiten Rückgang bestäubender Insekten ausgleichen. Die Geräte bewegen sich selbstständig durch die Bestände und sichern den Bestäubungsgrad, von dem Frucht- und Samenansatz abhängen. Die Entwicklung steht am Anfang: Forschungsgruppen und Anbieter arbeiten daran, technische Hürden zu überwinden und die Arbeitsleistung zu erhöhen.",
      "sektor": "Landwirtschaft",
      "ebene": "cluster",
      "groesse": "l",
      "winkel": 172.18,
      "radius": 0.5807,
      "daten": "20. Oktober 2023",
      "titelOriginal": "Robotic pollination"
    },
    {
      "id": "874243",
      "titel": "KI-gestützte Betriebsführung in der Landwirtschaft",
      "beschreibung": "Betriebsführungssysteme führen Wetterprognosen, Bodendaten, Bestandsüberwachung und Marktentwicklungen in einer Auswertung zusammen und leiten daraus Empfehlungen für den einzelnen Hof ab. KI und maschinelles Lernen werten die großen Datenmengen aus, die dabei anfallen. Landwirte nutzen die Ergebnisse für die Wahl der Kulturen, die Bewässerungsplanung und die Verteilung von Betriebsmitteln. Da datengestützte Entscheidungen in der Landwirtschaft an Gewicht gewinnen, sind solche Systeme bereits weit verbreitet.",
      "sektor": "Landwirtschaft",
      "ebene": "cluster",
      "groesse": "l",
      "winkel": 170.71,
      "radius": 0.419,
      "daten": "20. Oktober 2023",
      "titelOriginal": "AI Farm Management Systems"
    },
    {
      "id": "1140854",
      "titel": "FruitCast: KI-Prognose des Fruchtwachstums",
      "beschreibung": "Eine Prognoseanwendung für den Obstbau, die aus einer großen KI-gestützten Datenbank die Entwicklung des Fruchtwachstums vorhersagt. Betriebe sollen damit Margen und Arbeitskräftebedarf vor Saisonbeginn planen und ihren Abnehmern belastbar angeben können, welche Menge ein Bestand liefern wird. Die Finanzierung durch Agritech-Investoren reichte für den Start im Jahr 2024. Entwickelt wurde die Anwendung von Raymond Martin, Geschäftsführer ist Richard Williamson.",
      "quellen": [
        {
          "name": "fruitcast"
        },
        {
          "name": "hortidaily"
        }
      ],
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 177.2,
      "radius": 0.2583,
      "daten": "31. August 2023",
      "titelOriginal": "AI Forecasting Tools"
    },
    {
      "id": "1241471",
      "titel": "Mykotoxin-Erkennung per Hyperspektralbild und maschinellem Lernen",
      "beschreibung": "Ein zerstörungsfreies Prüfverfahren, das Getreidekörner und Nüsse hyperspektral aufnimmt und die Bilder von Algorithmen des maschinellen Lernens auf Schimmelpilzgifte auswerten lässt. Eine Gruppe um die University of South Australia legte dazu im August 2025 in der Zeitschrift Toxins eine Übersicht über mehr als 80 Studien zu Weizen, Mais, Mandeln, Erdnüssen und Pistazien vor. Die Trefferquoten liegen meist bei 90 bis 95 %, bislang vor allem unter Laborbedingungen; besonders zuverlässig wird Aflatoxin B1 erkannt. Laut FAO ist rund ein Viertel der Welternte von toxinbildenden Pilzen betroffen.",
      "sektor": "Herstellung & Verarbeitung",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 148.17,
      "radius": 0.7716,
      "daten": "15. August 2025",
      "titelOriginal": "AI Breakthrough Make Our Food Supply Safer"
    },
    {
      "id": "1181561",
      "titel": "Kinova Gen3: Roboterarm mit GPT-4 für die Küche",
      "beschreibung": "Ein Roboterarm mit sieben beweglichen Gelenken, der Kaffee ausschenkt und weitere Handgriffe in der Küche übernimmt. Robotikforscher der University of Edinburgh haben den Kinova Gen3 dafür mit GPT-4 sowie den quelloffenen Rahmenwerken Haystack und Vebra verbunden und um eine feinfühlige Motorik ergänzt. Der Arm erfasst Gegenstände und Hindernisse während der Bewegung und weicht ihnen aus, damit nichts verschüttet wird. Ausgelegt ist der Aufbau auf kontrollierte Umgebungen wie Küchen.",
      "quellen": [
        {
          "name": "ed.ac.uk"
        },
        {
          "name": "digitaltrends"
        }
      ],
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 35.61,
      "radius": 0.7572,
      "daten": "20. März 2025",
      "titelOriginal": "AI-Powered Robot Arms"
    },
    {
      "id": "1232993",
      "titel": "Wonvita: Küchengerät kompostiert Speisereste in acht Stunden",
      "beschreibung": "Ein Küchengerät, das Speisereste über zwei Enzympräparate zu Kompost verarbeitet: Ein Zersetzungsmittel spaltet Fette, Zucker und Proteine, ein Fermentationsmittel beschleunigt den mikrobiellen Abbau. Der Anbieter gibt an, ein Durchgang dauere acht Stunden gegenüber ein bis zwei Tagen bei vergleichbaren Geräten, und erfasse bis zu 95 % der im Haushalt anfallenden Reste. Kurzprogramme über zwei und vier Stunden verringern das Volumen um bis zu 90 %. Die Enzymmischung aus Amylase, Ligninase und Lipase erfülle die Vorgaben der US-Umweltbehörde EPA und die USDA-Richtlinien für Bio-Kompost.",
      "sektor": "Abfallströme",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 15.75,
      "radius": 0.7574,
      "daten": "6. August 2025",
      "titelOriginal": "Wonvita Food Waste Robot"
    },
    {
      "id": "1141345",
      "titel": "Huxley: KI und Augmented Reality im Indoor-Anbau",
      "beschreibung": "Ein Überwachungssystem für Innenraumkulturen, das maschinelles Lernen, Computer Vision und Augmented Reality verbindet. Infrarot- und RGB-Kameras nehmen die Pflanzen im Minutentakt auf; die Software erkennt Auffälligkeiten, gleicht sie mit Sensordaten zu Luft, Licht und Wasser ab und blendet über eine Datenbrille eine Maßnahme ein. Trainiert wird sie im überwachten Lernen mit Datensätzen akademischer Einrichtungen und durch erfahrene Gärtner. Gründer Ryan Hooks stellte Plant Vision 2016 vor; 22 Pilotprojekte in Cannabisbetrieben, Gewächshäusern und vertikalen Farmen waren vorbereitet.",
      "sektor": "Landwirtschaft",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 175.63,
      "radius": 0.1921,
      "daten": "5. Juni 2017",
      "titelOriginal": "AI That’s Smarter Than a Farmer"
    },
    {
      "id": "1148759",
      "titel": "Open Meals: Sushi als Datensatz drucken",
      "beschreibung": "Ein 3D-Lebensmitteldrucker, der Speisen aus übertragenen Datensätzen statt aus Pasten aufbaut. Open Meals aus Japan zeigte den Pixel Food Printer 2018 auf der SXSW in Austin: Ein in Tokio entworfenes Sushi wurde als Datensatz übermittelt und vor Ort gedruckt — nach Unternehmensangaben die erste Übertragung von Lebensmitteldaten. Ein Roboterarm stapelt Gel-Würfel von 5 Millimetern Kantenlänge, denen Nährwerte, Farbe, Textur und Geschmack nach Vorgabe zugesetzt werden; angestrebt ist 1 Millimeter. Geschmacklich blieb das Ergebnis weit vom Vorbild entfernt, das Gerät ist ein Prototyp.",
      "sektor": "Logistik & Distribution",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 93.35,
      "radius": 0.7222,
      "daten": "4. April 2018",
      "titelOriginal": "Teleported Sushi Has Big Implications for Digital Food"
    },
    {
      "id": "1054372",
      "titel": "wAIste: KI-Anwendung für die Steuerung von Abfallströmen",
      "beschreibung": "Eine Anwendung, die Daten aus verschiedenen Quellen auswertet, um künftige Abfallmengen vorherzusagen und Wege zu ihrer Verringerung vorzuschlagen. Algorithmen des maschinellen Lernens prognostizieren die Entwicklung des Abfallaufkommens und leiten daraus Verbesserungen für Sammlung und Recycling ab; zusätzlich überwacht die Anwendung die Einhaltung umweltrechtlicher Vorgaben. Adressiert sind Industriebetriebe und Kommunen. Als Entwickler wird OpenAI genannt.",
      "quellen": [
        {
          "name": "linkedin"
        },
        {
          "name": "softwareone"
        }
      ],
      "sektor": "Abfallströme",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 9.1,
      "radius": 0.5487,
      "daten": "8. August 2024",
      "titelOriginal": "AI-Powered Food Waste Solutions"
    },
    {
      "id": "1303096",
      "titel": "Figure 02: Humanoid räumt die Spülmaschine ein",
      "beschreibung": "Ein humanoider Roboter, der eine Spülmaschine selbstständig einräumt. Gesteuert wird er vom Vision-Language-Action-Modell Helix des Herstellers Figure, das die dafür nötige Feinkoordination gelernt hat: Der Roboter nimmt ein Glas mit einer Hand auf, dreht es in die richtige Lage, kommt mit ungeordnet abgestelltem Geschirr zurecht, fängt Fehlgriffe und Zusammenstöße ab und stapelt Teller geordnet. Figure verfolgt damit das Ziel, lernende Universalroboter im Haushalt einzusetzen.",
      "sektor": "Abfallströme",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 17.93,
      "radius": 0.5585,
      "daten": "4. September 2025",
      "titelOriginal": "Dishwasher-Loading Humanoids"
    },
    {
      "id": "1187346",
      "titel": "Essensvorschläge aus dem digitalen Arbeitsverhalten",
      "beschreibung": "Personalisierungssysteme, die Ernährungsvorschläge ohne aktive Eingaben ableiten. Ausgewertet werden Spuren des digitalen Arbeitsalltags — der Ton in der Kommunikation, das Tippverhalten und der Rhythmus der Arbeitsleistung —, um daraus zu schließen, ob eine Person angespannt, wach oder konzentriert ist; die Vorschläge für Mahlzeiten richten sich danach. Der Ansatz zählt zur Zero-UI-Personalisierung, bei der sich das System anpasst, ohne bedient zu werden.",
      "quellen": [
        {
          "name": "receptiviti.com",
          "url": "https://www.receptiviti.com/"
        },
        {
          "name": "grammarly.com",
          "url": "https://www.grammarly.com/tone"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 59.68,
      "radius": 0.7808,
      "daten": "12. Mai 2025",
      "titelOriginal": "Food AI Learns From Work Behavior"
    },
    {
      "id": "1200761",
      "titel": "My Healthy Food: personalisierte Ernährungsempfehlungen",
      "beschreibung": "Ein Ansatz, der Ernährungsempfehlungen auf den einzelnen Stoffwechsel zuschneidet statt auf Durchschnittswerte. Sergej Vdovitchenko, Unternehmensentwickler und Co-Lead Innovation bei My Healthy Food, begründet das in einem Interview mit foodRegio damit, dass einheitliche Diäten dem wissenschaftlichen Stand nicht mehr entsprechen und Konsumenten stärker auf eigene Wahrnehmung und eigenes Wohlbefinden achten; Ernährung sei dabei nur ein Faktor neben Bewegung, Schlaf und genetischer Veranlagung. Die Website von My Healthy Food ist inzwischen abgeschaltet.",
      "quellen": [
        {
          "name": "myhealthyfood.ai",
          "url": "https://www.myhealthyfood.ai/password"
        }
      ],
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 55.84,
      "radius": 0.7917,
      "daten": "23. Mai 2025",
      "titelOriginal": "Personalised Food Recommendations"
    },
    {
      "id": "1232991",
      "titel": "iKoffy EdiBot: tragbarer Drucker für essbare Motive",
      "beschreibung": "Ein handlicher Drucker, der essbare Tinte im Vierfarbdruck direkt auf Lebensmittel und saugfähige Oberflächen aufträgt — auf Milchschaum, Kekse, Kuchen, Zuckerguss und Schokolade ebenso wie auf Karten, Bänder und Servietten. Der Hersteller nennt eine Auflösung von 1200 dpi, eine Druckbreite von 23,3 Millimetern, eine Drucklänge bis 1,2 Meter und bis zu 30.000 Drucke je Kartusche. Die Tinte aus Glycerin, Wasser, Propylenglykol und FD&C-zugelassenen Farbstoffen enthält keine tierischen Bestandteile. Eine App erzeugt Motive per KI aus Stichworten; die Entwicklung begann im Juni 2024.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 40.81,
      "radius": 0.5938,
      "daten": "6. August 2025",
      "titelOriginal": "iKoffy EdiBot: the First AI Portable Full-Color Food Printer"
    },
    {
      "id": "1424414",
      "titel": "AirGo-Datenbrille mit KI-Kochassistenz",
      "beschreibung": "Eine Kochassistenz, die über eine Datenbrille läuft, per Sprachausgabe durch die Zubereitung leitet, Rückfragen beantwortet und Rezepte anpasst, sodass die Hände frei bleiben. Der Brillenhersteller Solos und die Deutsche Telekom haben die Anwendung als erstes gemeinsames Vorhaben für die Modellreihe AirGo entwickelt und auf der Digital X der Telekom in Köln gezeigt. Grundlage ist die offene Entwicklungsumgebung von Solos, über die auch Dritte eigene Anwendungen für die Brillen bauen können.",
      "sektor": "Konsum",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 32.6,
      "radius": 0.5991,
      "daten": "27. September 2025",
      "titelOriginal": "AI-Powered Cooking Apps"
    },
    {
      "id": "1384218",
      "titel": "Appetronix: Roboterküchen für Kantinen und Verkehrsknoten",
      "beschreibung": "Das Robotikunternehmen Appetronix hat insgesamt über zehn Millionen US-Dollar eingesammelt, davon sechs Millionen in einer Seed-Plus-Runde unter Führung von AlleyCorp und der Familie Grote. Damit sollen mehrere Roboterküchen-Konzepte in den Markt kommen, die auf stark frequentierte Standorte außerhalb der klassischen Gastronomie zielen: Flughäfen, Krankenhäuser, Universitäten, Bürotürme und Veranstaltungsorte.",
      "sektor": "Handel & HoReCa",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 64.87,
      "radius": 0.6032,
      "daten": "6. November 2025",
      "titelOriginal": "Appetronix Closes $10M+ in Total Seed Funding to Scale Robotic Kitchens Across Non-Commercial Foodservice Markets Led by AlleyCorp and the Grote Family Fueling Fast Expansion of Automated Food Concepts"
    }
  ]
}
