"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function NavigationMemoryInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    const current = `${pathname}${query ? `?${query}` : ""}`;
    const previous = window.sessionStorage.getItem("khophi:currentPath");

    if (previous && previous !== current) {
      window.sessionStorage.setItem("khophi:previousPath", previous);
    }

    window.sessionStorage.setItem("khophi:currentPath", current);
  }, [pathname, searchParams]);

  return null;
}

export function NavigationMemory() {
  return (
    <Suspense fallback={null}>
      <NavigationMemoryInner />
    </Suspense>
  );
}
