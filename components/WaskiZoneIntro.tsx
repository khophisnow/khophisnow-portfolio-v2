"use client";

import { useEffect, useState } from "react";

const loaders = [
  { src: "/brand/waskizone/video/logo-reveal.mp4", duration: 5200, speed: 2, label: "Logo reveal" },
  { src: "/brand/waskizone/video/system-construction.mp4", duration: 5200, speed: 2, label: "System construction" },
  { src: "/brand/waskizone/video/software-brand-reveal.mp4", duration: 5200, speed: 2, label: "Software brand reveal" },
  { src: "/brand/waskizone/video/route-signal-reveal.mp4", duration: 5200, speed: 2, label: "Route signal reveal" },
  { src: "/brand/waskizone/video/particle-network-reveal.mp4", duration: 5200, speed: 2, label: "Particle network reveal" },
] as const;

export function WaskiZoneIntro() {
  const [loader, setLoader] = useState<(typeof loaders)[number] | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let closeTimer: number | undefined;
    const selectTimer = window.setTimeout(() => {
      const selected = loaders[Math.floor(Math.random() * loaders.length)];
      setLoader(selected);
      closeTimer = window.setTimeout(() => setVisible(false), selected.duration);
    }, 0);
    return () => {
      window.clearTimeout(selectTimer);
      if (closeTimer) window.clearTimeout(closeTimer);
    };
  }, []);

  if (!visible || !loader) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-ink text-white">
      <video
        src={loader.src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedMetadata={(event) => { event.currentTarget.playbackRate = loader.speed; }}
        className="absolute inset-0 h-full w-full object-cover opacity-95 mix-blend-screen"
        aria-label={`WaskiZone ${loader.label}`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(3,6,5,0.05),rgba(3,6,5,0.76)_72%,rgba(3,6,5,0.94))]" />
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-ink via-ink/72 to-transparent" />
      <div className="relative flex min-h-screen items-end justify-between gap-4 p-5 sm:p-8">
        <div className="max-w-xl pb-4">
          <p className="font-mono text-xs uppercase text-mint">Launching WaskiZone</p>
          <p className="mt-2 text-2xl font-black text-white md:text-4xl">Practical software. Security-minded systems.</p>
        </div>
        <button type="button" onClick={() => setVisible(false)} className="mb-4 shrink-0 border border-white/18 bg-ink/45 px-4 py-3 text-xs font-bold text-white/70 backdrop-blur hover:border-mint hover:text-mint">Skip</button>
      </div>
    </div>
  );
}
