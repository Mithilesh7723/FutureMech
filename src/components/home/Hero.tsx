"use client";

import dynamic from "next/dynamic";

const HeroScrub = dynamic(
  () => import("@/components/ui/HeroScrub").then((m) => m.HeroScrub),
  { ssr: false }
);

export function Hero() {
  return (
    <HeroScrub
      frameCount={240}
      frameUrl={(i) => `/hero-frames-new/frame-${String(i + 1).padStart(4, "0")}.webp`}
    />
  );
}
