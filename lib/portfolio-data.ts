import {
  BadgeCheck,
  BrainCircuit,
  Code2,
  Database,
  Download,
  FileJson,
  Github,
  GraduationCap,
  KeyRound,
  Linkedin,
  LockKeyhole,
  Network,
  Radar,
  ScanSearch,
  ServerCog,
  ShieldCheck,
  Terminal,
  Trophy,
  Users,
} from "lucide-react";

export const navItems = ["Identity", "Modes", "Status", "Case Files", "Evidence", "Lab", "Writeups", "WaskiZone", "Contact"];

export const proof = [
  { value: "100+", label: "API endpoints", detail: "Designed, integrated, tested, and documented" },
  { value: "46", label: "platform modules", detail: "EduManage academic workflows" },
  { value: "8", label: "access roles", detail: "RBAC, guards, tenant isolation" },
  { value: "150+", label: "learners trained", detail: "Web, Git, Arduino, robotics" },
];

export const modes = {
  builder: {
    label: "Builder Mode",
    headline: "Software developer",
    command: "npm run ship:api",
    accent: "mint",
    text: "I design backend services, database models, API contracts, authentication flows, documentation, tests, and integration paths that move products from prototype to usable system.",
    points: ["REST APIs", "NestJS / Express", "PostgreSQL / MySQL", "Swagger / Jest"],
  },
  breaker: {
    label: "Breaker Mode",
    headline: "Ethical hacker mindset",
    command: "nmap --reason --defensive",
    accent: "cyan",
    text: "I practice enumeration, web exploitation, Linux fundamentals, privilege escalation, and CTF collaboration so I can build with threat paths in mind.",
    points: ["Nmap / Burp", "TryHackMe labs", "CTF teamwork", "API security"],
  },
  trainer: {
    label: "Trainer Mode",
    headline: "Trainer and mentor",
    command: "teach --project-based",
    accent: "amber",
    text: "I train beginner developers and STEM learners through practical sessions, debugging support, curriculum work, Arduino prototypes, and web development fundamentals.",
    points: ["150+ learners", "Amalitech Club", "CAS-7 Tech", "Robotics"],
  },
} as const;

export const systemStatus = [
  { label: "API Design", value: "Active", detail: "REST contracts, OpenAPI, health checks", icon: FileJson },
  { label: "Security Practice", value: "Active", detail: "CTFs, labs, enumeration, API security", icon: ShieldCheck },
  { label: "Teaching", value: "Active", detail: "Beginner web, Git, Arduino, robotics", icon: GraduationCap },
  { label: "Current Focus", value: "Leveling", detail: "Active Directory, privilege escalation, NestJS architecture", icon: BrainCircuit },
  { label: "Availability", value: "Open", detail: "Backend/API work, collaboration, mentoring", icon: Radar },
];

