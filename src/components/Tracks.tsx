import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";
import { Tilt } from "./ui/Tilt";
import { Magnetic } from "./ui/Magnetic";
import { Orb } from "./ui/Orb";
import { cn } from "@/utils/cn";

type Track = {
  name: string;
  line: string;
  desc: string;
  cta: string;
  seats: { taken: number; total: number };
  perks: string[];
  featured?: boolean;
};

const tracks: Track[] = [
  {
    name: "Explorer",
    line: "Just show up",
    desc: "Walk into any Thursday lab, no sign-up, no fee, no laptop required. Stay curious, leave when you like.",
    cta: "Walk in Thursday",
    seats: { taken: 186, total: 200 },
    perks: ["Open labs, every week", "Discord community", "Guest talks & demo nights", "Zero commitment"],
  },
  {
    name: "Builder",
    line: "The full program",
    desc: "The 14-week program. Assigned mentor, Mac Lab access, and one capstone app on your name by Demo Day.",
    cta: "Become a Builder",
    seats: { taken: 47, total: 60 },
    featured: true,
    perks: [
      "All labs & workshops",
      "Senior mentor, 1:1 reviews",
      "Mac Lab scheduled access",
      "Capstone + App Review support",
      "Publish under the club's Apple Developer account",
      "Hackathon & Swift Student Challenge squad",
    ],
  },
  {
    name: "Core",
    line: "Run the club",
    desc: "For members who've shipped once and want to teach. Selected every semester by the outgoing Core.",
    cta: "Express interest",
    seats: { taken: 6, total: 6 },
    perks: [
      "Everything in Builder",
      "Design & lead a lab track",
      "Review juniors' pull requests",
      "Incubation referrals (PU IIC)",
      "Core badge, hoodie & alumni network",
    ],
  },
];

/** Panel tints — mint / rose / lavender, sky for the closing banner. */
const tones = ["#B9ECCD", "#FFC6DD", "#D9CFFF", "#BDE4FF"];

function Seats({ taken, total }: { taken: number; total: number }) {
  const pct = Math.min(100, Math.round((taken / total) * 100));
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a6a50]">Seats</span>
        <span className="font-mono text-[11px] font-semibold text-[#2a1a10]">
          {taken}/{total}
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full border border-[#b4552d]/25 bg-white/50">
        <div
          className="gpu h-full origin-left rounded-full transition-transform duration-1000 ease-[var(--ease-out-expo)]"
          style={{
            transform: `scaleX(${pct / 100})`,
            background: "linear-gradient(90deg,#F05138,#FFC6DD)",
            boxShadow: "0 0 8px rgba(180,85,45,0.5)",
          }}
        />
      </div>
    </div>
  );
}

