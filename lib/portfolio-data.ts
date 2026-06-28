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

export const navItems = ["Identity", "Modes", "Status", "Case Files", "Evidence", "Lab", "Writeups", "Contact"];

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
  { label: "Web development", detail: "HTML, CSS, JavaScript, PHP, React, and practical product interfaces." },
  { label: "Backend systems", detail: "NestJS, Express, PostgreSQL, Prisma, APIs, auth, and testing." },
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
  { label: "Contact", href: "#contact", hint: "g c" },
];

export const philosophy = [
  "I do not treat security as a plugin. I treat it as part of the system design.",
  "A useful backend is not only fast. It is documented, testable, observable, and hard to misuse.",
  "Teaching makes my engineering sharper because explaining a system exposes where it is unclear.",
];

export type CaseStudy = (typeof cases)[number];

export const mediaAssets = [
  { title: "EduManage demo", type: "Live project + screenshot", src: "/images/edumanage-demo.vercel.app_.png", project: "EduManage", liveUrl: "https://edumanage-demo.vercel.app" },
  { title: "WhatsUpUCC live app", type: "Live project + screenshot", src: "/images/whats-up-ucc.vercel.app_(Nest Hub Max).png", project: "WhatsUpUCC", liveUrl: "https://whats-up-ucc.vercel.app" },
  { title: "WhatsUpUCC API docs", type: "Saved API docs screen", src: "/images/whats-up-ucc-backend.onrender.com_api-docs_(Nest Hub Max).png", project: "WhatsUpUCC" },
  { title: "ACC/UCC citation", type: "Certificate / recognition", src: "/images/citationFromACC-UCC.jpeg", project: "Leadership" },
];

export const certificates = [
  { id: "acc-ucc-citation", title: "Citation of Recognition", issuer: "ACC/UCC", image: "/images/citationFromACC-UCC.jpeg", detail: "Leadership and contribution recognition for service and impact in the Amalitech Coding Club community." },
  { id: "cas7tech-achievement", title: "CAS7TECH Certificate of Achievement", issuer: "CAS-7 Technology", image: "/images/CAS7TECH_certificates/WhatsApp Image 2025-07-12 at 2.50.46 PM.jpeg", detail: "Recognized for demonstrating proficiency in HTML, CSS, JavaScript, Arduino programming, and STEM-based problem solving during the CAS7TECH First Badge training program." },
  { id: "cas7tech-graduation", title: "Certification of Graduation", issuer: "CAS-7 Technology", image: "/images/CAS7TECH_certificates/WhatsApp Image 2025-07-12 at 2.51.04 PM.jpeg", detail: "Awarded for successfully completing the first badge of CAS7TECH STEM and Tech training, covering hands-on skills in Arduino, electronics, and full-stack web development." },
];

export const writeupPosts = [
  { slug: "ctf-practice-api-design", title: "How CTF practice changes API design", type: "Security note", body: ["CTF practice trains me to enumerate before assuming. In backend work, that turns into better route review, clearer auth boundaries, and stronger logging.", "The goal is not to make software feel scary. The goal is to make failure paths visible early enough to design around them."] },
  { slug: "rbac-multi-school-systems", title: "RBAC lessons from multi-school systems", type: "Backend architecture", body: ["Multi-school systems make permission drift obvious. A role is not enough unless the tenant context, route guard, service query, and UI expectation agree.", "EduManage taught me to treat tenant isolation as an invariant that every module has to respect."] },
  { slug: "mock-data-to-live-systems", title: "From mock data to live systems", type: "Integration story", body: ["Replacing mock data with live workflows is where vague frontend assumptions meet real backend contracts.", "The fastest integrations came from documented endpoints, predictable responses, and tight feedback between frontend and backend debugging."] },
  { slug: "mr-robot-ctf-notes", title: "Mr. Robot CTF notes", type: "TryHackMe", body: ["A sanitized note from my TryHackMe Mr. Robot practice covering recon, WordPress discovery, credential testing, password cracking, shell handling, and SUID escalation lessons."] },
  { slug: "runctf-local-challenge", title: "RunCTF local challenge", type: "CITSA practice", body: ["A local boot-to-root practice note covering virtual hosts, directory discovery, exposed configuration, initial access, and privilege escalation thinking."] },
  { slug: "kiop-samba-lesson", title: "Kiop Samba lesson", type: "CTF practice", body: ["A short note on legacy Samba exposure, service review, and why old internet-facing services are never small risks."] },
];
