import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Code2,
  Database,
  Gauge,
  GraduationCap,
  Layers3,
  LockKeyhole,
  Rocket,
  Send,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { waskiBeforeAfter, waskiFaqs, waskiOnboarding, waskiPackages, waskiProposalPreview, waskiServiceDetails, waskiServices, waskiZone } from "@/lib/portfolio-data";
import { WaskiZoneIntro } from "@/components/WaskiZoneIntro";
import { WaskiCaseStudyProof, WaskiHowWeWork, WaskiProposalFlow, WaskiServiceConfigurator, WaskiTrustSection } from "@/components/PortfolioPhase";

const serviceIcons = [Code2, Layers3, Database, Wrench, ShieldCheck, GraduationCap];

const serviceSummary = [
  { label: "Software", value: "Web apps, APIs, dashboards", detail: "Design, build, deploy, and maintain practical systems." },
  { label: "Cybersecurity", value: "Review, hardening, training", detail: "Authorized support for safer web and API systems." },
  { label: "Delivery", value: "Clear scope and handover", detail: "Checkpoints, documentation, launch support, and next steps." },
  { label: "Audience", value: "Founders, schools, teams", detail: "Focused support for people who need software that works." },
];

const engagementTypes = [
  { title: "Build a new system", detail: "Start from a product idea, workflow, or organization need and turn it into a deployed web application or backend service." },
  { title: "Improve an existing system", detail: "Stabilize a project, clean up APIs, improve deployment, document workflows, and prepare the system for real users." },
  { title: "Review and harden", detail: "Assess owned web apps or APIs for access-control gaps, exposed routes, configuration issues, and practical security improvements." },
  { title: "Train a team", detail: "Run practical sessions on web development, Git, backend foundations, API security basics, and project-based delivery." },
];

const securityScope = [
  "API authentication and authorization review",
  "Role and access-control review",
  "Web application hardening guidance",
  "Configuration and deployment review",
  "Security-aware code and architecture feedback",
  "Defensive security training for teams",
];

const proofPoints = [
  { label: "Backend depth", value: "Auth, RBAC, APIs, database workflows, documentation, and tests." },
  { label: "Product delivery", value: "Dashboards, portals, campus platforms, internal tools, and deployment support." },
  { label: "Security mindset", value: "CTF practice, API security thinking, access boundaries, and hardening discipline." },
];

const clientFits = [
  { label: "Founders", detail: "MVPs, landing pages, dashboards, APIs, and first production-ready product workflows." },
  { label: "Schools and clubs", detail: "Portals, event systems, learning tools, admin workflows, training, and community platforms." },
  { label: "Small teams", detail: "Internal tools, project rescue, deployment support, documentation, and maintenance." },
  { label: "Security-conscious owners", detail: "Authorized review and hardening support for owned web apps, APIs, and workflows." },
];

const deliverables = [
  "Scope and workflow map",
  "Responsive interface where needed",
  "Backend/API or integration plan",
  "Database model where needed",
  "Security and access-control checklist",
  "Deployment and handover notes",
];

export const metadata = {
  title: "WaskiZone | Software Development & Cybersecurity Services",
  description: "WaskiZone builds software systems and provides authorized cybersecurity support for web apps, APIs, dashboards, and technical teams.",
  icons: {
    icon: "/brand/waskizone/favicon/favicon.ico",
    apple: "/brand/waskizone/favicon/apple-touch-icon.png",
  },
  openGraph: {
    images: ["/brand/waskizone/logo/tagline.png"],
  },
};

