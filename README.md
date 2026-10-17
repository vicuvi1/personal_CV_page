# Victor Bărbuță — personal CV page

Live: https://victor-barbuta.vercel.app

A fast, single-page CV for an Information Security student (SOC / Blue Team). Plain HTML, CSS and JavaScript: no framework, no build step, no trackers.

## How to update the content

**Everything you see on the page lives in [`content.js`](content.js).** You never need to touch the other files.

1. Open `content.js` (on GitHub: click the file, then the ✏️ pencil icon).
2. Change the text, or copy an existing block to add a new one (a project, certificate, achievement…).
3. Commit. Vercel redeploys automatically in about 30 seconds.

Rules of thumb:

| You want to… | Do this |
| --- | --- |
| Write in both languages | `{ en: "English", ro: "Română" }` |
| Same text in both languages | a plain string: `"Python"` |
| Hide something without deleting it | add `hidden: true` to that block |
| Add a project | copy a block in `projects: [ … ]`, paste it below, edit it |
| Change your photo | replace `assets/img/victor.jpg` (portrait, ~3:4) |
| Show your phone number | `showPhone: true` |
| Offer a real PDF | put it in `assets/` and set `cvPdf: "assets/your-file.pdf"` |
| Rename a section | edit `window.UI.sections` at the bottom of `content.js` |

Project status labels: `"live"`, `"building"`, `"done"`, `"team"`.

## Run it locally

```bash
py -m http.server 5173
```

Then open http://localhost:5173.

## Features

- English / Romanian switch (remembers the visitor's choice, defaults to the browser language)
- Animated ID badge, network background, counters (all respect *reduce motion*)
- Hidden terminal: press <kbd>`</kbd> or click `>_`, then try `help`, `nmap victor`, `sudo hire victor`
- "Download CV" prints a clean, light, one-column CV (or serves your PDF if `cvPdf` is set)
- Strict security headers in `vercel.json` (CSP, HSTS, X-Frame-Options, etc.) and `/.well-known/security.txt`
- SEO: Open Graph tags and schema.org `Person` data
