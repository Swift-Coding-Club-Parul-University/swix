import community from "@/assets/community.jpg";
import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";
import { Tilt } from "./ui/Tilt";
import { GlassCube } from "./ui/GlassCube";
import { LabFoot, LabWin } from "./ui/LabChrome";
import { ShaderBackground } from "./ui/feature-shader-cards";
import { useScrollScrub } from "@/hooks/useScrollScrub";

const benefits = [
  {
    n: "01",
    title: "Swift is the most in-demand mobile skill in India right now",
    body: "iOS engineers command a 30–40% premium over the mobile median. Startups in Bengaluru, Pune and Ahmedabad are hiring SwiftUI developers faster than universities produce them.",
    tag: "Demand",
  },
  {
    n: "02",
    title: "One language, every Apple platform",
    body: "iPhone, iPad, Mac, Watch, Vision Pro — and now servers. Learn Swift once and your ceiling is the entire Apple ecosystem, not a single screen size.",
    tag: "Reach",
  },
  {
    n: "03",
    title: "A portfolio that recruiters can download",
    body: "A live App Store link beats a GitHub README. Our members walk into placements with a product, reviews and real usage numbers.",
    tag: "Proof",
  },
  {
    n: "04",
    title: "Mac Lab access & Apple Developer membership",
    body: "Don't own a Mac? Members get scheduled access to the PIT Mac Lab plus a subsidised developer account for publishing under the club's team.",
    tag: "Access",
  },
];

const starfield = [
  { left: "5%", top: "14%", s: "✦", size: "text-lg", d: "0s" },
  { left: "16%", top: "72%", s: "✧", size: "text-base", d: "1.3s" },
  { left: "88%", top: "18%", s: "✦", size: "text-base", d: "2.1s" },
  { left: "94%", top: "64%", s: "·", size: "text-xl", d: "0.7s" },
];

const tones = ["#FFEDA3", "#D9CFFF", "#B9ECCD", "#BDE4FF"];

