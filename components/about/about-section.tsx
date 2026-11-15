import Link from "next/link";
import { Reveal } from "@/components/animations/reveal";
import { siteConfig } from "@/data/site-config";

const principles = [
  {
    title: "Whole products",
    body: "I like owning the full path: the data model, the API, the interface and the deployment. Booking Agent and BotForge were built that way, end to end.",
  },
  {
    title: "Models propose, code verifies",
    body: "In the AI systems I build, a language model never has the last word. A deterministic verifier, critic or rules engine decides what is true.",
  },
  {
    title: "Designed around failure",
    body: "I start from what happens when Redis is down, a supplier times out or a retry limit is hit — and write that behaviour down in tests.",
  },
];

export function AboutSection({ withLink = true }: { withLink?: boolean }) {
  return (
    <section aria-labelledby="about-title" className="section-y container-x">
      <div className="grid-12 gap-y-10">
        <Reveal className="col-span-4 md:col-span-6 lg:col-span-3">
          <p className="label text-text-3">
            <span className="text-accent">(02)</span> Introduction
          </p>
        </Reveal>

        <div className="col-span-4 md:col-span-6 lg:col-span-9">
          <Reveal>
            <h2 id="about-title" className="text-balance font-display text-(length:--text-lead) font-medium leading-[1.18] tracking-[-0.02em] lg:text-[clamp(1.75rem,2.9vw,2.75rem)]">
              I&apos;m {siteConfig.name.split(" ")[0]}, a computer science student specialising in AI and machine learning at the{" "}
              {siteConfig.education.institution}. I build complete software —{" "}
              <span className="text-text-3">
                backends that hold up under load, interfaces people can use, and intelligent systems that can show their work.
              </span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-x-8 gap-y-8 md:mt-16 md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="border-t border-border pt-5">
                <h3 className="label text-text">{p.title}</h3>
                <p className="mt-3 text-base text-text-2">{p.body}</p>
              </Reveal>
            ))}
          </div>

          {withLink && (
            <Reveal className="mt-10">
              <Link href="/about" className="btn btn-ghost">
                More about me
              </Link>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
