/* =====================================================================
   KLASSE 8  ·  alle Inhalte für Klasse 8
   ---------------------------------------------------------------------
   STAND 20.11.2026: Unit 1 und 2 (Themen G1–G5) haben Aufgaben. Unit 3–5 folgen.
   Solange Aufgaben fehlen, zeigt das Startmenü „Kommt bald!“.
   Vorschau der Welt mit den Aufgaben aus Klasse 5: Adresse mit ?welt=8
   Wie eine fertige Klasse aussieht: siehe klasse5.js und klasse-vorlage.js.
   ===================================================================== */

const K8 = neueKlasse(8);   // bitte nicht ändern

// 1) DIE WELT
K8.welt = {
  name: "Das Detektivbüro in London", emoji: "🕵️",
  sprache: "en",   // Bedienung rund um Minispiel, Zusatzraum und Karte auf Englisch
  figur: "Inspector Morgan",
  intro: "Good evening. Inspector Morgan, Scotland Yard. Someone stole the files of our biggest case – and locked you in our office. " +
         "The code for the safe with the evidence is hidden in four rooms. Solve the puzzles, open the safe, close the case. " +
         "And please don't touch my tea.",
  raeume: [
    { name: "Archive",        emoji: "🗄️" },
    { name: "Crime Lab",      emoji: "🔬" },
    { name: "Map Room",       emoji: "🗺️" },
    { name: "Rooftop",        emoji: "🌧️" }
  ],
  zusatzraum: { name: "Interview Room", emoji: "🎙️", text: "The suspect is getting nervous. Ask your questions – fast." },
  ausgang:    { name: "Evidence Safe", emoji: "🔐" },
  finaleBild: "bild/finale-8.jpg",   // Bild hinter der Tür, wenn die Mission geschafft ist (Format etwa 15:11)
  finale:     "The safe is open. Case closed. Inspector Morgan nods: “Not bad. Not bad at all.”",
  gescheitert:"Too late. The thief got away with the files. Let's try again.",
  gescheitertTor: "Three wrong codes – the safe is locked for tonight. Let's try again.",
  saetze: {
    start:            ["The first room is open. Tap it."],
    richtig:          ["Correct.", "Good work.", "That's it.", "Sharp.", "Nicely done."],
    falsch:           ["Not quite. Read the explanation and try again.", "Close. Check the rule.", "Happens to the best detectives. Again."],
    loesung:          ["Tricky one. Look at the answer – a new task is coming."],
    raumGeschafft:    ["Room done. Now the interview room …", "All clues collected."],
    zusatzStart:      ["The suspect is talking. Be quick – and precise."],
    zusatzGeschafft:  ["He told us everything. The digit is yours."],
    zusatzGescheitert:["He called his lawyer. One of these three digits is right."],
    zeitWarnung:      ["Hurry up – the thief is leaving London!"],
    torFalsch:        ["The safe stays shut. Check the lights: green is right, red is not yet."],
    zwilling:         ["Here's a similar one."],
    torBereit:        ["All rooms done. Enter the code at the safe."]
  }
};

// ---------- KARTE (Entdecker-Modus) ----------
// Die Karte ersetzt die Übersicht mit den Kacheln (Datei welt/karte.js, Aussehen: welt/stil-detektiv.js).
// So lest ihr die Zahlen: x = wie weit nach rechts (0 … 1600), y = wie weit nach unten (0 … 1000).
// Ein Raum braucht etwa 300 × 200 Platz. Der Punkt x/y ist die Mitte, die Tür ist unten in der Mitte.
// Kleine Schritte ändern (z. B. 50) und danach im Browser ansehen: …/test/index.html?welt=8
K8.welt.karte = {
  stil: "detektiv",                        // Aussehen: Datei welt/stil-detektiv.js
  groesse: { b: 1600, h: 1000 },           // Größe der ganzen Karte. Klein lassen: kurze Wege!
  start:   { x: 800, y: 850 },             // hier steht die Spielfigur am Anfang (vor dem Tresor)

  // Die vier Räume. Reihenfolge = Reihenfolge der Räume oben (Archive zuerst).
  raeume: [
    { x: 290,  y: 310, schild: "Archive" },
    { x: 1310, y: 310, schild: "Crime Lab" },
    { x: 410,  y: 700, schild: "Map Room" },
    { x: 1190, y: 700, schild: "Rooftop" }
  ],
  zusatzraum: { x: 800, y: 215, schild: "Interview Room" },   // nur Kulisse, wird nach jedem Raum von selbst betreten
  tor:        { x: 800, y: 950 },                             // der Tresor unten

  // Figuren: höchstens 5. Keine hält auf, Antippen ist freiwillig.
  //   art: "begleiter" = Inspector Morgan, läuft hinterher
  //   art: "regel"     = zeigt die Regelkarte des nächsten Raums
  //   art: "zeit"      = dreht seine „runde“ (Punkte [x, y]) und warnt, wenn die Zeit knapp wird
  //   art: "wort"      = zeigt ein Wort aus der Wörterhilfe („emoji“ = Bild, „trick“ = drehen, rollen oder huepfen)
  figuren: [
    { art: "begleiter" },
    { art: "regel", name: "Desk sergeant", x: 660, y: 520 },
    { art: "zeit",  name: "Night constable", runde: [[930, 470], [1150, 470], [1150, 560], [930, 560]] },
    { art: "wort",  emoji: "🐈", name: "Office cat", trick: "rollen", x: 560,  y: 850 },
    { art: "wort",  emoji: "☎️", name: "Telephone",  trick: "drehen", x: 1080, y: 865 }
  ],

  // Orte, an denen Inspector Morgan einmal pro Mission etwas sagt, wenn die Spielfigur in die Nähe kommt.
  orte: [
    { x: 800, y: 340, radius: 120, text: "The interview room. You'll be called in. Don't knock." },
    { x: 150, y: 520, radius: 120, text: "Nothing here but dust. I checked. Twice." },
    { x: 800, y: 620, radius: 100, text: "Mind the carpet. It's older than the Yard." }
  ],

  // Texte der Karte. {name} wird durch den Namen des Raums ersetzt.
  // Steht hier eine Liste [ "…", "…" ], wird jedes Mal ein Satz ausgewählt.
  texte: {
    gesperrt:        "Locked. Finish the room with the arrow first.",
    schonGeschafft:  "You already have that digit. Next room.",
    torZu:           "The safe stays shut. Four rooms first.",
    zusatz:          "The interview room opens after each room. Patience.",
    zusatzReaktion:  ["Muffled voices.", "Someone coughs.", "A chair scrapes."],
    jubel:           "A new digit. Noted.",
    tipp:            "Next: {name}. Follow the arrow.",
    tippTor:         "All four digits. To the safe.",
    regelTitel:      "Case notes: {name}",
    keineRegel:      "No case notes for this room.",
    waerterinFertig: "All rooms done. The safe is over there.",
    waechter:        "Hurry. The thief won't wait.",
    waechterRuf:     ["Who's there? … Oh. Carry on.", "Evening. Working late?", "Thought I heard something."],
    pollyGeschafft:  ["First digit. A start.", "Two digits. Halfway.", "One room left.", "All four. To the safe."],
    pollyWarten:     ["Still thinking? Next: {name}.", "The clock is running. {name}."],
    pollyZurueck:    ["Happens. Go back in.", "Take a moment. Then try again."],
    schliessen:      "Close"
  }
};

