/**
 * Single source of truth for identity and contact details.
 * Leave a value as an empty string to hide it everywhere on the site.
 */
export const siteConfig = {
  name: "Harsh Vardhan Singh",
  monogram: "HS",
  role: "Full-Stack Engineer",
  roles: ["Full-Stack Engineer", "AI/ML Engineer", "Software Developer"],
  location: "India",
  headline: "I build digital experiences & intelligent systems.",
  description:
    "Full-stack engineer exploring the intersection of software engineering, intelligent systems, and creative technology.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),

  github: {
    username: "harshsuiiii",
    url: "https://github.com/harshsuiiii",
  },

  // Empty values are hidden, never rendered as dead links.
  linkedin: "https://www.linkedin.com/in/harsh-vardhan-singh-429656292/",
  email: "singhhvs2004@gmail.com",
  /** Either an absolute URL or a path under /public, e.g. "/resume.pdf". */
  resume: "",

  education: {
    degree: "B.Tech, Computer Science",
    specialization: "Artificial Intelligence and Machine Learning",
    institution: "Faculty of Technology, University of Delhi",
  },
} as const;

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export type SocialLink = { label: string; href: string; external: boolean };

/** Only the links that are actually configured. */
export function socialLinks(): SocialLink[] {
  const links: SocialLink[] = [{ label: "GitHub", href: siteConfig.github.url, external: true }];
  if (siteConfig.linkedin) links.push({ label: "LinkedIn", href: siteConfig.linkedin, external: true });
  if (siteConfig.resume)
    links.push({ label: "Résumé", href: siteConfig.resume, external: /^https?:/.test(siteConfig.resume) });
  if (siteConfig.email) links.push({ label: "Email", href: `mailto:${siteConfig.email}`, external: false });
  return links;
}
