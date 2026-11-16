/* =====================================================================
   KLASSE 6  ·  Red Line 2  ·  alle Inhalte für Klasse 6
   ---------------------------------------------------------------------
   STAND 16.11.2026: Unit 1 und 2 (Themen G1–G6) haben Aufgaben. Unit 3–6 folgen.
   Themen ohne Aufgaben erscheinen im Startmenü nicht.
   Wie eine fertige Klasse aussieht: siehe klasse5.js und klasse-vorlage.js.
   ===================================================================== */

const K6 = neueKlasse(6);   // bitte nicht ändern

// 1) DIE WELT
K6.welt = {
  name: "Das Piratenschiff", emoji: "🏴‍☠️",
  figur: "Käpt'n Grammar",
  intro: "Ahoi, ihr Landratten! Ihr habt euch als blinde Passagiere auf mein Schiff geschlichen – mutig! " +
         "Aber an Land kommt ihr nur mit dem Beiboot, und das hängt an einem Zahlenschloss. " +
         "Meine Crew hat die vier Ziffern auf dem Schiff versteckt. Löst die Rätsel in allen vier Räumen, dann lasse ich euch ziehen!",
  raeume: [
    { name: "Kombüse",          emoji: "🍲" },
    { name: "Kapitänskajüte",   emoji: "🧭" },
    { name: "Laderaum",         emoji: "📦" },
    { name: "Ausguck",          emoji: "🔭" }
  ],
  zusatzraum: { name: "Pulverkammer", emoji: "💣", text: "Vorsicht, die Lunte brennt! Antwortet, bevor es knallt!" },
  ausgang:    { name: "Beiboot", emoji: "🚣" },
  finale:     "Das Schloss springt auf! Ihr rudert im Beiboot davon. Käpt'n Grammar salutiert: „Gute Fahrt, ihr Grammatik-Piraten!“",
  gescheitert:"Arrr! Die Crew hat euch erwischt. Strafe: Deck schrubben! Versucht es gleich noch einmal.",
  gescheitertTor: "Dreimal der falsche Code – das Beiboot bleibt angekettet und die Crew wird misstrauisch. Versucht es gleich noch einmal!",
  saetze: {
    start:            ["Leinen los! Der erste Raum ist offen. Tippt ihn an!"],
    richtig:          ["Arrr, richtig!", "Ein echter Pirat!", "Volltreffer!", "Gut gemacht, Matrose!", "Das gibt eine Extraportion Zwieback!"],
    falsch:           ["Kielholen wäre übertrieben – lest die Erklärung und versucht es nochmal.", "Fast! Schaut euch die Regel genau an.", "Kein Grund zur Meuterei – nochmal!"],
    loesung:          ["Das war eine harte Nuss. Schaut euch die Lösung an, gleich kommt eine neue Aufgabe."],
    raumGeschafft:    ["Raum geschafft! Jetzt noch die Pulverkammer …", "Alle Schlüsselteile an Bord!"],
    zusatzStart:      ["Pssst … die Lunte brennt! Schnell und genau antworten!"],
    zusatzGeschafft:  ["Lunte ausgetreten! Die Ziffer gehört euch!"],
    zusatzGescheitert:["BUMM! Nur Rauch, keine Sorge. Eine der drei Ziffern stimmt."],
    zeitWarnung:      ["Beeilt euch, die Crew kommt gleich zurück an Bord!"],
    torFalsch:        ["Das Schloss klemmt. Schaut auf die Lämpchen: Grün stimmt, Rot noch nicht!"],
    zwilling:         ["Hier ist eine ähnliche Aufgabe. Ihr schafft das!"],
    torBereit:        ["Alle Räume geschafft! Stellt den Code am Beiboot ein."]
  }
};

// ---------- KARTE (Entdecker-Modus) ----------
// Die Karte ersetzt die Übersicht mit den Kacheln (Datei welt/karte.js, Aussehen: welt/stil-schiff.js).
// So lest ihr die Zahlen: x = wie weit nach rechts (0 … 1600), y = wie weit nach unten (0 … 1000).
// Ein Raum braucht etwa 300 × 200 Platz. Der Punkt x/y ist die Mitte, die Tür ist unten in der Mitte.
// Kleine Schritte ändern (z. B. 50) und danach im Browser ansehen: …/test/index.html?welt=6
K6.welt.karte = {
  stil: "schiff",                          // Aussehen: Datei welt/stil-schiff.js
  groesse: { b: 1600, h: 1000 },           // Größe der ganzen Karte. Klein lassen: kurze Wege!
  start:   { x: 800, y: 850 },             // hier steht die Spielfigur am Anfang (vor dem Beiboot)

  // Die vier Räume. Reihenfolge = Reihenfolge der Räume oben (Kombüse zuerst).
  raeume: [
    { x: 330,  y: 300, schild: "Kombüse" },
    { x: 1270, y: 300, schild: "Kapitänskajüte" },
    { x: 330,  y: 690, schild: "Laderaum" },
    { x: 1270, y: 690, schild: "Ausguck" }
  ],
  zusatzraum: { x: 800, y: 205, schild: "Pulverkammer" },   // nur Kulisse, wird nach jedem Raum von selbst betreten
  tor:        { x: 800, y: 950 },                           // das Beiboot unten an der Reling

  // Figuren: höchstens 5. Keine hält auf, Antippen ist freiwillig.
  //   art: "begleiter" = Käpt'n Grammar, läuft hinterher
  //   art: "regel"     = zeigt die Regelkarte des nächsten Raums
  //   art: "zeit"      = dreht seine „runde“ (Punkte [x, y]) und warnt, wenn die Zeit knapp wird
  //   art: "wort"      = zeigt ein Wort aus der Wörterhilfe („emoji“ = Bild, „trick“ = drehen, rollen oder huepfen)
  figuren: [
    { art: "begleiter" },
    { art: "regel", name: "Schiffskoch", x: 690, y: 480 },
    { art: "zeit",  name: "Wache", runde: [[890, 460], [1100, 460], [1100, 660], [890, 660]] },
    { art: "wort",  emoji: "🦀", name: "Krabbe", trick: "rollen", x: 540,  y: 850 },
    { art: "wort",  emoji: "🐙", name: "Krake",  trick: "drehen", x: 1080, y: 865 }
  ],

  // Orte, an denen der Käpt'n einmal pro Mission etwas sagt, wenn die Spielfigur in die Nähe kommt.
  orte: [
    { x: 600, y: 600, radius: 100, text: "Das ist der Großmast. Hochklettern nur mit Erlaubnis vom Käpt'n. Also von mir!" },
    { x: 800, y: 330, radius: 120, text: "Finger weg von der Pulverkammer! Die kommt nach jedem Raum von ganz allein." },
    { x: 160, y: 520, radius: 120, text: "Backbord ist links, Steuerbord ist rechts. Merkt euch das, ihr Landratten!" }
  ],

  // Texte der Karte. {name} wird durch den Namen des Raums ersetzt.
  // Steht hier eine Liste [ "…", "…" ], wird jedes Mal ein Satz ausgewählt.
  texte: {
    gesperrt:        "Arrr, die Tür ist noch verriegelt! Schafft zuerst den Raum mit dem Pfeil.",
    schonGeschafft:  "Hier habt ihr die Ziffer schon erbeutet. Weiter, Matrosen!",
    torZu:           "Das Beiboot bleibt angekettet. Erst alle vier Räume schaffen!",
    zusatz:          "Die Pulverkammer! Da geht es nach jedem Raum von selbst hinein.",
    zusatzReaktion:  ["Zisch …", "Pssst … die Lunte!", "Zisch … knister …"],
    jubel:           "Arrr! Eine neue Ziffer!",
    tipp:            "Als Nächstes: {name}! Folgt dem gelben Pfeil.",
    tippTor:         "Alle Ziffern an Bord! Ab zum Beiboot.",
    regelTitel:      "Spickzettel für: {name}",
    keineRegel:      "Für diesen Raum habe ich keinen Spickzettel.",
    waerterinFertig: "Alles geschafft! Jetzt schnell zum Beiboot.",
    waechter:        "Beeilt euch, die Crew kommt bald zurück!",
    waechterRuf:     ["Wer schleicht da übers Deck?", "Halt! … Ach, ihr seid das.", "Hab ich da was gehört?"],
    pollyGeschafft:  ["Arrr! Die erste Ziffer!", "Halbe Fahrt! Zwei Ziffern!", "Nur noch ein Raum, Matrosen!", "Alle vier! Ab zum Beiboot!"],
    pollyWarten:     ["Nicht einschlafen, Landratten! Weiter: {name}!", "Der Wind steht gut. Auf zu: {name}!"],
    pollyZurueck:    ["Kein Grund zur Meuterei. Gleich noch einmal!", "Kurz durchatmen, dann wieder rein!"]
  }
};

