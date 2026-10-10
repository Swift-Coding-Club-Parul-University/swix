import { useEffect, useRef, useState } from "react";
import { Logo } from "./ui/Logo";
import { cn } from "@/utils/cn";

const links = [
  { href: "#story", label: "Story" },
  { href: "#program", label: "Program" },
{ href: "#showcase", label: "Showcase" },
{ href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ticking = useRef(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const wasScrolled = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const next = y > 24;
        if (next !== wasScrolled.current) {
          wasScrolled.current = next;
          setScrolled(next);
        }
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (progressRef.current && max > 0) {
          progressRef.current.style.transform = `scaleX(${Math.min(1, y / max)})`;
        }
        ticking.current = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        ref={progressRef}
        aria-hidden
        className="gpu absolute inset-x-0 top-0 z-[60] h-[2px] origin-left bg-swift"
        style={{ transform: "scaleX(0)" }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div
        className={cn(
          "relative z-50 transition-[padding] duration-500",
          scrolled ? "py-2.5" : "py-4"
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "container-x flex items-center justify-between rounded-none transition-all duration-500",
            scrolled && "max-w-[1180px]"
          )}
        >
          <div
            className={cn(
              "flex w-full items-center justify-between gap-6 rounded-full px-4 py-2 transition-all duration-500 sm:px-5",
              scrolled
                ? "liquid border-[2px]! border-ink/85! shadow-[0_4px_0_rgba(11,11,12,0.9),0_24px_48px_-24px_rgba(240,81,56,0.45)]!"
                : "bg-transparent"
            )}
          >
            <Logo />

            <ul className="hidden items-center gap-1 lg:flex">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="rounded-full px-3.5 py-2 text-[13.5px] font-medium text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="hidden items-center gap-2 lg:flex">
              <a href="#cta" className="btn btn-primary !px-5 !py-2.5">
                Join the club
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/70 lg:hidden"
            >
              <span
                className={cn(
                  "absolute h-[1.5px] w-4 bg-ink transition-transform duration-300",
                  open ? "rotate-45" : "-translate-y-[3px]"
                )}
              />
              <span
                className={cn(
                  "absolute h-[1.5px] w-4 bg-ink transition-transform duration-300",
                  open ? "-rotate-45" : "translate-y-[3px]"
                )}
              />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden fixed inset-x-0 top-0 z-40 h-dvh bg-paper/70 backdrop-blur-2xl backdrop-saturate-150 transition-[opacity,visibility] duration-400",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
        aria-hidden={!open}
      >
        <div className="container-x flex h-full flex-col pt-24 pb-10">
          <ul className="flex flex-col divide-y divide-line border-y border-line">
            {links.map((l, i) => (
              <li key={l.href} style={{ transitionDelay: open ? `${80 + i * 40}ms` : "0ms" }}
                className={cn("transition-all duration-500", open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0")}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-5 text-2xl font-semibold tracking-tight text-ink"
                >
                  {l.label}
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="liquid grain mt-auto grid gap-3 rounded-[28px] p-4">
            <a href="#cta" onClick={() => setOpen(false)} className="btn btn-accent w-full">
              Join the club
            </a>
            <p className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Parul University · Vadodara
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
