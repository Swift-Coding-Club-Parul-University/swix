import { useState } from "react";
import { Reveal } from "./ui/Reveal";
import { Magnetic } from "./ui/Magnetic";
import { Orb } from "./ui/Orb";
import { GlassCube } from "./ui/GlassCube";
import { PrismOrb } from "./ui/PrismOrb";
import { GlassRing } from "./ui/GlassRing";
import { cn } from "@/utils/cn";

const milestones = [
  { w: "Week 01", t: "Swift basics in a Playground" },
  { w: "Week 04", t: "Your first SwiftUI screen" },
  { w: "Week 09", t: "TestFlight beta to friends" },
  { w: "Week 14", t: "Demo Day + App Review" },
];

const starfield = [
  { left: "8%", top: "14%", s: "✦", size: "text-xl", d: "0s" },
  { left: "20%", top: "70%", s: "✧", size: "text-base", d: "1.2s" },
  { left: "38%", top: "10%", s: "·", size: "text-2xl", d: "2s" },
  { left: "60%", top: "18%", s: "✦", size: "text-base", d: "0.8s" },
  { left: "78%", top: "64%", s: "✧", size: "text-xl", d: "1.6s" },
  { left: "92%", top: "24%", s: "✦", size: "text-lg", d: "2.4s" },
];

