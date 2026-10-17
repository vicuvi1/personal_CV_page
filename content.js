/* =====================================================================
   CONTENT FILE: this is the only file you need to edit.
   ---------------------------------------------------------------------
   • Text can be a plain string (same in every language) or a pair:
       { en: "English text", ro: "Text în română" }
   • To ADD something, copy an existing block inside a list [ ... ],
     paste it below, change the text. Keep the commas between blocks.
   • To HIDE something without deleting it, add:  hidden: true
   • Save → commit to GitHub → Vercel redeploys in about 30 seconds.
   ===================================================================== */

window.CV = {
  /* ---------- Basic info ---------- */
  person: {
    name: "Victor Bărbuță",
    initials: "VB",
    photo: "assets/img/victor.jpg",
    location: { en: "Chișinău, Moldova", ro: "Chișinău, Moldova" },
    email: "victor.barbuta@outlook.com",
    // The repo is public: anything written here is visible to everyone, even when hidden on the page.
    phone: "", // e.g. "+373 ..."; it only shows when showPhone is true
    showPhone: false,
    telegram: "vicuvi27", // without @; adds a "Message me on Telegram" button
    role: { en: "Information Security Student", ro: "Student la Securitate Informațională" },
    focus: "SOC / Blue Team",
    badgeId: "VB-2026-SI266",
    // Green status dot in the header and on the badge. Set available: false to hide it.
    available: true,
    availability: {
      en: "Open to SOC / Blue Team internships & freelance projects",
      ro: "Disponibil pentru stagii SOC / Blue Team și proiecte freelance",
    },
    // Lines that rotate under your name in the hero.
    rotating: [
      { en: "training for SOC / Blue Team", ro: "mă pregătesc pentru SOC / Blue Team" },
      { en: "Top 3% on TryHackMe", ro: "Top 3% pe TryHackMe" },
      { en: "building real software with AI agents", ro: "construiesc software real cu agenți AI" },
      { en: "4th of 12 teams at HackTrone", ro: "locul 4 din 12 echipe la HackTrone" },
      { en: "black belt in Taekwondo", ro: "centură neagră la Taekwondo" },
    ],
    pitch: {
      en: "First-year Information Security student at the Technical University of Moldova. I spend my time in Linux labs, packet captures and CTF rooms, and I build working software with AI-assisted workflows. I check and test every line myself before it ships.",
      ro: "Student în anul I la Securitate Informațională (UTM). Îmi petrec timpul în laboratoare Linux, capturi de trafic și camere CTF și construiesc software funcțional folosind fluxuri AI-assisted. Verific și testez fiecare linie înainte de integrare.",
    },
  },

  /* Link to a PDF version of your CV, e.g. "assets/Victor_Barbuta_CV.pdf".
     Leave empty ("") and the button uses the browser's "Save as PDF" instead. */
  cvPdf: "",

  /* Shown in the footer as "Updated <this>". Bump it when you make changes. */
  updated: { en: "Updated October 2026", ro: "Actualizat octombrie 2026" },

  /* ---------- Links (header, contact, terminal) ---------- */
  links: [
    { label: "GitHub", url: "https://github.com/vicuvi1", icon: "github" },
    { label: "TryHackMe", url: "https://tryhackme.com/p/vicuvi1", icon: "flag" },
    { label: "Telegram", url: "https://t.me/vicuvi27", icon: "telegram" },
    { label: "X", url: "https://x.com/vicuvi_1", icon: "x" },
    // { label: "LinkedIn", url: "https://www.linkedin.com/in/your-handle", icon: "linkedin" },
  ],

  /* ---------- Big numbers under the hero ---------- */
  stats: [
    { prefix: "Top ", value: 3, suffix: "%", label: { en: "TryHackMe global rank", ro: "clasament global TryHackMe" } },
    { value: 140, suffix: "+", label: { en: "TryHackMe rooms completed", ro: "camere TryHackMe finalizate" } },
    { value: 25, label: { en: "TryHackMe badges earned", ro: "insigne TryHackMe" } },
    { value: 4, suffix: "/12", label: { en: "HackTrone international CTF", ro: "HackTrone, CTF internațional" } },
    { value: 3, suffix: "×", label: { en: "National checkers champion", ro: "campion național la dame" } },
  ],

  /* ---------- Scrolling "SOC log" strip under the numbers ----------
     level: "ok" | "info" | "warn" | "block" | "alert"  (sets the color)  */
  feed: [
    { level: "ok", text: "hacktrone.ctf → placed 4/12 teams" },
    { level: "info", text: "tryhackme.rank → top 3% worldwide" },
    { level: "block", text: "ssh brute-force from 203.0.113.7 → denied" },
    { level: "ok", text: "soc-level-1 → path completed" },
    { level: "info", text: "registru-digital → nightly backup verified" },
    { level: "ok", text: "taekwondo → black belt acquired" },
    { level: "warn", text: "coffee.level → 12%, refill recommended" },
    { level: "ok", text: "workout-crew → 346/346 tests passing" },
    { level: "block", text: "phishing email → quarantined" },
    { level: "alert", text: "new opportunity? → victor.barbuta@outlook.com" },
  ],

  /* ---------- About ---------- */
  about: {
    paragraphs: [
      {
        en: "I'm aiming for defensive security: SOC analysis, network security and security automation. I learn by doing: TryHackMe paths (Pre Security, Cyber Security 101, SOC Level 1), pwn.college, Kali and Ubuntu VMs, Nmap and Wireshark.",
        ro: "Țintesc spre securitatea defensivă: analiză SOC, securitatea rețelelor și automatizare. Învăț prin practică: parcursuri TryHackMe (Pre Security, Cyber Security 101, SOC Level 1), pwn.college, mașini virtuale Kali și Ubuntu, Nmap și Wireshark.",
      },
      {
        en: "Alongside security, I build things people actually use: a Telegram fitness app, a records app my mother uses every day, and tools for my own AI agent setup. I use AI agents for speed, and I make sure I can explain, test and maintain every line myself.",
        ro: "Pe lângă securitate, construiesc lucruri folosite de oameni reali: o aplicație de fitness în Telegram, un registru digital pe care mama mea îl folosește zilnic și unelte pentru propriul meu mediu de agenți AI. Folosesc agenți AI pentru viteză, dar pot explica, testa și întreține singur fiecare linie.",
      },
      {
        en: "Years of competitive checkers and a Taekwondo black belt taught me the part that's hard to put on a CV: patience, focus under pressure and showing up every day.",
        ro: "Anii de dame la nivel competițional și centura neagră la Taekwondo m-au învățat ce e greu de pus într-un CV: răbdare, concentrare sub presiune și consecvență zilnică.",
      },
    ],
    interests: ["SOC analysis", "Blue Team", "Network Security", "Cloud Security", "Security Automation"],
  },

  /* ---------- How I work (AI-assisted pipeline) ---------- */
  workflow: [
    { title: { en: "Research", ro: "Cercetare" }, text: { en: "Understand the problem, the docs and the threat model first.", ro: "Înțeleg problema, documentația și riscurile înainte de orice." } },
    { title: { en: "Plan", ro: "Planificare" }, text: { en: "Break it into small steps with AI agents as a sparring partner.", ro: "Împart totul în pași mici, cu agenții AI ca partener de idei." } },
    { title: { en: "Prototype", ro: "Prototip" }, text: { en: "Fast drafts with Claude Code, Cursor and other tools.", ro: "Schițe rapide cu Claude Code, Cursor și alte unelte." } },
    { title: { en: "Verify", ro: "Verificare" }, text: { en: "I read, test and fix the code by hand. This is the step I never hand to the AI.", ro: "Citesc, testez și corectez manual codul. Pasul pe care nu-l deleg niciodată." }, key: true },
    { title: { en: "Ship", ro: "Livrare" }, text: { en: "Git branches, pull requests and small, reviewable commits.", ro: "Branch-uri Git, pull request-uri și commit-uri mici, ușor de verificat." } },
  ],
  aiTools: ["Claude Code", "Cursor", "Hermes", "Qwen", "Grok", "DeepSeek", "Antigravity"],

  /* ---------- Skills ---------- */
  skills: [
    {
      icon: "shield",
      group: { en: "Cybersecurity & networking", ro: "Securitate & rețelistică" },
      items: ["TCP/IP", "DNS", "HTTP", "Nmap", "Wireshark", "Enumeration", "Traffic analysis"],
      note: { en: "Fundamentals of defensive security and traffic analysis.", ro: "Fundamente de securitate defensivă și analiză de trafic." },
    },
    {
      icon: "terminal",
      group: { en: "Operating systems", ro: "Sisteme de operare" },
      items: ["Linux", "Kali Linux", "Ubuntu", "Windows", "Bash"],
      note: { en: "Terminal work, permissions, processes, basic administration.", ro: "Terminal, permisiuni, procese, administrare de bază." },
    },
    {
      icon: "code",
      group: { en: "Programming", ro: "Programare" },
      items: ["Python", "C", "C++", "SQL", "HTML", "CSS", "JavaScript"],
      note: { en: "From university labs to deployed side projects.", ro: "De la laboratoare la proiecte puse în producție." },
    },
    {
      icon: "layers",
      group: { en: "Virtualization", ro: "Virtualizare" },
      items: ["VirtualBox", "VMware", "Kali / Ubuntu labs"],
      note: { en: "Isolated lab environments for practice.", ro: "Medii de laborator izolate pentru practică." },
    },
    {
      icon: "git",
      group: { en: "Dev & collaboration", ro: "Development & colaborare" },
      items: ["Git", "GitHub", "Pull requests", "VS Code", "Supabase", "Vercel"],
      note: { en: "Team workflow with branches, reviews and clean merges.", ro: "Lucru în echipă cu branch-uri, review-uri și integrare curată." },
    },
    {
      icon: "spark",
      group: { en: "AI-assisted development", ro: "Dezvoltare asistată de AI" },
      items: ["Claude Code", "Cursor", "Hermes", "Agentic workflows", "Code review"],
      note: { en: "Research, prototyping, debugging, refactoring and docs, always verified by hand.", ro: "Cercetare, prototipare, debugging, refactorizare, documentație, verificate manual." },
    },
  ],

  /* ---------- Projects ----------
     featured: true  → big card at the top. Without it → small card under "More things I've built".
     status: "live" | "building" | "done" | "team"  (shows a small colored label)  */
  projects: [
    {
      featured: true,
      title: "Finance Helper",
      period: "2026",
      status: "live",
      kind: { en: "Personal project · PWA + desktop app", ro: "Proiect personal · PWA + aplicație desktop" },
      summary: {
        en: "A private personal-finance app that replaced my budgeting spreadsheet: 5-second expense logging, smart category rules and a single \"safe to spend today\" number.",
        ro: "O aplicație privată de finanțe personale care mi-a înlocuit tabelul de buget: înregistrare în 5 secunde, reguli inteligente de categorii și un singur număr „cât pot cheltui azi”.",
      },
      bullets: [
        { en: "Installs on the phone and works offline; Electron desktop app for Windows, Mac and Linux.", ro: "Se instalează pe telefon și merge offline; aplicație desktop Electron pentru Windows, Mac și Linux." },
        { en: "Own Telegram bot for logging and a weekly money report.", ro: "Bot Telegram propriu pentru înregistrare și un raport financiar săptămânal." },
        { en: "No account, no server, no tracking: data stays on the device. Unit + Playwright tests.", ro: "Fără cont, fără server, fără tracking: datele rămân pe dispozitiv. Teste unitare + Playwright." },
      ],
      tags: ["JavaScript", "PWA", "Electron", "Telegram Bot", "Playwright"],
      links: [{ label: "GitHub", url: "https://github.com/vicuvi1/Finance-Helper-App" }],
    },
    {
      featured: true,
      title: "Interview Manager",
      period: "2026",
      status: "live",
      kind: { en: "Full-stack web app", ro: "Aplicație web full-stack" },
      summary: {
        en: "A full platform for requesting, scheduling, running and getting paid for interviews, with a candidate portal and an admin workspace.",
        ro: "O platformă completă pentru solicitarea, programarea, desfășurarea și plata interviurilor, cu portal pentru candidați și spațiu de administrare.",
      },
      bullets: [
        { en: "Real-time updates, file uploads to private storage, calendar (.ics) invites.", ro: "Actualizări în timp real, fișiere în stocare privată, invitații de calendar (.ics)." },
        { en: "Telegram, Google Calendar and email integrations.", ro: "Integrări cu Telegram, Google Calendar și email." },
        { en: "Role-based access with Supabase Auth and row-level security.", ro: "Acces pe roluri cu Supabase Auth și row-level security." },
      ],
      tags: ["Next.js", "TypeScript", "Supabase", "Realtime", "Zod"],
      links: [
        { label: "Live", url: "https://interview-manager-umber.vercel.app" },
        { label: "GitHub", url: "https://github.com/vicuvi1/interview_manager" },
      ],
    },
    {
      featured: true,
      title: "FounderHQ",
      period: "2026",
      status: "building",
      kind: { en: "AI SaaS · Startup validation", ro: "SaaS cu AI · Validare de startup-uri" },
      summary: {
        en: "Validates startup demand before you build, using real evidence from Reddit, Hacker News, GitHub, Stack Overflow and Product Hunt.",
        ro: "Validează cererea pentru un startup înainte să-l construiești, pe baza dovezilor reale din Reddit, Hacker News, GitHub, Stack Overflow și Product Hunt.",
      },
      bullets: [
        { en: "Three modes: discover ideas, validate demand, generate an execution blueprint.", ro: "Trei moduri: descoperire idei, validare cerere, plan de execuție." },
        { en: "Ideas are scored against 5 survival tests; weak ideas are filtered out.", ro: "Ideile sunt evaluate prin 5 teste de supraviețuire; cele slabe sunt eliminate." },
        { en: "Founder profiles and saved sessions in Supabase.", ro: "Profiluri de fondator și sesiuni salvate în Supabase." },
      ],
      tags: ["Next.js", "TypeScript", "Claude API", "Supabase", "Vercel AI SDK"],
      links: [{ label: "GitHub", url: "https://github.com/vicuvi1/SaaS-Opportunity-Radar-In-App-AI" }],
    },
    {
      featured: true,
      title: "Workout Crew",
      period: "2026",
      status: "live",
      kind: { en: "Personal project · Telegram bot + Mini App", ro: "Proiect personal · Bot Telegram + Mini App" },
      summary: {
        en: "A self-hosted Telegram bot with a full app inside Telegram: live workout duels, crew chat, bets, proof clips, adaptive targets and an RPG-style progression system.",
        ro: "Un bot Telegram self-hosted cu o aplicație completă în Telegram: dueluri live de antrenament, chat de echipă, pariuri, clipuri-dovadă, obiective adaptive și un sistem de progres tip RPG.",
      },
      bullets: [
        { en: "346 automated tests; no build step on the frontend.", ro: "346 de teste automate; frontend fără build step." },
        { en: "Admin panel and moderator-approved quests.", ro: "Panou de administrare și quest-uri aprobate de moderator." },
        { en: "Self-hosted, so user data never leaves the server.", ro: "Self-hosted: datele utilizatorilor nu părăsesc serverul." },
      ],
      tags: ["Python", "python-telegram-bot", "SQLite", "aiohttp", "pytest"],
      shot: "assets/img/shot-workout.jpg", // screenshot banner on the card (click to enlarge)
      links: [{ label: "GitHub", url: "https://github.com/vicuvi1/Sport-Bot-Telegram-" }],
    },
    {
      featured: true,
      title: "Registru Digital",
      period: "2026",
      status: "live",
      kind: { en: "Real-world client · Web app", ro: "Client real · Aplicație web" },
      summary: {
        en: "Replaced a paper library register with a web app that is used every day. Built with data safety in mind: login, history, and saving that survives a lost connection.",
        ro: "Am înlocuit un registru de bibliotecă pe hârtie cu o aplicație web folosită zilnic. Construită cu accent pe siguranța datelor: autentificare, istoric și salvare care rezistă la pierderea conexiunii.",
      },
      bullets: [
        { en: "Supabase (Postgres + Auth) with row-level security, deployed on Vercel.", ro: "Supabase (Postgres + Auth) cu row-level security, publicat pe Vercel." },
        { en: "Nightly off-site backups with automated restore checks (GitHub Actions).", ro: "Backup-uri zilnice off-site cu verificare automată a restaurării (GitHub Actions)." },
        { en: "Offline-safe save queue, so edits are never lost.", ro: "Coadă de salvare offline, ca nicio modificare să nu se piardă." },
      ],
      tags: ["JavaScript", "Supabase", "PostgreSQL", "Vercel", "Backups"],
      links: [{ label: "GitHub", url: "https://github.com/vicuvi1/mother_app_registru" }],
    },
    {
      featured: true,
      title: "Deeptech GigaHack",
      period: "2026",
      status: "team",
      kind: { en: "Hackathon · Team of 5", ro: "Hackathon · Echipă de 5" },
      summary: {
        en: "Preparing a deep-tech project with a five-person team. I presented and defended it in English in front of investors, covering the problem, the solution and the technical approach.",
        ro: "Pregătesc un proiect deeptech într-o echipă de 5 membri. L-am prezentat și susținut în engleză în fața investitorilor, explicând problema, soluția și abordarea tehnică.",
      },
      bullets: [
        { en: "Team workflow on GitHub: branches, commits, pull requests, merging teammates' work.", ro: "Lucru în echipă pe GitHub: branch-uri, commit-uri, pull request-uri, integrarea contribuțiilor." },
        { en: "Rapid iteration with Cursor, Claude Code, Qwen, Grok, DeepSeek and Antigravity.", ro: "Iterare rapidă cu Cursor, Claude Code, Qwen, Grok, DeepSeek și Antigravity." },
      ],
      tags: ["Teamwork", "Pitching", "Git", "Prototyping"],
      links: [],
    },

    /* ----- Smaller projects (no "featured") ----- */
    {
      title: "Hermes Sync Hub",
      period: "2026",
      status: "building",
      summary: {
        en: "Moves a complete Hermes AI-agent environment (files, skills, memory, settings) between computers: export → transfer → restore.",
        ro: "Mută un mediu Hermes complet (fișiere, skills, memorie, setări) între calculatoare: export → transfer → restaurare.",
      },
      tags: ["TypeScript", "Monorepo", "AI agents"],
      links: [{ label: "GitHub", url: "https://github.com/vicuvi1/Hermes-Sync-Hub" }],
    },
    {
      title: "n8n AI Command Center",
      period: "2026",
      status: "done",
      summary: {
        en: "Describe an automation in plain English and Gemini builds the n8n workflow. Includes a SOC-style execution monitor that highlights failed runs.",
        ro: "Descrii o automatizare în cuvinte și Gemini construiește workflow-ul n8n. Include un monitor de execuții în stil SOC care evidențiază erorile.",
      },
      tags: ["Python", "Streamlit", "Gemini API", "n8n"],
      links: [{ label: "GitHub", url: "https://github.com/vicuvi1/n8n_app" }],
    },
    {
      title: "Jarvis",
      period: "2026",
      status: "done",
      summary: {
        en: "A fully offline voice assistant for Windows 11: wake word, local speech recognition and text-to-speech, with no cloud calls.",
        ro: "Un asistent vocal complet offline pentru Windows 11: cuvânt de activare, recunoaștere vocală și sinteză locală, fără apeluri în cloud.",
      },
      tags: ["Python", "faster-whisper", "openWakeWord", "Piper TTS"],
      links: [{ label: "GitHub", url: "https://github.com/vicuvi1/jarvis-assistant" }],
    },
    {
      title: "Hide & Survive",
      period: "2026",
      status: "done",
      summary: {
        en: "A co-op horror game on Roblox: an 8-zone facility and two AI enemies, one that hunts by sight and sound and one that only moves when nobody is looking.",
        ro: "Un joc horror co-op pe Roblox: o clădire cu 8 zone și doi inamici AI, unul care vânează după văz și sunet și altul care se mișcă doar când nimeni nu se uită.",
      },
      tags: ["Lua / Luau", "Roblox", "Game AI"],
      links: [{ label: "GitHub", url: "https://github.com/vicuvi1/roblox_game-horror" }],
    },
    {
      title: "Life OS",
      period: "2026",
      status: "building",
      summary: {
        en: "A dark-mode morning dashboard for goals, projects, tasks and habits that shows the 3 things that matter today.",
        ro: "Un dashboard de dimineață pentru obiective, proiecte, sarcini și obiceiuri, care arată cele 3 lucruri importante de azi.",
      },
      tags: ["Next.js", "TypeScript", "Firebase"],
      links: [{ label: "GitHub", url: "https://github.com/vicuvi1/life_os" }],
    },
    {
      title: { en: "Memory Constellation", ro: "Constelația amintirilor" },
      period: "2026",
      status: "live",
      summary: {
        en: "A gift website: a night sky where every star is a shared memory, with letters that unlock on future dates and a shared guestbook.",
        ro: "Un site-cadou: un cer înstelat în care fiecare stea e o amintire comună, cu scrisori care se deblochează în viitor și o carte de oaspeți.",
      },
      tags: ["Next.js", "Framer Motion", "Supabase"],
      links: [{ label: "GitHub", url: "https://github.com/vicuvi1/friend_webpage" }],
    },
  ],

  /* ---------- Write-ups ----------
     Each is a card that expands to the full text.
     To add one, copy a block. `sections` are the parts of the article;
     each has a heading (h) and a paragraph (p). status is optional. */
  writeups: [
    {
      title: "GigaHack 2026 — Red Team CTF",
      date: "Sep 2026",
      meta: { en: "Chișinău Cyber Arena · Team NAVI (4 people)", ro: "Chișinău Cyber Arena · Echipa NAVI (4 persoane)" },
      role: { en: "Operator / support", ro: "Operator / suport" },
      status: "team",
      tags: ["Red Team", "Active Directory", "MITRE ATT&CK", "CTF"],
      cover: "assets/img/gigahack-team.jpg",
      photos: [
        { src: "assets/img/gigahack-team.jpg", caption: { en: "Team NAVI at the GigaHack arena", ro: "Echipa NAVI în arena GigaHack" } },
        { src: "assets/img/gigahack-arena.jpg", caption: { en: "The main stage — DeepTech GigaHack 2026", ro: "Scena principală — DeepTech GigaHack 2026" } },
        { src: "assets/img/gigahack-banner.jpg", caption: { en: "“The largest hackathon in Moldova”", ro: "„Cel mai mare hackathon din Moldova”" } },
      ],
      summary: {
        en: "An authorized red-team competition on a shared practice lab. I was an operator/support member of the four-person team NAVI, which chained a single web foothold into control of five Windows/Linux domains and mapped a 41-host internal network. My takeaway is a defender's one: watching these attacks from the inside is the fastest way to learn how to spot them.",
        ro: "O competiție autorizată de tip red-team pe un laborator comun de practică. Am fost operator/suport în echipa de patru persoane NAVI, care a pornit de la un singur punct de intrare web și a ajuns să controleze cinci domenii Windows/Linux, cartografiind o rețea internă de 41 de hosturi. Concluzia mea e una de apărare: să vezi aceste atacuri din interior e cel mai rapid mod de a învăța cum să le detectezi.",
      },
      sections: [
        {
          h: { en: "What it was", ro: "Ce a fost" },
          p: {
            en: "GigaHack 2026's Cyber Arena was an authorized, scoped red-team CTF: seven teams sharing the same practice lab over a weekend, with clear rules of engagement and a defined list of targets. Nothing here touched real systems — everything happened inside the organizers' lab.",
            ro: "Cyber Arena de la GigaHack 2026 a fost un CTF red-team autorizat și delimitat: șapte echipe pe același laborator de practică, pe parcursul unui weekend, cu reguli clare și o listă definită de ținte. Nimic nu a atins sisteme reale — totul s-a petrecut în laboratorul organizatorilor.",
          },
        },
        {
          h: { en: "My role — honestly", ro: "Rolul meu — sincer" },
          p: {
            en: "I joined as an operator/support member of team NAVI (four people). The lead operator drove the main work; I helped with the early reconnaissance, kept the notes and timeline that became the team's report, and followed the kill chain step by step so I understood each stage. I was learning next to stronger teammates, not leading the compromise — and that's exactly why it was worth it.",
            ro: "Am participat ca operator/suport în echipa NAVI (patru persoane). Operatorul principal a condus partea grea; eu am ajutat la recunoașterea inițială, am ținut notițele și cronologia care au devenit raportul echipei și am urmărit pas cu pas lanțul de atac ca să înțeleg fiecare etapă. Învățam alături de colegi mai experimentați, nu conduceam compromiterea — și tocmai de asta a meritat.",
          },
        },
        {
          h: { en: "What the team achieved", ro: "Ce a reușit echipa" },
          p: {
            en: "Starting from one internet-facing web host, the team worked its way to control of five linked Windows/Linux domains and produced a full map of the 41-host internal network. It used known, published vulnerabilities in an identity server and in Active Directory Certificate Services, and abused trust between domains. The headline finding was a defensive one: industrial-control (OT/ICS) systems sat on the same reachable network as ordinary office machines — the kind of flat-network risk a blue team exists to catch.",
            ro: "Pornind de la un singur host web expus în internet, echipa a ajuns să controleze cinci domenii Windows/Linux legate între ele și a produs o hartă completă a rețelei interne de 41 de hosturi. A folosit vulnerabilități cunoscute și publicate dintr-un server de identitate și din Active Directory Certificate Services și a exploatat relațiile de încredere dintre domenii. Descoperirea principală a fost una de apărare: sisteme de control industrial (OT/ICS) se aflau în aceeași rețea accesibilă ca stațiile de birou obișnuite — exact genul de risc de rețea „plată” pe care un blue team există ca să-l prindă.",
          },
        },
        {
          h: { en: "What I took away (the blue-team angle)", ro: "Ce am învățat (din perspectiva blue team)" },
          p: {
            en: "Every step the team used leaves traces a defender can hunt for: default or reused passwords, certificate requests that shouldn't happen, directory replication coming from a machine that isn't a domain controller, and unusual cross-domain logins. Mapping each attack technique to what it looks like in logs — with the MITRE ATT&CK framework — is the work I want to do. This competition turned textbook techniques into things I've now watched happen in front of me.",
            ro: "Fiecare pas al echipei lasă urme pe care un apărător le poate căuta: parole implicite sau reutilizate, cereri de certificate care n-ar trebui să existe, replicare de director venită de la o mașină care nu e controler de domeniu și autentificări neobișnuite între domenii. Să mapez fiecare tehnică de atac la felul în care arată în loguri — cu framework-ul MITRE ATT&CK — este munca pe care vreau s-o fac. Competiția a transformat tehnici din manual în lucruri pe care le-am văzut acum întâmplându-se în fața mea.",
          },
        },
        {
          h: { en: "A note on detail", ro: "O notă despre detalii" },
          p: {
            en: "A full technical report exists for the competition judges. This page stays high-level on purpose — it isn't a how-to. I'm happy to walk through the specifics and the detection ideas in an interview.",
            ro: "Există un raport tehnic complet pentru juriul competiției. Această pagină rămâne la nivel general intenționat — nu e un ghid pas cu pas. Pot explica detaliile și ideile de detecție într-un interviu.",
          },
        },
      ],
    },
  ],

  /* ---------- Labs & practice (timeline) ---------- */
  labs: [
    {
      title: { en: "Linux & virtualization", ro: "Linux & virtualizare" },
      where: "UTM / pwn.college",
      bullets: [
        { en: "Set up and used Ubuntu and Kali virtual machines for labs.", ro: "Am configurat și folosit mașini virtuale Ubuntu și Kali pentru laboratoare." },
        { en: "chmod & permissions, processes, signals, redirection, piping, basic administration.", ro: "chmod și permisiuni, procese, semnale, redirecționare, piping, administrare de bază." },
      ],
    },
    {
      title: { en: "Cryptography", ro: "Criptografie" },
      where: "UTM",
      bullets: [
        { en: "Implemented the Caesar cipher: encryption/decryption, key validation, permuted alphabet.", ro: "Am implementat cifrul Cezar: criptare/decriptare, validarea cheii, alfabet permutat." },
        { en: "Focus on algorithm logic, input validation and clearly explained code.", ro: "Accent pe logica algoritmilor, validarea inputului și explicarea clară a codului." },
      ],
      link: { label: "GitHub", url: "https://github.com/vicuvi1/cezar_labl.py" },
    },
    {
      title: { en: "Programming in C", ro: "Programare în C" },
      where: "UTM",
      bullets: [
        { en: "Data types, control flow, loops, arrays and numeric transformations.", ro: "Tipuri de date, if/else, switch, bucle, tablouri și transformări numerice." },
      ],
      link: { label: "GitHub", url: "https://github.com/vicuvi1/PC_C-language-_exercise" },
    },
  ],

  /* ---------- Certifications ---------- */
  certifications: [
    {
      name: "TryHackMe",
      date: "2026",
      detail: { en: "Top 3% · 140 rooms · 25 badges. Completed Pre Security, Cyber Security 101 and SOC Level 1.", ro: "Top 3% · 140 camere · 25 insigne. Finalizate: Pre Security, Cyber Security 101 și SOC Level 1." },
      url: "https://tryhackme.com/p/vicuvi1",
    },
    {
      name: "pwn.college",
      date: "2026",
      detail: { en: "Completed Introduction and Linux Luminarium (command-line practice).", ro: "Finalizate: Introduction și Linux Luminarium (practică în linia de comandă)." },
    },
    {
      name: "Certiport IT Specialist",
      date: "2024",
      detail: { en: "3 certifications: Python · Device Configuration & Management · Databases.", ro: "3 certificări: Python · Device Configuration & Management · Databases." },
    },
    {
      name: "Cambridge English",
      date: "2025",
      detail: { en: "International certificate, B2 level.", ro: "Certificare internațională, nivel B2." },
    },
  ],

  /* ---------- Achievements ---------- */
  achievements: [
    {
      icon: "trophy",
      title: "HackTrone",
      date: "Sep 2026",
      detail: { en: "4th of 12 teams at an international cybersecurity competition with a 90,000 MDL prize pool.", ro: "Locul 4 din 12 echipe la o competiție internațională de cybersecurity cu fond de premiere de 90.000 MDL." },
    },
    {
      icon: "belt",
      title: { en: "Taekwondo black belt", ro: "Centură neagră Taekwondo" },
      date: "2026",
      detail: { en: "Years of consistent training, discipline and long-term work.", ro: "Rezultatul pregătirii constante, disciplinei și muncii pe termen lung." },
    },
    {
      icon: "crown",
      title: { en: "National checkers champion", ro: "Campion național la dame" },
      date: "2019 – 2023",
      detail: { en: "Champion of the Republic of Moldova in 2019, 2020 and 2022; 2nd place at the Moldova Cup in 2023.", ro: "Campion al Republicii Moldova în 2019, 2020 și 2022; locul II la Cupa Moldovei în 2023." },
    },
  ],

  /* ---------- Education ---------- */
  education: [
    {
      school: { en: "Technical University of Moldova (UTM), FCIM", ro: "Universitatea Tehnică a Moldovei (UTM), FCIM" },
      degree: { en: "B.Sc. Information Security · Year 1 · Group SI-266", ro: "Securitate Informațională · Anul I · Grupa SI-266" },
      period: { en: "2026 – present", ro: "2026 – prezent" },
      detail: { en: "Relevant courses: Cryptography, Computer Programming (C), Programming Techniques, Mathematical Analysis.", ro: "Discipline relevante: Criptografie, Programarea Calculatoarelor (C), Tehnici de Programare, Analiză Matematică." },
    },
    {
      school: { en: "“B. P. Hasdeu” Theoretical High School, Drochia", ro: "Liceul Teoretic „B. P. Hasdeu”, Drochia" },
      degree: { en: "High school diploma", ro: "Studii liceale" },
      period: "2023 – 2026",
    },
  ],

  /* ---------- Languages (level: 0–100 fills the bar) ---------- */
  languages: [
    { name: { en: "Romanian", ro: "Română" }, level: { en: "Native", ro: "Nativ" }, value: 100 },
    { name: { en: "English", ro: "Engleză" }, level: "C1", value: 85 },
    { name: { en: "Russian", ro: "Rusă" }, level: "B2", value: 70 },
  ],

  /* ---------- Who I can help (contact section) ---------- */
  offers: [
    {
      audience: { en: "For hiring managers", ro: "Pentru angajatori" },
      title: { en: "Internship or junior SOC / Blue Team role", ro: "Stagiu sau rol junior SOC / Blue Team" },
      points: [
        { en: "Hands-on Linux, networking and traffic analysis", ro: "Practică reală în Linux, rețelistică și analiză de trafic" },
        { en: "I learn fast and keep going (Top 3% on TryHackMe)", ro: "Învăț repede și sunt consecvent (Top 3% pe TryHackMe)" },
        { en: "Comfortable presenting in English, Romanian and Russian", ro: "Prezint fără probleme în engleză, română și rusă" },
      ],
    },
    {
      audience: { en: "For clients", ro: "Pentru clienți" },
      title: { en: "Small apps, bots & automation", ro: "Aplicații mici, boți și automatizări" },
      points: [
        { en: "Telegram bots and Mini Apps", ro: "Boți Telegram și Mini Apps" },
        { en: "Web apps with Supabase + Vercel, with backups", ro: "Aplicații web cu Supabase + Vercel, cu backup-uri" },
        { en: "Turning paper or Excel processes into simple tools", ro: "Transform procese pe hârtie sau Excel în unelte simple" },
      ],
    },
  ],
};

