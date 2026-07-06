import { notFound } from "next/navigation";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { waskiProcess, waskiProposalPreview, waskiServiceDetails } from "@/lib/portfolio-data";
import { SourceBackLink } from "@/components/SourceBackLink";

type Params = Promise<{ slug: string }>;

const serviceOutcomes: Record<string, string[]> = {
  "backend-api-engineering": ["A documented backend foundation that another developer can understand and extend", "Clear authentication, role, and data boundaries for safer product growth", "Deployment notes and route evidence that make handover easier"],
  "full-stack-web-applications": ["A responsive product experience connected to real workflows and data", "Cleaner forms, screens, and user journeys for daily operations", "A launch-ready web application with practical handover notes"],
  "dashboards-and-internal-tools": ["A focused control surface for repeated team or organization work", "Role-aware views that help the right people see and act on the right data", "Reports, filters, and status views that reduce manual tracking"],
  "cybersecurity-support": ["A scoped review that stays authorized, documented, and practical", "Risk notes written in plain language with realistic hardening actions", "Access-control and deployment recommendations your team can act on"],
  "technical-training": ["Practical sessions built around projects, debugging, and real workflows", "Beginner-friendly explanations without hiding the technical truth", "A learning path teams can continue after the session ends"],
};

const serviceSteps: Record<string, string[]> = {
  "backend-api-engineering": ["Map resources, roles, workflows, and data ownership", "Design routes, schemas, guards, and documentation structure", "Build, test, deploy, and hand over the backend foundation"],
  "full-stack-web-applications": ["Define pages, users, content, and key actions", "Build responsive screens and connect the required backend flows", "Launch with deployment notes, support guidance, and next-step recommendations"],
  "dashboards-and-internal-tools": ["Study the repeated work and the people responsible for it", "Design the dashboard states, filters, reports, and permissions", "Ship the tool with clear usage notes and improvement backlog"],
  "cybersecurity-support": ["Confirm ownership, written scope, targets, and testing limits", "Review the agreed web/API surface and document findings", "Deliver prioritized fixes, hardening notes, and follow-up guidance"],
  "technical-training": ["Agree on audience level, goals, and practical exercises", "Deliver sessions with examples, debugging, and guided practice", "Share resources, recap notes, and recommended next projects"],
};


export function generateStaticParams() {
  return waskiServiceDetails.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const service = waskiServiceDetails.find((item) => item.slug === slug);
  return { title: service ? `${service.title} | WaskiZone` : "WaskiZone Services" };
}

export default async function WaskiServicePage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = waskiServiceDetails.find((item) => item.slug === slug);
  if (!service) notFound();

  const outcomes = serviceOutcomes[service.slug] ?? service.deliverables;
  const steps = serviceSteps[service.slug] ?? waskiProcess.slice(0, 3);
  return (
    <main className="scanline min-h-screen bg-ink text-white">
      <section className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
        <SourceBackLink fallback={{ href: "/waskizone#service-details", label: "Back to service pages" }} sources={{ configure: { href: "/waskizone#configure", label: "Back to service configurator" } }} />
        <p className="mt-12 font-mono text-sm uppercase text-cyan">WaskiZone service</p>
        <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">{service.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/68">{service.summary}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <article className="border border-white/10 bg-panel/70 p-6">
            <h2 className="text-2xl font-black text-white">Good fit for</h2>
            <div className="mt-5 flex flex-wrap gap-2">{service.goodFor.map((item) => <span key={item} className="border border-cyan/25 bg-cyan/10 px-3 py-2 text-sm text-cyan">{item}</span>)}</div>
          </article>
          <article className="border border-white/10 bg-panel/70 p-6">
            <h2 className="text-2xl font-black text-white">Proof signal</h2>
            <p className="mt-5 text-sm leading-7 text-white/65">{service.proof}</p>
          </article>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-[0.58fr_0.42fr]">
          <section className="border border-white/10 bg-panel/70 p-6">
            <h2 className="text-2xl font-black text-white">Client outcomes</h2>
            <div className="mt-6 space-y-3">{outcomes.map((item) => <p key={item} className="flex gap-3 text-sm leading-7 text-white/68"><BadgeCheck size={16} className="mt-1 shrink-0 text-mint" />{item}</p>)}</div>
          </section>
          <section className="border border-white/10 bg-panel/70 p-6">
            <h2 className="text-2xl font-black text-white">Engagement path</h2>
            <div className="mt-6 space-y-3">{steps.map((item, index) => <p key={item} className="grid grid-cols-[2rem_1fr] gap-3 text-sm leading-7 text-white/68"><span className="flex size-8 items-center justify-center border border-cyan/30 bg-cyan/10 font-mono text-xs text-cyan">{index + 1}</span>{item}</p>)}</div>
          </section>
        </div>
        <section className="mt-10 border border-white/10 bg-panel/70 p-6">
          <h2 className="text-2xl font-black text-white">Typical deliverables</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">{service.deliverables.map((item) => <p key={item} className="flex items-center gap-3 text-sm text-white/68"><BadgeCheck size={16} className="shrink-0 text-mint" />{item}</p>)}</div>
        </section>
        <section className="mt-10 border border-mint/25 bg-mint/10 p-6">
          <h2 className="text-2xl font-black text-white">What to include in your first message</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">{waskiProposalPreview.map((item) => <p key={item} className="flex gap-3 text-sm leading-7 text-white/70"><BadgeCheck size={16} className="mt-1 shrink-0 text-mint" />{item}</p>)}</div>
        </section>
        <a href={`mailto:juliusmcbrahamsomuah@gmail.com?subject=WaskiZone%20${encodeURIComponent(service.title)}%20inquiry`} className="mt-10 inline-flex items-center gap-2 bg-mint px-5 py-3 font-bold text-ink hover:bg-white">Request this service<ArrowUpRight size={18} /></a>
      </section>
    </main>
  );
}
