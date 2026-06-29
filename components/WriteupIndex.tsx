"use client";

import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { useMemo, useState } from "react";

type WriteupPost = {
  slug: string;
  title: string;
  type: string;
  readingTime: string;
  tags: string[];
  body: string[];
};

export function WriteupIndex({ posts }: { posts: WriteupPost[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return posts;
    return posts.filter((post) => [post.title, post.type, post.body[0], ...post.tags].join(" ").toLowerCase().includes(value));
  }, [posts, query]);

  return (
    <div className="border border-white/10 bg-panel/70 p-5">
      <label className="flex items-center gap-2 border-b border-white/10 pb-4 text-mint">
        <Search size={18} />
        <span className="font-mono text-xs uppercase">Search index</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search writeups, tags, topics"
          className="ml-auto min-w-0 flex-1 bg-transparent text-right text-sm text-white outline-none placeholder:text-white/32"
        />
      </label>
      <div className="mt-5 grid gap-4">
        {filtered.map((post) => (
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
        {filtered.length === 0 && <p className="border border-white/10 bg-black/25 p-4 text-sm text-white/55">No writeups match that search.</p>}
      </div>
    </div>
  );
}
