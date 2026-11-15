# Discovery report

Date: 2026-11-14. Sources: live inspection of https://auge-xp.com (home, /works, /about) in a browser at 1440×900 and 1024×768, and the GitHub account `harshsuiiii` via the authenticated GitHub CLI.

## 1. Reference analysis — AUGE Experience

### What was observed

| Area | Observation |
|---|---|
| Homepage | A single viewport. Project images hang from the top edge as a horizontal strip of tall panels with **staggered heights**; the strip loops horizontally as you scroll. The lower half is calm paper-coloured space holding a giant wordmark (≈200px, heavy grotesk) bottom-left and a three-line studio description. |
| Colour | Warm off-white paper (`rgb(237,238,229)`), near-black ink, one pale-yellow highlight used only for interactive moments (hover pill, menu button, award band). Colour comes from the imagery, not the UI. |
| Typography | Three voices: a heavy condensed grotesk for display (100–208px), a neutral grotesk for body (16–18px), and a serif italic for accents. Tiny 10px uppercase labels for meta. |
| Navigation | No top bar. A logo mark top-right, a hamburger button bottom-right that opens Works / About / Let's talk, and a hairline footer strip (©, privacy, socials) pinned to the bottom. |
| Hover | Hovering a panel reveals its title (two-line uppercase) and category underneath, and a yellow "View project" pill follows the cursor. |
| Works page | Numbered index — `(001) VIRU GROUP / WEBSITE` — seven projects. |
| About page | Black full-bleed opening with an oversized mixed-style headline interleaved with small project thumbnails and glyphs; then a two-column block: large statement left, four capability lists right; then a yellow awards band. |
| Transitions | A wordmark preloader, then a curved "curtain" wipe between pages. Labels use a text-scramble effect. |
| Stack | Next.js (Turbopack chunks visible), custom fonts, virtualised scroll. |

### Limits of this inspection

- The works page and project detail pages render inside a canvas/virtual scroll that stayed blank in the embedded browser after the preloader; their **layout was not verified visually**. Only the text index of /works was read from the DOM. Project detail pages were not reached.
- Mobile behaviour was not verified on a real device; only desktop widths were inspected.
- The contact page was not inspected.

### A. Recreate conceptually
- Staggered, top-hung horizontal strip of tall project panels as the signature showcase.
- Oversized display type anchored bottom-left against calm empty space.
- Hover reveal: title + category under the panel, cursor-following "View project" pill.
- Numbered `(001)` project index.
- Two-column statement + capability lists.
- Tiny uppercase meta labels; a single highlight colour reserved for interaction.

### B. Adapt for this brand
- Paper/ink becomes the specified light (`#F6F7F9`) and dark (`#090B10`) themes; pale yellow becomes electric lime, with electric blue as the secondary.
- Photography becomes original technical "posters" — one visual per project drawn from what the code really does (order book, DNS packet, token bucket…).
- Awards band becomes verified GitHub activity and measured results from the repos.
- Serif italic accent becomes JetBrains Mono, which carries the engineering voice.

### C. Improve
- A conventional, always-visible top navigation with a theme switch (AUGE hides nav behind a hamburger).
- Native scrolling everywhere; horizontal motion only inside the showreel, with a touch carousel on small screens.
- Full keyboard access, visible focus, reduced-motion fallbacks, real text instead of canvas text.
- No blocking preloader.

### D. Avoid
- Scroll hijacking across the whole site and canvas-rendered content.
- Text-scramble on body labels (hurts legibility and screen readers).
- Awards-style bragging blocks with nothing verified behind them.
- Copying AUGE's wordmark, fonts, imagery or page-wipe shape.

## 2. GitHub investigation

Authentication: `gh auth status` → logged in as `harshsuiiii` (scopes: repo, read:org, gist, workflow).

Account: 32 public repositories, 3 private. Private repositories (`lex-spark-ai`, a GitHub Classroom fork, `desktop-tutorial`) were **not opened** and nothing from them is published.

For each candidate the README, full file tree and — where a claim needed checking — source files and result tables were read.

### Ranking

Scored on engineering complexity, code quality, originality, completeness, technical depth, relevance and demonstrable functionality.

| # | Repository | Verdict | Why |
|---|---|---|---|
| 1 | Booking-Agent | Selected | Largest codebase (230 files): FastAPI + Next.js, parallel supplier orchestration, rules engine, guarded LLM assistant, CI, live demo. |
| 2 | Auto-Redteaming-Agent | Selected | LangGraph multi-agent pentester with a deterministic verifier, labelled evaluation, ZAP comparison, 76 tests. |
| 3 | rate-limiter | Selected | Redis + Lua distributed limiter, four algorithms, circuit breaker, contract tests across two stores. |
| 4 | URL-Shortner | Selected | Spring Boot service with documented design decisions, Testcontainers integration tests. |
| 5 | Self-healing-RAG | Selected | Cyclic LangGraph RAG with critic, bounded retries and honest fallback; evaluation scripts. |
| 6 | aurora-DNS | Selected | DNS forwarder parsing RFC 1035 packets by hand; cache, failover, blocklist, unit tests. |
| 7 | ML4SCI Diffusion (Task 2e) | Selected | DDPM vs GAN vs VAE on CMS jet images with saved metrics. |
| 8 | ML4SCI Sparse NN (Task 2d) | Selected | Sparsity-masked ResNet, pruning study with result tables. |
| 9 | botforge-saas | Selected | Multi-tenant chatbot SaaS: OAuth, AES-256-GCM token storage, SSE widget, analytics. |
| 10 | ReviveX | Selected | Payment-recovery agent with deterministic compliance rules; live demo. |
| 11 | LOW-LATENCY-TRADING-MATCHING-ENGINE-ORDERBOOK- | Selected | Small but clear in-memory order book. Presented as a prototype; no latency claims are made because none are measured in the repo. |
| 12 | Real-time-chat-app | Selected | MERN + Socket.IO chat. Described strictly by what the code contains. |
| – | legalsummary.ai | Not featured | Solid, but overlaps with the AI apps above; appears in the live GitHub list. |
| – | OCR-Semantic-Grader | Not featured | Good demo pipeline, smaller scope. |
| – | customer_churn_prediction, Fuzzy_Neural_Network | Not featured | Single-notebook coursework. |
| – | smart-city-, smart-food-delivery-app, alarm-clock01, my-attendance-app, studentdash_028, portfolio-028, CHATAPP, sorting-algorithms | Not featured | Small exercises. |
| – | lfortran, PyDeepFlow, Python | Excluded | Forks. |

### Things found that affect the content
- `results/metrics/vae_metrics.json` in the diffusion repo is a copy of the GAN file. The case study quotes the VAE figure from `results/summary.txt` instead.
- The trading engine README says "low-latency" and "price-time priority"; the code is a sorted-array, single-ticker engine with no benchmark. The case study says exactly that.
- No repository states dates, titles or outcomes for DUCC or Moonrise Festival, so the experience section carries only what was supplied.

## 3. Open inputs
LinkedIn URL, professional email and résumé were left as placeholders in the brief. They live in `data/site-config.ts`; until they are filled, the site hides those links rather than showing dead ones.
