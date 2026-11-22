/* =====================================================================
   KLASSE 9  ·  alle Inhalte für Klasse 9
   ---------------------------------------------------------------------
   FERTIG: Welt (Geschichte, Räume, Figur, Karte, Minispiele) und alle Aufgaben (G1–G11).
   Aufgaben: Unit 1 (G1, G2) ab Version 1.1.0-a, Unit 2 (G3, G4) ab 1.1.0-b, Unit 3 (G5–G7) ab 1.1.0-c, Unit 4 (G8–G11) ab 1.1.0-d. Themen ohne Aufgaben zeigen „kommt bald“.
   Vorschau der Welt mit den Aufgaben aus Klasse 5: Adresse mit ?welt=9
   Wie eine fertige Klasse aussieht: siehe klasse5.js und klasse-vorlage.js.
   ===================================================================== */

const K9 = neueKlasse(9);   // bitte nicht ändern

// 1) DIE WELT
K9.welt = {
  name: "Agent Headquarters", emoji: "🔐",
  sprache: "en",   // Bedienung rund um Minispiel, Zusatzraum und Karte auf Englisch
  figur: "Agent Nova",
  intro: "Nova here, on the radio. Bad news: our headquarters is in lockdown and you're inside. " +
         "The override code is split into four parts, hidden in four sections of the building. " +
         "Find them, enter the code at the exit, get out. No pressure. Well – a little pressure.",
  raeume: [
    { name: "Server Room",    emoji: "💾" },
    { name: "Gadget Lab",     emoji: "🧪" },
    { name: "Briefing Room",  emoji: "📋" },
    { name: "Garage",         emoji: "🏍️" }
  ],
  zusatzraum: { name: "Laser Room", emoji: "🚨", text: "Lasers are moving. Answer before they reach you." },
  ausgang:    { name: "Emergency Exit", emoji: "🚪" },
  finaleBild: "bild/finale-9.jpg",   // Bild hinter der Tür, wenn die Mission geschafft ist (Format etwa 15:11)
  finale:     "Lockdown over. You're out. Nova on the radio: “Clean job. I'll pretend I'm not impressed.”",
  gescheitert:"Security caught you. Mission failed – new attempt.",
  gescheitertTor: "Three wrong codes – full lockdown. Mission failed – new attempt.",
  saetze: {
    start:            ["First section is open. Go."],
    richtig:          ["Correct.", "Nice.", "Clean.", "Good.", "That works."],
    falsch:           ["Negative. Read the explanation and try again.", "Close. Check the rule.", "Even agents make mistakes. Again."],
    loesung:          ["That was a hard one. Check the answer – new task incoming."],
    raumGeschafft:    ["Section cleared. Next: the laser room …", "Code part secured."],
    zusatzStart:      ["Lasers on. Fast and accurate."],
    zusatzGeschafft:  ["Through the lasers. The digit is yours."],
    zusatzGescheitert:["Alarm triggered – but only briefly. One of these three digits is right."],
    zeitWarnung:      ["Security is on its way. Hurry."],
    torFalsch:        ["Access denied. Check the lights: green is right, red is not yet."],
    zwilling:         ["Similar task. You've got this."],
    torBereit:        ["All sections cleared. Enter the code at the exit."]
  }
};

// ---------- KARTE (Entdecker-Modus) ----------
// Die Karte ersetzt die Übersicht mit den Kacheln (Datei welt/karte.js, Aussehen: welt/stil-agenten.js).
// So lest ihr die Zahlen: x = wie weit nach rechts (0 … 1600), y = wie weit nach unten (0 … 1000).
// Ein Raum braucht etwa 300 × 200 Platz. Der Punkt x/y ist die Mitte, die Tür ist unten in der Mitte.
// Kleine Schritte ändern (z. B. 50) und danach im Browser ansehen: …/test/index.html?welt=9
K9.welt.karte = {
  stil: "agenten",                         // Aussehen: Datei welt/stil-agenten.js
  groesse: { b: 1600, h: 1000 },           // Größe der ganzen Karte. Klein lassen: kurze Wege!
  start:   { x: 800, y: 850 },             // hier steht die Spielfigur am Anfang (vor dem Notausgang)

  // Die vier Sektionen. Reihenfolge = Reihenfolge der Räume oben.
  raeume: [
    { x: 290,  y: 310, schild: "Server Room" },
    { x: 1310, y: 310, schild: "Gadget Lab" },
    { x: 420,  y: 700, schild: "Briefing Room" },
    { x: 1180, y: 700, schild: "Garage" }
  ],
  zusatzraum: { x: 800, y: 210, schild: "Laser Room" },   // nur Kulisse, wird nach jedem Raum von selbst betreten
  tor:        { x: 800, y: 950 },                         // der Notausgang unten

  // Figuren: höchstens 5. Keine hält auf, Antippen ist freiwillig.
  //   art: "begleiter" = Agent Novas Funk-Drohne, fliegt mit
  //   art: "regel"     = zeigt die Regelkarte der nächsten Sektion
  //   art: "zeit"      = dreht seine „runde“ (Punkte [x, y]) und warnt, wenn die Zeit knapp wird
  //   art: "wort"      = zeigt ein Wort aus der Wörterhilfe („emoji“ = Bild)
  figuren: [
    { art: "begleiter" },
    { art: "regel", name: "Tech officer", x: 650, y: 520 },
    { art: "zeit",  name: "Guard bot", runde: [[940, 470], [1160, 470], [1160, 560], [940, 560]] },
    { art: "wort",  emoji: "💻", name: "Terminal", trick: "drehen",  x: 560,  y: 850 },
    { art: "wort",  emoji: "📻", name: "Radio",    trick: "huepfen", x: 1060, y: 860 }
  ],

  // Orte, an denen Nova einmal pro Mission etwas sagt, wenn die Spielfigur in die Nähe kommt.
  orte: [
    { x: 800, y: 330, radius: 130, text: "That's the laser room. Not yet." },
    { x: 150, y: 520, radius: 120, text: "Dead end. Even I can see that from here." },
    { x: 800, y: 600, radius: 110, text: "Main corridor. All sections branch off from here." }
  ],

  // Texte der Karte. {name} wird durch den Namen der Sektion ersetzt.
  // Steht hier eine Liste [ "…", "…" ], wird jedes Mal ein Satz ausgewählt.
  texte: {
    gesperrt:        "Locked. Clear the section with the arrow first.",
    schonGeschafft:  "Already cleared. You have that digit. Move on.",
    torZu:           "Not yet. Four sections first.",
    zusatz:          "The laser room opens after each section. Don't go looking for it.",
    zusatzReaktion:  ["Bzzzt.", "Still armed.", "Lasers humming."],
    jubel:           "Digit secured.",
    tipp:            "Next: {name}. Follow the arrow.",
    tippTor:         "All four digits. Head for the exit.",
    regelTitel:      "Briefing: {name}",
    keineRegel:      "No briefing for this section.",
    waerterinFertig: "All sections cleared. The exit is that way.",
    waechter:        "Keep moving.",
    waechterRuf:     ["Scanning … staff. Carry on.", "ID check … fine. Go."],
    pollyGeschafft:  ["One down.", "Halfway.", "One section left.", "That's all four. Exit. Now."],
    pollyWarten:     ["Still there? Next: {name}.", "The clock is ticking. {name}."],
    pollyZurueck:    ["Regroup. Then back in.", "Take a breath. Try again."],
    schliessen:      "Close"
  }
};

// Bild der Begleitfigur oben links (Agent Nova mit Headset). Nur die Formen, ohne <svg>-Hülle, Feld 120 × 130.
K9.welt.figurSvg =
  '<path d="M20 130 Q20 96 60 92 Q100 96 100 130 Z" fill="#1e293b" stroke="#000" stroke-width="4"/>' +
  '<path d="M50 94 L60 110 L70 94 Z" fill="#39e6ff" stroke="#000" stroke-width="3"/>' +
  '<circle cx="60" cy="58" r="30" fill="#dba77c" stroke="#000" stroke-width="4"/>' +
  '<path d="M30 60 Q26 22 60 22 Q94 22 90 60 Q82 40 60 40 Q40 40 30 60 Z" fill="#1b1b22" stroke="#000" stroke-width="4"/>' +
  '<circle cx="50" cy="60" r="4" fill="#000"/><circle cx="72" cy="60" r="4" fill="#000"/>' +
  '<path d="M52 75 Q62 80 71 72" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round"/>' +
  '<path d="M27 60 Q27 16 60 16 Q93 16 93 60" fill="none" stroke="#000" stroke-width="5"/>' +
  '<rect x="20" y="52" width="13" height="22" rx="5" fill="#39e6ff" stroke="#000" stroke-width="3"/>' +
  '<path d="M27 74 Q28 88 46 86" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round"/>' +
  '<circle cx="49" cy="86" r="4.5" fill="#39e6ff" stroke="#000" stroke-width="2"/>';
// ---------- Ende KARTE ----------

// 2) DIE THEMEN (laut „Themenuebersicht“)
K9.themen = [
  { id: "9-G1",  klasse: 9, unit: 1, titelEn: "Modal verbs and their substitutes", titel: "Modale Hilfsverben und ihre Ersatzformen", regel: "Substitute forms (Ersatzformen): can → be able to, must → have to, may → be allowed to. Past: could / was able to, had to, was allowed to. Future: will be able to, will have to, will be allowed to. mustn't = not allowed (Verbot), needn't / don't have to = not necessary (nicht nötig). should = advice (Ratschlag): You should rest." },
  { id: "9-G2",  klasse: 9, unit: 1, titelEn: "Comparison of adjectives and adverbs", titel: "Steigerung und Vergleich von Adjektiven und Adverbien", regel: "Short adjectives: cheap – cheaper – the cheapest (big – bigger, easy – easier). Long adjectives: interesting – more interesting – the most interesting. Irregular (unregelmäßig): good – better – the best, bad – worse – the worst. Adverbs (Adverbien): fast – faster, carefully – more carefully, well – better, badly – worse. Comparison (Vergleich): bigger than, as big as, not as big as." },
  { id: "9-G3",  klasse: 9, unit: 2, titelEn: "Relative clauses with and without relative pronouns", titel: "Relativsätze mit und ohne Relativpronomen", regel: "who / that → people (Personen), which / that → things and animals, whose → dessen/deren, after a preposition: whom (the woman to whom I spoke). Extra information between commas: who / which / whose, never that. The pronoun can be left out when a new subject follows: the hotel (that) we booked." },
  { id: "9-G4",  klasse: 9, unit: 2, titelEn: "Past progressive", titel: "Die Verlaufsform der Vergangenheit", regel: "Past progressive: was / were + verb-ing (we were swimming). Negative: wasn't / weren't + verb-ing. Long action in the background → past progressive, short action that interrupts it → simple past: I was swimming when I saw a turtle. Two long actions at the same time: while … was/were -ing." },
  { id: "9-G5",  klasse: 9, unit: 3, titelEn: "Present participle", titel: "Das Partizip Präsens", regel: "1) After see, hear, watch, feel: person/thing + -ing: I saw him running. 2) -ing adjective = what something is like (a boring film), -ed adjective = how someone feels (I'm bored). 3) Shorter sentences (Satzverkürzung) with the same subject: When I opened the door, I saw … → Opening the door, I saw …" },
  { id: "9-G6",  klasse: 9, unit: 3, titelEn: "Past perfect", titel: "Die Vorvergangenheit", regel: "Past perfect: had + 3rd form (had seen, had gone). Negative: hadn't / had never + 3rd form. Question: Had you …? The earlier action → past perfect, the later action → simple past: When we arrived, the bus had already left. Signal words: already, just, never, yet, after, before, when, by the time." },
  { id: "9-G7",  klasse: 9, unit: 3, titelEn: "The passive (simple past)", titel: "Das Passiv (einfache Vergangenheit)", regel: "Passive simple past: was / were + 3rd form: The school was built in 2010. Who did it? → by: … by the rangers. Negative: wasn't / weren't + 3rd form. Question: Was / Were …? Simple present passive: is / are + 3rd form (today, every day)." },
  { id: "9-G8",  klasse: 9, unit: 4, titelEn: "Reported speech I (change of tense → simple past)", titel: "Indirekte Rede I (Zeitverschiebung → simple past)", regel: "After said / told: simple present → simple past (“I like it.” → She said that she liked it). am / is → was, are → were, can → could. Questions: asked if / whether or asked where / what … + normal word order: He asked where I lived. Commands: told / asked me to … / not to …" },
  { id: "9-G9",  klasse: 9, unit: 4, titelEn: "Reported speech II (change of tense → past perfect)", titel: "Indirekte Rede II (Zeitverschiebung → past perfect)", regel: "simple past → past perfect: “I lost my key.” → He said that he had lost his key. present perfect → past perfect: “I have finished.” → She said that she had finished. Questions: She asked if I had seen the film." },
  { id: "9-G10", klasse: 9, unit: 4, titelEn: "Future: will and going to", titel: "Zukunftszeiten (will und going to)", regel: "going to: plans you have already made (I've saved money – I'm going to buy a bike) and things you can already see coming (Look at the clouds! It's going to rain). will: spontaneous decisions (The phone is ringing – I'll get it) and opinions or guesses (I think it will be sunny)." },
  { id: "9-G11", klasse: 9, unit: 4, titelEn: "Future: simple present and present progressive", titel: "Zukunftszeiten (simple present und present progressive)", regel: "Timetables and programmes → simple present: The train leaves at 9. When does the film start? Fixed plans / arrangements (feste Verabredungen) → present progressive: I'm meeting Tom tomorrow at 4." }
];

