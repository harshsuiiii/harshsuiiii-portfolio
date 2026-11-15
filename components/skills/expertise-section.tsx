import Link from "next/link";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { expertise } from "@/data/skills";

export function ExpertiseSection() {
  return (
    <section aria-labelledby="expertise-title" className="section-y container-x border-t border-border">
      <SectionHeading index="03" label="Expertise" id="expertise-title" title="What I build" />

      <ul className="mt-12 md:mt-20">
        {expertise.map((e) => (
          <li key={e.title} className="group border-t border-border last:border-b">
            <Reveal className="grid-12 items-baseline gap-y-3 py-7 md:py-9">
              <span className="label col-span-4 text-text-3 md:col-span-1 lg:col-span-3">{e.index}</span>
              <h3 className="col-span-4 font-display text-(length:--text-project) font-semibold leading-[1.05] tracking-[-0.025em] transition-transform duration-500 ease-(--ease-out) md:col-span-5 lg:col-span-4 lg:group-hover:translate-x-3">
                {e.title}
              </h3>
              <div className="col-span-4 md:col-span-5 md:col-start-2 lg:col-span-5 lg:col-start-8">
                <p className="text-base text-text-2">{e.body}</p>
                <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="label text-text-3">Shown in</span>
                  {e.evidence.map((ev) => (
                    <Link key={ev.slug} href={`/projects/${ev.slug}`} className="label link-underline py-2 text-text">
                      {ev.label}
                    </Link>
                  ))}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
