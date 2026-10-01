import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";
import { Tilt } from "./ui/Tilt";
import { GlassCube } from "./ui/GlassCube";
import { ShaderBackground } from "./ui/feature-shader-cards";
import { cn } from "@/utils/cn";

type Feature = {
  n: string;
  title: string;
  body: string;
  icon: React.ReactNode;
  span?: string;
  tag: string;
};

const stroke = { stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };

const features: Feature[] = [
  {
    n: "01",
    tag: "Weekly · Thu 5pm",
    title: "Hands-on Swift labs",
    body: "No slideware. Every session you open Xcode, write Swift, and leave with something that runs. From optionals to async/await to SwiftUI layout.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" {...stroke}>
        <path d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />
      </svg>
    ),
    span: "lg:col-span-7",
  },
  {
    n: "02",
    tag: "1:1 · Senior devs",
    title: "Mentorship that ships",
    body: "Paired with a senior who has already shipped. Code reviews, architecture help, and honest feedback before your TestFlight build.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" {...stroke}>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20a6.5 6.5 0 0113 0M16 4a3.5 3.5 0 010 7M21.5 20a6.5 6.5 0 00-5-6.3" />
      </svg>
    ),
    span: "lg:col-span-5",
  },
  {
    n: "03",
    tag: "Semester · Capstone",
    title: "One app, start to store",
    body: "Ideation, Figma, SwiftUI, Core Data, CloudKit, App Review. You'll go through the full lifecycle once — so you can do it forever.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" {...stroke}>
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
        <path d="M11 18h2" />
      </svg>
    ),
    span: "lg:col-span-5",
  },
  {
    n: "04",
    tag: "Hackathons · Swift Student Challenge",
    title: "Compete, then get hired",
    body: "We prep teams for the Apple Swift Student Challenge and national hackathons, and run mock interviews with iOS engineers from top studios.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" {...stroke}>
        <path d="M8 21h8M12 17v4M6 4h12v4a6 6 0 01-12 0V4zM6 6H3.5a2.5 2.5 0 002.5 4M18 6h2.5A2.5 2.5 0 0118 10" />
      </svg>
    ),
    span: "lg:col-span-7",
  },
];

const tones = ["#D9CFFF", "#B9ECCD", "#BDE4FF", "#FFEDA3"];

function FeatureCard({ f, i }: { f: Feature; i: number }) {
  return (
    <Reveal delay={80 + i * 100} className={cn("h-full", f.span)}>
      <Tilt max={5} lift={12} scale={1.01} sheen={false} depth className="h-full">
        <div
          className="webcore-tile group relative flex h-full flex-col !border-white/90"
          style={{ background: `linear-gradient(145deg, rgba(255,255,255,0.88), rgba(255,248,242,0.66) 60%, ${tones[i]}66)`, WebkitBackdropFilter: "blur(20px) saturate(165%)", backdropFilter: "blur(20px) saturate(165%)", boxShadow: "inset 0 1px 0 #fff, 0 5px 0 -2px rgba(255,255,255,0.85), 0 9px 0 -4px rgba(240,81,56,0.13), 0 26px 48px -26px rgba(107,74,52,0.4)" }}
        >
          <ShaderBackground index={i} />

          <div className="win98-title relative flex items-center justify-between gap-3 px-3 py-2 z-10" style={{ background: `linear-gradient(120deg, rgba(255,248,242,0.88), rgba(${i === 0 ? "217,207,255" : i === 1 ? "185,236,205" : i === 2 ? "189,228,255" : "255,237,163"},0.88))`, color: "#0B0B0C", boxShadow: "inset 0 1px 0 #fff, 0 1px 0 #F051381a" }}>
            <span className="truncate font-mono">lab_module_{f.n}.swift</span>
            <span className="flex gap-1" aria-hidden>
              <span className="win98-btn !px-1.5 !py-0 !text-[9px] leading-none">_</span>
              <span className="win98-btn !px-1.5 !py-0 !text-[9px] leading-none">×</span>
            </span>
          </div>

          <div className="relative z-10 flex flex-1 flex-col justify-between p-7 preserve-3d sm:p-9">
            <div className="relative flex items-start justify-between preserve-3d">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-xl border border-white text-[#9c321f] motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-rotate-6 motion-safe:group-hover:[transform:translateZ(24px)]"
                style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.9), 0 4px 0 -1px rgba(255,255,255,0.5), 0 12px 22px -14px rgba(107,74,52,0.15)" }}
              >
                {f.icon}
              </div>
              <span className="relative rounded-full border border-white/60 bg-white/50 backdrop-blur-sm px-3 py-1 font-mono text-[11px] tracking-[0.2em] text-[#2a1a10]">{f.n}</span>
            </div>
            <div className="relative mt-14 preserve-3d">
              <span className="inline-flex max-w-full items-center rounded-sm border border-white/60 bg-white/50 backdrop-blur-sm px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#2a1a10] shadow-sm motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-translate-y-1">
                {f.tag}
              </span>
              <h3 className="mt-4 text-2xl font-bold tracking-tight text-[#2a1a10] sm:text-[1.7rem]">{f.title}</h3>
              <p className="mt-3 max-w-md text-pretty font-mono text-[13.5px] leading-relaxed text-[#4a3628]">{f.body}</p>
            </div>
          </div>

          <div className="win98-out relative z-10 flex items-center justify-between px-3 py-1 font-mono text-[9px] text-[#6b4a34]">
            <span>module {f.n} loaded</span>
            <span className="flex items-center gap-2"><span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#1d7a4c]" />ready</span>
          </div>
        </div>
      </Tilt>
    </Reveal>
  );
}

export function Features() {
  return (
    <section id="program" className="webcore-section cv-auto relative overflow-hidden py-24 sm:py-32" style={{ background: "radial-gradient(ellipse at 5% 35%, #D9CFFF55, transparent 50%), radial-gradient(ellipse at 100% 75%, #FFC6DD44, transparent 50%), #FFF8F2" }}>
      <div aria-hidden className="webcore-stars pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 45% at 15% 0%, rgba(240,81,56,0.06), transparent 60%)" }}
      />

      <div className="container-x relative">
        <GlassCube className="left-8 top-24 !hidden lg:!block" size={72} tone="swift" depth={24} delay={-5} />
        <SectionHeader
          index="01"
          eyebrow="The program"
          title={
            <span className="text-ink">
              Built like a studio, <span className="text-[#F05138]">not a lecture hall.</span>
            </span>
          }
          body={
            <span className="text-muted">
              Everything is structured around a single question: can you ship? Four pillars, one semester, and a
              portfolio that speaks before you do.
            </span>
          }
        />
        <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-12">
          {features.map((f, i) => (
            <FeatureCard key={f.n} f={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
