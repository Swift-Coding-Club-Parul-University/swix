import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

const dots = [
  { id: "top", label: "Top" },
  { id: "story", label: "Story" },
  { id: "program", label: "Program" },
  { id: "showcase", label: "Showcase" },
  { id: "apple-lab", label: "Apple Lab" },
  { id: "apps", label: "Apps" },
  { id: "journey", label: "Journey" },
  { id: "life", label: "Life" },
  { id: "team", label: "Mentors" },
  { id: "stories", label: "Stories" },
  { id: "join", label: "Join" },
  { id: "faq", label: "FAQ" },
  { id: "terminal", label: "Debug Lab" },
  { id: "cta", label: "Apply" },
];

/** Floating glass dock: ambient, desktop-only, updates state once per section. */
export function SectionDock() {
  const [active, setActive] = useState("top");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      setVisible(window.scrollY > window.innerHeight * 0.6);
      const mid = window.innerHeight * 0.4;
      let current = "top";
      for (const d of dots) {
        const el = document.getElementById(d.id);
        if (el && el.getBoundingClientRect().top <= mid) current = d.id;
      }
      setActive((prev) => (prev === current ? prev : current));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className={cn(
        "fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 transition-all duration-700 ease-[var(--ease-out-expo)] xl:block",
        visible ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-6 opacity-0"
      )}
    >
      <div className="liquid grain flex flex-col items-center gap-1 rounded-full p-2">
        {dots.map((d) => {
          const isActive = active === d.id;
          return (
            <a
              key={d.id}
              href={`#${d.id}`}
              aria-label={d.label}
              aria-current={isActive ? "true" : undefined}
              className="group relative flex h-7 w-7 items-center justify-center rounded-full"
            >
              <span
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500 ease-[var(--ease-out-expo)]",
                  isActive ? "w-4 bg-swift" : "w-1.5 bg-ink/25 group-hover:w-3 group-hover:bg-ink/50"
                )}
              />
              <span className="pointer-events-none absolute right-9 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1 text-[11px] font-medium text-white opacity-0 transition-all duration-300 group-hover:-translate-x-0 group-hover:opacity-100 -translate-x-1">
                {d.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
