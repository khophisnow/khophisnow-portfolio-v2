import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Search } from "lucide-react";
import { writeupPosts } from "@/lib/portfolio-data";

export const metadata = {
  title: "Writeups | KhophiSnow",
  description: "CTF notes, API security lessons, and backend architecture breakdowns from KhophiSnow.",
};

export default function WriteupsPage() {
  const categories = Array.from(new Set(writeupPosts.map((post) => post.type)));

  return (
    <main className="scanline min-h-screen bg-ink text-white">
      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <Link href="/#writeups" className="inline-flex items-center gap-2 text-sm font-bold text-mint hover:text-white">
          <ArrowLeft size={16} /> Back home
        </Link>
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-mono text-sm uppercase text-mint">Writeup library</p>
            <h1 className="mt-3 text-5xl font-black leading-tight md:text-7xl">Notes from the lab and the backend.</h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/62">Security practice, API architecture lessons, and integration notes collected as short technical entries.</p>
            <div className="mt-8 flex flex-wrap gap-2">{categories.map((category) => <span key={category} className="border border-white/10 bg-panel/70 px-3 py-2 font-mono text-xs text-cyan">{category}</span>)}</div>
          </div>
          <div className="border border-white/10 bg-panel/70 p-5">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 text-mint"><Search size={18} /><span className="font-mono text-xs uppercase">Index</span></div>
            <div className="mt-5 grid gap-4">
              {writeupPosts.map((post) => (
                <Link key={post.slug} href={`/writeups/${post.slug}`} className="group border border-white/10 bg-black/25 p-4 transition hover:border-mint">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-mono text-xs text-cyan">{post.type} / {post.readingTime}</p>
                    <ArrowUpRight className="text-white/35 transition group-hover:text-mint" size={16} />
                  </div>
                  <h2 className="mt-3 text-xl font-black text-white">{post.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-white/58">{post.body[0]}</p>
                  <div className="mt-4 flex flex-wrap gap-2">{post.tags.map((tag) => <span key={tag} className="bg-white/[0.055] px-2 py-1 text-xs text-white/58">{tag}</span>)}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
