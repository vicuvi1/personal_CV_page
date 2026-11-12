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
  // links to a #section stay on the page; everything else opens a new tab
  const anchor = (url, label, cls = "") => `<a${cls ? ` class="${cls}"` : ""} href="${esc(url)}"${url.startsWith("#") ? "" : ' target="_blank" rel="noopener"'}>${label}</a>`;

  /* ---------- icons ---------- */
  const svg = (p) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const ICONS = {
    trophy: svg('<path d="M8 4h8v5a4 4 0 01-8 0z"/><path d="M8 6H4v1a4 4 0 004 4M16 6h4v1a4 4 0 01-4 4M12 13v4M8 21h8M9 17h6"/>'),
    belt: svg('<path d="M3 10h18v4H3z"/><path d="M10 9h4v6h-4zM11 15l-2 6M13 15l2 6"/>'),
    crown: svg('<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 10H5z"/><path d="M5 21h14"/>'),
    github: svg('<path d="M9 19c-4 1.3-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 00-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>'),
    flag: svg('<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>'),
    telegram: svg('<path d="M21 4L3 11l6 2.5M21 4l-3 16-9-6.5M21 4L9 13.5V19l3-3.5"/>'),
    x: svg('<path fill="currentColor" stroke="none" d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77zm-1.08 16.2h1.7L7.4 4.73H5.58z"/>'),
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
  let verdict = null; // the triage demo's choice survives a language switch

  const cvButton = (label) => CV.cvPdf
    ? `<a class="btn" href="${esc(CV.cvPdf)}" download>${icon("download")}${label}</a>`
    : `<button class="btn" type="button" data-print>${icon("download")}${label}</button>`;

  function projectCard(p) {
    return `
      <article class="row-card project reveal">
        ${p.shot ? `<div class="proj-shot"><img src="${esc(p.shot)}" alt="${T(p.title)} screenshot" loading="lazy"></div>` : ""}
        <div class="project-top">${p.kind ? `<span class="project-kind">${T(p.kind)}</span>` : "<span></span>"}${p.status ? `<span class="pill ${esc(p.status)}">${T(UI.status[p.status] || p.status)}</span>` : ""}</div>
        <h3>${T(p.title)}<span class="yr">${T(p.period)}</span></h3>
        <p>${T(p.summary)}</p>
        ${p.bullets?.length ? `<ul class="pts">${p.bullets.map((b) => `<li>${T(b)}</li>`).join("")}</ul>` : ""}
        <ul class="tags">${(p.tags || []).map((x) => `<li class="tag">${T(x)}</li>`).join("")}</ul>
        ${p.links?.length ? `<div class="project-links">${p.links.map((l) => anchor(l.url, `${T(l.label)} ↗`)).join("")}</div>` : ""}
      </article>`;
  }

  function renderIncident() {
    const R = CV.incident;
    const photos = shown(R.photos).map((ph) =>
      `<button class="wu-thumb" type="button" data-full="${esc(ph.src)}" data-cap="${T(ph.caption)}" aria-label="${T(ph.caption)}"><img src="${esc(ph.src)}" alt="${T(ph.caption)}" loading="lazy"></button>`).join("");
    $("#incident-body").innerHTML = `
      <div class="case-bar"><span class="case-id">${esc(R.caseId)}</span>${R.meta.map((m) => `<span>${T(m)}</span>`).join("")}</div>
      ${R.cover ? `<figure class="case-cover"><img src="${esc(R.cover)}" alt="${T(R.coverCaption)}" width="1400" height="702" loading="lazy"><figcaption>${T(R.coverCaption)}</figcaption></figure>` : ""}
      <div class="case-pad">
        <h3 class="case-title">${T(R.title)}</h3>
        <p class="case-summary">${T(R.summary)}</p>
        <ol class="chain">${R.chain.map((c) => `<li><strong>${T(c.value)}</strong><span>${T(c.label)}</span></li>`).join("")}</ol>
        <div class="table-wrap"><table class="data-table case-table">
          <thead><tr><th scope="col">${T(R.tableHead.did)}</th><th scope="col">${T(R.tableHead.see)}</th></tr></thead>
          <tbody>${R.rows.map((r) => `<tr><td data-th="${T(R.tableHead.did)}">${T(r.did)}</td><td data-th="${T(R.tableHead.see)}">${T(r.see)}</td></tr>`).join("")}</tbody>
        </table></div>
        <p class="table-note">${T(R.tableNote)}</p>
        <div class="case-notes">
          <div class="case-note finding"><h4>${T(R.finding.label)}</h4><p>${T(R.finding.text)}</p></div>
          <div class="case-note"><h4>${T(R.myRole.label)}</h4><p>${T(R.myRole.text)}</p></div>
        </div>
        <details class="fold">
          <summary>${T(UI.cta.readMore)}</summary>
          <div class="fold-body">
            ${photos ? `<div class="wu-gallery">${photos}</div>` : ""}
            ${shown(R.sections).map((s) => `<h4>${T(s.h)}</h4><p>${T(s.p)}</p>`).join("")}
          </div>
        </details>
      </div>`;
  }

  function renderTriage() {
    const section = $("#triage"), D = CV.triage;
    section.hidden = !D || D.hidden;
    if (section.hidden) return;
    const answered = verdict !== null;
    const response = answered && verdict !== "skip" ? D.responses[verdict] : null;
    $("#triage-body").innerHTML = `
      <p class="section-intro">${T(D.intro)}</p>
      <div class="console">
        <div class="console-bar"><span class="console-alert">${T(D.alert)}</span><span class="console-label">${T(D.label)}</span></div>
        <ol class="log-lines">${D.logs.map((l) => `<li><code>${esc(l)}</code></li>`).join("")}</ol>
      </div>
      <h3 class="triage-q">${T(UI.triageUi.pick)}</h3>
      <div class="verdicts" role="group" aria-label="${T(UI.triageUi.pick)}">
        ${D.verdicts.map((v) => `<button class="btn${verdict === v.id ? " picked" : ""}" type="button" data-verdict="${esc(v.id)}" aria-pressed="${verdict === v.id}">${T(v.label)}</button>`).join("")}
        <button class="btn-link" type="button" data-verdict="skip">${T(UI.triageUi.skip)}</button>
      </div>
      <div id="triage-answer" class="triage-answer" tabindex="-1"${answered ? "" : " hidden"}>
        ${response ? `<p class="triage-response">${T(response)}</p>` : ""}
        <h4>${T(D.verdictLabel)}</h4>
        <ol class="reasoning">${D.reasoning.map((r) => `<li>${T(r)}</li>`).join("")}</ol>
        <div class="case-note finding"><h4>${T(D.escalationLabel)}</h4><p>${T(D.escalation)}</p></div>
      </div>`;
  }

  function render() {
    document.documentElement.lang = lang;
    $$("[data-l]", $("#lang")).forEach((s) => s.classList.toggle("on", s.dataset.l === lang));
    $$("[data-ui]").forEach((el) => (el.textContent = ui(el.dataset.ui)));
    $$('[data-bind="initials"]').forEach((el) => (el.textContent = P.initials));
    $$('[data-bind="name"]').forEach((el) => (el.textContent = P.name));

    $("#nav-links").innerHTML = Object.entries(UI.nav)
      .filter(([id]) => !(id === "triage" && (!CV.triage || CV.triage.hidden)))
      .map(([id, label]) => `<a href="#${id}" data-nav="${id}">${T(label)}</a>`).join("") + `<span class="nav-ind" aria-hidden="true"></span>`;
    $("#menu-btn").setAttribute("aria-label", t(UI.cta.menu));

    // hero: the name is split into letters so they can rise in one by one
    const nameEl = $("#hero-name");
    if (nameEl.dataset.name !== P.name) {
      let i = 0;
      const words = P.name.split(" ").map((w) => `<span class="w">${[...w].map((c) => `<span class="c" data-i="${i++}">${esc(c)}</span>`).join("")}</span>`);
      nameEl.innerHTML = `<span class="sr-only">${esc(P.name)}</span><span aria-hidden="true">${words.join(" ")}</span>`;
      $$(".c", nameEl).forEach((c) => c.style.setProperty("--i", c.dataset.i));
      nameEl.dataset.name = P.name;
    }
    $("#hero-goal").textContent = t(P.goal);
    $("#hero-chips").innerHTML = shown(P.chips).map((c) => `<li>${T(c)}</li>`).join("");
    $("#hero-pitch").textContent = t(P.pitch);
    $("#hero-cta").innerHTML =
      `<a class="btn primary" href="mailto:${esc(P.email)}">${icon("mail")}${T(UI.cta.contact)}</a>` +
      cvButton(T(UI.cta.cv)) +
      `<a class="btn hide-phone" href="#incident">${T(UI.cta.projects)}${icon("arrow")}</a>`;
    $("#status").innerHTML = P.available ? `<span class="pulse"></span>${T(P.availability)}` : "";
    $("#term-hint").textContent = `>_ ${t(UI.cta.terminalHint)}`;
    const W = P.work || {};
    $("#work").innerHTML = ["start", "hours", "mode", "shifts"].filter((k) => t(W[k]))
      .map((k) => `<div><dt>${T(UI.workLabels[k])}</dt><dd>${T(W[k])}</dd></div>`).join("");

    renderBadge();

    // 30-second proof
    $("#proof").innerHTML = shown(CV.proof).map((r) => `
      <li class="proof-row reveal${r.highlight ? " highlight" : ""}">
        <span class="proof-label">${T(r.label)}</span>
        <span class="proof-fact">${T(r.fact)}</span>
        ${r.link ? `<span class="proof-link">${anchor(r.link.url, `${T(r.link.label)}${r.link.url.startsWith("#") ? "" : " ↗"}`)}</span>` : ""}
      </li>`).join("");

    // log strip: the list is printed twice so the scroll loops seamlessly
    const feed = shown(CV.feed).map((f) => `<span class="fl ${esc(f.level)}"><b>[${esc(f.level.toUpperCase())}]</b>${T(f.text)}</span>`).join("");
    $("#feed").innerHTML = feed ? `<div class="feed-track"><div class="feed-group">${feed}</div><div class="feed-group">${feed}</div></div>` : "";

    renderIncident();
    renderTriage();

    // skills
    const SH = UI.skillHead;
    $("#skills-body").innerHTML = `
      <div class="table-wrap"><table class="data-table skills-table">
        <thead><tr><th scope="col">${T(SH.skill)}</th><th scope="col">${T(SH.tools)}</th><th scope="col">${T(SH.level)}</th><th scope="col">${T(SH.proof)}</th></tr></thead>
        <tbody>${shown(CV.skills).map((s) => `
          <tr class="reveal">
            <td data-th="${T(SH.skill)}"><strong>${T(s.skill)}</strong></td>
            <td data-th="${T(SH.tools)}">${T(s.tools)}</td>
            <td data-th="${T(SH.level)}"><span class="level ${esc(s.level)}">${T(UI.levels[s.level])}</span></td>
            <td data-th="${T(SH.proof)}">${s.proof ? anchor(s.proof.url, `${T(s.proof.label)} ↗`) : "<span class=\"none\">–</span>"}</td>
          </tr>`).join("")}</tbody>
      </table></div>`;

    // certificates
    $("#certs-grid").innerHTML = shown(CV.certifications).map((c) => `
      <article class="row-card cert reveal">
        <div class="cert-top"><h3>${c.url ? anchor(c.url, `${T(c.name)} ↗`) : T(c.name)}</h3><span class="cert-date">${T(UI.certKind[c.kind])} · ${T(c.date)}</span></div>
        <p>${T(c.detail)}</p>
      </article>`).join("");

    // projects
    const projects = shown(CV.projects);
    $("#projects-grid").innerHTML = projects.filter((p) => p.featured).map(projectCard).join("");
    $("#more-grid").innerHTML = projects.filter((p) => !p.featured).map(projectCard).join("");
    $("#labs").innerHTML = shown(CV.labs).map((l) => `
      <li class="row-card lab-card">
        <h3>${T(l.title)}</h3>
        <div class="tl-meta">${T(l.where)}</div>
        <ul>${l.bullets.map((b) => `<li>${T(b)}</li>`).join("")}</ul>
        ${l.link ? `<p>${anchor(l.link.url, `${T(l.link.label)} ↗`)}</p>` : ""}
      </li>`).join("");

    // workflow
    $("#pipeline").innerHTML = shown(CV.workflow).map((s, i) => `
      <li class="step reveal${s.key ? " key" : ""}">
        <div class="step-dot">${String(i + 1).padStart(2, "0")}</div>
        <h3>${T(s.title)}</h3><p>${T(s.text)}</p>
        ${s.key ? `<span class="human">${lang === "ro" ? "100% uman" : "100% human"}</span>` : ""}
      </li>`).join("");
    $("#ai-tools").innerHTML = `<span class="tools-label">${T(UI.cta.aiTools)}</span>` + CV.aiTools.map((x) => `<span class="tag">${esc(x)}</span>`).join("");

    // about + achievements
    $("#about-body").innerHTML = CV.about.paragraphs.map((p) => `<p class="reveal">${T(p)}</p>`).join("");
    $("#ach-grid").innerHTML = shown(CV.achievements).map((a) => `
      <article class="row-card ach reveal">
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
      <li class="reveal"><span>${T(l.name)}</span><span class="lang-level">${T(l.level)}</span></li>`).join("");

    // contact
    $("#offers").innerHTML = shown(CV.offers).map((o) => `
      <article class="row-card offer reveal"><span class="aud">${T(o.audience)}</span><h3>${T(o.title)}</h3>
      <ul>${o.points.map((p) => `<li>${T(p)}</li>`).join("")}</ul></article>`).join("");
    const links = shown(CV.links);
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
    $("#contact-box").classList.add("reveal");

    // phone bar
    $("#phone-bar").innerHTML =
      `<a class="btn primary" href="mailto:${esc(P.email)}">${icon("mail")}${T(UI.cta.emailShort)}</a>` + cvButton(T(UI.cta.cvShort));

    $("#footer-text").textContent = `© ${new Date().getFullYear()} ${P.name}. ${t(UI.footer)}`;
    // hide "Updated …" once it's more than 9 months old, so the page never looks abandoned
    const [uy, um] = String(CV.updatedOn || "").split("-").map(Number);
    const now = new Date(), age = uy ? (now.getFullYear() - uy) * 12 + now.getMonth() + 1 - um : 0;
    const showUpdated = uy && age <= 9;
    $("#footer-updated").textContent = showUpdated ? t(CV.updated) : "";
    const sep = $("#footer-updated")?.nextElementSibling;
    if (sep?.classList.contains("dot-sep")) sep.hidden = !showUpdated;
    $("#footer-plain").innerHTML = `<a href="cv.html">${T(UI.cta.plainCv)}</a> <span class="dot-sep">·</span> <a href="resume.txt">resume.txt</a>`;

    if (firstRender) observeReveals();
    else $$(".reveal").forEach((el) => el.classList.add("in"));
    firstRender = false;
    // number the section headers in document order, so inserting a section can't desync them
    $$(".section-head:not([hidden]) .section-no").filter((el) => !el.closest("[hidden]")).forEach((el, i) => (el.textContent = String(i + 1).padStart(2, "0")));

    setActiveNav();
    if (window.fxRefresh) window.fxRefresh();
  }

  function renderBadge() {
    const L = lang === "ro";
    $("#badge").innerHTML = `
      <div class="badge-top"><span>${L ? "Acces · Blue Team" : "Access · Blue Team"}</span><span class="chip" aria-hidden="true"></span></div>
      <span class="verified">${L ? "CAUT STAGIU" : "OPEN TO INTERNSHIP"}</span>
      <div class="badge-body">
        <div class="badge-photo"><img src="${esc(P.photo)}" alt="${esc(P.name)}" width="380" height="512"></div>
        <div class="badge-fields">
          <div><div class="field-k">${L ? "Nume" : "Name"}</div><div class="field-v">${esc(P.name)}</div></div>
          <div class="hide-phone"><div class="field-k">${L ? "Rol" : "Role"}</div><div class="field-v">${T(P.role)}</div></div>
          <div><div class="field-k">${L ? "Direcție" : "Focus"}</div><div class="field-v">${T(P.focus)}</div></div>
          <div><div class="field-k">Status</div><div class="field-v ok"><span class="pulse"></span>${P.available ? (L ? "Disponibil" : "Available") : (L ? "Ocupat" : "Busy")}</div></div>
        </div>
      </div>
      <div class="badge-foot hide-phone"><div class="barcode" id="barcode" aria-hidden="true"></div><span class="badge-id">${esc(P.badgeId)}</span></div>`;
    // deterministic barcode from the badge id
    let h = 0; const seed = P.badgeId + P.name;
    const bars = [];
    for (let i = 0; i < 34; i++) { h = (h * 31 + seed.charCodeAt(i % seed.length) + i) >>> 0; bars.push(1 + (h % 4)); }
    $("#barcode").innerHTML = bars.map(() => "<i></i>").join("");
    $$("#barcode i").forEach((el, i) => { el.style.width = bars[i] + "px"; el.style.opacity = (h >> i) & 1 ? "0.85" : "0.5"; });
  }

  /* ---------- reveal ---------- */
  function observeReveals() {
    if (reduced || !("IntersectionObserver" in window)) { $$(".reveal").forEach((el) => el.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        // stagger siblings slightly
        const idx = [...el.parentElement.children].indexOf(el);
        el.style.transitionDelay = Math.min(idx, 6) * 50 + "ms";
        el.classList.add("in");
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal").forEach((el) => io.observe(el));
  }
  // printing from the browser must never catch a card mid-animation
  addEventListener("beforeprint", () => $$(".reveal").forEach((el) => el.classList.add("in")));

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
    });
    b.addEventListener("pointerleave", () => { b.style.setProperty("--rx", "0deg"); b.style.setProperty("--ry", "0deg"); });
  }

  /* ---------- nav ---------- */
  function setActiveNav() {
    const ids = Object.keys(UI.nav); let cur = "";
    ids.forEach((id) => { const s = document.getElementById(id); if (s && !s.hidden && s.getBoundingClientRect().top < innerHeight * 0.4) cur = id; });
    $$("[data-nav]").forEach((a) => a.classList.toggle("active", a.dataset.nav === cur));
    const act = $(`[data-nav="${cur}"]`), ind = $(".nav-ind");
    if (ind && act) { ind.style.left = act.offsetLeft + "px"; ind.style.width = act.offsetWidth + "px"; ind.style.opacity = "1"; }
    else if (ind) ind.style.opacity = "0";
    $(".nav").classList.toggle("scrolled", scrollY > 8);
  }
  function toggleMenu(open) {
    const links = $("#nav-links"), btn = $("#menu-btn");
    const next = open ?? !links.classList.contains("open");
    links.classList.toggle("open", next);
    btn.setAttribute("aria-expanded", String(next));
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
        ctx.fillStyle = "rgba(92,225,230,0.95)";
        ctx.beginPath(); ctx.arc(x, y, 2.2, 0, 6.283); ctx.fill();
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
  const goTo = (id) => { closeTerm(); document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" }); };
  const CHIPS = ["help", "proof", "triage", "skills", "projects", "cv", "contact"];
  const COMMANDS = {
    help: () => line(
`<span class="c">Available commands</span>
  <span class="g">proof</span>        the 30-second case
  <span class="g">triage</span>       try the alert demo
  <span class="g">cv</span>           download my CV (PDF)
  <span class="g">whoami</span>       who is Victor
  <span class="g">about</span>        short profile
  <span class="g">skills</span>       skills and honest levels
  <span class="g">projects</span>     things I've built
  <span class="g">certs</span>        certificates and training
  <span class="g">wins</span>         achievements
  <span class="g">edu</span>          education
  <span class="g">contact</span>      how to reach me
  <span class="g">email</span>        copy my email
  <span class="g">lang</span> en|ro   switch language
  <span class="g">nmap</span> victor  scan me
  <span class="g">clear</span>, <span class="g">exit</span>`),
    proof: () => shown(CV.proof).forEach((r) => line(`<span class="c">${plain(r.label)}</span>\n  ${plain(r.fact)}${r.link && !r.link.url.startsWith("#") ? `\n  <a href="${esc(r.link.url)}" target="_blank" rel="noopener">${esc(r.link.url)}</a>` : ""}`)),
    triage: () => { if (!CV.triage || CV.triage.hidden) return line("triage: not available right now"); goTo("triage"); },
    whoami: () => line(`<span class="c">${esc(P.name)}</span>\n${plain(P.goal)}\n${plain(P.location)}\n<span class="g">●</span> ${plain(P.availability)}`),
    about: () => CV.about.paragraphs.forEach((p) => line(plain(p) + "\n")),
    skills: () => shown(CV.skills).forEach((s) => line(`<span class="c">${plain(s.skill)}</span> <span class="m">(${plain(UI.levels[s.level])})</span>\n  ${plain(s.tools)}`)),
    projects: () => shown(CV.projects).forEach((p) => line(`<span class="c">${plain(p.title)}</span> <span class="m">(${plain(p.period)}${p.status ? " · " + plain(UI.status[p.status]) : ""})</span>\n  ${plain(p.summary)}${p.links?.[0] ? `\n  <a href="${esc(p.links[0].url)}" target="_blank" rel="noopener">${esc(p.links[0].url)}</a>` : ""}\n`)),
    certs: () => shown(CV.certifications).forEach((c) => line(`<span class="y">✓</span> <span class="c">${plain(c.name)}</span> <span class="m">${plain(UI.certKind[c.kind])} · ${plain(c.date)}</span>\n  ${plain(c.detail)}`)),
    wins: () => shown(CV.achievements).forEach((a) => line(`<span class="y">★</span> <span class="c">${plain(a.title)}</span> <span class="m">${plain(a.date)}</span>\n  ${plain(a.detail)}`)),
    edu: () => shown(CV.education).forEach((e) => line(`<span class="c">${plain(e.school)}</span> <span class="m">${plain(e.period)}</span>\n  ${plain(e.degree)}`)),
    contact: () => {
      line(`<span class="c">email</span>     <a href="mailto:${esc(P.email)}">${esc(P.email)}</a>`);
      if (P.showPhone && P.phone) line(`<span class="c">phone</span>     <a href="tel:${esc(P.phone.replace(/\s/g, ""))}">${esc(P.phone)}</a>`); shown(CV.links).forEach((l) => line(`<span class="c">${esc(l.label.toLowerCase().padEnd(9))}</span> <a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.url)}</a>`)); },
    email: async () => { const ok = await copyEmail(); line(ok ? `<span class="g">copied</span> ${esc(P.email)} to clipboard` : esc(P.email)); },
    cv: () => { closeTerm(); CV.cvPdf ? (location.href = CV.cvPdf) : setTimeout(() => print(), 200); },
    lang: (a) => { if (a === "en" || a === "ro") { setLang(a); line(`<span class="g">language set to ${a}</span>`); } else line("usage: lang en|ro"); },
    nmap: (a) => {
      if (!a) return line("usage: nmap victor");
      line(`<span class="m">Starting Nmap 7.95 ( https://nmap.org )\nNmap scan report for ${esc(a)} (127.0.0.1)\nHost is up (0.0001s latency).</span>\n\nPORT      STATE  SERVICE\n<span class="g">22/tcp    open   curiosity</span>\n<span class="g">80/tcp    open   builder</span>\n<span class="g">443/tcp   open   blue-team</span>\n<span class="r">666/tcp   closed giving-up</span>\n\n<span class="m">Nmap done: 1 IP address (1 host up). Recommendation: hire.</span>`);
    },
    sudo: (a) => {
      if (!/hire/.test(a)) return line(`<span class="r">guest is not in the sudoers file. This incident will be reported.</span> <span class="m">(try: sudo hire victor)</span>`);
      line(`<span class="g">[sudo] permission granted.</span> Opening a draft to ${esc(P.email)}…`);
      setTimeout(() => (location.href = `mailto:${P.email}?subject=${encodeURIComponent("Opportunity for Victor")}`), 700);
    },
    ls: () => line("proof.txt  about.txt  skills.txt  projects/  certs.txt  wins.txt  edu.txt  contact.txt"),
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
  let termOpener = null;
  function openTerm(e) {
    termOpener = e?.currentTarget || $("#term-open");
    term.el.hidden = false;
    // on a phone the keyboard would cover the commands, so the input waits for a tap
    if (!matchMedia("(hover: none)").matches) term.input.focus();
    if (!term.booted) {
      term.booted = true;
      $("#term-chips").innerHTML = CHIPS.map((c) => `<button type="button" data-cmd="${c}">${c}</button>`).join("");
      line(`<span class="m">Last login: ${new Date().toDateString()} from recruiter-console</span>`);
      line(`Welcome to <span class="c">${esc(P.name)}</span>'s terminal. Tap a command, or type <span class="g">help</span>.\n`);
    }
  }
  function closeTerm() { term.el.hidden = true; (termOpener || $("#term-open")).focus(); }

  /* ---------- wiring ---------- */
  function setLang(l) { lang = l; store.set("lang", l); render(); rotator(); }

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-copy]")) { copyEmail(); const s = $("[data-copy] span"); s.textContent = t(UI.cta.copied); setTimeout(() => (s.textContent = t(UI.cta.copy)), 1600); }
    if (e.target.closest("[data-print]")) print();
    const v = e.target.closest("[data-verdict]");
    if (v) { verdict = v.dataset.verdict; renderTriage(); $("#triage-answer").focus({ preventScroll: true }); $("#triage-answer").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" }); }
    const c = e.target.closest("[data-cmd]");
    if (c) run(c.dataset.cmd);
    if (e.target.closest("#nav-links a")) toggleMenu(false);
    else if (!e.target.closest("#menu-btn") && $("#nav-links").classList.contains("open")) toggleMenu(false);
  });
  $("#lang").addEventListener("click", () => setLang(lang === "en" ? "ro" : "en"));
  $("#menu-btn").addEventListener("click", () => toggleMenu());
  $("#term-open").addEventListener("click", openTerm);
  $("#term-hint").addEventListener("click", openTerm);
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
    if (e.key === "Escape") toggleMenu(false);
    const typing = /input|textarea/i.test(document.activeElement?.tagName || "");
    if (e.key === "`" && !typing) { e.preventDefault(); term.el.hidden ? openTerm() : closeTerm(); }
  });
  addEventListener("scroll", () => requestAnimationFrame(setActiveNav), { passive: true });

  render();
  tilt();
  network();
  // the hero typing starts once the intro animation (fx.js) has finished
  (window.bootReady || Promise.resolve()).then(() => { typeWhoami(); rotator(); });

  // back-to-top button and phone bar: appear once you've scrolled past the hero buttons
  const toTop = $("#to-top"), bar = $("#phone-bar");
  const toggleScrolled = () => {
    const past = $("#hero-cta").getBoundingClientRect().bottom < 0;
    toTop.classList.toggle("show", scrollY > innerHeight * 0.9);
    bar.classList.toggle("show", past);
  };
  addEventListener("scroll", () => requestAnimationFrame(toggleScrolled), { passive: true });
  toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }));
  toggleScrolled();

  /* ---------- photo lightbox (write-up gallery + covers) ---------- */
  const lb = { el: $("#lightbox"), img: $("#lb-img"), cap: $("#lb-cap") };
  if (lb.el) {
    const openLb = (src, cap) => {
      lb.img.src = src; lb.img.alt = cap || ""; lb.cap.textContent = cap || "";
      lb.cap.style.display = cap ? "" : "none";
      lb.el.hidden = false; $("#lb-close").focus();
    };
    const closeLb = () => { lb.el.hidden = true; lb.img.src = ""; };
    document.addEventListener("click", (e) => {
      const thumb = e.target.closest(".wu-thumb");
      if (thumb) { openLb(thumb.dataset.full, thumb.dataset.cap); return; }
      const cover = e.target.closest(".proj-shot, .case-cover");
      if (cover) { e.preventDefault(); const im = cover.querySelector("img"); openLb(im.src, im.alt); }
    });
    $("#lb-close").addEventListener("click", closeLb);
    lb.el.addEventListener("click", (e) => { if (e.target === lb.el) closeLb(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lb.el.hidden) closeLb(); });
  }

  console.log("%c" + P.name + "%c\nLooking under the hood? Good instinct. Press ` on the page for a terminal, or write me: " + P.email,
    "font:700 20px sans-serif;color:#5ce1e6", "color:#8d9bb0");
})();
