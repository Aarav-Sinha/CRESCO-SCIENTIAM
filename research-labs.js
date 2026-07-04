/* ==========================================================================
   RESEARCH LABS HUB — research-labs.js
   Self-contained: no imports from, or dependencies on, any other page's JS.
   ========================================================================== */

/* ---------------------------------------------------------------------- *
 * DATA
 * ---------------------------------------------------------------------- */
const LABS = [
  { slug: 'corpus-vestigium', tag: 'Forensics',            title: 'Corpus Vestigium', theme: 'Crime Investigation Laboratory', desc: 'Solve a murder mystery using real forensic science — trace evidence, toxicology, ballistics.', domain: 'matter' },
  { slug: 'chromatica',       tag: 'Chemical Laboratory',  title: 'Chromatica',       theme: 'Chemical Art Studio',           desc: 'Turn pH shifts and reactions into art. Precision chemistry meets visual expression.', domain: 'matter' },
  { slug: 'tesoro-jagen',     tag: 'Treasure Hunt',        title: 'Tesoro Jagen',     theme: 'Ancient Hidden Vault',          desc: 'Decode a trail of riddles and coordinates through the campus vault. Wits over speed.', domain: 'matter' },
  { slug: 'techforge',        tag: 'Engineering',          title: 'TechForge',        theme: 'Engineering Factory',           desc: 'Machines, hydraulics, robotics. Build something that actually moves under its own power.', domain: 'matter', tier: 'flagship' },
  { slug: 'quantum-clash',    tag: 'Debate',               title: 'Quantum Clash',    theme: 'Quantum Debate Chamber',        desc: 'Structured debate on the frontiers of physics. Defend your motion under cross-fire.', domain: 'mind' },
  { slug: 'pi-orbit',         tag: 'Mathematics',          title: 'πOrbit',           theme: 'Mathematical Universe',         desc: 'Floating equations, gravity puzzles. Pure reasoning in a zero-calculator arena.', domain: 'mind' },
  { slug: 'strategos',        tag: 'Chess',                title: 'Strategos',        theme: 'Digital Chess Arena',           desc: 'Rapid-format chess bracket. Every move logged, every blunder public.', domain: 'mind' },
  { slug: 'time-trial',       tag: 'Quiz',                 title: 'Time Trial',       theme: 'KBC-Inspired Auditorium',       desc: 'A tiered general-science quiz under studio lights. Lock in your final answer.', domain: 'mind', tier: 'flagship' },
  { slug: 'mindrift',         tag: 'Neural Quiz',          title: 'MindRift',         theme: 'Neural Quiz Arena',             desc: 'Buzzer rounds across neuroscience, cognition, and psychology. Fast recall wins.', domain: 'mind' },
  { slug: 'astropulse',       tag: 'Music',                title: 'AstroPulse',       theme: 'Galaxy Recording Studio',       desc: 'Compose and produce an original track live, on a deadline, in a working studio.', domain: 'signal' },
  { slug: 'vox-futuri',       tag: 'AI Broadcast',         title: 'Vox Futuri',       theme: 'AI News Studio',                desc: 'Anchor a bulletin from the future — script it, present it, sell the story.', domain: 'signal', tier: 'flagship' },
  { slug: 'genesis-nova',     tag: 'Simulation',           title: 'Genesis Nova',     theme: 'Evolution Simulation',          desc: 'Model a species through generations of selection pressure. Only the fit survive the sim.', domain: 'signal' },
];

const DOMAIN_DATA = {
  mind:   { label: 'Domain 01 — Mind & Logic',     title: 'Mind &amp; <em>Logic</em>' },
  matter: { label: 'Domain 02 — Matter & Machine',  title: 'Matter &amp; <em>Machine</em>' },
  signal: { label: 'Domain 03 — Signal & Spectrum', title: 'Signal &amp; <em>Spectrum</em>' },
};

