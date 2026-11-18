/* =====================================================================
   KLASSE 7  ·  alle Inhalte für Klasse 7
   ---------------------------------------------------------------------
   STAND 18.11.2026: Unit 1 und 2 (Themen G1–G5) haben Aufgaben. Unit 3–5 folgen.
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
  { id: "7-G6",  klasse: 7, unit: 3, titel: "Relativsätze mit Relativpronomen", regel: "" },
  { id: "7-G7",  klasse: 7, unit: 3, titel: "Das Gerundium", regel: "" },
  { id: "7-G8",  klasse: 7, unit: 3, titel: "Die Zukunft mit will", regel: "" },
  { id: "7-G9",  klasse: 7, unit: 3, titel: "Bedingungssätze Typ I", regel: "" },
  { id: "7-G10", klasse: 7, unit: 4, titel: "Bedingungssätze Typ II", regel: "" },
  { id: "7-G11", klasse: 7, unit: 4, titel: "Steigerung und Vergleiche von Adjektiven", regel: "" },
  { id: "7-G12", klasse: 7, unit: 4, titel: "Some und any", regel: "" },
  { id: "7-G13", klasse: 7, unit: 4, titel: "Simple present und present progressive", regel: "" },
  { id: "7-G14", klasse: 7, unit: 5, titel: "Possessivpronomen", regel: "" },
  { id: "7-G15", klasse: 7, unit: 5, titel: "Modale Hilfsverben", regel: "" }
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
      { a: "the knight", b: "the king", e: "help", s: "helps", rest: "in the battle" }
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
