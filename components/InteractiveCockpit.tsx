"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ChevronRight, Mail, Search, ShieldCheck, Terminal, Volume2, VolumeX } from "lucide-react";
import { apiSimulatorResponses, commandActions, modes } from "@/lib/portfolio-data";

type ModeKey = keyof typeof modes;
type Endpoint = keyof typeof apiSimulatorResponses;

const modeKeys: ModeKey[] = ["builder", "breaker", "trainer"];
const endpoints = Object.keys(apiSimulatorResponses) as Endpoint[];

const heroCopy = {
  builder: {
    eyebrow: "secure product builder + backend system thinker",
    title: "I turn product ideas into secure, working backend systems.",
    body: "I am Somuah Julius Mcbraham Paapa-Boateng, also known as KhophiSnow. I build backend APIs, multi-tenant platforms, auth workflows, and database-driven products with documentation, tests, and integration paths that make products usable.",
    primary: "Open Case Files",
    secondary: "Switch Modes",
    chips: ["Secure APIs", "System integration", "Documented flows"],
  },
  breaker: {
    eyebrow: "ethical hacking mindset + defensive discipline",
    title: "I inspect systems like an attacker so I can build them safer.",
    body: "I sharpen my security instincts through CTFs, Linux labs, enumeration, web exploitation practice, and API risk review. That attacker mindset helps me design clearer boundaries, stronger access control, and safer backend behavior.",
    primary: "View Security Lab",
    secondary: "Scan Projects",
    chips: ["Recon mindset", "Threat paths", "Access control"],
  },
  trainer: {
    eyebrow: "technical trainer + practical mentor",
    title: "I teach technology by making people build real things.",
    body: "I mentor beginners in web development, Git, programming foundations, Arduino, STEM projects, and problem solving. Teaching keeps my engineering clearer because every system must be simple enough to explain.",
    primary: "See Proof Trail",
    secondary: "View Modes",
    chips: ["150+ learners", "Web training", "STEM projects"],
  },
} as const;