// Bild der Begleitfigur oben links (Käpt'n Grammar). Nur die Formen, ohne <svg>-Hülle, Feld 120 × 130.
K6.welt.figurSvg =
  '<path d="M18 130 Q18 98 60 94 Q102 98 102 130 Z" fill="#7b1e2b" stroke="#000" stroke-width="4"/>' +
  '<path d="M50 96 L60 112 L70 96 Z" fill="#f4ead2" stroke="#000" stroke-width="3"/>' +
  '<circle cx="60" cy="62" r="29" fill="#d9a77f" stroke="#000" stroke-width="4"/>' +
  '<path d="M34 70 Q36 100 60 102 Q84 100 86 70 Q74 82 60 82 Q46 82 34 70 Z" fill="#5a3a22" stroke="#000" stroke-width="4"/>' +
  '<path d="M50 80 Q60 88 70 80" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round"/>' +
  '<circle cx="72" cy="60" r="4" fill="#000"/>' +
  '<path d="M32 50 L88 62" stroke="#000" stroke-width="4"/><ellipse cx="49" cy="60" rx="9" ry="7" fill="#000"/>' +
  '<path d="M10 46 Q60 -6 110 46 Q60 30 10 46 Z" fill="#1b1b22" stroke="#000" stroke-width="4"/>' +
  '<path d="M26 40 Q60 22 94 40" fill="none" stroke="#ffd23f" stroke-width="4"/>' +
  '<circle cx="60" cy="24" r="6" fill="#f4ead2" stroke="#000" stroke-width="2.5"/>';
// ---------- Ende KARTE ----------

// 2) DIE THEMEN (laut „Themenuebersicht“, Red Line 2)
K6.themen = [
  { id: "6-G1",  klasse: 6, unit: 1, titel: "Adjektive und Adverbien", regel: "Adjektiv: Wie ist jemand oder etwas? → Tom is quiet. Emma is a careful girl. Adverb: Wie macht jemand etwas? → Tom speaks quietly. Adverb = Adjektiv + -ly (quick → quickly), -y wird zu -ily (happy → happily). Sonderfälle: good → well, fast → fast, hard → hard." },
  { id: "6-G2",  klasse: 6, unit: 1, titel: "Possessivpronomen", regel: "Ohne Nomen danach: mine, yours, his, hers, ours, theirs → This bag is mine. Mit Nomen danach: my, your, his, her, our, their → This is my bag." },
  { id: "6-G3",  klasse: 6, unit: 1, titel: "Die einfache Vergangenheit: Aussagen, Verneinung", regel: "Regelmäßig: Verb + -ed (visit → visited, stop → stopped). Unregelmäßige Formen lernen: meet → met, take → took, buy → bought. Verneinung: didn’t + Grundform → I didn’t meet my cousin." },
  { id: "6-G4",  klasse: 6, unit: 1, titel: "Die einfache Vergangenheit: Fragen, Kurzantworten", regel: "Did + Person + Grundform? → Did you visit your aunt? Kurzantworten: Yes, I did. / No, she didn’t. Mit Fragewort: Where did you stay?" },
  { id: "6-G5",  klasse: 6, unit: 2, titel: "Das Perfekt: Aussagen, Verneinung", regel: "have/has + 3. Form → I have tidied my room. Tom has seen a shark. Regelmäßig: -ed. Unregelmäßig lernen: see – saw – seen. just, already, never stehen vor der 3. Form. Verneinung: haven’t/hasn’t … yet (yet am Satzende)." },
  { id: "6-G6",  klasse: 6, unit: 2, titel: "Das Perfekt: Fragen, Kurzantworten", regel: "Have/Has + Person + 3. Form? → Have you ever been to London? Has Tom done his homework yet? Kurzantworten: Yes, I have. / No, he hasn’t." },
  { id: "6-G7",  klasse: 6, unit: 3, titel: "Steigerung von Adjektiven mit -er und more", regel: "" },
  { id: "6-G8",  klasse: 6, unit: 3, titel: "Steigerung von Adjektiven mit -est und most", regel: "" },
  { id: "6-G9",  klasse: 6, unit: 3, titel: "Some und any", regel: "" },
  { id: "6-G10", klasse: 6, unit: 4, titel: "Mengenangaben: much, many, lots of", regel: "" },
  { id: "6-G11", klasse: 6, unit: 4, titel: "Die einfache Gegenwart: Aussagen, Verneinung", regel: "" },
  { id: "6-G12", klasse: 6, unit: 4, titel: "Die einfache Gegenwart: Fragen, Kurzantworten", regel: "" },
  { id: "6-G13", klasse: 6, unit: 4, titel: "Die Zukunft mit will (spontane Entscheidungen)", regel: "" },
  { id: "6-G14", klasse: 6, unit: 5, titel: "Die Verlaufsform der Gegenwart: Aussagen", regel: "" },
  { id: "6-G15", klasse: 6, unit: 5, titel: "Die Verlaufsform der Gegenwart: Verneinung, Fragen, Kurzantworten", regel: "" },
  { id: "6-G16", klasse: 6, unit: 6, titel: "Bedingungssätze Typ I", regel: "" },
  { id: "6-G17", klasse: 6, unit: 6, titel: "Die Zukunft mit going to: Aussagen, Verneinung", regel: "" },
  { id: "6-G18", klasse: 6, unit: 6, titel: "Die Zukunft mit going to: Fragen, Kurzantworten", regel: "" },
  { id: "6-G19", klasse: 6, unit: 6, titel: "Die Zukunft mit will (Wünsche, Hoffnungen, Vorhersagen)", regel: "" }
];