/** CTA — Retro Futurism: the launchpad. Atomic-age panel, orbits, starbursts. */
export function CTA() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setState("done");
  };

  return (
    <section id="cta" className="cv-auto py-24 sm:py-32">
      <div className="container-x">
        <Reveal variant="scale">
          <div
            className="lab-panel lab-panel--xl relative overflow-hidden px-6 py-16 sm:px-12 sm:py-24 lg:px-20"
            style={
              {
                "--tone": "#FFD3BC",
                "--panel-r": "36px",
                "--tilt-r": "0.4deg",
              } as React.CSSProperties
            }
          >
            {/* starfield + orbits inside the panel */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              {starfield.map((s, i) => (
                <span key={i} className={cn("atomi-star gpu animate-pulse-soft absolute font-mono", s.size)} style={{ left: s.left, top: s.top, animationDelay: s.d }}>
                  {s.s}
                </span>
              ))}
              <span className="atomi-ring gpu animate-spin-slow right-[4%] top-[8%] h-48 w-48" style={{ animationDuration: "52s" }} />
              <span className="atomi-ring gpu animate-spin-slow bottom-[6%] left-[3%] h-64 w-64" style={{ animationDuration: "66s", animationDirection: "reverse" }} />
              {/* orbiting comet bead */}
              <PrismOrb className="left-[6%] top-[10%] hidden sm:block" size={34} tone="rose" />
              <span className="absolute right-[10%] top-[16%] h-3 w-3" style={{ animation: "atomi-orbit 16s linear infinite", ["--orbit-r" as string]: "110px" }}>
                <span
                  className="block h-3 w-3 rounded-full"
                  style={{ background: "radial-gradient(circle at 32% 28%, #fff, #b4552d 65%)", boxShadow: "0 0 14px rgba(180,85,45,0.9)" }}
                />
              </span>
            </div>

            <div className="relative grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="lab-tag">Spring '26</span>
                  <span className="lab-tag">Applications close 28 Feb</span>
                  <Orb variant="swift" box={48} className="ml-1" />
                </div>
                <h2 className="display mt-6 text-balance text-4xl text-[#2a1a10] sm:text-6xl lg:text-[4.6rem]">
                  Your first app is one <span className="text-[#c2521f]">Thursday</span> away.
                </h2>
                <p className="mt-6 max-w-xl text-pretty text-lg text-[#6b4a34]">
                  Free for every Parul student. Leave your university email — we&apos;ll send the application
                  link, lab schedule and a Swift starter kit.
                </p>

                <form onSubmit={submit} className="mt-10 max-w-lg" aria-label="Apply to Swift Coding Club">
                  <div
                    className="glass-panel flex flex-col gap-2 rounded-[22px] p-2 sm:flex-row"
                    style={{
                      borderColor: "rgba(180,85,45,0.35)",
                    }}
                  >
                    <label htmlFor="email" className="sr-only">University email</label>
                    <input
                      id="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@paruluniversity.ac.in"
                      className="h-12 flex-1 rounded-xl bg-transparent px-5 text-[15px] text-[#2a1a10] placeholder:text-[#8a6a50]/60 focus:outline-none"
                    />
                    <Magnetic strength={0.18}>
                      <button type="submit" className={cn("atomi-btn h-12 px-6 text-sm", state === "done" && "!bg-[#2f9e5f] !shadow-[0_6px_0_#1d6e3e]")} style={{ boxShadow: "0 6px 0 #b4552d" }}>
                        {state === "done" ? "Check your inbox ✓" : "Get the application"}
                      </button>
                    </Magnetic>
                  </div>
                  <p className="mt-3 font-mono text-xs text-[#8a6a50]" aria-live="polite">
                    {state === "done" ? "Sent. See you Thursday, 5pm — Block B, 3F." : "Any @paruluniversity.ac.in address. No spam, ever."}
                  </p>
                </form>
              </div>

              <div className="lg:col-span-4 lg:pl-8">
                <div
                  className="lab-panel mb-8 hidden p-5 lg:block"
                  style={
                    {
                      "--tone": "#FFEDA3",
                      "--panel-r": "26px",
                      "--tilt-r": "-0.4deg",
                    } as React.CSSProperties
                  }
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6b4a34]">What you get</p>
                  <ul className="mt-3 space-y-2 text-[13.5px] font-medium text-[#2a1a10]">
                    <li className="flex items-center gap-2"><span className="text-swift">✦</span> Weekly lab access + Macs</li>
                    <li className="flex items-center gap-2"><span className="text-swift">✧</span> Senior mentor, 1:1</li>
                    <li className="flex items-center gap-2"><span className="text-swift">✦</span> TestFlight & App Store pipeline</li>
                    <li className="flex items-center gap-2"><span className="text-swift">✧</span> Swift starter kit, free</li>
                  </ul>
                </div>
                <ul className="space-y-6 border-l border-dashed border-[#b4552d]/40 pl-6">
                  {milestones.map(({ w, t }, i) => (
                    <li key={w} className="relative">
                      {/* orbit node */}
                      <span className="absolute -left-[33px] top-1.5 grid h-4 w-4 place-items-center" aria-hidden>
                        <span className="absolute h-4 w-4 rounded-full border border-dashed border-[#b4552d]/50" style={{ animation: `orbit-spin ${10 + i * 3}s linear infinite` }} />
                        <span className="h-1.5 w-1.5 rounded-full bg-[#b4552d]" />
                      </span>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8a6a50]">{w}</p>
                      <p className="mt-0.5 text-[15px] font-semibold text-[#2a1a10]">{t}</p>
                      <div className="mt-2 h-px w-full bg-[#b4552d]/20">
                        <div
                          className="gpu h-px bg-[#b4552d] transition-[width] duration-1000 ease-[var(--ease-out-expo)]"
                          style={{ width: `${25 + i * 25}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
                <div aria-hidden className="pointer-events-none relative mt-10 hidden h-48 lg:block">
                  <div
                    className="absolute inset-x-0 bottom-5 h-16 rounded-[50%] border border-[#b4552d]/20"
                    style={{ transform: "rotateX(60deg)", background: "radial-gradient(ellipse, rgba(180,85,45,0.12), transparent 70%)", boxShadow: "0 0 0 12px rgba(180,85,45,0.035)" }}
                  />
                  <GlassCube className="left-5 top-10" size={88} tone="amber" depth={0} delay={-5} />
                  <GlassCube className="right-2 top-24" size={40} tone="ice" depth={0} delay={-11} />
                  <GlassRing className="left-1/2 -top-14 -translate-x-1/2" size={210} thickness={10} tilt={70} spin={40} tone="amber" />
                  <PrismOrb className="right-8 top-2" size={44} tone="swift" satellite />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
