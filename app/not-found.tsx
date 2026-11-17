import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <main className="relative grid min-h-[100svh] place-items-center overflow-hidden px-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/stadium.webp" alt="" aria-hidden className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25" />
      <div className="max-w-xl text-center">
        <p className="display text-[clamp(5rem,20vw,9rem)] text-gold">404</p>
        <h1 className="display mt-2 text-3xl uppercase sm:text-4xl">Off the pitch.</h1>
        <p className="mt-4 text-lg text-mute">This page does not exist, or it has moved. The tunnel back is this way.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="/" className="wide rounded-md bg-gold px-6 py-4 text-sm font-bold uppercase tracking-[0.06em] text-night hover:bg-gold-lit">
            Back to home
          </a>
          <a href={SITE.apply} className="wide inline-flex items-center justify-center gap-2 rounded-md border border-silver/35 px-6 py-4 text-sm font-semibold uppercase tracking-[0.06em] hover:border-gold hover:text-gold">
            Apply for Discover <ArrowUpRight aria-hidden className="size-5" />
          </a>
        </div>
      </div>
    </main>
  );
}
