/* =====================================================================
   KLASSE 7  ·  alle Inhalte für Klasse 7
   ---------------------------------------------------------------------
   STAND 18.11.2026: Alle Units 1–5 (Themen G1–G15) haben Aufgaben.
   Themen ohne Aufgaben erscheinen im Startmenü nicht.
   Wie eine fertige Klasse aussieht: siehe klasse5.js und klasse-vorlage.js.
   ===================================================================== */

const K7 = neueKlasse(7);   // bitte nicht ändern

// 1) DIE WELT
K7.welt = {
  name: "Das Museum der Zeitreisen", emoji: "⏳",
  figur: "Professorin Tempora",
  intro: "Willkommen im Museum der Zeitreisen. Leider hat die Zeitmaschine einen Kurzschluss: Die Ausgangstür ist verriegelt " +
         "und der Code zum Neustart ist in vier Epochen verstreut. Ich bin Professorin Tempora und begleite euch über Funk. " +
         "Löst die Rätsel in allen vier Sälen – bevor das Museum öffnet und jemand merkt, was passiert ist.",
  raeume: [
    { name: "Saurier-Saal",     emoji: "🦖" },
    { name: "Ägypten-Saal",     emoji: "🏺" },
    { name: "Ritter-Saal",      emoji: "🏰" },
    { name: "Zukunfts-Labor",   emoji: "🤖" }
  ],
  zusatzraum: { name: "Zeitstrudel", emoji: "🌀", text: "Der Zeitstrudel zieht! Antwortet, bevor er euch in eine andere Epoche schleudert." },
  ausgang:    { name: "Zeitmaschine", emoji: "⏱️" },
  finaleBild: "bild/finale-7.jpg",   // Bild hinter der Tür, wenn die Mission geschafft ist (Format etwa 15:11)
  finale:     "Die Zeitmaschine springt an – und ihr landet pünktlich in der Gegenwart. Professorin Tempora: „Saubere Arbeit. Ich trage euch ins Gästebuch ein.“",
  gescheitert:"Zu spät – das Museum öffnet und der Hausmeister findet euch neben einer qualmenden Zeitmaschine. Neuer Versuch!",
  gescheitertTor: "Drei falsche Codes – die Zeitmaschine geht in den Notfallmodus. Neuer Versuch!",
  saetze: {
    start:            ["Der erste Saal ist offen. Tippt ihn an."],
    richtig:          ["Richtig.", "Sehr gut – das passt in jede Epoche.", "Korrekt!", "Stark.", "Genau so."],
    falsch:           ["Nicht ganz. Lest die Erklärung und versucht es noch einmal.", "Fast. Schaut euch die Regel genau an.", "Kein Problem – auch Zeitreisende verrechnen sich mal."],
    loesung:          ["Knifflig. Schaut euch die Lösung an, dann kommt eine neue Aufgabe."],
    raumGeschafft:    ["Saal geschafft! Jetzt noch der Zeitstrudel …", "Alle Teile gesammelt."],
    zusatzStart:      ["Achtung, Zeitstrudel! Schnell und genau antworten."],
    zusatzGeschafft:  ["Strudel gebändigt. Die Ziffer gehört euch."],
    zusatzGescheitert:["Der Strudel hat euch kurz erwischt. Eine der drei Ziffern stimmt."],
    zeitWarnung:      ["Beeilt euch, das Museum öffnet bald!"],
    torFalsch:        ["Die Zeitmaschine bleibt aus. Schaut auf die Lämpchen: Grün stimmt, Rot noch nicht."],
    zwilling:         ["Hier ist eine ähnliche Aufgabe."],
    torBereit:        ["Alle Säle geschafft! Gebt den Code an der Zeitmaschine ein."]
  }
};

// ---------- KARTE (Entdecker-Modus) ----------
// Die Karte ersetzt die Übersicht mit den Kacheln (Datei welt/karte.js, Aussehen: welt/stil-museum.js).
// So lest ihr die Zahlen: x = wie weit nach rechts (0 … 1600), y = wie weit nach unten (0 … 1000).
// Ein Saal braucht etwa 300 × 200 Platz. Der Punkt x/y ist die Mitte, der Eingang ist unten in der Mitte.
// Kleine Schritte ändern (z. B. 50) und danach im Browser ansehen: …/test/index.html?welt=7
K7.welt.karte = {
  stil: "museum",                          // Aussehen: Datei welt/stil-museum.js
  groesse: { b: 1600, h: 1000 },           // Größe der ganzen Karte. Klein lassen: kurze Wege!
  start:   { x: 800, y: 850 },             // hier steht die Spielfigur am Anfang (vor der Zeitmaschine)

  // Die vier Säle. Reihenfolge = Reihenfolge der Räume oben (Saurier-Saal zuerst).
  raeume: [
    { x: 300,  y: 310, schild: "Saurier-Saal" },
    { x: 1300, y: 310, schild: "Ägypten-Saal" },
    { x: 300,  y: 700, schild: "Ritter-Saal" },
    { x: 1300, y: 700, schild: "Zukunfts-Labor" }
  ],
  zusatzraum: { x: 800, y: 215, schild: "Zeitstrudel" },   // nur Kulisse, wird nach jedem Saal von selbst betreten
  tor:        { x: 800, y: 950 },                          // die Zeitmaschine unten

  // Figuren: höchstens 5. Keine hält auf, Antippen ist freiwillig.
  //   art: "begleiter" = Professorin Tempora (über Funk): eine fliegende Taschenuhr
  //   art: "regel"     = zeigt die Regelkarte des nächsten Saals
  //   art: "zeit"      = dreht seine „runde“ (Punkte [x, y]) und warnt, wenn die Zeit knapp wird
  //   art: "wort"      = zeigt ein Wort aus der Wörterhilfe („emoji“ = Bild, „trick“ = drehen, rollen oder huepfen)
  figuren: [
    { art: "begleiter" },
    { art: "regel", name: "Roboter-Guide", x: 670, y: 520 },
    { art: "zeit",  name: "Museumswärter", runde: [[930, 470], [1120, 470], [1120, 640], [930, 640]] },
    { art: "wort",  emoji: "🏺", name: "Sprechende Vase", trick: "drehen",  x: 540,  y: 850 },
    { art: "wort",  emoji: "🦕", name: "Saurier-Modell",  trick: "huepfen", x: 1080, y: 865 }
  ],

  // Orte, an denen Professorin Tempora einmal pro Mission etwas sagt, wenn die Spielfigur in die Nähe kommt.
  orte: [
    { x: 800, y: 340, radius: 120, text: "Der Zeitstrudel. Bitte nicht hineinfassen. Er meldet sich früh genug." },
    { x: 150, y: 520, radius: 120, text: "Hier hinten ist nur der Notausgang. Leider auch verriegelt." },
    { x: 800, y: 620, radius: 100, text: "Der rote Läufer führt zu allen Sälen. Praktisch, oder?" }
  ],

  // Texte der Karte. {name} wird durch den Namen des Saals ersetzt.
  // Steht hier eine Liste [ "…", "…" ], wird jedes Mal ein Satz ausgewählt.
  texte: {
    gesperrt:        "Dieser Saal ist noch verriegelt. Schafft zuerst den Saal mit dem Pfeil.",
    schonGeschafft:  "Diese Ziffer habt ihr schon. Weiter zum nächsten Saal.",
    torZu:           "Die Zeitmaschine startet erst, wenn alle vier Säle geschafft sind.",
    zusatz:          "Der Zeitstrudel öffnet sich nach jedem Saal von selbst.",
    zusatzReaktion:  ["Wusch …", "Die Zeiger drehen sich.", "Tick … tack … tick …"],
    jubel:           "Eine neue Ziffer. Sehr gut.",
    tipp:            "Als Nächstes: {name}. Folgt dem Pfeil.",
    tippTor:         "Alle Ziffern gefunden. Auf zur Zeitmaschine.",
    regelTitel:      "Infotafel: {name}",
    keineRegel:      "Zu diesem Saal habe ich keine Infotafel gespeichert.",
    waerterinFertig: "Alle Säle geschafft. Die Zeitmaschine wartet.",
    waechter:        "Das Museum öffnet bald. Beeilt euch.",
    waechterRuf:     ["Ist da jemand?", "Nanu, Besuch um diese Zeit?", "Hm. Wohl nur die Lüftung."],
    pollyGeschafft:  ["Die erste Ziffer. Guter Anfang.", "Zwei von vier. Halbzeit.", "Nur noch ein Saal.", "Alle vier. Auf zur Zeitmaschine!"],
    pollyWarten:     ["Die Zeit läuft. Weiter: {name}.", "Seid ihr noch da? Als Nächstes: {name}."],
    pollyZurueck:    ["Kein Problem. Gleich noch einmal.", "Kurz sammeln, dann wieder hinein."]
  }
};

// Bild der Begleitfigur oben links (Professorin Tempora). Nur die Formen, ohne <svg>-Hülle, Feld 120 × 130.
K7.welt.figurSvg =
  '<path d="M18 130 Q18 98 60 94 Q102 98 102 130 Z" fill="#f4f4f6" stroke="#000" stroke-width="4"/>' +
  '<path d="M48 96 L60 116 L72 96 Z" fill="#7a1f2b" stroke="#000" stroke-width="3"/>' +
  '<circle cx="60" cy="26" r="13" fill="#b9bfc9" stroke="#000" stroke-width="4"/>' +
  '<circle cx="60" cy="62" r="29" fill="#e8b98f" stroke="#000" stroke-width="4"/>' +
  '<path d="M31 62 Q30 32 60 32 Q90 32 89 62 Q80 44 60 44 Q40 44 31 62 Z" fill="#b9bfc9" stroke="#000" stroke-width="4"/>' +
  '<circle cx="48" cy="64" r="10" fill="#fff" fill-opacity="0.5" stroke="#000" stroke-width="3"/><circle cx="72" cy="64" r="10" fill="#fff" fill-opacity="0.5" stroke="#000" stroke-width="3"/>' +
  '<path d="M58 64 L62 64" stroke="#000" stroke-width="3"/>' +
  '<circle cx="48" cy="64" r="3" fill="#000"/><circle cx="72" cy="64" r="3" fill="#000"/>' +
  '<path d="M52 80 Q60 85 68 80" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round"/>' +
  '<circle cx="88" cy="112" r="10" fill="#d9b45a" stroke="#000" stroke-width="3"/><path d="M88 112 L88 106 M88 112 L92 114" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>';
// ---------- Ende KARTE ----------

// 2) DIE THEMEN (laut „Themenuebersicht“)
K7.themen = [
  { id: "7-G1",  klasse: 7, unit: 1, titel: "Die einfache Gegenwart", regel: "Simple present für Zustände (I like history) und Gewohnheiten (Tom goes to the library on Fridays). he/she/it: Verb + -s (crosses, watches). Verneinung: don’t/doesn’t + Grundform. Fragen: Do/Does + Person + Grundform? Kurzantwort: Yes, she does. / No, he doesn’t." },
  { id: "7-G2",  klasse: 7, unit: 1, titel: "Die einfache Vergangenheit", regel: "Regelmäßig: Verb + -ed (visit → visited). Unregelmäßig lernen: fight → fought, speak → spoke, fall → fell. Verneinung: didn’t + Grundform. Fragen: Did + Person + Grundform? Früher war es so (heute nicht mehr): used to + Grundform → My grandma used to work in a factory." },
  { id: "7-G3",  klasse: 7, unit: 2, titel: "Reflexivpronomen und each other", regel: "Mit sich selbst: myself, yourself, himself, herself, itself, ourselves, yourselves, themselves → Tom cut himself. Gegenseitig: each other → Tom and Emma help each other. Achtung: meet (sich treffen), feel (sich fühlen), remember (sich erinnern), relax (sich ausruhen) – im Englischen ohne -self!" },
  { id: "7-G4",  klasse: 7, unit: 2, titel: "Adjektive und Adverbien", regel: "Adjektiv: Wie ist jemand oder etwas? → The test was easy. Adverb: Wie macht jemand etwas? → She climbed slowly. Adjektiv + -ly (slow → slowly), -y → -ily (easy → easily), -le → -ly (terrible → terribly). Sonderfälle: good → well, fast → fast, hard → hard." },
  { id: "7-G5",  klasse: 7, unit: 2, titel: "Das Perfekt", regel: "have/has + 3. Form → I have tried rafting. Tom has fallen off his skateboard. Unregelmäßig lernen: fall – fell – fallen, ride – rode – ridden. just, already, never, ever stehen vor der 3. Form. Verneinung: haven’t/hasn’t … yet." },
  { id: "7-G6",  klasse: 7, unit: 3, titel: "Relativsätze mit Relativpronomen", regel: "Relativsätze beschreiben ein Nomen genauer. Personen: who (oder that) → the inventor who invented the telephone. Dinge und Tiere: which (oder that) → a wheel which is made of rubber. „Dessen/deren“: whose → the girl whose brother is a vet." },
  { id: "7-G7",  klasse: 7, unit: 3, titel: "Das Gerundium", regel: "Gerundium = Verb + -ing. Als Subjekt am Satzanfang → Hiking is fun. Nach enjoy, love, hate, like → I enjoy camping. Schreibung: swim → swimming, cycle → cycling." },
  { id: "7-G8",  klasse: 7, unit: 3, titel: "Die Zukunft mit will", regel: "Vorhersagen, Hoffnungen und Versprechen: will + Grundform → I think it will freeze tonight. I promise I’ll help you. Verneinung: won’t (= will not) → Tom won’t give up." },
  { id: "7-G9",  klasse: 7, unit: 3, titel: "Bedingungssätze Typ I", regel: "if + simple present, Hauptsatz: will + Grundform → If it is sunny, we’ll go cycling. Im if-Satz steht nie will. Steht der if-Satz hinten, fällt das Komma weg." },
  { id: "7-G10", klasse: 7, unit: 4, titel: "Bedingungssätze Typ II", regel: "Typ II (nur vorgestellt, unwahrscheinlich): if + simple past, Hauptsatz: would + Grundform → If I had more money, I would buy a caravan. If I were/was rich … Typ I (real möglich): if + simple present, will." },
  { id: "7-G11", klasse: 7, unit: 4, titel: "Steigerung und Vergleiche von Adjektiven", regel: "Kurze Adjektive: -er / the -est (smart → smarter → the smartest; healthy → healthier). Lange: more / the most (more expensive). Unregelmäßig: good – better – best, bad – worse – worst. Weniger: less … than / the least → The hostel is less expensive than the hotel." },
  { id: "7-G12", klasse: 7, unit: 4, titel: "Some und any", regel: "Bejaht: some, something, somebody, somewhere. Verneint und in Fragen: any, anything … Ohne not: no, nothing, nobody, nowhere → There is no milk. Angebote und Bitten: some → Would you like some tea?" },
  { id: "7-G13", klasse: 7, unit: 4, titel: "Simple present und present progressive", regel: "Simple present: regelmäßig/immer wieder (every day, usually, always, often) → Tom plays rugby on Mondays. Present progressive: gerade jetzt (now, at the moment, Look!, Listen!) → Look! Tom is playing rugby." },
  { id: "7-G14", klasse: 7, unit: 5, titel: "Possessivpronomen", regel: "Ohne Nomen danach: mine, yours, his, hers, ours, theirs → This towel is mine. Mit Nomen danach: my, your, his, her, our, their → This is my towel." },
  { id: "7-G15", klasse: 7, unit: 5, titel: "Modale Hilfsverben", regel: "can = können (dürfen) · can’t = nicht können · may = dürfen · may not / mustn’t = nicht dürfen (Verbot) · must = müssen · needn’t = nicht müssen, nicht nötig. Achtung: mustn’t ≠ needn’t!" }
];

