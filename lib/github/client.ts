/**
 * Minimal server-side GitHub client.
 * - Never import this from a client component: it reads GITHUB_TOKEN.
 * - Never throws: every failure (network, rate limit, bad status) resolves to null
 *   so callers can fall back to the checked-in snapshot.
 */

// Overridable for GitHub Enterprise or for testing against a local mock.
const API = (process.env.GITHUB_API_URL ?? "https://api.github.com").replace(/\/$/, "");
const REVALIDATE_SECONDS = 60 * 60; // cache responses for an hour
const TIMEOUT_MS = 8000; // never let a slow API stall a render or a build

function headers(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "portfolio-site",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function isRateLimited(res: Response) {
  return res.status === 429 || (res.status === 403 && res.headers.get("x-ratelimit-remaining") === "0");
}

export async function githubRest<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, {
      headers: headers(),
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (isRateLimited(res)) {
      const reset = Number(res.headers.get("x-ratelimit-reset") ?? 0) * 1000;
      console.warn(`[github] rate limited on ${path}; resets ${reset ? new Date(reset).toISOString() : "soon"}`);
      return null;
    }
    if (!res.ok) {
      console.warn(`[github] ${res.status} on ${path}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (error) {
    console.warn(`[github] request failed for ${path}:`, error instanceof Error ? error.message : error);
    return null;
  }
}

/** GraphQL needs a token; returns null without one. */
export async function githubGraphQL<T>(query: string, variables: Record<string, unknown>): Promise<T | null> {
  if (!process.env.GITHUB_TOKEN) return null;
  try {
    const res = await fetch(`${API}/graphql`, {
      method: "POST",
      headers: { ...headers(), "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { data?: T; errors?: unknown };
    return json.errors ? null : (json.data ?? null);
  } catch {
    return null;
  }
}
