import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { navLinks, siteConfig, socialLinks } from "@/data/site-config";

export function Footer() {
  const year = new Date().getFullYear();
  const [first, second, ...rest] = siteConfig.name.split(" ");
  return (
    <footer className="border-t border-border">
      <div className="container-x py-12 md:py-16">
        <div className="grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-6">
            <p className="display text-[clamp(2rem,4vw,3.25rem)]">
              {first} {second}
              <br />
              {rest.join(" ")}
              <span className="align-super text-[0.4em]">©</span>
            </p>
            <p className="mt-4 max-w-sm text-base text-text-2">
              {siteConfig.roles.join(" · ")}. Based in {siteConfig.location}.
            </p>
          </div>

          <nav aria-label="Footer" className="col-span-2 md:col-span-3 lg:col-span-2 lg:col-start-8">
            <p className="label mb-4 text-text-3">Navigate</p>
            <ul className="space-y-1">
              {[...navLinks, { label: "All projects", href: "/projects" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline inline-block py-2.5">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <p className="label mb-4 text-text-3">Elsewhere</p>
            <ul className="space-y-1">
              {socialLinks().map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    {...(s.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="link-underline inline-block py-2.5"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <p className="label text-text-3">
            © {year} {siteConfig.name}
          </p>
          <a href="#main" className="label group inline-flex h-11 items-center gap-2 text-text-2 hover:text-text">
            Back to top
            <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-1" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
