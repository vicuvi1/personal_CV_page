/* Visual effects: intro screen, scrambled headings, cursor light, magnetic buttons,
   scroll-linked progress. Pure decoration; the page works without this file.
   Everything is skipped for visitors who ask their system for reduced motion. */
(() => {
  "use strict";
  const root = document.documentElement;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const session = {
    get(k) { try { return sessionStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch { /* private mode */ } },
  };

  /* ---------- intro screen (once per visit) ---------- */
  let markReady;
  window.bootReady = new Promise((r) => (markReady = r));
  const finish = () => { root.classList.add("ready"); markReady(); };

  if (reduced) {
    finish(); // no .fx class: nothing is hidden or animated
  } else {
    root.classList.add("fx");
    if (session.get("booted") || /[?&]noboot\b/.test(location.search)) finish();
    else { session.set("booted", "1"); boot(); }
    setTimeout(finish, 4000); // safety net: never leave the hero hidden
  }

  function boot() {
    const name = (window.CV && window.CV.person && window.CV.person.name) || "";
    const el = document.createElement("div");
    el.className = "boot";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = `<div class="boot-box"><div class="boot-lines"></div><div class="boot-bar"><i></i></div><div class="boot-granted">ACCESS GRANTED</div><div class="boot-skip">click or press any key to skip</div></div>`;
    document.body.appendChild(el);
    const lines = el.querySelector(".boot-lines");
    const steps = ["establishing secure session", "verifying identity · " + name, "loading profile"];
    const timers = steps.map((s, i) => setTimeout(() => lines.insertAdjacentHTML("beforeend", `<p><span>[ OK ]</span> ${esc(s)}</p>`), 120 + i * 230));
    timers.push(setTimeout(() => el.classList.add("fill"), 720));
    timers.push(setTimeout(() => el.classList.add("granted"), 1250));
    timers.push(setTimeout(close, 1800));
    let closed = false;
    function close() {
      if (closed) return;
      closed = true;
      timers.forEach(clearTimeout);
      removeEventListener("keydown", close);
      el.classList.add("out");
      setTimeout(finish, 180);
      setTimeout(() => el.remove(), 800);
    }
    el.addEventListener("click", close);
    addEventListener("keydown", close);
  }

  /* ---------- text scramble ---------- */
  const GLYPHS = "!<>-_\\/[]{}=+*^?#%$01ABCDEFXZ";
  function scramble(el, text, dur = 800) {
    if (reduced || !text) { el.textContent = text; return; }
    const chars = [...text];
    const at = chars.map((_, i) => (i / chars.length) * 0.65 + Math.random() * 0.35); // when each letter settles
    const t0 = performance.now();
    const frame = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      el.textContent = chars.map((c, i) => (c === " " || p >= at[i] ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join("");
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = text;
    };
    requestAnimationFrame(frame);
  }
  window.fxScramble = scramble;

  /* ---------- scroll: progress bar, parallax, light-up sections ---------- */
  let sraf = 0;
  function scrollFx() {
    sraf = 0;
    const vh = innerHeight;
    const max = root.scrollHeight - vh;
    const bar = document.getElementById("progress");
    if (bar) bar.style.setProperty("--p", max > 0 ? (scrollY / max).toFixed(4) : "0");

    document.querySelectorAll("[data-progress]").forEach((el) => {
      const r = el.getBoundingClientRect();
      const start = vh * 0.85, end = vh * 0.4;
      const p = reduced ? 1 : clamp((start - r.top) / (start - end + r.height * 0.5), 0, 1);
      el.style.setProperty("--p", p.toFixed(3));
      const kids = el.children, n = kids.length;
      for (let i = 0; i < n; i++) kids[i].classList.toggle("lit", p > 0 && p >= (n > 1 ? (i / (n - 1)) * 0.97 : 0));
    });

    // the badge drifts a little slower than the page
    if (finePointer && !reduced) {
      const badge = document.querySelector(".hero-badge");
      if (badge && scrollY < vh * 1.2) badge.style.translate = `0 ${(scrollY * 0.14).toFixed(1)}px`;
    }
  }
  const onScroll = () => { if (!sraf) sraf = requestAnimationFrame(scrollFx); };
  window.fxRefresh = onScroll;

  /* ---------- pointer: cursor light, card glow, magnetic buttons ---------- */
  function pointerFx() {
    if (!finePointer || reduced) return;
    let raf = 0, x = 0, y = 0, target = null, magnet = null;
    addEventListener("pointermove", (e) => {
      x = e.clientX; y = e.clientY; target = e.target;
      if (!raf) raf = requestAnimationFrame(apply);
    }, { passive: true });
    function apply() {
      raf = 0;
      root.style.setProperty("--cx", x + "px");
      root.style.setProperty("--cy", y + "px");
      if (!(target instanceof Element)) return;

      const card = target.closest(".panel, .stat, .footer-name");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (x - r.left).toFixed(0) + "px");
        card.style.setProperty("--my", (y - r.top).toFixed(0) + "px");
      }

      const m = target.closest(".btn, .icon-btn, .lang, .brand-mark");
      if (magnet && magnet !== m) magnet.style.translate = "";
      magnet = m;
      if (m) {
        const r = m.getBoundingClientRect();
        const dx = (x - r.left - r.width / 2) / r.width, dy = (y - r.top - r.height / 2) / r.height;
        m.style.translate = `${(dx * 10).toFixed(1)}px ${(dy * 8).toFixed(1)}px`;
      }
    }
    document.addEventListener("pointerleave", () => { if (magnet) magnet.style.translate = ""; magnet = null; });
  }

  /* ---------- headings scramble in when they scroll into view ---------- */
  function headingFx() {
    if (reduced || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      scramble(e.target, e.target.textContent, 700);
      io.unobserve(e.target);
    }), { threshold: 0.6 });
    document.querySelectorAll(".section-head h2, .sub-head").forEach((h) => io.observe(h));
  }

  document.addEventListener("DOMContentLoaded", () => {
    pointerFx();
    headingFx();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    scrollFx();
  });
})();