// Bild der Begleitfigur oben links (Inspector Morgan). Nur die Formen, ohne <svg>-Hülle, Feld 120 × 130.
K8.welt.figurSvg =
  '<path d="M16 130 Q16 98 60 94 Q104 98 104 130 Z" fill="#8a7a5c" stroke="#000" stroke-width="4"/>' +
  '<path d="M40 96 L60 118 L80 96 L70 92 L60 104 L50 92 Z" fill="#a8977a" stroke="#000" stroke-width="3"/>' +
  '<circle cx="60" cy="64" r="28" fill="#d9a77f" stroke="#000" stroke-width="4"/>' +
  '<circle cx="50" cy="64" r="3.5" fill="#000"/><circle cx="70" cy="64" r="3.5" fill="#000"/>' +
  '<path d="M44 76 Q52 70 60 76 Q68 70 76 76 Q68 82 60 78 Q52 82 44 76 Z" fill="#4a4033" stroke="#000" stroke-width="2.5"/>' +
  '<path d="M42 56 L56 58 M64 58 L78 56" stroke="#000" stroke-width="3" stroke-linecap="round"/>' +
  '<path d="M14 46 Q60 34 106 46 Q60 54 14 46 Z" fill="#4a4033" stroke="#000" stroke-width="4"/>' +
  '<path d="M32 42 Q34 12 60 12 Q86 12 88 42 Z" fill="#4a4033" stroke="#000" stroke-width="4"/>' +
  '<path d="M33 36 L87 36" stroke="#000" stroke-width="5"/>';
// ---------- Ende KARTE ----------

// 2) DIE THEMEN (laut „Themenuebersicht“)
K8.themen = [
  { id: "8-G1",  klasse: 8, unit: 1, titel: "Die einfache Vergangenheit", regel: "Simple past (einfache Vergangenheit) for finished actions in the past (yesterday, last week, … ago). Regular verbs: -ed (visit → visited, try → tried, stop → stopped). Irregular verbs (unregelmäßig): learn them (take → took, buy → bought). Negative: didn't + infinitive (I didn't go). Questions: Did + person + infinitive? (Did you go?)" },
  { id: "8-G2",  klasse: 8, unit: 1, titel: "Die Vorvergangenheit", regel: "Past perfect (Vorvergangenheit) = had + past participle (3. Form). It shows what happened BEFORE another action in the past: When we got to the harbor, the ferry had already left. The later action is in the simple past. Negative: hadn't + 3rd form. Questions: Had you … ?" },
  { id: "8-G3",  klasse: 8, unit: 2, titel: "Modale Hilfsverben und ihre Ersatzformen", regel: "Substitute forms (Ersatzformen): can → be able to, must → have to, may → be allowed to. Past: could / was able to, had to, was allowed to. Future: will be able to, will have to, will be allowed to („will can“ and „will must“ don't exist). Questions with have to: Do you have to …?" },
  { id: "8-G4",  klasse: 8, unit: 2, titel: "Bedingungssätze Typ I", regel: "Conditional sentences type I (Bedingungssätze Typ I): If + simple present, … will + infinitive. If it snows, the bus won't come. Never use will in the if-clause. if-clause first → comma; if-clause second → no comma." },
  { id: "8-G5",  klasse: 8, unit: 2, titel: "Stützwort one/ones", regel: "one / ones (Stützwort) replace a noun so you don't repeat it. Singular (Einzahl): the red T-shirt → the blue one. Plural (Mehrzahl): my old shoes → new ones. Questions: Which one …? / Which ones …?" },
  { id: "8-G6",  klasse: 8, unit: 3, titel: "Bestätigungsfragen", regel: "" },
  { id: "8-G7",  klasse: 8, unit: 3, titel: "Fragen", regel: "" },
  { id: "8-G8",  klasse: 8, unit: 3, titel: "Bedingungssätze Typ II", regel: "" },
  { id: "8-G9",  klasse: 8, unit: 4, titel: "Simple present – present progressive", regel: "" },
  { id: "8-G10", klasse: 8, unit: 4, titel: "Adjektive und Adverbien", regel: "" },
  { id: "8-G11", klasse: 8, unit: 4, titel: "Das Perfekt", regel: "" },
  { id: "8-G12", klasse: 8, unit: 5, titel: "Das Passiv", regel: "" },
  { id: "8-G13", klasse: 8, unit: 5, titel: "Indirekte Rede (ohne Zeitverschiebung)", regel: "" },
  { id: "8-G14", klasse: 8, unit: 5, titel: "Indirekte Rede (mit Zeitverschiebung)", regel: "" }
];

// =====================================================================
// 4) WÖRTERHILFE: deutsche Bedeutung für erschließbare oder neue Wörter (Antippen zeigt die Bedeutung)
// =====================================================================
K8.woerterhilfe = [
  { en: "harbor", de: "Hafen" }, { en: "skyline", de: "Skyline" }, { en: "skyscraper", de: "Wolkenkratzer" }, { en: "subway", de: "U-Bahn" },
  { en: "elevator", de: "Aufzug" }, { en: "cab", de: "Taxi" }, { en: "bagel", de: "Bagel (Brötchen)" }, { en: "downtown", de: "Innenstadt" },
  { en: "immigrant", de: "Einwanderer/Einwanderin" }, { en: "immigrants", de: "Einwanderer" }, { en: "inspection", de: "Untersuchung, Kontrolle" },
  { en: "steamship", de: "Dampfschiff" }, { en: "great-grandparents", de: "Urgroßeltern" }, { en: "great-grandpa", de: "Urgroßvater" },
  { en: "gallery", de: "Galerie" }, { en: "tornado", de: "Tornado, Wirbelsturm" }, { en: "storm", de: "Sturm" }, { en: "locker", de: "Schließfach" },
  { en: "principal", de: "Schulleiter/in" }, { en: "detention", de: "Nachsitzen" }, { en: "freshman", de: "Schüler/in im 1. Jahr der Highschool" },
  { en: "freshmen", de: "Schüler/innen im 1. Jahr der Highschool" }, { en: "elective", de: "Wahlfach" }, { en: "license", de: "Führerschein, Erlaubnis" },
  { en: "competition", de: "Wettbewerb" }, { en: "interview", de: "Vorstellungsgespräch, Interview" }, { en: "boss", de: "Chef/in" },
  { en: "earn", de: "verdienen" }, { en: "tray", de: "Tablett" }, { en: "schedule", de: "Stundenplan, Zeitplan" }, { en: "store", de: "Laden, Geschäft" },
  { en: "campus", de: "Schulgelände, Campus" }, { en: "vacation", de: "Ferien, Urlaub" }, { en: "farmland", de: "Ackerland" },
  { en: "pass", de: "Erlaubnisschein; bestehen" }, { en: "uniform", de: "Uniform" }, { en: "gym", de: "Turnhalle" }, { en: "cart", de: "Wagen, Stand" },
  { en: "baseball", de: "Baseball" }, { en: "basketball", de: "Basketball" }, { en: "pizza", de: "Pizza" }, { en: "sneakers", de: "Turnschuhe" }, { en: "jacket", de: "Jacke" }
];

// =====================================================================
// 3) DER SATZBAUKASTEN – Wortschatz: Klasse 5–7 komplett + Klasse 8 bis zur Unit
//    Klasse 8: Erklärungen in einfachem Englisch, deutscher Fachbegriff in Klammern.
// =====================================================================
const K8_PERSONEN = [
  { text: "I",            er: false, pron: "I",    poss: "my",    kind: true },
  { text: "you",          er: false, pron: "you",  poss: "your",  kind: true },
  { text: "we",           er: false, pron: "we",   poss: "our",   kind: true },
  { text: "they",         er: false, pron: "they", poss: "their", kind: true },
  { text: "my parents",   er: false, pron: "they", poss: "their" },
  { text: "my friends",   er: false, pron: "they", poss: "their", kind: true },
  { text: "Jake and Mia", er: false, pron: "they", poss: "their", kind: true },
  { text: "he",           er: true,  pron: "he",   poss: "his",   kind: true },
  { text: "she",          er: true,  pron: "she",  poss: "her",   kind: true },
  { text: "Jake",         er: true,  pron: "he",   poss: "his",   kind: true },
  { text: "Mia",          er: true,  pron: "she",  poss: "her",   kind: true },
  { text: "Carlos",       er: true,  pron: "he",   poss: "his",   kind: true },
  { text: "Zoe",          er: true,  pron: "she",  poss: "her",   kind: true },
  { text: "my cousin",    er: true,  pron: "he",   poss: "his",   kind: true },
  { text: "my aunt",      er: true,  pron: "she",  poss: "her" }
];
K8_PERSONEN.forEach(p => { p.be = p.text === "I" ? "am" : p.er ? "is" : "are"; });

