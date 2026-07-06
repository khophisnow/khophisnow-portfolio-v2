"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";

type SourceTarget = { href: string; label: string };

function BackLink({ target, useHistory = true }: { target: SourceTarget; useHistory?: boolean }) {
  const pathname = usePathname();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!useHistory || typeof window === "undefined") return;

    const previous = window.sessionStorage.getItem("khophi:previousPath");
    if (!previous || previous === pathname || previous.startsWith(`${pathname}?`) || window.history.length <= 1) return;

    event.preventDefault();
    window.history.back();
  };

  return (
    <Link href={target.href} onClick={handleClick} className="inline-flex items-center gap-2 text-sm font-bold text-mint hover:text-white">
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
