"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import type { GlobeMarker } from "@/components/ui/cobe-globe";

const Globe = dynamic(() => import("@/components/ui/cobe-globe").then((m) => m.Globe), { ssr: false });

const PLACES: (GlobeMarker & { country: string })[] = [
  { id: "mt", country: "Malta", label: "Malta", location: [35.9, 14.5], labelOffset: 10 },
  { id: "hu", country: "Hungary", label: "Hungary", location: [47.5, 19.04], labelOffset: 44 },
  { id: "es", country: "Spain", label: "Spain", location: [40.42, -3.7], labelOffset: 10 },
  { id: "hr", country: "Croatia", label: "Croatia", location: [45.81, 15.98], labelOffset: 76 },
];
const MARKERS: GlobeMarker[] = PLACES.map(({ id, label, location, labelOffset }) => ({ id, label, location, labelOffset }));

export function Destinations() {
  return (
    <section aria-labelledby="dest-title" className="relative overflow-hidden border-t border-line bg-pitch py-24 md:py-32">
      <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
        <div>
          <h2 id="dest-title" className="display max-w-[12ch] text-[clamp(2.4rem,6vw,4.6rem)] uppercase">
            Football knows <span className="text-gold">no borders.</span>
          </h2>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-mute">
            Train in new football environments across Europe. Venues and availability are confirmed during your application.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
            {PLACES.map((p) => (
              <li key={p.id} className="flex items-center gap-3 bg-night px-4 py-5 sm:px-5">
                <MapPin aria-hidden className="size-5 text-gold" strokeWidth={1.8} />
                <span className="wide text-base font-bold uppercase tracking-[0.04em] sm:text-lg">{p.country}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative mx-auto w-full max-w-[560px]">
          <div aria-hidden className="absolute inset-[12%] rounded-full bg-gold/10 blur-3xl" />
          <Globe
            markers={MARKERS}
            className="relative"
            baseColor={[0.16, 0.16, 0.17]}
            markerColor={[0.9, 0.74, 0.32]}
            glowColor={[0.35, 0.29, 0.14]}
            dark={1}
            diffuse={1.2}
            mapBrightness={5}
            markerSize={0.05}
            theta={0.62}
            initialPhi={-0.3}
            oscillate
            oscillateAmplitude={0.35}
          />
        </div>
      </div>
    </section>
  );
}
