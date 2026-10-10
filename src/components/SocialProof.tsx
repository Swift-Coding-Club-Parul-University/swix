import { Reveal } from "./ui/Reveal";
import { useVelocitySkew } from "@/hooks/useVelocitySkew";

const partners = [
  "Apple Developer Academy Alumni",
  "Parul Institute of Technology",
  "PU Innovation & Incubation Centre",
  "GDG Vadodara",
  "Swift India Community",
  "Hack The Campus",
  "iOS Dev Baroda",
  "PU Placement Cell",
];

export function SocialProof() {
  const skewRef = useVelocitySkew<HTMLDivElement>(4);
  return (
    <section
      aria-label="Trusted by"
      className="cv-auto relative overflow-hidden border-y border-ink/5 py-10"
      style={{ background: "linear-gradient(180deg, #FFF8F2, #FFF5ED)" }}
    >
      <div className="container-x relative">
        <Reveal className="mb-5 flex items-center justify-between gap-4">
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            Trusted across campus &amp; the community
          </p>
          <p className="hidden rounded-full border border-line bg-white/60 px-3 py-1.5 font-mono text-[11px] text-muted shadow-sm sm:block">Est. 2023 · Vadodara, Gujarat</p>
        </Reveal>
      </div>
      <div className="marquee-mask group/strip relative overflow-hidden py-2">
        <div ref={skewRef} className="gpu will-change-transform motion-reduce:!transform-none">
          <ul
            className="marquee-track gpu motion-safe:animate-marquee flex w-max items-center gap-4 whitespace-nowrap px-7 py-2 group-hover/strip:[animation-play-state:paused]"
            aria-hidden={false}
          >
            {[...partners, ...partners].map((p, i) => (
              <li
                key={`${p}-${i}`}
                className="relative inline-flex items-center gap-2.5 !rounded-full border border-line bg-white/70 px-5 py-2.5 text-[12px] text-ink shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_6px_16px_-8px_rgba(11,11,12,0.1)] motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1"
                aria-hidden={i >= partners.length}
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-swift/10 text-[10px] font-bold text-swift">{p[0]}</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