// =====================================================================
// 4) WÖRTERHILFE: deutsche Bedeutung für erschließbare Wörter
//     Steht ein Wort hier, ist es in den Aufgaben gepunktet unterstrichen;
//     Antippen zeigt die Bedeutung. Mehrzahl-Formen erkennt das Spiel selbst.
//     Die Figuren auf der Museumskarte sagen beim Antippen eines dieser Wörter.
// =====================================================================
K7.woerterhilfe = [
  { en: "souvenir", de: "Souvenir" }, { en: "tunnel", de: "Tunnel" }, { en: "gas", de: "Gas" }, { en: "industry", de: "Industrie" },
  { en: "project", de: "Projekt" }, { en: "brochure", de: "Broschüre" }, { en: "presenter", de: "Präsentator/in" }, { en: "title", de: "Titel" },
  { en: "sport", de: "Sport" }, { en: "rafting", de: "Rafting" }, { en: "rugby", de: "Rugby" }, { en: "zip line", de: "Seilrutsche" },
  { en: "skateboard", de: "Skateboard" }, { en: "trick", de: "Trick" }, { en: "training", de: "Training" }, { en: "reporter", de: "Reporter/in" },
  { en: "ambulance", de: "Krankenwagen" }, { en: "operation", de: "Operation" }, { en: "medicine", de: "Medizin" }, { en: "bandage", de: "Bandage, Verband" },
  { en: "plaster", de: "Pflaster" }, { en: "police", de: "Polizei" }, { en: "camping", de: "Camping" }, { en: "pineapple", de: "Ananas" },
  { en: "museum", de: "Museum" }, { en: "telephone", de: "Telefon" }, { en: "metal", de: "Metall" }, { en: "plastic", de: "Plastik" },
  { en: "material", de: "Material" }, { en: "hostel", de: "Hostel, Herberge" }, { en: "caravan", de: "Wohnwagen" }, { en: "buffet", de: "Buffet" },
  { en: "insect", de: "Insekt" }, { en: "radio", de: "Radio" }, { en: "mechanic", de: "Mechaniker/in" }, { en: "milkshake", de: "Milchshake" },
  { en: "musical", de: "Musical" }, { en: "orchestra", de: "Orchester" }, { en: "guitar", de: "Gitarre" }, { en: "shampoo", de: "Shampoo" },
  { en: "kangaroo", de: "Känguru" }, { en: "tram", de: "Straßenbahn" }, { en: "ferry", de: "Fähre" }
];

