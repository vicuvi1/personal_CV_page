/* =====================================================================
   CONTENT FILE: this is the only file you need to edit.
   ---------------------------------------------------------------------
   • Text can be a plain string (same in every language) or a pair:
       { en: "English text", ro: "Text în română" }
   • To ADD something, copy an existing block inside a list [ ... ],
     paste it below, change the text. Keep the commas between blocks.
   • To HIDE something without deleting it, add:  hidden: true
   • After changing facts, run `node tools/build-cv.js` to update /cv and resume.txt,
     then export the PDF again (see README).
   • Save → commit to GitHub → Vercel redeploys in about 30 seconds.
   ===================================================================== */

/* ---------- Study dates ----------
   Your year of study and the "student" / "graduate" wording are worked out from these
   dates every time the page loads, so the site stays correct each year without edits.
   Months are 1–12. */
const STUDY = { startYear: 2026, startMonth: 9, endYear: 2030, endMonth: 7 };
const study = (() => {
  const now = new Date();
  const months = now.getFullYear() * 12 + now.getMonth();
  const total = STUDY.endYear - STUDY.startYear;
  const year = Math.min(total, Math.max(1, Math.floor((months - (STUDY.startYear * 12 + STUDY.startMonth - 1)) / 12) + 1));
  return {
    done: months >= STUDY.endYear * 12 + STUDY.endMonth - 1,
    year,
    en: ["First", "Second", "Third", "Fourth", "Fifth", "Sixth"][year - 1],
    ro: ["I", "II", "III", "IV", "V", "VI"][year - 1],
  };
})();

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
    role: study.done
      ? { en: "Information Security Graduate", ro: "Absolvent de Securitate Informațională" }
      : { en: "Information Security Student", ro: "Student la Securitate Informațională" },
    focus: "SOC / Blue Team",
    badgeId: "VB-2026-SI266",
    // Green status dot in the header and on the badge. Set available: false to hide it.
    available: true,
    // The fixed line under your name. Never rotates: this is what you want.
    // The year updates itself every September (see STUDY at the top of this file).
    goal: study.done
      ? { en: "Information Security graduate · Looking for a SOC / Blue Team role", ro: "Absolvent de Securitate Informațională · Caut un post SOC / Blue Team" }
      : { en: `${study.en}-year Information Security student · Looking for a SOC / Blue Team internship`, ro: `Student în anul ${study.ro} la Securitate Informațională · Caut un stagiu SOC / Blue Team` },
    // Used in the PDF, /cv and resume.txt: those files don't change by themselves, so no year number here.
    goalPrint: {
      en: `Information Security student, UTM (${STUDY.startYear} – ${STUDY.endYear}) · Looking for a SOC / Blue Team internship`,
      ro: `Student la Securitate Informațională, UTM (${STUDY.startYear} – ${STUDY.endYear}) · Caut un stagiu SOC / Blue Team`,
    },
    availability: study.done
      ? { en: "Open to SOC / Blue Team roles. I reply within a day.", ro: "Disponibil pentru posturi SOC / Blue Team. Răspund în maximum o zi." }
      : { en: "Open to SOC / Blue Team internships. I reply within a day.", ro: "Disponibil pentru stagii SOC / Blue Team. Răspund în maximum o zi." },
    // When and how you can work. Empty fields ("") are not shown on the page.
    work: {
      start: "", // e.g. { en: "From February 2027", ro: "Din februarie 2027" }
      hours: "", // e.g. { en: "20 hours a week during term", ro: "20 de ore pe săptămână în timpul semestrului" }
      mode: { en: "On-site in Chișinău, hybrid or remote", ro: "La birou în Chișinău, hibrid sau de la distanță" },
      shifts: { en: "Day shifts and weekends", ro: "Ture de zi și în weekend" },
    },
    // Lines that rotate under your name in the hero (desktop and phone).
    rotating: [
      { en: "training for SOC / Blue Team", ro: "mă pregătesc pentru SOC / Blue Team" },
      { en: "4th of 12 teams at HackTrone", ro: "locul 4 din 12 echipe la HackTrone" },
      { en: "national checkers champion", ro: "campion național la dame" },
      { en: "black belt in Taekwondo", ro: "centură neagră la Taekwondo" },
    ],
    // Three short facts right under the goal.
    chips: [
      { en: "Top 3% TryHackMe", ro: "Top 3% TryHackMe" },
      { en: "SOC Level 1 done", ro: "SOC Level 1 finalizat" },
      { en: "4th of 12 CTF", ro: "Locul 4 din 12 la CTF" },
    ],
    pitch: {
      en: "I spend my time in Linux labs, packet captures and CTF rooms, and I build working software. I review and test what I ship, and I can explain how it works.",
      ro: "Îmi petrec timpul în laboratoare Linux, capturi de trafic și camere CTF și construiesc software funcțional. Verific și testez ce livrez și pot explica cum funcționează.",
    },
  },

  /* Link to the PDF version of your CV. Leave empty ("") and the button uses the browser's "Save as PDF" instead. */
  cvPdf: "assets/Victor_Barbuta_CV_SOC_Intern.pdf",

  /* Shown in the footer as "Updated <this>". Bump both when you make changes.
     It hides itself 9 months after updatedOn, so the page never shows an old date. */
  updated: { en: "Updated November 2026", ro: "Actualizat noiembrie 2026" },
  updatedOn: "2026-11",

  /* ---------- Links (header, contact, terminal) ---------- */
  links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/victor-barbuta-a0b69b2b9", icon: "linkedin" },
    { label: "GitHub", url: "https://github.com/vicuvi1", icon: "github" },
    { label: "TryHackMe", url: "https://tryhackme.com/p/vicuvi1", icon: "flag" },
    { label: "Telegram", url: "https://t.me/vicuvi27", icon: "telegram" },
    { label: "X", url: "https://x.com/vicuvi_1", icon: "x" },
  ],

  /* ---------- The 30-second proof block under the hero ----------
     One row per fact. url can be a web address or a #section on this page.
     highlight: true → the memorable one, drawn in amber. */
  proof: [
    {
      label: "TryHackMe",
      fact: { en: "Top 3% worldwide, 140+ rooms, SOC Level 1 path completed", ro: "Top 3% mondial, peste 140 de camere, parcursul SOC Level 1 finalizat" },
      link: { label: { en: "See profile", ro: "Vezi profilul" }, url: "https://tryhackme.com/p/vicuvi1" },
    },
    {
      label: "SiteSentry",
      fact: { en: "Built a website security scanner and used it on 100 popular sites: only 31% earn an A", ro: "Am construit un scanner de securitate pentru site-uri și l-am rulat pe 100 de site-uri populare: doar 31% iau nota A" },
      link: { label: { en: "Read the research", ro: "Citește cercetarea" }, url: "https://vicuvi1.github.io/SiteSentry/research.html" },
    },
    {
      label: "HiveWatch SOC",
      fact: { en: "Built a honeypot mini-SOC: 11 detection rules mapped to 25 MITRE ATT&CK techniques", ro: "Am construit un mini SOC cu honeypot-uri: 11 reguli de detecție mapate pe 25 de tehnici MITRE ATT&CK" },
      link: { label: { en: "See the project", ro: "Vezi proiectul" }, url: "#projects" },
    },
    {
      label: "HackTrone",
      fact: { en: "4th of 12 teams with team NAVI, international cybersecurity competition, Sep 2026", ro: "Locul 4 din 12 echipe cu echipa NAVI, competiție internațională de cybersecurity, sep. 2026" },
      link: { label: { en: "Details", ro: "Detalii" }, url: "#achievements" },
    },
    {
      label: "GigaHack",
      fact: { en: "Team NAVI went from one web host to five domains. My role: operator/support, notes and timeline", ro: "Echipa NAVI a pornit de la un host web și a ajuns la cinci domenii. Rolul meu: operator/suport, notițe și cronologie" },
      link: { label: { en: "Read the report", ro: "Citește raportul" }, url: "#incident" },
    },
    {
      label: "Registru Digital",
      fact: { en: "Replaced a paper library register. My mother uses it every day", ro: "A înlocuit un registru de bibliotecă pe hârtie. Mama mea îl folosește zilnic" },
      link: { label: "GitHub", url: "https://github.com/vicuvi1/mother_app_registru" },
    },
    {
      label: { en: "Languages", ro: "Limbi" },
      fact: { en: "Romanian native, English certified B2 with C1 working level, Russian B2", ro: "Română nativ, engleză certificat B2 cu nivel de lucru C1, rusă B2" },
      link: { label: { en: "Certificates", ro: "Certificări" }, url: "#certs" },
    },
    {
      label: { en: "Memorable", ro: "De reținut" },
      fact: { en: "3× national checkers champion of Moldova, black belt in Taekwondo", ro: "De 3 ori campion național la dame, centură neagră la Taekwondo" },
      link: { label: { en: "More", ro: "Mai mult" }, url: "#achievements" },
      highlight: true,
    },
  ],

  /* ---------- Scrolling log strip under the proof block. Only true lines and clear jokes. ----------
     level: "ok" | "info" | "warn" | "alert"  (sets the color)  */
  feed: [
    { level: "ok", text: "hacktrone.ctf → placed 4/12 teams" },
    { level: "info", text: "tryhackme.rank → top 3% worldwide" },
    { level: "info", text: "sitesentry.research → 100 popular sites scanned, only 31% earn an A" },
    { level: "ok", text: "hivewatch.detection → 11 rules mapped to 25 MITRE ATT&CK techniques" },
    { level: "ok", text: "soc-level-1 → path completed" },
    { level: "ok", text: "taekwondo → black belt acquired" },
    { level: "warn", text: "coffee.level → 12%, refill recommended" },
    { level: "ok", text: "workout-crew → 330+ automated tests" },
    { level: "alert", text: "new opportunity? → victor.barbuta@outlook.com" },
  ],

  /* ---------- Signature section: the GigaHack incident report ----------
     Stays high-level on purpose. Add ATT&CK IDs only after checking the competition rules. */
  incident: {
    caseId: "CASE GH-2026",
    meta: [
      { en: "Authorized lab", ro: "Laborator autorizat" },
      { en: "Team NAVI (4 people)", ro: "Echipa NAVI (4 persoane)" },
      { en: "Role: operator / support", ro: "Rol: operator / suport" },
      { en: "Sep 2026", ro: "sep. 2026" },
    ],
    title: "GigaHack 2026, Red Team CTF",
    summary: {
      en: "An authorized red-team competition on a shared practice lab: seven teams, one weekend, clear rules. Nothing touched real systems. My takeaway is a defender's one: watching these attacks from the inside is the fastest way to learn how to spot them.",
      ro: "O competiție red-team autorizată pe un laborator comun de practică: șapte echipe, un weekend, reguli clare. Nimic nu a atins sisteme reale. Concluzia mea e una de apărare: să vezi aceste atacuri din interior e cel mai rapid mod de a învăța cum să le detectezi.",
    },
    chain: [
      { value: "1", label: { en: "web host as the way in", ro: "host web ca punct de intrare" } },
      { value: "5", label: { en: "linked domains controlled", ro: "domenii legate, controlate" } },
      { value: "41", label: { en: "internal hosts mapped", ro: "hosturi interne cartografiate" } },
    ],
    tableHead: {
      did: { en: "What the team did", ro: "Ce a făcut echipa" },
      see: { en: "What a defender could look for", ro: "Ce ar putea căuta un apărător" },
    },
    rows: [
      {
        did: { en: "Used a known, published vulnerability in an identity server", ro: "A folosit o vulnerabilitate cunoscută și publicată dintr-un server de identitate" },
        see: { en: "Logins with default or reused passwords", ro: "Autentificări cu parole implicite sau reutilizate" },
      },
      {
        did: { en: "Used a known weakness in Active Directory Certificate Services", ro: "A folosit o slăbiciune cunoscută din Active Directory Certificate Services" },
        see: { en: "Certificate requests that shouldn't happen", ro: "Cereri de certificate care n-ar trebui să existe" },
      },
      {
        did: { en: "Moved between five linked domains by abusing the trust between them", ro: "S-a deplasat între cinci domenii legate, exploatând încrederea dintre ele" },
        see: { en: "Unusual cross-domain logins, and directory replication from a machine that isn't a domain controller", ro: "Autentificări neobișnuite între domenii și replicare de director de la o mașină care nu e controler de domeniu" },
      },
    ],
    tableNote: {
      en: "These are detection ideas I'm learning from, not rules I have tested in a real SOC.",
      ro: "Acestea sunt idei de detecție din care învăț, nu reguli testate de mine într-un SOC real.",
    },
    finding: {
      label: { en: "Main finding", ro: "Descoperirea principală" },
      text: {
        en: "Industrial-control (OT/ICS) systems sat on the same reachable network as ordinary office machines. This flat-network risk is exactly what a blue team exists to catch.",
        ro: "Sisteme de control industrial (OT/ICS) se aflau în aceeași rețea accesibilă ca stațiile de birou obișnuite. Exact genul de risc de rețea „plată” pe care un blue team există ca să-l prindă.",
      },
    },
    myRole: {
      label: { en: "My role, honestly", ro: "Rolul meu, sincer" },
      text: {
        en: "The lead operator drove the main work. I helped with early reconnaissance, kept the notes and timeline that became the team's report, and followed each stage so I understood it.",
        ro: "Operatorul principal a condus partea grea. Am ajutat la recunoașterea inițială, am ținut notițele și cronologia care au devenit raportul echipei și am urmărit fiecare etapă ca să o înțeleg.",
      },
    },
    cover: "assets/img/gigahack-team.jpg", // big photo at the top of the report (click to enlarge)
    coverCaption: { en: "Team NAVI at the GigaHack arena", ro: "Echipa NAVI în arena GigaHack" },
    photos: [
      { src: "assets/img/gigahack-arena.jpg", caption: { en: "The main stage — DeepTech GigaHack 2026", ro: "Scena principală — DeepTech GigaHack 2026" } },
      { src: "assets/img/gigahack-banner.jpg", caption: { en: "“The largest hackathon in Moldova”", ro: "„Cel mai mare hackathon din Moldova”" } },
    ],
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

  /* ---------- "Triage this alert with me" demo ----------
     All data is made up and uses reserved example addresses. Set hidden: true to remove it. */
  triage: {
    alert: { en: "ALERT · Suspicious login after a phishing email", ro: "ALERTĂ · Autentificare suspectă după un email de phishing" },
    intro: {
      en: "Read the sample logs, pick a verdict, then see how I reasoned about it. It takes about two minutes, and there is no wrong answer.",
      ro: "Citește logurile de exemplu, alege un verdict, apoi vezi cum am raționat. Durează cam două minute și nu există răspuns greșit.",
    },
    label: { en: "MADE-UP SAMPLE DATA · not a real incident", ro: "DATE DE EXEMPLU INVENTATE · nu e un incident real" },
    logs: [
      "09:14:02 mail-gw RECEIVED from=billing@paypa1-support.example to=ana.p@company.example subject=\"Invoice overdue\"",
      "09:14:02 mail-gw AUTH spf=fail dkim=none dmarc=fail src_ip=203.0.113.45",
      "09:14:03 mail-gw URL count=1 url=hxxp://paypa1-support.example/login",
      "09:14:03 mail-gw DELIVER folder=inbox action=delivered",
      "09:21:40 proxy GET user=ana.p url=hxxp://paypa1-support.example/login status=200",
      "09:22:15 proxy POST user=ana.p url=hxxp://paypa1-support.example/login status=302 bytes_out=412",
      "09:22:16 proxy GET user=ana.p url=https://www.paypal.example/ status=200",
      "09:48:03 idp LOGIN user=ana.p result=success src_ip=198.51.100.23 geo=unknown mfa=none",
      "09:49:37 mail READ user=ana.p src_ip=198.51.100.23 folder=inbox messages=38",
      "09:51:22 mail RULE_CREATED user=ana.p src_ip=198.51.100.23 action=forward_all to=x@mailbox.example",
    ],
    verdicts: [
      { id: "fp", label: { en: "False positive: close it", ro: "Fals pozitiv: închid" } },
      { id: "watch", label: { en: "Suspicious: keep watching", ro: "Suspect: urmăresc în continuare" } },
      { id: "tp", label: { en: "True positive: escalate", ro: "Adevărat pozitiv: escaladez" } },
    ],
    answer: "tp",
    responses: {
      fp: { en: "I wouldn't close this one, because of the new forwarding rule. Here is why:", ro: "Nu l-aș închide, din cauza noii reguli de redirecționare. Iată de ce:" },
      watch: { en: "I would go one step further and escalate now, because mail may already be leaving. Here is why:", ro: "Aș merge un pas mai departe și aș escalada acum, pentru că emailurile pot pleca deja. Iată de ce:" },
      tp: { en: "That's my verdict too. Here is how I got there:", ro: "Acesta e și verdictul meu. Iată cum am ajuns la el:" },
    },
    verdictLabel: { en: "My verdict: true positive, escalate", ro: "Verdictul meu: adevărat pozitiv, escaladez" },
    reasoning: [
      { en: "The sender looks like PayPal but isn't (paypa1), and SPF and DMARC both failed. The email was still delivered.", ro: "Expeditorul pare PayPal, dar nu este (paypa1), iar SPF și DMARC au eșuat. Emailul a fost totuși livrat." },
      { en: "The user opened the link and sent a POST to it, then was redirected to a real-looking site. That pattern suggests a password was entered.", ro: "Utilizatorul a deschis linkul și a trimis un POST, apoi a fost redirecționat către un site care pare real. Tiparul sugerează că a introdus o parolă." },
      { en: "26 minutes later the account logged in from a new IP address without MFA.", ro: "După 26 de minute, contul s-a autentificat de pe un IP nou, fără MFA." },
      { en: "The same IP read 38 messages and created a rule forwarding all mail outside. This is the step that turns a suspicious click into a probable compromise.", ro: "Același IP a citit 38 de mesaje și a creat o regulă care redirecționează tot emailul în afară. Acesta e pasul care transformă un clic suspect într-o compromitere probabilă." },
    ],
    escalationLabel: { en: "My escalation note", ro: "Nota mea de escaladare" },
    escalation: {
      en: "Probable account compromise of ana.p through phishing. Recommend: disable the session and reset the password, remove the forwarding rule, block the sender domain and IPs, find other recipients of this email, and check what the forwarded and read mail contained.",
      ro: "Compromitere probabilă a contului ana.p prin phishing. Recomand: închiderea sesiunii și resetarea parolei, eliminarea regulii de redirecționare, blocarea domeniului și a IP-urilor, găsirea altor destinatari ai emailului și verificarea conținutului mesajelor citite și redirecționate.",
    },
  },

  /* ---------- About (kept short) ---------- */
  about: {
    paragraphs: [
      {
        en: "I'm aiming for defensive security: SOC analysis, network security and security automation. I learn by doing: TryHackMe paths, pwn.college, Kali and Ubuntu VMs, Nmap and Wireshark.",
        ro: "Țintesc spre securitatea defensivă: analiză SOC, securitatea rețelelor și automatizare. Învăț prin practică: parcursuri TryHackMe, pwn.college, mașini virtuale Kali și Ubuntu, Nmap și Wireshark.",
      },
      {
        en: "Years of competitive checkers and a Taekwondo black belt taught me the part that's hard to put on a CV: patience, focus under pressure and showing up every day.",
        ro: "Anii de dame la nivel competițional și centura neagră la Taekwondo m-au învățat ce e greu de pus într-un CV: răbdare, concentrare sub presiune și consecvență zilnică.",
      },
    ],
  },

  /* ---------- How I work (AI-assisted pipeline) ---------- */
  workflow: [
    { title: { en: "Research", ro: "Cercetare" }, text: { en: "Understand the problem and the risks first.", ro: "Înțeleg problema și riscurile mai întâi." } },
    { title: { en: "Plan", ro: "Planificare" }, text: { en: "Break it into small steps.", ro: "Împart totul în pași mici." } },
    { title: { en: "Prototype", ro: "Prototip" }, text: { en: "Fast drafts with AI tools.", ro: "Schițe rapide cu unelte AI." } },
    { title: { en: "Verify", ro: "Verificare" }, text: { en: "I review, test and fix it myself. I never hand this step to the AI.", ro: "Verific, testez și corectez singur. Nu deleg niciodată acest pas." }, key: true },
    { title: { en: "Ship", ro: "Livrare" }, text: { en: "Small, reviewable commits.", ro: "Commit-uri mici, ușor de verificat." } },
  ],
  aiTools: ["Claude Code", "Cursor"],

  /* ---------- Skills table ----------
     level: "used" (real projects) | "lab" (guided labs and practice) | "next" (not yet, learning next)
     proof is optional: { label, url } */
  skills: [
    {
      skill: { en: "Phishing email analysis", ro: "Analiză de emailuri phishing" },
      tools: "CyberChef",
      level: "lab",
      proof: { label: "TryHackMe", url: "https://tryhackme.com/p/vicuvi1" },
    },
    {
      skill: { en: "Network and traffic analysis", ro: "Analiză de rețea și trafic" },
      tools: "Wireshark, Nmap, TCP/IP, DNS, HTTP",
      level: "lab",
      proof: { label: "TryHackMe", url: "https://tryhackme.com/p/vicuvi1" },
    },
    {
      skill: { en: "Operating systems and labs", ro: "Sisteme de operare și laboratoare" },
      tools: "Linux, Kali, Ubuntu, Windows, Bash, VirtualBox, VMware",
      level: "lab",
    },
    {
      skill: { en: "SIEM and log queries", ro: "SIEM și interogări de loguri" },
      tools: { en: "Next to learn", ro: "Urmează să învăț" },
      level: "next",
    },
    {
      skill: { en: "Programming", ro: "Programare" },
      tools: "Python, C, C++, SQL, JavaScript, HTML, CSS",
      level: "used",
      proof: { label: "GitHub", url: "https://github.com/vicuvi1" },
    },
    {
      skill: { en: "Access control and data safety", ro: "Controlul accesului și siguranța datelor" },
      tools: "Supabase Auth, row-level security",
      level: "used",
      proof: { label: "Registru Digital", url: "https://github.com/vicuvi1/mother_app_registru" },
    },
    {
      skill: { en: "Development workflow", ro: "Flux de dezvoltare" },
      tools: "Git, GitHub, pull requests, Vercel, Claude Code, Cursor",
      level: "used",
      proof: { label: "GitHub", url: "https://github.com/vicuvi1" },
    },
  ],

  /* ---------- Projects ----------
     featured: true → main card. Without it → inside "See all projects".
     onCv: true → also listed in the /cv page, resume.txt and the PDF.
     status: "live" | "building" | "done" | "team"  (shows a small colored label)  */
  projects: [
    {
      featured: true,
      onCv: true,
      title: "SiteSentry",
      period: "2026",
      status: "live",
      kind: { en: "Security tool · Website scanner (Python, web UI + CLI)", ro: "Instrument de securitate · Scanner de site-uri (Python, interfață web + CLI)" },
      summary: {
        en: "A passive website security scanner. Give it a URL and in a few seconds it grades HTTPS, TLS, security headers, cookies, CORS and SPF/DMARC from A+ to F, explains every issue in plain English and generates the server config that fixes it.",
        ro: "Un scanner pasiv de securitate pentru site-uri. Îi dai o adresă și în câteva secunde notează HTTPS, TLS, headerele de securitate, cookie-urile, CORS și SPF/DMARC de la A+ la F, explică fiecare problemă pe înțeles și generează configurația de server care o rezolvă.",
      },
      bullets: [
        { en: "Research: I scanned 100 popular websites (99 responded). Only 31% earn an A or better, 52% have no Content-Security-Policy and 13% still accept TLS 1.0/1.1.", ro: "Cercetare: am scanat 100 de site-uri populare (99 au răspuns). Doar 31% iau A sau mai bine, 52% nu au deloc Content-Security-Policy, iar 13% acceptă încă TLS 1.0/1.1." },
        { en: "22 checks, all normal browser-like requests: it never tries to break in.", ro: "22 de verificări, toate cereri normale, ca un browser: nu încearcă niciodată să pătrundă în sistem." },
        { en: "Copy-paste fixes for nginx, Apache, Caddy and Express; a --fail-under flag turns it into a CI/CD security gate.", ro: "Remedieri gata de copiat pentru nginx, Apache, Caddy și Express; opțiunea --fail-under îl transformă într-o barieră de securitate în CI/CD." },
        { en: "Zero dependencies, 103 tests, CI and CodeQL on every push, Docker image.", ro: "Zero dependențe, 103 teste, CI și CodeQL la fiecare push, imagine Docker." },
      ],
      tags: ["Python", "AppSec", "TLS", "OWASP", "DevSecOps"],
      shot: "assets/img/sec-sitesentry-report.jpg",
      shotCaption: { en: "SiteSentry: a real report for github.com (A+)", ro: "SiteSentry: un raport real pentru github.com (A+)" },
      photos: [
        { src: "assets/img/sec-sitesentry-home.jpg", caption: { en: "SiteSentry: the scan screen", ro: "SiteSentry: ecranul de scanare" } },
        { src: "assets/img/sec-sitesentry-compare.jpg", caption: { en: "SiteSentry: comparing two sites check by check", ro: "SiteSentry: compararea a două site-uri, verificare cu verificare" } },
        { src: "assets/img/sec-sitesentry-research.jpg", caption: { en: "Research: 100 popular websites scanned with SiteSentry", ro: "Cercetare: 100 de site-uri populare scanate cu SiteSentry" } },
      ],
      links: [
        { label: { en: "Project page", ro: "Pagina proiectului" }, url: "https://vicuvi1.github.io/SiteSentry/" },
        { label: { en: "Research", ro: "Cercetarea" }, url: "https://vicuvi1.github.io/SiteSentry/research.html" },
        { label: "GitHub", url: "https://github.com/vicuvi1/SiteSentry" },
      ],
    },
    {
      featured: true,
      onCv: true,
      title: "HiveWatch SOC",
      period: "2026",
      status: "building",
      kind: { en: "Blue team · Honeypot-driven mini SOC (Python, FastAPI)", ro: "Blue team · Mini SOC bazat pe honeypot-uri (Python, FastAPI)" },
      summary: {
        en: "A honeypot-driven mini Security Operations Center. SSH, Telnet, HTTP and TCP honeypots feed a pipeline that enriches every attacker with threat intel, detects attacks in real time, maps their behaviour to MITRE ATT&CK and streams it all to a live 3D dashboard.",
        ro: "Un mini centru de operațiuni de securitate (SOC) bazat pe honeypot-uri. Capcane SSH, Telnet, HTTP și TCP alimentează un pipeline care îmbogățește fiecare atacator cu threat intel, detectează atacurile în timp real, le mapează comportamentul pe MITRE ATT&CK și le afișează pe un dashboard 3D live.",
      },
      bullets: [
        { en: "11 streaming detection rules: brute force, username enumeration, botnet credential stuffing across IPs, port scans, malware downloads, persistence, anti-forensics and more.", ro: "11 reguli de detecție în timp real: brute force, enumerare de utilizatori, credential stuffing de botnet pe mai multe IP-uri, scanări de porturi, descărcări de malware, persistență, anti-forensics și altele." },
        { en: "25 MITRE ATT&CK techniques across 9 tactics as a live heatmap; threat-actor profiles replay each captured shell session.", ro: "25 de tehnici MITRE ATT&CK din 9 tactici, ca hartă termică live; profilurile atacatorilor redau fiecare sesiune de shell capturată." },
        { en: "Response built in: IOC export (JSON/CSV), a firewall-ready blocklist and Telegram alerts for high and critical detections.", ro: "Răspuns inclus: export de IOC-uri (JSON/CSV), listă de blocare pentru firewall și alerte Telegram pentru detecțiile grave și critice." },
        { en: "Secure by design: XSS-proof dashboard, strict CSP, hardened non-root Docker container, and the fake shell never executes anything. The screenshots show demo mode with simulated attacks.", ro: "Securizat din proiectare: dashboard protejat de XSS, CSP strict, container Docker restricționat, fără root, iar shell-ul fals nu execută nimic. Capturile arată modul demo, cu atacuri simulate." },
      ],
      tags: ["Python", "FastAPI", "MITRE ATT&CK", "Detection engineering", "Docker"],
      shot: "assets/img/sec-hivewatch-dashboard.jpg",
      shotCaption: { en: "HiveWatch: live SOC dashboard (demo mode, simulated attacks)", ro: "HiveWatch: dashboard SOC live (mod demo, atacuri simulate)" },
      photos: [
        { src: "assets/img/sec-hivewatch-mitre.jpg", caption: { en: "HiveWatch: MITRE ATT&CK coverage heatmap (demo mode, simulated attacks)", ro: "HiveWatch: harta de acoperire MITRE ATT&CK (mod demo, atacuri simulate)" } },
        { src: "assets/img/sec-hivewatch-full.jpg", caption: { en: "HiveWatch: the full SOC dashboard (demo mode, simulated attacks)", ro: "HiveWatch: dashboardul SOC complet (mod demo, atacuri simulate)" } },
      ],
      links: [{ label: "GitHub", url: "https://github.com/vicuvi1/hivewatch-soc" }],
    },
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
        { en: "No account and no tracking. Data stays on the device unless you choose to use the Telegram bot. Unit + Playwright tests.", ro: "Fără cont și fără tracking. Datele rămân pe dispozitiv, dacă nu alegi să folosești botul Telegram. Teste unitare + Playwright." },
      ],
      tags: ["JavaScript", "PWA", "Electron"],
      links: [{ label: "GitHub", url: "https://github.com/vicuvi1/Finance-Helper-App" }],
    },
    {
      title: "Life OS",
      period: "2026",
      status: "building",
      kind: { en: "Personal project · Web app", ro: "Proiect personal · Aplicație web" },
      summary: {
        en: "My operating system for goals, projects, tasks and habits: a dark-mode morning dashboard that shows the 3 things that matter today.",
        ro: "Sistemul meu pentru obiective, proiecte, sarcini și obiceiuri: un dashboard de dimineață care arată cele 3 lucruri importante de azi.",
      },
      bullets: [
        { en: "First milestone built: login, protected routes, app shell and morning dashboard.", ro: "Prima etapă e gata: autentificare, rute protejate, structura aplicației și dashboardul de dimineață." },
        { en: "Firestore security rules keep each user's data scoped to their own account.", ro: "Regulile de securitate Firestore limitează datele fiecărui utilizator la propriul cont." },
        { en: "Goals, projects, tasks, habits and weekly review screens are the next milestones.", ro: "Ecranele pentru obiective, proiecte, sarcini, obiceiuri și revizuire săptămânală urmează în etapele următoare." },
      ],
      tags: ["Next.js", "TypeScript", "Firebase"],
      links: [{ label: "GitHub", url: "https://github.com/vicuvi1/life_os" }],
    },

    /* ----- Everything below opens with "See all projects" ----- */
    {
      onCv: true,
      title: "Registru Digital",
      period: "2026",
      status: "live",
      kind: { en: "Real daily user · Web app", ro: "Utilizator real zilnic · Aplicație web" },
      summary: {
        en: "Replaced a paper library register with a web app my mother uses every day. Built with data safety in mind: login, history, and saving that survives a lost connection.",
        ro: "Am înlocuit un registru de bibliotecă pe hârtie cu o aplicație web pe care mama mea o folosește zilnic. Construită cu accent pe siguranța datelor: autentificare, istoric și salvare care rezistă la pierderea conexiunii.",
      },
      bullets: [
        { en: "Supabase (Postgres + Auth) with row-level security, deployed on Vercel.", ro: "Supabase (Postgres + Auth) cu row-level security, publicat pe Vercel." },
        { en: "Nightly off-site backups with automated restore checks.", ro: "Backup-uri zilnice off-site cu verificare automată a restaurării." },
        { en: "Offline-safe save queue, so edits survive a lost connection.", ro: "Coadă de salvare offline, ca modificările să reziste la pierderea conexiunii." },
      ],
      tags: ["JavaScript", "Supabase", "PostgreSQL"],
      links: [{ label: "GitHub", url: "https://github.com/vicuvi1/mother_app_registru" }],
    },
    {
      title: "Workout Crew",
      period: "2026",
      status: "live",
      kind: { en: "Personal project · Telegram bot + Mini App", ro: "Proiect personal · Bot Telegram + Mini App" },
      summary: {
        en: "A self-hosted Telegram bot with a full app inside Telegram: live workout duels, crew chat, bets, proof clips, adaptive targets and an RPG-style progression system.",
        ro: "Un bot Telegram self-hosted cu o aplicație completă în Telegram: dueluri live de antrenament, chat de echipă, pariuri, clipuri-dovadă, obiective adaptive și un sistem de progres tip RPG.",
      },
      bullets: [
        { en: "330+ automated tests; no build step on the frontend.", ro: "Peste 330 de teste automate; frontend fără build step." },
        { en: "Admin panel and moderator-approved quests.", ro: "Panou de administrare și quest-uri aprobate de moderator." },
        { en: "Self-hosted, so app data stays on my server. Messages still pass through Telegram.", ro: "Self-hosted: datele aplicației rămân pe serverul meu. Mesajele trec totuși prin Telegram." },
      ],
      tags: ["Python", "SQLite", "pytest"],
      shot: "assets/img/shot-workout.jpg", // screenshot banner on the card (click to enlarge)
      links: [{ label: "GitHub", url: "https://github.com/vicuvi1/Sport-Bot-Telegram-" }],
    },
    {
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
      tags: ["Next.js", "TypeScript", "Supabase"],
      links: [
        { label: "Live", url: "https://interview-manager-umber.vercel.app" },
        { label: "GitHub", url: "https://github.com/vicuvi1/interview_manager" },
      ],
    },
    {
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
      tags: ["Next.js", "Claude API", "Supabase"],
      links: [{ label: "GitHub", url: "https://github.com/vicuvi1/SaaS-Opportunity-Radar-In-App-AI" }],
    },
    {
      title: { en: "Deep-tech pitch at GigaHack", ro: "Prezentare deep-tech la GigaHack" },
      period: "2026",
      status: "team",
      kind: { en: "Hackathon · Team of 5, separate from the Red Team CTF", ro: "Hackathon · Echipă de 5, separat de CTF-ul Red Team" },
      summary: {
        en: "A deep-tech project with a five-person team. I presented and defended it in English in front of investors, covering the problem, the solution and the technical approach.",
        ro: "Un proiect deeptech într-o echipă de 5 membri. L-am prezentat și susținut în engleză în fața investitorilor, explicând problema, soluția și abordarea tehnică.",
      },
      bullets: [
        { en: "Team workflow on GitHub: branches, commits, pull requests, merging teammates' work.", ro: "Lucru în echipă pe GitHub: branch-uri, commit-uri, pull request-uri, integrarea contribuțiilor." },
      ],
      tags: ["Teamwork", "Pitching", "Git"],
      links: [],
    },
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
        en: "Describe an automation in plain English and Gemini builds the n8n workflow. Includes an execution monitor that highlights failed runs.",
        ro: "Descrii o automatizare în cuvinte și Gemini construiește workflow-ul n8n. Include un monitor de execuții care evidențiază erorile.",
      },
      tags: ["Python", "Streamlit", "Gemini API"],
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
      tags: ["Python", "faster-whisper", "Piper TTS"],
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

  /* ---------- Labs & practice (inside "See all projects") ---------- */
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

  /* ---------- Certifications & training ----------
     kind: "cert" (certificate) | "training" (course path). url is the proof link. */
  certifications: [
    {
      name: "TryHackMe",
      kind: "training",
      date: "2026",
      detail: { en: "Pre Security, Cyber Security 101 and SOC Level 1 paths completed. 140+ rooms, 25 badges.", ro: "Parcursuri finalizate: Pre Security, Cyber Security 101 și SOC Level 1. Peste 140 de camere, 25 de insigne." },
      url: "https://tryhackme.com/p/vicuvi1",
    },
    {
      name: "pwn.college",
      kind: "training",
      date: "2026",
      detail: { en: "Completed Introduction and Linux Luminarium (command-line practice).", ro: "Finalizate: Introduction și Linux Luminarium (practică în linia de comandă)." },
    },
    {
      name: "Certiport IT Specialist",
      kind: "cert",
      date: "2024",
      detail: { en: "3 certifications: Python · Device Configuration & Management · Databases.", ro: "3 certificări: Python · Device Configuration & Management · Databases." },
    },
    {
      name: "Cambridge English",
      kind: "cert",
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
      detail: { en: "4th of 12 teams with team NAVI at an international cybersecurity competition with a 90,000 MDL prize pool.", ro: "Locul 4 din 12 echipe cu echipa NAVI, la o competiție internațională de cybersecurity cu fond de premiere de 90.000 MDL." },
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
      degree: study.done
        ? { en: "B.Sc. Information Security", ro: "Licență în Securitate Informațională" }
        : { en: `B.Sc. Information Security · Year ${study.year}`, ro: `Securitate Informațională · Anul ${study.ro}` },
      period: study.done
        ? `${STUDY.startYear} – ${STUDY.endYear}`
        : { en: `${STUDY.startYear} – present`, ro: `${STUDY.startYear} – prezent` },
      // PDF, /cv and resume.txt version (never goes stale)
      degreePrint: { en: `B.Sc. Information Security (expected ${STUDY.endYear})`, ro: `Licență în Securitate Informațională (estimat ${STUDY.endYear})` },
      periodPrint: `${STUDY.startYear} – ${STUDY.endYear}`,
      detail: { en: "Relevant courses: Cryptography, Computer Programming (C), Programming Techniques, Mathematical Analysis.", ro: "Discipline relevante: Criptografie, Programarea Calculatoarelor (C), Tehnici de Programare, Analiză Matematică." },
    },
    {
      school: { en: "“B. P. Hasdeu” Theoretical High School, Drochia", ro: "Liceul Teoretic „B. P. Hasdeu”, Drochia" },
      degree: { en: "High school diploma", ro: "Studii liceale" },
      period: "2023 – 2026",
    },
  ],

  /* ---------- Languages ---------- */
  languages: [
    { name: { en: "Romanian", ro: "Română" }, level: { en: "Native", ro: "Nativ" } },
    { name: { en: "English", ro: "Engleză" }, level: { en: "Certified B2 (Cambridge), working level C1", ro: "Certificat B2 (Cambridge), nivel de lucru C1" } },
    { name: { en: "Russian", ro: "Rusă" }, level: "B2" },
  ],

  /* ---------- Who I can help (contact section). The first one is drawn bigger. ---------- */
  offers: [
    {
      audience: { en: "For hiring managers", ro: "Pentru angajatori" },
      title: { en: "SOC / Blue Team internship", ro: "Stagiu SOC / Blue Team" },
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
    incident: { en: "Incident report", ro: "Raport" },
    triage: { en: "Triage demo", ro: "Demo triaj" },
    skills: { en: "Skills", ro: "Competențe" },
    certs: { en: "Certificates", ro: "Certificări" },
    projects: { en: "Projects", ro: "Proiecte" },
    contact: { en: "Contact", ro: "Contact" },
  },
  sections: {
    proof: { en: "30-second proof", ro: "Dovezi în 30 de secunde" },
    incident: { en: "Incident report", ro: "Raport de incident" },
    triage: { en: "Triage this alert with me", ro: "Triază alerta asta cu mine" },
    skills: { en: "Skills, with proof", ro: "Competențe, cu dovezi" },
    certs: { en: "Certificates & training", ro: "Certificări și formare" },
    projects: { en: "Projects", ro: "Proiecte" },
    labs: { en: "Labs & practice", ro: "Laboratoare și practică" },
    workflow: { en: "How I work with AI", ro: "Cum lucrez cu AI" },
    about: { en: "Who I am", ro: "Cine sunt" },
    achievements: { en: "Beyond the keyboard", ro: "Dincolo de tastatură" },
    education: { en: "Education", ro: "Educație" },
    languages: { en: "Languages", ro: "Limbi" },
    contact: { en: "Let's work together", ro: "Hai să lucrăm împreună" },
  },
  workflowIntro: {
    en: "AI makes me faster. It doesn't make my decisions. One step is always done by hand.",
    ro: "AI-ul mă face mai rapid, dar nu decide în locul meu. Un pas îl fac mereu manual.",
  },
  achievementsIntro: {
    en: "Competition taught me focus long before code did.",
    ro: "Competiția m-a învățat concentrarea cu mult înainte de cod.",
  },
  contactIntro: {
    en: "Have an internship, a role, or an idea that needs building? I reply within a day.",
    ro: "Ai un stagiu, un post sau o idee care trebuie construită? Răspund în maximum o zi.",
  },
  workLabels: {
    start: { en: "Start", ro: "Început" },
    hours: { en: "Hours", ro: "Ore" },
    mode: { en: "Where", ro: "Unde" },
    shifts: { en: "Shifts", ro: "Ture" },
  },
  skillHead: {
    skill: { en: "Skill", ro: "Competență" },
    tools: { en: "Tools", ro: "Unelte" },
    level: { en: "Honest level", ro: "Nivel real" },
    proof: { en: "Proof", ro: "Dovadă" },
  },
  levels: {
    used: { en: "Used in projects", ro: "Folosit în proiecte" },
    lab: { en: "Used in guided labs", ro: "Folosit în laboratoare ghidate" },
    next: { en: "Not yet: learning next", ro: "Încă nu: urmează" },
  },
  certKind: {
    cert: { en: "Certificate", ro: "Certificat" },
    training: { en: "Training", ro: "Formare" },
  },
  triageUi: {
    pick: { en: "What's your verdict?", ro: "Care e verdictul tău?" },
    skip: { en: "Just show me your answer", ro: "Arată-mi direct răspunsul" },
  },
  cta: {
    contact: { en: "Email me", ro: "Scrie-mi" },
    projects: { en: "See my work", ro: "Vezi proiectele" },
    cv: { en: "Download CV", ro: "Descarcă CV" },
    cvShort: "CV",
    emailShort: "Email",
    plainCv: { en: "Plain text version", ro: "Versiune text simplu" },
    copy: { en: "Copy email", ro: "Copiază emailul" },
    copied: { en: "Copied!", ro: "Copiat!" },
    email: { en: "Write me an email", ro: "Scrie-mi un email" },
    telegram: { en: "Message on Telegram", ro: "Scrie-mi pe Telegram" },
    aiTools: { en: "Tools I use most", ro: "Unelte folosite cel mai des" },
    readMore: { en: "Read the full write-up", ro: "Citește articolul complet" },
    allProjects: { en: "See all projects", ro: "Vezi toate proiectele" },
    terminalHint: { en: "Prefer a terminal? Try it", ro: "Preferi un terminal? Încearcă-l" },
    menu: { en: "Menu", ro: "Meniu" },
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
