import { useEffect, useRef } from "react";

/**
 * Scroll-scrub: writes the element's traversal progress (0 -> 1) into the
 * `--scrub` CSS variable, throttled to one rAF per frame with zero React
 * re-renders. 0 = element's top just entered the viewport bottom,
 * 1 = element's bottom just left the viewport top.
 * Components derive motion with calc() so everything stays transform-only.
 */
export function useScrollScrub<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const update = () => {
      ticking.current = false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = r.height + vh;
      const p = (vh - r.top) / total;
      el.style.setProperty("--scrub", Math.min(1, Math.max(0, p)).toFixed(4));
    };
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };

    // Sections below the fold carry `content-visibility: auto`, so until they
    // render they measure as their contain-intrinsic-size placeholder (800px)
    // rather than their real height — and this progress is a function of that
    // height. Watching the element itself means the value is corrected the
    // moment the browser swaps the placeholder for the real box, which is
    // otherwise only caught by the next scroll event.
    const ro = new ResizeObserver(onScroll);
    ro.observe(el);

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return ref;
}
