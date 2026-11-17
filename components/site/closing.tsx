import { ArrowUpRight, Mail } from "lucide-react";
import { SITE, mail } from "@/lib/site";

export function Organizations() {
  return (
    <section id="organizations" aria-labelledby="org-title" className="scroll-mt-20 border-t border-line bg-night py-24 md:py-32">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:px-10">
        <h2 id="org-title" className="display max-w-[13ch] text-[clamp(2.4rem,6vw,4.6rem)] uppercase">
          A partner <span className="text-silver">beyond the touchline.</span>
        </h2>
        <div>
          <p className="max-w-[46ch] text-lg leading-relaxed text-mute">
            Clubs, agents, academies, associations and federations: programs, assessments and collaborations built around what you need.
          </p>
          <a
            href={mail("BXP for organizations")}
            className="wide mt-8 inline-flex items-center gap-2 rounded-md border border-silver/35 px-6 py-4 text-sm font-semibold uppercase tracking-[0.06em] transition-colors hover:border-gold hover:text-gold"
          >
            Let&rsquo;s talk <ArrowUpRight aria-hidden className="size-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

/** The close: the only drenched-gold field on the page, so the last action is unmissable. */
export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-gold text-night">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img/bxp-mark.webp"
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -right-24 top-1/2 w-[720px] max-w-none -translate-y-1/2 opacity-[0.14] mix-blend-multiply"
      />
      <div className="relative mx-auto max-w-[1320px] px-4 py-24 sm:px-6 md:py-32 lg:px-10">
        <h2 id="cta-title" className="display max-w-[13ch] text-[clamp(1.9rem,8vw,6rem)] uppercase">
          Your next opportunity starts with you.
        </h2>
        <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-night/80">
          Choose your pathway and create new possibilities with BXP.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href={SITE.apply}
            className="wide inline-flex items-center justify-center gap-2 rounded-md bg-night px-7 py-4 text-[15px] font-bold uppercase tracking-[0.06em] text-gold transition-colors hover:bg-black hover:text-gold-lit"
          >
            Apply for BXP Discover <ArrowUpRight aria-hidden className="size-5" strokeWidth={2.4} />
          </a>
          <a
            href={SITE.account}
            className="wide inline-flex items-center justify-center gap-2 rounded-md border border-night/40 px-7 py-4 text-[15px] font-semibold uppercase tracking-[0.06em] transition-colors hover:border-night hover:bg-night/5"
          >
            Sign in to My BXP
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-night">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1fr_auto] lg:px-10">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/bxp-logo.webp" alt="BXP Best for Performance" width={480} height={272} loading="lazy" className="logo-screen h-16 w-auto" />
          <a href={`mailto:${SITE.email}`} className="mt-6 inline-flex items-center gap-2 text-chalk/85 hover:text-gold">
            <Mail aria-hidden className="size-4 text-gold" /> {SITE.email}
          </a>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm uppercase tracking-[0.08em] text-chalk/75">
          <a href="#discover" className="hover:text-gold">BXP Discover</a>
          <a href={SITE.apply} className="hover:text-gold">Apply</a>
          <a href="#programs" className="hover:text-gold">Programs</a>
          <a href={SITE.account} className="hover:text-gold">My BXP</a>
          <a href="#dna" className="hover:text-gold">BXP DNA</a>
          <a href={SITE.terms} className="hover:text-gold">Terms &amp; privacy</a>
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-[1320px] px-4 py-6 text-xs leading-relaxed text-mute sm:px-6 lg:px-10">
          © {new Date().getFullYear()} BXP — Best X for Performance. Programs, dates and inclusions are confirmed in the official BXP application. BXP does not guarantee contracts, trials, selection or progression in football.
        </p>
      </div>
    </footer>
  );
}
