"use client";

import { useEffect, useState } from "react";

const KEY = "bxp-consent";
export const OPEN_EVENT = "bxp:cookie-settings";

/**
 * Consent banner. The site sets no analytics or marketing cookie today, so the
 * choice is only stored (localStorage) and broadcast as a `bxp:consent` event
 * (detail: "granted" | "denied"). Any measurement tool added later must wait
 * for "granted" before it loads. Refuse is as prominent as Accept.
 */
export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
    const show = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, show);
    return () => window.removeEventListener(OPEN_EVENT, show);
  }, []);

  const choose = (value: "granted" | "denied") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    window.dispatchEvent(new CustomEvent("bxp:consent", { detail: value }));
    setOpen(false);
  };

  if (!open) return null;
  const btn = "wide rounded-md border px-5 py-3 text-xs font-bold uppercase tracking-[0.06em] transition-colors";

  return (
    <div role="dialog" aria-label="Cookie preferences" className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-[720px] rounded-xl border border-line bg-stand p-5 shadow-2xl sm:inset-x-6 sm:bottom-6">
      <p className="text-sm leading-relaxed text-chalk/85">
        This site only uses what it needs to run. With your permission we may also measure audience to improve it. You can change your choice at any time from the footer.{" "}
        <a href="/privacy/" className="text-gold underline underline-offset-2 hover:text-gold-lit">Privacy &amp; cookies</a>
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button onClick={() => choose("denied")} className={`${btn} border-silver/40 text-chalk hover:border-gold hover:text-gold`}>Refuse</button>
        <button onClick={() => choose("granted")} className={`${btn} border-gold bg-gold text-night hover:bg-gold-lit`}>Accept</button>
      </div>
    </div>
  );
}

export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Cookie settings
    </button>
  );
}
