"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Magnetic from "@/components/ui/magnetic";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The hero ground: a 12 s film cut from BXP's own footage (the tunnel, a night
 * session, a line-up), graded black and gold. The poster is the complete
 * still hero; the film is refused on data saving or reduced motion, and the
 * visitor can pause it (WCAG 2.2.2).
 */
export function Hero() {
  const [film, setFilm] = useState(false);
  // The corporate film (public/video/bxp-corporate.mp4). The player only shows once the
  // file exists and its metadata has loaded, so a missing file never leaves a dead player.
  const [corporate, setCorporate] = useState(false);
  const corporateRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    setFilm(!reduce && !conn?.saveData);
    if (corporateRef.current && corporateRef.current.readyState >= 1) setCorporate(true);
  }, []);

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

      <div className="mx-auto grid w-full max-w-[1320px] flex-1 content-end gap-8 px-4 pb-8 pt-24 sm:px-6 md:pb-12 lg:grid-cols-[1fr_minmax(0,0.95fr)] lg:items-end lg:gap-12 lg:px-10">
        {/* Who we are: the corporate film is the first thing seen (above the headline on a phone, beside it on a desktop). */}
        {!corporate && <span id="who-we-are" aria-hidden />}
        <figure
          id={corporate ? "who-we-are" : undefined}
          className={cn(
            "scroll-mt-24 overflow-hidden rounded-xl border border-gold/30 bg-night shadow-[0_24px_80px_-20px_rgba(0,0,0,0.8)] lg:order-2",
            !corporate && "hidden",
          )}
        >
          <video
            ref={corporateRef}
            controls
            playsInline
            preload="metadata"
            aria-label="BXP: who we are"
            className="aspect-video w-full bg-night"
            onLoadedMetadata={() => setCorporate(true)}
          >
            <source src="/video/bxp-corporate.mp4" type="video/mp4" />
          </video>
        </figure>
        <div className={cn("lg:order-1", !corporate && "lg:col-span-2")}>
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
      </div>

    </section>
  );
}
