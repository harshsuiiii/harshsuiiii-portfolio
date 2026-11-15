# Design blueprint — The Engineer's Digital Showreel

## Identity
An editorial engineering studio of one. Calm paper-or-ink canvas, oversized Space Grotesk headlines anchored low and left, JetBrains Mono for every label, and colour arriving only through project posters and a single lime highlight.

## Tokens (all in `app/globals.css`)
- **Colour** — the specified dark and light palettes as CSS variables (`--bg`, `--surface`, `--elevated`, `--border`, `--text`, `--text-2`, `--text-3`), accents `--lime #A3E635` and `--blue #60A5FA`. Lime is never used as text on light backgrounds; it is a fill behind dark ink.
- **Type** — `--font-display` Space Grotesk, `--font-sans` Inter, `--font-mono` JetBrains Mono. Fluid sizes: hero `clamp(2.75rem, 7.6vw, 7rem)`, section `clamp(2.25rem, 4.6vw, 4rem)`, project title `clamp(1.75rem, 2.6vw, 2.5rem)`, body 16–18px, labels 11–13px.
- **Space** — max width 1440px; gutter 20px → 5vw → 6vw; section rhythm 72px → 160px; 4/6/12-column grid.
- **Shape** — radius 12/16/20px; buttons 48px tall.
- **Motion** — `--ease-out: cubic-bezier(.16,1,.3,1)`, durations 200/500/900ms.

## Pages
| Route | Content |
|---|---|
| `/` | Hero → Showreel → Introduction → Expertise → Experience → GitHub activity → Currently exploring → Contact |
| `/projects` | Numbered index of all twelve projects |
| `/projects/[slug]` | Case study: intro, visual, overview, problem, approach, architecture diagram, implementation, features, stack, challenges, verified results, links, next project |
| `/about` | Longer introduction, experience, education, full skills matrix |
| `/contact` | Closing composition plus a message form that opens the visitor's mail client |

## Signature: the showreel
Twelve tall posters hang from the top of the section at staggered heights. On desktop the section pins and vertical scroll drives the strip sideways (GSAP ScrollTrigger); a progress rule and `03 / 12` counter track position. Hover lifts the poster, reveals stack labels, and a lime "View project" pill follows the cursor. On touch and narrow screens it is a native scroll-snap carousel. With reduced motion it is a plain horizontally scrollable list. Every poster is a link and reachable by keyboard.

Each poster is an original SVG drawn from the project's real mechanism — a conceptual diagram, labelled as such on case-study pages. The two ML4SCI studies additionally show the actual result plots from their repositories.

## Motion system
- Motion for React: scroll reveals, nav and mobile menu, route fade.
- GSAP + ScrollTrigger: showreel only.
- Lenis: smooth wheel scrolling on fine-pointer devices, synced to ScrollTrigger, off under reduced motion.
- Hero: a canvas network topology that drifts slowly and reacts to the pointer; static under reduced motion.

## Data
- `lib/github/*` — server-side REST calls (optional `GITHUB_TOKEN`), hourly revalidation, rate-limit detection, and a checked-in snapshot fallback so the page never depends on the API.
- `data/*` — typed, hand-curated site config, projects, experience, skills, current interests.
- `content/projects/*.mdx` — case-study narratives.

## Responsive
- ≥1440: 12 columns, pinned showreel.
- 1024–1439: same, tighter type.
- 768–1023: 6 columns, carousel showreel, two-column lists.
- 320–767: 4 columns, single column content, full-screen menu, 44px+ targets.

## Decisions made without asking
- Twelve projects, order as ranked in the discovery report.
- Contact form uses `mailto:` — no backend, no third-party form service, nothing to leak.
- Missing LinkedIn / email / résumé are hidden until supplied.
- Experience entries carry no dates or titles, because none were supplied.
