import workshop from "@/assets/workshop.jpg";
import community from "@/assets/community.jpg";
import macro from "@/assets/macro-code.jpg";
import vision from "@/assets/vision.jpg";
import campus from "@/assets/campus.jpg";
import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";
import { useParallax } from "@/hooks/useParallax";
import { cn } from "@/utils/cn";

const shots = [
  { src: workshop, alt: "Hack night at the Swift Coding Club", cap: "hack_night.jpg", meta: "Every Fri · 24h", cls: "sm:col-span-2 sm:row-span-2" },
  { src: community, alt: "Members building together in the Mac lab", cap: "thursday_lab.jpg", meta: "Block B · 3F" },
  { src: macro, alt: "Swift code on screen", cap: "code_review.jpg", meta: "Mentor 1:1" },
  { src: vision, alt: "Member prototyping in spatial computing", cap: "spatial_lab.jpg", meta: "visionOS" },
  { src: campus, alt: "Campus at golden hour", cap: "golden_hour.jpg", meta: "Vadodara" },
];

const tones = ["#D9CFFF", "#B9ECCD", "#BDE4FF", "#FFC6DD", "#FFEDA3"];

const faces = ["Pair Programming", "Code Review", "Demo Friday", "Campus Events"];

function Cube() {
  const half = 80;
  return (
    <div className="lab-cube-stage relative mx-auto mt-8 grid h-40 w-40 place-items-center">
      {/* breathing ground shadow — pauses with the cube on hover */}
      <span aria-hidden className="absolute -bottom-5 left-1/2 -translate-x-1/2">
        <span className="lab-cube-shadow motion-reduce:!animate-none block h-4 w-36" />
      </span>
      <div className="lab-cube gpu relative h-full w-full motion-reduce:!animate-none">
        {faces.map((t, i) => (
          <div
            key={t}
            className="backface-hidden absolute inset-0 flex flex-col overflow-hidden rounded-[8px] border-[1.5px] border-ink"
            style={
              {
                "--tone": tones[i],
                transform: `rotateY(${i * 90}deg) translateZ(${half}px)`,
                background: `linear-gradient(155deg, #ffffffee, ${tones[i]}dd)`,
                boxShadow: "0 16px 28px -20px rgba(42,26,16,0.55)",
              } as React.CSSProperties
            }
          >
            {/* mini window bar: traffic lights + dmg filename */}
            <span className="relative z-10 flex items-center justify-between border-b border-ink/60 bg-white/92 px-2 py-1">
              <span className="lab-dots" aria-hidden>
                <span className="lab-dot !h-[7px] !w-[7px]" />
                <span className="lab-dot !h-[7px] !w-[7px]" />
                <span className="lab-dot !h-[7px] !w-[7px]" />
              </span>
              <span className="font-mono text-[8.5px] font-semibold tracking-[0.06em] text-ink/55">{`0${i + 1}.dmg`}</span>
            </span>
            <span aria-hidden className="lab-halftone absolute -top-2 right-0 -z-10 h-16 w-16" />
            <span className="relative mt-auto flex flex-col gap-1 p-2.5">
              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-[#F05138]">{`step 0${i + 1}`}</span>
              <span className="text-[12.5px] font-bold leading-[1.15] tracking-tight text-ink">{t}</span>
            </span>
          </div>
        ))}
        <div
          className="backface-hidden absolute inset-0 rounded-[8px] border-[1.5px] border-ink bg-[#F05138]"
          style={{ transform: `rotateX(90deg) translateZ(${half}px)` }}
        />
        <div
          className="backface-hidden absolute inset-0 rounded-[8px] border-[1.5px] border-ink bg-paper-2"
          style={{ transform: `rotateX(-90deg) translateZ(${half}px)` }}
        />
      </div>
    </div>
  );
}

export function Gallery() {
  const parallax = useParallax<HTMLDivElement>(26);
  return (
    <section id="life" className="webcore-section cv-auto relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="webcore-stars pointer-events-none absolute inset-0 opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(70% 50% at 50% 0%, rgba(240,81,56,0.06), transparent 60%)" }}
      />

      <div className="container-x relative">
        <SectionHeader
          index="07"
          eyebrow="Inside the club"
          title={
            <span className="text-ink">
              Thursdays that look <span className="text-[#F05138]">nothing like a lecture.</span>
            </span>
          }
          body={
            <span className="text-muted">
              Laptops open, mentors on the floor, music on low, and a build that has to run before you leave the room.
            </span>
          }
        />

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {shots.map((s, i) => (
                <Reveal key={s.cap} delay={i * 90} className={cn("min-h-0", s.cls)}>
                  <figure
                    className="lab-panel group overflow-hidden"
                    style={{ "--tone": tones[i], "--tilt-r": i % 2 ? "0.4deg" : "-0.4deg" } as React.CSSProperties}
                  >
                    <header className="lab-bar">
                      <span className="lab-dots" aria-hidden>
                        <span className="lab-dot" />
                        <span className="lab-dot" />
                        <span className="lab-dot" />
                      </span>
                      <span className="lab-file">{s.cap}</span>
                      <span className="lab-badge">{`0${i + 1}`}</span>
                    </header>
                    <div className="flex items-center gap-1.5 border-b border-line bg-paper-3 px-2 py-1.5">
                      <span className="h-2 w-2 rounded-full bg-green-500/70" />
                      <span className="flex-1 truncate rounded-none border border-line bg-paper px-2 py-0.5 font-mono text-[9px] text-ink/60">
                        swiftclub://gallery/{s.cap}
                      </span>
                    </div>
                    <div className="lab-media m-3">
                      <img
                        src={s.src}
                        alt={s.alt}
                        loading="lazy"
                        decoding="async"
                        className={cn("w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.025]", s.cls ? "aspect-[16/10]" : "aspect-[4/3]")}
                      />
                    </div>
                    <p className="px-3 py-1.5 text-center font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink/35">[ replace with your own image ]</p>
                    <figcaption className="lab-status">
                      <span className="font-mono text-[10.5px] text-muted">{s.meta}</span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#F05138]">view ▸</span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={120}>
              <div
                className="lab-panel overflow-hidden p-8 sm:p-10"
                style={{ "--tone": "#BDE4FF", "--tilt-r": "-0.4deg" } as React.CSSProperties}
              >
                <span aria-hidden className="lab-halftone absolute -top-4 -right-3 h-[190px] w-[38%] -z-10" />
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#F05138]/70">
                  C:\club\weekly_loop.dmg — running
                </p>
                <Cube />
                <h3 className="relative mt-8 text-balance text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  The loop we run every single week.
                </h3>
                <p className="relative mt-3 text-pretty text-[15px] leading-relaxed text-muted">
                  Build something small. Have it reviewed by someone better than you. Ship it to real
                  people. Then teach it to the juniors behind you. Repeat for fourteen weeks.
                </p>
                <ul className="mt-8 space-y-3">
                  {["Pair programming, not passive listening", "Live code review on the projector", "Demo every lab — no hiding", "Seniors sit with juniors, always"].map((t) => (
                    <li key={t} className="flex items-start gap-3 font-mono text-[13.5px]">
                      <span className="mt-0.5 text-[#F05138]" aria-hidden>[✓]</span>
                      <span className="text-ink/80">{t}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex items-center gap-3">
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink/40">visitors</span>
                  <span className="flex gap-0.5" aria-hidden>
                    {["0", "4", "2"].map((d, i) => (
                      <span key={i} className="grid h-7 w-5 place-items-center border border-line bg-paper-3 font-mono text-[13px] font-bold text-[#F05138]">
                        {d}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="container-x mt-16 sm:mt-24">
        <Reveal variant="scale">
          <div ref={parallax} style={{ transform: "translate3d(0, var(--py, 0px), 0)" }}>
            <div
              className="lab-panel lab-panel--xl overflow-hidden"
              style={{ "--tone": "#FFEDA3", "--tilt-r": "0.4deg" } as React.CSSProperties}
            >
              <header className="lab-bar">
                <span className="lab-dots" aria-hidden>
                  <span className="lab-dot" />
                  <span className="lab-dot" />
                  <span className="lab-dot" />
                </span>
                <span className="min-w-0 truncate font-mono text-[11px] font-semibold text-ink/75">
                  campus_aerial.jpg — 200 acres, one lab
                </span>
                <span className="lab-badge">06</span>
              </header>
              <div className="relative">
                <img src={campus} alt="Parul University campus at golden hour" loading="lazy" decoding="async" className="h-[46vh] min-h-[280px] w-full object-cover sm:h-[56vh]" />
                <p className="absolute bottom-2 left-0 right-0 text-center font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink/30">[ replace with your own image ]</p>
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-white/85 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#F05138]">Vadodara, Gujarat</p>
                  <p className="display mt-3 max-w-2xl text-balance text-3xl text-ink sm:text-5xl">
                    A 200-acre campus. One room where apps get made.
                  </p>
                </div>
              </div>
              <footer className="lab-status">
                <span>Done</span>
                <span>.Local intranet</span>
              </footer>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
