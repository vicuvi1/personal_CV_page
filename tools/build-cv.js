/* Builds the plain versions of the CV from content.js: cv.html (also used for the PDF) and resume.txt.
   Run it after changing content.js:  node tools/build-cv.js
   These files are English only and work without JavaScript. */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "content.js"), "utf8"), ctx);
const { CV, UI } = ctx.window;

const t = (v) => (v == null ? "" : typeof v === "object" ? v.en ?? "" : String(v));
const shown = (list) => (list || []).filter((x) => !x.hidden);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const bare = (url) => url.replace(/^https?:\/\/(www\.)?/, "");

const P = CV.person;
const links = shown(CV.links).filter((l) => l.label !== "X");
const work = ["start", "hours", "mode", "shifts"].filter((k) => t(P.work[k])).map((k) => `${t(UI.workLabels[k])}: ${t(P.work[k])}`);
const proof = shown(CV.proof).filter((r) => t(r.label) !== "Languages" && t(r.label) !== "Memorable");
const R = CV.incident;
const incident = [t(R.summary), t(R.myRole.text), t(R.finding.text)];
const projects = shown(CV.projects).filter((p) => p.onCv);
const skills = shown(CV.skills).filter((s) => s.level !== "next");
const next = shown(CV.skills).filter((s) => s.level === "next");
const certs = shown(CV.certifications);
const edu = shown(CV.education);
const langs = shown(CV.languages).map((l) => `${t(l.name)}: ${t(l.level)}`).join(" · ");
const wins = shown(CV.achievements).filter((a) => t(a.title) !== "HackTrone");
const projectText = (p) => {
  const url = p.links?.[0]?.url;
  return { title: t(p.title), kind: t(p.kind), summary: t(p.summary), url };
};

/* ---------- cv.html ---------- */
const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self'; img-src 'self'; base-uri 'self'; form-action 'none'; object-src 'none'; upgrade-insecure-requests">
  <title>${esc(P.name)} | CV</title>
  <meta name="description" content="${esc(t(P.goal))}">
  <link rel="canonical" href="https://victor-barbuta.vercel.app/cv">
  <link rel="stylesheet" href="assets/css/cv.css">
</head>
<body>
<main>
  <header>
    <h1>${esc(P.name)}</h1>
    <p class="goal">${esc(t(P.goal))}</p>
    <p class="contact"><a href="mailto:${esc(P.email)}">${esc(P.email)}</a> · ${esc(t(P.location))}<br>${links.map((l) => `<a href="${esc(l.url)}">${esc(bare(l.url))}</a>`).join(" · ")}</p>
  </header>

  <h2>Availability</h2>
  <p>${esc(work.join(" · "))}</p>

  <h2>Highlights</h2>
  <ul>${proof.map((r) => `<li><strong>${esc(t(r.label))}:</strong> ${esc(t(r.fact))}</li>`).join("")}</ul>

  <h2>Security work</h2>
  <h3>${esc(t(R.title))}</h3>
  <p>${incident.map(esc).join(" ")}</p>

  <h2>Skills</h2>
  <ul>${skills.map((s) => `<li><strong>${esc(t(s.skill))}</strong> (${esc(t(UI.levels[s.level]).toLowerCase())}): ${esc(t(s.tools))}</li>`).join("")}${next.map((s) => `<li><strong>Learning next:</strong> ${esc(t(s.skill))}</li>`).join("")}</ul>

  <h2>Certificates and training</h2>
  <ul>${certs.map((c) => `<li><strong>${esc(t(c.name))}</strong>, ${esc(t(c.date))}: ${esc(t(c.detail))}</li>`).join("")}</ul>

  <h2>Projects</h2>
  <ul>${projects.map(projectText).map((p) => `<li><strong>${esc(p.title)}</strong>: ${esc(p.summary)}${p.url ? ` <a href="${esc(p.url)}">${esc(bare(p.url))}</a>` : ""}</li>`).join("")}</ul>

  <h2>Education</h2>
  <ul>${edu.map((e) => `<li><strong>${esc(t(e.school))}</strong>, ${esc(t(e.period))}: ${esc(t(e.degree))}</li>`).join("")}</ul>

  <h2>Languages</h2>
  <p>${esc(langs)}</p>

  <h2>Outside security</h2>
  <p>${wins.map((a) => `${esc(t(a.title))} (${esc(t(a.date))})`).join(" · ")}</p>

  <p class="screen-only"><a href="resume.txt">Plain text version</a> · <a href="./">Full page</a></p>
</main>
</body>
</html>
`;
fs.writeFileSync(path.join(root, "cv.html"), html);

/* ---------- resume.txt ---------- */
const head = (s) => `\n${s.toUpperCase()}\n`;
const txt = [
  P.name,
  t(P.goal),
  `${P.email} · ${t(P.location)}`,
  ...links.map((l) => l.url),
  head("Availability") + work.join("\n"),
  head("Highlights") + proof.map((r) => `- ${t(r.label)}: ${t(r.fact)}`).join("\n"),
  head("Security work") + `${t(R.title)}\n${incident.join("\n")}`,
  head("Skills") + skills.map((s) => `- ${t(s.skill)} (${t(UI.levels[s.level]).toLowerCase()}): ${t(s.tools)}`).concat(next.map((s) => `- Learning next: ${t(s.skill)}`)).join("\n"),
  head("Certificates and training") + certs.map((c) => `- ${t(c.name)}, ${t(c.date)}: ${t(c.detail)}`).join("\n"),
  head("Projects") + projects.map(projectText).map((p) => `- ${p.title}: ${p.summary}${p.url ? ` ${p.url}` : ""}`).join("\n"),
  head("Education") + edu.map((e) => `- ${t(e.school)}, ${t(e.period)}: ${t(e.degree)}`).join("\n"),
  head("Languages") + langs,
  head("Outside security") + wins.map((a) => `- ${t(a.title)} (${t(a.date)}): ${t(a.detail)}`).join("\n"),
].join("\n") + "\n";
fs.writeFileSync(path.join(root, "resume.txt"), txt);

console.log("Wrote cv.html and resume.txt. Now export the PDF again (see README).");