// =====================================================================
// 3) DER SATZBAUKASTEN – Wortschatz: Klasse 5–8 komplett + Klasse 9 bis zur Unit
//    Klasse 9: Erklärungen in einfachem Englisch, deutscher Fachbegriff in Klammern.
//    Art „satzpool“: geprüfte Sätze mit Lücke (Quiz, Lückentext, Satzbau, Fehler finden),
//    dazu Umformen und Zuordnen. Felder: siehe Klasse 8 und index.html (function satzpool).
// =====================================================================
K9.baukasten = {
  // ---------- Klasse 9, Unit 1: Modalverben und Ersatzformen, mustn't / needn't, should (G1) ----------
  "9-G1": {
    saetze: [
      { e: "ersatz", t: "Nurses often ___ work at night.", h: "have to", r: ["have to"], f: ["has to", "must to"], fehler: { ersatz: "has to", wort: "has", loesung: ["have"] } },
      { e: "ersatz", t: "My cousin is a plumber. He ___ get up at five every morning.", h: "have to", r: ["has to"], f: ["have to", "must to"], fehler: { ersatz: "have to", wort: "have", loesung: ["has"] } },
      { e: "ersatz", t: "Some children in the outback ___ go to a normal school because it is too far away.", h: "not / be able to", r: ["aren't able to", "are not able to"], f: ["don't able to", "isn't able to"], fehler: { ersatz: "don't able to", wort: "don't", loesung: ["aren't", "are not"] } },
      { e: "ersatz", t: "Visitors ___ touch the coral at the reef.", h: "not / be allowed to", r: ["aren't allowed to", "are not allowed to"], f: ["don't allowed to", "isn't allowed to"], fehler: { ersatz: "isn't allowed to", wort: "isn't", loesung: ["aren't", "are not"] } },
      { e: "ersatz", t: "Mia ___ speak English and Chinese.", h: "be able to", r: ["is able to"], f: ["are able to", "is able"], fehler: { ersatz: "are able to", wort: "are", loesung: ["is"] } },
      { e: "ersatz", t: "At the boarding school, students ___ use their phones after nine o'clock.", h: "not / be allowed to", r: ["aren't allowed to", "are not allowed to"], f: ["don't allowed to", "aren't allow to"], fehler: { ersatz: "aren't allow to", wort: "allow", loesung: ["allowed"] } },
      { e: "ersatz", t: "I ___ send my CV with the letter of application.", h: "have to", r: ["have to"], f: ["has to", "must to"], fehler: { ersatz: "has to", wort: "has", loesung: ["have"] } },
      { e: "past",   t: "Last year my sister ___ do two weeks of work experience at a hospital.", h: "must – past", r: ["had to"], f: ["musted", "must"], fehler: { ersatz: "must", wort: "must", loesung: ["had to"] } },
      { e: "past",   t: "The water was very clear, so we ___ see lots of turtles.", h: "can – past", r: ["could", "were able to"], f: ["can", "could to"], fehler: "can" },
      { e: "past",   t: "At my old school we ___ wear trainers.", h: "not / may – past", r: ["weren't allowed to", "were not allowed to"], f: ["didn't may", "aren't allowed to"], fehler: { ersatz: "aren't allowed to", wort: "aren't", loesung: ["weren't", "were not"] } },
      { e: "past",   t: "It rained all day, so we ___ go swimming.", h: "not / can – past", r: ["couldn't", "could not", "weren't able to", "were not able to"], f: ["didn't can", "can't"], fehler: { ersatz: "can't", wort: "can't", loesung: ["couldn't", "could not", "weren't able to", "were not able to"] } },
      { e: "past",   t: "When my grandpa was young, he ___ leave school at fourteen.", h: "must – past", r: ["had to"], f: ["musted", "must"], fehler: { ersatz: "musted", wort: "musted", loesung: ["had to"] } },
      { e: "past",   t: "Last summer I ___ stay up late because it was the holidays.", h: "may – past", r: ["was allowed to"], f: ["were allowed to", "mayed"], fehler: { ersatz: "were allowed to", wort: "were", loesung: ["was"] } },
      { e: "past",   t: "Yesterday Tom lost his map, so he ___ find the way back to the hotel.", h: "not / can – past", r: ["couldn't", "could not", "wasn't able to", "was not able to"], f: ["didn't can", "can't"], fehler: { ersatz: "can't", wort: "can't", loesung: ["couldn't", "could not", "wasn't able to", "was not able to"] } },
      { e: "futur",  t: "After this course you ___ speak English much better.", h: "can – future", r: ["will be able to", "'ll be able to"], f: ["will can", "can will"], fehler: { ersatz: "will can", wort: "can", loesung: ["be able to"] } },
      { e: "futur",  t: "If you get the job, you ___ work on Saturdays.", h: "must – future", r: ["will have to", "'ll have to"], f: ["will must", "must will"], fehler: { ersatz: "will must", wort: "must", loesung: ["have to"] } },
      { e: "futur",  t: "Next year my little brother ___ go to the beach alone.", h: "may – future", r: ["will be allowed to", "'ll be allowed to"], f: ["will may", "may will"], fehler: { ersatz: "will may", wort: "may", loesung: ["be allowed to"] } },
      { e: "futur",  t: "The reef is too far away, so we ___ see it on this trip.", h: "not / can – future", r: ["won't be able to", "will not be able to"], f: ["won't can", "can't will"], fehler: { ersatz: "won't can", wort: "can", loesung: ["be able to"] } },
      { e: "futur",  t: "Tomorrow is a holiday, so Dad ___ go to work.", h: "not / have to – future", r: ["won't have to", "will not have to"], f: ["won't must", "mustn't"], fehler: { ersatz: "won't must", wort: "must", loesung: ["have to"] } },
      { e: "futur",  t: "When you start your apprenticeship, you ___ go to school two days a week.", h: "must – future", r: ["will have to", "'ll have to"], f: ["will must", "must will"], fehler: { ersatz: "will must", wort: "must", loesung: ["have to"] } },
      { e: "mustnt", t: "There are crocodiles in this river. You ___ swim here!", h: "mustn't / needn't", r: ["mustn't", "must not"], f: ["needn't", "don't have to"], fehler: { ersatz: "needn't", wort: "needn't", loesung: ["mustn't", "must not"] } },
      { e: "mustnt", t: "Lunch is free, so you ___ bring any food.", h: "mustn't / needn't", r: ["needn't", "need not"], f: ["mustn't", "needn't to"], fehler: { ersatz: "mustn't", wort: "mustn't", loesung: ["needn't", "need not", "don't have to", "do not have to"] } },
      { e: "mustnt", t: "This is a sacred place for Aboriginal people. You ___ climb the rock.", h: "mustn't / don't have to", r: ["mustn't", "must not"], f: ["don't have to", "needn't"], fehler: { ersatz: "needn't", wort: "needn't", loesung: ["mustn't", "must not"] } },
      { e: "mustnt", t: "You ___ bring your CV to the interview. We already have it.", h: "mustn't / don't have to", r: ["don't have to", "do not have to"], f: ["mustn't", "doesn't have to"], fehler: { ersatz: "mustn't", wort: "mustn't", loesung: ["needn't", "need not", "don't have to", "do not have to"] } },
      { e: "mustnt", t: "It's your first day at work. You ___ be late!", h: "mustn't / needn't", r: ["mustn't", "must not"], f: ["needn't", "don't have to"], fehler: { ersatz: "needn't", wort: "needn't", loesung: ["mustn't", "must not"] } },
      { e: "mustnt", t: "It's Saturday, so Tom ___ get up early.", h: "mustn't / doesn't have to", r: ["doesn't have to", "does not have to"], f: ["mustn't", "don't have to"], fehler: { ersatz: "mustn't", wort: "mustn't", loesung: ["needn't", "need not", "doesn't have to", "does not have to"] } },
      { e: "mustnt", t: "Don't hurt the turtles. You ___ touch their eggs.", h: "mustn't / needn't", r: ["mustn't", "must not"], f: ["needn't", "don't have to"], fehler: { ersatz: "needn't", wort: "needn't", loesung: ["mustn't", "must not"] } },
      { e: "mustnt", t: "We have lots of time. We ___ hurry.", h: "mustn't / needn't", r: ["needn't", "need not"], f: ["mustn't", "needn't to"], fehler: { ersatz: "mustn't", wort: "mustn't", loesung: ["needn't", "need not", "don't have to", "do not have to"] } },
      { e: "should", t: "You look tired. You ___ go to bed earlier.", h: "should / shouldn't", r: ["should"], f: ["shouldn't", "should to"], fehler: "shouldn't" },
      { e: "should", t: "It's very hot in the outback. You ___ take lots of water with you.", h: "should / shouldn't", r: ["should"], f: ["shouldn't", "shoulds"], fehler: "shouldn't" },
      { e: "should", t: "In a call centre you ___ be rude to customers.", h: "should / shouldn't", r: ["shouldn't", "should not"], f: ["should", "shouldn't to"], fehler: "should" },
      { e: "should", t: "Your CV has lots of mistakes. You ___ check it again.", h: "should / shouldn't", r: ["should"], f: ["shouldn't", "should to"], fehler: "shouldn't" },
      { e: "should", t: "He ___ eat so much sugar. It's bad for his teeth.", h: "should / shouldn't", r: ["shouldn't", "should not"], f: ["should", "doesn't should"], fehler: "should" },
      { e: "should", t: "Ben wants to be an electrician. He ___ look for an apprenticeship.", h: "should / shouldn't", r: ["should"], f: ["shoulds", "should to"], fehler: "shoulds" },
      { e: "frage",  t: "___ you have to wear a uniform at your new job?", h: "do", r: ["Do"], f: ["Must", "Have"], fehler: "Have" },
      { e: "frage",  t: "___ your sister have to work last weekend?", h: "do – past", r: ["Did"], f: ["Does", "Had"], fehler: "Had" },
      { e: "frage",  t: "___ the students allowed to use a dictionary in the test?", h: "be", r: ["Are"], f: ["Do", "Have"], fehler: "Do" }
    ],
    umformen: [
      { e: "ersatz", a: "Use “be able to”:", von: "Koalas can sleep for twenty hours a day.", nach: ["Koalas are able to sleep for twenty hours a day."] },
      { e: "ersatz", a: "Use “have to”:", von: "A nurse must be patient.", nach: ["A nurse has to be patient."] },
      { e: "ersatz", a: "Use “be allowed to”:", von: "You may not feed the kangaroos.", nach: ["You aren't allowed to feed the kangaroos.", "You are not allowed to feed the kangaroos.", "You're not allowed to feed the kangaroos."] },
      { e: "ersatz", a: "Use “be able to”:", von: "My brother can repair cars.", nach: ["My brother is able to repair cars."] },
      { e: "ersatz", a: "Use “have to”:", von: "We must write a letter of application.", nach: ["We have to write a letter of application."] },
      { e: "past",   a: "Put the sentence into the past:", von: "I must work on Saturdays.", nach: ["I had to work on Saturdays."] },
      { e: "past",   a: "Put the sentence into the past:", von: "We can't see the reef.", nach: ["We couldn't see the reef.", "We could not see the reef.", "We weren't able to see the reef.", "We were not able to see the reef."] },
      { e: "past",   a: "Put the sentence into the past:", von: "The students aren't allowed to leave the boarding school.", nach: ["The students weren't allowed to leave the boarding school.", "The students were not allowed to leave the boarding school."] },
      { e: "past",   a: "Put the sentence into the past:", von: "My dad can speak three languages.", nach: ["My dad could speak three languages.", "My dad was able to speak three languages."] },
      { e: "past",   a: "Put the sentence into the past:", von: "Tom must wait for the bus.", nach: ["Tom had to wait for the bus."] },
      { e: "futur",  a: "Put the sentence into the future (will):", von: "I can work in Australia.", nach: ["I will be able to work in Australia.", "I'll be able to work in Australia."] },
      { e: "futur",  a: "Put the sentence into the future (will):", von: "She must write a CV.", nach: ["She will have to write a CV.", "She'll have to write a CV."] },
      { e: "futur",  a: "Put the sentence into the future (will):", von: "We may use the pool.", nach: ["We will be allowed to use the pool.", "We'll be allowed to use the pool."] },
      { e: "futur",  a: "Put the sentence into the future (will):", von: "They can't come to the party.", nach: ["They won't be able to come to the party.", "They will not be able to come to the party."] },
      { e: "futur",  a: "Put the sentence into the future (will):", von: "He doesn't have to work on Sundays.", nach: ["He won't have to work on Sundays.", "He will not have to work on Sundays."] },
      { e: "mustnt", a: "Use “mustn't”:", von: "You aren't allowed to touch the coral.", nach: ["You mustn't touch the coral.", "You must not touch the coral."] },
      { e: "mustnt", a: "Use “don't have to”:", von: "You needn't bring a towel.", nach: ["You don't have to bring a towel.", "You do not have to bring a towel."] },
      { e: "mustnt", a: "Use “needn't”:", von: "We don't have to pay for the bus.", nach: ["We needn't pay for the bus.", "We need not pay for the bus."] },
      { e: "mustnt", a: "Use “mustn't”:", von: "Visitors aren't allowed to climb the rock.", nach: ["Visitors mustn't climb the rock.", "Visitors must not climb the rock."] },
      { e: "mustnt", a: "Use “doesn't have to”:", von: "Mia needn't wear a uniform.", nach: ["Mia doesn't have to wear a uniform.", "Mia does not have to wear a uniform."] },
      { e: "should", a: "Give advice with “should”:", von: "Eat more fruit! (You …)", nach: ["You should eat more fruit."] },
      { e: "should", a: "Give advice with “shouldn't”:", von: "Don't be late for the interview! (You …)", nach: ["You shouldn't be late for the interview.", "You should not be late for the interview."] },
      { e: "should", a: "Give advice with “should”:", von: "Check your CV again! (You …)", nach: ["You should check your CV again."] },
      { e: "should", a: "Give advice with “shouldn't”:", von: "Don't stay in the sun for too long! (You …)", nach: ["You shouldn't stay in the sun for too long.", "You should not stay in the sun for too long."] },
      { e: "should", a: "Give advice with “should”:", von: "Ask your teacher for help! (You …)", nach: ["You should ask your teacher for help."] },
      { e: "frage",  a: "Ask a question:", von: "Zoe has to work at the weekend.", nach: ["Does Zoe have to work at the weekend?"] },
      { e: "frage",  a: "Ask a question:", von: "They had to wait for two hours.", nach: ["Did they have to wait for two hours?"] },
      { e: "frage",  a: "Ask a question:", von: "The workers are allowed to take a break.", nach: ["Are the workers allowed to take a break?"] }
    ],
    zuordnen: {
      kategorien: ["not allowed (Verbot)", "not necessary (nicht nötig)", "advice (Ratschlag)"],
      woerter: [
        { text: "mustn't", ziel: "not allowed (Verbot)" }, { text: "must not", ziel: "not allowed (Verbot)" }, { text: "isn't allowed to", ziel: "not allowed (Verbot)" },
        { text: "aren't allowed to", ziel: "not allowed (Verbot)" }, { text: "weren't allowed to", ziel: "not allowed (Verbot)" },
        { text: "needn't", ziel: "not necessary (nicht nötig)" }, { text: "don't have to", ziel: "not necessary (nicht nötig)" }, { text: "doesn't have to", ziel: "not necessary (nicht nötig)" },
        { text: "didn't have to", ziel: "not necessary (nicht nötig)" }, { text: "won't have to", ziel: "not necessary (nicht nötig)" },
        { text: "should", ziel: "advice (Ratschlag)" }, { text: "shouldn't", ziel: "advice (Ratschlag)" }, { text: "should not", ziel: "advice (Ratschlag)" }
      ]
    },
    erklaerungen: {
      satzpool: {
        ersatz: "Substitute forms (Ersatzformen): can → am/is/are able to, must → have/has to, may → am/is/are allowed to. Example: {BEISPIEL}",
        past:   "Past (Vergangenheit): can → could / was able to, must → had to, may → was/were allowed to. Example: {BEISPIEL}",
        futur:  "Future (Zukunft): “will can”, “will must” and “will may” don't exist. Use will be able to, will have to, will be allowed to. Example: {BEISPIEL}",
        mustnt: "mustn't = it is not allowed (Verbot). needn't / don't have to = it is not necessary (nicht nötig). Example: {BEISPIEL}",
        should: "should / shouldn't gives advice (Ratschlag): it's a good idea / it's not a good idea. should has no -s and no “to”. Example: {BEISPIEL}",
        frage:  "Questions with have to need do, does or did. Questions with be allowed to start with am, is or are. Example: {BEISPIEL}",
        zuordnen: "mustn't = not allowed (Verbot). needn't / don't have to = not necessary (nicht nötig). should / shouldn't = advice (Ratschlag)."
      }
    }
  },

  // ---------- Klasse 9, Unit 1: Steigerung und Vergleich von Adjektiven und Adverbien (G2) ----------
  //   ohne „the … the …“ (Vorgabe der Lehrkraft)
  "9-G2": {
    saetze: [
      { e: "komp",  t: "A whale is ___ than a dolphin.", h: "big", r: ["bigger"], f: ["biger", "more big"], fehler: "biger" },
      { e: "komp",  t: "In summer, Darwin is ___ than Melbourne.", h: "hot", r: ["hotter"], f: ["hoter", "more hot"], fehler: "hoter" },
      { e: "komp",  t: "For me, maths is ___ than English.", h: "difficult", r: ["more difficult"], f: ["difficulter", "most difficult"], fehler: { ersatz: "difficulter", wort: "difficulter", loesung: ["more difficult"] } },
      { e: "komp",  t: "A job as a flight attendant is ___ than many people think.", h: "hard", r: ["harder"], f: ["more hard", "hardder"], fehler: { ersatz: "hardest", wort: "hardest", loesung: ["harder"] } },
      { e: "komp",  t: "In Australia, trains are often ___ than planes.", h: "cheap", r: ["cheaper"], f: ["more cheap", "cheapper"], fehler: { ersatz: "cheapest", wort: "cheapest", loesung: ["cheaper"] } },
      { e: "komp",  t: "Some people think saltwater crocodiles are ___ than sharks.", h: "dangerous", r: ["more dangerous"], f: ["dangerouser", "most dangerous"], fehler: { ersatz: "dangerouser", wort: "dangerouser", loesung: ["more dangerous"] } },
      { e: "komp",  t: "My new job is ___ than my old one.", h: "easy", r: ["easier"], f: ["easyer", "more easy"], fehler: "easyer" },
      { e: "komp",  t: "Today the sea is ___ than yesterday.", h: "warm", r: ["warmer"], f: ["more warm", "warmmer"], fehler: { ersatz: "warmest", wort: "warmest", loesung: ["warmer"] } },
      { e: "sup",   t: "Uluru is one of ___ places in Australia.", h: "famous", r: ["the most famous"], f: ["the famousest", "the more famous"], fehler: { ersatz: "the famousest", wort: "famousest", loesung: ["most famous"] } },
      { e: "sup",   t: "The Great Barrier Reef is ___ coral reef in the world.", h: "big", r: ["the biggest"], f: ["the bigest", "the most big"], fehler: { ersatz: "the bigest", wort: "bigest", loesung: ["biggest"] } },
      { e: "sup",   t: "In Sydney, July is often ___ month of the year.", h: "cold", r: ["the coldest"], f: ["the most cold", "the colder"], fehler: { ersatz: "the colder", wort: "colder", loesung: ["coldest"] } },
      { e: "sup",   t: "For many tourists, the outback is ___ part of Australia.", h: "spectacular", r: ["the most spectacular"], f: ["the spectacularest", "the more spectacular"], fehler: { ersatz: "the spectacularest", wort: "spectacularest", loesung: ["most spectacular"] } },
      { e: "sup",   t: "Our bike courier is ___ person in the company.", h: "busy", r: ["the busiest"], f: ["the busyest", "the most busy"], fehler: { ersatz: "the busyest", wort: "busyest", loesung: ["busiest"] } },
      { e: "sup",   t: "This is ___ hotel in town.", h: "expensive", r: ["the most expensive"], f: ["the expensivest", "the more expensive"], fehler: { ersatz: "the more expensive", wort: "more", loesung: ["most"] } },
      { e: "unreg", t: "My English is ___ than last year.", h: "good", r: ["better"], f: ["gooder", "more good"], fehler: "gooder" },
      { e: "unreg", t: "That was ___ film I have ever seen.", h: "bad", r: ["the worst"], f: ["the baddest", "the worse"], fehler: { ersatz: "the baddest", wort: "baddest", loesung: ["worst"] } },
      { e: "unreg", t: "Perth is ___ from Sydney than Melbourne.", h: "far", r: ["further", "farther"], f: ["farer", "more far"], fehler: "farer" },
      { e: "unreg", t: "Mia is ___ student in our class.", h: "good", r: ["the best"], f: ["the goodest", "the better"], fehler: { ersatz: "the goodest", wort: "goodest", loesung: ["best"] } },
      { e: "unreg", t: "The weather is ___ than yesterday. It's raining again.", h: "bad", r: ["worse"], f: ["badder", "worst"], fehler: "badder" },
      { e: "adv",   t: "Kangaroos can run ___ than people.", h: "fast", r: ["faster"], f: ["more fastly", "fastest"], fehler: { ersatz: "fastest", wort: "fastest", loesung: ["faster"] } },
      { e: "adv",   t: "Zoe works ___ than the other students.", h: "carefully", r: ["more carefully"], f: ["carefuller", "more careful"], fehler: { ersatz: "more careful", wort: "careful", loesung: ["carefully"] } },
      { e: "adv",   t: "Tom sings ___ than his brother.", h: "well", r: ["better"], f: ["weller", "more well"], fehler: "weller" },
      { e: "adv",   t: "I played ___ than last week, and we lost the match.", h: "badly", r: ["worse"], f: ["badlier", "worst"], fehler: "badlier" },
      { e: "adv",   t: "The new receptionist answers the phone ___ than the old one.", h: "politely", r: ["more politely"], f: ["politer", "more polite"], fehler: { ersatz: "more polite", wort: "polite", loesung: ["politely"] } },
      { e: "adv",   t: "Ben gets up ___ than his sister.", h: "early", r: ["earlier"], f: ["more early", "earlyer"], fehler: "earlyer" },
      { e: "adv",   t: "Who can jump ___, a kangaroo or a koala?", h: "high", r: ["higher"], f: ["more high", "highest"], fehler: { ersatz: "highest", wort: "highest", loesung: ["higher"] } },
      { e: "adv",   t: "The new mechanic works ___ than the old one.", h: "efficiently", r: ["more efficiently"], f: ["efficienter", "more efficient"], fehler: { ersatz: "more efficient", wort: "efficient", loesung: ["efficiently"] } },
      { e: "adv",   t: "Lisa trains ___ than the other players in the team.", h: "hard", r: ["harder"], f: ["more hard", "hardlier"], fehler: { ersatz: "hardest", wort: "hardest", loesung: ["harder"] } },
      { e: "asas",  t: "My new phone is ___ my old one.", h: "as … as / good", r: ["as good as"], f: ["as better as", "so good than"], fehler: { ersatz: "as better as", wort: "better", loesung: ["good"] } },
      { e: "asas",  t: "A koala isn't ___ a kangaroo.", h: "as … as / fast", r: ["as fast as"], f: ["as faster as", "as fast than"], fehler: { ersatz: "as fast than", wort: "than", loesung: ["as"] } },
      { e: "asas",  t: "In summer, Melbourne isn't ___ Darwin.", h: "as … as / hot", r: ["as hot as"], f: ["as hotter as", "so hot than"], fehler: { ersatz: "as hotter as", wort: "hotter", loesung: ["hot"] } },
      { e: "asas",  t: "My brother is ___ my dad now.", h: "as … as / tall", r: ["as tall as"], f: ["as taller as", "as tall than"], fehler: { ersatz: "as tall than", wort: "than", loesung: ["as"] } },
      { e: "asas",  t: "The test wasn't ___ I thought.", h: "as … as / difficult", r: ["as difficult as"], f: ["as more difficult as", "so difficult than"], fehler: { ersatz: "as difficult than", wort: "than", loesung: ["as"] } },
      { e: "asas",  t: "I can't swim ___ my sister.", h: "as … as / well", r: ["as well as"], f: ["as good as", "as better as"], fehler: { ersatz: "as good as", wort: "good", loesung: ["well"] } }
    ],
    umformen: [
      { e: "komp",  a: "Use the comparative (1. Steigerungsform) of “old”:", von: "Tom is 16. Lisa is 14.", nach: ["Tom is older than Lisa.", "Tom is older than Lisa is."] },
      { e: "komp",  a: "Use the comparative of “expensive”:", von: "A car costs £20,000. A bike costs £500.", nach: ["A car is more expensive than a bike.", "Cars are more expensive than bikes."] },
      { e: "komp",  a: "Use the comparative of “long”:", von: "The Nile is 6,650 km long. The Murray is 2,500 km long.", nach: ["The Nile is longer than the Murray.", "The Nile is longer than the Murray is."] },
      { e: "komp",  a: "Use the comparative of “dangerous”:", von: "A crocodile is dangerous. A koala isn't dangerous.", nach: ["A crocodile is more dangerous than a koala.", "Crocodiles are more dangerous than koalas."] },
      { e: "komp",  a: "Use the comparative of “small” (Your room …):", von: "My room is small. Your room is very small.", nach: ["Your room is smaller than my room.", "Your room is smaller than mine."] },
      { e: "komp",  a: "Use the comparative of “cold” (Today …):", von: "Yesterday was warm. Today is cold.", nach: ["Today is colder than yesterday.", "Today is colder than yesterday was."] },
      { e: "komp",  a: "Use the comparative of “interesting” (My new job …):", von: "My old job was boring. My new job is interesting.", nach: ["My new job is more interesting than my old job.", "My new job is more interesting than my old one.", "My new job is more interesting than my old job was.", "My new job is more interesting than my old one was."] },
      { e: "unreg", a: "Use the comparative of “good” (The book …):", von: "The film was good. The book was very good.", nach: ["The book was better than the film.", "The book was better than the film was."] },
      { e: "sup",   a: "Use the superlative (2. Steigerungsform):", von: "Uluru is a famous rock in Australia.", nach: ["Uluru is the most famous rock in Australia."] },
      { e: "sup",   a: "Use the superlative:", von: "Sydney is a big city in Australia.", nach: ["Sydney is the biggest city in Australia."] },
      { e: "unreg", a: "Use the superlative:", von: "This is a good day of my life.", nach: ["This is the best day of my life."] },
      { e: "sup",   a: "Use the superlative:", von: "The Murray is a long river in Australia.", nach: ["The Murray is the longest river in Australia."] },
      { e: "sup",   a: "Use the superlative:", von: "The blue whale is a big animal in the world.", nach: ["The blue whale is the biggest animal in the world."] },
      { e: "sup",   a: "Use the superlative:", von: "Mia is a fast runner in our class.", nach: ["Mia is the fastest runner in our class."] },
      { e: "adv",   a: "Compare with “well” (Mia …):", von: "Mia sings well. Her brother sings badly.", nach: ["Mia sings better than her brother.", "Mia sings better than her brother does."] },
      { e: "adv",   a: "Compare with “carefully” (Ben …):", von: "Ben works carefully. Tom doesn't work carefully.", nach: ["Ben works more carefully than Tom.", "Ben works more carefully than Tom does."] },
      { e: "adv",   a: "Compare with “early” (I …):", von: "I get up at six. My sister gets up at seven.", nach: ["I get up earlier than my sister.", "I get up earlier than my sister does."] },
      { e: "adv",   a: "Compare with “fast” (Lisa …):", von: "Lisa runs fast. Her friend doesn't run fast.", nach: ["Lisa runs faster than her friend.", "Lisa runs faster than her friend does."] },
      { e: "adv",   a: "Compare with “badly” (Mia …):", von: "Jake played badly. Mia played very badly.", nach: ["Mia played worse than Jake.", "Mia played worse than Jake did."] },
      { e: "adv",   a: "Compare with “efficiently” (The new mechanic …):", von: "The new mechanic works efficiently. The old one didn't.", nach: ["The new mechanic works more efficiently than the old one.", "The new mechanic works more efficiently than the old one did."] },
      { e: "asas",  a: "Use “not as … as” and “fast”:", von: "The bus is slower than the train.", nach: ["The bus isn't as fast as the train.", "The bus is not as fast as the train."] },
      { e: "asas",  a: "Use “not as … as” and “expensive”:", von: "The bike is cheaper than the car.", nach: ["The bike isn't as expensive as the car.", "The bike is not as expensive as the car."] },
      { e: "asas",  a: "Use “as … as” and “tall” (My brother …):", von: "My brother is 1.80 m tall. My dad is 1.80 m tall, too.", nach: ["My brother is as tall as my dad.", "My brother is as tall as my dad is."] },
      { e: "asas",  a: "Use “not as … as” and “difficult” (English …):", von: "For me, English is easier than maths.", nach: ["English isn't as difficult as maths for me.", "English is not as difficult as maths for me.", "For me, English isn't as difficult as maths.", "For me, English is not as difficult as maths."] },
      { e: "asas",  a: "Use “not as … as” and “well” (I …):", von: "Tom swims better than me.", nach: ["I don't swim as well as Tom.", "I do not swim as well as Tom.", "I can't swim as well as Tom.", "I cannot swim as well as Tom."] },
      { e: "asas",  a: "Use “not as … as” and “fast”:", von: "Koalas are slower than kangaroos.", nach: ["Koalas aren't as fast as kangaroos.", "Koalas are not as fast as kangaroos."] }
    ],
    zuordnen: {
      kategorien: ["-er / -est", "more / most", "irregular (unregelmäßig)"],
      woerter: [
        { text: "big", ziel: "-er / -est" }, { text: "cheap", ziel: "-er / -est" }, { text: "hot", ziel: "-er / -est" }, { text: "easy", ziel: "-er / -est" },
        { text: "tall", ziel: "-er / -est" }, { text: "fast", ziel: "-er / -est" }, { text: "early", ziel: "-er / -est" },
        { text: "interesting", ziel: "more / most" }, { text: "expensive", ziel: "more / most" }, { text: "dangerous", ziel: "more / most" },
        { text: "spectacular", ziel: "more / most" }, { text: "carefully", ziel: "more / most" }, { text: "politely", ziel: "more / most" },
        { text: "good", ziel: "irregular (unregelmäßig)" }, { text: "bad", ziel: "irregular (unregelmäßig)" }, { text: "well", ziel: "irregular (unregelmäßig)" },
        { text: "badly", ziel: "irregular (unregelmäßig)" }, { text: "far", ziel: "irregular (unregelmäßig)" }
      ]
    },
    erklaerungen: {
      satzpool: {
        komp:  "Comparative (1. Steigerungsform): short adjectives get -er (cheap → cheaper, big → bigger, easy → easier), long adjectives get more (more interesting). After it: than. Example: {BEISPIEL}",
        sup:   "Superlative (2. Steigerungsform): the + -est (the biggest, the busiest) or the most + long adjective (the most famous). Example: {BEISPIEL}",
        unreg: "Irregular forms (unregelmäßige Steigerung): good – better – the best, bad – worse – the worst, far – further – the furthest. Example: {BEISPIEL}",
        adv:   "Adverbs (Adverbien) can be compared, too: -ly adverbs with more (more carefully). fast → faster, hard → harder, early → earlier, well → better, badly → worse. Example: {BEISPIEL}",
        asas:  "as … as = the same (genauso … wie), not as … as = less (nicht so … wie). Between the two “as” we use the normal form: as big as. Example: {BEISPIEL}",
        zuordnen: "Short words get -er / -est (big, cheap, fast). Long words and -ly adverbs get more / most (interesting, carefully). Irregular (unregelmäßig): good, bad, well, badly, far."
      }
    }
  }

  // ---------- Klasse 9, Unit 2: Relativsätze mit und ohne Relativpronomen (G3) ----------
  //   who / which / that / whose / whom (nach Präposition), Weglassen des Pronomens (contact clauses),
  //   nicht notwendige Relativsätze mit Komma (Vorgaben der Lehrkraft)
  ,"9-G3": {
    saetze: [
      { e: "who",    t: "A musician is a person ___ makes music.", h: "who / which / whose", r: ["who", "that"], f: ["which", "whose"], fehler: "which" },
      { e: "who",    t: "The girl ___ sits next to me comes from Jamaica.", h: "who / which / whose", r: ["who", "that"], f: ["which", "whose"], fehler: "which" },
      { e: "who",    t: "Bob Marley was a singer ___ wrote lots of famous songs.", h: "who / which / whose", r: ["who", "that"], f: ["which", "whose"], fehler: "which" },
      { e: "who",    t: "My role model is a woman ___ helps poor children.", h: "who / which / whose", r: ["who", "that"], f: ["which", "whose"], fehler: "which" },
      { e: "who",    t: "The man ___ checked our passports was very friendly.", h: "who / which / whose", r: ["who", "that"], f: ["which", "whose"], fehler: "which" },
      { e: "who",    t: "The pilot ___ flew our plane said hello to everybody.", h: "who / which / whose", r: ["who", "that"], f: ["which", "whose"], fehler: "which" },
      { e: "which",  t: "This is the ferry ___ goes to the island.", h: "who / which / whose", r: ["which", "that"], f: ["who", "whose"], fehler: "who" },
      { e: "which",  t: "We stayed in a hostel ___ was right next to the beach.", h: "who / which / whose", r: ["which", "that"], f: ["who", "whose"], fehler: "who" },
      { e: "which",  t: "The hurricane ___ hit the island last year was terrible.", h: "who / which / whose", r: ["which", "that"], f: ["who", "whose"], fehler: "who" },
      { e: "which",  t: "Do you like the song ___ is playing on the radio?", h: "who / which / whose", r: ["which", "that"], f: ["who", "whose"], fehler: "who" },
      { e: "which",  t: "We went on a boat ___ had a glass floor.", h: "who / which / whose", r: ["which", "that"], f: ["who", "whose"], fehler: "who" },
      { e: "which",  t: "The storm ___ came last night was very loud.", h: "who / which / whose", r: ["which", "that"], f: ["who", "whose"], fehler: "who" },
      { e: "whose",  t: "That's the boy ___ suitcase got lost at the airport.", h: "who / which / whose", r: ["whose"], f: ["who's", "who"], fehler: "who" },
      { e: "whose",  t: "I have a friend ___ parents are musicians.", h: "who / which / whose", r: ["whose"], f: ["who's", "who"], fehler: "who" },
      { e: "whose",  t: "We stayed with a family ___ house was near a volcano.", h: "who / which / whose", r: ["whose"], f: ["who's", "which"], fehler: "who" },
      { e: "whose",  t: "The island ___ beaches are the most beautiful is Barbados.", h: "who / which / whose", r: ["whose"], f: ["which", "who's"], fehler: "which" },
      { e: "whose",  t: "Is that the singer ___ lyrics you love?", h: "who / which / whose", r: ["whose"], f: ["who's", "who"], fehler: "who" },
      { e: "whom",   t: "The woman to ___ I gave my ticket was very friendly.", h: "after a preposition", r: ["whom"], f: ["who", "which"], fehler: "who" },
      { e: "whom",   t: "The people with ___ we went diving were from Canada.", h: "after a preposition", r: ["whom"], f: ["who", "which"], fehler: "which" },
      { e: "whom",   t: "The man from ___ we rented the boat was very old.", h: "after a preposition", r: ["whom"], f: ["who", "which"], fehler: "who" },
      { e: "whom",   t: "The friends with ___ I travelled were great.", h: "after a preposition", r: ["whom"], f: ["who", "whose"], fehler: "who" },
      { e: "whom",   t: "My cousin, for ___ I bought this present, lives in Trinidad.", h: "after a preposition", r: ["whom"], f: ["who", "which"], fehler: "who" },
      { e: "nondef", t: "Jamaica, ___ is in the Caribbean, is famous for its music.", h: "that / which / who", r: ["which"], f: ["that", "who"], fehler: "that" },
      { e: "nondef", t: "Bob Marley, ___ was born in Jamaica, is still very famous.", h: "that / which / who", r: ["who"], f: ["that", "which"], fehler: "that" },
      { e: "nondef", t: "My uncle, ___ lives in Barbados, is a musician.", h: "that / which / who", r: ["who"], f: ["that", "which"], fehler: "that" },
      { e: "nondef", t: "The Sea View Hotel, ___ has a big pool, is right next to the beach.", h: "that / which / who", r: ["which"], f: ["that", "who"], fehler: "that" },
      { e: "nondef", t: "Our guide, ___ name was Leroy, showed us the old fort.", h: "that / who / whose", r: ["whose"], f: ["who's", "that"], fehler: "who" },
      { e: "nondef", t: "Grenada, ___ beaches are beautiful, is a small island.", h: "which / whose / that", r: ["whose"], f: ["which", "that"], fehler: "which" }
    ],
    umformen: [
      { e: "who",    a: "Join the sentences with a relative pronoun:", von: "I have a friend. She lives in Jamaica.", nach: ["I have a friend who lives in Jamaica.", "I have a friend that lives in Jamaica."] },
      { e: "which",  a: "Join the sentences with a relative pronoun:", von: "That's the ferry. It goes to the island.", nach: ["That's the ferry which goes to the island.", "That's the ferry that goes to the island."] },
      { e: "who",    a: "Join the sentences with a relative pronoun:", von: "We met a musician. He plays in a band.", nach: ["We met a musician who plays in a band.", "We met a musician that plays in a band."] },
      { e: "which",  a: "Join the sentences with a relative pronoun:", von: "We stayed in a hostel. It was very cheap.", nach: ["We stayed in a hostel which was very cheap.", "We stayed in a hostel that was very cheap."] },
      { e: "which",  a: "Join the sentences with a relative pronoun:", von: "This is the beach. It is famous for its white sand.", nach: ["This is the beach which is famous for its white sand.", "This is the beach that is famous for its white sand."] },
      { e: "whose",  a: "Join the sentences with “whose”:", von: "That's the girl. Her suitcase got lost.", nach: ["That's the girl whose suitcase got lost."] },
      { e: "whose",  a: "Join the sentences with “whose”:", von: "I know a man. His boat is very old.", nach: ["I know a man whose boat is very old."] },
      { e: "whose",  a: "Join the sentences with “whose”:", von: "We visited an island. Its beaches are beautiful.", nach: ["We visited an island whose beaches are beautiful."] },
      { e: "whom",   a: "Join the sentences with a preposition and “whom”:", von: "That's the woman. I spoke to her.", nach: ["That's the woman to whom I spoke."] },
      { e: "whom",   a: "Join the sentences with a preposition and “whom”:", von: "The people were friendly. We went diving with them.", nach: ["The people with whom we went diving were friendly."] },
      { e: "whom",   a: "Join the sentences with a preposition and “whom”:", von: "The man was very kind. We rented the boat from him.", nach: ["The man from whom we rented the boat was very kind."] },
      { e: "kontakt", a: "Leave out the relative pronoun:", von: "The hotel that we booked was great.", nach: ["The hotel we booked was great."] },
      { e: "kontakt", a: "Leave out the relative pronoun:", von: "The song which you like is by Bob Marley.", nach: ["The song you like is by Bob Marley."] },
      { e: "kontakt", a: "Leave out the relative pronoun:", von: "The man who we met on the ferry was a musician.", nach: ["The man we met on the ferry was a musician."] },
      { e: "kontakt", a: "Leave out the relative pronoun:", von: "The seafood that we ate was delicious.", nach: ["The seafood we ate was delicious."] },
      { e: "kontakt", a: "Leave out the relative pronoun:", von: "Is this the passport which you lost?", nach: ["Is this the passport you lost?"] },
      { e: "kontakt", a: "Join the sentences without a relative pronoun:", von: "The beach was beautiful. We visited it.", nach: ["The beach we visited was beautiful."] },
      { e: "kontakt", a: "Join the sentences without a relative pronoun:", von: "The film was boring. We watched it on the plane.", nach: ["The film we watched on the plane was boring."] },
      { e: "kontakt", a: "Join the sentences without a relative pronoun:", von: "The girl is from Barbados. I met her at the hostel.", nach: ["The girl I met at the hostel is from Barbados."] },
      { e: "nondef", a: "Join the sentences with commas and who or which:", von: "Jamaica is in the Caribbean. It is famous for reggae.", nach: ["Jamaica, which is in the Caribbean, is famous for reggae.", "Jamaica, which is famous for reggae, is in the Caribbean."] },
      { e: "nondef", a: "Join the sentences with commas and who or which:", von: "My aunt lives in Trinidad. She is a nurse.", nach: ["My aunt, who lives in Trinidad, is a nurse.", "My aunt, who is a nurse, lives in Trinidad."] },
      { e: "nondef", a: "Join the sentences with commas and who or which:", von: "Bob Marley was born in Jamaica. He was a famous singer.", nach: ["Bob Marley, who was born in Jamaica, was a famous singer.", "Bob Marley, who was a famous singer, was born in Jamaica."] },
      { e: "nondef", a: "Join the sentences with commas and who or which:", von: "Our hotel had a big pool. It was next to the beach.", nach: ["Our hotel, which had a big pool, was next to the beach.", "Our hotel, which was next to the beach, had a big pool."] },
      { e: "nondef", a: "Join the sentences with commas and “whose”:", von: "Barbados is a small island. Its beaches are famous.", nach: ["Barbados, whose beaches are famous, is a small island."] },
      { e: "nondef", a: "Join the sentences with commas and who or which:", von: "Our guide showed us the volcano. He was very funny.", nach: ["Our guide, who was very funny, showed us the volcano."] }
    ],
    zuordnen: {
      kategorien: ["can be left out (kann wegfallen)", "must stay (muss bleiben)"],
      woerter: [
        { text: "the song that I love", ziel: "can be left out (kann wegfallen)" }, { text: "the hotel which we booked", ziel: "can be left out (kann wegfallen)" },
        { text: "the man who we met", ziel: "can be left out (kann wegfallen)" }, { text: "the seafood that we ate", ziel: "can be left out (kann wegfallen)" },
        { text: "the beach which we visited", ziel: "can be left out (kann wegfallen)" }, { text: "the girl who I met", ziel: "can be left out (kann wegfallen)" },
        { text: "the man who lives here", ziel: "must stay (muss bleiben)" }, { text: "the ferry which goes to Tobago", ziel: "must stay (muss bleiben)" },
        { text: "the girl whose bag got lost", ziel: "must stay (muss bleiben)" }, { text: "Jamaica, which is in the Caribbean,", ziel: "must stay (muss bleiben)" },
        { text: "the storm that hit the island", ziel: "must stay (muss bleiben)" }, { text: "the woman to whom I spoke", ziel: "must stay (muss bleiben)" }
      ]
    },
    erklaerungen: {
      satzpool: {
        who:     "who (or that) is for people (Personen). Example: {BEISPIEL}",
        which:   "which (or that) is for things and animals (Sachen und Tiere). Example: {BEISPIEL}",
        whose:   "whose = dessen / deren. It shows who something belongs to. Don't mix it up with who's (= who is). Example: {BEISPIEL}",
        whom:    "After a preposition (Präposition) like to, with, from or for we use whom for people – not who. Example: {BEISPIEL}",
        nondef:  "Extra information between commas (nicht notwendiger Relativsatz): use who, which or whose – never that. Example: {BEISPIEL}",
        kontakt: "You can leave out the relative pronoun (Relativpronomen) when a new subject follows (we, I, you …): the hotel (that) we booked. Example: {BEISPIEL}",
        zuordnen: "The relative pronoun can be left out when a new subject follows: the song (that) I love. It must stay when a verb follows (the man who lives here), with whose, after a preposition and between commas."
      }
    }
  },

  // ---------- Klasse 9, Unit 2: past progressive (G4) ----------
  //   Aussagen und Verneinung, keine Fragen; Gegenüberstellung mit dem simple past (when / while) – Vorgaben der Lehrkraft
  "9-G4": {
    saetze: [
      { e: "aussage", t: "At ten o'clock last night we ___ on the beach.", h: "sit", r: ["were sitting"], f: ["was sitting", "were siting"], fehler: { ersatz: "was sitting", wort: "was", loesung: ["were"] } },
      { e: "aussage", t: "Yesterday at five I ___ in the sea.", h: "swim", r: ["was swimming"], f: ["was swiming", "were swimming"], fehler: { ersatz: "was swiming", wort: "swiming", loesung: ["swimming"] } },
      { e: "aussage", t: "At midnight the people at the party ___ to reggae music.", h: "dance", r: ["were dancing"], f: ["were danceing", "was dancing"], fehler: { ersatz: "were danceing", wort: "danceing", loesung: ["dancing"] } },
      { e: "aussage", t: "This time last week my parents ___ to Tobago.", h: "travel", r: ["were travelling", "were traveling"], f: ["was travelling", "were travel"], fehler: { ersatz: "were travel", wort: "travel", loesung: ["travelling", "traveling"] } },
      { e: "aussage", t: "At eight o'clock my brother ___ his luggage.", h: "pack", r: ["was packing"], f: ["were packing", "packing"], fehler: { ersatz: "were packing", wort: "were", loesung: ["was"] } },
      { e: "aussage", t: "The sun ___ and the birds were singing.", h: "shine", r: ["was shining"], f: ["was shineing", "were shining"], fehler: { ersatz: "was shineing", wort: "shineing", loesung: ["shining"] } },
      { e: "aussage", t: "It ___ when we arrived at the airport.", h: "rain", r: ["was raining"], f: ["were raining", "was rainning"], fehler: { ersatz: "were raining", wort: "were", loesung: ["was"] } },
      { e: "aussage", t: "When I looked out of the window, the children ___ in the garden.", h: "play", r: ["were playing"], f: ["was playing", "were plaing"], fehler: { ersatz: "was playing", wort: "was", loesung: ["were"] } },
      { e: "neg",     t: "I ___ when you called. I was only reading.", h: "not / sleep", r: ["wasn't sleeping", "was not sleeping"], f: ["didn't sleeping", "weren't sleeping"], fehler: { ersatz: "didn't sleeping", wort: "didn't", loesung: ["wasn't", "was not"] } },
      { e: "neg",     t: "The tourists ___ on the beach because it was too windy.", h: "not / lie", r: ["weren't lying", "were not lying"], f: ["weren't lieing", "wasn't lying"], fehler: { ersatz: "weren't lieing", wort: "lieing", loesung: ["lying"] } },
      { e: "neg",     t: "Luckily, we ___ in the sea when the storm started.", h: "not / swim", r: ["weren't swimming", "were not swimming"], f: ["wasn't swimming", "weren't swiming"], fehler: { ersatz: "wasn't swimming", wort: "wasn't", loesung: ["weren't", "were not"] } },
      { e: "neg",     t: "Mia ___ attention, so she missed the gate number.", h: "not / pay", r: ["wasn't paying", "was not paying"], f: ["weren't paying", "didn't paying"], fehler: { ersatz: "didn't paying", wort: "didn't", loesung: ["wasn't", "was not"] } },
      { e: "neg",     t: "My friends ___ to the guide. They were playing on their phones.", h: "not / listen", r: ["weren't listening", "were not listening"], f: ["wasn't listening", "weren't listen"], fehler: { ersatz: "weren't listen", wort: "listen", loesung: ["listening"] } },
      { e: "neg",     t: "The ferry ___ because of the hurricane.", h: "not / run", r: ["wasn't running", "was not running"], f: ["wasn't runing", "weren't running"], fehler: { ersatz: "wasn't runing", wort: "runing", loesung: ["running"] } },
      { e: "unterbr", t: "We ___ dinner when the lights went out.", h: "have", r: ["were having"], f: ["was having", "were haveing"], fehler: { ersatz: "were haveing", wort: "haveing", loesung: ["having"] } },
      { e: "unterbr", t: "I ___ in the sea when I saw a turtle.", h: "swim", r: ["was swimming"], f: ["were swimming", "was swim"], fehler: { ersatz: "was swim", wort: "swim", loesung: ["swimming"] } },
      { e: "unterbr", t: "While we ___ on the beach, it started to rain.", h: "walk", r: ["were walking"], f: ["was walking", "were walk"], fehler: { ersatz: "was walking", wort: "was", loesung: ["were"] } },
      { e: "unterbr", t: "Dad ___ the car when he heard the thunder.", h: "drive", r: ["was driving"], f: ["were driving", "was driveing"], fehler: { ersatz: "was driveing", wort: "driveing", loesung: ["driving"] } },
      { e: "unterbr", t: "The pirates ___ when the prisoner escaped.", h: "sleep", r: ["were sleeping"], f: ["was sleeping", "were sleep"], fehler: { ersatz: "was sleeping", wort: "was", loesung: ["were"] } },
      { e: "kurz",    t: "I was waiting at the gate when I ___ that my passport was missing.", h: "realise", r: ["realised", "realized"], f: ["was realising", "realise"], fehler: { ersatz: "realise", wort: "realise", loesung: ["realised", "realized"] } },
      { e: "kurz",    t: "We were swimming when a big wave ___ us.", h: "hit", r: ["hit"], f: ["was hitting", "hitted"], fehler: "hitted" },
      { e: "kurz",    t: "While Tom was diving, he ___ an old shipwreck.", h: "find", r: ["found"], f: ["was finding", "finded"], fehler: "finded" },
      { e: "kurz",    t: "The band was playing when it suddenly ___ to rain.", h: "start", r: ["started"], f: ["was starting", "starts"], fehler: { ersatz: "starts", wort: "starts", loesung: ["started"] } },
      { e: "gleich",  t: "While Mum was cooking, Dad ___ a book.", h: "read", r: ["was reading"], f: ["were reading", "was readding"], fehler: { ersatz: "were reading", wort: "were", loesung: ["was"] } },
      { e: "gleich",  t: "While I was packing, my sister ___ on the phone.", h: "talk", r: ["was talking"], f: ["were talking", "was talkking"], fehler: { ersatz: "were talking", wort: "were", loesung: ["was"] } },
      { e: "gleich",  t: "While the children were playing in the sand, their parents ___ in the sun.", h: "lie", r: ["were lying"], f: ["were lieing", "was lying"], fehler: { ersatz: "were lieing", wort: "lieing", loesung: ["lying"] } },
      { e: "folge",   t: "Yesterday I got up, ___ a shower and went to the beach.", h: "have", r: ["had"], f: ["was having", "haved"], fehler: "haved" },
      { e: "folge",   t: "First we checked in, then we ___ to our room.", h: "go", r: ["went"], f: ["were going", "goed"], fehler: "goed" },
      { e: "folge",   t: "Last summer we ___ to Jamaica for two weeks.", h: "fly", r: ["flew"], f: ["were flying", "flied"], fehler: "flied" }
    ],
    umformen: [
      { e: "neg",     a: "Make the sentence negative:", von: "We were sleeping.", nach: ["We weren't sleeping.", "We were not sleeping."] },
      { e: "neg",     a: "Make the sentence negative:", von: "Tom was listening to the guide.", nach: ["Tom wasn't listening to the guide.", "Tom was not listening to the guide."] },
      { e: "neg",     a: "Make the sentence negative:", von: "The sun was shining.", nach: ["The sun wasn't shining.", "The sun was not shining."] },
      { e: "neg",     a: "Make the sentence negative:", von: "My parents were watching TV.", nach: ["My parents weren't watching TV.", "My parents were not watching TV."] },
      { e: "neg",     a: "Make the sentence negative:", von: "I was waiting for the ferry.", nach: ["I wasn't waiting for the ferry.", "I was not waiting for the ferry."] },
      { e: "neg",     a: "Make the sentence negative:", von: "The children were playing outside.", nach: ["The children weren't playing outside.", "The children were not playing outside."] },
      { e: "aussage", a: "Use the past progressive:", von: "I play the guitar. (at six o'clock yesterday)", nach: ["I was playing the guitar at six o'clock yesterday."] },
      { e: "aussage", a: "Use the past progressive:", von: "We swim in the sea. (at ten o'clock yesterday)", nach: ["We were swimming in the sea at ten o'clock yesterday."] },
      { e: "aussage", a: "Use the past progressive:", von: "Mia reads a book. (at nine o'clock last night)", nach: ["Mia was reading a book at nine o'clock last night."] },
      { e: "aussage", a: "Use the past progressive:", von: "They dance on the beach. (at midnight)", nach: ["They were dancing on the beach at midnight."] },
      { e: "aussage", a: "Use the past progressive:", von: "My brother lies in the sun. (at three o'clock yesterday)", nach: ["My brother was lying in the sun at three o'clock yesterday."] },
      { e: "aussage", a: "Use the past progressive:", von: "Leroy sings in a band. (at eight o'clock last night)", nach: ["Leroy was singing in a band at eight o'clock last night."] },
      { e: "unterbr", a: "Join the sentences with “when”:", von: "I was having a shower. The phone rang.", nach: ["I was having a shower when the phone rang.", "When the phone rang, I was having a shower."] },
      { e: "unterbr", a: "Join the sentences with “when”:", von: "We were swimming. We saw a turtle.", nach: ["We were swimming when we saw a turtle.", "When we saw a turtle, we were swimming."] },
      { e: "unterbr", a: "Join the sentences with “when”:", von: "Dad was driving. The storm started.", nach: ["Dad was driving when the storm started.", "When the storm started, Dad was driving."] },
      { e: "unterbr", a: "Join the sentences with “when”:", von: "The pirates were sleeping. The prisoner escaped.", nach: ["The pirates were sleeping when the prisoner escaped.", "When the prisoner escaped, the pirates were sleeping."] },
      { e: "unterbr", a: "Join the sentences with “when”:", von: "I was packing my bag. My friend called.", nach: ["I was packing my bag when my friend called.", "When my friend called, I was packing my bag."] },
      { e: "gleich",  a: "Join the sentences with “while”:", von: "Mum was cooking. Dad was reading.", nach: ["While Mum was cooking, Dad was reading.", "Mum was cooking while Dad was reading.", "Dad was reading while Mum was cooking.", "While Dad was reading, Mum was cooking."] },
      { e: "gleich",  a: "Join the sentences with “while”:", von: "I was waiting at the gate. My sister was buying a drink.", nach: ["While I was waiting at the gate, my sister was buying a drink.", "I was waiting at the gate while my sister was buying a drink.", "My sister was buying a drink while I was waiting at the gate.", "While my sister was buying a drink, I was waiting at the gate."] },
      { e: "unterbr", a: "Join the sentences with “while”:", von: "We were walking on the beach. It started to rain.", nach: ["While we were walking on the beach, it started to rain.", "It started to rain while we were walking on the beach."] },
      { e: "unterbr", a: "Join the sentences with “while”:", von: "Tom was diving. He found an old shipwreck.", nach: ["While Tom was diving, he found an old shipwreck.", "Tom found an old shipwreck while he was diving."] },
      { e: "unterbr", a: "Use the past progressive and the simple past:", von: "I (read) when the lights (go) out.", nach: ["I was reading when the lights went out."] },
      { e: "unterbr", a: "Use the past progressive and the simple past:", von: "We (sit) on the beach when it (start) to rain.", nach: ["We were sitting on the beach when it started to rain."] },
      { e: "unterbr", a: "Use the past progressive and the simple past:", von: "The thunder (wake) Zoe up while she (sleep).", nach: ["The thunder woke Zoe up while she was sleeping."] },
      { e: "unterbr", a: "Use the past progressive and the simple past:", von: "Ben (fall) off his bike while he (ride) home.", nach: ["Ben fell off his bike while he was riding home."] },
      { e: "unterbr", a: "Use the past progressive and the simple past:", von: "When I (arrive) at the hotel, my friends (wait) for me.", nach: ["When I arrived at the hotel, my friends were waiting for me.", "My friends were waiting for me when I arrived at the hotel."] }
    ],
    zuordnen: {
      kategorien: ["past progressive (Verlaufsform)", "simple past"],
      woerter: [
        { text: "was swimming", ziel: "past progressive (Verlaufsform)" }, { text: "were dancing", ziel: "past progressive (Verlaufsform)" },
        { text: "wasn't sleeping", ziel: "past progressive (Verlaufsform)" }, { text: "weren't listening", ziel: "past progressive (Verlaufsform)" },
        { text: "was raining", ziel: "past progressive (Verlaufsform)" }, { text: "were lying", ziel: "past progressive (Verlaufsform)" },
        { text: "swam", ziel: "simple past" }, { text: "danced", ziel: "simple past" }, { text: "didn't sleep", ziel: "simple past" },
        { text: "found", ziel: "simple past" }, { text: "went", ziel: "simple past" }, { text: "didn't listen", ziel: "simple past" }
      ]
    },
    erklaerungen: {
      satzpool: {
        aussage: "Past progressive (Verlaufsform der Vergangenheit): was / were + verb-ing. It shows an action that was going on at a certain time. Spelling: swim → swimming, dance → dancing, lie → lying. Example: {BEISPIEL}",
        neg:     "Negative (Verneinung): wasn't / weren't + verb-ing – not didn't. Example: {BEISPIEL}",
        unterbr: "The longer action that was going on → past progressive. The short action that interrupts it (unterbricht) → simple past. Example: {BEISPIEL}",
        kurz:    "The short action that happens suddenly (plötzlich) → simple past. The longer action in the background → past progressive. Example: {BEISPIEL}",
        gleich:  "Two actions at the same time (gleichzeitig): while + past progressive, past progressive. Example: {BEISPIEL}",
        folge:   "Actions one after the other (nacheinander) → simple past, not past progressive. Example: {BEISPIEL}",
        zuordnen: "Past progressive = was / were (not) + verb-ing: was swimming. Simple past = 2nd form or didn't + verb: swam, didn't swim."
      }
    }
  }

  // ---------- Klasse 9, Unit 3: Partizip Präsens (G5) ----------
  //   Vorgabe: nach Verben der Wahrnehmung (I saw him running), -ing/-ed-Adjektive, Satzverkürzung (Walking home, I …)
  ,"9-G5": {
    saetze: [
      { e: "wahrn",  t: "On the safari we saw a lion ___ under a tree.", h: "sleep + -ing", r: ["sleeping"], f: ["slept", "to sleep"], fehler: "slept" },
      { e: "wahrn",  t: "I heard someone ___ for help.", h: "shout + -ing", r: ["shouting"], f: ["shouted", "to shout"], fehler: "shouted" },
      { e: "wahrn",  t: "We watched the baboons ___ in the trees.", h: "play + -ing", r: ["playing"], f: ["played", "to play"], fehler: "played" },
      { e: "wahrn",  t: "Mia felt something ___ up her leg.", h: "climb + -ing", r: ["climbing"], f: ["climbed", "to climb"], fehler: "climbed" },
      { e: "wahrn",  t: "The ranger saw two men ___ near the fence.", h: "hide + -ing", r: ["hiding"], f: ["hided", "to hide"], fehler: "hided" },
      { e: "wahrn",  t: "Did you hear the children ___?", h: "sing + -ing", r: ["singing"], f: ["sang", "to sing"], fehler: "sang" },
      { e: "wahrn",  t: "We could see the sun ___ over the mountains.", h: "rise + -ing", r: ["rising"], f: ["rised", "to rise"], fehler: "rised" },
      { e: "wahrn",  t: "I saw a man ___ at us from the car.", h: "look + -ing", r: ["looking"], f: ["looked", "to look"], fehler: "looked" },
      { e: "adj",    t: "The safari was really ___.", h: "excite → -ing / -ed", r: ["exciting"], f: ["excited", "exciteing"], fehler: "excited" },
      { e: "adj",    t: "We were very ___ when we saw the lions.", h: "excite → -ing / -ed", r: ["excited"], f: ["exciting", "excitet"], fehler: "exciting" },
      { e: "adj",    t: "The film about apartheid was ___.", h: "shock → -ing / -ed", r: ["shocking"], f: ["shocked", "shockking"], fehler: "shocked" },
      { e: "adj",    t: "I was ___ when I heard the news.", h: "shock → -ing / -ed", r: ["shocked"], f: ["shocking", "shockt"], fehler: "shocking" },
      { e: "adj",    t: "The lesson was so ___ that I fell asleep.", h: "bore → -ing / -ed", r: ["boring"], f: ["bored", "boreing"], fehler: "bored" },
      { e: "adj",    t: "Tom is very ___ in history.", h: "interest → -ing / -ed", r: ["interested"], f: ["interesting", "interestet"], fehler: "interesting" },
      { e: "adj",    t: "After the long walk we were really ___.", h: "tire → -ing / -ed", r: ["tired"], f: ["tiring", "tirred"], fehler: "tiring" },
      { e: "adj",    t: "The night in the tent was ___. We heard lions all night.", h: "frighten → -ing / -ed", r: ["frightening"], f: ["frightened", "frightning"], fehler: "frightened" },
      { e: "adj",    t: "The children were ___ of the big dog.", h: "frighten → -ing / -ed", r: ["frightened"], f: ["frightening", "frighted"], fehler: "frightening" },
      { e: "adj",    t: "It was an ___ trip.", h: "amaze → -ing / -ed", r: ["amazing"], f: ["amazed", "amazeing"], fehler: "amazed" },
      { e: "adj",    t: "My parents were ___ by my good marks.", h: "surprise → -ing / -ed", r: ["surprised"], f: ["surprising", "surpriseing"], fehler: "surprising" },
      { e: "kurz",   t: "___ through the national park, we saw a rhino.", h: "walk + -ing", r: ["Walking"], f: ["Walked", "To walk"], fehler: "Walked" },
      { e: "kurz",   t: "___ the news, she started to cry.", h: "hear + -ing", r: ["Hearing"], f: ["Heard", "To hear"], fehler: "Heard" },
      { e: "kurz",   t: "___ tired, Tom went to bed early.", h: "feel + -ing", r: ["Feeling"], f: ["Felt", "To feel"], fehler: "Felt" },
      { e: "kurz",   t: "___ the door, I saw a big spider.", h: "open + -ing", r: ["Opening"], f: ["Opened", "To open"], fehler: "Opened" },
      { e: "kurz",   t: "___ to the bus stop, Mia lost her phone.", h: "run + -ing", r: ["Running"], f: ["Runing", "Ran"], fehler: "Ran" },
      { e: "kurz",   t: "___ in a township, Thabo knew a lot about the problems there.", h: "live + -ing", r: ["Living"], f: ["Lived", "Liveing"], fehler: "Lived" },
      { e: "kurz",   t: "___ his phone, Ben didn't see the lion.", h: "watch + -ing", r: ["Watching"], f: ["Watched", "To watch"], fehler: "Watched" },
      { e: "kurz",   t: "___ no money, the boy couldn't buy a ticket.", h: "have + -ing", r: ["Having"], f: ["Had", "Haveing"], fehler: "Had" },
      { e: "kurz",   t: "Grandma sat in the garden, ___ the newspaper.", h: "read + -ing", r: ["reading"], f: ["readed", "to read"], fehler: "readed" }
    ],
    umformen: [
      { e: "wahrn", a: "Join the sentences with an -ing form:", von: "I saw the children. They were playing football.", nach: ["I saw the children playing football."] },
      { e: "wahrn", a: "Join the sentences with an -ing form:", von: "We heard the birds. They were singing.", nach: ["We heard the birds singing."] },
      { e: "wahrn", a: "Join the sentences with an -ing form:", von: "Mia watched the baboons. They were eating fruit.", nach: ["Mia watched the baboons eating fruit."] },
      { e: "wahrn", a: "Join the sentences with an -ing form:", von: "The ranger saw a man. He was running away.", nach: ["The ranger saw a man running away."] },
      { e: "wahrn", a: "Join the sentences with an -ing form:", von: "I felt the ground. It was shaking.", nach: ["I felt the ground shaking."] },
      { e: "wahrn", a: "Join the sentences with an -ing form:", von: "We saw the tourists. They were taking photos.", nach: ["We saw the tourists taking photos."] },
      { e: "wahrn", a: "Join the sentences with an -ing form:", von: "I heard my sister. She was talking on the phone.", nach: ["I heard my sister talking on the phone."] },
      { e: "wahrn", a: "Join the sentences with an -ing form:", von: "We watched the sun. It was going down.", nach: ["We watched the sun going down."] },
      { e: "kurz",  a: "Shorten the sentence with an -ing form:", von: "While we were walking through the park, we saw a rhino.", nach: ["Walking through the park, we saw a rhino."] },
      { e: "kurz",  a: "Shorten the sentence with an -ing form:", von: "When she heard the news, she started to cry.", nach: ["Hearing the news, she started to cry."] },
      { e: "kurz",  a: "Shorten the sentence with an -ing form:", von: "Because he felt tired, Tom went to bed.", nach: ["Feeling tired, Tom went to bed."] },
      { e: "kurz",  a: "Shorten the sentence with an -ing form:", von: "When I opened the door, I saw a spider.", nach: ["Opening the door, I saw a spider."] },
      { e: "kurz",  a: "Shorten the sentence with an -ing form:", von: "Because she lived in Cape Town, Thandi knew the city well.", nach: ["Living in Cape Town, Thandi knew the city well."] },
      { e: "kurz",  a: "Shorten the sentence with an -ing form:", von: "While he was waiting for the bus, Ben read a book.", nach: ["Waiting for the bus, Ben read a book."] },
      { e: "kurz",  a: "Shorten the sentence with an -ing form:", von: "Because they had no money, they couldn't buy food.", nach: ["Having no money, they couldn't buy food."] },
      { e: "kurz",  a: "Join the sentences with an -ing form:", von: "Grandma sat in the garden. She was reading the newspaper.", nach: ["Grandma sat in the garden, reading the newspaper.", "Grandma sat in the garden reading the newspaper."] },
      { e: "adj",   a: "Use an -ing adjective (The trip was …):", von: "The trip interested me.", nach: ["The trip was interesting."] },
      { e: "adj",   a: "Use an -ed adjective (I was … in the trip):", von: "The trip interested me.", nach: ["I was interested in the trip."] },
      { e: "adj",   a: "Use an -ing adjective (The film was …):", von: "The film bored us.", nach: ["The film was boring."] },
      { e: "adj",   a: "Use an -ed adjective (We were …):", von: "The film bored us.", nach: ["We were bored."] },
      { e: "adj",   a: "Use an -ing adjective (The news was …):", von: "The news shocked everybody.", nach: ["The news was shocking."] },
      { e: "adj",   a: "Use an -ed adjective (Everybody was …):", von: "The news shocked everybody.", nach: ["Everybody was shocked.", "Everybody was shocked by the news."] },
      { e: "adj",   a: "Use an -ed adjective (The children were …):", von: "The long walk tired the children.", nach: ["The children were tired."] },
      { e: "adj",   a: "Use an -ing adjective (The lions were …):", von: "The lions frightened me.", nach: ["The lions were frightening."] },
      { e: "adj",   a: "Use an -ed adjective (We were …):", von: "The safari excited us.", nach: ["We were excited.", "We were excited about the safari."] },
      { e: "adj",   a: "Use an -ing adjective (The safari was …):", von: "The safari excited us.", nach: ["The safari was exciting."] }
    ],
    zuordnen: {
      kategorien: ["-ing (so ist etwas)", "-ed (so fühlt sich jemand)"],
      woerter: [
        { text: "a boring film", ziel: "-ing (so ist etwas)" }, { text: "an exciting safari", ziel: "-ing (so ist etwas)" }, { text: "a tiring day", ziel: "-ing (so ist etwas)" },
        { text: "an interesting book", ziel: "-ing (so ist etwas)" }, { text: "a frightening night", ziel: "-ing (so ist etwas)" }, { text: "a shocking story", ziel: "-ing (so ist etwas)" },
        { text: "I'm bored", ziel: "-ed (so fühlt sich jemand)" }, { text: "we were excited", ziel: "-ed (so fühlt sich jemand)" }, { text: "she felt tired", ziel: "-ed (so fühlt sich jemand)" },
        { text: "he was interested", ziel: "-ed (so fühlt sich jemand)" }, { text: "they were frightened", ziel: "-ed (so fühlt sich jemand)" }, { text: "I was shocked", ziel: "-ed (so fühlt sich jemand)" }
      ]
    },
    erklaerungen: {
      satzpool: {
        wahrn: "After verbs of perception (Verben der Wahrnehmung) like see, hear, watch and feel we can use a person or thing + -ing form: I saw him running. Example: {BEISPIEL}",
        adj:   "-ing adjectives say what something is like (so ist etwas): a boring film. -ed adjectives say how someone feels (so fühlt sich jemand): I'm bored. Example: {BEISPIEL}",
        kurz:  "An -ing form can make a sentence shorter (Satzverkürzung) when both parts have the same subject: When I came home, I … → Coming home, I … Example: {BEISPIEL}",
        zuordnen: "-ing: what something is like (a boring film). -ed: how someone feels (I'm bored)."
      }
    }
  },

  // ---------- Klasse 9, Unit 3: past perfect (G6) ----------
  //   wie Klasse 8 (Aussagen, Verneinung, Fragen) mit Gegenüberstellung simple past und Signalwörtern
  "9-G6": {
    saetze: [
      { e: "aussage",  t: "When we arrived at the national park, the rangers ___ the gate.", h: "already / close – past perfect", r: ["had already closed"], f: ["have already closed", "had already close"], fehler: { ersatz: "have already closed", wort: "have", loesung: ["had"] } },
      { e: "aussage",  t: "After the hunters ___ the rhino, the police caught them.", h: "shoot – past perfect", r: ["had shot"], f: ["have shot", "had shooted"], fehler: { ersatz: "had shooted", wort: "shooted", loesung: ["shot"] } },
      { e: "aussage",  t: "Nelson Mandela ___ in prison for 27 years before he became President.", h: "be – past perfect", r: ["had been"], f: ["has been", "had be"], fehler: { ersatz: "has been", wort: "has", loesung: ["had"] } },
      { e: "aussage",  t: "By the time we got to the township, the protest ___.", h: "end – past perfect", r: ["had ended"], f: ["has ended", "had end"], fehler: { ersatz: "had end", wort: "end", loesung: ["ended"] } },
      { e: "aussage",  t: "The headteacher was angry because the students ___ a window.", h: "break – past perfect", r: ["had broken"], f: ["had broke", "has broken"], fehler: { ersatz: "had broke", wort: "broke", loesung: ["broken"] } },
      { e: "aussage",  t: "I knew the way because I ___ there before.", h: "be – past perfect", r: ["had been"], f: ["had went", "have been"], fehler: { ersatz: "have been", wort: "have", loesung: ["had"] } },
      { e: "aussage",  t: "Before she became a ranger, Thandi ___ biology at university.", h: "study – past perfect", r: ["had studied"], f: ["has studied", "had study"], fehler: { ersatz: "had study", wort: "study", loesung: ["studied"] } },
      { e: "aussage",  t: "We ___ the film before, so we knew the end.", h: "see – past perfect", r: ["had seen"], f: ["have seen", "had saw"], fehler: { ersatz: "had saw", wort: "saw", loesung: ["seen"] } },
      { e: "aussage",  t: "When I got to school, the lesson ___.", h: "start – past perfect", r: ["had started"], f: ["has started", "had start"], fehler: { ersatz: "had start", wort: "start", loesung: ["started"] } },
      { e: "neg",      t: "We ___ a lion before our safari.", h: "not / see – past perfect", r: ["hadn't seen", "had not seen"], f: ["didn't seen", "hadn't saw"], fehler: { ersatz: "hadn't saw", wort: "saw", loesung: ["seen"] } },
      { e: "neg",      t: "Mia was nervous because she ___ on a plane before.", h: "never / be – past perfect", r: ["had never been"], f: ["has never been", "had never be"], fehler: { ersatz: "has never been", wort: "has", loesung: ["had"] } },
      { e: "neg",      t: "The tourists were hungry because they ___ breakfast.", h: "not / have – past perfect", r: ["hadn't had", "had not had"], f: ["didn't had", "hadn't have"], fehler: { ersatz: "hadn't have", wort: "have", loesung: ["had"] } },
      { e: "neg",      t: "Tom ___ his homework, so the teacher was angry.", h: "not / do – past perfect", r: ["hadn't done", "had not done"], f: ["didn't done", "hadn't did"], fehler: { ersatz: "hadn't did", wort: "did", loesung: ["done"] } },
      { e: "neg",      t: "When we got to the police station, the police ___ the thief yet.", h: "not / catch – past perfect", r: ["hadn't caught", "had not caught"], f: ["hadn't catched", "haven't caught"], fehler: { ersatz: "hadn't catched", wort: "catched", loesung: ["caught"] } },
      { e: "frage",    t: "___ you ever been to Africa before last year?", h: "have – past perfect", r: ["Had"], f: ["Have", "Did"], fehler: "Did" },
      { e: "frage",    t: "___ Mia finished her work when you called her?", h: "have – past perfect", r: ["Had"], f: ["Has", "Did"], fehler: "Has" },
      { e: "frage",    t: "Where ___ you been before you came to Cape Town?", h: "have – past perfect", r: ["had"], f: ["did", "has"], fehler: "did" },
      { e: "frage",    t: "___ the protesters left when the police arrived?", h: "have – past perfect", r: ["Had"], f: ["Did", "Have"], fehler: "Did" },
      { e: "kontrast", t: "After the rangers had found the baby rhino, they ___ it to a safe place.", h: "take", r: ["took"], f: ["had taken", "taked"], fehler: "taked" },
      { e: "kontrast", t: "When I got home, I ___ that someone had opened the window.", h: "see", r: ["saw"], f: ["had seen", "seed"], fehler: "seed" },
      { e: "kontrast", t: "The tourists ___ very happy because they had seen a leopard.", h: "be", r: ["were"], f: ["had be", "was"], fehler: { ersatz: "was", wort: "was", loesung: ["were"] } },
      { e: "signal",   t: "The lions had ___ eaten when we arrived, so they were sleeping.", h: "already / yet", r: ["already"], f: ["yet", "ever"], fehler: "yet" },
      { e: "signal",   t: "The bus hadn't come ___, so we waited.", h: "already / yet", r: ["yet"], f: ["already", "ever"], fehler: "already" },
      { e: "signal",   t: "I had ___ seen an elephant before I went to South Africa.", h: "never / ever", r: ["never"], f: ["ever", "yet"], fehler: "ever" },
      { e: "signal",   t: "___ we had checked in, we went to the pool.", h: "after / before", r: ["After"], f: ["Before", "Until"], fehler: "Before" },
      { e: "signal",   t: "We had packed our bags ___ the taxi came.", h: "before / after", r: ["before"], f: ["after", "since"], fehler: "after" },
      { e: "signal",   t: "The rangers had ___ left when the poachers came.", h: "just / yet", r: ["just", "already"], f: ["yet", "ever"], fehler: "yet" }
    ],
    umformen: [
      { e: "kontrast", a: "Join the sentences with “after” (past perfect + simple past):", von: "We visited the township. Then we went to the museum.", nach: ["After we had visited the township, we went to the museum.", "We went to the museum after we had visited the township."] },
      { e: "kontrast", a: "Join the sentences with “after” (past perfect + simple past):", von: "The hunters shot the rhino. Then the rangers caught them.", nach: ["After the hunters had shot the rhino, the rangers caught them.", "The rangers caught the hunters after they had shot the rhino."] },
      { e: "kontrast", a: "Join the sentences with “after” (past perfect + simple past):", von: "Mia finished her homework. Then she watched TV.", nach: ["After Mia had finished her homework, she watched TV.", "Mia watched TV after she had finished her homework."] },
      { e: "kontrast", a: "Join the sentences with “after” (past perfect + simple past):", von: "We booked a room. Then we flew to Cape Town.", nach: ["After we had booked a room, we flew to Cape Town.", "We flew to Cape Town after we had booked a room."] },
      { e: "kontrast", a: "Join the sentences with “after” (past perfect + simple past):", von: "The children ate. Then they played outside.", nach: ["After the children had eaten, they played outside.", "The children played outside after they had eaten."] },
      { e: "kontrast", a: "Join the sentences with “before” (past perfect + simple past):", von: "We bought popcorn. Then the film started.", nach: ["We had bought popcorn before the film started.", "Before the film started, we had bought popcorn."] },
      { e: "kontrast", a: "Join the sentences with “before” (past perfect + simple past):", von: "We cleaned the house. Then the guests arrived.", nach: ["We had cleaned the house before the guests arrived.", "Before the guests arrived, we had cleaned the house."] },
      { e: "kontrast", a: "Join the sentences with “before” (past perfect + simple past):", von: "The poachers left. Then the rangers arrived.", nach: ["The poachers had left before the rangers arrived.", "Before the rangers arrived, the poachers had left."] },
      { e: "signal",   a: "Join the sentences with “when” and “already”:", von: "The train left. Then we arrived at the station.", nach: ["When we arrived at the station, the train had already left.", "The train had already left when we arrived at the station."] },
      { e: "signal",   a: "Join the sentences with “when” and “already”:", von: "The film started. Then I got to the cinema.", nach: ["When I got to the cinema, the film had already started.", "The film had already started when I got to the cinema."] },
      { e: "signal",   a: "Join the sentences with “when” and “already”:", von: "The sun went down. Then we got to the beach.", nach: ["When we got to the beach, the sun had already gone down.", "The sun had already gone down when we got to the beach."] },
      { e: "neg",      a: "Make the sentence negative:", von: "She had seen a lion before.", nach: ["She hadn't seen a lion before.", "She had not seen a lion before."] },
      { e: "neg",      a: "Make the sentence negative:", von: "They had eaten lunch.", nach: ["They hadn't eaten lunch.", "They had not eaten lunch."] },
      { e: "neg",      a: "Make the sentence negative:", von: "We had heard about apartheid.", nach: ["We hadn't heard about apartheid.", "We had not heard about apartheid."] },
      { e: "neg",      a: "Make the sentence negative:", von: "Tom had finished his work.", nach: ["Tom hadn't finished his work.", "Tom had not finished his work."] },
      { e: "neg",      a: "Make the sentence negative:", von: "The rangers had found the poachers.", nach: ["The rangers hadn't found the poachers.", "The rangers had not found the poachers."] },
      { e: "frage",    a: "Ask a question:", von: "They had been to Cape Town.", nach: ["Had they been to Cape Town?"] },
      { e: "frage",    a: "Ask a question:", von: "Mia had found the key.", nach: ["Had Mia found the key?"] },
      { e: "frage",    a: "Ask a question:", von: "The rangers had seen the leopard.", nach: ["Had the rangers seen the leopard?"] },
      { e: "frage",    a: "Ask a question:", von: "The tourists had paid for the safari.", nach: ["Had the tourists paid for the safari?"] },
      { e: "frage",    a: "Ask a question with “where” (Where …):", von: "She had lived somewhere else before.", nach: ["Where had she lived before?"] },
      { e: "aussage",  a: "Use the past perfect (When the rangers found the baby rhino, its mother …):", von: "The baby rhino's mother dies.", nach: ["When the rangers found the baby rhino, its mother had died."] },
      { e: "aussage",  a: "Use the past perfect (When I came out, someone …):", von: "Someone steals my bike.", nach: ["When I came out, someone had stolen my bike."] },
      { e: "aussage",  a: "Use the past perfect (When the police arrived, the protesters …):", von: "The protesters go home.", nach: ["When the police arrived, the protesters had gone home.", "When the police arrived, the protesters had already gone home."] },
      { e: "aussage",  a: "Use the past perfect (When we got up, the wind …):", von: "The wind breaks the fence.", nach: ["When we got up, the wind had broken the fence."] },
      { e: "aussage",  a: "Use the past perfect (When I got home, my brother …):", von: "My brother eats all the cake.", nach: ["When I got home, my brother had eaten all the cake."] }
    ],
    zuordnen: {
      kategorien: ["past perfect", "simple past", "present perfect"],
      woerter: [
        { text: "had seen", ziel: "past perfect" }, { text: "hadn't eaten", ziel: "past perfect" }, { text: "had gone", ziel: "past perfect" }, { text: "had never been", ziel: "past perfect" },
        { text: "saw", ziel: "simple past" }, { text: "ate", ziel: "simple past" }, { text: "went", ziel: "simple past" }, { text: "didn't go", ziel: "simple past" },
        { text: "has seen", ziel: "present perfect" }, { text: "have eaten", ziel: "present perfect" }, { text: "has gone", ziel: "present perfect" }, { text: "haven't been", ziel: "present perfect" }
      ]
    },
    erklaerungen: {
      satzpool: {
        aussage:  "Past perfect (Vorvergangenheit): had + 3rd form. It shows what happened before another action in the past. Example: {BEISPIEL}",
        neg:      "Negative (Verneinung): hadn't / had not + 3rd form, or had never + 3rd form. Example: {BEISPIEL}",
        frage:    "Questions: Had + subject + 3rd form …? With question words: Where had you …? Example: {BEISPIEL}",
        kontrast: "The earlier action → past perfect (had + 3rd form). The later action → simple past. Example: {BEISPIEL}",
        signal:   "Signal words (Signalwörter): already, just, never, yet (in negative sentences), after, before, when, by the time. Example: {BEISPIEL}",
        zuordnen: "past perfect = had + 3rd form. simple past = 2nd form (or didn't + verb). present perfect = have / has + 3rd form."
      }
    }
  },

  // ---------- Klasse 9, Unit 3: Passiv im simple past (G7) ----------
  //   mit und ohne by, Fragen, Verneinung, Vergleich mit dem Passiv im simple present (Vorgaben der Lehrkraft)
  "9-G7": {
    saetze: [
      { e: "aussage", t: "The national park ___ in 1926.", h: "create", r: ["was created"], f: ["is created", "was create"], fehler: { ersatz: "was create", wort: "create", loesung: ["created"] } },
      { e: "aussage", t: "Many rhinos ___ by poachers last year.", h: "kill", r: ["were killed"], f: ["was killed", "are killed"], fehler: { ersatz: "was killed", wort: "was", loesung: ["were"] } },
      { e: "aussage", t: "The first diamond in South Africa ___ in 1867.", h: "find", r: ["was found"], f: ["was finded", "were found"], fehler: { ersatz: "was finded", wort: "finded", loesung: ["found"] } },
      { e: "aussage", t: "Nelson Mandela ___ President in 1994.", h: "elect", r: ["was elected"], f: ["were elected", "is elected"], fehler: { ersatz: "were elected", wort: "were", loesung: ["was"] } },
      { e: "aussage", t: "The new primary school ___ last year.", h: "build", r: ["was built"], f: ["was builded", "is built"], fehler: { ersatz: "was builded", wort: "builded", loesung: ["built"] } },
      { e: "by",      t: "The protesters ___ by the police.", h: "warn", r: ["were warned"], f: ["was warned", "were warn"], fehler: { ersatz: "were warn", wort: "warn", loesung: ["warned"] } },
      { e: "by",      t: "The baby rhino ___ by two rangers.", h: "find", r: ["was found"], f: ["were found", "was find"], fehler: { ersatz: "was find", wort: "find", loesung: ["found"] } },
      { e: "by",      t: "The book “Long Walk to Freedom” ___ by Nelson Mandela.", h: "write", r: ["was written"], f: ["was wrote", "is writing"], fehler: { ersatz: "was wrote", wort: "wrote", loesung: ["written"] } },
      { e: "by",      t: "The windows ___ by the storm.", h: "break", r: ["were broken"], f: ["was broken", "were broke"], fehler: { ersatz: "were broke", wort: "broke", loesung: ["broken"] } },
      { e: "by",      t: "The thieves ___ by a security guard.", h: "catch", r: ["were caught"], f: ["were catched", "was caught"], fehler: { ersatz: "were catched", wort: "catched", loesung: ["caught"] } },
      { e: "by",      t: "The poachers ___ by the rangers.", h: "stop", r: ["were stopped"], f: ["were stoped", "was stopped"], fehler: { ersatz: "were stoped", wort: "stoped", loesung: ["stopped"] } },
      { e: "neg",     t: "The tourists ___ in the accident.", h: "not / hurt", r: ["weren't hurt", "were not hurt"], f: ["didn't hurt", "wasn't hurt"], fehler: { ersatz: "didn't hurt", wort: "didn't", loesung: ["weren't", "were not"] } },
      { e: "neg",     t: "The stolen diamonds ___.", h: "not / find", r: ["weren't found", "were not found"], f: ["didn't found", "weren't find"], fehler: { ersatz: "weren't find", wort: "find", loesung: ["found"] } },
      { e: "neg",     t: "During apartheid, black people ___ to vote.", h: "not / allow", r: ["weren't allowed", "were not allowed"], f: ["didn't allowed", "wasn't allowed"], fehler: { ersatz: "didn't allowed", wort: "didn't", loesung: ["weren't", "were not"] } },
      { e: "neg",     t: "The email ___ because the internet was down.", h: "not / send", r: ["wasn't sent", "was not sent"], f: ["wasn't send", "didn't sent"], fehler: { ersatz: "wasn't send", wort: "send", loesung: ["sent"] } },
      { e: "neg",     t: "The windows ___ yesterday, so they are still dirty.", h: "not / clean", r: ["weren't cleaned", "were not cleaned"], f: ["didn't cleaned", "wasn't cleaned"], fehler: { ersatz: "didn't cleaned", wort: "didn't", loesung: ["weren't", "were not"] } },
      { e: "frage",   t: "___ the park created in 1926?", h: "be", r: ["Was"], f: ["Did", "Were"], fehler: "Did" },
      { e: "frage",   t: "___ the rhinos killed by poachers?", h: "be", r: ["Were"], f: ["Was", "Did"], fehler: "Did" },
      { e: "frage",   t: "When ___ the first diamond found?", h: "be", r: ["was"], f: ["did", "were"], fehler: "did" },
      { e: "frage",   t: "Where ___ the stolen jewellery found?", h: "be", r: ["was"], f: ["were", "did"], fehler: "did" },
      { e: "frage",   t: "By whom ___ the book written?", h: "be", r: ["was"], f: ["did", "were"], fehler: "did" },
      { e: "zeit",    t: "Today, the park ___ by thousands of tourists every year.", h: "visit", r: ["is visited"], f: ["was visited", "is visit"], fehler: { ersatz: "was visited", wort: "was", loesung: ["is"] } },
      { e: "zeit",    t: "The new constitution ___ in 1996.", h: "sign", r: ["was signed"], f: ["is signed", "was sign"], fehler: { ersatz: "is signed", wort: "is", loesung: ["was"] } },
      { e: "zeit",    t: "Nowadays, rhinos ___ by rangers day and night.", h: "protect", r: ["are protected"], f: ["were protected", "are protect"], fehler: { ersatz: "were protected", wort: "were", loesung: ["are"] } },
      { e: "zeit",    t: "Last night two poachers ___ in the park.", h: "catch", r: ["were caught"], f: ["are caught", "were catched"], fehler: { ersatz: "are caught", wort: "are", loesung: ["were"] } },
      { e: "zeit",    t: "Every day, the animals ___ by the rangers.", h: "count", r: ["are counted"], f: ["were counted", "are count"], fehler: { ersatz: "were counted", wort: "were", loesung: ["are"] } },
      { e: "zeit",    t: "Yesterday a lion ___ near the road.", h: "see", r: ["was seen"], f: ["is seen", "was saw"], fehler: { ersatz: "is seen", wort: "is", loesung: ["was"] } },
      { e: "zeit",    t: "English ___ in South Africa today.", h: "speak", r: ["is spoken"], f: ["was spoken", "is speaked"], fehler: { ersatz: "is speaked", wort: "speaked", loesung: ["spoken"] } }
    ],
    umformen: [
      { e: "by",      a: "Use the passive with “by”:", von: "Poachers killed the rhino.", nach: ["The rhino was killed by poachers."] },
      { e: "by",      a: "Use the passive with “by”:", von: "Nelson Mandela wrote the book.", nach: ["The book was written by Nelson Mandela."] },
      { e: "by",      a: "Use the passive with “by”:", von: "The rangers found the baby lion.", nach: ["The baby lion was found by the rangers."] },
      { e: "by",      a: "Use the passive with “by”:", von: "The storm broke the windows.", nach: ["The windows were broken by the storm."] },
      { e: "by",      a: "Use the passive with “by”:", von: "A security guard caught the thieves.", nach: ["The thieves were caught by a security guard."] },
      { e: "by",      a: "Use the passive with “by”:", von: "The headteacher warned the students.", nach: ["The students were warned by the headteacher."] },
      { e: "aussage", a: "Use the passive without “by”:", von: "Someone stole my bike.", nach: ["My bike was stolen."] },
      { e: "aussage", a: "Use the passive without “by”:", von: "They built the school in 2010.", nach: ["The school was built in 2010."] },
      { e: "aussage", a: "Use the passive without “by”:", von: "People found diamonds in 1867.", nach: ["Diamonds were found in 1867."] },
      { e: "aussage", a: "Use the passive without “by”:", von: "Someone opened the window.", nach: ["The window was opened."] },
      { e: "aussage", a: "Use the passive without “by”:", von: "They created the park in 1926.", nach: ["The park was created in 1926."] },
      { e: "neg",     a: "Make the sentence negative:", von: "The diamonds were found.", nach: ["The diamonds weren't found.", "The diamonds were not found."] },
      { e: "neg",     a: "Make the sentence negative:", von: "The tourists were hurt.", nach: ["The tourists weren't hurt.", "The tourists were not hurt."] },
      { e: "neg",     a: "Make the sentence negative:", von: "The email was sent.", nach: ["The email wasn't sent.", "The email was not sent."] },
      { e: "neg",     a: "Make the sentence negative:", von: "The poachers were caught.", nach: ["The poachers weren't caught.", "The poachers were not caught."] },
      { e: "frage",   a: "Ask a question:", von: "The book was written by Mandela.", nach: ["Was the book written by Mandela?"] },
      { e: "frage",   a: "Ask a question:", von: "The rhinos were protected.", nach: ["Were the rhinos protected?"] },
      { e: "frage",   a: "Ask a question with “when” (When …):", von: "The school was built in 2010.", nach: ["When was the school built?"] },
      { e: "frage",   a: "Ask a question with “where” (Where …):", von: "The lion was seen near the river.", nach: ["Where was the lion seen?"] },
      { e: "zeit",    a: "Put the passive sentence into the simple past:", von: "The animals are counted.", nach: ["The animals were counted."] },
      { e: "zeit",    a: "Put the passive sentence into the simple past:", von: "The park is visited by many tourists.", nach: ["The park was visited by many tourists."] },
      { e: "zeit",    a: "Put the passive sentence into the simple past:", von: "English is spoken here.", nach: ["English was spoken here."] },
      { e: "zeit",    a: "Put the passive sentence into the simple present:", von: "The rhinos were protected.", nach: ["The rhinos are protected."] },
      { e: "zeit",    a: "Put the passive sentence into the simple present:", von: "The fence was checked every day.", nach: ["The fence is checked every day."] },
      { e: "zeit",    a: "Use the passive with “by” (simple present):", von: "The rangers count the animals every day.", nach: ["The animals are counted by the rangers every day.", "The animals are counted every day by the rangers."] },
      { e: "zeit",    a: "Use the passive with “by” (simple present):", von: "The rangers protect the rhinos.", nach: ["The rhinos are protected by the rangers."] }
    ],
    zuordnen: {
      kategorien: ["present (is / are + 3rd form)", "past (was / were + 3rd form)"],
      woerter: [
        { text: "is built", ziel: "present (is / are + 3rd form)" }, { text: "are protected", ziel: "present (is / are + 3rd form)" }, { text: "is spoken", ziel: "present (is / are + 3rd form)" },
        { text: "are counted", ziel: "present (is / are + 3rd form)" }, { text: "isn't allowed", ziel: "present (is / are + 3rd form)" }, { text: "are visited", ziel: "present (is / are + 3rd form)" },
        { text: "was built", ziel: "past (was / were + 3rd form)" }, { text: "were protected", ziel: "past (was / were + 3rd form)" }, { text: "was found", ziel: "past (was / were + 3rd form)" },
        { text: "were caught", ziel: "past (was / were + 3rd form)" }, { text: "wasn't sent", ziel: "past (was / were + 3rd form)" }, { text: "were elected", ziel: "past (was / were + 3rd form)" }
      ]
    },
    erklaerungen: {
      satzpool: {
        aussage: "Passive in the simple past (Passiv): was / were + 3rd form. We use it when the action is more important than the person who did it. Example: {BEISPIEL}",
        by:      "If we want to say who did it, we add by + person or thing (von): … by the rangers. Example: {BEISPIEL}",
        neg:     "Negative (Verneinung): wasn't / weren't + 3rd form – not didn't. Example: {BEISPIEL}",
        frage:   "Questions: Was / Were + subject + 3rd form …? With question words: When was …? Where were …? Example: {BEISPIEL}",
        zeit:    "Simple present passive: is / are + 3rd form (today, every day, nowadays). Simple past passive: was / were + 3rd form (yesterday, last year, in 1994). Example: {BEISPIEL}",
        zuordnen: "Present passive: is / are + 3rd form. Past passive: was / were + 3rd form."
      }
    }
  }
};

