import { useEffect, useState } from "react";
import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";
import { useReducedMotion } from "@/hooks/useMedia";
import { cn } from "@/utils/cn";

type App = {
  name: string;
  cat: string;
  by: string;
  from: string;
  to: string;
  accent: string;
  rows: string[];
};

const apps: App[] = [
  { name: "Campus", cat: "Events", by: "Club · 2025", from: "#F05138", to: "#FF8A5B", accent: "#F05138", rows: ["Techfest · Main Audi", "Guest Lecture · B2", "Hack Night · Lab 3"] },
  { name: "Mess Mate", cat: "Hostel", by: "Club · 2026", from: "#2B7FFF", to: "#7AB8FF", accent: "#2B7FFF", rows: ["Lunch · Poha, Chai", "Skip meal · 2 credits", "Rating · 4.6 ★"] },
  { name: "Pulse", cat: "Attendance", by: "Club · 2024", from: "#12B76A", to: "#6EE7B7", accent: "#12B76A", rows: ["Today · 5 of 6", "Live Activity on", "Bunk risk · Low"] },
  { name: "Raahi", cat: "Rides", by: "Club · 2026", from: "#7A5AF8", to: "#C4B5FD", accent: "#7A5AF8", rows: ["Gate 2 → Hostel", "3 seats left", "₹15 per head"] },
  { name: "StudyLoop", cat: "Focus", by: "Club · 2025", from: "#FF9F0A", to: "#FFD48A", accent: "#FF9F0A", rows: ["Session · 48 min", "Streak · 21 days", "Room · 4 friends"] },
  { name: "Parul Maps", cat: "Navigation", by: "Club · 2023", from: "#0BA5EC", to: "#7DD3FC", accent: "#0BA5EC", rows: ["Block B · 2 min", "Library · 6 min", "Canteen · open"] },
  { name: "CodeDeck", cat: "Practice", by: "Club · 2026", from: "#EC4899", to: "#FBCFE8", accent: "#EC4899", rows: ["Daily · Optionals", "Solved · 128", "Rank · 3rd"] },
];

