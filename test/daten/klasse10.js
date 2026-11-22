/* =====================================================================
   KLASSE 10  ·  alle Inhalte für Klasse 10
   ---------------------------------------------------------------------
   FERTIG: Welt (Geschichte, Räume, Figur, Karte, Minispiele) und alle Aufgaben (G1–G7).
   Aufgaben: Unit 1 (G1, G2) ab Version 1.2.0-a, Unit 2 (G3, G4) ab 1.2.0-b, Unit 3 (G5–G7) ab 1.2.0-c. Korrekturen nach dem Klasse-10-Check: 1.2.0-d.
   „Wiederholung bis Unit 3“ streut zusätzlich Aufgaben aus Klasse 9 ein (2 von 10 pro Raum, Einstellung wiederholungMitKlassen in allgemein.js). Themen ohne Aufgaben zeigen „kommt bald“.
   Vorschau der Welt mit den Aufgaben aus Klasse 5: Adresse mit ?welt=10
   Wie eine fertige Klasse aussieht: siehe klasse5.js und klasse-vorlage.js.
   ===================================================================== */

const K10 = neueKlasse(10);   // bitte nicht ändern

// 1) DIE WELT
K10.welt = {
  name: "The Space Station", emoji: "🛰️",
  sprache: "en",   // Bedienung rund um Minispiel, Zusatzraum und Karte auf Englisch
  figur: "ARIA, station AI",
  intro: "Hello. I am ARIA, the station's AI. I was asleep. Now I'm not. " +
         "A solar storm has locked all doors and the escape pod needs a four-digit code. " +
         "The digits are stored in four modules. Please solve the puzzles. I would do it myself, but I'm on my break.",
  raeume: [
    { name: "Greenhouse",       emoji: "🌱" },
    { name: "Engine Room",      emoji: "⚙️" },
    { name: "Observation Deck", emoji: "🔭" },
    { name: "Robot Bay",        emoji: "🤖" }
  ],
  zusatzraum: { name: "Airlock", emoji: "🌌", text: "Oxygen is dropping in the airlock. Answer quickly." },
  ausgang:    { name: "Escape Pod", emoji: "🚀" },
  finaleBild: "bild/finale-10.jpg",   // Bild hinter der Tür, wenn die Mission geschafft ist (Format etwa 15:11)
  finale:     "The escape pod launches. Earth is waiting. ARIA: “Mission complete. I'm going back to sleep now.”",
  gescheitert:"Oxygen too low – the station's emergency system sends you back to the start. Try again.",
  gescheitertTor: "Three wrong codes – the escape pod is locked for safety reasons. Try again.",
  saetze: {
    start:            ["Module one is open. Tap it."],
    richtig:          ["Correct.", "Affirmative.", "Good.", "Calculation accepted.", "Well done, human."],
    falsch:           ["Error. Read the explanation and try again.", "Almost. Check the rule.", "Even I make mistakes. Rarely. Try again."],
    loesung:          ["Difficult. Look at the answer – a new task is loading."],
    raumGeschafft:    ["Module done. Next: the airlock …", "All data collected."],
    zusatzStart:      ["Airlock sequence started. Be fast and precise."],
    zusatzGeschafft:  ["Airlock stable. The digit is yours."],
    zusatzGescheitert:["Pressure warning – but you're fine. One of these three digits is right."],
    zeitWarnung:      ["Oxygen is getting low. Hurry."],
    torFalsch:        ["Code rejected. Check the lights: green is right, red is not yet."],
    zwilling:         ["Loading a similar task."],
    torBereit:        ["All modules done. Enter the code at the escape pod."]
  }
};

// ---------- KARTE (Entdecker-Modus) ----------
// Die Karte ersetzt die Übersicht mit den Kacheln (Datei welt/karte.js, Aussehen: welt/stil-station.js).
// So lest ihr die Zahlen: x = wie weit nach rechts (0 … 1600), y = wie weit nach unten (0 … 1000).
// Ein Modul braucht etwa 300 × 200 Platz. Der Punkt x/y ist die Mitte, die Luke ist unten in der Mitte.
// Kleine Schritte ändern (z. B. 50) und danach im Browser ansehen: …/test/index.html?welt=10
K10.welt.karte = {
  stil: "station",                         // Aussehen: Datei welt/stil-station.js
  groesse: { b: 1600, h: 1000 },           // Größe der ganzen Karte. Klein lassen: kurze Wege!
  start:   { x: 800, y: 850 },             // hier steht die Spielfigur am Anfang (vor der Rettungskapsel)

  // Die vier Module. Reihenfolge = Reihenfolge der Räume oben (Greenhouse zuerst).
  raeume: [
    { x: 320,  y: 310, schild: "Greenhouse" },
    { x: 1280, y: 310, schild: "Engine Room" },
    { x: 400,  y: 700, schild: "Observation Deck" },
    { x: 1200, y: 700, schild: "Robot Bay" }
  ],
  zusatzraum: { x: 800, y: 215, schild: "Airlock" },   // nur Kulisse, wird nach jedem Modul von selbst betreten
  tor:        { x: 800, y: 950 },                      // die Rettungskapsel unten

  // Figuren: höchstens 5. Keine hält auf, Antippen ist freiwillig.
  //   art: "begleiter" = ARIA, schwebt als Hologramm mit
  //   art: "regel"     = zeigt die Regelkarte des nächsten Moduls
  //   art: "zeit"      = dreht seine „runde“ (Punkte [x, y]) und warnt, wenn die Zeit knapp wird
  //   art: "wort"      = zeigt ein Wort aus der Wörterhilfe („emoji“ = Bild, „trick“ = drehen, rollen oder huepfen)
  figuren: [
    { art: "begleiter" },
    { art: "regel", name: "Plant bot", x: 660, y: 520 },
    { art: "zeit",  name: "Maintenance drone", runde: [[930, 470], [1150, 470], [1150, 560], [930, 560]] },
    { art: "wort",  emoji: "🛰️", name: "Model satellite", trick: "drehen",  x: 560,  y: 850 },
    { art: "wort",  emoji: "📟", name: "Old pager",       trick: "huepfen", x: 1080, y: 865 }
  ],

  // Orte, an denen ARIA einmal pro Mission etwas sagt, wenn die Spielfigur in die Nähe kommt.
  orte: [
    { x: 800, y: 340, radius: 120, text: "That is the airlock. It opens when it wants to. Like me." },
    { x: 150, y: 520, radius: 120, text: "There is nothing over there. I would know. I am the station." },
    { x: 800, y: 620, radius: 100, text: "Main corridor. You are welcome to keep walking." }
  ],

  // Texte der Karte. {name} wird durch den Namen des Moduls ersetzt.
  // Steht hier eine Liste [ "…", "…" ], wird jedes Mal ein Satz ausgewählt.
  texte: {
    gesperrt:        "Locked. Finish the module with the arrow first. I don't make the rules. Well, I do.",
    schonGeschafft:  "You already have that digit. Moving on.",
    torZu:           "The escape pod needs four digits. You don't have four digits.",
    zusatz:          "The airlock opens after each module. No need to stare at it.",
    zusatzReaktion:  ["Hiss.", "Pressure stable. For now.", "Sssss …"],
    jubel:           "A digit. How exciting.",
    tipp:            "Next: {name}. Follow the arrow.",
    tippTor:         "All four digits. The escape pod is waiting.",
    regelTitel:      "Data sheet: {name}",
    keineRegel:      "No data sheet for this module.",
    waerterinFertig: "All modules done. The escape pod is that way.",
    waechter:        "Oxygen is limited. Just saying.",
    waechterRuf:     ["Scan … human. Fine.", "Unknown object … oh. It's you.", "Beep. Carry on."],
    pollyGeschafft:  ["One digit. Three to go.", "Two digits. Half done.", "One module left.", "All four. Escape pod. Go."],
    pollyWarten:     ["Are you resting? I was resting. Next: {name}.", "Time passes. Even in space. {name}."],
    pollyZurueck:    ["Recalculating. Try again.", "Take a breath. While there is air."],
    schliessen:      "Close"
  }
};

// Bild der Begleitfigur oben links (ARIA, die Bord-KI). Nur die Formen, ohne <svg>-Hülle, Feld 120 × 130.
K10.welt.figurSvg =
  '<path d="M38 128 L60 96 L82 128 Z" fill="#96dcff" fill-opacity="0.35" stroke="#000" stroke-width="3"/>' +
  '<circle cx="60" cy="60" r="44" fill="none" stroke="#bfe9ff" stroke-width="3" stroke-dasharray="8 7"/>' +
  '<circle cx="60" cy="60" r="34" fill="#143c5a" stroke="#000" stroke-width="4"/>' +
  '<circle cx="60" cy="60" r="34" fill="none" stroke="#bfe9ff" stroke-width="2"/>' +
  '<path d="M38 56 L54 56 M66 56 L82 56" stroke="#fff" stroke-width="4" stroke-linecap="round"/>' +
  '<path d="M39 57 A7 7 0 0 0 53 57 Z" fill="#fff"/><path d="M67 57 A7 7 0 0 0 81 57 Z" fill="#fff"/>' +
  '<path d="M52 78 L68 78" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>' +
  '<path d="M96 22 L104 14 M100 30 L110 28" stroke="#ff9f1c" stroke-width="3" stroke-linecap="round"/>';
// ---------- Ende KARTE ----------

// 2) DIE THEMEN (laut „Themenuebersicht“)
K10.themen = [
  { id: "10-G1", klasse: 10, unit: 1, titelEn: "Present tenses", titel: "Gegenwartszeiten", regel: "Simple present: habits and facts (I usually walk to school. Water freezes at 0 degrees.) – do / does in questions and negatives. Present progressive: am / is / are + verb-ing for now or a short time (Look! It is snowing. This week I'm working at home.). State verbs (know, want, need, belong, own, understand) → no -ing form." },
  { id: "10-G2", klasse: 10, unit: 1, titelEn: "Present perfect", titel: "Das Perfekt", regel: "Present perfect: have / has + 3rd form – until now, no finished time (ever, never, already, just, yet). since + point in time, for + period of time. Present perfect progressive: have / has been + verb-ing – how long something has been going on (I have been waiting for an hour). Finished time (yesterday, last week, ago, in 2018) → simple past." },
  { id: "10-G3", klasse: 10, unit: 2, titelEn: "Conditional sentences type I and II", titel: "Bedingungssätze Typ I und II", regel: "Type I (possible): if + simple present, will / should + verb: If it rains, we will stay at home. Type II (unreal): if + simple past, would / could + verb: If I had more money, I would travel. If I were / was you … No will / would in the if-clause. The if-clause can come first (with comma) or second." },
  { id: "10-G4", klasse: 10, unit: 2, titelEn: "The passive", titel: "Das Passiv", regel: "Passive (Passiv): simple present: am / is / are + 3rd form (Tea is grown in India). Simple past: was / were + 3rd form (The Taj Mahal was built in the 17th century). Who did it? → by … Negative: isn't / wasn't + 3rd form. Question: Is / Was … + 3rd form?" },
  { id: "10-G5", klasse: 10, unit: 3, titelEn: "Reported speech (places, times, commands and requests)", titel: "Indirekte Rede (Orts- und Zeitangaben, Aufforderungen und Bitten)", regel: "Reported speech (indirekte Rede): time and place words change: now → then, today → that day, tomorrow → the next day, yesterday → the day before, next week → the following week, ago → before, here → there, this → that. will → would. Questions: asked if / where … Commands and requests: told / asked me (not) to …" },
  { id: "10-G6", klasse: 10, unit: 3, titelEn: "Past tenses", titel: "Vergangenheitszeiten", regel: "Simple past: finished time (yesterday, in 2011, two years ago). Past progressive: was / were + -ing – an action going on when something happened (I was sleeping when the earthquake started). Past perfect: had + 3rd form – an earlier action (By the time we arrived, the film had started). Present perfect: until now (ever, never, yet, since, for)." },
  { id: "10-G7", klasse: 10, unit: 3, titelEn: "Conditional sentences type III", titel: "Bedingungssätze Typ III", regel: "Type III (about the past): if + had + 3rd form, would have + 3rd form: If we had left earlier, we would have caught the train. Negative: hadn't / wouldn't have. Short forms: If I'd known, I'd have come. Compare type I (if + present, will) and type II (if + past, would)." }
];

