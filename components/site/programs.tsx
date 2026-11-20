"use client";

import { useState } from "react";
import { ArrowUpRight, Radio } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { TiltCard } from "@/components/ui/tilt-card";
import { SITE, mail } from "@/lib/site";
import { cn } from "@/lib/utils";

// Three products. TODO: Weekly price and BXP Next description still to be supplied by BXP.
const PROGRAMS = [
  {
    id: "weekly",
    bg: "evolve",
    name: "Weekly Program",
    line: "With a coach",
    price: null as string | null,
    text: "A weekly program led by a coach, built around the BXP evaluation system.",
    href: SITE.apply,
    cta: "Apply",
  },
  {
    id: "next",
    bg: "accelerate",
    name: "Next",
    line: "After the Weekly",
    price: "On request",
    text: "The follow-up to the Weekly Program: the player moves to a new club, or goes back to play at his original club.",
    href: mail("BXP Next information"),
    cta: "Ask about Next",
  },
  {
    id: "pro",
    bg: "signature",
    name: "Pro",
    line: "Platform",
    price: "Tailor-made",
    text: "The BXP software platform in white label for institutions: clubs, academies and B2B partners. Also for families, groups and categories.",
    href: mail("BXP Pro white label"),
    cta: "Request BXP Pro",
  },
];

/**
 * A rail of programs. On a wide screen the one under the pointer or focus
 * opens and the others fold to their name, so the visitor compares by moving,
 * not by reading four equal boxes. On a phone it is a plain stacked list.
 */
export function Programs() {
  const [active, setActive] = useState(0);

  return (
    <section id="programs" aria-labelledby="programs-title" className="scroll-mt-20 border-t border-line bg-pitch py-24 md:py-36">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <h2 id="programs-title" className="display max-w-[14ch] text-[clamp(2.4rem,6vw,4.6rem)] uppercase">
            Every talent. <span className="text-gold">Its own path.</span>
          </h2>
          <p className="max-w-[40ch] text-lg leading-relaxed text-mute">
            From your first assessment to continuous development: choose the pathway that fits your goal.
          </p>
        </div>

        <ul className="mt-14 flex flex-col gap-3 lg:h-[460px] lg:flex-row">
          {PROGRAMS.map((p, i) => {
            const open = active === i;
            return (
              <li
                key={p.id}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={cn(
                  "relative rounded-2xl border border-line bg-stand transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:min-w-0",
                  open ? "lg:grow-[3.2]" : "lg:grow",
                )}
                style={{ flexBasis: 0 }}
              >
                <GlowingEffect spread={44} glow proximity={80} inactiveZone={0.05} borderWidth={2} />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[inherit] p-6 sm:p-8">
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(/img/programs/${p.bg}.svg)` }}
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-stand/90 via-stand/30 to-transparent" />
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="wide text-sm font-semibold uppercase tracking-[0.14em] text-gold">{p.line}</span>
                  </div>
                  <h3 className="display relative mt-auto pt-10 text-[clamp(2.2rem,4vw,3.4rem)] uppercase lg:whitespace-nowrap">
                    <span className="text-silver">BXP</span> {p.name}
                  </h3>
                  <div
                    className={cn(
                      "relative grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      open ? "grid-rows-[1fr] opacity-100" : "lg:grid-rows-[0fr] lg:opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      {p.price && <p className="wide mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-silver">{p.price}</p>}
                      <p className="mt-2 max-w-[40ch] leading-relaxed text-chalk/80">{p.text}</p>
                      <a
                        href={p.href}
                        className="wide mt-6 inline-flex items-center gap-1.5 border-b border-gold/60 pb-1 text-sm font-bold uppercase tracking-[0.08em] text-gold transition-colors hover:border-gold-lit hover:text-gold-lit"
                      >
                        {p.cta} <ArrowUpRight aria-hidden className="size-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <TiltCard tiltLimit={3} scale={1.01} className="mt-3 flex flex-col gap-4 rounded-2xl border border-line bg-night p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-gold/30 bg-gold/10 text-gold">
              <Radio aria-hidden className="size-5" />
            </span>
            <div>
              <h3 className="wide text-lg font-bold uppercase tracking-[0.04em]">BXP Family Live</h3>
              <p className="mt-1 text-mute">For families: follow matches and progress, wherever the service is available.</p>
            </div>
          </div>
          <a
            href={mail("BXP Family Live information")}
            className="wide inline-flex shrink-0 items-center gap-1.5 text-sm font-bold uppercase tracking-[0.08em] text-gold hover:text-gold-lit"
          >
            Learn more <ArrowUpRight aria-hidden className="size-4" />
          </a>
        </TiltCard>
      </div>
    </section>
  );
}
