<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<title>Cresco Scientiam 5.0 — Delhi Public School Megacity</title>
<meta name="description" content="Cresco Scientiam 5.0 — the interschool science festival presented by Delhi Public School Megacity. Twelve research labs, one command center." />
<meta name="theme-color" content="#08090b" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;900&family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />

<style>
/* ==========================================================================
   CRESCO SCIENTIAM 5.0 — INDEX
   Tokens: Black #08090b · Graphite #131417 · Gunmetal #23252b · Silver #c7c9cd
   White #f4f4f2 · Orange #ff6a1a
   ========================================================================== */
:root{
  --black:#08090b;
  --graphite:#131417;
  --gunmetal:#23252b;
  --gunmetal-2:#33353c;
  --silver:#c7c9cd;
  --silver-dim:#84868c;
  --white:#f4f4f2;
  --orange:#ff6a1a;
  --orange-soft:rgba(255,106,26,0.14);
  --orange-line:rgba(255,106,26,0.4);
  --font-display:'Orbitron', sans-serif;
  --font-head:'Space Grotesk', sans-serif;
  --font-body:'Inter', sans-serif;
  --font-mono:'JetBrains Mono', monospace;
  --ease:cubic-bezier(.16,1,.3,1);
  --container:1180px;
}
*{ margin:0; padding:0; box-sizing:border-box; }
html{ background:var(--black); scroll-behavior:smooth; }
body{
  background:var(--black); color:var(--white); font-family:var(--font-body);
  -webkit-font-smoothing:antialiased; line-height:1.6; overflow-x:hidden;
}
@media (prefers-reduced-motion:reduce){ *{ animation-duration:.01ms !important; transition-duration:.01ms !important; scroll-behavior:auto !important; } }
a{ color:inherit; text-decoration:none; }
button{ font-family:inherit; cursor:pointer; background:none; border:none; }
img{ max-width:100%; display:block; }
::selection{ background:var(--orange); color:var(--black); }

.wrap{ max-width:var(--container); margin:0 auto; padding:0 6vw; }
@media (min-width:1400px){ .wrap{ padding:0 2vw; } }

.eyebrow{ font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; color:var(--orange); margin-bottom:16px; display:flex; align-items:center; gap:10px; }
.eyebrow::before{ content:''; width:22px; height:1px; background:var(--orange); }

/* ============================= NAV ============================= */
#nav{
  position:fixed; top:0; left:0; right:0; z-index:80;
  display:flex; align-items:center; justify-content:space-between;
  padding:22px 6vw; font-family:var(--font-mono); font-size:12px; letter-spacing:.08em;
  backdrop-filter:blur(10px); background:linear-gradient(to bottom, rgba(8,9,11,0.75), transparent);
  transition:background .3s;
}
.brand-mark{ font-family:var(--font-display); font-weight:700; letter-spacing:.14em; font-size:14px; color:var(--white); }
.brand-mark span{ color:var(--orange); }
#nav-links{ display:flex; align-items:center; gap:28px; color:var(--silver); }
#nav-links a:hover{ color:var(--orange); }
.nav-cta{
  border:1px solid var(--gunmetal-2); padding:9px 18px; border-radius:2px; color:var(--white);
  transition:border-color .25s, color .25s;
}
.nav-cta:hover{ border-color:var(--orange); color:var(--orange); }
@media (max-width:720px){ #nav-links a:not(.nav-cta){ display:none; } }

/* ============================= HERO ============================= */
#hero{
  position:relative; min-height:100svh; display:flex; flex-direction:column;
  justify-content:center; overflow:hidden; padding:140px 6vw 90px;
}
#hero-canvas{ position:absolute; inset:0; z-index:0; opacity:.55; }
#hero-grid{
  position:absolute; inset:0; z-index:0; pointer-events:none;
  background-image:linear-gradient(rgba(199,201,205,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(199,201,205,0.05) 1px, transparent 1px);
  background-size:56px 56px;
  -webkit-mask-image:radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 80%);
  mask-image:radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 80%);
}
#hero-vignette{ position:absolute; inset:0; z-index:1; pointer-events:none; background:radial-gradient(ellipse at 50% 20%, transparent 35%, rgba(8,9,11,0.9) 100%); }

