"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Terminal } from "lucide-react";

const bootSequences = [
  {
    lines: [
      "initializing khophisnow cockpit",
      "loading builder / breaker / trainer modes",
      "mounting case files and API evidence",
      "security posture: curious, ethical, defensive",
    ],
    ready: "ready for secure systems",
  },
  {
    lines: [
      "syncing secure systems cockpit",
      "arming builder workflows and API maps",
      "indexing projects, writeups, and proof trail",
      "operator stance: build clean, test boundaries",
    ],
    ready: "cockpit online",
  },
  {
    lines: [
      "warming backend signal layer",
      "checking auth, roles, and tenant boundaries",
      "loading security lab and case evidence",
      "defensive mindset: curious, authorized, precise",
    ],
    ready: "secure route mounted",
  },
  {
    lines: [
      "starting khophisnow interface",
      "calibrating developer and breaker views",
      "mounting EduManage and WhatsUpUCC case files",
      "system posture: practical, ethical, production-aware",
    ],
    ready: "ready for secure systems",
  },
] as const;

type PortfolioBootLoaderProps = {
  autoDismiss?: boolean;
  duration?: number;
};

export function PortfolioBootLoader({ autoDismiss = false, duration = 1850 }: PortfolioBootLoaderProps) {
  const [visible, setVisible] = useState(true);
  const [sequence, setSequence] = useState<(typeof bootSequences)[number] | null>(null);

  useEffect(() => {
    const selectTimer = window.setTimeout(() => {
      const selected = bootSequences[Math.floor(Math.random() * bootSequences.length)];
      setSequence(selected);
    }, 0);
    return () => window.clearTimeout(selectTimer);
  }, []);

  useEffect(() => {
    if (!autoDismiss || !sequence) return;
    const closeTimer = window.setTimeout(() => setVisible(false), duration);
    return () => window.clearTimeout(closeTimer);
  }, [autoDismiss, duration, sequence]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden bg-ink bg-cover bg-center px-4 text-white"
      style={{ backgroundImage: "linear-gradient(180deg, rgba(3,6,5,0.20), rgba(3,6,5,0.96)), url('/images/operator-cockpit.jpeg')" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_38%,rgba(0,220,255,0.09),rgba(3,6,5,0.68)_58%,rgba(3,6,5,0.97))]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,31,48,0.15),transparent_34%,rgba(0,190,255,0.13))]" />
      <div className="absolute inset-0 cyber-grid opacity-[0.18]" />
      <div className="cockpit-sweep pointer-events-none absolute top-0 h-full w-1/2" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink via-ink/82 to-transparent" />

      <div className="relative flex min-h-screen items-center justify-center py-10">
        <section className="w-full max-w-2xl border border-mint/30 bg-ink/72 p-4 shadow-terminal backdrop-blur-xl sm:p-5">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <Terminal className="text-mint" size={18} />
            <span className="font-mono text-xs text-white/55">boot.sequence</span>
          </div>
          <div className="mt-6 min-h-[132px] space-y-3 font-mono text-xs leading-6 sm:min-h-[144px] sm:text-sm">
            {sequence?.lines.map((line, index) => (
              <p key={line} className="boot-line text-white/72" style={{ animationDelay: `${index * 220}ms` }}>
                <span className="text-mint">[{String(index + 1).padStart(2, "0")}]</span> {line}
              </p>
            ))}
          </div>
          <div className="mt-7 flex min-h-9 items-center gap-3 border-t border-white/10 pt-4 text-mint">
            {sequence && (
              <>
                <ShieldCheck size={18} />
                <span className="boot-line font-mono text-xs" style={{ animationDelay: "980ms" }}>{sequence.ready}</span>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
