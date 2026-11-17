"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Play, RotateCcw } from "lucide-react";
import { mail } from "@/lib/site";
import { cn } from "@/lib/utils";

const AXES = ["Technical", "Athletic", "Tactical", "Mindset", "Behaviour"] as const;

type SourceId = "self" | "measured" | "coach" | "video" | "profile";

const SOURCES: { id: SourceId; label: string; note: string; step: string }[] = [
  { id: "self", label: "Self-reported", note: "What you declare in your profile: history, goals, how you see your game.", step: "Reading your declared profile" },
  { id: "measured", label: "Measured", note: "Field tests with a protocol, an assessor, a device and a unit.", step: "Adding field-test results" },
  { id: "coach", label: "Coach-assessed", note: "BXP coaches score technique, tactics, mindset and behaviour on a 1–10 rubric.", step: "Adding coach rubric scores" },
  { id: "video", label: "Video-derived", note: "Observations tied to timecoded clips of your sessions.", step: "Matching timecoded clips" },
  { id: "profile", label: "Staff-reviewed profile", note: "A Regional Manager reviews all the evidence before your BXP DNA is published.", step: "Staff review of the full file" },
];

type Evidence = { id: string; axis: number; src: Exclude<SourceId, "profile">; title: string; note: string; score: number };

// Illustrative only: no real player. The mechanism follows the memorandum
// (section 06): every number keeps its origin, a source that cannot measure an
// axis leaves it empty, and the profile is built only from the evidence kept.
const EVIDENCE: Evidence[] = [
  { id: "t-self", axis: 0, src: "self", title: "Declared strengths", note: "Your profile says first touch and passing are your strongest tools.", score: 7 },
  { id: "t-meas", axis: 0, src: "measured", title: "Ball-control circuit", note: "Timed circuit with a set protocol, one assessor and one device.", score: 6 },
  { id: "t-coach", axis: 0, src: "coach", title: "Technique rubric", note: "Coach scores first touch, passing and finishing on the 1–10 rubric.", score: 7 },
  { id: "t-video", axis: 0, src: "video", title: "Clip: build-up play", note: "Timecoded clips of receiving and passing under pressure.", score: 6 },
  { id: "a-self", axis: 1, src: "self", title: "Declared fitness", note: "You report your training load and how you recover between sessions.", score: 7 },
  { id: "a-meas", axis: 1, src: "measured", title: "Sprint and jump tests", note: "Field tests with a protocol, a device and a unit. No device, no score.", score: 6 },
  { id: "c-self", axis: 2, src: "self", title: "Role and positions", note: "The positions you play and how you say you read the game.", score: 6 },
  { id: "c-coach", axis: 2, src: "coach", title: "Game-reading rubric", note: "Coach scores positioning, decisions and off-the-ball movement.", score: 8 },
  { id: "c-video", axis: 2, src: "video", title: "Clip: pressing phase", note: "Observation tied to a timecoded clip of your positioning.", score: 7 },
  { id: "m-self", axis: 3, src: "self", title: "Goals and motivation", note: "What drives you, in your own words.", score: 8 },
  { id: "m-coach", axis: 3, src: "coach", title: "Mindset rubric", note: "Coach scores focus, reaction to mistakes and resilience.", score: 6 },
  { id: "b-coach", axis: 4, src: "coach", title: "Behaviour rubric", note: "Coach scores attitude to staff and teammates, and reliability.", score: 7 },
];

const LABEL: Record<Evidence["src"], string> = { self: "Self-reported", measured: "Measured", coach: "Coach", video: "Video" };
const RUBRIC = "Rubric: 1–3 early, 4–6 developing, 7–8 solid, 9–10 elite.";

