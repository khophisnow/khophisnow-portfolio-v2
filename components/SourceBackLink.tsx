"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";

type SourceTarget = { href: string; label: string };

function BackLink({ target }: { target: SourceTarget }) {
  return (
    <Link href={target.href} className="inline-flex items-center gap-2 text-sm font-bold text-mint hover:text-white">
      <ArrowLeft size={16} />
      {target.label}
    </Link>
  );
}

function SourceBackLinkInner({ fallback, sources }: { fallback: SourceTarget; sources: Record<string, SourceTarget> }) {
  const source = useSearchParams().get("from") || "";
  const target = sources[source] ?? fallback;
  return <BackLink target={target} />;
}

export function SourceBackLink({ fallback, sources }: { fallback: SourceTarget; sources: Record<string, SourceTarget> }) {
  return (
    <Suspense fallback={<BackLink target={fallback} />}>
      <SourceBackLinkInner fallback={fallback} sources={sources} />
    </Suspense>
  );
}
