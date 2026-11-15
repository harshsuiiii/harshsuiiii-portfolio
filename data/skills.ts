/**
 * Every item below appears in at least one public repository on
 * github.com/harshsuiiii (dependency files, source or README). No ratings.
 */
export type SkillGroup = { title: string; items: string[] };

export const skills: SkillGroup[] = [
  { title: "Programming Languages", items: ["TypeScript", "JavaScript", "Python", "Java", "SQL", "Lua (Redis scripting)"] },
  { title: "Frontend Engineering", items: ["React", "Next.js (App Router)", "Tailwind CSS", "Vite", "Zustand", "Streamlit"] },
  {
    title: "Backend Engineering",
    items: ["Node.js", "Express", "Fastify", "FastAPI", "Spring Boot", "Socket.IO", "Server-Sent Events", "REST APIs", "JWT & OAuth 2.0"],
  },
  {
    title: "AI / ML",
    items: ["PyTorch", "LangGraph", "LangChain", "Retrieval-Augmented Generation", "Sentence-Transformers", "Hugging Face Transformers", "scikit-learn", "LLM tool-calling (Groq, Gemini, OpenAI)"],
  },
  { title: "Databases", items: ["PostgreSQL", "Redis", "MongoDB", "SQLite", "ChromaDB", "Firestore"] },
  { title: "Cloud & Infrastructure", items: ["Docker", "Docker Compose", "Vercel", "Render", "Supabase", "GitHub Actions", "Prometheus metrics"] },
  { title: "Developer Tools", items: ["Git", "Vitest", "pytest", "Playwright", "Testcontainers", "Maven", "uv / ruff / mypy", "ESLint"] },
];

export type Expertise = { index: string; title: string; body: string; evidence: { label: string; slug: string }[] };

/** Capability areas, each backed by projects that demonstrate it. */
export const expertise: Expertise[] = [
  {
    index: "01",
    title: "Full-Stack Engineering",
    body: "Complete products, from data model and API to the interface people actually use.",
    evidence: [
      { label: "Booking Agent", slug: "booking-agent" },
      { label: "BotForge", slug: "botforge" },
      { label: "ReviveX", slug: "revivex" },
    ],
  },
  {
    index: "02",
    title: "Backend Systems",
    body: "Services designed around their failure modes: atomic operations, caching, backpressure and graceful degradation.",
    evidence: [
      { label: "Distributed Rate Limiter", slug: "rate-limiter" },
      { label: "Shortly", slug: "shortly" },
      { label: "Matching Engine", slug: "trading-engine" },
    ],
  },
  {
    index: "03",
    title: "AI & Intelligent Systems",
    body: "Agentic and retrieval systems where the model proposes and deterministic code verifies.",
    evidence: [
      { label: "AutoRedTeam", slug: "autoredteam" },
      { label: "Self-Healing RAG", slug: "self-healing-rag" },
      { label: "CMS Diffusion", slug: "cms-diffusion" },
    ],
  },
  {
    index: "04",
    title: "Infrastructure & Developer Tools",
    body: "Protocol-level and platform work: containers, observability, and tools other services depend on.",
    evidence: [
      { label: "AuroraDNS", slug: "auroradns" },
      { label: "Distributed Rate Limiter", slug: "rate-limiter" },
    ],
  },
  {
    index: "05",
    title: "Data & Systems Engineering",
    body: "Pipelines and models for sparse, high-dimensional data, with the efficiency trade-offs measured.",
    evidence: [
      { label: "Sparse Networks", slug: "sparse-nn" },
      { label: "CMS Diffusion", slug: "cms-diffusion" },
      { label: "Shortly", slug: "shortly" },
    ],
  },
];