export function Benefits() {
  const scrub = useScrollScrub<HTMLElement>();
  return (
    <section ref={scrub} id="why" className="atomi-section cv-auto relative overflow-hidden py-24 sm:py-32" style={{ background: "radial-gradient(ellipse at 0% 35%, #D9CFFF55, transparent 50%), radial-gradient(ellipse at 100% 80%, #B9ECCD66, transparent 50%), #FFF8F2" }}>
      {/* starfield + orbit rings */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {starfield.map((s, i) => (
          <span key={i} className={`atomi-star gpu motion-safe:animate-pulse-soft absolute font-mono ${s.size}`} style={{ left: s.left, top: s.top, animationDelay: s.d }}>
            {s.s}
          </span>
        ))}
        <span className="atomi-ring gpu motion-safe:animate-spin-slow right-[4%] top-[10%] h-44 w-44" style={{ animationDuration: "56s" }} />
        <span className="atomi-ring gpu motion-safe:animate-spin-slow left-[3%] bottom-[6%] h-56 w-56" style={{ animationDuration: "68s", animationDirection: "reverse" }} />
      </div>

      <div className="container-x relative">
        <div aria-hidden className="pointer-events-none absolute left-8 top-28 hidden h-20 w-20 motion-reduce:!transform-none lg:block" style={{ transform: "translateY(calc((var(--scrub, 0.5) - 0.5) * -48px))" }}>
          <GlassCube className="left-0 top-0" size={64} tone="ice" depth={16} delay={-6} />
        </div>
        <SectionHeader
          index="02"
          eyebrow="Why Swift, why now"
          title={
            <span className="text-[#2a1a10]">
              The most valuable hour <span className="text-[#c2521f]">of your week.</span>
            </span>
          }
          body={
            <span className="text-[#6b4a34]">
              High-demand skills, real portfolios, and lab access — the case for spending your Thursday evenings with Swift.
            </span>
          }
        />

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Sticky visual */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal variant="scale">
                <Tilt max={3} lift={6} scale={1.005} sheen={false}>
                  <figure
                    className="lab-panel group relative overflow-hidden"
                    style={{ "--tone": tones[1], "--panel-r": "26px", "--tilt-r": "-0.4deg" } as React.CSSProperties}
                  >
                    <LabWin file="thursday_lab.jpg" n="42" />
                    <div className="p-2">
                      <div className="lab-media relative aspect-[4/3]">
                        <img
                          src={community}
                          alt="Parul University students building iOS apps together in the Mac lab"
                          width={700}
                          height={394}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-[1400ms] motion-safe:ease-[var(--ease-out-expo)] motion-safe:group-hover:scale-[1.03]"
                        />
                        <p className="absolute bottom-2 left-3 right-3 text-center font-mono text-[9px] uppercase tracking-[0.18em] text-[#8a6a50]/70">
                          [ replace with your own image ]
                        </p>
                      </div>
                    </div>
                    <figcaption className="lab-status">
                      <span>PIT Mac Lab · Block B, 3F</span>
                      <span className="flex items-center gap-2">
                        <span className="lab-live" aria-hidden />
                        42 here now
                      </span>
                    </figcaption>
                  </figure>
                </Tilt>
              </Reveal>

              <Reveal delay={160} className="mt-6 grid grid-cols-2 gap-4">
                <div className="lab-panel relative flex flex-col overflow-hidden" style={{ "--tone": tones[0], "--tilt-r": "-0.4deg" } as React.CSSProperties}>
                  <LabWin />
                  <div className="relative z-10 flex-1 p-4">
                    <p className="display bg-gradient-to-br from-[#9c321f] to-[#F05138] bg-clip-text text-3xl text-transparent">12</p>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted">Apps shipped by members</p>
                  </div>
                </div>
                <div className="lab-panel relative flex flex-col overflow-hidden" style={{ "--tone": tones[2], "--tilt-r": "0.4deg" } as React.CSSProperties}>
                  <LabWin />
                  <div className="relative z-10 flex-1 p-4">
                    <p className="display text-3xl text-[#1d7a4c]">94%</p>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted">Capstone completion</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* List */}
          <ol className="lg:col-span-7">
            {benefits.map((b, i) => (
              <Reveal as="li" key={b.n} delay={80 + i * 100} className="group py-3">
                <article
                  className="lab-panel relative flex flex-col overflow-hidden"
                  style={
                    {
                      "--tone": tones[i],
                      "--panel-r": "24px",
                      "--tilt-r": i % 2 ? "0.4deg" : "-0.4deg",
                    } as React.CSSProperties
                  }
                >
                  <ShaderBackground index={i} className="!rounded-[22px] opacity-[0.55]" />
                  <LabWin file={`benefit_${b.n}.swift`} n={b.n} />

                  <div className="lab-body relative z-10 flex-1 p-6">
                    <span aria-hidden className="lab-halftone absolute -top-4 -right-3 h-[200px] w-[42%] -z-10" />
                    <div className="lab-band flex items-start justify-between gap-4">
                      <div className="lab-copy flex flex-wrap items-center gap-3">
                        <span className="display bg-gradient-to-br from-[#9c321f] to-[#F05138] bg-clip-text text-3xl text-transparent">{b.n}</span>
                        <span className="lab-tag">{b.tag}</span>
                      </div>
                      <span aria-hidden className="pointer-events-none relative mt-1 h-8 w-8 shrink-0">
                        <span className="absolute inset-0 rounded-full border border-dashed border-[#b4552d]/30 motion-reduce:!animate-none" style={{ animation: `orbit-spin ${14 + i * 3}s linear infinite` }} />
                        <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b4552d]" />
                      </span>
                    </div>

                    <div className="lab-copy mt-4">
                      <h3 className="text-balance text-xl font-bold tracking-tight text-ink sm:text-2xl">
                        {b.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-pretty text-[15px] leading-relaxed text-muted">{b.body}</p>
                    </div>
                  </div>

                  <LabFoot left={`benefit ${b.n} · loaded`} right="verified" />
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
