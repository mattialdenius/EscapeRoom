/* =====================================================================
   MINISPIELE für den Grammar Escape Room (Belohnung nach dem Zusatzraum)
   ---------------------------------------------------------------------
   Version:  minispiele 0.1 (passt zu App-Version 0.6.4, Testbereich)
   Inhalt:   fuettern (Fütterungszeit), taschenlampe (Taschenlampen-Suche),
             seeloewe (Robben-Jonglage)
   Daten:    Texte, Ziele, Tiere und Futter stehen in daten/klasseX.js unter
             KX.minispiele. Hier steht nur die Spieltechnik.
   Rahmen:   index.html startet ein Spiel, zeigt die 30-Sekunden-Uhr, zählt
             die Punkte und zeigt die Erfolgsmeldung. Jedes Spiel bekommt
             eine leere Bühne (buehne) und Hilfen (ctx) und gibt eine
             Aufräum-Funktion zurück.
   Speichert nichts: kein localStorage, keine Cookies, kein Netzwerk.
   Bedienung: ein Finger (Ziehen oder Tippen), Maus, Tastatur (Pfeile, Enter).

   Änderungsliste:
     0.1 (14.11.2026)  Erste Fassung mit drei Spielen.
   ===================================================================== */
(function(){
"use strict";

// ---------- Hilfen ----------
const wuerfle = l => l[Math.floor(Math.random() * l.length)];
const mischen = l => { const a = l.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
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
    karte.setAttribute("aria-label", "Futter: " + f.en + " (" + f.de + ")");
    karte.style.transform = "";
    reihe.replaceChildren();
    mischen([richtig].concat(falsch)).forEach(t => {
      const b = el("button", "ms-tier"); b.type = "button"; b.dataset.id = t.id;
      b.append(el("span", "e", t.emoji), el("b", null, t.en), el("small", null, t.de));
      b.setAttribute("aria-label", t.en + " (" + t.de + ") füttern");
      b.addEventListener("click", () => waehle(t, b));
      reihe.appendChild(b);
    });
  }
  function waehle(t, knopf){
    if(gesperrt || !ctx.laeuft() || !F) return;
    const passt = F.haupt.includes(t.id) || (F.auch || []).includes(t.id);
    if(passt){
      gesperrt = true; knopf.classList.add("satt"); knopf.querySelector("b").textContent = wuerfle(D.lob || ["😋 Yum!"]);
      blase.textContent = "✓ " + t.de + ": " + F.de + " – genau richtig!"; blase.classList.add("an");
      ctx.ton("richtig"); ctx.punkt();
      timer = setTimeout(() => { if(ctx.laeuft()) neueRunde(); }, ctx.reduziert ? 450 : 650);
    } else {
      knopf.classList.add("nein"); knopf.disabled = true;
      blase.textContent = "✗ " + fuelle(t.witz || "„{futter}? Nein danke!“", { futter: F.de }); blase.classList.add("an");
      ctx.ton("falsch");
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
// 2) TASCHENLAMPEN-SUCHE – im Dunkeln Tiere anleuchten
// =====================================================================
function taschenlampe(buehne, ctx){
  const D = ctx.daten, ziel = ctx.ziel;
  const dunkel = el("div", "ms-ta-dunkel"); buehne.appendChild(dunkel);
  buehne.tabIndex = 0; buehne.setAttribute("aria-label", "Dunkler Zoo. Mit dem Finger oder den Pfeiltasten leuchten.");
  const W = () => buehne.clientWidth, H = () => buehne.clientHeight;
  // Kulisse (Bäume, Steine) und versteckte Tiere: zufällige Plätze mit Abstand zueinander
  const plaetze = [];
  const frei = (x, y, d) => plaetze.every(p => Math.hypot(p.x - x, p.y - y) > d);
  function platz(d){ for(let i = 0; i < 200; i++){ const x = 0.1 + Math.random() * 0.8, y = 0.2 + Math.random() * 0.68; if(frei(x, y, d)){ plaetze.push({ x, y }); return { x, y }; } } const p = { x: Math.random() * .8 + .1, y: Math.random() * .7 + .15 }; plaetze.push(p); return p; }
  const tiere = mischen(D.nachtTiere || []).slice(0, ziel).map(t => {
    const p = platz(0.2), d = el("div", "ms-ta-tier"); d.append(document.createTextNode(t.emoji), el("span", "schild", "✓ " + t.en + " = " + t.de));
    if(p.x < 0.3) d.classList.add("links"); else if(p.x > 0.7) d.classList.add("rechts");   // Namensschild am Rand nach innen rücken
    d.style.left = p.x * 100 + "%"; d.style.top = p.y * 100 + "%"; buehne.appendChild(d); return { t, p, d, gefunden: false };
  });
  (D.kulisse || []).forEach(k => { const p = platz(0.1), d = el("div", "ms-ta-ding", k); d.style.left = p.x * 100 + "%"; d.style.top = p.y * 100 + "%"; d.style.opacity = .9; buehne.insertBefore(d, dunkel); });
  let lx = W() / 2, ly = H() / 2;
  const radius = () => Math.max(55, Math.min(W(), H()) * 0.17);
  function zeichne(){
    const r = radius();
    dunkel.style.background = "radial-gradient(circle at " + lx + "px " + ly + "px, rgba(255,240,180,.10) 0, rgba(255,240,180,.06) " + (r * 0.75) + "px, rgba(3,6,18,.985) " + r + "px)";
    tiere.forEach(o => {
      if(o.gefunden) return;
      const x = o.p.x * W(), y = o.p.y * H();
      if(Math.hypot(x - lx, y - ly) < r * 0.6){
        o.gefunden = true; o.d.classList.add("gefunden"); ctx.ton("richtig");
        ctx.sage("🔦 Gefunden: " + o.t.en + " = " + o.t.de); ctx.punkt();
      }
    });
  }
  const setze = e => { const r = buehne.getBoundingClientRect(); lx = clamp(e.clientX - r.left, 0, r.width); ly = clamp(e.clientY - r.top, 0, r.height); zeichne(); };
  const unten = e => { if(!ctx.laeuft()) return; e.preventDefault(); try { buehne.setPointerCapture(e.pointerId); } catch(err){} setze(e); };
  const bewegt = e => { if(!ctx.laeuft()) return; if(e.pointerType === "mouse" || e.buttons || e.pressure > 0) setze(e); };
  const taste = e => {
    const s = 26, m = { ArrowLeft: [-s, 0], ArrowRight: [s, 0], ArrowUp: [0, -s], ArrowDown: [0, s] }[e.key];
    if(!m || !ctx.laeuft()) return; e.preventDefault(); lx = clamp(lx + m[0], 0, W()); ly = clamp(ly + m[1], 0, H()); zeichne();
  };
  buehne.addEventListener("pointerdown", unten); buehne.addEventListener("pointermove", bewegt); buehne.addEventListener("keydown", taste);
  const groesse = () => zeichne(); window.addEventListener("resize", groesse);
  zeichne(); setTimeout(() => { try { buehne.focus({ preventScroll: true }); } catch(e){} }, 50);
  return () => { buehne.removeEventListener("pointerdown", unten); buehne.removeEventListener("pointermove", bewegt); buehne.removeEventListener("keydown", taste); window.removeEventListener("resize", groesse); buehne.removeAttribute("tabindex"); };
}

// =====================================================================
// 3) ROBBEN-JONGLAGE – Robbe unter den Ball schieben, Ball springt auf der Nase
// =====================================================================
function seeloewe(buehne, ctx){
  const D = ctx.daten;
  const ball = el("div", "ms-ro-ball", D.ball || "🏐"), robbe = el("div", "ms-ro-robbe", D.robbe || "🦭"), boden = el("div", "ms-ro-boden"), meldung = el("div", "ms-ro-meldung");
  buehne.append(boden, robbe, ball, meldung);
  buehne.tabIndex = 0; buehne.setAttribute("aria-label", "Robben-Jonglage. Robbe mit dem Finger oder den Pfeiltasten bewegen.");
  const W = () => buehne.clientWidth, H = () => buehne.clientHeight;
  const g = ctx.reduziert ? 520 : 820;            // Schwerkraft (Pixel pro Sekunde²) – bei „Bewegung reduzieren“ langsamer
  const RB = 22, RW = 70;                         // Ball-Radius, halbe Robbenbreite (Trefferzone)
  let rx = W() / 2, bx, by, vx, vy, pause = 0, raf = 0, t0 = 0, zielX = rx;
  const nase = () => H() - 14 - 62;               // Höhe der Robbennase
  function neuerBall(){ bx = clamp(rx + (Math.random() - .5) * 80, RB, W() - RB); by = 70; vx = (Math.random() - .5) * 60; vy = 0; }
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
        vx = clamp((bx - rx) * 4 + (Math.random() - .5) * 70, -260, 260);
        ctx.ton("richtig"); ctx.punkt();
      }
      if(by - RB > H()){ meldung.textContent = "💦 " + wuerfle(D.platsch || ["Platsch!"]); meldung.classList.add("an"); pause = ctx.reduziert ? 1 : 0.7; ctx.ton("falsch"); }
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

window.MINISPIELE = Object.freeze({ fuettern, taschenlampe, seeloewe });
})();
