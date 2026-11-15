import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatIndex, projects, type Project } from "@/data/projects";
import { ProjectVisual } from "./project-visual";

export function ProjectNavigation({ current }: { current: Project }) {
  const i = projects.findIndex((p) => p.slug === current.slug);
  const next = projects[(i + 1) % projects.length];
  const nextIndex = (i + 1) % projects.length;

  return (
    <nav aria-label="Next project" className="border-t border-border">
      <Link href={`/projects/${next.slug}`} className="group block">
        <div className="container-x grid-12 items-end gap-y-6 py-12 md:py-20">
          <div className="col-span-4 md:col-span-4 lg:col-span-8">
            <p className="label text-text-3">Next project ({formatIndex(nextIndex)})</p>
            <p className="display mt-4 text-[clamp(2.5rem,7.4vw,7rem)]">
              <span className="link-underline bg-[length:0%_3px] group-hover:bg-[length:100%_3px]">{next.title}</span>
            </p>
            <p className="label mt-5 flex items-center gap-2 text-text-2">
              {next.category}
              <ArrowRight className="size-4 transition-transform duration-500 ease-(--ease-out) group-hover:translate-x-2" aria-hidden />
            </p>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-3 lg:col-start-10">
            <ProjectVisual
              slug={next.slug}
              poster={next.poster}
              title={next.title}
              className="aspect-[5/6] w-full max-w-[280px] rounded-(--radius) border border-border transition-transform duration-700 ease-(--ease-out) group-hover:-translate-y-2 md:ml-auto"
            />
          </div>
        </div>
      </Link>
    </nav>
  );
}
