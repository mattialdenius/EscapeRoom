/* =====================================================================
   ALLGEMEINE EINSTELLUNGEN  ·  gelten für alle Klassen
   ---------------------------------------------------------------------
   Diese Datei gehört zum Grammar Escape Room (index.html).
   Ändert nur Texte zwischen Anführungszeichen "..." und Zahlen.
   Kommas zwischen den Einträgen und Klammern bitte stehen lassen.
   ===================================================================== */

// =====================================================================
// 1) EINSTELLUNGEN
// =====================================================================
const EINSTELLUNGEN = {
  aufgabenProRaum: 10,                                   // so viele RICHTIGE Antworten braucht man pro Raum
  bausteinAbstand: 10,                                   // derselbe Baustein (Ding, Grundsatz …) kommt erst nach so vielen Aufgaben wieder
  zeitlimitMinuten:   { gruen: 15, gelb: 20, rot: 35 },  // Spielzeit im Modus „mit Zeitlimit“
  zusatzraumAktiv: true,                                 // true = nach jedem Raum kommt der Zusatzraum
  zusatzraumSekunden: { gruen: 30, gelb: 25, rot: 20 },  // Zeit für die Bonusfrage
  zusatzraumFalscheAntwortBeendet: true,                 // true = eine falsche Antwort beendet den Zusatzraum sofort
  torVersuche: 3,                                        // so viele Versuche hat man am Zahlenschloss des Ausgangs
  wiederholungMitKlassen: { 10: { abUnit: 3, klassen: [9], anteil: 0.2 } },   // „Wiederholung“ ab dieser Unit streut Themen der genannten Klassen ein; anteil 0.2 = 2 von 10 Aufgaben pro Raum (Klasse 10: Prüfungsvorbereitung mit etwas Klasse 9)
  wiederholungThemenProRaum: 5,                          // „Wiederholung“: höchstens so viele Themen pro Raum (4 Räume × 5 = bis zu 20 Themen). 1 = wie früher
  internationalismenAktiv: true,                         // true = auch erschließbare Wörter (banana, hotel …) aus den „…Extra“-Listen
  minispieleAktiv: true,                                 // true = nach einem geschafften Raubtierhaus/Zusatzraum erscheint „🎁 Minispiel?“ (false = nie)
  minispielSekunden: 30,                                 // so lange dauert ein Minispiel höchstens
  minispielAbstand: 4,                                   // dasselbe Minispiel kommt höchstens alle 4 Durchgänge (gilt, solange die Seite offen ist)
  testCode: "3110",                                      // NUR im Testbereich (Adresse …/test/): Schloss ist immer bedienbar, dieser Code führt direkt zum Siegbildschirm. Im Liveordner wirkungslos.
  entdeckerModus: true,                                  // true = Zoo-Karte statt Kachel-Übersicht (Hauptversion). Backup ohne Karte: Adresse mit ?karte=0
  woerterhilfeAktiv: true,                               // true = Wörter aus der WOERTERHILFE sind unterstrichen, Antippen zeigt Deutsch
  // Welche Rätselformen gehören zu welchem Niveau?
  formenNachNiveau: {
    gruen: ["quiz", "zuordnen"],
    gelb:  ["luecke", "satzbau"],
    rot:   ["fehler", "umformen"]
  }
};

// Ampel-Niveaus (Name und Beschreibung auf dem Startbildschirm)
// nameEn / textEn: Anzeige in den Welten mit englischer Bedienung (ab Klasse 8)
const NIVEAUS = {
  gruen: { name: "Leicht", farbe: "#3ddc97", text: "Erkennen und auswählen. Mit Hilfekarte.", nameEn: "Easy", textEn: "Recognise and choose. With a help card." },
  gelb:  { name: "Mittel", farbe: "#ffd23f", text: "Anwenden: Lücken füllen, Sätze bauen.", nameEn: "Medium", textEn: "Use it: fill in gaps, build sentences." },
  rot:   { name: "Schwer", farbe: "#ff4d4d", text: "Fehler finden, Sätze selbst bilden.", nameEn: "Hard", textEn: "Find mistakes, write sentences yourself." }
};

// Arbeitsanweisungen für die Rätselformen (Englisch + kleine deutsche Hilfe darunter)
const ANWEISUNGEN = {
  quiz:     { en: "Choose the right answer.",                         de: "Wähle die richtige Antwort." },
  zuordnen: { en: "Drag each word into the right box.",               de: "Ziehe jedes Wort in das richtige Feld (antippen und Feld antippen geht auch). Ein Feld kann auch leer bleiben!" },
  luecke:   { en: "Fill in the gaps.",                                de: "Fülle die Lücken." },
  satzbau:  { en: "Put the words in the right order.",                de: "Tippe die Wörter in der richtigen Reihenfolge an." },
  fehler:   { en: "Find the mistake. Tap the wrong word and correct it.", de: "Tippe das falsche Wort an und schreibe es richtig." },
  umformen: { en: "Write the new sentence.",                          de: "Schreibe den neuen Satz." }
};

// =====================================================================
// 2) KLASSEN: Welche Datei gehört zu welcher Klasse?
//    Die Datei einer Klasse wird erst geladen, wenn man sie im Startmenü wählt.
//    Neue Klasse oder neues Fach: Datei in den Ordner „daten“ legen und hier eintragen.
// =====================================================================
const KLASSEN_DATEIEN = {
  5:  "daten/klasse5.js",
  6:  "daten/klasse6.js",
  7:  "daten/klasse7.js",
  8:  "daten/klasse8.js",
  9:  "daten/klasse9.js",
  10: "daten/klasse10.js"
};
