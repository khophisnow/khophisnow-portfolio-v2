"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { BarChart3, CheckCircle2, Database, KeyRound, Maximize2, Send, ShieldCheck, UserCheck, UserRound, Workflow, X } from "lucide-react";
import { cases, certificates, mediaAssets } from "@/lib/portfolio-data";

export function trackEvent(name: string, payload?: Record<string, string>) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("khophisnow:analytics", { detail: { name, payload, at: new Date().toISOString() } }));
  if (process.env.NODE_ENV === "development") console.info("analytics", name, payload);
}

export function ScreenshotLightbox() {
  const [active, setActive] = useState<(typeof mediaAssets)[number] | null>(null);
  const [view, setView] = useState<"live" | "image">("live");
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <SectionTitle eyebrow="Project evidence" title="Open live previews, saved screens, API docs, and recognition proof" />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {mediaAssets.slice(0, 3).map((asset) => (
          <button key={asset.src} type="button" onClick={() => { setActive(asset); setView("liveUrl" in asset ? "live" : "image"); trackEvent("evidence_opened", { title: asset.title }); }} className="group overflow-hidden border border-white/10 bg-panel/70 p-3 text-left hover:border-mint">
            <Image src={asset.src} alt={asset.title} width={1536} height={864} className="aspect-video w-full object-cover transition group-hover:scale-[1.02]" />
            <span className="mt-3 flex items-center justify-between gap-3 text-sm"><span className="font-bold text-white">{asset.title}</span><span className="inline-flex items-center gap-2 font-mono text-xs text-mint"><Maximize2 size={14} />inspect</span></span>
          </button>
        ))}
      </div>
      {active && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-black/88 p-3 backdrop-blur" onClick={() => setActive(null)}>
          <div className="flex h-[94vh] w-full max-w-7xl flex-col border border-white/10 bg-ink shadow-terminal" onClick={(event) => event.stopPropagation()}>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-3">
              <div><p className="font-bold text-white">{active.title}</p><p className="mt-1 font-mono text-xs text-mint">{active.type}</p></div>
              <div className="flex items-center gap-2">
                {"liveUrl" in active && <button type="button" onClick={() => setView("live")} className={`border px-3 py-2 text-xs font-bold ${view === "live" ? "border-mint bg-mint text-ink" : "border-white/12 text-white/65 hover:border-mint"}`}>Live preview</button>}
                <button type="button" onClick={() => setView("image")} className={`border px-3 py-2 text-xs font-bold ${view === "image" ? "border-mint bg-mint text-ink" : "border-white/12 text-white/65 hover:border-mint"}`}>Saved screen</button>
                <button type="button" onClick={() => setActive(null)} className="flex size-10 items-center justify-center border border-white/15 text-white hover:border-mint hover:text-mint"><X size={18} /></button>
              </div>
            </div>
            <div className="min-h-0 flex-1 bg-black/40 p-3">
              {view === "live" && "liveUrl" in active ? <iframe src={active.liveUrl} title={active.title} className="h-full w-full border border-white/10 bg-white" /> : <div className="flex h-full items-center justify-center"><Image src={active.src} alt={active.title} width={1536} height={864} className="max-h-full w-auto max-w-full object-contain" /></div>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function ProjectComparisonMatrix() {
  const rows = ["role", "status", "impact", "stack"] as const;
  return <section className="border-y border-white/10 bg-white/[0.025]"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><SectionTitle eyebrow="Project comparison matrix" title="A quick technical read across major systems" /><div className="mt-10 overflow-x-auto border border-white/10"><table className="w-full min-w-[760px] border-collapse text-left text-sm"><thead><tr className="bg-panel/80"><th className="border border-white/10 p-4 text-mint">Signal</th>{cases.map((project) => <th key={project.name} className="border border-white/10 p-4 text-white">{project.name}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row}>{<td className="border border-white/10 p-4 font-mono text-xs uppercase text-cyan">{row}</td>}{cases.map((project) => <td key={`${project.name}-${row}`} className="border border-white/10 p-4 text-white/68">{row === "impact" ? project.impact.join(" / ") : row === "stack" ? project.stack.join(", ") : project[row]}</td>)}</tr>)}</tbody></table></div></div></section>;
}

export function AnimatedApiFlow() {
  const steps = useMemo(() => [
    { label: "Visitor", visual: "Request starts", icon: UserRound, checks: ["screen action", "form submit"], detail: "A visitor clicks a button, opens a page, submits a form, or asks the app for information." },
    { label: "Identity", visual: "Session checked", icon: ShieldCheck, checks: ["signed in", "token valid"], detail: "The system checks whether the visitor is known, whether the session is still valid, and whether the request should continue." },
    { label: "Permission", visual: "Role matched", icon: KeyRound, checks: ["role", "scope"], detail: "The request is compared with the visitor's role so a student, admin, or regular user only reaches what they are allowed to use." },
    { label: "Feature", visual: "Rules applied", icon: Workflow, checks: ["validation", "workflow"], detail: "The right feature handles the request, validates the input, applies system rules, and prepares the operation." },
    { label: "Records", visual: "Right data only", icon: Database, checks: ["school", "user"], detail: "The database query stays inside the correct school, user, event, or project boundary before anything is read or changed." },
    { label: "Reply", visual: "Safe result", icon: CheckCircle2, checks: ["clean output", "traceable"], detail: "The visitor receives a clean response, while errors and activity remain traceable for debugging and security review." },
  ], []);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % steps.length), 1350);
    return () => window.clearInterval(timer);
  }, [steps.length]);
  const packetLeft = steps.length > 1 ? `${(active / (steps.length - 1)) * 100}%` : "0%";
  return <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><SectionTitle eyebrow="Request path" title="Watch a request pass each security checkpoint" /><div className="mt-10 border border-white/10 bg-panel/70 p-5"><div className="relative hidden py-8 md:block"><div className="absolute left-8 right-8 top-1/2 h-1 -translate-y-1/2 bg-white/10" /><div className="absolute left-8 right-8 top-1/2 -translate-y-1/2"><span style={{ left: packetLeft }} className="flow-packet absolute top-1/2 z-20 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-mint bg-ink text-mint shadow-terminal transition-all duration-700"><Send size={18} /></span></div><div className="relative grid grid-cols-6 gap-4">{steps.map((step, index) => { const Icon = step.icon; return <article key={step.label} className={`min-h-[150px] border p-4 text-center transition ${active === index ? "flow-card-active" : "border-white/10 bg-black/35"}`}><div className={`mx-auto flex size-12 items-center justify-center border transition ${active === index ? "flow-node-active border-transparent" : "border-white/15 bg-white/[0.035] text-white/55"}`}><Icon size={21} /></div><p className="mt-4 text-sm font-black text-white">{step.label}</p><p className="mt-2 text-xs text-mint">{step.visual}</p></article>; })}</div></div><div className="grid gap-3 md:hidden">{steps.map((step, index) => { const Icon = step.icon; return <article key={step.label} className={`flex items-center gap-3 border p-4 text-left ${active === index ? "flow-card-active" : "border-white/10 bg-black/35"}`}><span className={`flex size-11 shrink-0 items-center justify-center border ${active === index ? "flow-node-active" : "border-white/15 text-white/55"}`}><Icon size={19} /></span><span><span className="block font-bold text-white">{step.label}</span><span className="mt-1 block text-xs text-white/55">{step.visual}</span></span></article>; })}</div><div className="mt-5 border border-white/10 bg-black/30 p-5"><p className="font-bold text-white">{steps[active].label}: <span className="text-mint">{steps[active].visual}</span></p><p className="mt-3 max-w-3xl text-sm leading-7 text-white/68">{steps[active].detail}</p><div className="mt-4 flex flex-wrap gap-2">{steps[active].checks.map((check) => <span key={check} className="border border-mint/35 bg-mint/10 px-3 py-1 text-xs text-white/75">{check}</span>)}</div></div></div></section>;
}