const FAQS = [
  { q: 'When is Cresco Scientiam 5.0?', a: '15–17 October 2026, on the DPS Megacity main campus.' },
  { q: 'Who can participate?', a: 'School students, Classes 6–12, across any board — CBSE, ISC, ICSE, IB, or state boards.' },
  { q: 'Is registration free?', a: 'Registration terms are confirmed on the School Portal once your school is approved.' },
  { q: 'How many labs can one student enter?', a: 'One primary lab per student, with select labs allowing a secondary entry.' },
  { q: 'What should I bring?', a: 'School ID, your unique QR pass, and any device your lab specifies in its brief.' },
  { q: 'Are there prizes?', a: 'Top performers in every lab receive certificates and recognition at the closing ceremony.' },
  { q: 'Is there a dress code?', a: 'School uniform is compulsory for all participants on campus.' },
  { q: 'Do teachers need to accompany students?', a: 'Yes — a Teacher-in-Charge must accompany every contingent for the full three days.' },
  { q: 'How do I register my school?', a: 'Use the Register School button — a Super Admin reviews and approves every submission.' },
  { q: 'Will I get a certificate either way?', a: 'Every participant receives a QR-verified digital certificate of participation.' },
];

/* ---------------------------------------------------------------------- *
 * CANVAS / ORBITAL SHELL CONSTELLATION
 * ---------------------------------------------------------------------- */
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H, cx, cy, nodes = [], paused = false, hoveredNode = null;
let angle = 0, pitch = 0;
let isDragging = false;
let dragLastX = 0, dragLastY = 0, dragVelX = 0, dragVelY = 0;
const DRAG_YAW_SENS = 0.0065;
const DRAG_PITCH_SENS = 0.0065;
const MAX_USER_PITCH = Math.PI / 2.4;
const dragHint = document.getElementById('drag-hint');
let hintHidden = false;

const evTip = document.getElementById('event-tooltip');
const ttTag = document.getElementById('tt-tag');
const ttTitle = document.getElementById('tt-title');
const ttDesc = document.getElementById('tt-desc');
const faqTip = document.getElementById('faq-tooltip');
const fqQ = document.getElementById('fq-q');
const fqA = document.getElementById('fq-a');

/* Three concentric shells, orbiting at independent speeds — the literal
   "electron shell" reading of the Cr·Es·Co identity, applied as navigation. */
const SHELL_SPEED = [0.00035, 0.00062, 0.00095]; // radians/ms, inner→outer
const SHELL_BAND = [
  { min: 0.20, max: 0.44 }, // shell 0: FAQ nodes
  { min: 0.52, max: 0.72 }, // shell 1: labs A
  { min: 0.80, max: 1.00 }, // shell 2: labs B
];

function resize() {
  W = canvas.width = window.innerWidth * devicePixelRatio;
  H = canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  cx = W / 2; cy = H / 2;
  layoutPanels();
  buildNodes();
}

function buildNodes() {
  nodes = [];
  const minR = Math.min(W, H);
  const isMobile = window.innerWidth < 600;
  const maxBaseDist = (isMobile ? 0.92 : 0.80) * (minR / 2);
  const phiBand = isMobile ? 2.5 : 2.2;

  const labsShellA = LABS.slice(0, 6);
  const labsShellB = LABS.slice(6, 12);

  labsShellA.forEach((lab, i) => {
    const theta = (i / labsShellA.length) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
    const phi = Math.PI / 2 + (Math.random() - 0.5) * phiBand;
    const band = SHELL_BAND[1];
    const dist = (band.min + Math.random() * (band.max - band.min)) * maxBaseDist;
    const size = (isMobile ? 4.5 : 5.2) * devicePixelRatio;
    nodes.push({ kind: 'event', shell: 1, baseDist: dist, baseTheta: theta, basePhi: phi, size, opacity: 0.85, data: lab });
  });
  labsShellB.forEach((lab, i) => {
    const theta = (i / labsShellB.length) * Math.PI * 2 + Math.PI / labsShellB.length + (Math.random() - 0.5) * 0.3;
    const phi = Math.PI / 2 + (Math.random() - 0.5) * phiBand;
    const band = SHELL_BAND[2];
    const dist = (band.min + Math.random() * (band.max - band.min)) * maxBaseDist;
    const size = (isMobile ? 4.8 : 5.6) * devicePixelRatio;
    nodes.push({ kind: 'event', shell: 2, baseDist: dist, baseTheta: theta, basePhi: phi, size, opacity: 0.9, data: lab });
  });
  FAQS.forEach((faq, i) => {
    const theta = (i / FAQS.length) * Math.PI * 2 + (Math.random() - 0.5) * 0.35;
    const phi = Math.PI / 2 + (Math.random() - 0.5) * phiBand;
    const band = SHELL_BAND[0];
    const dist = (band.min + Math.random() * (band.max - band.min)) * maxBaseDist;
    const size = (isMobile ? 3.0 : 3.4) * devicePixelRatio;
    nodes.push({ kind: 'faq', shell: 0, baseDist: dist, baseTheta: theta, basePhi: phi, size, opacity: 0.6, data: faq });
  });
}

