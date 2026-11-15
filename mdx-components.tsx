import type { MDXComponents } from "mdx/types";

// Required by @next/mdx. Case-study components are passed per page instead
// (see components/projects/project-case-study.tsx).
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return components;
}