K8.baukasten = {
  // ---------- Klasse 8, Unit 1: simple past (G1) ----------
  "8-U1": {
    personen: K8_PERSONEN,
    // nur Verben mit EINER richtigen Vergangenheitsform (kein dreamt/dreamed, learnt/learned …)
    verbenPast: [
      { grund: "visit",  s: "visits",  past: "visited",  rest: "Ellis Island" },
      { grund: "walk",   s: "walks",   past: "walked",   rest: "across the Brooklyn Bridge" },
      { grund: "climb",  s: "climbs",  past: "climbed",  rest: "the stairs of the old tower" },
      { grund: "watch",  s: "watches", past: "watched",  rest: "a baseball game" },
      { grund: "try",    s: "tries",   past: "tried",    rest: "a bagel with cream cheese" },
      { grund: "stop",   s: "stops",   past: "stopped",  rest: "at a hot dog cart" },
      { grund: "plan",   s: "plans",   past: "planned",  rest: "the trip to New York" },
      { grund: "arrive", s: "arrives", past: "arrived",  rest: "downtown at rush hour" },
      { grund: "search", s: "searches", past: "searched", rest: "for a cheap hotel" },
      { grund: "count",  s: "counts",  past: "counted",  rest: "the skyscrapers" },
      { grund: "take",   s: "takes",   past: "took",     rest: "the subway to Times Square", unreg: true, falsch: ["taked"] },
      { grund: "ride",   s: "rides",   past: "rode",     rest: "the elevator to the top", unreg: true, falsch: ["rided"] },
      { grund: "see",    s: "sees",    past: "saw",      rest: "the skyline at night", unreg: true, falsch: ["seed"] },
      { grund: "buy",    s: "buys",    past: "bought",   rest: "a souvenir for {POSS} cousin", unreg: true, falsch: ["buyed"] },
      { grund: "eat",    s: "eats",    past: "ate",      rest: "a hot dog in Central Park", unreg: true, falsch: ["eated"] },
      { grund: "go",     s: "goes",    past: "went",     rest: "to the ice rink", unreg: true, falsch: ["goed"] },
      { grund: "get",    s: "gets",    past: "got",      rest: "stuck in a traffic jam", unreg: true, falsch: ["getted"] },
      { grund: "find",   s: "finds",   past: "found",    rest: "a nice café near the harbor", unreg: true, falsch: ["finded"] },
      { grund: "send",   s: "sends",   past: "sent",     rest: "a postcard to {POSS} grandma", unreg: true, falsch: ["sended"] },
      { grund: "leave",  s: "leaves",  past: "left",     rest: "the hotel early", unreg: true, falsch: ["leaved"] },
      { grund: "spend",  s: "spends",  past: "spent",    rest: "a lot of money on souvenirs", unreg: true, falsch: ["spended"] },
      { grund: "sleep",  s: "sleeps",  past: "slept",    rest: "in a tiny hotel room", unreg: true, falsch: ["sleeped"] }
    ],
    zeitenPast: ["yesterday", "last week", "last summer", "last weekend", "two days ago", "last year"],
    erklaerungen: {
      pastalle: {
        past: {
          reg:   "Regular verbs (regelmäßige Verben) get -ed in the simple past (einfache Vergangenheit): visit → visited, try → tried, stop → stopped. Example: {BEISPIEL}",
          unreg: "This verb is irregular (unregelmäßig). You have to learn the past form: take → took, buy → bought. Example: {BEISPIEL}",
          neg:   "Negative (Verneinung): didn't + infinitive (Grundform). Never use a past form after didn't. Example: {BEISPIEL}",
          zuordnenAussage: "Regular verbs (regelmäßig) get -ed: visit → visited. Irregular verbs (unregelmäßig) have their own form: go → went, eat → ate.",
          zuordnenNeg: "Correct: didn't + infinitive (Grundform). After didn't there is never a past form.",
          unregName: "irregular"
        },
        frage: {
          frage:    "Questions in the simple past: Did + person + infinitive (Grundform). Example: {BEISPIEL}",
          kurzJa:   "Short answer (Kurzantwort) with yes: Yes, + person + did. Example: {BEISPIEL}",
          kurzNein: "Short answer (Kurzantwort) with no: No, + person + didn't. Example: {BEISPIEL}",
          zuordnen: "Correct: Did + person + infinitive (Grundform). After Did there is never a past form."
        }
      }
    }
  },

  // ---------- Klasse 8, Unit 1: past perfect (G2) ----------
  "8-G2": {
    saetze: [
      { k: "ferry-harbor", e: "pp",    t: "When we got to the harbor, the ferry ___ already.", h: "leave", r: ["had left"], f: ["has left", "had leave"], fehler: { ersatz: "has left", wort: "has", loesung: ["had"] } },
      { e: "pp",    t: "I ___ a skyscraper before I went to New York.", h: "never / see", r: ["had never seen"], f: ["have never seen", "had never saw"], fehler: { ersatz: "had never saw", wort: "saw", loesung: ["seen"] } },
      { e: "pp",    t: "By the time Mia arrived at the party, her friends ___ all the bagels.", h: "eat", r: ["had eaten", "had already eaten"], f: ["have eaten", "had eat"], fehler: { ersatz: "had eat", wort: "eat", loesung: ["eaten"] } },
      { e: "pp",    t: "The streets were wet because it ___ all night.", h: "rain", r: ["had rained"], f: ["has rained", "had rain"], fehler: { ersatz: "had rain", wort: "rain", loesung: ["rained"] } },
      { e: "pp",    t: "Zoe couldn't pay for the cab because she ___ her money.", h: "lose", r: ["had lost"], f: ["has lost", "had lose"], fehler: { ersatz: "had lose", wort: "lose", loesung: ["lost"] } },
      { e: "pp",    t: "When the steamship arrived in New York, the passengers ___ at sea for two weeks.", h: "be", r: ["had been"], f: ["have been", "had be"], fehler: { ersatz: "have been", wort: "have", loesung: ["had"] } },
      { k: "inspection", e: "past",  t: "After the inspection had ended, the immigrants ___ a ferry to Manhattan.", h: "take", r: ["took"], f: ["taked", "takes"], fehler: "taked" },
      { k: "icerink", e: "past",  t: "After Jake had bought a hot dog, he ___ to the ice rink.", h: "walk", r: ["walked"], f: ["walks", "walk"], fehler: "walks" },
      { e: "past",  t: "When Carlos ___ at the hotel, his parents had already checked in.", h: "arrive", r: ["arrived"], f: ["arrives", "arrive"], fehler: "arrives" },
      { e: "past",  t: "We ___ very tired because we had been in a traffic jam for two hours.", h: "be", r: ["were"], f: ["are", "was"], fehler: "are" },
      { e: "neg",   t: "Lily was nervous because she ___ the subway before.", h: "not / ride", r: ["hadn't ridden", "had not ridden"], f: ["hasn't ridden", "hadn't rode"], fehler: { ersatz: "hadn't rode", wort: "rode", loesung: ["ridden"] } },
      { e: "neg",   t: "We missed the start of the game because we ___ the subway map.", h: "not / check", r: ["hadn't checked", "had not checked"], f: ["haven't checked", "hadn't check"], fehler: { ersatz: "hadn't check", wort: "check", loesung: ["checked"] } },
      { e: "neg",   t: "The tourists were disappointed because the gallery ___ yet.", h: "not / open", r: ["hadn't opened", "had not opened"], f: ["hasn't opened", "hadn't open"], fehler: { ersatz: "hasn't opened", wort: "hasn't", loesung: ["hadn't", "had not"] } },
      { e: "frage", t: "___ the ferry already left when you arrived?", h: "have", r: ["Had"], f: ["Has", "Did"], fehler: "Has" },
      { e: "frage", t: "Had your great-grandparents ___ in Italy before they came to America?", h: "live", r: ["lived"], f: ["live", "living"], fehler: "live" },
      { k: "inspection", e: "frage", t: "How long ___ the immigrants waited before the inspection began?", h: "have", r: ["had"], f: ["have", "did"], fehler: "have" }
    ],
    umformen: [
      { k: "ferry-harbor", e: "pp", a: "Join the sentences with „after“:", von: "The ferry left. Then we got to the harbor.",
        nach: ["After the ferry had left, we got to the harbor.", "We got to the harbor after the ferry had left."] },
      { k: "icerink", e: "pp", a: "Join the sentences with „after“:", von: "Mia finished her homework. Then she went to the ice rink.",
        nach: ["After Mia had finished her homework, she went to the ice rink.", "Mia went to the ice rink after she had finished her homework.", "After she had finished her homework, Mia went to the ice rink."] },
      { e: "pp", a: "Join the sentences with „after“:", von: "Jake ate a bagel. Then he took the subway to school.",
        nach: ["After Jake had eaten a bagel, he took the subway to school.", "Jake took the subway to school after he had eaten a bagel.", "After he had eaten a bagel, Jake took the subway to school."] },
      { e: "pp", a: "Join the sentences with „after“:", von: "We visited the gallery. Then we had lunch downtown.",
        nach: ["After we had visited the gallery, we had lunch downtown.", "We had lunch downtown after we had visited the gallery."] },
      { k: "inspection", e: "pp", a: "Join the sentences with „after“:", von: "The immigrants passed the inspection. Then they took a ferry to Manhattan.",
        nach: ["After the immigrants had passed the inspection, they took a ferry to Manhattan.", "The immigrants took a ferry to Manhattan after they had passed the inspection.", "After they had passed the inspection, the immigrants took a ferry to Manhattan."] },
      { e: "pp", a: "Join the sentences with „before“:", von: "Zoe bought a map. Then she walked around the city.",
        nach: ["Zoe had bought a map before she walked around the city.", "Before Zoe walked around the city, she had bought a map.", "Before she walked around the city, Zoe had bought a map."] },
      { e: "pp", a: "Join the sentences with „before“:", von: "My parents booked a hotel. Then they flew to New York.",
        nach: ["My parents had booked a hotel before they flew to New York.", "Before my parents flew to New York, they had booked a hotel.", "Before they flew to New York, my parents had booked a hotel."] },
      { e: "pp", a: "Join the sentences with „when“:", von: "The show started. Then we arrived at the theater.",
        nach: ["When we arrived at the theater, the show had started.", "The show had started when we arrived at the theater.", "When we arrived at the theater, the show had already started.", "The show had already started when we arrived at the theater."] },
      { e: "neg", a: "Make the sentence negative:", von: "When we arrived, the game had started.",
        nach: ["When we arrived, the game hadn't started.", "When we arrived, the game had not started."] },
      { e: "neg", a: "Make the sentence negative:", von: "Carlos had seen the Statue of Liberty before.",
        nach: ["Carlos hadn't seen the Statue of Liberty before.", "Carlos had not seen the Statue of Liberty before."] },
      { e: "neg", a: "Make the sentence negative:", von: "I had heard of Ellis Island before the trip.",
        nach: ["I hadn't heard of Ellis Island before the trip.", "I had not heard of Ellis Island before the trip."] },
      { e: "frage", a: "Ask a question:", von: "The tourists had already checked in.", nach: ["Had the tourists already checked in?"] },
      { e: "frage", a: "Ask a question:", von: "Lily had been to New York before.", nach: ["Had Lily been to New York before?"] }
    ],
    zuordnen: {
      kategorien: ["past perfect", "simple past"],
      woerter: [
        { text: "had visited", ziel: "past perfect" }, { text: "visited", ziel: "simple past" }, { text: "had seen", ziel: "past perfect" }, { text: "saw", ziel: "simple past" },
        { text: "had eaten", ziel: "past perfect" }, { text: "ate", ziel: "simple past" }, { text: "had left", ziel: "past perfect" }, { text: "took", ziel: "simple past" },
        { text: "had taken", ziel: "past perfect" }, { text: "bought", ziel: "simple past" }, { text: "had ridden", ziel: "past perfect" }, { text: "rode", ziel: "simple past" },
        { text: "had lost", ziel: "past perfect" }, { text: "went", ziel: "simple past" }, { text: "had been", ziel: "past perfect" }, { text: "was", ziel: "simple past" }
      ]
    },
    erklaerungen: {
      satzpool: {
        pp:    "Past perfect (Vorvergangenheit): This happened BEFORE another action in the past. Form: had + past participle (3. Form). Example: {BEISPIEL}",
        past:  "The later action is in the simple past (einfache Vergangenheit). Only the earlier action gets had + 3rd form. Example: {BEISPIEL}",
        neg:   "Negative (Verneinung): hadn't (= had not) + past participle (3. Form). Example: {BEISPIEL}",
        frage: "Questions (Fragen): Had + person + past participle (3. Form)? Example: {BEISPIEL}",
        zuordnen: "Past perfect (Vorvergangenheit) = had + past participle (3. Form): had seen. Simple past (einfache Vergangenheit) = one word: saw."
      }
    }
  },

  // ---------- Klasse 8, Unit 2: Ersatzformen der Modalverben (G3) ----------
  "8-G3": {
    saetze: [
      { k: "drive", e: "futur",  t: "My sister is fifteen. Next year she ___ drive a car.", h: "can – future", r: ["will be able to", "'ll be able to"], f: ["will can", "cans"], fehler: { ersatz: "will can", wort: "can", loesung: ["be able to"] } },
      { e: "futur",  t: "There's a field trip tomorrow. We ___ be at school at seven o'clock.", h: "must – future", r: ["will have to", "'ll have to"], f: ["will must", "must will"], fehler: { ersatz: "will must", wort: "must", loesung: ["have to"] } },
      { k: "drive", e: "futur",  t: "When you are sixteen, you ___ drive a car in many US states.", h: "may – future", r: ["will be allowed to", "'ll be allowed to"], f: ["will may", "will can"], fehler: { ersatz: "will may", wort: "may", loesung: ["be allowed to"] } },
      { e: "futur",  t: "It's vacation next week, so I ___ do any homework.", h: "not / have to – future", r: ["won't have to", "will not have to"], f: ["mustn't", "won't must"], fehler: { ersatz: "won't must", wort: "must", loesung: ["have to"] } },
      { e: "futur",  t: "If you study hard, you ___ get a good job.", h: "can – future", r: ["will be able to", "'ll be able to"], f: ["will can", "can will"], fehler: { ersatz: "will can", wort: "can", loesung: ["be able to"] } },
      { k: "locker3", e: "past",   t: "Yesterday I lost my key, so I ___ open my locker.", h: "not / can – past", r: ["couldn't", "could not", "wasn't able to", "was not able to"], f: ["didn't can", "can't"], fehler: { ersatz: "can't", wort: "can't", loesung: ["couldn't", "could not", "wasn't able to", "was not able to"] } },
      { k: "detention", e: "past",   t: "Last week Jake ___ go to detention because he was late three times.", h: "must – past", r: ["had to"], f: ["musted", "must"], fehler: { ersatz: "must", wort: "must", loesung: ["had to"] } },
      { e: "past",   t: "At my old school we ___ use our phones in class.", h: "not / may – past", r: ["weren't allowed to", "were not allowed to"], f: ["didn't may", "aren't allowed to"], fehler: { ersatz: "aren't allowed to", wort: "aren't", loesung: ["weren't", "were not"] } },
      { e: "past",   t: "When Mia was five, she ___ already swim.", h: "can – past", r: ["could", "was able to"], f: ["can", "could to"], fehler: "can" },
      { e: "ersatz", t: "In American schools, students ___ leave the classroom without a hall pass.", h: "not / be allowed to", r: ["aren't allowed to", "are not allowed to"], f: ["don't allowed to", "aren't allow to"], fehler: { ersatz: "aren't allow to", wort: "allow", loesung: ["allowed"] } },
      { e: "ersatz", t: "My host brother ___ get up at six because the school bus comes early.", h: "have to", r: ["has to"], f: ["have to", "must to"], fehler: { ersatz: "have to", wort: "have", loesung: ["has"] } },
      { e: "ersatz", t: "Zoe is very good at sports. She ___ run five kilometers in twenty minutes.", h: "be able to", r: ["is able to"], f: ["are able to", "is able"], fehler: { ersatz: "are able to", wort: "are", loesung: ["is"] } },
      { e: "ersatz", t: "My little brother ___ watch TV after nine o'clock.", h: "not / be allowed to", r: ["isn't allowed to", "is not allowed to"], f: ["doesn't allowed to", "aren't allowed to"], fehler: { ersatz: "aren't allowed to", wort: "aren't", loesung: ["isn't", "is not"] } },
      { e: "frage",  t: "___ you have to wear a uniform at your school?", h: "do", r: ["Do"], f: ["Must", "Have"], fehler: "Have" },
      { k: "detention", e: "frage",  t: "Yesterday was a long day. ___ you have to stay in detention?", h: "do", r: ["Did"], f: ["Had", "Must"], fehler: "Had" }
    ],
    umformen: [
      { e: "ersatz", a: "Use „be able to“:", von: "I can speak three languages.", nach: ["I am able to speak three languages.", "I'm able to speak three languages."] },
      { e: "ersatz", a: "Use „have to“:", von: "Students must wear a uniform.", nach: ["Students have to wear a uniform."] },
      { e: "ersatz", a: "Use „be allowed to“:", von: "You may not eat in the library.", nach: ["You aren't allowed to eat in the library.", "You are not allowed to eat in the library.", "You're not allowed to eat in the library."] },
      { k: "locker3", e: "past",   a: "Put the sentence into the past:", von: "I must clean my locker.", nach: ["I had to clean my locker."] },
      { e: "past",   a: "Put the sentence into the past:", von: "We can't find the principal's office.", nach: ["We couldn't find the principal's office.", "We could not find the principal's office.", "We weren't able to find the principal's office.", "We were not able to find the principal's office."] },
      { e: "past",   a: "Put the sentence into the past:", von: "Mia isn't allowed to go to the party.", nach: ["Mia wasn't allowed to go to the party.", "Mia was not allowed to go to the party."] },
      { e: "past",   a: "Put the sentence into the past:", von: "My host family must sell their car.", nach: ["My host family had to sell their car."] },
      { e: "past",   a: "Put the sentence into the past:", von: "The freshmen can choose an elective.", nach: ["The freshmen could choose an elective.", "The freshmen were able to choose an elective."] },
      { k: "drive", e: "futur",  a: "Put the sentence into the future (will):", von: "I can drive a car.", nach: ["I will be able to drive a car.", "I'll be able to drive a car."] },
      { e: "futur",  a: "Put the sentence into the future (will):", von: "We must get up early.", nach: ["We will have to get up early.", "We'll have to get up early."] },
      { e: "futur",  a: "Put the sentence into the future (will):", von: "Jake may stay up late.", nach: ["Jake will be allowed to stay up late."] },
      { e: "futur",  a: "Put the sentence into the future (will):", von: "She can't come to the game.", nach: ["She won't be able to come to the game.", "She will not be able to come to the game."] },
      { e: "frage",  a: "Ask a question:", von: "Carlos has to work on Saturdays.", nach: ["Does Carlos have to work on Saturdays?"] }
    ],
    zuordnen: {
      kategorien: ["can", "must", "may"],
      woerter: [
        { text: "be able to", ziel: "can" }, { text: "was able to", ziel: "can" }, { text: "will be able to", ziel: "can" }, { text: "could", ziel: "can" },
        { text: "have to", ziel: "must" }, { text: "had to", ziel: "must" }, { text: "will have to", ziel: "must" }, { text: "has to", ziel: "must" },
        { text: "be allowed to", ziel: "may" }, { text: "was allowed to", ziel: "may" }, { text: "will be allowed to", ziel: "may" }, { text: "were allowed to", ziel: "may" }
      ]
    },
    erklaerungen: {
      satzpool: {
        ersatz: "Substitute forms (Ersatzformen): can → am/is/are able to, must → have/has to, may → am/is/are allowed to. Example: {BEISPIEL}",
        past:   "Past (Vergangenheit): could / was able to, had to, was/were allowed to. Example: {BEISPIEL}",
        futur:  "Future (Zukunft): „will can“ and „will must“ don't exist! Use will be able to, will have to, will be allowed to. Example: {BEISPIEL}",
        frage:  "Questions with have to need do, does or did: Do you have to …? Example: {BEISPIEL}",
        zuordnen: "can → be able to (could), must → have to (had to), may → be allowed to."
      }
    }
  },

  // ---------- Klasse 8, Unit 2: if-Sätze Typ I (G4) ----------
  "8-U2": {
    ifSaetze: [
      { w: "a tornado {comes}",            grund: "come",  wf: "come",    s2: "we",  e: "go",    ing: "going",   r2: "to the school gym" },
      { w: "you {forget} your hall pass",  grund: "forget", wf: "forgets", s2: "you", e: "get",   ing: "getting", r2: "detention" },
      { w: "Jake {joins} the basketball team", wer: "Jake", grund: "join", wf: "join", s2: "he", e: "make", ing: "making", r2: "lots of new friends" },
      { w: "I {find} a job",               grund: "find",  wf: "finds",   s2: "I",   e: "earn",  ing: "earning", r2: "my own money" },
      { w: "we {win} the competition",     grund: "win",   wf: "wins",    s2: "we",  e: "get",   ing: "getting", r2: "a prize" },
      { w: "Mia {passes} her driving test", wer: "Mia", grund: "pass", wf: "pass", s2: "she", e: "get", ing: "getting", r2: "her driver's license" },
      { w: "it {snows} tomorrow",          grund: "snow",  wf: "snow",    s2: "the school bus", e: "come", ing: "coming", r2: "", neg: true },
      { w: "you {are} rude to the principal", grund: "be", wf: "is",      s2: "she", e: "call",  ing: "calling", r2: "your parents" },
      { w: "the storm {gets} worse",       grund: "get",   wf: "get",     s2: "we",  e: "stay",  ing: "staying", r2: "inside" },
      { w: "I {apply} for the job",        grund: "apply", wf: "applies", s2: "the boss", e: "invite", ing: "inviting", r2: "me to an interview" },
      { w: "my host family {visits} Chicago", grund: "visit", wf: "visit", s2: "I", e: "go",    ing: "going",   r2: "with them" },
      { w: "you {work} hard",              grund: "work",  wf: "works",   s2: "you", e: "do",    ing: "doing",   r2: "well at school" },
      { w: "Carlos {misses} the bus",      wer: "Carlos", grund: "miss", wf: "miss", s2: "he", e: "be", ing: "being", r2: "late for school" },
      { w: "we {go} on a field trip",      grund: "go",    wf: "goes",    s2: "we",  e: "see",   ing: "seeing",  r2: "lots of farmland" },
      { w: "it {is} sunny on Saturday",    grund: "be",    wf: "are",     s2: "we",  e: "have",  ing: "having",  r2: "a picnic" }
    ],
    erklaerungen: {
      ifsatz: {
        wenn:  "In the if-clause (if-Satz) we use the simple present – never will! he/she/it: -s. Example: {BEISPIEL}",
        haupt: "In the main clause (Hauptsatz) we use will/'ll (or won't) + infinitive (Grundform). Example: {BEISPIEL}",
        komma: "If the if-clause comes first, use a comma (Komma). If it comes second, there is no comma. Example: {BEISPIEL}",
        zuordnen: "Correct: If + simple present, … will + infinitive. Wrong: will in the if-clause, or no -s after he/she/it."
      }
    }
  },

  // ---------- Klasse 8, Unit 2: Stützwort one / ones (G5) ----------
  "8-G5": {
    saetze: [
      { e: "one",   t: "I don't like the red T-shirt. I prefer the blue ___.", r: ["one"], f: ["ones", "it"], fehler: "ones" },
      { k: "phone", e: "one",   t: "My old phone is broken, so I need a new ___.", r: ["one"], f: ["ones", "it"], fehler: "ones" },
      { e: "one",   t: "This tray is dirty. Can I have a clean ___, please?", r: ["one"], f: ["ones", "it"], fehler: "ones" },
      { e: "one",   t: "I have two brothers. The older ___ is a freshman.", r: ["one"], f: ["ones", "it"], fehler: "ones" },
      { k: "bike", e: "one",   t: "My bike is too small for me. I want a bigger ___.", r: ["one"], f: ["ones", "it"], fehler: "ones" },
      { k: "shoes", e: "ones",  t: "These shoes are too small. Do you have any bigger ___?", r: ["ones"], f: ["one", "it"], fehler: "one" },
      { e: "ones",  t: "The store had lots of caps, but the cheap ___ were all ugly.", r: ["ones"], f: ["one", "it"], fehler: "one" },
      { e: "ones",  t: "Our new classes are great, but the old ___ were boring.", r: ["ones"], f: ["one", "it"], fehler: "one" },
      { e: "ones",  t: "These apples are bad. Let's buy some fresh ___.", r: ["ones"], f: ["one", "it"], fehler: "one" },
      { e: "ones",  t: "Do you need new pencils? – No, thanks. I have some new ___ in my bag.", r: ["ones"], f: ["one", "it"], fehler: "one" },
      { k: "locker5", e: "which", t: "There are two lockers. Which ___ is yours?", r: ["one"], f: ["ones", "it"], fehler: "ones" },
      { k: "shoes", e: "which", t: "There are lots of shoes on the floor. Which ___ are yours?", r: ["ones"], f: ["one", "it"], fehler: "one" },
      { e: "which", t: "Excuse me, which ___ is the bus to Oklahoma City?", r: ["one"], f: ["ones", "it"], fehler: "ones" },
      { e: "which", t: "Here are two schedules. Which ___ is for the freshmen?", r: ["one"], f: ["ones", "it"], fehler: "ones" }
    ],
    umformen: [
      { e: "one",   a: "Use one or ones for the second noun:", von: "I don't want the big pizza. I want the small pizza.", nach: ["I don't want the big pizza. I want the small one."] },
      { k: "shoes", e: "ones",  a: "Use one or ones for the second noun:", von: "My old shoes are dirty, so I bought new shoes.", nach: ["My old shoes are dirty, so I bought new ones."] },
      { e: "which", a: "Use one or ones for the second noun:", von: "There are two buses. Which bus goes downtown?", nach: ["There are two buses. Which one goes downtown?"] },
      { e: "ones",  a: "Use one or ones for the second noun:", von: "I like the yellow cabs more than the black cabs.", nach: ["I like the yellow cabs more than the black ones."] },
      { k: "locker5", e: "one",   a: "Use one or ones for the second noun:", von: "This locker is broken. Can I have another locker?", nach: ["This locker is broken. Can I have another one?"] },
      { e: "one",   a: "Use one or ones for the second noun:", von: "Our school has two gyms. The new gym is huge.", nach: ["Our school has two gyms. The new one is huge."] },
      { e: "which", a: "Use one or ones for the second noun:", von: "These are my sneakers. Which sneakers are yours?", nach: ["These are my sneakers. Which ones are yours?"] },
      { e: "ones",  a: "Use one or ones for the second noun:", von: "The skyscrapers in Chicago are tall, but the skyscrapers in New York are taller.", nach: ["The skyscrapers in Chicago are tall, but the ones in New York are taller."] },
      { k: "bike", e: "one",   a: "Use one or ones for the second noun:", von: "My brother has a red bike and a blue bike. He rides the blue bike every day.", nach: ["My brother has a red bike and a blue bike. He rides the blue one every day."] },
      { e: "one",   a: "Use one or ones for the second noun:", von: "The first interview was boring, but the second interview was great.", nach: ["The first interview was boring, but the second one was great."] },
      { e: "ones",  a: "Use one or ones for the second noun:", von: "Which shirts do you like? – I like the white shirts.", nach: ["Which shirts do you like? – I like the white ones.", "Which shirts do you like? I like the white ones."] },
      { k: "phone", e: "one",   a: "Use one or ones for the second noun:", von: "Mia's old phone was slow. Her new phone is fast.", nach: ["Mia's old phone was slow. Her new one is fast."] }
    ],
    zuordnen: {
      kategorien: ["one", "ones"],
      woerter: [
        { text: "the red cap", ziel: "one" }, { text: "the old shoes", ziel: "ones" }, { text: "a new locker", ziel: "one" }, { text: "the cheap jackets", ziel: "ones" },
        { text: "a big bagel", ziel: "one" }, { text: "the small hot dogs", ziel: "ones" }, { text: "the yellow cab", ziel: "one" }, { text: "the black cabs", ziel: "ones" },
        { text: "an easy test", ziel: "one" }, { text: "the new schedules", ziel: "ones" }, { text: "a clean tray", ziel: "one" }, { text: "the tall skyscrapers", ziel: "ones" }
      ]
    },
    erklaerungen: {
      satzpool: {
        one:   "Use one instead of a singular noun (Einzahl) so you don't repeat it (Stützwort): the red T-shirt → the blue one. Example: {BEISPIEL}",
        ones:  "Use ones instead of a plural noun (Mehrzahl): my old shoes → new ones. Example: {BEISPIEL}",
        which: "Which one? = one thing (Einzahl, is). Which ones? = more things (Mehrzahl, are). Example: {BEISPIEL}",
        zuordnen: "Singular noun (Einzahl) → one. Plural noun (Mehrzahl) → ones."
      }
    }
  }
};

