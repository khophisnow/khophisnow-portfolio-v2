import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { writeupPosts } from "@/lib/portfolio-data";

const mdxImports = {
  "ctf-practice-api-design": () => import("@/content/writeups/ctf-practice-api-design.mdx"),
  "rbac-multi-school-systems": () => import("@/content/writeups/rbac-multi-school-systems.mdx"),
  "mock-data-to-live-systems": () => import("@/content/writeups/mock-data-to-live-systems.mdx"),
  "mr-robot-ctf-notes": () => import("@/content/writeups/mr-robot-ctf-notes.mdx"),
  "runctf-local-challenge": () => import("@/content/writeups/runctf-local-challenge.mdx"),
  "kiop-samba-lesson": () => import("@/content/writeups/kiop-samba-lesson.mdx"),
} as const;

export function generateStaticParams() {
  return writeupPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = writeupPosts.find((item) => item.slug === slug);
  return post ? { title: `${post.title} | KhophiSnow Writeups`, description: post.body[0] } : {};
}

export default async function WriteupPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loader = mdxImports[slug as keyof typeof mdxImports];
  const post = writeupPosts.find((item) => item.slug === slug);
  if (!loader || !post) notFound();
  const Content = (await loader()).default;

  return (
    <main className="scanline min-h-screen bg-ink text-white">
      <section className="mx-auto max-w-3xl px-5 py-16">
        <Link href="/#writeups" className="inline-flex items-center gap-2 text-sm font-bold text-mint hover:text-white">
          <ArrowLeft size={16} />
          Back to writeups
        </Link>
        <p className="mt-12 font-mono text-sm text-cyan">{post.type}</p>
        <article className="mt-4">
          <Content />
        </article>
      </section>
    </main>
  );
}