export const cases = [
  {
    slug: "edumanage",
    code: "CASE-01",
    name: "EduManage",
    role: "Backend Developer & System Integration Engineer",
    year: "2026",
    status: "Multi-tenant academic platform",
    brief: "Multi-school academic management platform with tenant isolation, secure sessions, role-based access, live backend integration, API documentation, tests, and operational safeguards.",
    impact: ["46 modules", "8 roles", "100+ endpoints", "refresh-token rotation"],
    stack: ["NestJS", "TypeScript", "Prisma", "PostgreSQL", "JWT", "RBAC"],
    links: [{ label: "Demo", href: "https://edumanage-demo.vercel.app" }],
    modules: ["Auth", "Users", "Schools", "Roles", "Students", "Classes", "Reports", "Billing", "Exams", "Attendance", "Parents", "Health"],
    architecture: [
      "Client app authenticates with JWT and refresh-token rotation",
      "API layer validates roles, permissions, and tenant context",
      "Service modules enforce school isolation before database access",
      "Prisma persists relational workflows in PostgreSQL",
      "Swagger, tests, and health checks support integration and operations",
    ],
    threatModel: [
      { risk: "Tenant data leakage", control: "Tenant-aware queries, role guards, and school-scoped workflows", lesson: "Multi-tenant systems must treat isolation as a core invariant." },
      { risk: "Token/session abuse", control: "JWT authentication, refresh-token rotation, secure session design", lesson: "Authentication is a lifecycle, not a login form." },
      { risk: "Permission drift", control: "RBAC, resolved permissions, and documented API contracts", lesson: "Roles need to be visible, testable, and consistent across features." },
    ],
    mock: ["POST /auth/login", "GET /schools/:id/dashboard", "PATCH /roles/:id/permissions", "GET /reports/academic"],
  },
  {
    slug: "whatsupucc",
    code: "CASE-02",
    name: "WhatsUpUCC",
    role: "Project Lead | Primary Backend Developer",
    year: "2025 - 2026",
    status: "Campus events and community platform",
    brief: "Campus community and event platform with media uploads, moderation workflows, notifications, rate limiting, request tracking, configurable CORS, and public API docs.",
    impact: ["30+ endpoints", "11 modules", "3-person team", "OpenAPI docs"],
    stack: ["Express", "Prisma", "PostgreSQL", "JWT", "OpenAPI"],
    links: [
      { label: "Live", href: "https://whats-up-ucc.vercel.app" },
      { label: "API Docs", href: "https://whats-up-ucc-backend.onrender.com/api-docs/" },
    ],
    modules: ["Auth", "Users", "Events", "Media", "Notifications", "Moderation", "Comments", "Bookmarks", "Admin", "Audit", "Health"],
    architecture: [
      "Frontend consumes Express REST APIs through documented contracts",
      "JWT protects account and event workflows",
      "Media and event modules support discovery and community interaction",
      "Moderation and notification modules keep the platform manageable",
      "Rate limiting, CORS, request tracking, and Swagger improve reliability",
    ],
    threatModel: [
      { risk: "Spam or abusive event content", control: "Moderation workflows and admin controls", lesson: "Community platforms need safety workflows from the beginning." },
      { risk: "Uncontrolled API access", control: "JWT guards, rate limiting, request tracking, CORS policies", lesson: "Public-facing APIs need visibility and boundaries." },
      { risk: "Mock-data drift during integration", control: "Live API integration and documented contracts", lesson: "Frontend confidence improves when APIs become testable contracts." },
    ],
    mock: ["GET /events", "POST /media/upload", "PATCH /moderation/:id", "GET /notifications"],
  },

  {
    slug: "truth-or-dare",
    code: "CASE-03",
    name: "DareDeck",
    role: "Product Engineer",
    year: "2026",
    status: "Offline-first / multiplayer-ready",
    brief: "An offline-first, customizable Truth and Dare platform built with Next.js. Players can create local game rooms, upload custom question packs in JSON, CSV, or TXT, manage turn order, and play through a fair no-repeat randomization engine with persistent sessions and export/import support.",
    impact: ["3 gameplay modes", "multi-format imports", "persistent local sessions", "invite-link-ready state"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "React state", "LocalStorage", "Playwright"],
    links: [{ label: "Live demo", href: "/truth-or-dare" }],
    modules: ["Room Manager", "Player Manager", "Question Pack Importer", "Parser", "Randomization Engine", "Game Modes", "Scoring", "Timer", "History", "Export / Import", "Invite Links"],
    architecture: [
      "Game rooms are represented as serializable local state with deterministic room identifiers.",
      "Player order is fully configurable and cycles automatically until the session ends.",
      "Question packs are validated and parsed from JSON, CSV, or TXT before entering gameplay.",
      "The randomization engine prevents repeated questions and only resets exhausted pools.",
      "Game progress, scores, history, and configuration persist locally through localStorage.",
      "The state model is designed to support future real-time multiplayer synchronization without major refactoring.",
    ],
    threatModel: [
      { risk: "Session loss", control: "Persistent localStorage, export/import, and automatic recovery", lesson: "Interactive applications should recover gracefully from accidental refreshes or browser closure." },
      { risk: "Malformed question packs", control: "Strict validation, live preview, and minimum content requirements", lesson: "User-supplied content should be validated before becoming application state." },
      { risk: "Repetitive gameplay", control: "No-repeat randomization with used-question tracking, per-player balance, and pool reset logic", lesson: "Randomness requires product rules to deliver a fair and engaging user experience." },
      { risk: "Future multiplayer complexity", control: "Serializable room state and deterministic game flow prepared for synchronization", lesson: "Extensible state models reduce future architectural changes." },
    ],
    mock: ["room:create(local)", "players:add(reorder)", "pack:import(json|csv|txt)", "question:draw(no-repeat)", "game:advanceTurn()", "session:save(local)", "session:export()", "invite:create()"],
  },
] as const;

