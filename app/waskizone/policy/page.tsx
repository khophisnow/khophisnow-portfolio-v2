import { LockKeyhole, ShieldCheck } from "lucide-react";
import { SourceBackLink } from "@/components/SourceBackLink";
import { waskiSecurityPolicy } from "@/lib/portfolio-data";

export const metadata = {
  title: "Authorized Security Policy | WaskiZone",
  description: "The authorized security policy for WaskiZone and W4sk1Z0n3 cybersecurity support.",
  alternates: { canonical: "/waskizone/policy" },
  openGraph: { title: "Authorized Security Policy | WaskiZone", description: "Scope, permission, reporting, and safety boundaries for WaskiZone security work.", url: "/waskizone/policy" },
};

export default function WaskiZonePolicyPage() {
  return (
    <main className="scanline min-h-screen bg-ink text-white">
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <SourceBackLink fallback={{ href: "/waskizone", label: "Back to WaskiZone" }} sources={{ cybersecurity: { href: "/waskizone#cybersecurity", label: "Back to security services" } }} />
        <div className="mt-12 grid gap-10 lg:grid-cols-[0.4fr_0.6fr]">
          <div>
            <p className="font-mono text-sm uppercase text-mint">Authorized security only</p>
            <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">Clear scope before any security work.</h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/62">Cybersecurity support is professional only when permission, scope, reporting, and safety limits are agreed before work begins.</p>
          </div>
          <div className="grid gap-4">
            {waskiSecurityPolicy.map((item, index) => (
              <article key={item.title} className="grid gap-4 border border-white/10 bg-panel/70 p-5 sm:grid-cols-[3rem_1fr]">
                <span className="flex size-12 items-center justify-center border border-mint/30 bg-mint/10 text-mint"><LockKeyhole size={18} /></span>
                <div><p className="font-mono text-xs uppercase text-cyan">policy {String(index + 1).padStart(2, "0")}</p><h2 className="mt-2 text-2xl font-black text-white">{item.title}</h2><p className="mt-3 text-sm leading-7 text-white/62">{item.detail}</p></div>
              </article>
            ))}
            <div className="border border-mint/25 bg-mint/10 p-5"><div className="flex items-center gap-3 text-mint"><ShieldCheck size={18} /><p className="font-mono text-xs uppercase">Defensive position</p></div><p className="mt-3 text-sm leading-7 text-white/70">No unauthorized testing, no destructive activity, no credential theft, and no vague security work without written permission.</p></div>
          </div>
        </div>
      </section>
    </main>
  );
}
