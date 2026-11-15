import Link from "next/link";
import { Reveal } from "@/components/animations/reveal";
import { currentlyExploring } from "@/data/currently-exploring";

export function CurrentlyExploring() {
  return (
    <section aria-labelledby="exploring-title" className="section-y container-x border-t border-border">
      <div className="grid-12 gap-y-8">
        <Reveal className="col-span-4 md:col-span-6 lg:col-span-3">
          <p className="label text-text-3">
            <span className="text-accent">(06)</span> Currently exploring
          </p>
          <h2 id="exploring-title" className="mt-4 font-display text-(length:--text-project) font-semibold leading-[1.05] tracking-[-0.025em]">
            What has my attention
          </h2>
        </Reveal>

        <ul className="col-span-4 grid gap-px overflow-hidden rounded-(--radius) border border-border bg-border sm:grid-cols-2 md:col-span-6 lg:col-span-9">
          {currentlyExploring.map((item, i) => (
            <li key={item.topic} className={`bg-bg p-5 md:p-6 ${i === currentlyExploring.length - 1 && currentlyExploring.length % 2 ? "sm:col-span-2" : ""}`}>
              <Reveal>
                <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">{item.topic}</h3>
                <p className="mt-2 text-base text-text-2">{item.note}</p>
                {item.seenIn && (
                  <Link href={`/projects/${item.seenIn.slug}`} className="label link-underline mt-2 inline-block py-3.5 text-[0.6875rem] text-text">
                    Seen in {item.seenIn.label} →
                  </Link>
                )}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
