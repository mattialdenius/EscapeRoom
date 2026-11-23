/* =====================================================================
   MINISPIELE für den Grammar Escape Room (Belohnung nach dem Zusatzraum)
   ---------------------------------------------------------------------
   Version:  minispiele 0.10 (passt zu App-Version 0.9.14 bis 1.2.4-a)
   Inhalt:   fuettern (Fütterungszeit), taschenlampe (Taschenlampen-Suche),
             seeloewe (Robben-Jonglage), obstkorb (Obstkorb), schaukel (Affen-Schaukel),
             nachtflug (Pollys Nachtflug), rutsche (Pinguin-Rutsche) – beide mit dem
             gemeinsamen Baustein „laufband“ (beweglicher Hintergrund)
   Daten:    Texte, Ziele, Tiere und Futter stehen in daten/klasseX.js unter
             KX.minispiele. Hier steht nur die Spieltechnik.
   Rahmen:   index.html startet ein Spiel, zeigt die 30-Sekunden-Uhr, zählt
             die Punkte und zeigt die Erfolgsmeldung. Jedes Spiel bekommt
             eine leere Bühne (buehne) und Hilfen (ctx) und gibt eine
             Aufräum-Funktion zurück.
   Speichert nichts: kein localStorage, keine Cookies, kein Netzwerk.
   Bedienung: ein Finger (Ziehen oder Tippen), Maus, Tastatur (Pfeile, Enter).

   Änderungsliste:
     0.10 (21.11.2026) Fairer: Code knacken hat nur noch 4 Versuche (vorher 6), die Zahl steht schon
                       beim Start da. Füttern: Ein falsches Tier kostet ein Herz und das Futter
                       wechselt (das richtige Tier wird kurz gezeigt) – Durchprobieren geht nicht mehr.
     0.9 (21.11.2026)  Vorlesetexte (für Screenreader) in der Sprache der Welt: Klasse 5–7 deutsch,
                       ab Klasse 8 englisch (taschenlampe, seeloewe, obstkorb, schaukel, nachtflug,
                       rutsche, codeknacker, lasergitter, kabel). Funkspruch mit englischen Anführungszeichen.
     0.8 (21.11.2026)  Kabel verbinden auch per Tastatur (Stecker wählen, dann Buchse).
     0.7 (20.11.2026)  Vier neue Spiele für die älteren Klassen: kabel (Kabel verbinden), andocken
                       (Andockmanöver), sequenz (Sicherheitssequenz merken), signal (Signal einstellen).
     0.6 (16.11.2026)  Man kann scheitern: drei Herzen, jeder Fehler kostet eines (ctx.fehler).
                       Code knacken: höchstens 6 Versuche (versuche). Taschenlampe: Fallen im
                       Dunkeln (fallen), die man nicht zu lange anleuchten darf.
     0.5 (16.11.2026)  Mehr Spiele pro Welt: Jede Welt kann Aussehen und Texte anpassen –
                       Seil statt Liane (seil, seilDeko, netzZeichen), Texte beim Füttern auf
                       Englisch (Welten mit sprache "en"), Code-Knacker-Hinweise auf Deutsch (namen).
                       Vorlese-Texte nennen den Spieltitel der Welt statt „Zoo“.
     0.4 (15.11.2026)  Neu für die Welten der Klassen 8–10: codeknacker (Code knacken mit
                       Hinweisen) und lasergitter (im richtigen Moment durchlaufen).
                       Die sieben bisherigen Spiele sind unverändert.
     0.3 (14.11.2026)  Neu: Pollys Nachtflug und Pinguin-Rutsche mit beweglichem Hintergrund.
     0.2 (14.11.2026)  Taschenlampe schwerer (kleineres Licht, 6 Tiere, teils hinter
                       Büschen, Licht ½ Sekunde draufhalten). Neu: Obstkorb, Affen-Schaukel.
     0.1 (14.11.2026)  Erste Fassung mit drei Spielen.
   ===================================================================== */
