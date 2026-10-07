import { GalleryHeading } from "./threeui/gallery-heading/GalleryHeading";
import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";
import { Orb } from "./ui/Orb";

const tags = ["Exhibit Edition", "Ink № 12", "Halftone", "Est. 2020"];
const tones = ["#D9CFFF", "#FFEDA3", "#B9ECCD", "#FFC6DD"];

/**
 * Exhibit 08 — the club's print wall, redrawn as a live halftone loop.
 * The canvas ships as a self-contained document in a sandboxed iframe; the
 * "swift-halftone" variant keeps the authored artwork untouched, while the
 * surrounding console is restyled as an atomic-age exhibition frame.
 */
export function GalleryWall() {
  return (
    <section id="wall" className="atomi-section cv-auto relative overflow-hidden py-24 sm:py-32">
      {/* orbit + stars backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="atomi-ring gpu animate-spin-slow right-[5%] top-[8%] h-56 w-56" style={{ animationDuration: "70s" }} />
        <span className="atomi-star left-[8%] top-16 text-lg animate-pulse-soft">✦</span>
        <span className="atomi-star right-[14%] bottom-16 text-base animate-pulse-soft" style={{ animationDelay: "1.6s" }}>✧</span>
      </div>

      <div className="container-x relative">
        <SectionHeader
          index="08"
          eyebrow="Exhibit · the gallery wall"
          title={
            <span className="text-[#2a1a10]">
              One wall, twelve plates, <span className="text-[#c2521f]">one orange ink.</span>
            </span>
          }
          body={
            <span className="text-[#6b4a34]">
              Our print wall, redrawn as a halftone loop: twelve flat plates in the club palette orbiting a didone
              headline set in the motto. Every plate is one ink on one stock — and the ring picks up speed when you
              hover it.
            </span>
          }
        />

        <Reveal variant="scale" className="relative mt-14 lg:mt-20">
          <span aria-hidden className="pointer-events-none absolute -top-2 left-1/2 z-10 h-5 w-16 border border-white/70" style={{ background: "linear-gradient(120deg,#FFEDA399,#FFF8F2bb)", transform: "translateX(-50%) rotate(-4deg)", boxShadow: "0 2px 3px #0B0B0C0a" }} />
          <div
            className="lab-panel relative overflow-hidden"
            style={
              {
                "--tone": tones[0],
                "--panel-r": "32px",
                "--tilt-r": "-0.4deg",
              } as React.CSSProperties
            }
          >
            {/* top caption bar */}
            <header className="lab-bar flex flex-wrap items-center">
              <div className="flex items-center gap-3">
                <Orb variant="swift" box={56} />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#F05138]">Exhibit A — Halftone Loop</p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.24em] text-ink/60">Swift Coding Club · Vadodara</p>
                </div>
              </div>
              <div className="ml-auto flex flex-wrap items-center gap-2">
                {tags.map((t, i) => (
                  <Reveal key={t} delay={100 + i * 70}>
                    <span
                      className="inline-flex items-center rounded-full border border-white/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink transition-transform duration-300 motion-safe:hover:-translate-y-0.5"
                      style={{ background: tones[i], rotate: `${i % 2 ? 2 : -2}deg`, boxShadow: "inset 0 1px 0 #fff, 0 2px 0 #0B0B0C12" }}
                    >
                      {t}
                    </span>
                  </Reveal>
                ))}
              </div>
            </header>

            {/* the wall itself — pointer-active, don't cover it */}
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/8]">
              <GalleryHeading
                variant="swift-halftone"
                mode="dark"
                className="absolute inset-0"
                style={{ width: "100%", height: "100%" }}
              />
            </div>

            {/* bottom caption bar */}
            <footer className="lab-status flex flex-wrap items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="flex items-end gap-[2px]" aria-hidden>
                  {[10, 16, 8, 14, 6].map((h, i) => (
                    <span
                      key={i}
                      className="w-[3px] rounded-full bg-[#d97a4a]"
                      style={{ height: h, boxShadow: "0 0 6px rgba(217,122,74,0.7)", animation: `pulse-soft ${1 + i * 0.2}s ease-in-out infinite` }}
                    />
                  ))}
                </span>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/60">
                  one ink · one stock · twelve plates — axis 90°, drifting counter-clockwise
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Orb variant="ios" box={32} size="small" label="iOS brand orb" />
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/60">shot on the lab's iPhones</span>
              </div>
            </footer>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
