import { Reveal } from "./ui/Reveal";
import { Orb } from "./ui/Orb";
import { useCountUp } from "@/hooks/useCountUp";
import { useReducedMotion } from "@/hooks/useMedia";
import { cn } from "@/utils/cn";

const nums = [
  { v: 300, s: "+", l: "Students trained", sub: "across 6 faculties", star: "✦" },
  { v: 38, s: "", l: "Apps shipped", sub: "in the last 3 years", star: "✧" },
  { v: 1, s: "", l: "App Store launch", sub: "published by students", star: "✦" },
  { v: 29, s: "", l: "Apple devices", sub: "in the training lab", star: "✧" },
];

const starfield = [
  { left: "6%", top: "18%", s: "✦", size: "text-lg", d: "0s" },
  { left: "18%", top: "70%", s: "✧", size: "text-base", d: "1.3s" },
  { left: "36%", top: "12%", s: "·", size: "text-xl", d: "2.1s" },
  { left: "52%", top: "78%", s: "✦", size: "text-sm", d: "0.7s" },
  { left: "68%", top: "20%", s: "✧", size: "text-lg", d: "1.9s" },
  { left: "84%", top: "64%", s: "✦", size: "text-base", d: "2.7s" },
  { left: "94%", top: "28%", s: "·", size: "text-lg", d: "1.1s" },
];

function Cell({ v, s, l, sub, star, i }: { v: number; s: string; l: string; sub: string; star: string; i: number }) {
  const reduce = useReducedMotion();
  const { ref, value } = useCountUp(v, reduce ? 1 : 1500 + i * 150);
  const tone = ["#D9CFFF", "#B9ECCD", "#BDE4FF", "#FFEDA3"][i];
  return (
    <Reveal delay={i * 90} className="h-full">
      <div
        className="lab-panel relative h-full overflow-hidden p-6 sm:p-8"
        style={
          {
            "--tone": tone,
            "--tilt-r": i % 2 ? "0.4deg" : "-0.4deg",
            "--panel-r": "24px",
          } as React.CSSProperties
        }
      >
        {/* riso colour pass — sits behind every text layer */}
        <span aria-hidden className="lab-halftone absolute -top-5 -right-4 -z-10 h-[170%] w-[50%]" />
        {/* tiny orbiting satellite */}
        <span aria-hidden className="pointer-events-none absolute right-4 top-4 h-9 w-9">
          <span className="absolute inset-0 rounded-full border border-dashed border-[#b4552d]/40" style={{ borderColor: `${tone}`, animation: reduce ? "none" : `orbit-spin ${18 + i * 4}s linear infinite` }} />
          <span
            className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b4552d]"
            style={{ boxShadow: "0 0 8px rgba(180,85,45,0.9)" }}
          />
        </span>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#b4552d] text-sm text-[#ffe8d2] shadow-[0_8px_18px_-8px_rgba(180,85,45,0.8)]" aria-hidden>
          {star}
        </span>
        <p className="display relative mt-5 w-fit text-4xl tabular-nums text-[#0B0B0C] sm:text-5xl">
          <span className="sr-only">{v}{s}</span>
          <span ref={reduce ? undefined : ref} aria-hidden>{reduce ? v : value}</span>
          <span className="text-[#F05138]" aria-hidden>{s}</span>
          <span aria-hidden className="pointer-events-none absolute -bottom-2 left-0 h-1.5 w-full rounded-full" style={{ background: `linear-gradient(90deg,#F05138,${tone})`, transform: "rotate(-2deg)" }} />
        </p>
        <p className="mt-3 text-base font-bold tracking-tight text-[#2a1a10]">{l}</p>
        <p className="mt-0.5 text-[12.5px] text-[#8a6a50]">{sub}</p>
      </div>
    </Reveal>
  );
}

/** Stats — Retro Futurism: atomic-age cream cards, orbiting satellites, starbursts. */
export function Stats() {
  return (
    <section aria-label="Club numbers" className="atomi-section cv-auto relative overflow-hidden py-20 sm:py-24">
      {/* starfield */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {starfield.map((s, i) => (
          <span key={i} className={cn("atomi-star gpu animate-pulse-soft absolute font-mono", s.size)} style={{ left: s.left, top: s.top, animationDelay: s.d }}>
            {s.s}
          </span>
        ))}
        <span className="atomi-ring gpu animate-spin-slow left-[4%] top-[16%] h-48 w-48" style={{ animationDuration: "58s" }} />
        <span className="atomi-ring gpu animate-spin-slow right-[6%] bottom-[8%] h-40 w-40" style={{ animationDuration: "46s", animationDirection: "reverse" }} />
      </div>

      <div className="container-x relative">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <Orb variant="swift" box={44} size="small" className="mr-1" />
            <span className="h-[3px] w-10 bg-[#b4552d]" />
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8a6a50]">The club, by the numbers</p>
          </div>
          <span className="rounded-full border border-[#b4552d]/35 bg-white/70 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#6b4a34]">
            verified · 2026
          </span>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {nums.map((n, i) => (
            <Cell key={n.l} {...n} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
