/* =====================================================================
   KLASSE 6  ·  alle Inhalte für Klasse 6
   ---------------------------------------------------------------------
   STAND 16.11.2026: Alle Units 1–6 (Themen G1–G19) haben Aufgaben.
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

// 2) DIE THEMEN (laut „Themenuebersicht“)
K6.themen = [
  { id: "6-G1",  klasse: 6, unit: 1, titel: "Adjektive und Adverbien", regel: "Adjektiv: Wie ist jemand oder etwas? → Tom is quiet. Emma is a careful girl. Adverb: Wie macht jemand etwas? → Tom speaks quietly. Adverb = Adjektiv + -ly (quick → quickly), -y wird zu -ily (happy → happily). Sonderfälle: good → well, fast → fast, hard → hard." },
  { id: "6-G2",  klasse: 6, unit: 1, titel: "Possessivpronomen", regel: "Ohne Nomen danach: mine, yours, his, hers, ours, theirs → This bag is mine. Mit Nomen danach: my, your, his, her, our, their → This is my bag." },
  { id: "6-G3",  klasse: 6, unit: 1, titel: "Die einfache Vergangenheit: Aussagen, Verneinung", regel: "Regelmäßig: Verb + -ed (visit → visited, stop → stopped). Unregelmäßige Formen lernen: meet → met, take → took, buy → bought. Verneinung: didn’t + Grundform → I didn’t meet my cousin." },
  { id: "6-G4",  klasse: 6, unit: 1, titel: "Die einfache Vergangenheit: Fragen, Kurzantworten", regel: "Did + Person + Grundform? → Did you visit your aunt? Kurzantworten: Yes, I did. / No, she didn’t. Mit Fragewort: Where did you stay?" },
  { id: "6-G5",  klasse: 6, unit: 2, titel: "Das Perfekt: Aussagen, Verneinung", regel: "have/has + 3. Form → I have tidied my room. Tom has seen a shark. Regelmäßig: -ed. Unregelmäßig lernen: see – saw – seen. just, already, never stehen vor der 3. Form. Verneinung: haven’t/hasn’t … yet (yet am Satzende)." },
  { id: "6-G6",  klasse: 6, unit: 2, titel: "Das Perfekt: Fragen, Kurzantworten", regel: "Have/Has + Person + 3. Form? → Have you ever been to London? Has Tom done his homework yet? Kurzantworten: Yes, I have. / No, he hasn’t." },
  { id: "6-G7",  klasse: 6, unit: 3, titel: "Steigerung von Adjektiven mit -er und more", regel: "Kurze Adjektive: + -er (tall → taller; big → bigger; heavy → heavier; large → larger). Lange Adjektive: more (more expensive, more famous). Unregelmäßig: good → better, bad → worse. Danach: than → My bag is bigger than your bag. Gleich: as … as → My bag is as heavy as your bag." },
  { id: "6-G8",  klasse: 6, unit: 3, titel: "Steigerung von Adjektiven mit -est und most", regel: "Kurze Adjektive: the + -est (the tallest, the biggest, the heaviest). Lange Adjektive: the most (the most expensive, the most famous). Unregelmäßig: the best, the worst → This is the best burger in town." },
  { id: "6-G9",  klasse: 6, unit: 3, titel: "Some und any", regel: "Bejahte Sätze: some, something, somebody, somewhere → There are some apples. Verneinte Sätze und Fragen: any, anything, anybody, anywhere → There aren’t any apples. Are there any apples?" },
  { id: "6-G10", klasse: 6, unit: 4, titel: "Mengenangaben: much, many, lots of", regel: "many + zählbare Nomen in der Mehrzahl (many apples), much + nicht zählbare Nomen (much milk) – vor allem in Fragen und Verneinungen: How many …? How much …? In bejahten Sätzen: lots of / a lot of → We eat lots of pasta." },
  { id: "6-G11", klasse: 6, unit: 4, titel: "Die einfache Gegenwart: Aussagen, Verneinung", regel: "Das simple present beschreibt Zustände (I like curry) und Dinge, die regelmäßig passieren (Tom usually has toast for breakfast). he/she/it: Verb + -s (watches, tries, has). Verneinung: don’t/doesn’t + Grundform." },
  { id: "6-G12", klasse: 6, unit: 4, titel: "Die einfache Gegenwart: Fragen, Kurzantworten", regel: "Do/Does + Person + Grundform? → Does Emma like curry? Kurzantworten: Yes, she does. / No, she doesn’t. Mit Fragewort: What do you usually have for breakfast?" },
  { id: "6-G13", klasse: 6, unit: 4, titel: "Die Zukunft mit will (spontane Entscheidungen)", regel: "Spontane Entscheidung (gerade eben entschieden): will + Grundform → „I’m thirsty.“ – „I’ll get some juice.“ Verneinung: won’t (= will not) → I won’t eat it." },
  { id: "6-G14", klasse: 6, unit: 5, titel: "Die Verlaufsform der Gegenwart: Aussagen", regel: "Verlaufsform (present progressive): am/is/are + Verb mit -ing. Sie zeigt, was gerade jetzt passiert (now, at the moment, Look!, Listen!) → Tom is playing chess now. Schreibung: ride → riding (e fällt weg), swim → swimming (verdoppeln)." },
  { id: "6-G15", klasse: 6, unit: 5, titel: "Die Verlaufsform der Gegenwart: Verneinung, Fragen, Kurzantworten", regel: "Verneinung: I’m not / isn’t / aren’t + -ing → Emma isn’t sleeping. Fragen: Am/Is/Are + Person + -ing? → Are you watching a video? Kurzantworten: Yes, I am. / No, she isn’t." },
  { id: "6-G16", klasse: 6, unit: 6, titel: "Bedingungssätze Typ I", regel: "if + simple present, Hauptsatz: will + Grundform → If it rains, we’ll stay at home. Im if-Satz steht nie will. Steht der if-Satz hinten, fällt das Komma weg → We’ll stay at home if it rains." },
  { id: "6-G17", klasse: 6, unit: 6, titel: "Die Zukunft mit going to: Aussagen, Verneinung", regel: "Pläne und Absichten: am/is/are + going to + Grundform → I’m going to visit my grandma. Verneinung: I’m not / isn’t / aren’t going to … → Tom isn’t going to sell his bike." },
  { id: "6-G18", klasse: 6, unit: 6, titel: "Die Zukunft mit going to: Fragen, Kurzantworten", regel: "Am/Is/Are + Person + going to + Grundform? → Is Lily going to make jewellery? Kurzantworten: Yes, she is. / No, she isn’t." },
  { id: "6-G19", klasse: 6, unit: 6, titel: "Die Zukunft mit will (Wünsche, Hoffnungen, Vorhersagen)", regel: "will + Grundform für Hoffnungen, Vermutungen und Vorhersagen (I hope, I think, maybe, I’m sure) → I hope it will be sunny. Ist etwas schon fest geplant oder vorbereitet, nimmst du going to → We’ve bought the tickets. We’re going to see the play." }
];

// =====================================================================
// 4) WÖRTERHILFE: deutsche Bedeutung für erschließbare Wörter
//     Steht ein Wort hier, ist es in den Aufgaben gepunktet unterstrichen;
//     Antippen zeigt die Bedeutung. Mehrzahl-Formen erkennt das Spiel selbst.
//     Die Tiere auf der Schiffskarte sagen beim Antippen eines dieser Wörter.
// =====================================================================
K6.woerterhilfe = [
  { en: "hotel", de: "Hotel" }, { en: "museum", de: "Museum" }, { en: "cricket", de: "Cricket" }, { en: "volleyball", de: "Volleyball" },
  { en: "concert", de: "Konzert" }, { en: "band", de: "Band" }, { en: "souvenir", de: "Souvenir" }, { en: "e-mail", de: "E-Mail" },
  { en: "website", de: "Website" }, { en: "film", de: "Film" }, { en: "party", de: "Party" }, { en: "star", de: "Star" },
  { en: "pizza", de: "Pizza" }, { en: "burger", de: "Burger" }, { en: "ketchup", de: "Ketchup" }, { en: "curry", de: "Curry" },
  { en: "pasta", de: "Pasta, Nudeln" }, { en: "yogurt", de: "Joghurt" }, { en: "salad", de: "Salat" }, { en: "chocolate", de: "Schokolade" },
  { en: "tomato", de: "Tomate" }, { en: "toast", de: "Toast" }, { en: "lemonade", de: "Limonade" }, { en: "microwave", de: "Mikrowelle" },
  { en: "muffin", de: "Muffin" }, { en: "scone", de: "Scone (Teegebäck)" }, { en: "taxi", de: "Taxi" }, { en: "jeans", de: "Jeans" },
  { en: "T-shirt", de: "T-Shirt" }, { en: "tank top", de: "Tanktop" }, { en: "video", de: "Video" }, { en: "internet", de: "Internet" },
  { en: "online", de: "online" }, { en: "stadium", de: "Stadion" }, { en: "market", de: "Markt" }, { en: "camp", de: "Camp, Ferienlager" },
  { en: "quiz", de: "Quiz" }, { en: "picnic", de: "Picknick" }, { en: "garden", de: "Garten" }, { en: "ski", de: "Ski fahren" }
];

// =====================================================================
// 3) DER SATZBAUKASTEN (Generator) – Wortschatz: Klasse 5 komplett + Klasse 6 bis zur Unit
//    "6-U1" = Klasse 6, Unit 1 (Wortschatz Klasse 5 und Klasse 6 bis Unit 1)
//    "6-U2" = Klasse 6, Unit 2 (zusätzlich Wortschatz bis Unit 2)
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
// 3b) SATZBAUKASTEN Unit 3 und 4 (Wortschatz: Klasse 5 + Klasse 6 bis zur Unit)
// =====================================================================
// Erklärungen zur Steigerung – gelten für -er/more (G7) und -est/most (G8)
const K6_STEIGERUNG = {
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
Object.assign(K6.baukasten, {
  // ---------- Klasse 6, Unit 3 ----------
  "6-U3": {
    // typ: kurz (tall), e (large), dopp (big), y (heavy), lang (more/most), unreg (good, bad)
    adjektive: [
      { adj: "tall",  komp: "taller",  sup: "tallest",  typ: "kurz" }, { adj: "old",   komp: "older",   sup: "oldest",   typ: "kurz" },
      { adj: "long",  komp: "longer",  sup: "longest",  typ: "kurz" }, { adj: "short", komp: "shorter", sup: "shortest", typ: "kurz" },
      { adj: "cheap", komp: "cheaper", sup: "cheapest", typ: "kurz" }, { adj: "fast",  komp: "faster",  sup: "fastest",  typ: "kurz" },
      { adj: "small", komp: "smaller", sup: "smallest", typ: "kurz" }, { adj: "low",   komp: "lower",   sup: "lowest",   typ: "kurz" },
      { adj: "young", komp: "younger", sup: "youngest", typ: "kurz" },
      { adj: "large", komp: "larger",  sup: "largest",  typ: "e" },    { adj: "nice",  komp: "nicer",   sup: "nicest",   typ: "e" },
      { adj: "big",   komp: "bigger",  sup: "biggest",  typ: "dopp" },
      { adj: "heavy", komp: "heavier", sup: "heaviest", typ: "y" },    { adj: "pretty", komp: "prettier", sup: "prettiest", typ: "y" },
      { adj: "scary", komp: "scarier", sup: "scariest", typ: "y" },    { adj: "funny", komp: "funnier", sup: "funniest", typ: "y" },
      { adj: "expensive",   komp: "more expensive",   sup: "most expensive",   typ: "lang" },
      { adj: "beautiful",   komp: "more beautiful",   sup: "most beautiful",   typ: "lang" },
      { adj: "colourful",   komp: "more colourful",   sup: "most colourful",   typ: "lang" },
      { adj: "comfortable", komp: "more comfortable", sup: "most comfortable", typ: "lang" },
      { adj: "fashionable", komp: "more fashionable", sup: "most fashionable", typ: "lang" },
      { adj: "interesting", komp: "more interesting", sup: "most interesting", typ: "lang" },
      { adj: "famous",      komp: "more famous",      sup: "most famous",      typ: "lang" },
      { adj: "good",  komp: "better",  sup: "best",     typ: "unreg" }, { adj: "bad",  komp: "worse",   sup: "worst",    typ: "unreg" }
    ],
    // Vergleiche mit than (G7). w = passende Adjektive, pl = Mehrzahl (are)
    // Hinweis: "famous" ist zweisilbig, wird aber mit more gesteigert – deshalb typ "lang".
    vergleiche: [
      { a: "The clock tower",  b: "the church",       w: ["tall", "old", "famous", "beautiful"] },
      { a: "This bridge",      b: "the old bridge",   w: ["long", "low", "beautiful", "famous"] },
      { a: "The big wheel",    b: "the clock tower",  w: ["tall", "scary", "famous"] },
      { a: "My T-shirt",       b: "your T-shirt",     w: ["cheap", "expensive", "colourful", "fashionable", "small", "large", "nice"] },
      { a: "The red dress",    b: "the blue dress",   w: ["pretty", "expensive", "cheap", "long", "short", "beautiful", "nice"] },
      { a: "My bag",           b: "your bag",         w: ["heavy", "big", "small", "expensive"] },
      { a: "These jeans",      b: "those jeans",      w: ["comfortable", "cheap", "expensive", "fashionable", "long"], pl: true },
      { a: "My brother",       b: "my sister",        w: ["tall", "old", "young", "fast", "funny"] },
      { a: "A plane",          b: "a train",          w: ["fast", "expensive"] },
      { a: "The burger",       b: "the pizza",        w: ["cheap", "big", "good", "bad", "expensive"] },
      { a: "This book",        b: "that book",        w: ["interesting", "funny", "scary", "good", "bad", "long"] },
      { a: "The castle",       b: "the stadium",      w: ["old", "beautiful", "interesting", "famous", "big"] }
    ],
    // Superlativ-Sätze (G8): a … is the ___ n ort
    superRahmen: [
      { a: "The clock tower", n: "building", ort: "in the town",      w: ["tall", "old", "famous", "beautiful"] },
      { a: "This dress",      n: "dress",    ort: "in the shop",      w: ["expensive", "cheap", "pretty", "beautiful", "colourful", "fashionable", "nice", "long"] },
      { a: "Tom",             n: "boy",      ort: "in our class",     w: ["tall", "fast", "young", "old", "funny"] },
      { a: "This bridge",     n: "bridge",   ort: "in the city",      w: ["long", "famous", "old", "beautiful"] },
      { a: "This T-shirt",    n: "T-shirt",  ort: "in the sale",      w: ["cheap", "colourful", "large", "small", "nice"] },
      { a: "The big wheel",   n: "sight",    ort: "in London",        w: ["famous", "good", "scary", "big"] },
      { a: "These jeans",     n: "jeans",    ort: "in the shop",      w: ["comfortable", "expensive", "cheap", "fashionable"], pl: true },
      { a: "This burger",     n: "burger",   ort: "at the market",    w: ["big", "good", "bad", "cheap", "expensive"] },
      { a: "This bag",        n: "bag",      ort: "in the shop",      w: ["heavy", "big", "small", "expensive", "large"] },
      { a: "The castle",      n: "castle",   ort: "in the country",   w: ["old", "beautiful", "famous", "big"] }
    ],
    // some / any (G9). ___ = Lücke, {N} = Nomen; w = "" (some/any), "thing", "body", "where"
    // nur: "U" = nur nicht zählbare Nomen (milk), "C" = nur Mehrzahl (apples); umformen: true = Satz lässt sich direkt verneinen/umfragen
    someRahmen: [
      { w: "", nur: "U", pos: "There is ___ {N} on the table.",     neg: "There isn't ___ {N} on the table.",     frage: "Is there ___ {N} on the table?", umformen: true },
      { w: "", nur: "C", pos: "There are ___ {N} on the table.",    neg: "There aren't ___ {N} on the table.",    frage: "Are there ___ {N} on the table?", umformen: true },
      { w: "", nur: "C", pos: "There are ___ {N} in the kitchen.",  neg: "There aren't ___ {N} in the kitchen.",  frage: "Are there ___ {N} in the kitchen?", umformen: true },
      { w: "",           pos: "We need ___ {N} for the cake.",     neg: "We don't need ___ {N} for the cake.",   frage: "Do we need ___ {N} for the cake?", umformen: true },
      { w: "",           pos: "Tom bought ___ {N} at the market.", neg: "Tom didn't buy ___ {N} at the market.", frage: "Did Tom buy ___ {N} at the market?", umformen: true },
      { w: "thing",      pos: "Emma bought ___ in the sale.",      neg: "Emma didn't buy ___ in the sale.",      frage: "Did Emma buy ___ in the sale?", umformen: true },
      { w: "thing",      pos: "I want to eat ___.",                neg: "I don't want to eat ___.",              frage: "Do you want to eat ___?" },
      { w: "thing",      pos: "There is ___ in my bag.",           neg: "There isn't ___ in my bag.",            frage: "Is there ___ in my bag?", umformen: true },
      { w: "body",       pos: "___ is at the door.",               neg: "There isn't ___ at the door.",          frage: "Is ___ at the door?" },
      { w: "body",       pos: "I can see ___ in the garden.",      neg: "I can't see ___ in the garden.",        frage: "Can you see ___ in the garden?" },
      { w: "body",       pos: "Lily met ___ nice at the market.",  neg: "Lily didn't meet ___ at the market.",   frage: "Did Lily meet ___ at the market?" },
      { w: "where",      pos: "We went ___ nice last summer.",     neg: "We didn't go ___ last summer.",         frage: "Did you go ___ last summer?" },
      { w: "where",      pos: "My keys are ___ in this room.",     neg: "I can't find my keys ___.",             frage: "Have you seen my keys ___?" }
    ],
    nomenU: ["bread", "cheese", "milk", "sugar", "flour", "water", "tea", "chocolate"],
    nomenC: ["apples", "bananas", "sandwiches", "eggs", "carrots", "cakes", "biscuits", "nuts"],
    erklaerungen: {
      komparativ: K6_STEIGERUNG,
      superlativ: K6_STEIGERUNG,
      someany: {
        pos:   "In bejahten Sätzen steht some (something, somebody, somewhere). Beispiel: {BEISPIEL}",
        neg:   "In verneinten Sätzen (not, n't) steht any (anything, anybody, anywhere). Beispiel: {BEISPIEL}",
        frage: "In Fragen steht any (anything, anybody, anywhere). Beispiel: {BEISPIEL}",
        zuordnen: "Bejahte Sätze → some, something, somebody, somewhere. Verneinte Sätze und Fragen → any, anything, anybody, anywhere."
      }
    }
  },

  // ---------- Klasse 6, Unit 4 ----------
  "6-U4": {
    personen: [
      { text: "I",          er: false, pron: "I" },    { text: "you",        er: false, pron: "you" },
      { text: "we",         er: false, pron: "we" },   { text: "they",       er: false, pron: "they" },
      { text: "my parents", er: false, pron: "they" }, { text: "my friends", er: false, pron: "they" },
      { text: "Tom and Emma", er: false, pron: "they" },
      { text: "he",         er: true,  pron: "he" },   { text: "she",        er: true,  pron: "she" },
      { text: "Tom",        er: true,  pron: "he" },   { text: "Emma",       er: true,  pron: "she" },
      { text: "Ben",        er: true,  pron: "he" },   { text: "Lily",       er: true,  pron: "she" },
      { text: "my dad",     er: true,  pron: "he" },   { text: "my mum",     er: true,  pron: "she" },
      { text: "my brother", er: true,  pron: "he" },   { text: "my sister",  er: true,  pron: "she" }
    ],
    // simple present (G11, G12): Zustände (like, love, hate, want) und Gewohnheiten (mit Zeitangabe)
    verben: [
      { grund: "like",  s: "likes",   rest: "spicy food",            zeit: [] },
      { grund: "love",  s: "loves",   rest: "pancakes",              zeit: [] },
      { grund: "hate",  s: "hates",   rest: "mushrooms",             zeit: [] },
      { grund: "like",  s: "likes",   rest: "Indian food",           zeit: [] },
      { grund: "eat",   s: "eats",    rest: "fish fingers",          zeit: ["on Fridays"] },
      { grund: "eat",   s: "eats",    rest: "cereal for breakfast",  zeit: ["every morning"] },
      { grund: "drink", s: "drinks",  rest: "hot chocolate",         zeit: ["in the evening", "in winter"] },
      { grund: "cook",  s: "cooks",   rest: "dinner",                zeit: ["at the weekend", "on Sundays"] },
      { grund: "make",  s: "makes",   rest: "pancakes",              zeit: ["on Sundays"] },
      { grund: "order", s: "orders",  rest: "pizza",                 zeit: ["on Fridays"] },
      { grund: "have",  s: "has",     rest: "a packed lunch",        zeit: ["at school", "every day"] },
      { grund: "have",  s: "has",     rest: "toast for breakfast",   zeit: ["every morning"] },
      { grund: "go",    s: "goes",    rest: "to the market",         zeit: ["on Saturdays"] },
      { grund: "watch", s: "watches", rest: "TV shows about food",   zeit: ["in the evening"] },
      { grund: "try",   s: "tries",   rest: "new recipes",           zeit: ["at the weekend"] },
      { grund: "buy",   s: "buys",    rest: "fresh bread",           zeit: ["every morning"] },
      { grund: "pay",   s: "pays",    rest: "for lunch",             zeit: ["at school"] },
      { grund: "drink", s: "drinks",  rest: "orange juice",          zeit: ["at breakfast"] }
    ],
    // much / many / lots of / a lot of (G10). typ: frage, neg, pos; nur: "U" / "C"
    mengenRahmen: [
      { t: "How ___ {N} do we need?",                typ: "frage" },
      { t: "How ___ {N} do you want?",               typ: "frage" },
      { t: "How ___ {N} is there in the kitchen?",   typ: "frage", nur: "U" },
      { t: "How ___ {N} are there in the bowl?",     typ: "frage", nur: "C" },
      { t: "We haven't got ___ {N}.",                typ: "neg" },
      { t: "I don't eat ___ {N}.",                   typ: "neg" },
      { t: "There isn't ___ {N} on the table.",      typ: "neg",   nur: "U" },
      { t: "There aren't ___ {N} in the bowl.",      typ: "neg",   nur: "C" },
      { t: "There are ___ {N} in the bowl.",         typ: "pos",   nur: "C" },
      { t: "There is ___ {N} on the plate.",         typ: "pos",   nur: "U" },
      { t: "My dad buys ___ {N} at the market.",     typ: "pos" }
    ],
    nomenU: ["rice", "pasta", "bread", "cheese", "juice", "milk", "butter", "jam", "soup", "yogurt", "ketchup", "salt", "garlic", "water"],
    nomenC: ["potatoes", "tomatoes", "onions", "sausages", "carrots", "grapes", "oranges", "strawberries", "pancakes", "apples", "spring rolls", "mushrooms", "eggs", "pears"],
    // will: spontane Entscheidungen (G13). sit = Situation, sub = I/we, e = Grundform, s = falsche -s-Form, neg = mit won't
    entscheidungen: [
      { sit: "I'm thirsty.",                         sub: "I",  e: "get",   s: "gets",   rest: "some juice" },
      { sit: "The phone is ringing.",                sub: "I",  e: "answer", s: "answers", rest: "it" },
      { sit: "It's cold in here.",                   sub: "I",  e: "close", s: "closes", rest: "the window" },
      { sit: "This bag is very heavy!",              sub: "I",  e: "help",  s: "helps",  rest: "you" },
      { sit: "There isn't any milk.",                sub: "I",  e: "buy",   s: "buys",   rest: "some milk" },
      { sit: "The pancakes on the menu look delicious.", sub: "I", e: "have", s: "has",  rest: "the pancakes" },
      { sit: "We're hungry.",                        sub: "we", e: "order", s: "orders", rest: "a pizza" },
      { sit: "The table is dirty.",                  sub: "I",  e: "clean", s: "cleans", rest: "it" },
      { sit: "Oh no, I haven't got a pen!",          sub: "I",  e: "lend",  s: "lends",  rest: "you mine" },
      { sit: "The dog is hungry.",                   sub: "I",  e: "feed",  s: "feeds",  rest: "it" },
      { sit: "Anything to drink?",                   sub: "I",  e: "have",  s: "has",    rest: "an orange juice, please" },
      { sit: "It's raining.",                        sub: "we", e: "take",  s: "takes",  rest: "a taxi" },
      { sit: "The soup is cold.",                    sub: "I",  e: "put",   s: "puts",   rest: "it in the microwave" },
      { sit: "This curry is very spicy.",            sub: "I",  e: "eat",   s: "eats",   rest: "it", neg: true },
      { sit: "The burger is very expensive.",        sub: "I",  e: "buy",   s: "buys",   rest: "it", neg: true },
      { sit: "The TV show is boring.",               sub: "we", e: "watch", s: "watches", rest: "it", neg: true },
      { sit: "The cake has got nuts in it.",         sub: "I",  e: "try",   s: "tries",  rest: "it", neg: true }
    ],
    erklaerungen: {
      mengen: {
        many: "many steht vor zählbaren Nomen in der Mehrzahl (apples, eggs) – vor allem in Fragen und verneinten Sätzen. Beispiel: {BEISPIEL}",
        much: "much steht vor nicht zählbaren Nomen (milk, rice, bread) – vor allem in Fragen und verneinten Sätzen. Beispiel: {BEISPIEL}",
        pos:  "In bejahten Sätzen sagst du lots of oder a lot of – das passt zu allen Nomen. Beispiel: {BEISPIEL}",
        zuordnen: "Zählbar, Mehrzahl (apples, eggs) → many. Nicht zählbar (milk, rice, bread) → much."
      },
      praesensaussneg: {
        aussage: {
          er:       "Simple present: Bei he, she, it (Tom, my mum) bekommt das Verb ein -s (watch → watches, try → tries, have → has). Beispiel: {BEISPIEL}",
          nichtEr:  "Bei „{P}“ (I, you, we, they) bekommt das Verb kein -s. Beispiel: {BEISPIEL}",
          zuordnen: "He, she, it und eine Person → Verb mit -s: {S}. I, you, we, they → ohne -s: {GRUND}."
        },
        verneinung: {
          er:       "Bei he, she, it verneinst du mit doesn't + Grundform (ohne -s). Beispiel: {BEISPIEL}",
          nichtEr:  "Bei I, you, we, they verneinst du mit don't + Grundform. Beispiel: {BEISPIEL}",
          zuordnen: "I, you, we, they → don't. He, she, it und eine Person → doesn't."
        }
      },
      praesensfrage: {
        frage: {
          er:       "Fragen mit he, she, it beginnen mit Does. Das Verb hat dann KEIN -s. Beispiel: {BEISPIEL}",
          nichtEr:  "Fragen mit I, you, we, they beginnen mit Do. Beispiel: {BEISPIEL}",
          zuordnen: "I, you, we, they → Do. He, she, it und eine Person → Does."
        },
        kurzJa:   "Kurzantwort mit Ja: Yes, + Person + do/does. Beispiel: {BEISPIEL}",
        kurzNein: "Kurzantwort mit Nein: No, + Person + don't/doesn't. Beispiel: {BEISPIEL}"
      },
      will: {
        pos: "Entscheidest du spontan, sagst du will + Grundform (I'll = I will). Nach will steht nie -s und nie to. Beispiel: {BEISPIEL}",
        neg: "Spontan entscheiden, etwas NICHT zu tun: won't (= will not) + Grundform. Beispiel: {BEISPIEL}",
        zuordnen: "Richtig ist: will/'ll oder won't + Grundform. Falsch: -s nach will, to nach will oder am/are statt will."
      }
    }
  }
});

Object.assign(K6.generatoren, {
  "6-G7":  { baukasten: "6-U3", art: "komparativ" },
  "6-G8":  { baukasten: "6-U3", art: "superlativ" },
  "6-G9":  { baukasten: "6-U3", art: "someany" },
  "6-G10": { baukasten: "6-U4", art: "mengen" },
  "6-G11": { baukasten: "6-U4", art: "praesensaussneg" },
  "6-G12": { baukasten: "6-U4", art: "praesensfrage" },
  "6-G13": { baukasten: "6-U4", art: "will" }
});

K6.aufgaben.push(
  // ---------- 6-G7  Steigerung mit -er und more ----------
  { thema: "6-G7", niveau: "gruen", form: "quiz", frage: "London is ___ than my town.", optionen: ["bigger", "biger", "more big"], loesung: "bigger",
    erklaerung: "big → bigger: Der Konsonant am Ende wird verdoppelt. Beispiel: My bag is bigger than your bag." },
  { thema: "6-G7", niveau: "gruen", form: "quiz", frage: "My new jeans are ___ than my old jeans.", optionen: ["more comfortable", "comfortabler", "most comfortable"], loesung: "more comfortable",
    erklaerung: "Lange Adjektive bekommen more davor. Beispiel: This dress is more expensive than that dress." },
  { thema: "6-G7", niveau: "gelb", form: "luecke", frage: "Today is ___ (good) than yesterday.", loesung: ["better"],
    erklaerung: "good ist unregelmäßig: good → better → best. Beispiel: The burger is better than the pizza." },
  { thema: "6-G7", niveau: "gelb", form: "satzbau", loesung: ["My sister is as tall as my mum."],
    erklaerung: "Gleich groß: as + Grundform + as. Beispiel: My bag is as heavy as your bag." },
  { thema: "6-G7", niveau: "rot", form: "fehler", satz: "The tank top is cheaper as the T-shirt.", fehlerwort: "as", loesung: ["than"],
    erklaerung: "Nach der Steigerungsform (cheaper) steht than. as steht nur bei as … as. Beispiel: The bridge is longer than the tower." },
  { thema: "6-G7", niveau: "rot", form: "fehler", satz: "My bag is heavyer than your bag.", fehlerwort: "heavyer", loesung: ["heavier"],
    erklaerung: "-y wird zu -ier: heavy → heavier. Beispiel: This book is funnier than that book." },

  // ---------- 6-G8  Steigerung mit -est und most ----------
  { thema: "6-G8", niveau: "gruen", form: "quiz", frage: "Big Ben is the ___ clock tower in London.", optionen: ["most famous", "famousest", "more famous"], loesung: "most famous",
    erklaerung: "famous wird mit most gesteigert: the most famous. Beispiel: This is the most beautiful bridge in the city." },
  { thema: "6-G8", niveau: "gruen", form: "quiz", frage: "This is the ___ pizza I have ever eaten!", optionen: ["best", "goodest", "better"], loesung: "best",
    erklaerung: "good → better → best. Beispiel: The big wheel is the best sight in London." },
  { thema: "6-G8", niveau: "gelb", form: "luecke", frage: "This is the ___ (big) burger at the market.", loesung: ["biggest"],
    erklaerung: "big → the biggest: Der Konsonant wird verdoppelt. Beispiel: This bag is the biggest bag in the shop." },
  { thema: "6-G8", niveau: "gelb", form: "satzbau", loesung: ["This is the most expensive dress in the shop."],
    erklaerung: "the most + langes Adjektiv. Beispiel: These jeans are the most comfortable jeans in the shop." },
  { thema: "6-G8", niveau: "rot", form: "fehler", satz: "Tom is the funnyest boy in our class.", fehlerwort: "funnyest", loesung: ["funniest"],
    erklaerung: "-y wird zu -iest: funny → the funniest. Beispiel: The big wheel is the scariest sight in London." },
  { thema: "6-G8", niveau: "rot", form: "umformen", frage: "Use the superlative:  The castle is very old. (the oldest building in the town)", loesung: ["The castle is the oldest building in the town."],
    erklaerung: "the + Adjektiv + -est. Beispiel: The clock tower is the tallest building in the town." },

  // ---------- 6-G9  some und any ----------
  { thema: "6-G9", niveau: "gruen", form: "quiz", frage: "Are there ___ visitors in the castle today?", optionen: ["any", "some"], loesung: "any",
    erklaerung: "In Fragen steht any. Beispiel: Is there any milk on the table?" },
  { thema: "6-G9", niveau: "gruen", form: "quiz", frage: "Listen! ___ is at the door.", optionen: ["Somebody", "Anybody"], loesung: "Somebody",
    erklaerung: "In bejahten Sätzen: somebody, something, somewhere. Beispiel: I can see somebody in the garden." },
  { thema: "6-G9", niveau: "gelb", form: "luecke", frage: "I'm sorry, I haven't got ___ (some / any) money.", loesung: ["any"],
    erklaerung: "Verneinter Satz (haven't) → any. Beispiel: There aren't any eggs in the kitchen." },
  { thema: "6-G9", niveau: "gelb", form: "satzbau", loesung: ["Did you buy anything in the sale?"],
    erklaerung: "In Fragen: anything, anybody, anywhere. Beispiel: Did you go anywhere last summer?" },
  { thema: "6-G9", niveau: "rot", form: "fehler", satz: "I can't find my keys somewhere.", fehlerwort: "somewhere", loesung: ["anywhere"],
    erklaerung: "Verneinter Satz (can't) → anywhere. Beispiel: We didn't go anywhere last summer." },
  { thema: "6-G9", niveau: "rot", form: "umformen", frage: "Make it negative:  There are some sandwiches on the table.", loesung: ["There aren't any sandwiches on the table."],
    erklaerung: "Verneinung: aren't + any. Beispiel: There isn't any bread in the kitchen." },

  // ---------- 6-G10  much, many, lots of, a lot of ----------
  { thema: "6-G10", niveau: "gruen", form: "quiz", frage: "How ___ spring rolls do you want?", optionen: ["many", "much"], loesung: "many",
    erklaerung: "spring rolls kann man zählen (Mehrzahl) → many. Beispiel: How many potatoes do we need?" },
  { thema: "6-G10", niveau: "gruen", form: "quiz", frage: "How ___ rice do we need for the curry?", optionen: ["much", "many"], loesung: "much",
    erklaerung: "rice kann man nicht zählen → much. Beispiel: How much milk do we need?" },
  { thema: "6-G10", niveau: "gelb", form: "luecke", frage: "There isn't ___ (much / many) ketchup on my plate.", loesung: ["much"],
    erklaerung: "ketchup ist nicht zählbar → much. Beispiel: We haven't got much bread." },
  { thema: "6-G10", niveau: "gelb", form: "satzbau", loesung: ["We eat a lot of pasta at home."],
    erklaerung: "In bejahten Sätzen: lots of / a lot of. Beispiel: My dad buys lots of vegetables at the market." },
  { thema: "6-G10", niveau: "rot", form: "fehler", satz: "How much tomatoes do you need for the sauce?", fehlerwort: "much", loesung: ["many"],
    erklaerung: "tomatoes ist Mehrzahl (zählbar) → many. Beispiel: How many onions do we need?" },
  { thema: "6-G10", niveau: "rot", form: "umformen", frage: "Ask with „How much“ or „How many“:  We need some cheese for the pasta bake.", loesung: ["How much cheese do we need for the pasta bake?"],
    erklaerung: "cheese ist nicht zählbar → How much …? Beispiel: How much butter do we need?" },

  // ---------- 6-G11  simple present: Aussagen, Verneinung ----------
  { thema: "6-G11", niveau: "gruen", form: "quiz", frage: "My grandma usually ___ a cup of tea after lunch.", optionen: ["drinks", "drink"], loesung: "drinks",
    erklaerung: "My grandma = she → Verb mit -s. Etwas passiert regelmäßig (usually). Beispiel: Tom usually eats cereal for breakfast." },
  { thema: "6-G11", niveau: "gruen", form: "quiz", frage: "Emma is allergic to nuts. She ___ eat cake with nuts.", optionen: ["doesn't", "don't", "isn't"], loesung: "doesn't",
    erklaerung: "Bei she: doesn't + Grundform. Beispiel: My brother doesn't like mushrooms." },
  { thema: "6-G11", niveau: "gelb", form: "luecke", frage: "My dad ___ (wash) the dishes after dinner.", loesung: ["washes"],
    erklaerung: "Nach -s, -sh, -ch, -x, -o kommt -es: wash → washes, watch → watches. Beispiel: Lily watches TV shows about food." },
  { thema: "6-G11", niveau: "gelb", form: "satzbau", loesung: ["We don't eat pork at home."],
    erklaerung: "don't + Grundform; Zeitangabe am Ende. Beispiel: They don't go to the market on Sundays." },
  { thema: "6-G11", niveau: "rot", form: "fehler", satz: "Ben trys new recipes at the weekend.", fehlerwort: "trys", loesung: ["tries"],
    erklaerung: "Konsonant + y → -ies: try → tries. Beispiel: My mum tries new recipes on Sundays." },

  // ---------- 6-G12  simple present: Fragen, Kurzantworten ----------
  { thema: "6-G12", niveau: "gruen", form: "quiz", frage: "___ your sister like spicy food?", optionen: ["Does", "Do", "Is"], loesung: "Does",
    erklaerung: "your sister = she → Does. Beispiel: Does Tom eat fish fingers?" },
  { thema: "6-G12", niveau: "gelb", form: "luecke", frage: "Do your parents cook at the weekend? – Yes, ___.", loesung: ["they do", "yes, they do"],
    erklaerung: "your parents = they → Yes, they do. Beispiel: Do you like pancakes? – Yes, I do." },
  { thema: "6-G12", niveau: "gelb", form: "satzbau", loesung: ["What do you usually have for breakfast?"],
    erklaerung: "Fragewort – do/does – Person – Grundform? Beispiel: Where does Emma buy her bread?" },
  { thema: "6-G12", niveau: "rot", form: "fehler", satz: "Does Lily drinks orange juice at breakfast?", fehlerwort: "drinks", loesung: ["drink"],
    erklaerung: "Nach Does steht die Grundform ohne -s. Beispiel: Does Ben eat cereal for breakfast?" },
  { thema: "6-G12", niveau: "rot", form: "umformen", frage: "Ask a question:  Tom orders pizza on Fridays.", loesung: ["Does Tom order pizza on Fridays?"],
    erklaerung: "Does + Person + Grundform? Beispiel: Does my sister cook dinner on Sundays?" },

  // ---------- 6-G13  will (spontane Entscheidungen) ----------
  { thema: "6-G13", niveau: "gruen", form: "quiz", frage: "„I can't do my homework.“ – „Don't worry, I ___ help you.“", optionen: ["will", "am", "to"], loesung: "will",
    erklaerung: "Spontane Entscheidung: will + Grundform. Beispiel: „I'm thirsty.“ – „I'll get some juice.“" },
  { thema: "6-G13", niveau: "gelb", form: "luecke", frage: "„Anything to eat?“ – „___ (I / have) the chicken curry, please.“", loesung: ["I'll have", "I will have"],
    erklaerung: "Bestellen im Restaurant ist eine spontane Entscheidung: I'll have … Beispiel: „Anything to drink?“ – „I'll have a lemonade.“" },
  { thema: "6-G13", niveau: "gelb", form: "satzbau", loesung: ["I won't eat the mushrooms."],
    erklaerung: "won't (= will not) + Grundform. Beispiel: „This curry is very spicy.“ – „I won't eat it.“" },
  { thema: "6-G13", niveau: "rot", form: "fehler", satz: "„We're late!“ – „OK, we'll takes a taxi.“", fehlerwort: "takes", loesung: ["take"],
    erklaerung: "Nach will/'ll steht die Grundform ohne -s: we'll take. Beispiel: „It's raining.“ – „We'll take the bus.“" },
  { thema: "6-G13", niveau: "rot", form: "umformen", frage: "React with „won't“ (eat / the soup):  „The soup is very salty.“", loesung: ["I won't eat the soup.", "I will not eat the soup."],
    erklaerung: "won't + Grundform. Beispiel: „The burger is very expensive.“ – „I won't buy it.“" }
);

K6.zusatzfragen.push(
  { thema: "6-G7",  frage: "Which sentence is correct?", optionen: ["A plane is faster than a train.", "A plane is more fast than a train.", "A plane is faster as a train."], loesung: "A plane is faster than a train." },
  { thema: "6-G7",  frage: "Which is correct?", optionen: ["more expensive", "expensiver", "expensivest"], loesung: "more expensive" },
  { thema: "6-G7",  frage: "„good“ – „…“", optionen: ["better", "gooder", "more good"], loesung: "better" },
  { thema: "6-G8",  frage: "Which is correct?", optionen: ["the heaviest", "the heavyest", "the most heavy"], loesung: "the heaviest" },
  { thema: "6-G8",  frage: "„bad“ – „worse“ – „…“", optionen: ["the worst", "the baddest", "the worsest"], loesung: "the worst" },
  { thema: "6-G8",  frage: "This is the … bridge in London.", optionen: ["most famous", "famousest", "more famous"], loesung: "most famous" },
  { thema: "6-G9",  frage: "There aren't … eggs in the kitchen.", optionen: ["any", "some", "anything"], loesung: "any" },
  { thema: "6-G9",  frage: "Did you buy … at the market?", optionen: ["anything", "something", "anybody"], loesung: "anything" },
  { thema: "6-G9",  frage: "I can see … in the garden.", optionen: ["somebody", "anybody", "something"], loesung: "somebody" },
  { thema: "6-G10", frage: "How … potatoes do we need?", optionen: ["many", "much", "a lot"], loesung: "many" },
  { thema: "6-G10", frage: "We haven't got … milk.", optionen: ["much", "many", "a lot"], loesung: "much" },
  { thema: "6-G10", frage: "Which sentence is correct?", optionen: ["There are lots of grapes in the bowl.", "There are much grapes in the bowl.", "There are lots grapes in the bowl."], loesung: "There are lots of grapes in the bowl." },
  { thema: "6-G11", frage: "Which sentence is correct?", optionen: ["My mum watches TV shows about food.", "My mum watch TV shows about food.", "My mum watchs TV shows about food."], loesung: "My mum watches TV shows about food." },
  { thema: "6-G11", frage: "Tom … like mushrooms.", optionen: ["doesn't", "don't", "isn't"], loesung: "doesn't" },
  { thema: "6-G11", frage: "Which sentence is correct?", optionen: ["Ben tries new recipes.", "Ben trys new recipes.", "Ben try new recipes."], loesung: "Ben tries new recipes." },
  { thema: "6-G12", frage: "„Does Emma like curry?“ – „Yes, …“", optionen: ["she does.", "she do.", "she likes."], loesung: "she does." },
  { thema: "6-G12", frage: "Which question is correct?", optionen: ["Do your friends cook?", "Does your friends cook?", "Do your friends cooks?"], loesung: "Do your friends cook?" },
  { thema: "6-G12", frage: "„Do you eat fish?“ – „No, …“", optionen: ["I don't.", "I doesn't.", "I not."], loesung: "I don't." },
  { thema: "6-G13", frage: "„I'm hungry.“ – „I … make you a sandwich.“", optionen: ["'ll", "am", "to"], loesung: "'ll" },
  { thema: "6-G13", frage: "Which sentence is correct?", optionen: ["I'll have the pancakes.", "I'll has the pancakes.", "I'll to have the pancakes."], loesung: "I'll have the pancakes." },
  { thema: "6-G13", frage: "„This film is boring.“ – „I … watch it.“", optionen: ["won't", "willn't", "don't will"], loesung: "won't" }
);

// =====================================================================
// 3c) SATZBAUKASTEN Unit 5 und 6
// =====================================================================
const K6_PERSONEN_BE = [
  { text: "I",          be: "am",  er: false, pron: "I",    poss: "my",    kind: true }, { text: "you",        be: "are", er: false, pron: "you",  poss: "your",  kind: true },
  { text: "we",         be: "are", er: false, pron: "we",   poss: "our",   kind: true }, { text: "they",       be: "are", er: false, pron: "they", poss: "their", kind: true },
  { text: "my friends", be: "are", er: false, pron: "they", poss: "their", kind: true }, { text: "Tom and Emma", be: "are", er: false, pron: "they", poss: "their", kind: true },
  { text: "my parents", be: "are", er: false, pron: "they", poss: "their" },
  { text: "he",         be: "is",  er: true,  pron: "he",   poss: "his",   kind: true }, { text: "she",        be: "is",  er: true,  pron: "she",  poss: "her",   kind: true },
  { text: "Tom",        be: "is",  er: true,  pron: "he",   poss: "his",   kind: true }, { text: "Emma",       be: "is",  er: true,  pron: "she",  poss: "her",   kind: true },
  { text: "Ben",        be: "is",  er: true,  pron: "he",   poss: "his",   kind: true }, { text: "Lily",       be: "is",  er: true,  pron: "she",  poss: "her",   kind: true },
  { text: "my brother", be: "is",  er: true,  pron: "he",   poss: "his",   kind: true }, { text: "my sister",  be: "is",  er: true,  pron: "she",  poss: "her",   kind: true },
  { text: "my dad",     be: "is",  er: true,  pron: "he",   poss: "his" },               { text: "my mum",     be: "is",  er: true,  pron: "she",  poss: "her" }
];
Object.assign(K6.baukasten, {
  // ---------- Klasse 6, Unit 5 ----------
  "6-U5": {
    personen: K6_PERSONEN_BE,
    // Verlaufsform (G14, G15). typ: (leer) = + -ing, e = e fällt weg, dopp = Konsonant verdoppeln
    verbenIng: [
      { e: "play",     ing: "playing",     rest: "computer games",              zeit: ["now", "at the moment"] },
      { e: "chat",     ing: "chatting",    rest: "online with {POSS} friends",   zeit: ["now", "at the moment"], typ: "dopp" },
      { e: "surf",     ing: "surfing",     rest: "the internet",                 zeit: ["now", "at the moment"] },
      { e: "download", ing: "downloading", rest: "a video",                      zeit: ["now", "at the moment"] },
      { e: "upload",   ing: "uploading",   rest: "a photo",                      zeit: ["now", "at the moment"] },
      { e: "ride",     ing: "riding",      rest: "{POSS} bike",                  zeit: ["now", "at the moment"], typ: "e" },
      { e: "repair",   ing: "repairing",   rest: "{POSS} bike",                  zeit: ["now", "at the moment"] },
      { e: "paint",    ing: "painting",    rest: "the wall",                     zeit: ["now", "at the moment"] },
      { e: "plant",    ing: "planting",    rest: "flowers in the garden",        zeit: ["now", "at the moment"] },
      { e: "play",     ing: "playing",     rest: "chess",                        zeit: ["now", "at the moment"] },
      { e: "swim",     ing: "swimming",    rest: "in the lake",                  zeit: ["now", "at the moment"], typ: "dopp" },
      { e: "wave",     ing: "waving",      rest: "at us",                        zeit: ["now"], typ: "e" },
      { e: "take",     ing: "taking",      rest: "a break",                      zeit: ["now", "at the moment"], typ: "e" },
      { e: "have",     ing: "having",      rest: "a haircut",                    zeit: ["now", "at the moment"], typ: "e" },
      { e: "write",    ing: "writing",     rest: "a text",                       zeit: ["now", "at the moment"], typ: "e" },
      { e: "get",      ing: "getting",     rest: "dressed",                      zeit: ["now"], typ: "dopp" },
      { e: "sit",      ing: "sitting",     rest: "in the garden",                zeit: ["now", "at the moment"], typ: "dopp" },
      { e: "run",      ing: "running",     rest: "to the bus stop",              zeit: ["now"], typ: "dopp" },
      { e: "make",     ing: "making",      rest: "a video",                      zeit: ["now", "at the moment"], typ: "e" },
      { e: "talk",     ing: "talking",     rest: "to a neighbour",               zeit: ["now", "at the moment"] },
      { e: "wait",     ing: "waiting",     rest: "for the bus",                  zeit: ["now", "at the moment"] },
      { e: "hang",     ing: "hanging",     rest: "around in the park",           zeit: ["now", "at the moment"], nurKind: true }
    ],
    erklaerungen: {
      progressiv: {
        normal: "Verlaufsform: am/is/are + Verb mit -ing. Sie zeigt, was gerade jetzt passiert (now, at the moment). Beispiel: {BEISPIEL}",
        e:      "Endet das Verb auf ein stummes -e, fällt das e weg: ride → riding, make → making. Beispiel: {BEISPIEL}",
        dopp:   "Kurzer Vokal + ein Konsonant am Ende: Der Konsonant wird verdoppelt: swim → swimming, sit → sitting. Beispiel: {BEISPIEL}",
        neg:    "Verneinung: I'm not / isn't / aren't + Verb mit -ing. Beispiel: {BEISPIEL}",
        frage:  "Fragen: Am/Is/Are + Person + Verb mit -ing? Beispiel: {BEISPIEL}",
        zuordnen: "I → am. He, she, it und eine Person (Tom, my mum) → is. You, we, they und mehrere Personen → are.",
        zuordnenIng: "Meist einfach + -ing (play → playing). Stummes -e fällt weg (ride → riding). Kurzer Vokal + ein Konsonant: verdoppeln (swim → swimming)."
      },
      progressivfrage: {
        neg:      "Verneinung: I'm not / isn't / aren't + Verb mit -ing (nicht don't!). Beispiel: {BEISPIEL}",
        frage:    "Fragen: Is/Are + Person + Verb mit -ing? (nicht Do/Does!) Beispiel: {BEISPIEL}",
        kurzJa:   "Kurzantwort mit Ja: Yes, + Person + am/is/are. Beispiel: {BEISPIEL}",
        kurzNein: "Kurzantwort mit Nein: No, + Person + 'm not/isn't/aren't. Beispiel: {BEISPIEL}",
        zuordnen: "He, she, it und eine Person → Is …? You, they und mehrere Personen → Are …?",
        zuordnenIng: "Meist einfach + -ing (play → playing). Stummes -e fällt weg (ride → riding). Kurzer Vokal + ein Konsonant: verdoppeln (swim → swimming)."
      }
    }
  },

  // ---------- Klasse 6, Unit 6 ----------
  "6-U6": {
    personen: K6_PERSONEN_BE,
    // going to (G17, G18): Pläne. s = falsche -s-Form
    plaene: [
      { e: "visit",   s: "visits",   rest: "{POSS} grandparents",       zeit: ["next weekend", "on Sunday"] },
      { e: "sleep",   s: "sleeps",   rest: "in a tent",                 zeit: ["next week", "at the weekend"] },
      { e: "play",    s: "plays",    rest: "table tennis",              zeit: ["tomorrow", "after school"] },
      { e: "sell",    s: "sells",    rest: "{POSS} old bike",           zeit: ["next week"] },
      { e: "explore", s: "explores", rest: "the island",                zeit: ["in the summer holidays"] },
      { e: "make",    s: "makes",    rest: "jewellery",                 zeit: ["at the weekend"] },
      { e: "look",    s: "looks",    rest: "after the dog",             zeit: ["tomorrow"] },
      { e: "pack",    s: "packs",    rest: "up {POSS} things",          zeit: ["tonight"] },
      { e: "say",     s: "says",     rest: "goodbye to {POSS} friends", zeit: ["on Friday"] },
      { e: "change",  s: "changes",  rest: "school",                    zeit: ["next year"], nurKind: true },
      { e: "watch",   s: "watches",  rest: "a film",                    zeit: ["tonight"] },
      { e: "have",    s: "has",      rest: "a party",                   zeit: ["on Saturday"] },
      { e: "travel",  s: "travels",  rest: "to Scotland",               zeit: ["in the summer holidays"] },
      { e: "learn",   s: "learns",   rest: "to ski",                    zeit: ["next winter"] },
      { e: "buy",     s: "buys",     rest: "a new tent",                zeit: ["next week"] }
    ],
    // if-Sätze Typ I (G16): wer = Name im if-Satz (dann heißt es hinten „Tom will … if he …“); {…} = Verb im if-Satz, grund = Grundform, wf = falsche Form; Hauptsatz: s2 + will + e + r2; neg = mit won't
    ifSaetze: [
      { w: "it {rains}",               grund: "rain",    wf: "rain",     s2: "we",  e: "stay",  ing: "staying",  r2: "at home" },
      { w: "you {get} up late",        grund: "get",     wf: "gets",     s2: "you", e: "miss",  ing: "missing",  r2: "the bus" },
      { w: "Tom {finds} the treasure", wer: "Tom", grund: "find",    wf: "find",     s2: "he",  e: "buy",   ing: "buying",   r2: "a boat" },
      { w: "it {is} sunny",            grund: "be",      wf: "are",      s2: "we",  e: "go",    ing: "going",    r2: "to the beach" },
      { w: "we {leave} now",           grund: "leave",   wf: "leaves",   s2: "we",  e: "miss",  ing: "missing",  r2: "the train", neg: true },
      { w: "you {help} me",            grund: "help",    wf: "helps",    s2: "I",   e: "make",  ing: "making",   r2: "you a muffin" },
      { w: "Emma {goes} to camp", wer: "Emma",      grund: "go",      wf: "go",       s2: "she", e: "sleep", ing: "sleeping", r2: "in a tent" },
      { w: "we {explore} the cave",    grund: "explore", wf: "explores", s2: "we",  e: "find",  ing: "finding",  r2: "the smugglers' treasure" },
      { w: "you {are} scared",         grund: "be",      wf: "is",       s2: "I",   e: "come",  ing: "coming",   r2: "with you" },
      { w: "my parents {say} yes",     grund: "say",     wf: "says",     s2: "we",  e: "have",  ing: "having",   r2: "a party" },
      { w: "Ben {sees} a ghost", wer: "Ben",       grund: "see",     wf: "see",      s2: "he",  e: "run",   ing: "running",  r2: "away" },
      { w: "you {keep} in touch",      grund: "keep",    wf: "keeps",    s2: "we",  e: "stay",  ing: "staying",  r2: "friends forever" },
      { w: "I {have} time",            grund: "have",    wf: "has",      s2: "I",   e: "help",  ing: "helping",  r2: "you" },
      { w: "Lily {misses} the bus", wer: "Lily",    grund: "miss",    wf: "miss",     s2: "she", e: "walk",  ing: "walking",  r2: "to school" },
      { w: "it {is} cold",             grund: "be",      wf: "are",      s2: "I",   e: "take",  ing: "taking",   r2: "my jacket" },
      { w: "it {rains} tomorrow",      grund: "rain",    wf: "rain",     s2: "we",  e: "play",  ing: "playing",  r2: "table tennis outside", neg: true }
    ],
    // will (G19): Hoffnungen, Vermutungen, Vorhersagen
    willSaetze: [
      { pre: "I hope",   sub: "it",                e: "be",   r: "sunny at camp" },
      { pre: "I think",  sub: "you",               e: "like", r: "the scones" },
      { pre: "Maybe",    sub: "we",                e: "find", r: "the treasure" },
      { pre: "I'm sure", sub: "you",               e: "feel", r: "at home quickly" },
      { pre: "I hope",   sub: "we",                e: "keep", r: "in touch" },
      { pre: "I think",  sub: "Tom",               e: "miss", r: "his old school" },
      { pre: "I hope",   sub: "my new school",     e: "be",   r: "nice" },
      { pre: "I'm sure", sub: "the farewell party", e: "be",  r: "great" },
      { pre: "Maybe",    sub: "Emma",              e: "win",  r: "the quiz" },
      { pre: "I think",  sub: "it",                e: "rain", r: "tomorrow" },
      { pre: "I hope",   sub: "I",                 e: "see",  r: "you again soon" },
      { pre: "I'm sure", sub: "your friends",      e: "miss", r: "you" }
    ],
    // going to (Unterschied zu will): fester Plan, schon vorbereitet
    planSaetze: [
      { pre: "We've already bought the tickets.",      sub: "we",  e: "see",     r: "the play on Saturday" },
      { pre: "I've already packed my bag.",            sub: "I",   e: "sleep",   r: "in a tent at camp" },
      { pre: "Tom has already planned everything.",    sub: "he",  e: "make",    r: "jewellery at camp" },
      { pre: "It's all planned.",                      sub: "we",  e: "have",    r: "a farewell party on Friday" },
      { pre: "Lily has already booked the trip.",      sub: "she", e: "explore", r: "the caves" },
      { pre: "My parents have already sold our house.", sub: "we", e: "move",    r: "to Scotland" }
    ],
    erklaerungen: {
      goingto: {
        pos:  "Pläne für die Zukunft: am/is/are + going to + Grundform. Beispiel: {BEISPIEL}",
        neg:  "Verneinung: I'm not / isn't / aren't + going to + Grundform. Beispiel: {BEISPIEL}",
        frage: "Fragen: Am/Is/Are + Person + going to + Grundform? Beispiel: {BEISPIEL}",
        zuordnen: "I → am going to. He, she, it und eine Person → is going to. You, we, they und mehrere Personen → are going to."
      },
      goingtofrage: {
        frage:    "Fragen: Is/Are + Person + going to + Grundform? Beispiel: {BEISPIEL}",
        kurzJa:   "Kurzantwort mit Ja: Yes, + Person + am/is/are. Beispiel: {BEISPIEL}",
        kurzNein: "Kurzantwort mit Nein: No, + Person + 'm not/isn't/aren't. Beispiel: {BEISPIEL}",
        zuordnen: "He, she, it und eine Person → Is … going to …? You, they und mehrere Personen → Are … going to …?"
      },
      ifsatz: {
        wenn:  "Im if-Satz steht das simple present (he/she/it mit -s) – nie will! Beispiel: {BEISPIEL}",
        haupt: "Im Hauptsatz steht will/'ll (oder won't) + Grundform. Beispiel: {BEISPIEL}",
        komma: "Steht der if-Satz vorne, kommt ein Komma. Steht er hinten, gibt es kein Komma. Beispiel: {BEISPIEL}",
        zuordnen: "Richtig: If + simple present, … will + Grundform. Falsch: will im if-Satz oder ein fehlendes -s bei he/she/it."
      },
      willgoing: {
        will:  "Hoffnungen, Vermutungen und Vorhersagen (I hope, I think, maybe, I'm sure): will + Grundform. Beispiel: {BEISPIEL}",
        going: "Ist etwas schon fest geplant oder vorbereitet, nimmst du going to. Beispiel: {BEISPIEL}",
        zuordnen: "I hope, I think, maybe, I'm sure → will. Schon gekauft, gepackt, geplant → going to."
      }
    }
  }
});

Object.assign(K6.generatoren, {
  "6-G14": { baukasten: "6-U5", art: "progressiv" },
  "6-G15": { baukasten: "6-U5", art: "progressivfrage" },
  "6-G16": { baukasten: "6-U6", art: "ifsatz" },
  "6-G17": { baukasten: "6-U6", art: "goingto" },
  "6-G18": { baukasten: "6-U6", art: "goingtofrage" },
  "6-G19": { baukasten: "6-U6", art: "willgoing" }
});

K6.aufgaben.push(
  // ---------- 6-G14  Verlaufsform: Aussagen ----------
  { thema: "6-G14", niveau: "gruen", form: "quiz", frage: "Look! The dog ___ in the lake.", optionen: ["is swimming", "swims", "is swiming"], loesung: "is swimming",
    erklaerung: "Look! zeigt: Es passiert gerade jetzt → is + swimming (m verdoppelt). Beispiel: My sister is sitting in the garden." },
  { thema: "6-G14", niveau: "gelb", form: "luecke", frage: "Listen! Somebody ___ (laugh) in the kitchen.", loesung: ["is laughing"],
    erklaerung: "Listen! = jetzt gerade → is + Verb mit -ing. Beispiel: My dad is talking to a neighbour." },
  { thema: "6-G14", niveau: "gelb", form: "satzbau", loesung: ["My friends are chatting online at the moment."],
    erklaerung: "are + Verb mit -ing (chat → chatting). Beispiel: We are surfing the internet now." },
  { thema: "6-G14", niveau: "rot", form: "fehler", satz: "Emma is writeing a text to her friend.", fehlerwort: "writeing", loesung: ["writing"],
    erklaerung: "Stummes -e fällt weg: write → writing. Beispiel: Ben is making a video." },
  { thema: "6-G14", niveau: "rot", form: "umformen", frage: "Use the present progressive:  my parents / paint / the kitchen / at the moment", loesung: ["My parents are painting the kitchen at the moment."],
    erklaerung: "are + Verb mit -ing. Beispiel: My friends are planting flowers now." },

  // ---------- 6-G15  Verlaufsform: Verneinung, Fragen, Kurzantworten ----------
  { thema: "6-G15", niveau: "gruen", form: "quiz", frage: "___ you watching the video now?", optionen: ["Are", "Do", "Is"], loesung: "Are",
    erklaerung: "Fragen in der Verlaufsform: Are + you + Verb mit -ing? Beispiel: Is Tom playing chess?" },
  { thema: "6-G15", niveau: "gruen", form: "quiz", frage: "„Is Lily repairing her bike?“ – „No, …“", optionen: ["she isn't.", "she doesn't.", "she aren't."], loesung: "she isn't.",
    erklaerung: "Kurzantwort mit is: No, she isn't. Beispiel: Are your friends swimming? – No, they aren't." },
  { thema: "6-G15", niveau: "gelb", form: "luecke", frage: "Sorry, I can't talk. I ___ (not / sit) at my desk at the moment.", loesung: ["am not sitting", "'m not sitting"],
    erklaerung: "I'm not + Verb mit -ing (sit → sitting). Beispiel: I'm not playing computer games now." },
  { thema: "6-G15", niveau: "gelb", form: "satzbau", loesung: ["What are you doing at the moment?"],
    erklaerung: "Fragewort + am/is/are + Person + Verb mit -ing? Beispiel: Where is Emma going?" },
  { thema: "6-G15", niveau: "rot", form: "fehler", satz: "Tom don't playing chess at the moment.", fehlerwort: "don't", loesung: ["isn't", "is not"],
    erklaerung: "In der Verlaufsform verneinst du mit isn't/aren't, nicht mit don't. Beispiel: My sister isn't sleeping now." },

  // ---------- 6-G16  Bedingungssätze Typ I ----------
  { thema: "6-G16", niveau: "gruen", form: "quiz", frage: "If it ___ sunny tomorrow, we'll have a picnic.", optionen: ["is", "will be", "are"], loesung: "is",
    erklaerung: "Im if-Satz steht das simple present, nicht will. Beispiel: If it rains, we'll stay at home." },
  { thema: "6-G16", niveau: "gelb", form: "luecke", frage: "If you ___ (keep) the secret, I ___ (tell) you everything.", loesung: [["keep"], ["'ll tell", "will tell"]],
    erklaerung: "if + simple present, Hauptsatz mit will. Beispiel: If you help me, I'll make you a muffin." },
  { thema: "6-G16", niveau: "gelb", form: "satzbau", loesung: ["We'll go to the beach if it is sunny.", "If it is sunny, we'll go to the beach."],
    erklaerung: "Der if-Satz kann vorne (mit Komma) oder hinten (ohne Komma) stehen. Beispiel: I'll help you if I have time." },
  { thema: "6-G16", niveau: "rot", form: "fehler", satz: "If Emma will come to the party, we'll have lots of fun.", fehlerwort: "will", loesung: ["comes"],
    erklaerung: "Im if-Satz kein will! Simple present: If Emma comes … Beispiel: If Tom finds the treasure, he'll buy a boat." },
  { thema: "6-G16", niveau: "rot", form: "umformen", frage: "Make one sentence with „if“:  You get up late. → You / miss / the bus",
    loesung: ["If you get up late, you'll miss the bus.", "If you get up late, you will miss the bus.", "You'll miss the bus if you get up late.", "You will miss the bus if you get up late."],
    erklaerung: "If + simple present, … will + Grundform. Beispiel: If it rains, we'll stay at home." },

  // ---------- 6-G17  going to: Aussagen, Verneinung ----------
  { thema: "6-G17", niveau: "gruen", form: "quiz", frage: "Next summer my family ___ going to travel to Scotland.", optionen: ["is", "are", "am"], loesung: "is",
    erklaerung: "my family = it → is going to. Beispiel: My brother is going to learn to ski." },
  { thema: "6-G17", niveau: "gelb", form: "luecke", frage: "We ___ (not / sleep) in a tent. We're going to stay in a hotel.", loesung: ["aren't going to sleep", "are not going to sleep", "'re not going to sleep"],
    erklaerung: "Verneinung: aren't + going to + Grundform. Beispiel: Tom isn't going to sell his bike." },
  { thema: "6-G17", niveau: "gelb", form: "satzbau", loesung: ["I'm going to make jewellery at the weekend."],
    erklaerung: "am/is/are + going to + Grundform. Beispiel: Emma is going to explore the island." },
  { thema: "6-G17", niveau: "rot", form: "fehler", satz: "My sister is going to changes school next year.", fehlerwort: "changes", loesung: ["change"],
    erklaerung: "Nach going to steht die Grundform ohne -s. Beispiel: My dad is going to buy a new tent." },
  { thema: "6-G17", niveau: "rot", form: "umformen", frage: "Use „going to“:  Lily / say goodbye to her friends / on Friday", loesung: ["Lily is going to say goodbye to her friends on Friday.", "Lily's going to say goodbye to her friends on Friday."],
    erklaerung: "is + going to + Grundform. Beispiel: Tom is going to pack up his things tonight." },

  // ---------- 6-G18  going to: Fragen, Kurzantworten ----------
  { thema: "6-G18", niveau: "gruen", form: "quiz", frage: "___ your parents going to have a farewell party?", optionen: ["Are", "Is", "Do"], loesung: "Are",
    erklaerung: "your parents = they → Are … going to …? Beispiel: Is Ben going to play table tennis?" },
  { thema: "6-G18", niveau: "gelb", form: "luecke", frage: "Is Tom going to look after the dog? – Yes, ___.", loesung: ["he is", "yes, he is"],
    erklaerung: "Kurzantwort: Yes, he is. Beispiel: Are you going to visit your grandparents? – Yes, I am." },
  { thema: "6-G18", niveau: "gelb", form: "satzbau", loesung: ["What are you going to do in the summer holidays?"],
    erklaerung: "Fragewort + am/is/are + Person + going to + Grundform? Beispiel: Where is Emma going to sleep?" },
  { thema: "6-G18", niveau: "rot", form: "fehler", satz: "Are Emma going to explore the cave?", fehlerwort: "Are", loesung: ["Is"],
    erklaerung: "Emma = she → Is. Beispiel: Is Lily going to make jewellery?" },
  { thema: "6-G18", niveau: "rot", form: "umformen", frage: "Ask a question:  They are going to sell their old bikes.", loesung: ["Are they going to sell their old bikes?"],
    erklaerung: "Are + they + going to + Grundform? Beispiel: Are your friends going to watch a film tonight?" },

  // ---------- 6-G19  will (Hoffnungen, Vermutungen) – Unterschied zu going to ----------
  { thema: "6-G19", niveau: "gruen", form: "quiz", frage: "I hope you ___ have a great time at your new school.", optionen: ["will", "are", "to"], loesung: "will",
    erklaerung: "I hope … → will + Grundform. Beispiel: I think it will rain tomorrow." },
  { thema: "6-G19", niveau: "gruen", form: "quiz", frage: "I've already bought a new tent. I ___ sleep in it at camp.", optionen: ["am going to", "will", "am"], loesung: "am going to",
    erklaerung: "Das Zelt ist schon gekauft – es ist ein fester Plan → going to. Beispiel: We've bought the tickets. We're going to see the play." },
  { thema: "6-G19", niveau: "gelb", form: "luecke", frage: "Maybe it ___ (snow) at Christmas this year.", loesung: ["will snow", "'ll snow"],
    erklaerung: "maybe = Vermutung → will + Grundform. Beispiel: Maybe Emma will win the quiz." },
  { thema: "6-G19", niveau: "rot", form: "fehler", satz: "I'm sure you will loves the scones.", fehlerwort: "loves", loesung: ["love"],
    erklaerung: "Nach will steht die Grundform ohne -s. Beispiel: I think you will like the muffins." },
  { thema: "6-G19", niveau: "rot", form: "umformen", frage: "Use „will“:  I think / my best friend / miss me", loesung: ["I think my best friend will miss me."],
    erklaerung: "I think + will + Grundform. Beispiel: I'm sure your friends will miss you." }
);

K6.zusatzfragen.push(
  { thema: "6-G14", frage: "Which is correct?", optionen: ["swimming", "swiming", "swimeing"], loesung: "swimming" },
  { thema: "6-G14", frage: "Look! Tom … his bike.", optionen: ["is riding", "rides", "is rideing"], loesung: "is riding" },
  { thema: "6-G14", frage: "Which sentence is correct?", optionen: ["We are waiting for the bus.", "We is waiting for the bus.", "We waiting for the bus."], loesung: "We are waiting for the bus." },
  { thema: "6-G15", frage: "„Are you chatting online?“ – „Yes, …“", optionen: ["I am.", "I do.", "I chat."], loesung: "I am." },
  { thema: "6-G15", frage: "My brother … sleeping. He's playing chess.", optionen: ["isn't", "doesn't", "aren't"], loesung: "isn't" },
  { thema: "6-G15", frage: "Which question is correct?", optionen: ["Is Emma making a video?", "Does Emma making a video?", "Is Emma make a video?"], loesung: "Is Emma making a video?" },
  { thema: "6-G16", frage: "If it … tomorrow, we'll stay at home.", optionen: ["rains", "will rain", "rain"], loesung: "rains" },
  { thema: "6-G16", frage: "Which sentence is correct?", optionen: ["If you help me, I'll help you.", "If you will help me, I'll help you.", "If you helps me, I'll help you."], loesung: "If you help me, I'll help you." },
  { thema: "6-G16", frage: "If Tom finds the treasure, he …", optionen: ["will buy a boat.", "buys a boat yesterday.", "will buys a boat."], loesung: "will buy a boat." },
  { thema: "6-G17", frage: "We … going to visit our grandparents.", optionen: ["are", "is", "am"], loesung: "are" },
  { thema: "6-G17", frage: "Which sentence is correct?", optionen: ["Ben is going to sell his bike.", "Ben is going to sells his bike.", "Ben going to sell his bike."], loesung: "Ben is going to sell his bike." },
  { thema: "6-G17", frage: "I … going to change school.", optionen: ["'m not", "isn't", "don't"], loesung: "'m not" },
  { thema: "6-G18", frage: "„Is Lily going to make jewellery?“ – „Yes, …“", optionen: ["she is.", "she does.", "she going."], loesung: "she is." },
  { thema: "6-G18", frage: "Which question is correct?", optionen: ["Are you going to play table tennis?", "Do you going to play table tennis?", "Are you going play table tennis?"], loesung: "Are you going to play table tennis?" },
  { thema: "6-G18", frage: "„Are your friends going to come?“ – „No, …“", optionen: ["they aren't.", "they don't.", "they isn't."], loesung: "they aren't." },
  { thema: "6-G19", frage: "I hope it … sunny at camp.", optionen: ["will be", "will is", "be"], loesung: "will be" },
  { thema: "6-G19", frage: "We've already bought the tickets. We …", optionen: ["are going to see the play.", "will to see the play.", "going to see the play."], loesung: "are going to see the play." },
  { thema: "6-G19", frage: "Which sentence is correct?", optionen: ["I think you will like it.", "I think you will likes it.", "I think you will to like it."], loesung: "I think you will like it." }
);

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
  codeknacker: { ziffern: 5, legende: "● richtiger Platz · ◐ falscher Platz · ○ nicht im Code", start: "Tippt drei Ziffern.", fertig: "Geknackt!", versuchText: "Noch {n} Versuche",
                 namen: { "●": "richtiger Platz", "◐": "falscher Platz", "○": "nicht im Code" } }
});

// ---------- Scheitern (ab Version 0.7.2): drei Herzen, Fallen bei der Taschenlampe ----------
Object.assign(K6.minispiele, {
  // Meldung, wenn alle drei Herzen weg sind (eine davon wird ausgelost)
  gameOver: ["Arrr! Über Bord! Drei Fehler.", "Drei Fehler – ab zum Deckschrubben!"],
  // Taschenlampe: Fallen im Dunkeln – wer sie zu lange anleuchtet, verliert ein Herz
  fallen: [
    { emoji: "💣", text: "Bumm! Eine Bombe!" },
    { emoji: "🦂", text: "Autsch, ein Skorpion!" },
    { emoji: "🕷️", text: "Iiih, eine Spinne!" }
  ]
});
