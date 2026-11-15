import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/data/experience";
import { siteConfig } from "@/data/site-config";

export function ExperienceTimeline({ index = "04", showEducation = false }: { index?: string; showEducation?: boolean }) {
  return (
    <section aria-labelledby="experience-title" className="section-y container-x border-t border-border">
      <SectionHeading index={index} label="Experience" id="experience-title" title="Where I've worked" />

      <ol className="relative mt-12 md:mt-20 lg:ml-[25.6%]">
        {/* the timeline rule */}
        <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-border" />
        {experience.map((item) => (
          <li key={item.organization} className="relative pb-12 pl-9 last:pb-0 md:pl-12">
            <span aria-hidden className="absolute left-0 top-2 size-[11px] rounded-full border-2 border-bg bg-text ring-1 ring-border" />
            <Reveal>
              <p className="label text-text-3">
                {item.area}
                {item.period ? ` · ${item.period}` : ""}
              </p>
              <h3 className="mt-2 font-display text-(length:--text-project) font-semibold leading-[1.08] tracking-[-0.025em]">
                {item.organization}
              </h3>
              <p className="mt-4 max-w-2xl text-text-2">{item.summary}</p>
              <ul className="mt-5 max-w-2xl space-y-2 text-base">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-text-3" />
                    {point}
                  </li>
                ))}
              </ul>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Areas">
                {item.tags.map((tag) => (
                  <li key={tag} className="label rounded-full border border-border px-3 py-1 text-[0.6875rem] text-text-2">
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}

        {showEducation && (
          <li className="relative mt-12 pl-9 md:pl-12">
            <span aria-hidden className="absolute left-0 top-2 size-[11px] rounded-full border-2 border-bg bg-lime ring-1 ring-border" />
            <Reveal>
              <p className="label text-text-3">Education</p>
              <h3 className="mt-2 font-display text-(length:--text-project) font-semibold leading-[1.08] tracking-[-0.025em]">
                {siteConfig.education.institution}
              </h3>
              <p className="mt-4 max-w-2xl text-text-2">
                {siteConfig.education.degree}, specialising in {siteConfig.education.specialization}.
              </p>
            </Reveal>
          </li>
        )}
      </ol>
    </section>
  );
}
