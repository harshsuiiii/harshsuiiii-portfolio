"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { navLinks, siteConfig, socialLinks } from "@/data/site-config";
import { ThemeToggle } from "./theme-toggle";

const ease = [0.16, 1, 0.3, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => !href.startsWith("/#") && pathname.startsWith(href);
  const mobileLinks = [{ label: "Home", href: "/" }, ...navLinks, { label: "All projects", href: "/projects" }];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        scrolled && !open ? "border-border bg-bg/80 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <div className="container-x flex h-(--nav-h) items-center justify-between">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="relative z-50 inline-flex h-11 items-center font-display text-xl font-bold tracking-tight"
          aria-label={`${siteConfig.name} — home`}
        >
          {siteConfig.monogram}
          <span className="align-super text-[0.55em] font-medium">®</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`label link-underline py-2 ${isActive(l.href) ? "text-text" : "text-text-2 hover:text-text"}`}
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <div className="relative z-50 flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full bg-text text-bg"
          >
            <span className="relative block h-3 w-5" aria-hidden>
              <span
                className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-5 bg-current transition-transform duration-300 ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease }}
            className="fixed inset-0 z-40 flex h-dvh flex-col justify-between overflow-y-auto bg-bg px-(--gutter) pb-8 pt-[calc(var(--nav-h)+24px)] md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {mobileLinks.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={reduce ? false : { y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display flex items-baseline gap-4 border-b border-border py-4 text-[clamp(2rem,10vw,3.4rem)]"
                  >
                    <span className="label text-text-3">0{i + 1}</span>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {socialLinks().map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  {...(s.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="label py-3 text-text-2"
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
