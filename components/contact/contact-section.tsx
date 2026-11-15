import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { siteConfig, socialLinks } from "@/data/site-config";

/** Closing composition. `as="h1"` when it leads the contact page. */
export function ContactSection({ as: Heading = "h2", showFormLink = true }: { as?: "h1" | "h2"; showFormLink?: boolean }) {
  const links = socialLinks();
  const primary = siteConfig.email
    ? { href: `mailto:${siteConfig.email}`, label: siteConfig.email, external: false }
    : { href: siteConfig.github.url, label: "Find me on GitHub", external: true };

  return (
    <section aria-labelledby="contact-title" className="container-x border-t border-border pb-16 pt-(--section) md:pb-24">
      <Reveal>
        <p className="label text-text-3">
          <span className="text-accent">(07)</span> Contact
        </p>
        <Heading id="contact-title" className="display mt-6 text-[clamp(2.5rem,8.4vw,8rem)]">
          Have an interesting problem? <span className="text-text-3">Let&apos;s build something</span>{" "}
          <span className="mark-lime">meaningful.</span>
        </Heading>
      </Reveal>

      <Reveal className="mt-12 flex flex-col gap-8 border-t border-border pt-8 md:mt-16 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-wrap gap-3">
          <a
            href={primary.href}
            {...(primary.external ? { target: "_blank", rel: "noreferrer" } : {})}
            className="btn btn-primary h-[52px] px-7 normal-case"
          >
            {primary.label} <ArrowUpRight className="size-4" aria-hidden />
          </a>
          {showFormLink && (
            <Link href="/contact" className="btn btn-ghost h-[52px]">
              Write a message
            </Link>
          )}
        </div>
        <ul className="flex flex-wrap gap-x-7">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="label link-underline inline-flex h-11 items-center text-text-2 hover:text-text"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