// =====================================================================
// 4) WÖRTERHILFE: deutsche Bedeutung für erschließbare oder neue Wörter (Antippen zeigt die Bedeutung)
// =====================================================================
K9.woerterhilfe = [
  { en: "towel", de: "Handtuch" }, { en: "dictionary", de: "Wörterbuch" }, { en: "trainers", de: "Turnschuhe" }, { en: "rock", de: "Felsen" },
  { en: "Uluru", de: "Uluru (großer Felsen in Australien)" }, { en: "outback", de: "Outback (Hinterland Australiens)" }, { en: "Aboriginal", de: "Ureinwohner Australiens" },
  { en: "coral", de: "Koralle" }, { en: "reef", de: "Riff" }, { en: "saltwater crocodiles", de: "Salzwasserkrokodile" }, { en: "apprenticeship", de: "Ausbildung, Lehre" },
  { en: "plumber", de: "Klempner/in" }, { en: "receptionist", de: "Empfangsmitarbeiter/in" }, { en: "courier", de: "Kurier/in" },
  { en: "sharks", de: "Haie" }, { en: "hurry", de: "sich beeilen" }, { en: "Murray", de: "Murray (längster Fluss Australiens)" }, { en: "Nile", de: "Nil" },
  { en: "reggae", de: "Reggae (Musik aus Jamaika)" }, { en: "fort", de: "Festung" }, { en: "wave", de: "Welle" }, { en: "glass", de: "Glas" },
  { en: "windy", de: "windig" }, { en: "Tobago", de: "Tobago (Insel in der Karibik)" },
  { en: "escaped", de: "entkam, floh" }, { en: "rented", de: "mieteten, liehen" }, { en: "lying", de: "liegend (lie → lying)" },
  { en: "baboons", de: "Paviane" }, { en: "spider", de: "Spinne" }, { en: "biology", de: "Biologie" }, { en: "popcorn", de: "Popcorn" },
  { en: "Long Walk to Freedom", de: "„Der lange Weg zur Freiheit“ (Buch von Nelson Mandela)" }, { en: "elected", de: "gewählt" },
  { en: "signed", de: "unterschrieben" }, { en: "shouting", de: "rufend, schreiend" }, { en: "rising", de: "aufgehend" }, { en: "amazing", de: "erstaunlich" },
  { en: "Cape Town", de: "Kapstadt" },
  { en: "nowadays", de: "heutzutage" }, { en: "created", de: "gegründet, geschaffen" }, { en: "guests", de: "Gäste" }, { en: "thieves", de: "Diebe" },
  { en: "thousands", de: "Tausende" }, { en: "marks", de: "Noten (Schule)" }, { en: "Kruger National Park", de: "Krüger-Nationalpark" }
];

