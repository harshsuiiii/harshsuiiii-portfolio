import { Reveal } from "@/components/animations/reveal";

type Props = { index: string; label: string; title: React.ReactNode; id?: string; className?: string };

/** Mono label on the left, oversized display title on the right. */
export function SectionHeading({ index, label, title, id, className = "" }: Props) {
  return (
    <Reveal className={`grid-12 gap-y-4 ${className}`}>
      <p className="label col-span-4 text-text-3 md:col-span-6 lg:col-span-3 lg:pt-3">
        <span className="text-accent">({index})</span> {label}
      </p>
      <h2 id={id} className="display col-span-4 text-(length:--text-section) md:col-span-6 lg:col-span-9">
        {title}
      </h2>
    </Reveal>
  );
}