export const stack = [
  { icon: ServerCog, area: "Backend", tools: ["Node.js", "NestJS", "Express.js", "REST APIs", "JWT", "Passport.js"] },
  { icon: Database, area: "Data", tools: ["PostgreSQL", "MySQL", "Prisma", "TypeORM", "Migrations", "Schema design"] },
  { icon: LockKeyhole, area: "Security", tools: ["RBAC", "API security", "Burp Suite", "Nmap", "Hydra", "Metasploit"] },
  { icon: Code2, area: "Delivery", tools: ["TypeScript", "Jest", "Supertest", "Swagger", "Docker", "GitHub"] },
];

export const apiEvidence = [
  { label: "Swagger/OpenAPI", detail: "Contracts visible for integration and review", icon: FileJson },
  { label: "RBAC", detail: "Role guards and resolved permissions", icon: KeyRound },
  { label: "Tests", detail: "Jest and Supertest API validation", icon: BadgeCheck },
  { label: "Health Checks", detail: "Operational endpoints and safeguards", icon: Radar },
  { label: "Tenant Isolation", detail: "School-scoped data workflows", icon: Network },
  { label: "Secure Sessions", detail: "JWT and refresh-token patterns", icon: ShieldCheck },
];

export const labItems = ["RootMe", "Vulnversity", "Mr. Robot", "Metasploit Introduction", "Windows Fundamentals", "Active Directory Basics", "Mr. Robot CTF", "RunCTF", "Kiop", "EchoCTF", "picoCTF basics"];

export const ctfBadges = [
  { title: "Cybercon CTF 2025", detail: "1st Runner-Up under the CITSA Hackathon", icon: Trophy },
  { title: "CITSA Cybersecurity Club", detail: "Web exploitation, Linux enumeration, privilege escalation, collaboration", icon: Users },
  { title: "TryHackMe Practice", detail: "Hands-on rooms across fundamentals, exploitation, and tooling", icon: Terminal },
  { title: "Tooling", detail: "Nmap, Burp Suite, Hydra, WPScan, Gobuster, Metasploit", icon: ScanSearch },
];

export const writeups = [
  { title: "How CTF practice changes API design", type: "Security note", status: "Live", detail: "Turning enumeration lessons into better auth boundaries, logs, and guards." },
  { title: "RBAC lessons from multi-school systems", type: "Backend architecture", status: "Live", detail: "What role drift, tenant isolation, and permissions taught me." },
  { title: "From mock data to live systems", type: "Integration story", status: "Live", detail: "How frontend/backend contracts become production workflows." },
  { title: "Mr. Robot CTF notes", type: "TryHackMe", status: "Live", detail: "Recon, WordPress entry, password cracking, shell upgrade, and SUID privilege path." },
  { title: "RunCTF local challenge", type: "CITSA practice", status: "Live", detail: "Virtual host discovery, file exposure, initial access, and SUID privilege lesson." },
  { title: "Kiop Samba lesson", type: "CTF practice", status: "Live", detail: "Legacy service review and why patching exposed services matters." },
];

export const timeline = [
  { label: "Robotics/STEM", detail: "Curiosity became hands-on electronics, Arduino, and teaching." },
  { label: "Frontend development", detail: "Next.js, React, TypeScript, Tailwind CSS, and practical product interfaces." },
  { label: "Backend systems", detail: "NestJS, Express, PostgreSQL, Prisma, REST APIs, authentication, RBAC, and testing." },
  { label: "Cybersecurity", detail: "TryHackMe, CTFs, Linux enumeration, privilege escalation, and API risk." },
  { label: "Secure systems", detail: "Building with both product delivery and attack surface in mind." },
];