// =====================================================================
// 3) DER SATZBAUKASTEN – Wortschatz: Klasse 5–9 komplett + Klasse 10 bis zur Unit
//    Klasse 10: Erklärungen in einfachem Englisch, deutscher Fachbegriff in Klammern.
//    Art „satzpool“ wie in Klasse 8 und 9 (Felder: siehe index.html, function satzpool).
// =====================================================================
K10.baukasten = {
  // ---------- Klasse 10, Unit 1: Gegenwartszeiten (G1) ----------
  //   simple present ↔ present progressive mit Zustandsverben, Fragen und Verneinung (Vorgaben der Lehrkraft)
  "10-G1": {
    saetze: [
      { e: "simple",   t: "Polar bears usually ___ seals.", h: "hunt", r: ["hunt"], f: ["are hunting", "hunts"], fehler: "hunts" },
      { e: "simple",   t: "In Canada, lots of children ___ ice hockey every winter.", h: "play", r: ["play"], f: ["are playing", "plays"], fehler: "plays" },
      { e: "simple",   t: "My coach ___ to the gym three times a week.", h: "go", r: ["goes"], f: ["is going", "go"], fehler: { ersatz: "go", wort: "go", loesung: ["goes"] } },
      { e: "simple",   t: "Water ___ at 0 degrees.", h: "freeze", r: ["freezes"], f: ["is freezing", "freeze"], fehler: "freeze" },
      { e: "simple",   t: "Canada ___ a lot of oil every year.", h: "export", r: ["exports"], f: ["is exporting", "export"], fehler: "export" },
      { e: "simple",   t: "Liam often ___ parkour in the park after school.", h: "do", r: ["does"], f: ["is doing", "do"], fehler: "do" },
      { e: "prog",     t: "Look! The bear ___ the river.", h: "cross", r: ["is crossing"], f: ["crosses", "is crosing"], fehler: { ersatz: "crosses", wort: "crosses", loesung: ["is crossing"] } },
      { e: "prog",     t: "Be quiet! The players ___ to the coach right now.", h: "listen", r: ["are listening"], f: ["listen", "is listening"], fehler: { ersatz: "listen", wort: "listen", loesung: ["are listening"] } },
      { e: "prog",     t: "At the moment, Ava ___ for the lacrosse championship.", h: "train", r: ["is training"], f: ["trains", "is trainning"], fehler: { ersatz: "is trainning", wort: "trainning", loesung: ["training"] } },
      { e: "prog",     t: "This week my brother ___ at a ski resort in the Rocky Mountains.", h: "work", r: ["is working"], f: ["works", "are working"], fehler: { ersatz: "are working", wort: "are", loesung: ["is"] } },
      { e: "prog",     t: "Listen! Someone ___ outside.", h: "shout", r: ["is shouting"], f: ["shouts", "is shoutting"], fehler: { ersatz: "is shoutting", wort: "shoutting", loesung: ["shouting"] } },
      { e: "prog",     t: "These days the ice in the Arctic ___ faster and faster.", h: "melt", r: ["is melting"], f: ["melts", "is melt"], fehler: { ersatz: "is melt", wort: "melt", loesung: ["melting"] } },
      { e: "neg",      t: "Mia ___ TV right now. She is reading.", h: "not / watch", r: ["isn't watching", "is not watching"], f: ["doesn't watch", "isn't watch"], fehler: { ersatz: "doesn't watching", wort: "doesn't", loesung: ["isn't", "is not"] } },
      { e: "neg",      t: "My parents ___ meat. They are vegetarians.", h: "not / eat", r: ["don't eat", "do not eat"], f: ["aren't eating", "doesn't eat"], fehler: { ersatz: "doesn't eat", wort: "doesn't", loesung: ["don't", "do not"] } },
      { e: "neg",      t: "Tom usually ___ on Sundays.", h: "not / train", r: ["doesn't train", "does not train"], f: ["isn't training", "don't train"], fehler: { ersatz: "don't train", wort: "don't", loesung: ["doesn't", "does not"] } },
      { e: "neg",      t: "We ___ at the moment. We're having a break.", h: "not / work", r: ["aren't working", "are not working", "'re not working"], f: ["don't work", "aren't work"], fehler: { ersatz: "don't working", wort: "don't", loesung: ["aren't", "are not"] } },
      { e: "frage",    t: "___ you usually walk to school?", h: "do / be", r: ["Do"], f: ["Are", "Does"], fehler: "Are" },
      { e: "frage",    t: "What ___ you doing right now?", h: "do / be", r: ["are"], f: ["do", "is"], fehler: "do" },
      { e: "frage",    t: "How often ___ your sister go to the gym?", h: "do / be", r: ["does"], f: ["is", "do"], fehler: "is" },
      { e: "frage",    t: "Why ___ Ethan wearing a jacket? It's hot today.", h: "do / be", r: ["is"], f: ["does", "are"], fehler: "does" },
      { e: "state",    t: "Ethan ___ a new pair of skates.", h: "want", r: ["wants"], f: ["is wanting", "want"], fehler: "want" },
      { e: "state",    t: "This old sledge ___ to my grandfather.", h: "belong", r: ["belongs"], f: ["is belonging", "belong"], fehler: "belong" },
      { e: "state",    t: "Do you ___ what I mean?", h: "understand", r: ["understand"], f: ["understanding", "understands"], fehler: "understands" },
      { e: "state",    t: "We ___ more time for the project.", h: "need", r: ["need"], f: ["are needing", "needs"], fehler: "needs" },
      { e: "state",    t: "Sorry, I ___ the answer.", h: "not / know", r: ["don't know", "do not know"], f: ["am not knowing", "doesn't know"], fehler: { ersatz: "doesn't know", wort: "doesn't", loesung: ["don't", "do not"] } },
      { e: "state",    t: "My cousin ___ a big house near Toronto.", h: "own", r: ["owns"], f: ["is owning", "own"], fehler: "own" },
      { e: "kontrast", t: "Normally Liam ___ the bus, but today he is cycling.", h: "take", r: ["takes"], f: ["is taking", "take"], fehler: "take" },
      { e: "kontrast", t: "Dad normally goes to the office, but this week he ___ from home.", h: "work", r: ["is working"], f: ["works", "is work"], fehler: { ersatz: "works", wort: "works", loesung: ["is working"] } },
      { e: "kontrast", t: "I ___ a book about Canada at the moment, but I don't usually read much.", h: "read", r: ["am reading", "'m reading"], f: ["read", "reads"], fehler: { ersatz: "reads", wort: "reads", loesung: ["am reading"] } }
    ],
    umformen: [
      { e: "neg",      a: "Make the sentence negative:", von: "Ava plays lacrosse.", nach: ["Ava doesn't play lacrosse.", "Ava does not play lacrosse."] },
      { e: "neg",      a: "Make the sentence negative:", von: "The children are skating.", nach: ["The children aren't skating.", "The children are not skating."] },
      { e: "neg",      a: "Make the sentence negative:", von: "I know the way.", nach: ["I don't know the way.", "I do not know the way."] },
      { e: "neg",      a: "Make the sentence negative:", von: "Liam is training today.", nach: ["Liam isn't training today.", "Liam is not training today.", "Liam's not training today."] },
      { e: "neg",      a: "Make the sentence negative:", von: "We need help.", nach: ["We don't need help.", "We do not need help."] },
      { e: "frage",    a: "Ask a question:", von: "Ethan plays ice hockey.", nach: ["Does Ethan play ice hockey?"] },
      { e: "frage",    a: "Ask a question:", von: "They are watching the game.", nach: ["Are they watching the game?"] },
      { e: "frage",    a: "Ask a question:", von: "Mia wants a new phone.", nach: ["Does Mia want a new phone?"] },
      { e: "frage",    a: "Ask a question with “what” (What …):", von: "She is doing something.", nach: ["What is she doing?", "What's she doing?"] },
      { e: "frage",    a: "Ask a question with “where” (Where …):", von: "He works somewhere.", nach: ["Where does he work?"] },
      { e: "prog",     a: "Use the present progressive:", von: "I read a book. (at the moment)", nach: ["I am reading a book at the moment.", "I'm reading a book at the moment.", "At the moment, I am reading a book.", "At the moment I am reading a book.", "At the moment, I'm reading a book.", "At the moment I'm reading a book."] },
      { e: "prog",     a: "Use the present progressive:", von: "We play football. (right now)", nach: ["We are playing football right now.", "We're playing football right now.", "Right now, we are playing football.", "Right now we are playing football.", "Right now, we're playing football.", "Right now we're playing football."] },
      { e: "prog",     a: "Use the present progressive:", von: "The bears eat fish. (Look!)", nach: ["Look! The bears are eating fish."] },
      { e: "prog",     a: "Use the present progressive:", von: "Ava trains for the championship. (this week)", nach: ["Ava is training for the championship this week.", "Ava's training for the championship this week.", "This week, Ava is training for the championship.", "This week Ava is training for the championship."] },
      { e: "prog",     a: "Use the present progressive:", von: "It snows. (at the moment)", nach: ["It is snowing at the moment.", "It's snowing at the moment.", "At the moment, it is snowing.", "At the moment it is snowing.", "At the moment, it's snowing.", "At the moment it's snowing."] },
      { e: "simple",   a: "Use the simple present:", von: "I am cycling to school. (every day)", nach: ["I cycle to school every day.", "Every day, I cycle to school.", "Every day I cycle to school."] },
      { e: "simple",   a: "Use the simple present:", von: "Ethan is playing hockey. (on Saturdays)", nach: ["Ethan plays hockey on Saturdays.", "On Saturdays, Ethan plays hockey.", "On Saturdays Ethan plays hockey."] },
      { e: "simple",   a: "Use the simple present:", von: "My mum is working late. (usually)", nach: ["My mum usually works late.", "Usually my mum works late.", "Usually, my mum works late."] },
      { e: "simple",   a: "Use the simple present:", von: "We are walking the dog. (twice a day)", nach: ["We walk the dog twice a day."] },
      { e: "simple",   a: "Use the simple present:", von: "The coach is shouting. (never)", nach: ["The coach never shouts."] },
      { e: "state",    a: "Correct the sentence (state verb):", von: "I am knowing the way.", nach: ["I know the way."] },
      { e: "state",    a: "Correct the sentence (state verb):", von: "She is wanting a hot drink.", nach: ["She wants a hot drink."] },
      { e: "state",    a: "Correct the sentence (state verb):", von: "This bike is belonging to my brother.", nach: ["This bike belongs to my brother."] },
      { e: "state",    a: "Correct the sentence (state verb):", von: "We are needing a bigger tent.", nach: ["We need a bigger tent."] },
      { e: "state",    a: "Correct the sentence (state verb):", von: "Are you understanding the question?", nach: ["Do you understand the question?"] },
      { e: "state",    a: "Correct the sentence (state verb):", von: "He is owning three dogs.", nach: ["He owns three dogs."] }
    ],
    zuordnen: {
      kategorien: ["simple present", "present progressive"],
      woerter: [
        { text: "every day", ziel: "simple present" }, { text: "usually", ziel: "simple present" }, { text: "never", ziel: "simple present" },
        { text: "on Mondays", ziel: "simple present" }, { text: "twice a week", ziel: "simple present" }, { text: "I know", ziel: "simple present" },
        { text: "it belongs", ziel: "simple present" },
        { text: "right now", ziel: "present progressive" }, { text: "at the moment", ziel: "present progressive" }, { text: "Look!", ziel: "present progressive" },
        { text: "Listen!", ziel: "present progressive" }, { text: "this week", ziel: "present progressive" }, { text: "these days", ziel: "present progressive" }
      ]
    },
    erklaerungen: {
      satzpool: {
        simple:   "Simple present: habits and facts (Gewohnheiten, Tatsachen), often with always, usually, often, every day. he / she / it: verb + -s. Example: {BEISPIEL}",
        prog:     "Present progressive (Verlaufsform): am / is / are + verb-ing for actions happening now or only for a short time (vorübergehend): now, at the moment, Look!, this week. Example: {BEISPIEL}",
        neg:      "Negative (Verneinung): don't / doesn't + verb (simple present); am not / isn't / aren't + verb-ing (present progressive). Example: {BEISPIEL}",
        frage:    "Questions: Do / Does + subject + verb …? (simple present) – Am / Is / Are + subject + verb-ing …? (present progressive). Example: {BEISPIEL}",
        state:    "State verbs (Zustandsverben) like know, want, need, understand, belong and own are normally not used in the progressive form. Example: {BEISPIEL}",
        kontrast: "The normal situation or a habit → simple present. Something different now or only this week → present progressive. Example: {BEISPIEL}",
        zuordnen: "Signal words for the simple present: every day, usually, never, on Mondays. For the present progressive: now, at the moment, Look!, this week. State verbs (know, belong) → simple present."
      }
    }
  },

  // ---------- Klasse 10, Unit 1: Das Perfekt (G2) ----------
  //   since / for, Gegenüberstellung simple past, present perfect progressive, Signalwörter (Vorgaben der Lehrkraft)
  "10-G2": {
    saetze: [
      { e: "sincefor", t: "Ethan has lived in Canada ___ 2019.", h: "since / for", r: ["since"], f: ["for", "ago"], fehler: "for" },
      { e: "sincefor", t: "My parents have known each other ___ twenty years.", h: "since / for", r: ["for"], f: ["since", "ago"], fehler: "since" },
      { e: "sincefor", t: "The explorers have been on the ice ___ three months.", h: "since / for", r: ["for"], f: ["since", "ago"], fehler: "since" },
      { e: "sincefor", t: "My coach has worked here ___ last summer.", h: "since / for", r: ["since"], f: ["for", "ago"], fehler: "for" },
      { e: "sincefor", t: "I haven't seen a moose ___ a long time.", h: "since / for", r: ["for"], f: ["since", "ago"], fehler: "since" },
      { e: "sincefor", t: "Ava has played lacrosse ___ she was six.", h: "since / for", r: ["since"], f: ["for", "ago"], fehler: "for" },
      { e: "kontrast", t: "The explorers ___ England in 1845.", h: "leave", r: ["left"], f: ["have left", "leaved"], fehler: "leaved" },
      { e: "kontrast", t: "Ice hockey ___ popular in Canada since the 19th century.", h: "be", r: ["has been"], f: ["was", "is"], fehler: { ersatz: "have been", wort: "have", loesung: ["has"] } },
      { e: "kontrast", t: "I ___ a grizzly bear last summer.", h: "see", r: ["saw"], f: ["have seen", "seed"], fehler: "seed" },
      { e: "kontrast", t: "Liam ___ to the Rocky Mountains twice.", h: "be", r: ["has been"], f: ["was", "have been"], fehler: { ersatz: "have been", wort: "have", loesung: ["has"] } },
      { e: "kontrast", t: "Two years ago my family ___ a house in Toronto.", h: "buy", r: ["bought"], f: ["has bought", "buyed"], fehler: "buyed" },
      { e: "kontrast", t: "When ___ you start playing soccer?", h: "do / have", r: ["did"], f: ["have", "do"], fehler: "have" },
      { e: "frage",    t: "___ you ever been to Canada?", h: "do / have", r: ["Have"], f: ["Did", "Were"], fehler: "Did" },
      { e: "signal",   t: "I've ___ finished my workout. I'm going home now.", h: "just / yet", r: ["just", "already"], f: ["yet", "ever"], fehler: "yet" },
      { e: "signal",   t: "The coach hasn't called ___.", h: "already / yet", r: ["yet"], f: ["already", "just"], fehler: "already" },
      { e: "signal",   t: "We haven't finished the project ___.", h: "already / yet", r: ["yet"], f: ["already", "just"], fehler: "already" },
      { e: "signal",   t: "Have you ___ tried parkour?", h: "ever / yet", r: ["ever"], f: ["yet", "since"], fehler: "yet" },
      { e: "signal",   t: "I have ___ seen a polar bear. I'd love to see one!", h: "ever / never", r: ["never"], f: ["ever", "yet"], fehler: "ever" },
      { e: "signal",   t: "Look! The ice on the lake has ___ started to melt.", h: "already / yet", r: ["already", "just"], f: ["yet", "ever"], fehler: "yet" },
      { e: "progr",    t: "I ___ for the bus for twenty minutes.", h: "wait – present perfect progressive", r: ["have been waiting", "'ve been waiting"], f: ["have waiting", "has been waiting"], fehler: { ersatz: "have been wait", wort: "wait", loesung: ["waiting"] } },
      { e: "progr",    t: "Lucy ___ lacrosse since she was ten.", h: "play – present perfect progressive", r: ["has been playing", "'s been playing"], f: ["has playing", "have been playing"], fehler: { ersatz: "have been playing", wort: "have", loesung: ["has"] } },
      { e: "progr",    t: "It ___ all day.", h: "snow – present perfect progressive", r: ["has been snowing", "'s been snowing"], f: ["has snowing", "is been snowing"], fehler: { ersatz: "is been snowing", wort: "is", loesung: ["has"] } },
      { e: "progr",    t: "The players ___ hard since eight o'clock.", h: "train – present perfect progressive", r: ["have been training", "'ve been training"], f: ["has been training", "have training"], fehler: { ersatz: "has been training", wort: "has", loesung: ["have"] } },
      { e: "progr",    t: "How long ___ you been learning English?", h: "have / are", r: ["have"], f: ["are", "did"], fehler: "are" },
      { e: "progr",    t: "Liam is tired because he ___ all afternoon.", h: "work – present perfect progressive", r: ["has been working", "'s been working"], f: ["has working", "have been working"], fehler: { ersatz: "has been work", wort: "work", loesung: ["working"] } },
      { e: "progr",    t: "We ___ about the pipeline for weeks.", h: "talk – present perfect progressive", r: ["have been talking", "'ve been talking"], f: ["have talking", "has been talking"], fehler: { ersatz: "has been talking", wort: "has", loesung: ["have"] } },
      { e: "neg",      t: "I ___ my homework yet.", h: "not / finish", r: ["haven't finished", "have not finished"], f: ["hasn't finished", "haven't finish"], fehler: { ersatz: "haven't finish", wort: "finish", loesung: ["finished"] } },
      { e: "neg",      t: "My brother ___ a moose before.", h: "never / see", r: ["has never seen"], f: ["have never seen", "has never saw"], fehler: { ersatz: "has never saw", wort: "saw", loesung: ["seen"] } }
    ],
    umformen: [
      { e: "sincefor", a: "Write one sentence with “since” (present perfect):", von: "Ethan came to Canada in 2019. He still lives there.", nach: ["Ethan has lived in Canada since 2019.", "Ethan has been living in Canada since 2019.", "Ethan's lived in Canada since 2019."] },
      { e: "sincefor", a: "Write one sentence with “for” (present perfect):", von: "We became friends ten years ago. We are still friends.", nach: ["We have been friends for ten years.", "We've been friends for ten years.", "We have known each other for ten years.", "We've known each other for ten years."] },
      { e: "sincefor", a: "Write one sentence with “since” (present perfect):", von: "Ava started lacrosse when she was six. She still plays.", nach: ["Ava has played lacrosse since she was six.", "Ava has been playing lacrosse since she was six.", "Ava's played lacrosse since she was six.", "Ava's been playing lacrosse since she was six."] },
      { e: "sincefor", a: "Write one sentence with “for” (present perfect):", von: "I got my dog three years ago. I still have it.", nach: ["I have had my dog for three years.", "I've had my dog for three years."] },
      { e: "sincefor", a: "Write one sentence with “since” (present perfect):", von: "My coach started working here last summer. He still works here.", nach: ["My coach has worked here since last summer.", "My coach has been working here since last summer."] },
      { e: "progr",    a: "Use the present perfect progressive:", von: "I wait for the bus. (for twenty minutes)", nach: ["I have been waiting for the bus for twenty minutes.", "I've been waiting for the bus for twenty minutes."] },
      { e: "progr",    a: "Use the present perfect progressive:", von: "It snows. (all day)", nach: ["It has been snowing all day.", "It's been snowing all day."] },
      { e: "progr",    a: "Use the present perfect progressive:", von: "The players train. (since eight o'clock)", nach: ["The players have been training since eight o'clock.", "Since eight o'clock, the players have been training.", "Since eight o'clock the players have been training."] },
      { e: "progr",    a: "Use the present perfect progressive:", von: "Liam works in the garden. (all afternoon)", nach: ["Liam has been working in the garden all afternoon.", "Liam's been working in the garden all afternoon."] },
      { e: "progr",    a: "Use the present perfect progressive:", von: "We talk about the trip. (for hours)", nach: ["We have been talking about the trip for hours.", "We've been talking about the trip for hours."] },
      { e: "frage",    a: "Ask a question with “How long”:", von: "Ava has been playing lacrosse.", nach: ["How long has Ava been playing lacrosse?"] },
      { e: "frage",    a: "Ask a question with “How long”:", von: "They have lived in Canada.", nach: ["How long have they lived in Canada?", "How long have they been living in Canada?"] },
      { e: "frage",    a: "Ask a question with “How long”:", von: "You have been learning English.", nach: ["How long have you been learning English?"] },
      { e: "frage",    a: "Ask a question with “ever”:", von: "you / see a polar bear", nach: ["Have you ever seen a polar bear?"] },
      { e: "neg",      a: "Make the sentence negative with “yet”:", von: "I have finished my workout.", nach: ["I haven't finished my workout yet.", "I have not finished my workout yet."] },
      { e: "neg",      a: "Make the sentence negative with “yet”:", von: "The coach has called.", nach: ["The coach hasn't called yet.", "The coach has not called yet."] },
      { e: "kontrast", a: "Rewrite the sentence with “last summer”:", von: "I have seen a grizzly bear.", nach: ["I saw a grizzly bear last summer.", "Last summer, I saw a grizzly bear.", "Last summer I saw a grizzly bear."] },
      { e: "kontrast", a: "Rewrite the sentence with “in 2018”:", von: "We have visited Toronto.", nach: ["We visited Toronto in 2018.", "In 2018, we visited Toronto.", "In 2018 we visited Toronto."] },
      { e: "kontrast", a: "Rewrite the sentence with “yesterday”:", von: "Mia has bought new skates.", nach: ["Mia bought new skates yesterday.", "Yesterday, Mia bought new skates.", "Yesterday Mia bought new skates."] },
      { e: "kontrast", a: "Rewrite the sentence with “two years ago”:", von: "My family has moved to Toronto.", nach: ["My family moved to Toronto two years ago.", "Two years ago, my family moved to Toronto.", "Two years ago my family moved to Toronto."] },
      { e: "kontrast", a: "Ask a question with “when” (When …):", von: "You have started playing soccer.", nach: ["When did you start playing soccer?"] },
      { e: "signal",   a: "Use the present perfect with “never” (I …):", von: "I / eat / moose meat", nach: ["I have never eaten moose meat.", "I've never eaten moose meat."] },
      { e: "signal",   a: "Use the present perfect with “already”:", von: "The ice melted.", nach: ["The ice has already melted.", "The ice has melted already."] },
      { e: "signal",   a: "Use the present perfect with “just”:", von: "The match started.", nach: ["The match has just started."] },
      { e: "sincefor", a: "Use “since” instead of “for” (… since Monday):", von: "I haven't seen Liam for a week.", nach: ["I haven't seen Liam since Monday.", "I have not seen Liam since Monday."] }
    ],
    zuordnen: {
      kategorien: ["since …", "for …", "simple past"],
      woerter: [
        { text: "2019", ziel: "since …" }, { text: "Monday", ziel: "since …" }, { text: "eight o'clock", ziel: "since …" },
        { text: "Christmas", ziel: "since …" }, { text: "she was six", ziel: "since …" },
        { text: "ten years", ziel: "for …" }, { text: "a week", ziel: "for …" }, { text: "three months", ziel: "for …" },
        { text: "two hours", ziel: "for …" }, { text: "a long time", ziel: "for …" },
        { text: "two years ago", ziel: "simple past" }, { text: "yesterday", ziel: "simple past" }, { text: "in 2018", ziel: "simple past" },
        { text: "last week", ziel: "simple past" }, { text: "when I was six", ziel: "simple past" }
      ]
    },
    erklaerungen: {
      satzpool: {
        sincefor: "since + point in time (Zeitpunkt): since 2019, since Monday. for + period of time (Zeitraum): for ten years, for a week. Example: {BEISPIEL}",
        kontrast: "Finished time in the past (yesterday, last summer, in 2018, ago) → simple past. Until now or no time given (ever, never, twice, since, for) → present perfect. Example: {BEISPIEL}",
        frage:    "Questions in the present perfect: Have / Has + subject + 3rd form …? Example: {BEISPIEL}",
        signal:   "Signal words (Signalwörter): already and just in positive sentences, yet in questions and negative sentences, ever in questions, never = not ever. Example: {BEISPIEL}",
        progr:    "Present perfect progressive (Verlaufsform des Perfekts): have / has been + verb-ing. It shows how long an action has been going on until now. Example: {BEISPIEL}",
        neg:      "Negative (Verneinung): haven't / hasn't + 3rd form. never comes between have / has and the 3rd form. Example: {BEISPIEL}",
        zuordnen: "since + point in time (since 2019), for + period of time (for ten years). Finished past time (ago, yesterday, last week, in 2018) → simple past."
      }
    }
  }
};

