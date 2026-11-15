import Image from "next/image";
import type { MDXComponents } from "mdx/types";
import { Reveal } from "@/components/animations/reveal";
import type { Project } from "@/data/projects";
import { FlowDiagram } from "./flow-diagram";

/** One editorial row: number + title on the left, content on the right. */
function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="grid-12 gap-y-5 border-t border-border py-10 md:py-14">
      <Reveal className="col-span-4 md:col-span-6 lg:col-span-3">
        <h2 className="label text-text-3">
          <span className="text-accent">({n})</span> {title}
        </h2>
      </Reveal>
      <Reveal className="prose-case col-span-4 md:col-span-6 lg:col-span-9">{children}</Reveal>
    </section>
  );
}

function Features({ project }: { project: Project }) {
  return (
    <ol className="grid gap-x-8 sm:grid-cols-2">
      {project.features.map((f, i) => (
        <li key={f} className="flex gap-4 border-t border-border py-4 text-base">
          <span className="pt-0.5 font-mono text-xs tabular-nums text-text-3">{String(i + 1).padStart(2, "0")}</span>
          <span>{f}</span>
        </li>
      ))}
    </ol>
  );
}

function Stack({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-2" role="list" aria-label="Technology stack">
      {project.stack.map((s) => (
        <span role="listitem" key={s} className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-[0.9375rem]">
          {s}
        </span>
      ))}
    </div>
  );
}

function Results({ project }: { project: Project }) {
  const { results, figures } = project;
  return (
    <>
      {results && (
        <div className="mt-6 overflow-hidden rounded-(--radius) border border-border">
          <table className="w-full text-left text-base">
            <caption className="label border-b border-border bg-surface px-4 py-3 text-left text-text-3 md:px-6">
              {results.caption}
            </caption>
            <tbody>
              {results.rows.map((r) => (
                <tr key={r.label} className="border-b border-border last:border-0">
                  <th scope="row" className="w-[42%] px-4 py-4 align-top font-normal text-text-2 md:px-6">
                    {r.label}
                  </th>
                  <td className="px-4 py-4 align-top md:px-6">
                    <span className="font-display text-xl font-semibold tracking-[-0.02em] tabular-nums">{r.value}</span>
                    {r.note && <span className="mt-1 block text-sm text-text-2">{r.note}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="label border-t border-border bg-surface px-4 py-3 text-[0.6875rem] text-text-3 md:px-6">Source: {results.source}</p>
        </div>
      )}
      {figures?.map((f) => (
        <figure key={f.src} className="mt-6">
          {/* plots are light-background images, so they sit on a white card in both themes */}
          <div className="overflow-hidden rounded-(--radius) border border-border bg-white p-3 md:p-5">
            <Image src={f.src} alt={f.alt} width={f.width} height={f.height} sizes="(min-width: 1024px) 60vw, 92vw" className="h-auto w-full" />
          </div>
          <figcaption className="label mt-3 text-[0.6875rem] text-text-3">{f.caption}</figcaption>
        </figure>
      ))}
    </>
  );
}

/** Components available inside content/projects/*.mdx, bound to one project. */
export function caseStudyComponents(project: Project): MDXComponents {
  return {
    Section,
    Architecture: () => <FlowDiagram flow={project.flow} />,
    Features: () => <Features project={project} />,
    Stack: () => <Stack project={project} />,
    Results: () => <Results project={project} />,
  };
}
