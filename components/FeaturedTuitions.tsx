import Link from 'next/link';

export default function FeaturedTuitions() {
  return (
    <section className="bg-white px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-teal-600">
              Explore Opportunities
            </p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Featured Tuitions
            </h2>
            <p className="mt-3 text-slate-600">
              Discover the latest approved tuition opportunities.
            </p>
          </div>

          <Link
            href="/tuitions"
            className="font-semibold text-teal-700 transition hover:text-teal-900"
          >
            Browse All Tuitions →
          </Link>
        </div>

        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
          <div className="mb-4 text-4xl">📚</div>
          <h3 className="text-lg font-semibold text-slate-800">
            No Tuitions Available Yet
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            New tuition opportunities will appear here as soon as they are
            approved and published.
          </p>
          <Link
            href="/tuitions"
            className="mt-6 inline-block rounded-lg bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
          >
            Explore Tuitions
          </Link>
        </div>
      </div>
    </section>
  );
}