// =====================================================================
// 5) GENERATOREN
// =====================================================================
K9.generatoren = {
  "9-G1": { baukasten: "9-G1", art: "satzpool" },
  "9-G2": { baukasten: "9-G2", art: "satzpool" },
  "9-G3": { baukasten: "9-G3", art: "satzpool" },
  "9-G4": { baukasten: "9-G4", art: "satzpool" },
  "9-G5": { baukasten: "9-G5", art: "satzpool" },
  "9-G6": { baukasten: "9-G6", art: "satzpool" },
  "9-G7": { baukasten: "9-G7", art: "satzpool" }
};

// =====================================================================
// Klasse 9, Unit 4 (G8–G11)
// =====================================================================
// Hilfe für die indirekte Rede: jede Lösung gilt mit und ohne „that“ sowie mit Kurzform (she is = she's …)
const K9_REDE = (...saetze) => {
  const out = [];
  const kurz = x => x.replace(/\b(he|she|it) is\b/g, "$1's").replace(/\bI am\b/g, "I'm").replace(/\b(we|you|they) are\b/g, "$1're");
  saetze.forEach(x => [x, x.replace(" that ", " ")].forEach(y => [y, kurz(y)].forEach(z => { if(!out.includes(z)) out.push(z); })));
  return out;
};

