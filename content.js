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
      label: "PhishLens",
      fact: { en: "Built a phishing email analyzer that runs in the browser: look-alike domains, QR-code phishing, macros, MITRE ATT&CK", ro: "Am construit un analizor de emailuri de phishing care rulează în browser: domenii care imită branduri, phishing prin QR, macro-uri, MITRE ATT&CK" },
      link: { label: { en: "Try the demo", ro: "Încearcă demo-ul" }, url: "https://vicuvi1.github.io/phishlens/" },
      noPrint: true, // already listed under Projects in the one-page PDF
    },
    {
      label: "WinTrace",
      more: true,
      fact: { en: "Built a Windows event log attack hunter with my own EVTX parser: Kerberoasting, pass-the-hash, DCSync, Mimikatz", ro: "Am construit un analizor de atacuri în logurile Windows, cu propriul parser EVTX: Kerberoasting, pass-the-hash, DCSync, Mimikatz" },
      link: { label: { en: "Try the demo", ro: "Încearcă demo-ul" }, url: "https://vicuvi1.github.io/wintrace/" },
      noPrint: true,
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
    { level: "alert", text: "wintrace.story → 4625 x46 → 4624 → 4720 → vssadmin delete shadows → 1102: ACTIVE COMPROMISE" },
    { level: "alert", text: "phishlens.verdict → micros0ft-secure-login.com: DANGEROUS 97/100" },
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
      tools: "Email headers, SPF/DKIM/DMARC, PhishLens (built it), CyberChef",
      level: "used",
      proof: { label: "PhishLens", url: "https://vicuvi1.github.io/phishlens/" },
    },
    {
      skill: { en: "Windows event log analysis", ro: "Analiza logurilor Windows" },
      tools: "EVTX, Security & Sysmon events, Active Directory attacks, WinTrace (built it)",
      level: "used",
      proof: { label: "WinTrace", url: "https://vicuvi1.github.io/wintrace/" },
      noPrint: true, // website only: the one-page PDF has no room
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
        { src: "assets/img/sec-sitesentry-low-grade.jpg", caption: { en: "SiteSentry: google.com scores a D: weak security headers and cookie settings", ro: "SiteSentry: google.com primește nota D: headere de securitate și cookie-uri configurate slab" } },
        { src: "assets/img/sec-sitesentry-fixes.jpg", caption: { en: "SiteSentry: prioritised issues and copy-paste nginx config generated for google.com", ro: "SiteSentry: probleme prioritizate și configurație nginx gata de copiat, generată pentru google.com" } },
        { src: "assets/img/sec-sitesentry-ci-gate.jpg", caption: { en: "SiteSentry: bulk scan as a CI/CD gate: --fail-under B fails the build (exit code 1)", ro: "SiteSentry: scanare în masă ca filtru CI/CD: --fail-under B oprește build-ul (cod de ieșire 1)" } },
        { src: "assets/img/sec-sitesentry-live-scan.jpg", caption: { en: "SiteSentry: live scan console streaming every check in real time (wikipedia.org, grade B)", ro: "SiteSentry: consola de scanare live, cu fiecare verificare afișată în timp real (wikipedia.org, nota B)" } },
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
      title: "PhishLens",
      period: "2026",
      status: "live",
      kind: { en: "Blue team · Phishing email analyzer (JavaScript, web app + CLI)", ro: "Blue team · Analizor de emailuri de phishing (JavaScript, aplicație web + CLI)" },
      summary: {
        en: "Drop a suspicious email and in about a second PhishLens checks the sender's SPF, DKIM and DMARC, the links, the attachments, any QR codes and the wording, then explains in plain English why it is (or isn't) phishing. It runs entirely in the browser, so the email is never uploaded anywhere.",
        ro: "Încarci un email suspect și în aproximativ o secundă PhishLens verifică SPF, DKIM și DMARC ale expeditorului, linkurile, atașamentele, codurile QR și formulările, apoi explică pe înțeles de ce este (sau nu este) phishing. Rulează în întregime în browser, așa că emailul nu este încărcat nicăieri.",
      },
      // shorter text for the one-page PDF / cv.html / resume.txt
      summaryPrint: "Phishing email analyzer that runs in the browser: SPF/DKIM/DMARC, look-alike domains, QR-code phishing, macros and HTML smuggling, mapped to MITRE ATT&CK with STIX 2.1 export.",
      bullets: [
        { en: "Catches look-alike and homograph domains (micros0ft, pаypal with a Cyrillic \"а\"), links whose text lies about the destination, QR-code phishing, HTML smuggling, Office macros and remote template injection.", ro: "Detectează domenii care imită branduri și homografe (micros0ft, pаypal cu „а” chirilic), linkuri al căror text minte despre destinație, phishing prin coduri QR, HTML smuggling, macro-uri Office și template injection de la distanță." },
        { en: "Every finding is mapped to MITRE ATT&CK; IOCs export as a Markdown incident report, CSV or STIX 2.1, with batch triage for many emails at once.", ro: "Fiecare constatare e mapată pe MITRE ATT&CK; IOC-urile se exportă ca raport de incident Markdown, CSV sau STIX 2.1, cu triere în lot pentru mai multe emailuri deodată." },
        { en: "Catches a CEO-fraud email that passes SPF, DKIM and DMARC, yet scores a real GitHub notification 0/100: it doesn't cry wolf.", ro: "Prinde un email de tip „fraudă CEO” care trece de SPF, DKIM și DMARC, dar dă scorul 0/100 unei notificări reale de la GitHub: nu dă alarme false." },
        { en: "Zero dependencies: own MIME parser, punycode decoder and PNG decoder. Same engine in a CLI with a CI gate (--fail-above). 24 tests, CI and CodeQL. The screenshots show the 7 bundled synthetic sample emails.", ro: "Zero dependențe: parser MIME, decodor punycode și decodor PNG proprii. Același motor și în CLI, cu barieră pentru CI (--fail-above). 24 de teste, CI și CodeQL. Capturile arată cele 7 emailuri sintetice de test incluse." },
      ],
      tags: ["JavaScript", "Email security", "MITRE ATT&CK", "Threat intel", "STIX 2.1"],
      shot: "assets/img/sec-phishlens-cover.jpg",
      shotCaption: { en: "PhishLens: a Microsoft 365 credential-phishing sample scored 97/100 (synthetic sample)", ro: "PhishLens: un email de test care fură date Microsoft 365, scor 97/100 (exemplu sintetic)" },
      photos: [
        { src: "assets/img/sec-phishlens-overview.jpg", caption: { en: "Findings with evidence and ATT&CK links, plus what to do next", ro: "Constatările cu dovezi și linkuri ATT&CK, plus pașii următori" } },
        { src: "assets/img/sec-phishlens-quishing.jpg", caption: { en: "QR-code phishing: the QR image is decoded and its link flagged as a SharePoint look-alike", ro: "Phishing prin cod QR: imaginea QR e decodată, iar linkul e marcat ca imitație SharePoint" } },
        { src: "assets/img/sec-phishlens-links.jpg", caption: { en: "Links: a Cyrillic homograph of paypal.com and a bit.ly link posing as PayPal", ro: "Linkuri: un homograf chirilic al paypal.com și un link bit.ly care se dă drept PayPal" } },
        { src: "assets/img/sec-phishlens-attachments.jpg", caption: { en: "Attachments: a .pdf.js hidden in a ZIP, VBA macros and remote template injection", ro: "Atașamente: un .pdf.js ascuns într-un ZIP, macro-uri VBA și template injection de la distanță" } },
        { src: "assets/img/sec-phishlens-sender.jpg", caption: { en: "Header forensics: Reply-To and Return-Path mismatches, SPF/DKIM/DMARC and the delivery path", ro: "Analiza antetelor: nepotriviri Reply-To și Return-Path, SPF/DKIM/DMARC și traseul de livrare" } },
        { src: "assets/img/sec-phishlens-mitre.jpg", caption: { en: "MITRE ATT&CK coverage for a malware-delivery email", ro: "Acoperirea MITRE ATT&CK pentru un email care livrează malware" } },
        { src: "assets/img/sec-phishlens-batch.jpg", caption: { en: "Batch triage: 7 emails ranked by risk in one go", ro: "Triere în lot: 7 emailuri ordonate după risc dintr-o dată" } },
        { src: "assets/img/sec-phishlens-preview.jpg", caption: { en: "Safe preview: sandboxed, scripts removed, remote images blocked, links disabled", ro: "Previzualizare sigură: izolată, fără scripturi, imagini externe blocate, linkuri dezactivate" } },
        { src: "assets/img/sec-phishlens-landing.jpg", caption: { en: "Start screen: drop an .eml or try one of the 7 sample attacks", ro: "Ecranul de start: încarci un .eml sau încerci unul dintre cele 7 atacuri de test" } },
      ],
      links: [
        { label: { en: "Live demo", ro: "Demo live" }, url: "https://vicuvi1.github.io/phishlens/" },
        { label: "GitHub", url: "https://github.com/vicuvi1/phishlens" },
      ],
    },
    {
      featured: true,
      onCv: true,
      title: "WinTrace",
      period: "2026",
      status: "live",
      kind: { en: "Blue team · Windows event log attack hunter (JavaScript, web app + CLI)", ro: "Blue team · Analizor de atacuri în logurile Windows (JavaScript, aplicație web + CLI)" },
      summary: {
        en: "Drop Windows event logs (.evtx straight from a machine, or XML / JSON exports) and WinTrace rebuilds what the attacker did, step by step: brute force, Kerberoasting, pass-the-hash, Mimikatz, DCSync, persistence and log wiping, mapped to MITRE ATT&CK and explained in plain English. The logs never leave the browser.",
        ro: "Încarci loguri de evenimente Windows (.evtx direct de pe calculator sau exporturi XML / JSON), iar WinTrace reconstruiește pas cu pas ce a făcut atacatorul: brute force, Kerberoasting, pass-the-hash, Mimikatz, DCSync, persistență și ștergerea logurilor, mapate pe MITRE ATT&CK și explicate pe înțeles. Logurile nu părăsesc browserul.",
      },
      summaryPrint: "Windows event log attack hunter with its own EVTX parser: brute force, Kerberoasting, pass-the-hash, Mimikatz, DCSync and log clearing as an attack timeline mapped to MITRE ATT&CK.",
      bullets: [
        { en: "I wrote the EVTX binary parser myself (chunks, Binary XML templates, SIDs, FILETIMEs) and tested it record for record against the python-evtx reference files: 2,261 records, 0 errors.", ro: "Am scris singur parserul binar EVTX (chunk-uri, șabloane Binary XML, SID-uri, FILETIME) și l-am testat înregistrare cu înregistrare pe fișierele de referință python-evtx: 2.261 de înregistrări, 0 erori." },
        { en: "30+ detections with correlation over time: brute force followed by a successful logon, password spraying, Kerberoasting bursts, a new account made admin, and encoded PowerShell decoded and re-checked.", ro: "Peste 30 de detecții cu corelare în timp: brute force urmat de o autentificare reușită, password spraying, rafale de Kerberoasting, cont nou făcut administrator și PowerShell codat, decodat și reverificat." },
        { en: "Turns alerts into an attack story (\"the attacker guessed passwords… got in… created a backdoor admin… cleared the log\"), plus an ATT&CK matrix, Markdown incident report and ATT&CK Navigator layer.", ro: "Transformă alertele într-o poveste a atacului („atacatorul a ghicit parole… a intrat… a creat un administrator ascuns… a șters logul”), plus o matrice ATT&CK, raport de incident Markdown și strat ATT&CK Navigator." },
        { en: "A normal workday sample scores 0/100 (no false alarms). Zero dependencies, 17 tests, CI and CodeQL. Screenshots show the 7 bundled synthetic incidents.", ro: "Un eșantion cu o zi normală de lucru primește 0/100 (fără alarme false). Zero dependențe, 17 teste, CI și CodeQL. Capturile arată cele 7 incidente sintetice incluse." },
      ],
      tags: ["Windows", "EVTX", "Active Directory", "MITRE ATT&CK", "Threat hunting"],
      shot: "assets/img/sec-wintrace-cover.jpg",
      shotCaption: { en: "WinTrace: an RDP brute force that ends in ransomware preparation, as an attack story (synthetic sample)", ro: "WinTrace: un brute force RDP care se termină cu pregătirea unui ransomware, ca poveste a atacului (exemplu sintetic)" },
      photos: [
        { src: "assets/img/sec-wintrace-story.jpg", caption: { en: "Attack story: what the attacker did, step by step, with what to do now", ro: "Povestea atacului: ce a făcut atacatorul, pas cu pas, și ce trebuie făcut acum" } },
        { src: "assets/img/sec-wintrace-detections.jpg", caption: { en: "Detections: encoded PowerShell decoded automatically, Mimikatz and an LSASS dump", ro: "Detecții: PowerShell codat decodat automat, Mimikatz și o copie a memoriei LSASS" } },
        { src: "assets/img/sec-wintrace-kerberoast.jpg", caption: { en: "Kerberoasting and AS-REP roasting caught on a domain controller", ro: "Kerberoasting și AS-REP roasting detectate pe un controller de domeniu" } },
        { src: "assets/img/sec-wintrace-timeline.jpg", caption: { en: "Timeline: pass-the-hash and PsExec lateral movement, every event searchable", ro: "Cronologie: pass-the-hash și deplasare laterală cu PsExec, fiecare eveniment poate fi căutat" } },
        { src: "assets/img/sec-wintrace-mitre.jpg", caption: { en: "MITRE ATT&CK matrix coloured by the worst severity seen", ro: "Matricea MITRE ATT&CK colorată după cea mai gravă detecție" } },
        { src: "assets/img/sec-wintrace-entities.jpg", caption: { en: "Accounts, hosts and IPs after a password-spraying attack", ro: "Conturi, calculatoare și IP-uri după un atac de password spraying" } },
        { src: "assets/img/sec-wintrace-clean.jpg", caption: { en: "A normal workday stays at 0/100: no false alarms", ro: "O zi normală de lucru rămâne la 0/100: fără alarme false" } },
        { src: "assets/img/sec-wintrace-landing.jpg", caption: { en: "Start screen: drop .evtx, XML or JSON logs, or try one of 7 attack samples", ro: "Ecranul de start: încarci loguri .evtx, XML sau JSON ori încerci unul din cele 7 atacuri de test" } },
      ],
      links: [
        { label: { en: "Live demo", ro: "Demo live" }, url: "https://vicuvi1.github.io/wintrace/" },
        { label: "GitHub", url: "https://github.com/vicuvi1/wintrace" },
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
        { src: "assets/img/sec-hivewatch-profile.jpg", caption: { en: "HiveWatch: threat-actor profile with risk score, ATT&CK techniques and the captured shell session (demo mode, simulated attacks)", ro: "HiveWatch: profilul atacatorului cu scorul de risc, tehnicile ATT&CK și sesiunea de shell capturată (mod demo, atacuri simulate)" } },
        { src: "assets/img/sec-hivewatch-attackers.jpg", caption: { en: "HiveWatch: top threat actors ranked by risk, with origin and network type (demo mode, simulated attacks)", ro: "HiveWatch: atacatorii principali, ordonați după risc, cu originea și tipul rețelei (mod demo, atacuri simulate)" } },
        { src: "assets/img/sec-hivewatch-mitre.jpg", caption: { en: "HiveWatch: MITRE ATT&CK coverage heatmap (demo mode, simulated attacks)", ro: "HiveWatch: harta de acoperire MITRE ATT&CK (mod demo, atacuri simulate)" } },
        { src: "assets/img/sec-hivewatch-creds.jpg", caption: { en: "HiveWatch: usernames and passwords bots try most (demo mode, simulated attacks)", ro: "HiveWatch: utilizatorii și parolele încercate cel mai des de boți (mod demo, atacuri simulate)" } },
        { src: "assets/img/sec-hivewatch-full.jpg", caption: { en: "HiveWatch: the full SOC dashboard (demo mode, simulated attacks)", ro: "HiveWatch: dashboardul SOC complet (mod demo, atacuri simulate)" } },
      ],
      links: [{ label: "GitHub", url: "https://github.com/vicuvi1/hivewatch-soc" }],
    },
    {
      featured: true,
      onCv: true,
      title: "SOC Log & Traffic Analyzer",
      period: "2026",
      status: "done",
      kind: { en: "Blue team · Log triage platform (Python, Streamlit)", ro: "Blue team · Platformă de triere a logurilor (Python, Streamlit)" },
      summary: {
        en: "A SOC triage prototype that turns raw logs into alerts. It ingests Apache/Nginx access logs, Linux syslog and PCAP captures (or a live syslog stream), normalizes them, runs YAML detection rules, enriches IPs with AbuseIPDB threat intel and generates containment playbooks.",
        ro: "Un prototip de triere SOC care transformă logurile brute în alerte. Primește loguri Apache/Nginx, syslog Linux și capturi PCAP (sau un flux syslog live), le normalizează, rulează reguli de detecție YAML, îmbogățește IP-urile cu threat intel din AbuseIPDB și generează playbook-uri de izolare.",
      },
      bullets: [
        { en: "5 Sigma-style YAML rules mapped to MITRE ATT&CK (T1110, T1046, T1190, T1595): brute force, port scans, directory traversal and recon probes. A new rule is a YAML file, no code changes.", ro: "5 reguli YAML în stil Sigma, mapate pe MITRE ATT&CK (T1110, T1046, T1190, T1595): brute force, scanări de porturi, directory traversal și sondări de recunoaștere. O regulă nouă e un fișier YAML, fără modificări de cod." },
        { en: "SOAR playbooks for every alert: iptables, Windows Firewall and AWS Security Group rules, generated for review and never run automatically.", ro: "Playbook-uri SOAR pentru fiecare alertă: reguli iptables, Windows Firewall și AWS Security Group, generate pentru verificare și niciodată rulate automat." },
        { en: "Case management in SQLite and an optional AI triage assistant (local Ollama or OpenAI) that summarizes what happened and the next steps.", ro: "Gestionarea cazurilor în SQLite și un asistent AI opțional de triere (Ollama local sau OpenAI) care rezumă ce s-a întâmplat și pașii următori." },
        { en: "The screenshots show the real app analysing its bundled sample logs: 19 records, 7 alerts.", ro: "Capturile arată aplicația reală analizând logurile de test incluse: 19 înregistrări, 7 alerte." },
      ],
      tags: ["Python", "Streamlit", "Sigma rules", "MITRE ATT&CK", "SOAR"],
      shot: "assets/img/sec-soclogs-overview.jpg",
      shotCaption: { en: "SOC Log & Traffic Analyzer: analysing its sample logs (19 records, 7 alerts)", ro: "SOC Log & Traffic Analyzer: analiza logurilor de test (19 înregistrări, 7 alerte)" },
      photos: [
        { src: "assets/img/sec-soclogs-alerts.jpg", caption: { en: "Alerts with severity, the rule that fired and containment actions", ro: "Alerte cu gravitatea, regula declanșată și acțiunile de izolare" } },
        { src: "assets/img/sec-soclogs-charts.jpg", caption: { en: "Attack timeline and most attacked endpoints", ro: "Cronologia atacurilor și endpoint-urile cele mai atacate" } },
        { src: "assets/img/sec-soclogs-soar.jpg", caption: { en: "SOAR containment: per-IP playbooks, never auto-executed", ro: "Izolare SOAR: playbook-uri per IP, niciodată rulate automat" } },
        { src: "assets/img/sec-soclogs-ip-containment.jpg", caption: { en: "Per-IP containment playbook with block/unblock scripts for Linux and Windows (sample data)", ro: "Playbook de izolare per IP, cu scripturi de blocare/deblocare pentru Linux și Windows (date demonstrative)" } },
        { src: "assets/img/sec-soclogs-cases.jpg", caption: { en: "Case management with persisted cases, ingestions and alert triage status (sample data)", ro: "Gestionarea cazurilor, cu cazuri salvate, ingestii și statusul de triere al alertelor (date demonstrative)" } },
        { src: "assets/img/sec-soclogs-live-syslog.jpg", caption: { en: "Live UDP syslog ingestion with real-time tail (test datagrams)", ro: "Preluare syslog UDP în timp real, cu afișarea ultimelor mesaje (mesaje de test)" } },
        { src: "assets/img/sec-soclogs-ai-triage.jpg", caption: { en: "Triage assistant summary for an SSH brute-force alert (rule-based template mode, no LLM)", ro: "Rezumat de triere pentru o alertă SSH brute-force (mod șablon bazat pe reguli, fără LLM)" } },
      ],
      links: [{ label: "GitHub", url: "https://github.com/vicuvi1/analyzing-logs-traffic-Defensive-SOC-" }],
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
      shot: "assets/img/shot-lifeos-dashboard.jpg",
      shotCaption: { en: "Life OS: the morning dashboard with focus-goal momentum, a priority stack and today's tasks (demo data)", ro: "Life OS: tabloul de bord de dimineață cu progresul obiectivelor prioritare, lista de priorități și sarcinile zilei (date demo)" },
      photos: [
        { src: "assets/img/shot-lifeos-goals.jpg", caption: { en: "Life OS: goals with today's next steps, recent milestone wins and progress cards (demo data)", ro: "Life OS: obiective cu pașii de azi, etapele încheiate recent și carduri de progres (date demo)" } },
        { src: "assets/img/shot-lifeos-habits.jpg", caption: { en: "Life OS: habit tracker with today's progress, streaks and a 4-week grid (demo data)", ro: "Life OS: monitorizarea obiceiurilor cu progresul de azi, serii de zile la rând și un tabel pe 4 săptămâni (date demo)" } },
        { src: "assets/img/shot-lifeos-tasks.jpg", caption: { en: "Life OS: today's tasks grouped by time of day, with time blocks and linked goals (demo data)", ro: "Life OS: sarcinile zilei grupate pe momente ale zilei, cu intervale orare și obiective asociate (date demo)" } },
        { src: "assets/img/shot-lifeos-phone.jpg", caption: { en: "Life OS on a phone: the morning dashboard (demo data)", ro: "Life OS pe telefon: tabloul de bord de dimineață (date demo)" } },
      ],
      links: [{ label: "GitHub", url: "https://github.com/vicuvi1/life_os" }],
    },

    /* ----- Everything below opens with "See all projects" ----- */
    {
      onCv: false, // in the PDF it is already in Highlights; frees space for WinTrace
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
