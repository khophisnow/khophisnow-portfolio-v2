import { BadgeCheck, Mail, Send } from "lucide-react";
import { SourceBackLink } from "@/components/SourceBackLink";
import { waskiPackages, waskiProposalPreview } from "@/lib/portfolio-data";
import { WaskiQuoteEstimator } from "@/components/WaskiZoneBusiness";

export const metadata = {
  title: "Project Intake | WaskiZone",
  description: "Send a cleaner project inquiry to WaskiZone for software development or authorized cybersecurity support.",
};

export default function WaskiZoneContactPage() {
  const intents = ["Website", "Backend API", "Dashboard", "Full product build", "Security review", "Training", "Maintenance"];
  return (
    <main className="scanline min-h-screen bg-ink text-white">
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <SourceBackLink fallback={{ href: "/waskizone", label: "Back to WaskiZone" }} sources={{ quote: { href: "/waskizone#quote", label: "Back to estimator" } }} />
        <div className="mt-12 grid gap-10 lg:grid-cols-[0.42fr_0.58fr]">
          <div>
            <p className="font-mono text-sm uppercase text-mint">Proposal intake</p>
            <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">Send a project message that can be scoped properly.</h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/62">Choose the closest intent, include the current state, timeline, budget range if known, and whether security review is part of the request.</p>
            <div className="mt-8 grid gap-2">{waskiProposalPreview.map((item) => <p key={item} className="flex gap-3 text-sm leading-6 text-white/62"><BadgeCheck className="mt-0.5 shrink-0 text-mint" size={16} />{item}</p>)}</div>
          </div>
          <div className="border border-white/10 bg-panel/70 p-5">
            <div className="flex items-center gap-3 text-mint"><Mail size={18} /><p className="font-mono text-xs uppercase">Start with intent</p></div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {intents.map((intent) => <a key={intent} href={`mailto:juliusmcbrahamsomuah@gmail.com?subject=${encodeURIComponent(`WaskiZone ${intent} inquiry`)}&body=${encodeURIComponent(`Project type: ${intent}\nTimeline:\nBudget range:\nCurrent state:\nSecurity needs:\n\nProject summary:`)}`} className="border border-white/10 bg-black/25 p-4 text-sm font-bold text-white/70 hover:border-mint hover:text-mint">{intent}<Send className="ml-2 inline" size={14} /></a>)}
            </div>
            <div className="mt-8 border-t border-white/10 pt-5"><p className="font-mono text-xs uppercase text-cyan">Package reference</p><div className="mt-4 grid gap-3">{waskiPackages.map((pkg) => <div key={pkg.name} className="border border-white/10 bg-black/25 p-3"><p className="font-bold text-white">{pkg.name}</p><p className="mt-1 text-xs leading-5 text-white/52">{pkg.detail}</p></div>)}</div></div>
          </div>
        </div>
      </section>
      <WaskiQuoteEstimator />
    </main>
  );
}