// =====================================================================
// 3) DER SATZBAUKASTEN (Generator) – Wortschatz: Klasse 5–6 komplett + Klasse 7 bis zur Unit
// =====================================================================
const K7_PERSONEN = [
  // er: he/she/it · pron: für Kurzantworten · refl: Reflexivpronomen · falsch: typische falsche Formen · mehr: Mehrzahl (-selves)
  { text: "I",            er: false, pron: "I",    poss: "my",    kind: true, refl: "myself",     falsch: ["meself", "myselves"] },
  { text: "you",          er: false, pron: "you",  poss: "your",  kind: true, refl: "yourself",   falsch: ["youself", "yourselfs"] },
  { text: "we",           er: false, pron: "we",   poss: "our",   kind: true, refl: "ourselves",  falsch: ["ourself", "usselves"], mehr: true },
  { text: "they",         er: false, pron: "they", poss: "their", kind: true, refl: "themselves", falsch: ["theirselves", "themself"], mehr: true },
  { text: "my parents",   er: false, pron: "they", poss: "their",             refl: "themselves", falsch: ["theirselves", "themself"], mehr: true },
  { text: "my friends",   er: false, pron: "they", poss: "their", kind: true, refl: "themselves", falsch: ["theirselves", "themself"], mehr: true },
  { text: "Tom and Emma", er: false, pron: "they", poss: "their", kind: true, refl: "themselves", falsch: ["theirselves", "themself"], mehr: true },
  { text: "he",           er: true,  pron: "he",   poss: "his",   kind: true, refl: "himself",    falsch: ["hisself", "himselves"] },
  { text: "she",          er: true,  pron: "she",  poss: "her",   kind: true, refl: "herself",    falsch: ["sheself", "herselves"] },
  { text: "Tom",          er: true,  pron: "he",   poss: "his",   kind: true, refl: "himself",    falsch: ["hisself", "himselves"] },
  { text: "Emma",         er: true,  pron: "she",  poss: "her",   kind: true, refl: "herself",    falsch: ["sheself", "herselves"] },
  { text: "Ben",          er: true,  pron: "he",   poss: "his",   kind: true, refl: "himself",    falsch: ["hisself", "himselves"] },
  { text: "Lily",         er: true,  pron: "she",  poss: "her",   kind: true, refl: "herself",    falsch: ["sheself", "herselves"] },
  { text: "my brother",   er: true,  pron: "he",   poss: "his",   kind: true, refl: "himself",    falsch: ["hisself", "himselves"] },
  { text: "my sister",    er: true,  pron: "she",  poss: "her",   kind: true, refl: "herself",    falsch: ["sheself", "herselves"] },
  { text: "my grandma",   er: true,  pron: "she",  poss: "her",               refl: "herself",    falsch: ["sheself", "herselves"] },
  { text: "my uncle",     er: true,  pron: "he",   poss: "his",               refl: "himself",    falsch: ["hisself", "himselves"] }
];
K7.baukasten = {
  // ---------- Klasse 7, Unit 1 ----------
  "7-U1": {
    personen: K7_PERSONEN,
    // simple present (G1): Zustände und Gewohnheiten
    verben: [
      { grund: "live",  s: "lives",   rest: "in a tiny village",          zeit: [] },
      { grund: "like",  s: "likes",   rest: "history",                    zeit: [] },
      { grund: "love",  s: "loves",   rest: "old stories",                zeit: [] },
      { grund: "hate",  s: "hates",   rest: "noisy streets",              zeit: [] },
      { grund: "go",    s: "goes",    rest: "to the library",             zeit: ["on Fridays", "every week"] },
      { grund: "buy",   s: "buys",    rest: "bread at the baker's",       zeit: ["every morning"] },
      { grund: "walk",  s: "walks",   rest: "past the old mine",          zeit: ["every day"] },
      { grund: "take",  s: "takes",   rest: "public transport",           zeit: ["every day"] },
      { grund: "cross", s: "crosses", rest: "the street at the corner",   zeit: ["every morning"] },
      { grund: "learn", s: "learns",  rest: "about the Vikings",          zeit: ["in history lessons"] },
      { grund: "read",  s: "reads",   rest: "books about the past",       zeit: ["in the evening"] },
      { grund: "fall",  s: "falls",   rest: "asleep in front of the TV",  zeit: ["in the evening"] },
      { grund: "visit", s: "visits",  rest: "the newsagent's",            zeit: ["on Sundays"] },
      { grund: "watch", s: "watches", rest: "TV shows about history",     zeit: ["at the weekend"] }
    ],
    // simple past (G2)
    verbenPast: [
      { grund: "visit",  s: "visits",  past: "visited",  rest: "the old coal mine" },
      { grund: "cross",  s: "crosses", past: "crossed",  rest: "the old bridge" },
      { grund: "notice", s: "notices", past: "noticed",  rest: "a strange smell" },
      { grund: "cough",  s: "coughs",  past: "coughed",  rest: "all night", zeit: ["last week", "yesterday"] },
      { grund: "touch",  s: "touches", past: "touched",  rest: "the old stones" },
      { grund: "scream", s: "screams", past: "screamed", rest: "in the dark tunnel" },
      { grund: "call",   s: "calls",   past: "called",   rest: "{POSS} grandma" },
      { grund: "fight",  s: "fights",  past: "fought",   rest: "with {POSS} brother", unreg: true, falsch: ["fighted"], nurKind: true },
      { grund: "speak",  s: "speaks",  past: "spoke",    rest: "to the presenter",   unreg: true, falsch: ["speaked"] },
      { grund: "fall",   s: "falls",   past: "fell",     rest: "asleep on the bus",  unreg: true, falsch: ["falled"] },
      { grund: "take",   s: "takes",   past: "took",     rest: "the train to the city centre", unreg: true, falsch: ["taked"] },
      { grund: "go",     s: "goes",    past: "went",     rest: "to the library",     unreg: true, falsch: ["goed"] },
      { grund: "buy",    s: "buys",    past: "bought",   rest: "a souvenir",         unreg: true, falsch: ["buyed"] },
      { grund: "get",    s: "gets",    past: "got",      rest: "out of the tunnel",  unreg: true, falsch: ["getted"] },
      { grund: "see",    s: "sees",    past: "saw",      rest: "an old canary cage", unreg: true }
    ],
    zeitenPast: ["yesterday", "last week", "last summer", "last weekend", "two days ago"],
    // used to (G2): früher war das so. past = einfache Vergangenheit (für Umformen und Fehler)
    usedTo: [
      { sub: "My grandma",  e: "work",  past: "worked",  rest: "in a factory" },
      { sub: "Miners",      e: "take",  past: "took",    rest: "canaries into the mines" },
      { sub: "People",      e: "live",  past: "lived",   rest: "in tiny houses near the mine" },
      { sub: "My dad",      e: "play",  past: "played",  rest: "rugby" },
      { sub: "We",          e: "live",  past: "lived",   rest: "in a village" },
      { sub: "This town",   e: "be",    past: "was",     rest: "very noisy" },
      { sub: "Children",    e: "work",  past: "worked",  rest: "in the coal mines" },
      { sub: "I",           e: "be",    past: "was",     rest: "afraid of the dark" },
      { sub: "There",       e: "be",    past: "was",     rest: "a coal mine here" },
      { sub: "My uncle",    e: "have",  past: "had",     rest: "a pet shop in the city centre" }
    ],
    erklaerungen: {
      praesensalle: {
        aussage: {
          er:       "Simple present: Bei he, she, it (Tom, my grandma) bekommt das Verb ein -s (watch → watches, cross → crosses). Beispiel: {BEISPIEL}",
          nichtEr:  "Bei „{P}“ (I, you, we, they) bekommt das Verb kein -s. Beispiel: {BEISPIEL}",
          zuordnen: "He, she, it und eine Person → Verb mit -s: {S}. I, you, we, they → ohne -s: {GRUND}."
        },
        verneinung: {
          er:       "Bei he, she, it verneinst du mit doesn't + Grundform (ohne -s). Beispiel: {BEISPIEL}",
          nichtEr:  "Bei I, you, we, they verneinst du mit don't + Grundform. Beispiel: {BEISPIEL}",
          zuordnen: "I, you, we, they → don't. He, she, it und eine Person → doesn't."
        },
        frage: {
          er:       "Fragen mit he, she, it beginnen mit Does. Das Verb hat dann KEIN -s. Beispiel: {BEISPIEL}",
          nichtEr:  "Fragen mit I, you, we, they beginnen mit Do. Beispiel: {BEISPIEL}",
          zuordnen: "I, you, we, they → Do. He, she, it und eine Person → Does."
        },
        kurzJa:   "Kurzantwort mit Ja: Yes, + Person + do/does. Beispiel: {BEISPIEL}",
        kurzNein: "Kurzantwort mit Nein: No, + Person + don't/doesn't. Beispiel: {BEISPIEL}"
      },
      vergangenheitalle: {
        past: {
          reg:   "Regelmäßige Verben bekommen in der Vergangenheit -ed (bei -e nur -d; stop → stopped). Beispiel: {BEISPIEL}",
          unreg: "Dieses Verb ist unregelmäßig: Die Vergangenheitsform musst du lernen (fight → fought, speak → spoke). Beispiel: {BEISPIEL}",
          neg:   "Verneinung in der Vergangenheit: didn't + Grundform. Beispiel: {BEISPIEL}",
          zuordnenAussage: "Regelmäßige Verben bekommen -ed (visit → visited). Unregelmäßige Verben haben eine eigene Form (fall → fell, speak → spoke).",
          zuordnenNeg: "Richtig ist: didn't + Grundform. Nach didn't steht nie die Vergangenheitsform."
        },
        frage: {
          frage:    "Fragen in der Vergangenheit: Did + Person + Grundform. Beispiel: {BEISPIEL}",
          kurzJa:   "Kurzantwort mit Ja: Yes, + Person + did. Beispiel: {BEISPIEL}",
          kurzNein: "Kurzantwort mit Nein: No, + Person + didn't. Beispiel: {BEISPIEL}",
          zuordnen: "Richtig ist: Did + Person + Grundform. Nach Did steht nie die Vergangenheitsform."
        },
        usedto: {
          regel: "Etwas war früher so, ist es heute aber nicht mehr: used to + Grundform (nicht „use to“, keine -ed-Form danach). Beispiel: {BEISPIEL}"
        }
      }
    }
  },

  // ---------- Klasse 7, Unit 2 ----------
  "7-U2": {
    personen: K7_PERSONEN,
    // Reflexivpronomen (G3): {P} = Person, {R} = Reflexivpronomen, {POSS} = my/his …
    reflRahmen: [
      { t: "{P} cut {R} on a sharp rock." },
      { t: "{P} burnt {R} in the kitchen." },
      { t: "{P} enjoyed {R} at the activity centre." },
      { t: "{P} made {R} a sandwich." },
      { t: "{P} bought {R} a new skateboard." },
      { t: "{P} kept {R} safe on the zip line." },
      { t: "{P} looked after {R} very well." }
    ],
    // each other: A and B + Verb + each other. s = Verb mit -s (für „Tom helps Emma. Emma helps Tom.“)
    eachOther: [
      { a: "Tom",        b: "Emma",      e: "help",  s: "helps",  rest: "with the project" },
      { a: "Lily",       b: "Ben",       e: "text",  s: "texts",  rest: "every day" },
      { a: "my brother", b: "my sister", e: "call",  s: "calls",  rest: "every weekend" },
      { a: "Emma",       b: "Lily",      e: "know",  s: "knows",  rest: "very well" },
      { a: "Ben",        b: "Tom",       e: "like",  s: "likes",  rest: "" },
      { a: "the knight", b: "the king", e: "help", s: "helps", rest: "in the battle" },
      { a: "Emma",       b: "Tom",       e: "visit", s: "visits", rest: "every summer" },
      { a: "my mum",     b: "my dad",    e: "help",  s: "helps",  rest: "in the kitchen" },
      { a: "Lily",       b: "Emma",      e: "call",  s: "calls",  rest: "every evening" },
      { a: "Ben",        b: "Lily",      e: "text",  s: "texts",  rest: "after school" }
    ],
    // „Fallen“: im Deutschen mit „sich“, im Englischen OHNE Reflexivpronomen
    reflFallen: [
      { t: "We ___ at the station at eight o'clock.",   r: "met",      f: ["met ourselves", "met us"],         de: "sich treffen" },
      { t: "I ___ tired after the zip line.",             r: "felt",     f: ["felt myself", "felt me"],          de: "sich fühlen" },
      { t: "Do you ___ our trip to the coast?",           r: "remember", f: ["remember yourself", "remember you"], de: "sich erinnern" },
      { t: "Let's ___ after the rugby training.",         r: "relax",    f: ["relax ourselves", "relax us"],     de: "sich ausruhen" }
    ],
    // Adjektiv / Adverb (G4) – wie in Klasse 6, mit neuem Wortschatz. regel: ly, ily, le (terrible → terribly), unreg
    adjAdv: [
      { adj: "slow",       adv: "slowly",       regel: "ly" },  { adj: "loud",      adv: "loudly",      regel: "ly" },
      { adj: "safe",       adv: "safely",       regel: "ly" },  { adj: "patient",   adv: "patiently",   regel: "ly" },
      { adj: "quiet",      adv: "quietly",      regel: "ly" },  { adj: "careful",   adv: "carefully",   regel: "ly" },
      { adj: "dangerous",  adv: "dangerously",  regel: "ly" },  { adj: "sad",       adv: "sadly",       regel: "ly" },
      { adj: "bad",        adv: "badly",        regel: "ly" },  { adj: "nervous",   adv: "nervously",   regel: "ly" },
      { adj: "happy",      adv: "happily",      regel: "ily" }, { adj: "easy",      adv: "easily",      regel: "ily" },
      { adj: "terrible",   adv: "terribly",     regel: "le" },
      { adj: "good",       adv: "well",         regel: "unreg" }, { adj: "fast",    adv: "fast",        regel: "unreg" },
      { adj: "hard",       adv: "hard",         regel: "unreg" }
    ],
    advRahmen: [
      { t: "{P} climbed the rock ___.",                w: ["slow", "careful", "fast", "easy"] },
      { t: "{P} spoke ___ in the dark tunnel.",        w: ["quiet", "loud", "nervous"] },
      { t: "{P} waited ___ for the ambulance.",        w: ["patient", "nervous", "quiet"] },
      { t: "{P} played rugby very ___.",               w: ["good", "bad", "terrible"] },
      { t: "{P} crossed the street ___.",              w: ["careful", "safe", "slow", "fast", "dangerous"] },
      { t: "{P} sang ___ at the party.",               w: ["loud", "terrible", "good", "happy", "bad"] },
      { t: "{P} trained ___ every day.",               w: ["hard"] },
      { t: "{P} rode {POSS} skateboard ___.",          w: ["fast", "careful", "dangerous", "slow"] },
      { t: "{P} looked ___ at the old photos.",        w: ["sad", "happy"] },
      { t: "{P} finished the climbing wall ___.",      w: ["easy", "fast", "slow"] }
    ],
    adjRahmen: [
      { t: "{P} {WAS} very ___.",                      w: ["patient", "quiet", "nervous", "sad", "happy", "careful"] },
      { t: "That was a ___ accident.",                 w: ["terrible", "bad"] },
      { t: "Be ___ on the zip line!",                  w: ["careful", "quiet", "patient"] },
      { t: "The test was ___.",                        w: ["easy", "terrible", "bad"] },
      { t: "Rafting can be ___.",                      w: ["dangerous", "slow", "loud", "easy"] }
    ],
    // Perfekt (G5) – noch ohne since/for. typ: erledigt (just, already, not … yet) / erlebt (ever, never)
    verbenPerf: [
      { grund: "put",    s: "puts",    past: "put",      part: "put",      rest: "a plaster on the cut",   typ: "erledigt", unreg: true },
      { grund: "call",   s: "calls",   past: "called",   part: "called",   rest: "the ambulance",          typ: "erledigt" },
      { grund: "cool",   s: "cools",   past: "cooled",   part: "cooled",   rest: "the burn with water",    typ: "erledigt" },
      { grund: "finish", s: "finishes", past: "finished", part: "finished", rest: "{POSS} project",        typ: "erledigt", nurKind: true },
      { grund: "write",  s: "writes",  past: "wrote",    part: "written",  rest: "the brochure",           typ: "erledigt", unreg: true },
      { grund: "buy",    s: "buys",    past: "bought",   part: "bought",   rest: "the tickets",            typ: "erledigt", unreg: true },
      { grund: "read",   s: "reads",   past: "read",     part: "read",     rest: "the safety rules",       typ: "erledigt", unreg: true },
      { grund: "put",    s: "puts",    past: "put",      part: "put",      rest: "on {POSS} helmet",       typ: "erledigt", unreg: true, einzeln: true },
      { grund: "take",   s: "takes",   past: "took",     part: "taken",    rest: "{POSS} medicine",        typ: "erledigt", unreg: true, einzeln: true },
      { grund: "eat",    s: "eats",    past: "ate",      part: "eaten",    rest: "{POSS} lunch",           typ: "erledigt", unreg: true },
      { grund: "be",     s: "is",      past: "was",      part: "been",     rest: "to the coast",           typ: "erlebt",   unreg: true },
      { grund: "try",    s: "tries",   past: "tried",    part: "tried",    rest: "rafting",                typ: "erlebt" },
      { grund: "have",   s: "has",     past: "had",      part: "had",      rest: "an operation",           typ: "erlebt",   unreg: true },
      { grund: "break",  s: "breaks",  past: "broke",    part: "broken",   rest: "{POSS} arm",             typ: "erlebt",   unreg: true, einzeln: true },
      { grund: "fall",   s: "falls",   past: "fell",     part: "fallen",   rest: "off a skateboard",       typ: "erlebt",   unreg: true },
      { grund: "hold",   s: "holds",   past: "held",     part: "held",     rest: "a real sword",           typ: "erlebt",   unreg: true },
      { grund: "see",    s: "sees",    past: "saw",      part: "seen",     rest: "a knight in armour",     typ: "erlebt",   unreg: true },
      { grund: "climb",  s: "climbs",  past: "climbed",  part: "climbed",  rest: "a mountain",             typ: "erlebt" },
      { grund: "play",   s: "plays",   past: "played",   part: "played",   rest: "rugby",                  typ: "erlebt" },
      { grund: "ride",   s: "rides",   past: "rode",     part: "ridden",   rest: "a zip line",             typ: "erlebt",   unreg: true }
    ],
    erklaerungen: {
      reflexiv: {
        refl:  "Tut jemand etwas mit sich selbst, steht das Reflexivpronomen: myself, yourself, himself, herself, ourselves, themselves. Beispiel: {BEISPIEL}",
        each:  "Tun zwei (oder mehr) etwas gegenseitig, heißt es each other (einander). Beispiel: {BEISPIEL}",
        falle: "Achtung: Im Deutschen heißt es „{DE}“, im Englischen steht hier KEIN Reflexivpronomen. Beispiel: {BEISPIEL}",
        zuordnen: "Eine Person → -self (myself, himself, herself). Mehrere Personen → -selves (ourselves, themselves)."
      },
      adverb: {
        ly:    "Wie macht jemand etwas? Dann brauchst du ein Adverb: Adjektiv + -ly. Beispiel: {BEISPIEL}",
        ily:   "Wie macht jemand etwas? Dann brauchst du ein Adverb. Endet das Adjektiv auf -y, wird daraus -ily (easy → easily). Beispiel: {BEISPIEL}",
        le:    "Endet das Adjektiv auf -le, wird daraus -ly (terrible → terribly). Beispiel: {BEISPIEL}",
        unreg: "Sonderfälle beim Adverb: good → well, fast → fast, hard → hard (ohne -ly! hardly heißt „kaum“). Beispiel: {BEISPIEL}",
        adj:   "Wie ist jemand oder etwas? Nach be (is, was …) und vor einem Nomen steht das Adjektiv, ohne -ly. Beispiel: {BEISPIEL}",
        zuordnen: "Adjektive beschreiben eine Person oder Sache (slow, careful). Adverbien beschreiben, wie jemand etwas tut, sie enden meist auf -ly (slowly). Sonderfall: good → well."
      },
      perfekt: {
        reg:   "Perfekt: have/has + 3. Form. Bei he, she, it steht has. Regelmäßige Verben: 3. Form mit -ed (call → called). Beispiel: {BEISPIEL}",
        unreg: "Perfekt: have/has + 3. Form. Dieses Verb ist unregelmäßig, die 3. Form musst du lernen (fall – fell – fallen). Beispiel: {BEISPIEL}",
        neg:   "Verneinung im Perfekt: haven't/hasn't + 3. Form. „yet“ (noch nicht) steht am Satzende. Beispiel: {BEISPIEL}",
        zuordnen: "I, you, we, they und mehrere Personen → have. He, she, it und eine Person → has.",
        zuordnenSaetze: "Richtig ist: has (bei he, she, it) oder have + 3. Form. Nicht die 2. Form (took, fell) und nicht die Grundform."
      }
    }
  }
};

