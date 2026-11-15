export type GitHubRepo = {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  pushedAt: string;
  topics: string[];
};

export type LanguageShare = { name: string; count: number; share: number };

export type ActivityDay = { date: string; count: number };

export type GitHubOverview = {
  /** "live" when the API answered, "snapshot" when the checked-in fallback was used. */
  source: "live" | "snapshot";
  fetchedAt: string;
  publicRepos: number;
  followers: number;
  /** Non-fork public repositories. */
  originalRepos: number;
  totalStars: number;
  languages: LanguageShare[];
  recent: GitHubRepo[];
  /** Keyed by repository name, for merging stars / dates into curated projects. */
  byName: Record<string, GitHubRepo>;
  activity: {
    kind: "contributions" | "events" | "none";
    days: ActivityDay[];
    total: number;
  };
};