Object.assign(K9.baukasten, {
  // ---------- Klasse 9, Unit 4: indirekte Rede I – Zeitverschiebung → simple past (G8) ----------
  //   Aussagen, Fragen und Aufforderungen; OHNE Änderung von Orts- und Zeitangaben (kommt in Klasse 10)
  "9-G8": {
    saetze: [
      { e: "shift",  q: "Lena: “I work in a second-hand shop.”",              t: "Lena said that she ___ in a second-hand shop.", r: ["worked"], f: ["works", "work"], fehler: "works" },
      { e: "shift",  q: "Ben: “I don't have any pocket money.”",             t: "Ben said that he ___ have any pocket money.", r: ["didn't", "did not"], f: ["doesn't", "don't"], fehler: { ersatz: "doesn't", wort: "doesn't", loesung: ["didn't", "did not"] } },
      { e: "shift",  q: "The journalist: “The air pollution is terrible.”",  t: "The journalist said that the air pollution ___ terrible.", r: ["was"], f: ["is", "were"], fehler: "is" },
      { e: "shift",  q: "My friends: “We are saving money for new sneakers.”", t: "My friends said that they ___ money for new sneakers.", r: ["were saving"], f: ["are saving", "was saving"], fehler: { ersatz: "are saving", wort: "are", loesung: ["were"] } },
      { e: "shift",  q: "Mia: “I can repair old bikes.”",                    t: "Mia said that she ___ repair old bikes.", r: ["could"], f: ["can", "cans"], fehler: "can" },
      { e: "shift",  q: "Dad: “Plastic packaging is a big problem.”",        t: "Dad said that plastic packaging ___ a big problem.", r: ["was"], f: ["is", "were"], fehler: "is" },
      { e: "shift",  q: "The teacher: “Many people recycle their waste.”",   t: "The teacher told us that many people ___ their waste.", r: ["recycled"], f: ["recycle", "recycles"], fehler: "recycle" },
      { e: "shift",  q: "Tom: “I'm looking for a cheap phone.”",             t: "Tom said that he ___ for a cheap phone.", r: ["was looking"], f: ["is looking", "were looking"], fehler: { ersatz: "is looking", wort: "is", loesung: ["was"] } },
      { e: "shift",  q: "The fortune teller: “You have a great future.”",    t: "The fortune teller told me that I ___ a great future.", r: ["had"], f: ["have", "has"], fehler: "have" },
      { e: "shift",  q: "Zoe: “My brother doesn't like shopping.”",          t: "Zoe said that her brother ___ like shopping.", r: ["didn't", "did not"], f: ["doesn't", "don't"], fehler: { ersatz: "doesn't", wort: "doesn't", loesung: ["didn't", "did not"] } },
      { e: "shift",  q: "The journalists: “We want freedom of speech.”",     t: "The journalists said that they ___ freedom of speech.", r: ["wanted"], f: ["want", "wants"], fehler: "want" },
      { e: "shift",  q: "Lisa: “The solar panels produce a lot of energy.”", t: "Lisa said that the solar panels ___ a lot of energy.", r: ["produced"], f: ["produce", "produces"], fehler: "produce" },
      { e: "shift",  q: "Grandpa: “I can't read small letters.”",            t: "Grandpa said that he ___ read small letters.", r: ["couldn't", "could not"], f: ["can't", "didn't"], fehler: { ersatz: "can't", wort: "can't", loesung: ["couldn't", "could not"] } },
      { e: "frage",  q: "The shop assistant: “Do you need a bag?”",          t: "The shop assistant asked ___ I needed a bag.", r: ["if", "whether"], f: ["that", "do"], fehler: "that" },
      { e: "frage",  q: "Mia: “Where do you buy your clothes?”",             t: "Mia asked where I ___ my clothes.", r: ["bought"], f: ["buy", "did buy"], fehler: "buy" },
      { e: "frage",  q: "Ben: “Are you hungry?”",                            t: "Ben asked if I ___ hungry.", r: ["was"], f: ["am", "were"], fehler: "am" },
      { e: "frage",  q: "The journalist: “What do people think about the new mall?”", t: "The journalist asked what people ___ about the new mall.", r: ["thought"], f: ["think", "did think"], fehler: "think" },
      { e: "frage",  q: "My aunt: “Why are you so tired?”",                  t: "My aunt asked why I ___ so tired.", r: ["was"], f: ["am", "were"], fehler: "am" },
      { e: "frage",  q: "Tom: “Can you help me?”",                           t: "Tom asked if I ___ help him.", r: ["could"], f: ["can", "did"], fehler: "can" },
      { e: "frage",  q: "The teacher: “Who knows the answer?”",              t: "The teacher asked who ___ the answer.", r: ["knew"], f: ["knows", "did know"], fehler: "knows" },
      { e: "frage",  q: "Lena: “How much does the jacket cost?”",            t: "Lena asked how much the jacket ___.", r: ["cost"], f: ["costs", "did cost"], fehler: "costs" },
      { e: "frage",  q: "Zoe: “Does your school have solar panels?”",        t: "Zoe asked ___ our school had solar panels.", r: ["if", "whether"], f: ["does", "that"], fehler: "does" },
      { e: "befehl", q: "Mum: “Turn off the lights!”",                       t: "Mum told me ___ off the lights.", r: ["to turn"], f: ["turn", "turning"], fehler: { ersatz: "turning", wort: "turning", loesung: ["to turn"] } },
      { e: "befehl", q: "The teacher: “Don't use your phones!”",             t: "The teacher told us ___ our phones.", r: ["not to use"], f: ["don't use", "not use"], fehler: { ersatz: "don't use", wort: "don't", loesung: ["not to"] } },
      { e: "befehl", q: "Dad: “Please recycle the bottles.”",                t: "Dad asked me ___ the bottles.", r: ["to recycle"], f: ["recycle", "recycling"], fehler: { ersatz: "recycling", wort: "recycling", loesung: ["to recycle"] } },
      { e: "befehl", q: "The ranger: “Don't throw your plastic bottles away!”", t: "The ranger told the tourists ___ their plastic bottles away.", r: ["not to throw"], f: ["don't throw", "not throw"], fehler: { ersatz: "don't throw", wort: "don't", loesung: ["not to"] } },
      { e: "befehl", q: "Mia: “Please wait for me.”",                        t: "Mia asked us ___ for her.", r: ["to wait"], f: ["wait", "waiting"], fehler: { ersatz: "waiting", wort: "waiting", loesung: ["to wait"] } },
      { e: "befehl", q: "The coach: “Don't be late!”",                       t: "The coach told us ___ late.", r: ["not to be"], f: ["don't be", "not be"], fehler: { ersatz: "don't be", wort: "don't", loesung: ["not to"] } }
    ],
    umformen: [
      { e: "shift",  a: "Report with “said”:", von: "Lena: “I love second-hand clothes.”",      nach: K9_REDE("Lena said that she loved second-hand clothes.") },
      { e: "shift",  a: "Report with “said”:", von: "Ben: “I am tired.”",                       nach: K9_REDE("Ben said that he was tired.") },
      { e: "shift",  a: "Report with “said”:", von: "Mia: “My parents don't have a car.”",      nach: K9_REDE("Mia said that her parents didn't have a car.", "Mia said that her parents did not have a car.") },
      { e: "shift",  a: "Report with “said”:", von: "Tom: “I'm reading a book about smog.”",    nach: K9_REDE("Tom said that he was reading a book about smog.") },
      { e: "shift",  a: "Report with “said”:", von: "Zoe: “I can't find my sneakers.”",         nach: K9_REDE("Zoe said that she couldn't find her sneakers.", "Zoe said that she could not find her sneakers.") },
      { e: "shift",  a: "Report with “said”:", von: "The journalist: “The newspaper wants the truth.”", nach: K9_REDE("The journalist said that the newspaper wanted the truth.") },
      { e: "shift",  a: "Report with “said”:", von: "Grandma: “I don't understand the internet.”", nach: K9_REDE("Grandma said that she didn't understand the internet.", "Grandma said that she did not understand the internet.") },
      { e: "shift",  a: "Report with “said”:", von: "The kids: “We are saving money.”",         nach: K9_REDE("The kids said that they were saving money.") },
      { e: "frage",  a: "Report the question with “asked”:", von: "Mia: “Do you like the new mall?”", nach: ["Mia asked if I liked the new mall.", "Mia asked whether I liked the new mall.", "Mia asked if we liked the new mall.", "Mia asked whether we liked the new mall."] },
      { e: "frage",  a: "Report the question with “asked”:", von: "Ben: “Where do you live?”",  nach: ["Ben asked where I lived.", "Ben asked where we lived."] },
      { e: "frage",  a: "Report the question with “asked”:", von: "The teacher: “Why are you late?”", nach: ["The teacher asked why I was late.", "The teacher asked why we were late."] },
      { e: "frage",  a: "Report the question with “asked”:", von: "Tom: “Can you lend me some money?”", nach: ["Tom asked if I could lend him some money.", "Tom asked whether I could lend him some money."] },
      { e: "frage",  a: "Report the question with “asked”:", von: "Lena: “What time is it?”",  nach: ["Lena asked what time it was."] },
      { e: "frage",  a: "Report the question with “asked”:", von: "Dad: “Who wants pizza?”",   nach: ["Dad asked who wanted pizza."] },
      { e: "frage",  a: "Report the question with “asked”:", von: "Zoe: “Is the shop open?”",  nach: ["Zoe asked if the shop was open.", "Zoe asked whether the shop was open."] },
      { e: "frage",  a: "Report the question with “asked”:", von: "The journalist: “How do you recycle your waste?”", nach: ["The journalist asked how I recycled my waste.", "The journalist asked how we recycled our waste."] },
      { e: "befehl", a: "Report the command (Mum told me …):", von: "Mum: “Clean your room!”",  nach: ["Mum told me to clean my room."] },
      { e: "befehl", a: "Report the command (The teacher told us …):", von: "The teacher: “Open your books!”", nach: ["The teacher told us to open our books."] },
      { e: "befehl", a: "Report the command (Dad told me …):", von: "Dad: “Don't buy so much plastic!”", nach: ["Dad told me not to buy so much plastic."] },
      { e: "befehl", a: "Report the command (The coach told us …):", von: "The coach: “Don't give up!”", nach: ["The coach told us not to give up."] },
      { e: "befehl", a: "Report the request (Mia asked me …):", von: "Mia: “Please help me.”", nach: ["Mia asked me to help her."] },
      { e: "befehl", a: "Report the request (Tom asked me …):", von: "Tom: “Please close the window.”", nach: ["Tom asked me to close the window."] },
      { e: "befehl", a: "Report the request (The ranger asked us …):", von: "The ranger: “Please don't feed the animals.”", nach: ["The ranger asked us not to feed the animals."] },
      { e: "befehl", a: "Report the request (Lena asked me …):", von: "Lena: “Please call me later.”", nach: ["Lena asked me to call her later."] },
      { e: "befehl", a: "Report the command (Grandma told me …):", von: "Grandma: “Don't forget my birthday!”", nach: ["Grandma told me not to forget her birthday."] }
    ],
    zuordnen: {
      kategorien: ["… said (that) …", "… asked if / where …", "… told me to …"],
      woerter: [
        { text: "“I'm hungry.”", ziel: "… said (that) …" }, { text: "“The shop is closed.”", ziel: "… said (that) …" }, { text: "“We like the mall.”", ziel: "… said (that) …" }, { text: "“I can swim.”", ziel: "… said (that) …" },
        { text: "“Are you OK?”", ziel: "… asked if / where …" }, { text: "“Do you recycle?”", ziel: "… asked if / where …" }, { text: "“Where is the bus?”", ziel: "… asked if / where …" }, { text: "“Is it expensive?”", ziel: "… asked if / where …" },
        { text: "“Close the door!”", ziel: "… told me to …" }, { text: "“Don't be late!”", ziel: "… told me to …" }, { text: "“Sit down!”", ziel: "… told me to …" }, { text: "“Don't touch it!”", ziel: "… told me to …" }
      ]
    },
    erklaerungen: {
      satzpool: {
        shift:  "Reported speech (indirekte Rede): after said / told the simple present becomes the simple past (Zeitverschiebung): am / is → was, are → were, can → could, is working → was working. Example: {BEISPIEL}",
        frage:  "Reported questions with asked: if / whether or the question word + normal word order (Wortstellung), no do / does: She asked what I wanted. Example: {BEISPIEL}",
        befehl: "Reported commands and requests (Aufforderungen, Bitten): told / asked + person + to + verb. Negative: not to + verb. Example: {BEISPIEL}",
        zuordnen: "Statements → said (that) …, questions → asked if / asked where …, commands → told … to / not to …"
      }
    }
  },

  // ---------- Klasse 9, Unit 4: indirekte Rede II – Zeitverschiebung → past perfect (G9) ----------
  //   simple past und present perfect → past perfect, auch Fragen; ohne will → would (Vorgabe der Lehrkraft)
  "9-G9": {
    saetze: [
      { e: "past",    q: "Lena: “I bought a second-hand bike.”",         t: "Lena said that she ___ a second-hand bike.", r: ["had bought"], f: ["has bought", "had buyed"], fehler: { ersatz: "has bought", wort: "has", loesung: ["had"] } },
      { e: "past",    q: "Ben: “I lost my wallet.”",                     t: "Ben said that he ___ his wallet.", r: ["had lost"], f: ["has lost", "had losed"], fehler: { ersatz: "had losed", wort: "losed", loesung: ["lost"] } },
      { e: "past",    q: "The journalist: “The police arrested three protesters.”", t: "The journalist said that the police ___ three protesters.", r: ["had arrested"], f: ["has arrested", "had arrest"], fehler: { ersatz: "had arrest", wort: "arrest", loesung: ["arrested"] } },
      { e: "past",    q: "Mia: “We went to the new mall.”",              t: "Mia said that they ___ to the new mall.", r: ["had gone"], f: ["had went", "have gone"], fehler: { ersatz: "had went", wort: "went", loesung: ["gone"] } },
      { e: "past",    q: "Tom: “I didn't see the fortune teller.”",      t: "Tom said that he ___ the fortune teller.", r: ["hadn't seen", "had not seen"], f: ["didn't saw", "hadn't saw"], fehler: { ersatz: "hadn't saw", wort: "saw", loesung: ["seen"] } },
      { e: "past",    q: "Zoe: “My parents sold our old car.”",          t: "Zoe said that her parents ___ their old car.", r: ["had sold"], f: ["have sold", "had selled"], fehler: { ersatz: "had selled", wort: "selled", loesung: ["sold"] } },
      { e: "past",    q: "Grandpa: “I worked in a power plant.”",        t: "Grandpa told us that he ___ in a power plant.", r: ["had worked"], f: ["has worked", "had work"], fehler: { ersatz: "had work", wort: "work", loesung: ["worked"] } },
      { e: "past",    q: "The kids: “We didn't understand the chart.”",  t: "The kids said that they ___ the chart.", r: ["hadn't understood", "had not understood"], f: ["hadn't understand", "didn't understood"], fehler: { ersatz: "hadn't understand", wort: "understand", loesung: ["understood"] } },
      { e: "past",    q: "Lisa: “I wrote an article about pollution.”",  t: "Lisa said that she ___ an article about pollution.", r: ["had written"], f: ["had wrote", "has written"], fehler: { ersatz: "had wrote", wort: "wrote", loesung: ["written"] } },
      { e: "perfect", q: "Ben: “I have found a cheap phone online.”",    t: "Ben said that he ___ a cheap phone online.", r: ["had found"], f: ["has found", "have found"], fehler: { ersatz: "has found", wort: "has", loesung: ["had"] } },
      { e: "perfect", q: "Mia: “I have never been to New York.”",        t: "Mia said that she ___ to New York.", r: ["had never been"], f: ["has never been", "had never be"], fehler: { ersatz: "has never been", wort: "has", loesung: ["had"] } },
      { e: "perfect", q: "The scientists: “We have reduced the smog.”",  t: "The scientists said that they ___ the smog.", r: ["had reduced"], f: ["have reduced", "had reduce"], fehler: { ersatz: "have reduced", wort: "have", loesung: ["had"] } },
      { e: "perfect", q: "Tom: “I haven't finished my homework.”",       t: "Tom said that he ___ his homework.", r: ["hadn't finished", "had not finished"], f: ["hasn't finished", "haven't finished"], fehler: { ersatz: "hasn't finished", wort: "hasn't", loesung: ["hadn't", "had not"] } },
      { e: "perfect", q: "Lena: “My sister has donated her old clothes.”", t: "Lena said that her sister ___ her old clothes.", r: ["had donated"], f: ["has donated", "had donate"], fehler: { ersatz: "had donate", wort: "donate", loesung: ["donated"] } },
      { e: "perfect", q: "Zoe: “We have installed solar panels.”",       t: "Zoe said that they ___ solar panels.", r: ["had installed"], f: ["have installed", "had install"], fehler: { ersatz: "have installed", wort: "have", loesung: ["had"] } },
      { e: "perfect", q: "Dad: “I've lost my keys.”",                    t: "Dad said that he ___ his keys.", r: ["had lost"], f: ["has lost", "had losed"], fehler: { ersatz: "has lost", wort: "has", loesung: ["had"] } },
      { e: "perfect", q: "The kids: “We haven't eaten yet.”",            t: "The kids said that they ___ yet.", r: ["hadn't eaten", "had not eaten"], f: ["haven't eaten", "hadn't ate"], fehler: { ersatz: "hadn't ate", wort: "ate", loesung: ["eaten"] } },
      { e: "perfect", q: "Grandma: “I've already bought the presents.”", t: "Grandma said that she ___ the presents.", r: ["had already bought"], f: ["has already bought", "had already buyed"], fehler: { ersatz: "has already bought", wort: "has", loesung: ["had"] } },
      { e: "frage",   q: "Mia: “Did you see the film?”",                 t: "Mia asked if I ___ the film.", r: ["had seen"], f: ["have seen", "had saw"], fehler: { ersatz: "had saw", wort: "saw", loesung: ["seen"] } },
      { e: "frage",   q: "Ben: “Where have you been?”",                  t: "Ben asked where I ___.", r: ["had been"], f: ["have been", "had be"], fehler: { ersatz: "have been", wort: "have", loesung: ["had"] } },
      { e: "frage",   q: "The teacher: “Who broke the window?”",         t: "The teacher asked who ___ the window.", r: ["had broken"], f: ["had broke", "has broken"], fehler: { ersatz: "had broke", wort: "broke", loesung: ["broken"] } },
      { e: "frage",   q: "Lena: “Have you ever met a journalist?”",      t: "Lena asked if I ___ a journalist.", r: ["had ever met"], f: ["have ever met", "had ever meet"], fehler: { ersatz: "had ever meet", wort: "meet", loesung: ["met"] } },
      { e: "frage",   q: "Dad: “What did you buy?”",                     t: "Dad asked what I ___.", r: ["had bought"], f: ["have bought", "had buyed"], fehler: { ersatz: "had buyed", wort: "buyed", loesung: ["bought"] } },
      { e: "frage",   q: "Zoe: “Did your brother pass the test?”",       t: "Zoe asked ___ my brother had passed the test.", r: ["if", "whether"], f: ["that", "did"], fehler: "that" },
      { e: "frage",   q: "Tom: “Why did you leave so early?”",           t: "Tom asked why I ___ so early.", r: ["had left"], f: ["have left", "had leaved"], fehler: { ersatz: "had leaved", wort: "leaved", loesung: ["left"] } },
      { e: "frage",   q: "The police officer: “Have you seen the thief?”", t: "The police officer asked ___ we had seen the thief.", r: ["if", "whether"], f: ["that", "have"], fehler: "that" }
    ],
    umformen: [
      { e: "past",    a: "Report with “said” (past perfect):", von: "Lena: “I bought new sneakers.”",       nach: K9_REDE("Lena said that she had bought new sneakers.") },
      { e: "past",    a: "Report with “said” (past perfect):", von: "Ben: “I missed the bus.”",             nach: K9_REDE("Ben said that he had missed the bus.") },
      { e: "past",    a: "Report with “said” (past perfect):", von: "Mia: “We visited the new mall.”",      nach: K9_REDE("Mia said that they had visited the new mall.", "Mia said that we had visited the new mall.") },
      { e: "past",    a: "Report with “said” (past perfect):", von: "Tom: “I didn't hear the news.”",       nach: K9_REDE("Tom said that he hadn't heard the news.", "Tom said that he had not heard the news.") },
      { e: "past",    a: "Report with “said” (past perfect):", von: "Grandpa: “I found an old photo.”",     nach: K9_REDE("Grandpa said that he had found an old photo.") },
      { e: "past",    a: "Report with “said” (past perfect):", von: "Zoe: “My brother broke his leg.”",     nach: K9_REDE("Zoe said that her brother had broken his leg.") },
      { e: "past",    a: "Report with “said” (past perfect):", von: "The journalist: “I wrote about human rights.”", nach: K9_REDE("The journalist said that she had written about human rights.", "The journalist said that he had written about human rights.") },
      { e: "perfect", a: "Report with “said” (past perfect):", von: "Lisa: “I have finished my project.”",  nach: K9_REDE("Lisa said that she had finished her project.") },
      { e: "perfect", a: "Report with “said” (past perfect):", von: "Ben: “I have never seen smog.”",       nach: K9_REDE("Ben said that he had never seen smog.") },
      { e: "perfect", a: "Report with “said” (past perfect):", von: "The kids: “We have recycled all the bottles.”", nach: K9_REDE("The kids said that they had recycled all the bottles.") },
      { e: "perfect", a: "Report with “said” (past perfect):", von: "Mia: “I haven't found a job.”",        nach: K9_REDE("Mia said that she hadn't found a job.", "Mia said that she had not found a job.") },
      { e: "perfect", a: "Report with “said” (past perfect):", von: "Dad: “I have sold my old car.”",       nach: K9_REDE("Dad said that he had sold his old car.") },
      { e: "perfect", a: "Report with “said” (past perfect):", von: "Tom: “I've already done my homework.”", nach: K9_REDE("Tom said that he had already done his homework.") },
      { e: "perfect", a: "Report with “said” (past perfect):", von: "Lena: “My parents have bought an electric car.”", nach: K9_REDE("Lena said that her parents had bought an electric car.") },
      { e: "frage",   a: "Report the question with “asked” (past perfect):", von: "Mia: “Did you like the film?”", nach: ["Mia asked if I had liked the film.", "Mia asked whether I had liked the film.", "Mia asked if we had liked the film.", "Mia asked whether we had liked the film."] },
      { e: "frage",   a: "Report the question with “asked” (past perfect):", von: "Ben: “Where did you go?”", nach: ["Ben asked where I had gone.", "Ben asked where we had gone."] },
      { e: "frage",   a: "Report the question with “asked” (past perfect):", von: "Zoe: “Have you finished?”", nach: ["Zoe asked if I had finished.", "Zoe asked whether I had finished.", "Zoe asked if we had finished.", "Zoe asked whether we had finished."] },
      { e: "frage",   a: "Report the question with “asked” (past perfect):", von: "Tom: “What did you see?”", nach: ["Tom asked what I had seen.", "Tom asked what we had seen."] },
      { e: "frage",   a: "Report the question with “asked” (past perfect):", von: "The teacher: “Who took my pen?”", nach: ["The teacher asked who had taken her pen.", "The teacher asked who had taken his pen."] },
      { e: "frage",   a: "Report the question with “asked” (past perfect):", von: "Lisa: “Why did you leave?”", nach: ["Lisa asked why I had left.", "Lisa asked why we had left."] },
      { e: "frage",   a: "Report the question with “asked” (past perfect):", von: "Dad: “Have you ever been to London?”", nach: ["Dad asked if I had ever been to London.", "Dad asked whether I had ever been to London.", "Dad asked if we had ever been to London.", "Dad asked whether we had ever been to London."] },
      { e: "frage",   a: "Report the question with “asked” (past perfect):", von: "Grandma: “Did you buy the presents?”", nach: ["Grandma asked if I had bought the presents.", "Grandma asked whether I had bought the presents.", "Grandma asked if we had bought the presents.", "Grandma asked whether we had bought the presents."] },
      { e: "frage",   a: "Report the question with “asked” (past perfect):", von: "The journalist: “How did you start the charity?”", nach: ["The journalist asked how I had started the charity.", "The journalist asked how we had started the charity."] },
      { e: "frage",   a: "Report the question with “asked” (past perfect):", von: "Lena: “Has your brother found his phone?”", nach: ["Lena asked if my brother had found his phone.", "Lena asked whether my brother had found his phone."] },
      { e: "frage",   a: "Report the question with “asked” (past perfect):", von: "Ben: “Did Tom call you?”", nach: ["Ben asked if Tom had called me.", "Ben asked whether Tom had called me.", "Ben asked if Tom had called us.", "Ben asked whether Tom had called us."] }
    ],
    zuordnen: {
      kategorien: ["→ past perfect (had + 3rd form)", "→ simple past"],
      woerter: [
        { text: "“I lost my key.”", ziel: "→ past perfect (had + 3rd form)" }, { text: "“We have seen it.”", ziel: "→ past perfect (had + 3rd form)" },
        { text: "“She bought a car.”", ziel: "→ past perfect (had + 3rd form)" }, { text: "“I've finished.”", ziel: "→ past perfect (had + 3rd form)" },
        { text: "“He didn't come.”", ziel: "→ past perfect (had + 3rd form)" }, { text: "“They have left.”", ziel: "→ past perfect (had + 3rd form)" },
        { text: "“I like it.”", ziel: "→ simple past" }, { text: "“We are tired.”", ziel: "→ simple past" }, { text: "“She works at the mall.”", ziel: "→ simple past" },
        { text: "“I don't know.”", ziel: "→ simple past" }, { text: "“It is cheap.”", ziel: "→ simple past" }, { text: "“They live in York.”", ziel: "→ simple past" }
      ]
    },
    erklaerungen: {
      satzpool: {
        past:    "Reported speech (indirekte Rede): the simple past becomes the past perfect (had + 3rd form): “I lost it.” → She said that she had lost it. Example: {BEISPIEL}",
        perfect: "Reported speech: the present perfect becomes the past perfect: have / has + 3rd form → had + 3rd form. Example: {BEISPIEL}",
        frage:   "Reported questions about the past: asked if / question word + had + 3rd form, normal word order (Wortstellung): He asked what I had done. Example: {BEISPIEL}",
        zuordnen: "simple past and present perfect → past perfect (had + 3rd form). simple present → simple past."
      }
    }
  },

  // ---------- Klasse 9, Unit 4: Zukunft mit will und going to (G10) ----------
  //   mit Gegenüberstellung (Vorgabe der Lehrkraft)
  "9-G10": {
    saetze: [
      { e: "plan",      t: "I've saved enough money. I ___ new sneakers next week.", h: "buy", r: ["am going to buy", "'m going to buy"], f: ["will buy", "am going buy"], fehler: { ersatz: "am going buy", wort: "buy", loesung: ["to buy"] } },
      { e: "plan",      t: "We've already got the tickets. We ___ to the concert on Saturday.", h: "go", r: ["are going to go", "'re going to go"], f: ["will go", "are going go"], fehler: { ersatz: "are going to went", wort: "went", loesung: ["go"] } },
      { e: "plan",      t: "Lena wants to help the environment. She ___ her old clothes to a charity.", h: "give", r: ["is going to give", "'s going to give"], f: ["will give", "is going give"], fehler: { ersatz: "is going to gives", wort: "gives", loesung: ["give"] } },
      { e: "plan",      t: "My parents have decided: they ___ an electric car.", h: "buy", r: ["are going to buy", "'re going to buy"], f: ["will buy", "is going to buy"], fehler: { ersatz: "is going to buy", wort: "is", loesung: ["are"] } },
      { e: "plan",      t: "Tom has already applied. He ___ a journalist.", h: "become", r: ["is going to become", "'s going to become"], f: ["will become", "is going to became"], fehler: { ersatz: "is going to became", wort: "became", loesung: ["become"] } },
      { e: "plan",      t: "I've decided. I ___ in the new mall. It's too expensive.", h: "not / shop", r: ["am not going to shop", "'m not going to shop"], f: ["won't shopping", "am not going shop"], fehler: { ersatz: "am not going shop", wort: "shop", loesung: ["to shop"] } },
      { e: "plan",      t: "Lisa has bought some paint. She ___ her room.", h: "paint", r: ["is going to paint", "'s going to paint"], f: ["will paint", "is going paint"], fehler: { ersatz: "is going to painted", wort: "painted", loesung: ["paint"] } },
      { e: "plan",      t: "Tom has got a new camera. He ___ photos of the city.", h: "take", r: ["is going to take", "'s going to take"], f: ["will take", "is going take"], fehler: { ersatz: "is going to took", wort: "took", loesung: ["take"] } },
      { e: "anzeichen", t: "Look at those black clouds! It ___.", h: "rain", r: ["is going to rain", "'s going to rain"], f: ["will rain", "is going rain"], fehler: { ersatz: "is going to rains", wort: "rains", loesung: ["rain"] } },
      { e: "anzeichen", t: "Be careful! You're riding too fast. You ___.", h: "fall", r: ["are going to fall", "'re going to fall"], f: ["will fall", "are going fall"], fehler: { ersatz: "are going to fell", wort: "fell", loesung: ["fall"] } },
      { e: "anzeichen", t: "The smog is getting worse. Many people ___ ill.", h: "get", r: ["are going to get", "'re going to get"], f: ["will get", "are going get"], fehler: { ersatz: "is going to get", wort: "is", loesung: ["are"] } },
      { e: "anzeichen", t: "Our team is 3:0 ahead. We ___ the match!", h: "win", r: ["are going to win", "'re going to win"], f: ["will win", "are going win"], fehler: { ersatz: "are going to won", wort: "won", loesung: ["win"] } },
      { e: "anzeichen", t: "Careful! That glass ___.", h: "fall", r: ["is going to fall", "'s going to fall"], f: ["will fall", "is going fall"], fehler: { ersatz: "is going to falls", wort: "falls", loesung: ["fall"] } },
      { e: "spontan",   t: "The phone is ringing. OK, I ___ it.", h: "answer", r: ["will answer", "'ll answer"], f: ["am going to answer", "will answers"], fehler: { ersatz: "will answers", wort: "answers", loesung: ["answer"] } },
      { e: "spontan",   t: "This bag is very heavy. Don't worry, I ___ you.", h: "help", r: ["will help", "'ll help"], f: ["am going to help", "will helps"], fehler: { ersatz: "will helps", wort: "helps", loesung: ["help"] } },
      { e: "spontan",   t: "I'm thirsty. Wait, I ___ you a glass of water.", h: "get", r: ["will get", "'ll get"], f: ["am going to get", "will gets"], fehler: { ersatz: "will gets", wort: "gets", loesung: ["get"] } },
      { e: "spontan",   t: "It's cold in here. I ___ the window.", h: "close", r: ["will close", "'ll close"], f: ["am going to close", "will closing"], fehler: { ersatz: "will closing", wort: "closing", loesung: ["close"] } },
      { e: "spontan",   t: "Oh no, I've forgotten my wallet! No problem. I ___ for the drinks.", h: "pay", r: ["will pay", "'ll pay"], f: ["am going to pay", "will paid"], fehler: { ersatz: "will paid", wort: "paid", loesung: ["pay"] } },
      { e: "spontan",   t: "Wait for me! I ___ with you.", h: "come", r: ["will come", "'ll come"], f: ["am going to come", "will comes"], fehler: { ersatz: "will comes", wort: "comes", loesung: ["come"] } },
      { e: "spontan",   t: "Don't tell Mum. OK, I ___ anything.", h: "not / say", r: ["won't say", "will not say"], f: ["am not going say", "won't says"], fehler: { ersatz: "won't says", wort: "says", loesung: ["say"] } },
      { e: "vermutung", t: "The fortune teller says: “You ___ a lot of money one day.”", h: "make", r: ["will make", "'ll make"], f: ["are making", "will makes"], fehler: { ersatz: "will makes", wort: "makes", loesung: ["make"] } },
      { e: "vermutung", t: "I think people ___ more electric cars in the future.", h: "drive", r: ["will drive", "'ll drive"], f: ["are driving", "will drives"], fehler: { ersatz: "will drives", wort: "drives", loesung: ["drive"] } },
      { e: "vermutung", t: "Don't worry. I'm sure you ___ the test.", h: "pass", r: ["will pass", "'ll pass"], f: ["are passing", "will passes"], fehler: { ersatz: "will passes", wort: "passes", loesung: ["pass"] } },
      { e: "vermutung", t: "In 2050 there ___ more renewable energy, I think.", h: "be", r: ["will be", "'ll be"], f: ["is being", "will is"], fehler: { ersatz: "will is", wort: "is", loesung: ["be"] } },
      { e: "vermutung", t: "I don't think it ___ next week.", h: "snow", r: ["will snow", "'ll snow"], f: ["is snowing", "will snows"], fehler: { ersatz: "will snows", wort: "snows", loesung: ["snow"] } },
      { e: "vermutung", t: "I'm sure the shops ___ open on Sunday.", h: "not / be", r: ["won't be", "will not be"], f: ["won't are", "aren't going be"], fehler: { ersatz: "won't are", wort: "are", loesung: ["be"] } }
    ],
    umformen: [
      { e: "plan",      a: "Write about the plan with “going to” (I …):", von: "Plan: buy a second-hand bike", nach: ["I am going to buy a second-hand bike.", "I'm going to buy a second-hand bike."] },
      { e: "plan",      a: "Write about the plan with “going to” (We …):", von: "Plan: visit New York next summer", nach: ["We are going to visit New York next summer.", "We're going to visit New York next summer."] },
      { e: "plan",      a: "Write about the plan with “going to” (Lena …):", von: "Plan: work in a café", nach: ["Lena is going to work in a café.", "Lena's going to work in a café."] },
      { e: "plan",      a: "Write about the plan with “going to” (My sister …):", von: "Plan: not buy new clothes", nach: ["My sister isn't going to buy new clothes.", "My sister is not going to buy new clothes.", "My sister's not going to buy new clothes."] },
      { e: "plan",      a: "Write about the plan with “going to” (Our school …):", von: "Plan: recycle more plastic", nach: ["Our school is going to recycle more plastic."] },
      { e: "anzeichen", a: "Say what is going to happen (It …):", von: "Look at the sky! It's very dark. (rain)", nach: ["It is going to rain.", "It's going to rain."] },
      { e: "anzeichen", a: "Say what is going to happen (We …):", von: "The bus is full. (not get a seat)", nach: ["We aren't going to get a seat.", "We are not going to get a seat.", "We're not going to get a seat."] },
      { e: "anzeichen", a: "Say what is going to happen (He …):", von: "Tom is running too fast on the ice. (fall)", nach: ["He is going to fall.", "He's going to fall."] },
      { e: "anzeichen", a: "Say what is going to happen (We …):", von: "The match is nearly over and we are 4:0 ahead. (win)", nach: ["We are going to win.", "We're going to win."] },
      { e: "anzeichen", a: "Say what is going to happen (She …):", von: "Mia is driving much too fast. (have an accident)", nach: ["She is going to have an accident.", "She's going to have an accident."] },
      { e: "spontan",   a: "React with “will” (I …):", von: "The phone is ringing. (answer it)", nach: ["I will answer it.", "I'll answer it."] },
      { e: "spontan",   a: "React with “will” (I …):", von: "Your friend is hungry. (make you a sandwich)", nach: ["I will make you a sandwich.", "I'll make you a sandwich."] },
      { e: "spontan",   a: "React with “will” (I …):", von: "It's dark in here. (turn on the light)", nach: ["I will turn on the light.", "I'll turn on the light.", "I will turn the light on.", "I'll turn the light on."] },
      { e: "spontan",   a: "React with “will” (I …):", von: "Your mum's bags are heavy. (carry them)", nach: ["I will carry them.", "I'll carry them."] },
      { e: "spontan",   a: "React with “will” (I …):", von: "Your friend has forgotten his pen. (lend you one)", nach: ["I will lend you one.", "I'll lend you one."] },
      { e: "vermutung", a: "Make a prediction with “will”:", von: "I think / people / use more solar energy", nach: ["I think people will use more solar energy."] },
      { e: "vermutung", a: "Make a prediction with “will”:", von: "I'm sure / you / like the film", nach: ["I'm sure you will like the film.", "I'm sure you'll like the film.", "I am sure you will like the film.", "I am sure you'll like the film."] },
      { e: "vermutung", a: "Make a prediction with “will”:", von: "in 2040 / there / probably / be more electric cars", nach: ["In 2040 there will probably be more electric cars.", "There will probably be more electric cars in 2040."] },
      { e: "vermutung", a: "Make a prediction with “will”:", von: "I don't think / it / snow next week", nach: ["I don't think it will snow next week.", "I don't think it'll snow next week.", "I do not think it will snow next week."] },
      { e: "vermutung", a: "Make a prediction with “will”:", von: "maybe / Tom / become a journalist", nach: ["Maybe Tom will become a journalist."] },
      { e: "neg",       a: "Make the sentence negative:", von: "I'm going to buy a phone.", nach: ["I'm not going to buy a phone.", "I am not going to buy a phone."] },
      { e: "neg",       a: "Make the sentence negative:", von: "We will help you.", nach: ["We won't help you.", "We will not help you."] },
      { e: "neg",       a: "Make the sentence negative:", von: "She is going to work at the mall.", nach: ["She isn't going to work at the mall.", "She is not going to work at the mall.", "She's not going to work at the mall."] },
      { e: "neg",       a: "Make the sentence negative:", von: "It will rain next week.", nach: ["It won't rain next week.", "It will not rain next week."] },
      { e: "neg",       a: "Make the sentence negative:", von: "They are going to visit the fortune teller.", nach: ["They aren't going to visit the fortune teller.", "They are not going to visit the fortune teller.", "They're not going to visit the fortune teller."] }
    ],
    zuordnen: {
      kategorien: ["will (spontaneous / opinion)", "going to (plan / sign)"],
      woerter: [
        { text: "The phone's ringing – I'll get it.", ziel: "will (spontaneous / opinion)" }, { text: "I think it will be sunny.", ziel: "will (spontaneous / opinion)" },
        { text: "I'm sure you'll win.", ziel: "will (spontaneous / opinion)" }, { text: "OK, I'll help you.", ziel: "will (spontaneous / opinion)" }, { text: "Maybe she'll call.", ziel: "will (spontaneous / opinion)" },
        { text: "We've got tickets – we're going to fly.", ziel: "going to (plan / sign)" }, { text: "Look at the clouds – it's going to rain!", ziel: "going to (plan / sign)" },
        { text: "I've decided: I'm going to study.", ziel: "going to (plan / sign)" }, { text: "Careful – you're going to fall!", ziel: "going to (plan / sign)" },
        { text: "She has saved money – she's going to buy a car.", ziel: "going to (plan / sign)" }
      ]
    },
    erklaerungen: {
      satzpool: {
        plan:      "going to = a plan or decision you made before (Absicht, Plan): am / is / are going to + verb. Example: {BEISPIEL}",
        anzeichen: "going to = you can already see a sign (Anzeichen) that something will happen. Example: {BEISPIEL}",
        spontan:   "will = a decision you make at the moment of speaking (spontane Entscheidung), also offers and promises. Example: {BEISPIEL}",
        vermutung: "will = an opinion or a guess about the future (Vermutung, Vorhersage), often with I think, I'm sure, probably, maybe. Example: {BEISPIEL}",
        neg:       "Negative (Verneinung): won't (will not) + verb, am not / isn't / aren't going to + verb. Example: {BEISPIEL}",
        zuordnen:  "will: spontaneous decisions and opinions (I think …, I'm sure …). going to: plans and things you can already see coming."
      }
    }
  },

  // ---------- Klasse 9, Unit 4: Zukunft mit simple present und present progressive (G11) ----------
  //   Fahrpläne/Programme (simple present) und feste Verabredungen (present progressive), auch gemischt
  "9-G11": {
    saetze: [
      { e: "plan",  t: "The train to London ___ at 7.15 tomorrow morning.", h: "leave – timetable", r: ["leaves"], f: ["leave", "is leave"], fehler: "leave" },
      { e: "plan",  t: "The film ___ at 8 p.m. tonight.", h: "start – timetable", r: ["starts"], f: ["start", "is start"], fehler: "start" },
      { e: "plan",  t: "Our flight ___ in New York at six o'clock.", h: "arrive – timetable", r: ["arrives"], f: ["arrive", "arriving"], fehler: "arrive" },
      { e: "plan",  t: "The new mall ___ next Monday at 9 a.m.", h: "open – timetable", r: ["opens"], f: ["open", "opening"], fehler: "open" },
      { e: "plan",  t: "On Saturdays the museum ___ at 5 p.m.", h: "close – timetable", r: ["closes"], f: ["close", "closing"], fehler: "close" },
      { e: "plan",  t: "When ___ the bus to the city centre leave?", h: "do – timetable", r: ["does"], f: ["is", "do"], fehler: "is" },
      { e: "plan",  t: "The concert ___ until 11 p.m.", h: "not / finish – timetable", r: ["doesn't finish", "does not finish"], f: ["don't finish", "isn't finish"], fehler: { ersatz: "don't finish", wort: "don't", loesung: ["doesn't", "does not"] } },
      { e: "plan",  t: "School ___ at eight o'clock tomorrow.", h: "begin – timetable", r: ["begins"], f: ["begin", "beginning"], fehler: "begin" },
      { e: "plan",  t: "The last bus ___ at midnight.", h: "go – timetable", r: ["goes"], f: ["go", "gos"], fehler: "gos" },
      { e: "plan",  t: "What time ___ the shop open on Sunday?", h: "do – timetable", r: ["does"], f: ["is", "do"], fehler: "do" },
      { e: "verab", t: "I ___ Tom at the mall at four o'clock tomorrow.", h: "meet – fixed plan", r: ["am meeting", "'m meeting"], f: ["meeting", "am meet"], fehler: { ersatz: "am meet", wort: "meet", loesung: ["meeting"] } },
      { e: "verab", t: "We ___ to Berlin next weekend. We've already booked the hotel.", h: "fly – fixed plan", r: ["are flying", "'re flying"], f: ["are fly", "is flying"], fehler: { ersatz: "is flying", wort: "is", loesung: ["are"] } },
      { e: "verab", t: "My sister ___ a party on Saturday.", h: "have – fixed plan", r: ["is having", "'s having"], f: ["is haveing", "are having"], fehler: { ersatz: "is haveing", wort: "haveing", loesung: ["having"] } },
      { e: "verab", t: "Lena ___ at the charity shop next Friday.", h: "work – fixed plan", r: ["is working", "'s working"], f: ["is work", "are working"], fehler: { ersatz: "is work", wort: "work", loesung: ["working"] } },
      { e: "verab", t: "I ___ to the dentist tomorrow at 9 a.m.", h: "go – fixed plan", r: ["am going", "'m going"], f: ["going", "am go"], fehler: { ersatz: "am go", wort: "go", loesung: ["going"] } },
      { e: "verab", t: "The workers ___ the solar panels on Monday.", h: "install – fixed plan", r: ["are installing", "'re installing"], f: ["is installing", "are install"], fehler: { ersatz: "are install", wort: "install", loesung: ["installing"] } },
      { e: "verab", t: "We ___ dinner with Grandma tonight.", h: "have – fixed plan", r: ["are having", "'re having"], f: ["are haveing", "is having"], fehler: { ersatz: "is having", wort: "is", loesung: ["are"] } },
      { e: "verab", t: "Mia ___ to the party. She has to work.", h: "not / come – fixed plan", r: ["isn't coming", "is not coming"], f: ["doesn't coming", "aren't coming"], fehler: { ersatz: "doesn't coming", wort: "doesn't", loesung: ["isn't", "is not"] } },
      { e: "verab", t: "___ you doing anything on Saturday evening?", h: "be – fixed plan", r: ["Are"], f: ["Do", "Is"], fehler: "Do" },
      { e: "verab", t: "What ___ Tom doing tomorrow afternoon?", h: "be – fixed plan", r: ["is"], f: ["does", "are"], fehler: "does" },
      { e: "verab", t: "My aunt and uncle ___ us next weekend.", h: "visit – fixed plan", r: ["are visiting", "'re visiting"], f: ["are visit", "is visiting"], fehler: { ersatz: "are visit", wort: "visit", loesung: ["visiting"] } },
      { e: "verab", t: "I ___ my old bike on Saturday. A girl from my class is buying it.", h: "sell – fixed plan", r: ["am selling", "'m selling"], f: ["am sell", "selling"], fehler: { ersatz: "am sell", wort: "sell", loesung: ["selling"] } },
      { e: "mix",   t: "We're meeting at the station because our train ___ at 6.30.", h: "leave – timetable", r: ["leaves"], f: ["leave", "is leave"], fehler: "leave" },
      { e: "mix",   t: "The film starts at eight, so I ___ Ben at half past seven.", h: "meet – fixed plan", r: ["am meeting", "'m meeting"], f: ["am meet", "meeting"], fehler: { ersatz: "am meet", wort: "meet", loesung: ["meeting"] } },
      { e: "mix",   t: "Our plane ___ off at 11 a.m., so we're getting up early.", h: "take – timetable", r: ["takes"], f: ["take", "is take"], fehler: "take" },
      { e: "mix",   t: "The shop opens at nine, and we ___ there at ten.", h: "go – fixed plan", r: ["are going", "'re going"], f: ["are go", "is going"], fehler: { ersatz: "is going", wort: "is", loesung: ["are"] } }
    ],
    umformen: [
      { e: "plan",  a: "Write about the timetable (simple present):", von: "the train to Leeds / leave / at nine o'clock", nach: ["The train to Leeds leaves at nine o'clock."] },
      { e: "plan",  a: "Write about the timetable (simple present):", von: "the film / start / at eight o'clock", nach: ["The film starts at eight o'clock."] },
      { e: "plan",  a: "Write about the timetable (simple present):", von: "our flight / arrive / at six o'clock", nach: ["Our flight arrives at six o'clock."] },
      { e: "plan",  a: "Write about the timetable (simple present):", von: "the museum / not open / on Mondays", nach: ["The museum doesn't open on Mondays.", "The museum does not open on Mondays."] },
      { e: "plan",  a: "Write about the timetable (simple present):", von: "the bus / leave / at half past seven", nach: ["The bus leaves at half past seven."] },
      { e: "plan",  a: "Write about the timetable (simple present):", von: "the concert / finish / at eleven o'clock", nach: ["The concert finishes at eleven o'clock."] },
      { e: "plan",  a: "Ask about the timetable:", von: "when / the train / leave?", nach: ["When does the train leave?"] },
      { e: "plan",  a: "Ask about the timetable:", von: "what time / the shop / open?", nach: ["What time does the shop open?"] },
      { e: "verab", a: "Write about the fixed plan (present progressive):", von: "I / meet / Tom / tomorrow", nach: ["I am meeting Tom tomorrow.", "I'm meeting Tom tomorrow."] },
      { e: "verab", a: "Write about the fixed plan (present progressive):", von: "we / fly / to Rome / on Friday", nach: ["We are flying to Rome on Friday.", "We're flying to Rome on Friday."] },
      { e: "verab", a: "Write about the fixed plan (present progressive):", von: "my sister / have / a party / on Saturday", nach: ["My sister is having a party on Saturday.", "My sister's having a party on Saturday."] },
      { e: "verab", a: "Write about the fixed plan (present progressive):", von: "Lena / work / at the charity shop / next week", nach: ["Lena is working at the charity shop next week.", "Lena's working at the charity shop next week."] },
      { e: "verab", a: "Write about the fixed plan (present progressive):", von: "my grandparents / visit / us / at the weekend", nach: ["My grandparents are visiting us at the weekend."] },
      { e: "verab", a: "Write about the fixed plan (present progressive):", von: "Mia / not come / to the party", nach: ["Mia isn't coming to the party.", "Mia is not coming to the party.", "Mia's not coming to the party."] },
      { e: "verab", a: "Write about the fixed plan (present progressive):", von: "we / not go / to school / on Monday", nach: ["We aren't going to school on Monday.", "We are not going to school on Monday.", "We're not going to school on Monday."] },
      { e: "verab", a: "Ask about the plan (present progressive):", von: "what / you / do / on Saturday?", nach: ["What are you doing on Saturday?"] },
      { e: "verab", a: "Ask about the plan (present progressive):", von: "you / come / to the concert?", nach: ["Are you coming to the concert?"] },
      { e: "verab", a: "Ask about the plan (present progressive):", von: "where / Tom / go / tomorrow?", nach: ["Where is Tom going tomorrow?", "Where's Tom going tomorrow?"] },
      { e: "mix",   a: "Use the simple present and the present progressive:", von: "Our plane (take) off at ten, so we (get) up early tomorrow.", nach: ["Our plane takes off at ten, so we are getting up early tomorrow.", "Our plane takes off at ten, so we're getting up early tomorrow."] },
      { e: "mix",   a: "Use the simple present and the present progressive:", von: "The film (start) at eight, so I (meet) Ben at seven.", nach: ["The film starts at eight, so I am meeting Ben at seven.", "The film starts at eight, so I'm meeting Ben at seven."] },
      { e: "mix",   a: "Use the simple present and the present progressive:", von: "I (play) tennis with Zoe on Saturday. The sports centre (open) at nine.", nach: ["I am playing tennis with Zoe on Saturday. The sports centre opens at nine.", "I'm playing tennis with Zoe on Saturday. The sports centre opens at nine."] },
      { e: "mix",   a: "Use the simple present and the present progressive:", von: "The shop (close) at six, so we (go) there at five.", nach: ["The shop closes at six, so we are going there at five.", "The shop closes at six, so we're going there at five."] },
      { e: "mix",   a: "Use the simple present and the present progressive:", von: "My cousins (arrive) on Sunday. Their bus (get) in at noon.", nach: ["My cousins are arriving on Sunday. Their bus gets in at noon."] },
      { e: "mix",   a: "Use the simple present and the present progressive:", von: "Lena (have) a party tonight. It (start) at seven.", nach: ["Lena is having a party tonight. It starts at seven.", "Lena's having a party tonight. It starts at seven."] },
      { e: "mix",   a: "Use the simple present and the present progressive:", von: "We (meet) at the station. The train (leave) at six.", nach: ["We are meeting at the station. The train leaves at six.", "We're meeting at the station. The train leaves at six."] }
    ],
    zuordnen: {
      kategorien: ["timetable (simple present)", "fixed plan (present progressive)"],
      woerter: [
        { text: "The train leaves at 9.", ziel: "timetable (simple present)" }, { text: "The film starts at 8.", ziel: "timetable (simple present)" },
        { text: "School begins at 7.45.", ziel: "timetable (simple present)" }, { text: "The shop opens at 10.", ziel: "timetable (simple present)" },
        { text: "The bus arrives at 6.", ziel: "timetable (simple present)" }, { text: "The museum closes at 5.", ziel: "timetable (simple present)" },
        { text: "I'm meeting Tom at 4.", ziel: "fixed plan (present progressive)" }, { text: "We're flying to Rome on Friday.", ziel: "fixed plan (present progressive)" },
        { text: "She's having a party.", ziel: "fixed plan (present progressive)" }, { text: "They're visiting us tomorrow.", ziel: "fixed plan (present progressive)" },
        { text: "I'm seeing the dentist on Monday.", ziel: "fixed plan (present progressive)" }, { text: "He's working on Saturday.", ziel: "fixed plan (present progressive)" }
      ]
    },
    erklaerungen: {
      satzpool: {
        plan:  "Timetables and programmes (Fahrpläne, Programme) → simple present, also for the future. Questions with do / does. Example: {BEISPIEL}",
        verab: "Fixed plans with a time, often with other people (feste Verabredungen) → present progressive: am / is / are + verb-ing. Example: {BEISPIEL}",
        mix:   "Timetable → simple present (the bus leaves …). Your own fixed plan → present progressive (we're meeting …). Example: {BEISPIEL}",
        zuordnen: "Timetables → simple present. Fixed plans and arrangements (Verabredungen) → present progressive."
      }
    }
  }
});

