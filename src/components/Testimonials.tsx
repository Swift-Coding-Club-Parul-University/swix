import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";
import { cn } from "@/utils/cn";

const tones = ["#FFC6DD", "#BDE4FF", "#D9CFFF", "#B9ECCD"];

const stories = [
  {
    quote:
      "I joined not owning a Mac. Six months later my attendance app was on the App Store and I had an iOS internship offer from a Pune fintech.",
    name: "Aarushi Patel",
    role: "B.Tech CSE '25 · iOS Intern, Slice",
    initials: "AP",
    featured: true,
    win: "guestbook.txt — entry 001",
  },
  {
    quote:
      "The weekly code reviews changed how I think about software. Every Thursday we'd tear apart each other's PRs — respectfully but honestly.",
    name: "Kathan Mehta",
    role: "B.Tech IT '26 · SWE Intern, Flipkart",
    initials: "KM",
    featured: false,
    win: "review_log.txt — entry 002",
  },
  {
    quote:
      "We built Pulse in three weeks for the Swift Student Challenge. The mentors here pushed us past what we thought we could do.",
    name: "Nisha Desai",
    role: "B.Tech CSE '25 · WWDC Scholar '25",
    initials: "ND",
    featured: false,
    win: "wwdc_entry.txt — entry 003",
  },
  {
    quote:
      "From zero Swift knowledge to shipping a campus ride-sharing app used by 800 students. That's what this club does.",
    name: "Rohan Joshi",
    role: "B.Tech CSE '26 · Founder, Raahi",
    initials: "RJ",
    featured: false,
    win: "launch_day.txt — entry 004",
  },
];

export function Testimonials() {
  return (
    <section id="stories" className="webcore-section cv-auto relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="webcore-stars pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 45% at 85% 10%, rgba(240,81,56,0.05), transparent 60%)" }}
      />

      <div className="container-x relative">
        <SectionHeader
          index="10"
          eyebrow="Member stories"
          title={
            <span className="text-ink">
              Said by people <span className="text-[#F05138]">who shipped.</span>
            </span>
          }
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {stories.map((s, i) => (
            <Reveal key={s.name} delay={i * 80} className={cn(s.featured && "md:col-span-2 lg:row-span-2")}>
              <figure
                className="lab-panel group flex h-full flex-col overflow-hidden"
                style={
                  {
                    "--tone": tones[i],
                    "--tilt-r": i % 2 ? "0.4deg" : "-0.4deg",
                  } as React.CSSProperties
                }
              >
                <header className="lab-bar">
                  <span className="lab-dots" aria-hidden>
                    <span className="lab-dot" />
                    <span className="lab-dot" />
                    <span className="lab-dot" />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[11px] font-semibold tracking-[0.01em] text-ink/70">
                    {s.win}
                  </span>
                </header>

                <div className={cn("relative isolate flex flex-1 flex-col justify-between p-6", s.featured && "sm:p-8")}>
                  <span aria-hidden className="pointer-events-none absolute right-4 top-0 -z-10 select-none font-serif text-[100px] leading-none" style={{ color: tones[i] }}>“</span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F05138]/70" aria-hidden>
                      &gt; member_story_{String(i + 1).padStart(2, "0")}
                    </p>
                    <blockquote
                      className={cn(
                        "mt-5 text-pretty font-medium tracking-tight text-ink",
                        s.featured ? "text-2xl leading-snug sm:text-[2rem]" : "text-[16.5px] leading-relaxed"
                      )}
                    >
                      "{s.quote}"
                      <span className="ml-1 inline-block h-4 w-[8px] translate-y-0.5 animate-blink bg-[#F05138]" aria-hidden />
                    </blockquote>
                  </div>
                  <figcaption className="mt-8 flex items-center gap-3 border-t border-line pt-5">
                    <span className="grid h-10 w-10 place-items-center rounded-sm border border-[#F05138]/50 bg-[#F05138]/10 font-mono text-xs font-bold text-[#F05138]" aria-hidden>
                      {s.initials}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-ink">{s.name}</span>
                      <span className={cn("block font-mono text-[11px]", s.featured ? "text-muted" : "text-ink/50")}>{s.role}</span>
                    </span>
                  </figcaption>
                </div>

                <footer className="lab-status">
                  <span>100%</span>
                  <span className="flex items-center gap-2">
                    <span className="lab-live" aria-hidden />
                    ASCII
                  </span>
                </footer>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