(function(){
"use strict";

// ---------- Hilfen ----------
const wuerfle = l => l[Math.floor(Math.random() * l.length)];
const mischen = l => { const a = l.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const sp = (ctx, de, en) => ctx && ctx.sprache === "en" ? en : de;   // Text in der Sprache der Welt
const el = (tag, klasse, text) => { const e = document.createElement(tag); if(klasse) e.className = klasse; if(text != null) e.textContent = text; return e; };
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const fuelle = (t, werte) => String(t).replace(/\{(\w+)\}/g, (m, k) => werte[k] != null ? werte[k] : m);

// ---------- Aussehen (einmal einfügen) ----------
if(!document.getElementById("minispielStil")){
  const st = el("style"); st.id = "minispielStil";
  st.textContent = `
  .ms-buehne{position:relative;overflow:hidden;border:4px solid #000;border-radius:16px;background:#13285e;color:#fff;
    height:min(60vh,480px);min-height:340px;touch-action:none;user-select:none;-webkit-user-select:none}
  .ms-buehne:focus-visible{outline:4px solid #000;box-shadow:0 0 0 8px #ffd23f}
  /* Fütterungszeit */
  .ms-fu{display:flex;flex-direction:column;align-items:center;justify-content:space-between;height:100%;padding:3.4rem .8rem .8rem;box-sizing:border-box;gap:.5rem}
  .ms-futter{background:#fff;color:#000;border:4px solid #000;border-radius:18px;padding:.4rem 1rem;text-align:center;cursor:grab;
    box-shadow:0 5px 0 #000;min-width:9rem;touch-action:none;position:relative;z-index:3}
  .ms-futter .e{font-size:3.2rem;line-height:1.1;display:block}
  .ms-futter b{font-size:1.25rem}
  .ms-futter small{display:block;color:#444;font-size:.85rem}
  .ms-futter.zieht{cursor:grabbing;box-shadow:0 10px 0 #000;transition:none}
  .ms-futter.zurueck{transition:transform .25s}
  .ms-tiere{display:grid;grid-template-columns:repeat(3,1fr);gap:.6rem;width:100%}
  .ms-tier{min-height:7.5rem;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#0b1736;color:#fff;
    border:4px solid #ffd23f;border-radius:16px;padding:.3rem;font-size:1rem;box-shadow:0 5px 0 #000}
  .ms-tier .e{font-size:3rem;line-height:1.1}
  .ms-tier b{font-size:1.15rem}
  .ms-tier small{color:#cfd8ff}
  .ms-tier.ziel{background:#2b59c3;transform:scale(1.05)}
  .ms-tier.satt{border-style:solid;border-color:#fff;background:#0b3d2a}
  .ms-tier.nein{border-style:dashed;opacity:.55}
  .ms-tier:disabled{cursor:default}
  .ms-blase{min-height:3.2em;max-width:36rem;background:#fff;color:#000;border:3px solid #000;border-radius:14px;padding:.4rem .7rem;
    font-size:1.05rem;text-align:center;visibility:hidden}
  .ms-blase.an{visibility:visible}
  /* Taschenlampe */
  .ms-ta-ding{position:absolute;transform:translate(-50%,-50%);font-size:2.4rem;line-height:1;pointer-events:none}
  .ms-ta-tier{position:absolute;transform:translate(-50%,-50%);font-size:2.3rem;line-height:1;pointer-events:none;text-align:center;z-index:1}
  .ms-ta-tier.gefunden{z-index:3}
  .ms-ta-tier.gefunden::before{content:"";position:absolute;left:50%;top:.6em;width:2.4em;height:2.4em;transform:translate(-50%,-50%);
    border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 3px #000}
  .ms-ta-tier .schild{display:none;position:absolute;left:50%;top:100%;transform:translateX(-50%);white-space:nowrap;margin-top:.5rem;
    background:#fff;color:#000;border:2px solid #000;border-radius:10px;padding:.1rem .4rem;font-size:.85rem;font-weight:bold}
  .ms-ta-tier.gefunden .schild{display:block}
  .ms-ta-tier.links .schild{left:-.6em;transform:none}
  .ms-ta-tier.rechts .schild{left:auto;right:-.6em;transform:none}
  .ms-ta-dunkel{position:absolute;inset:0;z-index:2;pointer-events:none}
  /* Robben-Jonglage */
  .ms-ro-ball,.ms-ro-robbe{position:absolute;left:0;top:0;line-height:1;pointer-events:none;will-change:transform}
  .ms-ro-ball{font-size:2.6rem}
  .ms-ro-robbe{font-size:4.2rem}
  .ms-ro-boden{position:absolute;left:0;right:0;bottom:0;height:14px;background:repeating-linear-gradient(90deg,#9ad1ff 0 18px,#5aa7e6 18px 36px);border-top:3px solid #000}
  .ms-ro-meldung{position:absolute;left:50%;top:30%;transform:translateX(-50%);background:#fff;color:#000;border:3px solid #000;border-radius:12px;
    padding:.3rem .7rem;font-weight:bold;display:none;z-index:4}
  .ms-ro-meldung.an{display:block}
  /* Laufband, Nachtflug, Rutsche */
  .ms-lb-teil{position:absolute;left:0;top:0;line-height:1;pointer-events:none;will-change:transform}
  .ms-lb-teil.hell{color:#fff;opacity:.75}
  .ms-lb-teil.fern{opacity:.28;filter:grayscale(.6)}   /* Hintergrund klar blasser als Hindernisse */
  .ms-nf-polly,.ms-ru-pingu{position:absolute;left:0;top:0;line-height:1;pointer-events:none;will-change:transform;z-index:3}
  .ms-nf-polly{font-size:2.7rem}
  .ms-ru-pingu{font-size:3rem}
  .ms-nf-polly.geschuetzt,.ms-ru-pingu.geschuetzt{opacity:.5}
  .ms-nf-baum{position:absolute;left:0;top:0;width:54px;box-sizing:border-box;background:#5a3a1c;border:3px solid #000;border-radius:6px;will-change:transform}
  .ms-nf-baum .krone{position:absolute;left:50%;transform:translateX(-50%);font-size:3rem;line-height:1}
  .ms-nf-baum.oben .krone{bottom:-1.4rem}
  .ms-nf-baum.unten .krone{top:-1.6rem}
  .ms-nf-stern{position:absolute;left:0;top:0;font-size:2rem;line-height:1;pointer-events:none;will-change:transform;z-index:2}
  .ms-ru-boden{position:absolute;left:0;right:0;bottom:0;height:56px;border-top:3px solid #000;
    background:repeating-linear-gradient(90deg,#e6f6ff 0 40px,#c3e6fb 40px 80px)}
  .ms-ru-ding{position:absolute;left:0;top:0;font-size:2.3rem;line-height:1;pointer-events:none;will-change:transform;z-index:2}
  .ms-ta-tier.spur::after{content:"";position:absolute;left:50%;top:.6em;width:2.2em;height:2.2em;transform:translate(-50%,-50%);border:3px dashed #ffd23f;border-radius:50%}
  .ms-ta-versteck{z-index:1;font-size:2.6rem}
  .ms-ta-falle.ausgeloest{z-index:3;animation:ms-falle .9s ease-out forwards}
  @keyframes ms-falle{0%{transform:translate(-50%,-50%) scale(1)}40%{transform:translate(-50%,-50%) scale(1.8)}100%{transform:translate(-50%,-50%) scale(1.8);opacity:0}}
  .ms-ta-versteck.weg{opacity:.35}
  /* Obstkorb */
  .ms-ok-boden{position:absolute;left:0;right:0;bottom:0;height:16px;background:#2e6b3a;border-top:3px solid #000}
  .ms-ok-korb{position:absolute;left:0;top:0;font-size:3.6rem;line-height:1;pointer-events:none;will-change:transform}
  .ms-ok-korb.gesperrt{opacity:.55}
  .ms-ok-korb.wackelt{filter:grayscale(1)}
  .ms-ok-ding{position:absolute;left:0;top:0;font-size:2.4rem;line-height:1;pointer-events:none;will-change:transform}
  .ms-ok-ding.muell{filter:grayscale(.6)}
  /* Affen-Schaukel */
  .ms-sc-welt{position:absolute;inset:0;will-change:transform}
  .ms-sc-liane{position:absolute;width:6px;margin-left:-3px;background:#3d7a35;border:2px solid #000;border-radius:3px;transform-origin:50% 0}
  .ms-sc-liane::before{content:"";position:absolute;left:50%;top:-14px;width:34px;height:14px;margin-left:-17px;background:#2a5a25;border:2px solid #000;border-radius:8px}
  .ms-sc-liane span{position:absolute;left:-10px;top:40%;font-size:1.2rem}
  .ms-sc-liane.seil::before{background:#6b4a2b}   /* Seil: Halterung aus Holz statt Blätter */
  .ms-sc-liane.naechste{background:#ffd23f} .ms-sc-liane.seil.naechste{background:#ffd23f !important}
  .ms-sc-affe{position:absolute;left:0;top:0;font-size:2.8rem;line-height:1;pointer-events:none;will-change:transform}
  .ms-sc-ring{position:absolute;left:50%;top:50%;width:3.6rem;height:3.6rem;transform:translate(-50%,-50%);border:4px solid #fff;outline:3px solid #000;border-radius:50%;display:none}
  .ms-sc-ring.an{display:block}
  .ms-sc-netz{position:absolute;left:0;right:0;bottom:0;height:26px;border-top:3px solid #000;
    background:repeating-linear-gradient(45deg,#c9b38a 0 3px,transparent 3px 12px),repeating-linear-gradient(-45deg,#c9b38a 0 3px,transparent 3px 12px),#3b2a14}
  `;
  document.head.appendChild(st);
}

// =====================================================================
// 1) FÜTTERUNGSZEIT – Futter zum richtigen Tier ziehen (oder Tier antippen)
// =====================================================================
function fuettern(buehne, ctx){
  const D = ctx.daten, tiere = D.tiere || [], futter = D.futter || [];
  const tierVon = id => tiere.find(t => t.id === id);
  const wrap = el("div", "ms-fu"), karte = el("div", "ms-futter"), blase = el("p", "ms-blase"), reihe = el("div", "ms-tiere");
  blase.setAttribute("role", "status");
  wrap.append(karte, blase, reihe); buehne.appendChild(wrap);
  let F = null, gesperrt = false, zuletzt = [], timer = null;
  const EN = ctx.sprache === "en", name = x => EN ? x.en : x.de;   // Welten der Klassen 8–10: Texte auf Englisch

  function neueRunde(){
    // Futter wählen, das zuletzt nicht dran war; richtiges Tier aus „haupt“, zwei falsche aus den übrigen
    let f, richtig, falsch;
    for(let i = 0; i < 40; i++){
      f = wuerfle(futter); if(zuletzt.includes(f.en)) continue;
      const passt = new Set(f.haupt.concat(f.auch || []));
      const kandidat = f.haupt.map(tierVon).filter(Boolean);
      const andere = tiere.filter(t => !passt.has(t.id));
      if(kandidat.length && andere.length >= 2){ richtig = wuerfle(kandidat); falsch = mischen(andere).slice(0, 2); break; }
    }
    if(!richtig) return;
    zuletzt = zuletzt.concat(f.en).slice(-4); F = f; gesperrt = false;
    karte.replaceChildren(el("span", "e", f.emoji), el("b", null, f.en), el("small", null, f.de));
    karte.setAttribute("aria-label", (EN ? "" : "Futter: ") + f.en + " (" + f.de + ")");
    karte.style.transform = "";
    reihe.replaceChildren();
    mischen([richtig].concat(falsch)).forEach(t => {
      const b = el("button", "ms-tier"); b.type = "button"; b.dataset.id = t.id;
      b.append(el("span", "e", t.emoji), el("b", null, t.en), el("small", null, t.de));
      b.setAttribute("aria-label", EN ? "give it to " + t.en : t.en + " (" + t.de + ") füttern");
      b.addEventListener("click", () => waehle(t, b));
      reihe.appendChild(b);
    });
  }
  function waehle(t, knopf){
    if(gesperrt || !ctx.laeuft() || !F) return;
    const passt = F.haupt.includes(t.id) || (F.auch || []).includes(t.id);
    if(passt){
      gesperrt = true; knopf.classList.add("satt"); knopf.querySelector("b").textContent = wuerfle(D.lob || ["😋 Yum!"]);
      blase.textContent = "✓ " + name(t) + ": " + name(F) + (EN ? " – perfect!" : " – genau richtig!"); blase.classList.add("an");
      ctx.ton("richtig"); ctx.punkt();
      timer = setTimeout(() => { if(ctx.laeuft()) neueRunde(); }, ctx.reduziert ? 450 : 650);
    } else {
      // ab 0.10: kein Durchprobieren – Herz weg, richtiges Tier kurz zeigen, dann neues Futter
      gesperrt = true; knopf.classList.add("nein"); if(ctx.fehler) ctx.fehler();
      blase.textContent = "✗ " + fuelle(t.witz || (EN ? "“{futter}? No, thanks!”" : "„{futter}? Nein danke!“"), { futter: name(F) }); blase.classList.add("an");
      reihe.querySelectorAll(".ms-tier").forEach(b => { const x = tierVon(b.dataset.id); b.disabled = true; if(x && (F.haupt.includes(x.id) || (F.auch || []).includes(x.id))) b.classList.add("satt"); });
      ctx.ton("falsch");
      timer = setTimeout(() => { if(ctx.laeuft()) neueRunde(); }, ctx.reduziert ? 1600 : 1300);
    }
  }
  // Ziehen mit dem Finger (Pointer Events), Loslassen über einem Tier = füttern
  let zug = null;
  const tierUnter = (x, y) => { karte.style.visibility = "hidden"; const e = document.elementFromPoint(x, y); karte.style.visibility = ""; return e && e.closest && e.closest(".ms-tier"); };
  karte.addEventListener("pointerdown", e => {
    if(gesperrt) return; e.preventDefault();
    try { karte.setPointerCapture(e.pointerId); } catch(err){}
    zug = { id: e.pointerId, x: e.clientX, y: e.clientY }; karte.classList.add("zieht"); karte.classList.remove("zurueck");
  });
  karte.addEventListener("pointermove", e => {
    if(!zug || e.pointerId !== zug.id) return;
    karte.style.transform = "translate(" + (e.clientX - zug.x) + "px," + (e.clientY - zug.y) + "px)";
    reihe.querySelectorAll(".ms-tier").forEach(b => b.classList.remove("ziel"));
    const t = tierUnter(e.clientX, e.clientY); if(t && !t.disabled) t.classList.add("ziel");
  });
  const loslassen = e => {
    if(!zug || e.pointerId !== zug.id) return;
    const t = tierUnter(e.clientX, e.clientY); zug = null;
    karte.classList.remove("zieht"); karte.classList.add("zurueck"); karte.style.transform = "";
    reihe.querySelectorAll(".ms-tier").forEach(b => b.classList.remove("ziel"));
    if(t && !t.disabled){ const tier = tierVon(t.dataset.id); if(tier) waehle(tier, t); }
  };
  karte.addEventListener("pointerup", loslassen); karte.addEventListener("pointercancel", loslassen);
  neueRunde();
  return () => { clearTimeout(timer); };
}

// =====================================================================
// 2) TASCHENLAMPEN-SUCHE – im Dunkeln Tiere anleuchten (Licht kurz draufhalten)
// =====================================================================
function taschenlampe(buehne, ctx){
  const D = ctx.daten, ziel = ctx.ziel, HALTEN = 0.5;   // so lange (Sekunden) muss das Licht auf dem Tier bleiben
  const dunkel = el("div", "ms-ta-dunkel"); buehne.appendChild(dunkel);
  buehne.tabIndex = 0; buehne.setAttribute("aria-label", (ctx.titel || sp(ctx, "Taschenlampen-Suche", "Torch search")) + sp(ctx, ". Mit dem Finger oder den Pfeiltasten leuchten.", ". Shine the light with your finger or the arrow keys."));
  const W = () => buehne.clientWidth, H = () => buehne.clientHeight;
  const plaetze = [];
  const frei = (x, y, d) => plaetze.every(p => Math.hypot(p.x - x, p.y - y) > d);
  function platz(d){ for(let i = 0; i < 200; i++){ const x = 0.1 + Math.random() * 0.8, y = 0.2 + Math.random() * 0.68; if(frei(x, y, d)){ plaetze.push({ x, y }); return { x, y }; } } const p = { x: Math.random() * .8 + .1, y: Math.random() * .68 + .2 }; plaetze.push(p); return p; }
  const kulisse = D.kulisse || ["🌳"];
  const tiere = mischen(D.nachtTiere || []).slice(0, ziel).map((t, i) => {
    const p = platz(0.2), d = el("div", "ms-ta-tier"); d.append(document.createTextNode(t.emoji), el("span", "schild", "✓ " + t.en + " = " + t.de));
    if(p.x < 0.3) d.classList.add("links"); else if(p.x > 0.7) d.classList.add("rechts");   // Namensschild am Rand nach innen rücken
    d.style.left = p.x * 100 + "%"; d.style.top = p.y * 100 + "%"; buehne.insertBefore(d, dunkel);
    if(i % 2 === 0){   // jedes zweite Tier steckt halb hinter einem Busch
      const v = el("div", "ms-ta-ding ms-ta-versteck", wuerfle(["🌿", "🌳", "🪨", "🌾"]));
      v.style.left = (p.x * 100 + (Math.random() < .5 ? -2.5 : 2.5)) + "%"; v.style.top = (p.y * 100 + 3) + "%"; buehne.insertBefore(v, dunkel);
      return { t, p, d, v, zeit: 0, gefunden: false };
    }
    return { t, p, d, zeit: 0, gefunden: false };
  });
  // Fallen: nicht zu lange anleuchten, sonst kostet es ein Herz (Daten: fallen [{ emoji, text }])
  const fallen = mischen(D.fallen || [{ emoji: "🕷️", text: "Iiih, eine Spinne!" }]).concat(mischen(D.fallen || [])).slice(0, 3).map(f => {
    const p = platz(0.2), d = el("div", "ms-ta-tier ms-ta-falle", f.emoji);
    d.style.left = p.x * 100 + "%"; d.style.top = p.y * 100 + "%"; buehne.insertBefore(d, dunkel);
    return { f, p, d, zeit: 0, weg: false };
  });
  kulisse.forEach(k => { const p = platz(0.1), d = el("div", "ms-ta-ding", k); d.style.left = p.x * 100 + "%"; d.style.top = p.y * 100 + "%"; buehne.insertBefore(d, buehne.firstChild); });
  let lx = W() / 2, ly = H() / 2, raf = 0, t0 = 0;
  const radius = () => Math.max(48, Math.min(W(), H()) * 0.115);
  function schritt(t){
    const dt = Math.min(0.05, (t - (t0 || t)) / 1000); t0 = t;
    if(!ctx.laeuft()){ raf = 0; return; }
    const r = radius();
    dunkel.style.background = "radial-gradient(circle at " + lx + "px " + ly + "px, rgba(255,240,180,.10) 0, rgba(255,240,180,.06) " + (r * 0.7) + "px, rgba(3,6,18,.99) " + r + "px)";
    tiere.forEach(o => {
      if(o.gefunden) return;
      const imLicht = Math.hypot(o.p.x * W() - lx, o.p.y * H() - ly) < r * 0.6;
      o.zeit = imLicht ? o.zeit + dt : Math.max(0, o.zeit - dt * 2);
      o.d.classList.toggle("spur", imLicht);
      if(o.zeit >= HALTEN){
        o.gefunden = true; o.d.classList.remove("spur"); o.d.classList.add("gefunden"); if(o.v) o.v.classList.add("weg");
        ctx.ton("richtig"); ctx.sage("🔦 " + o.t.en + " = " + o.t.de); ctx.punkt();
      }
    });
    fallen.forEach(o => {
      if(o.weg) return;
      const imLicht = Math.hypot(o.p.x * W() - lx, o.p.y * H() - ly) < r * 0.6;
      o.zeit = imLicht ? o.zeit + dt : Math.max(0, o.zeit - dt * 2);
      if(o.zeit >= HALTEN + 0.15){
        o.weg = true; o.d.classList.add("ausgeloest"); setTimeout(() => o.d.remove(), 900);
        ctx.ton("falsch"); ctx.sage("💥 " + o.f.text); if(ctx.fehler) ctx.fehler();
      }
    });
    raf = requestAnimationFrame(schritt);
  }
  const setze = e => { const r = buehne.getBoundingClientRect(); lx = clamp(e.clientX - r.left, 0, r.width); ly = clamp(e.clientY - r.top, 0, r.height); };
  const unten = e => { if(!ctx.laeuft()) return; e.preventDefault(); try { buehne.setPointerCapture(e.pointerId); } catch(err){} setze(e); };
  const bewegt = e => { if(!ctx.laeuft()) return; if(e.pointerType === "mouse" || e.buttons || e.pressure > 0) setze(e); };
  const taste = e => {
    const s = 22, m = { ArrowLeft: [-s, 0], ArrowRight: [s, 0], ArrowUp: [0, -s], ArrowDown: [0, s] }[e.key];
    if(!m || !ctx.laeuft()) return; e.preventDefault(); lx = clamp(lx + m[0], 0, W()); ly = clamp(ly + m[1], 0, H());
  };
  buehne.addEventListener("pointerdown", unten); buehne.addEventListener("pointermove", bewegt); buehne.addEventListener("keydown", taste);
  raf = requestAnimationFrame(schritt); setTimeout(() => { try { buehne.focus({ preventScroll: true }); } catch(e){} }, 50);
  return () => { cancelAnimationFrame(raf); buehne.removeEventListener("pointerdown", unten); buehne.removeEventListener("pointermove", bewegt); buehne.removeEventListener("keydown", taste); buehne.removeAttribute("tabindex"); };
}

// =====================================================================
// 3) ROBBEN-JONGLAGE – Robbe unter den Ball schieben, Ball springt auf der Nase
// =====================================================================
function seeloewe(buehne, ctx){
  const D = ctx.daten;
  const ball = el("div", "ms-ro-ball", D.ball || "🏐"), robbe = el("div", "ms-ro-robbe", D.robbe || "🦭"), boden = el("div", "ms-ro-boden"), meldung = el("div", "ms-ro-meldung");
  if(D.boden) boden.style.background = D.boden;   // eigener Boden (z. B. Raumstation statt Wasser)
  buehne.append(boden, robbe, ball, meldung);
  buehne.tabIndex = 0; buehne.setAttribute("aria-label", (ctx.titel || sp(ctx, "Robben-Jonglage", "Seal juggling")) + sp(ctx, ". Figur mit dem Finger oder den Pfeiltasten bewegen.", ". Move with your finger or the arrow keys."));
  const W = () => buehne.clientWidth, H = () => buehne.clientHeight;
  const g = ctx.reduziert ? 520 : 820;            // Schwerkraft (Pixel pro Sekunde²) – bei „Bewegung reduzieren“ langsamer
  const RB = 22, RW = 70;                         // Ball-Radius, halbe Robbenbreite (Trefferzone)
  let rx = W() / 2, bx, by, vx, vy, pause = 0, raf = 0, t0 = 0, zielX = rx;
  const nase = () => H() - 14 - 62;               // Höhe der Robbennase
  // Neuer Ball irgendwo oben, nicht direkt über der Figur – man muss sich bewegen
  function neuerBall(){ let x = rx; for(let i = 0; i < 20 && Math.abs(x - rx) < 90; i++) x = RB + Math.random() * (W() - 2 * RB);
    bx = x; by = 70; vx = (Math.random() - .5) * 140; vy = 0; }
  neuerBall();
  function schritt(t){
    const dt = Math.min(0.033, (t - (t0 || t)) / 1000); t0 = t;
    if(!ctx.laeuft()){ raf = 0; return; }
    rx += (zielX - rx) * Math.min(1, dt * 14);    // Robbe folgt dem Finger weich
    rx = clamp(rx, RW * .6, W() - RW * .6);
    if(pause > 0){ pause -= dt; if(pause <= 0){ meldung.classList.remove("an"); neuerBall(); } }
    else {
      vy += g * dt; bx += vx * dt; by += vy * dt;
      if(bx < RB){ bx = RB; vx = Math.abs(vx); } if(bx > W() - RB){ bx = W() - RB; vx = -Math.abs(vx); }
      if(vy > 0 && by + RB >= nase() && by + RB <= nase() + 30 && Math.abs(bx - rx) < RW){
        by = nase() - RB; const h = H() * 0.62; vy = -Math.sqrt(2 * g * h);
        vx = clamp((bx - rx) * 4 + (Math.random() < .5 ? -1 : 1) * (60 + Math.random() * 90), -260, 260);   // immer etwas zur Seite
        ctx.ton("richtig"); ctx.punkt();
      }
      if(by - RB > H()){ meldung.textContent = "💦 " + wuerfle(D.platsch || ["Platsch!"]); meldung.classList.add("an"); pause = ctx.reduziert ? 1 : 0.7; ctx.ton("falsch"); if(ctx.fehler) ctx.fehler(); }
    }
    ball.style.transform = "translate(" + (bx - RB) + "px," + (by - RB) + "px)";
    robbe.style.transform = "translate(" + (rx - 36) + "px," + (H() - 14 - 70) + "px)";
    raf = requestAnimationFrame(schritt);
  }
  const setze = e => { const r = buehne.getBoundingClientRect(); zielX = clamp(e.clientX - r.left, 0, r.width); };
  const unten = e => { if(!ctx.laeuft()) return; e.preventDefault(); try { buehne.setPointerCapture(e.pointerId); } catch(err){} setze(e); };
  const bewegt = e => { if(ctx.laeuft()) setze(e); };
  const taste = e => { const m = { ArrowLeft: -40, ArrowRight: 40 }[e.key]; if(!m || !ctx.laeuft()) return; e.preventDefault(); zielX = clamp(zielX + m, 0, W()); };
  buehne.addEventListener("pointerdown", unten); buehne.addEventListener("pointermove", bewegt); buehne.addEventListener("keydown", taste);
  raf = requestAnimationFrame(schritt); setTimeout(() => { try { buehne.focus({ preventScroll: true }); } catch(e){} }, 50);
  return () => { cancelAnimationFrame(raf); buehne.removeEventListener("pointerdown", unten); buehne.removeEventListener("pointermove", bewegt); buehne.removeEventListener("keydown", taste); buehne.removeAttribute("tabindex"); };
}


// =====================================================================
// 4) OBSTKORB – Korb mit dem Finger schieben, Obst fangen, Müll ausweichen
// =====================================================================
function obstkorb(buehne, ctx){
  const D = ctx.daten, obst = D.obst || [{ emoji: "🍎", en: "apple", de: "Apfel" }], muell = D.muell || ["🪨"];
  const korb = el("div", "ms-ok-korb", "🧺"), meldung = el("div", "ms-ro-meldung"), boden = el("div", "ms-ok-boden");
  buehne.append(boden, korb, meldung);
  buehne.tabIndex = 0; buehne.setAttribute("aria-label", (ctx.titel || sp(ctx, "Obstkorb", "Fruit basket")) + sp(ctx, ". Korb mit dem Finger oder den Pfeiltasten bewegen.", ". Move the basket with your finger or the arrow keys."));
  const W = () => buehne.clientWidth, H = () => buehne.clientHeight;
  const KB = 46;                                   // halbe Korbbreite (Fangzone)
  const korbY = () => H() - 74;                    // Höhe des Korbrands
  let kx = W() / 2, zielX = kx, dinge = [], raf = 0, t0 = 0, neu = 0.3, gesperrt = 0, gefangen = 0, mtimer = null;
  const tempo = () => (ctx.reduziert ? 120 : 165) + gefangen * (ctx.reduziert ? 4 : 7);   // fällt langsam schneller
  function zeige(text){ meldung.textContent = text; meldung.classList.add("an"); clearTimeout(mtimer); mtimer = setTimeout(() => meldung.classList.remove("an"), 900); }
  function neuesDing(){
    const istObst = Math.random() < 0.72, o = istObst ? wuerfle(obst) : null;
    const d = el("div", "ms-ok-ding", istObst ? o.emoji : wuerfle(muell));
    if(!istObst) d.classList.add("muell");
    buehne.insertBefore(d, meldung);
    dinge.push({ d, o, x: 24 + Math.random() * (W() - 48), y: -30, v: tempo() * (0.85 + Math.random() * 0.3) });
  }
  function schritt(t){
    const dt = Math.min(0.033, (t - (t0 || t)) / 1000); t0 = t;
    if(!ctx.laeuft()){ raf = 0; return; }
    kx += (zielX - kx) * Math.min(1, dt * 16); kx = clamp(kx, KB, W() - KB);
    if(gesperrt > 0) gesperrt -= dt;
    neu -= dt; if(neu <= 0){ neuesDing(); neu = (ctx.reduziert ? 1.0 : 0.75) * (0.8 + Math.random() * 0.4); }
    for(let i = dinge.length - 1; i >= 0; i--){
      const g = dinge[i]; g.y += g.v * dt;
      if(g.y >= korbY() - 10 && g.y <= korbY() + 22 && Math.abs(g.x - kx) < KB && gesperrt <= 0){
        g.d.remove(); dinge.splice(i, 1);
        if(g.o){ gefangen++; ctx.ton("richtig"); zeige("✓ " + g.o.emoji + " " + g.o.en + " = " + g.o.de); ctx.punkt(); }
        else { ctx.ton("falsch"); if(ctx.fehler) ctx.fehler(); zeige("✗ " + wuerfle(D.autsch || ["Autsch!"])); gesperrt = 0.7; korb.classList.add("wackelt"); setTimeout(() => korb.classList.remove("wackelt"), 700); }
        continue;
      }
      if(g.y > H() + 30){ g.d.remove(); dinge.splice(i, 1); continue; }
      g.d.style.transform = "translate(" + (g.x - 20) + "px," + (g.y - 20) + "px)";
    }
    korb.style.transform = "translate(" + (kx - 32) + "px," + (korbY() - 18) + "px)";
    korb.classList.toggle("gesperrt", gesperrt > 0);
    raf = requestAnimationFrame(schritt);
  }
  const setze = e => { const r = buehne.getBoundingClientRect(); zielX = clamp(e.clientX - r.left, 0, r.width); };
  const unten = e => { if(!ctx.laeuft()) return; e.preventDefault(); try { buehne.setPointerCapture(e.pointerId); } catch(err){} setze(e); };
  const bewegt = e => { if(ctx.laeuft()) setze(e); };
  const taste = e => { const m = { ArrowLeft: -45, ArrowRight: 45 }[e.key]; if(!m || !ctx.laeuft()) return; e.preventDefault(); zielX = clamp(zielX + m, 0, W()); };
  buehne.addEventListener("pointerdown", unten); buehne.addEventListener("pointermove", bewegt); buehne.addEventListener("keydown", taste);
  raf = requestAnimationFrame(schritt); setTimeout(() => { try { buehne.focus({ preventScroll: true }); } catch(e){} }, 50);
  return () => { cancelAnimationFrame(raf); clearTimeout(mtimer); buehne.removeEventListener("pointerdown", unten); buehne.removeEventListener("pointermove", bewegt); buehne.removeEventListener("keydown", taste); buehne.removeAttribute("tabindex"); };
}

// =====================================================================
// 5) AFFEN-SCHAUKEL – im richtigen Moment tippen, dann springt der Affe zur nächsten Liane
//    Der richtige Moment ist großzügig (Ring ⭕ um den Affen), damit es auch mit
//    leicht verzögertem Touch klappt. Daneben = Netz, ohne Strafe.
// =====================================================================
function schaukel(buehne, ctx){
  const D = ctx.daten;
  const welt = el("div", "ms-sc-welt"), affe = el("div", "ms-sc-affe", D.affe || "🐒"), ring = el("div", "ms-sc-ring"), netz = el("div", "ms-sc-netz"), meldung = el("div", "ms-ro-meldung");
  buehne.append(welt, netz, meldung); welt.append(affe); affe.appendChild(ring);
  buehne.tabIndex = 0; buehne.setAttribute("aria-label", (ctx.titel || sp(ctx, "Affen-Schaukel", "Swing")) + sp(ctx, ". Tippen oder Leertaste, wenn der Ring erscheint.", ". Tap or press space when the ring appears."));
  const W = () => buehne.clientWidth, H = () => buehne.clientHeight;
  const ABSTAND = () => Math.min(W() * 0.55, 260), L = () => Math.min(H() * 0.48, 230), OBEN = 54;
  const A = 0.62, PERIODE = ctx.reduziert ? 2.3 : 1.7, w = 2 * Math.PI / PERIODE;
  let lianen = [], nr = 0, phase = -Math.PI / 2, zustand = "schwingt", flug = null, kamera = 0, kamZiel = 0, raf = 0, t0 = 0, mtimer = null;
  function liane(i){ const d = el("div", "ms-sc-liane"); if(D.seil){ d.style.background = D.seil; d.classList.add("seil"); }
    const deko = D.seilDeko != null ? D.seilDeko : "🍃"; if(deko) d.appendChild(el("span", null, deko)); welt.insertBefore(d, affe); lianen[i] = d; return d; }
  for(let i = 0; i < 3; i++) liane(i);
  const anker = i => ({ x: W() * 0.28 + i * ABSTAND(), y: OBEN });
  const winkel = () => A * Math.sin(phase), drehung = () => A * w * Math.cos(phase);
  const ende = (i, th) => { const a = anker(i); return { x: a.x + Math.sin(th) * L(), y: a.y + Math.cos(th) * L() }; };
  const imFenster = () => { const th = winkel(), v = drehung(); return (v > 0 && th > 0.12) || (v <= 0 && th > A * 0.7); };   // Vorwärtsschwung bis kurz nach dem höchsten Punkt
  function zeige(text){ meldung.textContent = text; meldung.classList.add("an"); clearTimeout(mtimer); mtimer = setTimeout(() => meldung.classList.remove("an"), 1000); }
  function springen(){
    if(!ctx.laeuft() || zustand !== "schwingt") return;
    const start = ende(nr, winkel());
    if(imFenster()){
      if(!lianen[nr + 2]) liane(nr + 2);
      const ziel = { x: anker(nr + 1).x + Math.sin(-0.35) * L(), y: OBEN + Math.cos(-0.35) * L() };
      flug = { art: "sprung", t: 0, dauer: 0.5, start, ziel }; zustand = "fliegt";
    } else {
      flug = { art: "fall", t: 0, dauer: 0.6, start, ziel: { x: start.x + drehung() * 40, y: H() - 34 } }; zustand = "fliegt";
      ctx.ton("falsch"); if(ctx.fehler) ctx.fehler(); zeige((D.netzZeichen || "🕸️") + " " + wuerfle(D.netz || ["Ins Netz! Nochmal!"]));
    }
  }
  function schritt(t){
    const dt = Math.min(0.033, (t - (t0 || t)) / 1000); t0 = t;
    if(!ctx.laeuft()){ raf = 0; return; }
    let pos;
    if(zustand === "schwingt"){ phase += w * dt; pos = ende(nr, winkel()); }
    else {
      flug.t += dt; const u = Math.min(1, flug.t / flug.dauer);
      if(flug.art === "sprung"){
        pos = { x: flug.start.x + (flug.ziel.x - flug.start.x) * u, y: flug.start.y + (flug.ziel.y - flug.start.y) * u - Math.sin(u * Math.PI) * 70 };
        if(u >= 1){ nr++; phase = Math.asin(-0.35 / A); zustand = "schwingt"; kamZiel = nr * ABSTAND(); ctx.ton("richtig"); ctx.punkt(); }
      } else {
        pos = { x: flug.start.x + (flug.ziel.x - flug.start.x) * u, y: flug.start.y + (flug.ziel.y - flug.start.y) * u * u };
        if(flug.t >= flug.dauer + 0.5){ phase = -Math.PI / 2; zustand = "schwingt"; }
      }
    }
    kamera += (kamZiel - kamera) * Math.min(1, dt * 6);
    welt.style.transform = "translateX(" + (-kamera) + "px)";
    // Lianen zeichnen: die aktuelle schwingt mit dem Affen, die anderen hängen still
    lianen.forEach((d, i) => {
      if(!d) return; const a = anker(i), th = (i === nr && zustand === "schwingt") ? winkel() : 0;
      d.style.left = a.x + "px"; d.style.top = a.y + "px"; d.style.height = L() + "px"; d.style.transform = "rotate(" + (-th) + "rad)";
      d.classList.toggle("naechste", i === nr + 1);
    });
    affe.style.transform = "translate(" + (pos.x - 26) + "px," + (pos.y - 20) + "px)";
    ring.classList.toggle("an", zustand === "schwingt" && imFenster());
    raf = requestAnimationFrame(schritt);
  }
  const tipp = e => { if(!ctx.laeuft()) return; e.preventDefault(); springen(); };
  const taste = e => { if(e.key === " " || e.key === "Enter"){ e.preventDefault(); springen(); } };
  buehne.addEventListener("pointerdown", tipp); buehne.addEventListener("keydown", taste);
  raf = requestAnimationFrame(schritt); setTimeout(() => { try { buehne.focus({ preventScroll: true }); } catch(e){} }, 50);
  return () => { cancelAnimationFrame(raf); clearTimeout(mtimer); buehne.removeEventListener("pointerdown", tipp); buehne.removeEventListener("keydown", taste); buehne.removeAttribute("tabindex"); };
}

// =====================================================================
// GEMEINSAMER BAUSTEIN: Laufband – Hintergrund, der nach links wandert (Nachtflug, Rutsche)
//   ebenen: [{ zeichen: [...], anzahl, y: [von, bis] (Anteil der Höhe), faktor (Tempo-Anteil), groesse, klasse }]
//   ruhig = true (Bewegung reduzieren): der Hintergrund bleibt stehen
// =====================================================================
function laufband(buehne, ebenen, ruhig){
  const W = () => buehne.clientWidth, H = () => buehne.clientHeight, teile = [];
  ebenen.forEach(eb => { for(let i = 0; i < eb.anzahl; i++){
    const d = el("div", "ms-lb-teil " + (eb.klasse || ""), wuerfle(eb.zeichen)); d.style.fontSize = eb.groesse || "1rem";
    buehne.insertBefore(d, buehne.firstChild);
    teile.push({ d, eb, x: Math.random() * (W() + 60), y: eb.y[0] + Math.random() * (eb.y[1] - eb.y[0]) });
  } });
  const setze = t => { t.d.style.transform = "translate(" + t.x + "px," + (t.y * H()) + "px)"; };
  teile.forEach(setze);
  return { schritt(dt, tempo){ if(ruhig) return; teile.forEach(t => {
    t.x -= tempo * t.eb.faktor * dt;
    if(t.x < -70){ t.x = W() + Math.random() * 60; t.y = t.eb.y[0] + Math.random() * (t.eb.y[1] - t.eb.y[0]); t.d.textContent = wuerfle(t.eb.zeichen); }
    setze(t); }); } };
}
const rechteckTrifft = (cx, cy, r, x1, y1, x2, y2) => { const nx = clamp(cx, x1, x2), ny = clamp(cy, y1, y2); return Math.hypot(cx - nx, cy - ny) < r; };

// =====================================================================
// 6) POLLYS NACHTFLUG – tippen = flattern; zwischen Bäumen hindurch, Sterne sammeln.
//    Anstoßen beendet nichts: Polly taumelt kurz und ist 1 Sekunde „unverwundbar“.
// =====================================================================
function nachtflug(buehne, ctx){
  const D = ctx.daten, F = D.flug || {};
  const W = () => buehne.clientWidth, H = () => buehne.clientHeight;
  const band = laufband(buehne, [{ zeichen: F.himmel || ["✨"], anzahl: 14, y: [0.06, 0.92], faktor: 0.25, groesse: "1.1rem", klasse: "hell" }], ctx.reduziert);
  const polly = el("div", "ms-nf-polly", F.figur || "🦜"), meldung = el("div", "ms-ro-meldung");
  buehne.append(polly, meldung);
  buehne.tabIndex = 0; buehne.setAttribute("aria-label", (ctx.titel || sp(ctx, "Nachtflug", "Night flight")) + sp(ctx, ". Tippen oder Leertaste zum Fliegen.", ". Tap or press space to fly."));
  const tempo = () => clamp(W() * 0.42, 120, 220) * (ctx.reduziert ? 0.7 : 1);   // Tempo passt zur Breite → im Hochformat gleich viel Vorlauf
  const g = ctx.reduziert ? 520 : 680, FLAP = ctx.reduziert ? -240 : -270, RP = 18, BB = 54;
  let px = W() * 0.25, py = H() * 0.45, vy = 0, schutz = 0, baeume = [], sterne = [], raf = 0, t0 = 0, erster = 1.0, mtimer = null;
  function zeige(text){ meldung.textContent = text; meldung.classList.add("an"); clearTimeout(mtimer); mtimer = setTimeout(() => meldung.classList.remove("an"), 900); }
  function stern(x, y){ const d = el("div", "ms-nf-stern", F.stern || "⭐"); buehne.insertBefore(d, polly); sterne.push({ d, x, y }); }
  function neuerBaum(){
    const luecke = clamp(H() * 0.42, 150, 230), mitte = luecke / 2 + 40 + Math.random() * (H() - luecke - 90);
    const oben = el("div", "ms-nf-baum oben"), unten = el("div", "ms-nf-baum unten");
    oben.append(el("span", "krone", F.krone || "🌳")); unten.append(el("span", "krone", F.krone || "🌳"));
    buehne.insertBefore(oben, polly); buehne.insertBefore(unten, polly);
    const b = { x: W() + 10, mitte, luecke, oben, unten }; baeume.push(b);
    stern(b.x + BB / 2, mitte);
    if(Math.random() < 0.5) stern(b.x + BB / 2 + tempo() * 0.95, 60 + Math.random() * (H() - 140));   // Bonusstern zwischen den Bäumen
  }
  function flattern(){ if(!ctx.laeuft()) return; vy = FLAP; polly.classList.add("flap"); setTimeout(() => polly.classList.remove("flap"), 120); }
  function schritt(t){
    const dt = Math.min(0.033, (t - (t0 || t)) / 1000); t0 = t;
    if(!ctx.laeuft()){ raf = 0; return; }
    const v = tempo(); band.schritt(dt, v);
    vy += g * dt; py += vy * dt;
    if(py < RP){ py = RP; vy = 0; }
    if(py > H() - RP - 6){ py = H() - RP - 6; vy = FLAP * 0.7; }   // Boden federt sanft zurück
    if(schutz > 0) schutz -= dt;
    erster -= dt;
    const abstand = clamp(v * 1.9, 200, 420);
    if(erster <= 0 && (!baeume.length || baeume[baeume.length - 1].x < W() - abstand)) neuerBaum();
    for(let i = baeume.length - 1; i >= 0; i--){
      const b = baeume[i]; b.x -= v * dt;
      const obenEnde = b.mitte - b.luecke / 2, untenAnfang = b.mitte + b.luecke / 2;
      b.oben.style.transform = "translate(" + b.x + "px,0)"; b.oben.style.height = obenEnde + "px";
      b.unten.style.transform = "translate(" + b.x + "px," + untenAnfang + "px)"; b.unten.style.height = (H() - untenAnfang) + "px";
      if(schutz <= 0 && (rechteckTrifft(px, py, RP - 3, b.x, 0, b.x + BB, obenEnde) || rechteckTrifft(px, py, RP - 3, b.x, untenAnfang, b.x + BB, H()))){
        schutz = 1.0; vy = 60; ctx.ton("falsch"); if(ctx.fehler) ctx.fehler();  zeige("🪶 " + wuerfle(D.flugAutsch || ["Autsch!"]));
      }
      if(b.x < -BB - 10){ b.oben.remove(); b.unten.remove(); baeume.splice(i, 1); }
    }
    for(let i = sterne.length - 1; i >= 0; i--){
      const s = sterne[i]; s.x -= v * dt;
      if(Math.hypot(s.x - px, s.y - py) < 30){ s.d.remove(); sterne.splice(i, 1); ctx.ton("richtig"); ctx.punkt(); continue; }
      if(s.x < -40){ s.d.remove(); sterne.splice(i, 1); continue; }
      s.d.style.transform = "translate(" + (s.x - 16) + "px," + (s.y - 16) + "px)";
    }
    polly.style.transform = "translate(" + (px - 22) + "px," + (py - 22) + "px) rotate(" + clamp(vy / 12, -25, 35) + "deg)";
    polly.classList.toggle("geschuetzt", schutz > 0);
    raf = requestAnimationFrame(schritt);
  }
  const tipp = e => { if(!ctx.laeuft()) return; e.preventDefault(); flattern(); };
  const taste = e => { if(e.key === " " || e.key === "Enter" || e.key === "ArrowUp"){ e.preventDefault(); flattern(); } };
  buehne.addEventListener("pointerdown", tipp); buehne.addEventListener("keydown", taste);
  raf = requestAnimationFrame(schritt); setTimeout(() => { try { buehne.focus({ preventScroll: true }); } catch(e){} }, 50);
  return () => { cancelAnimationFrame(raf); clearTimeout(mtimer); buehne.removeEventListener("pointerdown", tipp); buehne.removeEventListener("keydown", taste); buehne.removeAttribute("tabindex"); };
}

// =====================================================================
// 7) PINGUIN-RUTSCHE – tippen = springen; über Hindernisse, Fische schnappen.
//    Ein Tipp kurz vor der Landung wird gemerkt (springt sofort wieder ab).
//    Anstoßen: kurz langsamer, 1 Sekunde Schutz, keine Strafe.
// =====================================================================
function rutsche(buehne, ctx){
  const D = ctx.daten, R = D.rutsche || {};
  const W = () => buehne.clientWidth, H = () => buehne.clientHeight;
  const band = laufband(buehne, [
    { zeichen: (R.hintergrund || ["🏔️"]).filter(z => z !== "❄️" && z !== "☁️"), anzahl: 4, y: [0.70, 0.72], faktor: 0.15, groesse: "4.5rem", klasse: "fern" },
    { zeichen: ["☁️"], anzahl: 3, y: [0.08, 0.3], faktor: 0.25, groesse: "2.6rem", klasse: "fern" },
    { zeichen: ["❄️", "·", "❄️"], anzahl: 10, y: [0.05, 0.6], faktor: 0.45, groesse: "1rem", klasse: "hell" }], ctx.reduziert);
  const boden = el("div", "ms-ru-boden"), pingu = el("div", "ms-ru-pingu", R.figur || "🐧"), meldung = el("div", "ms-ro-meldung");
  buehne.append(boden, pingu, meldung);
  buehne.tabIndex = 0; buehne.setAttribute("aria-label", (ctx.titel || sp(ctx, "Rutsche", "Slide")) + sp(ctx, ". Tippen oder Leertaste zum Springen.", ". Tap or press space to jump."));
  const BH = 56, bodenY = () => H() - BH;                       // Oberkante des Eises
  const g = ctx.reduziert ? 1150 : 1500, sprungH = () => clamp(H() * 0.3, 105, 150);
  const grundTempo = () => clamp(W() * 0.45, 140, 240) * (ctx.reduziert ? 0.7 : 1);
  let px = W() * 0.22, py = 0, vy = 0, amBoden = true, vorgemerkt = 0, schutz = 0, bremse = 0, dinge = [], raf = 0, t0 = 0, naechstes = 0.9, bodenVersatz = 0, mtimer = null;
  function zeige(text){ meldung.textContent = text; meldung.classList.add("an"); clearTimeout(mtimer); mtimer = setTimeout(() => meldung.classList.remove("an"), 900); }
  function ding(art, hoch){
    const d = el("div", "ms-ru-ding " + art, art === "fisch" ? (R.fisch || "🐟") : wuerfle(R.hindernisse || ["🧊"]));
    buehne.insertBefore(d, pingu); dinge.push({ d, art, x: W() + 30, h: hoch || 0 });   // h = Höhe über dem Eis
  }
  // Zwei Hindernisse nie so dicht, dass man nach einem Sprung direkt auf dem nächsten landet (fair mit drei Herzen)
  let seitHindernis = 9;
  const flugzeit = () => 2 * Math.sqrt(2 * sprungH() / g);
  function neuesDing(){
    if(Math.random() < 0.6 && seitHindernis > flugzeit() + 0.45){ seitHindernis = 0; ding("hindernis"); if(Math.random() < 0.5) ding("fisch", sprungH() * 0.85); }   // oft schwebt ein Fisch über dem Hindernis
    else ding("fisch", Math.random() < 0.4 ? 0 : sprungH() * (0.5 + Math.random() * 0.4));
  }
  function springen(){
    if(!ctx.laeuft()) return;
    if(amBoden){ vy = -Math.sqrt(2 * g * sprungH()); amBoden = false; pingu.classList.add("sprung"); }
    else vorgemerkt = 0.15;                                      // kurz vor der Landung gedrückt → gleich wieder springen
  }
  function schritt(t){
    const dt = Math.min(0.033, (t - (t0 || t)) / 1000); t0 = t;
    if(!ctx.laeuft()){ raf = 0; return; }
    if(bremse > 0) bremse -= dt; if(schutz > 0) schutz -= dt; if(vorgemerkt > 0) vorgemerkt -= dt;
    const v = grundTempo() * (bremse > 0 ? 0.5 : 1);
    band.schritt(dt, v);
    if(!ctx.reduziert){ bodenVersatz = (bodenVersatz + v * dt) % 80; boden.style.backgroundPosition = (-bodenVersatz) + "px 0"; }
    if(!amBoden){ vy += g * dt; py += vy * dt; if(py >= 0){ py = 0; vy = 0; amBoden = true; pingu.classList.remove("sprung"); if(vorgemerkt > 0){ vorgemerkt = 0; springen(); } } }
    seitHindernis += dt;
    naechstes -= dt; if(naechstes <= 0){ neuesDing(); naechstes = (ctx.reduziert ? 1.35 : 1.05) * (0.8 + Math.random() * 0.5); }
    const fy = bodenY() + py;                                    // Füße des Pinguins
    for(let i = dinge.length - 1; i >= 0; i--){
      const o = dinge[i]; o.x -= v * dt;
      const oy = bodenY() - o.h;                                 // Unterkante des Dings
      if(o.art === "fisch"){
        if(Math.hypot(o.x - px, (oy - 16) - (fy - 24)) < 36){ o.d.remove(); dinge.splice(i, 1); ctx.ton("richtig"); ctx.punkt(); continue; }
      } else if(schutz <= 0 && Math.abs(o.x - px) < 28 && fy > oy - 30){
        schutz = 1.0; bremse = 0.8; ctx.ton("falsch"); if(ctx.fehler) ctx.fehler();  zeige("💥 " + wuerfle(D.rutscheAutsch || ["Rumms!"]));
      }
      if(o.x < -50){ o.d.remove(); dinge.splice(i, 1); continue; }
      o.d.style.transform = "translate(" + (o.x - 18) + "px," + (oy - 36) + "px)";
    }
    pingu.style.transform = "translate(" + (px - 24) + "px," + (fy - 50) + "px) rotate(" + (amBoden ? -8 : clamp(vy / 25, -20, 20)) + "deg)";
    pingu.classList.toggle("geschuetzt", schutz > 0);
    raf = requestAnimationFrame(schritt);
  }
  const tipp = e => { if(!ctx.laeuft()) return; e.preventDefault(); springen(); };
  const taste = e => { if(e.key === " " || e.key === "Enter" || e.key === "ArrowUp"){ e.preventDefault(); springen(); } };
  buehne.addEventListener("pointerdown", tipp); buehne.addEventListener("keydown", taste);
  raf = requestAnimationFrame(schritt); setTimeout(() => { try { buehne.focus({ preventScroll: true }); } catch(e){} }, 50);
  return () => { cancelAnimationFrame(raf); clearTimeout(mtimer); buehne.removeEventListener("pointerdown", tipp); buehne.removeEventListener("keydown", taste); buehne.removeAttribute("tabindex"); };
}

// =====================================================================
// 8) CODE KNACKEN – Ziffern tippen, Hinweise lesen (für Klasse 8–10)
//    Der Code hat so viele Stellen wie das Ziel (ziel: 4 = vierstelliger Code).
//    Nach jedem Versuch gibt es zu jeder Stelle einen Hinweis als FORM:
//    ● richtige Ziffer am richtigen Platz · ◐ Ziffer kommt vor, aber woanders · ○ kommt nicht vor.
//    Jede geknackte Stelle zählt einen Punkt und bleibt stehen.
//    Daten: KN.minispiele.codeknacker = { ziffern: 5, legende: "…", start: "…", fertig: "…" }
// =====================================================================
function codeknacker(buehne, ctx){
  const D = (ctx.daten && ctx.daten.codeknacker) || {}, n = clamp(ctx.ziel, 3, 5), max = clamp(Math.round(D.ziffern) || 5, n, 9);
  const code = mischen(Array.from({ length: max }, (_, i) => i + 1)).slice(0, n);   // jede Ziffer höchstens einmal
  const fest = Array(n).fill(false), eingabe = Array(n).fill(null), raus = new Set();
  const wrap = el("div", "ms-ck"), legende = el("p", "ms-ck-legende", D.legende || "● right digit, right place · ◐ right digit, wrong place · ○ not in the code");
  const verlauf = el("div", "ms-ck-verlauf"), reihe = el("div", "ms-ck-reihe"), tasten = el("div", "ms-ck-tasten"), meldung = el("p", "ms-ck-meldung", "");
  verlauf.setAttribute("role", "log"); meldung.setAttribute("role", "status");
  wrap.append(legende, verlauf, reihe, meldung, tasten); buehne.appendChild(wrap);
  const NAME = D.namen || sp(ctx, { "●": "richtiger Platz", "◐": "falscher Platz", "○": "nicht im Code" }, { "●": "right place", "◐": "wrong place", "○": "not in the code" });
  let timer = null, gesperrt = false, versuche = 0;
  const MAXV = Math.max(1, Math.round(D.versuche) || 4);   // so viele Versuche hat man (ab 0.10: 4 statt 6, damit Durchprobieren nicht reicht)
  if(ctx.herzenAus) ctx.herzenAus();                        // hier zählen Versuche statt Herzen
  meldung.textContent = (D.start || "Tap " + n + " digits.") + " · " + (D.versuchText || "Tries left: {n}").replace("{n}", MAXV);
  function zeichneReihe(){
    reihe.replaceChildren();
    for(let i = 0; i < n; i++){ const f = el("span", "ms-ck-feld" + (fest[i] ? " fest" : ""), fest[i] ? String(code[i]) : eingabe[i] == null ? "_" : String(eingabe[i])); if(fest[i]) f.setAttribute("aria-label", sp(ctx, "Stelle ", "position ") + (i + 1) + ": " + code[i] + sp(ctx, ", geknackt", ", cracked")); reihe.appendChild(f); }
  }
  function zeichneTasten(){
    tasten.replaceChildren();
    for(let z = 1; z <= max; z++){
      const b = el("button", "ms-ck-taste" + (raus.has(z) ? " raus" : ""), String(z)); b.type = "button";
      if(raus.has(z)) b.setAttribute("aria-label", z + sp(ctx, ", nicht im Code", ", not in the code"));
      b.addEventListener("click", () => tippe(z)); tasten.appendChild(b);
    }
    const loesch = el("button", "ms-ck-taste breit", "⌫"); loesch.type = "button"; loesch.setAttribute("aria-label", sp(ctx, "löschen", "delete")); loesch.addEventListener("click", zurueck); tasten.appendChild(loesch);
  }
  function zurueck(){ if(gesperrt) return; for(let i = n - 1; i >= 0; i--) if(!fest[i] && eingabe[i] != null){ eingabe[i] = null; break; } zeichneReihe(); }
  function tippe(z){
    if(gesperrt || !ctx.laeuft()) return;
    const frei = eingabe.findIndex((v, i) => !fest[i] && v == null); if(frei < 0) return;
    eingabe[frei] = z; ctx.ton("klick"); zeichneReihe();
    if(eingabe.every((v, i) => fest[i] || v != null)) pruefe();
  }
  function pruefe(){
    gesperrt = true; versuche++;
    const versuch = eingabe.map((v, i) => fest[i] ? code[i] : v), zeile = el("div", "ms-ck-zeile"); let neu = 0;
    versuch.forEach((v, i) => {
      const s = v === code[i] ? "●" : code.includes(v) ? "◐" : "○";
      if(s === "○") raus.add(v);
      const f = el("span", "ms-ck-hinweis", v + " " + s); f.setAttribute("aria-label", v + ": " + NAME[s]); zeile.appendChild(f);
      if(s === "●" && !fest[i]){ fest[i] = true; neu++; }
    });
    verlauf.prepend(zeile); while(verlauf.children.length > 2) verlauf.lastChild.remove();   // die letzten zwei Versuche bleiben sichtbar
    for(let i = 0; i < n; i++) eingabe[i] = null;
    zeichneReihe(); zeichneTasten();
    const alle = fest.every(Boolean);
    const rest = MAXV - versuche;
    meldung.textContent = alle ? (D.fertig || "Code cracked.") : (neu ? "● +" + neu + " · " : "") + (D.versuchText || "Tries left: {n}").replace("{n}", rest);
    if(!alle && rest <= 0 && ctx.verloren){ ctx.ton("falsch"); ctx.verloren(); return; }
    ctx.ton(neu ? "richtig" : "falsch");
    for(let k = 0; k < neu; k++) ctx.punkt();
    timer = setTimeout(() => { gesperrt = false; }, 250);
  }
  const taste = e => { if(/^[1-9]$/.test(e.key) && +e.key <= max){ e.preventDefault(); tippe(+e.key); } else if(e.key === "Backspace"){ e.preventDefault(); zurueck(); } };
  buehne.addEventListener("keydown", taste);
  zeichneReihe(); zeichneTasten();
  return () => { clearTimeout(timer); buehne.removeEventListener("keydown", taste); };
}

// =====================================================================
// 9) LASERGITTER – im richtigen Moment durchlaufen (für Klasse 8–10)
//    Ein Laser geht an und aus. Tippen, wenn er AUS ist: Die Figur läuft durch (1 Punkt).
//    Tippen, wenn er AN ist: kurzer Schreck, kein Spielende. AN/AUS steht als Wort da
//    und der Strahl ist durchgezogen oder gestrichelt (nicht nur Farbe).
//    Daten: KN.minispiele.lasergitter = { figur: "🕵️", ziel: "🚪", an: "ON", aus: "OFF", hinweis: "…", autsch: ["…"] }
// =====================================================================
function lasergitter(buehne, ctx){
  const D = (ctx.daten && ctx.daten.lasergitter) || {};
  const bahn = el("div", "ms-lg"), figur = el("div", "ms-lg-figur", D.figur || "🕵️"), strahl = el("div", "ms-lg-strahl"), schild = el("div", "ms-lg-schild"), tor = el("div", "ms-lg-tor", D.ziel || "🚪");
  const hinweis = el("p", "ms-lg-hinweis", D.hinweis || "Tap when the laser is OFF."), meldung = el("div", "ms-ro-meldung");
  bahn.append(hinweis, figur, strahl, schild, tor, meldung); buehne.appendChild(bahn);
  buehne.tabIndex = 0; buehne.setAttribute("aria-label", (D.hinweis || "Tap when the laser is OFF.") + sp(ctx, " Enter = loslaufen.", " Enter = go."));
  let an = true, rest = 0.8, runde = 0, sperre = 0, raf = 0, t0 = 0, mtimer = null, laeuftDurch = 0;
  const dauer = () => { const tempo = Math.max(0.6, 1 - runde * 0.05); return an ? (0.55 + Math.random() * 0.6) * tempo : (0.75 + Math.random() * 0.35) * (ctx.reduziert ? 1.4 : 1); };
  function zeige(text){ meldung.textContent = text; meldung.classList.add("an"); clearTimeout(mtimer); mtimer = setTimeout(() => meldung.classList.remove("an"), 800); }
  function zeichne(){ strahl.classList.toggle("an", an); schild.textContent = an ? (D.an || "ON") : (D.aus || "OFF"); schild.classList.toggle("an", an); }
  function schritt(t){
    const dt = Math.min(0.05, (t - (t0 || t)) / 1000); t0 = t;
    if(!ctx.laeuft()){ raf = 0; return; }
    if(sperre > 0) sperre -= dt;
    if(laeuftDurch > 0){ laeuftDurch -= dt; if(laeuftDurch <= 0){ figur.classList.remove("drueben"); figur.classList.add("sofort"); void figur.offsetWidth; figur.classList.remove("sofort"); runde++; an = true; rest = dauer(); zeichne(); } }
    else { rest -= dt; if(rest <= 0){ an = !an; rest = dauer(); zeichne(); } }
    raf = requestAnimationFrame(schritt);
  }
  function los(){
    if(!ctx.laeuft() || sperre > 0 || laeuftDurch > 0) return;
    if(an){ sperre = 0.6; ctx.ton("falsch"); if(ctx.fehler) ctx.fehler();  zeige("⚡ " + wuerfle(D.autsch || ["Zap! Wait for OFF."])); if(!ctx.reduziert){ figur.classList.add("zuckt"); setTimeout(() => figur.classList.remove("zuckt"), 500); } return; }
    figur.classList.add("drueben"); laeuftDurch = ctx.reduziert ? 0.25 : 0.4; ctx.ton("richtig"); ctx.punkt();
  }
  const tipp = e => { e.preventDefault(); los(); };
  const taste = e => { if(e.key === " " || e.key === "Enter" || e.key === "ArrowRight"){ e.preventDefault(); los(); } };
  buehne.addEventListener("pointerdown", tipp); buehne.addEventListener("keydown", taste);
  zeichne(); raf = requestAnimationFrame(schritt); setTimeout(() => { try { buehne.focus({ preventScroll: true }); } catch(e){} }, 50);
  return () => { cancelAnimationFrame(raf); clearTimeout(mtimer); buehne.removeEventListener("pointerdown", tipp); buehne.removeEventListener("keydown", taste); buehne.removeAttribute("tabindex"); };
}

// Aussehen der beiden neuen Spiele (einmal einfügen)
if(!document.getElementById("minispielStilNeu")){
  const st = el("style"); st.id = "minispielStilNeu";
  st.textContent = `
  .ms-ck{display:flex;flex-direction:column;align-items:center;justify-content:space-between;height:100%;padding:3.3rem .6rem .7rem;box-sizing:border-box;gap:.3rem;touch-action:manipulation}
  .ms-ck-legende{margin:0;font-size:.85rem;color:#cfd8ff;text-align:center}
  .ms-ck-verlauf{display:flex;flex-direction:column;gap:.25rem;min-height:4.2rem;justify-content:flex-start}
  .ms-ck-zeile{display:flex;gap:.4rem;justify-content:center}
  .ms-ck-hinweis{min-width:3.2rem;text-align:center;background:#0b1736;border:3px solid #fff;border-radius:10px;padding:.15rem .3rem;font:700 1.15rem ui-monospace,Menlo,Consolas,monospace}
  .ms-ck-reihe{display:flex;gap:.5rem}
  .ms-ck-feld{width:3rem;height:3.4rem;display:flex;align-items:center;justify-content:center;background:#010d08;color:#ffd23f;border:4px dashed #ffd23f;border-radius:12px;font:700 1.8rem ui-monospace,Menlo,Consolas,monospace}
  .ms-ck-feld.fest{border-style:solid;border-color:#fff;background:#0b3d2a;color:#fff}
  .ms-ck-meldung{margin:0;min-height:1.4em;font-weight:700}
  .ms-ck-tasten{display:flex;flex-wrap:wrap;gap:.45rem;justify-content:center;max-width:26rem}
  .ms-ck-taste{min-width:3.3rem;min-height:3.3rem;font:700 1.5rem ui-monospace,Menlo,Consolas,monospace;background:#fff;color:#000;border:4px solid #000;border-radius:14px;box-shadow:0 4px 0 #000;cursor:pointer}
  .ms-ck-taste.raus{background:#5b6478;color:#fff;text-decoration:line-through;border-style:dashed}
  .ms-ck-taste.breit{min-width:4.6rem;background:#ffd23f}
  .ms-lg{position:absolute;inset:0;background:linear-gradient(#0b1220 0 72%,#1c2738 72% 100%)}
  .ms-lg-hinweis{position:absolute;left:0;right:0;top:3.3rem;margin:0;text-align:center;font-weight:700;color:#cfd8ff}
  .ms-lg-figur{position:absolute;left:14%;bottom:26%;font-size:4rem;line-height:1;transform:translateX(-50%);transition:left .35s ease-in}
  .ms-lg-figur.drueben{left:82%}
  .ms-lg-figur.sofort{transition:none}
  .ms-lg-figur.zuckt{animation:ms-lg-zuck .12s linear 4}
  @keyframes ms-lg-zuck{50%{transform:translateX(-50%) rotate(-12deg)}}
  .ms-lg-tor{position:absolute;left:86%;bottom:26%;font-size:4rem;line-height:1;transform:translateX(-50%)}
  .ms-lg-strahl{position:absolute;left:50%;top:40%;bottom:26%;width:0;border-left:6px dashed #8a93a8;transform:translateX(-50%);opacity:.7}
  .ms-lg-strahl.an{border-left:14px solid #ff4d6d;opacity:1;box-shadow:0 0 18px 6px rgba(255,77,109,.7)}
  .ms-lg-schild{position:absolute;left:50%;top:38%;transform:translate(-50%,-100%);min-width:4.5rem;text-align:center;font:700 1.5rem ui-monospace,Menlo,Consolas,monospace;background:#fff;color:#000;border:4px dashed #000;border-radius:12px;padding:.1rem .6rem}
  .ms-lg-schild.an{background:#000;color:#fff;border:4px solid #fff}
  @media (prefers-reduced-motion: reduce){ .ms-lg-figur{transition:none} .ms-lg-figur.zuckt{animation:none} }`;
  document.head.appendChild(st);
}

// =====================================================================
// 10) KABEL VERBINDEN – jedes Kabel zur Buchse mit gleicher Farbe UND gleichem Symbol (für Klasse 8–10)
//     Ziehen (oder erst Stecker, dann Buchse antippen). Jeder fertige Schaltkasten = 1 Punkt.
//     Falsche Buchse kostet ein Herz. Farbe + Symbol, damit es auch bei Rot-Grün-Schwäche klappt.
//     Daten: KN.minispiele.kabel = { kasten: "Box", hinweis: "…", fertig: ["…"], autsch: ["…"] }
// =====================================================================
const KABEL = [
  { c: "#ff4d6d", s: "●", n: "red circle" },   { c: "#4dabf7", s: "▲", n: "blue triangle" }, { c: "#ffd23f", s: "■", n: "yellow square" },
  { c: "#51cf66", s: "★", n: "green star" },   { c: "#cc5de8", s: "◆", n: "purple diamond" }, { c: "#ff922b", s: "✚", n: "orange cross" }
];
function kabel(buehne, ctx){
  const D = (ctx.daten && ctx.daten.kabel) || {};
  const wrap = el("div", "ms-kb"), kopf = el("p", "ms-kb-kopf"), feld = el("div", "ms-kb-feld"), meldung = el("div", "ms-ro-meldung");
  const NS = "http://www.w3.org/2000/svg", svg = document.createElementNS(NS, "svg"); svg.setAttribute("class", "ms-kb-svg");
  const links = el("div", "ms-kb-spalte"), rechts = el("div", "ms-kb-spalte");
  feld.append(svg, links, rechts); wrap.append(kopf, feld, meldung); buehne.appendChild(wrap);
  let kasten = 0, kabelNr = [], fertig = new Set(), aktiv = null, zeiger = null, sperre = false, mtimer = null, ntimer = null;
  const anzahl = () => [4, 4, 5, 5, 6][Math.min(kasten, 4)];
  function zeige(t){ meldung.textContent = t; meldung.classList.add("an"); clearTimeout(mtimer); mtimer = setTimeout(() => meldung.classList.remove("an"), 900); }
  function neuerKasten(){
    fertig = new Set(); aktiv = null; zeiger = null; sperre = false;
    kabelNr = mischen(KABEL.map((_, i) => i)).slice(0, anzahl());
    links.replaceChildren(); rechts.replaceChildren();
    kabelNr.forEach(i => links.appendChild(knopf(i, "stecker")));
    mischen(kabelNr).forEach(i => rechts.appendChild(knopf(i, "buchse")));
    kopf.textContent = (D.kasten || "Box") + " " + (kasten + 1) + " · " + (D.hinweis || "Drag each cable to the same colour and symbol.");
    zeichne();
  }
  function knopf(i, art){
    const k = KABEL[i], b = el("button", "ms-kb-" + art, k.s); b.type = "button"; b.dataset.i = i;
    b.style.background = k.c; b.setAttribute("aria-label", (art === "stecker" ? sp(ctx, "Kabel ", "cable ") : sp(ctx, "Buchse ", "socket ")) + k.n); return b;
  }
  const mitte = (e, rechtsSeite) => { const f = feld.getBoundingClientRect(), r = e.getBoundingClientRect(); return { x: (rechtsSeite ? r.left : r.right) - f.left, y: r.top + r.height / 2 - f.top }; };
  function linie(a, b, farbe, gestrichelt){
    const g = document.createElementNS(NS, "g");
    [["#000", 12], [farbe, 7]].forEach(([c, w]) => { const l = document.createElementNS(NS, "line"); l.setAttribute("x1", a.x); l.setAttribute("y1", a.y); l.setAttribute("x2", b.x); l.setAttribute("y2", b.y);
      l.setAttribute("stroke", c); l.setAttribute("stroke-width", w); l.setAttribute("stroke-linecap", "round"); if(gestrichelt) l.setAttribute("stroke-dasharray", "4 12"); g.appendChild(l); });
    svg.appendChild(g);
  }
  function zeichne(){
    svg.replaceChildren();
    fertig.forEach(i => { const s = links.querySelector('[data-i="' + i + '"]'), z = rechts.querySelector('[data-i="' + i + '"]'); if(s && z) linie(mitte(s, false), mitte(z, true), KABEL[i].c); });
    if(aktiv != null && zeiger){ const s = links.querySelector('[data-i="' + aktiv + '"]'); if(s) linie(mitte(s, false), zeiger, KABEL[aktiv].c, true); }
    links.querySelectorAll(".ms-kb-stecker").forEach(b => { b.classList.toggle("fertig", fertig.has(+b.dataset.i)); b.classList.toggle("aktiv", +b.dataset.i === aktiv); });
    rechts.querySelectorAll(".ms-kb-buchse").forEach(b => b.classList.toggle("fertig", fertig.has(+b.dataset.i)));
  }
  function verbinde(i){
    if(aktiv == null || sperre || !ctx.laeuft()) return;
    if(i === aktiv){
      fertig.add(i); aktiv = null; zeiger = null; ctx.ton("klick"); zeichne();
      if(fertig.size === kabelNr.length){ sperre = true; ctx.ton("richtig"); zeige("⚡ " + wuerfle(D.fertig || ["Power on!"])); kasten++; ctx.punkt(); ntimer = setTimeout(() => { if(ctx.laeuft()) neuerKasten(); }, 700); }
    } else {
      ctx.ton("falsch"); zeige("💥 " + wuerfle(D.autsch || ["Sparks! Wrong socket."])); aktiv = null; zeiger = null; zeichne(); if(ctx.fehler) ctx.fehler();
    }
  }
  const punktIn = e => { const f = feld.getBoundingClientRect(); return { x: e.clientX - f.left, y: e.clientY - f.top }; };
  const runter = e => {
    if(!ctx.laeuft() || sperre) return;
    const s = e.target.closest(".ms-kb-stecker"), z = e.target.closest(".ms-kb-buchse");
    if(s && !fertig.has(+s.dataset.i)){ e.preventDefault(); aktiv = +s.dataset.i; zeiger = punktIn(e); zeichne(); return; }
    if(z && aktiv != null && !fertig.has(+z.dataset.i)){ e.preventDefault(); verbinde(+z.dataset.i); }
  };
  const bewegt = e => { if(aktiv == null || !e.buttons && e.pointerType === "mouse") return; zeiger = punktIn(e); zeichne(); };
  const hoch = e => {
    if(aktiv == null) return;
    const ziel = document.elementFromPoint(e.clientX, e.clientY), z = ziel && ziel.closest && ziel.closest(".ms-kb-buchse");
    if(z && !fertig.has(+z.dataset.i)) verbinde(+z.dataset.i);
    else { zeiger = null; zeichne(); }   // Stecker bleibt gewählt: jetzt die Buchse antippen
  };
  // Tastatur (ab 0.8): Enter/Leertaste auf einem Stecker wählt ihn, dann Enter/Leertaste auf der Buchse verbindet
  const taste = e => {
    if(e.detail !== 0 || !ctx.laeuft() || sperre) return;
    const s = e.target.closest(".ms-kb-stecker"), z = e.target.closest(".ms-kb-buchse");
    if(s && !fertig.has(+s.dataset.i)){ aktiv = +s.dataset.i; zeiger = null; zeichne(); }
    else if(z && aktiv != null && !fertig.has(+z.dataset.i)) verbinde(+z.dataset.i);
  };
  wrap.addEventListener("pointerdown", runter); wrap.addEventListener("pointermove", bewegt); wrap.addEventListener("pointerup", hoch); wrap.addEventListener("click", taste);
  const neu = () => zeichne(); window.addEventListener("resize", neu);
  neuerKasten();
  return () => { clearTimeout(mtimer); clearTimeout(ntimer); window.removeEventListener("resize", neu); wrap.removeEventListener("pointerdown", runter); wrap.removeEventListener("pointermove", bewegt); wrap.removeEventListener("pointerup", hoch); wrap.removeEventListener("click", taste); };
}

// =====================================================================
// 11) ANDOCKEN – Raumschiff/Drohne langsam in die Schleuse steuern (für Klasse 9–10)
//     Finger halten = Schub in Richtung Finger. Loslassen = das Schiff treibt weiter.
//     In der Schleuse: langsam genug = 1 Punkt, zu schnell = Herz weg. Trümmer kosten ein Herz.
//     Tempo steht als Zahl und Wort da (nicht nur Farbe).
//     Daten: KN.minispiele.andocken = { figur, dock, truemmer: [...], limit, hinweis, ok, zuSchnell, autsch: [...], gelandet: [...] }
// =====================================================================
function andocken(buehne, ctx){
  const D = (ctx.daten && ctx.daten.andocken) || {};
  const wrap = el("div", "ms-ad"), hinweis = el("p", "ms-ad-hinweis", D.hinweis || "Hold your finger where you want to fly. Dock slowly!");
  const dock = el("div", "ms-ad-dock", D.dock || "DOCK"), schiff = el("div", "ms-ad-schiff", D.figur || "🚀"), tacho = el("div", "ms-ad-tacho"), meldung = el("div", "ms-ro-meldung");
  wrap.append(hinweis, dock, schiff, tacho, meldung); buehne.appendChild(wrap);
  buehne.tabIndex = 0; buehne.setAttribute("aria-label", (D.hinweis || "Hold your finger where you want to fly.") + " Arrow keys = thrust.");
  const LIMIT = Math.max(40, D.limit || 95), A = 300, TOP = 58;
  let W = 0, H = 0, x = 0, y = 0, vx = 0, vy = 0, dx = 0, runde = 0, schub = null, schutz = 0, raf = 0, t0 = 0, mtimer = null, warte = 0;
  const tasten = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }, gedrueckt = new Set();
  let truemmer = [];
  function zeige(t){ meldung.textContent = t; meldung.classList.add("an"); clearTimeout(mtimer); mtimer = setTimeout(() => meldung.classList.remove("an"), 900); }
  function mass(){ W = wrap.clientWidth; H = wrap.clientHeight; }
  function start(){
    mass(); x = W / 2; y = H - 40; vx = 0; vy = 0;
    dx = 60 + Math.random() * Math.max(10, W - 120); dock.style.left = dx + "px"; dock.style.top = TOP + "px";
    truemmer.forEach(t => t.d.remove()); truemmer = [];
    const n = Math.min(3, 1 + runde);
    for(let i = 0; i < n; i++){
      const d = el("div", "ms-ad-truemmer", wuerfle(D.truemmer || ["☄️", "🪨"])); wrap.appendChild(d);
      const ty = TOP + 90 + (H - TOP - 200) * ((i + 0.5) / n);
      truemmer.push({ d, x: Math.random() * W, y: ty, v: (Math.random() < 0.5 ? -1 : 1) * (55 + Math.random() * 45 + runde * 10) });
    }
  }
  function tempo(){ return Math.hypot(vx, vy); }
  function schritt(t){
    const dt = Math.min(0.05, (t - (t0 || t)) / 1000); t0 = t;
    if(!ctx.laeuft()){ raf = 0; return; }
    if(W !== wrap.clientWidth || H !== wrap.clientHeight) mass();
    if(warte > 0){ warte -= dt; if(warte <= 0) start(); }
    else {
      let ax = 0, ay = 0;
      if(schub){ const l = Math.hypot(schub.x - x, schub.y - y); if(l > 8){ ax = (schub.x - x) / l * A; ay = (schub.y - y) / l * A; } }
      gedrueckt.forEach(k => { ax += tasten[k][0] * A; ay += tasten[k][1] * A; });
      vx += ax * dt; vy += ay * dt; const f = Math.pow(0.7, dt); vx *= f; vy *= f;
      const v = tempo(); if(v > 260){ vx *= 260 / v; vy *= 260 / v; }
      x += vx * dt; y += vy * dt;
      if(x < 20){ x = 20; vx = 0; } if(x > W - 20){ x = W - 20; vx = 0; } if(y > H - 24){ y = H - 24; vy = 0; }
      if(schutz > 0) schutz -= dt;
      truemmer.forEach(o => { o.x += o.v * dt; if(o.x < -30) o.x = W + 30; if(o.x > W + 30) o.x = -30; o.d.style.transform = "translate(" + (o.x - 20) + "px," + (o.y - 20) + "px)";
        if(schutz <= 0 && Math.hypot(o.x - x, o.y - y) < 34){ schutz = 1.2; vy = 140; vx = 0; ctx.ton("falsch"); zeige("💥 " + wuerfle(D.autsch || ["Ouch! Debris."])); if(ctx.fehler) ctx.fehler(); } });
      // Schleuse erreicht?
      if(y < TOP + 52){
        if(Math.abs(x - dx) < 44){
          if(tempo() <= LIMIT){ runde++; ctx.ton("richtig"); zeige("✅ " + wuerfle(D.gelandet || ["Docked!"])); ctx.punkt(); warte = 0.6; vx = vy = 0; y = TOP + 30; x = dx; }
          else { ctx.ton("falsch"); zeige("💥 " + (D.zuSchnell || "Too fast! Try again.")); if(ctx.fehler) ctx.fehler(); warte = 0.6; vx = vy = 0; }
        } else if(y < TOP + 20){ y = TOP + 20; vy = Math.max(0, vy); }
      }
    }
    const v = Math.round(tempo()), ok = v <= LIMIT;
    tacho.textContent = "SPEED " + v + " · " + (ok ? (D.ok || "OK ✓") : (D.zuSchnellKurz || "TOO FAST ✗"));
    tacho.classList.toggle("schnell", !ok);
    schiff.style.transform = "translate(" + (x - 22) + "px," + (y - 22) + "px)";
    schiff.classList.toggle("blinkt", schutz > 0 && !ctx.reduziert);
    raf = requestAnimationFrame(schritt);
  }
  const punkt = e => { const r = wrap.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  const runter = e => { e.preventDefault(); schub = punkt(e); };
  const bewegt = e => { if(schub) schub = punkt(e); };
  const hoch = () => { schub = null; };
  const taste = e => { if(tasten[e.key]){ e.preventDefault(); if(e.type === "keydown") gedrueckt.add(e.key); else gedrueckt.delete(e.key); } };
  wrap.addEventListener("pointerdown", runter); wrap.addEventListener("pointermove", bewegt); wrap.addEventListener("pointerup", hoch); wrap.addEventListener("pointercancel", hoch); wrap.addEventListener("lostpointercapture", hoch);
  buehne.addEventListener("keydown", taste); buehne.addEventListener("keyup", taste);
  start(); raf = requestAnimationFrame(schritt); setTimeout(() => { try { buehne.focus({ preventScroll: true }); } catch(e){} }, 50);
  return () => { cancelAnimationFrame(raf); clearTimeout(mtimer); buehne.removeEventListener("keydown", taste); buehne.removeEventListener("keyup", taste); buehne.removeAttribute("tabindex"); };
}

// =====================================================================
// 12) SEQUENZ MERKEN – Felder leuchten nacheinander auf, dann nachtippen (für Klasse 8–10)
//     Jede geschaffte Folge = 1 Punkt, danach kommt ein Feld dazu (Start: 3 Felder).
//     Falsch getippt kostet ein Herz; dieselbe Folge wird dann noch einmal gezeigt.
//     Daten: KN.minispiele.sequenz = { zeichen: [9 Zeichen], schau: "Watch!", du: "Your turn!", autsch: [...], gut: [...] }
// =====================================================================
function sequenz(buehne, ctx){
  const D = (ctx.daten && ctx.daten.sequenz) || {}, Z = (D.zeichen && D.zeichen.length >= 9 ? D.zeichen : ["1", "2", "3", "4", "5", "6", "7", "8", "9"]).slice(0, 9);
  const wrap = el("div", "ms-sq"), status = el("p", "ms-sq-status"), gitter = el("div", "ms-sq-gitter"), meldung = el("div", "ms-ro-meldung");
  status.setAttribute("role", "status"); wrap.append(status, gitter, meldung); buehne.appendChild(wrap);
  const felder = Z.map((z, i) => { const b = el("button", "ms-sq-feld", z); b.type = "button"; b.dataset.i = i; gitter.appendChild(b); return b; });
  let folge = [], pos = 0, zeigt = true, timer = [], mtimer = null;
  const takt = ctx.reduziert ? 750 : 560;
  function zeige(t){ meldung.textContent = t; meldung.classList.add("an"); clearTimeout(mtimer); mtimer = setTimeout(() => meldung.classList.remove("an"), 800); }
  function vorspielen(){
    zeigt = true; pos = 0; gitter.classList.add("zeigt"); status.textContent = "👀 " + (D.schau || "Watch!") + " · " + folge.length;
    folge.forEach((i, k) => {
      timer.push(setTimeout(() => { if(!ctx.laeuft()) return; felder[i].classList.add("an"); ctx.ton("klick"); }, 500 + k * takt));
      timer.push(setTimeout(() => felder[i].classList.remove("an"), 500 + k * takt + takt * 0.65));
    });
    timer.push(setTimeout(() => { zeigt = false; gitter.classList.remove("zeigt"); status.textContent = "👉 " + (D.du || "Your turn!") + " · " + folge.length; }, 500 + folge.length * takt));
  }
  function tipp(i){
    if(zeigt || !ctx.laeuft()) return;
    felder[i].classList.add("an"); setTimeout(() => felder[i].classList.remove("an"), 180);
    if(folge[pos] === i){
      pos++; ctx.ton("klick");
      if(pos === folge.length){ ctx.ton("richtig"); zeige("✅ " + wuerfle(D.gut || ["Correct!"])); ctx.punkt(); folge.push(Math.floor(Math.random() * 9)); zeigt = true; timer.push(setTimeout(() => { if(ctx.laeuft()) vorspielen(); }, 700)); }
    } else {
      ctx.ton("falsch"); zeige("✗ " + wuerfle(D.autsch || ["Wrong order. Watch again."])); zeigt = true; if(ctx.fehler) ctx.fehler();
      timer.push(setTimeout(() => { if(ctx.laeuft()) vorspielen(); }, 900));
    }
  }
  const runter = e => { const f = e.target.closest(".ms-sq-feld"); if(!f) return; e.preventDefault(); tipp(+f.dataset.i); };
  const taste = e => { if(/^[1-9]$/.test(e.key)){ e.preventDefault(); tipp(+e.key - 1); } };
  gitter.addEventListener("pointerdown", runter); buehne.addEventListener("keydown", taste);
  for(let k = 0; k < 3; k++) folge.push(Math.floor(Math.random() * 9));
  vorspielen(); buehne.tabIndex = 0; setTimeout(() => { try { buehne.focus({ preventScroll: true }); } catch(e){} }, 50);
  return () => { timer.forEach(clearTimeout); clearTimeout(mtimer); gitter.removeEventListener("pointerdown", runter); buehne.removeEventListener("keydown", taste); buehne.removeAttribute("tabindex"); };
}

// =====================================================================
// 13) SIGNAL EINSTELLEN – die eigene Welle mit zwei Reglern auf die Zielwelle legen (für Klasse 9–10)
//     Höhe und Anzahl der Wellen (je 1–5). „Lock“ drücken: passt es, kommt ein Funkspruch (1 Punkt),
//     sonst kostet es ein Herz. Zielwelle gestrichelt, eigene Welle durchgezogen (nicht nur Farbe).
//     Daten: KN.minispiele.signal = { funk: ["…"], hoehe: "Height", wellen: "Waves", lock: "Lock signal", ziel: "target", du: "you", autsch: [...] }
// =====================================================================
function signal(buehne, ctx){
  const D = (ctx.daten && ctx.daten.signal) || {};
  const wrap = el("div", "ms-sg"), leg = el("p", "ms-sg-legende", "- - - " + (D.ziel || "target signal") + "   ── " + (D.du || "your signal"));
  const cv = el("canvas", "ms-sg-bild"), funk = el("p", "ms-sg-funk", "📻 …"), regler = el("div", "ms-sg-regler"), lock = el("button", "ms-sg-lock", "📡 " + (D.lock || "Lock signal"));
  lock.type = "button"; funk.setAttribute("role", "status");
  const mach = (txt) => { const l = el("label", "ms-sg-zeile"), s = el("span", null, txt), r = el("input"); r.type = "range"; r.min = 1; r.max = 5; r.step = 1; l.append(s, r); regler.appendChild(l); return r; };
  const rH = mach("↕ " + (D.hoehe || "Height")), rW = mach("↔ " + (D.wellen || "Waves"));
  const meldung = el("div", "ms-ro-meldung");
  wrap.append(leg, cv, funk, regler, lock, meldung); buehne.appendChild(wrap);
  let zh = 3, zw = 3, phase = 0, raf = 0, t0 = 0, mtimer = null, sperre = false, nr = 0;
  const funksprueche = mischen(D.funk || ["We hear you loud and clear.", "Signal received. Stand by.", "Message received. Over."]);
  function zeige(t){ meldung.textContent = t; meldung.classList.add("an"); clearTimeout(mtimer); mtimer = setTimeout(() => meldung.classList.remove("an"), 900); }
  function neuesZiel(){
    const altH = zh, altW = zw;
    do { zh = 1 + Math.floor(Math.random() * 5); zw = 1 + Math.floor(Math.random() * 5); } while((zh === altH && zw === altW) || (zh === +rH.value && zw === +rW.value));
    wrap.dataset.ziel = zh + "," + zw;   // nur für automatische Tests
  }
  function welle(c, w, h, a, n, gestrichelt, farbe){
    c.save(); c.lineWidth = gestrichelt ? 5 : 4; c.strokeStyle = farbe; c.setLineDash(gestrichelt ? [10, 8] : []);
    c.beginPath(); for(let px = 0; px <= w; px += 3){ const yy = h / 2 - Math.sin((px / w) * n * Math.PI * 2 + phase) * a * (h * 0.085); px ? c.lineTo(px, yy) : c.moveTo(px, yy); } c.stroke(); c.restore();
  }
  function zeichne(t){
    const dt = Math.min(0.05, (t - (t0 || t)) / 1000); t0 = t;
    if(!ctx.laeuft()){ raf = 0; return; }
    if(!ctx.reduziert) phase += dt * 2.2;
    const dpr = window.devicePixelRatio || 1, w = cv.clientWidth, h = cv.clientHeight;
    if(cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)){ cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
    const c = cv.getContext("2d"); c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, w, h);
    c.strokeStyle = "rgba(255,255,255,.15)"; c.lineWidth = 1; c.beginPath(); c.moveTo(0, h / 2); c.lineTo(w, h / 2); c.stroke();
    welle(c, w, h, zh, zw, true, "#ffd23f"); welle(c, w, h, +rH.value, +rW.value, false, "#7df9ff");
    raf = requestAnimationFrame(zeichne);
  }
  function pruefe(){
    if(sperre || !ctx.laeuft()) return;
    if(+rH.value === zh && +rW.value === zw){
      sperre = true; ctx.ton("richtig"); funk.textContent = "📻 “" + funksprueche[nr % funksprueche.length] + "”"; nr++; ctx.punkt();
      setTimeout(() => { sperre = false; if(ctx.laeuft()) neuesZiel(); }, 900);
    } else { ctx.ton("falsch"); zeige("📶 " + wuerfle(D.autsch || ["No signal. Keep tuning."])); if(ctx.fehler) ctx.fehler(); }
  }
  lock.addEventListener("click", pruefe);
  rH.value = 1 + Math.floor(Math.random() * 5); rW.value = 1 + Math.floor(Math.random() * 5); neuesZiel();
  raf = requestAnimationFrame(zeichne);
  return () => { cancelAnimationFrame(raf); clearTimeout(mtimer); lock.removeEventListener("click", pruefe); };
}

// Aussehen der vier Spiele für die älteren Klassen (einmal einfügen)
if(!document.getElementById("minispielStilAlt")){
  const st = el("style"); st.id = "minispielStilAlt";
  st.textContent = `
  .ms-kb{position:absolute;inset:0;display:flex;flex-direction:column;padding:3.2rem .6rem .6rem;box-sizing:border-box;background:linear-gradient(#0d1b2a,#1b263b)}
  .ms-kb-kopf{margin:0 0 .3rem;text-align:center;font-weight:700;color:#cfd8ff;font-size:.95rem}
  .ms-kb-feld{position:relative;flex:1;display:flex;justify-content:space-between;align-items:stretch;padding:0 4%}
  .ms-kb-svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1}
  .ms-kb-spalte{display:flex;flex-direction:column;justify-content:space-around;z-index:2}
  .ms-kb-stecker,.ms-kb-buchse{width:3.3rem;height:3.3rem;border:4px solid #000;font:700 1.6rem/1 system-ui,sans-serif;color:#000;cursor:pointer;box-shadow:0 4px 0 #000;touch-action:none}
  .ms-kb-stecker{border-radius:50% 12px 12px 50%}
  .ms-kb-buchse{border-radius:12px 50% 50% 12px;outline:4px dashed #fff;outline-offset:3px}
  .ms-kb-stecker.aktiv{transform:scale(1.15);box-shadow:0 0 0 5px #fff}
  .ms-kb-stecker.fertig,.ms-kb-buchse.fertig{opacity:.55;outline:none;cursor:default}
  .ms-ad{position:absolute;inset:0;overflow:hidden;background:radial-gradient(circle at 30% 20%,#1d2b53,#060913 70%);touch-action:none}
  .ms-ad-hinweis{position:absolute;left:0;right:0;bottom:.3rem;margin:0;text-align:center;font-size:.85rem;color:#cfd8ff;pointer-events:none}
  .ms-ad-dock{position:absolute;transform:translateX(-50%);width:88px;height:46px;border:4px solid #fff;border-top:none;border-radius:0 0 14px 14px;background:repeating-linear-gradient(45deg,#ffd23f 0 10px,#000 10px 20px);
    display:flex;align-items:flex-end;justify-content:center;font:700 .8rem ui-monospace,Menlo,monospace;color:#fff;text-shadow:0 0 3px #000,0 0 3px #000}
  .ms-ad-schiff{position:absolute;left:0;top:0;width:44px;height:44px;font-size:2.4rem;line-height:44px;text-align:center;will-change:transform}
  .ms-ad-schiff.blinkt{opacity:.45}
  .ms-ad-truemmer{position:absolute;left:0;top:0;width:40px;height:40px;font-size:2rem;line-height:40px;text-align:center;will-change:transform}
  .ms-ad-tacho{position:absolute;right:.5rem;bottom:3.2rem;background:#fff;color:#000;border:3px solid #000;border-radius:10px;padding:.1rem .5rem;font:700 .95rem ui-monospace,Menlo,monospace}
  .ms-ad-tacho.schnell{background:#000;color:#fff;border:3px dashed #fff}
  .ms-sq{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.6rem;padding:3.2rem .6rem .6rem;box-sizing:border-box;background:#0b1220}
  .ms-sq-status{margin:0;font-weight:700;font-size:1.15rem;min-height:1.4em}
  .ms-sq-gitter{display:grid;grid-template-columns:repeat(3,1fr);gap:.55rem;width:min(78vw,300px)}
  .ms-sq-feld{aspect-ratio:1;min-height:3.6rem;font:700 1.7rem ui-monospace,Menlo,monospace;background:#1e2a44;color:#cfd8ff;border:4px solid #000;border-radius:14px;box-shadow:0 4px 0 #000;cursor:pointer;touch-action:none}
  .ms-sq-feld.an{background:#ffd23f;color:#000;transform:scale(1.06);box-shadow:0 0 0 5px #fff}
  .ms-sq-gitter.zeigt .ms-sq-feld{cursor:wait}
  .ms-sg{position:absolute;inset:0;display:flex;flex-direction:column;gap:.35rem;padding:3.2rem .7rem .6rem;box-sizing:border-box;background:#06121a}
  .ms-sg-legende{margin:0;text-align:center;font:700 .85rem ui-monospace,Menlo,monospace;color:#cfd8ff}
  .ms-sg-bild{flex:1;min-height:90px;width:100%;background:#000;border:3px solid #2f4a5a;border-radius:12px}
  .ms-sg-funk{margin:0;min-height:1.3em;text-align:center;font-style:italic}
  .ms-sg-regler{display:flex;flex-direction:column;gap:.3rem}
  .ms-sg-zeile{display:flex;align-items:center;gap:.6rem;font-weight:700}
  .ms-sg-zeile span{min-width:6.2rem}
  .ms-sg-zeile input{flex:1;height:2.6rem;accent-color:#7df9ff;touch-action:manipulation}
  .ms-sg-lock{align-self:center;min-height:3rem;padding:0 1.4rem;font-weight:700;font-size:1.1rem;background:#ffd23f;color:#000;border:4px solid #000;border-radius:14px;box-shadow:0 4px 0 #000;cursor:pointer}
  @media (prefers-reduced-motion: reduce){ .ms-sq-feld.an{transform:none} }`;
  document.head.appendChild(st);
}

window.MINISPIELE = Object.freeze({ fuettern, taschenlampe, seeloewe, obstkorb, schaukel, nachtflug, rutsche, codeknacker, lasergitter, kabel, andocken, sequenz, signal });
})();
