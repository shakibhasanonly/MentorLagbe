import Link from 'next/link';
import { Suspense } from 'react';

type Tuition = {
  _id: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: 'Online' | 'Offline';
  monthlyFee: number;
  tutorName: string;
  bannerImage: string;
};

type TuitionResponse = {
  success: boolean;
  data: Tuition[];
};

async function getFeaturedTuitions(): Promise<Tuition[]> {
  try {
    const apiUrl = process.env.API_URL;

    if (!apiUrl) {
      console.error('API_URL is missing');
      return [];
    }

    const response = await fetch(`${apiUrl}/tuitions?limit=6`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tuitions');
    }

    const result: TuitionResponse = await response.json();

    return result.success && Array.isArray(result.data) ? result.data : [];
  } catch (error) {
    console.error('Featured tuitions error:', error);
    return [];
  }
}

export default async function FeaturedTuitions() {
  const tuitions = await getFeaturedTuitions();

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

        {tuitions.length === 0 ? (
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
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tuitions.map(tuition => (
              <div
                key={tuition._id}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Tuition Image */}
                <div className="h-48 w-full overflow-hidden bg-slate-100">
                  {tuition.bannerImage ? (
                    <img
                      src={tuition.bannerImage}
                      alt={tuition.title}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-400">
                      No Image Available
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                      {tuition.subject}
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {tuition.mode}
                    </span>
                  </div>

                  <h3 className="mb-4 text-xl font-bold text-slate-900">
                    {tuition.title}
                  </h3>

                  <div className="mb-5 flex-1 space-y-3 text-sm text-slate-600">
                    <p>
                      <span className="font-semibold text-slate-800">
                        Class Level:
                      </span>{' '}
                      {tuition.classLevel}
                    </p>

                    <p>
                      <span className="font-semibold text-slate-800">
                        Tutor:
                      </span>{' '}
                      {tuition.tutorName}
                    </p>

                    <p>
                      <span className="font-semibold text-slate-800">
                        Monthly Fee:
                      </span>{' '}
                      <span className="font-bold text-teal-700">
                        ৳{tuition.monthlyFee}
                      </span>
                    </p>
                  </div>

                  <Link
                    href={`/tuitions/${tuition._id}`}
                    className="mt-auto block rounded-lg bg-teal-700 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-teal-800"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
