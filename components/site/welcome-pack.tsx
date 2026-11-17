"use client";

import { useState } from "react";
import { Apple, CalendarRange, Dumbbell, FlaskConical, Infinity as Loop, Lock, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = {
  id: string;
  kind: "Digital" | "Physical" | "Planning";
  icon: typeof Dumbbell;
  name: string;
  text: string;
  when: string;
  alt: string;
};

// The six components from the memorandum (section 04). Wording on suitability
// and approval is deliberate: physical products are not promised to everyone.
const ITEMS: Item[] = [
  { id: "physical", kind: "Digital", icon: Dumbbell, name: "Physical preparation", text: "A preparatory athletic plan, so you arrive at Discover Week ready to be tested.", when: "Unlocks once payment is confirmed.", alt: "Kettlebell, resistance band and training cones on a floodlit pitch at night" },
  { id: "nutrition", kind: "Digital", icon: Apple, name: "Nutrition preparation", text: "Preparatory nutrition guidance, with room for individual adaptation by a qualified professional.", when: "Unlocks once payment is confirmed.", alt: "A bowl of chicken, rice and avocado with a banana and a water bottle" },
  { id: "pre", kind: "Physical", icon: FlaskConical, name: "Pre-workout", text: "A proposed product, subject to age, suitability checks and final terms.", when: "Shipped only after a suitability check.", alt: "A plain black shaker bottle and a scoop of powder on a bench" },
  { id: "post", kind: "Physical", icon: RotateCcw, name: "Post-workout", text: "A proposed product, subject to age, suitability checks and final terms.", when: "Shipped only after a suitability check.", alt: "A foam roller and a black bottle on a dark gym floor beside football boots" },
  { id: "maintenance", kind: "Digital", icon: Loop, name: "Maintenance plan", text: "Training and nutrition support for the weeks after your experience.", when: "Available after Discover Week.", alt: "An empty training pitch at dawn with cones leading into the mist" },
  { id: "planning", kind: "Planning", icon: CalendarRange, name: "Discover Week planning", text: "Your schedule: sessions, appointments, venues and every practical detail.", when: "Published before you travel.", alt: "A packed sports bag, football boots, a passport and a weekly schedule" },
];

export function WelcomePack() {
  const [sel, setSel] = useState(0);
  const item = ITEMS[sel];

  return (
    <section id="welcome-pack" aria-labelledby="pack-title" className="scroll-mt-20 bg-night py-24 md:py-36">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <h2 id="pack-title" className="display max-w-[15ch] text-[clamp(2.4rem,6vw,4.6rem)] uppercase">
            Your Welcome Pack. <span className="text-silver">Before you arrive.</span>
          </h2>
          <p className="max-w-[42ch] text-lg leading-relaxed text-mute">
            Know exactly what you receive before checkout. Eligible items open in your BXP account once payment is confirmed.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
          <div role="tablist" aria-label="Welcome Pack contents" aria-orientation="vertical" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {ITEMS.map((it, i) => {
              const I = it.icon;
              const on = i === sel;
              return (
                <button
                  key={it.id}
                  role="tab"
                  id={`pack-tab-${it.id}`}
                  aria-selected={on}
                  aria-controls="pack-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setSel(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); setSel((sel + 1) % ITEMS.length); }
                    if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); setSel((sel - 1 + ITEMS.length) % ITEMS.length); }
                  }}
                  className={cn(
                    "group flex items-center gap-4 rounded-xl border px-4 py-4 text-left transition-colors",
                    on ? "border-gold/60 bg-gold/[0.08]" : "border-line bg-pitch hover:border-silver/40",
                  )}
                >
                  <I aria-hidden className={cn("size-5 shrink-0", on ? "text-gold" : "text-mute group-hover:text-chalk")} strokeWidth={1.8} />
                  <span className="wide flex-1 font-semibold uppercase tracking-[0.04em]">{it.name}</span>
                  <span className={cn("text-xs uppercase tracking-[0.12em]", on ? "text-gold" : "text-mute")}>{it.kind}</span>
                </button>
              );
            })}
          </div>

          <div
            id="pack-panel"
            role="tabpanel"
            aria-labelledby={`pack-tab-${item.id}`}
            className="relative flex min-h-[360px] flex-col overflow-hidden rounded-2xl border border-line bg-stand p-7 sm:p-10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={`img-${item.id}`}
              src={`/img/pack-${item.id}.webp`}
              alt={item.alt}
              width={1200}
              height={900}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover motion-safe:animate-[fadeUp_.6s_cubic-bezier(.22,1,.36,1)]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/40 to-transparent" />
            <span className="wide relative text-sm font-semibold uppercase tracking-[0.14em] text-gold">{item.kind}</span>
            <h3 key={item.id} className="display relative mt-4 text-[clamp(2rem,4.4vw,3.6rem)] uppercase motion-safe:animate-[fadeUp_.6s_cubic-bezier(.22,1,.36,1)]">
              {item.name}
            </h3>
            <p className="relative mt-5 max-w-[44ch] text-lg leading-relaxed text-chalk/85">{item.text}</p>
            <p className="relative mt-auto flex items-center gap-2 pt-10 text-sm text-mute">
              <Lock aria-hidden className="size-4 text-gold" /> {item.when}
            </p>
          </div>
        </div>

        <p className="mt-6 max-w-[80ch] text-sm leading-relaxed text-mute">
          Final pack contents, product availability and delivery terms are confirmed by BXP before publication. Personalised plans are approved by a qualified professional.
        </p>
      </div>
    </section>
  );
}
