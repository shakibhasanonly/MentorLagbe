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
  description: string;
  tutorName: string;
  tutorEmail: string;
  createdAt: string;
};

type PageProps = {
  params: Promise<{ id: string }>;
};

async function getTuition(id: string): Promise<Tuition | null> {
  try {
    const apiUrl = process.env.API_URL || 'http://localhost:5000';

    const response = await fetch(`${apiUrl}/tuitions/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error('Tuition details loading error:', error);
    return null;
  }
}

// Tuition Details Content
async function TuitionDetailsContent({ params }: PageProps) {
  const { id } = await params;
  const tuition = await getTuition(id);

  if (!tuition) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F9FC] px-5">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#173B57]">
            Tuition Not Found
          </h1>
          <p className="mt-3 text-gray-600">
            This tuition may have been removed or is no longer available.
          </p>
          <Link
            href="/tuitions"
            className="mt-6 inline-block rounded-lg bg-[#173B57] px-6 py-3 font-semibold text-white hover:bg-[#245675]"
          >
            Browse Tuitions
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F9FC] px-5 py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/tuitions"
          className="mb-6 inline-block text-sm font-semibold text-[#173B57] hover:text-[#D18A45]"
        >
          ← Back to Tuitions
        </Link>

        <article className="overflow-hidden rounded-2xl border border-[#E2EAF1] bg-white shadow-sm">
          {tuition.bannerImage && (
            <div className="h-64 overflow-hidden bg-gray-100 sm:h-80">
              <img
                src={tuition.bannerImage}
                alt={tuition.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="p-6 sm:p-10">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#FFF3E7] px-3 py-1 text-sm font-semibold text-[#B87332]">
                {tuition.subject}
              </span>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                {tuition.mode}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-[#173B57] sm:text-4xl">
              {tuition.title}
            </h1>

            <p className="mt-3 text-gray-600">{tuition.description}</p>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="rounded-xl bg-[#F7F9FC] p-5">
                <p className="text-sm text-gray-500">Class Level</p>
                <p className="mt-1 font-bold text-[#173B57]">
                  {tuition.classLevel}
                </p>
              </div>

              <div className="rounded-xl bg-[#F7F9FC] p-5">
                <p className="text-sm text-gray-500">Learning Mode</p>
                <p className="mt-1 font-bold text-[#173B57]">{tuition.mode}</p>
              </div>

              <div className="rounded-xl bg-[#F7F9FC] p-5">
                <p className="text-sm text-gray-500">Location</p>
                <p className="mt-1 font-bold text-[#173B57]">
                  {tuition.location}
                </p>
              </div>

              <div className="rounded-xl bg-[#F7F9FC] p-5">
                <p className="text-sm text-gray-500">Days Per Week</p>
                <p className="mt-1 font-bold text-[#173B57]">
                  {tuition.daysPerWeek} Days
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-[#F1DFC9] bg-[#FFFAF5] p-6">
              <p className="text-sm text-gray-500">Monthly Tuition Fee</p>
              <p className="mt-2 text-3xl font-bold text-[#D18A45]">
                ৳{tuition.monthlyFee}
              </p>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-7">
              <h2 className="text-xl font-bold text-[#173B57]">
                Tutor Information
              </h2>

              <div className="mt-4 rounded-xl bg-[#F7F9FC] p-5">
                <p className="font-semibold text-[#173B57]">
                  {tuition.tutorName}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  {tuition.tutorEmail}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm text-gray-500">
                Posted on:{' '}
                {new Date(tuition.createdAt).toLocaleDateString('en-GB')}
              </p>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}

// Loading UI
function LoadingTuitionDetails() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] px-5 py-20 text-center">
      <p className="text-[#173B57]">Loading tuition details...</p>
    </div>
  );
}

// Main Page
export default function TuitionDetailsPage({ params }: PageProps) {
  return (
    <Suspense fallback={<LoadingTuitionDetails />}>
      <TuitionDetailsContent params={params} />
    </Suspense>
  );
}
