"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";

const STEPS = [
  { title: "Create your account", text: "One BXP account, one player profile, secure upload of the documents that are needed." },
  { title: "Choose and confirm", text: "Pick an available date and position, then pay in your BXP account." },
  { title: "Prepare and train", text: "Open your Welcome Pack, your schedule and your preparation programs." },
  { title: "Receive your BXP DNA", text: "Staff review your results and set your development priorities." },
];

/** The path from sign-up to report, with a gold line that fills as you read it. */
export function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section aria-labelledby="journey-title" className="border-t border-line bg-pitch py-24 md:py-36">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 id="journey-title" className="display max-w-[12ch] text-[clamp(2.4rem,6vw,4.6rem)] uppercase">
            Simple for you. <span className="text-gold">Structured behind it.</span>
          </h2>
          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-mute">
            Four steps from your first click to your report, all inside the BXP account you already use.
          </p>
        </div>

        <ol ref={ref} className="relative grid gap-12 pl-14 sm:pl-20">
          <span aria-hidden className="absolute bottom-2 left-[1.1rem] top-2 w-px bg-line sm:left-[1.6rem]" />
          <motion.span
            aria-hidden
            style={{ scaleY: fill }}
            className="absolute bottom-2 left-[1.1rem] top-2 w-px origin-top bg-gold sm:left-[1.6rem]"
          />
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative">
              <span className="display tabular absolute -left-14 top-0 grid size-9 place-items-center rounded-full border border-gold/50 bg-night text-sm text-gold sm:-left-20 sm:size-[3.25rem] sm:text-lg">
                {i + 1}
              </span>
              <h3 className="wide text-2xl font-bold uppercase tracking-[0.02em] sm:text-3xl">{s.title}</h3>
              <p className="mt-3 max-w-[46ch] text-lg leading-relaxed text-mute">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
