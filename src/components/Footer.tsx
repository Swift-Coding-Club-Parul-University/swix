import { Logo } from "./ui/Logo";
import { Reveal } from "./ui/Reveal";
import { Orb } from "./ui/Orb";

const cols = [
  {
    h: "Club",
    items: ["Program", "Showcase", "Why Swift", "Membership", "FAQ"],
    hrefs: ["#program", "#showcase", "#why", "#join", "#faq"],
  },
  {
    h: "Resources",
    items: ["Swift starter kit", "Lab schedule", "Code of conduct", "Brand assets", "Alumni network"],
    hrefs: ["#cta", "#cta", "#", "#", "#stories"],
  },
  {
    h: "Connect",
    items: ["Discord", "Instagram", "GitHub", "LinkedIn", "swift@paruluniversity.ac.in"],
    hrefs: ["#", "#", "#", "#", "mailto:swift@paruluniversity.ac.in"],
  },
];

export function Footer() {
  return (
    <footer className="webcore-section cv-auto relative overflow-hidden">
      <div aria-hidden className="footer-stars pointer-events-none absolute inset-0 opacity-80 motion-safe:animate-pulse-soft" style={{ animationDuration: "8s" }} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(70% 55% at 50% 0%, rgba(240,81,56,0.05), transparent 60%)" }}
      />

      <div className="container-x relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Logo />
            <p className="mt-6 max-w-sm text-pretty text-sm leading-relaxed text-muted">
              A student-run iOS studio at Parul University, Vadodara. We teach Swift by shipping — one app per semester, every semester since 2020.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["SwiftUI", "UIKit", "Swift Data", "CloudKit", "Vision Pro", "Server-side Swift"].map((t) => (
                <span key={t} className="glass-chip rounded-full px-3 py-1 font-mono text-[11px] text-muted">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {/* "We …", not "Built with Swift": without the subject these read
                  as claims about this website, which is React, not Swift. */}
              <span className="glass-chip inline-flex items-center gap-2.5 py-1.5 pl-1.5 pr-4">
                <Orb variant="swift" box={26} size="small" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/60">We teach Swift</span>
              </span>
              <span className="glass-chip inline-flex items-center gap-2.5 py-1.5 pl-1.5 pr-4">
                <Orb variant="ios" box={26} size="small" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/60">We build iOS apps</span>
              </span>
            </div>
          </Reveal>

          {cols.map((c, ci) => (
            <Reveal key={c.h} delay={80 + ci * 60} className="lg:col-span-2">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#F05138]/80">
                <span aria-hidden className="text-ink/30">▸</span>
                {c.h}
              </p>
              <ul className="mt-5 space-y-3">
                {c.items.map((it, i) => (
                  <li key={it}>
                    <a
                      href={c.hrefs[i]}
                      className="group inline-flex items-center gap-2 rounded-sm text-sm font-medium text-ink/65 transition-transform duration-300 hover:text-[#F05138] focus-visible:text-[#F05138] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F05138] motion-safe:hover:translate-x-1"
                    >
                      <span aria-hidden className="font-mono text-[9px] text-[#F05138] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">▸</span>
                      {it}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 font-mono text-[11px] text-ink/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Swift Coding Club, Parul University. Student-run; not affiliated with Apple Inc.</p>
          <p className="uppercase tracking-[0.16em]">Swift, SwiftUI &amp; Xcode are trademarks of Apple Inc.</p>
        </div>
      </div>

      <div aria-hidden className="relative overflow-hidden border-t border-line bg-paper-3" style={{ background: "linear-gradient(120deg,#FFF8F2,#D9CFFF55,#BDE4FF55,#FFF8F2)" }}>
        <span className="pointer-events-none absolute -left-8 top-1/2 h-24 w-24 rounded-full border border-[#F05138]/20" style={{ transform: "rotateX(55deg) rotateZ(-25deg)" }} />
        <p className="atomi-chrome-text container-x display select-none whitespace-nowrap py-4 text-center text-[16vw] leading-none opacity-90 sm:text-[13vw]">
          Swift @ Parul
        </p>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
          style={{ background: "linear-gradient(180deg, transparent, rgba(240,81,56,0.06))" }}
        />
      </div>
    </footer>
  );
}