// =====================================================================
// 5) GENERATOREN
// =====================================================================
K8.generatoren = {
  "8-G1": { baukasten: "8-U1", art: "pastalle" },
  "8-G2": { baukasten: "8-G2", art: "satzpool" },
  "8-G3": { baukasten: "8-G3", art: "satzpool" },
  "8-G4": { baukasten: "8-U2", art: "ifsatz" },
  "8-G5": { baukasten: "8-G5", art: "satzpool" }
};

// =====================================================================
// 6) DIE AUFGABEN (handgeschriebener Pool)
// =====================================================================
K8.aufgaben = [
  { thema: "8-G1", niveau: "gruen", form: "quiz", frage: "Last summer my aunt ___ to Chicago.", optionen: ["flew", "flied", "flyed"], loesung: "flew",
    erklaerung: "fly is irregular (unregelmäßig): fly → flew. Example: We took the subway to Times Square." },
  { thema: "8-G1", niveau: "gelb", form: "luecke", frage: "___ you ___ (see) the Statue of Liberty last week?", loesung: [["Did"], ["see"]],
    erklaerung: "Questions in the simple past: Did + person + infinitive (Grundform). Example: Did Mia visit Ellis Island?" },
  { thema: "8-G1", niveau: "rot", form: "fehler", satz: "We didn't went to the ice rink yesterday.", fehlerwort: "went", loesung: ["go"],
    erklaerung: "After didn't we use the infinitive (Grundform). Example: Jake didn't buy a souvenir." },
  { thema: "8-G2", niveau: "gruen", form: "quiz", frage: "When I got home, my brother ___ all the pizza.", optionen: ["had eaten", "has eaten", "had eat"], loesung: "had eaten",
    erklaerung: "The earlier action gets had + 3rd form (Vorvergangenheit). Example: When we got to the harbor, the ferry had left." },
  { thema: "8-G2", niveau: "rot", form: "fehler", satz: "After we had walked across the bridge, we taked a cab.", fehlerwort: "taked", loesung: ["took"],
    erklaerung: "The later action is in the simple past: we took a cab. Example: After Jake had bought a hot dog, he walked to the ice rink." },
  { thema: "8-G3", niveau: "gruen", form: "quiz", frage: "Next week I ___ go to school because it's vacation.", optionen: ["won't have to", "won't must", "mustn't"], loesung: "won't have to",
    erklaerung: "„will must“ doesn't exist. Future of must: will have to (won't have to = nicht müssen). Example: We'll have to get up early." },
  { thema: "8-G3", niveau: "gelb", form: "luecke", frage: "When I was ten, I ___ (not / may) stay up late.", loesung: ["wasn't allowed to", "was not allowed to"],
    erklaerung: "Past of may: was/were allowed to. Example: At my old school we weren't allowed to use our phones." },
  { thema: "8-G4", niveau: "gruen", form: "quiz", frage: "If you ___ the bus, you'll be late.", optionen: ["miss", "will miss", "missed"], loesung: "miss",
    erklaerung: "In the if-clause (if-Satz) we use the simple present, not will. Example: If it snows tomorrow, the school bus won't come." },
  { thema: "8-G4", niveau: "rot", form: "fehler", satz: "If the boss likes you, he'll gives you the job.", fehlerwort: "gives", loesung: ["give"],
    erklaerung: "After will/'ll we use the infinitive (Grundform) without -s. Example: If we win the competition, we'll get a prize." },
  { thema: "8-G5", niveau: "gruen", form: "quiz", frage: "I don't want the old map. Can I have a new ___?", optionen: ["one", "ones", "it"], loesung: "one",
    erklaerung: "map is singular (Einzahl) → one. Example: My bike is too small. I want a bigger one." },
  { thema: "8-G5", niveau: "gelb", form: "luecke", frage: "Which ___ (one / ones) are your favorite subjects?", loesung: ["ones"],
    erklaerung: "subjects is plural (Mehrzahl) → ones. Example: There are lots of shoes. Which ones are yours?" }
];