/* ---------- Interface labels (rename sections here) ---------- */
window.UI = {
  nav: {
    about: { en: "About", ro: "Despre" },
    skills: { en: "Skills", ro: "Competențe" },
    projects: { en: "Projects", ro: "Proiecte" },
    writeups: { en: "Write-ups", ro: "Articole" },
    certs: { en: "Certifications", ro: "Certificări" },
    contact: { en: "Contact", ro: "Contact" },
  },
  sections: {
    about: { en: "Who I am", ro: "Cine sunt" },
    workflow: { en: "How I work with AI", ro: "Cum lucrez cu AI" },
    skills: { en: "Technical skills", ro: "Competențe tehnice" },
    projects: { en: "Projects & experience", ro: "Proiecte și experiență" },
    more: { en: "More things I've built", ro: "Alte proiecte construite" },
    writeups: { en: "Write-ups", ro: "Articole & analize" },
    labs: { en: "Labs & practice", ro: "Laboratoare și practică" },
    certs: { en: "Certifications & training", ro: "Certificări și formare" },
    achievements: { en: "Beyond the keyboard", ro: "Dincolo de tastatură" },
    education: { en: "Education", ro: "Educație" },
    languages: { en: "Languages", ro: "Limbi" },
    contact: { en: "Let's work together", ro: "Hai să lucrăm împreună" },
  },
  workflowIntro: {
    en: "AI makes me faster. It doesn't make my decisions. Every project goes through the same five steps, and one of them is always done by hand.",
    ro: "AI-ul mă face mai rapid, dar nu decide în locul meu. Fiecare proiect trece prin aceiași cinci pași, iar unul dintre ei îl fac mereu manual.",
  },
  achievementsIntro: {
    en: "Competition taught me focus long before code did.",
    ro: "Competiția m-a învățat concentrarea cu mult înainte de cod.",
  },
  contactIntro: {
    en: "Have an internship, a role, or an idea that needs building? I reply within a day.",
    ro: "Ai un stagiu, un post sau o idee care trebuie construită? Răspund în maximum o zi.",
  },
  writeupsIntro: {
    en: "Short notes on things I've taken apart and what I learned from them. More coming as I finish them.",
    ro: "Note scurte despre lucruri pe care le-am analizat și ce am învățat. Urmează mai multe pe măsură ce le finalizez.",
  },
  cta: {
    contact: { en: "Get in touch", ro: "Contactează-mă" },
    projects: { en: "See my work", ro: "Vezi proiectele" },
    cv: { en: "Download CV", ro: "Descarcă CV" },
    copy: { en: "Copy email", ro: "Copiază emailul" },
    copied: { en: "Copied!", ro: "Copiat!" },
    email: { en: "Write me an email", ro: "Scrie-mi un email" },
    telegram: { en: "Message on Telegram", ro: "Scrie-mi pe Telegram" },
    aiTools: { en: "Tools I use daily", ro: "Unelte folosite zilnic" },
    interests: { en: "What I'm aiming at", ro: "Ce țintesc" },
    readMore: { en: "Read write-up", ro: "Citește articolul" },
    readLess: { en: "Close", ro: "Închide" },
    terminalHint: { en: "Press ` to open the terminal", ro: "Apasă ` pentru terminal" },
  },
  status: {
    live: { en: "Live", ro: "Live" },
    building: { en: "In progress", ro: "În lucru" },
    done: { en: "Done", ro: "Finalizat" },
    team: { en: "Team", ro: "Echipă" },
  },
  footer: {
    en: "Built from scratch with plain HTML, CSS and JS. Strict security headers, no trackers.",
    ro: "Construit de la zero cu HTML, CSS și JS. Headere de securitate stricte, fără trackere.",
  },
};