export function RecruiterModeToggle() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.recruiter = enabled ? "true" : "false";
  }, [enabled]);
  return <button type="button" aria-label={`Quick scan ${enabled ? "on" : "off"}`} title={`Quick scan ${enabled ? "on" : "off"}`} onClick={() => { setEnabled((value) => !value); trackEvent("recruiter_mode", { enabled: String(!enabled) }); }} className={`fixed bottom-[4.875rem] right-5 z-40 hidden size-12 items-center justify-center border bg-ink/90 shadow-terminal backdrop-blur transition md:flex ${enabled ? "border-amber text-amber" : "border-white/12 text-white/60 hover:border-amber hover:text-amber"}`}><UserCheck size={18} /></button>;
}

export function CertificateActivitySection({ activity }: { activity: React.ReactNode }) {
  const [active, setActive] = useState<(typeof certificates)[number] | null>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="certificates" className="border-y border-white/10 bg-white/[0.025]">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionTitle eyebrow="Certificate gallery" title="Recognition and training proof" />
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/62">
              Selected evidence of leadership, training, and hands-on technical growth.
            </p>
            <Link href="/cert" className="mt-6 inline-flex items-center gap-2 border border-mint/30 px-4 py-3 font-bold text-mint hover:bg-mint hover:text-ink">
              View certificate page<Maximize2 size={16} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {certificates.map((cert) => (
              <button key={cert.id} type="button" onClick={() => setActive(cert)} className="group flex flex-col border border-white/10 bg-panel/72 p-3 text-left transition hover:border-mint">
                <Image src={cert.image} alt={cert.title} width={1600} height={1131} className="aspect-video w-full object-cover object-top transition group-hover:scale-[1.02]" />
                <span className="mt-4 font-bold text-white">{cert.title}</span>
                <span className="mt-2 text-xs uppercase tracking-normal text-mint">{cert.issuer}</span>
                <span className="mt-3 line-clamp-3 text-xs leading-5 text-white/52">{cert.detail}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 border border-white/10 bg-panel/70 p-4">
          <div className="grid gap-6 lg:grid-cols-[0.35fr_0.65fr]">
            <div>
              <p className="font-mono text-sm uppercase text-mint">Public activity</p>
              <h3 className="mt-3 text-2xl font-black text-white md:text-3xl">GitHub pulse and harmless challenge</h3>
            </div>
            <div className="grid gap-5 md:grid-cols-2">{activity}</div>
          </div>
        </div>
      </div>
      {active && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/88 p-3 backdrop-blur" onClick={() => setActive(null)}>
          <div className="w-full max-w-5xl border border-white/10 bg-ink p-3 shadow-terminal" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div>
                <p className="font-bold text-white">{active.title}</p>
                <p className="mt-1 text-sm text-white/55">{active.issuer}</p>
              </div>
              <button type="button" onClick={() => setActive(null)} className="flex size-10 items-center justify-center border border-white/15 text-white hover:border-mint hover:text-mint"><X size={18} /></button>
            </div>
            <Image src={active.image} alt={active.title} width={1600} height={1131} className="mt-3 max-h-[70vh] w-full object-contain object-top" />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3">
              <p className="max-w-2xl text-sm leading-6 text-white/62">{active.detail}</p>
              <Link href={`/cert#${active.id}`} className="inline-flex items-center gap-2 border border-mint/30 px-4 py-3 text-sm font-bold text-mint hover:bg-mint hover:text-ink">Read more<Maximize2 size={15} /></Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function ContactForm() {
  const [intent, setIntent] = useState("Backend/API opportunity");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "fallback" | "error">("idle");
  const [message, setMessage] = useState("");
  const statusClass = status === "sent" ? "text-mint" : status === "error" ? "text-amber" : "text-white/50";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      intent,
      message: String(formData.get("message") || ""),
    };

    setStatus("sending");
    setMessage("");
    trackEvent("contact_form_submit", { intent });

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => null);

    const result = response ? await response.json().catch(() => ({})) : {};

    if (response?.ok && result.ok) {
      setStatus("sent");
      setMessage("Message sent. I will reply from my email.");
      form.reset();
      return;
    }

    if (result.fallback) {
      setStatus("fallback");
      setMessage("Opening email so the message can still reach me.");
      window.location.href = result.fallback;
      return;
    }

    setStatus("error");
    setMessage(result.error || "Message could not be sent right now.");
  }

  return (
    <form onSubmit={submit} className="border border-white/10 bg-panel/70 p-5">
      <p className="font-mono text-xs uppercase text-mint">Contact form</p>
      <div className="mt-4 grid gap-3">
        <select value={intent} onChange={(event) => setIntent(event.target.value)} className="border border-white/10 bg-black/35 px-3 py-3 text-sm text-white outline-none focus:border-mint">
          <option>Backend/API opportunity</option>
          <option>Secure system review</option>
          <option>Project collaboration</option>
          <option>Mentorship or training</option>
        </select>
        <input name="name" required placeholder="Name" className="border border-white/10 bg-black/35 px-3 py-3 text-sm text-white outline-none focus:border-mint" />
        <input name="email" required type="email" placeholder="Email" className="border border-white/10 bg-black/35 px-3 py-3 text-sm text-white outline-none focus:border-mint" />
        <textarea name="message" required placeholder="What should we build or secure?" rows={5} className="border border-white/10 bg-black/35 px-3 py-3 text-sm text-white outline-none focus:border-mint" />
        <button disabled={status === "sending"} className="inline-flex items-center justify-center gap-2 bg-mint px-4 py-3 font-bold text-ink hover:bg-white disabled:cursor-wait disabled:opacity-60"><Send size={17} />{status === "sending" ? "Sending..." : "Send message"}</button>
      </div>
      {message && <p className={`mt-3 text-xs ${statusClass}`}>{message}</p>}
    </form>
  );
}

export function DashboardPreviewLink() { return <a href="/dashboard" className="inline-flex items-center gap-2 border border-cyan/30 px-4 py-3 font-bold text-cyan hover:bg-cyan hover:text-ink"><BarChart3 size={17} />Open control room</a>; }

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) { return <div><p className="font-mono text-sm uppercase text-mint">{eyebrow}</p><h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">{title}</h2></div>; }