// =====================================================================
// 5) GENERATOREN: Welches Thema nutzt welchen Baukasten und welche Aufgaben-Art?
// =====================================================================
K7.generatoren = {
  "7-G1": { baukasten: "7-U1", art: "praesensalle" },
  "7-G2": { baukasten: "7-U1", art: "vergangenheitalle" },
  "7-G3": { baukasten: "7-U2", art: "reflexiv" },
  "7-G4": { baukasten: "7-U2", art: "adverb" },
  "7-G5": { baukasten: "7-U2", art: "perfekt" }
};

// =====================================================================
// 6) DIE AUFGABEN (handgeschriebener Pool)
// =====================================================================
K7.aufgaben = [
  // ---------- 7-G1  simple present ----------
  { thema: "7-G1", niveau: "gruen", form: "quiz", frage: "My grandma ___ in a tiny village near the coast.", optionen: ["lives", "live", "living"], loesung: "lives",
    erklaerung: "My grandma = she → Verb mit -s. Beispiel: My uncle works in a factory." },
  { thema: "7-G1", niveau: "gelb", form: "luecke", frage: "___ your brother ___ (take) public transport to school?", loesung: [["Does"], ["take"]],
    erklaerung: "Frage mit he/she: Does + Person + Grundform. Beispiel: Does Lily go to the library on Fridays?" },
  { thema: "7-G1", niveau: "gelb", form: "satzbau", loesung: ["We don't live in the city centre."],
    erklaerung: "Verneinung: don't + Grundform. Beispiel: My parents don't like noisy streets." },
  { thema: "7-G1", niveau: "rot", form: "fehler", satz: "Tom crosss the street at the corner every morning.", fehlerwort: "crosss", loesung: ["crosses"],
    erklaerung: "Nach -s, -sh, -ch, -x kommt -es: cross → crosses. Beispiel: My sister watches TV shows about history." },
  { thema: "7-G1", niveau: "rot", form: "umformen", frage: "Ask a question:  Ben reads books about the past.", loesung: ["Does Ben read books about the past?"],
    erklaerung: "Does + Person + Grundform? Beispiel: Does Emma like history?" },

  // ---------- 7-G2  simple past und used to ----------
  { thema: "7-G2", niveau: "gruen", form: "quiz", frage: "The Vikings ___ England more than 1,000 years ago.", optionen: ["invaded", "invade", "invadeed"], loesung: "invaded",
    erklaerung: "Regelmäßig: invade → invaded (bei -e nur -d). Beispiel: The miners noticed a strange smell." },
  { thema: "7-G2", niveau: "gruen", form: "quiz", frage: "In the past, children ___ work in coal mines.", optionen: ["used to", "use to", "were used"], loesung: "used to",
    erklaerung: "Früher war es so, heute nicht mehr: used to + Grundform. Beispiel: My grandma used to work in a factory." },
  { thema: "7-G2", niveau: "gelb", form: "luecke", frage: "The miner ___ (speak) to the canary in the dark tunnel.", loesung: ["spoke"],
    erklaerung: "speak ist unregelmäßig: speak – spoke. Beispiel: The presenter spoke about the Vikings." },
  { thema: "7-G2", niveau: "gelb", form: "satzbau", loesung: ["Did you go to the souvenir shop?"],
    erklaerung: "Did + Person + Grundform? Beispiel: Did Tom buy a souvenir?" },
  { thema: "7-G2", niveau: "rot", form: "fehler", satz: "My dad used to plays rugby every weekend.", fehlerwort: "plays", loesung: ["play"],
    erklaerung: "Nach used to steht die Grundform. Beispiel: We used to live in a village." },
  { thema: "7-G2", niveau: "rot", form: "umformen", frage: "Make it negative:  The miners fell asleep in the tunnel.", loesung: ["The miners didn't fall asleep in the tunnel."],
    erklaerung: "didn't + Grundform: fell → didn't fall. Beispiel: Emma didn't take the train." },

  // ---------- 7-G3  Reflexivpronomen und each other ----------
  { thema: "7-G3", niveau: "gruen", form: "quiz", frage: "Be careful with the knife, Ben! Don't cut ___!", optionen: ["yourself", "youself", "yourselfs"], loesung: "yourself",
    erklaerung: "you (eine Person) → yourself. Beispiel: I made myself a sandwich." },
  { thema: "7-G3", niveau: "gruen", form: "quiz", frage: "Emma and Lily ___ at the activity centre every Saturday.", optionen: ["meet", "meet themselves", "meet each others"], loesung: "meet",
    erklaerung: "„sich treffen“ heißt einfach meet – ohne themselves. Beispiel: We met at the station." },
  { thema: "7-G3", niveau: "gelb", form: "luecke", frage: "The children enjoyed ___ (they) at the camping trip.", loesung: ["themselves"],
    erklaerung: "they → themselves. Beispiel: My parents enjoyed themselves at the party." },
  { thema: "7-G3", niveau: "gelb", form: "satzbau", loesung: ["Tom and Lily help each other with their homework."],
    erklaerung: "Gegenseitig = each other. Beispiel: My brother and my sister call each other every weekend." },
  { thema: "7-G3", niveau: "rot", form: "fehler", satz: "My little brother cut hisself on a sharp rock.", fehlerwort: "hisself", loesung: ["himself"],
    erklaerung: "Es heißt himself (nicht hisself). Beispiel: Tom bought himself a skateboard." },
  { thema: "7-G3", niveau: "rot", form: "umformen", frage: "Use „each other“:  Emma likes Ben. Ben likes Emma.", loesung: ["Emma and Ben like each other.", "Ben and Emma like each other."],
    erklaerung: "Gegenseitig = each other. Beispiel: Lily and Ben text each other every day." },

  // ---------- 7-G4  Adjektive und Adverbien ----------
  { thema: "7-G4", niveau: "gruen", form: "quiz", frage: "The instructor explained the rules very ___.", optionen: ["patiently", "patient"], loesung: "patiently",
    erklaerung: "Wie erklärte er? → Adverb: patient → patiently. Beispiel: Tom waited patiently for the bus." },
  { thema: "7-G4", niveau: "gelb", form: "luecke", frage: "Our team played ___ (terrible) yesterday.", loesung: ["terribly"],
    erklaerung: "-le wird zu -ly: terrible → terribly. Beispiel: My sister sang terribly." },
  { thema: "7-G4", niveau: "gelb", form: "satzbau", loesung: ["The zip line was very dangerous."],
    erklaerung: "Nach be steht das Adjektiv. Beispiel: The test was easy." },
  { thema: "7-G4", niveau: "rot", form: "fehler", satz: "Lily climbed the rock very good.", fehlerwort: "good", loesung: ["well"],
    erklaerung: "Wie kletterte sie? → Adverb: good → well. Beispiel: Ben plays rugby well." },

  // ---------- 7-G5  Perfekt ----------
  { thema: "7-G5", niveau: "gruen", form: "quiz", frage: "Have you ever ___ a real knight?", optionen: ["seen", "saw", "see"], loesung: "seen",
    erklaerung: "Nach have/has steht die 3. Form: see – saw – seen. Beispiel: Tom has never seen a sword." },
  { thema: "7-G5", niveau: "gelb", form: "luecke", frage: "The operator ___ (just / call) the ambulance.", loesung: ["has just called"],
    erklaerung: "The operator = he/she → has + just + 3. Form. Beispiel: My mum has just put a plaster on the cut." },
  { thema: "7-G5", niveau: "gelb", form: "satzbau", loesung: ["My brother has never fallen off his skateboard."],
    erklaerung: "never steht zwischen has und der 3. Form. Beispiel: I have never had an operation." },
  { thema: "7-G5", niveau: "rot", form: "fehler", satz: "Have you ever rode a zip line?", fehlerwort: "rode", loesung: ["ridden"],
    erklaerung: "Nach have steht die 3. Form: ride – rode – ridden. Beispiel: Emma has ridden a zip line." },
  { thema: "7-G5", niveau: "rot", form: "umformen", frage: "Make it negative. Use „yet“:  Ben has already taken his medicine.", loesung: ["Ben hasn't taken his medicine yet."],
    erklaerung: "hasn't + 3. Form … yet. Beispiel: We haven't bought the tickets yet." }
];

// =====================================================================
// 7) ZUSATZFRAGEN für den Zusatzraum (Quiz mit 3 Antworten)
// =====================================================================
K7.zusatzfragen = [
  { thema: "7-G1", frage: "Which sentence is correct?", optionen: ["My uncle watches TV shows.", "My uncle watchs TV shows.", "My uncle watch TV shows."], loesung: "My uncle watches TV shows." },
  { thema: "7-G1", frage: "„Does Emma like history?“ – „Yes, …“", optionen: ["she does.", "she likes.", "she do."], loesung: "she does." },
  { thema: "7-G2", frage: "Which is the past of „fight“?", optionen: ["fought", "fighted", "fight"], loesung: "fought" },
  { thema: "7-G2", frage: "Which sentence is correct?", optionen: ["We used to live in a village.", "We use to live in a village.", "We used to lived in a village."], loesung: "We used to live in a village." },
  { thema: "7-G2", frage: "„Did you see the mine?“ – „No, …“", optionen: ["I didn't.", "I don't.", "I wasn't."], loesung: "I didn't." },
  { thema: "7-G3", frage: "They enjoyed …", optionen: ["themselves.", "theirselves.", "themself."], loesung: "themselves." },
  { thema: "7-G3", frage: "Which sentence is correct?", optionen: ["We met at the station.", "We met ourselves at the station.", "We met us at the station."], loesung: "We met at the station." },
  { thema: "7-G3", frage: "Ben and Lily text … every day.", optionen: ["each other", "each others", "themself"], loesung: "each other" },
  { thema: "7-G4", frage: "Which is the adverb of „terrible“?", optionen: ["terribly", "terriblely", "terrible"], loesung: "terribly" },
  { thema: "7-G4", frage: "Which sentence is correct?", optionen: ["She climbed the rock slowly.", "She climbed the rock slow.", "She slowly climbed the rock slow."], loesung: "She climbed the rock slowly." },
  { thema: "7-G5", frage: "Which is the 3rd form of „fall“?", optionen: ["fallen", "fell", "falled"], loesung: "fallen" },
  { thema: "7-G5", frage: "Which sentence is correct?", optionen: ["Tom has just called the ambulance.", "Tom have just called the ambulance.", "Tom has just call the ambulance."], loesung: "Tom has just called the ambulance." },
  { thema: "7-G5", frage: "„Has Emma tried rafting?“ – „No, …“", optionen: ["she hasn't.", "she didn't.", "she isn't."], loesung: "she hasn't." }
];


// =====================================================================
// 3b) SATZBAUKASTEN Unit 3–5
// =====================================================================
// Erklärungen zur Steigerung (wie in Klasse 6)
const K7_STEIGERUNG = {
  komp_kurz:  "Kurze Adjektive: + -er, danach than. Beispiel: {BEISPIEL}",
  komp_e:     "Endet das Adjektiv auf -e, kommt nur -r dazu (large → larger). Beispiel: {BEISPIEL}",
  komp_dopp:  "Kurzer Vokal + ein Konsonant am Ende: Der Konsonant wird verdoppelt (big → bigger). Beispiel: {BEISPIEL}",
  komp_y:     "Endet das Adjektiv auf -y, wird daraus -ier (heavy → heavier). Beispiel: {BEISPIEL}",
  komp_lang:  "Lange Adjektive (z. B. famous, expensive, beautiful) bekommen more davor, kein -er. Beispiel: {BEISPIEL}",
  komp_unreg: "Unregelmäßig: good → better, bad → worse. Beispiel: {BEISPIEL}",
  sup_kurz:   "Kurze Adjektive: the + Adjektiv + -est. Beispiel: {BEISPIEL}",
  sup_e:      "Endet das Adjektiv auf -e, kommt nur -st dazu (large → the largest). Beispiel: {BEISPIEL}",
  sup_dopp:   "Kurzer Vokal + ein Konsonant am Ende: Der Konsonant wird verdoppelt (big → the biggest). Beispiel: {BEISPIEL}",
  sup_y:      "Endet das Adjektiv auf -y, wird daraus -iest (heavy → the heaviest). Beispiel: {BEISPIEL}",
  sup_lang:   "Lange Adjektive (z. B. famous, expensive, beautiful) bekommen the most davor, kein -est. Beispiel: {BEISPIEL}",
  sup_unreg:  "Unregelmäßig: good → the best, bad → the worst. Beispiel: {BEISPIEL}",
  asas:       "Sind zwei Dinge gleich, sagst du as + Grundform + as (ohne -er). Beispiel: {BEISPIEL}",
  zuordnenKomp: "Kurze Adjektive: -er (tall → taller, big → bigger, heavy → heavier). Lange Adjektive: more (more expensive). Unregelmäßig: good → better, bad → worse.",
  zuordnenSup:  "Kurze Adjektive: -est (tall → tallest, big → biggest, heavy → heaviest). Lange Adjektive: most (most expensive). Unregelmäßig: good → best, bad → worst."
};