.hero-content{ position:relative; z-index:2; max-width:900px; }
.hero-kicker{ font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; color:var(--silver-dim); margin-bottom:22px; }
.hero-kicker b{ color:var(--orange); font-weight:600; }
.hero-title{ font-family:var(--font-head); font-weight:700; letter-spacing:-.02em; line-height:1.02; font-size:clamp(38px,7vw,92px); }
.hero-title .accent{ color:var(--orange); }
.hero-title .out{ -webkit-text-stroke:1px var(--gunmetal-2); color:transparent; }
.hero-sub{ margin:26px 0 40px; max-width:560px; color:var(--silver); font-size:clamp(15px,1.6vw,18px); }

.hero-actions{ display:flex; gap:16px; flex-wrap:wrap; margin-bottom:56px; }
.btn{
  display:inline-flex; align-items:center; gap:10px; padding:16px 30px; border-radius:2px;
  font-family:var(--font-mono); font-size:12px; letter-spacing:.14em; font-weight:500;
  transition:all .3s var(--ease); border:1px solid transparent;
}
.btn-primary{ background:var(--orange); color:var(--black); font-weight:700; }
.btn-primary:hover{ background:#ff7f3d; box-shadow:0 0 30px rgba(255,106,26,0.35); transform:translateY(-2px); }
.btn-ghost{ border-color:var(--gunmetal-2); color:var(--silver); }
.btn-ghost:hover{ border-color:var(--silver); color:var(--white); transform:translateY(-2px); }
.btn svg{ width:15px; height:15px; transition:transform .3s var(--ease); }
.btn-primary:hover svg{ transform:translateX(4px); }

/* Countdown + status readout */
.hero-readout{
  display:flex; flex-wrap:wrap; gap:36px; align-items:flex-end;
  border-top:1px solid var(--gunmetal); padding-top:28px;
}
.countdown{ display:flex; gap:20px; }
.countdown-unit{ display:flex; flex-direction:column; align-items:flex-start; min-width:52px; }
.countdown-num{ font-family:var(--font-mono); font-weight:700; font-size:clamp(22px,2.6vw,30px); color:var(--white); }
.countdown-label{ font-family:var(--font-mono); font-size:9px; letter-spacing:.2em; color:var(--silver-dim); margin-top:4px; }
.status-line{ display:flex; align-items:center; gap:8px; font-family:var(--font-mono); font-size:11px; letter-spacing:.08em; color:var(--silver-dim); }
.status-dot{ width:6px; height:6px; border-radius:50%; background:var(--orange); box-shadow:0 0 8px var(--orange); animation:pulse 2.2s infinite; }
@keyframes pulse{ 0%,100%{ opacity:1; } 50%{ opacity:.3; } }

.scroll-cue{
  position:absolute; bottom:26px; left:50%; transform:translateX(-50%); z-index:2;
  display:flex; flex-direction:column; align-items:center; gap:8px;
  font-family:var(--font-mono); font-size:10px; letter-spacing:.24em; color:var(--silver-dim);
  animation:bob 2.4s infinite ease-in-out;
}
@keyframes bob{ 0%,100%{ transform:translate(-50%,0); } 50%{ transform:translate(-50%,6px); } }
.scroll-cue svg{ width:14px; height:14px; }

/* ============================= REVEAL ============================= */
.reveal{ opacity:0; transform:translateY(28px); transition:opacity .8s var(--ease), transform .8s var(--ease); }
.reveal.in{ opacity:1; transform:none; }

/* ============================= SECTION SHELL ============================= */
section.block{ position:relative; padding:110px 0; }
.block-head{ max-width:640px; margin-bottom:56px; }
.block-title{ font-family:var(--font-head); font-weight:700; font-size:clamp(28px,3.6vw,44px); letter-spacing:-.01em; }
.block-title .accent{ color:var(--orange); }
.block-desc{ color:var(--silver); margin-top:14px; font-size:15px; max-width:520px; }
.hr{ height:1px; background:linear-gradient(to right, transparent, var(--gunmetal-2), transparent); }

/* ============================= IDENTITY (Cr Es Co) ============================= */
#identity{ background:var(--graphite); border-top:1px solid var(--gunmetal); border-bottom:1px solid var(--gunmetal); }
.identity-grid{ display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
@media (max-width:900px){ .identity-grid{ grid-template-columns:1fr; gap:44px; } }

.periodic-console{ display:flex; gap:16px; margin-top:8px; }
.tile{
  width:96px; height:112px; background:linear-gradient(160deg, var(--gunmetal), var(--graphite));
  border:1px solid var(--gunmetal-2); border-radius:6px;
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px;
  color:var(--white); transition:all .3s var(--ease); position:relative;
}
.tile:hover, .tile[aria-expanded="true"]{ border-color:var(--orange); transform:translateY(-4px); box-shadow:0 10px 26px rgba(255,106,26,0.12); }
.tile-num{ font-family:var(--font-mono); font-size:10px; color:var(--silver-dim); align-self:flex-end; margin-right:8px; }
.tile-sym{ font-family:var(--font-display); font-weight:900; font-size:29px; }
.tile-name{ font-family:var(--font-mono); font-size:8px; letter-spacing:.1em; color:var(--silver); }

.atom-display{ display:flex; align-items:center; gap:28px; }
#atom-svg{ width:220px; height:220px; flex:0 0 auto; }
.atom-readout-title{ font-family:var(--font-mono); font-size:17px; font-weight:700; color:var(--white); margin-bottom:8px; }
.atom-readout-config{ font-family:var(--font-mono); font-size:12px; color:var(--orange); line-height:1.9; white-space:pre-line; }
.shell-ring{ fill:none; stroke:var(--gunmetal-2); stroke-width:1; }
.shell-ring.lit{ stroke:rgba(255,106,26,0.22); }
.electron{ fill:var(--orange); filter:drop-shadow(0 0 3px var(--orange)); }
.nucleus{ fill:var(--white); filter:drop-shadow(0 0 8px rgba(255,255,255,.5)); }
@keyframes spin{ from{ transform:rotate(0deg); } to{ transform:rotate(360deg); } }

/* ============================= STATS ============================= */
.stat-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--gunmetal); border:1px solid var(--gunmetal); }
.stat-card{ background:var(--black); padding:34px 22px; text-align:center; }
.stat-num{ font-family:var(--font-display); font-weight:900; font-size:clamp(28px,3.4vw,44px); color:var(--orange); display:block; }
.stat-unit{ font-family:var(--font-mono); font-size:10px; letter-spacing:.16em; color:var(--silver-dim); margin-top:8px; display:block; }
@media (max-width:720px){ .stat-grid{ grid-template-columns:repeat(2,1fr); } }