/** Tracks — Retro Futurism: mission tiers. Atomic panels, orbit seat meters. */
export function Tracks() {
  return (
    <section id="join" className="atomi-section cv-auto relative overflow-hidden py-24 sm:py-32">
      {/* backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="atomi-ring gpu animate-spin-slow left-[6%] top-[6%] h-48 w-48" style={{ animationDuration: "58s" }} />
        <span className="atomi-ring gpu animate-spin-slow right-[8%] bottom-[8%] h-40 w-40" style={{ animationDuration: "72s", animationDirection: "reverse" }} />
        {[
          { left: "16%", top: "18%", s: "✦", size: "text-lg", d: "0s" },
          { left: "90%", top: "24%", s: "✧", size: "text-base", d: "1.5s" },
          { left: "8%", top: "80%", s: "✦", size: "text-base", d: "2.4s" },
        ].map((s, i) => (
          <span key={i} className={`atomi-star gpu animate-pulse-soft absolute font-mono ${s.size}`} style={{ left: s.left, top: s.top, animationDelay: s.d }}>
            {s.s}
          </span>
        ))}
      </div>

      <div className="container-x relative">
        <SectionHeader
          index="11"
          eyebrow="Membership · free"
          title={
            <span className="text-[#2a1a10]">
              Three tracks. <span className="text-[#c2521f]">Zero rupees.</span>
            </span>
          }
          body={
            <span className="text-[#6b4a34]">
              The club is funded by the university and run by volunteers. You will never be asked to pay — no
              membership fee, no lab charge, no hidden kit cost. The only thing we ask for is showing up.
            </span>
          }
        />

        <Reveal delay={160} className="mt-8 flex flex-wrap items-center gap-4">
          <Orb variant="ios" box={40} size="small" />
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8a6a50]">
            runs on iOS · iPadOS · visionOS — one codebase, whole ecosystem
          </p>
        </Reveal>

        <div className="relative mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
          <span aria-hidden className="pointer-events-none absolute -bottom-14 left-[8%] h-16 w-16 rounded-full border-2 border-dashed border-[#3daa6d]/15" />
          <span aria-hidden className="pointer-events-none absolute -top-8 right-[20%] h-14 w-14 rounded-full border border-[#F05138]/12" />
          <span aria-hidden className="pointer-events-none absolute -bottom-12 right-[5%] h-[4.5rem] w-[4.5rem] rounded-full border border-[#F05138]/10" />
          {tracks.map((t, i) => (
            <Reveal key={t.name} delay={i * 110} className="h-full">
              <Tilt max={t.featured ? 8 : 5} lift={t.featured ? 24 : 12} className="h-full">
                <div
                  className={cn(
                    "lab-panel relative flex h-full flex-col overflow-hidden",
                    t.featured && "outline-2 outline-[#F05138]"
                  )}
                  style={
                    {
                      "--tone": tones[i],
                      "--tilt-r": i % 2 ? "0.4deg" : "-0.4deg",
                      "--panel-r": "26px",
                    } as React.CSSProperties
                  }
                >
                  <header className="lab-bar">
                    <span className="lab-dots" aria-hidden>
                      <span className="lab-dot" />
                      <span className="lab-dot" />
                      <span className="lab-dot" />
                    </span>
                    <span className="lab-file">{t.name.toLowerCase()}_track.swift</span>
                    <span className="lab-badge">{`0${i + 1}`}</span>
                  </header>

                  <div className="relative flex-1 p-7 sm:p-8">
                    {i === 0 && <span aria-hidden className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full border-2 border-dashed border-[#3daa6d]/25" />}
                    {i === 1 && <span aria-hidden className="pointer-events-none absolute top-0 -right-6 h-20 w-20 rounded-full bg-gradient-to-br from-[#F05138]/10 to-[#FFC6DD]/15" />}
                    {i === 2 && <span aria-hidden className="pointer-events-none absolute -bottom-9 -right-9 h-28 w-28 rounded-full border border-[#F05138]/15" />}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-2xl font-bold tracking-tight text-[#2a1a10]">{t.name}</h3>
                        <p className="mt-1 text-[13px] font-medium text-[#c2521f]">{t.line}</p>
                      </div>
                      <div className="lab-copy">
                        <span className="lab-tag">Free</span>
                      </div>
                    </div>

                    <div className="mt-7 flex items-end gap-2">
                      <span className="display text-5xl text-[#2a1a10] sm:text-[3.4rem]">₹0</span>
                      <span className="pb-2 text-sm text-[#8a6a50]">always</span>
                    </div>

                    <p className="mt-4 text-[14.5px] leading-relaxed text-[#6b4a34]">{t.desc}</p>

                    <ul className="mt-7 space-y-3">
                      {t.perks.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-[14px]">
                          <span
                            className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full text-[9px] text-[#ffe8d2]"
                            style={{ background: "radial-gradient(circle at 32% 28%, #d97a4a, #b4552d)" }}
                            aria-hidden
                          >
                            ✓
                          </span>
                          <span className="text-[#2a1a10]/85">{p}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <Seats taken={t.seats.taken} total={t.seats.total} />
                    </div>

                    <div className="mt-8">
                      <Magnetic strength={0.2} className="w-full">
                        <a
                          href="#cta"
                          className={cn(
                            "flex w-full items-center justify-center text-sm",
                            t.featured ? "atomi-btn px-6 py-3.5" : "atomi-chip justify-center !py-3.5 !text-[12px] font-bold"
                          )}
                        >
                          {t.cta}
                        </a>
                      </Magnetic>
                    </div>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>

        <Reveal delay={250} className="mt-10">
          <div
            className="lab-panel relative flex flex-col items-center justify-between gap-4 px-7 py-6 text-center sm:flex-row sm:text-left"
            style={{ "--tone": tones[3], "--tilt-r": "-0.4deg", "--panel-r": "26px" } as React.CSSProperties}
          >
            <p className="text-[15px] font-medium text-[#2a1a10]">
              Open to every Parul University student — any faculty, any year, any experience level.
            </p>
            <div className="lab-copy">
              <span className="lab-tag">No fee · Thu 5pm</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
