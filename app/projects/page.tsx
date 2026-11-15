import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { ProjectVisual } from "@/components/projects/project-visual";
import { ContactSection } from "@/components/contact/contact-section";
import { formatIndex, projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Twelve selected projects across full-stack engineering, backend systems, AI and infrastructure.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <section aria-labelledby="projects-title" className="container-x pb-(--section) pt-[calc(var(--nav-h)+48px)] md:pt-[calc(var(--nav-h)+88px)]">
        <p className="label fade-up text-text-3">
          <span className="text-accent">({projects.length})</span> Projects
        </p>
        <h1 id="projects-title" className="display mt-6 text-[clamp(3rem,11vw,10rem)]">
          <span className="line-mask">
            <span>All work</span>
          </span>
        </h1>

        <ul className="mt-12 md:mt-20">
          {projects.map((p, i) => (
            <li key={p.slug} className="border-t border-border last:border-b">
              <Reveal>
                <Link href={`/projects/${p.slug}`} className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 py-5 md:gap-x-8 md:py-6">
                  <ProjectVisual
                    slug={p.slug}
                    poster={p.poster}
                    title={p.title}
                    className="h-[76px] w-[62px] rounded-lg border border-border transition-transform duration-500 ease-(--ease-out) group-hover:scale-110 md:h-[104px] md:w-[86px]"
                  />
                  <div className="min-w-0 md:grid md:grid-cols-[1fr_minmax(0,22rem)] md:items-baseline md:gap-8">
                    <h2 className="font-display text-[clamp(1.35rem,3.4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] transition-transform duration-500 ease-(--ease-out) lg:group-hover:translate-x-3">
                      <span className="label mr-3 align-middle text-text-3">({formatIndex(i)})</span>
                      {p.title}
                    </h2>
                    <p className="label mt-2 text-text-3 md:mt-0">
                      {p.category} · {p.year}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="size-5 text-text-3 transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text md:size-6"
                    aria-hidden
                  />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
      <ContactSection />
    </>
  );
}
