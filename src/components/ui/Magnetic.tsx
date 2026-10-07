import { useCallback, useRef, type ReactNode } from "react";
import { useCanHover, useReducedMotion } from "@/hooks/useMedia";
import { cn } from "@/utils/cn";

/** Magnetic hover: the element leans toward the pointer, springing back on exit. */
export function Magnetic({
  children,
  className,
  strength = 0.32,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const canHover = useCanHover();
  const reduce = useReducedMotion();
  const active = canHover && !reduce;
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const base = useRef<DOMRect | null>(null);

  const paint = useCallback(() => {
    frame.current = null;
    const el = ref.current;
    if (!el) return;
    el.style.transform = `translate3d(${pos.current.x * strength}px, ${pos.current.y * strength}px, 0)`;
  }, [strength]);

  // Measure from the resting rect captured on enter, never the live one:
  // re-reading the element's own (mid-spring) box on every move feeds its
  // overshoot back into the next target and the element visibly wobbles.
  const onEnter = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!active || e.pointerType !== "mouse") return;
      base.current = e.currentTarget.getBoundingClientRect();
    },
    [active]
  );

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!active || e.pointerType !== "mouse") return;
      const r = base.current ?? e.currentTarget.getBoundingClientRect();
      pos.current = { x: e.clientX - (r.left + r.width / 2), y: e.clientY - (r.top + r.height / 2) };
      if (frame.current === null) frame.current = requestAnimationFrame(paint);
    },
    [active, paint]
  );

  const onLeave = useCallback(() => {
    if (!active) return;
    base.current = null;
    pos.current = { x: 0, y: 0 };
    if (frame.current === null) frame.current = requestAnimationFrame(paint);
  }, [active, paint]);

  return (
    <div
      ref={ref}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("gpu inline-flex will-change-transform", className)}
      style={{ transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}
    >
      {children}
    </div>
  );
}
