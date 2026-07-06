"use client";

import Link from "next/link";
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

type WriteupPost = {
  slug: string;
  title: string;
  type: string;
  readingTime: string;
  tags: string[];
  body: string[];
};

const difficultyFor = (post: WriteupPost) => {
  if (post.tags.some((tag) => ["privilege path", "SUID", "legacy services"].includes(tag))) return "Lab";
  if (post.tags.some((tag) => ["RBAC", "multi-tenant", "API security"].includes(tag))) return "Intermediate";
  return "Foundation";
};

const projectFor = (post: WriteupPost) => {
  if (post.tags.includes("multi-tenant") || post.title.includes("RBAC")) return "EduManage";
  if (post.tags.includes("contracts") || post.tags.includes("integration")) return "WhatsUpUCC";
  return "Lab practice";
};

export function WriteupIndex({ posts }: { posts: WriteupPost[] }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("All");
  const [tool, setTool] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [project, setProject] = useState("All");

  const topics = useMemo(() => ["All", ...Array.from(new Set(posts.map((post) => post.type)))], [posts]);
  const tools = useMemo(() => ["All", ...Array.from(new Set(posts.flatMap((post) => post.tags)))], [posts]);
  const difficulties = ["All", "Foundation", "Intermediate", "Lab"];
  const projects = ["All", "EduManage", "WhatsUpUCC", "Lab practice"];

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesQuery = !value || [post.title, post.type, post.body[0], ...post.tags].join(" ").toLowerCase().includes(value);
      const matchesTopic = topic === "All" || post.type === topic;
      const matchesTool = tool === "All" || post.tags.includes(tool);
      const matchesDifficulty = difficulty === "All" || difficultyFor(post) === difficulty;
      const matchesProject = project === "All" || projectFor(post) === project;
      return matchesQuery && matchesTopic && matchesTool && matchesDifficulty && matchesProject;
    });
  }, [posts, query, topic, tool, difficulty, project]);

  return (
    <div className="border border-white/10 bg-panel/70 p-5">
      <label className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4 text-mint">
        <Search size={18} />
        <span className="font-mono text-xs uppercase">Search index</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search writeups, tags, topics"
          className="min-w-[180px] flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/32 sm:text-right"
        />
      </label>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Filter label="Topic" value={topic} setValue={setTopic} options={topics} />
        <Filter label="Tool/tag" value={tool} setValue={setTool} options={tools} />
        <Filter label="Difficulty" value={difficulty} setValue={setDifficulty} options={difficulties} />
        <Filter label="Project" value={project} setValue={setProject} options={projects} />
      </div>
      <div className="mt-5 flex items-center gap-2 font-mono text-xs uppercase text-white/42"><SlidersHorizontal size={14} />{filtered.length} result{filtered.length === 1 ? "" : "s"}</div>
      <div className="mt-5 grid gap-4">
        {filtered.map((post) => (
          <Link key={post.slug} href={`/writeups/${post.slug}?from=library`} className="group border border-white/10 bg-black/25 p-4 transition hover:border-mint">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-xs text-cyan">{post.type} / {post.readingTime} / {difficultyFor(post)}</p>
              <ArrowUpRight className="text-white/35 transition group-hover:text-mint" size={16} />
            </div>
            <h2 className="mt-3 text-xl font-black text-white">{post.title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/58">{post.body[0]}</p>
            <div className="mt-4 flex flex-wrap gap-2"><span className="border border-mint/20 bg-mint/10 px-2 py-1 text-xs text-mint">{projectFor(post)}</span>{post.tags.map((tag) => <span key={tag} className="bg-white/[0.055] px-2 py-1 text-xs text-white/58">{tag}</span>)}</div>
          </Link>
        ))}
        {filtered.length === 0 && <p className="border border-white/10 bg-black/25 p-4 text-sm text-white/55">No writeups match those filters.</p>}
      </div>
    </div>
  );
}

function Filter({ label, value, setValue, options }: { label: string; value: string; setValue: (value: string) => void; options: string[] }) {
  return <label><span className="font-mono text-xs uppercase text-mint">{label}</span><select value={value} onChange={(event) => setValue(event.target.value)} className="mt-2 w-full border border-white/10 bg-black/35 px-3 py-3 text-sm text-white outline-none focus:border-mint">{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}
