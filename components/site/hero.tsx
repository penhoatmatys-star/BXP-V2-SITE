"use client";

import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Pause, Play } from "lucide-react";
import Magnetic from "@/components/ui/magnetic";
import { SITE } from "@/lib/site";

/**
 * The hero ground: a 12 s film cut from BXP's own footage (the tunnel, a night
 * session, a line-up), graded black and gold. The poster is the complete
 * still hero; the film is refused on data saving or reduced motion, and the
 * visitor can pause it (WCAG 2.2.2).
 */
export function Hero() {
  const [film, setFilm] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    setFilm(!reduce && !conn?.saveData);
  }, []);

  const toggle = () => {
    const v = document.getElementById("hero-film") as HTMLVideoElement | null;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[86svh] md:min-h-[100svh] flex-col overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-20 bg-night">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/video/hero-poster.jpg" alt="" className="h-full w-full object-cover object-[30%_center]" fetchPriority="high" />
        {film && (
          <video
            id="hero-film"
            className="absolute inset-0 h-full w-full object-cover object-[30%_center]"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/video/hero-poster.jpg"
          >
            <source src="/video/hero-960.mp4" type="video/mp4" media="(max-width: 767px)" />
            <source src="/video/hero-1600.webm" type="video/webm" />
            <source src="/video/hero-1600.mp4" type="video/mp4" />
          </video>
        )}
      </div>
      <div aria-hidden className="hero-scrim absolute inset-0 -z-10" />

      <div className="mx-auto flex w-full max-w-[1320px] flex-1 flex-col justify-end px-4 pb-8 pt-24 sm:px-6 md:pb-12 lg:px-10">
        {/* Vertical cut reveal (after 21st.dev "vertical-cut-reveal"), done in CSS so
            the headline, the page's LCP, never waits on JavaScript to appear. */}
        <h1 id="hero-title" className="display max-w-[14ch] text-[clamp(1.9rem,min(8.5vw,13vh),5.2rem)] uppercase">
          {[["Your", "potential."], ["Your", "opportunity."]].map((line, l) => (
            <span key={l} className={l ? "block text-gold" : "block"}>
              {line.map((w, i) => (
                <span key={w} className="cut-word">
                  <span style={{ animationDelay: `${0.15 + (l * 2 + i) * 0.09}s` }}>{w}</span>
                  {i < line.length - 1 ? " " : ""}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-chalk/85 md:text-xl">
          Challenge yourself. Understand your level. Create new opportunities, on and off the pitch.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Magnetic>
            <a
              href={SITE.apply}
              className="wide group inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold px-7 py-4 text-[15px] font-bold uppercase tracking-[0.06em] text-night shadow-[0_14px_40px_-14px_rgba(230,189,81,0.7)] transition-colors hover:bg-gold-lit sm:w-auto"
            >
              Apply for BXP Discover
              <ArrowUpRight aria-hidden className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.4} />
            </a>
          </Magnetic>
          <a
            href="#discover"
            className="wide inline-flex items-center justify-center gap-2 rounded-md border border-silver/40 px-7 py-4 text-[15px] font-semibold uppercase tracking-[0.06em] text-chalk transition-colors hover:border-gold hover:text-gold"
          >
            What is Discover <ArrowDownRight aria-hidden className="size-5" />
          </a>
        </div>
      </div>

      {film && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause background film" : "Play background film"}
          className="absolute bottom-5 right-4 grid size-10 place-items-center rounded-full border border-chalk/25 bg-night/50 text-chalk/80 backdrop-blur transition-colors hover:border-gold hover:text-gold sm:right-6 lg:right-10"
        >
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
        </button>
      )}
    </section>
  );
}
