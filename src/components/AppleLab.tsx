import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";
import { Tilt } from "./ui/Tilt";
import { GlassCube } from "./ui/GlassCube";
import { LabFoot, LabWin } from "./ui/LabChrome";
import { PrismOrb } from "./ui/PrismOrb";
import { ShaderBackground } from "./ui/feature-shader-cards";
import { cn } from "@/utils/cn";

const curriculum = [
  { n: "01", t: "Explorations", d: "An introduction to coding, app design and problem-solving through interactive, real-world projects." },
  { n: "02", t: "Fundamentals", d: "Build a strong foundation in Swift, user-interface design and iOS development by creating complete apps." },
  { n: "03", t: "Data Collections", d: "Advanced concepts: data management, networking and modern app architecture." },
  { n: "04", t: "App Design", d: "Apply Apple's design principles to turn ideas into intuitive, user-centred apps." },
  { n: "05", t: "Project-Based", d: "Guided labs, collaborative projects, prototyping â€” the work that becomes your portfolio." },
];

const stageTones = ["#FFD3BC", "#B9ECCD", "#BDE4FF", "#FFEDA3", "#FFC6DD"];

const devices = [
  { n: 22, l: "iMacs" },
  { n: 2, l: "MacBooks" },
  { n: 2, l: "iPads" },
  { n: 2, l: "iPhones" },
  { n: 1, l: "Apple TV" },
];

const certs = [
  { t: "App Development with Swift Associate", d: "Foundational knowledge of Swift, Xcode and core development concepts.", star: "âœ¦" },
  { t: "App Development with Swift Certified User", d: "Proficiency to design, develop and deploy apps across Apple platforms.", star: "âœ¹" },
];

const starfield = [
  { left: "4%", top: "12%", s: "âœ¦", size: "text-lg", d: "0s" },
  { left: "12%", top: "64%", s: "âœ§", size: "text-base", d: "1.2s" },
  { left: "26%", top: "22%", s: "Â·", size: "text-xl", d: "2s" },
  { left: "44%", top: "8%", s: "âœ¦", size: "text-sm", d: "0.6s" },
  { left: "58%", top: "70%", s: "âœ§", size: "text-lg", d: "1.8s" },
  { left: "72%", top: "16%", s: "âœ¦", size: "text-base", d: "2.6s" },
  { left: "86%", top: "44%", s: "âœ§", size: "text-xl", d: "0.9s" },
  { left: "93%", top: "78%", s: "Â·", size: "text-lg", d: "1.5s" },
];