// =====================================================================
// 3) DER SATZBAUKASTEN (Generator) – Wortschatz: Red Line 1 komplett + Red Line 2 bis zur Unit
//    "6-U1" = Klasse 6, Unit 1 (Red Line 1 und Red Line 2, Unit 1)
//    "6-U2" = Klasse 6, Unit 2 (zusätzlich Red Line 2, Unit 2)
// =====================================================================
K6.baukasten = {
  // ---------- Klasse 6, Unit 1 ----------
  "6-U1": {
    // er: true = he/she/it (Verb mit -s), poss = passender Begleiter, pron = Pronomen für Kurzantworten, kind = passt zu Schul-Situationen
    personen: [
      { text: "I",          er: false, poss: "my",    pron: "I",    kind: true }, { text: "you",        er: false, poss: "your",  pron: "you",  kind: true },
      { text: "we",         er: false, poss: "our",   pron: "we",   kind: true }, { text: "they",       er: false, poss: "their", pron: "they", kind: true },
      { text: "my parents", er: false, poss: "their", pron: "they" },             { text: "my friends", er: false, poss: "their", pron: "they", kind: true },
      { text: "my grandparents", er: false, poss: "their", pron: "they" },        { text: "Tom and Emma", er: false, poss: "their", pron: "they", kind: true },
      { text: "he",         er: true,  poss: "his",   pron: "he",   kind: true }, { text: "she",        er: true,  poss: "her",   pron: "she",  kind: true },
      { text: "Tom",        er: true,  poss: "his",   pron: "he",   kind: true }, { text: "Emma",       er: true,  poss: "her",   pron: "she",  kind: true },
      { text: "Ben",        er: true,  poss: "his",   pron: "he",   kind: true }, { text: "Lily",       er: true,  poss: "her",   pron: "she",  kind: true },
      { text: "my brother", er: true,  poss: "his",   pron: "he",   kind: true }, { text: "my sister",  er: true,  poss: "her",   pron: "she",  kind: true },
      { text: "my aunt",    er: true,  poss: "her",   pron: "she" }
    ],
    // Simple past (G3, G4). unreg = unregelmäßig, falsch = typische falsche Formen, zeit = passende Zeitangaben
    verbenPast: [
      { grund: "visit",   s: "visits",   past: "visited",   rest: "{POSS} grandparents" },
      { grund: "visit",   s: "visits",   past: "visited",   rest: "a museum" },
      { grund: "stay",    s: "stays",    past: "stayed",    rest: "in a hotel", zeit: ["last summer", "last year"] },
      { grund: "pack",    s: "packs",    past: "packed",    rest: "{POSS} suitcase", zeit: ["yesterday", "last night"] },
      { grund: "climb",   s: "climbs",   past: "climbed",   rest: "a mountain", zeit: ["last summer", "last year"] },
      { grund: "start",   s: "starts",   past: "started",   rest: "a band", zeit: ["last year", "last summer"] },
      { grund: "play",    s: "plays",    past: "played",    rest: "cricket" },
      { grund: "play",    s: "plays",    past: "played",    rest: "volleyball" },
      { grund: "borrow",  s: "borrows",  past: "borrowed",  rest: "a book" },
      { grund: "enjoy",   s: "enjoys",   past: "enjoyed",   rest: "the concert", zeit: ["yesterday", "last Saturday", "last night"] },
      { grund: "finish",  s: "finishes", past: "finished",  rest: "the experiment", nurKind: true, zeit: ["yesterday", "last week"] },
      { grund: "use",     s: "uses",     past: "used",      rest: "{POSS} mobile" },
      { grund: "sunbathe", s: "sunbathes", past: "sunbathed", rest: "on the beach", zeit: ["last summer", "yesterday"] },
      { grund: "go",      s: "goes",     past: "went",      rest: "shopping", unreg: true, falsch: ["goed"] },
      { grund: "meet",    s: "meets",    past: "met",       rest: "{POSS} cousin", unreg: true, falsch: ["meeted"] },
      { grund: "sing",    s: "sings",    past: "sang",      rest: "a song", unreg: true, falsch: ["singed"] },
      { grund: "hear",    s: "hears",    past: "heard",     rest: "a funny story", unreg: true, falsch: ["heared"] },
      { grund: "feel",    s: "feels",    past: "felt",      rest: "nervous", unreg: true, falsch: ["feeled"], zeit: ["yesterday", "last Monday"] },
      { grund: "give",    s: "gives",    past: "gave",      rest: "{POSS} friend a present", unreg: true, falsch: ["gived"] },
      { grund: "take",    s: "takes",    past: "took",      rest: "a photo", unreg: true, falsch: ["taked"] },
      { grund: "bring",   s: "brings",   past: "brought",   rest: "a cake", unreg: true, falsch: ["bringed"] },
      { grund: "understand", s: "understands", past: "understood", rest: "the question", unreg: true, falsch: ["understanded"], zeit: ["yesterday", "last week"] },
      { grund: "lose",    s: "loses",    past: "lost",      rest: "{POSS} hat", unreg: true, falsch: ["losed"], einzeln: true },
      { grund: "find",    s: "finds",    past: "found",     rest: "{POSS} mobile", unreg: true, falsch: ["finded"], einzeln: true },
      { grund: "buy",     s: "buys",     past: "bought",    rest: "a souvenir", unreg: true, falsch: ["buyed"] },
      { grund: "fly",     s: "flies",    past: "flew",      rest: "to another country", unreg: true, falsch: ["flied"], zeit: ["last summer", "last year"] },
      { grund: "have",    s: "has",      past: "had",       rest: "ice cream", unreg: true, falsch: ["haved"] },
      { grund: "see",     s: "sees",     past: "saw",       rest: "{POSS} cousin", unreg: true }
    ],
    zeitenPast: ["yesterday", "last week", "last Saturday", "last summer", "last year"],

    // Adjektiv / Adverb (G1). regel: ly (quick → quickly), ily (angry → angrily), unreg (good → well, fast, hard)
    adjAdv: [
      { adj: "quick",   adv: "quickly",   regel: "ly" },  { adj: "careful", adv: "carefully", regel: "ly" },
      { adj: "nervous", adv: "nervously", regel: "ly" },  { adj: "polite",  adv: "politely",  regel: "ly" },
      { adj: "quiet",   adv: "quietly",   regel: "ly" },  { adj: "bad",     adv: "badly",     regel: "ly" },
      { adj: "angry",   adv: "angrily",   regel: "ily" }, { adj: "happy",   adv: "happily",   regel: "ily" },
      { adj: "good",    adv: "well",      regel: "unreg" }, { adj: "fast",  adv: "fast",      regel: "unreg" },
      { adj: "hard",    adv: "hard",      regel: "unreg" }
    ],
    // Sätze, in denen ein ADVERB stehen muss (Wie macht jemand etwas?). ___ = Lücke, w = passende Adjektive
    advRahmen: [
      { t: "{P} ran ___ to school.",                 w: ["quick", "fast"], nurKind: true },
      { t: "{P} answered the question ___.",          w: ["quick", "polite", "nervous", "quiet", "good"] },
      { t: "{P} opened the door ___.",                w: ["careful", "quiet", "quick"] },
      { t: "{P} said sorry ___.",                     w: ["polite", "quiet", "nervous", "quick"] },
      { t: "{P} shouted ___.",                        w: ["angry", "happy"] },
      { t: "{P} played cricket very ___.",            w: ["good", "bad"] },
      { t: "{P} worked ___ for the test.",            w: ["hard"], nurKind: true },
      { t: "{P} sang ___ at the concert.",            w: ["good", "bad", "nervous", "happy"] },
      { t: "{P} packed {POSS} suitcase ___.",         w: ["careful", "quick"] },
      { t: "{P} walked ___ into the classroom.",      w: ["quiet", "quick", "nervous", "happy"], nurKind: true },
      { t: "{P} climbed the mountain ___.",           w: ["careful", "fast", "quick"] },
      { t: "{P} read the e-mail ___.",                w: ["careful", "quick"] },
      { t: "{P} talked ___ to {POSS} grandmother.",   w: ["quiet", "happy", "polite"] }
    ],
    // Sätze, in denen ein ADJEKTIV stehen muss (nach be oder vor einem Nomen). {WAS} = was/were
    adjRahmen: [
      { t: "{P} {WAS} very ___.",                     w: ["nervous", "angry", "happy", "quiet", "polite"] },
      { t: "Be ___!",                                 w: ["careful", "quiet", "polite"] },
      { t: "It was a ___ day.",                       w: ["good", "bad", "happy"] },
      { t: "{P} {WAS} ___ after the concert.",        w: ["happy", "angry"] },
      { t: "That was a ___ answer.",                  w: ["good", "bad", "quick", "polite"] },
      { t: "{P} {WAS} very ___ at cricket.",          w: ["good", "bad"] }
    ],

    // Possessivpronomen (G2): sub = Pronomen, det = Begleiter (my …), pron = Possessivpronomen (mine …)
    besitzer: [
      { text: "I",    sub: "I",    det: "my",    pron: "mine" },   { text: "you",  sub: "you",  det: "your",  pron: "yours" },
      { text: "he",   sub: "he",   det: "his",   pron: "his" },    { text: "she",  sub: "she",  det: "her",   pron: "hers" },
      { text: "we",   sub: "we",   det: "our",   pron: "ours" },   { text: "they", sub: "they", det: "their", pron: "theirs" },
      { text: "Tom",  sub: "he",   det: "his",   pron: "his" },    { text: "Emma", sub: "she",  det: "her",   pron: "hers" },
      { text: "Ben",  sub: "he",   det: "his",   pron: "his" },    { text: "Lily", sub: "she",  det: "her",   pron: "hers" },
      { text: "my brother", sub: "he", det: "his", pron: "his" },  { text: "my sister", sub: "she", det: "her", pron: "hers" },
      { text: "my aunt", sub: "she", det: "her", pron: "hers" },   { text: "my parents", sub: "they", det: "their", pron: "theirs" },
      { text: "my grandparents", sub: "they", det: "their", pron: "theirs" }, { text: "Tom and Emma", sub: "they", det: "their", pron: "theirs" }
    ],
    dinge:  ["bag", "pen", "ruler", "mobile", "cap", "hat", "book", "bike", "comic", "suitcase", "T-shirt", "pencil case"],
    farben: ["red", "blue", "green", "black", "yellow", "white"],

    erklaerungen: {
      pastaussneg: {
        reg:      "Regelmäßige Verben bekommen in der Vergangenheit -ed (bei -e nur -d; stop → stopped). Die Form ist bei allen Personen gleich. Beispiel: {BEISPIEL}",
        unreg:    "Dieses Verb ist unregelmäßig: Die Vergangenheitsform hat kein -ed, du musst sie lernen. Beispiel: {BEISPIEL}",
        neg:      "Verneinung in der Vergangenheit: didn't + Grundform. Nach didn't steht nie die Vergangenheitsform. Beispiel: {BEISPIEL}",
        zuordnenAussage: "Regelmäßige Verben bekommen -ed (visit → visited). Unregelmäßige Verben haben eine eigene Form (meet → met, take → took).",
        zuordnenNeg: "Richtig ist: didn't + Grundform. Nach didn't steht nie die Vergangenheitsform (met, took) und nie ein -s."
      },
      pastfrage: {
        frage:    "Fragen in der Vergangenheit: Did + Person + Grundform. Beispiel: {BEISPIEL}",
        kurzJa:   "Kurzantwort mit Ja: Yes, + Person (I, he, she, we, they) + did. Beispiel: {BEISPIEL}",
        kurzNein: "Kurzantwort mit Nein: No, + Person (I, he, she, we, they) + didn't. Beispiel: {BEISPIEL}",
        zuordnen: "Richtig ist: Did + Person + Grundform. Nach Did steht nie die Vergangenheitsform und nie ein -s."
      },
      adverb: {
        ly:    "Wie macht jemand etwas? Dann brauchst du ein Adverb: Adjektiv + -ly. Beispiel: {BEISPIEL}",
        ily:   "Wie macht jemand etwas? Dann brauchst du ein Adverb. Endet das Adjektiv auf -y, wird daraus -ily (angry → angrily). Beispiel: {BEISPIEL}",
        unreg: "Sonderfälle beim Adverb: good → well, fast → fast, hard → hard (ohne -ly! hardly heißt „kaum“). Beispiel: {BEISPIEL}",
        adj:   "Wie ist jemand oder etwas? Nach be (is, was …) und vor einem Nomen steht das Adjektiv, ohne -ly. Beispiel: {BEISPIEL}",
        zuordnen: "Adjektive beschreiben eine Person oder Sache (quiet, good). Adverbien beschreiben, wie jemand etwas tut, sie enden meist auf -ly (quietly). Sonderfall: good → well."
      },
      posspron: {
        pron: "Steht KEIN Nomen dahinter, brauchst du das Possessivpronomen: mine, yours, his, hers, ours, theirs. Beispiel: {BEISPIEL}",
        det:  "Steht ein Nomen dahinter, brauchst du den Begleiter: my, your, his, her, our, their. Beispiel: {BEISPIEL}",
        zuordnen: "I → mine, you → yours, he → his, she → hers, we → ours, they → theirs. Namen: Tom → his, Emma → hers, my parents → theirs."
      }
    }
  },

  // ---------- Klasse 6, Unit 2 ----------
  "6-U2": {
    personen: [
      { text: "I",          er: false, poss: "my",    pron: "I",    kind: true }, { text: "you",        er: false, poss: "your",  pron: "you",  kind: true },
      { text: "we",         er: false, poss: "our",   pron: "we",   kind: true }, { text: "they",       er: false, poss: "their", pron: "they", kind: true },
      { text: "my parents", er: false, poss: "their", pron: "they" },             { text: "my friends", er: false, poss: "their", pron: "they", kind: true },
      { text: "Tom and Emma", er: false, poss: "their", pron: "they", kind: true },
      { text: "he",         er: true,  poss: "his",   pron: "he",   kind: true }, { text: "she",        er: true,  poss: "her",   pron: "she",  kind: true },
      { text: "Tom",        er: true,  poss: "his",   pron: "he",   kind: true }, { text: "Emma",       er: true,  poss: "her",   pron: "she",  kind: true },
      { text: "Ben",        er: true,  poss: "his",   pron: "he",   kind: true }, { text: "Lily",       er: true,  poss: "her",   pron: "she",  kind: true },
      { text: "my brother", er: true,  poss: "his",   pron: "he",   kind: true }, { text: "my sister",  er: true,  poss: "her",   pron: "she",  kind: true },
      { text: "my dad",     er: true,  poss: "his",   pron: "he" },               { text: "my mum",     er: true,  poss: "her",   pron: "she" }
    ],
    // Perfekt (G5, G6). part = 3. Form.
    // typ "erledigt" = Aufgaben (mit just, already, not … yet); typ "erlebt" = Erlebnisse (mit ever, never)
    verbenPerf: [
      { grund: "tidy",    s: "tidies",   past: "tidied",   part: "tidied",   rest: "{POSS} room",        typ: "erledigt" },
      { grund: "do",      s: "does",     past: "did",      part: "done",     rest: "the washing up",     typ: "erledigt", unreg: true },
      { grund: "do",      s: "does",     past: "did",      part: "done",     rest: "{POSS} homework",    typ: "erledigt", unreg: true, nurKind: true },
      { grund: "lay",     s: "lays",     past: "laid",     part: "laid",     rest: "the table",          typ: "erledigt", unreg: true },
      { grund: "clear",   s: "clears",   past: "cleared",  part: "cleared",  rest: "the table",          typ: "erledigt" },
      { grund: "hoover",  s: "hoovers",  past: "hoovered", part: "hoovered", rest: "the living room",    typ: "erledigt" },
      { grund: "take",    s: "takes",    past: "took",     part: "taken",    rest: "the rubbish out",    typ: "erledigt", unreg: true },
      { grund: "feed",    s: "feeds",    past: "fed",      part: "fed",      rest: "the cat",            typ: "erledigt", unreg: true },
      { grund: "sweep",   s: "sweeps",   past: "swept",    part: "swept",    rest: "the floor",          typ: "erledigt", unreg: true },
      { grund: "finish",  s: "finishes", past: "finished", part: "finished", rest: "{POSS} homework",    typ: "erledigt", nurKind: true },
      { grund: "pack",    s: "packs",    past: "packed",   part: "packed",   rest: "{POSS} suitcase",    typ: "erledigt" },
      { grund: "buy",     s: "buys",     past: "bought",   part: "bought",   rest: "the tickets",        typ: "erledigt", unreg: true },
      { grund: "check",   s: "checks",   past: "checked",  part: "checked",  rest: "the website",        typ: "erledigt" },
      { grund: "eat",     s: "eats",     past: "ate",      part: "eaten",    rest: "{POSS} breakfast",   typ: "erledigt", unreg: true },
      { grund: "draw",    s: "draws",    past: "drew",     part: "drawn",    rest: "a picture",          typ: "erledigt", unreg: true },
      { grund: "make",    s: "makes",    past: "made",     part: "made",     rest: "a cake",             typ: "erledigt", unreg: true },
      { grund: "send",    s: "sends",    past: "sent",     part: "sent",     rest: "the e-mail",         typ: "erledigt", unreg: true },
      { grund: "be",      s: "is",       past: "was",      part: "been",     rest: "to London",          typ: "erlebt",   unreg: true },
      { grund: "be",      s: "is",       past: "was",      part: "been",     rest: "to a concert",       typ: "erlebt",   unreg: true },
      { grund: "meet",    s: "meets",    past: "met",      part: "met",      rest: "a star",             typ: "erlebt",   unreg: true },
      { grund: "win",     s: "wins",     past: "won",      part: "won",      rest: "a prize",            typ: "erlebt",   unreg: true },
      { grund: "climb",   s: "climbs",   past: "climbed",  part: "climbed",  rest: "a mountain",         typ: "erlebt" },
      { grund: "stay",    s: "stays",    past: "stayed",   part: "stayed",   rest: "in a hotel",         typ: "erlebt" },
      { grund: "play",    s: "plays",    past: "played",   part: "played",   rest: "cricket",            typ: "erlebt" },
      { grund: "see",     s: "sees",     past: "saw",      part: "seen",     rest: "a shark",            typ: "erlebt",   unreg: true },
      { grund: "break",   s: "breaks",   past: "broke",    part: "broken",   rest: "a window",           typ: "erlebt",   unreg: true },
      { grund: "lose",    s: "loses",    past: "lost",     part: "lost",     rest: "{POSS} mobile",      typ: "erlebt",   unreg: true, einzeln: true },
      { grund: "forget",  s: "forgets",  past: "forgot",   part: "forgotten", rest: "{POSS} homework",   typ: "erlebt",   unreg: true, nurKind: true }
    ],
    erklaerungen: {
      perfekt: {
        reg:   "Perfekt: have/has + 3. Form. Bei he, she, it (Tom, my sister) steht has. Regelmäßige Verben: 3. Form mit -ed (tidy → tidied). Beispiel: {BEISPIEL}",
        unreg: "Perfekt: have/has + 3. Form. Dieses Verb ist unregelmäßig, die 3. Form musst du lernen (see – saw – seen). Beispiel: {BEISPIEL}",
        neg:   "Verneinung im Perfekt: haven't/hasn't + 3. Form. „yet“ (noch nicht) steht am Satzende. Beispiel: {BEISPIEL}",
        zuordnen: "I, you, we, they und mehrere Personen → have. He, she, it und eine Person (Tom, my mum) → has.",
        zuordnenSaetze: "Richtig ist: has (bei he, she, it) oder have + 3. Form. Nicht die 2. Form (took, saw) und nicht die Grundform."
      },
      perfektfrage: {
        frage:    "Fragen im Perfekt: Have/Has + Person + 3. Form? „ever“ (jemals) steht vor der 3. Form, „yet“ (schon) am Ende. Beispiel: {BEISPIEL}",
        kurzJa:   "Kurzantwort mit Ja: Yes, + Person + have/has. Beispiel: {BEISPIEL}",
        kurzNein: "Kurzantwort mit Nein: No, + Person + haven't/hasn't. Beispiel: {BEISPIEL}",
        zuordnen: "He, she, it und eine Person → Has …? You, they und mehrere Personen → Have …?",
        zuordnenSaetze: "Richtig ist: Have/Has + Person + 3. Form. Nicht Did, nicht die 2. Form (saw, took)."
      }
    }
  }
};

