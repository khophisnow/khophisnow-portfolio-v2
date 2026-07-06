import Link from "next/link";
import { ArrowLeft, BadgeCheck, ShieldAlert } from "lucide-react";
import { securityNotes } from "@/lib/portfolio-data";

export const metadata = {
  title: "Security Notes | KhophiSnow",
  description: "Sample security findings, risk ratings, evidence style, and remediation notes from KhophiSnow.",
};

export default function SecurityNotesPage() {
  return (
    <main className="scanline min-h-screen bg-ink text-white">
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <Link href="/#lab" className="inline-flex items-center gap-2 text-sm font-bold text-mint hover:text-white"><ArrowLeft size={16} />Back to lab</Link>
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.38fr_0.62fr]">
          <div>
            <p className="font-mono text-sm uppercase text-mint">Security notes</p>
            <h1 className="mt-3 text-5xl font-black leading-tight md:text-7xl">Risk notes with practical remediation.</h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/62">A sample of how I explain findings: what can go wrong, where to look, why it matters, and what action reduces risk.</p>
          </div>
          <div className="grid gap-4">
            {securityNotes.map((note) => (
              <article key={note.title} className="border border-white/10 bg-panel/70 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3"><ShieldAlert className="text-amber" size={18} /><p className="font-mono text-xs uppercase text-amber">{note.rating} / {note.area}</p></div>
                  <span className="border border-mint/30 px-3 py-1 font-mono text-xs text-mint">sample finding</span>
                </div>
                <h2 className="mt-5 text-2xl font-black text-white">{note.title}</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <Info label="Risk" value={note.risk} />
                  <Info label="Evidence" value={note.evidence} />
                  <Info label="Remediation" value={note.remediation} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="border border-white/10 bg-black/25 p-4"><p className="flex items-center gap-2 font-mono text-xs uppercase text-mint"><BadgeCheck size={14} />{label}</p><p className="mt-3 text-sm leading-7 text-white/62">{value}</p></div>;
}