// =====================================================================
// 7) ZUSATZFRAGEN für den Zusatzraum (Quiz mit 3 Antworten)
// =====================================================================
K8.zusatzfragen = [
  { thema: "8-G1", frage: "Which is the past of „ride“?", optionen: ["rode", "rided", "ridden"], loesung: "rode" },
  { thema: "8-G1", frage: "Which sentence is correct?", optionen: ["Did you see the skyline?", "Did you saw the skyline?", "Saw you the skyline?"], loesung: "Did you see the skyline?" },
  { thema: "8-G1", frage: "„Did Mia try a bagel?“ – „No, …“", optionen: ["she didn't.", "she doesn't.", "she didn't try."], loesung: "she didn't." },
  { thema: "8-G1", frage: "We … the subway to Times Square.", optionen: ["took", "taked", "take yesterday"], loesung: "took" },
  { thema: "8-G2", frage: "When we arrived, the show … started.", optionen: ["had already", "has already", "already had been"], loesung: "had already" },
  { thema: "8-G2", frage: "Which is past perfect?", optionen: ["had seen", "saw", "has seen"], loesung: "had seen" },
  { thema: "8-G2", frage: "After she … her homework, she went out.", optionen: ["had finished", "has finished", "finishes"], loesung: "had finished" },
  { thema: "8-G2", frage: "… you ever been to a big city before the trip?", optionen: ["Had", "Did", "Was"], loesung: "Had" },
  { thema: "8-G3", frage: "Next year I … drive a car.", optionen: ["will be able to", "will can", "can will"], loesung: "will be able to" },
  { thema: "8-G3", frage: "Yesterday we … stay in detention.", optionen: ["had to", "must", "musted"], loesung: "had to" },
  { thema: "8-G3", frage: "Students … use their phones in class.", optionen: ["aren't allowed to", "don't allowed to", "aren't allow to"], loesung: "aren't allowed to" },
  { thema: "8-G3", frage: "… your brother have to work on Saturdays?", optionen: ["Does", "Has", "Must"], loesung: "Does" },
  { thema: "8-G4", frage: "If it … tomorrow, we'll stay inside.", optionen: ["rains", "will rain", "rain"], loesung: "rains" },
  { thema: "8-G4", frage: "If you work hard, you …", optionen: ["will do well.", "do well yesterday.", "will doing well."], loesung: "will do well." },
  { thema: "8-G4", frage: "Which sentence is correct?", optionen: ["We'll go inside if the storm gets worse.", "We'll go inside, if the storm will get worse.", "We go inside if the storm will get worse."], loesung: "We'll go inside if the storm gets worse." },
  { thema: "8-G4", frage: "If Jake … the team, he'll make new friends.", optionen: ["joins", "join", "will join"], loesung: "joins" },
  { thema: "8-G5", frage: "This cap is too small. I need a bigger …", optionen: ["one.", "ones.", "it."], loesung: "one." },
  { thema: "8-G5", frage: "My old sneakers are dirty. I want new …", optionen: ["ones.", "one.", "it."], loesung: "ones." },
  { thema: "8-G5", frage: "There are three buses. Which … goes downtown?", optionen: ["one", "ones", "it"], loesung: "one" },
  { thema: "8-G5", frage: "Which … are yours – the blue shoes or the black shoes?", optionen: ["ones", "one", "it"], loesung: "ones" }
];