Object.assign(K9.generatoren, {
  "9-G8":  { baukasten: "9-G8",  art: "satzpool" },
  "9-G9":  { baukasten: "9-G9",  art: "satzpool" },
  "9-G10": { baukasten: "9-G10", art: "satzpool" },
  "9-G11": { baukasten: "9-G11", art: "satzpool" }
});

K9.woerterhilfe.push(...[
  { en: "wallet", de: "Geldbörse" }, { en: "thirsty", de: "durstig" }, { en: "lend", de: "leihen" }, { en: "dentist", de: "Zahnarzt/Zahnärztin" },
  { en: "paint", de: "Farbe; streichen" }, { en: "ahead", de: "vorn, in Führung" }, { en: "noon", de: "Mittag (12 Uhr)" }, { en: "seat", de: "Sitzplatz" },
  { en: "installed", de: "eingebaut, installiert" }, { en: "installing", de: "einbauen, installieren" }, { en: "arrested", de: "verhaftet" },
  { en: "protesters", de: "Demonstrant/innen" }, { en: "whether", de: "ob" }, { en: "sports centre", de: "Sportzentrum" }, { en: "charity shop", de: "Second-Hand-Laden für einen guten Zweck" },
  { en: "applied", de: "sich beworben" }, { en: "jumper", de: "Pullover" }, { en: "coach", de: "Trainer/in" }, { en: "decided", de: "entschieden" }, { en: "timetable", de: "Fahrplan, Stundenplan" }, { en: "Leeds", de: "Leeds (Stadt in England)" }
]);

