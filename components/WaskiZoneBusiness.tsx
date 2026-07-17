"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Calculator, LockKeyhole, Send, Star } from "lucide-react";
import { waskiPackages, waskiSecurityPolicy, waskiTestimonials } from "@/lib/portfolio-data";

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div><p className="font-mono text-sm uppercase text-mint">{eyebrow}</p><h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">{title}</h2></div>;
}

export function WaskiPackageComparison() {
  const rows = ["Public pages", "Backend/API", "Admin dashboard", "Security review", "Docs/handover", "Best fit"];
  const values: Record<string, string[]> = {
    "Launch Presence": ["Included", "Optional", "No", "Basic checklist", "Included", "Web presence"],
    "API Foundation": ["Optional", "Included", "Optional", "Access control", "Included", "Data products"],
    "Secure Product Build": ["Included", "Included", "Included", "Build review", "Included", "Full systems"],
    "Security Review": ["Review only", "Review only", "Review only", "Included", "Report", "Owned systems"],
  };
  return (
    <section id="packages" className="border-y border-white/10 bg-white/[0.025]">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionTitle eyebrow="Package comparison" title="Pick the right starting point before we scope deeper" />
          <a href="https://waskizone.vercel.app/contact" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-mint px-4 py-3 font-bold text-ink hover:bg-white">Request proposal<ArrowUpRight size={16} /></a>
        </div>
        <div className="mt-10 overflow-x-auto border border-white/10 bg-panel/70">
          <table className="min-w-[860px] w-full border-collapse text-left text-sm">
            <thead><tr>{["Scope", ...waskiPackages.map((pkg) => pkg.name)].map((head) => <th key={head} className="border-b border-white/10 p-4 font-mono text-xs uppercase text-mint">{head}</th>)}</tr></thead>
            <tbody>
              {rows.map((row) => <tr key={row} className="border-b border-white/8 last:border-b-0"><th className="p-4 font-bold text-white">{row}</th>{waskiPackages.map((pkg) => <td key={pkg.name} className="p-4 text-white/62">{values[pkg.name]?.[rows.indexOf(row)]}</td>)}</tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function WaskiQuoteEstimator() {
  const [type, setType] = useState("Backend API");
  const [timeline, setTimeline] = useState("2-4 weeks");
  const [budget, setBudget] = useState("Need guidance");
  const [security, setSecurity] = useState("Security-aware build checklist");
  const recommendation = useMemo(() => {
    if (type.includes("Security")) return "Security Review";
    if (type.includes("Dashboard") || type.includes("Full")) return "Secure Product Build";
    if (type.includes("Website")) return "Launch Presence";
    return "API Foundation";
  }, [type]);
  const body = `Project type: ${type}\nRecommended package: ${recommendation}\nTimeline: ${timeline}\nBudget: ${budget}\nSecurity need: ${security}\n\nProject summary:`;
  return (
    <section id="quote" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr]">
        <div><SectionTitle eyebrow="Quote estimator" title="Build a useful first message before asking for pricing" /><p className="mt-5 text-sm leading-7 text-white/62">This does not calculate a public price. It creates a clean inquiry summary so the scope conversation starts professionally.</p></div>
        <div className="border border-white/10 bg-panel/75 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Selector label="Project type" value={type} setValue={setType} options={["Website", "Backend API", "Dashboard", "Full product build", "Security review", "Training"]} />
            <Selector label="Timeline" value={timeline} setValue={setTimeline} options={["Urgent", "2-4 weeks", "1-2 months", "Flexible"]} />
            <Selector label="Budget" value={budget} setValue={setBudget} options={["Need guidance", "Starter", "Core", "Custom"]} />
            <Selector label="Security need" value={security} setValue={setSecurity} options={["Security-aware build checklist", "Access-control review", "API hardening", "Defensive training"]} />
          </div>
          <article className="mt-5 border border-mint/25 bg-mint/10 p-5">
            <div className="flex items-center gap-3 text-mint"><Calculator size={18} /><p className="font-mono text-xs uppercase">Recommended starting point</p></div>
            <h3 className="mt-3 text-3xl font-black text-white">{recommendation}</h3>
            <p className="mt-3 whitespace-pre-wrap border border-white/10 bg-black/30 p-4 font-mono text-xs leading-6 text-white/62">{body}</p>
            <a href={`mailto:juliusmcbrahamsomuah@gmail.com?subject=${encodeURIComponent(`WaskiZone ${recommendation} inquiry`)}&body=${encodeURIComponent(body)}`} className="mt-5 inline-flex items-center gap-2 bg-mint px-4 py-3 font-bold text-ink hover:bg-white">Open email summary<Send size={16} /></a>
          </article>
        </div>
      </div>
    </section>
  );
}

export function WaskiProofPlaceholders() {
  return (
    <section className="border-y border-white/10 bg-ink/72">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionTitle eyebrow="Trust proof" title="Credibility now, client testimonials later" />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {waskiTestimonials.map((item) => <article key={item.label} className="border border-white/10 bg-panel/70 p-5"><Star className="text-mint" size={19} /><p className="mt-4 font-mono text-xs uppercase text-cyan">{item.source}</p><h3 className="mt-2 text-xl font-black text-white">{item.label}</h3><p className="mt-4 text-sm leading-7 text-white/62">{item.quote}</p></article>)}
        </div>
      </div>
    </section>
  );
}

export function AuthorizedSecurityPolicyBlock() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.38fr_0.62fr]">
        <div><SectionTitle eyebrow="Authorized security only" title="Professional boundaries for cybersecurity work" /><p className="mt-5 text-sm leading-7 text-white/62">Security work under WaskiZone/W4sk1Z0n3 is scoped, authorized, documented, and defensive.</p><a href="https://waskizone.vercel.app/policy/authorized-security" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 border border-mint/30 px-4 py-3 font-bold text-mint hover:bg-mint hover:text-ink">Read policy<ArrowUpRight size={16} /></a></div>
        <div className="grid gap-3 sm:grid-cols-2">{waskiSecurityPolicy.map((item) => <article key={item.title} className="border border-white/10 bg-panel/70 p-5"><LockKeyhole className="text-mint" size={18} /><h3 className="mt-4 text-xl font-black text-white">{item.title}</h3><p className="mt-3 text-sm leading-7 text-white/62">{item.detail}</p></article>)}</div>
      </div>
    </section>
  );
}

function Selector({ label, value, setValue, options }: { label: string; value: string; setValue: (value: string) => void; options: string[] }) {
  return <label className="block"><span className="font-mono text-xs uppercase text-mint">{label}</span><select value={value} onChange={(event) => setValue(event.target.value)} className="mt-2 w-full border border-white/10 bg-black/35 px-3 py-3 text-sm text-white outline-none focus:border-mint">{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}
