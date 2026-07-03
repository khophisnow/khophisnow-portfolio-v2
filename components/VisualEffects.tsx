"use client";

import { useEffect } from "react";
import { PortfolioBootLoader } from "@/components/PortfolioBootLoader";

export function VisualEffects() {
  useEffect(() => {
    const savedMode = window.localStorage.getItem("khophisnow-mode") || "builder";
    document.documentElement.dataset.mode = savedMode;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      document.documentElement.style.setProperty("--scroll-y", String(window.scrollY));
      document.documentElement.style.setProperty("--scroll-progress", String(progress));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-white/5">
        <div className="scroll-progress h-full w-full" />
      </div>

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="cockpit-sweep absolute top-0 h-full w-1/2" />
      </div>

      <PortfolioBootLoader autoDismiss duration={1850} />
    </>
  );
}
