import { useReducedMotion } from "@/hooks/useMedia";
import { cn } from "@/utils/cn";

const tones = {
  swift: "240,81,56",
  ice: "106,133,218",
  mint: "52,168,120",
  amber: "180,85,45",
  rose: "233,88,150",
} as const;

type Props = {
  className?: string;
  /** diameter in px */
  size?: number;
  /** glass band thickness in px */
  thickness?: number;
  /** 3D tilt applied to the ring plane */
  tilt?: number;
  /** seconds per revolution; 0 = static */
  spin?: number;
  tone?: keyof typeof tones;
};

/**
 * GlassRing — a masked conic-gradient "glass band" tilted in 3D like an orbit.
 * The satellite bead rides the band; the parent supplies perspective via the
 * .scene-3d utility (a plain perspective style also works).
 */
export function GlassRing({
  className,
  size = 280,
  thickness = 14,
  tilt = 68,
  spin = 44,
  tone = "swift",
}: Props) {
  const reduce = useReducedMotion();
  const rgb = tones[tone];

  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute block select-none preserve-3d", className)}
      style={{ width: size, height: size, transformStyle: "preserve-3d" }}
    >
      {/* halo behind the ring */}
      <span
        className="absolute inset-[-18%] rounded-full"
        style={{
          background: `radial-gradient(closest-side, rgba(${rgb},0.14), transparent 70%)`,
          transform: `rotateX(${tilt}deg)`,
        }}
      />
      {/* static tilt on the outer plane… */}
      <span
        className="absolute inset-0"
        style={{
          transform: `rotateX(${tilt}deg) rotateZ(-12deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* …so the spin animation owns this layer's transform only */}
        <span
          className="absolute inset-0 motion-reduce:!animate-none"
          style={{
            transformStyle: "preserve-3d",
            animation: reduce || !spin ? undefined : `orbit-spin ${spin}s linear infinite`,
          }}
        >
          <span
            className="glass-ring absolute inset-0"
            style={{ ["--prism" as string]: rgb, ["--ring-w" as string]: `${thickness}px` }}
          />
          {/* satellite bead riding the band */}
          {!reduce && spin > 0 && (
            <span
              className="absolute left-1/2 top-0"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <span
                className="block rounded-full"
                style={{
                  width: Math.max(7, thickness * 0.62),
                  height: Math.max(7, thickness * 0.62),
                  background: `radial-gradient(circle at 32% 28%, #fff, rgba(${rgb},0.92) 68%)`,
                  boxShadow: `0 0 14px rgba(${rgb},0.85)`,
                }}
              />
            </span>
          )}
        </span>
      </span>
    </span>
  );
}
