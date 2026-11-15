import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactSection } from "@/components/contact/contact-section";
import { siteConfig, socialLinks } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const links = socialLinks();
  return (
    <div className="pt-(--nav-h)">
      <ContactSection as="h1" showFormLink={false} />

      <section aria-labelledby="message-title" className="container-x border-t border-border py-(--section)">
        <div className="grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-6 lg:col-span-4">
            <h2 id="message-title" className="font-display text-(length:--text-project) font-semibold leading-[1.05] tracking-[-0.025em]">
              Write a message
            </h2>
            <p className="mt-4 max-w-sm text-base text-text-2">
              Roles, collaborations, or a hard problem you think I&apos;d enjoy — I read everything.
            </p>
            <ul className="mt-8">
              {links.map((l) => (
                <li key={l.label} className="border-t border-border last:border-b">
                  <a
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group flex min-h-12 items-center justify-between py-3"
                  >
                    <span className="label text-text-2 group-hover:text-text">{l.label}</span>
                    <span className="truncate pl-6 font-mono text-sm text-text-2">{l.href.replace(/^(https?:\/\/|mailto:)/, "")}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-4 md:col-span-6 lg:col-span-7 lg:col-start-6">
            {siteConfig.email ? (
              <ContactForm email={siteConfig.email} />
            ) : (
              <div className="rounded-(--radius-lg) border border-border bg-surface p-6 md:p-8">
                <p className="font-display text-xl font-semibold tracking-[-0.02em]">The quickest way to reach me is GitHub.</p>
                <p className="mt-3 max-w-lg text-base text-text-2">
                  Open an issue or discussion on any repository, or follow the profile below.
                </p>
                <a href={siteConfig.github.url} target="_blank" rel="noreferrer" className="btn btn-primary mt-6">
                  github.com/{siteConfig.github.username}
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