function Screen({ app, live }: { app: App; live: boolean }) {
  return (
    <div
      className="gpu relative aspect-[9/19] w-[210px] overflow-hidden rounded-[24px] bg-white sm:w-[236px]"
      style={{
        border: "3px solid transparent",
        background: `linear-gradient(#FFF8F2,#fff) padding-box, linear-gradient(155deg,#fff,${app.to} 48%,#fff) border-box`,
        boxShadow: `inset 0 0 0 1px #0B0B0C12, 0 3px 0 ${app.to}88, 0 28px 55px -24px #0B0B0C40, 0 48px 80px -45px ${app.to}`,
      }}
    >
      {/* notch */}
      <div className="absolute left-1/2 top-2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-[#2a1a10]" />
      {/* status bar */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-3 text-[9px] font-semibold text-white">
        <span>9:41</span>
        <span className="flex gap-1">
          <span className="h-1.5 w-3 rounded-sm bg-white/90" />
          <span className="h-1.5 w-1 rounded-sm bg-white/60" />
        </span>
      </div>
      {/* header */}
      <div
        className="relative px-4 pt-2"
        style={{
          background: `linear-gradient(180deg, ${app.from}, ${app.to})`,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
      >
        <div className="pb-4 pt-2 text-white">
          <p className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-white/75">{app.cat}</p>
          <p className="mt-0.5 text-[17px] font-bold tracking-tight drop-shadow-[0_1px_1px_rgba(0,40,60,0.3)]">{app.name}</p>
          <div className="mt-2 flex gap-1.5">
            {["Live", "Beta", "iOS 18"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/50 bg-white/25 px-2 py-0.5 text-[8px] font-semibold text-white"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="h-6 rounded-t-2xl bg-white" />
      </div>
      {/* content */}
      <div className="bg-white px-3 pt-2">
        {app.rows.map((r, i) => (
          <div
            key={r}
            className="mb-1.5 flex items-center gap-2 rounded-xl border border-[#f1dcc8] bg-[#fffaf5] px-2.5 py-2"
            style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)" }}
          >
            <span
              className="h-6 w-6 shrink-0 rounded-lg"
              style={{
                background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.9), ${app.to} 70%), linear-gradient(140deg, ${app.from}, ${app.to})`,
                opacity: 1 - i * 0.18,
              }}
            />
            <span className="truncate text-[10px] font-medium text-[#2a1a10]/80">{r}</span>
          </div>
        ))}
        <div
          className="mt-2 h-14 rounded-xl"
          style={{ background: `linear-gradient(120deg, ${app.from}22, ${app.to}44)`, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)" }}
        />
      </div>
      {/* tab bar */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-around border-t border-[#f1dcc8] bg-white/90 px-4 py-2.5">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn("h-4 w-4 rounded-md", i !== 1 && "opacity-25")}
            style={{ background: i === 1 ? app.accent : "#2a1a10" }}
          />
        ))}
      </div>
      {live && (
        <span className="atomi-card absolute bottom-16 left-1/2 -translate-x-1/2 !rounded-full px-3 py-1 font-mono text-[8.5px] uppercase tracking-[0.18em] text-[#6b4a34]">
          {app.by}
        </span>
      )}
    </div>
  );
}

export function Coverflow() {
  const [active, setActive] = useState(Math.floor(apps.length / 2));
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % apps.length), 3600);
    return () => clearInterval(id);
  }, [reduce, active]);

  return (
    <section id="apps" className="atomi-section cv-auto relative overflow-hidden py-24 sm:py-32">
      {/* atomic backdrop: orbits + starbursts */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="atomi-ring gpu animate-spin-slow left-[8%] top-[12%] h-56 w-56" style={{ animationDuration: "64s" }} />
        <span className="atomi-ring gpu animate-spin-slow right-[6%] bottom-[10%] h-72 w-72" style={{ animationDuration: "80s", animationDirection: "reverse" }} />
        <span className="atomi-ring gpu animate-spin-slow left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 border-dashed" style={{ animationDuration: "120s" }} />
        {[
          { left: "10%", top: "20%", s: "✦", size: "text-lg", d: "0s" },
          { left: "24%", top: "70%", s: "✧", size: "text-base", d: "1.3s" },
          { left: "78%", top: "16%", s: "✦", size: "text-base", d: "2.1s" },
          { left: "90%", top: "60%", s: "✧", size: "text-lg", d: "0.7s" },
        ].map((s, i) => (
          <span key={i} className={`atomi-star gpu animate-pulse-soft absolute font-mono ${s.size}`} style={{ left: s.left, top: s.top, animationDelay: s.d }}>
            {s.s}
          </span>
        ))}
      </div>

      <div className="container-x relative">
        <SectionHeader
          align="center"
          index="05"
          eyebrow="Shipped by students"
          title={
            <span className="text-[#2a1a10]">
              Seven apps. Seven <span className="text-[#c2521f]">semesters of Thursdays.</span>
            </span>
          }
          body={
            <span className="text-[#6b4a34]">
              Swipe, tap or use the arrow keys. Every screen here was designed and built inside the club.
            </span>
          }
        />
      </div>

      <div className="relative mt-14 sm:mt-20">
        <div aria-hidden className="pointer-events-none absolute left-[8%] top-12 hidden h-12 w-12 rounded-2xl border border-white/80 sm:block motion-safe:animate-float" style={{ background: "linear-gradient(135deg,#fff,#D9CFFF)", boxShadow: "inset 0 1px 0 #fff, 0 12px 24px -12px #D9CFFF", rotate: "-14deg" }} />
        <div aria-hidden className="pointer-events-none absolute bottom-24 right-[8%] hidden h-8 w-8 rounded-full border border-white/80 sm:block motion-safe:animate-float" style={{ background: "radial-gradient(circle at 30% 25%,#fff,#B9ECCD)", animationDelay: "-4s" }} />
        <div
          className="scene-3d relative flex h-[440px] items-center justify-center sm:h-[520px]"
          style={{ perspective: "1600px" }}
        >
          {apps.map((app, i) => {
            let off = i - active;
            // shortest path around the loop
            if (off > apps.length / 2) off -= apps.length;
            if (off < -apps.length / 2) off += apps.length;
            const abs = Math.abs(off);
            if (abs > 3) return null;
            return (
              <button
                key={app.name}
                type="button"
                tabIndex={abs === 0 ? 0 : -1}
                aria-label={`${app.name} — ${app.cat}`}
                onClick={() => setActive(i)}
                className="gpu backface-hidden absolute left-1/2 top-1/2 preserve-3d rounded-[24px] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#F05138]"
                style={{
                  transform: `translate(-50%, -50%) translateX(${off * 46}%) rotateY(${-off * 26}deg) translateZ(${-abs * 150}px) scale(${1 - abs * 0.07})`,
                  opacity: abs > 2 ? 0.25 : 1 - abs * 0.12,
                  zIndex: 50 - abs,
                  transition: reduce ? "none" : "transform 0.85s var(--ease-out-expo), opacity 0.85s var(--ease-out-expo)",
                }}
              >
                <Reveal variant="scale" delay={i * 65}>
                  <Screen app={app} live={abs === 0} />
                </Reveal>
              </button>
            );
          })}
        </div>

        {/* controls */}
        <div className="relative z-[60] mt-4 flex items-center justify-center gap-5">
          {[
            { dir: -1, label: "Previous app" },
            { dir: 1, label: "Next app" },
          ].map(({ dir, label }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              onClick={() => setActive((a) => (a + dir + apps.length) % apps.length)}
              className="atomi-card group flex h-12 w-12 items-center justify-center !rounded-full text-[#6b4a34] transition-transform duration-300 motion-safe:hover:scale-110 motion-safe:active:scale-95"
            >
              <svg className={cn("h-4 w-4", dir === -1 && "rotate-180")} viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>

        {/* dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {apps.map((a, i) => (
            <button
              key={a.name}
              type="button"
              aria-label={`Show ${a.name}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              /* The dot itself stays 6px — but a 6x6 tap target is not a tap
                 target. ::before grows the hit box to 14x46 without changing
                 a single pixel of the layout: horizontally it stops at exactly
                 the gap midpoint, so neighbouring dots can never overlap. */
              className={cn(
                "relative h-1.5 rounded-full transition-transform duration-300 motion-safe:hover:scale-110",
                "before:absolute before:-inset-x-1 before:-inset-y-5 before:content-['']",
                i === active ? "w-8 bg-[#b4552d]" : "w-1.5 bg-[#b4552d]/25 hover:bg-[#b4552d]/45"
              )}
              style={i === active ? { boxShadow: "0 0 10px rgba(180,85,45,0.6)" } : undefined}
            />
          ))}
        </div>
      </div>

      <Reveal delay={200} className="container-x relative mt-10 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8a6a50]">
          {apps[active].name} · {apps[active].cat} · {apps[active].by}
        </p>
      </Reveal>
    </section>
  );
}