/* ============================= LABS PREVIEW ============================= */
.labs-preview-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
@media (max-width:980px){ .labs-preview-grid{ grid-template-columns:repeat(2,1fr); } }
@media (max-width:560px){ .labs-preview-grid{ grid-template-columns:1fr; } }
.lab-mini{
  border:1px solid var(--gunmetal); border-radius:6px; padding:20px; background:var(--graphite);
  transition:all .3s var(--ease); position:relative; overflow:hidden;
}
.lab-mini:hover{ border-color:var(--orange-line); transform:translateY(-3px); }
.lab-mini-code{ font-family:var(--font-mono); font-size:10px; color:var(--orange); letter-spacing:.1em; }
.lab-mini-name{ font-family:var(--font-head); font-weight:700; font-size:16px; margin-top:6px; }
.lab-mini-theme{ font-family:var(--font-mono); font-size:10px; color:var(--silver-dim); margin-top:4px; }
.labs-more-row{ margin-top:28px; display:flex; justify-content:center; }

/* ============================= ABOUT / BRIEFING ============================= */
.about-grid{ display:grid; grid-template-columns:1.1fr .9fr; gap:60px; }
@media (max-width:900px){ .about-grid{ grid-template-columns:1fr; gap:36px; } }
.about-body p{ color:var(--silver); margin-bottom:16px; font-size:15px; }
.about-list{ list-style:none; }
.about-list li{
  display:flex; gap:14px; padding:16px 0; border-bottom:1px solid var(--gunmetal);
  font-family:var(--font-mono); font-size:12px; color:var(--silver-dim); letter-spacing:.04em;
}
.about-list li span{ color:var(--orange); }

