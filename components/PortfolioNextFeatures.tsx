"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, MonitorPlay } from "lucide-react";
import { cases, securityNotes } from "@/lib/portfolio-data";

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div><p className="font-mono text-sm uppercase text-mint">{eyebrow}</p><h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">{title}</h2></div>;
}

export function MobileProjectStoryMode() {
  const [active, setActive] = useState(0);
  const project = cases[active];
  const story = project.name === "EduManage"
    ? [
      { title: "A school user signs in", detail: "The system starts with identity, session handling, and a school-aware user context." },
      { title: "Role boundaries load", detail: "Permissions decide what the person can view, change, approve, or report." },
      { title: "A module handles the work", detail: "Attendance, exams, billing, students, parents, reports, and health records stay inside clear modules." },
      { title: "The database stays scoped", detail: "Queries should respect tenant context so one school cannot read another school&apos;s records." },
      { title: "Evidence is reviewable", detail: "Swagger, tests, health checks, and seed data make the backend easier to inspect and integrate." },
    ]
    : [
      { title: "A campus user opens a feature", detail: "Events, media, comments, bookmarks, and notifications begin as simple user actions." },
      { title: "The API boundary checks the request", detail: "JWT, CORS, rate limiting, request tracking, and validation protect public-facing routes." },
      { title: "Community modules respond", detail: "Events, media, moderation, admin, audit, and health modules keep the platform maintainable." },
      { title: "Moderation keeps it safer", detail: "Public content needs workflows for review, abuse control, and admin decisions." },
      { title: "Docs support integration", detail: "OpenAPI docs make the project understandable beyond the original developer." },
    ];

  return (
    <section className="border-y border-white/10 bg-white/[0.025]">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionTitle eyebrow="Story mode" title="Swipe-sized project walkthroughs for mobile readers" />
          <div className="flex flex-wrap gap-2">
            {cases.map((item, index) => <button key={item.slug} type="button" onClick={() => setActive(index)} className={`border px-4 py-3 text-sm font-bold ${active === index ? "border-mint bg-mint text-ink" : "border-white/12 text-white/65 hover:border-mint hover:text-mint"}`}>{item.name}</button>)}
          </div>
        </div>
        <div className="mt-10 flex snap-x gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
          {story.map((step, index) => (
            <article key={step.title} className="min-w-[82vw] snap-center border border-white/10 bg-panel/75 p-5 sm:min-w-[360px] lg:min-w-0">
              <span className="flex size-10 items-center justify-center border border-mint/30 bg-mint/10 font-mono text-xs text-mint">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 text-2xl font-black text-white">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/62">{step.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DemoPreviewStrip() {
  const previews = [
    { project: "EduManage", src: "/images/edumanage-demo.webp", label: "multi-tenant school workflow", href: "/case-files/edumanage" },
    { project: "WhatsUpUCC", src: "/images/whats-up-ucc.webp", label: "campus event and media flow", href: "/case-files/whatsupucc" },
    { project: "API docs", src: "/images/whats-up-ucc-api-docs.webp", label: "documented backend surface", href: "/case-files/whatsupucc" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <SectionTitle eyebrow="Demo previews" title="Short preview panels that behave like product clips" />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {previews.map((preview) => (
          <Link key={preview.src} href={preview.href} className="group overflow-hidden border border-white/10 bg-panel/70 p-3 hover:border-mint">
            <div className="relative aspect-video overflow-hidden bg-black">
              <Image src={preview.src} alt={`${preview.project} preview`} width={1536} height={864} className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <div className="absolute left-4 top-4 flex items-center gap-2 border border-mint/35 bg-ink/75 px-3 py-2 font-mono text-xs text-mint backdrop-blur"><MonitorPlay size={14} /> preview loop</div>
              <div className="absolute bottom-0 left-0 h-1 w-full bg-white/10"><span className="block h-full w-1/2 bg-mint transition-all duration-700 group-hover:w-full" /></div>
            </div>
            <p className="mt-4 font-mono text-xs uppercase text-cyan">{preview.project}</p>
            <h3 className="mt-2 text-xl font-black text-white">{preview.label}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function SecurityNotesPreview() {
  const highest = useMemo(() => securityNotes.slice(0, 3), []);
  return (
    <section className="border-y border-white/10 bg-ink/72">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.38fr_0.62fr] lg:px-8">
        <div>
          <SectionTitle eyebrow="Security notes" title="Sample findings, risk ratings, and remediation style" />
          <p className="mt-5 text-sm leading-7 text-white/62">This is the tone I want security work to have: clear risk, practical evidence, and fixes that a product owner can understand.</p>
          <Link href="/security-notes?from=home" className="mt-7 inline-flex items-center gap-2 bg-mint px-4 py-3 font-bold text-ink hover:bg-white">Open notes<ArrowUpRight size={16} /></Link>
        </div>
        <div className="grid gap-4">
          {highest.map((note) => (
            <article key={note.title} className="grid gap-4 border border-white/10 bg-panel/75 p-5 md:grid-cols-[0.24fr_0.76fr]">
              <div><p className="font-mono text-xs uppercase text-amber">{note.rating}</p><h3 className="mt-2 font-black text-white">{note.title}</h3></div>
              <div className="text-sm leading-7 text-white/62"><p><span className="font-bold text-white">Risk:</span> {note.risk}</p><p className="mt-2"><span className="font-bold text-mint">Fix:</span> {note.remediation}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
