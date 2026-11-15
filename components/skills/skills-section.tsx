import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { skills } from "@/data/skills";

export function SkillsSection({ index = "03" }: { index?: string }) {
  return (
    <section aria-labelledby="skills-title" className="section-y container-x border-t border-border">
      <SectionHeading index={index} label="Skills" id="skills-title" title="Tools I've shipped with" />
      <p className="mt-6 max-w-xl text-base text-text-2 lg:ml-[25.6%]">
        Each of these is used in at least one public repository. No self-assigned ratings.
      </p>

      <dl className="mt-12 md:mt-16">
        {skills.map((group) => (
          <Reveal key={group.title} className="grid-12 gap-y-3 border-t border-border py-6 md:py-7">
            <dt className="label col-span-4 text-text-3 md:col-span-2 lg:col-span-3 lg:pt-1.5">{group.title}</dt>
            <dd className="col-span-4 md:col-span-4 lg:col-span-9">
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-[0.9375rem]">
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