// =====================================================================
// 5) GENERATOREN: Welches Thema nutzt welchen Baukasten und welche Aufgaben-Art?
//   adverb (Adjektiv/Adverb), posspron (mine, yours …), pastaussneg (simple past: Aussagen + Verneinung),
//   pastfrage (simple past: Fragen + Kurzantworten), perfekt (Aussagen + Verneinung), perfektfrage (Fragen + Kurzantworten)
// =====================================================================
K6.generatoren = {
  "6-G1": { baukasten: "6-U1", art: "adverb" },
  "6-G2": { baukasten: "6-U1", art: "posspron" },
  "6-G3": { baukasten: "6-U1", art: "pastaussneg" },
  "6-G4": { baukasten: "6-U1", art: "pastfrage" },
  "6-G5": { baukasten: "6-U2", art: "perfekt" },
  "6-G6": { baukasten: "6-U2", art: "perfektfrage" }
};

// =====================================================================
// 6) DIE AUFGABEN (handgeschriebener Pool) – Formen wie in klasse5.js beschrieben
// =====================================================================
K6.aufgaben = [
  // ---------- 6-G1  Adjektive und Adverbien ----------
  { thema: "6-G1", niveau: "gruen", form: "quiz", frage: "Emma sings very ___.", optionen: ["good", "well"], loesung: "well",
    erklaerung: "Wie singt Emma? Dann brauchst du ein Adverb. Das Adverb von good ist well. Beispiel: Tom plays cricket well." },
  { thema: "6-G1", niveau: "gruen", form: "quiz", frage: "Tom is a ___ boy. He never shouts.", optionen: ["quiet", "quietly"], loesung: "quiet",
    erklaerung: "Vor einem Nomen (boy) steht das Adjektiv, ohne -ly. Beispiel: Lily is a polite girl." },
  { thema: "6-G1", niveau: "gelb", form: "luecke", frage: "The dog ran ___ (fast) into the garden.", loesung: ["fast"],
    erklaerung: "fast bleibt auch als Adverb fast, ohne -ly. Beispiel: Ben climbed the mountain fast." },
  { thema: "6-G1", niveau: "gelb", form: "satzbau", loesung: ["Please close the door quietly."],
    erklaerung: "Das Adverb beschreibt, wie man etwas tut. Es steht meist hinter dem Verb und seinem Objekt. Beispiel: Emma read the e-mail carefully." },
  { thema: "6-G1", niveau: "rot", form: "fehler", satz: "Lily speaks English very good.", fehlerwort: "good", loesung: ["well"],
    erklaerung: "Wie spricht Lily? → Adverb. Das Adverb von good ist well. Beispiel: My brother sings well." },
  { thema: "6-G1", niveau: "rot", form: "fehler", satz: "Be carefully on the escalator.", fehlerwort: "carefully", loesung: ["careful"],
    erklaerung: "Nach be steht das Adjektiv, ohne -ly. Beispiel: Be quiet, please!" },
  { thema: "6-G1", niveau: "rot", form: "umformen", frage: "Complete:  Lily is a good singer. → Lily sings …", loesung: ["Lily sings well."],
    erklaerung: "Wie singt Lily? → Adverb. good wird zu well. Beispiel: Tom's answer was good. → Tom answered well." },

  // ---------- 6-G2  Possessivpronomen ----------
  { thema: "6-G2", niveau: "gruen", form: "quiz", frage: "„Is this your hat?“ – „No, it isn't ___. It's Ben's.“", optionen: ["mine", "my", "me"], loesung: "mine",
    erklaerung: "Nach it isn't steht kein Nomen mehr. Dann brauchst du mine, yours, his … Beispiel: This bag is mine." },
  { thema: "6-G2", niveau: "gruen", form: "quiz", frage: "These are my parents' suitcases. They're ___.", optionen: ["theirs", "their", "them"], loesung: "theirs",
    erklaerung: "My parents = they. Ohne Nomen danach: theirs. Beispiel: The bikes are theirs." },
  { thema: "6-G2", niveau: "gelb", form: "luecke", frage: "Can I borrow your pen? ___ (I) is at home.", loesung: ["Mine"],
    erklaerung: "„Mein Stift“ wird hier zu mine, weil pen nicht wiederholt wird. Beispiel: Your bag is red. Mine is blue." },
  { thema: "6-G2", niveau: "gelb", form: "satzbau", loesung: ["Is this comic yours?"],
    erklaerung: "Ohne Nomen danach: mine, yours, his, hers, ours, theirs. Beispiel: Is this bike yours?" },
  { thema: "6-G2", niveau: "rot", form: "fehler", satz: "This isn't your bag. It's my.", fehlerwort: "my", loesung: ["mine"],
    erklaerung: "my steht nur vor einem Nomen (my bag). Ohne Nomen danach: mine. Beispiel: This pen is mine." },
  { thema: "6-G2", niveau: "rot", form: "umformen", frage: "Use hers:  This is Emma's mobile. → This mobile is …", loesung: ["This mobile is hers."],
    erklaerung: "Emma = she → hers (ohne Nomen danach). Beispiel: This is Lily's bag. → This bag is hers." },

  // ---------- 6-G3  Simple past: Aussagen und Verneinung ----------
  { thema: "6-G3", niveau: "gruen", form: "quiz", frage: "Last summer we ___ to Jamaica.", optionen: ["flew", "flied", "fly"], loesung: "flew",
    erklaerung: "fly ist unregelmäßig: fly – flew. Beispiel: My aunt flew to another country." },
  { thema: "6-G3", niveau: "gruen", form: "quiz", frage: "I ___ my cousin yesterday.", optionen: ["didn't meet", "didn't met", "not met"], loesung: "didn't meet",
    erklaerung: "Verneinung: didn't + Grundform (meet, nicht met). Beispiel: Tom didn't buy a souvenir." },
  { thema: "6-G3", niveau: "gelb", form: "luecke", frage: "Emma ___ (lose) her mobile on the bus.", loesung: ["lost"],
    erklaerung: "lose ist unregelmäßig: lose – lost. Beispiel: I lost my hat last week." },
  { thema: "6-G3", niveau: "gelb", form: "luecke", frage: "We ___ (not / understand) the question.", loesung: ["didn't understand"],
    erklaerung: "Verneinung: didn't + Grundform. Beispiel: They didn't enjoy the concert." },
  { thema: "6-G3", niveau: "rot", form: "fehler", satz: "My aunt didn't came to the wedding.", fehlerwort: "came", loesung: ["come"],
    erklaerung: "Nach didn't steht die Grundform (come), nicht die Vergangenheitsform. Beispiel: Ben didn't go shopping." },
  { thema: "6-G3", niveau: "rot", form: "umformen", frage: "Make the sentence negative:  Ben brought a cake.", loesung: ["Ben didn't bring a cake."],
    erklaerung: "didn't + Grundform: brought → didn't bring. Beispiel: Lily took a photo. → Lily didn't take a photo." },

  // ---------- 6-G4  Simple past: Fragen und Kurzantworten ----------
  { thema: "6-G4", niveau: "gruen", form: "quiz", frage: "___ you buy a souvenir in Jamaica?", optionen: ["Did", "Do", "Were"], loesung: "Did",
    erklaerung: "Fragen in der Vergangenheit beginnen mit Did. Beispiel: Did Tom visit his grandparents?" },
  { thema: "6-G4", niveau: "gelb", form: "luecke", frage: "Did your grandparents come to the wedding? – Yes, ___.", loesung: ["they did", "yes, they did"],
    erklaerung: "Kurzantwort: Yes, + Person + did. Your grandparents = they. Beispiel: Did Emma sing? – Yes, she did." },
  { thema: "6-G4", niveau: "gelb", form: "satzbau", loesung: ["Where did you stay in Jamaica?"],
    erklaerung: "Fragewort – did – Person – Grundform – Rest? Beispiel: What did you buy?" },
  { thema: "6-G4", niveau: "rot", form: "fehler", satz: "Did Lily found her hat?", fehlerwort: "found", loesung: ["find"],
    erklaerung: "Nach Did steht die Grundform (find), nicht die Vergangenheitsform. Beispiel: Did you meet your cousin?" },
  { thema: "6-G4", niveau: "rot", form: "umformen", frage: "Ask a question with „where“:  They stayed in a hotel.", loesung: ["Where did they stay?"],
    erklaerung: "Where + did + Person + Grundform? Beispiel: Where did Tom go?" },

  // ---------- 6-G5  Perfekt: Aussagen und Verneinung ----------
  { thema: "6-G5", niveau: "gruen", form: "quiz", frage: "I have ___ the film.", optionen: ["seen", "saw", "see"], loesung: "seen",
    erklaerung: "Nach have/has steht die 3. Form: see – saw – seen. Beispiel: Tom has seen a shark." },
  { thema: "6-G5", niveau: "gruen", form: "quiz", frage: "We haven't finished our homework ___.", optionen: ["yet", "already", "just"], loesung: "yet",
    erklaerung: "Bei der Verneinung heißt „noch nicht“ not … yet. yet steht am Satzende. Beispiel: Emma hasn't tidied her room yet." },
  { thema: "6-G5", niveau: "gelb", form: "luecke", frage: "My dad ___ (just / arrive) home.", loesung: ["has just arrived"],
    erklaerung: "My dad = he → has + just + 3. Form (arrived). Beispiel: The bus has just arrived." },
  { thema: "6-G5", niveau: "gelb", form: "satzbau", loesung: ["I have never won a prize."],
    erklaerung: "never steht zwischen have/has und der 3. Form. Beispiel: My parents have never been to London." },
  { thema: "6-G5", niveau: "rot", form: "fehler", satz: "Emma has already took the rubbish out.", fehlerwort: "took", loesung: ["taken"],
    erklaerung: "Nach has steht die 3. Form: take – took – taken. Beispiel: Tom has already taken a photo." },
  { thema: "6-G5", niveau: "rot", form: "fehler", satz: "They has already laid the table.", fehlerwort: "has", loesung: ["have"],
    erklaerung: "Bei they (I, you, we) steht have. Beispiel: My friends have already done the washing up." },
  { thema: "6-G5", niveau: "rot", form: "umformen", frage: "Make it negative. Use „yet“:  The actors have learned their lines.",
    loesung: ["The actors haven't learned their lines yet.", "The actors haven't learnt their lines yet."],
    erklaerung: "haven't/hasn't + 3. Form … yet. Beispiel: We haven't bought the tickets yet." },

  // ---------- 6-G6  Perfekt: Fragen und Kurzantworten ----------
  { thema: "6-G6", niveau: "gruen", form: "quiz", frage: "___ you ever been to London?", optionen: ["Have", "Has", "Did"], loesung: "Have",
    erklaerung: "Bei you steht Have. Fragen im Perfekt: Have/Has + Person + 3. Form. Beispiel: Have your parents ever met a star?" },
  { thema: "6-G6", niveau: "gruen", form: "quiz", frage: "Has Tom tidied his room ___?", optionen: ["yet", "just", "never"], loesung: "yet",
    erklaerung: "„Schon?“ heißt in Fragen yet. Es steht am Satzende. Beispiel: Have you done your homework yet?" },
  { thema: "6-G6", niveau: "gelb", form: "luecke", frage: "Have you ever met a star? – No, ___.", loesung: ["I haven't", "no, I haven't", "we haven't", "no, we haven't"],
    erklaerung: "Kurzantwort: No, + Person + haven't/hasn't. Beispiel: Has Emma ever won a prize? – No, she hasn't." },
  { thema: "6-G6", niveau: "gelb", form: "satzbau", loesung: ["Has your sister ever won a prize?"],
    erklaerung: "Has/Have – Person – ever – 3. Form – Rest? Beispiel: Have you ever climbed a mountain?" },
  { thema: "6-G6", niveau: "rot", form: "fehler", satz: "Have Emma fed the cat yet?", fehlerwort: "Have", loesung: ["Has"],
    erklaerung: "Emma = she → Has. Beispiel: Has Tom done the washing up yet?" },
  { thema: "6-G6", niveau: "rot", form: "umformen", frage: "Ask a question. Use „ever“:  Ben has climbed a mountain.", loesung: ["Has Ben ever climbed a mountain?"],
    erklaerung: "Has/Have + Person + ever + 3. Form? Beispiel: Have your friends ever been to a concert?" }
];