export function ModeAwareHeroText() {
  const [active, setActive] = useState<ModeKey>("builder");
  useEffect(() => {
    const update = () => {
      const mode = document.documentElement.dataset.mode as ModeKey | undefined;
      if (mode && modeKeys.includes(mode)) setActive(mode);
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-mode"] });
    return () => observer.disconnect();
  }, []);
  const copy = heroCopy[active];
  const primaryHref = active === "breaker" ? "#lab" : active === "trainer" ? "#trail" : "#case-files";
  const secondaryHref = active === "breaker" ? "#case-files" : "#modes";
  return <div><div className="mb-7 inline-flex max-w-full items-center gap-2 border border-cyan/30 bg-cyan/10 px-3 py-2 font-mono text-xs text-cyan"><ShieldCheck size={15} />{copy.eyebrow}</div><h1 className="max-w-4xl text-5xl font-black leading-[1.02] text-white md:text-7xl">{copy.title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">{copy.body}</p><div className="mt-8 flex flex-wrap gap-3"><a href={primaryHref} className="inline-flex items-center gap-2 bg-mint px-5 py-3 font-bold text-ink transition hover:bg-white">{copy.primary}<ArrowUpRight size={18} /></a><a href={secondaryHref} className="inline-flex items-center gap-2 border border-white/18 px-5 py-3 font-bold text-white transition hover:border-cyan hover:text-cyan"><ChevronRight size={18} />{copy.secondary}</a></div><div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">{copy.chips.map((item) => <div key={item} className="border border-white/10 bg-white/[0.035] px-4 py-3 font-mono text-xs text-white/65"><ChevronRight className="mb-2 text-mint" size={16} />{item}</div>)}</div></div>;
}

const terminalLines = [
  "$ whoami",
  "Somuah Julius Mcbraham Paapa-Boateng / KhophiSnow",
  "$ cat skills.json",
  "{ backend: [NestJS, Express, Prisma], security: [Nmap, Burp, CTFs] }",
  "$ scan projects",
  "EduManage: 46 modules, 8 roles, 100+ endpoints",
  "WhatsUpUCC: events, media, moderation, API docs",
];

export function ModeSwitcher() {
  const [active, setActive] = useState<ModeKey>("builder");
  const mode = modes[active];

  useEffect(() => {
    const saved = window.localStorage.getItem("khophisnow-mode") as ModeKey | null;
    if (!saved || !modeKeys.includes(saved)) return;
    const timer = window.setTimeout(() => setActive(saved), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.mode = active;
    window.localStorage.setItem("khophisnow-mode", active);
  }, [active]);

  return (
    <section id="modes" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <p className="font-mono text-sm uppercase mode-dynamic-text">Mode switcher</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">Builder, breaker, trainer. Same operator, different lens.</h2>
          <p className="mt-5 text-sm leading-7 text-white/62">Switch modes to see how the site story changes between software delivery, ethical hacking practice, and teaching impact.</p>
          <div className="mt-8 grid gap-3">
            {modeKeys.map((key) => (
              <button key={key} type="button" onClick={() => setActive(key)} className={`flex items-center justify-between border px-4 py-3 text-left transition ${active === key ? "mode-button-active" : "border-white/10 bg-panel/60 text-white/62 hover:border-white/25"}`}>
                <span><span className="mode-button-label block font-mono text-xs uppercase text-mint">{modes[key].label}</span><span className="mt-1 block font-bold">{modes[key].headline}</span></span>
                <ChevronRight size={18} />
              </button>
            ))}
          </div>
        </div>
        <div className="mode-panel border bg-panel/80 p-5">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4"><span className="size-3 rounded-full bg-[#ff5f57]" /><span className="size-3 rounded-full bg-amber" /><span className="size-3 rounded-full bg-mint" /><span className="ml-2 font-mono text-xs text-white/45">current view</span></div>
          <p className="mode-dynamic-text mt-6 font-mono text-xs uppercase">{mode.label}</p>
          <h3 className="mt-2 text-4xl font-black text-white">{mode.headline}</h3>
          <div className="mode-dynamic-border mode-dynamic-bg mt-5 border bg-black/35 p-3 font-mono text-xs text-white">$ {mode.command}</div>
          <p className="mt-5 text-sm leading-7 text-white/68">{mode.text}</p>
          <div className="mt-6 grid gap-2 sm:grid-cols-2">{mode.points.map((point) => <span key={point} className="flex items-center gap-2 border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-white/68"><ChevronRight size={15} className="mode-dynamic-text" />{point}</span>)}</div>
        </div>
      </div>
    </section>
  );
}

export function TypedTerminal() {
  const [visible, setVisible] = useState(1);
  useEffect(() => {
    if (visible >= terminalLines.length) return;
    const timer = window.setTimeout(() => setVisible((value) => value + 1), 520);
    return () => window.clearTimeout(timer);
  }, [visible]);
  return (
    <div className="panel-glow noise relative overflow-hidden border border-mint/20 bg-panel/88 p-4 backdrop-blur">
      <div className="sweep pointer-events-none absolute inset-y-0 left-0 w-1/2" />
      <div className="relative mb-4 flex items-center gap-2 border-b border-white/10 pb-3"><span className="size-3 rounded-full bg-[#ff5f57]" /><span className="size-3 rounded-full bg-amber" /><span className="size-3 rounded-full bg-mint" /><span className="ml-2 font-mono text-xs text-white/45">live terminal</span></div>
      <div className="relative min-h-[360px] font-mono text-xs leading-6 text-white/72">{terminalLines.slice(0, visible).map((line, index) => <p key={`${line}-${index}`} className={line.startsWith("$") ? "text-mint" : "text-white/68"}>{line}</p>)}<span className="text-mint">_</span></div>
    </div>
  );
}

export function ApiSimulator() {
  const [endpoint, setEndpoint] = useState<Endpoint>("/projects");
  const response = useMemo(() => JSON.stringify(apiSimulatorResponses[endpoint], null, 2), [endpoint]);
  return <div className="border border-white/10 bg-panel/75 p-5"><div className="flex items-center gap-2 text-mint"><Terminal size={18} /><p className="font-mono text-xs uppercase">API request simulator</p></div><div className="mt-5 flex flex-wrap gap-2">{endpoints.map((item) => <button key={item} type="button" onClick={() => setEndpoint(item)} className={`border px-3 py-2 font-mono text-xs transition ${endpoint === item ? "border-mint bg-mint text-ink" : "border-white/10 bg-white/[0.035] text-white/68 hover:border-cyan"}`}>GET {item}</button>)}</div><pre className="mt-5 max-h-[360px] overflow-auto border border-white/10 bg-black/40 p-4 text-xs leading-6 text-cyan"><code>{response}</code></pre></div>;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let waitingForGo = false;
    let resetTimer: number | undefined;
    const go = (hash: string) => {
      window.location.hash = hash;
      waitingForGo = false;
      if (resetTimer) window.clearTimeout(resetTimer);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const target = event.target as HTMLElement | null;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA") return;
      if (event.key === "/" || ((event.metaKey || event.ctrlKey) && key === "k")) { event.preventDefault(); setOpen(true); }
      if (key === "escape") { setOpen(false); waitingForGo = false; }
      if (waitingForGo) {
        if (key === "p") go("case-files");
        if (key === "c") go("contact");
        if (key === "l") go("lab");
        if (key === "v") window.location.href = "/cv/somuah-julius-software-developer-cv-2026.pdf";
        return;
      }
      if (key === "g") {
        waitingForGo = true;
        if (resetTimer) window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(() => { waitingForGo = false; }, 1200);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (resetTimer) window.clearTimeout(resetTimer);
    };
  }, []);
  return <>{<button type="button" onClick={() => setOpen(true)} aria-label="Open quick actions" title="Open quick actions" className="fixed bottom-5 right-5 z-40 flex size-12 items-center justify-center border border-mint/40 bg-ink/90 text-mint shadow-terminal backdrop-blur transition hover:bg-mint hover:text-ink"><Search size={18} /></button>}{open && <div className="fixed bottom-20 right-4 z-50 w-[min(calc(100vw-2rem),430px)] border border-mint/30 bg-ink/96 p-4 shadow-terminal backdrop-blur md:right-5" onClick={(event) => event.stopPropagation()}><div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4"><div className="flex items-center gap-3"><Search className="text-mint" size={18} /><p className="font-mono text-sm text-white/75">Quick actions</p></div><button type="button" onClick={() => setOpen(false)} className="border border-white/12 px-2 py-1 text-xs text-white/55 hover:border-mint hover:text-mint">Close</button></div><div className="mt-4 max-h-[58vh] space-y-2 overflow-auto pr-1">{commandActions.map((action) => <a key={action.label} href={action.href} target={action.href.startsWith("http") ? "_blank" : undefined} rel={action.href.startsWith("http") ? "noreferrer" : undefined} onClick={() => setOpen(false)} className="flex items-center justify-between border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white/72 hover:border-mint hover:text-mint"><span>{action.label}</span><span className="font-mono text-xs text-white/42">{action.hint}</span></a>)}</div></div>}</>;
}

export function ContactIntentSelector() {
  const intents = [
    { label: "Hire for backend", subject: "Backend/API opportunity" },
    { label: "Collaborate", subject: "Project collaboration" },
    { label: "Mentorship", subject: "Mentorship or training request" },
    { label: "Security discussion", subject: "Security discussion" },
  ];
  const [subject, setSubject] = useState(intents[0].subject);
  const href = `mailto:juliusmcbrahamsomuah@gmail.com?subject=${encodeURIComponent(subject)}`;
  return <div className="border border-white/10 bg-panel/70 p-5"><p className="font-mono text-xs uppercase text-mint">Contact intent</p><div className="mt-4 grid gap-2 sm:grid-cols-2">{intents.map((intent) => <button key={intent.subject} type="button" onClick={() => setSubject(intent.subject)} className={`border px-3 py-3 text-left text-sm transition ${subject === intent.subject ? "border-mint bg-mint/10 text-white" : "border-white/10 bg-white/[0.035] text-white/62 hover:border-cyan"}`}>{intent.label}</button>)}</div><a href={href} className="mt-4 inline-flex items-center gap-2 bg-mint px-4 py-3 font-bold text-ink transition hover:bg-white"><Mail size={17} />Compose email<ArrowUpRight size={16} /></a></div>;
}

export function HackChallenge() {
  const [answer, setAnswer] = useState("");
  const [solved, setSolved] = useState(false);
  const normalized = answer.trim().toLowerCase();
  const check = () => setSolved(normalized === "rbac" || normalized === "tenant isolation");
  return (
    <div className="border border-white/10 bg-panel/75 p-5">
      <div className="flex items-center gap-2 text-mint"><Terminal size={18} /><p className="font-mono text-xs uppercase">Hack the site mini challenge</p></div>
      <p className="mt-4 text-sm leading-7 text-white/65">Harmless puzzle: in a multi-school system, what control helps prevent one school from reading another school&apos;s data?</p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row"><input value={answer} onChange={(event) => setAnswer(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") check(); }} placeholder="type answer" className="min-w-0 flex-1 border border-white/10 bg-black/35 px-3 py-3 font-mono text-sm text-white outline-none focus:border-mint" /><button type="button" onClick={check} className="bg-mint px-4 py-3 font-bold text-ink hover:bg-white">Submit</button></div>
      {solved ? <p className="mt-4 font-mono text-sm text-mint">Correct. Security starts with boundaries.</p> : <p className="mt-4 font-mono text-xs text-white/42">Hint: role checks or tenant isolation</p>}
    </div>
  );
}

export function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const beep = () => {
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.frequency.value = 520;
    gain.gain.value = 0.025;
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.045);
  };
  return <button type="button" aria-label={`Terminal sound ${enabled ? "on" : "off"}`} title={`Terminal sound ${enabled ? "on" : "off"}`} onClick={() => { const next = !enabled; setEnabled(next); if (next) setTimeout(beep, 0); }} className="fixed bottom-[8.75rem] right-5 z-40 hidden size-12 items-center justify-center border border-white/12 bg-ink/90 text-white/60 shadow-terminal backdrop-blur transition hover:border-mint hover:text-mint md:flex">{enabled ? <Volume2 size={18} /> : <VolumeX size={18} />}</button>;
}