/* ---- Panels ---- */
const panels = [document.getElementById('panel-0'), document.getElementById('panel-1')];
function layoutPanels() {
  const vw = window.innerWidth, vh = window.innerHeight;
  if (vw < 768) { panels.forEach((p) => (p.style.display = 'none')); return; }
  panels.forEach((p) => (p.style.display = ''));
  const margin = 26;
  panels[0].style.cssText = `position:absolute;left:${margin}px;top:${vh * 0.62}px;`;
  panels[1].style.cssText = `position:absolute;right:${margin}px;top:${vh * 0.20}px;`;
}

/* ---- Drag ---- */
function applyDragDelta(dx, dy) {
  angle += dx * DRAG_YAW_SENS;
  pitch += dy * DRAG_PITCH_SENS;
  if (pitch > MAX_USER_PITCH) pitch = MAX_USER_PITCH;
  if (pitch < -MAX_USER_PITCH) pitch = -MAX_USER_PITCH;
}

canvas.addEventListener('mousedown', (e) => {
  if (hoveredNode) return;
  isDragging = true; dragLastX = e.clientX; dragLastY = e.clientY;
  paused = true; canvas.style.cursor = 'grabbing';
  if (!hintHidden) { dragHint.classList.add('hidden'); hintHidden = true; }
});
window.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const dx = e.clientX - dragLastX, dy = e.clientY - dragLastY;
    dragVelX = dx; dragVelY = dy;
    applyDragDelta(dx, dy);
    dragLastX = e.clientX; dragLastY = e.clientY;
    hideAllTips();
    return;
  }
  const rect = canvas.getBoundingClientRect();
  if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
    if (hoveredNode) { hoveredNode = null; paused = false; canvas.style.cursor = 'default'; hideAllTips(); }
    return;
  }
  const mx = e.clientX * devicePixelRatio, my = e.clientY * devicePixelRatio;
  let found = null;
  for (const n of nodes) {
    const p = getPos(n);
    const dx = p.x - mx, dy = p.y - my;
    const hitR = (n.kind === 'event' ? 22 : 18) * devicePixelRatio * Math.max(0.55, p.scale);
    if (Math.sqrt(dx * dx + dy * dy) < hitR) { found = n; break; }
  }
  hoveredNode = found; paused = !!found; canvas.style.cursor = found ? 'pointer' : 'default';
  hideAllTips();
  if (!found) return;
  if (found.kind === 'event') {
    ttTag.textContent = found.data.tag; ttTitle.textContent = found.data.title; ttDesc.textContent = found.data.desc;
    positionTip(evTip, e.clientX, e.clientY, 305, 115); evTip.classList.add('visible');
  } else {
    fqQ.textContent = found.data.q; fqA.textContent = found.data.a;
    positionTip(faqTip, e.clientX, e.clientY, 320, 105); faqTip.classList.add('visible');
  }
});
window.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false; paused = false; canvas.style.cursor = 'default';
});
canvas.addEventListener('mouseleave', () => { if (!isDragging) { paused = false; hoveredNode = null; hideAllTips(); } });

