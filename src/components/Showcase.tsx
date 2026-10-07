import { useCallback, useEffect, useRef, useState } from "react";
import showcase from "@/assets/showcase-app.jpg";
import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";
import { LabFoot, LabWin } from "./ui/LabChrome";
import { useCanHover, useReducedMotion } from "@/hooks/useMedia";
import { cn } from "@/utils/cn";

const apps = [
  {
    name: "Campus",
    tagline: "Every event at Parul, one tap away.",
    stack: ["SwiftUI", "CloudKit", "WidgetKit"],
    stat: "4.8 ★ · 3.1k downloads",
    by: "Club · 2025",
  },
  {
    name: "Mess Mate",
    tagline: "Hostel mess menus, ratings & skip-meal credits.",
    stack: ["SwiftUI", "Swift Data", "Push"],
    stat: "2.4k weekly actives",
    by: "Club · 2026",
  },
  {
    name: "Pulse",
    tagline: "Attendance & timetable with Live Activities.",
    stack: ["ActivityKit", "Combine", "Charts"],
    stat: "Swift Student Challenge '25",
    by: "Club · 2024",
  },
  {
    name: "Raahi",
    tagline: "Shared auto-rickshaw rides across campus gates.",
    stack: ["MapKit", "Core Location", "StoreKit"],
    stat: "Incubated at PU IIC",
    by: "Club · 2026",
  },
];

function TiltPhone() {
  const canHover = useCanHover();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!canHover || reduce || e.pointerType !== "mouse") return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      pos.current = { x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 };
      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        const { x, y } = pos.current;
        el.style.transform = `perspective(1200px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(0)`;
      });
    },
    [canHover, reduce]
  );

  const onLeave = useCallback(() => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    const el = ref.current;
    if (el) el.style.transform = "perspective(1200px) rotateY(0deg) rotateX(0deg) translateZ(0)";
  }, []);

  useEffect(() => {
    if (reduce || !canHover) onLeave();
    return onLeave;
  }, [reduce, canHover, onLeave]);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerCancel={onLeave}
      className="lab-panel gpu relative mx-auto w-full max-w-[420px] overflow-hidden"
      style={{ "--tone": "#D9CFFF" } as React.CSSProperties}
    >
      <LabWin file="campus_v2.3.app — preview" n="2.3" />
      <img
        src={showcase}
        alt="Campus app by Swift Coding Club running on iPhone"
        width={440}
        height={588}
        loading="lazy"
        decoding="async"
        className="aspect-[3/4] w-full object-cover"
      />
      <p className="absolute bottom-20 left-6 right-6 text-center font-mono text-[9px] uppercase tracking-[0.18em] text-ink/40">[ replace with your own image ]</p>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-full"
        style={{ background: "repeating-linear-gradient(180deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 3px)" }}
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-white/90 to-transparent p-6 pt-10">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F05138]">Featured build</p>
          <p className="mt-1 text-xl font-bold tracking-tight text-ink">Campus · v2.3</p>
        </div>
        <span className="lab-tag">On App Store</span>
      </div>
    </div>
  );
}

