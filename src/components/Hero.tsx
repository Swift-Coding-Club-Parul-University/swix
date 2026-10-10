import { useEffect, useRef, useState } from "react";
import swifty from "@/assets/swifty.webp";
import { Reveal } from "./ui/Reveal";
import { LiquidBlobs } from "./ui/LiquidBlobs";
import { Magnetic } from "./ui/Magnetic";
import { Sticker, Squiggle, Deco } from "./ui/Deco";
import { Orb } from "./ui/Orb";
import { GlassCube } from "./ui/GlassCube";
import { PrismOrb } from "./ui/PrismOrb";
import { GlassRing } from "./ui/GlassRing";
import { Tilt } from "./ui/Tilt";
import { useReducedMotion, useCanHover } from "@/hooks/useMedia";
import { useParallax } from "@/hooks/useParallax";
import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/utils/cn";

/* ------------------------------------------------------------------ */
/*  Typed code card                                                   */
/* ------------------------------------------------------------------ */

const codeLines = [
  { t: "import", cls: "code-token-k", rest: " SwiftUI" },
  { t: "", cls: "", rest: "" },
  { t: "struct", cls: "code-token-k", rest: " ClubApp: App {" },
  { t: "  var", cls: "code-token-k", rest: " body: some Scene {" },
  { t: "    WindowGroup", cls: "code-token-t", rest: " {" },
  { t: "      ShipIt", cls: "code-token-t", rest: "(campus: \"Parul\")" },
  { t: "    }", cls: "", rest: "" },
  { t: "  }", cls: "", rest: "" },
  { t: "}", cls: "", rest: "" },
];

function CodeCard() {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? codeLines.length : 0);
  useEffect(() => {
    if (reduce) return setShown(codeLines.length);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= codeLines.length) clearInterval(id);
    }, 190);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="codecard grain gpu relative w-full rounded-[20px] p-4 font-mono text-[11.5px] leading-[1.65] sm:text-[12.5px] sm:leading-6">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-2.5 text-[10px] text-ink/50">ClubApp.swift</span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-md bg-emerald-500/15 px-2 py-0.5 text-[9px] font-medium tracking-wide text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Build Succeeded
        </span>
      </div>
      <pre className="overflow-hidden whitespace-pre">
        {codeLines.slice(0, shown).map((l, i) => (
          <div key={i} className="flex">
            <span className="mr-3.5 w-3.5 select-none text-right text-ink/30">{i + 1}</span>
            <span>
              <span className={l.cls}>{l.t}</span>
              <span>{l.rest}</span>
            </span>
          </div>
        ))}
        {shown < codeLines.length && <span className="ml-7 inline-block h-3.5 w-[6px] translate-y-0.5 bg-swift animate-blink" />}
      </pre>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats                                                             */
/* ------------------------------------------------------------------ */

function Stat({ value, label, suffix = "", accent }: { value: number; label: string; suffix?: string; accent: string }) {
  const { ref, value: v } = useCountUp(value);
  return (
    <div className="group relative px-5 py-5 first:pl-5">
      <span aria-hidden className={cn("absolute inset-x-5 top-0 h-[3px] rounded-full", accent)} />
      <div className="text-[1.7rem] font-bold tracking-tight sm:text-3xl">
        <span ref={ref} className="tabular-nums">{v}</span>
        <span className="text-swift">{suffix}</span>
      </div>
      <div className="mt-1 text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted">{label}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Cursor spotlight for the hero backdrop                            */
/* ------------------------------------------------------------------ */

function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const hover = useCanHover();
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    const target = el?.closest("section");
    if (!el || !target || !hover || reduce) return;
    let raf = 0;
    let x = -400;
    let y = -400;
    const paint = () => {
      raf = 0;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.parentElement?.getBoundingClientRect();
      if (!r) return;
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const reset = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      el.style.removeProperty("--mx");
      el.style.removeProperty("--my");
    };
    target.addEventListener("pointermove", onMove, { passive: true });
    target.addEventListener("pointerleave", reset);
    target.addEventListener("pointercancel", reset);
    return () => {
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerleave", reset);
      target.removeEventListener("pointercancel", reset);
      reset();
    };
  }, [hover, reduce]);
  return ref;
}