canvas.addEventListener('touchstart', (e) => {
  if (e.touches.length !== 1) return;
  const t = e.touches[0]; dragLastX = t.clientX; dragLastY = t.clientY;
  paused = true; isDragging = true;
  if (!hintHidden) { dragHint.classList.add('hidden'); hintHidden = true; }
}, { passive: true });
canvas.addEventListener('touchmove', (e) => {
  if (!isDragging || e.touches.length !== 1) return;
  const t = e.touches[0];
  applyDragDelta(t.clientX - dragLastX, t.clientY - dragLastY);
  dragLastX = t.clientX; dragLastY = t.clientY;
}, { passive: true });
canvas.addEventListener('touchend', () => { isDragging = false; paused = false; });

canvas.addEventListener('click', (e) => {
  if (isDragging || !hoveredNode || hoveredNode.kind !== 'event') return;
  window.location.href = `../events/${hoveredNode.data.slug}.html`;
});

function hideAllTips() { evTip.classList.remove('visible'); faqTip.classList.remove('visible'); }
function positionTip(el, mx, my, tw, th) {
  const vw = window.innerWidth, vh = window.innerHeight, margin = 12;
  el.style.maxWidth = Math.min(tw, vw - margin * 2) + 'px';
  let tx = mx + 20, ty = my - 56;
  if (tx + tw > vw - margin) tx = mx - tw - 16;
  if (tx < margin) tx = margin;
  if (ty < margin) ty = my + 20;
  if (ty + th > vh - margin) ty = vh - th - margin;
  el.style.left = tx + 'px'; el.style.top = ty + 'px';
}

/* ---- Projection: node sits on shell `s`, orbiting at that shell's own
   angular speed, plus user yaw/pitch drag on top. ---- */
const TILT3D = 0.30;
const CAM_FACTOR = 1.4;
let clock = 0;

function getPos(n) {
  const shellAngle = angle + clock * SHELL_SPEED[n.shell];
  const t = n.baseTheta + shellAngle;
  const sinPhi = Math.sin(n.basePhi), cosPhi = Math.cos(n.basePhi);
  const ux = sinPhi * Math.cos(t), uy = cosPhi, uz = sinPhi * Math.sin(t);
  const tilt = TILT3D + pitch;
  const cosT = Math.cos(tilt), sinT = Math.sin(tilt);
  const ty = uy * cosT - uz * sinT, tz = uy * sinT + uz * cosT;
  const r = n.baseDist;
  const x3 = ux * r, y3 = ty * r, z3 = tz * r;
  const minR = Math.min(W, H);
  const camDist = minR * CAM_FACTOR;
  const scale = camDist / (camDist + z3);
  const aspectX = W / minR, aspectY = H / minR;
  return { x: cx + x3 * scale * aspectX, y: cy + y3 * scale * aspectY, z: z3, scale };
}

