import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Star } from "lucide-react";
import { caseStudyComponents } from "@/components/projects/project-case-study";
import { ProjectNavigation } from "@/components/projects/project-navigation";
import { ProjectVisual } from "@/components/projects/project-visual";
import { formatIndex, getProject, projectIndex, projects, repoUrl } from "@/data/projects";
import { siteConfig } from "@/data/site-config";
import { getGitHubOverview } from "@/lib/github/repositories";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: `${project.title} — ${siteConfig.name}`, description: project.tagline, type: "article", url: `/projects/${project.slug}`, images: ["/opengraph-image"] },
  };
}

const dateFmt = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const [{ default: Content }, gh] = await Promise.all([import(`@/content/projects/${slug}.mdx`), getGitHubOverview()]);
  const repo = gh.byName[project.repo];
  const index = projectIndex(slug);

  const meta = [
    { label: "Category", value: project.category },
    { label: "Year", value: project.year },
    ...(repo ? [{ label: "Last pushed", value: dateFmt.format(new Date(repo.pushedAt)) }] : []),
    ...(repo?.language ? [{ label: "Primary language", value: repo.language }] : []),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.tagline,
    codeRepository: repoUrl(project),
    programmingLanguage: repo?.language ?? undefined,
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1. Introduction */}
      <header className="container-x pt-[calc(var(--nav-h)+40px)] md:pt-[calc(var(--nav-h)+72px)]">
        <div className="flex items-center justify-between gap-4">
          <Link href="/projects" className="label group inline-flex h-11 items-center gap-2 text-text-2 hover:text-text">
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden />
            All projects
          </Link>
          <p className="label tabular-nums text-text-3">
            ({formatIndex(index)}) / {formatIndex(projects.length - 1)}
          </p>
        </div>

        <h1 className="display mt-8 text-[clamp(2.6rem,9vw,8.5rem)] md:mt-12">
          {project.title.split(" ").map((word, i) => (
            <span key={i} className="line-mask inline-block pr-[0.22em] align-top">
              <span style={{ "--i": i } as React.CSSProperties}>{word}</span>
            </span>
          ))}
        </h1>

        <div className="grid-12 mt-8 gap-y-8 md:mt-12">
          <p className="fade-up col-span-4 text-balance font-display text-(length:--text-lead) font-medium leading-[1.2] tracking-[-0.02em] md:col-span-6 lg:col-span-7" style={{ "--i": 3 } as React.CSSProperties}>
            {project.tagline}
          </p>
          <div className="fade-up col-span-4 md:col-span-6 lg:col-span-4 lg:col-start-9" style={{ "--i": 4 } as React.CSSProperties}>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
              {meta.map((m) => (
                <div key={m.label} className="border-t border-border pt-3">
                  <dt className="label text-[0.6875rem] text-text-3">{m.label}</dt>
                  <dd className="mt-1 text-[0.9375rem]">{m.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={repoUrl(project)} target="_blank" rel="noreferrer" className="btn btn-primary">
                Source on GitHub <ArrowUpRight className="size-4" aria-hidden />
              </a>
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-ghost">
                  Live demo <ArrowUpRight className="size-4" aria-hidden />
                </a>
              )}
              {repo && repo.stars > 0 && (
                <span className="label inline-flex h-12 items-center gap-1.5 text-text-2">
                  <Star className="size-3.5" aria-hidden /> {repo.stars} {repo.stars === 1 ? "star" : "stars"}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 2. Project-specific visual */}
      <figure className="container-x mt-12 md:mt-20">
        <ProjectVisual
          slug={project.slug}
          poster={project.poster}
          title={project.title}
          className="aspect-[4/5] w-full rounded-(--radius-lg) border border-border p-4 sm:aspect-[16/10] lg:aspect-[21/10] lg:p-10"
        />
        <figcaption className="label mt-3 text-[0.6875rem] text-text-3">{project.visualCaption}</figcaption>
      </figure>

      {/* 3–11. Narrative from content/projects/<slug>.mdx */}
      <div className="container-x mt-12 md:mt-20">
        <Content components={caseStudyComponents(project)} />
      </div>

      {/* 12–13. Links */}
      <section aria-label="Project links" className="container-x border-t border-border py-10 md:py-14">
        <div className="grid-12 gap-y-5">
          <h2 className="label col-span-4 text-text-3 md:col-span-6 lg:col-span-3">Links</h2>
          <ul className="col-span-4 md:col-span-6 lg:col-span-9">
            <li className="border-b border-border">
              <a href={repoUrl(project)} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-6 py-4">
                <span>
                  <span className="label block text-[0.6875rem] text-text-3">Repository</span>
                  <span className="break-all font-mono text-[0.9375rem]">github.com/{siteConfig.github.username}/{project.repo}</span>
                </span>
                <ArrowUpRight className="size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </a>
            </li>
            <li className="border-b border-border">
              {project.demo ? (
                <a href={project.demo} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-6 py-4">
                  <span>
                    <span className="label block text-[0.6875rem] text-text-3">Live demo</span>
                    <span className="break-all font-mono text-[0.9375rem]">{project.demo.replace("https://", "")}</span>
                  </span>
                  <ArrowUpRight className="size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </a>
              ) : (
                <p className="py-4">
                  <span className="label block text-[0.6875rem] text-text-3">Live demo</span>
                  <span className="text-[0.9375rem] text-text-2">No hosted demo — run it locally from the repository.</span>
                </p>
              )}
            </li>
          </ul>
        </div>
      </section>

      {/* 14. Next project */}
      <ProjectNavigation current={project} />
    </article>
  );
}
