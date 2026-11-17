import { SITE } from "@/lib/site";

/** Shared shell for the legal pages. Text that BXP must supply is marked [TO COMPLETE]. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <main id="main" className="min-h-screen bg-night">
      <div className="mx-auto max-w-[760px] px-4 py-16 sm:px-6 md:py-24">
        <a href="/" className="wide text-sm font-semibold uppercase tracking-[0.08em] text-gold hover:text-gold-lit">← BXP</a>
        <h1 className="display mt-8 text-[clamp(2rem,6vw,3.4rem)] uppercase">{title}</h1>
        <p className="mt-3 text-sm text-mute">Last updated: {updated}</p>
        <div className="mt-10 space-y-5 leading-relaxed text-chalk/85 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:tracking-[0.04em] [&_h2]:text-chalk [&_a]:text-gold [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1">
          {children}
        </div>
        <p className="mt-14 text-sm text-mute">Questions: <a className="text-gold underline" href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
      </div>
    </main>
  );
}