// =====================================================================
// 7) ZUSATZFRAGEN für die Pulverkammer (Quiz mit 3 Antworten)
// =====================================================================
K6.zusatzfragen = [
  { thema: "6-G1", frage: "Which sentence is correct?", optionen: ["Tom sings well.", "Tom sings good.", "Tom sings goodly."], loesung: "Tom sings well." },
  { thema: "6-G1", frage: "Which is the adverb of „angry“?", optionen: ["angryly", "angrily", "angrly"], loesung: "angrily" },
  { thema: "6-G1", frage: "Which sentence is correct?", optionen: ["She ran quick to school.", "She ran quickly to school.", "She quick ran to school."], loesung: "She ran quickly to school." },
  { thema: "6-G2", frage: "„Whose bag is this?“ – „It's Lily's. It's …“", optionen: ["her.", "hers.", "she."], loesung: "hers." },
  { thema: "6-G2", frage: "Which sentence is correct?", optionen: ["This is mine bag.", "This bag is mine.", "This bag is my."], loesung: "This bag is mine." },
  { thema: "6-G2", frage: "We have a new car. The car is …", optionen: ["ours.", "our.", "us."], loesung: "ours." },
  { thema: "6-G3", frage: "Which is the past of „bring“?", optionen: ["brought", "bringed", "brang"], loesung: "brought" },
  { thema: "6-G3", frage: "Which sentence is correct?", optionen: ["I didn't lost my hat.", "I didn't lose my hat.", "I not lost my hat."], loesung: "I didn't lose my hat." },
  { thema: "6-G3", frage: "Which is the past of „feel“?", optionen: ["feeled", "felt", "fell"], loesung: "felt" },
  { thema: "6-G4", frage: "„Did you enjoy the concert?“ – „Yes, …“", optionen: ["I did.", "I enjoyed.", "I do."], loesung: "I did." },
  { thema: "6-G4", frage: "Which question is correct?", optionen: ["Did Tom met his cousin?", "Did Tom meet his cousin?", "Does Tom met his cousin?"], loesung: "Did Tom meet his cousin?" },
  { thema: "6-G4", frage: "„Did Emma take a photo?“ – „No, …“", optionen: ["she didn't.", "she doesn't.", "she wasn't."], loesung: "she didn't." },
  { thema: "6-G5", frage: "Which sentence is correct?", optionen: ["She has just fed the cat.", "She have just fed the cat.", "She has just feed the cat."], loesung: "She has just fed the cat." },
  { thema: "6-G5", frage: "Which is the 3rd form of „see“?", optionen: ["saw", "seen", "seed"], loesung: "seen" },
  { thema: "6-G5", frage: "We haven't hoovered the living room …", optionen: ["yet.", "already.", "just."], loesung: "yet." },
  { thema: "6-G6", frage: "„Has Emma done the washing up?“ – „No, …“", optionen: ["she hasn't.", "she didn't.", "she isn't."], loesung: "she hasn't." },
  { thema: "6-G6", frage: "Which question is correct?", optionen: ["Have you ever been to London?", "Did you ever been to London?", "Has you ever been to London?"], loesung: "Have you ever been to London?" },
  { thema: "6-G6", frage: "„Have your parents met the director?“ – „Yes, …“", optionen: ["they have.", "they has.", "they did."], loesung: "they have." }
];

