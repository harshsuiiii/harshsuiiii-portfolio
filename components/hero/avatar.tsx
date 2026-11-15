"use client";

import { useEffect, useId, useRef } from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site-config";
import { avatar } from "./avatar-geometry";

// How far the irises may travel, in image pixels. Slightly more than the free
// space inside the eye, so the lids naturally cover part of the iris at the extremes.
const TRAVEL_X = 30;
const TRAVEL_Y = 15;
const EASE = 0.16; // fraction of the remaining distance covered each frame
const TOUCH_RECENTER_MS = 2200;

/**
 * The face is a static cut-out with empty eye whites. The irises are separate
 * sprites clipped to each eye opening, and follow the pointer (mouse, pen or
 * touch). The head leans a few degrees the same way.
 */
export function Avatar({ className = "" }: { className?: string }) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const irises = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gaze = { x: 0, y: 0 }; // where the eyes are now, each axis in [-1, 1]
    const target = { x: 0, y: 0 };
    let raf = 0;
    let recenter: ReturnType<typeof setTimeout> | undefined;

    const render = () => {
      gaze.x += (target.x - gaze.x) * EASE;
      gaze.y += (target.y - gaze.y) * EASE;
      const t = `translate(${(gaze.x * TRAVEL_X).toFixed(2)} ${(gaze.y * TRAVEL_Y).toFixed(2)})`;
      for (const iris of irises.current) iris?.setAttribute("transform", t);
      if (head.current)
        head.current.style.transform = `translate(${(gaze.x * 1.6).toFixed(2)}%, ${(gaze.y * 1.2).toFixed(2)}%) rotate(${(gaze.x * 2.4).toFixed(2)}deg)`;
      const settled = Math.abs(target.x - gaze.x) < 0.002 && Math.abs(target.y - gaze.y) < 0.002;
      raf = settled ? 0 : requestAnimationFrame(render);
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const lookAt = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      if (!rect.width) return; // this instance is hidden at the current breakpoint
      const eyeLine = avatar.eyes[0].cy / avatar.height;
      const dx = clientX - (rect.left + rect.width / 2);
      const dy = clientY - (rect.top + rect.height * eyeLine);
      const distance = Math.hypot(dx, dy);
      // full deflection once the pointer is roughly one face-width away
      const strength = Math.min(1, distance / Math.max(rect.width * 0.9, 160));
      target.x = distance ? (dx / distance) * strength : 0;
      target.y = distance ? (dy / distance) * strength : 0;
      wake();
    };
    const lookAhead = () => {
      target.x = 0;
      target.y = 0;
      wake();
    };

    const onPointer = (e: PointerEvent) => {
      lookAt(e.clientX, e.clientY);
      clearTimeout(recenter);
      // a finger leaves no hovering cursor behind, so drift back to centre afterwards
      if (e.pointerType === "touch") recenter = setTimeout(lookAhead, TOUCH_RECENTER_MS);
    };
    // touchmove keeps firing while the page scrolls, when pointer events are cancelled
    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      lookAt(touch.clientX, touch.clientY);
      clearTimeout(recenter);
      recenter = setTimeout(lookAhead, TOUCH_RECENTER_MS);
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onPointer, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    document.documentElement.addEventListener("mouseleave", lookAhead);
    window.addEventListener("blur", lookAhead);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(recenter);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("touchmove", onTouch);
      document.documentElement.removeEventListener("mouseleave", lookAhead);
      window.removeEventListener("blur", lookAhead);
    };
  }, []);

  return (
    <div ref={root} role="img" aria-label={`Illustrated avatar of ${siteConfig.name}; its eyes follow your pointer`} className={className}>
      <div ref={head} className="relative will-change-transform" style={{ aspectRatio: `${avatar.width} / ${avatar.height}` }}>
        <Image
          src={avatar.src}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 24vw, 160px"
          draggable={false}
          className="select-none object-contain drop-shadow-[0_18px_28px_rgb(0_0_0/0.22)]"
        />
        <svg viewBox={`0 0 ${avatar.width} ${avatar.height}`} aria-hidden className="pointer-events-none absolute inset-0 size-full">
          <defs>
            <linearGradient id={`${id}-shade`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1b1410" stopOpacity="0.42" />
              <stop offset="1" stopColor="#1b1410" stopOpacity="0" />
            </linearGradient>
            {avatar.eyes.map((eye) => (
              <clipPath key={eye.side} id={`${id}-${eye.side}`}>
                <path d={eye.clip} />
              </clipPath>
            ))}
          </defs>

          {avatar.eyes.map((eye, i) => (
            <g key={eye.side} clipPath={`url(#${id}-${eye.side})`}>
              <g
                ref={(node) => {
                  irises.current[i] = node;
                }}
              >
                <image
                  href={`/images/avatar-iris-${eye.side}.webp`}
                  x={eye.cx - eye.sprite / 2}
                  y={eye.cy - eye.sprite / 2}
                  width={eye.sprite}
                  height={eye.sprite}
                />
              </g>
              {/* shadow the upper lid casts on the eye */}
              <rect x={eye.left} y={eye.top} width={eye.right - eye.left} height={(eye.bottom - eye.top) * 0.34} fill={`url(#${id}-shade)`} />
              {/* eyelid: scales down from the top of the eye to blink */}
              <path d={eye.clip} fill={avatar.lid} className="avatar-lid" style={{ transformOrigin: `${eye.cx}px ${eye.top}px` }} />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