// =====================================================================
// 8) MINISPIELE
//    Reward after a cleared bonus room: button „🎁 Minispiel?“. 30 seconds at most, does NOT count for the code.
//    Nur die Spiele, die unter „spiele“ stehen, werden in dieser Welt angeboten. Die Spieltechnik steht in spiele/minispiele.js.
//    titel / anleitung / erfolg = Texte (einfaches Englisch); ziel = so viele Punkte braucht man.
//    Beim Spiel codeknacker ist ziel zugleich die Länge des Codes (3 bis 5).
// =====================================================================
K8.minispiele = {
  spiele: {
    codeknacker: {
      titel: "🔐 Crack the safe",
      anleitung: "Find the four-digit code. Tap four digits. After each try you get a hint for every digit: ● right place, ◐ wrong place, ○ not in the code.",
      ziel: 4,
      erfolg: "Click. The safe is open. Morgan raises one eyebrow."
    },
    nachtflug: {
      titel: "🕊️ Rooftop flight",
      anleitung: "Tap to make the pigeon flap. Fly between the buildings and collect the clues 🔍. Bumping into things is fine.",
      ziel: 8,
      erfolg: "Eight clues. That pigeon deserves a badge."
    },
    rutsche: {
      titel: "🏃 Night chase",
      anleitung: "Tap to jump. Get over boxes and bins and pick up the clues 🔍.",
      ziel: 8,
      erfolg: "Eight clues and not one broken leg. Good run."
    }
  },
  codeknacker: { ziffern: 5, legende: "● right place · ◐ wrong place · ○ not in the code", start: "Tap four digits.", fertig: "Code cracked." },
  flug: { figur: "🕊️", stern: "🔍", krone: "🏢", himmel: ["🌧️", "·", "🌙", "·", "☁️", "·"] },
  flugAutsch: ["Ouch. A chimney.", "Keep flapping.", "Close one.", "Feathers everywhere. Go on."],
  rutsche: { figur: "🏃", fisch: "🔍", hindernisse: ["📦", "🗑️", "🚧"], hintergrund: ["🏢", "☁️", "🏢", "🌧️"] },
  rutscheAutsch: ["Crash. Keep going.", "Mind the bins.", "Ouch.", "Up you get."]
};

