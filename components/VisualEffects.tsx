"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Terminal } from "lucide-react";

const bootLines = [
  "initializing khophisnow cockpit",
  "loading builder / breaker / trainer modes",
  "mounting case files and API evidence",
  "security posture: curious, ethical, defensive",
];

export function VisualEffects() {
  const [bootVisible, setBootVisible] = useState(true);
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
    const timer = window.setTimeout(() => setBootVisible(false), 2400);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.clearTimeout(timer);
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

      {bootVisible && (
        <div className="boot-screen fixed inset-0 z-[80] flex items-center justify-center bg-ink px-5 text-white">
          <div className="w-full max-w-2xl border border-mint/30 bg-panel/95 p-5 shadow-terminal">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <Terminal className="text-mint" size={18} />
              <span className="font-mono text-xs text-white/55">boot.sequence</span>
            </div>
            <div className="mt-6 space-y-3 font-mono text-sm">
              {bootLines.map((line, index) => (
                <p key={line} className="boot-line text-white/70" style={{ animationDelay: `${index * 180}ms` }}>
                  <span className="text-mint">[{String(index + 1).padStart(2, "0")}]</span> {line}
                </p>
              ))}
            </div>
            <div className="mt-7 flex items-center gap-3 text-mint">
              <ShieldCheck size={18} />
              <span className="font-mono text-xs">ready for secure systems</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
