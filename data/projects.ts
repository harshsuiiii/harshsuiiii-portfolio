/**
 * Curated project data. Every claim here was checked against the repository's
 * README, source or committed result files. Stars / last-push dates are merged
 * in from the GitHub API at render time (see lib/github).
 */

export type FlowStep = { label: string; note: string };

export type Project = {
  slug: string;
  /** GitHub repository name under harshsuiiii. */
  repo: string;
  title: string;
  /** Title split over two lines for posters. */
  titleLines: [string, string?];
  category: string;
  year: string;
  tagline: string;
  /** Three short labels shown on the poster. */
  labels: string[];
  stack: string[];
  demo?: string;
  poster: { bg: string; fg: string; accent: string };
  visualCaption: string;
  features: string[];
  flow: { title: string; steps: FlowStep[]; loop?: string };
  results?: { caption: string; source: string; rows: { label: string; value: string; note?: string }[] };
  figures?: { src: string; alt: string; caption: string; width: number; height: number }[];
};

const gh = (repo: string) => `https://github.com/harshsuiiii/${repo}`;
export const repoUrl = (p: Pick<Project, "repo">) => gh(p.repo);

export const projects: Project[] = [
  {
    slug: "booking-agent",
    repo: "Booking-Agent",
    title: "Booking Agent",
    titleLines: ["Booking", "Agent"],
    category: "Full-stack platform · AI assistant",
    year: "2026",
    tagline:
      "A flight search and booking platform for travel agents that queries several suppliers in parallel and never lets a language model set a price.",
    labels: ["FastAPI", "Next.js", "LLM tools"],
    stack: ["Python 3.12", "FastAPI", "Pydantic v2", "SQLAlchemy 2 (async)", "Alembic", "PostgreSQL / SQLite", "Redis", "Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Groq LLM", "Duffel API (sandbox)", "pytest", "Playwright"],
    demo: "https://booking-agent-lemon.vercel.app",
    poster: { bg: "#60A5FA", fg: "#071019", accent: "#0B0F14" },
    visualCaption: "Conceptual diagram — one query fanning out to four suppliers, one timing out, results merged and ranked.",
    features: [
      "One-way, return and multi-city search (up to six flights) with cabin, passenger and time-of-day options.",
      "Results stream in supplier by supplier over Server-Sent Events, with a status strip showing which suppliers answered, failed or timed out.",
      "Duplicate fares from different suppliers are merged into one card.",
      "Best-value ranking adjusts price for baggage and refundability, computed in code.",
      "An AI assistant with read-only tools searches, compares and explains trade-offs — it cannot book.",
      "Booking always re-prices live and needs a separate confirmation tied to that exact price.",
      "Multi-tenant data model with an agency markup engine and role-based views.",
    ],
    flow: {
      title: "Search request path",
      steps: [
        { label: "Web app", note: "Next.js client sends a structured search, or a plain-language request to the assistant." },
        { label: "FastAPI /v1", note: "Validates the query and opens a Server-Sent Events stream back to the browser." },
        { label: "Orchestrator", note: "Fans out to every enabled supplier in parallel with a 7 s per-supplier timeout, circuit breaker and concurrency limit." },
        { label: "Connectors", note: "One adapter per supplier (Duffel sandbox plus three simulated suppliers) maps each response into a single Offer model." },
        { label: "Rules engine", note: "Applies agency markups and commissions. Money is always a Decimal with a currency code." },
        { label: "Dedupe + rank", note: "Merges identical fares across suppliers and ranks by best value, cheapest or fastest." },
      ],
    },
    results: {
      caption: "Test suite described in the repository",
      source: "README · Testing",
      rows: [
        { label: "Backend tests", value: "~770", note: "unit, API and integration (pytest)" },
        { label: "Assistant eval scenarios", value: "32", note: "run against a scripted model" },
        { label: "Type checking", value: "mypy strict" },
        { label: "Web tests", value: "Playwright", note: "API mocked" },
      ],
    },
  },
  {
    slug: "autoredteam",
    repo: "Auto-Redteaming-Agent",
    title: "AutoRedTeam",
    titleLines: ["Auto", "RedTeam"],
    category: "Agentic AI · Security",
    year: "2026",
    tagline:
      "An autonomous multi-agent pentester that reports a vulnerability only after a deterministic engine has reproduced the exploit.",
    labels: ["LangGraph", "Verifier engine", "Sandboxed"],
    stack: ["Python", "LangGraph", "Pydantic", "FastAPI", "Streamlit", "httpx", "Playwright / Chromium", "ChromaDB", "cvss", "Groq (OpenAI-compatible)", "Docker", "pytest"],
    poster: { bg: "#0B0F14", fg: "#E9EEF5", accent: "#A3E635" },
    visualCaption: "Conceptual diagram — a hypothesis is only promoted to a finding when the verifier hits the target.",
    features: [
      "Recon agent crawls OpenAPI, HTML and JS assets without using an LLM.",
      "Attacker agent proposes a concrete hypothesis — payload plus success criterion — through tool-calling.",
      "Per-class deterministic verifiers execute the payload against the live sandboxed target.",
      "Reporter scores CVSS with the cvss library and builds reproducible proof-of-concept steps.",
      "Request-budgeted HTTP client with a host allowlist for all target traffic.",
      "Benchmark harness with labelled ground truth and a head-to-head against OWASP ZAP.",
    ],
    flow: {
      title: "One run through the agent graph",
      loop: "Verifier fails and retries remain → back to Attacker",
      steps: [
        { label: "Recon", note: "Deterministic crawl of the attack surface; bootstraps authentication through a target adapter." },
        { label: "Candidates", note: "The adapter emits one curated candidate per in-scope vulnerability class, with the auth that class needs." },
        { label: "Attacker (LLM)", note: "Proposes a Hypothesis: a payload and a success criterion, optionally informed by a RAG knowledge base." },
        { label: "Verifier", note: "No LLM. Executes the exploit and returns a verdict with evidence — e.g. XSS must actually execute in Chromium." },
        { label: "Reporter", note: "CVSS score, reproducible PoC steps and a remediation note with an offline template fallback." },
        { label: "Finding", note: "Exposed through FastAPI and a Streamlit dashboard." },
      ],
    },
    results: {
      caption: "Evaluation against OWASP Juice Shop, as reported in the repository",
      source: "README · Evaluation & results",
      rows: [
        { label: "In-scope precision", value: "1.00" },
        { label: "In-scope recall", value: "1.00" },
        { label: "Recall vs. all documented vulnerabilities", value: "4 / 7", note: "including classes it is not designed to verify" },
        { label: "OWASP ZAP (passive), same target", value: "238 alerts", note: "0 in-scope classes confirmed with proof" },
        { label: "Automated tests", value: "76" },
      ],
    },
  },
  {
    slug: "rate-limiter",
    repo: "rate-limiter",
    title: "Distributed Rate Limiter",
    titleLines: ["Distributed", "Rate Limiter"],
    category: "Infrastructure · Distributed systems",
    year: "2026",
    tagline:
      "One shared limit across any number of servers: every decision is a single atomic Lua script in Redis, and the limiter stays up when Redis does not.",
    labels: ["Redis + Lua", "4 algorithms", "Circuit breaker"],
    stack: ["TypeScript", "Node.js", "Redis / Redis Cluster", "Lua", "ioredis", "Fastify", "zod", "Prometheus", "Vitest", "Docker"],
    poster: { bg: "#A3E635", fg: "#0B0F14", accent: "#0B0F14" },
    visualCaption: "Conceptual diagram — a token bucket refilling while requests are admitted or denied.",
    features: [
      "Token bucket, sliding window, sliding log and fixed window, each as an atomic Lua script.",
      "Runs as a stateless HTTP decision service or as an embedded library with Express/Connect middleware.",
      "Time is read from the Redis clock, so drift between app servers cannot change limits.",
      "Deadlines, a circuit breaker, a per-node in-memory fallback and a local denial cache.",
      "Hash-tagged keys keep multi-key scripts on one Redis Cluster slot.",
      "Prometheus counters, histograms and gauges fed by limiter hooks.",
    ],
    flow: {
      title: "Lifecycle of one check",
      steps: [
        { label: "POST /v1/check", note: "A client or gateway asks for a decision on { rule, key, cost }." },
        { label: "Deny cache", note: "A recent denial that is still valid is answered locally without touching Redis." },
        { label: "Circuit breaker", note: "Closed, open and half-open. Stops calling a failing Redis and probes for recovery." },
        { label: "Redis EVALSHA", note: "Read, decide and write happen in one Lua script under a 100 ms deadline." },
        { label: "Fallback store", note: "On error, timeout or open breaker the per-node memory store answers, according to the fail mode." },
        { label: "Decision", note: "allowed, remaining, retryAfterMs, resetAfterMs and which path answered." },
      ],
    },
    results: {
      caption: "Correctness properties verified by the repository's tests",
      source: "README · Why it is correct across nodes",
      rows: [
        { label: "Multi-node race", value: "100 / 600", note: "8 connections race 600 requests at a limit of 100; exactly 100 admitted, for every algorithm" },
        { label: "retryAfterMs", value: "exact", note: "denied 1 ms before, admitted at it" },
        { label: "Store contract", value: "shared", note: "same suite runs against the memory store and live Redis" },
      ],
    },
  },
  {
    slug: "shortly",
    repo: "URL-Shortner",
    title: "Shortly",
    titleLines: ["Shortly", "URL Service"],
    category: "Backend service · Analytics",
    year: "2026",
    tagline:
      "A URL shortener built the way a production one would be: collision-free codes, cache-aside reads, and click analytics that never slow a redirect.",
    labels: ["Spring Boot", "PostgreSQL", "Redis"],
    stack: ["Java 21", "Spring Boot 3.5", "PostgreSQL", "Redis", "Lua", "Flyway migrations", "Testcontainers", "Docker Compose", "Maven"],
    poster: { bg: "#EDF0F5", fg: "#151A23", accent: "#2563EB" },
    visualCaption: "Conceptual diagram — a sequence ID scrambled and rendered in Base62.",
    features: [
      "Short codes from a Postgres sequence, scrambled with a bijection and rendered in Base62 — no collisions by construction.",
      "Custom aliases arbitrated by a unique constraint and ON CONFLICT, with bounded retry.",
      "Cache-aside reads with negative caching, TTL jitter and fail-open behaviour when Redis is down.",
      "Distributed token-bucket rate limiter in a Redis Lua script, with separate budgets for creates and redirects.",
      "Clicks go to a bounded in-memory queue and are flushed in batches, so redirects never wait on analytics.",
      "Stats API: total clicks, unique visitors, clicks per day, top referrers and browsers.",
    ],
    flow: {
      title: "Redirect hot path",
      steps: [
        { label: "GET /{code}", note: "The redirect is the hot path; the README estimates ~99% of traffic." },
        { label: "Rate limit", note: "Token bucket per client IP, refill and take in one atomic Lua script." },
        { label: "Redis lookup", note: "Hit returns immediately. Unknown and expired codes are cached as sentinels to stop cache penetration." },
        { label: "Postgres", note: "On a miss, the source of truth is read and the cache is filled." },
        { label: "302 + no-store", note: "Not a 301, so every click still reaches the service and expiry keeps working." },
        { label: "Click queue", note: "A non-blocking offer into a bounded queue; a scheduled task batches inserts every 2 s." },
      ],
    },
  },
  {
    slug: "self-healing-rag",
    repo: "Self-healing-RAG",
    title: "Self-Healing RAG",
    titleLines: ["Self-Healing", "RAG"],
    category: "Retrieval-augmented generation",
    year: "2026",
    tagline:
      "A RAG pipeline that audits its own answers claim by claim, retries with a reformulated query, and falls back honestly instead of inventing facts.",
    labels: ["LangGraph", "Chroma", "Critic loop"],
    stack: ["Python", "LangGraph", "LangChain", "ChromaDB", "Sentence-Transformers", "Groq (llama-3.1-8b-instant)", "pypdf"],
    poster: { bg: "#132238", fg: "#E9EEF5", accent: "#60A5FA" },
    visualCaption: "Conceptual diagram — retrieve, generate, critique, and loop back when a claim is unsupported.",
    features: [
      "Retrieves the top four chunks from a persisted Chroma vector store.",
      "A critic audits each generated claim against the retrieved evidence.",
      "Rejected answers trigger critic-suggested query reformulation, up to a retry cap (default two).",
      "When the cap is reached the graph returns an evidence-limited fallback.",
      "Colour-coded node-by-node trace of every run.",
      "Scripts comparing plain RAG with the self-healing graph and reporting retry and fallback metrics.",
    ],
    flow: {
      title: "The cyclic graph",
      loop: "Unsupported claim and retries remain → Reformulate → Retrieve",
      steps: [
        { label: "Question", note: "RAGState carries the question, current query, chunks, answer, verdict, retry counters and trace." },
        { label: "Retrieve", note: "Chroma similarity search, top-k = 4." },
        { label: "Generate", note: "The LLM answers strictly from the retrieved chunks." },
        { label: "Critic", note: "Claim-by-claim grounding audit; routes to accept, reformulate or fallback." },
        { label: "Reformulate", note: "The critic's suggestion becomes the next query." },
        { label: "Accept / Fallback", note: "Either a grounded answer, or an explicit statement that the evidence does not cover the question." },
      ],
    },
  },
  {
    slug: "auroradns",
    repo: "aurora-DNS",
    title: "AuroraDNS",
    titleLines: ["Aurora", "DNS"],
    category: "Networking · Systems",
    year: "2026",
    tagline:
      "A DNS forwarding server written from scratch in TypeScript: RFC 1035 packets parsed with raw Buffers and bitwise operations, no parsing libraries.",
    labels: ["RFC 1035", "UDP", "TTL cache"],
    stack: ["TypeScript", "Node.js (dgram / Buffer)", "Vitest", "Docker", "Docker Compose"],
    poster: { bg: "#D9F99D", fg: "#0B0F14", accent: "#0B0F14" },
    visualCaption: "Conceptual diagram — the bytes of a DNS message, with the 12-byte header and a compression pointer marked.",
    features: [
      "Hand-written encoders and decoders for DNS headers, questions and answers.",
      "Domain-name decompression, following 0xC0 pointers.",
      "TTL-aware in-memory cache with a periodic sweep of expired entries.",
      "Failover across a configurable list of upstream resolvers, with timeouts.",
      "Blocklist that answers matching domains and their subdomains with 0.0.0.0.",
      "Unit tests for the binary parsing logic.",
    ],
    flow: {
      title: "Client-to-resolver request flow",
      steps: [
        { label: "Client query", note: "A UDP datagram arrives on the local port (2053 by default)." },
        { label: "Parse", note: "The 12-byte header and the question section are decoded from the raw Buffer." },
        { label: "Blocklist", note: "A blocked domain, or any subdomain of one, is answered immediately with 0.0.0.0." },
        { label: "Cache", note: "A live entry is served from memory with no upstream round trip." },
        { label: "Upstream", note: "On a miss the query is forwarded; if a resolver times out, the next one in the list is tried." },
        { label: "Response", note: "The answer is cached by its TTL and serialized back to the client." },
      ],
    },
  },
  {
    slug: "cms-diffusion",
    repo: "ML4SCI-Diffusion-Models-for-Task-2e-Generative-Modelling-with-Diffusion-GAN-and-VAE",
    title: "CMS Diffusion",
    titleLines: ["CMS", "Diffusion"],
    category: "Generative modelling · Physics ML",
    year: "2026",
    tagline:
      "A diffusion model, a GAN and a VAE trained on CMS jet images and compared with statistical tests — including where standard metrics mislead.",
    labels: ["PyTorch", "DDPM", "ML4SCI"],
    stack: ["Python", "PyTorch", "NumPy", "SciPy", "scikit-learn", "h5py", "Matplotlib"],
    poster: { bg: "#05070B", fg: "#E9EEF5", accent: "#60A5FA" },
    visualCaption: "Conceptual diagram — noise resolving into a sparse energy deposit. Real samples and plots are shown below.",
    features: [
      "DDPM trained to predict noise with an MSE objective.",
      "GAN and VAE baselines trained on the same subset.",
      "Wasserstein distance, Kolmogorov–Smirnov test, MMD and a sample-diversity measure.",
      "Configuration-driven experiments with saved metrics, tables, plots and samples.",
    ],
    flow: {
      title: "Experiment pipeline",
      steps: [
        { label: "CMS jet images", note: "125 × 125 pixels, 8 detector channels; extremely sparse with heavy tails." },
        { label: "Preprocess", note: "A 20,000-sample subset, downscaled to 32 × 32 × 8 and normalised to [-1, 1]." },
        { label: "Train", note: "Diffusion (T = 50 steps), GAN and VAE, from one shared config." },
        { label: "Sample", note: "Each model generates a batch of synthetic detector images." },
        { label: "Compare", note: "Distribution tests and a diversity measure against real data." },
      ],
    },
    results: {
      caption: "Saved metrics from the repository",
      source: "results/metrics/*.json · results/summary.txt",
      rows: [
        { label: "Diffusion — KS p-value", value: "0.72", note: "closest to the real distribution" },
        { label: "Diffusion — diversity (std)", value: "0.047", note: "real data: 0.033" },
        { label: "GAN — diversity (std)", value: "0.004", note: "mode collapse, despite the lowest Wasserstein distance (0.009)" },
        { label: "VAE — diversity (std)", value: "0.002", note: "posterior collapse" },
      ],
    },
    figures: [
      { src: "/images/projects/cms-diffusion-real-vs-generated.png", alt: "Grid comparing real CMS jet images with images generated by the diffusion model", caption: "Actual output from the repository — real vs. generated samples.", width: 1713, height: 412 },
      { src: "/images/projects/cms-diffusion-pixel-distribution.png", alt: "Histogram comparing pixel intensity distributions of real and generated images", caption: "Actual output from the repository — real vs. generated pixel distribution.", width: 1589, height: 396 },
    ],
  },
  {
    slug: "sparse-nn",
    repo: "ML4SCI-Task-2d-Sparse-Neural-Networks-for-End-to-End-Event-Classification",
    title: "Sparse Networks for Jet Classification",
    titleLines: ["Sparse", "Networks"],
    category: "Deep learning · Model efficiency",
    year: "2026",
    tagline:
      "A sparsity-aware residual network for CMS calorimeter data, and a pruning study measuring how much of it can be removed.",
    labels: ["PyTorch", "L1 pruning", "ML4SCI"],
    stack: ["Python", "PyTorch", "torch.nn.utils.prune", "ptflops", "scikit-learn", "h5py", "Matplotlib"],
    poster: { bg: "#1E3A8A", fg: "#F6F7F9", accent: "#A3E635" },
    visualCaption: "Conceptual diagram — a network with most of its connections pruned away. Real plots are shown below.",
    features: [
      "DenseCNN baseline with about 5.9k parameters.",
      "SparseResNet: residual blocks that mask activations at empty detector cells.",
      "Global L1-unstructured pruning at five ratios, each followed by fine-tuning.",
      "Effective FLOPs measured alongside accuracy and AUC.",
    ],
    flow: {
      title: "Experiment pipeline",
      steps: [
        { label: "Calorimeter data", note: "10,000 labelled samples, 125 × 125 × 8, split 70 / 15 / 15." },
        { label: "DenseCNN", note: "Two convolution layers, no sparsity awareness — the baseline." },
        { label: "SparseResNet", note: "Three sparse residual blocks (8 → 16 → 32 → 64 channels) with a binary sparsity mask." },
        { label: "Prune", note: "Global L1 pruning at 20, 40, 60 and 80 percent." },
        { label: "Fine-tune", note: "Two epochs after each pruning step." },
        { label: "Measure", note: "Accuracy, AUC and effective FLOPs on the held-out test set." },
      ],
    },
    results: {
      caption: "Held-out test set results from the repository",
      source: "results/tables/model_comparison.csv · pruning_results.csv",
      rows: [
        { label: "DenseCNN", value: "0.8127 acc", note: "AUC 0.8731 · 5,889 parameters" },
        { label: "SparseResNet", value: "0.8747 acc", note: "AUC 0.9333 · 75,777 parameters" },
        { label: "SparseResNet, 60% pruned", value: "0.8693 acc", note: "AUC 0.9319 · 67.73M FLOPs (from 169.32M)" },
        { label: "SparseResNet, 80% pruned", value: "0.8613 acc", note: "AUC 0.9316 · 33.86M FLOPs" },
      ],
    },
    figures: [
      { src: "/images/projects/sparse-nn-tradeoff.png", alt: "Plots of accuracy against weight sparsity and effective FLOPs for the pruned SparseResNet", caption: "Actual output from the repository — efficiency vs. accuracy under pruning.", width: 1487, height: 396 },
      { src: "/images/projects/sparse-nn-roc.png", alt: "ROC curves and confusion matrices for DenseCNN and SparseResNet on the test set", caption: "Actual output from the repository — ROC curves and confusion matrices.", width: 1259, height: 490 },
    ],
  },
  {
    slug: "botforge",
    repo: "botforge-saas",
    title: "BotForge",
    titleLines: ["Bot", "Forge"],
    category: "Multi-tenant SaaS",
    year: "2026",
    tagline:
      "A platform for creating, embedding and monitoring AI chatbots: a dashboard, an API, and a copy-paste widget that streams replies.",
    labels: ["Express", "PostgreSQL", "SSE widget"],
    stack: ["JavaScript", "Node.js", "Express", "PostgreSQL", "React", "Vite", "Google OAuth", "JWT", "AES-256-GCM", "Server-Sent Events", "OpenAI API"],
    poster: { bg: "#F6F7F9", fg: "#151A23", accent: "#65A30D" },
    visualCaption: "Conceptual diagram — an embeddable chat widget and the script tag that loads it.",
    features: [
      "Chatbot configuration: behaviour, allowed and blocked topics, model and budget settings.",
      "Dashboard sign-in with Google OAuth and JWTs.",
      "Connected OpenAI credentials stored encrypted with AES-256-GCM.",
      "A standalone embeddable widget that streams responses over Server-Sent Events.",
      "Sessions, detected topics, outcomes and turn counts recorded for dashboard analytics.",
    ],
    flow: {
      title: "Two paths into one API",
      steps: [
        { label: "Dashboard", note: "React/Vite app; authenticated with a JWT after Google sign-in." },
        { label: "Express API", note: "Authenticated routes for bot CRUD, embed keys and analytics." },
        { label: "PostgreSQL", note: "Tenants, bots, sessions and encrypted provider tokens." },
        { label: "Widget", note: "A script customers paste into their site; identified by an embed key." },
        { label: "/chat (SSE)", note: "Public endpoint: topic checks, then a streamed completion." },
        { label: "Session analytics", note: "Each conversation is logged with topic, outcome and turn count." },
      ],
    },
  },
  {
    slug: "revivex",
    repo: "ReviveX",
    title: "ReviveX",
    titleLines: ["Revive", "X"],
    category: "AI agent · Payments",
    year: "2026",
    tagline:
      "A payment-recovery agent on Razorpay's APIs: it reasons about why a payment failed, while compliance limits live in plain code the model cannot override.",
    labels: ["Next.js", "Razorpay", "Gemini"],
    stack: ["TypeScript", "Next.js 14", "React 18", "Tailwind CSS", "Google Gemini SDK", "Razorpay Node SDK", "HMAC SHA-256 webhooks"],
    // The README links a Vercel demo, but it returned DEPLOYMENT_NOT_FOUND when
    // checked on 2026-11-14, so it is not listed. Re-add `demo` once redeployed.
    poster: { bg: "#111722", fg: "#E9EEF5", accent: "#A3E635" },
    visualCaption: "Conceptual diagram — the three-step escalation ladder: soft, firm, final.",
    features: [
      "Batch recovery engine for simulating and managing failed payments.",
      "Deterministic rules in TypeScript: at most three attempts, quiet hours 21:00–08:00 IST, a 60-minute gap.",
      "Three-tier escalation: soft, then firm on the alternate channel, then final.",
      "Gemini writes customer copy and plain-language reasoning, with a 5-second timeout and a rules-engine fallback.",
      "Expandable per-case audit trail of every attempt, channel, tone and outcome.",
      "Razorpay payment links and webhook verification with HMAC SHA-256 signatures.",
    ],
    flow: {
      title: "One failed payment",
      steps: [
        { label: "payment.failed", note: "A Razorpay webhook arrives and its HMAC SHA-256 signature is verified." },
        { label: "Rules", note: "Attempt count, quiet hours and the minimum gap are checked in code first." },
        { label: "Strategy", note: "Gemini proposes tone, channel and copy; if it is slow, the rules engine decides." },
        { label: "Escalation", note: "Soft → firm on the other channel → final, then the case closes." },
        { label: "Payment link", note: "A Razorpay payment link is created for the customer." },
        { label: "Audit trail", note: "Timestamp, reasoning, channel, tone and outcome are recorded per attempt." },
      ],
    },
  },
  {
    slug: "trading-engine",
    repo: "LOW-LATENCY-TRADING-MATCHING-ENGINE-ORDERBOOK-",
    title: "Order Book Matching Engine",
    titleLines: ["Matching", "Engine"],
    category: "Trading systems · Prototype",
    year: "2025",
    tagline:
      "An in-memory order book and matching engine behind a small REST API: place orders, read depth, track balances and quote VWAP.",
    labels: ["TypeScript", "Express", "In-memory"],
    stack: ["TypeScript", "Node.js", "Express", "Jest"],
    poster: { bg: "#BFDBFE", fg: "#0B0F14", accent: "#0B0F14" },
    visualCaption: "Conceptual diagram — bid and ask depth around the mid price.",
    features: [
      "Bid and ask books kept sorted by price for a single ticker.",
      "Incoming orders are matched against the opposite book; any remainder rests on the book.",
      "Partial fills, with balances moved between counterparties on every fill.",
      "Aggregated depth by price level.",
      "Quotes with best bid, best ask, mid price and VWAP over a chosen number of levels.",
    ],
    flow: {
      title: "Placing an order",
      steps: [
        { label: "POST /order", note: "{ side, price, quantity, userId }" },
        { label: "Match", note: "Walks the opposite book from the best price, filling while the price crosses." },
        { label: "Settle", note: "Each fill moves the asset and USD between the two users' balances." },
        { label: "Rest", note: "Unfilled quantity is added to the book, which is re-sorted by price." },
        { label: "GET /depth · /quote", note: "Depth aggregated per price level; mid price and VWAP derived from the books." },
      ],
    },
  },
  {
    slug: "real-time-chat",
    repo: "Real-time-chat-app",
    title: "Real-Time Chat",
    titleLines: ["Real-Time", "Chat"],
    category: "Full-stack · WebSockets",
    year: "2025",
    tagline:
      "A MERN chat application with Socket.IO: authentication, one-to-one messaging with images, and live online presence.",
    labels: ["Socket.IO", "MongoDB", "React"],
    stack: ["JavaScript", "React", "Vite", "Zustand", "Tailwind CSS", "DaisyUI", "Node.js", "Express", "Socket.IO", "MongoDB", "JWT", "Cloudinary"],
    poster: { bg: "#151D29", fg: "#E9EEF5", accent: "#60A5FA" },
    visualCaption: "Conceptual diagram — messages passing between two clients over a socket.",
    features: [
      "Sign-up, login and protected routes with JWT authentication.",
      "One-to-one conversations with text and image messages.",
      "Online status: the server keeps a userId → socketId map and broadcasts it on connect and disconnect.",
      "Client state in Zustand stores for auth, chat and theme.",
      "Profile and settings pages, with loading skeletons.",
    ],
    flow: {
      title: "WebSocket event flow",
      steps: [
        { label: "Connect", note: "The client opens a socket with its userId in the handshake query." },
        { label: "Presence map", note: "The server stores userId → socketId." },
        { label: "getOnlineUsers", note: "Emitted to every client whenever someone connects or disconnects." },
        { label: "Send message", note: "The message is posted over REST and saved to MongoDB." },
        { label: "Deliver", note: "If the receiver has a live socket, the message is pushed to it." },
      ],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectIndex = (slug: string) => projects.findIndex((p) => p.slug === slug);
export const formatIndex = (i: number) => String(i + 1).padStart(3, "0");
