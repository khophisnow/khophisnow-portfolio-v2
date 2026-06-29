import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, BadgeCheck } from "lucide-react";
import { waskiServiceDetails } from "@/lib/portfolio-data";

type Params = Promise<{ slug: string }>;

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

  return (
    <main className="scanline min-h-screen bg-ink text-white">
      <section className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
        <Link href="/waskizone#service-details" className="inline-flex items-center gap-2 text-sm font-bold text-mint hover:text-white"><ArrowLeft size={16} />Back to WaskiZone</Link>
        <p className="mt-12 font-mono text-sm uppercase text-cyan">WaskiZone service</p>
        <h1 className="mt-4 text-5xl font-black leading-tight md:text-7xl">{service.title}</h1>
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
        <section className="mt-10 border border-white/10 bg-panel/70 p-6">
          <h2 className="text-2xl font-black text-white">Typical deliverables</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">{service.deliverables.map((item) => <p key={item} className="flex items-center gap-3 text-sm text-white/68"><BadgeCheck size={16} className="shrink-0 text-mint" />{item}</p>)}</div>
        </section>
        <a href={`mailto:juliusmcbrahamsomuah@gmail.com?subject=WaskiZone%20${encodeURIComponent(service.title)}%20inquiry`} className="mt-10 inline-flex items-center gap-2 bg-mint px-5 py-3 font-bold text-ink hover:bg-white">Request this service<ArrowUpRight size={18} /></a>
      </section>
    </main>
  );
}
