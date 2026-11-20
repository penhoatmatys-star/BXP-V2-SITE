"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import type { GlobeMarker } from "@/components/ui/cobe-globe";

const Globe = dynamic(() => import("@/components/ui/cobe-globe").then((m) => m.Globe), { ssr: false });

// Malta, Switzerland and Hungary are open; the others are in negotiation and show "Coming soon".
const PLACES: (GlobeMarker & { country: string; open: boolean })[] = [
  { id: "mt", country: "Malta", label: "Malta", location: [35.9, 14.5], labelOffset: 10, open: true },
  { id: "ch", country: "Switzerland", label: "Switzerland", location: [46.8, 8.2], labelOffset: 44, open: true },
  { id: "hu", country: "Hungary", label: "Hungary", location: [47.5, 19.04], labelOffset: 78, open: true },
  { id: "it", country: "Italy", label: "Italy", location: [41.9, 12.5], labelOffset: 112, open: false },
  { id: "hr", country: "Croatia", label: "Croatia", location: [45.81, 15.98], labelOffset: 146, open: false },
  { id: "ca", country: "Canada", label: "Canada", location: [45.4, -75.7], labelOffset: 10, open: false },
  { id: "us", country: "USA", label: "USA", location: [38.9, -77.0], labelOffset: 10, open: false },
  { id: "ae", country: "Emirates", label: "Emirates", location: [24.5, 54.4], labelOffset: 10, open: false },
  { id: "au", country: "Australia", label: "Australia", location: [-35.3, 149.1], labelOffset: 10, open: false },
];
// Italy and Croatia stay off the globe: five labels on one small region would overlap.
const MARKERS: GlobeMarker[] = PLACES.filter((p) => p.id !== "it" && p.id !== "hr").map(({ id, label, location, labelOffset }) => ({ id, label, location, labelOffset }));

export function Destinations() {
  return (
    <section id="locations" aria-labelledby="dest-title" className="relative overflow-hidden border-t border-line bg-pitch scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
        <div>
          <h2 id="dest-title" className="display max-w-[12ch] text-[clamp(2.4rem,6vw,4.6rem)] uppercase">
            Football knows <span className="text-gold">no borders.</span>
          </h2>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-mute">
            Train in new football environments around the world. Venues and availability are confirmed during your application.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-px sm:grid-cols-3 overflow-hidden rounded-xl border border-line bg-line">
            {PLACES.map((p) => (
              <li key={p.id} className="flex items-center gap-3 bg-night px-4 py-5 last:col-span-2 sm:px-5 sm:last:col-span-1">
                <MapPin aria-hidden className={p.open ? "size-5 shrink-0 text-gold" : "size-5 shrink-0 text-mute/60"} strokeWidth={1.8} />
                <span className={p.open ? "" : "text-chalk/60"}>
                  <span className="wide block text-base font-bold uppercase tracking-[0.04em] sm:text-lg">{p.country}</span>
                  <span className={p.open ? "wide block text-xs font-semibold uppercase tracking-[0.12em] text-gold" : "wide block text-xs font-semibold uppercase tracking-[0.12em] text-mute"}>
                    {p.open ? "Open" : "Coming soon"}
                  </span>
                </span>
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
          />
        </div>
      </div>
    </section>
  );
}
