import Link from 'next/link';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import {
  BookOpen,
  Users,
  CheckCircle2,
  Clock3,
  PlusCircle,
  ArrowRight,
  CreditCard,
} from 'lucide-react';

const stats = [
  {
    title: 'Total Tuitions Posted',
    value: '—',
    description: 'Your posted tuition listings',
    icon: BookOpen,
  },
  {
    title: 'Approved Tuitions',
    value: '—',
    description: 'Listings approved by admin',
    icon: CheckCircle2,
  },
  {
    title: 'Total Applicants',
    value: '—',
    description: 'Students who applied',
    icon: Users,
  },
  {
    title: 'Current Plan',
    value: 'Free',
    description: 'Your current subscription',
    icon: CreditCard,
  },
];

const quickActions = [
  {
    title: 'Post a New Tuition',
    description: 'Create a tuition listing and find students.',
    href: '/dashboard/tutor/post-tuition',
    icon: PlusCircle,
  },
  {
    title: 'Manage My Tuitions',
    description: 'View and manage your tuition listings.',
    href: '/dashboard/tutor/my-tuitions',
    icon: BookOpen,
  },
  {
    title: 'View Applicants',
    description: 'Check student applications for your tuitions.',
    href: '/dashboard/tutor/applicants',
    icon: Users,
  },
];

export default function TutorDashboardPage() {
  return (
    <DashboardLayout
      role="tutor"
      title="Tutor Overview"
      description="Manage your tuitions and connect with students."
    >
      <div className="space-y-8">
        <section className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white shadow-sm sm:p-8">
          <p className="text-sm font-medium text-indigo-100">Tutor Dashboard</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            Welcome to MentorLagbe!
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-indigo-100 sm:text-base">
            Manage your tuition posts, track student applications, and grow your
            teaching journey with MentorLagbe.
          </p>

          <Link
            href="/dashboard/tutor/post-tuition"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
          >
            <PlusCircle size={18} />
            Post a Tuition
          </Link>
        </section>

        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Dashboard Statistics
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              A summary of your tutoring activity.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(stat => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                      <Icon size={22} />
                    </div>
                    <span className="text-2xl font-bold text-slate-900">
                      {stat.value}
                    </span>
                  </div>

                  <h3 className="mt-5 font-semibold text-slate-800">
                    {stat.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>
            <p className="mt-1 text-sm text-slate-500">
              Quickly access your important dashboard sections.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {quickActions.map(action => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-5 flex items-center justify-between font-bold text-slate-900">
                    {action.title}
                    <ArrowRight
                      size={18}
                      className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-600"
                    />
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {action.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <Clock3 size={22} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Stay Updated</h2>
              <p className="mt-1 text-sm text-slate-500">
                Your latest tuition and application activity will appear here
                when the dashboard API is connected.
              </p>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