// =====================================================================
// 6) DIE AUFGABEN (handgeschriebener Pool)
// =====================================================================
K9.aufgaben = [
  { thema: "9-G1", niveau: "gruen", form: "quiz", frage: "There are sharks here. You ___ swim in the sea!", optionen: ["mustn't", "needn't", "don't have to"], loesung: "mustn't",
    erklaerung: "mustn't = it is not allowed (Verbot). needn't = it is not necessary (nicht nötig). Example: You mustn't touch the coral." },
  { thema: "9-G1", niveau: "gelb", form: "luecke", frage: "Next year I ___ (can – future) drive a car.", loesung: ["will be able to", "'ll be able to"],
    erklaerung: "“will can” doesn't exist. Future of can: will be able to. Example: We'll be able to see the reef tomorrow." },
  { thema: "9-G1", niveau: "rot", form: "fehler", satz: "She shoulds wear a hat in the sun.", fehlerwort: "shoulds", loesung: ["should"],
    erklaerung: "After should we use the infinitive (Grundform) without “to”. Example: You should drink lots of water." },
  { thema: "9-G2", niveau: "gruen", form: "quiz", frage: "Sydney is ___ city in Australia.", optionen: ["the biggest", "the bigest", "the most big"], loesung: "the biggest",
    erklaerung: "Short adjectives: the + -est. big → the biggest (double g). Example: July is the coldest month in Sydney." },
  { thema: "9-G2", niveau: "gelb", form: "luecke", frage: "My sister drives ___ (carefully) than my brother.", loesung: ["more carefully"],
    erklaerung: "Adverbs with -ly are compared with more (Steigerung): more carefully. Example: She speaks more politely than her friend." },
  { thema: "9-G3", niveau: "gruen", form: "quiz", frage: "The boy ___ bag got lost is very sad.", optionen: ["whose", "who's", "which"], loesung: "whose",
    erklaerung: "whose = dessen / deren (the bag belongs to the boy). who's = who is. Example: I have a friend whose parents are musicians." },
  { thema: "9-G3", niveau: "rot", form: "fehler", satz: "Trinidad, that is near Tobago, has great beaches.", fehlerwort: "that", loesung: ["which"],
    erklaerung: "Between commas (nicht notwendiger Relativsatz) we never use that – use who or which. Example: Jamaica, which is in the Caribbean, is famous for its music." },
  { thema: "9-G4", niveau: "gruen", form: "quiz", frage: "I ___ on the beach when I saw the dolphins.", optionen: ["was lying", "were lying", "was lieing"], loesung: "was lying",
    erklaerung: "Past progressive (Verlaufsform): I/he/she/it was + verb-ing. lie → lying. Example: The children were playing in the sand." },
  { thema: "9-G4", niveau: "gelb", form: "luecke", frage: "We ___ (not / watch) TV when the storm started.", loesung: ["weren't watching", "were not watching"],
    erklaerung: "Negative (Verneinung): weren't / wasn't + verb-ing. Example: Tom wasn't listening to the guide." },
  { thema: "9-G5", niveau: "gruen", form: "quiz", frage: "The trip to the desert was really ___.", optionen: ["interesting", "interested", "interestet"], loesung: "interesting",
    erklaerung: "-ing adjective = what something is like (so ist etwas). Example: The safari was exciting." },
  { thema: "9-G5", niveau: "rot", form: "fehler", satz: "Opened the box, Mia found a letter.", fehlerwort: "Opened", loesung: ["Opening"],
    erklaerung: "A shorter sentence (Satzverkürzung) starts with the -ing form: When she opened … → Opening … Example: Feeling tired, Tom went to bed." },
  { thema: "9-G6", niveau: "gruen", form: "quiz", frage: "When we got to the station, the train ___.", optionen: ["had already left", "has already left", "had already leave"], loesung: "had already left",
    erklaerung: "The earlier action gets had + 3rd form (Vorvergangenheit). Example: When I got home, my brother had eaten all the cake." },
  { thema: "9-G6", niveau: "gelb", form: "luecke", frage: "I ___ (never / see) a rhino before I went to Kruger National Park.", loesung: ["had never seen"],
    erklaerung: "Past perfect with never: had never + 3rd form. Example: Mia had never been on a plane before." },
  { thema: "9-G7", niveau: "gruen", form: "quiz", frage: "The jewellery ___ last night.", optionen: ["was stolen", "was stealed", "is stolen"], loesung: "was stolen",
    erklaerung: "Passive simple past: was / were + 3rd form. steal → stolen. Example: The thieves were caught by a security guard." },
  { thema: "9-G7", niveau: "gelb", form: "luecke", frage: "___ the rangers ___ (warn) about the poachers?", loesung: [["Were"], ["warned"]],
    erklaerung: "Passive questions: Was / Were + subject + 3rd form? Example: Was the park created in 1926?" },
  { thema: "9-G8", niveau: "gruen", form: "quiz", frage: "Zoe: “I am bored.”  →  Zoe said that she ___ bored.", optionen: ["was", "is", "were"], loesung: "was",
    erklaerung: "After said: am / is → was (Zeitverschiebung). Example: Ben said that he was tired." },
  { thema: "9-G8", niveau: "gelb", form: "luecke", frage: "Mum: “Don't eat the cake!”  →  Mum told me ___ the cake.", loesung: ["not to eat"],
    erklaerung: "Negative commands (verneinte Aufforderungen): told + person + not to + verb. Example: The coach told us not to give up." },
  { thema: "9-G9", niveau: "gruen", form: "quiz", frage: "Ben: “I saw a fox.”  →  Ben said that he ___ a fox.", optionen: ["had seen", "has seen", "had saw"], loesung: "had seen",
    erklaerung: "simple past → past perfect (had + 3rd form). Example: Lena said that she had bought new sneakers." },
  { thema: "9-G9", niveau: "rot", form: "fehler", satz: "Mia said that she has finished her work.", fehlerwort: "has", loesung: ["had"],
    erklaerung: "present perfect → past perfect: has finished → had finished. Example: Dad said that he had sold his old car." },
  { thema: "9-G10", niveau: "gruen", form: "quiz", frage: "Look at the sky! It ___ snow.", optionen: ["is going to", "will to", "is going"], loesung: "is going to",
    erklaerung: "going to = you can see a sign (Anzeichen). Example: Careful! You're going to fall." },
  { thema: "9-G10", niveau: "gelb", form: "luecke", frage: "I'm cold. – I ___ (get) you a jumper.", loesung: ["will get", "'ll get"],
    erklaerung: "will = a spontaneous decision (spontane Entscheidung) or an offer. Example: The phone is ringing. – I'll answer it." },
  { thema: "9-G11", niveau: "gruen", form: "quiz", frage: "The bus to the airport ___ at 6 a.m.", optionen: ["leaves", "leave", "is leave"], loesung: "leaves",
    erklaerung: "Timetables (Fahrpläne) → simple present. Example: The film starts at eight." },
  { thema: "9-G11", niveau: "gelb", form: "luecke", frage: "We ___ (see) the doctor on Monday at ten. – fixed plan", loesung: ["are seeing", "'re seeing"],
    erklaerung: "Fixed plans (feste Verabredungen) → present progressive. Example: I'm meeting Tom tomorrow." }
];

