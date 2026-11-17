import { ArrowUpRight, CalendarDays, ClipboardCheck, Dna, ShieldCheck } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { SITE } from "@/lib/site";

const FACTS = [
  { icon: CalendarDays, title: "One week", text: "Train in a new football environment, with daily sessions and a set agenda." },
  { icon: ClipboardCheck, title: "On-pitch assessment", text: "Field tests and coach observations, scored against BXP's 1–10 rubric." },
  { icon: Dna, title: "BXP DNA report", text: "Your results become a development profile, reviewed by staff before you see it." },
];

export function Discover() {
  return (
    <section id="discover" aria-labelledby="discover-title" className="scroll-mt-20 bg-night py-24 md:py-36">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <h2 id="discover-title" className="display max-w-[16ch] text-[clamp(2.4rem,6vw,4.6rem)] uppercase">
            Step onto the pitch. <span className="text-silver">See how far you can go.</span>
          </h2>
          <p className="max-w-[42ch] text-lg leading-relaxed text-mute">
            BXP Discover is where it starts: an intensive football week that turns potential into goals you can act on.
          </p>
        </div>

        <article className="relative mt-14 grid overflow-hidden rounded-2xl border border-line bg-pitch lg:grid-cols-[1.05fr_1fr]">
          <BorderBeam size={260} duration={12} borderWidth={1.5} />
          <div className="relative min-h-[300px] sm:min-h-[420px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/stadium.webp"
              alt="Two BXP players walk down a stadium tunnel toward the floodlit pitch"
              loading="lazy"
              width={1600}
              height={900}
              className="absolute inset-0 h-full w-full object-cover object-[60%_center]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-pitch via-pitch/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-pitch" />
            <span className="wide absolute left-5 top-5 rounded bg-gold px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-night">
              Featured program
            </span>
          </div>

          <div className="flex flex-col p-6 sm:p-10 lg:p-12">
            <h3 className="display text-[clamp(2.6rem,5vw,4.4rem)] uppercase">
              BXP <span className="text-gold">Discover</span>
            </h3>
            <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-chalk/80">
              One week to challenge yourself, train in a new environment and receive a structured assessment.
            </p>

            <ul className="mt-8 grid gap-5">
              {FACTS.map(({ icon: Icon, title, text }) => (
                <li key={title} className="grid grid-cols-[2.75rem_1fr] gap-4 border-t border-line pt-5">
                  <span className="grid size-11 place-items-center rounded-lg border border-gold/30 bg-gold/10 text-gold">
                    <Icon aria-hidden className="size-5" strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="wide block font-bold uppercase tracking-[0.04em]">{title}</span>
                    <span className="mt-1 block leading-relaxed text-mute">{text}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={SITE.apply}
                className="wide inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-4 text-sm font-bold uppercase tracking-[0.06em] text-night transition-colors hover:bg-gold-lit"
              >
                Start your application <ArrowUpRight aria-hidden className="size-5" strokeWidth={2.4} />
              </a>
              <a
                href="#welcome-pack"
                className="wide inline-flex items-center justify-center gap-2 rounded-md border border-silver/35 px-6 py-4 text-sm font-semibold uppercase tracking-[0.06em] transition-colors hover:border-gold hover:text-gold"
              >
                What is included
              </a>
            </div>
            <p className="mt-6 flex gap-2 text-sm leading-relaxed text-mute">
              <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" />
              Dates, places by playing position, final price and terms are confirmed in the official BXP application before payment. BXP does not guarantee contracts, trials or selection.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
