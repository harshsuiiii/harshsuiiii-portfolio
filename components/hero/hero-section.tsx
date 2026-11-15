import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { siteConfig, socialLinks } from "@/data/site-config";
import { HeroVisual } from "./hero-visual";

const lines: React.ReactNode[] = [
  "I build digital",
  <>
    experiences <span className="text-text-3">&amp;</span>
  </>,
  <>
    <span className="mark-lime">intelligent</span> systems.
  </>,
];

export function HeroSection() {
  const links = socialLinks().filter((l) => l.label !== "Email");
  const contactHref = siteConfig.email ? `mailto:${siteConfig.email}` : "/contact";

  return (
    <section aria-labelledby="hero-title" className="relative flex min-h-svh flex-col overflow-hidden pt-(--nav-h)">
      {/* Systems visual: fills the upper area, fades out behind the headline. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[62%] [mask-image:linear-gradient(to_bottom,black_45%,transparent)]">
        <HeroVisual className="size-full" />
      </div>

      <div className="container-x relative flex flex-1 flex-col justify-end pb-6 md:pb-8">
        <div className="fade-up mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 md:mb-8" style={{ "--i": 0 } as React.CSSProperties}>
          <span className="label inline-flex items-center gap-2 text-text-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-lime opacity-70 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-lime ring-1 ring-ink/30" />
            </span>
            {siteConfig.name}
          </span>
          <span className="label text-text-3">Full-Stack Engineer / AI·ML / {siteConfig.location}</span>
        </div>

        <div className="grid-12 items-end gap-y-8">
          <h1 id="hero-title" className="display col-span-4 text-(length:--text-hero) md:col-span-6 lg:col-span-9">
            {lines.map((line, i) => (
              <span key={i} className="line-mask">
                <span style={{ "--i": i + 1 } as React.CSSProperties}>{line}</span>
              </span>
            ))}
          </h1>

          <div className="fade-up col-span-4 md:col-span-4 lg:col-span-3 lg:pb-3" style={{ "--i": 5 } as React.CSSProperties}>
            <p className="text-pretty text-base text-text-2 md:text-[1.0625rem]">{siteConfig.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/#work" className="btn btn-primary">
                View work <ArrowDown className="size-4" aria-hidden />
              </Link>
              <Link href={contactHref} className="btn btn-ghost">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div
          className="fade-up mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-border pt-4 md:mt-14"
          style={{ "--i": 6 } as React.CSSProperties}
        >
          <ul className="flex flex-wrap gap-x-6">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="label group inline-flex h-11 items-center gap-1 text-text-2 hover:text-text"
                >
                  {l.label}
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
          <p className="label hidden text-text-3 sm:block">Scroll — selected work (12)</p>
        </div>
      </div>
    </section>
  );
}
