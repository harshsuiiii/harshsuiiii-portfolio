import { HeroSection } from "@/components/hero/hero-section";
import { ProjectShowreel } from "@/components/projects/project-showreel";
import { AboutSection } from "@/components/about/about-section";
import { ExpertiseSection } from "@/components/skills/expertise-section";
import { ExperienceTimeline } from "@/components/experience/experience-timeline";
import { GitHubActivity } from "@/components/github/github-activity";
import { CurrentlyExploring } from "@/components/exploring/currently-exploring";
import { ContactSection } from "@/components/contact/contact-section";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site-config";

// Re-fetch GitHub data at most once an hour.
export const revalidate = 3600;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  description: siteConfig.description,
  url: siteConfig.url,
  address: { "@type": "PostalAddress", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: siteConfig.education.institution },
  sameAs: [siteConfig.github.url, siteConfig.linkedin].filter(Boolean),
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <HeroSection />
      <ProjectShowreel projects={projects} />
      <AboutSection />
      <ExpertiseSection />
      <ExperienceTimeline />
      <GitHubActivity />
      <CurrentlyExploring />
      <ContactSection />
    </>
  );
}
