import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";
import { ScrollStrip } from "./ui/ScrollStrip";
import { useScrollScrub } from "@/hooks/useScrollScrub";
import { useReducedMotion } from "@/hooks/useMedia";

const chips = [
  { k: "panic level", v: "0" },
  { k: "errors befriended", v: "4,096" },
  { k: "stack traces read", v: "1,024" },
  { k: "fear remaining", v: "null" },
];

const tones = ["#B9ECCD", "#D9CFFF", "#BDE4FF", "#FFEDA3"];

export function Terminal() {
  const progress = useScrollScrub<HTMLDivElement>();
  const reduce = useReducedMotion();
  return (
    <section id="terminal" className="webcore-section cv-auto relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="webcore-stars pointer-events-none absolute inset-0 opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 45% at 50% 0%, rgba(240,81,56,0.06), transparent 60%)" }}
      />

      <div className="container-x relative">
        <ScrollStrip items={["CTRL", "ALT", "DELIGHT"]} travel={20} className="mb-6 opacity-90" />

        <SectionHeader
          index="13"
          eyebrow="The Debug Lab"
          align="left"
          title={
            <span className="text-ink">
              Errors are just <span className="text-[#F05138]">quests</span> in disguise.
            </span>
          }
          body={
            <span className="text-muted">
              A blue screen isn't the end of the world â€” it's the start of the best story you'll tell on Demo Day. In
              the Debug Lab we collect crashes like trophies, read stack traces like detective novels, and turn "it
              works on my machine" into "it ships from ours."
            </span>
          }
        />

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-12">
          <Reveal variant="flip3d" className="lg:col-span-7">
            <div
              className="lab-panel lab-panel--xl overflow-hidden"
              style={{ "--tone": "#FFEDA3", "--tilt-r": "-0.4deg" } as React.CSSProperties}
            >
              <header className="lab-bar">
                <span className="lab-dots" aria-hidden>
                  <span className="lab-dot" />
                  <span className="lab-dot" />
                  <span className="lab-dot" />
                </span>
                <span className="lab-file">SWIFT_STUDENT.dmg</span>
                <span className="lab-badge">13</span>
              </header>

              <div className="p-7 sm:p-10" style={{ background: "repeating-linear-gradient(180deg,#0B0B0C02 0 1px,transparent 1px 4px), linear-gradient(135deg,#FFF8F2,#FFEDA333)" }}>
                <p className="text-6xl font-bold leading-none text-[#F05138] sm:text-7xl">:(</p>
                <p className="mt-5 text-xl font-bold tracking-tight text-ink sm:text-2xl">
                  SWIFT_STUDENT.dmg ran into a learning curve
                </p>
                <p className="mt-1.5 font-mono text-[14px] text-muted">This is not a crash. It&apos;s Tuesday.</p>

                <div className="mt-8">
                  <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50">
                    <span>collecting courage</span>
                    <span className="text-[#F05138]">99%</span>
                  </div>
                  <div ref={progress} className="mt-2 h-3 overflow-hidden rounded-none border border-line bg-paper">
                    <div
                      className="h-full origin-left"
                      style={{
                        background: "repeating-linear-gradient(90deg,#F05138 0 8px,#FFF8F2 8px 10px)",
                        transform: reduce ? "scaleX(0.99)" : "scaleX(clamp(0.02, calc(var(--scrub, 1) * 1.8), 0.99))",
                      }}
                    />
                  </div>
                </div>

                <dl className="mt-8 space-y-3 border-t border-line pt-6 text-[14px]">
                  <Reveal delay={100} className="flex flex-wrap justify-between gap-2">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">what you gained</dt>
                    <dd className="font-semibold text-ink">debugging superpowers + 40 new words for "oops"</dd>
                  </Reveal>
                  <Reveal delay={220} className="flex flex-wrap justify-between gap-2">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">next session</dt>
                    <dd className="font-semibold text-ink">Thursdays Â· Lab 204 Â· 5 PM Â· bring the crash</dd>
                  </Reveal>
                  <Reveal delay={340} className="flex flex-wrap justify-between gap-2">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">stop code</dt>
                    <dd className="font-mono font-semibold text-[#F05138]">0x000_SHIP_ANYWAY</dd>
                  </Reveal>
                </dl>

                <p className="lab-copy mt-7 font-mono text-[12px] text-ink/50">
                  press <span className="lab-tag mx-1">Join the club</span> to continue _
                  <span className="ml-1 inline-block h-3.5 w-[7px] translate-y-0.5 animate-blink bg-[#F05138]" />
                </p>
              </div>

              <footer className="lab-status">
                <span>1 error found â€” it&apos;s a friend now</span>
                <span>NUM</span>
              </footer>
            </div>
          </Reveal>

          <div className="grid content-start gap-4 lg:col-span-5">
            {chips.map((c, i) => (
              <Reveal key={c.k} variant={i % 2 ? "right" : "left"} delay={i * 110}>
                <div
                  className="lab-panel flex items-center justify-between gap-6 px-5 py-3.5"
                  style={{ "--tone": tones[i], "--tilt-r": i % 2 ? "0.4deg" : "-0.4deg" } as React.CSSProperties}
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">{c.k}</span>
                  <span className="font-mono text-lg font-bold text-[#F05138]">
                    {c.v}
                  </span>
                </div>
              </Reveal>
            ))}

            <Reveal variant="right" delay={480}>
              <div
                className="lab-panel overflow-hidden p-6"
                style={{ "--tone": "#FFD3BC", "--tilt-r": "0.4deg" } as React.CSSProperties}
              >
                <span aria-hidden className="lab-halftone absolute -top-3 -right-3 h-[55%] w-[45%] -z-10" />
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#F05138]/70">lab rule nÂº 404</p>
                <p className="mt-2 text-lg font-bold tracking-tight text-ink">
                  "If it compiles on the first try, you didn&apos;t dream big enough."
                </p>
                <p className="mt-3 font-mono text-[13px] text-muted">â€” every mentor here, at least once a week</p>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={160} className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href="#cta"
            className="inline-flex items-center gap-2 rounded-sm border border-[#F05138] bg-[#F05138]/15 px-6 py-3.5 text-sm font-bold text-[#F05138] transition-transform duration-300 motion-safe:hover:-translate-y-0.5 hover:bg-[#F05138]/25"
            style={{ boxShadow: "0 0 24px -8px rgba(240,81,56,0.3)" }}
          >
            Learn to debug with us
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#program" className="win98-btn inline-flex items-center !px-5 !py-2.5 !text-[12px]">
            See the tracks
          </a>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/40">no crash left behind Â· est. 2021</span>
        </Reveal>
      </div>
    </section>
  );
}
