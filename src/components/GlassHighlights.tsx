import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";
import { Tilt } from "./ui/Tilt";
import { GlassCube } from "./ui/GlassCube";
import { PrismOrb } from "./ui/PrismOrb";
import { useScrollScrub } from "@/hooks/useScrollScrub";
import { cn } from "@/utils/cn";

const items = [
  {
    n: "01",
    href: "#apple-lab",
    link: "Meet the lab",
    star: "✦",
    label: "Apple Certified",
    sub: "Training Center on campus",
    detail: (
      <span className="atomi-chip">
        <span className="h-1.5 w-1.5 rounded-full bg-[#b4552d]" />
        ACT · Umang Panchal
      </span>
    ),
    corner: (
      <span aria-hidden className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-110 motion-safe:group-hover:rotate-12">
        <svg viewBox="0 0 128 128" className="h-full w-full opacity-50">
          <defs>
            <linearGradient id="c1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F05138" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FFD3BC" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <polygon points="64,4 80,48 124,48 88,76 100,120 64,92 28,120 40,76 4,48 48,48" fill="url(#c1)" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
        </svg>
      </span>
    ),
  },
  {
    n: "02",
    href: "#stories",
    link: "Hear their stories",
    star: "✧",
    label: "300+",
    sub: "Students trained since 2020",
    detail: (
      <span className="flex items-center gap-2">
        <span className="flex -space-x-1.5">
          {["#D9CFFF", "#B9ECCD", "#BDE4FF", "#FFC6DD"].map((c) => (
            <span key={c} className="h-5 w-5 rounded-full border-2 border-white shadow-sm" style={{ background: `radial-gradient(circle at 32% 28%, #fff, ${c})` }} />
          ))}
        </span>
        <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted">+12 this month</span>
      </span>
    ),
    corner: (
      <span aria-hidden className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6">
        <svg viewBox="0 0 112 112" className="h-full w-full opacity-45">
          <defs>
            <linearGradient id="c2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#D9CFFF" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#BDE4FF" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <polygon points="56,2 78,22 110,22 90,50 98,82 56,66 14,82 22,50 2,22 34,22" fill="none" stroke="url(#c2)" strokeWidth="2.5" />
          <circle cx="56" cy="42" r="14" fill="url(#c2)" stroke="white" strokeWidth="1.5" strokeOpacity="0.4" />
        </svg>
      </span>
    ),
  },
  {
    n: "03",
    href: "#showcase",
    link: "Browse the apps",
    star: "✦",
    label: "12",
    sub: "Student apps on the App Store",
    detail: (
      <svg viewBox="0 0 120 32" className="h-8 w-28" fill="none" aria-hidden>
        <defs>
          <linearGradient id="hl-spark" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#b4552d" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#c2521f" />
          </linearGradient>
        </defs>
        <path d="M2 26 L18 24 L34 25 L50 18 L66 19 L82 10 L98 12 L118 3" stroke="url(#hl-spark)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="118" cy="3" r="3" fill="#b4552d" style={{ filter: "drop-shadow(0 0 6px rgba(180,85,45,0.8))" }} />
      </svg>
    ),
    corner: (
      <span aria-hidden className="pointer-events-none absolute -right-7 -top-7 h-30 w-30 motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-110 motion-safe:group-hover:rotate-45">
        <svg viewBox="0 0 120 120" className="h-full w-full opacity-50">
          <defs>
            <linearGradient id="c3" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#B9ECCD" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#D9CFFF" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <polygon points="60,6 90,30 106,66 80,98 34,98 8,66 24,30" fill="url(#c3)" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
          <polygon points="60,24 76,40 80,60 64,72 44,68 36,48" fill="white" fillOpacity="0.25" />
        </svg>
      </span>
    ),
  },
  {
    n: "04",
    href: "#join",
    link: "Claim your seat",
    star: "✧",
    label: "₹0",
    sub: "Free for every student, forever",
    detail: (
      <span className="inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted">
        <span className="atomi-chip !py-1">No fee</span>
        No Mac needed
      </span>
    ),
    corner: (
      <span aria-hidden className="pointer-events-none absolute -right-7 -top-7 h-30 w-30 motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-125 motion-safe:group-hover:rotate-[30deg]">
        <svg viewBox="0 0 120 120" className="h-full w-full opacity-45">
          <defs>
            <linearGradient id="c4" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFEDA3" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#F05138" stopOpacity="0.25" />
            </linearGradient>
          </defs>
          <circle cx="60" cy="60" r="44" fill="none" stroke="url(#c4)" strokeWidth="3" strokeDasharray="8 6" />
          <circle cx="60" cy="60" r="28" fill="url(#c4)" stroke="white" strokeWidth="1.5" strokeOpacity="0.4" />
          <circle cx="60" cy="60" r="8" fill="white" fillOpacity="0.5" />
        </svg>
      </span>
    ),
  },
];

const ticker = [
  "Free forever",
  "No Mac needed",
  "Thursday labs · 5 PM",
  "Beginners welcome",
  "Ship real apps",
  "Mentored by seniors",
  "Est. 2020 · Parul University",
];

const watermarkWords = ["Swift", "Coding", "Club", "Swift", "Coding", "Club"];

const tones = ["#D9CFFF", "#BDE4FF", "#B9ECCD", "#FFEDA3"];

export function GlassHighlights() {
  const scrub = useScrollScrub<HTMLDivElement>();
  return (
    <section aria-label="Club highlights" className="cv-auto relative -mt-8 pb-24 sm:-mt-14">
      <div className="container-x">
        <div className="relative">
          <SectionHeader
            index="02"
            eyebrow="Why Swift Coding Club"
            title={
              <span className="text-ink">
                Polished outside. <span className="text-swift">Substance inside.</span>
              </span>
            }
            body="An Apple Authorized Training Center run entirely by students — real curriculum, real Macs, real apps on the App Store. And it costs nothing."
          />
          <Reveal delay={220} className="mt-6 flex flex-wrap items-center gap-4">
            <span className="atomi-chip">
              <span className="text-swift">✦</span>
              Funded by the university · run by volunteers
            </span>
            <span className="atomi-chip">Audited every sem</span>
          </Reveal>
          <GlassCube className="-left-2 top-28 !hidden opacity-75 lg:!block" size={68} tone="ice" depth={20} delay={-3} />
          <PrismOrb className="-right-2 top-40 hidden lg:block" size={46} tone="mint" satellite />
        </div>

        <Reveal variant="scale" delay={120} className="mt-12">
          <div
            ref={scrub}
            className="atomi-section scrub relative overflow-hidden rounded-[36px]"
            style={{ boxShadow: "0 1px 0 #fff inset, 0 30px 70px -40px #6b4a3466" }}
          >
            {/* scroll progress bar with traveling shine */}
            <div aria-hidden className="absolute inset-x-0 top-0 z-20 h-1.5 bg-[#b4552d]/15">
              <div
                className="gpu relative h-full w-full origin-left"
                style={{ transform: "scaleX(var(--scrub, 0))", background: "linear-gradient(90deg,#b4552d,#d97a4a)" }}
              >
                <span className="sweep absolute inset-0" />
              </div>
            </div>

            {/* orbit rings with satellite beads */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="gpu absolute -left-24 bottom-[14%] h-64 w-64 motion-reduce:!animate-none" style={{ animation: "orbit-spin 48s linear infinite" }}>
                <span className="absolute inset-0 rounded-full border-2 border-dashed border-[#b4552d]/25" />
                <span
                  className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ background: "radial-gradient(circle at 32% 28%, #fff, #b4552d 70%)", boxShadow: "0 0 12px rgba(180,85,45,0.7)" }}
                />
              </div>
              <div className="gpu absolute -right-20 top-[8%] h-56 w-56" style={{ animation: "orbit-spin 38s linear infinite reverse" }}>
                <span className="absolute inset-0 rounded-full border border-dashed border-[#b4552d]/18" />
                <span
                  className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#d97a4a]"
                  style={{ boxShadow: "0 0 10px rgba(217,122,74,0.7)" }}
                />
              </div>
              <div className="absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-[#ffd9b8]/40 blur-3xl" />
              {/* scroll-driven watermark strip */}
              <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
                <div
                  className="gpu flex w-max items-center whitespace-nowrap will-change-transform motion-reduce:!transform-none"
                  style={{ transform: "translateX(calc((0.5 - var(--scrub, 0)) * 26vw))" }}
                >
                  {watermarkWords.map((w, i) => (
                    <span key={i} className="flex items-center">
                      <span className="display atomi-chrome-text px-6 font-mono text-[7rem] font-bold uppercase leading-none tracking-tight opacity-70">
                        {w}
                      </span>
                      <span className="font-mono text-5xl text-[#b4552d]/40">·</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:gap-4 sm:p-6 lg:grid-cols-4">
              {items.map((it, i) => (
                <Reveal key={it.n} delay={80 + i * 110} className="h-full">
                  <div className="h-full motion-reduce:!animate-none" style={{ animation: `float ${8 + i * 1.3}s ease-in-out ${-i * 1.7}s infinite` }}>
                    <Tilt max={4} lift={8} scale={1.01} sheen={false} className="h-full">
                      <a
                        href={it.href}
                        data-cursor="hot"
                        aria-label={`${it.label} — ${it.link}`}
                        className="atomi-card group relative flex h-full flex-col justify-between gap-5 overflow-hidden !rounded-[24px] !border-white/90 p-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F05138] sm:p-6"
                        style={{ background: `linear-gradient(145deg, rgba(255,255,255,0.86), rgba(255,248,242,0.62) 55%, ${tones[i]}73)`, WebkitBackdropFilter: "blur(18px) saturate(160%)", backdropFilter: "blur(18px) saturate(160%)", boxShadow: "inset 0 2px 0 #fff, inset 0 -4px 0 rgba(255,255,255,0.55), 0 8px 0 -4px rgba(255,255,255,0.5), 0 24px 44px -22px rgba(107,74,52,0.45)" }}
                      >
                        <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full border-[16px] border-white/50 opacity-60 motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-110" />
                        {it.corner}
                        <span className="relative flex items-start justify-between">
                          <span
                            className="grid h-12 w-12 place-items-center rounded-2xl border border-white text-lg text-swift motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-rotate-12"
                            style={{ background: `linear-gradient(135deg, #fff, ${tones[i]})`, boxShadow: "0 4px 0 -1px #F0513814, 0 10px 20px -12px #6b4a3466" }}
                            aria-hidden
                          >
                            {it.star}
                          </span>
                          <span className="rounded-full border border-white bg-white/60 px-2 py-1 font-mono text-[11px] tracking-[0.2em] text-muted">/{it.n}</span>
                        </span>
                        <span className="relative">
                          <span className={cn("display block text-4xl tracking-tight sm:text-[2.6rem]", i === 0 ? "text-ink" : "bg-gradient-to-br from-[#9c321f] to-swift bg-clip-text text-transparent")}>{it.label}</span>
                          <span className="mt-1 block text-[12.5px] font-medium text-muted">{it.sub}</span>
                          <span className="mt-4 block">{it.detail}</span>
                          <span className="mt-4 flex items-center gap-1.5 border-t border-swift/15 pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-swift opacity-80 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                            {it.link}
                            <svg className="ml-auto h-3 w-3 shrink-0 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-1" viewBox="0 0 12 12" fill="none" aria-hidden>
                              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </span>
                      </a>
                    </Tilt>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* ticker */}
            <div className="marquee-mask group/ticker relative border-t border-white bg-white/60 py-3">
              <div className="marquee-track gpu motion-safe:animate-marquee flex w-max items-center gap-10 pr-10 group-hover/ticker:[animation-play-state:paused]">
                {[...ticker, ...ticker].map((t, i) => (
                  <span key={i} className="flex items-center gap-10 whitespace-nowrap">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-muted">{t}</span>
                    <span aria-hidden className="text-swift/60">·</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