const C = 150;
const R = 112;
function point(axis: number, score: number) {
  const a = (Math.PI * 2 * axis) / AXES.length - Math.PI / 2;
  const r = (score / 10) * R;
  return [C + Math.cos(a) * r, C + Math.sin(a) * r] as const;
}
function shape(values: (number | null)[]) {
  return values.map((v, i) => { const [x, y] = point(i, v ?? 0.6); return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`; }).join(" ") + " Z";
}
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function Dna() {
  const [sel, setSel] = useState<SourceId>("profile");
  const [axis, setAxis] = useState(0);
  const [off, setOff] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState<string | null>("t-coach");
  const [stage, setStage] = useState(-1); // -1 = idle, else index into SOURCES while the analysis runs
  const run = useRef(0);
  useEffect(() => () => { run.current++; }, []);

  const scanning = stage >= 0;
  const ids: SourceId[] = scanning
    ? SOURCES.slice(0, stage + 1).map((s) => s.id)
    : sel === "profile" ? SOURCES.map((s) => s.id) : [sel];
  const counted = (e: Evidence) => ids.includes(e.src) && !off.has(e.id);
  const scoreOf = (a: number) => {
    const list = EVIDENCE.filter((e) => e.axis === a && counted(e));
    return list.length ? list.reduce((s, e) => s + e.score, 0) / list.length : null;
  };
  const scores = AXES.map((_, i) => scoreOf(i));
  const shown = EVIDENCE.filter((e) => e.axis === axis && ids.includes(e.src));
  const src = SOURCES.find((s) => s.id === sel)!;
  const fmt = (v: number) => (Number.isInteger(v) ? `${v}` : v.toFixed(1));

  async function analyse() {
    const my = ++run.current;
    setOff(new Set());
    for (let i = 0; i < SOURCES.length; i++) {
      setStage(i);
      await sleep(900);
      if (run.current !== my) return;
    }
    setSel("profile");
    setStage(-1);
  }
  function reset() { run.current++; setStage(-1); setOff(new Set()); setSel("profile"); }
  const toggle = (id: string) => setOff((o) => { const n = new Set(o); if (n.has(id)) n.delete(id); else n.add(id); return n; });

  return (
    <section id="dna" aria-labelledby="dna-title" className="relative scroll-mt-20 overflow-hidden bg-night py-24 md:py-36">
      <div className="mx-auto grid grid-cols-1 max-w-[1320px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
        <div>
          <h2 id="dna-title" className="display max-w-[12ch] text-[clamp(2.4rem,6vw,4.6rem)] uppercase">
            More than numbers. <span className="text-gold">Your DNA.</span>
          </h2>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-mute">
            What you tell us meets field tests, coach observations and video. Every score keeps its source, so you know what was measured and what was judged.
          </p>

          <div role="radiogroup" aria-label="Data source" className="mt-9 flex flex-wrap gap-2">
            {SOURCES.map((s) => (
              <button
                key={s.id}
                role="radio"
                aria-checked={!scanning && s.id === sel}
                disabled={scanning}
                onClick={() => setSel(s.id)}
                className={cn(
                  "wide rounded-full border px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.06em] transition-colors disabled:opacity-50",
                  !scanning && s.id === sel ? "border-gold bg-gold text-night" : "border-line text-chalk/80 hover:border-silver/50 hover:text-chalk",
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
          <p aria-live="polite" className="mt-5 min-h-[3.5rem] max-w-[46ch] leading-relaxed text-chalk/85">
            {scanning ? SOURCES[stage].note : src.note}
          </p>
          <p className="mt-2 max-w-[46ch] text-sm text-mute">Try it on the screen: run the analysis, open each piece of evidence, switch one off and watch the profile move.</p>

          <a
            href={mail("BXP DNA information")}
            className="wide mt-6 inline-flex items-center gap-2 rounded-md border border-silver/35 px-6 py-4 text-sm font-semibold uppercase tracking-[0.06em] transition-colors hover:border-gold hover:text-gold"
          >
            Ask about the analysis <ArrowUpRight aria-hidden className="size-5" />
          </a>
        </div>

        {/* The laptop */}
        <figure className="mx-auto w-full min-w-0 max-w-[780px]">
          <div className="rounded-t-[20px] border border-[#34353a] bg-[#1a1b1f] p-2.5 pb-2 shadow-[0_40px_120px_-50px_rgba(230,189,81,0.35)] sm:p-3">
            <div className="relative overflow-hidden rounded-[10px] border border-line bg-night">
              <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
                <div className="flex items-center gap-1.5" aria-hidden>
                  <i className="size-2.5 rounded-full bg-[#3a3b40]" /><i className="size-2.5 rounded-full bg-[#3a3b40]" /><i className="size-2.5 rounded-full bg-[#3a3b40]" />
                </div>
                <figcaption className="wide truncate text-[11px] font-bold uppercase tracking-[0.1em] text-chalk/90 sm:text-xs">BXP DNA Studio · Player profile</figcaption>
                <span className="shrink-0 rounded border border-gold/40 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.1em] text-gold">Illustration</span>
              </div>

              <div className="grid grid-cols-1 gap-5 p-3 sm:p-5 md:grid-cols-[0.9fr_1.1fr]">
                {/* Radar */}
                <div className="min-w-0">
                  <svg viewBox="-70 -6 440 312" role="img" aria-label="Example radar of the profile" className="mx-auto w-full max-w-[320px]">
                    {[2, 4, 6, 8, 10].map((r) => (<path key={r} d={shape(AXES.map(() => r))} fill="none" stroke="#2a2b2f" />))}
                    {AXES.map((_, i) => { const [x, y] = point(i, 10); return <line key={i} x1={C} y1={C} x2={x} y2={y} stroke="#2a2b2f" />; })}
                    <motion.path initial={false} animate={{ d: shape(scores) }} transition={{ type: "spring", stiffness: 110, damping: 18 }} fill="rgba(230,189,81,0.18)" stroke="#e6bd51" strokeWidth={2} strokeLinejoin="round" />
                    {scores.map((v, i) => {
                      const [x, y] = point(i, v ?? 0.6);
                      return (
                        <motion.circle key={i} initial={false} animate={{ cx: x, cy: y, opacity: v === null ? 0.3 : 1, r: i === axis ? 6 : 4 }} transition={{ type: "spring", stiffness: 110, damping: 18 }} fill={v === null ? "#9fa1a6" : "#ffe59d"} />
                      );
                    })}
                    {AXES.map((a, i) => {
                      const [x, y] = point(i, 12.6);
                      return (
                        <text
                          key={a} x={x} y={y + 4} textAnchor="middle" fontSize="11" letterSpacing="0.08em"
                          fill={i === axis ? "#e6bd51" : "#c9ccd1"} fontWeight={i === axis ? 700 : 400}
                          className="cursor-pointer" onClick={() => setAxis(i)}
                        >
                          {a.toUpperCase()}
                        </text>
                      );
                    })}
                  </svg>
                  <p className="mt-2 text-center text-xs text-mute">
                    {scanning ? "Analysing…" : sel === "profile" ? "Reviewed by a Regional Manager" : `Showing ${src.label.toLowerCase()} only`}
                  </p>
                </div>

                {/* Evidence */}
                <div className="min-w-0">
                  <div role="tablist" aria-label="Axis" className="flex flex-wrap gap-1.5">
                    {AXES.map((a, i) => (
                      <button
                        key={a} role="tab" aria-selected={i === axis} onClick={() => setAxis(i)}
                        className={cn("rounded px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] transition-colors", i === axis ? "bg-gold text-night" : "border border-line text-chalk/80 hover:border-silver/50")}
                      >
                        {a}
                      </button>
                    ))}
                  </div>

                  <div className="mt-3 flex items-baseline justify-between border-b border-line pb-2">
                    <span className="text-sm font-semibold uppercase tracking-[0.08em]">{AXES[axis]}</span>
                    <span className={cn("tabular text-sm font-semibold", scores[axis] === null ? "text-mute" : "text-gold-lit")}>
                      {scores[axis] === null ? "Insufficient evidence" : `${fmt(scores[axis]!)}/10`}
                    </span>
                  </div>

                  <ul className="mt-2 grid max-h-[260px] gap-1.5 overflow-y-auto pr-1">
                    <AnimatePresence initial={false}>
                      {shown.length === 0 && (
                        <motion.li key="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-md border border-dashed border-line px-3 py-4 text-sm text-mute">
                          This source cannot speak to {AXES[axis].toLowerCase()}, so no score is invented.
                        </motion.li>
                      )}
                      {shown.map((e) => {
                        const on = !off.has(e.id);
                        const isOpen = open === e.id;
                        return (
                          <motion.li key={e.id} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={cn("rounded-md border bg-pitch", on ? "border-line" : "border-line/50 opacity-55")}>
                            <div className="flex items-center gap-2 px-2.5 py-2">
                              <button aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : e.id)} className="min-w-0 flex-1 text-left">
                                <span className="block text-[10px] font-semibold uppercase tracking-[0.1em] text-gold">{LABEL[e.src]}</span>
                                <span className="block truncate text-sm">{e.title}</span>
                              </button>
                              <span className="tabular text-sm font-semibold text-gold-lit">{e.score}</span>
                              <button
                                role="switch" aria-checked={on} aria-label={`${on ? "Remove" : "Include"} ${e.title}`} onClick={() => toggle(e.id)}
                                className={cn("grid size-6 shrink-0 place-items-center rounded border transition-colors", on ? "border-gold bg-gold text-night" : "border-line text-transparent hover:border-silver/50")}
                              >
                                <Check aria-hidden className="size-4" strokeWidth={3} />
                              </button>
                            </div>
                            {isOpen && (
                              <div className="border-t border-line px-2.5 py-2 text-xs leading-relaxed text-chalk/80">
                                {e.note}
                                <span className="mt-1 block text-mute">{RUBRIC} Switch it off to see the profile without it.</span>
                              </div>
                            )}
                          </motion.li>
                        );
                      })}
                    </AnimatePresence>
                  </ul>
                </div>
              </div>

              {/* Status bar */}
              <div className="flex flex-wrap items-center gap-3 border-t border-line px-4 py-3">
                <button
                  onClick={analyse} disabled={scanning}
                  className="wide inline-flex items-center gap-1.5 rounded bg-gold px-3.5 py-2 text-xs font-bold uppercase tracking-[0.06em] text-night transition-colors hover:bg-gold-lit disabled:opacity-60"
                >
                  <Play aria-hidden className="size-3.5" /> Run analysis
                </button>
                <button onClick={reset} className="inline-flex items-center gap-1.5 rounded border border-line px-3 py-2 text-xs font-semibold uppercase tracking-[0.06em] text-chalk/80 hover:border-silver/50">
                  <RotateCcw aria-hidden className="size-3.5" /> Reset
                </button>
                <div className="flex min-w-[120px] flex-1 items-center gap-3" aria-live="polite">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-line">
                    <motion.div initial={false} animate={{ width: scanning ? `${((stage + 1) / SOURCES.length) * 100}%` : "100%" }} transition={{ duration: 0.6 }} className="h-full bg-gradient-to-r from-gold-deep to-gold" />
                  </div>
                  <span className="min-w-0 text-xs text-mute">{scanning ? SOURCES[stage].step : "Profile ready"}</span>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden className="mx-[-3%] h-3.5 rounded-b-[16px] bg-gradient-to-b from-[#34353a] to-[#16171a]">
            <div className="mx-auto h-1.5 w-24 rounded-b-lg bg-[#0d0e0f]" />
          </div>
          <p className="mt-4 text-center text-sm text-mute">Example values for illustration. Not an actual player assessment.</p>
        </figure>
      </div>
    </section>
  );
}
