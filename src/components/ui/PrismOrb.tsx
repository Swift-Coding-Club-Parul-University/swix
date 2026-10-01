import { useReducedMotion } from "@/hooks/useMedia";
import { cn } from "@/utils/cn";

const tones = {
  swift: "240,81,56",
  ice: "106,133,218",
  mint: "52,168,120",
  lemon: "214,158,46",
  rose: "233,88,150",
} as const;

type Props = {
  className?: string;
  /** diameter in px */
  size?: number;
  tone?: keyof typeof tones;
  /** gentle levitation; disabled automatically for reduced motion */
  float?: boolean;
  /** small orbiting bead around the sphere */
  satellite?: boolean;
};

/**
 * PrismOrb — a pure-CSS refractive glass sphere. Layered radial gradients fake
 * refraction (specular, body tint, bottom caustic), and a blurred ellipse under
 * it grounds the sphere so it reads as truly floating. No WebGL, no images.
 */
export function PrismOrb({ className, size = 64, tone = "swift", float = true, satellite = false }: Props) {
  const reduce = useReducedMotion();
  const rgb = tones[tone];

  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute block select-none", className)}
      style={{ width: size, height: size }}
    >
      {/* caustic ground shadow */}
      <span
        className="absolute left-1/2 h-[18%] w-[86%]"
        style={{
          bottom: "-14%",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(${rgb},0.35), transparent 70%)`,
          filter: "blur(3px)",
        }}
      />
      <span
        className={cn("relative block h-full w-full", float && !reduce && "animate-float")}
        style={{ animationDelay: `${(size % 7) - 4}s` }}
      >
        <span
          className="prism-ball absolute inset-0"
          style={{ ["--prism" as string]: rgb }}
        >
          {/* inner refracted horizon line */}
          <span
            className="absolute rounded-[50%]"
            style={{
              inset: "12%",
              background: `radial-gradient(circle at 68% 30%, rgba(255,255,255,0.5), transparent 55%)`,
              boxShadow: `inset 0 -6px 14px -6px rgba(${rgb},0.55)`,
            }}
          />
          {/* crisp specular dot */}
          <span
            className="absolute rounded-full"
            style={{
              left: "22%",
              top: "14%",
              width: "16%",
              height: "12%",
              background: "rgba(255,255,255,0.95)",
              filter: "blur(1px)",
            }}
          />
        </span>
        {satellite && !reduce && (
          <span
            className="absolute inset-[-14%]"
            style={{ animation: "orbit-spin 11s linear infinite" }}
          >
            <span
              className="absolute left-1/2 top-0 h-[10%] w-[10%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: `radial-gradient(circle at 32% 28%, #fff, rgba(${rgb},0.9) 70%)`,
                boxShadow: `0 0 10px rgba(${rgb},0.8)`,
              }}
            />
          </span>
        )}
      </span>
    </span>
  );
}