K7_PERSONEN.forEach(p => { p.be = p.text === "I" ? "am" : p.er ? "is" : "are"; });   // am/is/are für die Verlaufsform

Object.assign(K7.baukasten, {
  // ---------- Klasse 7, Unit 3 ----------
  "7-U3": {
    personen: K7_PERSONEN,
    // Relativsätze (G6): art = who / which / whose; r = alle richtigen Wörter; s1/s2 = zwei Sätze zum Verbinden
    relSaetze: [
      { art: "who",   t: "That's the inventor ___ invented the telephone.",      r: ["who", "that"],   s1: "That's the inventor.", s2: "He invented the telephone." },
      { art: "who",   t: "We met a girl ___ lives in a cottage near the lake.",   r: ["who", "that"],   s1: "We met a girl.",       s2: "She lives in a cottage near the lake." },
      { art: "who",   t: "I have a neighbour ___ can repair radios.",             r: ["who", "that"],   s1: "I have a neighbour.",  s2: "He can repair radios." },
      { art: "who",   t: "The soldier ___ won the battle became a leader.",       r: ["who", "that"], s1: "The soldier became a leader.", s2: "He won the battle." },
      { art: "who",   t: "Mary Anderson is the woman ___ invented the windscreen wiper.", r: ["who", "that"], s1: "Mary Anderson is the woman.", s2: "She invented the windscreen wiper." },
      { art: "who",   t: "The mechanic ___ repaired our car was very friendly.",  r: ["who", "that"], s1: "The mechanic was very friendly.", s2: "He repaired our car." },
      { art: "which", t: "This is the wheel ___ is made of rubber.",               r: ["which", "that"], s1: "This is the wheel.",   s2: "It is made of rubber." },
      { art: "which", t: "We stayed at a campsite ___ was next to a lake.",        r: ["which", "that"], s1: "We stayed at a campsite.", s2: "It was next to a lake." },
      { art: "which", t: "I bought a trolley suitcase ___ has four wheels.",       r: ["which", "that"], s1: "I bought a trolley suitcase.", s2: "It has four wheels." },
      { art: "which", t: "The steam engine is an invention ___ changed the world.", r: ["which", "that"], s1: "The steam engine is an invention.", s2: "It changed the world." },
      { art: "which", t: "Look at the spider ___ made this huge web!",             r: ["which", "that"] },
      { art: "which", t: "There is a wind farm ___ makes clean electricity near our village.", r: ["which", "that"] },
      { art: "whose", t: "That's the girl ___ brother is a vet.",                  r: ["whose"],         s1: "That's the girl.",     s2: "Her brother is a vet." },
      { art: "whose", t: "Bell was an inventor ___ mother was deaf.",              r: ["whose"],         s1: "Bell was an inventor.", s2: "His mother was deaf." },
      { art: "whose", t: "I know a boy ___ dad is a mechanic.",                    r: ["whose"],         s1: "I know a boy.",        s2: "His dad is a mechanic." },
      { art: "whose", t: "This is the man ___ caravan is in our garden.",          r: ["whose"],         s1: "This is the man.", s2: "His caravan is in our garden." }
    ],
    relPersonen: ["the inventor", "the queen", "the soldier", "the vet", "the mechanic", "the leader", "my neighbour"],
    relDinge:    ["the steam engine", "the light bulb", "the tyre", "the radio", "the caravan", "the wind turbine", "the telephone"],
    // Gerundium (G7)
    aktivitaeten: [
      { e: "hike",  ing: "hiking",    s: "hikes",  rest: "" },
      { e: "cycle", ing: "cycling",   s: "cycles", rest: "" },
      { e: "walk",  ing: "walking",   s: "walks",  rest: "in the countryside" },
      { e: "camp",  ing: "camping",   s: "camps",  rest: "" },
      { e: "swim",  ing: "swimming",  s: "swims",  rest: "in the lake" },
      { e: "climb", ing: "climbing",  s: "climbs", rest: "" },
      { e: "sleep", ing: "sleeping",  s: "sleeps", rest: "in a caravan" },
      { e: "stay",  ing: "staying",   s: "stays",  rest: "in a hostel" },
      { e: "invent", ing: "inventing", s: "invents", rest: "new things" },
      { e: "repair", ing: "repairing", s: "repairs", rest: "old radios" },
      { e: "read",  ing: "reading",   s: "reads",  rest: "about inventors" }
    ],
    gerundVerben: [ { e: "enjoy", s: "enjoys" }, { e: "love", s: "loves" }, { e: "hate", s: "hates" }, { e: "like", s: "likes" } ],
    gerundSubjekt: [ { t: "is fun" }, { t: "is great" }, { t: "is a lot of fun" }, { t: "is good for you" }, { t: "is not easy" } ],
    // will (G8): Vorhersagen, Hoffnungen, Versprechen; neg = won't
    willSaetze: [
      { pre: "I think",   sub: "it",           e: "freeze", r: "tonight" },
      { pre: "I'm sure",  sub: "you",          e: "like",   r: "the hostel" },
      { pre: "Maybe",     sub: "we",           e: "see",    r: "some wild animals on our hiking trip" },
      { pre: "I hope",    sub: "the campsite", e: "be",     r: "nice" },
      { pre: "I promise", sub: "I",            e: "help",   r: "you with the project" },
      { pre: "I think",   sub: "people",       e: "use",    r: "more wind turbines in the future" },
      { pre: "Maybe",     sub: "the inventor", e: "become", r: "rich" },
      { pre: "I hope",    sub: "our army",     e: "win",    r: "the battle" },
      { pre: "I'm sure",  sub: "Tom",          e: "give",   r: "up", neg: true },
      { pre: "I think",   sub: "the monster",  e: "come",   r: "back", neg: true },
      { pre: "I'm sure",  sub: "you",          e: "get",    r: "cold in the caravan", neg: true },
      { pre: "I promise", sub: "I",            e: "forget", r: "your birthday", neg: true }
    ],
    // if-Sätze Typ I (G9)
    ifSaetze: [
      { w: "it {freezes} tonight",        grund: "freeze",  wf: "freeze",    s2: "we",  e: "sleep", ing: "sleeping", r2: "in the hostel" },
      { w: "you {book} the hostel now",   grund: "book",    wf: "books",     s2: "we",  e: "get",   ing: "getting",  r2: "a cheap room" },
      { w: "Lily {finds} a spider in her tent", wer: "Lily", grund: "find", wf: "find", s2: "she", e: "scream", ing: "screaming", r2: "" },
      { w: "we {go} hiking tomorrow",     grund: "go",      wf: "goes",      s2: "we",  e: "take",  ing: "taking",   r2: "sandwiches" },
      { w: "my bike {breaks}",            grund: "break",   wf: "break",     s2: "I",   e: "take",  ing: "taking",   r2: "it to the garage" },
      { w: "you {give} up",               grund: "give",    wf: "gives",     s2: "you", e: "lose",  ing: "losing",   r2: "the battle" },
      { w: "it {is} sunny",               grund: "be",      wf: "are",       s2: "we",  e: "go",    ing: "going",    r2: "cycling" },
      { w: "we {get} cold",               grund: "get",     wf: "gets",      s2: "we",  e: "make",  ing: "making",   r2: "a fire" },
      { w: "you {connect} the wire",      grund: "connect", wf: "connects",  s2: "it",  e: "work",  ing: "working",  r2: "again" },
      { w: "the campsite {is} full",      grund: "be",      wf: "are",       s2: "we",  e: "stay",  ing: "staying",  r2: "in a caravan" },
      { w: "you {eat} porridge for breakfast", grund: "eat", wf: "eats",     s2: "you", e: "feel",  ing: "feeling",  r2: "strong all day" },
      { w: "you {touch} the spider web",  grund: "touch",   wf: "touches",   s2: "the spider", e: "be", ing: "being", r2: "happy", neg: true }
    ],
    erklaerungen: {
      relativ: {
        who:   "Bei Personen steht who (oder that). Beispiel: {BEISPIEL}",
        which: "Bei Dingen und Tieren steht which (oder that). Beispiel: {BEISPIEL}",
        whose: "„Dessen/deren“ (wem gehört etwas?) heißt whose. Beispiel: {BEISPIEL}",
        zuordnen: "Personen → who. Dinge und Tiere → which. (that passt bei beiden.)"
      },
      gerund: {
        subjekt: "Steht eine Tätigkeit am Satzanfang als Subjekt, nimmst du die -ing-Form. Beispiel: {BEISPIEL}",
        verb:    "Nach {V} (und nach enjoy, love, hate, like) steht die -ing-Form. Beispiel: {BEISPIEL}",
        zuordnen: "Richtig ist die -ing-Form: als Subjekt (Hiking is fun.) und nach enjoy, love, hate, like (I enjoy hiking.)."
      },
      willvorhersage: {
        will:    "Vorhersagen, Hoffnungen und Versprechen (I think, I'm sure, maybe, I hope, I promise): will + Grundform. Beispiel: {BEISPIEL}",
        willNeg: "Verneinung: won't (= will not) + Grundform. Beispiel: {BEISPIEL}",
        zuordnen: "Richtig ist: will/won't + Grundform. Falsch: -s nach will oder to nach will."
      },
      ifsatz: {
        wenn:  "Im if-Satz steht das simple present (he/she/it mit -s) – nie will! Beispiel: {BEISPIEL}",
        haupt: "Im Hauptsatz steht will/'ll (oder won't) + Grundform. Beispiel: {BEISPIEL}",
        komma: "Steht der if-Satz vorne, kommt ein Komma. Steht er hinten, gibt es kein Komma. Beispiel: {BEISPIEL}",
        zuordnen: "Richtig: If + simple present, … will + Grundform. Falsch: will im if-Satz oder ein fehlendes -s bei he/she/it."
      }
    }
  },

  // ---------- Klasse 7, Unit 4 ----------
  "7-U4": {
    personen: K7_PERSONEN,
    // if-Sätze Typ II (G10). {…} = Verb im if-Satz (simple past), alt = weitere richtige Form (was/were), past2 = falsche Form nach would
    ifSaetze2: [
      { w: "I {had} more money",         grund: "have", wf: "have", s2: "I",    e: "buy",    past2: "bought",  r2: "a caravan" },
      { w: "I {were} the headteacher",   alt: "was", grund: "be", wf: "am", s2: "I", e: "change", past2: "changed", r2: "the school rules" },
      { w: "we {had} a time machine",    grund: "have", wf: "have", s2: "we",   e: "visit",  past2: "visited", r2: "the Vikings" },
      { w: "Tom {knew} the answer",      wer: "Tom", grund: "know", wf: "knows", s2: "he", e: "tell", past2: "told", r2: "us" },
      { w: "you {were} more confident",  grund: "be", wf: "are",  s2: "you",  e: "find",   past2: "found",   r2: "lots of new friends" },
      { w: "I {lived} in London",        grund: "live", wf: "live", s2: "I",    e: "go",     past2: "went",    r2: "to the theatre every week" },
      { w: "my sister {were} here",      wer: "my sister", alt: "was", grund: "be", wf: "is", s2: "she", e: "help", past2: "helped", r2: "me" },
      { w: "it {snowed} today",          grund: "snow", wf: "snows", s2: "we",  e: "build",  past2: "built",   r2: "a snowman" },
      { w: "I {found} a gold coin",      grund: "find", wf: "find", s2: "I",    e: "buy",    past2: "bought",  r2: "a milkshake for everybody" },
      { w: "I {were} a vet", alt: "was", grund: "be", wf: "am", s2: "I", e: "help", past2: "helped", r2: "all the animals" },
      { w: "we {lived} by the sea", grund: "live", wf: "live", s2: "we", e: "go", past2: "went", r2: "swimming every day" },
      { w: "the Titanic {had} more lifeboats", grund: "have", wf: "has", s2: "more people", e: "survive", past2: "survived", r2: "" }
    ],
    // if-Sätze Typ I – für die Gegenüberstellung mit Typ II
    ifSaetze: [
      { w: "it rains tomorrow",       s2: "we",  e: "stay",  ing: "staying", r2: "at home" },
      { w: "you post the letter today", s2: "it", e: "arrive", ing: "arriving", r2: "on Monday" },
      { w: "we run out of milk",      s2: "I",   e: "buy",   ing: "buying",  r2: "some more" },
      { w: "you go to the gym",       s2: "you", e: "feel",  ing: "feeling", r2: "fit" },
      { w: "it is foggy",             s2: "we",  e: "drive", ing: "driving", r2: "slowly" }
    ],
    // Umformen Typ I → Typ II
    ifTausch: [
      { von: "If I have time, I will help you.",        nach: ["If I had time, I would help you.", "If I had time, I'd help you."] },
      { von: "If we win, we will be very happy.",       nach: ["If we won, we would be very happy.", "If we won, we'd be very happy."] },
      { von: "If it is sunny, we will go to the beach.", nach: ["If it was sunny, we would go to the beach.", "If it were sunny, we would go to the beach.", "If it was sunny, we'd go to the beach.", "If it were sunny, we'd go to the beach."] },
      { von: "If you ask Emma, she will help you.",     nach: ["If you asked Emma, she would help you.", "If you asked Emma, she'd help you."] }
    ],
    // Steigerung (G11) – mit less / the least
    adjektive: [
      { adj: "tall",  komp: "taller",  sup: "tallest",  typ: "kurz" }, { adj: "old",   komp: "older",   sup: "oldest",   typ: "kurz" },
      { adj: "cheap", komp: "cheaper", sup: "cheapest", typ: "kurz" }, { adj: "smart", komp: "smarter", sup: "smartest", typ: "kurz" },
      { adj: "fast",  komp: "faster",  sup: "fastest",  typ: "kurz" }, { adj: "large", komp: "larger",  sup: "largest",  typ: "e" },
      { adj: "big",   komp: "bigger",  sup: "biggest",  typ: "dopp" }, { adj: "silly", komp: "sillier", sup: "silliest", typ: "y" },
      { adj: "lonely", komp: "lonelier", sup: "loneliest", typ: "y" }, { adj: "healthy", komp: "healthier", sup: "healthiest", typ: "y" },
      { adj: "expensive",   komp: "more expensive",   sup: "most expensive",   typ: "lang" },
      { adj: "comfortable", komp: "more comfortable", sup: "most comfortable", typ: "lang" },
      { adj: "spectacular", komp: "more spectacular", sup: "most spectacular", typ: "lang" },
      { adj: "useful",      komp: "more useful",      sup: "most useful",      typ: "lang" },
      { adj: "horrible",    komp: "more horrible",    sup: "most horrible",    typ: "lang" },
      { adj: "intelligent", komp: "more intelligent", sup: "most intelligent", typ: "lang" },
      { adj: "good",  komp: "better",  sup: "best",     typ: "unreg" }, { adj: "bad",  komp: "worse",   sup: "worst",    typ: "unreg" }
    ],
    vergleiche: [
      { a: "This mural",       b: "that mural",        w: ["spectacular", "big", "old", "large"] },
      { a: "The hostel",       b: "the hotel",         w: ["cheap", "comfortable", "expensive", "old"] },
      { a: "My niece",         b: "my nephew",         w: ["tall", "old", "smart", "silly", "intelligent"] },
      { a: "This milkshake",   b: "that lemonade",     w: ["healthy", "expensive", "good", "bad", "big"] },
      { a: "The Titanic",      b: "the other ships",   w: ["big", "large", "expensive"] },
      { a: "A tissue",         b: "a coin",            w: ["useful", "cheap"] },
      { a: "Mineral water",    b: "lemonade",          w: ["healthy", "cheap", "good"] },
      { a: "This brand",       b: "the special offer", w: ["expensive", "cheap", "good", "bad"] }
    ],
    superRahmen: [
      { a: "This mural",     n: "mural",  ort: "in the city",   w: ["spectacular", "big", "old", "large", "horrible"] },
      { a: "The Titanic",    n: "ship",   ort: "of its time",   w: ["big", "large", "expensive", "spectacular"] },
      { a: "My niece",       n: "girl",   ort: "in her class",  w: ["tall", "smart", "silly", "intelligent"] },
      { a: "This milkshake", n: "drink",  ort: "on the menu",   w: ["healthy", "expensive", "good", "bad"] },
      { a: "This hostel",    n: "place",  ort: "in town",       w: ["cheap", "comfortable", "expensive"] },
      { a: "That day",       n: "day",    ort: "of my life",    w: ["good", "bad", "lonely", "horrible"] }
    ],
    // some / any / no (G12)
    someRahmen: [
      { w: "", nur: "U", pos: "There is ___ {N} on the table.",     neg: "There isn't ___ {N} on the table.",     frage: "Is there ___ {N} on the table?", umformen: true },
      { w: "", nur: "C", pos: "There are ___ {N} in the cupboard.", neg: "There aren't ___ {N} in the cupboard.", frage: "Are there ___ {N} in the cupboard?", umformen: true },
      { w: "",           pos: "We need ___ {N} from the shop.",     neg: "We don't need ___ {N} from the shop.",  frage: "Do we need ___ {N} from the shop?", umformen: true },
      { w: "",           pos: "My mum bought ___ {N}.",             neg: "My mum didn't buy ___ {N}.",            frage: "Did your mum buy ___ {N}?" },
      { w: "thing",      pos: "I'd like to buy ___ for my niece.",  neg: "I don't want to buy ___ for my niece.", frage: "Do you want to buy ___ for your niece?" },
      { w: "body",       pos: "___ called you this morning.",       neg: "There isn't ___ at the door.",           frage: "Is ___ at home?" },
      { w: "where",      pos: "Let's go ___ quiet.",                neg: "I can't find my stamps ___.",           frage: "Have you seen my stamps ___?" }
    ],
    nomenU: ["jam", "honey", "milk", "ketchup", "lemonade", "juice", "mineral water", "sliced bread", "peanut butter"],
    nomenC: ["eggs", "tea bags", "tissues", "stamps", "coins", "raspberries", "jars of jam"],
    // no / nobody / nothing / nowhere: Satz mit klarem Hinweis
    noSaetze: [
      { t: "The fridge is empty. There is ___ milk.",                 r: ["no"],      f: ["any", "some"],         hinweis: "no / any / some" },
      { t: "I'm bored. There's ___ to do here.",                      r: ["nothing"], f: ["anything", "something"], hinweis: "nothing / anything" },
      { t: "Hello? … There's no answer. ___ is at home.",             r: ["Nobody"],  f: ["Anybody", "Somebody"], hinweis: "nobody / anybody" },
      { t: "All the hotels were full. There was ___ to sleep.",       r: ["nowhere"], f: ["anywhere", "somewhere"], hinweis: "nowhere / anywhere" },
      { t: "Sorry, we have ___ stamps left. Come back tomorrow.",     r: ["no"],      f: ["any", "some"],         hinweis: "no / any" }
    ],
    // some in Angeboten und Bitten
    angebote: [
      { t: "Would you like ___ tea?",                 r: ["some"], f: ["any", "no"] },
      { t: "Can I have ___ raspberry jam, please?",   r: ["some"], f: ["any", "no"] },
      { t: "Would you like ___ juice with your sandwich?", r: ["some"], f: ["any", "no"] }
    ],
    noTausch: [
      { wort: "no",      von: "There isn't any milk in the fridge.",    nach: ["There is no milk in the fridge.", "There's no milk in the fridge."] },
      { wort: "nothing", von: "I didn't buy anything at the shop.",     nach: ["I bought nothing at the shop."] },
      { wort: "nobody",  von: "There isn't anybody in the gym.",        nach: ["There is nobody in the gym.", "There's nobody in the gym."] },
      { wort: "no",      von: "We haven't got any tea bags.",           nach: ["We have got no tea bags.", "We've got no tea bags."] }
    ],
    // simple present ↔ present progressive (G13)
    verbenPP: [
      { e: "play",  s: "plays",   ing: "playing",  rest: "rugby" },
      { e: "read",  s: "reads",   ing: "reading",  rest: "a book" },
      { e: "cook",  s: "cooks",   ing: "cooking",  rest: "dinner" },
      { e: "walk",  s: "walks",   ing: "walking",  rest: "the dog" },
      { e: "post",  s: "posts",   ing: "posting",  rest: "a letter" },
      { e: "check", s: "checks",  ing: "checking", rest: "{POSS} e-mails" },
      { e: "drink", s: "drinks",  ing: "drinking", rest: "a milkshake" },
      { e: "go",    s: "goes",    ing: "going",    rest: "to the gym" },
      { e: "help",  s: "helps",   ing: "helping",  rest: "{POSS} niece" },
      { e: "make",  s: "makes",   ing: "making",   rest: "pancakes" },
      { e: "swim",  s: "swims",   ing: "swimming", rest: "in the lake" }
    ],
    signalGewohnheit: [
      { wort: "every day", pos: "ende" }, { wort: "on Mondays", pos: "ende" }, { wort: "every weekend", pos: "ende" },
      { wort: "usually", pos: "mitte" },  { wort: "always", pos: "mitte" },    { wort: "often", pos: "mitte" }
    ],
    signalJetzt: [
      { wort: "now", pos: "ende" }, { wort: "at the moment", pos: "ende" }, { wort: "Look!", pos: "anfang" }, { wort: "Listen!", pos: "anfang" }
    ],
    erklaerungen: {
      ifsatz2: {
        wenn:  "Typ II (nur vorgestellt): Im if-Satz steht das simple past (had, knew, were/was). Beispiel: {BEISPIEL}",
        haupt: "Typ II: Im Hauptsatz steht would ('d) + Grundform – ohne -ed! Beispiel: {BEISPIEL}",
        komma: "Steht der if-Satz vorne, kommt ein Komma. Steht er hinten, gibt es kein Komma. Beispiel: {BEISPIEL}",
        typ1:  "Typ I (real möglich): if + simple present, Hauptsatz mit will. Typ II (nur vorgestellt): if + simple past, Hauptsatz mit would. Beispiel: {BEISPIEL}",
        tausch: "Von Typ I zu Typ II: simple present → simple past (have → had), will → would. Beispiel: {BEISPIEL}",
        zuordnen: "Typ I: if + simple present, … will. Typ II: if + simple past, … would."
      },
      steigerungk7: Object.assign({}, K7_STEIGERUNG, {
        less: "Weniger: less + Adjektiv + than / the least + Adjektiv (die Grundform bleibt). Beispiel: {BEISPIEL}"
      }),
      someanyno: {
        pos:   "In bejahten Sätzen steht some (something, somebody, somewhere). Beispiel: {BEISPIEL}",
        neg:   "In verneinten Sätzen (not, n't) steht any (anything, anybody, anywhere). Beispiel: {BEISPIEL}",
        frage: "In Fragen steht any (anything, anybody, anywhere). Beispiel: {BEISPIEL}",
        no:    "„Kein/nichts/niemand/nirgends“ in einem Satz OHNE not: no, nothing, nobody, nowhere. Beispiel: {BEISPIEL}",
        angebot: "Bei Angeboten und Bitten (Would you like …? Can I have …?) steht some. Beispiel: {BEISPIEL}",
        zuordnen: "Bejahte Sätze → some … Verneinte Sätze und Fragen → any …"
      },
      presvsprog: {
        gewohnheit: "„{SIGNAL}“ zeigt: Das passiert regelmäßig → simple present (he/she/it mit -s). Beispiel: {BEISPIEL}",
        jetzt:      "„{SIGNAL}“ zeigt: Das passiert gerade jetzt → am/is/are + -ing. Beispiel: {BEISPIEL}",
        zuordnen:   "every day, usually, always, often, on Mondays → simple present. now, at the moment, Look!, Listen! → present progressive."
      }
    }
  },

  // ---------- Klasse 7, Unit 5 ----------
  "7-U5": {
    // Possessivpronomen (G14)
    besitzer: [
      { text: "I",    sub: "I",    det: "my",    pron: "mine" },   { text: "you",  sub: "you",  det: "your",  pron: "yours" },
      { text: "he",   sub: "he",   det: "his",   pron: "his" },    { text: "she",  sub: "she",  det: "her",   pron: "hers" },
      { text: "we",   sub: "we",   det: "our",   pron: "ours" },   { text: "they", sub: "they", det: "their", pron: "theirs" },
      { text: "Tom",  sub: "he",   det: "his",   pron: "his" },    { text: "Emma", sub: "she",  det: "her",   pron: "hers" },
      { text: "my exchange partner", sub: "she", det: "her", pron: "hers" },
      { text: "my parents", sub: "they", det: "their", pron: "theirs" }, { text: "Tom and Emma", sub: "they", det: "their", pron: "theirs" }
    ],
    dinge:  ["towel", "toothbrush", "comb", "hairbrush", "hairdryer", "mirror", "clarinet", "guitar", "ticket", "shampoo", "perfume", "shower gel"],
    farben: ["red", "blue", "green", "black", "yellow", "white"],
    // Modalverben (G15). bed = Bedeutung; r = richtige Wörter; f = falsche Auswahl; lang = weitere richtige Langformen
    // imp/um = Aufforderung → Satz mit Modalverb (für „Umformen“)
    modalSaetze: [
      { bed: "verbot",   t: "Museum rules: You ___ touch the paintings.",          r: ["mustn't", "may not"], lang: ["must not"], f: ["must", "needn't"],
        imp: "Don't touch the paintings!", um: ["You mustn't touch the paintings.", "You must not touch the paintings.", "You may not touch the paintings."] },
      { bed: "verbot",   t: "Tram rules: You ___ eat or drink on the tram.",       r: ["mustn't", "may not"], lang: ["must not"], f: ["must", "needn't"],
        imp: "Don't eat or drink on the tram!", um: ["You mustn't eat or drink on the tram.", "You must not eat or drink on the tram.", "You may not eat or drink on the tram."] },
      { bed: "verbot",   t: "School rules: You ___ use your mobile in class.",     r: ["mustn't", "may not"], lang: ["must not"], f: ["must", "needn't"],
        imp: "Don't use your mobile in class!", um: ["You mustn't use your mobile in class.", "You must not use your mobile in class.", "You may not use your mobile in class."] },
      { bed: "pflicht",  t: "Tram rules: You ___ buy a ticket before you get on.", r: ["must"], f: ["mustn't", "needn't"],
        imp: "Buy a ticket before you get on!", um: ["You must buy a ticket before you get on."] },
      { bed: "pflicht",  t: "Hostel rules: You ___ check in before ten o'clock.",  r: ["must"], f: ["mustn't", "needn't"],
        imp: "Check in before ten o'clock!", um: ["You must check in before ten o'clock."] },
      { bed: "pflicht",  t: "You ___ show your ticket to the driver.",             r: ["must"], f: ["mustn't", "needn't"],
        imp: "Show your ticket to the driver!", um: ["You must show your ticket to the driver."] },
      { bed: "unnoetig", t: "The museum is free. You ___ pay.",                    r: ["needn't"], lang: ["need not"], f: ["must", "mustn't"],
        imp: "The museum is free. It isn't necessary to pay.", um: ["You needn't pay.", "You need not pay.", "The museum is free. You needn't pay.", "The museum is free. You need not pay."] },
      { bed: "unnoetig", t: "The hostel has towels. You ___ bring your own towel.", r: ["needn't"], lang: ["need not"], f: ["must", "mustn't"],
        imp: "It isn't necessary to bring a towel.", um: ["You needn't bring a towel.", "You need not bring a towel."] },
      { bed: "unnoetig", t: "It's a bank holiday. We ___ get up early.",            r: ["needn't"], lang: ["need not"], f: ["must", "mustn't"] },
      { bed: "erlaubt",  t: "„___ I use your hairdryer?“ – „Yes, of course.“",      r: ["May", "Can"], f: ["Must", "Needn't"], keinFehler: true },   // keinFehler: „Must I …?“ wäre als Satz nicht eindeutig falsch
      { bed: "erlaubt",  t: "Teacher: „You ___ go home now. The lesson is over.“", r: ["may", "can"], f: ["mustn't", "needn't"] },
      { bed: "faehig",   t: "Lily ___ play the clarinet. She practises every day.", r: ["can"], f: ["mustn't", "needn't"] },
      { bed: "faehig",   t: "Kangaroos ___ jump very far.",                         r: ["can"], f: ["mustn't", "needn't"] },
      { bed: "nichtfaehig", t: "My grandpa ___ hear very well. He is a bit deaf.", r: ["can't"], lang: ["cannot", "can not"], f: ["mustn't", "needn't"] },
      { bed: "nichtfaehig", t: "I ___ swim. I have never learned it.",             r: ["can't"], lang: ["cannot", "can not"], f: ["mustn't", "needn't"] }
    ],
    erklaerungen: {
      posspron: {
        pron: "Steht KEIN Nomen dahinter, brauchst du das Possessivpronomen: mine, yours, his, hers, ours, theirs. Beispiel: {BEISPIEL}",
        det:  "Steht ein Nomen dahinter, brauchst du den Begleiter: my, your, his, her, our, their. Beispiel: {BEISPIEL}",
        zuordnen: "I → mine, you → yours, he → his, she → hers, we → ours, they → theirs."
      },
      modalk7: {
        verbot:      "Etwas ist verboten (nicht dürfen): mustn't oder may not. Beispiel: {BEISPIEL}",
        pflicht:     "Etwas muss man tun (müssen): must. Beispiel: {BEISPIEL}",
        unnoetig:    "Etwas ist nicht nötig (nicht müssen, nicht brauchen): needn't – nicht mustn't! Beispiel: {BEISPIEL}",
        erlaubt:     "Etwas ist erlaubt (dürfen): may oder can. Beispiel: {BEISPIEL}",
        faehig:      "Jemand kann etwas (Fähigkeit): can. Beispiel: {BEISPIEL}",
        nichtfaehig: "Jemand kann etwas nicht: can't. Beispiel: {BEISPIEL}",
        hinweis: { verbot: "nicht dürfen", pflicht: "müssen", unnoetig: "nicht müssen", erlaubt: "dürfen", faehig: "können", nichtfaehig: "nicht können" },
        zuordnen: "mustn't = Verbot (nicht dürfen). must = Pflicht (müssen). needn't = nicht nötig (nicht müssen)."
      }
    }
  }
});