// ---------- More mini games (from version 0.7.1): eight games per world ----------
Object.assign(K8.minispiele.spiele, {
  taschenlampe: {
    titel: "🔦 Clues in the dark",
    anleitung: "The lights are out in the office. Move your finger to shine the torch and hold the light on a clue for a moment. Some clues are hidden behind furniture.",
    ziel: 6,
    erfolg: "Six clues found. Sharp eyes, detective."
  },
  lasergitter: {
    titel: "🚨 Sneak past the guard",
    anleitung: "The guard's torch sweeps the corridor. Tap when it says OFF to slip past. Tap at the wrong moment and you lose a second, nothing more.",
    ziel: 6,
    erfolg: "Six corridors, and nobody saw you."
  },
  obstkorb: {
    titel: "📮 Catch the evidence",
    anleitung: "The wind blows the evidence off the desk! Move the bag with your finger and catch it. Watch out for rain and rubbish!",
    ziel: 12,
    erfolg: "All the evidence is safe. The inspector is impressed."
  },
  fuettern: {
    titel: "🧳 Lost and found",
    anleitung: "People have left things in the office. Drag each thing to its owner – or tap the right person.",
    ziel: 6,
    erfolg: "Everything is back with its owner. Case closed."
  },
  schaukel: {
    titel: "🧗 Rooftop ropes",
    anleitung: "Swing across the rooftops of London. Tap when the ring ⭕ appears to jump to the next rope!",
    ziel: 6,
    erfolg: "Six roofs and not one fall. Very stylish."
  }
});
Object.assign(K8.minispiele, {
  // ---------- Clues in the dark (taschenlampe) ----------
  nachtTiere: [
    { emoji: "🔑", en: "key",          de: "Schlüssel" },   { emoji: "👣", en: "footprints", de: "Fußspuren" },
    { emoji: "🧤", en: "glove",        de: "Handschuh" },   { emoji: "✉️", en: "letter",     de: "Brief" },
    { emoji: "🕶️", en: "sunglasses",   de: "Sonnenbrille" },{ emoji: "🎩", en: "hat",        de: "Hut" },
    { emoji: "🔍", en: "magnifying glass", de: "Lupe" },    { emoji: "📷", en: "camera",     de: "Kamera" },
    { emoji: "☂️", en: "umbrella",     de: "Regenschirm" }, { emoji: "💼", en: "briefcase",  de: "Aktentasche" },
    { emoji: "🧾", en: "receipt",      de: "Kassenzettel" },{ emoji: "🗝️", en: "old key",    de: "alter Schlüssel" }
  ],
  kulisse: ["🪑", "🗄️", "🛋️", "🪴", "📚", "🗄️", "🪑", "🪴", "📦", "🛋️"],

  // ---------- Sneak past the guard (lasergitter) ----------
  lasergitter: { figur: "🕵️", ziel: "🚪", an: "ON", aus: "OFF", hinweis: "Tap when the light is OFF.", autsch: ["Wait for OFF.", "Too early.", "Patience, detective."] },

  // ---------- Catch the evidence (obstkorb) ----------
  obst: [
    { emoji: "✉️", en: "letter",   de: "Brief" },        { emoji: "🔑", en: "key",      de: "Schlüssel" },
    { emoji: "🖼️", en: "photo",    de: "Foto" },         { emoji: "🎫", en: "ticket",   de: "Eintrittskarte" },
    { emoji: "💳", en: "card",     de: "Karte" },        { emoji: "🧾", en: "receipt",  de: "Kassenzettel" },
    { emoji: "📒", en: "notebook", de: "Notizbuch" },    { emoji: "💍", en: "ring",     de: "Ring" },
    { emoji: "🧤", en: "glove",    de: "Handschuh" },    { emoji: "🔍", en: "magnifying glass", de: "Lupe" }
  ],
  muell: ["💧", "🥫", "🧦", "🍌"],
  autsch: ["Splash! Just rain.", "A tin? That's not evidence.", "Socks? Really?", "A banana? Not a clue."],

  // ---------- Lost and found (fuettern): tiere = owners, futter = things ----------
  tiere: [
    { id: "chef",    emoji: "👨‍🍳", en: "chef",        de: "Koch",           witz: "The chef looks confused: “{futter}? That's not mine!”" },
    { id: "doctor",  emoji: "👩‍⚕️", en: "doctor",      de: "Ärztin",         witz: "The doctor shakes her head: “{futter}? Not mine, sorry.”" },
    { id: "painter", emoji: "👨‍🎨", en: "painter",     de: "Maler",          witz: "The painter laughs: “{futter}? I only need my brushes!”" },
    { id: "pilot",   emoji: "👩‍✈️", en: "pilot",       de: "Pilotin",        witz: "The pilot smiles: “{futter}? Not in my cockpit!”" },
    { id: "singer",  emoji: "🧑‍🎤", en: "singer",      de: "Sänger",         witz: "The singer sings: “{futter}? No, no, no-o-o!”" },
    { id: "farmer",  emoji: "👨‍🌾", en: "farmer",      de: "Bauer",          witz: "The farmer frowns: “{futter}? Never seen that before.”" },
    { id: "fire",    emoji: "👩‍🚒", en: "firefighter", de: "Feuerwehrfrau",  witz: "The firefighter says: “{futter}? Not mine – I've got my helmet!”" }
  ],
  futter: [
    { emoji: "🍳", en: "frying pan",       de: "Pfanne",          haupt: ["chef"],    auch: [] },
    { emoji: "🩺", en: "stethoscope",      de: "Stethoskop",      haupt: ["doctor"],  auch: [] },
    { emoji: "💊", en: "pills",            de: "Tabletten",       haupt: ["doctor"],  auch: [] },
    { emoji: "🖌️", en: "paintbrush",       de: "Pinsel",          haupt: ["painter"], auch: [] },
    { emoji: "🎨", en: "palette",          de: "Farbpalette",     haupt: ["painter"], auch: [] },
    { emoji: "✈️", en: "model plane",      de: "Modellflugzeug",  haupt: ["pilot"],   auch: [] },
    { emoji: "🎤", en: "microphone",       de: "Mikrofon",        haupt: ["singer"],  auch: [] },
    { emoji: "🎸", en: "guitar",           de: "Gitarre",         haupt: ["singer"],  auch: [] },
    { emoji: "🚜", en: "toy tractor",      de: "Spielzeugtraktor", haupt: ["farmer"], auch: [] },
    { emoji: "🧯", en: "fire extinguisher", de: "Feuerlöscher",   haupt: ["fire"],    auch: ["chef"] }
  ],
  lob: ["👍 Thanks!", "👍 That's mine!", "👍 Great!", "👍 Perfect!"],

  // ---------- Rooftop ropes (schaukel) ----------
  affe: "🕵️", seil: "#8a6d4b", seilDeko: "", netzZeichen: "🗑️",
  netz: ["Into the bins! Try again.", "Oops! Again.", "Wait for the ring ⭕."]
});

// ---------- Losing (from version 0.7.2): three hearts, traps in the torch game ----------
Object.assign(K8.minispiele, {
  // Meldung, wenn alle drei Herzen weg sind (eine davon wird ausgelost)
  gameOver: ["Three mistakes. The case stays open.", "Game over, detective. Three mistakes."],
  // Taschenlampe: Fallen im Dunkeln – wer sie zu lange anleuchtet, verliert ein Herz
  fallen: [
    { emoji: "🚨", text: "Alarm! You set off the alarm." },
    { emoji: "🐕", text: "Woof! The guard dog!" },
    { emoji: "🕷️", text: "A spider! Eek!" }
  ]
});