export const trail = [
  {
    title: "Software Developer Intern",
    place: "Trinity Software Center, Kumasi",
    date: "Sep 2025 - Oct 2025",
    detail: "Built NestJS backend modules, role guards, database workflows, Swagger docs, seed scripts, Docker-supported setup, and Jest/Supertest API tests.",
  },
  {
    title: "Co-Founder, Full-Stack Developer & STEM Trainer",
    place: "CAS-7 TECHNOLOGY COMPANY, Kumasi",
    date: "Jan 2023 - Present",
    detail: "Co-founded a practical technology training initiative covering web development, Arduino, electronics, robotics, curriculum support, facilitator onboarding, and mentorship.",
  },
  {
    title: "Beginner Lead / Former DSA Co-Lead",
    place: "Amalitech Coding Club, University of Cape Coast",
    date: "Jun 2025 - Present",
    detail: "Facilitate beginner web sessions and formerly co-led DSA practice covering arrays, recursion, trees, graphs, sorting, and technical problem-solving.",
  },
];

export const achievements = [
  "Cybercon CTF 2025: 1st Runner-Up",
  "Beginner Lead, Amalitech Coding Club: renewed for January 2026",
  "Fall-Spring DSA Co-Lead, Amalitech Coding Club",
  "CITSA Cybersecurity Club active member",
  "CAS7TECH Certificate of Achievement",
  "Citation of Recognition - Leadership Excellence",
  "Beginner Lead, Amalitech Coding Club UCC",
  "Co-Founder, CAS-7 TECHNOLOGY COMPANY",
];

