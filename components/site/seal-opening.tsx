"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import { SealCard, SealGlow } from "@/components/site/brand-seal";

const GLASS_MS = 1000; // glass reveal plays this long before the card starts to open
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * No input needed: as soon as the visitor scrolls down onto the seal, the
 * page snaps to it, the glass reveal plays, the card zooms into them, and the
 * page opens onto the children ("Football knows no borders"). Scrolling is
 * locked while it runs.
 * It plays once, going down: the seal is then removed, so scrolling back up
 * goes straight past it.
 * Reduced motion: plain stacked blocks, no hijack.
 */
export function SealOpening({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const seal = useRef<HTMLElement>(null);
  const next = useRef<HTMLDivElement>(null);
  const scale = useMotionValue(1);
  const fade = useMotionValue(1);
  const reveal = useMotionValue(1);
  const [gone, setGone] = useState(false); // once opened, the seal is removed: scrolling back up skips it

  useEffect(() => {
    if (reduce) return;
    let locked = false;
    let done = false;
    let lockY = 0;
    let snapping = false;
    let lastY = window.scrollY;
    const el = () => seal.current;

    // Restored far below the seal (reload): nothing to play, drop it and keep the view.
    const first = el();
    if (first && first.getBoundingClientRect().bottom < -window.innerHeight * 0.5) {
      const h = first.offsetHeight;
      flushSync(() => setGone(true));
      window.scrollBy({ top: -h, behavior: "instant" });
      return;
    }

    // Any downward scroll with the seal at or above 40% of the screen plays it, however far
    // (or fast) the visitor got: a fast flick that overshoots is pulled back to the seal.
    const due = () => {
      const s = el();
      return !!s && !done && s.getBoundingClientRect().top < window.innerHeight - 2;
    };

    async function run() {
      locked = true;
      try {
        const s = el()!;
        lockY = window.scrollY + s.getBoundingClientRect().top;
        s.querySelector<HTMLElement>('[aria-label="BXP Best for Performance"]')?.click(); // replay the glass
        const from = window.scrollY;
        snapping = true;
        await animate(0, 1, {
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
          onUpdate: (t) => window.scrollTo({ top: from + (lockY - from) * t, behavior: "instant" }),
        });
        snapping = false;
        await sleep(GLASS_MS);
        await Promise.all([
          animate(scale, 7, { duration: 0.65, ease: [0.7, 0, 0.84, 0] }),
          animate(fade, 0, { duration: 0.3, delay: 0.35 }),
        ]);
        reveal.set(0);
        flushSync(() => setGone(true));
        lockY = window.scrollY + next.current!.getBoundingClientRect().top;
        window.scrollTo({ top: lockY, behavior: "instant" });
        done = true;
        await animate(reveal, 1, { duration: 0.5, ease: "easeOut" });
      } finally {
        snapping = false;
        reveal.set(1);
        locked = false;
      }
    }

    const onScroll = () => {
      const y = window.scrollY;
      const down = y > lastY;
      lastY = y;
      if (snapping) lastY = y;
      else if (locked) {
        if (Math.abs(y - lockY) > 1) window.scrollTo({ top: lockY, behavior: "instant" }); // scrollbar drag, inertia
        lastY = lockY;
      } else if (down && due()) void run();
    };
    const block = (e: Event) => { if (locked) e.preventDefault(); };
    const onKey = (e: KeyboardEvent) => { if (locked && !e.metaKey && !e.ctrlKey) e.preventDefault(); };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", block, { passive: false });
    window.addEventListener("touchmove", block, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", block);
      window.removeEventListener("touchmove", block);
      window.removeEventListener("keydown", onKey);
    };
  }, [reduce, scale, fade, reveal]);

  return (
    <>
      {!gone && (
      <section
        ref={seal}
        aria-label="BXP, Best for Performance"
        className="relative isolate flex min-h-screen items-center overflow-hidden border-t border-line bg-night py-16"
      >
        <SealGlow />
        <motion.div style={{ scale, opacity: fade }} className="mx-auto w-full max-w-[1320px] origin-center px-4 sm:px-6 lg:px-10">
          <SealCard />
        </motion.div>
      </section>
      )}
      <motion.div ref={next} style={{ opacity: reveal }}>
        {children}
      </motion.div>
    </>
  );
}
