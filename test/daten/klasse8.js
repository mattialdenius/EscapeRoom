/* =====================================================================
   KLASSE 8  ·  alle Inhalte für Klasse 8
   ---------------------------------------------------------------------
   STAND 20.11.2026: Alle Units 1–5 (Themen G1–G14) haben Aufgaben.
   Solange Aufgaben fehlen, zeigt das Startmenü „Kommt bald!“.
   Vorschau der Welt mit den Aufgaben aus Klasse 5: Adresse mit ?welt=8
   Wie eine fertige Klasse aussieht: siehe klasse5.js und klasse-vorlage.js.
   ===================================================================== */

const K8 = neueKlasse(8);   // bitte nicht ändern

// 1) DIE WELT
K8.welt = {
  name: "The Detective Agency in London", emoji: "🕵️",
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
    zeitWarnung:      ["Quick – the thief is leaving London!"],
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
    waechter:        "Be quick. The thief won't wait.",
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
  { id: "8-G1",  klasse: 8, unit: 1, titelEn: "Simple past", titel: "Die einfache Vergangenheit", regel: "Simple past (einfache Vergangenheit) for finished actions in the past (yesterday, last week, … ago). Regular verbs: -ed (visit → visited, try → tried, stop → stopped). Irregular verbs (unregelmäßig): learn them (take → took, buy → bought). Negative: didn't + infinitive (I didn't go). Questions: Did + person + infinitive? (Did you go?)" },
  { id: "8-G2",  klasse: 8, unit: 1, titelEn: "Past perfect", titel: "Die Vorvergangenheit", regel: "Past perfect (Vorvergangenheit) = had + past participle (3. Form). It shows what happened BEFORE another action in the past: When we got to the harbor, the ferry had already left. The later action is in the simple past. Negative: hadn't + 3rd form. Questions: Had you … ?" },
  { id: "8-G3",  klasse: 8, unit: 2, titelEn: "Modal verbs and their substitutes", titel: "Modale Hilfsverben und ihre Ersatzformen", regel: "Substitute forms (Ersatzformen): can → be able to, must → have to, may → be allowed to. Past: could / was able to, had to, was allowed to. Negative of have to: don't/doesn't have to (= nicht müssen). Questions with have to: Do you have to …?" },
  { id: "8-G4",  klasse: 8, unit: 2, titelEn: "Conditional sentences type I", titel: "Bedingungssätze Typ I", regel: "Conditional sentences type I (Bedingungssätze Typ I): If + simple present, … will + infinitive. If it snows, the bus won't come. Never use will in the if-clause. if-clause first → comma; if-clause second → no comma." },
  { id: "8-G5",  klasse: 8, unit: 2, titelEn: "one / ones", titel: "Stützwort one/ones", regel: "one / ones (Stützwort) replace a noun so you don't repeat it. Singular (Einzahl): the red T-shirt → the blue one. Plural (Mehrzahl): my old shoes → new ones. Questions: Which one …? / Which ones …?" },
  { id: "8-G6",  klasse: 8, unit: 3, titelEn: "Question tags", titel: "Bestätigungsfragen", regel: "Question tags (Frageanhängsel) ask for agreement. Positive sentence → negative tag: It's cold, isn't it? Negative sentence → positive tag: You aren't tired, are you? Use the helping verb (Hilfsverb) again (is, was, have, can, will). No helping verb → do/does/did: She likes jazz, doesn't she?" },
  { id: "8-G7",  klasse: 8, unit: 3, titelEn: "Questions", titel: "Fragen", regel: "Yes/no questions (Entscheidungsfragen): Do/Does/Did/Will …? or Am/Is/Are …? Questions with a question word: where, when, what, why, how, whose + do/does/did/will + person + infinitive: Where does Mia live? What did you buy? What will you do? Asking for the subject (Subjektfrage): Who + verb, no do: Who lives here?" },
  { id: "8-G8",  klasse: 8, unit: 3, titelEn: "Conditional sentences type II", titel: "Bedingungssätze Typ II", regel: "Conditional sentences type II (Bedingungssätze Typ II) – only imagined, not real: If + simple past, … would + infinitive. If I had more time, I would go bowling. If I were/was president, … Type I (real): If + simple present, … will." },
  { id: "8-G9",  klasse: 8, unit: 4, titelEn: "Simple present – present progressive", titel: "Simple present – present progressive", regel: "Simple present (einfache Gegenwart): things that happen regularly – every day, usually, always, often, on Mondays: Jake posts a selfie every day. Present progressive (Verlaufsform): things happening right now – now, at the moment, Look!, Listen!: Look! Jake is posting a selfie." },
  { id: "8-G10", klasse: 8, unit: 4, titelEn: "Adjectives and adverbs", titel: "Adjektive und Adverbien", regel: "Adjectives (Adjektive) describe nouns: a careful driver, the song is catchy. Adverbs (Adverbien) describe HOW: he drives carefully (adjective + -ly). Special: good → well, fast → fast, hard → hard. After look, sound, feel, taste, smell → adjective: It sounds great." },
  { id: "8-G11", klasse: 8, unit: 4, titelEn: "Present perfect", titel: "Das Perfekt", regel: "Present perfect (Perfekt) = have/has + 3rd form: no finished time (already, just, never, ever, yet, so far). since + point in time (since 2019), for + period of time (for two years). Finished time (yesterday, last week, … ago, in 2020) → simple past: I posted it yesterday." },
  { id: "8-G12", klasse: 8, unit: 5, titelEn: "The passive", titel: "Das Passiv", regel: "Passive (Passiv): what happens is more important than who does it. Simple present: am/is/are + 3rd form (French is spoken here). Simple past: was/were + 3rd form (New Orleans was founded in 1718). Who did it? → by: The song was written by …" },
  { id: "8-G13", klasse: 8, unit: 5, titelEn: "Reported speech (no change of tense)", titel: "Indirekte Rede (ohne Zeitverschiebung)", regel: "Reported speech (indirekte Rede) with says/asks/tells: the tense stays the same (keine Zeitverschiebung). Change the pronouns: “I love jazz.” → Jake says that he loves jazz. Questions: if/whether or question word + normal word order: Mia asks where I live." },
  { id: "8-G14", klasse: 8, unit: 5, titelEn: "Reported speech (with change of tense)", titel: "Indirekte Rede (mit Zeitverschiebung)", regel: "Reported speech with said/asked/told: simple present → simple past (Zeitverschiebung). “I am tired.” → Lily said that she was tired. “Do you like jazz?” → Mia asked if I liked jazz. “Where does he work?” → Zoe asked where he worked." }
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
      { grund: "climb",  s: "climbs",  past: "climbed",  rest: "the old tower" },
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
      { e: "neg",   t: "The tourists were sad because the gallery ___ yet.", h: "not / open", r: ["hadn't opened", "had not opened"], f: ["hasn't opened", "hadn't open"], fehler: { ersatz: "hasn't opened", wort: "hasn't", loesung: ["hadn't", "had not"] } },
      { e: "frage", t: "___ the ferry already left when you arrived?", h: "have", r: ["Had"], f: ["Has", "Did"], fehler: "Has" },
      { e: "frage", t: "Had your great-grandparents ___ in Italy before they came to America?", h: "live", r: ["lived"], f: ["live", "living"], fehler: "live" },
      { k: "inspection", e: "frage", t: "How long ___ the immigrants waited before the inspection started?", h: "have", r: ["had"], f: ["have", "did"], fehler: "have" }
      // ab v0.9.10 (Paket 6b)
      ,{ e: "pp",    t: "When I got to the station, the train ___ already.", h: "leave", r: ["had left"], f: ["has left", "had leave"], fehler: { ersatz: "had leave", wort: "leave", loesung: ["left"] } }
      ,{ e: "pp",    t: "Mia was happy because she ___ the test.", h: "pass", r: ["had passed"], f: ["has passed", "had pass"], fehler: { ersatz: "has passed", wort: "has", loesung: ["had"] } }
      ,{ e: "pp",    t: "We couldn't get in because somebody ___ the door.", h: "close", r: ["had closed"], f: ["has closed", "had close"], fehler: { ersatz: "had close", wort: "close", loesung: ["closed"] } }
      ,{ e: "pp",    t: "After Jake ___ his homework, he called his friends.", h: "finish", r: ["had finished"], f: ["has finished", "had finish"], fehler: { ersatz: "had finish", wort: "finish", loesung: ["finished"] } }
      ,{ e: "pp",    t: "By the time we arrived, the movie ___.", h: "start", r: ["had started", "had already started"], f: ["has started", "had start"], fehler: { ersatz: "has started", wort: "has", loesung: ["had"] } }
      ,{ e: "past",  t: "After we had visited the museum, we ___ a pizza.", h: "eat", r: ["ate"], f: ["eated", "eats"], fehler: "eated" }
      ,{ e: "past",  t: "When Zoe ___ home, her brother had already gone to bed.", h: "come", r: ["came"], f: ["comes", "comed"], fehler: "comed" }
      ,{ e: "neg",   t: "I was hungry because I ___ breakfast.", h: "not / have", r: ["hadn't had", "had not had"], f: ["haven't had", "hadn't have"], fehler: { ersatz: "hadn't have", wort: "have", loesung: ["had"] } }
      ,{ e: "neg",   t: "Carlos got lost because he ___ the city before.", h: "not / visit", r: ["hadn't visited", "had not visited"], f: ["hasn't visited", "hadn't visit"], fehler: { ersatz: "hadn't visit", wort: "visit", loesung: ["visited"] } }
      ,{ e: "frage", t: "___ you ever been to New York before the trip?", h: "have", r: ["Had"], f: ["Has", "Did"], fehler: "Did" }
      ,{ e: "frage", t: "Had Lily ___ the Statue of Liberty before?", h: "see", r: ["seen"], f: ["saw", "see"], fehler: "saw" }
    ],
    umformen: [
      { k: "ferry-harbor", e: "pp", a: "Join the sentences with “after”:", von: "The ferry left. Then we got to the harbor.",
        nach: ["After the ferry had left, we got to the harbor.", "We got to the harbor after the ferry had left."] },
      { k: "icerink", e: "pp", a: "Join the sentences with “after”:", von: "Mia finished her homework. Then she went to the ice rink.",
        nach: ["After Mia had finished her homework, she went to the ice rink.", "Mia went to the ice rink after she had finished her homework.", "After she had finished her homework, Mia went to the ice rink."] },
      { e: "pp", a: "Join the sentences with “after”:", von: "Jake ate a bagel. Then he took the subway to school.",
        nach: ["After Jake had eaten a bagel, he took the subway to school.", "Jake took the subway to school after he had eaten a bagel.", "After he had eaten a bagel, Jake took the subway to school."] },
      { e: "pp", a: "Join the sentences with “after”:", von: "We visited the gallery. Then we had lunch downtown.",
        nach: ["After we had visited the gallery, we had lunch downtown.", "We had lunch downtown after we had visited the gallery."] },
      { k: "inspection", e: "pp", a: "Join the sentences with “after”:", von: "The immigrants passed the inspection. Then they took a ferry to Manhattan.",
        nach: ["After the immigrants had passed the inspection, they took a ferry to Manhattan.", "The immigrants took a ferry to Manhattan after they had passed the inspection.", "After they had passed the inspection, the immigrants took a ferry to Manhattan."] },
      { e: "pp", a: "Join the sentences with “before”:", von: "Zoe bought a map. Then she walked around the city.",
        nach: ["Zoe had bought a map before she walked around the city.", "Before Zoe walked around the city, she had bought a map.", "Before she walked around the city, Zoe had bought a map."] },
      { e: "pp", a: "Join the sentences with “before”:", von: "My parents booked a hotel. Then they flew to New York.",
        nach: ["My parents had booked a hotel before they flew to New York.", "Before my parents flew to New York, they had booked a hotel.", "Before they flew to New York, my parents had booked a hotel."] },
      { e: "pp", a: "Join the sentences with “when”:", von: "The show started. Then we arrived at the theater.",
        nach: ["When we arrived at the theater, the show had started.", "The show had started when we arrived at the theater.", "When we arrived at the theater, the show had already started.", "The show had already started when we arrived at the theater."] },
      { e: "neg", a: "Make the sentence negative:", von: "When we arrived, the game had started.",
        nach: ["When we arrived, the game hadn't started.", "When we arrived, the game had not started."] },
      { e: "neg", a: "Make the sentence negative:", von: "Carlos had seen the Statue of Liberty before.",
        nach: ["Carlos hadn't seen the Statue of Liberty before.", "Carlos had not seen the Statue of Liberty before."] },
      { e: "neg", a: "Make the sentence negative:", von: "I had heard of Ellis Island before the trip.",
        nach: ["I hadn't heard of Ellis Island before the trip.", "I had not heard of Ellis Island before the trip."] },
      { e: "frage", a: "Ask a question:", von: "The tourists had already checked in.", nach: ["Had the tourists already checked in?"] },
      { e: "frage", a: "Ask a question:", von: "Lily had been to New York before.", nach: ["Had Lily been to New York before?"] }
      // ab v0.9.10 (Paket 6b)
      ,{ e: "pp", a: "Join the sentences with “after”:", von: "Lily bought the tickets. Then we went into the museum.",
        nach: ["After Lily had bought the tickets, we went into the museum.", "We went into the museum after Lily had bought the tickets."] }
      ,{ e: "pp", a: "Join the sentences with “after”:", von: "We checked in. Then we went to our room.",
        nach: ["After we had checked in, we went to our room.", "We went to our room after we had checked in."] }
      ,{ e: "pp", a: "Join the sentences with “after”:", von: "Carlos read the map. Then he found the subway station.",
        nach: ["After Carlos had read the map, he found the subway station.", "Carlos found the subway station after he had read the map.", "After he had read the map, Carlos found the subway station."] }
      ,{ e: "pp", a: "Join the sentences with “after”:", von: "The rain stopped. Then we walked to Central Park.",
        nach: ["After the rain had stopped, we walked to Central Park.", "We walked to Central Park after the rain had stopped."] }
      ,{ e: "pp", a: "Join the sentences with “after”:", von: "Zoe finished her breakfast. Then she left the house.",
        nach: ["After Zoe had finished her breakfast, she left the house.", "Zoe left the house after she had finished her breakfast.", "After she had finished her breakfast, Zoe left the house."] }
      ,{ e: "pp", a: "Join the sentences with “before”:", von: "I learned some English. Then I moved to the USA.",
        nach: ["I had learned some English before I moved to the USA.", "Before I moved to the USA, I had learned some English."] }
      ,{ e: "pp", a: "Join the sentences with “before”:", von: "Mia packed her bag. Then she went to the airport.",
        nach: ["Mia had packed her bag before she went to the airport.", "Before Mia went to the airport, she had packed her bag.", "Before she went to the airport, Mia had packed her bag."] }
      ,{ e: "pp", a: "Join the sentences with “before”:", von: "We bought some food. Then we took the ferry.",
        nach: ["We had bought some food before we took the ferry.", "Before we took the ferry, we had bought some food."] }
      ,{ e: "pp", a: "Join the sentences with “when”:", von: "The bus left. Then we got to the bus stop.",
        nach: ["When we got to the bus stop, the bus had left.", "The bus had left when we got to the bus stop.", "When we got to the bus stop, the bus had already left.", "The bus had already left when we got to the bus stop."] }
      ,{ e: "neg", a: "Make the sentence negative:", von: "When I called, Jake had left.", nach: ["When I called, Jake hadn't left.", "When I called, Jake had not left."] }
      ,{ e: "neg", a: "Make the sentence negative:", von: "We had been to Manhattan before.", nach: ["We hadn't been to Manhattan before.", "We had not been to Manhattan before."] }
      ,{ e: "frage", a: "Ask a question:", von: "Zoe had finished her project.", nach: ["Had Zoe finished her project?"] }
      ,{ e: "frage", a: "Ask a question:", von: "The ferry had already arrived.", nach: ["Had the ferry already arrived?"] }
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
      // ab v0.9.10 (Paket 6b)
      ,{ e: "past",   t: "Last summer we ___ visit my grandma because our car was broken.", h: "not / can – past", r: ["couldn't", "could not", "weren't able to", "were not able to"], f: ["didn't can", "can't"], fehler: { ersatz: "can't", wort: "can't", loesung: ["couldn't", "could not", "weren't able to", "were not able to"] } }
      ,{ e: "past",   t: "Yesterday Zoe ___ walk home because she missed the bus.", h: "must – past", r: ["had to"], f: ["musted", "must"], fehler: { ersatz: "must", wort: "must", loesung: ["had to"] } }
      ,{ e: "past",   t: "When I was little, I ___ stay up late.", h: "not / may – past", r: ["wasn't allowed to", "was not allowed to"], f: ["didn't may", "isn't allowed to"], fehler: { ersatz: "isn't allowed to", wort: "isn't", loesung: ["wasn't", "was not"] } }
      ,{ e: "ersatz", t: "Carlos ___ speak Spanish and English.", h: "be able to", r: ["is able to"], f: ["are able to", "is able"], fehler: { ersatz: "are able to", wort: "are", loesung: ["is"] } }
      ,{ e: "ersatz", t: "We ___ wear a uniform at our school.", h: "have to", r: ["have to"], f: ["has to", "must to"], fehler: { ersatz: "has to", wort: "has", loesung: ["have"] } }
      ,{ e: "ersatz", t: "Students ___ use their phones in the test.", h: "not / be allowed to", r: ["aren't allowed to", "are not allowed to"], f: ["don't allowed to", "isn't allowed to"], fehler: { ersatz: "isn't allowed to", wort: "isn't", loesung: ["aren't", "are not"] } }
      ,{ e: "frage",  t: "___ your brother have to work on Saturdays?", h: "do", r: ["Does"], f: ["Do", "Has"], fehler: "Do" }
      // ab v1.2.6: will-Formen entfernt (gehören zu Klasse 9), dafür diese Sätze
      ,{ e: "past",   t: "Last night I ___ sleep because the music next door was so loud.", h: "not / can – past", r: ["couldn't", "could not", "wasn't able to", "was not able to"], f: ["didn't can", "can't"], fehler: { ersatz: "can't", wort: "can't", loesung: ["couldn't", "could not", "wasn't able to", "was not able to"] } }
      ,{ e: "past",   t: "On my first day at the new school, I ___ find my classroom.", h: "not / be able to – past", r: ["wasn't able to", "was not able to"], f: ["didn't able to", "weren't able to"], fehler: { ersatz: "weren't able to", wort: "weren't", loesung: ["wasn't", "was not"] } }
      ,{ e: "past",   t: "Last Saturday my parents ___ work, so I stayed with my grandma.", h: "must – past", r: ["had to"], f: ["musted", "must"], fehler: { ersatz: "must", wort: "must", loesung: ["had to"] } }
      ,{ e: "past",   t: "When my sister was sixteen, she ___ go to concerts alone.", h: "may – past", r: ["was allowed to"], f: ["mayed", "is allowed to"], fehler: { ersatz: "is allowed to", wort: "is", loesung: ["was"] } }
      ,{ e: "ersatz", t: "My parents ___ work on Sundays, so we always have breakfast together.", h: "not / have to", r: ["don't have to", "do not have to"], f: ["doesn't have to", "don't have"], fehler: { ersatz: "doesn't have to", wort: "doesn't", loesung: ["don't", "do not"] } }
      ,{ e: "ersatz", t: "My grandpa is eighty, but he ___ ride a bike.", h: "be able to", r: ["is able to"], f: ["are able to", "is able"], fehler: { ersatz: "are able to", wort: "are", loesung: ["is"] } }
      ,{ e: "ersatz", t: "In the library, people ___ talk loudly.", h: "not / be allowed to", r: ["aren't allowed to", "are not allowed to"], f: ["don't allowed to", "isn't allowed to"], fehler: { ersatz: "isn't allowed to", wort: "isn't", loesung: ["aren't", "are not"] } }
      ,{ e: "frage",  t: "___ Tom have to help his dad in the garden yesterday?", h: "do", r: ["Did"], f: ["Had", "Does"], fehler: "Had" }
      ,{ e: "frage",  t: "___ your host mother have to drive you to school every day?", h: "do", r: ["Does"], f: ["Do", "Has"], fehler: "Has" }
    ],
    umformen: [
      { e: "ersatz", a: "Use “be able to”:", von: "I can speak three languages.", nach: ["I am able to speak three languages.", "I'm able to speak three languages."] },
      { e: "ersatz", a: "Use “have to”:", von: "Students must wear a uniform.", nach: ["Students have to wear a uniform."] },
      { e: "ersatz", a: "Use “be allowed to”:", von: "You may not eat in the library.", nach: ["You aren't allowed to eat in the library.", "You are not allowed to eat in the library.", "You're not allowed to eat in the library."] },
      { k: "locker3", e: "past",   a: "Put the sentence into the past:", von: "I must clean my locker.", nach: ["I had to clean my locker."] },
      { e: "past",   a: "Put the sentence into the past:", von: "We can't find the principal's office.", nach: ["We couldn't find the principal's office.", "We could not find the principal's office.", "We weren't able to find the principal's office.", "We were not able to find the principal's office."] },
      { e: "past",   a: "Put the sentence into the past:", von: "Mia isn't allowed to go to the party.", nach: ["Mia wasn't allowed to go to the party.", "Mia was not allowed to go to the party."] },
      { e: "past",   a: "Put the sentence into the past:", von: "My host family must sell their car.", nach: ["My host family had to sell their car."] },
      { e: "past",   a: "Put the sentence into the past:", von: "The freshmen can choose an elective.", nach: ["The freshmen could choose an elective.", "The freshmen were able to choose an elective."] },
      { e: "frage",  a: "Ask a question:", von: "Carlos has to work on Saturdays.", nach: ["Does Carlos have to work on Saturdays?"] }
      // ab v0.9.10 (Paket 6b)
      ,{ e: "ersatz", a: "Use “be able to”:", von: "Tom can play the guitar.", nach: ["Tom is able to play the guitar."] }
      ,{ e: "ersatz", a: "Use “have to”:", von: "You must be quiet in the library.", nach: ["You have to be quiet in the library."] }
      ,{ e: "ersatz", a: "Use “be allowed to”:", von: "We may not run in the school building.", nach: ["We aren't allowed to run in the school building.", "We are not allowed to run in the school building."] }
      ,{ e: "ersatz", a: "Use “be allowed to”:", von: "My sister may use my bike.", nach: ["My sister is allowed to use my bike."] }
      ,{ e: "past",   a: "Put the sentence into the past:", von: "I must walk to school.", nach: ["I had to walk to school."] }
      ,{ e: "past",   a: "Put the sentence into the past:", von: "Jake can't come to the party.", nach: ["Jake couldn't come to the party.", "Jake could not come to the party.", "Jake wasn't able to come to the party.", "Jake was not able to come to the party."] }
      ,{ e: "past",   a: "Put the sentence into the past:", von: "We aren't allowed to watch TV.", nach: ["We weren't allowed to watch TV.", "We were not allowed to watch TV."] }
      ,{ e: "past",   a: "Put the sentence into the past:", von: "Mia can swim very fast.", nach: ["Mia could swim very fast.", "Mia was able to swim very fast."] }
      ,{ e: "frage",  a: "Ask a question:", von: "Mia has to stay at home.", nach: ["Does Mia have to stay at home?"] }
      ,{ e: "frage",  a: "Ask a question:", von: "They had to wait for an hour.", nach: ["Did they have to wait for an hour?"] }
      // ab v1.2.6: will-Formen entfernt (gehören zu Klasse 9), dafür diese Aufgaben
      ,{ e: "ersatz", a: "Use “be able to”:", von: "My dog can open the door.", nach: ["My dog is able to open the door."] }
      ,{ e: "ersatz", a: "Use “have to”:", von: "Jake must clean his room.", nach: ["Jake has to clean his room."] }
      ,{ e: "ersatz", a: "Use “be allowed to”:", von: "You may not swim in the lake.", nach: ["You aren't allowed to swim in the lake.", "You are not allowed to swim in the lake.", "You're not allowed to swim in the lake."] }
      ,{ e: "past",   a: "Put the sentence into the past:", von: "I can't open the window.", nach: ["I couldn't open the window.", "I could not open the window.", "I wasn't able to open the window.", "I was not able to open the window."] }
      ,{ e: "past",   a: "Put the sentence into the past:", von: "Zoe has to wait for the bus.", nach: ["Zoe had to wait for the bus."] }
      ,{ e: "past",   a: "Put the sentence into the past:", von: "The students are allowed to leave early.", nach: ["The students were allowed to leave early."] }
      ,{ e: "frage",  a: "Ask a question:", von: "Ben has to go to detention.", nach: ["Does Ben have to go to detention?"] }
    ],
    zuordnen: {
      kategorien: ["can", "must", "may"],
      woerter: [
        { text: "be able to", ziel: "can" }, { text: "was able to", ziel: "can" }, { text: "were able to", ziel: "can" }, { text: "could", ziel: "can" },
        { text: "have to", ziel: "must" }, { text: "had to", ziel: "must" }, { text: "don't have to", ziel: "must" }, { text: "has to", ziel: "must" },
        { text: "be allowed to", ziel: "may" }, { text: "was allowed to", ziel: "may" }, { text: "is allowed to", ziel: "may" }, { text: "were allowed to", ziel: "may" }
      ]
    },
    erklaerungen: {
      satzpool: {
        ersatz: "Substitute forms (Ersatzformen): can → am/is/are able to, must → have/has to, may → am/is/are allowed to. Example: {BEISPIEL}",
        past:   "Past (Vergangenheit): could / was able to, had to, was/were allowed to. Example: {BEISPIEL}",
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
      // ab v0.9.10 (Paket 6b)
      ,{ w: "you {study} for the test",     grund: "study", wf: "studies", s2: "you", e: "get",   ing: "getting", r2: "a good grade" }
      ,{ w: "Zoe {is} late again", wer: "Zoe", grund: "be", wf: "are",     s2: "she", e: "get",   ing: "getting", r2: "detention" }
      ,{ w: "we {take} a cab",              grund: "take",  wf: "takes",   s2: "we",  e: "be",    ing: "being",   r2: "there in ten minutes" }
      ,{ w: "you {join} the drama club",    grund: "join",  wf: "joins",   s2: "you", e: "meet",  ing: "meeting", r2: "lots of people" }
      ,{ w: "my parents {say} yes",         grund: "say",   wf: "says",    s2: "I",   e: "stay",  ing: "staying", r2: "in the USA for a year" }
      ,{ w: "the bus {is} late",            grund: "be",    wf: "are",     s2: "we",  e: "miss",  ing: "missing", r2: "the first lesson" }
      ,{ w: "Carlos {gets} the job", wer: "Carlos", grund: "get", wf: "get", s2: "he", e: "earn",  ing: "earning", r2: "his own money" }
      ,{ w: "you {need} help with your homework", grund: "need", wf: "needs", s2: "I", e: "help", ing: "helping", r2: "you" }
      ,{ w: "it {rains} tomorrow",          grund: "rain",  wf: "rain",    s2: "we",  e: "stay",  ing: "staying", r2: "at home" }
      ,{ w: "I {sleep} too little",         grund: "sleep", wf: "sleeps",  s2: "I",   e: "be",    ing: "being",   r2: "tired tomorrow" }
      ,{ w: "Mia {forgets} her lunch", wer: "Mia", grund: "forget", wf: "forget", s2: "she", e: "be", ing: "being", r2: "hungry" }
      ,{ w: "you {are} late",               grund: "be",    wf: "is",      s2: "the teacher", e: "be", ing: "being", r2: "happy", neg: true }
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
      { e: "one",   t: "I don't like the red T-shirt. I want the blue ___.", r: ["one"], f: ["ones", "it"], fehler: "ones" },
      { k: "phone", e: "one",   t: "My old phone is broken, so I need a new ___.", r: ["one"], f: ["ones", "it"], fehler: "ones" },
      { e: "one",   t: "This tray is dirty. Can I have a clean ___, please?", r: ["one"], f: ["ones", "it"], fehler: "ones" },
      { e: "one",   t: "I have two brothers. The older ___ is a freshman.", r: ["one"], f: ["ones", "it"], fehler: "ones" },
      { k: "bike", e: "one",   t: "My bike is too small for me. I want a bigger ___.", r: ["one"], f: ["ones", "it"], fehler: "ones" },
      { k: "shoes", e: "ones",  t: "These shoes are too small. Do you have any bigger ___?", r: ["ones"], f: ["one", "it"], fehler: "one" },
      { e: "ones",  t: "The store had lots of caps, but the cheap ___ were all too small.", r: ["ones"], f: ["one", "it"], fehler: "one" },
      { e: "ones",  t: "Our new classes are great, but the old ___ were boring.", r: ["ones"], f: ["one", "it"], fehler: "one" },
      { e: "ones",  t: "These apples are bad. Let's buy some fresh ___.", r: ["ones"], f: ["one", "it"], fehler: "one" },
      { e: "ones",  t: "Do you need new pencils? – No, thanks. I have some new ___ in my bag.", r: ["ones"], f: ["one", "it"], fehler: "one" },
      { k: "locker5", e: "which", t: "There are two lockers. Which ___ is yours?", r: ["one"], f: ["ones", "it"], fehler: "ones" },
      { k: "shoes", e: "which", t: "There are lots of shoes on the floor. Which ___ are yours?", r: ["ones"], f: ["one", "it"], fehler: "one" },
      { e: "which", t: "Excuse me, which ___ is the bus to Oklahoma City?", r: ["one"], f: ["ones", "it"], fehler: "ones" },
      { e: "which", t: "Here are two schedules. Which ___ is for the freshmen?", r: ["one"], f: ["ones", "it"], fehler: "ones" }
      // ab v0.9.10 (Paket 6b)
      ,{ e: "one",   t: "This chair is broken. Please take another ___.", r: ["one"], f: ["ones", "it"], fehler: "ones" }
      ,{ e: "one",   t: "I don't like this cap. Do you have a black ___?", r: ["one"], f: ["ones", "it"], fehler: "ones" }
      ,{ e: "one",   t: "Our old car was very slow. Our new ___ is much faster.", r: ["one"], f: ["ones", "it"], fehler: "ones" }
      ,{ e: "one",   t: "The first song was boring, but the second ___ was great.", r: ["one"], f: ["ones", "it"], fehler: "ones" }
      ,{ e: "one",   t: "I have two sisters. The younger ___ is eight.", r: ["one"], f: ["ones", "it"], fehler: "ones" }
      ,{ e: "ones",  t: "I don't like these sneakers. Can I see the white ___?", r: ["ones"], f: ["one", "it"], fehler: "one" }
      ,{ e: "ones",  t: "My jeans are too short. I need some longer ___.", r: ["ones"], f: ["one", "it"], fehler: "one" }
      ,{ e: "ones",  t: "The small pizzas are cheap, but the big ___ are expensive.", r: ["ones"], f: ["one", "it"], fehler: "one" }
      ,{ e: "ones",  t: "Our old teachers were nice, and the new ___ are nice too.", r: ["ones"], f: ["one", "it"], fehler: "one" }
      ,{ e: "which", t: "There are three backpacks here. Which ___ is yours?", r: ["one"], f: ["ones", "it"], fehler: "ones" }
      ,{ e: "which", t: "There are lots of photos on the wall. Which ___ are from New York?", r: ["ones"], f: ["one", "it"], fehler: "one" }
      ,{ e: "which", t: "Look at the two dresses. Which ___ is cheaper?", r: ["one"], f: ["ones", "it"], fehler: "ones" }
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
      // ab v0.9.10 (Paket 6b)
      ,{ e: "one",   a: "Use one or ones for the second noun:", von: "I don't like the green cap. I like the blue cap.", nach: ["I don't like the green cap. I like the blue one."] }
      ,{ e: "one",   a: "Use one or ones for the second noun:", von: "This pizza is cold. Can I have a hot pizza?", nach: ["This pizza is cold. Can I have a hot one?"] }
      ,{ e: "ones",  a: "Use one or ones for the second noun:", von: "My old sneakers are dirty. My new sneakers are white.", nach: ["My old sneakers are dirty. My new ones are white."] }
      ,{ e: "which", a: "Use one or ones for the second noun:", von: "There are two cabs. Which cab is ours?", nach: ["There are two cabs. Which one is ours?"] }
      ,{ e: "one",   a: "Use one or ones for the second noun:", von: "I have two brothers. The older brother lives in Chicago.", nach: ["I have two brothers. The older one lives in Chicago."] }
      ,{ e: "ones",  a: "Use one or ones for the second noun:", von: "These chairs are old. We need new chairs.", nach: ["These chairs are old. We need new ones."] }
      ,{ e: "one",   a: "Use one or ones for the second noun:", von: "The first test was easy, but the second test was hard.", nach: ["The first test was easy, but the second one was hard."] }
      ,{ e: "ones",  a: "Use one or ones for the second noun:", von: "I don't want these apples. I want the red apples.", nach: ["I don't want these apples. I want the red ones."] }
      ,{ e: "one",   a: "Use one or ones for the second noun:", von: "My phone is old. I want a new phone.", nach: ["My phone is old. I want a new one."] }
      ,{ e: "one",   a: "Use one or ones for the second noun:", von: "Which jacket do you like? – I like the black jacket.", nach: ["Which jacket do you like? – I like the black one.", "Which jacket do you like? I like the black one."] }
      ,{ e: "ones",  a: "Use one or ones for the second noun:", von: "The small T-shirts are cheap, but the big T-shirts are expensive.", nach: ["The small T-shirts are cheap, but the big ones are expensive."] }
      ,{ e: "which", a: "Use one or ones for the second noun:", von: "There are lots of photos. Which photos do you like?", nach: ["There are lots of photos. Which ones do you like?"] }
      ,{ e: "one",   a: "Use one or ones for the second noun:", von: "This bus is full. Let's wait for the next bus.", nach: ["This bus is full. Let's wait for the next one."] }
      ,{ e: "ones",  a: "Use one or ones for the second noun:", von: "The old rooms are small, but the new rooms are big.", nach: ["The old rooms are small, but the new ones are big."] }
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
  { thema: "8-G3", niveau: "gruen", form: "quiz", frage: "Last year we ___ wear a uniform at our old school.", optionen: ["had to", "musted", "must to"], loesung: "had to",
    erklaerung: "must has no past form (“musted” doesn't exist). Past: had to + infinitive (Grundform). Example: Yesterday Zoe had to walk home." },
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
  { thema: "8-G1", frage: "Which is the past of “ride”?", optionen: ["rode", "rided", "ridden"], loesung: "rode" },
  { thema: "8-G1", frage: "Which sentence is correct?", optionen: ["Did you see the skyline?", "Did you saw the skyline?", "Saw you the skyline?"], loesung: "Did you see the skyline?" },
  { thema: "8-G1", frage: "“Did Mia try a bagel?” – “No, …”", optionen: ["she didn't.", "she doesn't.", "she didn't try."], loesung: "she didn't." },
  { thema: "8-G1", frage: "We … the subway to Times Square.", optionen: ["took", "taked", "take yesterday"], loesung: "took" },
  { thema: "8-G2", frage: "When we arrived, the show … started.", optionen: ["had already", "has already", "already had been"], loesung: "had already" },
  { thema: "8-G2", frage: "Which is past perfect?", optionen: ["had seen", "saw", "has seen"], loesung: "had seen" },
  { thema: "8-G2", frage: "After she … her homework, she went out.", optionen: ["had finished", "has finished", "finishes"], loesung: "had finished" },
  { thema: "8-G2", frage: "… you ever been to a big city before the trip?", optionen: ["Had", "Did", "Was"], loesung: "Had" },
  { thema: "8-G3", frage: "When I was six, I … already ride a bike.", optionen: ["could", "can", "could to"], loesung: "could" },
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
// Klasse 8, Unit 3–5 (G6–G14)
// =====================================================================
// Hilfe für die indirekte Rede: jede Lösung gilt mit und ohne „that“ sowie mit Kurzform (she is = she's …)
const K8_REDE = (...saetze) => {
  const out = [];
  const kurz = x => x.replace(/\b(he|she|it) is\b/g, "$1's").replace(/\bI am\b/g, "I'm").replace(/\b(we|you|they) are\b/g, "$1're");
  saetze.forEach(x => [x, x.replace(" that ", " ")].forEach(y => [y, kurz(y)].forEach(z => { if(!out.includes(z)) out.push(z); })));
  return out;
};

K8.woerterhilfe.push(...[
  { en: "Thanksgiving", de: "Erntedankfest (USA)" }, { en: "turkey", de: "Truthahn" }, { en: "president", de: "Präsident/in" }, { en: "pardon", de: "begnadigen" },
  { en: "pardoned", de: "begnadigte" }, { en: "novel", de: "Roman" }, { en: "pumpkin", de: "Kürbis" }, { en: "dishwasher", de: "Spülmaschine" },
  { en: "headphones", de: "Kopfhörer" }, { en: "fan", de: "Ventilator; Fan" }, { en: "gossip", de: "Klatsch, Tratsch" }, { en: "iron", de: "bügeln" },
  { en: "bowling", de: "Bowling" }, { en: "stuntmen", de: "Stuntmen" }, { en: "author", de: "Autor/in" }, { en: "article", de: "Artikel" },
  { en: "backpack", de: "Rucksack" }, { en: "solution", de: "Lösung" }, { en: "neighbors", de: "Nachbarn" }, { en: "whale", de: "Wal" },
  { en: "whales", de: "Wale" }, { en: "tablet", de: "Tablet" }, { en: "tutorial", de: "Anleitungsvideo" }, { en: "selfie", de: "Selfie" },
  { en: "followers", de: "Follower" }, { en: "podcast", de: "Podcast" }, { en: "status", de: "Status" }, { en: "blogger", de: "Blogger/in" },
  { en: "catchy", de: "eingängig" }, { en: "informative", de: "informativ" }, { en: "desperately", de: "verzweifelt" }, { en: "luckily", de: "zum Glück" },
  { en: "appealing", de: "ansprechend" }, { en: "energetic", de: "energiegeladen" }, { en: "headline", de: "Schlagzeile" }, { en: "waitress", de: "Kellnerin" },
  { en: "protesters", de: "Demonstrant/innen" }, { en: "segregation", de: "Rassentrennung" }, { en: "arrested", de: "verhaftet" }, { en: "jail", de: "Gefängnis" },
  { en: "released", de: "veröffentlicht" }, { en: "banned", de: "verboten" }, { en: "fried", de: "frittiert" }, { en: "founded", de: "gegründet" },
  { en: "stall", de: "Stand" }, { en: "airboat", de: "Propellerboot" }, { en: "swamp", de: "Sumpf" }, { en: "trainer", de: "Trainer/in" },
  { en: "gumbo", de: "Gumbo (Eintopf aus Louisiana)" }, { en: "jazz", de: "Jazz" }, { en: "alligators", de: "Alligatoren" }, { en: "charts", de: "Hitparade" },
  { en: "rice", de: "Reis" }, { en: "boycott", de: "Boykott" },
  // ab v0.9.8: Kernwörter der Themen 8-G8, 8-G10 und 8-G12
  { en: "desperate", de: "verzweifelt" }, { en: "final", de: "letzte/r/s, End-" }, { en: "energetic", de: "energiegeladen" },
  { en: "energetically", de: "energiegeladen (Adverb)" }, { en: "smile", de: "lächeln" }, { en: "smiled", de: "lächelte" },
  { en: "taste", de: "schmecken" }, { en: "lead", de: "führen, leiten" }, { en: "led", de: "führte, geführt" },
  { en: "record", de: "Schallplatte; aufnehmen" }, { en: "recorded", de: "aufgenommen" }, { en: "snowman", de: "Schneemann" }
]);

Object.assign(K8.baukasten, {
  // ---------- Klasse 8, Unit 3: Bestätigungsfragen / question tags (G6) ----------
  "8-G6": {
    saetze: [
      { e: "be",  t: "Thanksgiving is in November, ___ it?", r: ["isn't"], f: ["doesn't", "is"], fehler: "doesn't" },
      { e: "be",  t: "Your neighbors are very friendly, ___ they?", r: ["aren't"], f: ["don't", "are"], fehler: "don't" },
      { e: "be",  t: "The turkey was delicious, ___ it?", r: ["wasn't"], f: ["didn't", "isn't"], fehler: "didn't" },
      { e: "be",  t: "The stuntmen were very brave, ___ they?", r: ["weren't"], f: ["didn't", "wasn't"], fehler: "wasn't" },
      { e: "do",  t: "Your mom likes pumpkin pie, ___ she?", r: ["doesn't"], f: ["isn't", "don't"], fehler: "don't" },
      { e: "do",  t: "You play the guitar, ___ you?", r: ["don't"], f: ["aren't", "doesn't"], fehler: "doesn't" },
      { e: "do",  t: "The president pardoned a turkey, ___ he?", r: ["didn't"], f: ["wasn't", "doesn't"], fehler: "wasn't" },
      { e: "do",  t: "You went whale watching last summer, ___ you?", r: ["didn't"], f: ["weren't", "don't"], fehler: "don't" },
      { e: "aux", t: "You can iron a shirt, ___ you?", r: ["can't"], f: ["don't", "can"], fehler: "don't" },
      { e: "aux", t: "Your parents will come to the show, ___ they?", r: ["won't"], f: ["don't", "will"], fehler: "don't" },
      { e: "aux", t: "You have seen Niagara Falls, ___ you?", r: ["haven't"], f: ["didn't", "don't"], fehler: "didn't" },
      { e: "aux", t: "Jake has finished his novel, ___ he?", r: ["hasn't"], f: ["isn't", "didn't"], fehler: "isn't" },
      { e: "neg", t: "You aren't bored, ___ you?", r: ["are"], f: ["aren't", "do"], fehler: "aren't" },
      { e: "neg", t: "Your brother didn't break the dishwasher, ___ he?", r: ["did"], f: ["didn't", "does"], fehler: "didn't" },
      { e: "neg", t: "Zoe doesn't like scary movies, ___ she?", r: ["does"], f: ["doesn't", "is"], fehler: "doesn't" },
      { e: "neg", t: "Mia can't come to the movies, ___ she?", r: ["can"], f: ["can't", "does"], fehler: "can't" },
      { e: "neg", t: "It won't rain on Thanksgiving, ___ it?", r: ["will"], f: ["won't", "does"], fehler: "won't" },
      { e: "neg", t: "We haven't bought the turkey yet, ___ we?", r: ["have"], f: ["haven't", "did"], fehler: "did" }
      // ab v0.9.10 (Paket 6b)
      ,{ e: "be",  t: "Your school is very big, ___ it?", r: ["isn't"], f: ["doesn't", "is"], fehler: "doesn't" }
      ,{ e: "be",  t: "You were in New York last year, ___ you?", r: ["weren't"], f: ["didn't", "wasn't"], fehler: "didn't" }
      ,{ e: "do",  t: "Your parents work in a hospital, ___ they?", r: ["don't"], f: ["aren't", "doesn't"], fehler: "doesn't" }
      ,{ e: "do",  t: "Mia watched the game, ___ she?", r: ["didn't"], f: ["wasn't", "doesn't"], fehler: "wasn't" }
      ,{ e: "aux", t: "You will call me tomorrow, ___ you?", r: ["won't"], f: ["don't", "will"], fehler: "don't" }
      ,{ e: "aux", t: "Your brother can drive, ___ he?", r: ["can't"], f: ["doesn't", "can"], fehler: "doesn't" }
      ,{ e: "neg", t: "You don't like pumpkin pie, ___ you?", r: ["do"], f: ["don't", "are"], fehler: "don't" }
      ,{ e: "neg", t: "Jake wasn't at school yesterday, ___ he?", r: ["was"], f: ["wasn't", "did"], fehler: "did" }
      ,{ e: "neg", t: "They haven't eaten yet, ___ they?", r: ["have"], f: ["haven't", "did"], fehler: "did" }
    ],
    umformen: [
      { e: "do",  a: "Add a question tag:", von: "Your sister lives in Canada.", nach: ["Your sister lives in Canada, doesn't she?"] },
      { e: "be",  a: "Add a question tag:", von: "The vacuum cleaner is broken.", nach: ["The vacuum cleaner is broken, isn't it?"] },
      { e: "be",  a: "Add a question tag:", von: "You were at the talk show.", nach: ["You were at the talk show, weren't you?"] },
      { e: "do",  a: "Add a question tag:", von: "Mia bought new headphones.", nach: ["Mia bought new headphones, didn't she?"] },
      { e: "neg", a: "Add a question tag:", von: "Your grandpa doesn't like gossip.", nach: ["Your grandpa doesn't like gossip, does he?"] },
      { e: "aux", a: "Add a question tag:", von: "They have read the article.", nach: ["They have read the article, haven't they?"] },
      { e: "neg", a: "Add a question tag:", von: "You can't find your backpack.", nach: ["You can't find your backpack, can you?"] },
      { e: "aux", a: "Add a question tag:", von: "Jake will help us with the dishes.", nach: ["Jake will help us with the dishes, won't he?"] },
      { e: "do",  a: "Add a question tag:", von: "Mark Twain wrote great novels.", nach: ["Mark Twain wrote great novels, didn't he?"] },
      { e: "neg", a: "Add a question tag:", von: "You aren't tired.", nach: ["You aren't tired, are you?"] },
      { e: "do",  a: "Add a question tag:", von: "The kids went bowling yesterday.", nach: ["The kids went bowling yesterday, didn't they?"] },
      { e: "aux", a: "Add a question tag:", von: "Your mom has made a pumpkin pie.", nach: ["Your mom has made a pumpkin pie, hasn't she?"] },
      { e: "neg", a: "Add a question tag:", von: "We don't have school on Thanksgiving.", nach: ["We don't have school on Thanksgiving, do we?"] }
      // ab v0.9.10 (Paket 6b)
      ,{ e: "be", a: "Add a question tag:", von: "Zoe is from Texas.", nach: ["Zoe is from Texas, isn't she?"] }
      ,{ e: "be", a: "Add a question tag:", von: "The cab was very expensive.", nach: ["The cab was very expensive, wasn't it?"] }
      ,{ e: "be", a: "Add a question tag:", von: "You are Carlos's brother.", nach: ["You are Carlos's brother, aren't you?"] }
      ,{ e: "do", a: "Add a question tag:", von: "Jake plays basketball.", nach: ["Jake plays basketball, doesn't he?"] }
      ,{ e: "do", a: "Add a question tag:", von: "You like turkey.", nach: ["You like turkey, don't you?"] }
      ,{ e: "do", a: "Add a question tag:", von: "Your parents bought a new car.", nach: ["Your parents bought a new car, didn't they?"] }
      ,{ e: "aux", a: "Add a question tag:", von: "Mia can speak Spanish.", nach: ["Mia can speak Spanish, can't she?"] }
      ,{ e: "aux", a: "Add a question tag:", von: "You have finished your homework.", nach: ["You have finished your homework, haven't you?"] }
      ,{ e: "aux", a: "Add a question tag:", von: "It will be sunny tomorrow.", nach: ["It will be sunny tomorrow, won't it?"] }
      ,{ e: "neg", a: "Add a question tag:", von: "Carlos isn't at home.", nach: ["Carlos isn't at home, is he?"] }
      ,{ e: "neg", a: "Add a question tag:", von: "You didn't see the game.", nach: ["You didn't see the game, did you?"] }
      ,{ e: "neg", a: "Add a question tag:", von: "Zoe can't swim.", nach: ["Zoe can't swim, can she?"] }
      ,{ e: "neg", a: "Add a question tag:", von: "They won't come to the party.", nach: ["They won't come to the party, will they?"] }
    ],
    zuordnen: {
      kategorien: ["…, isn't she?", "…, doesn't she?", "…, didn't she?"],
      woerter: [
        { text: "She is from Canada.", ziel: "…, isn't she?" }, { text: "She is very kind.", ziel: "…, isn't she?" }, { text: "She is in the gym.", ziel: "…, isn't she?" }, { text: "She is a famous author.", ziel: "…, isn't she?" },
        { text: "She works at a store.", ziel: "…, doesn't she?" }, { text: "She loves chocolate.", ziel: "…, doesn't she?" }, { text: "She plays in a band.", ziel: "…, doesn't she?" }, { text: "She wants a new fan.", ziel: "…, doesn't she?" },
        { text: "She found her cell phone.", ziel: "…, didn't she?" }, { text: "She cooked the turkey.", ziel: "…, didn't she?" }, { text: "She saw a whale.", ziel: "…, didn't she?" }, { text: "She wrote a novel.", ziel: "…, didn't she?" }
      ]
    },
    erklaerungen: {
      satzpool: {
        be:  "Question tags (Frageanhängsel): With be, use am/is/are/was/were again. Positive sentence → negative tag. Example: {BEISPIEL}",
        do:  "No helping verb (Hilfsverb) in the sentence? Use do/does/did in the tag: She likes it, doesn't she? He went, didn't he? Example: {BEISPIEL}",
        aux: "Use the helping verb (Hilfsverb) again: have/has, can, will. Positive sentence → negative tag. Example: {BEISPIEL}",
        neg: "Negative sentence (verneinter Satz) → positive tag: It isn't late, is it? Example: {BEISPIEL}",
        zuordnen: "is → isn't she? · verb with -s (simple present) → doesn't she? · past form (simple past) → didn't she?"
      }
    }
  },

  // ---------- Klasse 8, Unit 3: Fragen (G7) ----------
  "8-G7": {
    saetze: [
      { e: "present", t: "Where ___ your grandparents live?", r: ["do"], f: ["does", "are"], fehler: "does" },
      { e: "present", t: "What time ___ the talk show start?", r: ["does"], f: ["do", "is"], fehler: "do" },
      { e: "past",    t: "When ___ you arrive at the border?", r: ["did"], f: ["do", "were"], fehler: "were" },
      { e: "past",    t: "How ___ Annie Taylor get over Niagara Falls in a barrel?", r: ["did"], f: ["does", "was"], fehler: "was" },
      { e: "past",    t: "What ___ you buy at the store yesterday?", r: ["did"], f: ["do", "were"], fehler: "were" },
      { e: "will",    t: "What ___ you do after school next year?", h: "will", r: ["will"], f: ["did", "does"], fehler: "did" },
      { e: "will",    t: "___ the weather be nice tomorrow?", r: ["will"], f: ["does", "is"], fehler: "does" },
      { e: "will",    t: "___ you help me with the dishes later?", r: ["will"], f: ["did", "are"], fehler: "did" },
      { e: "who",     t: "Who ___ the turkey in your family every year?", h: "cook", r: ["cooks"], f: ["does cook", "cook"], fehler: "cook" },
      { e: "who",     t: "Who ___ in the big house next to yours?", h: "live", r: ["lives"], f: ["does live", "live"], fehler: "live" },
      { e: "who",     t: "Who ___ the best pumpkin pie in your family?", h: "make", r: ["makes"], f: ["does make", "make"], fehler: "make" },
      { e: "jn",      t: "___ your dad like football?", r: ["does"], f: ["do", "is"], fehler: "do" },
      { e: "jn",      t: "___ you excited about the trip?", r: ["are"], f: ["do", "does"], fehler: "do" },
      { e: "jn",      t: "___ you watch the parade on TV yesterday?", r: ["did"], f: ["do", "were"], fehler: "were" },
      { e: "wort",    t: "___ is your birthday? – In May.", r: ["when"], f: ["where", "who"], fehler: "where" },
      { e: "wort",    t: "___ do you go to school? – By bus.", r: ["how"], f: ["what", "where"], fehler: "what" },
      { e: "wort",    t: "___ backpack is this? – It's Mia's.", r: ["whose"], f: ["who's", "who"], fehler: "who" },
      { e: "wort",    t: "___ did you call the police? – Because I saw a gang near the house.", r: ["why"], f: ["what", "how"], fehler: "how", keinSatzbau: true }
      // ab v0.9.10 (Paket 6b)
      ,{ e: "present", t: "How often ___ you play basketball?", r: ["do"], f: ["does", "are"], fehler: "does" }
      ,{ e: "present", t: "What ___ your sister want for her birthday?", r: ["does"], f: ["do", "is"], fehler: "do" }
      ,{ e: "past",    t: "Where ___ you go last weekend?", r: ["did"], f: ["do", "were"], fehler: "were" }
      ,{ e: "past",    t: "Why ___ Zoe leave the party early?", r: ["did"], f: ["does", "was"], fehler: "was" }
      ,{ e: "will",    t: "___ you be at home tonight?", r: ["will"], f: ["do", "are"], fehler: "do" }
      ,{ e: "who",     t: "Who ___ the dishes in your family?", h: "wash", r: ["washes"], f: ["does wash", "wash"], fehler: "wash" }
      ,{ e: "who",     t: "Who ___ you to school every day?", h: "drive", r: ["drives"], f: ["does drive", "drive"], fehler: "drive" }
      ,{ e: "jn",      t: "___ Carlos speak Spanish?", r: ["does"], f: ["do", "is"], fehler: "do" }
      ,{ e: "wort",    t: "___ do you live? – In Chicago.", r: ["where"], f: ["when", "who"], fehler: "when" }
    ],
    umformen: [
      { e: "present", a: "Ask a question with “Where”:", von: "Mia lives in Boston.", nach: ["Where does Mia live?"] },
      { e: "present", a: "Ask a question with “What time”:", von: "The show starts at eight.", nach: ["What time does the show start?"] },
      { e: "past",    a: "Ask a question with “What”:", von: "Jake bought a new backpack.", nach: ["What did Jake buy?"] },
      { e: "past",    a: "Ask a question with “When”:", von: "They went to the movies on Friday.", nach: ["When did they go to the movies?"] },
      { e: "will",    a: "Ask a question with “Who”:", von: "Zoe will visit her grandma next week.", nach: ["Who will Zoe visit next week?", "Who will Zoe visit?"] },
      { e: "will",    a: "Ask a question with “Where”:", von: "We will meet at the bowling alley.", nach: ["Where will we meet?", "Where will you meet?"] },
      { e: "who",     a: "Ask a question with “Who”:", von: "Carlos called the police.", nach: ["Who called the police?"] },
      { e: "who",     a: "Ask a question with “Who”:", von: "My grandma makes the best pancakes.", nach: ["Who makes the best pancakes?"] },
      { e: "who",     a: "Ask a question with “Who”:", von: "A gang stole the bikes.", nach: ["Who stole the bikes?"] },
      { e: "jn",      a: "Ask a yes/no question:", von: "Mia's brother likes bowling.", nach: ["Does Mia's brother like bowling?"] },
      { e: "jn",      a: "Ask a yes/no question:", von: "The neighbors heard the doorbell.", nach: ["Did the neighbors hear the doorbell?"] },
      { e: "jn",      a: "Ask a yes/no question:", von: "It will be freezing tomorrow.", nach: ["Will it be freezing tomorrow?"] },
      { e: "wort",    a: "Ask a question with “Why”:", von: "Lily is sad because she lost her headphones.", nach: ["Why is Lily sad?"] }
      // ab v0.9.10 (Paket 6b)
      ,{ e: "present", a: "Ask a question with “Where”:", von: "Jake works at a store.", nach: ["Where does Jake work?"] }
      ,{ e: "present", a: "Ask a question with “What”:", von: "Zoe likes pizza.", nach: ["What does Zoe like?"] }
      ,{ e: "present", a: "Ask a question with “When”:", von: "The game starts at seven.", nach: ["When does the game start?"] }
      ,{ e: "past", a: "Ask a question with “Where”:", von: "We stayed in a hotel.", nach: ["Where did you stay?", "Where did we stay?"] }
      ,{ e: "past", a: "Ask a question with “What time”:", von: "Mia got up at six.", nach: ["What time did Mia get up?"] }
      ,{ e: "wort", a: "Ask a question with “Why”:", von: "Carlos was late because he missed the bus.", nach: ["Why was Carlos late?"] }
      ,{ e: "will", a: "Ask a question with “When”:", von: "My cousins will arrive on Friday.", nach: ["When will my cousins arrive?", "When will your cousins arrive?"] }
      ,{ e: "will", a: "Ask a question with “What”:", von: "Lily will cook pasta.", nach: ["What will Lily cook?"] }
      ,{ e: "who", a: "Ask a question with “Who”:", von: "Zoe found the key.", nach: ["Who found the key?"] }
      ,{ e: "who", a: "Ask a question with “Who”:", von: "My dad drives the school bus.", nach: ["Who drives the school bus?"] }
      ,{ e: "jn", a: "Ask a yes/no question:", von: "Your parents like jazz.", nach: ["Do your parents like jazz?"] }
      ,{ e: "jn", a: "Ask a yes/no question:", von: "Jake played basketball yesterday.", nach: ["Did Jake play basketball yesterday?"] }
      ,{ e: "jn", a: "Ask a yes/no question:", von: "You are tired.", nach: ["Are you tired?"] }
    ],
    zuordnen: {
      kategorien: ["Who?", "Where?", "When?"],
      woerter: [
        { text: "My uncle.", ziel: "Who?" }, { text: "The president.", ziel: "Who?" }, { text: "Mark Twain.", ziel: "Who?" }, { text: "My neighbor.", ziel: "Who?" },
        { text: "In Boston.", ziel: "Where?" }, { text: "At the bowling alley.", ziel: "Where?" }, { text: "Near the border.", ziel: "Where?" }, { text: "On the stairs.", ziel: "Where?" },
        { text: "Last Thursday.", ziel: "When?" }, { text: "In November.", ziel: "When?" }, { text: "Next week.", ziel: "When?" }, { text: "At eight o'clock.", ziel: "When?" }
      ]
    },
    erklaerungen: {
      satzpool: {
        jn:      "Yes/no questions (Entscheidungsfragen) start with do/does/did, will or am/is/are: Does she like it? Example: {BEISPIEL}",
        present: "Questions in the simple present: (question word +) do/does + person + infinitive (Grundform). he/she/it → does. Example: {BEISPIEL}",
        past:    "Questions in the simple past: (question word +) did + person + infinitive (Grundform). Example: {BEISPIEL}",
        will:    "Questions in the will-future: (question word +) will + person + infinitive (Grundform). Example: {BEISPIEL}",
        who:     "Asking for the subject (Subjektfrage): Who + verb – no do/does/did! he/she/it: -s. Example: {BEISPIEL}",
        wort:    "Question words (Fragewörter): who = wer, what = was, where = wo, when = wann, why = warum, how = wie, whose = wessen. Example: {BEISPIEL}",
        zuordnen: "Who? → a person. Where? → a place. When? → a time."
      }
    }
  },

  // ---------- Klasse 8, Unit 3: if-Sätze Typ II (G8) ----------
  "8-U3": {
    ifSaetze2: [
      { w: "I {were} president",            alt: "was", grund: "be", wf: "am", s2: "I", e: "pardon", past2: "pardoned", r2: "all the turkeys" },
      { w: "we {had} a dishwasher",         grund: "have", wf: "have", s2: "we", e: "have", past2: "had", r2: "more free time" },
      { w: "Jake {lived} near Niagara Falls", wer: "Jake", grund: "live", wf: "lives", s2: "he", e: "go", past2: "went", r2: "to the falls every weekend" },
      { w: "you {went} out more often",     grund: "go", wf: "go", s2: "you", e: "meet", past2: "met", r2: "new people" },
      { w: "my parents {gave} me more money", grund: "give", wf: "give", s2: "I", e: "buy", past2: "bought", r2: "new headphones" },
      { w: "it {snowed} on Thanksgiving",   grund: "snow", wf: "snows", s2: "we", e: "build", past2: "built", r2: "a snowman" },
      { w: "I {knew} the solution",         grund: "know", wf: "know", s2: "I", e: "tell", past2: "told", r2: "you" },
      { w: "Zoe {were} braver",             wer: "Zoe", alt: "was", grund: "be", wf: "is", s2: "she", e: "try", past2: "tried", r2: "the zip line" },
      { w: "the vacuum cleaner {worked}",   grund: "work", wf: "works", s2: "I", e: "clean", past2: "cleaned", r2: "my room" },
      { w: "I {found} a lot of money",      grund: "find", wf: "find", s2: "I", e: "visit", past2: "visited", r2: "Canada" },
      { w: "you {asked} the author",        grund: "ask", wf: "ask", s2: "she", e: "answer", past2: "answered", r2: "your question" },
      { w: "my brother {cleaned} his room", wer: "my brother", grund: "clean", wf: "cleans", s2: "he", e: "find", past2: "found", r2: "his backpack" },
      { w: "we {had} more time",            grund: "have", wf: "have", s2: "we", e: "go", past2: "went", r2: "bowling" }
      // ab v0.9.10 (Paket 6b)
      ,{ w: "I {had} a car",                 grund: "have", wf: "have", s2: "I", e: "drive", past2: "drove", r2: "to the beach every day" }
      ,{ w: "we {lived} in New York",        grund: "live", wf: "live", s2: "we", e: "take", past2: "took", r2: "the subway to school" }
      ,{ w: "Carlos {spoke} better English", wer: "Carlos", grund: "speak", wf: "speaks", s2: "he", e: "make", past2: "made", r2: "more friends" }
      ,{ w: "you {were} the principal",      grund: "be", wf: "are", s2: "you", e: "change", past2: "changed", r2: "the school rules" }
      ,{ w: "it {was} warmer", alt: "were",  grund: "be", wf: "is", s2: "we", e: "eat", past2: "ate", r2: "outside" }
      ,{ w: "Mia {had} a dog", wer: "Mia",   grund: "have", wf: "has", s2: "she", e: "walk", past2: "walked", r2: "it every morning" }
      ,{ w: "I {won} a lot of money",        grund: "win", wf: "win", s2: "I", e: "travel", past2: "traveled", r2: "around the world" }
      ,{ w: "you {studied} more",            grund: "study", wf: "study", s2: "you", e: "get", past2: "got", r2: "better grades" }
      ,{ w: "the bus {came} on time",        grund: "come", wf: "comes", s2: "we", e: "be", past2: "were", r2: "at school before eight" }
      ,{ w: "I {knew} his phone number",     grund: "know", wf: "know", s2: "I", e: "call", past2: "called", r2: "him" }
      ,{ w: "Zoe {lived} closer", wer: "Zoe", grund: "live", wf: "lives", s2: "she", e: "visit", past2: "visited", r2: "us more often" }
      ,{ w: "we {had} a bigger house",       grund: "have", wf: "have", s2: "we", e: "invite", past2: "invited", r2: "all our friends" }
      ,{ w: "I {were} you", alt: "was",      grund: "be", wf: "am", s2: "I", e: "call", past2: "called", r2: "the police" }
    ],
    ifSaetze: [
      { w: "it snows tomorrow",   s2: "we",  e: "stay",  ing: "staying",  r2: "inside" },
      { w: "you run",             s2: "you", e: "catch", ing: "catching", r2: "the bus" },
      { w: "Mom cooks a turkey",  s2: "we",  e: "eat",   ing: "eating",   r2: "it all" },
      { w: "the fan breaks",      s2: "I",   e: "buy",   ing: "buying",   r2: "a new one" },
      { w: "you call me",         s2: "I",   e: "come",  ing: "coming",   r2: "over" }
    ],
    ifTausch: [
      { von: "If I find the solution, I will tell you.",      nach: ["If I found the solution, I would tell you.", "If I found the solution, I'd tell you."] },
      { von: "If it rains, we will go to the movies.",       nach: ["If it rained, we would go to the movies.", "If it rained, we'd go to the movies."] },
      { von: "If you are free, we will go bowling.",         nach: ["If you were free, we would go bowling.", "If you were free, we'd go bowling."] },
      { von: "If Mia has time, she will help us.",           nach: ["If Mia had time, she would help us.", "If Mia had time, she'd help us."] },
      { von: "If the neighbors are nice, we will invite them.", nach: ["If the neighbors were nice, we would invite them.", "If the neighbors were nice, we'd invite them."] }
      // ab v0.9.10 (Paket 6b)
      ,{ von: "If I have enough money, I will buy a new phone.", nach: ["If I had enough money, I would buy a new phone.", "If I had enough money, I'd buy a new phone."] }
      ,{ von: "If we take the subway, we will be there in ten minutes.", nach: ["If we took the subway, we would be there in ten minutes.", "If we took the subway, we'd be there in ten minutes."] }
      ,{ von: "If Jake studies, he will get a good grade.", nach: ["If Jake studied, he would get a good grade.", "If Jake studied, he'd get a good grade."] }
      ,{ von: "If you come to New York, I will show you the city.", nach: ["If you came to New York, I would show you the city.", "If you came to New York, I'd show you the city."] }
      ,{ von: "If it snows, we will go skiing.", nach: ["If it snowed, we would go skiing.", "If it snowed, we'd go skiing."] }
      ,{ von: "If my parents say yes, I will go to the concert.", nach: ["If my parents said yes, I would go to the concert.", "If my parents said yes, I'd go to the concert."] }
      ,{ von: "If Zoe calls me, I will tell her the news.", nach: ["If Zoe called me, I would tell her the news.", "If Zoe called me, I'd tell her the news."] }
      ,{ von: "If we win the game, our parents will be happy.", nach: ["If we won the game, our parents would be happy."] }
      ,{ von: "If I see Carlos, I will give him the book.", nach: ["If I saw Carlos, I would give him the book.", "If I saw Carlos, I'd give him the book."] }
      ,{ von: "If the weather is nice, we will have a picnic.", nach: ["If the weather was nice, we would have a picnic.", "If the weather were nice, we would have a picnic.", "If the weather was nice, we'd have a picnic.", "If the weather were nice, we'd have a picnic."] }
      ,{ von: "If you help me, I will help you.", nach: ["If you helped me, I would help you.", "If you helped me, I'd help you."] }
      ,{ von: "If Mia finds a job, she will earn her own money.", nach: ["If Mia found a job, she would earn her own money.", "If Mia found a job, she'd earn her own money."] }
      ,{ von: "If they live in Canada, they will see a lot of snow.", nach: ["If they lived in Canada, they would see a lot of snow.", "If they lived in Canada, they'd see a lot of snow."] }
      ,{ von: "If the store is open, we will buy some food.", nach: ["If the store was open, we would buy some food.", "If the store were open, we would buy some food.", "If the store was open, we'd buy some food.", "If the store were open, we'd buy some food."] }
      ,{ von: "If I get up early, I will catch the bus.", nach: ["If I got up early, I would catch the bus.", "If I got up early, I'd catch the bus."] }
      ,{ von: "If you join the team, you will make new friends.", nach: ["If you joined the team, you would make new friends.", "If you joined the team, you'd make new friends."] }
      ,{ von: "If Carlos has time, he will visit us.", nach: ["If Carlos had time, he would visit us.", "If Carlos had time, he'd visit us."] }
      ,{ von: "If we leave late, we will miss the train.", nach: ["If we left late, we would miss the train.", "If we left late, we'd miss the train."] }
      ,{ von: "If the teacher is sick, we won't have a test.", nach: ["If the teacher was sick, we wouldn't have a test.", "If the teacher were sick, we wouldn't have a test."] }
      ,{ von: "If you don't do your homework, you will get detention.", nach: ["If you didn't do your homework, you would get detention.", "If you didn't do your homework, you'd get detention."] }
      ,{ von: "If I am famous, I will buy a big house.", nach: ["If I was famous, I would buy a big house.", "If I were famous, I would buy a big house.", "If I was famous, I'd buy a big house.", "If I were famous, I'd buy a big house."] }
    ],
    erklaerungen: {
      ifsatz2: {
        wenn:   "Type II (Typ II – only imagined, not real): if + simple past (had, knew, were/was). Example: {BEISPIEL}",
        haupt:  "Type II: main clause (Hauptsatz) with would ('d) + infinitive (Grundform) – no -ed after would! Example: {BEISPIEL}",
        komma:  "If the if-clause comes first, use a comma (Komma). If it comes second, there is no comma. Example: {BEISPIEL}",
        typ1:   "Type I (Typ I – real, possible): if + simple present, main clause with will. Type II (only imagined): if + simple past, main clause with would. Example: {BEISPIEL}",
        tausch: "From type I to type II: simple present → simple past (have → had, are → were), will → would. Example: {BEISPIEL}",
        zuordnen: "Type I (real): if + simple present, … will. Type II (imagined): if + simple past, … would.",
        kategorien: ["type I (real)", "type II (imagined)"],
        tauschFrage: "Make it unreal (type II):"
      }
    }
  },

  // ---------- Klasse 8, Unit 4: simple present ↔ present progressive (G9) ----------
  "8-U4": {
    personen: K8_PERSONEN,
    verbenPP: [
      { e: "play",   s: "plays",   ing: "playing",   rest: "video games" },
      { e: "watch",  s: "watches", ing: "watching",  rest: "a tutorial" },
      { e: "post",   s: "posts",   ing: "posting",   rest: "a selfie" },
      { e: "stream", s: "streams", ing: "streaming", rest: "a concert" },
      { e: "update", s: "updates", ing: "updating",  rest: "{POSS} status" },
      { e: "read",   s: "reads",   ing: "reading",   rest: "a blog" },
      { e: "send",   s: "sends",   ing: "sending",   rest: "a message" },
      { e: "listen", s: "listens", ing: "listening", rest: "to a podcast" },
      { e: "do",     s: "does",    ing: "doing",     rest: "{POSS} homework on the tablet" },
      { e: "work",   s: "works",   ing: "working",   rest: "at the café" },
      { e: "chat",   s: "chats",   ing: "chatting",  rest: "with {POSS} followers" },
      { e: "check",  s: "checks",  ing: "checking",  rest: "{POSS} smartphone" },
      { e: "make",   s: "makes",   ing: "making",    rest: "a video clip" },
      { e: "go",     s: "goes",    ing: "going",     rest: "hiking" }
    ],
    signalGewohnheit: [
      { wort: "every day", pos: "ende" }, { wort: "every weekend", pos: "ende" }, { wort: "on Mondays", pos: "ende" }, { wort: "twice a week", pos: "ende" },
      { wort: "usually", pos: "mitte" }, { wort: "always", pos: "mitte" }, { wort: "often", pos: "mitte" }
    ],
    signalJetzt: [
      { wort: "now", pos: "ende" }, { wort: "at the moment", pos: "ende" }, { wort: "right now", pos: "ende" }, { wort: "Look!", pos: "anfang" }
    ],
    erklaerungen: {
      presvsprog: {
        gewohnheit: "“{SIGNAL}” shows that it happens regularly → simple present (einfache Gegenwart). he/she/it: -s. Example: {BEISPIEL}",
        jetzt:      "“{SIGNAL}” shows that it is happening right now → am/is/are + -ing (present progressive / Verlaufsform). Example: {BEISPIEL}",
        zuordnen:   "every day, usually, always, often, on Mondays → simple present. now, at the moment, right now, Look! → present progressive."
      }
    }
  },

  // ---------- Klasse 8, Unit 4: Adjektive und Adverbien (G10) ----------
  "8-G10": {
    saetze: [
      { e: "adv",  t: "The blogger explained the problem very ___.", h: "clear", r: ["clearly"], f: ["clear", "clearer"], fehler: "clear" },
      { e: "adv",  t: "The gold hunters searched ___ for gold.", h: "desperate", r: ["desperately"], f: ["desperate", "desperatly"], fehler: "desperate" },
      { e: "adv",  t: "___, nobody was hurt in the accident.", h: "lucky", r: ["luckily"], f: ["lucky", "luck"], fehler: "lucky" },
      { e: "adv",  t: "After three hours we ___ arrived at the ghost town.", h: "final", r: ["finally"], f: ["final", "finaly"], fehler: "final" },
      { e: "adv",  t: "Mia answered all the questions ___.", h: "careful", r: ["carefully"], f: ["careful", "carefuly"], fehler: "careful" },
      { e: "adv",  t: "The waitress smiled ___ at the customers.", h: "happy", r: ["happily"], f: ["happy", "happyly"], fehler: "happy" },
      { e: "adv",  t: "The kids played ___ in the garden.", h: "quiet", r: ["quietly"], f: ["quiet", "quietlly"], fehler: "quiet" },
      { e: "link", t: "This new song sounds ___.", h: "catchy", r: ["catchy"], f: ["catchily", "catchyly"], fehler: "catchily" },
      { e: "link", t: "Your pancakes taste ___!", h: "delicious", r: ["delicious"], f: ["deliciously", "deliciousy"], fehler: "deliciously" },
      { e: "link", t: "You look ___. Did you sleep badly?", h: "tired", r: ["tired"], f: ["tiredly", "tiring"], fehler: "tiredly" },
      { e: "link", t: "I always feel ___ after a long day of hiking.", h: "happy", r: ["happy"], f: ["happily", "happyly"], fehler: "happily" },
      { e: "link", t: "The soup smells ___. Don't eat it!", h: "bad", r: ["bad"], f: ["badly", "badder"], fehler: "badly" },
      { e: "link", t: "The new tablet looks ___, but it's very expensive.", h: "appealing", r: ["appealing"], f: ["appealingly", "appealed"], fehler: "appealingly" },
      { e: "adj",  t: "That was a really ___ video.", h: "informative", r: ["informative"], f: ["informatively", "inform"], fehler: "informatively" },
      { e: "adj",  t: "The headline of the article is very ___.", h: "clear", r: ["clear"], f: ["clearly", "clearer"], fehler: "clearly" },
      { e: "unreg", t: "Carlos plays the guitar really ___.", h: "good", r: ["well"], f: ["good", "goodly"], fehler: "good" },
      { e: "unreg", t: "The railway was new, and the trains went very ___.", h: "fast", r: ["fast"], f: ["fastly", "fastely"], fehler: "fastly" },
      { e: "unreg", t: "The gold hunters worked ___ every day.", h: "hard", r: ["hard"], f: ["hardly", "hardy"], fehler: "hardly" }
      // ab v0.9.10 (Paket 6b)
      ,{ e: "adv", t: "Please talk ___. The baby is sleeping.", h: "quiet", r: ["quietly"], f: ["quiet", "quietlly"], fehler: "quiet" }
      ,{ e: "adv", t: "Jake ran ___ to catch the bus.", h: "quick", r: ["quickly"], f: ["quick", "quickely"], fehler: "quick" }
      ,{ e: "adv", t: "The teacher explained the rules ___.", h: "patient", r: ["patiently"], f: ["patient", "patiantly"], fehler: "patient" }
      ,{ e: "adv", t: "Zoe sings ___.", h: "beautiful", r: ["beautifully"], f: ["beautiful", "beautifuly"], fehler: "beautiful" }
      ,{ e: "link", t: "This music sounds ___.", h: "great", r: ["great"], f: ["greatly", "greater"], fehler: "greatly" }
      ,{ e: "link", t: "The new jacket looks ___ on you.", h: "nice", r: ["nice"], f: ["nicely", "nicer"], fehler: "nicely" }
      ,{ e: "adj", t: "Carlos is a very ___ driver.", h: "careful", r: ["careful"], f: ["carefully", "carefull"], fehler: "carefully" }
      ,{ e: "unreg", t: "Mia speaks English very ___.", h: "good", r: ["well"], f: ["good", "goodly"], fehler: "good" }
      ,{ e: "unreg", t: "My little brother can't swim very ___ yet.", h: "good", r: ["well"], f: ["good", "goodly"], fehler: "good" }
    ],
    umformen: [
      { e: "adv",   a: "Use an adverb:", von: "Jake is a careful driver.", nach: ["Jake drives carefully."] },
      { e: "unreg", a: "Use an adverb:", von: "Mia is a fast swimmer.", nach: ["Mia swims fast."] },
      { e: "unreg", a: "Use an adverb:", von: "Zoe is a good dancer.", nach: ["Zoe dances well."] },
      { e: "adv",   a: "Use an adverb:", von: "My dad is a slow reader.", nach: ["My dad reads slowly."] },
      { e: "unreg", a: "Use an adverb:", von: "Carlos is a hard worker.", nach: ["Carlos works hard."] },
      { e: "adv",   a: "Use an adverb:", von: "The blogger is a clear speaker.", nach: ["The blogger speaks clearly."] },
      { e: "adv",   a: "Use an adverb:", von: "My aunt is a bad cook.", nach: ["My aunt cooks badly."] },
      { e: "adv",   a: "Use an adverb:", von: "Lily is a beautiful singer.", nach: ["Lily sings beautifully."] },
      { e: "adv",   a: "Use an adverb:", von: "My brother is an energetic dancer.", nach: ["My brother dances energetically."] },
      { e: "link",  a: "Use the verb in brackets:", von: "The cake is delicious. (look)", nach: ["The cake looks delicious."] },
      { e: "link",  a: "Use the verb in brackets:", von: "The slogan is catchy. (sound)", nach: ["The slogan sounds catchy."] },
      { e: "link",  a: "Use the verb in brackets:", von: "The burger is horrible. (taste)", nach: ["The burger tastes horrible."] },
      { e: "link",  a: "Use the verb in brackets:", von: "I am nervous. (feel)", nach: ["I feel nervous."] }
      // ab v0.9.10 (Paket 6b)
      ,{ e: "adv", a: "Use an adverb:", von: "Ben is a quiet speaker.", nach: ["Ben speaks quietly."] }
      ,{ e: "adv", a: "Use an adverb:", von: "Zoe is a careful writer.", nach: ["Zoe writes carefully."] }
      ,{ e: "adv", a: "Use an adverb:", von: "My mom is a quick reader.", nach: ["My mom reads quickly."] }
      ,{ e: "adv", a: "Use an adverb:", von: "Jake is a bad singer.", nach: ["Jake sings badly."] }
      ,{ e: "adv", a: "Use an adverb:", von: "My sister is a loud singer.", nach: ["My sister sings loudly."] }
      ,{ e: "unreg", a: "Use an adverb:", von: "My dad is a good cook.", nach: ["My dad cooks well."] }
      ,{ e: "unreg", a: "Use an adverb:", von: "Carlos is a fast runner.", nach: ["Carlos runs fast."] }
      ,{ e: "unreg", a: "Use an adverb:", von: "My parents are hard workers.", nach: ["My parents work hard."] }
      ,{ e: "adv", a: "Use an adverb:", von: "Tom is a slow eater.", nach: ["Tom eats slowly."] }
      ,{ e: "link", a: "Use the verb in brackets:", von: "The music is loud. (sound)", nach: ["The music sounds loud."] }
      ,{ e: "link", a: "Use the verb in brackets:", von: "The pizza is great. (smell)", nach: ["The pizza smells great."] }
      ,{ e: "link", a: "Use the verb in brackets:", von: "You are tired. (look)", nach: ["You look tired."] }
      ,{ e: "link", a: "Use the verb in brackets:", von: "The water is cold. (feel)", nach: ["The water feels cold."] }
    ],
    zuordnen: {
      kategorien: ["adjective (Adjektiv)", "adverb (Adverb)"],
      woerter: [
        { text: "clear", ziel: "adjective (Adjektiv)" }, { text: "clearly", ziel: "adverb (Adverb)" }, { text: "lucky", ziel: "adjective (Adjektiv)" }, { text: "luckily", ziel: "adverb (Adverb)" },
        { text: "desperate", ziel: "adjective (Adjektiv)" }, { text: "desperately", ziel: "adverb (Adverb)" }, { text: "final", ziel: "adjective (Adjektiv)" }, { text: "finally", ziel: "adverb (Adverb)" },
        { text: "careful", ziel: "adjective (Adjektiv)" }, { text: "carefully", ziel: "adverb (Adverb)" }, { text: "catchy", ziel: "adjective (Adjektiv)" }, { text: "quietly", ziel: "adverb (Adverb)" },
        { text: "informative", ziel: "adjective (Adjektiv)" }, { text: "energetically", ziel: "adverb (Adverb)" }
      ]
    },
    erklaerungen: {
      satzpool: {
        adv:   "An adverb (Adverb) says HOW someone does something: adjective + -ly (clear → clearly, happy → happily). Example: {BEISPIEL}",
        adj:   "An adjective (Adjektiv) describes a noun or comes after be: a clear headline, it is clear. Example: {BEISPIEL}",
        link:  "After look, sound, feel, taste and smell we use an adjective (Adjektiv), not an adverb: It sounds great. Example: {BEISPIEL}",
        unreg: "Special adverbs: good → well, fast → fast, hard → hard (hardly = kaum!). Example: {BEISPIEL}",
        zuordnen: "Adjectives (Adjektive) describe nouns: a careful driver. Adverbs (Adverbien) describe verbs and often end in -ly: he drives carefully."
      }
    }
  },

  // ---------- Klasse 8, Unit 4: present perfect mit since/for, Gegenüberstellung simple past (G11) ----------
  "8-G11": {
    saetze: [
      { e: "since", t: "I have had my smartphone ___ 2023.", r: ["since"], f: ["for", "ago"], fehler: "for" },
      { e: "for",   t: "Mia has been a blogger ___ two years.", r: ["for"], f: ["since", "ago"], fehler: "since" },
      { e: "since", t: "We have lived in this town ___ last summer.", r: ["since"], f: ["for", "from"], fehler: "for" },
      { e: "for",   t: "My brother has played that game ___ three hours.", r: ["for"], f: ["since", "ago"], fehler: "since" },
      { e: "since", t: "Jake hasn't posted anything ___ Monday.", r: ["since"], f: ["for", "ago"], fehler: "for" },
      { e: "for",   t: "They have known each other ___ a long time.", r: ["for"], f: ["since", "ago"], fehler: "since" },
      { e: "for",   t: "The ghost town has been empty ___ more than 100 years.", r: ["for"], f: ["since", "ago"], fehler: "since" },
      { e: "pp",    t: "Zoe ___ ten new videos since last month.", h: "post", r: ["has posted"], f: ["have posted", "posts"], fehler: { ersatz: "have posted", wort: "have", loesung: ["has"] } },
      { e: "pp",    t: "I ___ that tutorial three times so far.", h: "watch", r: ["have watched", "'ve watched"], f: ["has watched", "have watch"], fehler: { ersatz: "has watched", wort: "has", loesung: ["have"] } },
      { e: "pp",    t: "My grandma ___ a selfie yet.", h: "not / take", r: ["hasn't taken", "has not taken"], f: ["haven't taken", "hasn't took"], fehler: { ersatz: "hasn't took", wort: "took", loesung: ["taken"] } },
      { e: "pp",    t: "Have you ever ___ a podcast?", h: "make", r: ["made"], f: ["make", "maked"], fehler: "make" },
      { e: "pp",    t: "We ___ in this house since 2019.", h: "live", r: ["have lived", "'ve lived"], f: ["live", "are living"], fehler: { ersatz: "live", wort: "live", loesung: ["have lived"] } },
      { e: "past",  t: "I ___ my first tablet in 2020.", h: "get", r: ["got"], f: ["have got", "get"], fehler: "get" },
      { e: "past",  t: "Yesterday my dad ___ a funny video.", h: "post", r: ["posted"], f: ["has posted", "posts"], fehler: "posts" },
      { e: "past",  t: "Two days ago Carlos ___ his status.", h: "update", r: ["updated"], f: ["has updated", "updates"], fehler: "updates" },
      { e: "past",  t: "When ___ you start your blog?", r: ["did"], f: ["have", "has"], fehler: "have" },
      { e: "past",  t: "Last week Mia ___ a new account.", h: "open", r: ["opened"], f: ["has opened", "opens"], fehler: "opens" }
      // ab v0.9.10 (Paket 6b)
      ,{ e: "since", t: "My dad has worked at the hospital ___ 2015.", r: ["since"], f: ["for", "ago"], fehler: "for" }
      ,{ e: "for",   t: "I have waited at the bus stop ___ twenty minutes.", r: ["for"], f: ["since", "ago"], fehler: "since" }
      ,{ e: "since", t: "Zoe hasn't seen her cousin ___ Christmas.", r: ["since"], f: ["for", "ago"], fehler: "for" }
      ,{ e: "for",   t: "We have had our dog ___ six years.", r: ["for"], f: ["since", "ago"], fehler: "since" }
      ,{ e: "pp",    t: "My parents ___ to Canada two times.", h: "be", r: ["have been", "'ve been"], f: ["has been", "were"], fehler: { ersatz: "has been", wort: "has", loesung: ["have"] } }
      ,{ e: "pp",    t: "___ you ever been to Chicago?", r: ["Have"], f: ["Did", "Has"], fehler: "Did" }
      ,{ e: "pp",    t: "Jake ___ his homework yet.", h: "not / finish", r: ["hasn't finished", "has not finished"], f: ["haven't finished", "didn't finish"], fehler: { ersatz: "haven't finished", wort: "haven't", loesung: ["hasn't", "has not"] } }
      ,{ e: "past",  t: "We ___ a great movie last night.", h: "see", r: ["saw"], f: ["have seen", "seed"], fehler: "seed" }
      ,{ e: "past",  t: "My sister ___ her first phone when she was twelve.", h: "get", r: ["got"], f: ["has got", "gets"], fehler: "gets" }
    ],
    umformen: [
      { e: "since", a: "Use “since” or “for”:", von: "I have had this tablet. (2022)", nach: ["I have had this tablet since 2022.", "I've had this tablet since 2022."] },
      { e: "for",   a: "Use “since” or “for”:", von: "Mia has lived in Boston. (three years)", nach: ["Mia has lived in Boston for three years."] },
      { e: "since", a: "Use “since” or “for”:", von: "Jake has had a cell phone. (he was ten)", nach: ["Jake has had a cell phone since he was ten."] },
      { e: "for",   a: "Use “since” or “for”:", von: "We have known Zoe. (a long time)", nach: ["We have known Zoe for a long time.", "We've known Zoe for a long time."] },
      { e: "for",   a: "Use “since” or “for”:", von: "My parents have been married. (twenty years)", nach: ["My parents have been married for twenty years."] },
      { e: "since", a: "Use “since” or “for”:", von: "Our school has had a podcast. (last year)", nach: ["Our school has had a podcast since last year."] },
      { e: "past",  a: "Write the sentence with “yesterday”:", von: "I have posted a selfie.", nach: ["I posted a selfie yesterday.", "Yesterday I posted a selfie."] },
      { e: "past",  a: "Write the sentence with “last week”:", von: "Carlos has updated his status.", nach: ["Carlos updated his status last week.", "Last week Carlos updated his status."] },
      { e: "past",  a: "Write the sentence with “two days ago”:", von: "We have bought a new smartphone.", nach: ["We bought a new smartphone two days ago.", "Two days ago we bought a new smartphone."] },
      { e: "pp",    a: "Write the sentence with “already”:", von: "Zoe watched the tutorial.", nach: ["Zoe has already watched the tutorial.", "Zoe has watched the tutorial already."] },
      { e: "pp",    a: "Write the sentence with “never”:", von: "I made a podcast.", nach: ["I have never made a podcast.", "I've never made a podcast."] },
      { e: "pp",    a: "Ask a question with “ever”:", von: "You have streamed a concert.", nach: ["Have you ever streamed a concert?"] },
      { e: "pp",    a: "Write the sentence with “just”:", von: "My brother sent me a message.", nach: ["My brother has just sent me a message."] }
      // ab v0.9.10 (Paket 6b)
      ,{ e: "since", a: "Use “since” or “for”:", von: "I have known Carlos. (2020)", nach: ["I have known Carlos since 2020."] }
      ,{ e: "for", a: "Use “since” or “for”:", von: "Zoe has played the guitar. (five years)", nach: ["Zoe has played the guitar for five years."] }
      ,{ e: "since", a: "Use “since” or “for”:", von: "We have lived here. (I was born)", nach: ["We have lived here since I was born."] }
      ,{ e: "for", a: "Use “since” or “for”:", von: "My brother has been at home. (three days)", nach: ["My brother has been at home for three days."] }
      ,{ e: "since", a: "Use “since” or “for”:", von: "Mia hasn't posted a video. (last Friday)", nach: ["Mia hasn't posted a video since last Friday."] }
      ,{ e: "past", a: "Write the sentence with “last year”:", von: "We have visited New York.", nach: ["We visited New York last year.", "Last year we visited New York."] }
      ,{ e: "past", a: "Write the sentence with “yesterday”:", von: "Zoe has lost her phone.", nach: ["Zoe lost her phone yesterday.", "Yesterday Zoe lost her phone."] }
      ,{ e: "past", a: "Write the sentence with “in 2019”:", von: "My parents have bought a car.", nach: ["My parents bought a car in 2019.", "In 2019 my parents bought a car.", "In 2019, my parents bought a car."] }
      ,{ e: "pp", a: "Write the sentence with “already”:", von: "We cleaned the kitchen.", nach: ["We have already cleaned the kitchen.", "We have cleaned the kitchen already."] }
      ,{ e: "pp", a: "Ask a question with “yet”:", von: "You have finished your project.", nach: ["Have you finished your project yet?"] }
      ,{ e: "pp", a: "Write the sentence with “never”:", von: "Mia saw a whale.", nach: ["Mia has never seen a whale."] }
      ,{ e: "pp", a: "Write the sentence with “just”:", von: "The bus left.", nach: ["The bus has just left."] }
      ,{ e: "pp", a: "Ask a question with “ever”:", von: "You have been to Canada.", nach: ["Have you ever been to Canada?"] }
    ],
    zuordnen: {
      kategorien: ["since", "for"],
      woerter: [
        { text: "2019", ziel: "since" }, { text: "last summer", ziel: "since" }, { text: "Monday", ziel: "since" }, { text: "I was six", ziel: "since" },
        { text: "Christmas", ziel: "since" }, { text: "yesterday morning", ziel: "since" },
        { text: "two years", ziel: "for" }, { text: "three days", ziel: "for" }, { text: "a long time", ziel: "for" }, { text: "ten minutes", ziel: "for" },
        { text: "a week", ziel: "for" }, { text: "six months", ziel: "for" }
      ]
    },
    erklaerungen: {
      satzpool: {
        pp:    "Present perfect (Perfekt) = have/has + past participle (3. Form). We use it when there is no finished time (already, just, never, ever, yet, so far, since, for). Example: {BEISPIEL}",
        since: "since + a point in time (Zeitpunkt): since 2019, since Monday, since I was ten. Example: {BEISPIEL}",
        for:   "for + a period of time (Zeitraum): for two years, for a long time. Example: {BEISPIEL}",
        past:  "A finished time in the past (yesterday, last week, … ago, in 2020) or a question with When → simple past, not present perfect. Example: {BEISPIEL}",
        zuordnen: "since + point in time (Zeitpunkt): since Monday. for + period of time (Zeitraum): for two days."
      }
    }
  },

  // ---------- Klasse 8, Unit 5: Passiv (G12) ----------
  "8-G12": {
    saetze: [
      { e: "pres",  t: "English ___ in many countries.", h: "speak", r: ["is spoken"], f: ["speaks", "is speaked"], fehler: { ersatz: "is speaked", wort: "speaked", loesung: ["spoken"] } },
      { e: "pres",  t: "In Louisiana, chicken ___ in hot oil.", h: "fry", r: ["is fried"], f: ["fries", "is fry"], fehler: { ersatz: "is fry", wort: "fry", loesung: ["fried"] } },
      { e: "pres",  t: "Songs about civil rights ___ on the radio every day.", h: "play", r: ["are played"], f: ["is played", "play"], fehler: { ersatz: "is played", wort: "is", loesung: ["are"] } },
      { e: "pres",  t: "The airboat tours ___ by local guides.", h: "offer", r: ["are offered"], f: ["is offered", "offer"], fehler: { ersatz: "is offered", wort: "is", loesung: ["are"] } },
      { e: "pres",  t: "Gumbo ___ with flour, oil and vegetables.", h: "make", r: ["is made"], f: ["makes", "is maked"], fehler: { ersatz: "is maked", wort: "maked", loesung: ["made"] } },
      { e: "pres",  t: "Tickets for the swamp tour ___ at the stall.", h: "sell", r: ["are sold"], f: ["is sold", "are selled"], fehler: { ersatz: "are selled", wort: "selled", loesung: ["sold"] } },
      { e: "past",  t: "Rosa Parks ___ in 1955.", h: "arrest", r: ["was arrested"], f: ["were arrested", "arrested"], fehler: { ersatz: "were arrested", wort: "were", loesung: ["was"] } },
      { e: "past",  t: "The song ___ in 1964.", h: "release", r: ["was released"], f: ["were released", "was release"], fehler: { ersatz: "was release", wort: "release", loesung: ["released"] } },
      { e: "past",  t: "Segregation on buses ___ in 1956.", h: "ban", r: ["was banned"], f: ["were banned", "was ban"], fehler: { ersatz: "was ban", wort: "ban", loesung: ["banned"] } },
      { e: "past",  t: "Many protesters ___ to jail.", h: "take", r: ["were taken"], f: ["was taken", "were took"], fehler: { ersatz: "were took", wort: "took", loesung: ["taken"] } },
      { e: "past",  t: "New Orleans ___ by the French in 1718.", h: "found", r: ["was founded"], f: ["was found", "founded"], fehler: { ersatz: "was found", wort: "found", loesung: ["founded"] } },
      { e: "past",  t: "The first copies of the record ___ in a small studio.", h: "make", r: ["were made"], f: ["was made", "were maked"], fehler: { ersatz: "was made", wort: "was", loesung: ["were"] } },
      { e: "past",  t: "The protesters ___ into the restaurant.", h: "not / allow", r: ["weren't allowed", "were not allowed"], f: ["wasn't allowed", "didn't allowed"], fehler: { ersatz: "wasn't allowed", wort: "wasn't", loesung: ["weren't", "were not"] } },
      { e: "by",    t: "The bus boycott was led ___ Martin Luther King.", r: ["by"], f: ["from", "of"], fehler: "from" },
      { e: "by",    t: "This song was written ___ a famous singer from New Orleans.", r: ["by"], f: ["from", "of"], fehler: "from" },
      { e: "frage", t: "___ French spoken in Louisiana?", r: ["is"], f: ["does", "are"], fehler: "does" },
      { e: "frage", t: "When ___ the civil rights law signed?", r: ["was"], f: ["did", "were"], fehler: "did" }
      // ab v0.9.10 (Paket 6b)
      ,{ e: "pres",  t: "Jazz ___ in many clubs in New Orleans.", h: "play", r: ["is played"], f: ["are played", "plays"], fehler: { ersatz: "are played", wort: "are", loesung: ["is"] } }
      ,{ e: "pres",  t: "These T-shirts ___ in China.", h: "make", r: ["are made"], f: ["is made", "are maked"], fehler: { ersatz: "are maked", wort: "maked", loesung: ["made"] } }
      ,{ e: "pres",  t: "The museum ___ every day.", h: "clean", r: ["is cleaned"], f: ["cleans", "are cleaned"], fehler: { ersatz: "are cleaned", wort: "are", loesung: ["is"] } }
      ,{ e: "pres",  t: "The letters ___ every morning.", h: "bring", r: ["are brought"], f: ["is brought", "are bringed"], fehler: { ersatz: "are bringed", wort: "bringed", loesung: ["brought"] } }
      ,{ e: "past",  t: "The school ___ in 1910.", h: "build", r: ["was built"], f: ["were built", "was builded"], fehler: { ersatz: "was builded", wort: "builded", loesung: ["built"] } }
      ,{ e: "past",  t: "Two windows ___ in the storm.", h: "break", r: ["were broken"], f: ["was broken", "were broke"], fehler: { ersatz: "were broke", wort: "broke", loesung: ["broken"] } }
      ,{ e: "past",  t: "My bike ___ last night.", h: "steal", r: ["was stolen"], f: ["were stolen", "was stealed"], fehler: { ersatz: "was stealed", wort: "stealed", loesung: ["stolen"] } }
      ,{ e: "by",    t: "The telephone was invented ___ Alexander Graham Bell.", r: ["by"], f: ["from", "of"], fehler: "from" }
      ,{ e: "frage", t: "___ the letters brought every day?", r: ["are"], f: ["do", "is"], fehler: "do" }
      ,{ e: "frage", t: "Where ___ the first jazz songs played?", r: ["were"], f: ["did", "was"], fehler: "did" }
    ],
    umformen: [
      { e: "pres", a: "Make it passive (without “by”):", von: "People speak French in parts of Louisiana.", nach: ["French is spoken in parts of Louisiana.", "In parts of Louisiana French is spoken.", "In parts of Louisiana, French is spoken."] },
      { e: "pres", a: "Make it passive (without “by”):", von: "They grow rice in Louisiana.", nach: ["Rice is grown in Louisiana.", "In Louisiana rice is grown.", "In Louisiana, rice is grown."] },
      { e: "pres", a: "Make it passive (without “by”):", von: "They fry the fish in hot oil.", nach: ["The fish is fried in hot oil."] },
      { e: "by",   a: "Make it passive (with “by”):", von: "Many tourists visit the French Quarter.", nach: ["The French Quarter is visited by many tourists."] },
      { e: "by",   a: "Make it passive (with “by”):", von: "Local guides lead the airboat tours.", nach: ["The airboat tours are led by local guides."] },
      { e: "by",   a: "Make it passive (with “by”):", von: "The police arrested Rosa Parks.", nach: ["Rosa Parks was arrested by the police."] },
      { e: "by",   a: "Make it passive (with “by”):", von: "Martin Luther King gave this speech.", nach: ["This speech was given by Martin Luther King."] },
      { e: "by",   a: "Make it passive (with “by”):", von: "The French founded New Orleans.", nach: ["New Orleans was founded by the French."] },
      { e: "by",   a: "Make it passive (with “by”):", von: "A famous band recorded the song.", nach: ["The song was recorded by a famous band."] },
      { e: "by",   a: "Make it passive (with “by”):", von: "Millions of people bought the record.", nach: ["The record was bought by millions of people."] },
      { e: "past", a: "Make it passive (without “by”):", von: "They banned segregation in 1964.", nach: ["Segregation was banned in 1964.", "In 1964 segregation was banned.", "In 1964, segregation was banned."] },
      { e: "past", a: "Make it passive (without “by”):", von: "Someone stole my bike yesterday.", nach: ["My bike was stolen yesterday.", "Yesterday my bike was stolen.", "Yesterday, my bike was stolen."] }
      // ab v0.9.10 (Paket 6b)
      ,{ e: "pres", a: "Make it passive (without “by”):", von: "People eat gumbo in Louisiana.", nach: ["Gumbo is eaten in Louisiana.", "In Louisiana gumbo is eaten.", "In Louisiana, gumbo is eaten."] }
      ,{ e: "pres", a: "Make it passive (without “by”):", von: "They sell hot dogs at the stall.", nach: ["Hot dogs are sold at the stall."] }
      ,{ e: "pres", a: "Make it passive (without “by”):", von: "They clean the classrooms every day.", nach: ["The classrooms are cleaned every day.", "Every day the classrooms are cleaned."] }
      ,{ e: "pres", a: "Make it passive (without “by”):", von: "People play jazz in the French Quarter.", nach: ["Jazz is played in the French Quarter.", "In the French Quarter jazz is played.", "In the French Quarter, jazz is played."] }
      ,{ e: "by", a: "Make it passive (with “by”):", von: "My grandma cooks the dinner.", nach: ["The dinner is cooked by my grandma."] }
      ,{ e: "by", a: "Make it passive (with “by”):", von: "Lots of people watch the parade.", nach: ["The parade is watched by lots of people."] }
      ,{ e: "by", a: "Make it passive (with “by”):", von: "Alexander Graham Bell invented the telephone.", nach: ["The telephone was invented by Alexander Graham Bell."] }
      ,{ e: "by", a: "Make it passive (with “by”):", von: "Mark Twain wrote this book.", nach: ["This book was written by Mark Twain."] }
      ,{ e: "by", a: "Make it passive (with “by”):", von: "The storm broke the windows.", nach: ["The windows were broken by the storm."] }
      ,{ e: "by", a: "Make it passive (with “by”):", von: "Zoe took these photos.", nach: ["These photos were taken by Zoe."] }
      ,{ e: "past", a: "Make it passive (without “by”):", von: "They built the bridge in 1937.", nach: ["The bridge was built in 1937.", "In 1937 the bridge was built.", "In 1937, the bridge was built."] }
      ,{ e: "past", a: "Make it passive (without “by”):", von: "Somebody found my phone.", nach: ["My phone was found."] }
      ,{ e: "past", a: "Make it passive (without “by”):", von: "They opened the museum last year.", nach: ["The museum was opened last year.", "Last year the museum was opened."] }
      ,{ e: "past", a: "Make it passive (without “by”):", von: "They closed the road yesterday.", nach: ["The road was closed yesterday.", "Yesterday the road was closed."] }
    ],
    zuordnen: {
      kategorien: ["passive: simple present", "passive: simple past"],
      woerter: [
        { text: "is made", ziel: "passive: simple present" }, { text: "was made", ziel: "passive: simple past" }, { text: "are sold", ziel: "passive: simple present" }, { text: "were sold", ziel: "passive: simple past" },
        { text: "is spoken", ziel: "passive: simple present" }, { text: "was spoken", ziel: "passive: simple past" }, { text: "are played", ziel: "passive: simple present" }, { text: "were played", ziel: "passive: simple past" },
        { text: "is fried", ziel: "passive: simple present" }, { text: "was founded", ziel: "passive: simple past" }, { text: "are grown", ziel: "passive: simple present" }, { text: "were arrested", ziel: "passive: simple past" }
      ]
    },
    erklaerungen: {
      satzpool: {
        pres:  "Passive (Passiv) in the simple present: am/is/are + past participle (3. Form). Example: {BEISPIEL}",
        past:  "Passive (Passiv) in the simple past: was/were + past participle (3. Form). Example: {BEISPIEL}",
        by:    "Who did it? In the passive we say it with by (von): The song was written by … Example: {BEISPIEL}",
        frage: "Questions in the passive: (question word +) is/are/was/were + subject + 3rd form? Example: {BEISPIEL}",
        zuordnen: "am/is/are + 3rd form → passive in the simple present. was/were + 3rd form → passive in the simple past."
      }
    }
  },

  // ---------- Klasse 8, Unit 5: indirekte Rede ohne Zeitverschiebung (G13) ----------
  "8-G13": {
    saetze: [
      { e: "says",  q: "Jake: “I love jazz.”",                   t: "Jake says that he ___ jazz.", r: ["loves"], f: ["loved", "love"], fehler: "loved" },
      { e: "pron",  q: "Mia: “My parents are from New Orleans.”", t: "Mia says that ___ parents are from New Orleans.", r: ["her"], f: ["my", "their"], fehler: "my" },
      { e: "pron",  q: "Carlos: “We eat gumbo every Sunday.”",   t: "Carlos says that ___ eat gumbo every Sunday.", r: ["they"], f: ["we", "he"], fehler: "we" },
      { e: "says",  q: "Zoe: “I don't like alligators.”",        t: "Zoe says that she ___ like alligators.", r: ["doesn't", "does not"], f: ["don't", "didn't"], fehler: { ersatz: "didn't", wort: "didn't", loesung: ["doesn't", "does not"] } },
      { e: "says",  q: "Jake: “The airboat tour is great.”",     t: "Jake says that the airboat tour ___ great.", r: ["is"], f: ["was", "are"], fehler: "was" },
      { e: "says",  q: "The trainer: “You can do it!”",          t: "The trainer tells me that I ___ do it.", r: ["can"], f: ["could", "can't"], fehler: "could" },
      { e: "says",  q: "Grandpa: “The music in New Orleans is the best.”", t: "Grandpa says that the music in New Orleans ___ the best.", r: ["is"], f: ["was", "be"], fehler: "was" },
      { e: "says",  q: "Mia: “I have two cats.”",                t: "Mia says that she ___ two cats.", r: ["has"], f: ["had", "have"], fehler: "had" },
      { e: "pron",  q: "Mom: “I need your help.”",               t: "Mom says that she needs ___ help.", r: ["my"], f: ["your", "her"], fehler: "your" },
      { e: "pron",  q: "Zoe and Mia: “We love the French Quarter.”", t: "Zoe and Mia say that ___ love the French Quarter.", r: ["they"], f: ["we", "she"], fehler: "we" },
      { e: "frage", q: "Mia: “Do you like Southern food?”",      t: "Mia asks ___ I like Southern food.", r: ["if", "whether"], f: ["that", "do"], fehler: "that" },
      { e: "frage", q: "Jake: “Where do you live?”",             t: "Jake asks where I ___.", r: ["live"], f: ["do live", "lived"], fehler: "lived" },
      { e: "frage", q: "The guide: “Are you afraid of alligators?”", t: "The guide asks ___ we are afraid of alligators.", r: ["if", "whether"], f: ["that", "are"], fehler: "that" },
      { e: "frage", q: "Zoe: “What time does the show start?”",  t: "Zoe asks what time the show ___.", r: ["starts"], f: ["does start", "started"], fehler: "started" },
      { e: "frage", q: "Carlos: “Why is the bus late?”",         t: "Carlos asks why the bus ___ late.", r: ["is"], f: ["was", "does"], fehler: "was" },
      { e: "frage", q: "My friend: “Can you help me?”",          t: "My friend asks if I ___ help him.", r: ["can"], f: ["do", "am"] }
      // ab v0.9.10 (Paket 6b)
      ,{ e: "says", q: "Zoe: “I play the guitar.”", t: "Zoe says that she ___ the guitar.", r: ["plays"], f: ["played", "play"], fehler: "played" }
      ,{ e: "says", q: "Carlos: “My dog is very old.”", t: "Carlos says that his dog ___ very old.", r: ["is"], f: ["was", "are"], fehler: "was" }
      ,{ e: "says", q: "Mia: “I can't come to the party.”", t: "Mia says that she ___ come to the party.", r: ["can't", "cannot"], f: ["couldn't", "can"], fehler: "couldn't" }
      ,{ e: "says", q: "Jake: “I don't have time.”", t: "Jake says that he ___ have time.", r: ["doesn't", "does not"], f: ["didn't", "don't"], fehler: {"ersatz": "don't", "wort": "don't", "loesung": ["doesn't", "does not"]} }
      ,{ e: "says", q: "Dad: “The car is dirty.”", t: "Dad says that the car ___ dirty.", r: ["is"], f: ["was", "are"], fehler: "are" }
      ,{ e: "pron", q: "Zoe: “I lost my phone.”", t: "Zoe says that she lost ___ phone.", r: ["her"], f: ["my", "his"], fehler: "my" }
      ,{ e: "pron", q: "Jake: “We are going to New Orleans.”", t: "Jake says that ___ are going to New Orleans.", r: ["they"], f: ["we", "he"], fehler: "we" }
      ,{ e: "pron", q: "Mom: “Your room is very dirty.”", t: "Mom says that ___ room is very dirty.", r: ["my"], f: ["your", "her"], fehler: "your" }
      ,{ e: "pron", q: "Carlos: “My sister likes jazz.”", t: "Carlos says that ___ sister likes jazz.", r: ["his"], f: ["my", "her"], fehler: "my" }
      ,{ e: "frage", q: "Mia: “Is the museum open?”", t: "Mia asks ___ the museum is open.", r: ["if", "whether"], f: ["that", "is"], fehler: "that" }
      ,{ e: "frage", q: "Jake: “When does the bus leave?”", t: "Jake asks when the bus ___.", r: ["leaves"], f: ["does leave", "left"], fehler: "left" }
      ,{ e: "frage", q: "Zoe: “How old are you?”", t: "Zoe asks how old I ___.", r: ["am"], f: ["are", "was"], fehler: "was" }
    ],
    umformen: [
      { e: "says",  a: "Report what they say:", von: "Mia: “I am hungry.”", nach: K8_REDE("Mia says that she is hungry.") },
      { e: "pron",  a: "Report what they say:", von: "Jake: “My brother plays in a band.”", nach: K8_REDE("Jake says that his brother plays in a band.") },
      { e: "pron",  a: "Report what they say:", von: "Zoe: “We are at the protest.”", nach: K8_REDE("Zoe says that they are at the protest.") },
      { e: "says",  a: "Report what they say:", von: "Carlos: “I don't like hot weather.”", nach: K8_REDE("Carlos says that he doesn't like hot weather.", "Carlos says that he does not like hot weather.") },
      { e: "says",  a: "Report what they say:", von: "The guide: “The swamp is dangerous.”", nach: K8_REDE("The guide says that the swamp is dangerous.") },
      { e: "says",  a: "Report what they say:", von: "Mom: “I love this song.”", nach: K8_REDE("Mom says that she loves this song.") },
      { e: "frage", a: "Report the question:", von: "Mia: “Do you know the song?”", nach: ["Mia asks if I know the song.", "Mia asks whether I know the song.", "Mia asks if we know the song.", "Mia asks whether we know the song."] },
      { e: "frage", a: "Report the question:", von: "Jake: “Where is the stall?”", nach: ["Jake asks where the stall is."] },
      { e: "frage", a: "Report the question:", von: "Grandma: “Are you hungry?”", nach: ["Grandma asks if I am hungry.", "Grandma asks whether I am hungry.", "Grandma asks if I'm hungry.", "Grandma asks whether I'm hungry."] },
      { e: "frage", a: "Report the question:", von: "Zoe: “What do you want to eat?”", nach: ["Zoe asks what I want to eat.", "Zoe asks what we want to eat."] },
      { e: "frage", a: "Report the question:", von: "Carlos: “Can we go on an airboat tour?”", nach: ["Carlos asks if we can go on an airboat tour.", "Carlos asks whether we can go on an airboat tour."] },
      { e: "frage", a: "Report the question:", von: "Dad: “When does the parade start?”", nach: ["Dad asks when the parade starts."] }
      // ab v0.9.10 (Paket 6b)
      ,{ e: "says", a: "Report what they say:", von: "Zoe: “I like New Orleans.”", nach: K8_REDE("Zoe says that she likes New Orleans.") }
      ,{ e: "says", a: "Report what they say:", von: "Jake: “I am tired.”", nach: K8_REDE("Jake says that he is tired.") }
      ,{ e: "pron", a: "Report what they say:", von: "Mia: “My brother is in a band.”", nach: K8_REDE("Mia says that her brother is in a band.") }
      ,{ e: "pron", a: "Report what they say:", von: "Carlos: “We don't have school today.”", nach: K8_REDE("Carlos says that they don't have school today.", "Carlos says that they do not have school today.") }
      ,{ e: "pron", a: "Report what they say:", von: "Dad: “I can't find my keys.”", nach: K8_REDE("Dad says that he can't find his keys.", "Dad says that he cannot find his keys.") }
      ,{ e: "pron", a: "Report what they say:", von: "The kids: “We want ice cream.”", nach: K8_REDE("The kids say that they want ice cream.") }
      ,{ e: "says", a: "Report what they say:", von: "Grandma: “I don't like loud music.”", nach: K8_REDE("Grandma says that she doesn't like loud music.", "Grandma says that she does not like loud music.") }
      ,{ e: "frage", a: "Report the question:", von: "Mia: “Do you have a pet?”", nach: ["Mia asks if I have a pet.", "Mia asks whether I have a pet.", "Mia asks if we have a pet.", "Mia asks whether we have a pet."] }
      ,{ e: "frage", a: "Report the question:", von: "Jake: “Where do you live?”", nach: ["Jake asks where I live.", "Jake asks where we live."] }
      ,{ e: "frage", a: "Report the question:", von: "Zoe: “Is it cold outside?”", nach: ["Zoe asks if it is cold outside.", "Zoe asks whether it is cold outside."] }
      ,{ e: "frage", a: "Report the question:", von: "Carlos: “What time is it?”", nach: ["Carlos asks what time it is."] }
      ,{ e: "frage", a: "Report the question:", von: "Mom: “Are you ready?”", nach: ["Mom asks if I am ready.", "Mom asks whether I am ready.", "Mom asks if we are ready.", "Mom asks whether we are ready."] }
      ,{ e: "frage", a: "Report the question:", von: "Dad: “Where is my phone?”", nach: ["Dad asks where his phone is."] }
      ,{ e: "frage", a: "Report the question:", von: "The teacher: “Who has a pen?”", nach: ["The teacher asks who has a pen."] }
    ],
    zuordnen: {
      kategorien: ["asks if …", "asks where …", "asks what …"],
      woerter: [
        { text: "“Do you like jazz?”", ziel: "asks if …" }, { text: "“Are you tired?”", ziel: "asks if …" }, { text: "“Can you swim?”", ziel: "asks if …" }, { text: "“Is it far?”", ziel: "asks if …" },
        { text: "“Where is the bus stop?”", ziel: "asks where …" }, { text: "“Where do you live?”", ziel: "asks where …" }, { text: "“Where are my keys?”", ziel: "asks where …" }, { text: "“Where does Mia work?”", ziel: "asks where …" },
        { text: "“What is your name?”", ziel: "asks what …" }, { text: "“What do you want?”", ziel: "asks what …" }, { text: "“What time is it?”", ziel: "asks what …" }, { text: "“What does he like?”", ziel: "asks what …" }
      ]
    },
    erklaerungen: {
      satzpool: {
        says:  "Reported speech (indirekte Rede) with says/asks/tells: the tense does NOT change (keine Zeitverschiebung). Example: {BEISPIEL}",
        pron:  "Change the pronouns (Pronomen) so they fit: I → he/she, my → his/her, we → they, your → my. Example: {BEISPIEL}",
        frage: "Reported questions (indirekte Fragen): yes/no question → if/whether. A question word stays. Normal word order (Wortstellung), no do/does. Example: {BEISPIEL}",
        zuordnen: "Yes/no question (Do …? Are …? Can …?) → asks if … Question with a question word → the question word stays."
      }
    }
  },

  // ---------- Klasse 8, Unit 5: indirekte Rede mit Zeitverschiebung (G14) ----------
  "8-G14": {
    saetze: [
      { e: "shift", q: "Mia: “I want a hot dog.”",               t: "Mia said that she ___ a hot dog.", r: ["wanted"], f: ["wants", "want"], fehler: "wants" },
      { e: "shift", q: "Carlos: “My sister works at a stall.”",  t: "Carlos said that his sister ___ at a stall.", r: ["worked"], f: ["works", "work"], fehler: "works" },
      { e: "shift", q: "Zoe: “I don't eat meat.”",               t: "Zoe said that she ___ eat meat.", r: ["didn't", "did not"], f: ["doesn't", "don't"], fehler: { ersatz: "doesn't", wort: "doesn't", loesung: ["didn't", "did not"] } },
      { e: "shift", q: "The trainer: “You are very fast.”",      t: "The trainer told me that I ___ very fast.", r: ["was"], f: ["am", "were"], fehler: "am" },
      { e: "shift", q: "Jake: “We are lost.”",                   t: "Jake said that they ___ lost.", r: ["were"], f: ["are", "was"], fehler: "are" },
      { e: "shift", q: "Grandma: “I love the blues.”",           t: "Grandma said that she ___ the blues.", r: ["loved"], f: ["loves", "love"], fehler: "loves" },
      { e: "shift", q: "Mia: “The protesters are very brave.”",  t: "Mia said that the protesters ___ very brave.", r: ["were"], f: ["are", "was"], fehler: "are" },
      { e: "shift", q: "Dad: “I feel sick.”",                    t: "Dad said that he ___ sick.", r: ["felt"], f: ["feels", "feeled"], fehler: "feels" },
      { e: "shift", q: "Jake: “I have a new trainer.”",          t: "Jake said that he ___ a new trainer.", r: ["had"], f: ["has", "have"], fehler: "has" },
      { e: "shift", q: "The kids: “We don't understand the rule.”", t: "The kids said that they ___ understand the rule.", r: ["didn't", "did not"], f: ["don't", "doesn't"], fehler: { ersatz: "don't", wort: "don't", loesung: ["didn't", "did not"] } },
      { e: "shift", q: "My friend: “The song is in the charts.”", t: "My friend said that the song ___ in the charts.", r: ["was"], f: ["is", "were"], fehler: "is" },
      { e: "frage", q: "The waiter: “Do you want some coffee?”",  t: "The waiter asked ___ I wanted some coffee.", r: ["if", "whether"], f: ["that", "do"], fehler: "that" },
      { e: "frage", q: "Zoe: “Where does your aunt work?”",      t: "Zoe asked where my aunt ___.", r: ["worked"], f: ["works", "did work"], fehler: "works" },
      { e: "frage", q: "Carlos: “Are you tired?”",               t: "Carlos asked if I ___ tired.", r: ["was"], f: ["am", "were"], fehler: "am" },
      { e: "frage", q: "The guide: “What do you know about civil rights?”", t: "The guide asked what we ___ about civil rights.", r: ["knew"], f: ["know", "did know"], fehler: "know" },
      { e: "frage", q: "Mom: “Why are you late?”",               t: "Mom asked why I ___ late.", r: ["was"], f: ["am", "were"], fehler: "am" }
      // ab v0.9.10 (Paket 6b)
      ,{ e: "shift", q: "Zoe: “I like jazz.”", t: "Zoe said that she ___ jazz.", r: ["liked"], f: ["likes", "like"], fehler: "likes" }
      ,{ e: "shift", q: "Carlos: “I am hungry.”", t: "Carlos said that he ___ hungry.", r: ["was"], f: ["is", "were"], fehler: "is" }
      ,{ e: "shift", q: "Mia: “My parents work in a hospital.”", t: "Mia said that her parents ___ in a hospital.", r: ["worked"], f: ["work", "works"], fehler: "work" }
      ,{ e: "shift", q: "Jake: “I can't swim.”", t: "Jake said that he ___ swim.", r: ["couldn't", "could not"], f: ["can't", "doesn't"], fehler: {"ersatz": "can't", "wort": "can't", "loesung": ["couldn't", "could not"]} }
      ,{ e: "shift", q: "The kids: “We are bored.”", t: "The kids said that they ___ bored.", r: ["were"], f: ["are", "was"], fehler: "are" }
      ,{ e: "shift", q: "Dad: “I don't know the answer.”", t: "Dad said that he ___ know the answer.", r: ["didn't", "did not"], f: ["doesn't", "don't"], fehler: {"ersatz": "doesn't", "wort": "doesn't", "loesung": ["didn't", "did not"]} }
      ,{ e: "shift", q: "Zoe: “The museum is closed.”", t: "Zoe told me that the museum ___ closed.", r: ["was"], f: ["is", "were"], fehler: "is" }
      ,{ e: "frage", q: "Mia: “Do you like pizza?”", t: "Mia asked ___ I liked pizza.", r: ["if", "whether"], f: ["that", "do"], fehler: "that" }
      ,{ e: "frage", q: "Jake: “Where do you live?”", t: "Jake asked where I ___.", r: ["lived"], f: ["live", "did live"], fehler: "live" }
      ,{ e: "frage", q: "Carlos: “Is the shop open?”", t: "Carlos asked if the shop ___ open.", r: ["was"], f: ["is", "were"], fehler: "is" }
    ],
    umformen: [
      { e: "shift", a: "Report it with “said”:", von: "Lily: “I am tired.”", nach: K8_REDE("Lily said that she was tired.") },
      { e: "shift", a: "Report it with “said”:", von: "Jake: “My parents live in Texas.”", nach: K8_REDE("Jake said that his parents lived in Texas.") },
      { e: "shift", a: "Report it with “said”:", von: "Zoe: “I don't like hot weather.”", nach: K8_REDE("Zoe said that she didn't like hot weather.", "Zoe said that she did not like hot weather.") },
      { e: "shift", a: "Report it with “said”:", von: "Carlos: “We are at the port.”", nach: K8_REDE("Carlos said that they were at the port.") },
      { e: "shift", a: "Report it with “said”:", von: "Grandpa: “I play the guitar every day.”", nach: K8_REDE("Grandpa said that he played the guitar every day.") },
      { e: "shift", a: "Report it with “said”:", von: "The guide: “The trail is very long.”", nach: K8_REDE("The guide said that the trail was very long.") },
      { e: "frage", a: "Report the question with “asked”:", von: "Mia: “Do you like gumbo?”", nach: ["Mia asked if I liked gumbo.", "Mia asked whether I liked gumbo.", "Mia asked if we liked gumbo.", "Mia asked whether we liked gumbo."] },
      { e: "frage", a: "Report the question with “asked”:", von: "Jake: “Where is the airboat?”", nach: ["Jake asked where the airboat was."] },
      { e: "frage", a: "Report the question with “asked”:", von: "Mom: “Are you hungry?”", nach: ["Mom asked if I was hungry.", "Mom asked whether I was hungry.", "Mom asked if we were hungry.", "Mom asked whether we were hungry."] },
      { e: "frage", a: "Report the question with “asked”:", von: "Dad: “What do you want for dinner?”", nach: ["Dad asked what I wanted for dinner.", "Dad asked what we wanted for dinner."] },
      { e: "frage", a: "Report the question with “asked”:", von: "Zoe: “Where does the bus stop?”", nach: ["Zoe asked where the bus stopped."] },
      { e: "frage", a: "Report the question with “asked”:", von: "The teacher: “Who knows the answer?”", nach: ["The teacher asked who knew the answer."] }
      // ab v0.9.10 (Paket 6b)
      ,{ e: "shift", a: "Report it with “said”:", von: "Mia: “I am happy.”", nach: K8_REDE("Mia said that she was happy.") }
      ,{ e: "shift", a: "Report it with “said”:", von: "Jake: “I like basketball.”", nach: K8_REDE("Jake said that he liked basketball.") }
      ,{ e: "shift", a: "Report it with “said”:", von: "Zoe: “My brother plays the guitar.”", nach: K8_REDE("Zoe said that her brother played the guitar.") }
      ,{ e: "shift", a: "Report it with “said”:", von: "Carlos: “We are very tired.”", nach: K8_REDE("Carlos said that they were very tired.") }
      ,{ e: "shift", a: "Report it with “said”:", von: "Dad: “I don't want coffee.”", nach: K8_REDE("Dad said that he didn't want coffee.", "Dad said that he did not want coffee.") }
      ,{ e: "shift", a: "Report it with “said”:", von: "Grandma: “I can't hear you.”", nach: K8_REDE("Grandma said that she couldn't hear me.", "Grandma said that she could not hear me.", "Grandma said that she couldn't hear us.", "Grandma said that she could not hear us.") }
      ,{ e: "shift", a: "Report it with “said”:", von: "The teacher: “The test is easy.”", nach: K8_REDE("The teacher said that the test was easy.") }
      ,{ e: "frage", a: "Report the question with “asked”:", von: "Zoe: “Do you play an instrument?”", nach: ["Zoe asked if I played an instrument.", "Zoe asked whether I played an instrument.", "Zoe asked if we played an instrument.", "Zoe asked whether we played an instrument."] }
      ,{ e: "frage", a: "Report the question with “asked”:", von: "Mia: “Where is the station?”", nach: ["Mia asked where the station was."] }
      ,{ e: "frage", a: "Report the question with “asked”:", von: "Jake: “Are you ready?”", nach: ["Jake asked if I was ready.", "Jake asked whether I was ready.", "Jake asked if we were ready.", "Jake asked whether we were ready."] }
      ,{ e: "frage", a: "Report the question with “asked”:", von: "Carlos: “What time is it?”", nach: ["Carlos asked what time it was."] }
      ,{ e: "frage", a: "Report the question with “asked”:", von: "Dad: “Who wants pizza?”", nach: ["Dad asked who wanted pizza."] }
      ,{ e: "frage", a: "Report the question with “asked”:", von: "The guide: “Can you see the alligator?”", nach: ["The guide asked if I could see the alligator.", "The guide asked whether I could see the alligator.", "The guide asked if we could see the alligator.", "The guide asked whether we could see the alligator."] }
      ,{ e: "frage", a: "Report the question with “asked”:", von: "Mom: “Why are you sad?”", nach: ["Mom asked why I was sad.", "Mom asked why we were sad."] }
    ],
    zuordnen: {
      kategorien: ["… said … was …", "… said … were …"],
      woerter: [
        { text: "“I am tired.”", ziel: "… said … was …" }, { text: "“It is late.”", ziel: "… said … was …" }, { text: "“She is at home.”", ziel: "… said … was …" }, { text: "“The bus is full.”", ziel: "… said … was …" },
        { text: "“Mia is sick.”", ziel: "… said … was …" }, { text: "“We are lost.”", ziel: "… said … were …" }, { text: "“You are right.”", ziel: "… said … were …" }, { text: "“They are late.”", ziel: "… said … were …" },
        { text: "“The fries are hot.”", ziel: "… said … were …" }, { text: "“My parents are here.”", ziel: "… said … were …" }
      ]
    },
    erklaerungen: {
      satzpool: {
        shift: "Reported speech (indirekte Rede) with said/told: simple present → simple past (Zeitverschiebung): “I love jazz.” → He said that he loved jazz. Example: {BEISPIEL}",
        frage: "Reported questions with asked: if/whether or the question word + normal word order (Wortstellung) + simple past: She asked where I lived. Example: {BEISPIEL}",
        zuordnen: "With said: am/is → was, are → were."
      }
    }
  }
});

Object.assign(K8.generatoren, {
  "8-G6":  { baukasten: "8-G6",  art: "satzpool" },
  "8-G7":  { baukasten: "8-G7",  art: "satzpool" },
  "8-G8":  { baukasten: "8-U3",  art: "ifsatz2" },
  "8-G9":  { baukasten: "8-U4",  art: "presvsprog" },
  "8-G10": { baukasten: "8-G10", art: "satzpool" },
  "8-G11": { baukasten: "8-G11", art: "satzpool" },
  "8-G12": { baukasten: "8-G12", art: "satzpool" },
  "8-G13": { baukasten: "8-G13", art: "satzpool" },
  "8-G14": { baukasten: "8-G14", art: "satzpool" }
});

K8.aufgaben.push(
  { thema: "8-G6", niveau: "gruen", form: "quiz", frage: "The movie was boring, ___ it?", optionen: ["wasn't", "didn't", "isn't"], loesung: "wasn't",
    erklaerung: "With be, use was again: was → wasn't it? Example: The turkey was delicious, wasn't it?" },
  { thema: "8-G6", niveau: "rot", form: "fehler", satz: "Your sister speaks Spanish, isn't she?", fehlerwort: "isn't", loesung: ["doesn't"],
    erklaerung: "No helping verb (Hilfsverb) in the sentence → use does in the tag: doesn't she? Example: Your mom likes pumpkin pie, doesn't she?" },
  { thema: "8-G7", niveau: "gruen", form: "quiz", frage: "Who ___ the window?", optionen: ["broke", "did break", "breaked"], loesung: "broke",
    erklaerung: "Asking for the subject (Subjektfrage): Who + verb – no did. Example: Who called the police?" },
  { thema: "8-G7", niveau: "gelb", form: "luecke", frage: "Where ___ you ___ (go) on vacation last year?", loesung: [["did"], ["go"]],
    erklaerung: "Questions in the simple past: question word + did + person + infinitive (Grundform). Example: What did Jake buy?" },
  { thema: "8-G8", niveau: "gruen", form: "quiz", frage: "If I had a dog, I ___ walk it every day.", optionen: ["would", "will", "did"], loesung: "would",
    erklaerung: "Type II (only imagined): if + simple past, main clause with would. Example: If I knew the solution, I would tell you." },
  { thema: "8-G9", niveau: "gruen", form: "quiz", frage: "Look! The waitress ___ a selfie with a customer.", optionen: ["is taking", "takes", "take"], loesung: "is taking",
    erklaerung: "Look! = right now → am/is/are + -ing. Example: Listen! Zoe is streaming a concert." },
  { thema: "8-G10", niveau: "gelb", form: "luecke", frage: "The new podcast sounds ___ (interesting).", loesung: ["interesting"],
    erklaerung: "After sound we use an adjective (Adjektiv). Example: This new song sounds catchy." },
  { thema: "8-G11", niveau: "gruen", form: "quiz", frage: "I have known my best friend ___ I was five.", optionen: ["since", "for", "ago"], loesung: "since",
    erklaerung: "since + a point in time (Zeitpunkt). Example: Jake hasn't posted anything since Monday." },
  { thema: "8-G11", niveau: "rot", form: "fehler", satz: "Mia has lived in Boston since three years.", fehlerwort: "since", loesung: ["for"],
    erklaerung: "for + a period of time (Zeitraum): for three years. Example: They have known each other for a long time." },
  { thema: "8-G12", niveau: "gruen", form: "quiz", frage: "The Statue of Liberty ___ to the USA by France.", optionen: ["was given", "gave", "was give"], loesung: "was given",
    erklaerung: "Passive in the simple past: was/were + 3rd form. Example: New Orleans was founded by the French." },
  { thema: "8-G13", niveau: "gruen", form: "quiz", frage: "Zoe: “I like jazz.”  →  Zoe says that ___ likes jazz.", optionen: ["she", "I", "you"], loesung: "she",
    erklaerung: "Change the pronoun (Pronomen): I → she. Example: Jake: “I love jazz.” → Jake says that he loves jazz." },
  { thema: "8-G14", niveau: "gruen", form: "quiz", frage: "Jake: “I am hungry.”  →  Jake said that he ___ hungry.", optionen: ["was", "is", "were"], loesung: "was",
    erklaerung: "With said: am → was (Zeitverschiebung). Example: The trainer told me that I was very fast." }
);

K8.zusatzfragen.push(
  { thema: "8-G6", frage: "You like jazz, … ?", optionen: ["don't you", "aren't you", "do you"], loesung: "don't you" },
  { thema: "8-G6", frage: "She can't swim, … ?", optionen: ["can she", "can't she", "does she"], loesung: "can she" },
  { thema: "8-G6", frage: "They went bowling, … ?", optionen: ["didn't they", "weren't they", "don't they"], loesung: "didn't they" },
  { thema: "8-G6", frage: "It is cold, … ?", optionen: ["isn't it", "doesn't it", "is it"], loesung: "isn't it" },
  { thema: "8-G7", frage: "Who … in this house?", optionen: ["lives", "does live", "live"], loesung: "lives" },
  { thema: "8-G7", frage: "Where … your aunt work?", optionen: ["does", "do", "is"], loesung: "does" },
  { thema: "8-G7", frage: "What … you do tomorrow?", optionen: ["will", "did", "were"], loesung: "will" },
  { thema: "8-G7", frage: "… backpack is this?", optionen: ["Whose", "Who's", "Who"], loesung: "Whose" },
  { thema: "8-G8", frage: "If I … rich, I would buy a big house.", optionen: ["were", "am", "will be"], loesung: "were" },
  { thema: "8-G8", frage: "If we had a car, we … to Canada.", optionen: ["would drive", "will drive", "would drove"], loesung: "would drive" },
  { thema: "8-G8", frage: "Which is type II?", optionen: ["If I knew it, I would tell you.", "If I know it, I will tell you.", "I know it."], loesung: "If I knew it, I would tell you." },
  { thema: "8-G8", frage: "If she … more time, she'd help us.", optionen: ["had", "has", "would have"], loesung: "had" },
  { thema: "8-G9", frage: "Listen! Mia … to a podcast.", optionen: ["is listening", "listens", "listen"], loesung: "is listening" },
  { thema: "8-G9", frage: "Jake … his status every day.", optionen: ["updates", "is updating", "update"], loesung: "updates" },
  { thema: "8-G9", frage: "We usually … video games on Fridays.", optionen: ["play", "are playing", "plays"], loesung: "play" },
  { thema: "8-G9", frage: "Look! My dad … a selfie.", optionen: ["is taking", "takes", "taking"], loesung: "is taking" },
  { thema: "8-G10", frage: "She sings …", optionen: ["beautifully.", "beautiful.", "beautifuly."], loesung: "beautifully." },
  { thema: "8-G10", frage: "This cake tastes …", optionen: ["great.", "greatly.", "greatful."], loesung: "great." },
  { thema: "8-G10", frage: "He plays football very …", optionen: ["well.", "good.", "goodly."], loesung: "well." },
  { thema: "8-G10", frage: "…, we found the way.", optionen: ["Luckily", "Lucky", "Luck"], loesung: "Luckily" },
  { thema: "8-G11", frage: "Mia has lived here … ten years.", optionen: ["for", "since", "ago"], loesung: "for" },
  { thema: "8-G11", frage: "I … the video yesterday.", optionen: ["watched", "have watched", "has watched"], loesung: "watched" },
  { thema: "8-G11", frage: "Have you ever … a blog?", optionen: ["written", "wrote", "write"], loesung: "written" },
  { thema: "8-G11", frage: "We haven't seen him … Monday.", optionen: ["since", "for", "ago"], loesung: "since" },
  { thema: "8-G12", frage: "French … in Louisiana.", optionen: ["is spoken", "speaks", "is speaked"], loesung: "is spoken" },
  { thema: "8-G12", frage: "The song was written … a famous singer.", optionen: ["by", "from", "of"], loesung: "by" },
  { thema: "8-G12", frage: "The protesters … to jail.", optionen: ["were taken", "was taken", "were took"], loesung: "were taken" },
  { thema: "8-G12", frage: "… the record released in 1964?", optionen: ["Was", "Did", "Were"], loesung: "Was" },
  { thema: "8-G13", frage: "Mia: “I am tired.” → Mia says that she … tired.", optionen: ["is", "was", "am"], loesung: "is" },
  { thema: "8-G13", frage: "Jake: “Do you like jazz?” → Jake asks … I like jazz.", optionen: ["if", "that", "do"], loesung: "if" },
  { thema: "8-G13", frage: "Zoe: “Where do you live?” → Zoe asks where I …", optionen: ["live.", "do live.", "lived."], loesung: "live." },
  { thema: "8-G13", frage: "Mom: “My job is hard.” → Mom says that … job is hard.", optionen: ["her", "my", "your"], loesung: "her" },
  { thema: "8-G14", frage: "Jake: “I like gumbo.” → Jake said that he … gumbo.", optionen: ["liked", "likes", "like"], loesung: "liked" },
  { thema: "8-G14", frage: "Mia: “We are late.” → Mia said that they … late.", optionen: ["were", "are", "was"], loesung: "were" },
  { thema: "8-G14", frage: "Dad: “Are you OK?” → Dad asked if I … OK.", optionen: ["was", "am", "were"], loesung: "was" },
  { thema: "8-G14", frage: "Zoe: “I don't know.” → Zoe said that she … know.", optionen: ["didn't", "doesn't", "don't"], loesung: "didn't" }
);

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

// ---------- Two more mini games (from version 0.9.2) ----------
Object.assign(K8.minispiele.spiele, {
  kabel: {
    titel: "🔌 Fix the alarm system",
    anleitung: "Someone cut the wires of the alarm. Drag each cable to the socket with the same colour and symbol – or tap the cable, then the socket.",
    ziel: 3,
    erfolg: "Alarm system online. Nobody gets into this office tonight."
  },
  sequenz: {
    titel: "🧠 Remember the combination",
    anleitung: "The safe shows its combination for a moment. Watch the buttons light up, then tap them in the same order.",
    ziel: 4,
    erfolg: "Click. The safe is open. Excellent memory, detective."
  }
});
Object.assign(K8.minispiele, {
  kabel: { kasten: "Alarm box", hinweis: "Same colour, same symbol.", fertig: ["Alarm box fixed!", "Wires connected!"], autsch: ["Sparks! Wrong socket.", "Bzzzt! Try another socket."] },
  sequenz: { zeichen: ["1", "2", "3", "4", "5", "6", "7", "8", "9"], schau: "Watch", du: "Your turn", gut: ["Correct!", "Nice work!", "Exactly!"], autsch: ["Wrong order. Watch again.", "Not quite. Watch again."] }
});
