"use client";

import { LoadingAtmosphere } from "@/components/LoadingAtmosphere";

export function WaskiZoneIntro() {
  return (
    <LoadingAtmosphere
      eyebrow="Launching WaskiZone"
      title="Practical software. Security-minded systems."
      autoDismiss
      showSkip
    />
  );
}