export default function WaskiZonePage() {
  return (
    <main className="scanline min-h-screen bg-ink text-white">
      <WaskiZoneIntro />
      <div className="cyber-grid pointer-events-none absolute inset-x-0 top-0 h-[760px]" />
      <header className="relative z-10 border-b border-white/10 bg-ink/88 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/#waskizone" className="inline-flex items-center gap-2 text-sm font-bold text-mint hover:text-white"><ArrowLeft size={16} />Back to portfolio</Link>
          <a href="mailto:juliusmcbrahamsomuah@gmail.com?subject=WaskiZone%20service%20inquiry" className="inline-flex items-center gap-2 border border-mint/40 px-4 py-2 text-sm font-bold text-mint hover:bg-mint hover:text-ink">Request service<ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 py-18 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
        <div>
          <p className="font-mono text-sm uppercase text-mint">Software development / cybersecurity support</p>
          <h1 className="mt-4 text-5xl font-black leading-tight md:text-7xl">{waskiZone.name}</h1>
          <p className="mt-5 max-w-2xl text-2xl font-black leading-tight text-white/88 md:text-4xl">{waskiZone.tagline}</p>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/68">{waskiZone.positioning}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="mailto:juliusmcbrahamsomuah@gmail.com?subject=WaskiZone%20project%20inquiry" className="inline-flex items-center gap-2 bg-mint px-5 py-3 font-bold text-ink hover:bg-white">Start a project<ArrowUpRight size={18} /></a>
            <a href="#services" className="inline-flex items-center gap-2 border border-white/18 px-5 py-3 font-bold text-white hover:border-cyan hover:text-cyan">View services</a>
          </div>
          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
            {serviceSummary.map((item) => <Signal key={item.label} label={item.label} value={item.value} detail={item.detail} />)}
          </div>
        </div>
        <div className="grid gap-4">
          <figure className="grid overflow-hidden border border-white/10 bg-panel/78 p-4 shadow-terminal md:grid-cols-[0.86fr_1.14fr]">
            <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden p-5">
              <Image src="/brand/waskizone/icon/profile.png" alt="WaskiZone profile icon watermark" width={1254} height={1254} className="absolute inset-0 m-auto h-[92%] w-[92%] object-contain opacity-[0.07]" />
              <Image src="/brand/waskizone/icon/mark.png" alt="WaskiZone shield mark" width={1254} height={1254} priority className="relative max-h-[360px] w-full object-contain" />
            </div>
            <div className="flex flex-col justify-center border-t border-white/10 p-5 md:border-l md:border-t-0">
              <p className="font-mono text-xs uppercase text-cyan">service identity</p>
              <Image src="/brand/waskizone/logo/tagline.png" alt="WaskiZone tagline logo" width={2172} height={724} className="mt-4 w-full" />
              <p className="mt-5 text-sm leading-7 text-white/64">A practical technology service brand for building useful systems and strengthening the security posture around them.</p>
            </div>
          </figure>
          <div className="border border-mint/25 bg-mint/10 p-5">
            <p className="font-mono text-xs uppercase text-mint">Service scope</p>
            <p className="mt-3 text-sm leading-7 text-white/72">{waskiZone.activeOffer}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {engagementTypes.map((item) => <article key={item.title} className="border border-white/10 bg-panel/70 p-5"><Gauge className="text-cyan" size={18} /><h2 className="mt-4 text-xl font-black text-white">{item.title}</h2><p className="mt-3 text-sm leading-7 text-white/62">{item.detail}</p></article>)}
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionTitle eyebrow="Services" title="Software and cybersecurity services" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {waskiServices.map((service, index) => {
            const Icon = serviceIcons[index] || Code2;
            return (
              <article key={service.title} className="border border-white/10 bg-panel/70 p-5 transition hover:border-mint/45">
                <Icon className="text-mint" size={22} />
                <div className="mt-5 flex items-start justify-between gap-3"><h2 className="text-xl font-black text-white">{service.title}</h2><span className="shrink-0 border border-mint/40 px-2 py-1 font-mono text-[10px] uppercase text-mint">{service.status}</span></div>
                <p className="mt-4 text-sm leading-7 text-white/62">{service.detail}</p>
                <p className="mt-4 text-xs leading-6 text-white/45">{service.proof}</p>
              </article>
            );
          })}
        </div>
      </section>

      <WaskiServiceConfigurator />

      <section id="service-details" className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <SectionTitle eyebrow="Service pages" title="Explore the core offers" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {waskiServiceDetails.map((service) => <Link key={service.slug} href={`/waskizone/services/${service.slug}`} className="block border border-white/10 bg-panel/70 p-5 hover:border-mint"><p className="font-mono text-xs uppercase text-cyan">service</p><h3 className="mt-3 text-xl font-black text-white">{service.title}</h3><p className="mt-4 text-sm leading-7 text-white/60">{service.summary}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-mint">Read more<ArrowUpRight size={15} /></span></Link>)}
          </div>
        </div>
      </section>

      <WaskiTrustSection />

      <section id="cybersecurity" className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div>
          <SectionTitle eyebrow="Cybersecurity" title="Authorized security support for web and API systems" />
          <p className="mt-5 text-sm leading-7 text-white/66">W4sk1Z0n3 is the cybersecurity identity under WaskiZone. The focus is practical, authorized work: review what you own, explain risk clearly, and help harden the system without drama.</p>
          <Link href="/w4sk1z0n3" className="mt-7 inline-flex items-center gap-2 border border-red-300/35 px-4 py-3 font-bold text-red-300 hover:bg-red-300 hover:text-ink">Open W4sk1Z0n3<ArrowUpRight size={16} /></Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {securityScope.map((item) => <div key={item} className="flex items-center gap-3 border border-red-300/20 bg-red-500/10 p-4 text-sm text-white/70"><LockKeyhole size={16} className="shrink-0 text-red-300" />{item}</div>)}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div><SectionTitle eyebrow="Engagements" title="Clear starting points for real work" /><p className="mt-5 text-sm leading-7 text-white/62">These are service categories, not public fixed prices. The right scope depends on requirements, risk, timeline, integrations, and support needs.</p></div>
          <div className="grid gap-5 md:grid-cols-2">
            {waskiPackages.map((item) => <article key={item.name} className="border border-white/10 bg-panel/70 p-5"><p className="font-mono text-xs uppercase text-cyan">{item.price}</p><h2 className="mt-3 text-2xl font-black text-white">{item.name}</h2><p className="mt-4 text-sm leading-7 text-white/62">{item.detail}</p><div className="mt-5 space-y-2">{item.items.map((point) => <p key={point} className="flex items-center gap-2 text-sm text-white/65"><BadgeCheck size={15} className="text-mint" />{point}</p>)}</div></article>)}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-2 lg:px-8">
        <div><SectionTitle eyebrow="Fit" title="Who WaskiZone is built for" /><div className="mt-8 grid gap-4 sm:grid-cols-2">{clientFits.map((fit) => <article key={fit.label} className="border border-white/10 bg-panel/70 p-5"><BriefcaseBusiness className="text-cyan" size={18} /><h3 className="mt-4 text-xl font-black text-white">{fit.label}</h3><p className="mt-3 text-sm leading-7 text-white/62">{fit.detail}</p></article>)}</div></div>
        <div><SectionTitle eyebrow="Proof" title="Why the offer is credible" /><div className="mt-8 grid gap-4">{proofPoints.map((item) => <article key={item.label} className="border border-white/10 bg-panel/70 p-5"><p className="font-mono text-xs uppercase text-mint">{item.label}</p><p className="mt-3 text-sm leading-7 text-white/68">{item.value}</p></article>)}</div></div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
        <div><SectionTitle eyebrow="Delivery standards" title="What every engagement should leave behind" /><p className="mt-5 text-sm leading-7 text-white/62">Whether the work is a build, review, training session, or maintenance engagement, the outcome should be clear enough for the client to keep operating after handover.</p></div>
        <div className="grid gap-3 sm:grid-cols-2">{deliverables.map((item) => <div key={item} className="flex items-center gap-3 border border-white/10 bg-panel/70 p-4 text-sm text-white/68"><BadgeCheck size={16} className="shrink-0 text-mint" />{item}</div>)}</div>
      </section>

      <WaskiHowWeWork />

      <section className="border-y border-white/10 bg-ink/72">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
          <div><SectionTitle eyebrow="Delivery process" title="How work moves from request to launch" /><p className="mt-5 text-sm leading-7 text-white/62">The process keeps expectations clear before code or security review starts.</p></div>
          <div className="space-y-3">{waskiOnboarding.map((step, index) => <div key={step} className="flex gap-4 border border-white/10 bg-panel/70 p-4"><span className="flex size-9 shrink-0 items-center justify-center border border-mint/30 bg-mint/10 font-mono text-xs text-mint">{index + 1}</span><p className="text-sm leading-6 text-white/66">{step}</p></div>)}</div>
        </div>
      </section>

      <WaskiCaseStudyProof />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-2 lg:px-8">
        <div><SectionTitle eyebrow="Proposal contents" title="What a serious scope should include" /><div className="mt-8 space-y-3">{waskiProposalPreview.map((item) => <p key={item} className="flex gap-3 border border-white/10 bg-panel/70 p-4 text-sm text-white/68"><BadgeCheck size={16} className="mt-0.5 shrink-0 text-mint" />{item}</p>)}</div></div>
        <div><SectionTitle eyebrow="Delivery outcome" title="The before and after" /><div className="mt-8 grid gap-3">{waskiBeforeAfter.map((item) => <article key={item.before} className="grid gap-3 border border-white/10 bg-panel/70 p-4 sm:grid-cols-2"><p className="text-sm text-white/45">Before: <span className="block font-bold text-white/70">{item.before}</span></p><p className="text-sm text-mint/70">After: <span className="block font-bold text-white">{item.after}</span></p></article>)}</div></div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div><SectionTitle eyebrow="FAQ" title="Answers before a conversation" /></div>
          <div className="grid gap-3">{waskiFaqs.map((item) => <details key={item.q} className="border border-white/10 bg-panel/70 p-4"><summary className="cursor-pointer font-bold text-white">{item.q}</summary><p className="mt-3 text-sm leading-7 text-white/62">{item.a}</p></details>)}</div>
        </div>
      </section>

      <WaskiProposalFlow />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="border border-mint/25 bg-mint/10 p-6"><Rocket className="text-mint" /><h2 className="mt-5 text-3xl font-black text-white">Ready to discuss a project?</h2><p className="mt-5 text-sm leading-7 text-white/70">Send the goal, current state, timeline, and whether you need software build work, security support, training, or maintenance.</p></div>
          <div id="contact-flow" className="border border-white/10 bg-panel/75 p-8"><SectionTitle eyebrow="Contact" title="Choose the service intent" /><div className="mt-8 flex flex-wrap gap-3">{["Backend API", "Full-stack app", "Dashboard", "Cybersecurity review", "Training", "Maintenance"].map((intent) => <a key={intent} href={`mailto:juliusmcbrahamsomuah@gmail.com?subject=WaskiZone%20${encodeURIComponent(intent)}%20inquiry`} className="border border-white/12 px-4 py-3 text-sm font-bold text-white/70 hover:border-mint hover:text-mint">{intent}<Send className="ml-2 inline" size={14} /></a>)}</div></div>
        </div>
      </section>
    </main>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) { return <div><p className="font-mono text-sm uppercase text-mint">{eyebrow}</p><h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">{title}</h2></div>; }
function Signal({ label, value, detail }: { label: string; value: string; detail: string }) { return <div className="border border-white/10 bg-black/25 p-4"><p className="font-mono text-xs uppercase text-white/42">{label}</p><p className="mt-2 text-sm font-black text-mint">{value}</p><p className="mt-2 text-xs leading-5 text-white/45">{detail}</p></div>; }