export function Showcase() {
  const [active, setActive] = useState(0);
  return (
    <section id="showcase" className="webcore-section cv-auto relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="webcore-stars pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 45% at 85% 0%, rgba(240,81,56,0.06), transparent 60%)" }}
      />

      <div className="container-x relative">
        <SectionHeader
          index="03"
          eyebrow="Student showcase"
          title={
            <span className="text-ink">
              Real apps. Real users. <span className="text-[#F05138]">Built between lectures.</span>
            </span>
          }
          body={
            <span className="text-muted">
              Every app below was designed, built and submitted by Parul students in a single semester. Some are on
              the App Store. Some are used by thousands on campus every week.
            </span>
          }
        />

        <div className="mt-16 grid items-center gap-12 lg:mt-24 lg:grid-cols-12">
          <Reveal variant="scale" className="lg:col-span-5">
            <div className="relative isolate">
              <div aria-hidden className="pointer-events-none absolute inset-3 -z-10 rounded-[28px] border border-white/80" style={{ background: "linear-gradient(145deg,#D9CFFF,#BDE4FF88)", transform: "rotate(-5deg) translate(-10px,12px)", boxShadow: "0 20px 45px -24px #D9CFFF" }} />
              <div aria-hidden className="pointer-events-none absolute inset-5 -z-10 rounded-[28px] border border-white/80" style={{ background: "linear-gradient(145deg,#FFEDA3,#FFC6DD88)", transform: "rotate(5deg) translate(12px,8px)" }} />
              <TiltPhone />
              <Reveal delay={180} className="absolute right-0 top-6 z-10 sm:-right-2">
                {/* riso sticker instead of the dark coin — keeps the iOS casing intact */}
                <span
                  className="inline-flex items-center gap-2 rounded-[10px] border-[1.5px] border-ink bg-white/93 px-3.5 py-2 font-mono text-[10.5px] font-semibold tracking-[0.14em] text-ink shadow-[2.5px_2.5px_0_var(--color-ink)] motion-safe:animate-float"
                  style={{ animationDelay: "-6s" }}
                >
                  <span aria-hidden className="h-2 w-2 rotate-45 border border-ink bg-[#B9ECCD]" />
                  iOS 19 ready
                </span>
              </Reveal>
            </div>
          </Reveal>

          <div className="lg:col-span-7 lg:pl-8">
            <Reveal delay={80}>
              <div
                className="lab-panel relative overflow-hidden"
                style={
                  {
                    "--tone": "#BDE4FF",
                    "--panel-r": "26px",
                    "--tilt-r": "0.4deg",
                  } as React.CSSProperties
                }
              >
                <LabWin file="showcase.dir" n="04" />

                <div className="lab-body relative z-10 p-5 sm:p-7">
                  <span aria-hidden className="lab-halftone absolute -top-4 -right-3 h-[190px] w-[38%] -z-10" />
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#F05138]">
                    C:\club\showcase&gt; dir *.app /b
                  </p>
                  <ul className="divide-y divide-line" role="list">
                    {apps.map((a, i) => {
                      const isActive = active === i;
                      return (
                        <Reveal as="li" key={a.name} delay={i * 80}>
                          <button
                            type="button"
                            onMouseEnter={() => setActive(i)}
                            onFocus={() => setActive(i)}
                            onClick={() => setActive(i)}
                            aria-expanded={isActive}
                            className="group grid w-full grid-cols-[auto_1fr_auto] items-start gap-5 py-6 text-left sm:gap-8"
                          >
                            <span className={cn("pt-2 font-mono text-[11px] tracking-[0.2em]", isActive ? "text-[#F05138]" : "text-ink/30")}>
                              0{i + 1}
                            </span>
                            <span>
                              <span className="flex flex-wrap items-center gap-3">
                                <span
                                  className={cn(
                                    "text-2xl font-bold tracking-tight sm:text-3xl",
                                    isActive ? "text-[#F05138]" : "text-ink/80 group-hover:text-ink"
                                  )}
                                >
                                  {a.name}
                                </span>
                                <span className="lab-tag hidden sm:inline-flex">{a.by}</span>
                              </span>
                              <span className={cn("mt-1 block text-[15px] text-muted", isActive && "text-ink/70")}>{a.tagline}</span>
                              <span
                                className={cn(
                                  "grid transition-opacity duration-500 ease-[var(--ease-out-expo)]",
                                  isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                )}
                              >
                                <span className="overflow-hidden">
                                  <span className="mt-4 flex flex-wrap items-center gap-2">
                                    {a.stack.map((s) => (
                                      <span key={s} className="lab-badge font-mono">
                                        {s}
                                      </span>
                                    ))}
                                    <span className="ml-1 font-mono text-[11px] font-semibold text-[#F05138]">{a.stat}</span>
                                  </span>
                                </span>
                              </span>
                            </span>
                            <span
                              className={cn(
                                "mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border-[1.5px] transition-all duration-300 motion-safe:group-hover:translate-x-1",
                                isActive
                                  ? "border-ink bg-[#F05138] text-white shadow-[2.5px_2.5px_0_var(--color-ink)]"
                                  : "border-ink/70 bg-white/85 text-ink/50 shadow-[2px_2px_0_rgba(11,11,12,0.35)] group-hover:shadow-[2.5px_2.5px_0_var(--color-ink)]"
                              )}
                              aria-hidden
                            >
                              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                          </button>
                        </Reveal>
                      );
                    })}
                  </ul>
                </div>

                <LabFoot left="4 apps · one semester" right="all shipped" />
              </div>
            </Reveal>

            <Reveal delay={320} className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#stories"
                className="inline-flex items-center gap-2 rounded-sm border border-[#F05138]/60 bg-[#F05138]/10 px-5 py-2.5 font-mono text-sm font-bold text-[#F05138] transition-transform duration-300 motion-safe:hover:-translate-y-0.5 hover:bg-[#F05138]/20"
                style={{ boxShadow: "0 0 22px -8px rgba(240,81,56,0.3)" }}
              >
                Build the next one →
              </a>
              <a href="#stories" className="link-u font-mono text-sm font-semibold text-muted hover:text-[#F05138]">
                Read how they did it →
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
