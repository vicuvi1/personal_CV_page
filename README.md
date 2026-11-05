# Victor Bărbuță — personal CV page

Live: https://victor-barbuta.vercel.app
Backup: https://vicuvi1.github.io/personal_CV_page/ (GitHub Pages, updated on every push by `.github/workflows/pages.yml`)

A fast, single-page CV for an Information Security student looking for a SOC / Blue Team internship. Plain HTML, CSS and JavaScript: no framework, no build step for the site, no trackers.

## How to update the content

**Everything you see on the page lives in [`content.js`](content.js).** You never need to touch the other files.

1. Open `content.js` (on GitHub: click the file, then the ✏️ pencil icon).
2. Change the text, or copy an existing block to add a new one (a project, certificate, achievement…).
3. If you changed facts, update the plain CV (see below).
4. Commit. Vercel redeploys automatically in about 30 seconds.

Rules of thumb:

| You want to… | Do this |
| --- | --- |
| Write in both languages | `{ en: "English", ro: "Română" }` |
| Same text in both languages | a plain string: `"Python"` |
| Hide something without deleting it | add `hidden: true` to that block |
| Add a project | copy a block in `projects: [ … ]`, paste it below, edit it |
| Say when you can work | fill in `person.work` (`start`, `hours`, `mode`, `shifts`) |
| Edit the incident report | `incident` (add ATT&CK IDs only after checking the competition rules) |
| Remove the triage demo | add `hidden: true` to `triage` |
| Change your photo | replace `assets/img/victor.jpg` (portrait, ~3:4) |
| Show your phone number | `showPhone: true` |
| Rename a section | edit `window.UI.sections` at the bottom of `content.js` |
| Make a project main or move it behind "See all projects" | add or remove `featured: true` |

Project status labels: `"live"`, `"building"`, `"done"`, `"team"`.

## Update the plain CV and the PDF

`cv.html`, `resume.txt` and the PDF are built from `content.js` and don't update by themselves.

```bash
node tools/build-cv.js
```

Then open `cv.html` from the local server below, print it to PDF with headers and footers off, and replace `assets/Victor_Barbuta_CV_SOC_Intern.pdf`. It should stay one page.

## Run it locally

```bash
py -m http.server 5173
```

Then open http://localhost:5173.

## Vercel setting

`/api/keepalive` only answers Vercel's cron. Add an environment variable named `CRON_SECRET` with a long random value in the Vercel project settings. Vercel then sends it with each cron request. Never put the value in this repo.

## Features

- English / Romanian switch (remembers the visitor's choice, defaults to the browser language)
- Dark by default, with a light theme toggle in the header
- SOC console style: colours mean something (cyan = clickable, green = real or done, amber = in progress)
- Phone layout: name, goal, proof and buttons on the first screen, a menu, and an Email + CV bar
- GigaHack incident report and a "Triage this alert" demo with clearly labelled made-up data
- Plain `/cv` page, `resume.txt` and a one-page PDF that work without JavaScript
- Terminal: click `>_` or press <kbd>`</kbd>, with tappable commands on phones (`proof`, `triage`, `cv`, `help`)
- Short "access granted" intro on the first visit of a session (click or any key skips it; add `?noboot` to skip it entirely)
- A social share card (`assets/img/og.png`) so links look good on Telegram, X, LinkedIn, etc.
- All effects live in `assets/js/fx.js` + `assets/css/fx.css` and switch off for visitors who choose *reduce motion*
- Strict security headers in `vercel.json` (CSP, HSTS, X-Frame-Options, etc.) and `/.well-known/security.txt`
- SEO: Open Graph tags and schema.org `Person` data
