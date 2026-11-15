import { cache } from "react";
import { siteConfig } from "@/data/site-config";
import { githubSnapshot } from "@/data/github-snapshot";
import { githubGraphQL, githubRest } from "./client";
import type { ActivityDay, GitHubOverview, GitHubRepo, LanguageShare } from "./types";

type ApiUser = { public_repos: number; followers: number };
type ApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  topics?: string[];
  fork: boolean;
  private: boolean;
  archived: boolean;
};
type ApiEvent = { type: string; created_at: string };
type ContributionData = {
  user: { contributionsCollection: { contributionCalendar: { totalContributions: number; weeks: { contributionDays: { date: string; contributionCount: number }[] }[] } } } | null;
};

const ACTIVITY_WEEKS = 16;
const user = siteConfig.github.username;

const toRepo = (r: ApiRepo): GitHubRepo => ({
  name: r.name,
  description: r.description,
  url: r.html_url,
  homepage: r.homepage || null,
  language: r.language,
  stars: r.stargazers_count,
  forks: r.forks_count,
  pushedAt: r.pushed_at,
  topics: r.topics ?? [],
});

function languageShares(repos: ApiRepo[]): LanguageShare[] {
  const counts = new Map<string, number>();
  for (const r of repos) if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
  const total = [...counts.values()].reduce((a, b) => a + b, 0) || 1;
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count, share: count / total }));
}

/** A continuous list of days ending today, filled from a date → count map. */
function fillDays(counts: Map<string, number>, weeks: number): ActivityDay[] {
  const days: ActivityDay[] = [];
  const end = new Date();
  end.setUTCHours(0, 0, 0, 0);
  // end on Saturday of the current week so columns are whole weeks
  end.setUTCDate(end.getUTCDate() + (6 - end.getUTCDay()));
  for (let i = weeks * 7 - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setUTCDate(end.getUTCDate() - i);
    const date = d.toISOString().slice(0, 10);
    days.push({ date, count: counts.get(date) ?? 0 });
  }
  return days;
}

async function getActivity(): Promise<GitHubOverview["activity"]> {
  // Preferred: the real contribution calendar (needs GITHUB_TOKEN).
  const data = await githubGraphQL<ContributionData>(
    `query($login: String!) { user(login: $login) { contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } } } } }`,
    { login: user },
  );
  const calendar = data?.user?.contributionsCollection.contributionCalendar;
  if (calendar) {
    const counts = new Map(calendar.weeks.flatMap((w) => w.contributionDays).map((d) => [d.date, d.contributionCount]));
    const days = fillDays(counts, ACTIVITY_WEEKS);
    return { kind: "contributions", days, total: days.reduce((a, d) => a + d.count, 0) };
  }

  // Fallback without a token: recent public events (GitHub keeps roughly 90 days).
  const pages = await Promise.all([1, 2, 3].map((p) => githubRest<ApiEvent[]>(`/users/${user}/events/public?per_page=100&page=${p}`)));
  const events = pages.flatMap((p) => p ?? []);
  if (!events.length) return { kind: "none", days: [], total: 0 };
  const counts = new Map<string, number>();
  for (const e of events) {
    const date = e.created_at.slice(0, 10);
    counts.set(date, (counts.get(date) ?? 0) + 1);
  }
  const days = fillDays(counts, ACTIVITY_WEEKS);
  return { kind: "events", days, total: days.reduce((a, d) => a + d.count, 0) };
}

/**
 * Everything the GitHub section needs, in one cached call per request.
 * Falls back to the checked-in snapshot if GitHub cannot be reached.
 */
export const getGitHubOverview = cache(async (): Promise<GitHubOverview> => {
  const [profile, repos, activity] = await Promise.all([
    githubRest<ApiUser>(`/users/${user}`),
    githubRest<ApiRepo[]>(`/users/${user}/repos?per_page=100&sort=pushed&type=owner`),
    getActivity(),
  ]);

  if (!profile || !repos) return { ...githubSnapshot, activity: activity.kind === "none" ? githubSnapshot.activity : activity };

  // The public endpoint only returns public repositories; the filter is a second guard.
  const visible = repos.filter((r) => !r.private);
  const original = visible.filter((r) => !r.fork);
  const mapped = original.map(toRepo);

  return {
    source: "live",
    fetchedAt: new Date().toISOString(),
    publicRepos: profile.public_repos,
    followers: profile.followers,
    originalRepos: original.length,
    totalStars: original.reduce((a, r) => a + r.stargazers_count, 0),
    languages: languageShares(original),
    recent: mapped.filter((r) => r.name !== user).slice(0, 6),
    byName: Object.fromEntries(mapped.map((r) => [r.name, r])),
    activity,
  };
});
