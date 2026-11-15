import type { GitHubOverview, GitHubRepo } from "@/lib/github/types";

/**
 * Captured from the GitHub API on 2026-11-14. Used only when the live API
 * cannot be reached (offline build, rate limit), so the page never breaks.
 */
const repo = (name: string, language: string | null, pushedAt: string, description: string | null = null, homepage: string | null = null, stars = 0): GitHubRepo => ({
  name,
  description,
  url: `https://github.com/harshsuiiii/${name}`,
  homepage,
  language,
  stars,
  forks: 0,
  pushedAt,
  topics: [],
});

const recent: GitHubRepo[] = [
  repo("URL-Shortner", "Java", "2026-11-13T00:00:00Z"),
  repo("Auto-Redteaming-Agent", "Python", "2026-11-07T00:00:00Z"),
  repo("rate-limiter", "TypeScript", "2026-10-30T00:00:00Z"),
  repo("botforge-saas", "JavaScript", "2026-10-26T00:00:00Z"),
  repo("Booking-Agent", "Python", "2026-10-20T00:00:00Z", null, "https://booking-agent-lemon.vercel.app"),
  repo("ReviveX", "TypeScript", "2026-08-30T00:00:00Z"),
];

const languageCounts: [string, number][] = [
  ["JavaScript", 8],
  ["Python", 4],
  ["TypeScript", 4],
  ["Jupyter Notebook", 4],
  ["Java", 2],
  ["CSS", 1],
  ["HTML", 1],
];
const languageTotal = languageCounts.reduce((a, [, n]) => a + n, 0);

export const githubSnapshot: GitHubOverview = {
  source: "snapshot",
  fetchedAt: "2026-11-14T00:00:00Z",
  publicRepos: 32,
  followers: 5,
  originalRepos: 29,
  totalStars: 4,
  languages: languageCounts.map(([name, count]) => ({ name, count, share: count / languageTotal })),
  recent,
  byName: Object.fromEntries(recent.map((r) => [r.name, r])),
  activity: { kind: "none", days: [], total: 0 },
};
