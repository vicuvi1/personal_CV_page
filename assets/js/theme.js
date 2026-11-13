/* Theme (dark by default, light only when the visitor chooses it). Loaded in <head> so the theme is set
   before the page paints — no flash. The toggle button is wired on load.
   Inline scripts are blocked by the page's security policy, so this lives in its own file. */
(() => {
  "use strict";
  const root = document.documentElement;
  const KEY = "theme";
  const read = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
  const write = (v) => { try { localStorage.setItem(KEY, v); } catch { /* private mode */ } };

  // run immediately (head): pick the starting theme
  const start = read() || "dark";
  root.setAttribute("data-theme", start);


  // Anonymous visit counts (Vercel Web Analytics: no cookies, no personal data). Only on the Vercel site.
  if (/\.vercel\.app$/.test(location.hostname)) {
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    const va = document.createElement("script"); va.src = "/_vercel/insights/script.js"; va.defer = true;
    document.head.append(va);
  }

  const SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/></svg>';
  const MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>';

  function paintBtn(btn) {
    const dark = root.getAttribute("data-theme") === "dark";
    btn.innerHTML = dark ? SUN : MOON; // show what you'd switch TO
    btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    btn.title = dark ? "Light theme" : "Dark theme";
  }

  function init() {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    paintBtn(btn);
    btn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      write(next);
      paintBtn(btn);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
