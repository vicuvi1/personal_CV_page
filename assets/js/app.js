/* Renders everything from content.js. You shouldn't need to edit this file to change content. */
(() => {
  "use strict";
  const CV = window.CV, UI = window.UI;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- language ---------- */
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
  };
  let lang = store.get("lang") || ((navigator.language || "").toLowerCase().startsWith("ro") ? "ro" : "en");
  const t = (v) => (v == null ? "" : typeof v === "string" || typeof v === "number" ? String(v) : v[lang] ?? v.en ?? "");
  const ui = (path) => t(path.split(".").reduce((o, k) => (o ? o[k] : undefined), UI));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const T = (v) => esc(t(v));
  const shown = (list) => (list || []).filter((x) => !x.hidden);

  /* ---------- icons ---------- */
  const svg = (p) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const ICONS = {
    shield: svg('<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>'),
    terminal: svg('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M13 15h4"/>'),
    code: svg('<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>'),
    layers: svg('<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'),
    git: svg('<circle cx="6" cy="6" r="2.2"/><circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="9" r="2.2"/><path d="M6 8.2v7.6M18 11.2c0 3-3 3.8-6 4.4-2 .4-4 .8-4.3 1.5"/>'),
    spark: svg('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>'),
    trophy: svg('<path d="M8 4h8v5a4 4 0 01-8 0z"/><path d="M8 6H4v1a4 4 0 004 4M16 6h4v1a4 4 0 01-4 4M12 13v4M8 21h8M9 17h6"/>'),
    belt: svg('<path d="M3 10h18v4H3z"/><path d="M10 9h4v6h-4zM11 15l-2 6M13 15l2 6"/>'),
    crown: svg('<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 10H5z"/><path d="M5 21h14"/>'),
    cert: svg('<circle cx="12" cy="9" r="5"/><path d="M9 13.5L7.5 21l4.5-2.5 4.5 2.5-1.5-7.5"/>'),
    github: svg('<path d="M9 19c-4 1.3-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 00-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>'),
    flag: svg('<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>'),
    telegram: svg('<path d="M21 4L3 11l6 2.5M21 4l-3 16-9-6.5M21 4L9 13.5V19l3-3.5"/>'),
    x: svg('<path fill="currentColor" stroke="none" d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77zm-1.08 16.2h1.7L7.4 4.73H5.58z"/>'),
    phone: svg('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2"/>'),
    linkedin: svg('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 014 0v4M12 10v7"/>'),
    mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'),
    arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    download: svg('<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'),
    copy: svg('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 012-2h8"/>'),
    link: svg('<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/>'),
  };
  const icon = (n) => ICONS[n] || ICONS.link;

  /* ---------- render ---------- */
  const P = CV.person;
  let firstRender = true;

  function render() {
    document.documentElement.lang = lang;
    $$("[data-l]", $("#lang")).forEach((s) => s.classList.toggle("on", s.dataset.l === lang));
    $$("[data-ui]").forEach((el) => (el.textContent = ui(el.dataset.ui)));
    $$('[data-bind="initials"]').forEach((el) => (el.textContent = P.initials));
    $$('[data-bind="name"]').forEach((el) => (el.textContent = P.name));

    $("#nav-links").innerHTML = Object.entries(UI.nav)
      .map(([id, label]) => `<a href="#${id}" data-nav="${id}">${T(label)}</a>`).join("");

    // hero
    $("#hero-name").textContent = P.name;
    $("#hero-role").textContent = t(P.role);
    $("#hero-pitch").textContent = t(P.pitch);
    const cvBtn = CV.cvPdf
      ? `<a class="btn" href="${esc(CV.cvPdf)}" download>${icon("download")}${T(UI.cta.cv)}</a>`
      : `<button class="btn" type="button" data-print>${icon("download")}${T(UI.cta.cv)}</button>`;
    $("#hero-cta").innerHTML =
      `<a class="btn primary" href="#contact">${icon("mail")}${T(UI.cta.contact)}</a>` +
      `<a class="btn" href="#projects">${T(UI.cta.projects)}${icon("arrow")}</a>` + cvBtn;
    $("#status").innerHTML = P.available ? `<span class="pulse"></span>${T(P.availability)}` : "";

    renderBadge();

    // stats
    $("#stats").innerHTML = shown(CV.stats).map((s) => `
      <div class="stat reveal"><div class="stat-v">${esc(s.prefix || "")}<span class="num" data-to="${s.value}">${firstRender && !reduced ? 0 : s.value}</span><span class="acc">${esc(s.suffix || "")}</span></div>
      <div class="stat-l">${T(s.label)}</div></div>`).join("");

    // about
    const links = shown(CV.links);
    $("#about-body").innerHTML = `
      <div class="about-text reveal">${CV.about.paragraphs.map((p) => `<p>${T(p)}</p>`).join("")}</div>
      <aside class="panel side-card reveal">
        <h3>${T(UI.cta.interests)}</h3>
        <ul class="tags">${CV.about.interests.map((i) => `<li class="tag acc">${T(i)}</li>`).join("")}</ul>
        <div class="kv">
          <div><span>${lang === "ro" ? "Locație" : "Based in"}</span><span>${T(P.location)}</span></div>
          <div><span>${lang === "ro" ? "Studii" : "Studying"}</span><span>UTM · FCIM</span></div>
          <div><span>${lang === "ro" ? "Limbi" : "Languages"}</span><span>${shown(CV.languages).map((l) => T(l.name).slice(0, 2).toUpperCase()).join(" · ")}</span></div>
          ${links.map((l) => `<div><span>${esc(l.label)}</span><span><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.url.replace(/^https?:\/\/(www\.)?/, ""))}</a></span></div>`).join("")}
        </div>
      </aside>`;

    // workflow
    $("#pipeline").innerHTML = shown(CV.workflow).map((s, i) => `
      <li class="step reveal${s.key ? " key" : ""}">
        <div class="step-dot">${String(i + 1).padStart(2, "0")}</div>
        <h3>${T(s.title)}</h3><p>${T(s.text)}</p>
        ${s.key ? `<span class="human">${lang === "ro" ? "100% uman" : "100% human"}</span>` : ""}
      </li>`).join("");
    $("#ai-tools").innerHTML = `<span class="tools-label">${T(UI.cta.aiTools)}</span>` + CV.aiTools.map((x) => `<span class="tag">${esc(x)}</span>`).join("");

    // skills
    $("#skills-grid").innerHTML = shown(CV.skills).map((s) => `
      <article class="panel skill reveal">
        <div class="skill-ico">${icon(s.icon)}</div>
        <h3>${T(s.group)}</h3><p>${T(s.note)}</p>
        <ul class="tags">${s.items.map((i) => `<li class="tag">${T(i)}</li>`).join("")}</ul>
      </article>`).join("");

    // projects
    const projects = shown(CV.projects);
    const more = projects.filter((p) => !p.featured);
    $("#more-grid").innerHTML = more.map((p) => `
      <article class="panel mini reveal">
        <div class="project-top"><h3>${T(p.title)}</h3>${p.status ? `<span class="pill ${esc(p.status)}">${T(UI.status[p.status] || p.status)}</span>` : ""}</div>
        <p>${T(p.summary)}</p>
        <ul class="tags">${(p.tags || []).map((x) => `<li class="tag">${T(x)}</li>`).join("")}</ul>
        ${p.links?.length ? `<div class="project-links">${p.links.map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${T(l.label)} ↗</a>`).join("")}</div>` : ""}
      </article>`).join("");
    $("#more-grid").previousElementSibling.hidden = !more.length;
    $("#projects-grid").innerHTML = projects.filter((p) => p.featured).map((p) => `
      <article class="panel project reveal">
        <div class="project-top"><span class="project-kind">${T(p.kind)}</span>${p.status ? `<span class="pill ${esc(p.status)}">${T(UI.status[p.status] || p.status)}</span>` : ""}</div>
        <h3>${T(p.title)}<span class="yr">${T(p.period)}</span></h3>
        <p>${T(p.summary)}</p>
        ${p.bullets?.length ? `<ul class="pts">${p.bullets.map((b) => `<li>${T(b)}</li>`).join("")}</ul>` : ""}
        <ul class="tags">${(p.tags || []).map((x) => `<li class="tag">${T(x)}</li>`).join("")}</ul>
        ${p.links?.length ? `<div class="project-links">${p.links.map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${T(l.label)} ↗</a>`).join("")}</div>` : ""}
      </article>`).join("");

    $("#labs").innerHTML = shown(CV.labs).map((l) => `
      <li class="tl reveal">
        <div class="tl-head"><h3>${T(l.title)}</h3></div>
        <div class="tl-meta">${T(l.where)}</div>
        <ul>${l.bullets.map((b) => `<li>${T(b)}</li>`).join("")}</ul>
        ${l.link ? `<p><a href="${esc(l.link.url)}" target="_blank" rel="noopener">${T(l.link.label)} ↗</a></p>` : ""}
      </li>`).join("");

    // certifications
    $("#certs-grid").innerHTML = shown(CV.certifications).map((c) => `
      <article class="panel cert reveal">
        <div class="cert-ico">${icon("cert")}</div>
        <div><h3>${c.url ? `<a href="${esc(c.url)}" target="_blank" rel="noopener">${T(c.name)} ↗</a>` : T(c.name)}</h3><p>${T(c.detail)}</p></div>
        <span class="cert-date">${T(c.date)}</span>
      </article>`).join("");

    // achievements
    $("#ach-grid").innerHTML = shown(CV.achievements).map((a) => `
      <article class="panel ach reveal">
        <div class="ach-ico">${icon(a.icon)}</div>
        <h3>${T(a.title)}</h3><span class="date">${T(a.date)}</span>
        <p>${T(a.detail)}</p>
      </article>`).join("");

    // education & languages
    $("#edu").innerHTML = shown(CV.education).map((e) => `
      <li class="tl reveal">
        <div class="tl-head"><h3>${T(e.school)}</h3><span class="tl-meta">${T(e.period)}</span></div>
        <div class="tl-sub">${T(e.degree)}</div>
        ${e.detail ? `<p>${T(e.detail)}</p>` : ""}
      </li>`).join("");
    $("#langs").innerHTML = shown(CV.languages).map((l) => `
      <li class="reveal"><div class="lang-row"><span>${T(l.name)}</span><span>${T(l.level)}</span></div>
      <div class="bar"><i data-w="${Number(l.value) || 0}"></i></div></li>`).join("");
    $$("#langs .bar i").forEach((i) => i.style.setProperty("--w", i.dataset.w + "%"));

    // contact
    $("#offers").innerHTML = shown(CV.offers).map((o) => `
      <article class="panel offer reveal"><span class="aud">${T(o.audience)}</span><h3>${T(o.title)}</h3>
      <ul>${o.points.map((p) => `<li>${T(p)}</li>`).join("")}</ul></article>`).join("");
    $("#contact-box").innerHTML = `
      <div>
        <a class="contact-mail" href="mailto:${esc(P.email)}">${esc(P.email)}</a>
        <div class="contact-meta">${P.showPhone && P.phone ? `<a href="tel:${esc(P.phone.replace(/\s/g, ""))}">${esc(P.phone)}</a> · ` : ""}${T(P.location)}</div>
        <div class="social">${links.map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${icon(l.icon)}${esc(l.label)}</a>`).join("")}</div>
      </div>
      <div class="contact-actions">
        <a class="btn primary" href="mailto:${esc(P.email)}">${icon("mail")}${T(UI.cta.email)}</a>
        ${P.telegram ? `<a class="btn" href="https://t.me/${esc(P.telegram)}" target="_blank" rel="noopener">${icon("telegram")}${T(UI.cta.telegram)}</a>` : ""}
        <button class="btn" type="button" data-copy>${icon("copy")}<span>${T(UI.cta.copy)}</span></button>
      </div>`;
    $("#contact-box").classList.add("panel", "reveal");

    $("#footer-text").textContent = `© ${new Date().getFullYear()} ${P.name}. ${t(UI.footer)}`;

    if (firstRender) observeReveals();
    else $$(".reveal").forEach((el) => el.classList.add("in"));
    firstRender = false;
    setActiveNav();
  }

  function renderBadge() {
    const L = lang === "ro";
    $("#badge").innerHTML = `
      <div class="badge-top"><span>${L ? "Acces · Blue Team" : "Access · Blue Team"}</span><span class="chip" aria-hidden="true"></span></div>
      <span class="verified">${L ? "VERIFICAT" : "VERIFIED"}</span>
      <div class="badge-body">
        <div class="badge-photo"><img src="${esc(P.photo)}" alt="${esc(P.name)}" width="380" height="512"></div>
        <div class="badge-fields">
          <div><div class="field-k">${L ? "Nume" : "Name"}</div><div class="field-v">${esc(P.name)}</div></div>
          <div><div class="field-k">${L ? "Rol" : "Role"}</div><div class="field-v">${T(P.role)}</div></div>
          <div><div class="field-k">${L ? "Direcție" : "Focus"}</div><div class="field-v">${T(P.focus)}</div></div>
          <div><div class="field-k">Status</div><div class="field-v ok"><span class="pulse"></span>${P.available ? (L ? "Disponibil" : "Available") : (L ? "Ocupat" : "Busy")}</div></div>
        </div>
      </div>
      <div class="badge-foot"><div class="barcode" id="barcode" aria-hidden="true"></div><span class="badge-id">${esc(P.badgeId)}</span></div>`;
    // deterministic barcode from the badge id
    let h = 0; const seed = P.badgeId + P.name;
    const bars = [];
    for (let i = 0; i < 34; i++) { h = (h * 31 + seed.charCodeAt(i % seed.length) + i) >>> 0; bars.push(1 + (h % 4)); }
    $("#barcode").innerHTML = bars.map(() => "<i></i>").join("");
    $$("#barcode i").forEach((el, i) => { el.style.width = bars[i] + "px"; el.style.opacity = (h >> i) & 1 ? "0.85" : "0.5"; });
  }

  /* ---------- reveal + counters ---------- */
  function observeReveals() {
    if (reduced || !("IntersectionObserver" in window)) { $$(".reveal").forEach((el) => el.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        // stagger siblings slightly
        const idx = [...el.parentElement.children].indexOf(el);
        el.style.transitionDelay = Math.min(idx, 6) * 70 + "ms";
        el.classList.add("in");
        $$(".num", el).forEach(countUp);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal").forEach((el) => io.observe(el));
  }
  function countUp(el) {
    const to = Number(el.dataset.to); if (!to) return;
    const dur = 1300, t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * e);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- hero typing ---------- */
  function typeWhoami() {
    const el = $("#whoami-typed"), txt = "whoami";
    if (reduced) { el.textContent = txt; return; }
    let i = 0; const tick = () => { el.textContent = txt.slice(0, ++i); if (i < txt.length) setTimeout(tick, 110); };
    setTimeout(tick, 400);
  }
  let rotTimer;
  function rotator() {
    clearTimeout(rotTimer);
    const el = $("#rotator"); const items = P.rotating.map(t);
    if (reduced) { el.textContent = items[0]; return; }
    let i = 0, c = 0, del = false;
    const loop = () => {
      const w = items[i];
      c += del ? -1 : 1;
      el.textContent = w.slice(0, c);
      let wait = del ? 28 : 55;
      if (!del && c === w.length) { del = true; wait = 2200; }
      else if (del && c === 0) { del = false; i = (i + 1) % items.length; wait = 350; }
      rotTimer = setTimeout(loop, wait);
    };
    loop();
  }

  /* ---------- badge tilt ---------- */
  function tilt() {
    const b = $("#badge"); if (reduced || matchMedia("(hover: none)").matches) return;
    b.addEventListener("pointermove", (e) => {
      const r = b.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      b.style.setProperty("--ry", (x - 0.5) * 16 + "deg");
      b.style.setProperty("--rx", (0.5 - y) * 14 + "deg");
      b.style.setProperty("--mx", x * 100 + "%");
      b.style.setProperty("--my", y * 100 + "%");
    });
    b.addEventListener("pointerleave", () => { b.style.setProperty("--rx", "0deg"); b.style.setProperty("--ry", "0deg"); });
  }

  /* ---------- nav ---------- */
  function setActiveNav() {
    const ids = Object.keys(UI.nav); let cur = "";
    ids.forEach((id) => { const s = document.getElementById(id); if (s && s.getBoundingClientRect().top < innerHeight * 0.4) cur = id; });
    $$("[data-nav]").forEach((a) => a.classList.toggle("active", a.dataset.nav === cur));
    $(".nav").classList.toggle("scrolled", scrollY > 8);
  }

  /* ---------- toast / copy ---------- */
  let toastT;
  function toast(msg) { const el = $("#toast"); el.textContent = msg; el.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove("show"), 1800); }
  async function copyEmail() {
    try { await navigator.clipboard.writeText(P.email); toast(t(UI.cta.copied) + " " + P.email); return true; }
    catch { toast(P.email); return false; }
  }

  /* ---------- network background ---------- */
  function network() {
    const cv = $("#net"), ctx = cv.getContext("2d"); if (!ctx) return;
    let w, h, dpr, nodes = [], packets = [], raf, last = 0;
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2); w = innerWidth; h = innerHeight;
      cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(70, Math.round((w * h) / 24000));
      nodes = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18 }));
    };
    const D = 150;
    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (now - last < 33) return; last = now; // ~30fps is plenty
      ctx.clearRect(0, 0, w, h);
      for (const p of nodes) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1; }
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
        if (d < D) {
          ctx.strokeStyle = `rgba(110,150,200,${(1 - d / D) * 0.22})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          if (packets.length < 6 && Math.random() < 0.0009) packets.push({ a, b, t: 0 });
        }
      }
      ctx.fillStyle = "rgba(150,180,220,0.5)";
      for (const p of nodes) { ctx.beginPath(); ctx.arc(p.x, p.y, 1.4, 0, 6.283); ctx.fill(); }
      packets = packets.filter((k) => (k.t += 0.02) < 1);
      for (const k of packets) {
        const x = k.a.x + (k.b.x - k.a.x) * k.t, y = k.a.y + (k.b.y - k.a.y) * k.t;
        ctx.fillStyle = "rgba(92,225,230,0.95)"; ctx.shadowColor = "#5ce1e6"; ctx.shadowBlur = 10;
        ctx.beginPath(); ctx.arc(x, y, 2.2, 0, 6.283); ctx.fill(); ctx.shadowBlur = 0;
      }
    };
    resize(); addEventListener("resize", resize);
    if (reduced) { frame(1000); cancelAnimationFrame(raf); return; }
    raf = requestAnimationFrame(frame);
    document.addEventListener("visibilitychange", () => { cancelAnimationFrame(raf); if (!document.hidden) raf = requestAnimationFrame(frame); });
  }

  /* ---------- terminal ---------- */
  const term = { el: $("#term"), out: $("#term-out"), input: $("#term-input"), hist: [], hi: 0, booted: false };
  const line = (html = "") => { term.out.insertAdjacentHTML("beforeend", html + "\n"); const b = $("#term-body"); b.scrollTop = b.scrollHeight; };
  const plain = (v) => esc(t(v));
  const COMMANDS = {
    help: () => line(
`<span class="c">Available commands</span>
  <span class="g">whoami</span>       who is Victor
  <span class="g">about</span>        short profile
  <span class="g">skills</span>       technical skills
  <span class="g">projects</span>     things I've built
  <span class="g">certs</span>        certifications
  <span class="g">wins</span>         achievements
  <span class="g">edu</span>          education
  <span class="g">contact</span>      how to reach me
  <span class="g">email</span>        copy my email
  <span class="g">cv</span>           download / print CV
  <span class="g">lang</span> en|ro   switch language
  <span class="g">nmap</span> victor  scan me
  <span class="g">clear</span>, <span class="g">exit</span>`),
    whoami: () => line(`<span class="c">${esc(P.name)}</span>\n${plain(P.role)} · ${esc(t(P.focus))}\n${plain(P.location)}\n<span class="g">●</span> ${plain(P.availability)}`),
    about: () => CV.about.paragraphs.forEach((p) => line(plain(p) + "\n")),
    skills: () => shown(CV.skills).forEach((s) => line(`<span class="c">${plain(s.group)}</span>\n  ${s.items.map(t).map(esc).join(", ")}`)),
    projects: () => shown(CV.projects).forEach((p) => line(`<span class="c">${plain(p.title)}</span> <span class="m">(${plain(p.period)}${p.status ? " · " + plain(UI.status[p.status]) : ""})</span>\n  ${plain(p.summary)}${p.links?.[0] ? `\n  <a href="${esc(p.links[0].url)}" target="_blank" rel="noopener">${esc(p.links[0].url)}</a>` : ""}\n`)),
    certs: () => shown(CV.certifications).forEach((c) => line(`<span class="y">✓</span> <span class="c">${plain(c.name)}</span> <span class="m">${plain(c.date)}</span>\n  ${plain(c.detail)}`)),
    wins: () => shown(CV.achievements).forEach((a) => line(`<span class="y">★</span> <span class="c">${plain(a.title)}</span> <span class="m">${plain(a.date)}</span>\n  ${plain(a.detail)}`)),
    edu: () => shown(CV.education).forEach((e) => line(`<span class="c">${plain(e.school)}</span> <span class="m">${plain(e.period)}</span>\n  ${plain(e.degree)}`)),
    contact: () => {
      line(`<span class="c">email</span>   <a href="mailto:${esc(P.email)}">${esc(P.email)}</a>`);
      if (P.showPhone && P.phone) line(`<span class="c">phone</span>   <a href="tel:${esc(P.phone.replace(/\s/g, ""))}">${esc(P.phone)}</a>`); shown(CV.links).forEach((l) => line(`<span class="c">${esc(l.label.toLowerCase().padEnd(7))}</span> <a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.url)}</a>`)); },
    email: async () => { const ok = await copyEmail(); line(ok ? `<span class="g">copied</span> ${esc(P.email)} to clipboard` : esc(P.email)); },
    cv: () => { closeTerm(); CV.cvPdf ? (location.href = CV.cvPdf) : setTimeout(() => print(), 200); },
    lang: (a) => { if (a === "en" || a === "ro") { setLang(a); line(`<span class="g">language set to ${a}</span>`); } else line("usage: lang en|ro"); },
    nmap: (a) => {
      if (!a) return line("usage: nmap victor");
      line(`<span class="m">Starting Nmap 7.95 ( https://nmap.org )\nNmap scan report for ${esc(a)} (127.0.0.1)\nHost is up (0.0001s latency).</span>\n\nPORT      STATE  SERVICE\n<span class="g">22/tcp    open   curiosity</span>\n<span class="g">80/tcp    open   builder</span>\n<span class="g">443/tcp   open   blue-team</span>\n<span class="g">3000/tcp  open   ai-agents</span>\n<span class="r">666/tcp   closed giving-up</span>\n\n<span class="m">Nmap done: 1 IP address (1 host up). Recommendation: hire.</span>`);
    },
    sudo: (a) => {
      if (!/hire/.test(a)) return line(`<span class="r">guest is not in the sudoers file. This incident will be reported.</span> <span class="m">(try: sudo hire victor)</span>`);
      line(`<span class="g">[sudo] permission granted.</span> Opening a draft to ${esc(P.email)}…`);
      setTimeout(() => (location.href = `mailto:${P.email}?subject=${encodeURIComponent("Opportunity for Victor")}`), 700);
    },
    ls: () => line("about.txt  skills.txt  projects/  certs.txt  wins.txt  edu.txt  contact.txt"),
    cat: (a) => { const k = (a || "").replace(/\/|\.txt$/g, ""); COMMANDS[k] && k !== "cat" ? COMMANDS[k]() : line(`cat: ${esc(a || "")}: No such file`); },
    clear: () => (term.out.innerHTML = ""),
    exit: () => closeTerm(),
  };
  Object.assign(COMMANDS, { achievements: COMMANDS.wins, education: COMMANDS.edu, certifications: COMMANDS.certs, "?": COMMANDS.help, hire: () => COMMANDS.sudo("hire") });

  function run(raw) {
    const cmd = raw.trim(); line(`<span class="g">guest@vb:~$</span> ${esc(cmd)}`);
    if (!cmd) return;
    term.hist.push(cmd); term.hi = term.hist.length;
    const [name, ...rest] = cmd.split(/\s+/);
    const fn = COMMANDS[name.toLowerCase()];
    fn ? fn(rest.join(" ")) : line(`<span class="r">command not found: ${esc(name)}</span>. Type <span class="g">help</span>.`);
  }
  function openTerm() {
    term.el.hidden = false; term.input.focus();
    if (!term.booted) {
      term.booted = true;
      line(`<span class="m">Last login: ${new Date().toDateString()} from recruiter-console</span>`);
      line(`Welcome to <span class="c">${esc(P.name)}</span>'s terminal. Type <span class="g">help</span> to start.\n`);
    }
  }
  function closeTerm() { term.el.hidden = true; $("#term-open").focus(); }

  /* ---------- wiring ---------- */
  function setLang(l) { lang = l; store.set("lang", l); render(); rotator(); }

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-copy]")) { copyEmail(); const s = $("[data-copy] span"); s.textContent = t(UI.cta.copied); setTimeout(() => (s.textContent = t(UI.cta.copy)), 1600); }
    if (e.target.closest("[data-print]")) print();
  });
  $("#lang").addEventListener("click", () => setLang(lang === "en" ? "ro" : "en"));
  $("#term-open").addEventListener("click", openTerm);
  $("#term-close").addEventListener("click", closeTerm);
  term.el.addEventListener("click", (e) => { if (e.target === term.el) closeTerm(); else if (e.target.id === "term-body" || e.target.id === "term-out") term.input.focus(); });
  $("#term-form").addEventListener("submit", (e) => { e.preventDefault(); run(term.input.value); term.input.value = ""; });
  term.input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && term.hi > 0) { term.input.value = term.hist[--term.hi]; e.preventDefault(); }
    if (e.key === "ArrowDown") { term.hi = Math.min(term.hist.length, term.hi + 1); term.input.value = term.hist[term.hi] || ""; e.preventDefault(); }
    if (e.key === "Tab") { e.preventDefault(); const v = term.input.value; const m = Object.keys(COMMANDS).filter((k) => k.startsWith(v)); if (m.length === 1) term.input.value = m[0] + " "; else if (m.length) line(m.join("  ")); }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !term.el.hidden) closeTerm();
    const typing = /input|textarea/i.test(document.activeElement?.tagName || "");
    if (e.key === "`" && !typing) { e.preventDefault(); term.el.hidden ? openTerm() : closeTerm(); }
  });
  addEventListener("scroll", () => requestAnimationFrame(setActiveNav), { passive: true });

  render();
  typeWhoami();
  rotator();
  tilt();
  network();

  console.log("%c" + P.name + "%c\nLooking under the hood? Good instinct. Press ` on the page for a terminal, or write me: " + P.email,
    "font:700 20px sans-serif;color:#5ce1e6", "color:#8d9bb0");
})();
