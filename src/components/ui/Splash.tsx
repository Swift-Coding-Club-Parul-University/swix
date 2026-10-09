import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { SwiftMark } from "./Logo";

const stages = ["Initializing Swift core", "Assembling the workspace", "Connecting the community", "Ready to build something great"];
const rotations = ["rotateY(0deg)", "rotateY(90deg)", "rotateY(180deg)", "rotateY(-90deg)", "rotateX(90deg)", "rotateX(-90deg)"];

export function Splash({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"boot" | "exit" | "out">("boot");
  const [progress, setProgress] = useState(0);
  const skipRef = useRef<HTMLButtonElement>(null);
  const finish = useCallback(() => {
    setProgress(100);
    setPhase((current) => current === "boot" ? "exit" : current);
  }, []);

  useEffect(() => {
    document.body.classList.add("react-booting");
    document.getElementById("splash-static")?.remove();
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      document.body.classList.remove("react-booting");
    };
  }, []);

  useEffect(() => {
    if (phase !== "boot") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    // The intro runs to the same length on every device — a phone plays the
    // full sequence too. Only reduced-motion gets the short version.
    const duration = media.matches ? 120 : 2600;
    const start = performance.now();
    const interval = window.setInterval(() => {
      setProgress(Math.min(99, Math.floor(((performance.now() - start) / duration) * 100)));
    }, 60);
    const timer = window.setTimeout(finish, duration);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    const onMotion = () => { if (media.matches) finish(); };
    window.addEventListener("keydown", onKey);
    media.addEventListener("change", onMotion);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      media.removeEventListener("change", onMotion);
    };
  }, [finish, phase]);

  useEffect(() => {
    if (phase !== "exit") return;
    document.body.classList.add("app-ready");
    const timer = window.setTimeout(() => {
      const restoreFocus = document.activeElement === skipRef.current;
      setPhase("out");
      onComplete();
      if (restoreFocus) window.requestAnimationFrame(() => document.getElementById("main")?.focus({ preventScroll: true }));
      // Exit length tracks the .boot-screen transition in index.css — if
      // these drift apart the splash unmounts mid-fade.
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 700);
    return () => clearTimeout(timer);
  }, [onComplete, phase]);

  if (phase === "out") return null;

  const stage = Math.min(3, Math.floor(progress / 28));
  return (
    <div className="boot-screen" data-phase={phase}>
      <div className="boot-grid" aria-hidden="true" />
      <div className="boot-topline">
        <span><i /> SWIFT CODING CLUB</span>
        <span>PARUL UNIVERSITY / EST. 2020</span>
      </div>
      <button ref={skipRef} type="button" className="boot-skip" onClick={finish}>Skip intro <span aria-hidden="true">↗</span></button>
      <div className="boot-content">
        <div className="boot-scene" aria-hidden="true">
          <div className="boot-floor" />
          <div className="boot-orbits">
            {[0, 1, 2].map((i) => <div key={i} className="boot-orbit" style={{ "--orbit-index": i } as CSSProperties}><span /></div>)}
          </div>
          <div className="boot-core-position">
            <div className="boot-core">
              {rotations.map((rotation, i) => (
                <div key={rotation} className="boot-face" style={{ "--face-rotation": rotation, "--face-index": i } as CSSProperties}>
                  <span className="boot-face-frame" />
                  {i === 0 ? (
                    <SwiftMark className="boot-bird" />
                  ) : <span className="boot-face-code">{["", "{ }", "S", "</>", "+", "06"][i]}</span>}
                </div>
              ))}
            </div>
          </div>
          {["SwiftUI", "build.swift", "Hello, world."].map((label, i) => (
            <div key={label} className={`boot-satellite boot-satellite-${i}`}><span>{label}</span></div>
          ))}
          <span className="boot-coordinate boot-coordinate-left">SC / 001<br />CORE ONLINE</span>
          <span className="boot-coordinate boot-coordinate-right">22.30° N<br />73.36° E</span>
        </div>
        <p className="boot-eyebrow">Ideas become apps here.</p>
        <h2 className="boot-title">A little Swift.<br /><span>A whole new dimension.</span></h2>
        <div className="boot-meter" aria-hidden="true"><span style={{ transform: `scaleX(${progress / 100})` }} /></div>
        <div className="boot-status">
          <span role="status" aria-live="polite" aria-atomic="true">{stages[stage]}</span>
          <span aria-hidden="true">{String(progress).padStart(3, "0")}<small>%</small></span>
        </div>
      </div>
      <div className="boot-bottomline"><span>LEARN. BUILD. SHIP.</span><span>YOUR NEXT CHAPTER IS LOADING</span></div>
    </div>
  );
}