Object.assign(K7.generatoren, {
  "7-G6":  { baukasten: "7-U3", art: "relativ" },
  "7-G7":  { baukasten: "7-U3", art: "gerund" },
  "7-G8":  { baukasten: "7-U3", art: "willvorhersage" },
  "7-G9":  { baukasten: "7-U3", art: "ifsatz" },
  "7-G10": { baukasten: "7-U4", art: "ifsatz2" },
  "7-G11": { baukasten: "7-U4", art: "steigerungk7" },
  "7-G12": { baukasten: "7-U4", art: "someanyno" },
  "7-G13": { baukasten: "7-U4", art: "presvsprog" },
  "7-G14": { baukasten: "7-U5", art: "posspron" },
  "7-G15": { baukasten: "7-U5", art: "modalk7" }
});

K7.aufgaben.push(
  { thema: "7-G6", niveau: "gruen", form: "quiz", frage: "The queen ___ lived in this castle was very rich.", optionen: ["who", "which", "whose"], loesung: "who",
    erklaerung: "Die Königin ist eine Person → who. Beispiel: That's the inventor who invented the telephone." },
  { thema: "7-G6", niveau: "gelb", form: "luecke", frage: "Graphite is a material ___ (who / which / whose) is used in pencils.", loesung: ["which", "that"],
    erklaerung: "Graphit ist ein Ding → which (oder that). Beispiel: This is a tyre which is made of rubber." },
  { thema: "7-G6", niveau: "rot", form: "fehler", satz: "I met a man who's son invented a new wheel.", fehlerwort: "who's", loesung: ["whose"],
    erklaerung: "„Dessen Sohn“ = whose son. who's heißt who is. Beispiel: That's the girl whose brother is a vet." },
  { thema: "7-G7", niveau: "gruen", form: "quiz", frage: "My grandparents love ___ in the countryside.", optionen: ["walking", "walk", "walks"], loesung: "walking",
    erklaerung: "Nach love steht die -ing-Form. Beispiel: I enjoy camping." },
  { thema: "7-G7", niveau: "gelb", form: "luecke", frage: "___ (swim) in a cold lake is not much fun.", loesung: ["Swimming", "swimming"],
    erklaerung: "Tätigkeit als Subjekt → -ing-Form (swim → swimming, m verdoppelt). Beispiel: Hiking is fun." },
  { thema: "7-G7", niveau: "rot", form: "fehler", satz: "Ben hates sleep in a tent when it rains.", fehlerwort: "sleep", loesung: ["sleeping"],
    erklaerung: "Nach hate steht die -ing-Form. Beispiel: Lily hates getting up early." },
  { thema: "7-G8", niveau: "gruen", form: "quiz", frage: "I'm sure you ___ love the porridge here.", optionen: ["will", "are", "to"], loesung: "will",
    erklaerung: "Vorhersage mit I'm sure → will + Grundform. Beispiel: I think it will freeze tonight." },
  { thema: "7-G8", niveau: "gelb", form: "luecke", frage: "Don't worry, I promise I ___ (not / tell) anybody.", loesung: ["won't tell", "will not tell"],
    erklaerung: "Versprechen mit won't + Grundform. Beispiel: I promise I won't forget your birthday." },
  { thema: "7-G9", niveau: "gruen", form: "quiz", frage: "If we ___ the hostel today, we'll get a cheap room.", optionen: ["book", "will book", "books"], loesung: "book",
    erklaerung: "Im if-Satz steht das simple present, nicht will. Beispiel: If it freezes tonight, we'll sleep in the hostel." },
  { thema: "7-G9", niveau: "rot", form: "fehler", satz: "If Ben finds the key, he'll opens the door.", fehlerwort: "opens", loesung: ["open"],
    erklaerung: "Nach will/'ll steht die Grundform ohne -s. Beispiel: If we get cold, we'll make a fire." },
  { thema: "7-G10", niveau: "gruen", form: "quiz", frage: "If I were rich, I ___ buy a big house by the sea.", optionen: ["would", "will", "am"], loesung: "would",
    erklaerung: "Typ II (nur vorgestellt): if + simple past, Hauptsatz mit would. Beispiel: If I had more money, I would buy a caravan." },
  { thema: "7-G10", niveau: "gelb", form: "luecke", frage: "If the crew ___ (see) the iceberg earlier, the Titanic ___ (not / sink).", loesung: [["saw"], ["wouldn't sink", "would not sink"]],
    erklaerung: "Typ II: simple past im if-Satz, would/wouldn't + Grundform im Hauptsatz. Beispiel: If I knew the answer, I would tell you." },
  { thema: "7-G11", niveau: "gruen", form: "quiz", frage: "Mineral water is ___ than lemonade.", optionen: ["healthier", "more healthy", "healthyer"], loesung: "healthier",
    erklaerung: "-y wird zu -ier: healthy → healthier. Beispiel: My niece is sillier than my nephew." },
  { thema: "7-G11", niveau: "gelb", form: "satzbau", loesung: ["The hostel is less expensive than the hotel."],
    erklaerung: "Weniger: less + Adjektiv + than. Beispiel: This brand is less expensive than the special offer." },
  { thema: "7-G12", niveau: "gruen", form: "quiz", frage: "Would you like ___ pancakes?", optionen: ["some", "any", "no"], loesung: "some",
    erklaerung: "Bei Angeboten (Would you like …?) steht some. Beispiel: Can I have some jam, please?" },
  { thema: "7-G12", niveau: "rot", form: "umformen", frage: "Use „nothing“:  We didn't find anything in the shipyard.", loesung: ["We found nothing in the shipyard."],
    erklaerung: "nothing steht ohne not: didn't find anything = found nothing. Beispiel: I bought nothing at the shop." },
  { thema: "7-G13", niveau: "gruen", form: "quiz", frage: "Listen! My sister ___ the clarinet.", optionen: ["is playing", "plays", "is play"], loesung: "is playing",
    erklaerung: "Listen! = gerade jetzt → is + -ing. Beispiel: Look! Tom is walking the dog." },
  { thema: "7-G13", niveau: "gelb", form: "luecke", frage: "We usually ___ (have) cereal for breakfast.", loesung: ["have"],
    erklaerung: "usually = regelmäßig → simple present. Beispiel: My dad always cooks dinner." },
  { thema: "7-G14", niveau: "gruen", form: "quiz", frage: "„Is this your toothbrush?“ – „No, it's ___. Mine is blue.“", optionen: ["hers", "her", "she"], loesung: "hers",
    erklaerung: "Ohne Nomen danach: hers. Beispiel: This towel is hers." },
  { thema: "7-G14", niveau: "rot", form: "fehler", satz: "This isn't my hairbrush. It's your.", fehlerwort: "your", loesung: ["yours"],
    erklaerung: "your steht nur vor einem Nomen. Ohne Nomen: yours. Beispiel: This comb is yours." },
  { thema: "7-G15", niveau: "gruen", form: "quiz", frage: "You ___ bring food. There's a buffet at the party.", optionen: ["needn't", "mustn't", "must"], loesung: "needn't",
    erklaerung: "Es ist nicht nötig → needn't. Beispiel: The museum is free. You needn't pay." },
  { thema: "7-G15", niveau: "rot", form: "fehler", satz: "You needn't cross the street when the light is red.", fehlerwort: "needn't", loesung: ["mustn't", "must not", "may not"],
    erklaerung: "Es ist verboten → mustn't. Beispiel: You mustn't touch the paintings." }
);

