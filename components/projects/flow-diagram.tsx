"use client";

import { useState } from "react";
import { CornerDownLeft } from "lucide-react";
import type { Project } from "@/data/projects";

/**
 * Interactive architecture diagram. Each stage is a button; selecting one
 * (click, tap, hover or keyboard) shows what happens there.
 */
export function FlowDiagram({ flow }: { flow: Project["flow"] }) {
  const [active, setActive] = useState(0);
  const step = flow.steps[active];

  return (
    <figure className="mt-8 rounded-(--radius-lg) border border-border bg-surface p-4 shadow-(--shadow) md:p-7">
      <figcaption className="label flex flex-wrap items-center justify-between gap-2 text-text-3">
        <span>{flow.title}</span>
        <span className="text-[0.6875rem]">Conceptual diagram · select a stage</span>
      </figcaption>

      <ol className="mt-5 grid gap-2 lg:grid-flow-col lg:auto-cols-fr lg:gap-0">
        {flow.steps.map((s, i) => {
          const isActive = i === active;
          return (
            <li key={s.label} className="relative flex lg:block">
              <button
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-pressed={isActive}
                className={`flex min-h-14 w-full items-center gap-3 rounded-(--radius-sm) border px-3.5 py-3 text-left transition-colors duration-200 lg:min-h-[92px] lg:flex-col lg:items-start lg:justify-between lg:gap-2 ${
                  isActive ? "border-lime bg-lime text-ink" : "border-border bg-bg text-text hover:border-text-3"
                }`}
              >
                <span className={`font-mono text-[0.6875rem] tabular-nums ${isActive ? "text-ink/70" : "text-text-3"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[0.9375rem] font-semibold leading-tight tracking-[-0.01em]">{s.label}</span>
              </button>
              {/* connector to the next stage */}
              {i < flow.steps.length - 1 && (
                <span aria-hidden className="pointer-events-none absolute left-7 top-full z-10 h-2 w-px bg-text-3 lg:left-full lg:top-1/2 lg:hidden" />
              )}
            </li>
          );
        })}
      </ol>
      {/* desktop: one continuous rail under the stages shows direction */}
      <div aria-hidden className="relative mt-3 hidden h-3 lg:block">
        <span className="absolute inset-x-2 top-1/2 h-px bg-border" />
        <span
          className="absolute top-1/2 h-px bg-text transition-[width] duration-500 ease-(--ease-out)"
          style={{ left: 8, width: `calc(${((active + 0.5) / flow.steps.length) * 100}% - 8px)` }}
        />
        <span className="absolute right-1 top-1/2 size-2 -translate-y-1/2 rotate-45 border-r border-t border-text-3" />
      </div>

      {flow.loop && (
        <p className="label mt-3 flex items-center gap-2 text-[0.6875rem] text-text-2">
          <CornerDownLeft className="size-3.5 shrink-0 text-accent" aria-hidden />
          Loop: {flow.loop}
        </p>
      )}

      <div aria-live="polite" className="mt-5 min-h-[5.5rem] border-t border-border pt-4">
        <p className="label text-text-3">
          Stage {String(active + 1).padStart(2, "0")} — {step.label}
        </p>
        <p className="mt-2 max-w-3xl text-base text-text">{step.note}</p>
      </div>
    </figure>
  );
}
