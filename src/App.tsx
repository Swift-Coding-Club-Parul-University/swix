import { lazy, Suspense, useCallback, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SocialProof } from "./components/SocialProof";
import { GlassHighlights } from "./components/GlassHighlights";
import { SectionDock } from "./components/SectionDock";
import { Splash } from "./components/ui/Splash";

/**
 * Above-the-fold (Navbar, Hero, SocialProof) is imported eagerly so first paint
 * is instant. Everything below is lazy — React defers evaluating/mounting those
 * trees until after the hero has committed, keeping main-thread work small on
 * low-end and mobile devices. Combined with `content-visibility: auto` in CSS,
 * the browser paints the page section by section as you scroll.
 */
const ScrollStory = lazy(() => import("./components/ScrollStory").then((m) => ({ default: m.ScrollStory })));
const Features = lazy(() => import("./components/Features").then((m) => ({ default: m.Features })));
const Benefits = lazy(() => import("./components/Benefits").then((m) => ({ default: m.Benefits })));
const Showcase = lazy(() => import("./components/Showcase").then((m) => ({ default: m.Showcase })));
const AppleLab = lazy(() => import("./components/AppleLab").then((m) => ({ default: m.AppleLab })));
const Coverflow = lazy(() => import("./components/Coverflow").then((m) => ({ default: m.Coverflow })));
const Gallery = lazy(() => import("./components/Gallery").then((m) => ({ default: m.Gallery })));
const Team = lazy(() => import("./components/Team").then((m) => ({ default: m.Team })));
const Testimonials = lazy(() => import("./components/Testimonials").then((m) => ({ default: m.Testimonials })));
const FAQ = lazy(() => import("./components/FAQ").then((m) => ({ default: m.FAQ })));
const Terminal = lazy(() => import("./components/Terminal").then((m) => ({ default: m.Terminal })));
const CTA = lazy(() => import("./components/CTA").then((m) => ({ default: m.CTA })));
const Footer = lazy(() => import("./components/Footer").then((m) => ({ default: m.Footer })));

function SectionFallback() {
  return <div aria-hidden className="min-h-[40vh]" />;
}

export default function App() {
  const [booting, setBooting] = useState(true);
  const completeBoot = useCallback(() => setBooting(false), []);

  return (
    <>
      {booting && <Splash onComplete={completeBoot} />}
      <div inert={booting} className="site-shell">
      <SectionDock />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <GlassHighlights />
        <SocialProof />
        <Suspense fallback={<SectionFallback />}>
          <ScrollStory />
          <Features />
          <Benefits />
          <Showcase />
          <AppleLab />
          <Coverflow />
          <Gallery />
          <Team />
          <Testimonials />
          <FAQ />
          <Terminal />
          <CTA />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      </div>
    </>
  );
}