K7.zusatzfragen.push(
  { thema: "7-G6",  frage: "That's the girl … brother is a vet.", optionen: ["whose", "who", "which"], loesung: "whose" },
  { thema: "7-G6",  frage: "This is the wheel … is made of rubber.", optionen: ["which", "who", "whose"], loesung: "which" },
  { thema: "7-G7",  frage: "Which sentence is correct?", optionen: ["I enjoy camping.", "I enjoy camp.", "I enjoy to camps."], loesung: "I enjoy camping." },
  { thema: "7-G7",  frage: "… is my favourite hobby.", optionen: ["Cycling", "Cycle", "Cycles"], loesung: "Cycling" },
  { thema: "7-G8",  frage: "I think it … freeze tonight.", optionen: ["will", "is", "to"], loesung: "will" },
  { thema: "7-G8",  frage: "Which sentence is correct?", optionen: ["Tom won't give up.", "Tom won't gives up.", "Tom willn't give up."], loesung: "Tom won't give up." },
  { thema: "7-G9",  frage: "If it … sunny, we'll go cycling.", optionen: ["is", "will be", "be"], loesung: "is" },
  { thema: "7-G9",  frage: "If you give up, you …", optionen: ["will lose.", "lose yesterday.", "will loses."], loesung: "will lose." },
  { thema: "7-G10", frage: "If I had more money, I … buy a caravan.", optionen: ["would", "will", "did"], loesung: "would" },
  { thema: "7-G10", frage: "Which sentence is Typ II?", optionen: ["If I knew the answer, I would tell you.", "If I know the answer, I will tell you.", "I know the answer."], loesung: "If I knew the answer, I would tell you." },
  { thema: "7-G11", frage: "This is the … expensive brand in the shop.", optionen: ["least", "less", "lessest"], loesung: "least" },
  { thema: "7-G11", frage: "Which is correct?", optionen: ["the most spectacular", "the spectacularest", "the more spectacular"], loesung: "the most spectacular" },
  { thema: "7-G12", frage: "The fridge is empty. There is … milk.", optionen: ["no", "any", "some"], loesung: "no" },
  { thema: "7-G12", frage: "Would you like … tea?", optionen: ["some", "any", "no"], loesung: "some" },
  { thema: "7-G13", frage: "Look! The dog … in the lake.", optionen: ["is swimming", "swims", "swim"], loesung: "is swimming" },
  { thema: "7-G13", frage: "My dad … to the gym every Monday.", optionen: ["goes", "is going", "go"], loesung: "goes" },
  { thema: "7-G14", frage: "These towels are …", optionen: ["ours.", "our.", "us."], loesung: "ours." },
  { thema: "7-G14", frage: "Which sentence is correct?", optionen: ["This guitar is mine.", "This guitar is my.", "This is mine guitar."], loesung: "This guitar is mine." },
  { thema: "7-G15", frage: "You … run in the corridor. It's dangerous!", optionen: ["mustn't", "needn't", "must"], loesung: "mustn't" },
  { thema: "7-G15", frage: "„… I open the window?“ – „Yes, of course.“", optionen: ["May", "Must", "Needn't"], loesung: "May" }
);