/* ============================= CTA / FOOTER ============================= */
#cta{ text-align:center; padding:120px 0; }
#cta .block-title{ font-size:clamp(30px,5vw,56px); }
#cta .hero-actions{ justify-content:center; margin-top:30px; }

footer{ border-top:1px solid var(--gunmetal); padding:36px 0 50px; }
.footer-inner{ display:flex; justify-content:space-between; flex-wrap:wrap; gap:16px; font-family:var(--font-mono); font-size:11px; letter-spacing:.08em; color:var(--silver-dim); }
.footer-links{ display:flex; gap:22px; }
.footer-links a:hover{ color:var(--orange); }
</style>
</head>
<body>

<nav id="nav">
  <div class="brand-mark">CRESCO<span>·</span>SCIENTIAM</div>
  <div id="nav-links">
    <a href="#identity">Identity</a>
    <a href="#labs">Labs</a>
    <a href="#about">Mission</a>
    <a class="nav-cta" href="events.html">Research Labs →</a>
  </div>
</nav>

<!-- ============================= HERO ============================= -->
<section id="hero">
  <canvas id="hero-canvas" aria-hidden="true"></canvas>
  <div id="hero-grid" aria-hidden="true"></div>
  <div id="hero-vignette" aria-hidden="true"></div>

  <div class="hero-content">
    <p class="hero-kicker">INTERSCHOOL SCIENCE FESTIVAL · EDITION 05 · PRESENTED BY <b>DELHI PUBLIC SCHOOL MEGACITY</b></p>
    <h1 class="hero-title">
      MISSION CONTROL<br>
      FOR <span class="accent">YOUNG SCIENTISTS</span>
    </h1>
    <p class="hero-sub">Twelve research labs. One command center. Cresco Scientiam 5.0 is where curiosity gets a mission briefing — forensics, robotics, quantum debate, evolutionary biology, and more, all under one roof.</p>

    <div class="hero-actions">
      <a class="btn btn-primary" href="registration.html">
        <span>REGISTER SCHOOL</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
      <a class="btn btn-ghost" href="events.html"><span>EXPLORE RESEARCH LABS</span></a>
    </div>

    <div class="hero-readout">
      <div class="countdown" id="countdown" role="timer" aria-label="Countdown to festival launch">
        <div class="countdown-unit"><span class="countdown-num" id="cd-days">00</span><span class="countdown-label">DAYS</span></div>
        <div class="countdown-unit"><span class="countdown-num" id="cd-hours">00</span><span class="countdown-label">HRS</span></div>
        <div class="countdown-unit"><span class="countdown-num" id="cd-mins">00</span><span class="countdown-label">MIN</span></div>
        <div class="countdown-unit"><span class="countdown-num" id="cd-secs">00</span><span class="countdown-label">SEC</span></div>
      </div>
      <div class="status-line"><span class="status-dot"></span> SYSTEMS NOMINAL — 15–16 OCT 2026, DPS MEGACITY CAMPUS</div>
    </div>
  </div>

  <button class="scroll-cue" aria-label="Scroll down" onclick="document.getElementById('identity').scrollIntoView({behavior:'smooth'})">
    SCROLL
    <svg viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/></svg>
  </button>
</section>

