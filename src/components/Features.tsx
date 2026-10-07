import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";
import { Tilt } from "./ui/Tilt";
import { GlassCube } from "./ui/GlassCube";
import { ShaderBackground } from "./ui/feature-shader-cards";
import { PrismOrb } from "./ui/PrismOrb";
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
const orbTones = ["rose", "mint", "ice", "lemon"] as const;

/** Print-proof registration target — the mark you align colour passes with. */
function RegMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 1.5v21M1.5 12h21" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.7" fill="currentColor" />
    </svg>
  );
}

function FeatureCard({ f, i }: { f: Feature; i: number }) {
  return (
    <Reveal delay={80 + i * 100} className={cn("h-full", f.span)}>
      <Tilt max={6} lift={10} scale={1.015} sheen={false} depth className="h-full">
        <article
          className="lab-panel relative flex h-full flex-col"
          style={
            {
              "--tone": tones[i],
              "--tilt-r": i % 2 ? "0.4deg" : "-0.4deg",
            } as React.CSSProperties
          }
        >
          <ShaderBackground index={i} className="rounded-[18px] opacity-[0.55]" />

          <header className="lab-bar">
            <span className="lab-dots" aria-hidden>
              <span className="lab-dot" />
              <span className="lab-dot" />
              <span className="lab-dot" />
            </span>
            <span className="lab-file">lab_module_{f.n}.swift</span>
            <span className="lab-badge">{f.n}</span>
          </header>

          <div className="lab-body relative z-10 flex flex-1 flex-col justify-between gap-8 p-7 sm:p-9">
            <div className="lab-band flex items-start justify-between gap-4">
              <span aria-hidden className="lab-halftone absolute -top-5 -right-3 h-[210%] w-[52%]" />
              <div className="lab-icon flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px]">
                {f.icon}
              </div>
              <PrismOrb className="absolute -top-3 right-0" size={60} tone={orbTones[i]} satellite />
            </div>

            <div className="lab-copy mt-6">
              <span className="lab-tag">{f.tag}</span>
              <h3 className="mt-4 text-2xl font-bold tracking-[-0.03em] text-ink sm:text-[1.7rem]">
                {f.title}
              </h3>
              <p className="mt-3 max-w-[46ch] text-pretty text-[15px] leading-[1.62] text-muted">
                {f.body}
              </p>
            </div>
          </div>

          <footer className="lab-status">
            <span>module {f.n} · loaded</span>
            <RegMark className="lab-status__reg" />
            <span className="flex items-center gap-2">
              <span className="lab-live" aria-hidden />
              ready
            </span>
          </footer>
        </article>
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