// =====================================================================
// 7) ZUSATZFRAGEN für den Zusatzraum (Quiz mit 3 Antworten)
// =====================================================================
K9.zusatzfragen = [
  { thema: "9-G1", frage: "Next year I … work in Australia.", optionen: ["will be able to", "will can", "can will"], loesung: "will be able to" },
  { thema: "9-G1", frage: "Lunch is free. You … bring food.", optionen: ["needn't", "mustn't", "needn't to"], loesung: "needn't" },
  { thema: "9-G1", frage: "There are crocodiles! You … swim here.", optionen: ["mustn't", "needn't", "don't have to"], loesung: "mustn't" },
  { thema: "9-G1", frage: "You look tired. You … go to bed.", optionen: ["should", "should to", "shoulds"], loesung: "should" },
  { thema: "9-G1", frage: "Last week we … work on Saturday.", optionen: ["had to", "must", "musted"], loesung: "had to" },
  { thema: "9-G2", frage: "A whale is … than a dolphin.", optionen: ["bigger", "more big", "biger"], loesung: "bigger" },
  { thema: "9-G2", frage: "Uluru is … rock in Australia.", optionen: ["the most famous", "the famousest", "the more famous"], loesung: "the most famous" },
  { thema: "9-G2", frage: "Tom sings … than his brother.", optionen: ["better", "gooder", "more well"], loesung: "better" },
  { thema: "9-G2", frage: "A koala isn't … a kangaroo.", optionen: ["as fast as", "as faster as", "as fast than"], loesung: "as fast as" },
  { thema: "9-G2", frage: "Zoe works … than the others.", optionen: ["more carefully", "carefuller", "more careful"], loesung: "more carefully" },
  { thema: "9-G3", frage: "A musician is a person … makes music.", optionen: ["who", "which", "whose"], loesung: "who" },
  { thema: "9-G3", frage: "This is the ferry … goes to Tobago.", optionen: ["which", "who", "whose"], loesung: "which" },
  { thema: "9-G3", frage: "The woman to … I spoke was nice.", optionen: ["whom", "who", "which"], loesung: "whom" },
  { thema: "9-G3", frage: "Jamaica, … is in the Caribbean, is sunny.", optionen: ["which", "that", "who"], loesung: "which" },
  { thema: "9-G3", frage: "Which sentence is correct?", optionen: ["The hotel we booked was great.", "The hotel booked was great.", "The hotel we booked it was great."], loesung: "The hotel we booked was great." },
  { thema: "9-G4", frage: "At ten o'clock we … on the beach.", optionen: ["were sitting", "was sitting", "were siting"], loesung: "were sitting" },
  { thema: "9-G4", frage: "I was swimming when I … a turtle.", optionen: ["saw", "was seeing", "see"], loesung: "saw" },
  { thema: "9-G4", frage: "Mia … listening. She was on her phone.", optionen: ["wasn't", "didn't", "weren't"], loesung: "wasn't" },
  { thema: "9-G4", frage: "While Mum … cooking, Dad was reading.", optionen: ["was", "were", "did"], loesung: "was" },
  { thema: "9-G5", frage: "We saw a lion … under a tree.", optionen: ["sleeping", "slept", "to sleep"], loesung: "sleeping" },
  { thema: "9-G5", frage: "I was … by the film. I fell asleep.", optionen: ["bored", "boring", "boreing"], loesung: "bored" },
  { thema: "9-G5", frage: "… the news, she started to cry.", optionen: ["Hearing", "Heard", "To hear"], loesung: "Hearing" },
  { thema: "9-G5", frage: "The night in the tent was …", optionen: ["frightening.", "frightened.", "frightning."], loesung: "frightening." },
  { thema: "9-G6", frage: "When we arrived, the bus … left.", optionen: ["had already", "has already", "already has"], loesung: "had already" },
  { thema: "9-G6", frage: "Which is past perfect?", optionen: ["had seen", "saw", "has seen"], loesung: "had seen" },
  { thema: "9-G6", frage: "After we … lunch, we went to the beach.", optionen: ["had had", "have had", "had have"], loesung: "had had" },
  { thema: "9-G6", frage: "The bus hadn't come …", optionen: ["yet.", "already.", "ever."], loesung: "yet." },
  { thema: "9-G7", frage: "The school … in 2010.", optionen: ["was built", "was builded", "is built"], loesung: "was built" },
  { thema: "9-G7", frage: "The poachers … by the rangers.", optionen: ["were caught", "was caught", "were catched"], loesung: "were caught" },
  { thema: "9-G7", frage: "… the park created in 1926?", optionen: ["Was", "Did", "Were"], loesung: "Was" },
  { thema: "9-G7", frage: "Today the rhinos … by rangers.", optionen: ["are protected", "were protected", "are protect"], loesung: "are protected" },
  { thema: "9-G8", frage: "“I like it.” → She said that she … it.", optionen: ["liked", "likes", "like"], loesung: "liked" },
  { thema: "9-G8", frage: "“Are you OK?” → He asked … I was OK.", optionen: ["if", "that", "do"], loesung: "if" },
  { thema: "9-G8", frage: "“Sit down!” → She told me … down.", optionen: ["to sit", "sit", "sitting"], loesung: "to sit" },
  { thema: "9-G8", frage: "“Where do you live?” → He asked where I …", optionen: ["lived.", "live.", "did live."], loesung: "lived." },
  { thema: "9-G9", frage: "“I lost my key.” → He said he … his key.", optionen: ["had lost", "has lost", "had losed"], loesung: "had lost" },
  { thema: "9-G9", frage: "“I have finished.” → She said she … finished.", optionen: ["had", "has", "have"], loesung: "had" },
  { thema: "9-G9", frage: "“Did you see it?” → He asked if I … it.", optionen: ["had seen", "have seen", "had saw"], loesung: "had seen" },
  { thema: "9-G10", frage: "The phone is ringing. – I … it.", optionen: ["'ll answer", "'m going answer", "will answers"], loesung: "'ll answer" },
  { thema: "9-G10", frage: "Look at the clouds! It … rain.", optionen: ["is going to", "will to", "going to"], loesung: "is going to" },
  { thema: "9-G10", frage: "I think people … more electric cars.", optionen: ["will drive", "will drives", "are drive"], loesung: "will drive" },
  { thema: "9-G10", frage: "We've got tickets. We … fly to Rome.", optionen: ["are going to", "will to", "are going"], loesung: "are going to" },
  { thema: "9-G11", frage: "The train … at 9 tomorrow.", optionen: ["leaves", "leave", "is leave"], loesung: "leaves" },
  { thema: "9-G11", frage: "I … Tom at the mall tomorrow.", optionen: ["'m meeting", "meeting", "am meet"], loesung: "'m meeting" },
  { thema: "9-G11", frage: "When … the film start?", optionen: ["does", "is", "do"], loesung: "does" },
  { thema: "9-G11", frage: "… you doing anything on Saturday?", optionen: ["Are", "Do", "Is"], loesung: "Are" }
];

// =====================================================================
// 8) MINISPIELE
//    Reward after a cleared bonus room: button „🎁 Minispiel?“. 30 seconds at most, does NOT count for the code.
//    Nur die Spiele, die unter „spiele“ stehen, werden in dieser Welt angeboten. Die Spieltechnik steht in spiele/minispiele.js.
//    titel / anleitung / erfolg = Texte (einfaches Englisch); ziel = so viele Punkte braucht man.
//    Beim Spiel codeknacker ist ziel zugleich die Länge des Codes (3 bis 5).
// =====================================================================
K9.minispiele = {
  spiele: {
    codeknacker: {
      titel: "💾 Crack the code",
      anleitung: "Find the four-digit code. Tap four digits. After each try you get a hint for every digit: ● right place, ◐ wrong place, ○ not in the code.",
      ziel: 4,
      erfolg: "Access granted. Nova: “Took you long enough.”"
    },
    lasergitter: {
      titel: "🚨 Laser corridor",
      anleitung: "The laser switches on and off. Tap when it says OFF to run through. Tap at the wrong moment and you lose a second, nothing more.",
      ziel: 6,
      erfolg: "Six gates, zero alarms. Clean."
    },
    rutsche: {
      titel: "🏍️ Garage run",
      anleitung: "Tap to jump. Get the bike over barriers and crates and collect the data disks 💾.",
      ziel: 8,
      erfolg: "Eight disks. Please don't scratch the bike."
    },
    nachtflug: {
      titel: "🛸 Drone flight",
      anleitung: "Tap to keep the drone in the air. Fly between the towers and collect the signals 📡. Bumping into things is fine.",
      ziel: 8,
      erfolg: "Eight signals. The drone is still in one piece."
    }
  },
  codeknacker: { ziffern: 5, legende: "● right place · ◐ wrong place · ○ not in the code", start: "Tap four digits.", fertig: "Code cracked." },
  lasergitter: { figur: "🕵️", ziel: "🚪", an: "ON", aus: "OFF", hinweis: "Tap when the laser is OFF.", autsch: ["Zap. Wait for OFF.", "Too early.", "Patience, agent."] },
  rutsche: { figur: "🏍️", fisch: "💾", hindernisse: ["🚧", "📦", "🛢️"], hintergrund: ["🏢", "☁️", "🏢", "☁️"] },
  rutscheAutsch: ["Crash. Keep going.", "Mind the barrier.", "Ouch.", "Back on the bike."],
  flug: { figur: "🛸", stern: "📡", krone: "🏢", himmel: ["✨", "·", "🌙", "·", "✨", "·"] },
  flugAutsch: ["Bump. Still flying.", "Careful.", "Close one.", "Rotor check … fine."]
};

// ---------- More mini games (from version 0.7.1): eight games per world ----------
Object.assign(K9.minispiele.spiele, {
  taschenlampe: {
    titel: "📂 Find the secret files",
    anleitung: "The power is off in the archive. Move your finger to shine the torch and hold the light on each secret item. Some are hidden behind shelves.",
    ziel: 6,
    erfolg: "All files secured. Good work, agent."
  },
  obstkorb: {
    titel: "🪂 Supply drop",
    anleitung: "Supplies are falling from the helicopter! Move the crate with your finger and catch them. Don't catch the decoys!",
    ziel: 12,
    erfolg: "Supplies complete. The mission can continue."
  },
  fuettern: {
    titel: "🧰 Gadget check",
    anleitung: "Every mission needs the right gadget. Drag the gadget to the mission – or tap the right mission.",
    ziel: 6,
    erfolg: "Every agent is ready. Gadget check complete."
  },
  seeloewe: {
    titel: "🤖 Keep-up training",
    anleitung: "Training time! Keep the ball in the air – move the robot under the ball with your finger.",
    ziel: 10,
    erfolg: "Ten touches. Even the training robot is impressed."
  }
});
Object.assign(K9.minispiele, {
  // ---------- Find the secret files (taschenlampe) ----------
  nachtTiere: [
    { emoji: "📁", en: "file",       de: "Akte" },         { emoji: "💾", en: "disk",      de: "Diskette" },
    { emoji: "🔑", en: "key",        de: "Schlüssel" },    { emoji: "🪪", en: "ID card",   de: "Ausweis" },
    { emoji: "📸", en: "camera",     de: "Kamera" },       { emoji: "🗺️", en: "map",       de: "Karte" },
    { emoji: "⌚", en: "watch",      de: "Armbanduhr" },   { emoji: "🔋", en: "battery",   de: "Batterie" },
    { emoji: "📼", en: "tape",       de: "Videokassette" },{ emoji: "🎧", en: "headphones", de: "Kopfhörer" },
    { emoji: "✉️", en: "letter",     de: "Brief" },        { emoji: "🕶️", en: "sunglasses", de: "Sonnenbrille" }
  ],
  kulisse: ["🗄️", "📦", "🗄️", "🖥️", "📦", "🗄️", "🪴", "📦", "🖥️", "🗄️"],

  // ---------- Supply drop (obstkorb) ----------
  obst: [
    { emoji: "🔋", en: "battery",   de: "Batterie" },    { emoji: "📱", en: "phone",     de: "Handy" },
    { emoji: "🔦", en: "torch",     de: "Taschenlampe" },{ emoji: "🗺️", en: "map",       de: "Karte" },
    { emoji: "🧭", en: "compass",   de: "Kompass" },     { emoji: "🎧", en: "headset",   de: "Headset" },
    { emoji: "🔑", en: "key",       de: "Schlüssel" },   { emoji: "💾", en: "disk",      de: "Diskette" },
    { emoji: "🍫", en: "chocolate", de: "Schokolade" },  { emoji: "🩹", en: "plaster",   de: "Pflaster" }
  ],
  muell: ["🪨", "🐟", "🧦", "🥾"],
  autsch: ["A rock? Not useful.", "A fish? Who packed this?", "Socks again …", "An old boot. Decoy!"],

  // ---------- Gadget check (fuettern): tiere = missions, futter = gadgets ----------
  tiere: [
    { id: "nacht",   emoji: "🌑", en: "night mission",      de: "Nachteinsatz",          witz: "“{futter}? Useless in the dark!”" },
    { id: "wasser",  emoji: "🌊", en: "underwater mission", de: "Unterwasser-Einsatz",   witz: "“{futter}? That will just get wet …”" },
    { id: "berg",    emoji: "🏔️", en: "mountain mission",   de: "Einsatz in den Bergen", witz: "“{futter}? Not much help on a cliff!”" },
    { id: "tresor",  emoji: "🔒", en: "locked safe",        de: "verschlossener Tresor", witz: "“{futter}? The safe stays closed.”" },
    { id: "funk",    emoji: "📡", en: "secret message",     de: "geheime Nachricht",     witz: "“{futter}? Nobody will hear you!”" },
    { id: "sprung",  emoji: "🛩️", en: "jump from a plane",  de: "Sprung aus dem Flugzeug", witz: "“{futter}? Please don't jump with that!”" }
  ],
  futter: [
    { emoji: "🔦", en: "torch",           de: "Taschenlampe",  haupt: ["nacht"],  auch: ["wasser", "berg", "tresor"] },
    { emoji: "🤿", en: "diving mask",     de: "Taucherbrille", haupt: ["wasser"], auch: [] },
    { emoji: "🪢", en: "rope",            de: "Seil",          haupt: ["berg"],   auch: [] },
    { emoji: "🔑", en: "key",             de: "Schlüssel",     haupt: ["tresor"], auch: [] },
    { emoji: "🩺", en: "stethoscope",     de: "Stethoskop",    haupt: ["tresor"], auch: [] },
    { emoji: "📻", en: "radio",           de: "Funkgerät",     haupt: ["funk"],   auch: [] },
    { emoji: "💻", en: "laptop",          de: "Laptop",        haupt: ["funk"],   auch: ["tresor"] },
    { emoji: "🪂", en: "parachute",       de: "Fallschirm",    haupt: ["sprung"], auch: [] }
  ],
  lob: ["✅ Ready!", "✅ Good choice!", "✅ Perfect!", "✅ Check!"],

  // ---------- Keep-up training (seeloewe) ----------
  robbe: "🤖", ball: "⚽", boden: "repeating-linear-gradient(90deg,#3b4455 0 18px,#2a3140 18px 36px)",
  platsch: ["Dropped! Again.", "New ball!", "Missed – keep going!"]
});

// ---------- Losing (from version 0.7.2): three hearts, traps in the torch game ----------
Object.assign(K9.minispiele, {
  // Meldung, wenn alle drei Herzen weg sind (eine davon wird ausgelost)
  gameOver: ["Mission failed, agent. Three mistakes.", "Game over. Back to training."],
  // Taschenlampe: Fallen im Dunkeln – wer sie zu lange anleuchtet, verliert ein Herz
  fallen: [
    { emoji: "🚨", text: "Alarm! Security is coming." },
    { emoji: "🪤", text: "Snap! A trap!" },
    { emoji: "🕷️", text: "A spider! Eek!" }
  ]
});

// ---------- Four more mini games for older students (from version 0.9.2): twelve games ----------
Object.assign(K9.minispiele.spiele, {
  kabel: {
    titel: "🔌 Rewire the server",
    anleitung: "The server is down. Drag each cable to the socket with the same colour and symbol – or tap the cable, then the socket. Wrong socket = sparks!",
    ziel: 3,
    erfolg: "Server online. Nova: “Not bad for a human.”"
  },
  andocken: {
    titel: "🛸 Drone landing",
    anleitung: "Hold your finger where the drone should fly – it pushes towards your finger. Let go and it drifts. Fly into the hangar SLOWLY and avoid the birds.",
    ziel: 3,
    erfolg: "Three perfect landings. The drone pilot badge is yours."
  },
  sequenz: {
    titel: "🧠 Lab access code",
    anleitung: "The lab door shows its access code for a moment. Watch the buttons light up, then tap them in the same order. It gets longer every time.",
    ziel: 4,
    erfolg: "Access granted. Your memory is a secret weapon."
  },
  signal: {
    titel: "📡 Intercept the radio",
    anleitung: "Turn the two dials until your wave lies exactly on the dashed wave. Then tap “Lock signal”. Wrong lock = the enemy hears you.",
    ziel: 3,
    erfolg: "Three messages intercepted. HQ is impressed."
  }
});
Object.assign(K9.minispiele, {
  kabel: { kasten: "Server", hinweis: "Same colour, same symbol.", fertig: ["Server back online!", "Connection stable!"], autsch: ["Sparks! Wrong socket.", "Bzzzt! That's the wrong one."] },
  andocken: { figur: "🛸", dock: "HANGAR", truemmer: ["🐦", "🎈", "🪁"], limit: 95, hinweis: "Hold = push towards your finger. Land slowly!",
              gelandet: ["Landed!", "Smooth landing!", "Perfect!"], zuSchnell: "Too fast! Crash landing.", autsch: ["Ouch! Watch out for the birds.", "Bump! Fly around it."] },
  sequenz: { zeichen: ["1", "2", "3", "4", "5", "6", "7", "8", "9"], schau: "Watch", du: "Your turn", gut: ["Correct!", "Access level up!", "Exactly!"], autsch: ["Wrong code. Watch again.", "Access denied. Watch again."] },
  signal: { hoehe: "Height", wellen: "Waves", lock: "Lock signal", ziel: "target", du: "you", autsch: ["No signal. Keep tuning.", "Static … that's not it."],
            funk: ["Agent Fox to base: The package is in the red car.", "The meeting is at midnight. Don't be late.", "Nobody must know about the plan.",
                   "The code word is “blue moon”.", "Leave the building through the back door.", "The target has just left the hotel."] }
});
