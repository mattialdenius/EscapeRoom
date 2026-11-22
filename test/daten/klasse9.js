/* =====================================================================
   KLASSE 9  ·  alle Inhalte für Klasse 9
   ---------------------------------------------------------------------
   IM AUFBAU: Die Welt (Geschichte, Räume, Figur, Karte, Minispiele) ist fertig.
   Aufgaben: Unit 1 (G1, G2) ab Version 1.1.0-a. Themen ohne Aufgaben zeigen „kommt bald“.
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
  { id: "9-G3",  klasse: 9, unit: 2, titelEn: "Relative clauses with and without relative pronouns", titel: "Relativsätze mit und ohne Relativpronomen", regel: "" },
  { id: "9-G4",  klasse: 9, unit: 2, titelEn: "Past progressive", titel: "Die Verlaufsform der Vergangenheit", regel: "" },
  { id: "9-G5",  klasse: 9, unit: 3, titelEn: "Present participle", titel: "Das Partizip Präsens", regel: "" },
  { id: "9-G6",  klasse: 9, unit: 3, titelEn: "Past perfect", titel: "Die Vorvergangenheit", regel: "" },
  { id: "9-G7",  klasse: 9, unit: 3, titelEn: "The passive (simple past)", titel: "Das Passiv (einfache Vergangenheit)", regel: "" },
  { id: "9-G8",  klasse: 9, unit: 4, titelEn: "Reported speech I (change of tense → simple past)", titel: "Indirekte Rede I (Zeitverschiebung → simple past)", regel: "" },
  { id: "9-G9",  klasse: 9, unit: 4, titelEn: "Reported speech II (change of tense → past perfect)", titel: "Indirekte Rede II (Zeitverschiebung → past perfect)", regel: "" },
  { id: "9-G10", klasse: 9, unit: 4, titelEn: "Future: will and going to", titel: "Zukunftszeiten (will und going to)", regel: "" },
  { id: "9-G11", klasse: 9, unit: 4, titelEn: "Future: simple present and present progressive", titel: "Zukunftszeiten (simple present und present progressive)", regel: "" }
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
};

// =====================================================================
// 4) WÖRTERHILFE: deutsche Bedeutung für erschließbare oder neue Wörter (Antippen zeigt die Bedeutung)
// =====================================================================
K9.woerterhilfe = [
  { en: "towel", de: "Handtuch" }, { en: "dictionary", de: "Wörterbuch" }, { en: "trainers", de: "Turnschuhe" }, { en: "rock", de: "Felsen" },
  { en: "Uluru", de: "Uluru (großer Felsen in Australien)" }, { en: "outback", de: "Outback (Hinterland Australiens)" }, { en: "Aboriginal", de: "Ureinwohner Australiens" },
  { en: "coral", de: "Koralle" }, { en: "reef", de: "Riff" }, { en: "saltwater crocodiles", de: "Salzwasserkrokodile" }, { en: "apprenticeship", de: "Ausbildung, Lehre" },
  { en: "plumber", de: "Klempner/in" }, { en: "receptionist", de: "Empfangsmitarbeiter/in" }, { en: "courier", de: "Kurier/in" },
  { en: "sharks", de: "Haie" }, { en: "hurry", de: "sich beeilen" }, { en: "Murray", de: "Murray (längster Fluss Australiens)" }, { en: "Nile", de: "Nil" }
];

// =====================================================================
// 5) GENERATOREN
// =====================================================================
K9.generatoren = {
  "9-G1": { baukasten: "9-G1", art: "satzpool" },
  "9-G2": { baukasten: "9-G2", art: "satzpool" }
};

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
    erklaerung: "Adverbs with -ly are compared with more (Steigerung): more carefully. Example: She speaks more politely than her friend." }
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
  { thema: "9-G2", frage: "Zoe works … than the others.", optionen: ["more carefully", "carefuller", "more careful"], loesung: "more carefully" }
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
