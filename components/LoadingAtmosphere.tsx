"use client";

import { useEffect, useMemo, useState } from "react";

const scenes = [
  { src: "/videos/operator-cockpit-reveal.mp4", label: "Operator cockpit", poster: "/images/operator-cockpit.jpeg", fit: "cover" },
  { src: "/brand/waskizone/video/logo-reveal.mp4", label: "Logo reveal", poster: "/images/operator-cockpit.jpeg", fit: "contain" },
  { src: "/brand/waskizone/video/system-construction.mp4", label: "System construction", poster: "/images/operator-cockpit.jpeg", fit: "contain" },
  { src: "/brand/waskizone/video/software-brand-reveal.mp4", label: "Software brand reveal", poster: "/images/operator-cockpit.jpeg", fit: "contain" },
  { src: "/brand/waskizone/video/route-signal-reveal.mp4", label: "Route signal reveal", poster: "/images/operator-cockpit.jpeg", fit: "contain" },
  { src: "/brand/waskizone/video/particle-network-reveal.mp4", label: "Particle network reveal", poster: "/images/operator-cockpit.jpeg", fit: "contain" },
] as const;

type LoadingAtmosphereProps = {
  eyebrow: string;
  title?: string;
  autoDismiss?: boolean;
  showSkip?: boolean;
  duration?: number;
};

export function LoadingAtmosphere({ eyebrow, title, autoDismiss = false, showSkip = false, duration = 5200 }: LoadingAtmosphereProps) {
  const [scene, setScene] = useState<(typeof scenes)[number] | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const selectTimer = window.setTimeout(() => {
      setScene(scenes[Math.floor(Math.random() * scenes.length)]);
    }, 0);
    return () => window.clearTimeout(selectTimer);
  }, []);

  useEffect(() => {
    if (!autoDismiss || !scene) return;
    const closeTimer = window.setTimeout(() => setVisible(false), duration);
    return () => window.clearTimeout(closeTimer);
  }, [autoDismiss, duration, scene]);

  const videoClassName = useMemo(() => {
    const base = "absolute inset-0 h-full w-full object-center opacity-70 mix-blend-screen saturate-150 contrast-125";
    if (scene?.fit === "contain") return `${base} object-cover scale-[1.14] sm:scale-[1.04]`;
    return `${base} scale-[1.04] object-cover`;
  }, [scene?.fit]);

  if (!visible) return null;

  return (
    <div
      className="fixed left-0 top-0 z-[100] h-[125vh] w-[125vw] overflow-hidden bg-ink bg-cover bg-center text-white"
      style={{ backgroundImage: "linear-gradient(180deg, rgba(3,6,5,0.22), rgba(3,6,5,0.96)), url('/images/operator-cockpit.jpeg')" }}
    >
      {scene && <video
        src={scene.src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={scene.poster}
        onLoadedMetadata={(event) => { event.currentTarget.playbackRate = 3; }}
        className={videoClassName}
        aria-label={`${eyebrow} ${scene.label}`}
      />}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_38%,rgba(0,220,255,0.08),rgba(3,6,5,0.70)_58%,rgba(3,6,5,0.97))]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,31,48,0.16),transparent_36%,rgba(0,190,255,0.12))]" />
      <div className="absolute inset-0 cyber-grid opacity-[0.18]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink via-ink/82 to-transparent" />
      <div className="relative flex min-h-[125vh] flex-col justify-end gap-4 p-4 sm:flex-row sm:items-end sm:justify-between sm:p-8">
        <div className="max-w-xl pb-2 sm:pb-4">
          <p className="font-mono text-xs uppercase text-mint">{eyebrow}</p>
          {title && <p className="mt-2 text-xl font-black leading-tight text-white sm:text-2xl md:text-4xl">{title}</p>}
        </div>
        {showSkip && <button type="button" onClick={() => setVisible(false)} className="mb-2 w-fit shrink-0 border border-white/18 bg-ink/55 px-4 py-3 text-xs font-bold text-white/70 backdrop-blur-md hover:border-mint hover:text-mint sm:mb-4">Skip</button>}
      </div>
    </div>
  );
}
