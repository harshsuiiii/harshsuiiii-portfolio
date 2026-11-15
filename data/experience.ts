export type ExperienceEntry = {
  organization: string;
  area: string;
  /** Optional. Left out on purpose until verified dates are supplied. */
  period?: string;
  summary: string;
  points: string[];
  tags: string[];
};

/**
 * Verified information only. Add `period` (e.g. "Jun 2025 — Aug 2025") or a
 * job title once you want them shown; nothing here is inferred.
 */
export const experience: ExperienceEntry[] = [
  {
    organization: "Delhi University Computer Centre (DUCC)",
    area: "Web & backend engineering",
    summary:
      "Worked on the software behind the University of Delhi's web presence — the content management system, the website itself, and the backend that serves it.",
    points: [
      "Worked with the CMS software used to manage university content.",
      "Contributed to development of the Delhi University website.",
      "Handled backend development.",
    ],
    tags: ["CMS", "Web development", "Backend"],
  },
  {
    organization: "Moonrise Festival",
    area: "Sponsorship & marketing operations",
    summary: "Worked on the operational side of a festival: sponsorship and marketing.",
    points: ["Worked on sponsorship operations.", "Worked on marketing operations."],
    tags: ["Sponsorship", "Marketing", "Operations"],
  },
];