/* ------------------------------------------------------------------ */
/*  Hero scene (right column)                                         */
/* ------------------------------------------------------------------ */

const chips = [
  {
    label: "SwiftUI",
    bg: "rgba(255,255,255,0.72)",
    fg: "text-ink",
    cls: "left-2 top-14 sm:-left-6 sm:top-16",
    d: "translateZ(90px)",
    delay: "0s",
  },
];

function HeroScene() {
  return (
    <Tilt className="relative mx-auto w-full max-w-[520px]" max={9} lift={0} scale={1} sheen={false} depth>
      {/* depth layers */}
      {/* big refractive glass orbit ring behind everything */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-0 w-0"
        style={{ transform: "translateZ(-150px)", perspective: "1400px" }}
      >
        <GlassRing
          className="-left-[260px] -top-[260px]"
          size={520}
          thickness={18}
          tilt={72}
          spin={58}
          tone="swift"
        />
      </div>
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[118%] w-[118%]"
        style={{ transform: "translate(-50%, -50%) translateZ(-120px)" }}
      >
        <div className="gpu animate-spin-slow absolute inset-0 rounded-full border border-ink/10" style={{ animationDuration: "30s" }}>
          <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-swift shadow-[0_0_28px_8px_rgba(240,81,56,0.4)]" />
        </div>
      </div>
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[78%] w-[78%]"
        style={{ transform: "translate(-50%, -50%) translateZ(-60px)" }}
      >
        <div className="gpu animate-drift absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(240,81,56,0.35),transparent)] blur-3xl" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-3 bottom-2 h-28 rounded-[50%] border border-swift/20 sm:-inset-x-8"
        style={{ transform: "rotateX(72deg) translateZ(-55px)", background: "radial-gradient(ellipse, rgba(240,81,56,0.16), transparent 70%)", boxShadow: "0 0 0 16px rgba(240,81,56,0.025), 0 0 0 32px rgba(240,81,56,0.025)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[30px] border border-white/80 bg-white/20"
        style={{ transform: "translateZ(-28px) translate(12px, 12px)", boxShadow: "0 30px 70px -35px rgba(122,60,20,0.35)" }}
      />

      {/* main glass plate */}
      <div className="relative overflow-hidden rounded-[30px] border border-white/70 bg-white/25 p-2.5 shadow-[0_20px_60px_-35px_rgba(122,60,20,0.35)]" style={{ transform: "translateZ(0)" }}>
        <div className="liquid grain relative overflow-hidden rounded-[24px]">
          <img
            src={swifty}
            alt="Swift Coding Club app icon"
            width={620}
            height={620}
            fetchPriority="high"
            decoding="async"
            className="gpu animate-float-slow aspect-square w-full object-contain p-10 sm:p-14"
          />
          <div aria-hidden className="pointer-events-none absolute inset-5 border border-ink/10" />
          <span className="absolute left-6 top-6 font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink/55">fig. 01 — swift</span>
          <span className="absolute bottom-6 right-6 font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink/55">22.30°N 73.36°E</span>
          {/* live badge on the plate */}
          <span className="glass-chip absolute left-6 top-12 hidden items-center gap-1.5 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/80 sm:inline-flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute h-full w-full rounded-full bg-emerald-500 animate-ping-ring" />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Live · Tue lab 6 PM
          </span>
        </div>
      </div>

      {/* floating liquid chips */}
      {chips.map((c) => (
        <div key={c.label} className={c.cls} style={{ transform: c.d, position: "absolute" }}>
          <div
            className={cn("gpu animate-float rounded-full px-4 py-2 text-[12.5px] font-semibold backdrop-blur-xl shadow-[0_18px_40px_-18px_rgba(11,11,12,0.45)]", c.fg)}
            style={{ animationDelay: c.delay, background: c.bg }}
          >
            {c.label}
          </div>
        </div>
      ))}

      {/* floating glass 3D cube */}
      <GlassCube className="-right-2 -top-12 sm:right-12" size={96} depth={100} delay={-3} />
      <GlassCube className="-left-6 top-44 sm:-left-8" size={48} tone="ice" depth={45} delay={-8} />

      {/* refractive prism orbs */}
      <PrismOrb className="-left-4 top-16 sm:left-2" size={54} tone="rose" satellite />
      <PrismOrb className="right-6 bottom-40 sm:-right-8" size={38} tone="ice" />
      <PrismOrb className="left-10 -top-8 hidden sm:block" size={30} tone="lemon" />

      {/* swift orb coin */}
      <div className="right-4 top-40 sm:-right-6 sm:top-44" style={{ transform: "translateZ(95px)", position: "absolute" }}>
        <div className="gpu animate-float flex items-center gap-2.5 rounded-full bg-ink py-1.5 pl-1.5 pr-4 shadow-[0_18px_40px_-18px_rgba(11,11,12,0.65)]" style={{ animationDelay: "-5s" }}>
          <Orb variant="swift" box={32} size="small" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/80">Swift 6</span>
        </div>
      </div>

      {/* code card overlapping bottom */}
      <div
        className="relative -mt-16 ml-[14%] w-[86%] sm:absolute sm:-bottom-16 sm:left-0 sm:mt-0 sm:ml-0 sm:w-[76%]"
        style={{ transform: "translateZ(130px)" }}
      >
        <div className="gpu animate-float" style={{ animationDelay: "-3s" }}>
          <CodeCard />
        </div>
      </div>
    </Tilt>
  );
}

/* ------------------------------------------------------------------ */
/*  Marquee + avatars                                                 */
/* ------------------------------------------------------------------ */

const stack = ["Swift 6", "SwiftUI", "Xcode 16", "TestFlight", "App Store", "SwiftData", "WidgetKit", "Core ML", "ARKit", "visionOS"];

function StackMarquee() {
  const items = [...stack, ...stack];
  return (
    <div className="marquee-mask relative mt-14 overflow-hidden border-y border-ink/10 py-3.5" aria-label="Technologies we teach">
      <div className="marquee-track gpu animate-marquee flex w-max items-center gap-8 pr-8">
        {items.map((s, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">{s}</span>
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-swift/60" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                              */
/* ------------------------------------------------------------------ */

export function Hero() {
  const parallax = useParallax<HTMLDivElement>(34);
  const spotlight = useSpotlight<HTMLDivElement>();
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 sm:pt-40 lg:pt-44 lg:pb-32">
      {/* backdrop — layered print sheet: colour field → swiss grid →
          misregistered halftone plates → perspective floor → live layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-field" />
        <div className="absolute inset-0 grid-lines [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_72%)] opacity-60" />
        {/* riso halftone passes — same dots, two plates, a few px off register */}
        <div className="hero-halftone -right-[6%] -top-[8%] h-[62vh] w-[62vh]" />
        <div className="hero-halftone hero-halftone--b -right-[6%] -top-[8%] h-[62vh] w-[62vh]" />
        <div className="hero-halftone hero-halftone--c -left-[8%] bottom-[4%] h-[46vh] w-[46vh]" />
        {/* ground plane */}
        <div className="hero-floor" />
        <LiquidBlobs />
        <Deco variant="warm" />
        {/* giant watermark, printed in two passes that don't quite line up */}
        <div className="absolute -bottom-6 left-1/2 hidden -translate-x-1/2 select-none whitespace-nowrap font-mono text-[9vw] font-bold uppercase leading-none tracking-tight opacity-75 lg:block">
          <span className="absolute left-0 top-0 translate-x-[12px] translate-y-[9px] text-stroke-swift">
            Swift Coding Club
          </span>
          <span className="relative text-stroke">Swift Coding Club</span>
        </div>
        {/* cursor spotlight */}
        <div
          ref={spotlight}
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(560px circle at var(--mx, 50%) var(--my, 20%), rgba(240,81,56,0.10), transparent 65%)",
          }}
        />
      </div>

      <div className="container-x">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-6">
          {/* ------- Copy ------- */}
          <div className="lg:col-span-6">
            <p className="eyebrow mb-4">01 — The student-run iOS studio at Parul University</p>
            <h1 className="display relative text-balance text-[3.1rem] sm:text-6xl lg:text-[5.2rem] xl:text-[5.8rem]">
              <Reveal as="span" className="block" delay={60}>Learn Swift.</Reveal>
              <Reveal as="span" className="block" delay={140}>
                Ship{" "}
                <span className="relative inline-block whitespace-nowrap">
                  real apps.
                  <svg viewBox="0 0 220 14" preserveAspectRatio="none" aria-hidden className="absolute -bottom-1 left-0 h-[0.22em] w-full">
                    <path d="M3 10 C 60 3, 150 3, 217 8" fill="none" stroke="#F05138" strokeWidth="5" strokeLinecap="round" opacity="0.85" />
                  </svg>
                </span>
                <span className="absolute -right-6 top-2 hidden sm:inline"><Sticker rotate={12} color="bg-lemon text-ink">Free</Sticker></span>
              </Reveal>
              <Reveal as="span" className="block text-gradient" delay={220}>From Parul to the App&nbsp;Store.</Reveal>
            </h1>
            <Reveal delay={300} className="mt-4 flex flex-wrap items-center gap-3">
              <Sticker rotate={-3} color="bg-peach text-ink">Apple Authorized</Sticker>
              <Sticker rotate={2} color="bg-lavender text-ink">Swift Certified</Sticker>
              <Sticker rotate={-6} color="bg-mint text-ink">No Mac needed</Sticker>
            </Reveal>

            <Reveal delay={320}>
              {/* 30rem, not max-w-xl: the code card floats at z+130 and its
                  projected left edge lands at x≈654, so a 576px measure would
                  run 50px underneath it and every line would end mid-word. */}
              <p className="mt-8 max-w-[30rem] text-pretty text-[17px] leading-relaxed text-muted sm:text-lg">
                The student-run iOS studio at Parul University. Weekly hands-on labs, senior mentorship,
                and one goal per semester: a polished app with your name on it — free for every student.
              </p>
            </Reveal>

            <Reveal delay={400} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Magnetic>
                <a href="#cta" className="btn btn-accent sweep group">
                  Join the club
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </Magnetic>
              <Magnetic strength={0.22}>
                <a href="#showcase" className="btn btn-ghost">
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M5 3.5v9l7-4.5-7-4.5z" fill="currentColor" />
                  </svg>
                  See student apps
                </a>
              </Magnetic>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">Free · 2 hrs / week</span>
            </Reveal>

            <Reveal delay={480} className="glass-panel mt-10 grid max-w-lg grid-cols-3 divide-x divide-white/60 rounded-2xl">
              <Stat value={300} suffix="+" label="Students trained" accent="bg-swift" />
              <Stat value={38} label="Apps shipped" accent="bg-lavender" />
              <Stat value={1} label="App Store launch" accent="bg-mint" />
            </Reveal>
            <Reveal delay={560} className="mt-6 flex items-center gap-3">
              <Squiggle color="#F05138" className="w-32" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Swift Coding Club · Est. 2023</span>
            </Reveal>
          </div>

          {/* ------- Scene ------- */}
          <div className="phone-hide lg:col-span-6">
            <div ref={parallax} style={{ transform: "translate3d(0, var(--py, 0px), 0)" }}>
              <Reveal variant="scale" delay={200}>
                <HeroScene />
              </Reveal>
            </div>
          </div>
        </div>

        <Reveal delay={120}>
          <StackMarquee />
        </Reveal>

        {/* scroll cue */}
        <div className="mt-10 flex justify-center">
          <a href="#story" className="group flex flex-col items-center gap-2" data-cursor="hot" aria-label="Scroll to story">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted transition-colors group-hover:text-ink">Scroll</span>
            <span className="relative block h-10 w-[22px] overflow-hidden rounded-full border border-ink/20">
              <span className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-swift animate-rise" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