// =====================================================================
// 8) MINISPIELE
//    Belohnung nach einem geschafften Zusatzraum: Knopf „🎁 Minispiel?“. Höchstens 30 Sekunden, zählt NICHT für den Code.
//    Nur die Spiele, die unter „spiele“ stehen, werden in dieser Welt angeboten.
//    titel / anleitung / erfolg = Texte; ziel = so viele Punkte braucht man. Die Spieltechnik steht in spiele/minispiele.js.
// =====================================================================
K7.minispiele = {
  spiele: {
    taschenlampe: {
      titel: "🔦 Nachts im Museum",
      anleitung: "Das Licht ist aus. Fahrt mit dem Finger durch den Saal und haltet die Taschenlampe kurz auf ein Ausstellungsstück – manche stehen hinter Säulen.",
      ziel: 6,
      erfolg: "Alle Stücke gefunden. Die Sammlung ist vollständig."
    },
    rutsche: {
      titel: "🦖 Saurier-Sprint",
      anleitung: "Tippt, damit der Saurier springt. Hüpft über Knochen und Felsen und sammelt die Eier 🥚.",
      ziel: 8,
      erfolg: "Acht Eier gerettet. Die Urzeit dankt."
    },
    nachtflug: {
      titel: "🦇 Flug durch die Säulenhalle",
      anleitung: "Tippt, damit die Fledermaus flattert. Fliegt zwischen den Säulen hindurch und sammelt Sanduhren ⏳. Anstoßen kostet nur etwas Zeit.",
      ziel: 8,
      erfolg: "Acht Sanduhren. Zeit gewonnen."
    }
  },

  // ---------- Nachts im Museum (Technik: taschenlampe) ----------
  nachtTiere: [
    { emoji: "🏺", en: "vase",     de: "Vase" },        { emoji: "👑", en: "crown",    de: "Krone" },
    { emoji: "🦴", en: "bone",     de: "Knochen" },     { emoji: "⚔️", en: "swords",   de: "Schwerter" },
    { emoji: "🛡️", en: "shield",   de: "Schild" },      { emoji: "💎", en: "diamond",  de: "Diamant" },
    { emoji: "📜", en: "scroll",   de: "Schriftrolle" },{ emoji: "🗿", en: "statue",   de: "Statue" },
    { emoji: "🪙", en: "coin",     de: "Münze" },       { emoji: "🔭", en: "telescope", de: "Fernrohr" },
    { emoji: "🤖", en: "robot",    de: "Roboter" },     { emoji: "🕰️", en: "clock",    de: "Uhr" }
  ],
  kulisse: ["🏛️", "🪑", "🏛️", "🖼️", "🏛️", "🪴", "🖼️", "🏛️", "🪑", "🏛️"],

  // ---------- Saurier-Sprint (Technik: rutsche) ----------
  rutsche: { figur: "🦖", fisch: "🥚", hindernisse: ["🦴", "🪨", "🌵"], hintergrund: ["🌋", "☁️", "🌴", "☁️"] },
  rutscheAutsch: ["Rumms. Weiter.", "Gestolpert. Weiter!", "Autsch.", "Kopf hoch, weiter."],

  // ---------- Flug durch die Säulenhalle (Technik: nachtflug) ----------
  flug: { figur: "🦇", stern: "⏳", krone: "🏛️", himmel: ["✨", "·", "🖼️", "·", "✨", "·"] },
  flugAutsch: ["Autsch, eine Säule.", "Weiterflattern!", "Knapp daneben.", "Kurz getaumelt – weiter."]
};

// ---------- Weitere Minispiele (ab Version 0.7.1): acht Spiele pro Welt ----------
Object.assign(K7.minispiele.spiele, {
  obstkorb: {
    titel: "🏺 Fallende Fundstücke",
    anleitung: "Im Regal wackelt es! Schiebt den Korb mit dem Finger und fangt die Fundstücke auf. Vorsicht vor Spinnen und Staubwolken!",
    ziel: 12,
    erfolg: "Nichts kaputt! Der Kurator atmet auf."
  },
  schaukel: {
    titel: "🌿 Liane im Urzeit-Saal",
    anleitung: "Im Urzeit-Saal hängen Lianen. Tippt, sobald der Ring ⭕ erscheint – dann springt ihr zur nächsten Liane! Unten wartet der T-Rex …",
    ziel: 6,
    erfolg: "Sicher drüben! Der T-Rex schaut enttäuscht."
  },
  fuettern: {
    titel: "🏛️ Ab in die richtige Epoche!",
    anleitung: "Die Fundstücke sind durcheinander! Zieht jedes Fundstück zur richtigen Epoche – oder tippt die Epoche an.",
    ziel: 6,
    erfolg: "Alles richtig einsortiert! Ihr seid echte Historiker."
  },
  codeknacker: {
    titel: "🔒 Tresor des Kurators",
    anleitung: "Der Tresor hat ein Zahlenschloss mit drei Ziffern. Tippt drei Ziffern. Nach jedem Versuch gibt es Hinweise: ● richtige Ziffer am richtigen Platz, ◐ Ziffer kommt vor, aber woanders, ○ kommt nicht vor.",
    ziel: 3,
    erfolg: "Der Tresor ist offen! Darin liegt ein alter Zeitreise-Kompass."
  },
  lasergitter: {
    titel: "🚨 Lichtschranke im Tresorraum",
    anleitung: "Die Lichtschranke geht an und aus. Tippt, wenn AUS dasteht – dann huscht ihr durch. Zu früh getippt? Kurz warten, mehr passiert nicht.",
    ziel: 6,
    erfolg: "Sechs Schranken, kein Alarm. Meisterhaft!"
  }
});
Object.assign(K7.minispiele, {
  // ---------- Fallende Fundstücke (Technik: obstkorb) ----------
  obst: [
    { emoji: "🏺", en: "vase",      de: "Vase" },        { emoji: "🪙", en: "coin",      de: "Münze" },
    { emoji: "👑", en: "crown",     de: "Krone" },       { emoji: "💍", en: "ring",      de: "Ring" },
    { emoji: "📜", en: "scroll",    de: "Schriftrolle" },{ emoji: "🗿", en: "statue",    de: "Statue" },
    { emoji: "🦴", en: "bone",      de: "Knochen" },     { emoji: "💎", en: "jewel",     de: "Edelstein" },
    { emoji: "🛡️", en: "shield",    de: "Schild" },      { emoji: "⚱️", en: "urn",       de: "Urne" },
    { emoji: "🧭", en: "compass",   de: "Kompass" },     { emoji: "⏳", en: "hourglass", de: "Sanduhr" }
  ],
  muell: ["🕷️", "💨", "🥫", "🧦"],
  autsch: ["Iiih, eine Spinne!", "Hatschi! Nur Staub!", "Eine Dose? Die ist nicht antik!", "Socken gehören nicht ins Museum!"],

  // ---------- Liane im Urzeit-Saal (Technik: schaukel) ----------
  affe: "🧒", netzZeichen: "🦖",
  netz: ["Rawr! Schnell wieder hoch!", "Knapp! Wartet auf den Ring ⭕.", "Hoppla! Nochmal!"],

  // ---------- Ab in die richtige Epoche! (Technik: fuettern) ----------
  // „tiere“ sind hier die Epochen, „futter“ die Fundstücke
  tiere: [
    { id: "dino",   emoji: "🦕", en: "dinosaurs",     de: "Zeit der Dinosaurier", witz: "Der Dino brüllt: „{futter}? So was gab es bei uns noch nicht!“" },
    { id: "stein",  emoji: "🔥", en: "Stone Age",     de: "Steinzeit",            witz: "Die Steinzeit-Familie staunt: „{futter}? Kennen wir nicht!“" },
    { id: "aegypten",emoji: "🐫", en: "Ancient Egypt", de: "Altes Ägypten",        witz: "Der Pharao runzelt die Stirn: „{futter}? Nicht aus meiner Zeit!“" },
    { id: "rom",    emoji: "🏛️", en: "Ancient Rome",  de: "Antikes Rom",          witz: "Der Römer schüttelt den Kopf: „{futter}? Bei Jupiter, nein!“" },
    { id: "ritter", emoji: "🏰", en: "Middle Ages",   de: "Mittelalter",          witz: "Der Ritter klappt das Visier hoch: „{futter}? Passt nicht in meine Burg!“" },
    { id: "heute",  emoji: "🏙️", en: "today",         de: "Heute",                witz: "Die Museumsführerin lacht: „{futter}? Das ist doch uralt!“" }
  ],
  futter: [
    { emoji: "🦖", en: "T. rex",          de: "T-Rex",             haupt: ["dino"],    auch: [] },
    { emoji: "🥚", en: "dinosaur egg",    de: "Dinosaurier-Ei",    haupt: ["dino"],    auch: [] },
    { emoji: "🦣", en: "mammoth",         de: "Mammut",            haupt: ["stein"],   auch: [] },
    { emoji: "🪓", en: "stone axe",       de: "Steinaxt",          haupt: ["stein"],   auch: [] },
    { emoji: "🔺", en: "pyramid",         de: "Pyramide",          haupt: ["aegypten"], auch: [] },
    { emoji: "📜", en: "papyrus",         de: "Papyrus",           haupt: ["aegypten"], auch: ["rom"] },
    { emoji: "🏟️", en: "arena",           de: "Arena",             haupt: ["rom"],     auch: ["heute"] },
    { emoji: "🏺", en: "amphora",         de: "Amphore",           haupt: ["rom"],     auch: ["aegypten"] },
    { emoji: "🛡️", en: "knight's shield", de: "Ritterschild",      haupt: ["ritter"],  auch: [] },
    { emoji: "🪶", en: "quill",           de: "Schreibfeder",      haupt: ["ritter"],  auch: [] },
    { emoji: "📱", en: "smartphone",      de: "Smartphone",        haupt: ["heute"],   auch: [] },
    { emoji: "🎮", en: "game console",    de: "Spielkonsole",      haupt: ["heute"],   auch: [] }
  ],
  lob: ["✅ Richtig!", "✅ Passt!", "✅ Genau!", "✅ Super!"],

  // ---------- Tresor des Kurators (Technik: codeknacker) ----------
  codeknacker: { ziffern: 5, legende: "● richtiger Platz · ◐ falscher Platz · ○ nicht im Code", start: "Tippt drei Ziffern.", fertig: "Geknackt!", versuchText: "Noch {n} Versuche",
                 namen: { "●": "richtiger Platz", "◐": "falscher Platz", "○": "nicht im Code" } },

  // ---------- Lichtschranke im Tresorraum (Technik: lasergitter) ----------
  lasergitter: { figur: "🧒", ziel: "🚪", an: "AN", aus: "AUS", hinweis: "Tippt, wenn AUS dasteht.", autsch: ["Piep! Wartet auf AUS.", "Zu früh!", "Geduld …"] }
});

// ---------- Scheitern (ab Version 0.7.2): drei Herzen, Fallen bei der Taschenlampe ----------
Object.assign(K7.minispiele, {
  // Meldung, wenn alle drei Herzen weg sind (eine davon wird ausgelost)
  gameOver: ["Drei Fehler – der Kurator schüttelt den Kopf.", "Alarm im Museum! Das Spiel ist vorbei."],
  // Taschenlampe: Fallen im Dunkeln – wer sie zu lange anleuchtet, verliert ein Herz
  fallen: [
    { emoji: "🚨", text: "Alarm! Die Alarmanlage!" },
    { emoji: "👻", text: "Buh! Das Museumsgespenst!" },
    { emoji: "🕷️", text: "Iiih, eine Spinne!" }
  ]
});
