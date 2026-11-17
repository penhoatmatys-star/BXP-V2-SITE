"use client";

import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/ui/scroll-velocity";

const AUDIENCES = ["Players", "Families", "Clubs", "Agents", "Academies", "Associations", "Federations"];

/** The fold strip: who BXP is for, running at the speed the visitor scrolls. */
export function Audiences() {
  return (
    <section aria-labelledby="audiences-title" className="relative border-y border-line bg-pitch py-6">
      <h2 id="audiences-title" className="sr-only">
        One ecosystem, more opportunities: BXP works with players, families, clubs, agents, academies, associations and federations.
      </h2>
      <ScrollVelocityContainer aria-hidden className="select-none">
        <ScrollVelocityRow baseVelocity={2.2} direction={-1}>
          {AUDIENCES.map((a) => (
            <span key={a} className="display mx-6 inline-flex items-center gap-12 text-4xl uppercase text-chalk/90 md:text-6xl">
              {a}
              <span className="inline-block h-[0.14em] w-[0.9em] -skew-x-[30deg] bg-gold" />
            </span>
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </section>
  );
}