// =====================================================================
// 8) MINISPIELE
//    Belohnung nach einem geschafften Zusatzraum: Knopf „🎁 Minispiel?“. Höchstens 30 Sekunden, zählt NICHT für den Code.
//    Nur die Spiele, die unter „spiele“ stehen, werden in dieser Welt angeboten.
//    titel / anleitung / erfolg = Texte; ziel = so viele Punkte braucht man. Die Spieltechnik steht in spiele/minispiele.js.
// =====================================================================
K6.minispiele = {
  spiele: {
    obstkorb: {
      titel: "🪙 Schatzregen",
      anleitung: "Der Sturm schüttelt die Schatzkisten! Schiebt den Korb mit dem Finger und fangt den Schatz auf. Vorsicht vor Bomben und Fischgräten!",
      ziel: 12,
      erfolg: "Der Korb ist voll! Käpt'n Grammar zählt schon nach."
    },
    nachtflug: {
      titel: "🦜 Flug durch die Masten",
      anleitung: "Tippt, damit der Bordpapagei flattert! Fliegt zwischen den Segeln hindurch und sammelt Goldmünzen 🪙. Anstoßen ist nicht schlimm.",
      ziel: 8,
      erfolg: "Acht Münzen im Schnabel! Der Käpt'n ist stolz."
    },
    rutsche: {
      titel: "🐒 Schiffsaffe an Deck",
      anleitung: "Tippt, damit der Schiffsaffe springt! Hüpft über Fässer und Kisten und schnappt euch die Bananen 🍌.",
      ziel: 8,
      erfolg: "Satt und zufrieden! Der Affe salutiert."
    },
    taschenlampe: {
      titel: "🔦 Suche im Laderaum",
      anleitung: "Im dunklen Laderaum ist einiges versteckt – manches hinter Kisten. Fahrt mit dem Finger herum und haltet das Licht kurz darauf!",
      ziel: 6,
      erfolg: "Alles gefunden! Ihr habt Augen wie ein Ausguck."
    }
  },

  // ---------- Schatzregen (Technik: obstkorb) ----------
  obst: [
    { emoji: "🪙", en: "coin",     de: "Münze" },      { emoji: "💎", en: "diamond",  de: "Diamant" },
    { emoji: "👑", en: "crown",    de: "Krone" },      { emoji: "💍", en: "ring",     de: "Ring" },
    { emoji: "🗝️", en: "key",      de: "Schlüssel" },  { emoji: "🧭", en: "compass",  de: "Kompass" },
    { emoji: "🏆", en: "cup",      de: "Pokal" },      { emoji: "📿", en: "necklace", de: "Kette" },
    { emoji: "🔔", en: "bell",     de: "Glocke" },     { emoji: "🗺️", en: "map",      de: "Karte" }
  ],
  muell: ["💣", "🦴", "🥾", "🐟"],          // nicht fangen!
  autsch: ["Autsch! Eine Bombe!", "Igitt, eine Fischgräte!", "Wer wirft denn Stiefel über Bord?!", "Das ist kein Schatz!"],

  // ---------- Flug durch die Masten (Technik: nachtflug) ----------
  flug: { figur: "🦜", stern: "🪙", krone: "⛵", himmel: ["☁️", "·", "✨", "🌙", "·", "☁️"] },
  flugAutsch: ["Autsch! Ein Segel!", "Huch! Weiterflattern!", "Kraaah! Fast!", "Federn zerzaust – weiter!"],

  // ---------- Schiffsaffe an Deck (Technik: rutsche) ----------
  rutsche: { figur: "🐒", fisch: "🍌", hindernisse: ["🛢️", "📦", "⚓"], hintergrund: ["⛵", "☁️", "⛵", "☁️"] },
  rutscheAutsch: ["Rumms! Weiter!", "Gegen das Fass! Weiter!", "Autsch!", "Hoppla – Kopf hoch!"],

  // ---------- Suche im Laderaum (Technik: taschenlampe) ----------
  nachtTiere: [
    { emoji: "🐀", en: "rat",     de: "Ratte" },     { emoji: "🗝️", en: "key",    de: "Schlüssel" },
    { emoji: "🧭", en: "compass", de: "Kompass" },   { emoji: "🪙", en: "coin",   de: "Münze" },
    { emoji: "🦜", en: "parrot",  de: "Papagei" },   { emoji: "🐈", en: "cat",    de: "Katze" },
    { emoji: "🕯️", en: "candle",  de: "Kerze" },     { emoji: "🗺️", en: "map",    de: "Karte" },
    { emoji: "⚓", en: "anchor",  de: "Anker" },     { emoji: "🔔", en: "bell",   de: "Glocke" },
    { emoji: "🦀", en: "crab",    de: "Krabbe" },    { emoji: "👑", en: "crown",  de: "Krone" }
  ],
  kulisse: ["📦", "🛢️", "📦", "🧺", "🛢️", "📦", "🪜", "🧺", "📦", "🛢️"]
};

