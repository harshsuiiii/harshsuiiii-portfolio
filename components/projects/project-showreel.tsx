"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { formatIndex, type Project } from "@/data/projects";
import { ProjectVisual } from "./project-visual";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Poster heights hang from the top edge at staggered lengths (desktop).
const heights = ["lg:h-[52svh]", "lg:h-[64svh]", "lg:h-[44svh]", "lg:h-[58svh]", "lg:h-[68svh]", "lg:h-[48svh]"];
const pad = (n: number) => String(n).padStart(2, "0");

export function ProjectShowreel({ projects }: { projects: Project[] }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const pill = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const setProgress = (p: number) => {
    if (bar.current) bar.current.style.transform = `scaleX(${Math.max(0.02, p)})`;
    if (counter.current) counter.current.textContent = pad(Math.min(projects.length, Math.round(p * (projects.length - 1)) + 1));
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Pinned horizontal storytelling: desktop + motion allowed only.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => Math.max(0, el.scrollWidth - window.innerWidth);
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => setProgress(self.progress),
          },
        });
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  // Touch / reduced-motion path: the track scrolls natively.
  const onNativeScroll = () => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max > 0) setProgress(el.scrollLeft / max);
  };

  const onMove = (e: React.MouseEvent) => {
    if (pill.current) pill.current.style.transform = `translate3d(${e.clientX + 18}px, ${e.clientY + 18}px, 0)`;
  };

  return (
    <section
      id="work"
      ref={section}
      aria-labelledby="work-title"
      onMouseMove={onMove}
      className="relative flex flex-col overflow-hidden border-t border-border pt-(--section) lg:motion-safe:h-svh lg:motion-safe:pt-0"
    >
      <div
        ref={track}
        onScroll={onNativeScroll}
        className="no-scrollbar order-2 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-(--gutter) pb-2 md:gap-6 lg:motion-safe:order-1 lg:motion-safe:w-max lg:motion-safe:flex-1 lg:motion-safe:snap-none lg:motion-safe:overflow-visible lg:motion-safe:will-change-transform"
      >
        {projects.map((p, i) => (
          <article key={p.slug} className="w-[78vw] shrink-0 snap-center sm:w-[52vw] md:w-[40vw] lg:w-[25vw] lg:min-w-[320px] lg:max-w-[440px]">
            <Link
              href={`/projects/${p.slug}`}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className="group block focus-visible:outline-offset-[-4px]"
              aria-label={`${p.title} — ${p.category}. View case study.`}
            >
              <div className={`relative h-[50svh] max-h-[520px] min-h-[320px] overflow-hidden rounded-b-(--radius-lg) rounded-t-(--radius-lg) border border-border lg:max-h-none lg:motion-safe:rounded-t-none lg:motion-safe:border-t-0 ${heights[i % heights.length]}`}>
                <ProjectVisual
                  slug={p.slug}
                  poster={p.poster}
                  title={p.title}
                  className="size-full px-2 transition-transform duration-[900ms] ease-(--ease-out) group-hover:scale-[1.045] lg:motion-safe:pt-(--nav-h)"
                />
                <div className="absolute inset-x-0 bottom-0 flex translate-y-2 flex-wrap gap-1.5 p-4 opacity-0 transition-[opacity,transform] duration-500 ease-(--ease-out) group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  {p.labels.map((l) => (
                    <span key={l} className="label rounded-full bg-ink px-2.5 py-1 text-[0.6875rem] text-white">
                      {l}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-start justify-between gap-4 pt-4">
                <div>
                  <h3 className="display text-[clamp(1.35rem,1.9vw,1.75rem)] leading-[1.02]">
                    {p.titleLines[0]}
                    {p.titleLines[1] && (
                      <>
                        <br />
                        {p.titleLines[1]}
                      </>
                    )}
                  </h3>
                  <p className="label mt-2 text-text-3">{p.category}</p>
                </div>
                <span className="label flex items-center gap-1 pt-1 text-text-3">
                  ({formatIndex(i)})
                  <ArrowUpRight className="size-4 text-text transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 lg:hidden" aria-hidden />
                </span>
              </div>
            </Link>
          </article>
        ))}
        {/* trailing spacer so the last poster can clear the right edge */}
        <div aria-hidden className="w-px shrink-0 lg:w-[6vw]" />
      </div>

      <div className="container-x order-1 pb-8 lg:motion-safe:order-2 lg:motion-safe:pb-7 lg:motion-safe:pt-4">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <div>
            <p className="label mb-3 text-text-3">
              <span className="text-accent">(01)</span> Showreel
            </p>
            <h2 id="work-title" className="display text-[clamp(2.5rem,6.2vw,5.75rem)]">
              Selected work
            </h2>
          </div>
          <div className="flex w-full items-center gap-5 sm:w-auto sm:min-w-[340px]">
            <p className="label tabular-nums text-text-2" aria-hidden>
              <span ref={counter}>01</span> / {pad(projects.length)}
            </p>
            <span className="relative h-px flex-1 bg-border" aria-hidden>
              <span ref={bar} className="absolute inset-0 origin-left scale-x-[0.02] bg-text" />
            </span>
            <Link href="/projects" className="label link-underline py-3 text-text">
              All projects
            </Link>
          </div>
        </div>
      </div>

      {/* Cursor-following label, mouse users only */}
      <div
        ref={pill}
        aria-hidden
        className={`label pointer-events-none fixed left-0 top-0 z-40 hidden rounded-full bg-lime px-3.5 py-2 text-ink transition-opacity duration-200 lg:block ${hovering ? "opacity-100" : "opacity-0"}`}
      >
        View project
      </div>
    </section>
  );
}
