import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-svh flex-col justify-end pb-16 pt-(--nav-h)">
      <p className="label text-text-3">Error 404</p>
      <h1 className="display mt-6 text-[clamp(3rem,12vw,11rem)]">
        Nothing <span className="mark-lime">here.</span>
      </h1>
      <p className="mt-6 max-w-md text-text-2">That page doesn&apos;t exist, or it has moved.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">
          Back home
        </Link>
        <Link href="/projects" className="btn btn-ghost">
          All projects
        </Link>
      </div>
    </section>
  );
}