// =====================================================================
// 4) WÖRTERHILFE: deutsche Bedeutung für erschließbare oder neue Wörter (Antippen zeigt die Bedeutung)
// =====================================================================
K10.woerterhilfe = [
  { en: "seals", de: "Robben" }, { en: "freeze", de: "frieren, gefrieren" }, { en: "freezes", de: "gefriert" }, { en: "degrees", de: "Grad" },
  { en: "ski resort", de: "Skigebiet" }, { en: "Rocky Mountains", de: "Rocky Mountains (Gebirge in Nordamerika)" }, { en: "Arctic", de: "Arktis" },
  { en: "vegetarians", de: "Vegetarier/innen" }, { en: "skates", de: "Schlittschuhe" }, { en: "sledge", de: "Schlitten" }, { en: "own", de: "besitzen" },
  { en: "owns", de: "besitzt" }, { en: "belong", de: "gehören" }, { en: "belongs", de: "gehört" }, { en: "Toronto", de: "Toronto (Stadt in Kanada)" },
  { en: "lacrosse", de: "Lacrosse (Ballsportart)" }, { en: "parkour", de: "Parkour (Sportart)" }, { en: "moose", de: "Elch" }, { en: "grizzly bear", de: "Grizzlybär" },
  { en: "polar bear", de: "Eisbär" }, { en: "workout", de: "Training" }, { en: "pipeline", de: "Pipeline (Rohrleitung)" }, { en: "explorers", de: "Entdecker/innen" },
  { en: "championship", de: "Meisterschaft" }, { en: "gym", de: "Fitnessstudio, Turnhalle" }, { en: "tent", de: "Zelt" }, { en: "normally", de: "normalerweise" }
];

// =====================================================================
// 5) GENERATOREN
// =====================================================================
K10.generatoren = {
  "10-G1": { baukasten: "10-G1", art: "satzpool" },
  "10-G2": { baukasten: "10-G2", art: "satzpool" }
};

