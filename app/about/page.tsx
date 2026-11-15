import type { Metadata } from "next";
import { AboutSection } from "@/components/about/about-section";
import { ExperienceTimeline } from "@/components/experience/experience-timeline";
import { SkillsSection } from "@/components/skills/skills-section";
import { ContactSection } from "@/components/contact/contact-section";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "About",
  description: `${siteConfig.name} — ${siteConfig.roles.join(", ")}. ${siteConfig.education.degree} (${siteConfig.education.specialization}), ${siteConfig.education.institution}.`,
  alternates: { canonical: "/about" },
};

const facts = [
  { label: "Role", value: siteConfig.roles.join(" · ") },
  { label: "Studying", value: `${siteConfig.education.degree} — ${siteConfig.education.specialization}` },
  { label: "At", value: siteConfig.education.institution },
  { label: "Based in", value: siteConfig.location },
];

export default function AboutPage() {
  return (
    <>
      <header className="container-x pt-[calc(var(--nav-h)+48px)] md:pt-[calc(var(--nav-h)+88px)]">
        <p className="label fade-up text-text-3">About</p>
        <h1 className="display mt-6 text-[clamp(2.75rem,9.4vw,9rem)]">
          {["Engineer.", "Builder.", "Systems thinker."].map((line, i) => (
            <span key={line} className="line-mask">
              <span style={{ "--i": i } as React.CSSProperties}>
                {i === 2 ? <span className="text-text-3">{line}</span> : line}
              </span>
            </span>
          ))}
        </h1>
        <dl className="fade-up mt-12 grid gap-x-8 gap-y-5 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-4" style={{ "--i": 4 } as React.CSSProperties}>
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="label text-[0.6875rem] text-text-3">{f.label}</dt>
              <dd className="mt-1.5 text-base">{f.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <AboutSection withLink={false} />
      <SkillsSection index="03" />
      <ExperienceTimeline index="04" showEducation />
      <ContactSection />
    </>
  );
}
