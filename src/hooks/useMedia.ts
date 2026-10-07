import { useEffect, useState } from "react";

/**
 * Reactive media query.
 *
 * Resolved synchronously on first render whenever we're in a browser, so a
 * component never paints in the wrong state for a frame. "Is this a phone?"
 * and "does this user want reduced motion?" both have to be correct before
 * the first commit — otherwise a phone briefly mounts the desktop (canvas,
 * parallax, magnetic-hover) tree and then throws it away.
 */
export function useMedia(query: string, initial = false) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return initial;
    return window.matchMedia(query).matches;
  });
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

export const useReducedMotion = () => useMedia("(prefers-reduced-motion: reduce)");
export const useCanHover = () => useMedia("(hover: hover) and (pointer: fine)");

/**
 * The phone/small-tablet budget — deliberately the same condition the
 * `PHONE BUDGET` block in index.css uses, so JS decisions (don't mount the
 * orb engine, don't oversample the story canvas) and CSS decisions (drop the
 * backdrop blurs, stop the ambient loops) always agree.
 */
export const useIsMobile = () => useMedia("(max-width: 767px), (hover: none) and (pointer: coarse)");