type GitHubFeedItem = {
  id: string;
  title: string;
  summary: string;
  repo: string;
  url: string;
  publishedAt: string;
};

type GitHubFeed = {
  updatedAt: string;
  source: string;
  items: GitHubFeedItem[];
};

export function GitHubActivity() {
  const [feed, setFeed] = useState<GitHubFeed | null>(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("/github-feed.json", { cache: "no-store" })
      .then((res) => res.ok ? res.json() : Promise.reject(new Error("Feed unavailable")))
      .then((data: GitHubFeed) => { setFeed(data); setStatus("ready"); })
      .catch(() => setStatus("offline"));
  }, []);

  const updated = feed?.updatedAt
    ? new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(feed.updatedAt))
    : null;

  return (
    <div className="border border-white/10 bg-panel/75 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase text-mint">GitHub activity feed</p>
          <p className="mt-2 text-sm text-white/50">Recent public work, refreshed hourly from GitHub.</p>
        </div>
        {updated && <span className="shrink-0 border border-white/10 px-2 py-1 font-mono text-[10px] uppercase text-white/45">Updated {updated}</span>}
      </div>
      {status === "loading" && <p className="mt-4 text-sm text-white/50">Loading saved activity...</p>}
      {status === "offline" && <p className="mt-4 text-sm text-white/50">Activity feed is unavailable right now. The profile link still works.</p>}
      <div className="mt-4 space-y-3">
        {feed?.items.slice(0, 2).map((event) => (
          <a key={event.id} href={event.url} target="_blank" rel="noreferrer" className="block border border-white/10 bg-black/25 p-3 text-sm text-white/65 hover:border-mint">
            <span className="font-mono text-xs text-cyan">{event.title}</span>
            <span className="mt-1 block font-bold text-white">{event.repo}</span>
            <span className="mt-2 block text-white/52">{event.summary}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
