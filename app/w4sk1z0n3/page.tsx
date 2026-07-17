import { Binary, LockKeyhole, Radar, Terminal } from "lucide-react";
import { SourceBackLink } from "@/components/SourceBackLink";
import { labItems, writeupPosts } from "@/lib/portfolio-data";

export const metadata = { title: "W4sk1Z0n3 | Cybersecurity Services", description: "Authorized cybersecurity support for API review, access-control checks, hardening guidance, and defensive security training.", icons: { icon: "/brand/waskizone/favicon/favicon.ico" } };

const serviceAreas = [
  "Authorized web and API security review",
  "Access-control and role-boundary review",
  "Web hardening guidance",
  "Security-aware architecture feedback",
  "Defensive security training",
  "CTF-informed learning and research notes",
];

export default function W4sk1Z0n3Page() {
  return (
    <main className="scanline min-h-screen bg-ink text-white">
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <SourceBackLink fallback={{ href: "https://waskizone.vercel.app", label: "Back to WaskiZone" }} sources={{ cybersecurity: { href: "https://waskizone.vercel.app/cybersecurity", label: "Back to security services" } }} />
        <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="font-mono text-sm uppercase text-red-300">Cybersecurity service identity</p>
            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">W4sk1Z0n3</h1>
            <p className="mt-6 text-sm leading-7 text-white/68">W4sk1Z0n3 is the cybersecurity lane under WaskiZone, focused on authorized review, practical hardening, defensive education, and security-aware software decisions.</p>
          </div>
          <div className="border border-red-500/25 bg-red-500/10 p-6">
            <LockKeyhole className="text-red-300" />
            <h2 className="mt-5 text-3xl font-black text-white">Security work must be scoped, authorized, and useful.</h2>
            <p className="mt-4 text-sm leading-7 text-white/68">The goal is not theatre. The goal is clearer risk, stronger boundaries, and practical fixes that make software safer to operate.</p>
          </div>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <LabCard icon={<LockKeyhole />} title="Service areas" items={serviceAreas} />
          <LabCard icon={<Terminal />} title="Research notes" items={writeupPosts.slice(0, 4).map((item) => item.title)} />
          <LabCard icon={<Binary />} title="Practice base" items={labItems.slice(0, 6)} />
        </div>
        <a href="mailto:juliusmcbrahamsomuah@gmail.com?subject=W4sk1Z0n3%20security%20inquiry" className="mt-10 inline-flex items-center gap-2 bg-red-300 px-5 py-3 font-bold text-ink hover:bg-white">Request authorized security support<Radar size={16} /></a>
      </section>
    </main>
  );
}

function LabCard({ icon, title, items }: { icon: React.ReactNode; title: string; items: readonly string[] }) {
  return <article className="border border-white/10 bg-panel/70 p-5"><div className="text-red-300">{icon}</div><h2 className="mt-5 text-2xl font-black text-white">{title}</h2><div className="mt-5 space-y-2">{items.map((item) => <p key={item} className="text-sm text-white/62">{item}</p>)}</div></article>;
}