/** Apple Lab â€” Retro Futurism: Atomic Age cream gradients, orbits, starbursts, boomerang forms. */
export function AppleLab() {
  return (
    <section id="apple-lab" className="atomi-section cv-auto relative overflow-hidden py-24 text-ink sm:py-32">
      {/* starfield + orbits */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {starfield.map((s, i) => (
          <span
            key={i}
            className={cn("atomi-star gpu animate-pulse-soft absolute font-mono", s.size)}
            style={{ left: s.left, top: s.top, animationDelay: s.d }}
          >
            {s.s}
          </span>
        ))}
        <span className="atomi-ring gpu animate-spin-slow left-[6%] top-[10%] h-40 w-40" style={{ animationDuration: "50s" }} />
        <span className="atomi-ring gpu animate-spin-slow right-[8%] top-[30%] h-56 w-56" style={{ animationDuration: "64s", animationDirection: "reverse" }} />
        {/* boomerang arch, the googie signature */}
        <svg className="absolute bottom-0 left-0 h-32 w-full opacity-30" viewBox="0 0 1200 120" fill="none" preserveAspectRatio="none" aria-hidden>
          <path d="M0 120 Q 300 0 600 60 T 1200 30" stroke="#0b0b0c" strokeWidth="2" strokeDasharray="6 8" />
          <path d="M0 140 Q 300 20 600 80 T 1200 50" stroke="#b4552d" strokeWidth="2" />
        </svg>
      </div>

      <GlassCube size={54} tone="ice" depth={24} delay={-3} className="right-[6%] bottom-10" />
      <div className="container-x relative">
        <SectionHeader
          index="04"
          eyebrow="Apple Authorized Â· Parul University"
          title={
            <span className="text-[#2a1a10]">
              An Apple Innovation Lab, <span className="text-[#c2521f]">right on campus.</span>
            </span>
          }
          body={
            <span className="text-[#6b4a34]">
              Parul University hosts an Apple Authorized Training Center â€” the same Develop in Swift curriculum Apple
              uses worldwide, delivered by Apple Certified Trainers on 29 Apple devices. It's free, it's open to every
              student, and it's where this club actually happens.
            </span>
          }
        />

        {/* Top stat banner + hero highlight */}
        <div className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-12 lg:gap-6">
          {/* Praneel spotlight */}
          <Reveal variant="scale" className="lg:col-span-7">
            <Tilt max={5} lift={18} className="h-full">
              <article
                className="lab-panel relative flex h-full flex-col overflow-hidden"
                style={
                  {
                    "--tone": "#FFD3BC",
                    "--panel-r": "32px",
                    "--tilt-r": "-0.4deg",
                  } as React.CSSProperties
                }
              >
                <ShaderBackground index={8} speed={0} className="!rounded-[30px] opacity-[0.55]" />

                <LabWin file="student_success.swift" n="04" />

                <div className="lab-body relative z-10 flex flex-1 flex-col p-7 sm:p-10">
                  <div className="lab-band">
                    <span aria-hidden className="lab-halftone absolute -top-6 -right-4 h-[230px] w-[46%] -z-10" />
                    <div className="lab-copy flex flex-wrap items-center gap-3 pr-16 sm:pr-24">
                      <span className="lab-tag">Student Success Â· 2026</span>
                      <span className="lab-tag">First-year</span>
                    </div>
                    <PrismOrb className="absolute -top-4 right-0" size={58} tone="rose" satellite />
                  </div>

                  <h3 className="display mt-6 text-balance text-3xl text-ink sm:text-5xl">
                    From no Mac to Apple's <span className="text-[#c2521f]">global Top 350</span>.
                  </h3>
                  <p className="mt-5 max-w-xl text-pretty text-[16px] leading-relaxed text-muted">
                    Praneel Pandey, first-year B.Tech CSE, didn't own a Mac. He learned Swift on the Apple
                    Lab's curriculum through this club, built <strong className="text-ink">Blink Break</strong> â€” an
                    eye-movement-controlled game in SwiftUI â€” and Apple put him in the top 350
                    of 37 countries in the Swift Student Challenge 2026. Five months, start to finish.
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {[
                      ["5 mo", "first line of code to global top 350"],
                      ["10â€“12h", "daily in the final month"],
                      ["0 Macs", "owned by Praneel â€” used the lab"],
                    ].map(([n, l]) => (
                      <div
                        key={n}
                        className="rounded-[14px] border-[1.5px] border-ink bg-white/85 p-4 shadow-[3px_3px_0_var(--color-ink)] motion-safe:transition-transform motion-safe:hover:-translate-y-0.5"
                      >
                        <p className="display text-2xl text-[#c2521f]">{n}</p>
                        <p className="mt-1 text-[11.5px] leading-snug text-muted">{l}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex-1" />
                  <a href="#cta" className="group mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#c2521f] hover:text-ink">
                    Read the full story
                    <span aria-hidden className="motion-safe:transition-transform motion-safe:group-hover:translate-x-1">â†’</span>
                  </a>
                </div>

                <LabFoot left="story Â· 2026" right="top 350" />
              </article>
            </Tilt>
          </Reveal>

          {/* Lab specs */}
          <div className="grid gap-4 lg:col-span-5">
            <Reveal delay={120}>
              <article
                className="lab-panel relative flex flex-col overflow-hidden"
                style={
                  {
                    "--tone": "#B9ECCD",
                    "--panel-r": "28px",
                    "--tilt-r": "0.4deg",
                  } as React.CSSProperties
                }
              >
                <ShaderBackground index={9} speed={0} className="!rounded-[26px] opacity-[0.55]" />

                <LabWin file="apple_lab.specs" n="29" />

                <div className="lab-body relative z-10 flex-1 p-6 sm:p-8">
                  <div className="lab-band">
                    <span aria-hidden className="lab-halftone absolute -top-5 -right-3 h-[210px] w-[45%] -z-10" />
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">The Apple Lab Â· Block B</p>
                    <p className="display mt-3 text-4xl text-ink sm:text-5xl">29 devices</p>
                    <p className="mt-1 text-[13.5px] text-muted">So you don't need to own a Mac.</p>
                    <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                      {devices.map((d) => (
                        <div
                          key={d.l}
                          className="flex items-baseline gap-1.5 rounded-[12px] border-[1.5px] border-ink bg-white/85 px-3 py-2 shadow-[2.5px_2.5px_0_var(--color-ink)] motion-safe:transition-transform motion-safe:hover:-translate-y-0.5"
                        >
                          <span className="display text-lg leading-none text-[#c2521f]">{d.n}Ã—</span>
                          <span className="font-mono text-[11px] font-semibold text-muted">{d.l}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <LabFoot left="block b Â· floor 3" right="open weekdays" />
              </article>
            </Reveal>

            <Reveal delay={200}>
              <article
                className="lab-panel relative flex flex-col overflow-hidden"
                style={
                  {
                    "--tone": "#BDE4FF",
                    "--panel-r": "28px",
                    "--tilt-r": "-0.4deg",
                  } as React.CSSProperties
                }
              >
                <ShaderBackground index={10} speed={0} className="!rounded-[26px] opacity-[0.55]" />

                <LabWin file="trainer_profile.swift" n="ACT" />

                <div className="lab-body relative z-10 flex-1 p-6 sm:p-8">
                  <div className="lab-band flex items-start justify-between gap-4">
                    <span aria-hidden className="lab-halftone absolute -top-5 -right-3 h-[200px] w-[46%] -z-10" />
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">Your trainer</p>
                      <p className="mt-2 text-[17px] font-bold tracking-tight text-ink">Umang Panchal</p>
                      <p className="text-[13px] text-muted">Apple Certified Trainer</p>
                    </div>
                    <span className="lab-icon grid h-12 w-12 shrink-0 place-items-center rounded-[13px] font-mono text-[10px] font-bold tracking-[0.08em]">
                      ACT
                    </span>
                  </div>
                  <p className="mt-5 text-[13.5px] leading-relaxed text-muted">
                    Leads the Develop in Swift curriculum on campus. Mentored the team behind Parul's
                    Swift Student Challenge entries â€” including Praneel's Top-350 project.
                  </p>
                  <div className="lab-copy mt-5 flex flex-wrap gap-2.5">
                    {["Swift", "SwiftUI", "App dev"].map((s) => (
                      <span key={s} className="lab-tag">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <LabFoot left="mentor Â· 1:1 slots" right="accepting mentees" />
              </article>
            </Reveal>
          </div>
        </div>

        {/* Develop in Swift curriculum */}
        <div className="mt-20 lg:mt-28">
          <div className="grid gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8a6a50]">Apple's curriculum Â· on your timetable</p>
                <h2 className="display mt-4 text-balance text-3xl text-[#2a1a10] sm:text-[2.8rem]">
                  From first line of code <span className="text-[#c2521f]">to finished app</span>.
                </h2>
                <p className="mt-6 text-pretty text-[15px] leading-relaxed text-[#6b4a34]">
                  Learning follows Apple's official Develop in Swift curriculum â€” the same structured
                  program Apple uses worldwide. Five stages. One finished app. A digital badge you can
                  put on your LinkedIn.
                </p>
              </div>
            </Reveal>

            <div className="lg:col-span-8">
              <ol className="space-y-5">
                {curriculum.map((c, i) => (
                  <Reveal as="li" key={c.n} delay={i * 80}>
                    <article
                      className="lab-panel relative overflow-hidden"
                      style={
                        {
                          "--tone": stageTones[i % stageTones.length],
                          "--panel-r": "22px",
                          "--tilt-r": i % 2 ? "0.4deg" : "-0.4deg",
                        } as React.CSSProperties
                      }
                    >
                      <LabWin file={`stage_${c.n}.swift`} n={c.n} />

                      <div className="lab-body relative z-10 flex items-start gap-5 p-6 sm:gap-6 sm:p-7">
                        <span aria-hidden className="lab-halftone absolute -top-5 -right-3 h-[180px] w-[34%] -z-10" />
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] border-[1.5px] border-ink bg-white/85 font-mono text-[12px] font-bold text-[#c2521f] shadow-[3px_3px_0_var(--color-ink)]">
                          {c.n}
                        </span>
                        <div>
                          <h3 className="text-xl font-bold tracking-tight text-ink sm:text-[1.6rem]">{c.t}</h3>
                          <p className="mt-2 max-w-xl text-pretty text-[15px] leading-relaxed text-muted">{c.d}</p>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </ol>

              <Reveal delay={400} className="mt-7 flex flex-wrap items-center gap-4">
                <a href="#cta" className="atomi-btn inline-flex items-center px-6 py-3 text-sm">Start Explorations</a>
                <span className="lab-tag" style={{ "--tone": "#FFD3BC" } as React.CSSProperties}>New batch every week</span>
                <span className="lab-tag" style={{ "--tone": "#B9ECCD" } as React.CSSProperties}>One-week intensive</span>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-20 lg:mt-28">
          <Reveal className="mb-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8a6a50]">Apple certifications</p>
            <h2 className="display mt-3 max-w-3xl text-balance text-3xl text-[#2a1a10] sm:text-[2.6rem]">
              Credentials Apple <span className="text-[#c2521f]">recognises</span> â€” and recruiters trust.
            </h2>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-2">
            {certs.map((c, i) => (
              <Reveal key={c.t} delay={i * 100}>
                <Tilt max={5} lift={14} className="h-full">
                  <article
                    className="lab-panel relative flex h-full flex-col overflow-hidden"
                    style={
                      {
                        "--tone": i % 2 ? "#FFC6DD" : "#D9CFFF",
                        "--panel-r": "28px",
                        "--tilt-r": i % 2 ? "-0.4deg" : "0.4deg",
                      } as React.CSSProperties
                    }
                  >
                    <ShaderBackground index={11} speed={0} className="!rounded-[26px] opacity-[0.55]" />

                    <LabWin file={`credential_0${i + 1}.swift`} n={`0${i + 1}`} />

                    <div className="lab-body relative z-10 flex flex-1 flex-col p-7">
                      <div className="lab-band flex items-start justify-between gap-4">
                        <span aria-hidden className="lab-halftone absolute -top-5 -right-3 h-[190px] w-[44%] -z-10" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">Apple credential</span>
                        <div className="relative grid h-14 w-14 shrink-0 place-items-center">
                          <span className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-[#b4552d]/50" style={{ animationDuration: "30s" }} />
                          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#b4552d] text-lg text-[#ffe8d2] shadow-[0_10px_22px_-10px_rgba(180,85,45,0.8)]">
                            {c.star}
                          </span>
                        </div>
                      </div>
                      <h3 className="mt-5 text-balance text-xl font-bold tracking-tight text-ink sm:text-2xl">{c.t}</h3>
                      <p className="mt-3 text-[14px] leading-relaxed text-muted">{c.d}</p>
                      <div className="lab-copy mt-6 flex flex-wrap gap-2.5">
                        {["Globally recognised", "Digital badge", "CV-ready"].map((p) => (
                          <span key={p} className="lab-tag">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    <LabFoot left={`level 0${i + 1}`} right="verifiable badge" />
                  </article>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
