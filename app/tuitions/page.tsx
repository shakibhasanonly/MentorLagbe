import Link from 'next/link';
import { Suspense } from 'react';

type Tuition = {
  _id: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: string;
  location: string;
  monthlyFee: number;
  daysPerWeek: number;
  bannerImage: string;
  tutorName: string;
};

type PageProps = {
  searchParams: Promise<{
    search?: string;
    subject?: string;
    classLevel?: string;
    mode?: string;
  }>;
};

const subjects = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Science',
  'Higher Mathematics',
  'Accounting',
];

const classLevels = [
  'Class 5',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'HSC',
  'IELTS',
];

async function getTuitions(params: URLSearchParams): Promise<Tuition[]> {
  try {
    const apiUrl = process.env.API_URL || 'http://localhost:5000';

    const response = await fetch(`${apiUrl}/tuitions?${params.toString()}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tuitions');
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Tuition loading error:', error);
    return [];
  }
}

async function TuitionsContent({ searchParams }: PageProps) {
  const filters = await searchParams;

  const params = new URLSearchParams();

  if (filters.search) params.set('search', filters.search);
  if (filters.subject) params.set('subject', filters.subject);
  if (filters.classLevel) params.set('classLevel', filters.classLevel);
  if (filters.mode) params.set('mode', filters.mode);

  const tuitions = await getTuitions(params);

  return (
    <main className="min-h-screen bg-[#F7F9FC] px-5 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#D18A45]">
            Explore Opportunities
          </p>

          <h1 className="text-3xl font-bold text-[#173B57] sm:text-4xl">
            Browse Tuitions
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Find the right tuition that matches your subject, class level, and
            learning preferences.
          </p>
        </div>

        <form
          action="/tuitions"
          method="GET"
          className="mb-10 grid grid-cols-1 gap-4 rounded-2xl border border-[#E2EAF1] bg-white p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-5"
        >
          <input
            type="text"
            name="search"
            defaultValue={filters.search || ''}
            placeholder="Search by title or subject..."
            className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#D18A45] lg:col-span-2"
          />

          <select
            name="subject"
            defaultValue={filters.subject || ''}
            className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#D18A45]"
          >
            <option value="">All Subjects</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>

          <select
            name="classLevel"
            defaultValue={filters.classLevel || ''}
            className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#D18A45]"
          >
            <option value="">All Class Levels</option>
            {classLevels.map(level => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>

          <select
            name="mode"
            defaultValue={filters.mode || ''}
            className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#D18A45]"
          >
            <option value="">All Modes</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>

          <div className="flex gap-3 sm:col-span-2 lg:col-span-5">
            <button
              type="submit"
              className="rounded-lg bg-[#173B57] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#245675]"
            >
              Search Tuitions
            </button>

            <Link
              href="/tuitions"
              className="rounded-lg border border-gray-200 px-7 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              Clear Filters
            </Link>
          </div>
        </form>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#173B57]">
            Available Tuitions
          </h2>

          <p className="text-sm text-gray-500">
            {tuitions.length} results found
          </p>
        </div>

        {tuitions.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {tuitions.map(tuition => (
              <article
                key={tuition._id}
                className="overflow-hidden rounded-2xl border border-[#E2EAF1] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-48 overflow-hidden bg-gray-100">
                  {tuition.bannerImage ? (
                    <img
                      src={tuition.bannerImage}
                      alt={tuition.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                      No Image Available
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#FFF3E7] px-3 py-1 text-xs font-semibold text-[#B87332]">
                      {tuition.subject}
                    </span>

                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      {tuition.mode}
                    </span>
                  </div>

                  <h3 className="mb-3 text-lg font-bold text-[#173B57]">
                    {tuition.title}
                  </h3>

                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      <span className="font-semibold">Class:</span>{' '}
                      {tuition.classLevel}
                    </p>

                    <p>
                      <span className="font-semibold">Tutor:</span>{' '}
                      {tuition.tutorName}
                    </p>

                    <p>
                      <span className="font-semibold">Location:</span>{' '}
                      {tuition.location}
                    </p>

                    <p>
                      <span className="font-semibold">Days per week:</span>{' '}
                      {tuition.daysPerWeek}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                      <p className="text-xs text-gray-500">Monthly Fee</p>
                      <p className="text-xl font-bold text-[#D18A45]">
                        ৳{tuition.monthlyFee}
                      </p>
                    </div>

                    <Link
                      href={`/tuitions/${tuition._id}`}
                      className="rounded-lg bg-[#173B57] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#245675]"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
            <h3 className="text-xl font-bold text-[#173B57]">
              No Tuitions Found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              No tuition matches your search. Try changing your filters.
            </p>

            <Link
              href="/tuitions"
              className="mt-5 inline-block rounded-lg bg-[#173B57] px-6 py-3 text-sm font-semibold text-white hover:bg-[#245675]"
            >
              View All Tuitions
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

function LoadingTuitions() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] px-5 py-20 text-center">
      <p className="text-[#173B57]">Loading tuitions...</p>
    </div>
  );
}

export default function TuitionsPage({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<LoadingTuitions />}>
      <TuitionsContent searchParams={searchParams} />
    </Suspense>
  );
}
