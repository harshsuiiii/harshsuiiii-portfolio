/**
 * Editable. These mirror the interests stated in the project brief; the
 * "seen in" repositories are the most recently pushed public work in each area.
 * Change or remove freely — nothing else depends on this file.
 */
export type ExploringItem = { topic: string; note: string; seenIn?: { label: string; slug: string } };

export const currentlyExploring: ExploringItem[] = [
  {
    topic: "Agentic AI",
    note: "Agents whose claims are checked by deterministic code before they count.",
    seenIn: { label: "AutoRedTeam", slug: "autoredteam" },
  },
  {
    topic: "Retrieval-Augmented Generation",
    note: "Grounding audits, query reformulation and honest fallbacks.",
    seenIn: { label: "Self-Healing RAG", slug: "self-healing-rag" },
  },
  {
    topic: "Distributed Systems",
    note: "Shared state across replicas, atomicity and behaviour under partial failure.",
    seenIn: { label: "Distributed Rate Limiter", slug: "rate-limiter" },
  },
  {
    topic: "Low-Latency Systems",
    note: "Hot paths that never wait on anything they do not need.",
    seenIn: { label: "Shortly", slug: "shortly" },
  },
  { topic: "Developer Infrastructure", note: "Tools and services that other software is built on." },
  { topic: "Data Engineering", note: "Moving and shaping data reliably at scale." },
  { topic: "Automation", note: "Removing manual steps from repeatable work." },
];
