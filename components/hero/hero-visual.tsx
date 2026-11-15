"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; hub: boolean };

/**
 * A drifting network topology: nodes, the links between near neighbours and
 * occasional packets travelling along them. Decorative only (aria-hidden).
 * Renders a single static frame when the user prefers reduced motion.
 */
export function HeroVisual({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -9999, y: -9999 };
    let nodes: Node[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let colors = { line: "#888", node: "#888", accent: "#a3e635" };

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      colors = {
        line: s.getPropertyValue("--text-3").trim(),
        node: s.getPropertyValue("--text").trim(),
        accent: s.getPropertyValue("--accent-text").trim(),
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(18, Math.min(64, Math.round((w * h) / 16000)));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        hub: i % 7 === 0,
      }));
      draw(0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const reach = Math.min(190, Math.max(110, w * 0.16));

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > reach) continue;
          const near = Math.hypot((a.x + b.x) / 2 - pointer.x, (a.y + b.y) / 2 - pointer.y) < 150;
          ctx.globalAlpha = (1 - d / reach) * (near ? 0.9 : 0.32);
          ctx.strokeStyle = near ? colors.accent : colors.line;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();

          // a packet travelling along some of the links
          if (!reduced && (i + j) % 9 === 0) {
            const p = (t / 2400 + (i * 0.37) % 1) % 1;
            ctx.globalAlpha = 0.9;
            ctx.fillStyle = colors.accent;
            ctx.fillRect(a.x + (b.x - a.x) * p - 1.5, a.y + (b.y - a.y) * p - 1.5, 3, 3);
          }
        }
      }

      for (const n of nodes) {
        ctx.globalAlpha = n.hub ? 0.9 : 0.55;
        ctx.fillStyle = n.hub ? colors.node : colors.line;
        const s = n.hub ? 5 : 3;
        ctx.fillRect(n.x - s / 2, n.y - s / 2, s, s);
        if (n.hub) {
          ctx.globalAlpha = 0.35;
          ctx.strokeStyle = colors.node;
          ctx.strokeRect(n.x - 7, n.y - 7, 14, 14);
        }
      }
      ctx.globalAlpha = 1;
    };

    const step = (t: number) => {
      if (visible) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
        draw(t);
      }
      raf = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };

    readColors();
    resize();

    const themeObserver = new MutationObserver(() => {
      readColors();
      draw(0);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    if (!reduced) raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