<!-- ============================= IDENTITY ============================= -->
<section class="block" id="identity">
  <div class="wrap identity-grid">
    <div class="reveal">
      <p class="eyebrow">PERIODIC IDENTITY MATRIX</p>
      <h2 class="block-title">THE ELEMENTS OF <span class="accent">CRESCO SCIENTIAM</span></h2>
      <p class="block-desc">Cr · Es · Co isn't just a wordmark — it's chromium, einsteinium and cobalt. Tap an element to resolve its real electron configuration.</p>
      <div class="periodic-console" id="periodic-console">
        <button class="tile" data-el="cr" aria-expanded="true"><span class="tile-num">24</span><span class="tile-sym">Cr</span><span class="tile-name">CHROMIUM</span></button>
        <button class="tile" data-el="es" aria-expanded="false"><span class="tile-num">99</span><span class="tile-sym">Es</span><span class="tile-name">EINSTEINIUM</span></button>
        <button class="tile" data-el="co" aria-expanded="false"><span class="tile-num">27</span><span class="tile-sym">Co</span><span class="tile-name">COBALT</span></button>
      </div>
    </div>
    <div class="reveal atom-display">
      <svg id="atom-svg" viewBox="-200 -200 400 400" role="img" aria-label="Electron shell diagram"></svg>
      <div>
        <p class="atom-readout-title" id="atom-title">CHROMIUM — Cr</p>
        <p class="atom-readout-config" id="atom-config">—</p>
      </div>
    </div>
  </div>
</section>

<!-- ============================= STATS ============================= -->
<section class="block" id="stats">
  <div class="wrap">
    <div class="block-head reveal">
      <p class="eyebrow">MISSION BRIEFING</p>
      <h2 class="block-title">THE NUMBERS BEHIND THE <span class="accent">FESTIVAL</span></h2>
    </div>
    <div class="stat-grid reveal">
      <div class="stat-card"><span class="stat-num" data-count="12">0</span><span class="stat-unit">RESEARCH LABS</span></div>
      <div class="stat-card"><span class="stat-num" data-count="60">0</span><span class="stat-unit">PARTNER SCHOOLS</span></div>
      <div class="stat-card"><span class="stat-num" data-count="4000">0</span><span class="stat-unit">STUDENT PARTICIPANTS</span></div>
      <div class="stat-card"><span class="stat-num" data-count="2">0</span><span class="stat-unit">DAYS ON STATION</span></div>
    </div>
  </div>
</section>

<!-- ============================= LABS PREVIEW ============================= -->
<section class="block" id="labs">
  <div class="wrap">
    <div class="block-head reveal">
      <p class="eyebrow">RESEARCH LABS</p>
      <h2 class="block-title">TWELVE LABS. TWELVE <span class="accent">WORLDS</span>.</h2>
      <p class="block-desc">Each lab is a self-contained world with its own theme, rules and format. Here's a first look — full dossiers live on the Research Labs page.</p>
    </div>
    <div class="labs-preview-grid reveal" id="labs-preview-grid"></div>
    <div class="labs-more-row reveal">
      <a class="btn btn-ghost" href="events.html"><span>VIEW ALL 12 LABS</span></a>
    </div>
  </div>
</section>

<!-- ============================= ABOUT ============================= -->
<section class="block" id="about">
  <div class="wrap about-grid">
    <div class="reveal">
      <p class="eyebrow">MISSION DATABASE</p>
      <h2 class="block-title">WHY <span class="accent">CRESCO SCIENTIAM</span></h2>
      <div class="about-body">
        <p>Cresco Scientiam started as a single school's science fair and has grown into DPS Megacity's flagship interschool festival — a two-day event where students don't just present projects, they compete, build, debate and solve under pressure.</p>
        <p>Edition 5.0 brings the festival's biggest catalogue yet: twelve labs spanning forensics, chemistry, robotics, mathematics, music technology, evolutionary biology, journalism, chess strategy and general knowledge.</p>
      </div>
    </div>
    <ul class="about-list reveal">
      <li><span>01</span> Open to Classes 9–12, all boards welcome</li>
      <li><span>02</span> Team and solo formats across different labs</li>
      <li><span>03</span> Registration is free for all partner schools</li>
      <li><span>04</span> Certificates issued to every registered participant</li>
      <li><span>05</span> On-campus at DPS Megacity, 15–16 October 2026</li>
    </ul>
  </div>
</section>