export const downloads = [
  { label: "Download CV", href: "/cv/somuah-julius-software-developer-cv-2026.pdf", icon: Download },
  { label: "GitHub", href: "https://github.com/khophisnow", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/khophisnow", icon: Linkedin },
  { label: "WaskiZone Services", href: "/waskizone", icon: Code2 },
  { label: "DareDeck", href: "/truth-or-dare", icon: Code2 },
  { label: "WhatsUpUCC API Docs", href: "https://whats-up-ucc-backend.onrender.com/api-docs/", icon: FileJson },
];

export const recruiterScan = [
  { label: "Best fit for", value: "Backend/API roles, secure product teams, integration-heavy platforms" },
  { label: "Strongest skills", value: "NestJS, Express, PostgreSQL, Prisma, auth, RBAC, Swagger, tests" },
  { label: "Can help with", value: "API design, backend modules, tenant isolation, docs, frontend integration" },
  { label: "Open to", value: "Internships, junior backend roles, collaborations, mentoring, training" },
];

export const apiSimulatorResponses = {
  "/projects": { status: 200, data: cases.map((item) => ({ name: item.name, role: item.role, stack: item.stack.slice(0, 3) })) },
  "/skills": { status: 200, data: stack.map((item) => ({ area: item.area, tools: item.tools })) },
  "/contact": { status: 200, data: { email: "juliusmcbrahamsomuah@gmail.com", github: "khophisnow", location: "Cape Coast, Ghana" } },
} as const;

export const commandActions = [
  { label: "Open case files", href: "#case-files", hint: "g p" },
  { label: "Open security lab", href: "#lab", hint: "g l" },
  { label: "Download CV", href: "/cv/somuah-julius-software-developer-cv-2026.pdf", hint: "g v" },
  { label: "GitHub", href: "https://github.com/khophisnow", hint: "g h" },
  { label: "WaskiZone services", href: "/waskizone", hint: "g w" },
  { label: "DareDeck game", href: "/truth-or-dare", hint: "g t" },
  { label: "Contact", href: "#contact", hint: "g c" },
];

export const philosophy = [
  "I do not treat security as a plugin. I treat it as part of the system design.",
  "A useful backend is not only fast. It is documented, testable, observable, and hard to misuse.",
  "Teaching makes my engineering sharper because explaining a system exposes where it is unclear.",
];

export type CaseStudy = (typeof cases)[number];

export const mediaAssets = [
  { title: "EduManage demo", type: "Live project + screenshot", src: "/images/edumanage-demo.webp", project: "EduManage", liveUrl: "https://edumanage-demo.vercel.app" },
  { title: "WhatsUpUCC live app", type: "Live project + screenshot", src: "/images/whats-up-ucc.webp", project: "WhatsUpUCC", liveUrl: "https://whats-up-ucc.vercel.app" },
  { title: "WhatsUpUCC API docs", type: "Saved API docs screen", src: "/images/whats-up-ucc-api-docs.webp", project: "WhatsUpUCC" },
  { title: "DareDeck game", type: "Local-first product", src: "/images/truth-or-dare.png", project: "DareDeck", liveUrl: "/truth-or-dare" },
  { title: "ACC/UCC citation", type: "Certificate / recognition", src: "/images/citationFromACC-UCC.jpeg", project: "Leadership" },
];

export const certificates = [
  { id: "acc-ucc-citation", title: "Citation of Recognition", issuer: "ACC/UCC", image: "/images/citationFromACC-UCC.jpeg", detail: "Leadership and contribution recognition for service and impact in the Amalitech Coding Club community." },
  { id: "cas7tech-achievement", title: "CAS7TECH Certificate of Achievement", issuer: "CAS-7 Technology", image: "/images/CAS7TECH_certificates/WhatsApp Image 2025-07-12 at 2.50.46 PM.jpeg", detail: "Recognized for demonstrating proficiency in HTML, CSS, JavaScript, Arduino programming, and STEM-based problem solving during the CAS7TECH First Badge training program." },
  { id: "cas7tech-graduation", title: "Certification of Graduation", issuer: "CAS-7 Technology", image: "/images/CAS7TECH_certificates/WhatsApp Image 2025-07-12 at 2.51.04 PM.jpeg", detail: "Awarded for successfully completing the first badge of CAS7TECH STEM and Tech training, covering hands-on skills in Arduino, electronics, and full-stack web development." },
];

export const writeupPosts = [
  { slug: "ctf-practice-api-design", title: "How CTF practice changes API design", type: "Security note", readingTime: "3 min read", tags: ["API security", "CTF", "auth"], body: ["CTF practice trains me to enumerate before assuming. In backend work, that turns into better route review, clearer auth boundaries, and stronger logging.", "The goal is not to make software feel scary. The goal is to make failure paths visible early enough to design around them."] },
  { slug: "rbac-multi-school-systems", title: "RBAC lessons from multi-school systems", type: "Backend architecture", readingTime: "4 min read", tags: ["RBAC", "multi-tenant", "Prisma"], body: ["Multi-school systems make permission drift obvious. A role is not enough unless the tenant context, route guard, service query, and UI expectation agree.", "EduManage taught me to treat tenant isolation as an invariant that every module has to respect."] },
  { slug: "mock-data-to-live-systems", title: "From mock data to live systems", type: "Integration story", readingTime: "3 min read", tags: ["integration", "contracts", "debugging"], body: ["Replacing mock data with live workflows is where vague frontend assumptions meet real backend contracts.", "The fastest integrations came from documented endpoints, predictable responses, and tight feedback between frontend and backend debugging."] },
  { slug: "mr-robot-ctf-notes", title: "Mr. Robot CTF notes", type: "TryHackMe", readingTime: "5 min read", tags: ["recon", "WordPress", "privilege path"], body: ["A sanitized note from my TryHackMe Mr. Robot practice covering recon, WordPress discovery, credential testing, password cracking, shell handling, and SUID escalation lessons."] },
  { slug: "runctf-local-challenge", title: "RunCTF local challenge", type: "CITSA practice", readingTime: "4 min read", tags: ["virtual hosts", "SUID", "local lab"], body: ["A local boot-to-root practice note covering virtual hosts, directory discovery, exposed configuration, initial access, and privilege escalation thinking."] },
  { slug: "kiop-samba-lesson", title: "Kiop Samba lesson", type: "CTF practice", readingTime: "3 min read", tags: ["legacy services", "Samba", "patching"], body: ["A short note on legacy Samba exposure, service review, and why old internet-facing services are never small risks."] },
];

export const securityNotes = [
  {
    title: "Tenant data exposure",
    rating: "High",
    area: "Access control",
    risk: "A multi-school platform can expose records across schools if every route and query does not carry tenant context.",
    evidence: "Review routes that return shared records, role-protected dashboards, reports, and admin endpoints.",
    remediation: "Enforce tenant-scoped queries, role guards, permission tests, and regression checks around school boundaries.",
  },
  {
    title: "Weak session lifecycle",
    rating: "Medium",
    area: "Authentication",
    risk: "Long-lived or poorly rotated tokens make account abuse harder to contain after compromise.",
    evidence: "Review login, refresh, logout, token storage, expiry, and invalidation behavior.",
    remediation: "Use short-lived access tokens, refresh-token rotation, logout invalidation, and clear session handling notes.",
  },
  {
    title: "Public API overexposure",
    rating: "Medium",
    area: "API boundary",
    risk: "Public endpoints without validation, rate limits, CORS control, and request tracing become harder to defend.",
    evidence: "Review unauthenticated routes, upload paths, error responses, request volume, and API documentation.",
    remediation: "Apply request validation, rate limiting, CORS policy, safer errors, OpenAPI docs, and health checks.",
  },
  {
    title: "Moderation gap",
    rating: "Medium",
    area: "Community safety",
    risk: "Community platforms can become unsafe when content review and admin action paths are missing.",
    evidence: "Review event creation, media uploads, comments, reports, admin actions, and notification flows.",
    remediation: "Add moderation states, admin review screens, audit notes, and clear content handling workflows.",
  },
] as const;

export const projectEvidence = [
  { project: "EduManage", label: "Access boundaries", detail: "Role guards, resolved permissions, and school-aware service queries keep workflows scoped to the right tenant." },
  { project: "EduManage", label: "Integration proof", detail: "Swagger contracts, seed data, health checks, and tests make frontend/backend integration easier to verify." },
  { project: "WhatsUpUCC", label: "Public API hygiene", detail: "JWT guards, request tracking, CORS configuration, rate limiting, and API docs support safer public-facing usage." },
  { project: "WhatsUpUCC", label: "Community safety", detail: "Moderation, media, notifications, and admin workflows are part of the product design, not afterthoughts." },
];

export const waskiZone = {
  name: "WaskiZone",
  tagline: "Practical software. Security-minded systems.",
  positioning: "WaskiZone designs, builds, deploys, and secures web platforms for founders, schools, clubs, and small teams that need reliable software with clear ownership and stronger security habits.",
  activeOffer: "Services cover software development, backend/API engineering, dashboards, technical training, and authorized cybersecurity support such as API security review, hardening guidance, and defensive security training.",
};

export const waskiServices = [
  { title: "Backend API Engineering", status: "Available", detail: "REST APIs, authentication, roles, database workflows, documentation, testing, and deployment-ready backend modules.", proof: "Best for products that need reliable data, user accounts, permissions, and integration-ready APIs." },
  { title: "Full-Stack Web Applications", status: "Available", detail: "Responsive interfaces, dashboards, admin panels, portals, and product workflows connected to real backend services.", proof: "Best for founders, clubs, schools, community platforms, and small businesses." },
  { title: "Dashboards & Internal Tools", status: "Available", detail: "Operational dashboards, forms, tables, filters, reports, role-aware views, and admin workflows for repeated work.", proof: "Best for teams replacing manual tracking with structured software." },
  { title: "Deployment & Maintenance", status: "Available", detail: "Bug fixes, API cleanup, documentation, Vercel/Render deployment support, performance passes, and handover notes.", proof: "Best for existing projects that need to become stable, presentable, and easier to maintain." },
  { title: "Cybersecurity Support", status: "Authorized scope", detail: "API security review, access-control review, basic web hardening, security-aware code review, and defensive recommendations for owned systems.", proof: "Best for teams that want safer software without pretending security is an afterthought." },
  { title: "Technical Training", status: "Available", detail: "Practical web development, Git/GitHub, backend foundations, API security basics, Arduino/STEM, and project-based sessions.", proof: "Best for schools, clubs, bootcamps, beginner developers, and technical communities." },
];

export const waskiPackages = [
  { name: "Launch Presence", price: "Starter", detail: "A professional website or organization page with clear messaging, contact flow, responsive design, and deployment setup.", items: ["Brand-aligned pages", "Contact flow", "Responsive build", "Deployment setup"] },
  { name: "API Foundation", price: "Core", detail: "A backend foundation for products that need authentication, roles, database workflows, and API documentation.", items: ["Auth + roles", "Database schema", "REST endpoints", "API docs"] },
  { name: "Secure Product Build", price: "Custom", detail: "A fuller build for dashboards, portals, school systems, event platforms, or internal tools with security-aware delivery.", items: ["Frontend + backend", "Admin workflows", "Security checklist", "Launch support"] },
  { name: "Security Review", price: "Scoped", detail: "Authorized review for owned web apps or APIs, focused on access control, configuration, exposed routes, and practical hardening.", items: ["Scope agreement", "Risk notes", "Hardening actions", "Summary report"] },
];

export const waskiProcess = [
  "Discovery: define the users, business problem, risks, existing systems, and success criteria.",
  "Architecture: map pages, data, roles, integrations, security boundaries, and deployment requirements.",
  "Build: deliver in visible checkpoints with clear feedback points and working increments.",
  "Validate: test core workflows, review access boundaries, document usage, and prepare deployment.",
  "Launch: deploy, hand over, monitor early issues, and plan the next improvement cycle.",
];

export const waskiServiceDetails = [
  {
    slug: "backend-api-engineering",
    title: "Backend API Engineering",
    summary: "REST APIs, authentication, roles, database workflows, OpenAPI documentation, tests, and deployment-ready backend foundations.",
    goodFor: ["SaaS ideas", "school systems", "dashboards", "event platforms", "internal tools"],
    deliverables: ["API route map", "auth and role model", "database schema", "OpenAPI documentation", "test-ready endpoints", "deployment notes"],
    proof: "Backed by EduManage and WhatsUpUCC backend work across auth, roles, modules, and public API documentation.",
  },
  {
    slug: "full-stack-web-applications",
    title: "Full-Stack Web Applications",
    summary: "Responsive product interfaces connected to real data, admin workflows, APIs, dashboards, and deployment-ready pages.",
    goodFor: ["founders", "clubs", "student groups", "communities", "small teams"],
    deliverables: ["responsive UI", "backend connection", "forms and flows", "admin screens", "deployment", "handover notes"],
    proof: "Built and integrated production-style flows across portfolio, campus, and academic management systems.",
  },
  {
    slug: "dashboards-and-internal-tools",
    title: "Dashboards & Internal Tools",
    summary: "Internal panels, data views, role-aware screens, status dashboards, reports, and operational tools for repeated work.",
    goodFor: ["operations", "school admins", "team leads", "event managers", "project owners"],
    deliverables: ["dashboard layout", "role-aware views", "data tables", "status cards", "filters", "deployment checklist"],
    proof: "Built around the same thinking used in EduManage modules, roles, reports, and operational views.",
  },
  {
    slug: "cybersecurity-support",
    title: "Cybersecurity Support",
    summary: "Authorized API and web security review, access-control checks, hardening guidance, and defensive security training for owned systems.",
    goodFor: ["owned web apps", "backend APIs", "student systems", "internal tools", "training groups"],
    deliverables: ["scope agreement", "risk findings", "hardening checklist", "access-control notes", "remediation guidance", "summary report"],
    proof: "Grounded in CTF practice, API security thinking, backend authorization work, and defensive system design.",
  },
  {
    slug: "technical-training",
    title: "Technical Training",
    summary: "Practical training for web development, Git/GitHub, backend foundations, API security basics, Arduino/STEM, and beginner project thinking.",
    goodFor: ["clubs", "schools", "bootcamps", "beginner developers", "STEM groups"],
    deliverables: ["training outline", "project exercises", "live sessions", "debug support", "resources", "progress plan"],
    proof: "Grounded in CAS-7 Technology, Amalitech Coding Club, robotics/STEM, and beginner developer mentoring work.",
  },
] as const;

export const waskiEstimator = [
  { answer: "We need a professional public website", result: "Launch Presence" },
  { answer: "We need auth, roles, APIs, or stored data", result: "API Foundation" },
  { answer: "We need dashboards, workflows, and admin control", result: "Secure Product Build" },
  { answer: "We need our web app/API reviewed or hardened", result: "Security Review" },
];

export const waskiProposalPreview = [
  "Problem summary, users, and business goal",
  "Recommended pages, modules, user roles, and workflows",
  "Backend/API, database, and integration plan where needed",
  "Security considerations for access control, validation, and deployment",
  "Timeline, milestones, support expectations, and handover plan",
];

export const waskiBeforeAfter = [
  { before: "Unclear product idea", after: "Defined scope, users, workflows, roles, and launch path" },
  { before: "Unstructured backend", after: "Documented API, database model, auth boundaries, and deployment notes" },
  { before: "Manual tracking", after: "Dashboard, forms, reports, admin views, and repeatable operations" },
  { before: "Unknown security posture", after: "Scoped risk notes, hardening actions, and defensive recommendations" },
];

export const waskiOnboarding = [
  "Initial inquiry with the project goal, current state, timeline, and ownership scope.",
  "Discovery call or message thread to confirm users, workflows, risks, and first milestone.",
  "Proposal or scope note with deliverables, assumptions, timeline, and support terms.",
  "Build or review phase with checkpoints, feedback, and documented decisions.",
  "Deployment, handover, security notes, and optional maintenance or training support.",
];

export const waskiFaqs = [
  { q: "Does WaskiZone offer cybersecurity services?", a: "Yes, within clear authorized scope. Current services focus on API security review, access-control review, web hardening guidance, defensive training, and practical remediation for systems you own or are allowed to test." },
  { q: "Can WaskiZone build both frontend and backend?", a: "Yes. The strongest offer is backend/API engineering, but WaskiZone can deliver full-stack web applications, dashboards, admin tools, and deployment-ready websites." },
  { q: "Who is the best fit for WaskiZone?", a: "Founders, schools, clubs, student groups, small teams, and organizations that need practical software, clear communication, and security-aware delivery." },
  { q: "Are prices fixed?", a: "Packages are starting points. Final pricing depends on scope, pages, data complexity, integrations, timeline, security review depth, and support needs." },
  { q: "Can WaskiZone maintain an existing project?", a: "Yes. Maintenance can include bug fixes, API cleanup, documentation, deployment support, hardening recommendations, and small feature improvements." },
];

export const waskiBrandGuidelines = {
  colors: ["near-black / deep navy", "mint green", "cyan blue", "controlled red accent", "white / soft gray"],
  voice: ["practical", "technical", "trustworthy", "direct", "security-aware"],
  usage: ["Use WaskiZone for client-facing software and cybersecurity services", "Use W4sk1Z0n3 for the cybersecurity identity and lab-facing materials", "Use transparent logo assets inside the website UI", "Keep claims scoped, authorized, and evidence-based"],
};

export const waskiTestimonials = [
  { label: "EduManage proof", quote: "A complex academic platform shows the backend depth behind WaskiZone: modules, roles, tenant boundaries, and API documentation.", source: "Portfolio case study" },
  { label: "WhatsUpUCC proof", quote: "A campus platform shows practical delivery: public features, moderation, media workflows, and documented backend routes.", source: "Portfolio case study" },
  { label: "Training proof", quote: "CAS-7 Technology and Amalitech Coding Club work show the teaching side: practical sessions, beginner support, and project-based learning.", source: "Community proof" },
] as const;

export const waskiSecurityPolicy = [
  { title: "Authorization first", detail: "Security review only happens on systems the client owns or has written permission to test." },
  { title: "Clear scope", detail: "Before review starts, the target, boundaries, allowed methods, reporting format, and stop conditions should be agreed." },
  { title: "No destructive testing", detail: "The focus is review, hardening, and defensive recommendations, not disruption or unsafe exploitation." },
  { title: "Evidence-based reporting", detail: "Findings should explain risk, affected area, practical evidence, recommended fix, and priority." },
  { title: "Confidential handling", detail: "Client system details, findings, credentials, and screenshots should be handled privately unless publication is approved." },
] as const;