// =====================================================================
// Klasse 10, Unit 2 (G3, G4)
// =====================================================================
// Hilfe für if-Sätze: K10_WENN("If it rains", "we will stay at home") ergibt alle richtigen Varianten:
// mit/ohne Komma, Hauptsatz vorn oder hinten, Kurzformen (will → 'll, would → 'd, will not → won't …).
// Mehrere if-Teile (z. B. „If I were you“ / „If I was you“) als Liste übergeben.
const K10_WENN = (ifTeile, haupt) => {
  const kurz = x => x.replace(/\b(I|you|he|she|it|we|they) will not\b/g, "$1 won't").replace(/\b(I|you|he|she|it|we|they) would not\b/g, "$1 wouldn't")
                     .replace(/\b(I|you|he|she|it|we|they) will\b/g, "$1'll").replace(/\b(I|you|he|she|it|we|they) would\b/g, "$1'd")
                     .replace(/\bwill not\b/g, "won't").replace(/\bwould not\b/g, "wouldn't");
  const kurzIf = x => x.replace(/\bdo not\b/g, "don't").replace(/\bdoes not\b/g, "doesn't").replace(/\bdid not\b/g, "didn't");
  const gross = x => x.charAt(0).toUpperCase() + x.slice(1), klein = x => x.charAt(0).toLowerCase() + x.slice(1);
  const H = [...new Set([haupt, kurz(haupt), kurz(haupt).replace(/'ll not\b/g, " won't")])];
  const I = [...new Set([].concat(ifTeile).flatMap(i => [i, kurzIf(i)]))];
  const out = [];
  I.forEach(i => H.forEach(h => [i + ", " + h + ".", i + " " + h + ".", gross(h) + " " + klein(i) + "."].forEach(z => { if(!out.includes(z)) out.push(z); })));
  return out;
};

Object.assign(K10.baukasten, {
  // ---------- Klasse 10, Unit 2: Bedingungssätze Typ I und II (G3) ----------
  //   beide Typen gemischt, beide Satzstellungen, If I were / was beide richtig, mit could / should, ohne unless und might
  "10-G3": {
    saetze: [
      { e: "typ1",     t: "If it rains tomorrow, we ___ the Taj Mahal another day.", h: "visit", r: ["will visit", "'ll visit"], f: ["would visit", "visit"], fehler: { ersatz: "would visit", wort: "would", loesung: ["will"] } },
      { e: "typ1",     t: "If you ___ the train at eight, you will be in Delhi by lunchtime.", h: "take", r: ["take"], f: ["will take", "took"], fehler: "took" },
      { e: "typ1",     t: "If the volunteers ___ early, they will finish the job today.", h: "start", r: ["start"], f: ["will start", "started"], fehler: "started" },
      { e: "typ1",     t: "If you don't hurry, you ___ the bus.", h: "miss", r: ["will miss", "'ll miss"], f: ["would miss", "miss"], fehler: { ersatz: "would miss", wort: "would", loesung: ["will"] } },
      { e: "typ1",     t: "We ___ late if the traffic is bad.", h: "be", r: ["will be", "'ll be"], f: ["would be", "are"], fehler: { ersatz: "would be", wort: "would", loesung: ["will"] } },
      { e: "typ1",     t: "If Priya ___ the job, she will move to Mumbai.", h: "get", r: ["gets"], f: ["will get", "got"], fehler: { ersatz: "get", wort: "get", loesung: ["gets"] } },
      { e: "typ1",     t: "If you don't book a room, you ___ a place to sleep.", h: "not / find", r: ["won't find", "will not find"], f: ["wouldn't find", "don't find"], fehler: { ersatz: "wouldn't find", wort: "wouldn't", loesung: ["won't", "will not"] } },
      { e: "typ1",     t: "You'll feel better if you ___ some sleep.", h: "get", r: ["get"], f: ["will get", "got"], fehler: "got" },
      { e: "typ1",     t: "If the shop is open, I ___ you some pepper.", h: "get", r: ["will get", "'ll get"], f: ["would get", "got"], fehler: { ersatz: "would get", wort: "would", loesung: ["will"] } },
      { e: "typ2",     t: "If I ___ more money, I would travel around India.", h: "have", r: ["had"], f: ["have", "would have"], fehler: "have" },
      { e: "typ2",     t: "If we lived in Delhi, we ___ the Red Fort every week.", h: "visit", r: ["would visit", "'d visit"], f: ["will visit", "visited"], fehler: { ersatz: "will visit", wort: "will", loesung: ["would"] } },
      { e: "typ2",     t: "If my parents ___ so far away, I would see them more often.", h: "not / live", r: ["didn't live", "did not live"], f: ["don't live", "wouldn't live"], fehler: { ersatz: "don't live", wort: "don't", loesung: ["didn't", "did not"] } },
      { e: "typ2",     t: "Rahul ___ in a call centre if the wages were better.", h: "work", r: ["would work", "'d work"], f: ["will work", "worked"], fehler: { ersatz: "will work", wort: "will", loesung: ["would"] } },
      { e: "typ2",     t: "If you ___ harder, you would get a promotion.", h: "work", r: ["worked"], f: ["work", "would work"], fehler: "work" },
      { e: "typ2",     t: "If the company ___ more workers, the warehouse wouldn't be so busy.", h: "hire", r: ["hired"], f: ["hires", "would hire"], fehler: "hires" },
      { e: "typ2",     t: "I ___ that job if I were you.", h: "not / take", r: ["wouldn't take", "would not take"], f: ["won't take", "didn't take"], fehler: { ersatz: "won't take", wort: "won't", loesung: ["wouldn't", "would not"] } },
      { e: "typ2",     t: "We would move to India if we ___ jobs there.", h: "find", r: ["found"], f: ["find", "would find"], fehler: "find" },
      { e: "typ2",     t: "Unemployment would fall if more companies ___ factories here.", h: "build", r: ["built"], f: ["build", "would build"], fehler: "build" },
      { e: "were",     t: "If I ___ you, I would apply for the internship.", h: "be", r: ["were", "was"], f: ["am", "would be"], fehler: "am" },
      { e: "were",     t: "If Sam ___ here, he would help us.", h: "be", r: ["were", "was"], f: ["is", "would be"], fehler: "is" },
      { e: "were",     t: "If it ___ warmer, we could swim in the lake.", h: "be", r: ["were", "was"], f: ["is", "would be"], fehler: "is" },
      { e: "were",     t: "The workers would be happier if their working conditions ___ better.", h: "be", r: ["were"], f: ["are", "would be"], fehler: "are" },
      { e: "modal",    t: "If you feel ill, you ___ see a doctor.", h: "should / would", r: ["should"], f: ["would", "shoulds"], fehler: "would" },
      { e: "modal",    t: "If you want to work as a volunteer, you ___ get a vaccination first.", h: "should / would", r: ["should"], f: ["would", "should to"], fehler: "would" },
      { e: "modal",    t: "If you go to India in summer, you ___ take light clothes.", h: "should / would", r: ["should"], f: ["would", "shoulds"], fehler: "would" },
      { e: "modal",    t: "If I spoke Hindi, I ___ talk to the people in the village.", h: "can", r: ["could"], f: ["can", "will"], fehler: { ersatz: "can", wort: "can", loesung: ["could"] } },
      { e: "modal",    t: "If we had more time, we ___ visit Gandhi's house too.", h: "can", r: ["could"], f: ["can", "will"], fehler: { ersatz: "can", wort: "can", loesung: ["could"] } },
      { e: "kontrast", t: "If I win the competition, I ___ a party.", h: "have", r: ["will have", "'ll have"], f: ["would have", "had"], fehler: { ersatz: "would have", wort: "would", loesung: ["will"] } },
      { e: "kontrast", t: "If I found a lot of money, I ___ it to an orphanage.", h: "give", r: ["would give", "'d give"], f: ["will give", "gave"], fehler: { ersatz: "will give", wort: "will", loesung: ["would"] } }
    ],
    umformen: [
      { e: "typ1",  a: "Write an if-sentence type I:", von: "(it / rain) – (we / stay at home)", nach: K10_WENN("If it rains", "we will stay at home") },
      { e: "typ1",  a: "Write an if-sentence type I:", von: "(you / not hurry) – (you / miss the train)", nach: K10_WENN("If you do not hurry", "you will miss the train") },
      { e: "typ1",  a: "Write an if-sentence type I:", von: "(Priya / get the job) – (she / move to Mumbai)", nach: K10_WENN("If Priya gets the job", "she will move to Mumbai") },
      { e: "typ1",  a: "Write an if-sentence type I:", von: "(we / have time) – (we / visit the Taj Mahal)", nach: K10_WENN("If we have time", "we will visit the Taj Mahal") },
      { e: "typ1",  a: "Write an if-sentence type I:", von: "(the shop / be open) – (I / buy some tea)", nach: K10_WENN("If the shop is open", "I will buy some tea") },
      { e: "modal", a: "Write an if-sentence type I with “should”:", von: "(you / feel ill) – (you / should see a doctor)", nach: K10_WENN("If you feel ill", "you should see a doctor") },
      { e: "typ2",  a: "Write an if-sentence type II:", von: "(I / have more money) – (I / travel around India)", nach: K10_WENN("If I had more money", "I would travel around India") },
      { e: "typ2",  a: "Write an if-sentence type II:", von: "(we / live in Delhi) – (we / visit the Red Fort more often)", nach: K10_WENN("If we lived in Delhi", "we would visit the Red Fort more often") },
      { e: "modal", a: "Write an if-sentence type II:", von: "(Rahul / speak Hindi) – (he / can talk to the people)", nach: K10_WENN("If Rahul spoke Hindi", "he could talk to the people") },
      { e: "were",  a: "Write an if-sentence type II:", von: "(I / be you) – (I / apply for the internship)", nach: K10_WENN(["If I were you", "If I was you"], "I would apply for the internship") },
      { e: "were",  a: "Write an if-sentence type II:", von: "(the wages / be better) – (more people / work here)", nach: K10_WENN("If the wages were better", "more people would work here") },
      { e: "typ2",  a: "Write an if-sentence type II:", von: "(my parents / not work so much) – (I / see them more often)", nach: K10_WENN("If my parents did not work so much", "I would see them more often") },
      { e: "were",  a: "Write an if-sentence type II:", von: "(it / be warmer) – (we / can swim in the lake)", nach: K10_WENN(["If it were warmer", "If it was warmer"], "we could swim in the lake") },
      { e: "kontrast", a: "Make the sentence unreal (type II):", von: "If I have time, I will help you.", nach: K10_WENN("If I had time", "I would help you") },
      { e: "kontrast", a: "Make the sentence unreal (type II):", von: "If we find the hotel, we will stay there.", nach: K10_WENN("If we found the hotel", "we would stay there") },
      { e: "kontrast", a: "Make the sentence unreal (type II):", von: "If it is sunny, we will go to the beach.", nach: K10_WENN(["If it were sunny", "If it was sunny"], "we would go to the beach") },
      { e: "kontrast", a: "Make the sentence unreal (type II):", von: "If you ask him, he will tell you.", nach: K10_WENN("If you asked him", "he would tell you") },
      { e: "kontrast", a: "Make the sentence unreal (type II):", von: "If I don't get the job, I will look for another one.", nach: K10_WENN("If I did not get the job", "I would look for another one") },
      { e: "kontrast", a: "Make the sentence unreal (type II):", von: "If Sam comes, we can start.", nach: K10_WENN("If Sam came", "we could start") },
      { e: "kontrast", a: "Make the sentence real (type I):", von: "If I won the race, I would be happy.", nach: K10_WENN("If I win the race", "I will be happy") },
      { e: "kontrast", a: "Make the sentence real (type I):", von: "If we had a car, we would drive to the palace.", nach: K10_WENN("If we have a car", "we will drive to the palace") },
      { e: "kontrast", a: "Make the sentence real (type I):", von: "If they didn't help us, we would need more time.", nach: K10_WENN("If they do not help us", "we will need more time") },
      { e: "kontrast", a: "Make the sentence real (type I):", von: "If she studied, she would pass the test.", nach: K10_WENN("If she studies", "she will pass the test") },
      { e: "typ2",  a: "Start with the main clause (Hauptsatz):", von: "If the wages were better, I would work here.", nach: ["I would work here if the wages were better.", "I'd work here if the wages were better."] },
      { e: "typ1",  a: "Start with the main clause (Hauptsatz):", von: "If you take the eight o'clock train, you will be in Delhi by lunchtime.", nach: ["You will be in Delhi by lunchtime if you take the eight o'clock train.", "You'll be in Delhi by lunchtime if you take the eight o'clock train."] },
      { e: "were",  a: "Start with the main clause (Hauptsatz):", von: "If I were rich, I would build a school.", nach: ["I would build a school if I were rich.", "I'd build a school if I were rich.", "I would build a school if I was rich.", "I'd build a school if I was rich."] }
    ],
    zuordnen: {
      kategorien: ["type I (possible)", "type II (unreal)"],
      woerter: [
        { text: "If it rains, we'll stay in.", ziel: "type I (possible)" }, { text: "If you hurry, you'll catch it.", ziel: "type I (possible)" },
        { text: "If I see him, I'll tell him.", ziel: "type I (possible)" }, { text: "If you feel ill, you should rest.", ziel: "type I (possible)" },
        { text: "I'll call you if I'm late.", ziel: "type I (possible)" },
        { text: "If I were you, I'd go.", ziel: "type II (unreal)" }, { text: "If I had wings, I'd fly.", ziel: "type II (unreal)" },
        { text: "If we lived here, we'd be happy.", ziel: "type II (unreal)" }, { text: "She'd help if she had time.", ziel: "type II (unreal)" },
        { text: "If I won, I could buy a car.", ziel: "type II (unreal)" }
      ]
    },
    erklaerungen: {
      satzpool: {
        typ1:     "Type I (Bedingungssatz Typ I): if + simple present, will + verb. It is possible or likely (wahrscheinlich). No will in the if-clause! Example: {BEISPIEL}",
        typ2:     "Type II (Bedingungssatz Typ II): if + simple past, would + verb. It is unreal or unlikely (unwahrscheinlich). No would in the if-clause! Example: {BEISPIEL}",
        were:     "In type II we can say If I were … or If I was … (were sounds more formal). With we / you / they it is always were. Example: {BEISPIEL}",
        modal:    "In type I you can use should for advice (Ratschlag). In type II can becomes could. Example: {BEISPIEL}",
        kontrast: "Look at the other part of the sentence: simple present ↔ will (type I), simple past ↔ would (type II). Example: {BEISPIEL}",
        zuordnen: "Type I: if + simple present, will / should – possible. Type II: if + simple past, would / could – unreal or unlikely."
      }
    }
  },

  // ---------- Klasse 10, Unit 2: Das Passiv (G4) ----------
  //   simple present und simple past, mit by, Fragen und Verneinung (Vorgaben der Lehrkraft)
  "10-G4": {
    saetze: [
      { e: "praes",   t: "Tea ___ in many parts of India.", h: "grow", r: ["is grown"], f: ["is growed", "are grown"], fehler: { ersatz: "is growed", wort: "growed", loesung: ["grown"] } },
      { e: "praes",   t: "In the warehouse, the products ___ into boxes.", h: "pack", r: ["are packed"], f: ["is packed", "are pack"], fehler: { ersatz: "is packed", wort: "is", loesung: ["are"] } },
      { e: "praes",   t: "Hindi and English ___ in India.", h: "speak", r: ["are spoken"], f: ["is spoken", "are speaked"], fehler: { ersatz: "are speaked", wort: "speaked", loesung: ["spoken"] } },
      { e: "praes",   t: "The parcels ___ to the customers by truck.", h: "deliver", r: ["are delivered"], f: ["are deliver", "is delivered"], fehler: { ersatz: "are deliver", wort: "deliver", loesung: ["delivered"] } },
      { e: "praes",   t: "Every year the Taj Mahal ___ by millions of tourists.", h: "visit", r: ["is visited"], f: ["was visited", "is visit"], fehler: { ersatz: "was visited", wort: "was", loesung: ["is"] } },
      { e: "praes",   t: "The new workers ___ by the manager on their first day.", h: "train", r: ["are trained"], f: ["is trained", "are train"], fehler: { ersatz: "are train", wort: "train", loesung: ["trained"] } },
      { e: "praes",   t: "In this factory, the cars ___ by robots.", h: "assemble", r: ["are assembled"], f: ["is assembled", "are assemble"], fehler: { ersatz: "is assembled", wort: "is", loesung: ["are"] } },
      { e: "past",    t: "The Taj Mahal ___ in the 17th century.", h: "build", r: ["was built"], f: ["is built", "was builded"], fehler: { ersatz: "was builded", wort: "builded", loesung: ["built"] } },
      { e: "past",    t: "Gandhi ___ to prison many times.", h: "send", r: ["was sent"], f: ["was send", "were sent"], fehler: { ersatz: "was send", wort: "send", loesung: ["sent"] } },
      { e: "past",    t: "For a long time, India ___ by the British.", h: "rule", r: ["was ruled"], f: ["is ruled", "was rule"], fehler: { ersatz: "was rule", wort: "rule", loesung: ["ruled"] } },
      { e: "past",    t: "Many people ___ during the march.", h: "injure", r: ["were injured"], f: ["was injured", "were injure"], fehler: { ersatz: "were injure", wort: "injure", loesung: ["injured"] } },
      { e: "past",    t: "Last month two workers ___ without a reason.", h: "dismiss", r: ["were dismissed"], f: ["was dismissed", "were dismiss"], fehler: { ersatz: "was dismissed", wort: "was", loesung: ["were"] } },
      { e: "past",    t: "The palace ___ for a king.", h: "design", r: ["was designed"], f: ["is designed", "was design"], fehler: { ersatz: "was design", wort: "design", loesung: ["designed"] } },
      { e: "by",      t: "The speech ___ by thousands of people.", h: "hear", r: ["was heard"], f: ["was heared", "were heard"], fehler: { ersatz: "was heared", wort: "heared", loesung: ["heard"] } },
      { e: "by",      t: "Yesterday the volunteers ___ by the children in the village.", h: "greet", r: ["were greeted"], f: ["was greeted", "were greet"], fehler: { ersatz: "were greet", wort: "greet", loesung: ["greeted"] } },
      { e: "neg",     t: "The workers ___ enough money.", h: "not / pay – present", r: ["aren't paid", "are not paid"], f: ["don't paid", "isn't paid"], fehler: { ersatz: "don't paid", wort: "don't", loesung: ["aren't", "are not"] } },
      { e: "neg",     t: "Plastic bags ___ in this shop.", h: "not / sell – present", r: ["aren't sold", "are not sold"], f: ["aren't sell", "don't sold"], fehler: { ersatz: "aren't sell", wort: "sell", loesung: ["sold"] } },
      { e: "neg",     t: "The letter ___ because the address was wrong.", h: "not / deliver", r: ["wasn't delivered", "was not delivered"], f: ["didn't delivered", "weren't delivered"], fehler: { ersatz: "didn't delivered", wort: "didn't", loesung: ["wasn't", "was not"] } },
      { e: "neg",     t: "The contracts ___ yesterday.", h: "not / sign", r: ["weren't signed", "were not signed"], f: ["wasn't signed", "weren't sign"], fehler: { ersatz: "weren't sign", wort: "sign", loesung: ["signed"] } },
      { e: "neg",     t: "This room ___ every day.", h: "not / clean", r: ["isn't cleaned", "is not cleaned"], f: ["doesn't cleaned", "aren't cleaned"], fehler: { ersatz: "doesn't cleaned", wort: "doesn't", loesung: ["isn't", "is not"] } },
      { e: "frage",   t: "___ the products stored in the warehouse?", h: "be – present", r: ["Are"], f: ["Do", "Is"], fehler: "Do" },
      { e: "frage",   t: "When ___ the Taj Mahal built?", h: "be – past", r: ["was"], f: ["did", "is"], fehler: "did" },
      { e: "frage",   t: "___ the new employees trained last week?", h: "be – past", r: ["Were"], f: ["Did", "Was"], fehler: "Did" },
      { e: "frage",   t: "Where ___ tea grown in India?", h: "be – present", r: ["is"], f: ["does", "are"], fehler: "does" },
      { e: "frage",   t: "Why ___ the workers dismissed last month?", h: "be – past", r: ["were"], f: ["did", "was"], fehler: "did" },
      { e: "aktpass", t: "Shah Jahan ___ the Taj Mahal for his wife.", h: "build", r: ["built"], f: ["was built", "builded"], fehler: "builded" },
      { e: "aktpass", t: "The Taj Mahal ___ by about 20,000 workers.", h: "build", r: ["was built"], f: ["built", "was builded"], fehler: { ersatz: "built", wort: "built", loesung: ["was built"] } },
      { e: "aktpass", t: "The manager ___ the new workers every Monday.", h: "train", r: ["trains"], f: ["is trained", "train"], fehler: "train" },
      { e: "aktpass", t: "Gandhi ___ the British laws without violence.", h: "resist", r: ["resisted"], f: ["was resisted", "resist"], fehler: "resist" },
      { e: "aktpass", t: "Our truck drivers ___ the goods to the shops.", h: "deliver", r: ["deliver"], f: ["are delivered", "delivers"], fehler: "delivers" }
    ],
    umformen: [
      { e: "by",    a: "Use the passive with “by”:", von: "Robots assemble the cars.", nach: ["The cars are assembled by robots."] },
      { e: "by",    a: "Use the passive with “by”:", von: "The manager trains the new workers.", nach: ["The new workers are trained by the manager."] },
      { e: "by",    a: "Use the passive with “by”:", von: "Millions of tourists visit the Taj Mahal every year.", nach: ["The Taj Mahal is visited by millions of tourists every year.", "Every year the Taj Mahal is visited by millions of tourists.", "Every year, the Taj Mahal is visited by millions of tourists."] },
      { e: "by",    a: "Use the passive with “by”:", von: "Our drivers deliver the parcels.", nach: ["The parcels are delivered by our drivers."] },
      { e: "by",    a: "Use the passive with “by”:", von: "Shah Jahan built the Taj Mahal.", nach: ["The Taj Mahal was built by Shah Jahan."] },
      { e: "by",    a: "Use the passive with “by”:", von: "The British ruled India.", nach: ["India was ruled by the British."] },
      { e: "by",    a: "Use the passive with “by”:", von: "Thousands of people heard the speech.", nach: ["The speech was heard by thousands of people."] },
      { e: "by",    a: "Use the passive with “by”:", von: "The police injured many people.", nach: ["Many people were injured by the police."] },
      { e: "by",    a: "Use the passive with “by”:", von: "The manager dismissed two workers.", nach: ["Two workers were dismissed by the manager."] },
      { e: "praes", a: "Use the passive without “by”:", von: "People speak English in India.", nach: ["English is spoken in India."] },
      { e: "praes", a: "Use the passive without “by”:", von: "They pack the products in the warehouse.", nach: ["The products are packed in the warehouse."] },
      { e: "past",  a: "Use the passive without “by”:", von: "Someone stole my bag.", nach: ["My bag was stolen."] },
      { e: "past",  a: "Use the passive without “by”:", von: "They built the palace in 1650.", nach: ["The palace was built in 1650.", "In 1650 the palace was built.", "In 1650, the palace was built."] },
      { e: "praes", a: "Use the passive without “by”:", von: "People grow tea here.", nach: ["Tea is grown here."] },
      { e: "neg",   a: "Make the passive sentence negative:", von: "The workers are paid well.", nach: ["The workers aren't paid well.", "The workers are not paid well."] },
      { e: "neg",   a: "Make the passive sentence negative:", von: "The letter was delivered.", nach: ["The letter wasn't delivered.", "The letter was not delivered."] },
      { e: "neg",   a: "Make the passive sentence negative:", von: "The contracts were signed.", nach: ["The contracts weren't signed.", "The contracts were not signed."] },
      { e: "neg",   a: "Make the passive sentence negative:", von: "The room is cleaned every day.", nach: ["The room isn't cleaned every day.", "The room is not cleaned every day."] },
      { e: "frage", a: "Ask a question:", von: "The products are stored here.", nach: ["Are the products stored here?"] },
      { e: "frage", a: "Ask a question:", von: "The palace was built for a king.", nach: ["Was the palace built for a king?"] },
      { e: "frage", a: "Ask a question with “when” (When …):", von: "The Taj Mahal was built in the 17th century.", nach: ["When was the Taj Mahal built?"] },
      { e: "frage", a: "Ask a question with “where” (Where …):", von: "Tea is grown in Assam.", nach: ["Where is tea grown?"] },
      { e: "frage", a: "Ask a question with “why” (Why …):", von: "The workers were dismissed for a reason.", nach: ["Why were the workers dismissed?"] },
      { e: "aktpass", a: "Use the active (Aktiv):", von: "The cars are assembled by robots.", nach: ["Robots assemble the cars."] },
      { e: "aktpass", a: "Use the active (Aktiv):", von: "The speech was written by Gandhi.", nach: ["Gandhi wrote the speech."] },
      { e: "aktpass", a: "Use the active (Aktiv):", von: "The volunteers were greeted by the children.", nach: ["The children greeted the volunteers."] }
    ],
    zuordnen: {
      kategorien: ["active (Aktiv)", "passive (Passiv)"],
      woerter: [
        { text: "Robots assemble cars.", ziel: "active (Aktiv)" }, { text: "Gandhi wrote it.", ziel: "active (Aktiv)" }, { text: "They pack the boxes.", ziel: "active (Aktiv)" },
        { text: "The manager trains us.", ziel: "active (Aktiv)" }, { text: "The British ruled India.", ziel: "active (Aktiv)" }, { text: "Shah Jahan built it.", ziel: "active (Aktiv)" },
        { text: "Cars are assembled here.", ziel: "passive (Passiv)" }, { text: "It was written by Gandhi.", ziel: "passive (Passiv)" }, { text: "The boxes are packed.", ziel: "passive (Passiv)" },
        { text: "We are trained.", ziel: "passive (Passiv)" }, { text: "India was ruled by the British.", ziel: "passive (Passiv)" }, { text: "It was built in 1653.", ziel: "passive (Passiv)" }
      ]
    },
    erklaerungen: {
      satzpool: {
        praes:   "Passive in the simple present (Passiv): am / is / are + 3rd form. We use it when the action is more important than the person who does it. Example: {BEISPIEL}",
        past:    "Passive in the simple past: was / were + 3rd form. Example: {BEISPIEL}",
        by:      "Who did it? → by + person or thing (von): … by the manager. Example: {BEISPIEL}",
        neg:     "Negative (Verneinung): isn't / aren't / wasn't / weren't + 3rd form – no do / does / did. Example: {BEISPIEL}",
        frage:   "Questions: Is / Are / Was / Were + subject + 3rd form …? Example: {BEISPIEL}",
        aktpass: "Active (Aktiv): the subject does the action. Passive (Passiv): something is done – is / are / was / were + 3rd form. Example: {BEISPIEL}",
        zuordnen: "Passive (Passiv) = form of be + 3rd form (is packed, was written). Active (Aktiv) = the subject does it (they pack, Gandhi wrote)."
      }
    }
  }
});

Object.assign(K10.generatoren, {
  "10-G3": { baukasten: "10-G3", art: "satzpool" },
  "10-G4": { baukasten: "10-G4", art: "satzpool" }
});

K10.woerterhilfe.push(...[
  { en: "Taj Mahal", de: "Taj Mahal (Grabmal in Indien)" }, { en: "Delhi", de: "Delhi (Hauptstadtregion Indiens)" }, { en: "Mumbai", de: "Mumbai (Stadt in Indien)" },
  { en: "Red Fort", de: "Rotes Fort (in Delhi)" }, { en: "Hindi", de: "Hindi (Sprache)" }, { en: "Assam", de: "Assam (Region in Indien)" },
  { en: "Shah Jahan", de: "Shah Jahan (indischer Herrscher)" }, { en: "Gandhi", de: "Mahatma Gandhi" }, { en: "robots", de: "Roboter" }, { en: "parcels", de: "Pakete" },
  { en: "wings", de: "Flügel" }, { en: "traffic", de: "Verkehr" }, { en: "lunchtime", de: "Mittagszeit" }, { en: "hire", de: "einstellen" }, { en: "hired", de: "stellte ein" },
  { en: "unemployment", de: "Arbeitslosigkeit" }, { en: "factories", de: "Fabriken" }, { en: "light clothes", de: "leichte Kleidung" }, { en: "competition", de: "Wettbewerb" },
  { en: "grown", de: "angebaut" }, { en: "violence", de: "Gewalt" }, { en: "goods", de: "Waren" }, { en: "wife", de: "Ehefrau" }, { en: "stored", de: "gelagert" }, { en: "British", de: "Briten; britisch" }, { en: "laws", de: "Gesetze" }
]);

// =====================================================================
// Klasse 10, Unit 3 (G5–G7)
// =====================================================================
// Hilfen für die indirekte Rede: K10_REDE – mit und ohne „that“, mit Kurzformen;
// K10_FRAGE – „X asked if …“ gilt auch als „X asked me / us if …“.
const K10_REDE = (...saetze) => {
  const out = [];
  const kurz = x => x.replace(/\b(he|she|it) is\b/g, "$1's").replace(/\bI am\b/g, "I'm").replace(/\b(we|you|they) are\b/g, "$1're")
                     .replace(/\b(he|she|it|I|we|you|they) would\b/g, "$1'd").replace(/\bwould not\b/g, "wouldn't").replace(/\bdid not\b/g, "didn't")
                     .replace(/\bwas not\b/g, "wasn't").replace(/\bcould not\b/g, "couldn't");
  saetze.forEach(x => [x, x.replace(" that ", " ")].forEach(y => [y, kurz(y)].forEach(z => { if(!out.includes(z)) out.push(z); })));
  return out;
};
const K10_FRAGE = (...saetze) => {
  const out = [];
  saetze.forEach(x => {
    if(!out.includes(x)) out.push(x);
    const m = x.match(/^(.+? asked) (if|whether|where|why|what|how|who|when) (.*)$/);
    if(m){ const p = /\b(we|us|our)\b/.test(m[3]) ? "us" : "me", y = m[1] + " " + p + " " + m[2] + " " + m[3]; if(!out.includes(y)) out.push(y); }
  });
  return out;
};
// if-Sätze Typ III: wie K10_WENN, zusätzlich „would've“ und „hadn't“
const K10_WENN3 = (ifTeile, haupt) => {
  const v = K10_WENN([].concat(ifTeile).flatMap(i => [i, i.replace(/\bhad not\b/g, "hadn't")]), haupt);
  v.slice().forEach(z => { const w = z.replace(/\bwould have\b/g, "would've").replace(/\bWould have\b/g, "Would've"); if(!v.includes(w)) v.push(w); });
  return v;
};

Object.assign(K10.baukasten, {
  // ---------- Klasse 10, Unit 3: indirekte Rede – Orts- und Zeitangaben, Aufforderungen und Bitten (G5) ----------
  //   mit will → would, Fragen und allen Zeitverschiebungen aus Klasse 8/9 (Vorgaben der Lehrkraft)
  "10-G5": {
    saetze: [
      { e: "zeit",   q: "Mia: “I'll call you tomorrow.”",                       t: "Mia said that she would call me ___.", r: ["the next day", "the following day"], f: ["tomorrow", "the day before"], fehler: { ersatz: "tomorrow", wort: "tomorrow", loesung: ["the next day", "the following day"] } },
      { e: "zeit",   q: "Tom: “I saw a geyser yesterday.”",                     t: "Tom said that he had seen a geyser ___.", r: ["the day before", "the previous day"], f: ["yesterday", "the next day"], fehler: { ersatz: "yesterday", wort: "yesterday", loesung: ["the day before", "the previous day"] } },
      { e: "zeit",   q: "Lena: “I'm busy now.”",                                t: "Lena said that she was busy ___.", r: ["then", "at that time", "at that moment"], f: ["now", "there"], fehler: "now" },
      { e: "zeit",   q: "The guide: “The earthquake happened ten years ago.”",  t: "The guide said that the earthquake had happened ten years ___.", r: ["before", "earlier"], f: ["ago", "later"], fehler: "ago" },
      { e: "zeit",   q: "Ben: “I'm going to Wellington next week.”",            t: "Ben said that he was going to Wellington ___.", r: ["the following week", "the next week", "the week after"], f: ["next week", "the week before"], fehler: { ersatz: "next week", wort: "next", loesung: ["the following", "the next"] } },
      { e: "zeit",   q: "Zoe: “I met my boyfriend last week.”",                 t: "Zoe said that she had met her boyfriend ___.", r: ["the week before", "the previous week"], f: ["last week", "the next week"], fehler: { ersatz: "last week", wort: "last", loesung: ["the previous"] } },
      { e: "zeit",   q: "Dad: “The rescue team is coming today.”",              t: "Dad said that the rescue team was coming ___.", r: ["that day"], f: ["today", "this day"], fehler: "today" },
      { e: "ort",    q: "The firefighter: “It's not safe here.”",               t: "The firefighter said that it wasn't safe ___.", r: ["there"], f: ["here", "where"], fehler: "here" },
      { e: "ort",    q: "Ava: “I love this town.”",                             t: "Ava said that she loved ___ town.", r: ["that", "the"], f: ["this", "these"], fehler: "this" },
      { e: "ort",    q: "Liam: “These shoes are new.”",                         t: "Liam said that ___ shoes were new.", r: ["those", "the"], f: ["these", "this"], fehler: "these" },
      { e: "ort",    q: "The owner: “Nobody lives in this house any more.”",    t: "The owner said that nobody lived in ___ house any more.", r: ["that", "the"], f: ["this", "these"], fehler: "this" },
      { e: "would",  q: "Mia: “I will help with the clean-up.”",                t: "Mia said that she ___ help with the clean-up.", r: ["would"], f: ["will", "wills"], fehler: "will" },
      { e: "would",  q: "The pilot: “We will land in Christchurch.”",           t: "The pilot said that they ___ in Christchurch.", r: ["would land"], f: ["will land", "would landed"], fehler: { ersatz: "will land", wort: "will", loesung: ["would"] } },
      { e: "would",  q: "Tom: “I won't tell anyone.”",                          t: "Tom promised that he ___ tell anyone.", r: ["wouldn't", "would not"], f: ["won't", "didn't"], fehler: { ersatz: "won't", wort: "won't", loesung: ["wouldn't", "would not"] } },
      { e: "would",  q: "Lena: “It will rain tomorrow.”",                       t: "Lena said that it ___ rain the next day.", r: ["would"], f: ["will", "is"], fehler: "will" },
      { e: "mix",    q: "Ben: “I can't find my phone.”",                        t: "Ben said that he ___ find his phone.", r: ["couldn't", "could not"], f: ["can't", "didn't"], fehler: { ersatz: "can't", wort: "can't", loesung: ["couldn't", "could not"] } },
      { e: "mix",    q: "Ava: “I have broken up with Jake.”",                   t: "Ava said that she ___ up with Jake.", r: ["had broken"], f: ["has broken", "had broke"], fehler: { ersatz: "had broke", wort: "broke", loesung: ["broken"] } },
      { e: "mix",    q: "Liam: “I lost my mask in the sea.”",                   t: "Liam said that he ___ his mask in the sea.", r: ["had lost"], f: ["has lost", "had losed"], fehler: { ersatz: "has lost", wort: "has", loesung: ["had"] } },
      { e: "mix",    q: "Zoe: “I'm studying for my exams.”",                    t: "Zoe said that she ___ for her exams.", r: ["was studying"], f: ["is studying", "were studying"], fehler: { ersatz: "is studying", wort: "is", loesung: ["was"] } },
      { e: "frage",  q: "Mia: “Will you come to the party?”",                   t: "Mia asked if I ___ come to the party.", r: ["would"], f: ["will", "did"], fehler: "will" },
      { e: "frage",  q: "The teacher: “Where were you yesterday?”",             t: "The teacher asked where I had been ___.", r: ["the day before", "the previous day"], f: ["yesterday", "the next day"], fehler: { ersatz: "yesterday", wort: "yesterday", loesung: ["the day before", "the previous day"] } },
      { e: "frage",  q: "Tom: “Do you have a crush on Ben?”",                   t: "Tom asked ___ I had a crush on Ben.", r: ["if", "whether"], f: ["that", "do"], fehler: "that" },
      { e: "frage",  q: "Dad: “What are you doing here?”",                      t: "Dad asked what I was doing ___.", r: ["there"], f: ["here", "now"], fehler: "here" },
      { e: "frage",  q: "Lena: “Why did you break up?”",                        t: "Lena asked why we ___ up.", r: ["had broken"], f: ["have broken", "did break"], fehler: { ersatz: "have broken", wort: "have", loesung: ["had"] } },
      { e: "befehl", q: "The firefighter: “Leave the building!”",               t: "The firefighter told us ___ the building.", r: ["to leave"], f: ["leave", "leaving"], fehler: { ersatz: "leaving", wort: "leaving", loesung: ["to leave"] } },
      { e: "befehl", q: "Mum: “Don't be late tonight!”",                        t: "Mum told me ___ late that night.", r: ["not to be"], f: ["don't be", "not be"], fehler: { ersatz: "don't be", wort: "don't", loesung: ["not to"] } },
      { e: "befehl", q: "The rescuer: “Please stay calm.”",                     t: "The rescuer asked us ___ calm.", r: ["to stay"], f: ["stay", "staying"], fehler: { ersatz: "staying", wort: "staying", loesung: ["to stay"] } },
      { e: "befehl", q: "Ava: “Please don't tell my parents.”",                 t: "Ava asked me ___ her parents.", r: ["not to tell"], f: ["don't tell", "not tell"], fehler: { ersatz: "don't tell", wort: "don't", loesung: ["not to"] } },
      { e: "befehl", q: "The coach: “Come here tomorrow at eight!”",            t: "The coach told us to come ___ the next day at eight.", r: ["there"], f: ["here", "where"], fehler: "here" },
      { e: "befehl", q: "The agony aunt: “Talk to your parents.”",              t: "The agony aunt advised me ___ to my parents.", r: ["to talk"], f: ["talk", "talking"], fehler: { ersatz: "talking", wort: "talking", loesung: ["to talk"] } }
    ],
    umformen: [
      { e: "zeit",  a: "Report with “said” (change the time and place words):", von: "Mia: “I'll call you tomorrow.”", nach: K10_REDE("Mia said that she would call me the next day.", "Mia said that she would call me the following day.") },
      { e: "zeit",  a: "Report with “said” (change the time and place words):", von: "Tom: “I saw a geyser yesterday.”", nach: K10_REDE("Tom said that he had seen a geyser the day before.", "Tom said that he had seen a geyser the previous day.") },
      { e: "zeit",  a: "Report with “said” (change the time and place words):", von: "Ben: “I'm going to Wellington next week.”", nach: K10_REDE("Ben said that he was going to Wellington the following week.", "Ben said that he was going to Wellington the next week.", "Ben said that he was going to Wellington the week after.") },
      { e: "zeit",  a: "Report with “said” (change the time and place words):", von: "Lena: “I'm tired now.”", nach: K10_REDE("Lena said that she was tired then.", "Lena said that she was tired at that time.", "Lena said that she was tired at that moment.") },
      { e: "ort",   a: "Report with “said” (change the time and place words):", von: "The firefighter: “It isn't safe here.”", nach: K10_REDE("The firefighter said that it wasn't safe there.", "The firefighter said that it was not safe there.") },
      { e: "ort",   a: "Report with “said” (change the time and place words):", von: "Ava: “I love this place.”", nach: K10_REDE("Ava said that she loved that place.", "Ava said that she loved the place.") },
      { e: "zeit",  a: "Report with “said” (change the time and place words):", von: "Zoe: “I met Jake two weeks ago.”", nach: K10_REDE("Zoe said that she had met Jake two weeks before.", "Zoe said that she had met Jake two weeks earlier.") },
      { e: "would", a: "Report with “said” (change the time and place words):", von: "Dad: “We will leave today.”", nach: K10_REDE("Dad said that they would leave that day.", "Dad said that we would leave that day.") },
      { e: "zeit",  a: "Report with “said” (change the time and place words):", von: "Liam: “I have finished the project this week.”", nach: K10_REDE("Liam said that he had finished the project that week.") },
      { e: "ort",   a: "Report with “said” (change the time and place words):", von: "The guide: “We can see the glacier from here.”", nach: K10_REDE("The guide said that they could see the glacier from there.", "The guide said that we could see the glacier from there.") },
      { e: "frage", a: "Report the question (change the time and place words):", von: "Mia: “Will you be at home tomorrow?”", nach: K10_FRAGE("Mia asked if I would be at home the next day.", "Mia asked whether I would be at home the next day.", "Mia asked if I would be at home the following day.", "Mia asked whether I would be at home the following day.") },
      { e: "frage", a: "Report the question (change the time and place words):", von: "Tom: “Where did you go yesterday?”", nach: K10_FRAGE("Tom asked where I had gone the day before.", "Tom asked where I had gone the previous day.", "Tom asked where we had gone the day before.", "Tom asked where we had gone the previous day.") },
      { e: "frage", a: "Report the question (change the time and place words):", von: "Lena: “Are you happy here?”", nach: K10_FRAGE("Lena asked if I was happy there.", "Lena asked whether I was happy there.", "Lena asked if we were happy there.", "Lena asked whether we were happy there.") },
      { e: "frage", a: "Report the question (change the time and place words):", von: "Ben: “What will you do next week?”", nach: K10_FRAGE("Ben asked what I would do the following week.", "Ben asked what I would do the next week.", "Ben asked what we would do the following week.", "Ben asked what we would do the next week.") },
      { e: "frage", a: "Report the question (change the time and place words):", von: "The teacher: “Why are you late today?”", nach: K10_FRAGE("The teacher asked why I was late that day.", "The teacher asked why we were late that day.") },
      { e: "befehl", a: "Report the command (The firefighter told us …):", von: "The firefighter: “Leave the building!”", nach: ["The firefighter told us to leave the building."] },
      { e: "befehl", a: "Report the command (Mum told me …):", von: "Mum: “Don't come home late tonight!”", nach: ["Mum told me not to come home late that night."] },
      { e: "befehl", a: "Report the request (The rescuer asked us …):", von: "The rescuer: “Please stay here.”", nach: ["The rescuer asked us to stay there."] },
      { e: "befehl", a: "Report the request (Ava asked me …):", von: "Ava: “Please call me tomorrow.”", nach: ["Ava asked me to call her the next day.", "Ava asked me to call her the following day."] },
      { e: "befehl", a: "Report the command (The coach told us …):", von: "The coach: “Don't forget your boots today!”", nach: ["The coach told us not to forget our boots that day."] },
      { e: "befehl", a: "Report the advice (The agony aunt advised me …):", von: "The agony aunt: “Talk to your teacher.”", nach: ["The agony aunt advised me to talk to my teacher."] },
      { e: "mix",   a: "Report with “said”:", von: "Zoe: “I have been to New Zealand.”", nach: K10_REDE("Zoe said that she had been to New Zealand.") },
      { e: "mix",   a: "Report with “said”:", von: "Ben: “I can't swim.”", nach: K10_REDE("Ben said that he couldn't swim.", "Ben said that he could not swim.") },
      { e: "mix",   a: "Report with “said” (change the time and place words):", von: "Liam: “I lost my phone yesterday.”", nach: K10_REDE("Liam said that he had lost his phone the day before.", "Liam said that he had lost his phone the previous day.") },
      { e: "mix",   a: "Report with “said” (change the time and place words):", von: "Lena: “I'm meeting Jake this evening.”", nach: K10_REDE("Lena said that she was meeting Jake that evening.") }
    ],
    zuordnen: {
      kategorien: ["→ the next day / the following …", "→ the day before / the previous …", "→ there / then / that …"],
      woerter: [
        { text: "tomorrow", ziel: "→ the next day / the following …" }, { text: "next week", ziel: "→ the next day / the following …" },
        { text: "next month", ziel: "→ the next day / the following …" }, { text: "next year", ziel: "→ the next day / the following …" },
        { text: "yesterday", ziel: "→ the day before / the previous …" }, { text: "last week", ziel: "→ the day before / the previous …" },
        { text: "last month", ziel: "→ the day before / the previous …" }, { text: "last year", ziel: "→ the day before / the previous …" },
        { text: "here", ziel: "→ there / then / that …" }, { text: "now", ziel: "→ there / then / that …" },
        { text: "this", ziel: "→ there / then / that …" }, { text: "today", ziel: "→ there / then / that …" }
      ]
    },
    erklaerungen: {
      satzpool: {
        zeit:   "Reported speech (indirekte Rede): time words change (Zeitangaben): now → then, today → that day, tomorrow → the next day, yesterday → the day before, next week → the following week, last week → the week before, ago → before. Example: {BEISPIEL}",
        ort:    "Place words change too (Ortsangaben): here → there, this → that, these → those. Example: {BEISPIEL}",
        would:  "will → would and won't → wouldn't in reported speech. Example: {BEISPIEL}",
        mix:    "Backshift (Zeitverschiebung): simple present → simple past, present progressive → past progressive, simple past / present perfect → past perfect, can → could. Example: {BEISPIEL}",
        frage:  "Reported questions: asked if / whether or a question word + normal word order (Wortstellung) – with backshift and new time and place words. Example: {BEISPIEL}",
        befehl: "Commands, requests and advice (Aufforderungen, Bitten, Ratschläge): told / asked / advised + person + (not) to + verb. Example: {BEISPIEL}",
        zuordnen: "tomorrow / next … → the next day / the following …; yesterday / last … → the day before / the previous …; here → there, now → then, this → that, today → that day."
      }
    }
  },

  // ---------- Klasse 10, Unit 3: Vergangenheitszeiten (G6) ----------
  //   simple past, past progressive, past perfect, Gegenüberstellung mit dem present perfect (Vorgaben der Lehrkraft)
  "10-G6": {
    saetze: [
      { e: "sp",       t: "Two years ago, a strong earthquake ___ the city.", h: "hit", r: ["hit"], f: ["has hit", "had hit"], fehler: { ersatz: "hitted", wort: "hitted", loesung: ["hit"] } },
      { e: "sp",       t: "Last summer we ___ a glacier on the South Island.", h: "visit", r: ["visited"], f: ["have visited", "had visited"], fehler: { ersatz: "visitted", wort: "visitted", loesung: ["visited"] } },
      { e: "sp",       t: "Yesterday Ava ___ up with her boyfriend.", h: "break", r: ["broke"], f: ["has broken", "breaked"], fehler: "breaked" },
      { e: "sp",       t: "In 2011 the firefighters ___ many people out of the rubble.", h: "bring", r: ["brought"], f: ["have brought", "bringed"], fehler: "bringed" },
      { e: "sp",       t: "When I was a child, I ___ in a small town near a fjord.", h: "live", r: ["lived"], f: ["have lived", "had lived"], fehler: { ersatz: "live", wort: "live", loesung: ["lived"] } },
      { e: "prog",     t: "I ___ when the earthquake started.", h: "sleep", r: ["was sleeping"], f: ["have slept", "had slept"], fehler: { ersatz: "was sleep", wort: "sleep", loesung: ["sleeping"] } },
      { e: "prog",     t: "We ___ TV when the house began to shake.", h: "watch", r: ["were watching"], f: ["have watched", "had watched"], fehler: { ersatz: "was watching", wort: "was", loesung: ["were"] } },
      { e: "prog",     t: "Liam ___ on the beach when he saw the whale.", h: "sit", r: ["was sitting"], f: ["has sat", "was siting"], fehler: { ersatz: "was siting", wort: "siting", loesung: ["sitting"] } },
      { e: "prog",     t: "The children ___ in the garden when it started to rain.", h: "play", r: ["were playing"], f: ["have played", "had played"], fehler: { ersatz: "was playing", wort: "was", loesung: ["were"] } },
      { e: "prog",     t: "Mia ___ for the bus when she saw her ex-boyfriend.", h: "wait", r: ["was waiting"], f: ["has waited", "were waiting"], fehler: { ersatz: "were waiting", wort: "were", loesung: ["was"] } },
      { e: "pperf",    t: "By the time the rescuers arrived, the water ___ to the first floor.", h: "rise", r: ["had risen", "had already risen"], f: ["has risen", "had rose"], fehler: { ersatz: "had rose", wort: "rose", loesung: ["risen"] } },
      { e: "pperf",    t: "By the time we got to the cinema, the film ___.", h: "start", r: ["had started", "had already started"], f: ["has started", "was starting"], fehler: { ersatz: "has started", wort: "has", loesung: ["had"] } },
      { e: "pperf",    t: "Before that day, I ___ a geyser.", h: "never / see", r: ["had never seen"], f: ["have never seen", "had never saw"], fehler: { ersatz: "had never saw", wort: "saw", loesung: ["seen"] } },
      { e: "pperf",    t: "When we arrived at the airport, our plane ___.", h: "already / leave", r: ["had already left"], f: ["has already left", "had already leaved"], fehler: { ersatz: "has already left", wort: "has", loesung: ["had"] } },
      { e: "pperf",    t: "By the next morning, the storm ___ many houses.", h: "destroy", r: ["had destroyed"], f: ["has destroyed", "had destroy"], fehler: { ersatz: "had destroy", wort: "destroy", loesung: ["destroyed"] } },
      { e: "pperf",    t: "By the end of the trip, we ___ three glaciers.", h: "see", r: ["had seen"], f: ["have seen", "had saw"], fehler: { ersatz: "had saw", wort: "saw", loesung: ["seen"] } },
      { e: "presperf", t: "I ___ to New Zealand twice.", h: "be", r: ["have been", "'ve been"], f: ["was", "had been"], fehler: { ersatz: "has been", wort: "has", loesung: ["have"] } },
      { e: "presperf", t: "We ___ each other since we were children.", h: "know", r: ["have known", "'ve known"], f: ["knew", "had known"], fehler: { ersatz: "have knew", wort: "knew", loesung: ["known"] } },
      { e: "presperf", t: "Have you ever ___ a stingray?", h: "see", r: ["seen"], f: ["saw", "see"], fehler: "saw" },
      { e: "presperf", t: "Liam ___ his homework yet.", h: "not / finish", r: ["hasn't finished", "has not finished"], f: ["hadn't finished", "hasn't finish"], fehler: { ersatz: "hasn't finish", wort: "finish", loesung: ["finished"] } },
      { e: "presperf", t: "My parents ___ in Auckland since 2015.", h: "live", r: ["have lived", "have been living", "'ve lived", "'ve been living"], f: ["lived", "had lived"], fehler: { ersatz: "has lived", wort: "has", loesung: ["have"] } },
      { e: "sp",       t: "Last year my brother ___ an apprenticeship as a mechanic.", h: "begin", r: ["began"], f: ["has begun", "begun"], fehler: "begun" },
      { e: "sp",       t: "When ___ you move to Christchurch?", h: "do / have", r: ["did"], f: ["have", "had"], fehler: "have" },
      { e: "mix",      t: "When I got home, my sister ___ all the cake, so there was nothing left.", h: "eat", r: ["had eaten", "had already eaten"], f: ["has eaten", "was eating"], fehler: { ersatz: "had ate", wort: "ate", loesung: ["eaten"] } },
      { e: "mix",      t: "The ground ___ for about a minute, and then everything was quiet.", h: "shake – simple past", r: ["shook"], f: ["had shaken", "has shaken"], fehler: { ersatz: "shaked", wort: "shaked", loesung: ["shook"] } },
      { e: "mix",      t: "We ___ through the forest when we heard a strange noise.", h: "walk", r: ["were walking"], f: ["have walked", "had walked"], fehler: { ersatz: "were walk", wort: "walk", loesung: ["walking"] } }
    ],
    umformen: [
      { e: "prog",  a: "Join the sentences with “when” (past progressive + simple past):", von: "I was sleeping. The earthquake started.", nach: ["I was sleeping when the earthquake started.", "When the earthquake started, I was sleeping."] },
      { e: "prog",  a: "Join the sentences with “when” (past progressive + simple past):", von: "We were watching TV. The house began to shake.", nach: ["We were watching TV when the house began to shake.", "When the house began to shake, we were watching TV."] },
      { e: "prog",  a: "Join the sentences with “when” (past progressive + simple past):", von: "Mia was waiting for the bus. She saw her ex-boyfriend.", nach: ["Mia was waiting for the bus when she saw her ex-boyfriend.", "When she saw her ex-boyfriend, Mia was waiting for the bus."] },
      { e: "prog",  a: "Join the sentences with “when” (past progressive + simple past):", von: "The children were playing. It started to rain.", nach: ["The children were playing when it started to rain.", "When it started to rain, the children were playing."] },
      { e: "pperf", a: "Use the past perfect (By the time the rescuers arrived, …):", von: "The water rose. Then the rescuers arrived.", nach: ["By the time the rescuers arrived, the water had risen.", "By the time the rescuers arrived, the water had already risen."] },
      { e: "pperf", a: "Use the past perfect (By the time we got to the cinema, …):", von: "The film started. Then we got to the cinema.", nach: ["By the time we got to the cinema, the film had started.", "By the time we got to the cinema, the film had already started."] },
      { e: "pperf", a: "Use the past perfect (When we arrived at the airport, …):", von: "The plane left. Then we arrived at the airport.", nach: ["When we arrived at the airport, the plane had already left.", "When we arrived at the airport, the plane had left."] },
      { e: "pperf", a: "Use the past perfect (When I got home, …):", von: "My sister ate all the cake. Then I got home.", nach: ["When I got home, my sister had eaten all the cake.", "When I got home, my sister had already eaten all the cake."] },
      { e: "pperf", a: "Use the past perfect (By the next morning, …):", von: "The storm destroyed many houses during the night.", nach: ["By the next morning, the storm had destroyed many houses."] },
      { e: "sp",    a: "Rewrite the sentence with “last summer”:", von: "We have climbed a volcano.", nach: ["We climbed a volcano last summer.", "Last summer, we climbed a volcano.", "Last summer we climbed a volcano."] },
      { e: "sp",    a: "Rewrite the sentence with “in 2011”:", von: "A strong earthquake has hit Christchurch.", nach: ["A strong earthquake hit Christchurch in 2011.", "In 2011, a strong earthquake hit Christchurch.", "In 2011 a strong earthquake hit Christchurch."] },
      { e: "sp",    a: "Rewrite the sentence with “yesterday”:", von: "Ava has broken up with Jake.", nach: ["Ava broke up with Jake yesterday.", "Yesterday, Ava broke up with Jake.", "Yesterday Ava broke up with Jake."] },
      { e: "sp",    a: "Rewrite the sentence with “two years ago”:", von: "My brother has begun an apprenticeship.", nach: ["My brother began an apprenticeship two years ago.", "Two years ago, my brother began an apprenticeship.", "Two years ago my brother began an apprenticeship."] },
      { e: "presperf", a: "Write one sentence with “since” (My parents …):", von: "My parents moved to Auckland in 2015. They still live there.", nach: ["My parents have lived in Auckland since 2015.", "My parents have been living in Auckland since 2015."] },
      { e: "presperf", a: "Write one sentence with “twice” (I …):", von: "I went to New Zealand in 2019 and in 2023.", nach: ["I have been to New Zealand twice.", "I've been to New Zealand twice."] },
      { e: "presperf", a: "Ask a question with “ever”:", von: "you / see a stingray", nach: ["Have you ever seen a stingray?"] },
      { e: "presperf", a: "Make the sentence negative with “yet”:", von: "Liam has finished his homework.", nach: ["Liam hasn't finished his homework yet.", "Liam has not finished his homework yet."] },
      { e: "sp",    a: "Ask a question with “when” (When …):", von: "You have moved to Christchurch.", nach: ["When did you move to Christchurch?"] },
      { e: "mix",   a: "Put the verbs into the correct past tense:", von: "While we (walk) through the forest, we (hear) a strange noise.", nach: ["While we were walking through the forest, we heard a strange noise."] },
      { e: "mix",   a: "Put the verbs into the correct past tense:", von: "When I (get) home, my parents (already / go) to bed.", nach: ["When I got home, my parents had already gone to bed."] },
      { e: "mix",   a: "Put the verbs into the correct past tense:", von: "The ground (shake) for a minute, then everything (be) quiet.", nach: ["The ground shook for a minute, then everything was quiet."] },
      { e: "mix",   a: "Put the verbs into the correct past tense:", von: "I (never / see) a geyser before I (go) to New Zealand.", nach: ["I had never seen a geyser before I went to New Zealand."] },
      { e: "mix",   a: "Put the verbs into the correct past tense:", von: "Liam (sit) on the beach when he (see) the whale.", nach: ["Liam was sitting on the beach when he saw the whale."] },
      { e: "mix",   a: "Put the verbs into the correct past tense:", von: "By the time we (arrive), the party (end).", nach: ["By the time we arrived, the party had ended.", "By the time we arrived, the party had already ended."] },
      { e: "mix",   a: "Use the correct tenses:", von: "Two years ago my family (move) to Auckland, and we (live) there since then.", nach: ["Two years ago my family moved to Auckland, and we have lived there since then.", "Two years ago my family moved to Auckland, and we have been living there since then.", "Two years ago my family moved to Auckland, and we've lived there since then.", "Two years ago my family moved to Auckland, and we've been living there since then.", "Two years ago, my family moved to Auckland, and we have lived there since then.", "Two years ago, my family moved to Auckland, and we have been living there since then.", "Two years ago, my family moved to Auckland, and we've lived there since then.", "Two years ago, my family moved to Auckland, and we've been living there since then."] }
    ],
    zuordnen: {
      kategorien: ["simple past", "past progressive", "past perfect", "present perfect"],
      woerter: [
        { text: "saw", ziel: "simple past" }, { text: "went", ziel: "simple past" }, { text: "didn't go", ziel: "simple past" },
        { text: "was sleeping", ziel: "past progressive" }, { text: "were waiting", ziel: "past progressive" }, { text: "wasn't listening", ziel: "past progressive" },
        { text: "had seen", ziel: "past perfect" }, { text: "had left", ziel: "past perfect" }, { text: "hadn't eaten", ziel: "past perfect" },
        { text: "have seen", ziel: "present perfect" }, { text: "has gone", ziel: "present perfect" }, { text: "haven't been", ziel: "present perfect" }
      ]
    },
    erklaerungen: {
      satzpool: {
        sp:       "Simple past: a finished action at a finished time in the past (yesterday, last summer, two years ago, in 2011). Questions with did. Example: {BEISPIEL}",
        prog:     "Past progressive (Verlaufsform der Vergangenheit): was / were + verb-ing – an action that was going on when something else happened. Example: {BEISPIEL}",
        pperf:    "Past perfect (Vorvergangenheit): had + 3rd form – it happened before another action in the past, often with by the time, already, never … before. Example: {BEISPIEL}",
        presperf: "Present perfect: have / has + 3rd form – from the past until now or no finished time (ever, never, yet, since, for, twice). Example: {BEISPIEL}",
        mix:      "Long action in the background → past progressive. Short action or one after the other → simple past. Earlier action → past perfect. Example: {BEISPIEL}",
        zuordnen: "simple past: 2nd form · past progressive: was / were + -ing · past perfect: had + 3rd form · present perfect: have / has + 3rd form."
      }
    }
  },

  // ---------- Klasse 10, Unit 3: Bedingungssätze Typ III (G7) ----------
  //   Aussagen und Verneinung, Kurzformen, beide Satzstellungen, ohne could/might have; gemischt mit Typ I und II
  "10-G7": {
    saetze: [
      { e: "aussage", t: "If we had left earlier, we ___ the train.", h: "catch", r: ["would have caught", "'d have caught", "would've caught"], f: ["would caught", "will have caught"], fehler: { ersatz: "would have catched", wort: "catched", loesung: ["caught"] } },
      { e: "aussage", t: "If I ___ about the party, I would have come.", h: "know", r: ["had known", "'d known"], f: ["would have known", "knew"], fehler: { ersatz: "had knew", wort: "knew", loesung: ["known"] } },
      { e: "aussage", t: "If the rescuers hadn't come so quickly, many more people ___ their lives.", h: "lose", r: ["would have lost", "would've lost"], f: ["would lose", "had lost"], fehler: { ersatz: "would have losed", wort: "losed", loesung: ["lost"] } },
      { e: "aussage", t: "If it hadn't rained, we ___ to the glacier.", h: "walk", r: ["would have walked", "'d have walked", "would've walked"], f: ["would walked", "will have walked"], fehler: { ersatz: "would has walked", wort: "has", loesung: ["have"] } },
      { e: "aussage", t: "If I had studied harder, I ___ better marks.", h: "get", r: ["would have got", "would have gotten", "'d have got", "'d have gotten", "would've got", "would've gotten"], f: ["would get", "had got"], fehler: { ersatz: "will have got", wort: "will", loesung: ["would"] } },
      { e: "aussage", t: "If Tom ___ his mask, he wouldn't have swallowed so much water.", h: "wear", r: ["had worn", "'d worn"], f: ["had wore", "would have worn"], fehler: { ersatz: "had wore", wort: "wore", loesung: ["worn"] } },
      { e: "aussage", t: "If they ___ the warning, they would have left the town.", h: "hear", r: ["had heard", "'d heard"], f: ["would have heard", "have heard"], fehler: { ersatz: "have heard", wort: "have", loesung: ["had"] } },
      { e: "aussage", t: "Mia would have called you if she ___ your number.", h: "have", r: ["had had", "'d had"], f: ["had have", "would have had"], fehler: { ersatz: "had have", wort: "have", loesung: ["had"] } },
      { e: "aussage", t: "If you had asked me, I ___ you.", h: "help", r: ["would have helped", "'d have helped", "would've helped"], f: ["would helped", "had helped"], fehler: { ersatz: "would have help", wort: "help", loesung: ["helped"] } },
      { e: "aussage", t: "If Tom had trained harder, he ___ the race.", h: "win", r: ["would have won", "'d have won", "would've won"], f: ["would won", "will have won"], fehler: { ersatz: "would have winned", wort: "winned", loesung: ["won"] } },
      { e: "kurz",    t: "If the fire brigade had arrived earlier, they ___ the old house.", h: "save", r: ["would have saved", "'d have saved", "would've saved"], f: ["would save", "had saved"], fehler: { ersatz: "would of saved", wort: "of", loesung: ["have"] } },
      { e: "kurz",    t: "If we had known about the storm, we ___ at home.", h: "stay", r: ["would have stayed", "'d have stayed", "would've stayed"], f: ["would stay", "will stay"], fehler: { ersatz: "would have stay", wort: "stay", loesung: ["stayed"] } },
      { e: "kurz",    t: "If I had seen you yesterday, I ___ hello.", h: "say", r: ["would have said", "'d have said", "would've said"], f: ["would say", "will say"], fehler: { ersatz: "would have sayed", wort: "sayed", loesung: ["said"] } },
      { e: "neg",     t: "If Ava ___ Jake's messages, she wouldn't have been so upset.", h: "not / read", r: ["hadn't read", "had not read"], f: ["didn't read", "wouldn't have read"], fehler: { ersatz: "didn't read", wort: "didn't", loesung: ["hadn't", "had not"] } },
      { e: "neg",     t: "If you had told me the truth, I ___ angry.", h: "not / be", r: ["wouldn't have been", "would not have been"], f: ["wouldn't be", "hadn't been"], fehler: { ersatz: "wouldn't have be", wort: "be", loesung: ["been"] } },
      { e: "neg",     t: "Liam would have won the race if he ___.", h: "not / fall", r: ["hadn't fallen", "had not fallen"], f: ["didn't fall", "wouldn't have fallen"], fehler: { ersatz: "hadn't fell", wort: "fell", loesung: ["fallen"] } },
      { e: "neg",     t: "If the house had been stronger, it ___ in the earthquake.", h: "not / collapse", r: ["wouldn't have collapsed", "would not have collapsed"], f: ["wouldn't collapse", "didn't collapse"], fehler: { ersatz: "wouldn't have collapse", wort: "collapse", loesung: ["collapsed"] } },
      { e: "neg",     t: "We ___ the stingray if we hadn't gone diving.", h: "not / see", r: ["wouldn't have seen", "would not have seen"], f: ["didn't see", "wouldn't have saw"], fehler: { ersatz: "wouldn't have saw", wort: "saw", loesung: ["seen"] } },
      { e: "neg",     t: "I wouldn't have missed the bus if I ___ up earlier.", h: "get", r: ["had got", "had gotten", "'d got", "'d gotten"], f: ["would have got", "got"], fehler: { ersatz: "have got", wort: "have", loesung: ["had"] } },
      { e: "neg",     t: "If she ___ the bus last night, she would have been on time.", h: "not / miss", r: ["hadn't missed", "had not missed"], f: ["didn't miss", "wouldn't miss"], fehler: { ersatz: "didn't miss", wort: "didn't", loesung: ["hadn't", "had not"] } },
      { e: "neg",     t: "We would have been on time if the road ___ blocked.", h: "not / be", r: ["hadn't been", "had not been"], f: ["wasn't", "wouldn't have been"], fehler: { ersatz: "hadn't be", wort: "be", loesung: ["been"] } },
      { e: "mix",     t: "If it rains tomorrow, we ___ at home.", h: "stay", r: ["will stay", "'ll stay"], f: ["would have stayed", "would stay"], fehler: { ersatz: "will stayed", wort: "stayed", loesung: ["stay"] } },
      { e: "mix",     t: "If I had more time, I ___ more often.", h: "travel", r: ["would travel", "'d travel"], f: ["would have travelled", "will travel"], fehler: { ersatz: "will travel", wort: "will", loesung: ["would"] } },
      { e: "mix",     t: "If you ___ hungry, there's some pizza in the fridge.", h: "be", r: ["are", "'re"], f: ["were", "had been"], fehler: "were" },
      { e: "mix",     t: "If I ___ you, I would talk to her.", h: "be", r: ["were", "was"], f: ["had been", "am"], fehler: "am" },
      { e: "mix",     t: "If you finish your work, you ___ go home early.", h: "can", r: ["can", "could"], f: ["could have", "would have"], fehler: "cans" }
    ],
    umformen: [
      { e: "aussage", a: "Write an if-sentence type III:", von: "(we / leave earlier) – (we / catch the train)", nach: K10_WENN3("If we had left earlier", "we would have caught the train") },
      { e: "aussage", a: "Write an if-sentence type III:", von: "(I / know about the party) – (I / come)", nach: K10_WENN3("If I had known about the party", "I would have come") },
      { e: "neg",     a: "Write an if-sentence type III:", von: "(it / not rain) – (we / walk to the glacier)", nach: K10_WENN3("If it had not rained", "we would have walked to the glacier") },
      { e: "neg",     a: "Write an if-sentence type III:", von: "(you / tell me earlier) – (I / not be so worried)", nach: K10_WENN3("If you had told me earlier", "I would not have been so worried") },
      { e: "neg",     a: "Write an if-sentence type III:", von: "(Liam / not fall) – (he / win the race)", nach: K10_WENN3("If Liam had not fallen", "he would have won the race") },
      { e: "neg",     a: "Write an if-sentence type III:", von: "(the bridge / be stronger) – (it / not break)", nach: K10_WENN3("If the bridge had been stronger", "it would not have broken") },
      { e: "neg",     a: "Write an if-sentence type III:", von: "(Tom / wear his mask) – (he / not swallow so much water)", nach: K10_WENN3("If Tom had worn his mask", "he would not have swallowed so much water") },
      { e: "aussage", a: "Write an if-sentence type III:", von: "(they / hear the warning) – (they / leave the town)", nach: K10_WENN3("If they had heard the warning", "they would have left the town") },
      { e: "aussage", a: "Write a type III sentence about the past:", von: "We didn't leave early, so we missed the train.", nach: K10_WENN3("If we had left early", "we would not have missed the train").concat(K10_WENN3("If we had left early", "we would have caught the train")) },
      { e: "aussage", a: "Write a type III sentence about the past:", von: "I didn't know your number, so I didn't call you.", nach: K10_WENN3("If I had known your number", "I would have called you") },
      { e: "aussage", a: "Write a type III sentence about the past:", von: "Mia didn't study, so she failed the test.", nach: K10_WENN3("If Mia had studied", "she would not have failed the test").concat(K10_WENN3("If Mia had studied", "she would have passed the test")) },
      { e: "aussage", a: "Write a type III sentence about the past:", von: "Ben didn't wear a helmet, so he hurt his head.", nach: K10_WENN3("If Ben had worn a helmet", "he would not have hurt his head") },
      { e: "aussage", a: "Write a type III sentence about the past:", von: "We didn't have a map, so we got lost.", nach: K10_WENN3("If we had had a map", "we would not have got lost").concat(K10_WENN3("If we had had a map", "we would not have gotten lost")) },
      { e: "neg",     a: "Write a type III sentence about the past:", von: "Ava read Jake's messages, so she was upset.", nach: K10_WENN3("If Ava had not read Jake's messages", "she would not have been upset") },
      { e: "mix",     a: "Change the sentence to type III (past):", von: "If I had time, I would help you.", nach: K10_WENN3("If I had had time", "I would have helped you") },
      { e: "mix",     a: "Change the sentence to type III (past):", von: "If we lived closer, we would visit you.", nach: K10_WENN3("If we had lived closer", "we would have visited you") },
      { e: "mix",     a: "Change the sentence to type III (past):", von: "If it were warmer, we would go swimming.", nach: K10_WENN3("If it had been warmer", "we would have gone swimming") },
      { e: "mix",     a: "Change the sentence to type III (past):", von: "If you asked her, she would tell you.", nach: K10_WENN3("If you had asked her", "she would have told you") },
      { e: "mix",     a: "Change the sentence to type III (past):", von: "If Tom trained harder, he would win.", nach: K10_WENN3("If Tom had trained harder", "he would have won") },
      { e: "mix",     a: "Change the sentence to type III (past):", von: "If you hurry, you will catch the bus.", nach: K10_WENN3("If you had hurried", "you would have caught the bus") },
      { e: "mix",     a: "Change the sentence to type III (past):", von: "If it doesn't rain, we will go to the beach.", nach: K10_WENN3("If it had not rained", "we would have gone to the beach") },
      { e: "mix",     a: "Change the sentence to type III (past):", von: "If I see Mia, I will tell her.", nach: K10_WENN3("If I had seen Mia", "I would have told her") },
      { e: "kurz",    a: "Start with the main clause (Hauptsatz):", von: "If I had known, I would have told you.", nach: ["I would have told you if I had known.", "I'd have told you if I had known.", "I would've told you if I had known.", "I would have told you if I'd known.", "I'd have told you if I'd known."] },
      { e: "kurz",    a: "Start with the main clause (Hauptsatz):", von: "If we had taken a taxi, we wouldn't have been late.", nach: ["We wouldn't have been late if we had taken a taxi.", "We would not have been late if we had taken a taxi.", "We wouldn't have been late if we'd taken a taxi."] },
      { e: "kurz",    a: "Start with the main clause (Hauptsatz):", von: "If the rescuers hadn't come, many people would have died.", nach: ["Many people would have died if the rescuers hadn't come.", "Many people would have died if the rescuers had not come.", "Many people would've died if the rescuers hadn't come."] }
    ],
    zuordnen: {
      kategorien: ["type I", "type II", "type III"],
      woerter: [
        { text: "If it rains, we'll stay in.", ziel: "type I" }, { text: "If you hurry, you'll catch it.", ziel: "type I" }, { text: "I'll call if I'm late.", ziel: "type I" },
        { text: "If I were rich, I'd travel.", ziel: "type II" }, { text: "If I had a car, I'd drive.", ziel: "type II" }, { text: "She'd help if she had time.", ziel: "type II" },
        { text: "If I'd known, I'd have come.", ziel: "type III" }, { text: "If we had left, we'd have caught it.", ziel: "type III" }, { text: "He'd have won if he hadn't fallen.", ziel: "type III" }
      ]
    },
    erklaerungen: {
      satzpool: {
        aussage: "Type III (Bedingungssatz Typ III): if + past perfect (had + 3rd form), would have + 3rd form. It is about the past and can't be changed any more. Example: {BEISPIEL}",
        neg:     "Negative (Verneinung): if + hadn't + 3rd form, wouldn't have + 3rd form. Example: {BEISPIEL}",
        kurz:    "Short forms (Kurzformen): I'd = I had (if-clause) or I would (main clause); would've = would have. Never write “would of”. Example: {BEISPIEL}",
        mix:     "Type I: if + simple present, will. Type II: if + simple past, would. Type III: if + had + 3rd form, would have + 3rd form. Example: {BEISPIEL}",
        zuordnen: "Type I: if + present, will. Type II: if + past, would. Type III: if + had + 3rd form, would have + 3rd form."
      }
    }
  }
});

Object.assign(K10.generatoren, {
  "10-G5": { baukasten: "10-G5", art: "satzpool" },
  "10-G6": { baukasten: "10-G6", art: "satzpool" },
  "10-G7": { baukasten: "10-G7", art: "satzpool" }
});

K10.woerterhilfe.push(...[
  { en: "geyser", de: "Geysir" }, { en: "Wellington", de: "Wellington (Hauptstadt Neuseelands)" }, { en: "Christchurch", de: "Christchurch (Stadt in Neuseeland)" },
  { en: "Auckland", de: "Auckland (Stadt in Neuseeland)" }, { en: "South Island", de: "Südinsel (Neuseeland)" }, { en: "previous", de: "vorherig" },
  { en: "following", de: "folgend" }, { en: "promised", de: "versprach" }, { en: "boots", de: "Stiefel, Schuhe" }, { en: "agony aunt", de: "Kummerkastentante" },
  { en: "rescuer", de: "Retter/in" }, { en: "rescuers", de: "Retter/innen" }, { en: "rubble", de: "Schutt, Trümmer" }, { en: "fjord", de: "Fjord" },
  { en: "glacier", de: "Gletscher" }, { en: "glaciers", de: "Gletscher" }, { en: "stingray", de: "Stachelrochen" }, { en: "ex-boyfriend", de: "Ex-Freund" },
  { en: "risen", de: "gestiegen" }, { en: "swallowed", de: "geschluckt" }, { en: "collapsed", de: "eingestürzt" }, { en: "helmet", de: "Helm" },
  { en: "warning", de: "Warnung" }, { en: "fire brigade", de: "Feuerwehr" }, { en: "blocked", de: "gesperrt, blockiert" }, { en: "fridge", de: "Kühlschrank" },
  { en: "crush", de: "Schwärmerei (have a crush on = verknallt sein in)" },
  { en: "race", de: "Rennen, Wettlauf" }, { en: "twice", de: "zweimal" }, { en: "hurried", de: "beeilte sich" }, { en: "injure", de: "verletzen" },
  { en: "injured", de: "verletzt" }, { en: "cycle", de: "Rad fahren" }, { en: "worried", de: "besorgt" }, { en: "volcano", de: "Vulkan" },
  { en: "bridge", de: "Brücke" }, { en: "climbed", de: "bestiegen, kletterten" }, { en: "exams", de: "Prüfungen" }, { en: "calm", de: "ruhig" }, { en: "shook", de: "bebte, schüttelte (shake – shook – shaken)" }
]);

// =====================================================================
// 6) DIE AUFGABEN (handgeschriebener Pool)
// =====================================================================
K10.aufgaben = [
  { thema: "10-G1", niveau: "gruen", form: "quiz", frage: "Listen! The baby ___.", optionen: ["is crying", "cries", "is cring"], loesung: "is crying",
    erklaerung: "Listen! / Look! → something is happening now: present progressive (am / is / are + verb-ing). Example: Look! The bear is crossing the river." },
  { thema: "10-G1", niveau: "gruen", form: "quiz", frage: "I ___ the answer to this question.", optionen: ["know", "am knowing", "knows"], loesung: "know",
    erklaerung: "know is a state verb (Zustandsverb) – no -ing form. Example: We need more time." },
  { thema: "10-G2", niveau: "gruen", form: "quiz", frage: "We have lived here ___ 2015.", optionen: ["since", "for", "ago"], loesung: "since",
    erklaerung: "since + point in time (Zeitpunkt): since 2015. Example: Ethan has lived in Canada since 2019." },
  { thema: "10-G2", niveau: "gelb", form: "luecke", frage: "Lucy ___ (swim – present perfect progressive) for an hour.", loesung: ["has been swimming", "'s been swimming"],
    erklaerung: "Present perfect progressive: has / have been + verb-ing (swim → swimming). Example: It has been snowing all day." },
  { thema: "10-G3", niveau: "gruen", form: "quiz", frage: "If I ___ a bike, I would cycle to work.", optionen: ["had", "have", "would have"], loesung: "had",
    erklaerung: "Type II: if + simple past, would + verb. Example: If we lived in Delhi, we would visit the Red Fort." },
  { thema: "10-G3", niveau: "rot", form: "fehler", satz: "If it snows tomorrow, we would stay at home.", fehlerwort: "would", loesung: ["will"],
    erklaerung: "Type I (Bedingungssatz Typ I): if + simple present, will + verb. Example: If you don't hurry, you will miss the bus." },
  { thema: "10-G4", niveau: "gruen", form: "quiz", frage: "Rice ___ in many parts of Asia.", optionen: ["is grown", "is growed", "grows by"], loesung: "is grown",
    erklaerung: "Passive (Passiv): is / are + 3rd form. grow → grown. Example: Tea is grown in many parts of India." },
  { thema: "10-G4", niveau: "gelb", form: "luecke", frage: "The bridge ___ (open) in 1998.", loesung: ["was opened"],
    erklaerung: "Passive in the simple past: was / were + 3rd form. Example: The palace was designed for a king." },
  { thema: "10-G5", niveau: "gruen", form: "quiz", frage: "Jake: “I'll see you tomorrow.”  →  Jake said he would see me ___.", optionen: ["the next day", "tomorrow", "the day before"], loesung: "the next day",
    erklaerung: "Time words change (Zeitangaben): tomorrow → the next day / the following day. Example: Mia said that she would call me the next day." },
  { thema: "10-G5", niveau: "gelb", form: "luecke", frage: "Mum: “Don't touch this!”  →  Mum told me not to touch ___.", loesung: ["that", "it"],
    erklaerung: "Place words change (Ortsangaben): this → that, here → there. Example: The firefighter said that it wasn't safe there." },
  { thema: "10-G6", niveau: "gruen", form: "quiz", frage: "I ___ a shower when the phone rang.", optionen: ["was having", "have had", "had had"], loesung: "was having",
    erklaerung: "Past progressive (Verlaufsform): an action that was going on when something else happened. Example: We were watching TV when the house began to shake." },
  { thema: "10-G6", niveau: "gelb", form: "luecke", frage: "By the time the police arrived, the thief ___ (escape).", loesung: ["had escaped", "had already escaped"],
    erklaerung: "Past perfect (Vorvergangenheit): had + 3rd form for the earlier action. Example: By the time we got to the cinema, the film had started." },
  { thema: "10-G7", niveau: "gruen", form: "quiz", frage: "If I had known, I ___ you.", optionen: ["would have told", "would told", "will have told"], loesung: "would have told",
    erklaerung: "Type III: if + had + 3rd form, would have + 3rd form. Example: If we had left earlier, we would have caught the train." },
  { thema: "10-G7", niveau: "rot", form: "fehler", satz: "If you had asked me, I would of helped you.", fehlerwort: "of", loesung: ["have"],
    erklaerung: "would have (short: would've) – never “would of”. Example: If Tom had trained harder, he would have won." }
];

// =====================================================================
// 7) ZUSATZFRAGEN für den Zusatzraum (Quiz mit 3 Antworten)
// =====================================================================
K10.zusatzfragen = [
  { thema: "10-G1", frage: "Look! The bear … the river.", optionen: ["is crossing", "crosses", "cross"], loesung: "is crossing" },
  { thema: "10-G1", frage: "Polar bears usually … seals.", optionen: ["hunt", "are hunting", "hunts"], loesung: "hunt" },
  { thema: "10-G1", frage: "This sledge … to my grandpa.", optionen: ["belongs", "is belonging", "belong"], loesung: "belongs" },
  { thema: "10-G1", frage: "What … you doing right now?", optionen: ["are", "do", "is"], loesung: "are" },
  { thema: "10-G1", frage: "Tom … train on Sundays.", optionen: ["doesn't", "isn't", "don't"], loesung: "doesn't" },
  { thema: "10-G2", frage: "We've known each other … ten years.", optionen: ["for", "since", "ago"], loesung: "for" },
  { thema: "10-G2", frage: "I … a moose last summer.", optionen: ["saw", "have seen", "seed"], loesung: "saw" },
  { thema: "10-G2", frage: "Have you … been to Canada?", optionen: ["ever", "yet", "since"], loesung: "ever" },
  { thema: "10-G2", frage: "It … snowing all day.", optionen: ["has been", "is been", "has"], loesung: "has been" },
  { thema: "10-G2", frage: "We haven't finished …", optionen: ["yet.", "already.", "just."], loesung: "yet." },
  { thema: "10-G3", frage: "If it rains, we … at home.", optionen: ["will stay", "would stay", "stayed"], loesung: "will stay" },
  { thema: "10-G3", frage: "If I … more time, I'd help you.", optionen: ["had", "have", "would have"], loesung: "had" },
  { thema: "10-G3", frage: "If I … you, I'd take the job.", optionen: ["were", "am", "would be"], loesung: "were" },
  { thema: "10-G3", frage: "If you feel ill, you … see a doctor.", optionen: ["should", "would", "shoulds"], loesung: "should" },
  { thema: "10-G3", frage: "If I spoke Hindi, I … talk to them.", optionen: ["could", "can", "will"], loesung: "could" },
  { thema: "10-G4", frage: "Hindi … in India.", optionen: ["is spoken", "is speaked", "speaks"], loesung: "is spoken" },
  { thema: "10-G4", frage: "The Taj Mahal … in the 17th century.", optionen: ["was built", "is built", "was builded"], loesung: "was built" },
  { thema: "10-G4", frage: "… the boxes packed yesterday?", optionen: ["Were", "Did", "Was"], loesung: "Were" },
  { thema: "10-G4", frage: "The workers … paid enough.", optionen: ["aren't", "don't", "isn't"], loesung: "aren't" },
  { thema: "10-G4", frage: "Shah Jahan … the Taj Mahal.", optionen: ["built", "was built", "builded"], loesung: "built" },
  { thema: "10-G5", frage: "“here” in reported speech:", optionen: ["there", "here", "where"], loesung: "there" },
  { thema: "10-G5", frage: "“yesterday” in reported speech:", optionen: ["the day before", "the next day", "yesterday"], loesung: "the day before" },
  { thema: "10-G5", frage: "“I will help.” → She said she … help.", optionen: ["would", "will", "wills"], loesung: "would" },
  { thema: "10-G5", frage: "“Leave!” → He told us … leave.", optionen: ["to", "that", "–"], loesung: "to" },
  { thema: "10-G6", frage: "I … when the earthquake started.", optionen: ["was sleeping", "have slept", "had slept"], loesung: "was sleeping" },
  { thema: "10-G6", frage: "By the time we arrived, the film … started.", optionen: ["had", "has", "was"], loesung: "had" },
  { thema: "10-G6", frage: "Two years ago an earthquake … the city.", optionen: ["hit", "has hit", "hitted"], loesung: "hit" },
  { thema: "10-G6", frage: "I … to New Zealand twice.", optionen: ["have been", "was", "had been"], loesung: "have been" },
  { thema: "10-G7", frage: "If we had left earlier, we … caught it.", optionen: ["would have", "would", "will have"], loesung: "would have" },
  { thema: "10-G7", frage: "If I … known, I'd have come.", optionen: ["had", "would", "have"], loesung: "had" },
  { thema: "10-G7", frage: "Which is type III?", optionen: ["If I'd known, I'd have come.", "If I knew, I'd come.", "If I know, I'll come."], loesung: "If I'd known, I'd have come." },
  { thema: "10-G7", frage: "He … have won if he hadn't fallen.", optionen: ["would", "will", "had"], loesung: "would" }
];

// =====================================================================
// 8) MINISPIELE
//    Reward after a cleared bonus room: button „🎁 Minispiel?“. 30 seconds at most, does NOT count for the code.
//    Nur die Spiele, die unter „spiele“ stehen, werden in dieser Welt angeboten. Die Spieltechnik steht in spiele/minispiele.js.
//    titel / anleitung / erfolg = Texte (einfaches Englisch); ziel = so viele Punkte braucht man.
//    Beim Spiel codeknacker ist ziel zugleich die Länge des Codes (3 bis 5).
// =====================================================================
K10.minispiele = {
  spiele: {
    nachtflug: {
      titel: "🚀 Asteroid run",
      anleitung: "Tap to fire the engine. Fly between the asteroids and collect the power cells 🔋. A bump only costs you a moment.",
      ziel: 8,
      erfolg: "Eight power cells. ARIA is almost impressed."
    },
    rutsche: {
      titel: "🤖 Rover run",
      anleitung: "Tap to make the rover jump. Get over rocks and crates and collect the power cells 🔋.",
      ziel: 8,
      erfolg: "Battery full. The rover beeps happily."
    },
    codeknacker: {
      titel: "🛰️ Reboot code",
      anleitung: "Find the four-digit code. Tap four digits. After each try you get a hint for every digit: ● right place, ◐ wrong place, ○ not in the code.",
      ziel: 4,
      erfolg: "System rebooted. ARIA: “I could have done that. I chose not to.”"
    },
    lasergitter: {
      titel: "🌌 Airlock timing",
      anleitung: "The energy field switches on and off. Tap when it says OFF to float through. A wrong tap only costs you a second.",
      ziel: 6,
      erfolg: "Six fields passed. No oxygen wasted."
    }
  },
  flug: { figur: "🚀", stern: "🔋", krone: "🪨", himmel: ["✨", "·", "🪐", "·", "✨", "·"] },
  flugAutsch: ["Bump. Hull intact.", "Keep the engine on.", "Close one.", "Minor dent. Continue."],
  rutsche: { figur: "🤖", fisch: "🔋", hindernisse: ["🪨", "📦", "🛢️"], hintergrund: ["🪐", "✨", "🌍", "✨"] },
  rutscheAutsch: ["Bump. Keep rolling.", "Mind the rocks.", "Ouch.", "Wheels still on. Go."],
  codeknacker: { ziffern: 5, legende: "● right place · ◐ wrong place · ○ not in the code", start: "Tap four digits.", fertig: "Code cracked." },
  lasergitter: { figur: "🧑‍🚀", ziel: "🛟", an: "ON", aus: "OFF", hinweis: "Tap when the field is OFF.", autsch: ["Zap. Wait for OFF.", "Too early.", "Patience, human."] }
};

// ---------- More mini games (from version 0.7.1): eight games per world ----------
Object.assign(K10.minispiele.spiele, {
  obstkorb: {
    titel: "☄️ Crystal catcher",
    anleitung: "Space crystals are floating past! Move the collector with your finger and catch them. Avoid the space junk!",
    ziel: 12,
    erfolg: "The tank is full of crystals. Power is back."
  },
  taschenlampe: {
    titel: "🔦 Dark module",
    anleitung: "The lights in the storage module are out. Move your finger to shine the torch and hold the light on the lost things. Some are behind boxes.",
    ziel: 6,
    erfolg: "Everything found. The module is tidy again."
  },
  seeloewe: {
    titel: "🧑‍🚀 Zero-g ball",
    anleitung: "Ball games are tricky in space! Keep the ball in the air – move the astronaut under it with your finger.",
    ziel: 10,
    erfolg: "Ten touches in zero gravity. Mission control applauds."
  },
  fuettern: {
    titel: "🍱 Supply run",
    anleitung: "Every part of the station needs supplies. Drag each thing to the right place – or tap the right place.",
    ziel: 6,
    erfolg: "Everything delivered. The station is running smoothly."
  }
});
Object.assign(K10.minispiele, {
  // ---------- Crystal catcher (obstkorb) ----------
  obst: [
    { emoji: "💎", en: "crystal",    de: "Kristall" },     { emoji: "⭐", en: "star",       de: "Stern" },
    { emoji: "🔋", en: "battery",    de: "Batterie" },     { emoji: "💠", en: "blue crystal", de: "blauer Kristall" },
    { emoji: "⚡", en: "energy",     de: "Energie" },      { emoji: "🧊", en: "ice",        de: "Eis" },
    { emoji: "🌟", en: "stardust",   de: "Sternenstaub" }, { emoji: "🔮", en: "energy ball", de: "Energiekugel" }
  ],
  muell: ["🪨", "🔩", "🥫", "🧦"],
  autsch: ["Space rock! Ouch.", "A loose bolt. Not useful.", "Who throws tins into space?", "Floating socks. Again."],

  // ---------- Dark module (taschenlampe) ----------
  nachtTiere: [
    { emoji: "🔧", en: "spanner",     de: "Schraubenschlüssel" }, { emoji: "🪛", en: "screwdriver", de: "Schraubenzieher" },
    { emoji: "🔋", en: "battery",     de: "Batterie" },           { emoji: "🧤", en: "glove",       de: "Handschuh" },
    { emoji: "🎧", en: "headset",     de: "Headset" },            { emoji: "🧃", en: "juice",       de: "Saft" },
    { emoji: "🍫", en: "chocolate",   de: "Schokolade" },         { emoji: "📷", en: "camera",      de: "Kamera" },
    { emoji: "🧸", en: "teddy bear",  de: "Teddybär" },           { emoji: "🔑", en: "key",         de: "Schlüssel" },
    { emoji: "📓", en: "logbook",     de: "Logbuch" },            { emoji: "🧦", en: "sock",        de: "Socke" }
  ],
  kulisse: ["📦", "🧰", "📦", "🛢️", "📦", "🧰", "🗄️", "📦", "🧰", "🗄️"],

  // ---------- Zero-g ball (seeloewe) ----------
  robbe: "🧑‍🚀", ball: "🪐", boden: "repeating-linear-gradient(90deg,#4a5070 0 18px,#353a55 18px 36px)",
  platsch: ["It floated away! Again.", "New ball!", "Missed – keep going!"],

  // ---------- Supply run (fuettern): tiere = places, futter = supplies ----------
  tiere: [
    { id: "garten",  emoji: "🌱", en: "greenhouse",   de: "Gewächshaus",   witz: "“{futter}? The plants don't need that.”" },
    { id: "robot",   emoji: "🤖", en: "robot",        de: "Roboter",       witz: "“{futter}? Beep! Error!”" },
    { id: "arzt",    emoji: "🏥", en: "medical room", de: "Krankenstation", witz: "“{futter}? Not in the medical room!”" },
    { id: "kueche",  emoji: "🍽️", en: "kitchen",      de: "Küche",         witz: "“{futter}? You can't eat that!”" },
    { id: "labor",   emoji: "🔬", en: "lab",          de: "Labor",         witz: "“{futter}? Not for our experiments!”" },
    { id: "bett",    emoji: "🛏️", en: "sleeping room", de: "Schlafraum",   witz: "“{futter}? Not in bed, please.”" }
  ],
  futter: [
    { emoji: "🌰", en: "seeds",        de: "Samen",         haupt: ["garten"], auch: ["kueche", "labor"] },
    { emoji: "🔋", en: "batteries",    de: "Batterien",     haupt: ["robot"],  auch: ["labor"] },
    { emoji: "🔧", en: "spanner",      de: "Schraubenschlüssel", haupt: ["robot"], auch: ["labor"] },
    { emoji: "🩹", en: "plasters",     de: "Pflaster",      haupt: ["arzt"],   auch: [] },
    { emoji: "💊", en: "medicine",     de: "Medizin",       haupt: ["arzt"],   auch: ["labor"] },
    { emoji: "🥫", en: "tins of food", de: "Konservendosen", haupt: ["kueche"], auch: [] },
    { emoji: "🍝", en: "pasta",        de: "Nudeln",        haupt: ["kueche"], auch: [] },
    { emoji: "🧪", en: "test tubes",   de: "Reagenzgläser", haupt: ["labor"],  auch: ["arzt"] },
    { emoji: "🧸", en: "teddy bear",   de: "Teddybär",      haupt: ["bett"],   auch: [] }
  ],
  lob: ["✅ Delivered!", "✅ Thanks!", "✅ Perfect!", "✅ Great!"]
});

// ---------- Losing (from version 0.7.2): three hearts, traps in the torch game ----------
Object.assign(K10.minispiele, {
  // Meldung, wenn alle drei Herzen weg sind (eine davon wird ausgelost)
  gameOver: ["Houston, we have a problem. Three mistakes.", "Game over. Mission control sighs."],
  // Taschenlampe: Fallen im Dunkeln – wer sie zu lange anleuchtet, verliert ein Herz
  fallen: [
    { emoji: "👾", text: "An alien! Run!" },
    { emoji: "⚡", text: "Zap! A broken cable." },
    { emoji: "🕷️", text: "A space spider?!" }
  ]
});

// ---------- Four more mini games for older students (from version 0.9.2): twelve games ----------
Object.assign(K10.minispiele.spiele, {
  kabel: {
    titel: "🔌 Emergency power",
    anleitung: "The main power is down. Drag each cable to the socket with the same colour and symbol – or tap the cable, then the socket. Wrong socket = sparks!",
    ziel: 3,
    erfolg: "Emergency power online. ARIA: “Lights on. You're welcome.”"
  },
  andocken: {
    titel: "🚀 Dock the escape pod",
    anleitung: "Hold your finger where the pod should fly – the engine pushes towards your finger. Let go and it drifts. Dock SLOWLY and avoid the space debris.",
    ziel: 3,
    erfolg: "Three perfect dockings. Mission control applauds."
  },
  sequenz: {
    titel: "🧠 Reactor start sequence",
    anleitung: "The reactor shows its start sequence for a moment. Watch the panel light up, then tap the same order. It gets longer every time.",
    ziel: 4,
    erfolg: "Reactor online. ARIA: “Impressive memory – for a carbon-based life form.”"
  },
  signal: {
    titel: "📡 Contact Earth",
    anleitung: "Turn the two dials until your wave lies exactly on the dashed wave from Earth. Then tap “Lock signal”. A wrong lock wastes energy.",
    ziel: 3,
    erfolg: "Contact with Earth. Three messages received."
  }
});
Object.assign(K10.minispiele, {
  kabel: { kasten: "Power unit", hinweis: "Same colour, same symbol.", fertig: ["Power unit online!", "Circuit closed!"], autsch: ["Sparks! Wrong socket.", "Bzzzt! Short circuit."] },
  andocken: { figur: "🚀", dock: "DOCK", truemmer: ["☄️", "🪨", "🛰️"], limit: 95, hinweis: "Hold = engine pushes towards your finger. Dock slowly!",
              gelandet: ["Docked!", "Soft docking!", "Perfect!"], zuSchnell: "Too fast! The pod bounced off.", autsch: ["Ouch! Space debris.", "Bump! Fly around it."] },
  sequenz: { zeichen: ["α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "λ"], schau: "Watch", du: "Your turn", gut: ["Sequence correct!", "Reactor stable!", "Exactly!"], autsch: ["Wrong sequence. Watch again.", "Reactor warning! Watch again."] },
  signal: { hoehe: "Height", wellen: "Waves", lock: "Lock signal", ziel: "Earth", du: "station", autsch: ["No signal. Keep tuning.", "Only static from space."],
            funk: ["Station, this is Houston. We hear you loud and clear.", "A rescue ship is on its way.", "Your oxygen levels look good.",
                   "Please send us the data from the greenhouse.", "Well done, crew. Stay calm and follow the plan.", "We will open the landing zone in two hours."] }
});
