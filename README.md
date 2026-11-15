# Harsh Vardhan Singh — Portfolio

An editorial engineering portfolio: a typographic hero, a horizontal project showreel, twelve case studies written from the actual repositories, and live GitHub activity.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion · GSAP ScrollTrigger · Lenis · next-themes · MDX

## Before you publish

Three details were left blank in the brief. Fill them in `data/site-config.ts`:

```ts
linkedin: "https://www.linkedin.com/in/…",
email: "you@example.com",
resume: "/resume.pdf", // put the file in /public, or use a full URL
```

Until they are set the site hides those links (and the contact form) instead of showing dead ones.

You can also add dates or titles to `data/experience.ts` — none were supplied, so none are shown.

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000.

## Environment variables

Copy `.env.example` to `.env.local`. Both variables are optional for local work.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public URL of the site. Used for canonical links, Open Graph, sitemap and robots. Set this in production. |
| `GITHUB_TOKEN` | Optional, server-only. Raises the GitHub API limit from 60 to 5,000 requests/hour and switches the activity grid from "public events" to the real contribution calendar. |
| `GITHUB_API_URL` | Optional. Override the API base (testing or GitHub Enterprise). |

To create a token: GitHub → Settings → Developer settings → Fine-grained tokens → *Public repositories (read-only)*. No other permission is needed. The token is read only in `lib/github/client.ts`, which runs on the server; it is never sent to the browser.

## How GitHub data is used

- `lib/github/` fetches the profile, public repositories and recent activity on the server, cached for one hour.
- Every request has an 8-second timeout. Network errors, non-200 responses and rate limits all resolve to `null`.
- When GitHub can't be reached the site renders `data/github-snapshot.ts` and labels the section "Snapshot". The page never depends on the API.
- Only public, non-fork repositories are shown. Private repositories are never requested.

## Editing content

| What | Where |
|---|---|
| Name, links, education | `data/site-config.ts` |
| Project facts, stack, features, diagram stages, results | `data/projects.ts` |
| Case-study narrative | `content/projects/<slug>.mdx` |
| Experience | `data/experience.ts` |
| Skills and expertise | `data/skills.ts` |
| Currently exploring | `data/currently-exploring.ts` |
| Poster artwork | `components/projects/project-visual.tsx` |
| Colours, type, spacing, motion tokens | `app/globals.css` |

To add a project: add an entry to `projects` in `data/projects.ts`, create `content/projects/<slug>.mdx`, and add a visual for the slug in `project-visual.tsx`.

## Checks

```bash
npm run typecheck
```

```bash
npm run lint
```

```bash
npm run build
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project**, import the repository. The framework is detected as Next.js; keep the default build settings.
3. Under **Environment Variables** add `NEXT_PUBLIC_SITE_URL` (your production URL) and, optionally, `GITHUB_TOKEN`.
4. Deploy. Every push to the main branch redeploys; pull requests get preview URLs.

Or from the command line:

```bash
npm i -g vercel
```

```bash
vercel
```

```bash
vercel --prod
```

## Project structure

```
app/                  routes, layout, global styles, sitemap, robots, OG image
components/           layout, hero, projects, about, experience, skills, github, contact, animations, ui
content/projects/     case studies (MDX)
data/                 typed, hand-curated content
lib/github/           server-side GitHub client with caching and fallback
public/images/        result plots taken from the project repositories
docs/                 discovery report and design blueprint
```

## Notes on accuracy

Every project claim was checked against the repository's README, source or committed result files. Poster artwork and architecture diagrams are conceptual and labelled as such; the plots on the two ML4SCI case studies are the real outputs from those repositories.