<!-- ============================= CTA ============================= -->
<section id="cta">
  <div class="wrap">
    <p class="eyebrow" style="justify-content:center;">ACCESS TERMINAL</p>
    <h2 class="block-title">READY TO <span class="accent">LAUNCH</span>?</h2>
    <p class="block-desc" style="margin:14px auto 0;">Registration closes when every dock is filled. Secure your school's berth on the station.</p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="registration.html"><span>REGISTER SCHOOL</span></a>
      <a class="btn btn-ghost" href="events.html"><span>EXPLORE RESEARCH LABS</span></a>
    </div>
  </div>
</section>

<footer>
  <div class="wrap footer-inner">
    <div>CRESCO SCIENTIAM 5.0 — DELHI PUBLIC SCHOOL MEGACITY</div>
    <div class="footer-links">
      <a href="events.html">RESEARCH LABS</a>
      <a href="registration.html">REGISTER</a>
      <a href="mailto:cresco.scientiam@dpsmegacity.edu.in">CONTACT</a>
    </div>
  </div>
</footer>

<script>
/* ==========================================================================
   Self-contained page script — no imports from, or dependencies on,
   any other page's JS.
   ========================================================================== */

/* ---- Ambient particle canvas (hero backdrop, mouse-reactive, subtle) ---- */
(function(){
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [], mouse = { x:null, y:null };

  function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const count = window.innerWidth < 720 ? 55 : 120;
    particles = Array.from({length:count}, () => ({
      x: Math.random()*canvas.width, y: Math.random()*canvas.height,
      z: Math.random()*0.8+0.2, vx:(Math.random()-0.5)*0.12, vy:(Math.random()-0.5)*0.12,
      r: Math.random()*1.4+0.4
    }));
  }
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (const p of particles){
      p.x += p.vx; p.y += p.vy;
      if (mouse.x !== null){
        const dx=p.x-mouse.x, dy=p.y-mouse.y, dist=Math.sqrt(dx*dx+dy*dy);
        if (dist<130){ const f=(130-dist)/130; p.x += (dx/dist)*f*1.1; p.y += (dy/dist)*f*1.1; }
      }
      if (p.x<0)p.x=canvas.width; if (p.x>canvas.width)p.x=0;
      if (p.y<0)p.y=canvas.height; if (p.y>canvas.height)p.y=0;
      const alpha = 0.12 + p.z*0.4;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r*p.z,0,Math.PI*2);
      ctx.fillStyle = p.r>1.3 ? `rgba(255,106,26,${alpha})` : `rgba(199,201,205,${alpha})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  resize(); draw();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { mouse.x=e.clientX; mouse.y=e.clientY; });
  window.addEventListener('mouseleave', () => { mouse.x=null; mouse.y=null; });
})();

/* ---- Countdown ---- */
(function(){
  const FESTIVAL_DATE = new Date("2026-10-15T08:00:00+05:30").getTime();
  const el = id => document.getElementById(id);
  const pad = n => String(n).padStart(2,'0');
  function tick(){
    const diff = FESTIVAL_DATE - Date.now();
    if (diff <= 0){ ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id=>el(id).textContent='00'); return; }
    el('cd-days').textContent  = pad(Math.floor(diff/86400000));
    el('cd-hours').textContent = pad(Math.floor((diff%86400000)/3600000));
    el('cd-mins').textContent  = pad(Math.floor((diff%3600000)/60000));
    el('cd-secs').textContent  = pad(Math.floor((diff%60000)/1000));
  }
  tick(); setInterval(tick, 1000);
})();

/* ---- Cr · Es · Co electron shell console ---- */
(function(){
  const ELEMENTS = {
    cr:{ symbol:'Cr', name:'CHROMIUM',    z:24, shells:[2,8,13,1] },
    es:{ symbol:'Es', name:'EINSTEINIUM', z:99, shells:[2,8,18,32,29,8,2] },
    co:{ symbol:'Co', name:'COBALT',      z:27, shells:[2,8,15,2] }
  };
  const SVG_NS = "http://www.w3.org/2000/svg";
  const atomSvg = document.getElementById('atom-svg');
  const atomTitle = document.getElementById('atom-title');
  const atomConfig = document.getElementById('atom-config');
  const tiles = Array.from(document.querySelectorAll('.tile'));

  function render(key){
    const el = ELEMENTS[key];
    atomSvg.innerHTML = '';
    const nucleus = document.createElementNS(SVG_NS,'circle');
    nucleus.setAttribute('cx',0); nucleus.setAttribute('cy',0); nucleus.setAttribute('r',9);
    nucleus.setAttribute('class','nucleus');
    atomSvg.appendChild(nucleus);

    const maxRadius = 175, step = maxRadius/el.shells.length;
    el.shells.forEach((count, i) => {
      const radius = step*(i+1);
      const ring = document.createElementNS(SVG_NS,'circle');
      ring.setAttribute('cx',0); ring.setAttribute('cy',0); ring.setAttribute('r',radius);
      ring.setAttribute('class','shell-ring lit');
      atomSvg.appendChild(ring);

      const group = document.createElementNS(SVG_NS,'g');
      const duration = 6 + i*3.2;
      group.style.transformOrigin = '0px 0px';
      group.style.animation = `spin ${duration}s linear infinite`;
      group.style.animationDirection = i%2===0 ? 'normal' : 'reverse';
      for (let e=0; e<count; e++){
        const angle = (2*Math.PI*e)/count;
        const electron = document.createElementNS(SVG_NS,'circle');
        electron.setAttribute('cx', radius*Math.cos(angle));
        electron.setAttribute('cy', radius*Math.sin(angle));
        electron.setAttribute('r', count>16 ? 1.5 : 2.8);
        electron.setAttribute('class','electron');
        group.appendChild(electron);
      }
      atomSvg.appendChild(group);
    });

    atomTitle.textContent = `${el.name} — ${el.symbol}`;
    atomConfig.textContent = `ATOMIC NUMBER: ${el.z}\nSHELLS (K L M N O P Q):\n${el.shells.join(' · ')}`;
    tiles.forEach(t => t.setAttribute('aria-expanded', t.dataset.el===key ? 'true':'false'));
  }

  tiles.forEach(t => t.addEventListener('click', () => render(t.dataset.el)));
  render('cr');
})();

/* ---- Labs preview grid (first 4 of 12 — full list lives on events.html) ---- */
(function(){
  const LABS = [
    { code:'LAB-01', name:'Corpus Vestigium', theme:'Crime Investigation Laboratory' },
    { code:'LAB-02', name:'Chromatica',        theme:'Chemical Laboratory' },
    { code:'LAB-07', name:'TechForge',         theme:'Engineering Factory' },
    { code:'LAB-10', name:'Vox Futuri',        theme:'AI News Studio' },
  ];
  const grid = document.getElementById('labs-preview-grid');
  LABS.forEach(l => {
    const div = document.createElement('div');
    div.className = 'lab-mini';
    div.innerHTML = `<div class="lab-mini-code">${l.code}</div><div class="lab-mini-name">${l.name}</div><div class="lab-mini-theme">${l.theme}</div>`;
    grid.appendChild(div);
  });
})();

/* ---- Scroll reveal (native scroll — no wheel hijacking, just IntersectionObserver fades) ---- */
(function(){
  const items = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold:0.15 });
  items.forEach(i => io.observe(i));
})();

/* ---- Stat count-up, triggered on scroll into view ---- */
(function(){
  const nums = document.querySelectorAll('.stat-num');
  let done = false;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !done){
        done = true;
        nums.forEach(el => {
          const target = parseInt(el.dataset.count,10);
          const start = performance.now(), duration = 1300;
          function step(now){
            const p = Math.min((now-start)/duration,1);
            const eased = 1-Math.pow(1-p,3);
            el.textContent = Math.floor(eased*target).toLocaleString();
            if (p<1) requestAnimationFrame(step); else el.textContent = target.toLocaleString();
          }
          requestAnimationFrame(step);
        });
      }
    });
  }, { threshold:0.4 });
  io.observe(document.getElementById('stats'));
})();
</script>
</body>
</html>