"use client";

import { GlassIconReveal } from "@/components/ui/liquid-glass-logo-reveal";
import { ShaderBackground } from "@/components/ui/shader-background";
import { TiltCard } from "@/components/ui/tilt-card";

/** The BXP seal: liquid-glass mark on a gold glow, in a card that tilts away from the pointer. */
export function SealCard() {
  return (
    <div className="flex w-full flex-col items-center">
      <TiltCard effect="evade" tiltLimit={9} scale={1.02} className="w-full max-w-[560px] rounded-3xl border border-gold/25 bg-night shadow-[0_40px_120px_-40px_rgba(230,189,81,0.35)]">
        <GlassIconReveal
          logo="/img/bxp-mark-alpha.png"
          look="dark"
          label="BXP Best for Performance"
          background="#070708"
          plateColor="#0d0e0f"
          originalColors
          logoScale={0.86}
          finalScale={0.92}
          loop={false}
          tuning={{ present: 1.1 }}
          speed={1.5}
          className="aspect-[4/3] w-full"
        />
      </TiltCard>
      <p className="wide mt-8 text-sm font-semibold uppercase tracking-[0.22em] text-gold">Best for Performance</p>
    </div>
  );
}

export function SealGlow() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_30%,transparent_100%)]">
      <ShaderBackground />
    </div>
  );
}
