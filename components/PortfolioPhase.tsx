"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, BadgeCheck, CheckCircle2, Database, FileText, Gauge, KeyRound, Maximize2, Network, Route, Send, Server, ShieldAlert, ShieldCheck, UserCheck } from "lucide-react";
import { achievements, cases, certificates, mediaAssets, waskiProcess, waskiProposalPreview } from "@/lib/portfolio-data";

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div><p className="font-mono text-sm uppercase text-mint">{eyebrow}</p><h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">{title}</h2></div>;
}

export function ProjectWalkthroughs() {
  const [active, setActive] = useState(0);
  const project = cases[active];
  const flow = project.name === "EduManage"
    ? ["Tenant context", "Identity check", "Role resolution", "Module action", "Operational proof"]
    : ["Campus action", "API boundary", "Feature workflow", "Moderation path", "Public proof"];
  const details = project.architecture.slice(0, 5);

  return (
    <section className="border-y border-white/10 bg-white/[0.025]">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionTitle eyebrow="Project walkthroughs" title="How the major systems move from request to outcome" />
          <div className="flex flex-wrap gap-2">
            {cases.map((item, index) => (
              <button key={item.slug} type="button" onClick={() => setActive(index)} className={`border px-4 py-3 text-sm font-bold transition ${active === index ? "border-mint bg-mint text-ink" : "border-white/12 text-white/65 hover:border-mint hover:text-mint"}`}>
                {item.name}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)]">
          <article className="flex min-w-0 flex-col justify-between border border-white/10 bg-panel/70 p-6">
            <div>
              <p className="font-mono text-xs uppercase text-cyan">{project.code} / {project.status}</p>
              <h3 className="mt-3 text-3xl font-black text-white">{project.name}</h3>
              <p className="mt-4 text-sm leading-7 text-white/64">{project.brief}</p>
            </div>
            <div className="mt-6 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">{project.impact.map((item) => <span key={item} className="border border-mint/25 bg-mint/10 px-3 py-2 font-mono text-xs text-mint">{item}</span>)}</div>
          </article>
          <div className="relative min-w-0 border border-white/10 bg-panel/70 p-4 sm:p-5">
            <div className="pointer-events-none absolute left-8 top-10 hidden h-[calc(100%-5rem)] w-px bg-gradient-to-b from-mint/70 via-cyan/35 to-transparent lg:block" />
            <div className="grid gap-4 lg:grid-cols-2">
              {flow.map((step, index) => (
                <article key={step} className={`relative grid min-w-0 gap-4 border border-white/10 bg-black/24 p-4 sm:grid-cols-[2.75rem_1fr] ${index === flow.length - 1 ? "lg:col-span-2" : ""}`}>
                  <span className="relative z-10 flex size-11 shrink-0 items-center justify-center border border-mint/30 bg-ink font-mono text-xs text-mint shadow-terminal">{index + 1}</span>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase text-cyan">step {String(index + 1).padStart(2, "0")}</p>
                    <h4 className="mt-1 text-lg font-black text-white">{step}</h4>
                    <p className="mt-2 text-xs leading-6 text-white/58">{details[index]}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export function ArchitectureFlowMaps() {
  const [active, setActive] = useState(0);
  const project = cases[active];
  const checkpoints = [
    { label: "Client", detail: project.name === "EduManage" ? "School user opens a role-based workflow" : "Campus user opens a public feature", icon: Network },
    { label: "Gateway", detail: "Request enters the documented API boundary", icon: Route },
    { label: "Auth", detail: "Session, role, and scope are checked", icon: KeyRound },
    { label: "Modules", detail: project.modules.slice(0, 4).join(" / "), icon: Server },
    { label: "Records", detail: "Queries stay inside the right user, school, event, or content boundary", icon: Database },
    { label: "Proof", detail: "Response, logs, docs, and tests make the flow reviewable", icon: ShieldCheck },
  ];

  return (
    <section className="border-y border-white/10 bg-ink/72">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionTitle eyebrow="Animated architecture maps" title="A request moving through real project modules" />
          <div className="flex flex-wrap gap-2">
            {cases.map((item, index) => (
              <button key={item.slug} type="button" onClick={() => setActive(index)} className={`border px-4 py-3 text-sm font-bold transition ${active === index ? "border-cyan bg-cyan text-ink" : "border-white/12 text-white/65 hover:border-cyan hover:text-cyan"}`}>
                {item.name}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 grid min-w-0 gap-6 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)]">
          <article className="min-w-0 border border-white/10 bg-panel/75 p-5">
            <p className="font-mono text-xs uppercase text-cyan">{project.code} module flow</p>
            <h3 className="mt-3 text-3xl font-black text-white">{project.name}</h3>
            <p className="mt-4 text-sm leading-7 text-white/62">{project.architecture[0]}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.modules.map((module) => <span key={module} className="border border-mint/20 bg-mint/10 px-2.5 py-1.5 font-mono text-xs text-mint">{module}</span>)}
            </div>
          </article>
          <div className="min-w-0 border border-white/10 bg-panel/75 p-4 sm:p-5">
            <div className="relative hidden min-h-[280px] overflow-hidden md:block">
              <div className="absolute left-8 right-8 top-[5.25rem] h-px bg-mint/25" />
              <span className="architecture-packet absolute top-[4.65rem] z-20 inline-flex h-7 w-14 items-center justify-center border border-mint bg-ink font-mono text-[10px] font-bold text-mint shadow-terminal">REQ</span>
              <div className="grid grid-cols-6 gap-3">
                {checkpoints.map((step) => { const Icon = step.icon; return (
                  <article key={step.label} className="relative min-h-[230px] border border-white/10 bg-black/30 p-4 text-center">
                    <span className="mx-auto flex size-12 items-center justify-center border border-cyan/25 bg-cyan/10 text-cyan"><Icon size={20} /></span>
                    <h4 className="mt-10 text-base font-black text-white">{step.label}</h4>
                    <p className="mt-3 text-xs leading-6 text-white/58">{step.detail}</p>
                  </article>
                ); })}
              </div>
            </div>
            <div className="grid gap-3 md:hidden">
              {checkpoints.map((step) => { const Icon = step.icon; return (
                <article key={step.label} className="grid grid-cols-[2.75rem_1fr] gap-3 border border-white/10 bg-black/30 p-4">
                  <span className="flex size-11 items-center justify-center border border-cyan/25 bg-cyan/10 text-cyan"><Icon size={18} /></span>
                  <span className="min-w-0"><span className="block font-bold text-white">{step.label}</span><span className="mt-1 block break-words text-xs leading-5 text-white/58">{step.detail}</span></span>
                </article>
              ); })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PreviewReel() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <SectionTitle eyebrow="Live previews" title="Screens that show the work instead of only describing it" />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {mediaAssets.slice(0, 3).map((asset) => (
          <article key={asset.src} className="overflow-hidden border border-white/10 bg-panel/70 p-3">
            <Image src={asset.src} alt={asset.title} width={1536} height={864} className="aspect-video w-full object-cover object-top" />
            <div className="p-3">
              <p className="font-mono text-xs uppercase text-cyan">{asset.project}</p>
              <h3 className="mt-2 text-lg font-black text-white">{asset.title}</h3>
              <p className="mt-2 text-xs leading-5 text-white/52">{asset.type}</p>
              {"liveUrl" in asset && <a href={asset.liveUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-mint hover:text-white">Open live<Maximize2 size={15} /></a>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


export function ScrollDrivenSystemLayers() {
  const layers = [
    { label: "Interface", detail: "Screens, forms, dashboards, and saved previews show what users actually touch.", icon: Network },
    { label: "API boundary", detail: "Routes, request shapes, documentation, and validation make the backend understandable.", icon: Route },
    { label: "Identity", detail: "Authentication, roles, permissions, and tenant scope keep workflows separated.", icon: KeyRound },
    { label: "Data layer", detail: "Schemas, relationships, reports, and filtered queries keep records useful and controlled.", icon: Database },
    { label: "Security review", detail: "Threat models, access-control notes, and hardening actions turn risk into practical fixes.", icon: ShieldCheck },
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,0.38fr)] lg:items-end">
        <div>
          <SectionTitle eyebrow="System layers" title="The layers behind the work" />
          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/62">A useful system is not one screen or one API. It is the path from interface decisions to security review, with each layer making the next one safer and clearer.</p>
        </div>
        <div className="border border-mint/20 bg-mint/10 p-5">
          <p className="font-mono text-xs uppercase text-mint">Delivery pattern</p>
          <p className="mt-3 text-xl font-black leading-tight text-white md:text-2xl">Interface &rarr; API &rarr; identity &rarr; data &rarr; review</p>
          <p className="mt-3 text-sm leading-7 text-white/60">The checklist I use when building, debugging, or reviewing backend-heavy products.</p>
        </div>
      </div>
      <div className="relative mt-12">
        <div className="absolute left-0 right-0 top-16 hidden h-px bg-gradient-to-r from-mint/10 via-cyan/45 to-mint/10 lg:block" />
        <div className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {layers.map((layer, index) => { const Icon = layer.icon; return (
            <article key={layer.label} className="layer-reveal relative flex min-h-[18rem] min-w-0 flex-col border border-white/10 bg-panel/76 p-5 shadow-terminal">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint/55 to-transparent" />
              <div className="flex items-start justify-between gap-4">
                <span className="relative z-10 flex size-12 shrink-0 items-center justify-center border border-mint/25 bg-ink text-mint"><Icon size={19} /></span>
                <span className="font-mono text-xs uppercase text-cyan">Layer {String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-6 text-2xl font-black text-white">{layer.label}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-white/62">{layer.detail}</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-white/12" />
                <span className="font-mono text-[10px] uppercase text-white/45">{index === layers.length - 1 ? "review" : "next"}</span>
              </div>
            </article>
          ); })}
        </div>
      </div>
    </section>
  );
}

export function SecurityReviewSampleReport() {
  const findings = [
    { risk: "Tenant or role leakage", severity: "High", evidence: "Routes that read shared records must include tenant and permission checks.", fix: "Enforce scoped queries, role guards, and regression tests." },
    { risk: "Weak session lifecycle", severity: "Medium", evidence: "Long-lived tokens or missing refresh control make account abuse harder to contain.", fix: "Use short sessions, refresh rotation, and logout invalidation." },
    { risk: "Unclear public API boundaries", severity: "Medium", evidence: "Public endpoints need rate limits, CORS policy, validation, and traceable errors.", fix: "Document API behavior and apply request controls at the boundary." },
  ];
  return (
    <section className="border-y border-white/10 bg-ink/72">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.42fr_0.58fr] lg:px-8">
        <div><SectionTitle eyebrow="Security review sample" title="How I explain risks, controls, and fixes" /><p className="mt-5 text-sm leading-7 text-white/62">A review should show what can go wrong, why it matters, and what action makes the system safer.</p></div>
        <div className="border border-white/10 bg-panel/75 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4"><p className="font-mono text-xs uppercase text-mint">sample report</p><span className="border border-cyan/30 px-3 py-1 font-mono text-xs text-cyan">authorized systems only</span></div>
          <div className="mt-5 space-y-4">{findings.map((item) => <article key={item.risk} className="grid gap-4 border border-white/10 bg-black/25 p-4 md:grid-cols-[0.26fr_0.74fr]"><div><p className="font-mono text-xs uppercase text-amber">{item.severity}</p><h3 className="mt-2 font-black text-white">{item.risk}</h3></div><div className="text-sm leading-7 text-white/62"><p><span className="font-bold text-white">Evidence:</span> {item.evidence}</p><p className="mt-2"><span className="font-bold text-mint">Control:</span> {item.fix}</p></div></article>)}</div>
        </div>
      </div>
    </section>
  );
}

export function CredibilityStory() {
  const groups = [
    { title: "Competition and security practice", icon: ShieldAlert, items: achievements.filter((item) => item.includes("Cyber") || item.includes("CITSA")) },
    { title: "Leadership and teaching", icon: UserCheck, items: achievements.filter((item) => item.includes("Lead") || item.includes("CAS") || item.includes("Co-Founder")) },
    { title: "Certificates and recognition", icon: BadgeCheck, items: certificates.map((item) => `${item.title} - ${item.issuer}`) },
  ];
  return (
    <section className="border-y border-white/10 bg-white/[0.025]">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionTitle eyebrow="Credibility story" title="Recognition organized by what it proves" />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {groups.map((group) => { const Icon = group.icon; return <article key={group.title} className="border border-white/10 bg-panel/70 p-5"><Icon className="text-mint" size={22} /><h3 className="mt-4 text-2xl font-black text-white">{group.title}</h3><div className="mt-5 space-y-3">{group.items.map((item) => <p key={item} className="border border-white/10 bg-black/25 p-3 text-sm leading-6 text-white/64">{item}</p>)}</div></article>; })}
        </div>
      </div>
    </section>
  );
}

export function MobilePerformancePass() {
  const checks = [
    { label: "Responsive surfaces", detail: "Tables and API panels use scroll or wrapping instead of pushing outside mobile screens." },
    { label: "Stable media", detail: "Images use fixed aspect ratios and object positioning so sections do not jump while loading." },
    { label: "Light interactions", detail: "Interactive pieces stay local and avoid heavy runtime services on public pages." },
    { label: "Clear fallback", detail: "External live previews are supported by saved screenshots so proof remains visible." },
  ];
  return <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><SectionTitle eyebrow="Mobile and speed pass" title="The cockpit should stay usable on small screens" /><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{checks.map((item) => <article key={item.label} className="border border-white/10 bg-panel/70 p-5"><Gauge className="text-cyan" size={19} /><h3 className="mt-4 text-lg font-black text-white">{item.label}</h3><p className="mt-3 text-sm leading-6 text-white/58">{item.detail}</p></article>)}</div></section>;
}

const serviceRecommendations = {
  website: { label: "Professional website", package: "Launch Presence", detail: "A clear public site, responsive design, contact flow, deployment, and handover notes.", href: "/waskizone/services/full-stack-web-applications" },
  api: { label: "Backend API", package: "API Foundation", detail: "Authentication, roles, database schema, documented REST endpoints, and deployment notes.", href: "/waskizone/services/backend-api-engineering" },
  dashboard: { label: "Dashboard or internal tool", package: "Secure Product Build", detail: "Role-aware screens, forms, reporting, backend workflows, and operational handover.", href: "/waskizone/services/dashboards-and-internal-tools" },
  security: { label: "Security review", package: "Security Review", detail: "Authorized API/web review, access-control notes, risk summary, and hardening actions.", href: "/waskizone/services/cybersecurity-support" },
} as const;

export function WaskiServiceConfigurator() {
  const [choice, setChoice] = useState<keyof typeof serviceRecommendations>("api");
  const selected = serviceRecommendations[choice];
  return (
    <section id="configure" className="border-y border-white/10 bg-white/[0.025]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.42fr_0.58fr] lg:px-8">
        <div><SectionTitle eyebrow="Service configurator" title="Choose the work type and get a practical starting point" /><p className="mt-5 text-sm leading-7 text-white/62">This helps a client quickly understand the right first conversation.</p></div>
        <div className="border border-white/10 bg-panel/75 p-5">
          <div className="grid gap-2 sm:grid-cols-2">{Object.entries(serviceRecommendations).map(([key, item]) => <button key={key} type="button" onClick={() => setChoice(key as keyof typeof serviceRecommendations)} className={`border p-4 text-left transition ${choice === key ? "border-mint bg-mint text-ink" : "border-white/10 bg-black/25 text-white/70 hover:border-mint hover:text-mint"}`}><span className="block font-bold">{item.label}</span><span className="mt-2 block text-xs opacity-70">{item.package}</span></button>)}</div>
          <article className="mt-5 border border-mint/25 bg-mint/10 p-5"><p className="font-mono text-xs uppercase text-mint">Recommended package</p><h3 className="mt-3 text-3xl font-black text-white">{selected.package}</h3><p className="mt-4 text-sm leading-7 text-white/70">{selected.detail}</p><div className="mt-5 flex flex-wrap gap-3"><Link href={`${selected.href}?from=configure`} className="inline-flex items-center gap-2 border border-mint/35 px-4 py-3 font-bold text-mint hover:bg-mint hover:text-ink">Read service<ArrowUpRight size={16} /></Link><a href={`mailto:juliusmcbrahamsomuah@gmail.com?subject=WaskiZone%20${encodeURIComponent(selected.package)}%20inquiry`} className="inline-flex items-center gap-2 bg-mint px-4 py-3 font-bold text-ink hover:bg-white">Request scope<Send size={16} /></a></div></article>
        </div>
      </div>
    </section>
  );
}

export function WaskiCaseStudyProof() {
  return <section id="case-study-proof" className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><SectionTitle eyebrow="Case-study proof" title="Portfolio work connected to WaskiZone services" /><div className="mt-10 grid gap-5 md:grid-cols-2">{cases.map((project) => <article key={project.slug} className="border border-white/10 bg-panel/70 p-5"><p className="font-mono text-xs uppercase text-cyan">{project.name}</p><h3 className="mt-3 text-2xl font-black text-white">{project.role}</h3><p className="mt-4 text-sm leading-7 text-white/62">{project.brief}</p><div className="mt-5 flex flex-wrap gap-2">{project.stack.slice(0, 5).map((item) => <span key={item} className="bg-white/[0.055] px-2 py-1 text-xs text-white/58">{item}</span>)}</div><Link href={`/case-files/${project.slug}?from=waskizone`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-mint hover:text-white">View case file<ArrowUpRight size={15} /></Link></article>)}</div></section>;
}

export function WaskiTrustSection() {
  const doItems = ["Build websites, dashboards, APIs, and internal tools", "Review owned systems with clear written authorization", "Explain risks in plain language and recommend practical controls", "Train teams on web, backend, Git, and defensive security basics"];
  const dontItems = ["No unauthorized testing", "No credential theft or social engineering", "No destructive security work", "No vague promises without scope, ownership, and permission"];
  return <section className="border-y border-white/10 bg-ink/72"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8"><div><SectionTitle eyebrow="Trust boundaries" title="What WaskiZone does and does not do" /><p className="mt-5 text-sm leading-7 text-white/62">Cybersecurity work stays professional when scope, permission, and reporting are clear before anything begins.</p></div><div className="grid gap-5 md:grid-cols-2"><article className="border border-mint/25 bg-mint/10 p-5"><h3 className="text-2xl font-black text-white">What I do</h3><div className="mt-5 space-y-3">{doItems.map((item) => <p key={item} className="flex gap-3 text-sm leading-6 text-white/70"><CheckCircle2 className="mt-0.5 shrink-0 text-mint" size={16} />{item}</p>)}</div></article><article className="border border-red-300/25 bg-red-500/10 p-5"><h3 className="text-2xl font-black text-white">What I do not do</h3><div className="mt-5 space-y-3">{dontItems.map((item) => <p key={item} className="flex gap-3 text-sm leading-6 text-white/70"><ShieldAlert className="mt-0.5 shrink-0 text-red-300" size={16} />{item}</p>)}</div></article></div></div></section>;
}

export function WaskiProposalFlow() {
  const [type, setType] = useState("Backend API");
  const [timeline, setTimeline] = useState("2-4 weeks");
  const [budget, setBudget] = useState("Need guidance");
  const subject = `WaskiZone ${type} project inquiry`;
  const body = `Project type: ${type}\nTimeline: ${timeline}\nBudget: ${budget}\n\nProject summary:`;
  return <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr]"><div><SectionTitle eyebrow="Proposal-style contact" title="Send a useful first message" /><p className="mt-5 text-sm leading-7 text-white/62">A better inquiry gives enough context to recommend the right build, review, or training path.</p><div className="mt-6 space-y-2">{waskiProposalPreview.map((item) => <p key={item} className="flex gap-3 text-sm text-white/62"><FileText className="mt-0.5 shrink-0 text-mint" size={16} />{item}</p>)}</div></div><div className="border border-white/10 bg-panel/75 p-5"><div className="grid gap-4 md:grid-cols-3"><Selector label="Type" value={type} setValue={setType} options={["Website", "Backend API", "Dashboard", "Security review", "Training"]} /><Selector label="Timeline" value={timeline} setValue={setTimeline} options={["Urgent", "2-4 weeks", "1-2 months", "Flexible"]} /><Selector label="Budget" value={budget} setValue={setBudget} options={["Need guidance", "Starter", "Core", "Custom"]} /></div><a href={`mailto:juliusmcbrahamsomuah@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`} className="mt-5 inline-flex items-center gap-2 bg-mint px-5 py-3 font-bold text-ink hover:bg-white">Open email draft<Send size={17} /></a></div></div></section>;
}

export function WaskiHowWeWork() {
  return <section className="border-y border-white/10 bg-white/[0.025]"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><SectionTitle eyebrow="How we work" title="Scope, build, review, launch, support" /><div className="mt-10 grid gap-4 md:grid-cols-5">{waskiProcess.map((step, index) => <article key={step} className="border border-white/10 bg-panel/70 p-4"><span className="flex size-9 items-center justify-center border border-cyan/30 bg-cyan/10 font-mono text-xs text-cyan">{index + 1}</span><p className="mt-4 text-sm leading-7 text-white/66">{step}</p></article>)}</div></div></section>;
}

function Selector({ label, value, setValue, options }: { label: string; value: string; setValue: (value: string) => void; options: string[] }) {
  return <label className="block"><span className="font-mono text-xs uppercase text-mint">{label}</span><select value={value} onChange={(event) => setValue(event.target.value)} className="mt-2 w-full border border-white/10 bg-black/35 px-3 py-3 text-sm text-white outline-none focus:border-mint">{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}
