"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#who-we-are", label: "Who we are" },
  { href: "#programs", label: "Products" },
  { href: "#locations", label: "Locations" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-b border-line/80 bg-night/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-6 px-4 sm:px-6 md:h-20 lg:px-10"
      >
        <a href="#top" className="shrink-0" aria-label="BXP, back to top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/bxp-logo.webp" alt="BXP Best for Performance" width={480} height={272} className="logo-screen h-11 w-auto md:h-14" />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="wide text-[13px] font-semibold uppercase tracking-[0.08em] text-chalk/80 transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={SITE.account}
            className="hidden text-[13px] font-semibold uppercase tracking-[0.08em] text-chalk/80 transition-colors hover:text-gold md:inline"
          >
            My BXP
          </a>
          <a
            href={SITE.apply}
            className="wide hidden items-center gap-1.5 rounded-md bg-gold px-4 py-2.5 text-[13px] font-bold uppercase tracking-[0.06em] text-night transition-colors hover:bg-gold-lit sm:inline-flex"
          >
            Apply now <ArrowUpRight aria-hidden className="size-4" strokeWidth={2.4} />
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-md border border-line text-chalk lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-night px-4 pb-10 pt-6 sm:px-6 lg:hidden"
      >
        <ul className="flex flex-col">
          {LINKS.map((l) => (
            <li key={l.href} className="border-b border-line/70">
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="display flex items-center justify-between py-5 text-3xl uppercase"
              >
                {l.label}
                <ArrowUpRight aria-hidden className="size-6 text-gold" />
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid gap-3">
          <a href={SITE.apply} className="wide flex items-center justify-center gap-2 rounded-md bg-gold px-5 py-4 font-bold uppercase tracking-[0.06em] text-night">
            Apply for BXP Discover <ArrowUpRight aria-hidden className="size-5" />
          </a>
          <a href={SITE.account} className="wide flex items-center justify-center gap-2 rounded-md border border-silver/40 px-5 py-4 font-semibold uppercase tracking-[0.06em]">
            Sign in to My BXP
          </a>
        </div>
      </div>
    </header>
  );
}