function drawStar(x, y, r) {
  const inner = r * 0.36;
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4 - Math.PI / 4;
    const rad = i % 2 === 0 ? r : inner;
    ctx.lineTo(x + Math.cos(a) * rad, y + Math.sin(a) * rad);
  }
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  const projected = nodes.map((n) => ({ n, p: getPos(n) }));
  projected.sort((a, b) => b.p.z - a.p.z);

  /* shell rings (faint, static reference circles at the median radius) */
  ctx.save();
  ctx.strokeStyle = 'rgba(196,198,201,0.05)'; ctx.lineWidth = 1 * devicePixelRatio;
  const minR = Math.min(W, H);
  const maxBaseDist = (window.innerWidth < 600 ? 0.92 : 0.80) * (minR / 2);
  SHELL_BAND.forEach((band) => {
    const r = ((band.min + band.max) / 2) * maxBaseDist;
    ctx.beginPath(); ctx.ellipse(cx, cy, r * (W / minR), r * 0.42 * (H / minR), 0, 0, Math.PI * 2); ctx.stroke();
  });
  ctx.restore();

  /* connecting threads */
  for (const { n, p } of projected) {
    const isEv = n.kind === 'event';
    const depthMix = 0.45 + (0.55 * Math.min(1.55, p.scale)) / 1.55;
    ctx.save();
    ctx.globalAlpha = (isEv ? 0.28 : 0.15) * n.opacity * depthMix;
    ctx.strokeStyle = isEv ? '#ff9a52' : '#8a8d92';
    ctx.lineWidth = (isEv ? 1.1 : 0.8) * devicePixelRatio * (0.65 + 0.55 * p.scale);
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(p.x, p.y); ctx.stroke();
    ctx.restore();
  }

  /* FAQ nodes — small diamonds (electron-like) */
  for (const { n, p } of projected) {
    if (n.kind !== 'faq') continue;
    const isHov = n === hoveredNode;
    const depthMix = 0.45 + (0.55 * Math.min(1.55, p.scale)) / 1.55;
    const r = (isHov ? n.size * 1.2 : n.size) * p.scale;
    ctx.save();
    const glowR = r * (isHov ? 3.2 : 2.8);
    const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
    grd.addColorStop(0, isHov ? 'rgba(200,200,205,0.18)' : 'rgba(150,152,156,0.10)');
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = isHov ? 0.95 : n.opacity * 0.7 * depthMix;
    ctx.fillStyle = isHov ? '#e4e5e7' : '#9a9ca0';
    ctx.beginPath();
    ctx.moveTo(p.x, p.y - r); ctx.lineTo(p.x + r, p.y); ctx.lineTo(p.x, p.y + r); ctx.lineTo(p.x - r, p.y);
    ctx.closePath(); ctx.fill();
    ctx.restore();
  }

  /* Event nodes — stars, orange */
  for (const { n, p } of projected) {
    if (n.kind !== 'event') continue;
    const isHov = n === hoveredNode;
    const depthMix = 0.45 + (0.55 * Math.min(1.55, p.scale)) / 1.55;
    const r = (isHov ? n.size * 1.2 : n.size) * 0.9 * p.scale;
    ctx.save();
    const glowR = r * (isHov ? 3.0 : 2.5);
    const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
    grd.addColorStop(0, isHov ? 'rgba(255,180,90,0.22)' : 'rgba(255,150,60,0.14)');
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = isHov ? 1 : n.opacity * depthMix;
    ctx.fillStyle = isHov ? '#ffd8a8' : '#ff8a3d';
    drawStar(p.x, p.y, r); ctx.fill();
    ctx.restore();
  }

  /* core */
  ctx.save();
  ctx.fillStyle = '#f5f5f5'; ctx.globalAlpha = 0.95;
  ctx.beginPath(); ctx.arc(cx, cy, 6 * devicePixelRatio, 0, Math.PI * 2); ctx.fill();
  ctx.globalAlpha = 0.16; ctx.fillStyle = '#ff6a1a';
  ctx.beginPath(); ctx.arc(cx, cy, 16 * devicePixelRatio, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

let lastFrame = 0;
function heroLoop(ts) {
  const dt = lastFrame ? ts - lastFrame : 16;
  lastFrame = ts;
  if (!isDragging) {
    clock += dt;
    pitch *= 0.995; // slow settle toward base tilt when not dragging
  }
  draw();
  requestAnimationFrame(heroLoop);
}

window.addEventListener('resize', resize);
resize();
requestAnimationFrame(heroLoop);

/* ---------------------------------------------------------------------- *
 * ORBIT HINT (one-time nudge toward a random event node)
 * ---------------------------------------------------------------------- */
const orbitHint = document.getElementById('orbit-hint');
const orbitHintText = document.getElementById('orbit-hint-text');
setTimeout(() => {
  const evNodes = nodes.filter((n) => n.kind === 'event');
  if (!evNodes.length) return;
  const pick = evNodes[Math.floor(Math.random() * evNodes.length)];
  orbitHintText.textContent = `Hover a node to identify it — try ${pick.data.title}`;
  orbitHint.style.left = '50%'; orbitHint.style.bottom = '86px'; orbitHint.style.transform = 'translateX(-50%)';
  orbitHint.classList.add('show');
  setTimeout(() => orbitHint.classList.remove('show'), 4200);
}, 1400);

/* ---------------------------------------------------------------------- *
 * DOMAIN DRILL-DOWN
 * ---------------------------------------------------------------------- */
function openDomain(domainKey) {
  const data = DOMAIN_DATA[domainKey];
  if (!data) return;
  const labs = LABS.filter((l) => l.domain === domainKey);

  document.getElementById('domainEyebrow').textContent = data.label;
  document.getElementById('domainTitle').innerHTML = data.title;
  document.getElementById('domainMeta').textContent = `Registry · ${String(labs.length).padStart(2, '0')} ${labs.length === 1 ? 'Lab' : 'Labs'}`;

  const grid = document.getElementById('specimenGrid');
  grid.innerHTML = '';
  labs.forEach((lab, i) => {
    const card = document.createElement('a');
    card.className = 'specimen-card';
    card.href = `../events/${lab.slug}.html`;
    card.innerHTML = `
      <div class="specimen-index">${String(i + 1).padStart(2, '0')}</div>
      <div class="specimen-tag">${lab.tag}</div>
      <div class="specimen-title">${lab.title}</div>
      <div class="specimen-theme">${lab.theme}</div>
      <div class="specimen-desc">${lab.desc}</div>
      <div class="specimen-cta">Open Dossier →</div>
    `;
    grid.appendChild(card);
  });

  const section = document.getElementById('domain-detail');
  section.classList.add('visible');
  requestAnimationFrame(() => {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const cards = grid.querySelectorAll('.specimen-card');
    cards.forEach((card, i) => setTimeout(() => card.classList.add('revealed'), i * 90));
  });
}

function closeDomain() {
  const section = document.getElementById('domain-detail');
  document.querySelectorAll('.specimen-card').forEach((c) => c.classList.remove('revealed'));
  setTimeout(() => {
    section.classList.remove('visible');
    document.getElementById('domains-heading-wrap').scrollIntoView({ behavior: 'smooth' });
  }, 250);
}
window.openDomain = openDomain;
window.closeDomain = closeDomain;

/* ---------------------------------------------------------------------- *
 * CAROUSEL (all 12 labs)
 * ---------------------------------------------------------------------- */
const cardStack = document.getElementById('cardStack');
let currentCard = 0, autoTimer = null, progressEl = null;
const arrowSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/></svg>`;

const showcaseTag = document.getElementById('showcaseTag');
const showcaseHeading = document.getElementById('showcaseHeading');
const showcaseBody = document.getElementById('showcaseBody');

function swapShowcaseText(lab) {
  showcaseHeading.classList.remove('active'); showcaseHeading.classList.add('exit');
  showcaseBody.classList.remove('active'); showcaseBody.classList.add('exit');
  showcaseTag.textContent = lab.tag;
  setTimeout(() => {
    showcaseHeading.innerHTML = `<h2 class="showcase-heading">${lab.theme}</h2>`;
    showcaseBody.innerHTML = `<p class="showcase-body">${lab.desc}</p>`;
    showcaseHeading.classList.remove('exit'); showcaseHeading.classList.add('enter');
    showcaseBody.classList.remove('exit'); showcaseBody.classList.add('enter');
    void showcaseHeading.offsetWidth;
    showcaseHeading.classList.remove('enter'); showcaseHeading.classList.add('active');
    showcaseBody.classList.remove('enter'); showcaseBody.classList.add('active');
  }, 360);
}

function tierMarkHTML(tier) {
  if (tier === 'flagship') return `<div class="specimen-index" style="color:var(--orange-soft);">✦ Flagship</div>`;
  return '';
}

function buildCards() {
  cardStack.innerHTML = '';
  LABS.forEach((lab, i) => {
    const card = document.createElement('div');
    card.className = 'event-card' + (i === 0 ? ' active' : '');
    card.innerHTML = `
      <div class="card-accent-line"></div>
      ${tierMarkHTML(lab.tier)}
      <div class="card-index">${String(i + 1).padStart(2, '0')} / ${String(LABS.length).padStart(2, '0')}</div>
      <div class="card-tag">${lab.tag}</div>
      <div class="card-title">${lab.title}</div>
      <div class="card-divider"></div>
      <div class="card-desc">${lab.desc}</div>
      <a class="card-view" href="../events/${lab.slug}.html">View dossier <span class="card-view-arrow">→</span></a>
      <div class="card-footer">
        <div class="card-progress" id="dots-${i}"></div>
        <div class="card-nav">
          <button class="nav-btn prev-btn" aria-label="Previous lab">${arrowSVG}</button>
          <button class="nav-btn next-btn" aria-label="Next lab">${arrowSVG}</button>
        </div>
      </div>`;
    cardStack.appendChild(card);
    card.querySelector('.prev-btn').addEventListener('click', () => manualNav(-1));
    card.querySelector('.next-btn').addEventListener('click', () => manualNav(1));
  });
  progressEl = document.createElement('div');
  progressEl.className = 'auto-progress';
  cardStack.appendChild(progressEl);
  updateDots();
}

function updateDots() {
  LABS.forEach((_, i) => {
    const container = document.getElementById('dots-' + i);
    if (!container) return;
    container.innerHTML = '';
    LABS.forEach((__, j) => {
      const d = document.createElement('div');
      d.className = 'progress-dot' + (j === currentCard ? ' active' : '');
      container.appendChild(d);
    });
  });
}

function goToCard(next) {
  const cards = cardStack.querySelectorAll('.event-card');
  if (next === currentCard) return;
  cards[currentCard].classList.remove('active'); cards[currentCard].classList.add('prev');
  setTimeout(() => cards[currentCard] && cards[currentCard].classList.remove('prev'), 720);
  currentCard = next;
  cards[currentCard].classList.add('active');
  updateDots(); swapShowcaseText(LABS[currentCard]); resetProgressBar();
}
function manualNav(dir) { goToCard((currentCard + dir + LABS.length) % LABS.length); startAutoTimer(); }
function resetProgressBar() {
  if (!progressEl) return;
  progressEl.classList.remove('running'); progressEl.style.transition = 'none'; progressEl.style.width = '0%';
  void progressEl.offsetWidth;
}
function startProgressBar() { if (progressEl) progressEl.classList.add('running'); }
function startAutoTimer() {
  clearTimeout(autoTimer); resetProgressBar();
  requestAnimationFrame(() => requestAnimationFrame(startProgressBar));
  autoTimer = setTimeout(() => { goToCard((currentCard + 1) % LABS.length); startAutoTimer(); }, 5000);
}

buildCards();
startAutoTimer();

/* ---------------------------------------------------------------------- *
 * SHOWCASE PARALLAX (mouse-driven ambient orb drift)
 * ---------------------------------------------------------------------- */
let mx = 0.5, my = 0.5, smx = 0.5, smy = 0.5;
const orbA = document.querySelector('.orb-a');
const orbB = document.querySelector('.orb-b');
const orbC = document.querySelector('.orb-c');
window.addEventListener('mousemove', (e) => { mx = e.clientX / window.innerWidth; my = e.clientY / window.innerHeight; });
function lerp(a, b, t) { return a + (b - a) * t; }
function parallaxFrame() {
  smx = lerp(smx, mx, 0.05); smy = lerp(smy, my, 0.05);
  const dx = smx - 0.5, dy = smy - 0.5;
  if (orbA) orbA.style.transform = `translate(${dx * -40}px, ${dy * -28}px)`;
  if (orbB) orbB.style.transform = `translate(${dx * 30}px, ${dy * 22}px)`;
  if (orbC) orbC.style.transform = `translate(${dx * 55}px, ${dy * 40}px)`;
  requestAnimationFrame(parallaxFrame);
}
parallaxFrame();