// ---------- Weitere Minispiele (ab Version 0.7.1): acht Spiele pro Welt ----------
Object.assign(K6.minispiele.spiele, {
  fuettern: {
    titel: "🍲 Kombüsen-Chaos",
    anleitung: "Die Bordtiere haben Hunger! Zieht das Essen zum richtigen Tier – oder tippt das Tier an.",
    ziel: 6,
    erfolg: "Alle satt! Der Schiffskoch ist zufrieden."
  },
  schaukel: {
    titel: "🪢 Schwung am Tau",
    anleitung: "Der Schiffsaffe schwingt am Tau. Tippt, sobald der Ring ⭕ um ihn erscheint – dann springt er zum nächsten Tau!",
    ziel: 6,
    erfolg: "Was für Sprünge! Ihr seid echte Takelage-Profis."
  },
  seeloewe: {
    titel: "🐬 Delfin-Kunststück",
    anleitung: "Ein Delfin begleitet das Schiff! Haltet den Ball in der Luft – schiebt den Delfin mit dem Finger unter den Ball.",
    ziel: 10,
    erfolg: "Die ganze Crew klatscht! 👏"
  },
  codeknacker: {
    titel: "🗝️ Die Schatztruhe",
    anleitung: "Die Schatztruhe hat ein Zahlenschloss mit drei Ziffern. Tippt drei Ziffern. Nach jedem Versuch gibt es Hinweise: ● richtige Ziffer am richtigen Platz, ◐ Ziffer kommt vor, aber woanders, ○ kommt nicht vor.",
    ziel: 3,
    erfolg: "Die Truhe ist offen – Gold! 🪙"
  }
});
Object.assign(K6.minispiele, {
  // ---------- Kombüsen-Chaos (Technik: fuettern) ----------
  // haupt = passt eindeutig; auch = würde das auch fressen (wird nie als falsche Auswahl gezeigt)
  tiere: [
    { id: "papagei", emoji: "🦜", en: "parrot", de: "Papagei",     witz: "Der Papagei krächzt: „{futter}? Kraaah! Ich will Körner!“" },
    { id: "affe",    emoji: "🐒", en: "monkey", de: "Schiffsaffe", witz: "Der Schiffsaffe schnuppert: „{futter}? Ich will was Gelbes!“" },
    { id: "katze",   emoji: "🐈", en: "cat",    de: "Bordkatze",   witz: "Die Bordkatze dreht sich beleidigt um: „{futter}? Wo ist mein Fisch?“" },
    { id: "hund",    emoji: "🐕", en: "dog",    de: "Schiffshund", witz: "Der Schiffshund knurrt: „{futter}? Wo ist mein Knochen?!“" },
    { id: "ratte",   emoji: "🐀", en: "rat",    de: "Ratte",       witz: "Die Ratte piepst: „{futter}? Habt ihr keinen Käse?“" },
    { id: "kroete",  emoji: "🐢", en: "turtle", de: "Schildkröte", witz: "Die Schildkröte zieht langsam den Kopf ein: „{futter}? Neeein danke.“" }
  ],
  futter: [
    { emoji: "🌻", en: "sunflower seeds", de: "Sonnenblumenkerne", haupt: ["papagei"], auch: ["ratte"] },
    { emoji: "🍌", en: "bananas",         de: "Bananen",           haupt: ["affe"],    auch: ["papagei", "ratte", "kroete"] },
    { emoji: "🥥", en: "a coconut",       de: "Kokosnuss",         haupt: ["affe"],    auch: ["papagei", "ratte"] },
    { emoji: "🐟", en: "fish",            de: "Fisch",             haupt: ["katze"],   auch: ["hund", "kroete"] },
    { emoji: "🦴", en: "a bone",          de: "Knochen",           haupt: ["hund"],    auch: [] },
    { emoji: "🌭", en: "sausages",        de: "Würstchen",         haupt: ["hund"],    auch: ["katze", "ratte"] },
    { emoji: "🧀", en: "cheese",          de: "Käse",              haupt: ["ratte"],   auch: ["hund", "katze"] },
    { emoji: "🥬", en: "lettuce",         de: "Salat",             haupt: ["kroete"],  auch: ["papagei", "affe", "ratte"] }
  ],
  lob: ["😋 Lecker!", "😋 Arrr, lecker!", "😋 Danke!", "😋 Mmmh!"],

  // ---------- Schwung am Tau (Technik: schaukel) ----------
  affe: "🐒", seil: "#b48a4e", seilDeko: "", netzZeichen: "🌊",
  netz: ["Platsch, ins Wasser! Nochmal!", "Hoppla! Gleich nochmal!", "Fast! Wartet auf den Ring ⭕."],

  // ---------- Delfin-Kunststück (Technik: seeloewe) ----------
  robbe: "🐬", ball: "🏐",
  platsch: ["Platsch! Nochmal!", "Ups! Neuer Ball!", "Daneben – weiter geht's!"],

  // ---------- Die Schatztruhe (Technik: codeknacker) ----------
  codeknacker: { ziffern: 5, legende: "● richtiger Platz · ◐ falscher Platz · ○ nicht im Code", start: "Tippt drei Ziffern.", fertig: "Geknackt!",
                 namen: { "●": "richtiger Platz", "◐": "falscher Platz", "○": "nicht im Code" } }
});

