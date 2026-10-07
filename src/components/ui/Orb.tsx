import { BrandOrbs } from "@/components/threeui/brand-orbs/BrandOrbs";
import { SwiftMark } from "@/components/ui/Logo";
import { useIsMobile } from "@/hooks/useMedia";
import { cn } from "@/utils/cn";

type OrbProps = {
  variant?: "swift" | "ios";
  /** canvas resolution the engine renders at — medium (56px) is crisp everywhere */
  size?: "small" | "medium";
  /** outer box in px; the canvas centers inside, so padding reads as a dark ring */
  box?: number;
  /** orbit speed multiplier (0.1 – 3) */
  speed?: number;
  label?: string;
  className?: string;
};

/**
 * Static stand-in for the animated orb: the same coin, no engine behind it.
 *
 * Each BrandOrbs instance is a whole sandboxed document that parses a 3,000
 * line canvas script and starts its own rAF loop — and this page ships six of
 * them for coins 26–56px across. On a phone that is six extra documents and
 * six animation loops to keep alive while the user scrolls past, in exchange
 * for a rotation nobody watches. They get the printed plate instead.
 */
function StaticOrb({ variant }: { variant: "swift" | "ios" }) {
  if (variant === "swift") {
    return <SwiftMark className="absolute inset-0 h-full w-full" />;
  }
  return (
    <span
      aria-hidden
      className="absolute inset-0 grid place-items-center bg-[linear-gradient(140deg,#31313a,#0b0b0c_62%)] font-mono font-bold tracking-tight text-white"
      style={{ fontSize: 11 }}
    >
      iOS
    </span>
  );
}

/**
 * Animated brand orb (canvas engine in a sandboxed iframe) mounted inside the
 * site's neo-brutalist dark coin: hard border, hard offset shadow. Offscreen
 * orbs pause themselves via IntersectionObserver, so they're cheap to scatter.
 * On the phone budget the engine is never mounted at all — see StaticOrb.
 */
export function Orb({ variant = "swift", size = "medium", box = 64, speed = 1, label, className }: OrbProps) {
  const mobile = useIsMobile();
  return (
    <span
      role="img"
      aria-label={label ?? (variant === "swift" ? "Animated Swift brand orb" : "Animated iOS brand orb")}
      className={cn(
        "relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full border-2 border-ink bg-ink",
        "shadow-[0_4px_0_rgba(11,11,12,0.9)]",
        className,
      )}
      style={{ width: box, height: box }}
    >
      {mobile ? (
        <StaticOrb variant={variant} />
      ) : (
        <BrandOrbs
          variant={variant}
          size={size}
          mode="dark"
          speed={speed}
          className="absolute inset-0"
          style={{ width: "100%", height: "100%" }}
        />
      )}
      {/* inner bevel highlight so the coin reads on dark panels too */}
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full border border-white/15" />
    </span>
  );
}
