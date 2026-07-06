import { SourceBackLink } from "@/components/SourceBackLink";
import { writeupPosts } from "@/lib/portfolio-data";
import { WriteupIndex } from "@/components/WriteupIndex";

export const metadata = {
  title: "Writeups | KhophiSnow",
  description: "CTF notes, API security lessons, and backend architecture breakdowns from KhophiSnow.",
};

export default function WriteupsPage() {
  const categories = Array.from(new Set(writeupPosts.map((post) => post.type)));

  return (
    <main className="scanline min-h-screen bg-ink text-white">
      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <SourceBackLink fallback={{ href: "/", label: "Back home" }} sources={{ home: { href: "/#writeups", label: "Back to homepage writeups" } }} />
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-mono text-sm uppercase text-mint">Writeup library</p>
            <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">Notes from the lab and the backend.</h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/62">Security practice, API architecture lessons, and integration notes collected as short technical entries.</p>
            <div className="mt-8 flex flex-wrap gap-2">{categories.map((category) => <span key={category} className="border border-white/10 bg-panel/70 px-3 py-2 font-mono text-xs text-cyan">{category}</span>)}</div>
          </div>
<WriteupIndex posts={writeupPosts} />
        </div>
      </section>
    </main>
  );
}
