import { ArrowUpRight, Star } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/data/site-config";
import { getGitHubOverview } from "@/lib/github/repositories";
import type { ActivityDay } from "@/lib/github/types";

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

// Neutral → lime ramp; the swatch itself carries the value, text labels carry the rest.
const levelClass = ["bg-elevated", "bg-lime/35", "bg-lime/60", "bg-lime/80", "bg-lime"];
const level = (count: number, max: number) => (count === 0 ? 0 : Math.min(4, Math.ceil((count / Math.max(max, 1)) * 4)));

function ActivityGrid({ days }: { days: ActivityDay[] }) {
  const max = Math.max(...days.map((d) => d.count));
  const weeks: ActivityDay[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  return (
    <div className="flex gap-[5px]" role="img" aria-label={`Activity grid for the last ${weeks.length} weeks`}>
      {weeks.map((week, i) => (
        <div key={i} className="flex flex-1 flex-col gap-[5px]">
          {week.map((d) => (
            <span
              key={d.date}
              title={`${dateFmt.format(new Date(d.date))}: ${d.count}`}
              className={`aspect-square w-full rounded-[3px] ${levelClass[level(d.count, max)]}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export async function GitHubActivity() {
  const gh = await getGitHubOverview();
  const top = gh.languages.slice(0, 6);
  const stats = [
    { label: "Public repositories", value: gh.publicRepos },
    { label: "Original (non-fork)", value: gh.originalRepos },
    { label: "Stars received", value: gh.totalStars },
    { label: "Followers", value: gh.followers },
  ];
  const activityLabel =
    gh.activity.kind === "contributions"
      ? `${gh.activity.total} contributions in the last ${gh.activity.days.length / 7} weeks`
      : `${gh.activity.total} public events in the last ${gh.activity.days.length / 7} weeks`;

  return (
    <section aria-labelledby="github-title" className="section-y container-x border-t border-border">
      <SectionHeading index="05" label="GitHub" id="github-title" title="Open activity" />

      <div className="grid-12 mt-12 gap-y-12 md:mt-20">
        {/* Stats + languages + activity */}
        <div className="col-span-4 md:col-span-6 lg:col-span-5">
          <Reveal>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
              {stats.map((s) => (
                <div key={s.label} className="border-t border-border pt-4">
                  <dt className="label text-text-3">{s.label}</dt>
                  <dd className="mt-2 font-display text-[clamp(2.5rem,4.4vw,3.75rem)] font-bold leading-none tracking-[-0.04em] tabular-nums">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="mt-12">
            <h3 className="label text-text-3">Primary language, by repository</h3>
            <ul className="mt-5 space-y-3">
              {top.map((l, i) => (
                <li key={l.name} className="grid grid-cols-[9.5rem_1fr_2rem] items-center gap-3 text-[0.9375rem]">
                  <span className="truncate">{l.name}</span>
                  <span className="h-2 overflow-hidden rounded-full bg-elevated">
                    <span
                      className={`block h-full rounded-full ${i === 0 ? "bg-text" : "bg-text-3"}`}
                      style={{ width: `${Math.max(4, (l.count / top[0].count) * 100)}%` }}
                    />
                  </span>
                  <span className="text-right font-mono text-sm tabular-nums text-text-2">{l.count}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {gh.activity.kind !== "none" && (
            <Reveal className="mt-12">
              <h3 className="label text-text-3">{activityLabel}</h3>
              <div className="mt-5 max-w-md">
                <ActivityGrid days={gh.activity.days} />
              </div>
              <p className="label mt-3 flex items-center gap-2 text-[0.6875rem] text-text-3">
                Less
                {levelClass.map((c) => (
                  <span key={c} aria-hidden className={`size-3 rounded-[3px] ${c}`} />
                ))}
                More
              </p>
            </Reveal>
          )}
        </div>

        {/* Recently updated */}
        <div className="col-span-4 md:col-span-6 lg:col-span-6 lg:col-start-7">
          <Reveal>
            <h3 className="label text-text-3">Recently updated</h3>
            <ul className="mt-5">
              {gh.recent.map((r) => (
                <li key={r.name} className="border-t border-border last:border-b">
                  <a href={r.url} target="_blank" rel="noreferrer" className="group flex items-start justify-between gap-6 py-5">
                    <span className="min-w-0">
                      <span className="block truncate font-display text-xl font-semibold tracking-[-0.02em]">{r.name}</span>
                      {r.description && <span className="mt-1 line-clamp-2 block text-[0.9375rem] text-text-2">{r.description}</span>}
                      <span className="label mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.6875rem] text-text-3">
                        {r.language && <span>{r.language}</span>}
                        <span>Pushed {dateFmt.format(new Date(r.pushedAt))}</span>
                        {r.stars > 0 && (
                          <span className="inline-flex items-center gap-1">
                            <Star className="size-3" aria-hidden /> {r.stars}
                          </span>
                        )}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="mt-1 size-5 shrink-0 text-text-3 transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <a href={siteConfig.github.url} target="_blank" rel="noreferrer" className="btn btn-ghost">
                github.com/{siteConfig.github.username} <ArrowUpRight className="size-4" aria-hidden />
              </a>
              <p className="label text-[0.6875rem] text-text-3">
                {gh.source === "live" ? "Live from the GitHub API" : "Snapshot"} · {dateFmt.format(new Date(gh.fetchedAt))}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
