import { useScrollScrub } from "@/hooks/useScrollScrub";
import { useReducedMotion } from "@/hooks/useMedia";
import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";
import { LabWin } from "./ui/LabChrome";
import { cn } from "@/utils/cn";

const steps = [
  { w: "Week 01", t: "Zero to Xcode", d: "Install, navigate, run your first Playground. Optionals, types and functions — the Swift core, hands on keys.", tag: "Fundamentals" },
  { w: "Week 03", t: "Your first screen", d: "SwiftUI layouts, stacks and modifiers. Rebuild a real app's home screen pixel for pixel until it feels obvious.", tag: "SwiftUI" },
  { w: "Week 05", t: "Data that persists", d: "SwiftData models, @Query, CloudKit sync. Your app now remembers things across launches and devices.", tag: "Data" },
  { w: "Week 07", t: "Networking & async", d: "URLSession, async/await, JSON decoding, error states. You'll wire a live API and handle it failing gracefully.", tag: "Async" },
  { w: "Week 09", t: "Polish pass", d: "Motion, haptics, widgets, Live Activities, Dark Mode and accessibility. The difference between a demo and a product.", tag: "Craft" },
  { w: "Week 11", t: "TestFlight beta", d: "Ship to 50 real users on campus. Collect crashes through Xcode Organizer, triage, and cut a second build in a week.", tag: "Beta" },
  { w: "Week 13", t: "App Review", d: "Icons, screenshots, privacy manifests, metadata. We walk the submission checklist together, twice if needed.", tag: "Submit" },
  { w: "Week 14", t: "Demo Day", d: "Present to students, faculty and visiting engineers. Winners get incubation referrals and interview fast-tracks.", tag: "Launch" },
];

/** Timeline — Retro Futurism: mission-log rail, orbiting satellites, starburst weeks. */
export function Timeline() {
  const wrap = useScrollScrub<HTMLDivElement>();
  const reduce = useReducedMotion();
  const tones = ["#D9CFFF", "#BDE4FF", "#B9ECCD", "#FFEDA3", "#FFC6DD"];

  return (
    <section id="journey" className="atomi-section cv-auto relative overflow-hidden py-24 sm:py-32">
      {/* starfield + rings */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {[
          { left: "6%", top: "10%", s: "✦", size: "text-lg", d: "0s" },
          { left: "20%", top: "78%", s: "✧", size: "text-base", d: "1.4s" },
          { left: "82%", top: "14%", s: "✦", size: "text-base", d: "2.2s" },
          { left: "92%", top: "70%", s: "✧", size: "text-lg", d: "0.8s" },
        ].map((s, i) => (
          <span key={i} className={cn("atomi-star gpu animate-pulse-soft absolute font-mono", s.size)} style={{ left: s.left, top: s.top, animationDelay: s.d }}>
            {s.s}
          </span>
        ))}
        <span className="atomi-ring gpu animate-spin-slow right-[4%] top-[6%] h-48 w-48" style={{ animationDuration: "60s" }} />
      </div>

      <div className="container-x relative">
        <SectionHeader
          index="06"
          eyebrow="The 14-week sprint"
          title={
            <span className="text-[#2a1a10]">
              From <span className="text-[#c2521f]">print(&quot;Hello&quot;)</span> to a live App Store link.
            </span>
          }
          body={
            <span className="text-[#6b4a34]">
              One semester. Eight milestones. Every Thursday, 5pm, Block B — and a product in your hands by Demo Day.
            </span>
          }
        />

        <div ref={wrap} className="relative mt-16 lg:mt-24">
          {/* mission rail */}
          <div aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-[#b4552d]/25 sm:left-[11px]">
            <div
              className="gpu h-full w-[3px] -translate-x-px origin-top rounded-full"
              style={{
                transform: reduce ? "scaleY(1)" : "scaleY(clamp(0, calc(var(--scrub, 1) * 1.25), 1))",
                background: "linear-gradient(to bottom,#F05138,#FFC6DD 55%,#D9CFFF)",
                boxShadow: "0 0 12px rgba(240,81,56,0.25)",
              }}
            />
          </div>

          <ol className="space-y-8 sm:space-y-10">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.w} delay={i * 70} className="group relative pl-10 sm:pl-14">
                {/* orbiting satellite node */}
                <span className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center sm:h-6 sm:w-6">
                  <span
                    className="absolute h-full w-full rounded-full border border-dashed border-ink/50"
                    style={{ background: tones[i % tones.length], animation: reduce ? "none" : `orbit-spin ${9 + i}s linear infinite` }}
                  />
                  <span
                    className="relative h-2 w-2 rounded-full bg-[#F05138] transition-transform duration-500 motion-safe:group-hover:scale-125 sm:h-2.5 sm:w-2.5"
                    style={{ boxShadow: "0 0 0 3px #FFF8F2, 0 3px 10px #F0513833" }}
                  />
                </span>

                <article
                  className="lab-panel relative overflow-hidden"
                  style={
                    {
                      "--tone": tones[i % tones.length],
                      "--tilt-r": i % 2 ? "0.4deg" : "-0.4deg",
                    } as React.CSSProperties
                  }
                >
                  <LabWin file={`week_${s.w.slice(-2)}.swift`} />

                  <div className="lab-body relative z-10 grid gap-3 p-5 sm:grid-cols-[110px_1fr_auto] sm:items-baseline sm:gap-8 sm:p-6">
                    <span aria-hidden className="lab-halftone absolute -top-5 -right-3 h-[180px] w-[32%] -z-10" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#c2521f]">{s.w}</span>
                    <div>
                      <h3 className="text-balance text-xl font-bold tracking-tight text-ink sm:text-[1.6rem]">{s.t}</h3>
                      <p className="mt-2 max-w-xl text-pretty text-[15px] leading-relaxed text-muted">{s.d}</p>
                    </div>
                    <div className="lab-copy">
                      <span className="lab-tag">{s.tag}</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={200} className="mt-16 flex flex-wrap items-center gap-4">
          <a href="#join" className="atomi-btn inline-flex items-center px-6 py-3.5 text-sm">
            Start Week 01
          </a>
          <span className="lab-tag" style={{ "--tone": "#B9ECCD" } as React.CSSProperties}>No experience needed</span>
          <span className="lab-tag" style={{ "--tone": "#D9CFFF" } as React.CSSProperties}>14 weeks · one app</span>
        </Reveal>
      </div>
    </section>
  );
}
