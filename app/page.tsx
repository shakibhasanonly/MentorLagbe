import FeaturedTuitions from '@/components/FeaturedTuitions';
import Link from 'next/link';

const features = [
  {
    icon: '🎓',
    title: 'Qualified Tutors',
    description:
      'Find experienced and qualified tutors who match your learning goals.',
  },
  {
    icon: '📚',
    title: 'Flexible Learning',
    description: 'Choose online or offline tuition according to your schedule.',
  },
  {
    icon: '🤝',
    title: 'Easy Connection',
    description:
      'Connect students and tutors through a simple and reliable platform.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Find a Tuition',
    description: 'Browse tuition opportunities that match your requirements.',
  },
  {
    number: '02',
    title: 'Apply Easily',
    description: 'Submit your application with your preferred schedule.',
  },
  {
    number: '03',
    title: 'Start Learning',
    description: 'Connect with your tutor and begin your learning journey.',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:px-10 lg:py-32">
          <div>
            <span className="inline-block rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
              Your Learning Journey Starts Here
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Find the Right Tutor.
              <span className="block text-indigo-600">Build Your Future.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              MentorLagbe connects students with qualified tutors. Discover
              tuition opportunities, find the right students, and make learning
              easier for everyone.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/tuitions"
                className="rounded-xl bg-indigo-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
              >
                Browse Tuitions →
              </Link>

              <Link
                href="/sign-up"
                className="rounded-xl border border-gray-300 bg-white px-7 py-3.5 font-semibold text-gray-800 transition hover:border-indigo-600 hover:text-indigo-600"
              >
                Get Started
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-8">
              <div>
                <h3 className="text-2xl font-bold text-indigo-600">Students</h3>
                <p className="text-sm text-gray-500">Find your tutor</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-indigo-600">Tutors</h3>
                <p className="text-sm text-gray-500">Find your students</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-indigo-600">
                  One Place
                </h3>
                <p className="text-sm text-gray-500">Easy connection</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative flex aspect-square w-full max-w-md items-center justify-center rounded-[3rem] bg-indigo-100 p-8">
              <div className="absolute left-5 top-8 rounded-2xl bg-white p-4 shadow-lg">
                <span className="text-3xl">📖</span>
                <p className="mt-1 text-sm font-semibold">Learn Better</p>
              </div>

              <div className="text-center">
                <div className="text-8xl md:text-9xl">🎓</div>
                <h2 className="mt-5 text-3xl font-extrabold text-indigo-700">
                  MentorLagbe
                </h2>
                <p className="mt-2 text-gray-600">
                  Learn, Teach & Grow Together
                </p>
              </div>

              <div className="absolute bottom-8 right-5 rounded-2xl bg-white p-4 shadow-lg">
                <span className="text-3xl">⭐</span>
                <p className="mt-1 text-sm font-semibold">Quality Learning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tuitions */}
      <FeaturedTuitions />

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-semibold text-indigo-600">WHY MENTORLAGBE</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Everything You Need to Learn and Teach
          </h2>
          <p className="mt-4 text-gray-600">
            A simple platform designed to bring students and tutors together.
          </p>
        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {features.map(feature => (
            <div
              key={feature.title}
              className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="text-4xl">{feature.icon}</div>
              <h3 className="mt-5 text-xl font-bold">{feature.title}</h3>
              <p className="mt-3 leading-7 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gray-50 px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-semibold text-indigo-600">HOW IT WORKS</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Start in Three Simple Steps
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map(step => (
              <div
                key={step.number}
                className="rounded-2xl bg-white p-8 shadow-sm"
              >
                <span className="text-4xl font-extrabold text-indigo-200">
                  {step.number}
                </span>
                <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 leading-7 text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-indigo-600 px-8 py-14 text-center text-white md:px-16">
          <h2 className="text-3xl font-extrabold md:text-4xl">
            Ready to Start Your Journey?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-indigo-100">
            Join MentorLagbe today and discover better opportunities for
            teaching and learning.
          </p>
          <Link
            href="/sign-up"
            className="mt-8 inline-block rounded-xl bg-white px-8 py-3.5 font-bold text-indigo-700 transition hover:bg-indigo-50"
          >
            Join MentorLagbe →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8 text-center">
        <p className="font-bold text-indigo-600">MentorLagbe</p>
        <p className="mt-2 text-sm text-gray-500">
          Connecting Students and Tutors. © 2026 MentorLagbe.
        </p>
      </footer>
    </main>
  );
}
