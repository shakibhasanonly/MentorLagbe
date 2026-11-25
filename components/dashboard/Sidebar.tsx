'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  UserRound,
  BookOpen,
  PlusCircle,
  Users,
  ClipboardList,
  CreditCard,
  Settings,
  GraduationCap,
  X,
} from 'lucide-react';

type UserRole = 'student' | 'tutor' | 'admin';

type SidebarProps = {
  role: UserRole;
  isOpen: boolean;
  onClose: () => void;
};

const menuItems = {
  student: [
    { label: 'Overview', href: '/dashboard/student', icon: LayoutDashboard },
    {
      label: 'My Applications',
      href: '/dashboard/student/my-applications',
      icon: ClipboardList,
    },
    { label: 'Browse Tuitions', href: '/tuitions', icon: BookOpen },
    { label: 'Pricing Plans', href: '/pricing', icon: CreditCard },
    { label: 'My Profile', href: '/dashboard/profile', icon: UserRound },
  ],
  tutor: [
    { label: 'Overview', href: '/dashboard/tutor', icon: LayoutDashboard },
    {
      label: 'Post a Tuition',
      href: '/dashboard/tutor/post-tuition',
      icon: PlusCircle,
    },
    {
      label: 'My Tuitions',
      href: '/dashboard/tutor/my-tuitions',
      icon: BookOpen,
    },
    { label: 'Applicants', href: '/dashboard/tutor/applicants', icon: Users },
    { label: 'My Profile', href: '/dashboard/profile', icon: UserRound },
    { label: 'Pricing Plans', href: '/pricing', icon: CreditCard },
  ],
  admin: [
    { label: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
    { label: 'Manage Users', href: '/dashboard/admin/users', icon: Users },
    {
      label: 'Manage Tuitions',
      href: '/dashboard/admin/tuitions',
      icon: BookOpen,
    },
    {
      label: 'Transactions',
      href: '/dashboard/admin/transactions',
      icon: CreditCard,
    },
    { label: 'My Profile', href: '/dashboard/profile', icon: UserRound },
  ],
};

export default function Sidebar({ role, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const items = menuItems[role] || menuItems.student;

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:sticky lg:top-0 lg:z-30 lg:h-screen lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <GraduationCap size={24} />
            </div>
            <span className="text-xl font-bold text-slate-900">
              Mentor<span className="text-indigo-600">Lagbe</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close menu"
          >
            <X size={21} />
          </button>
        </div>

        <div className="px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            {role} Dashboard
          </p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4 pb-6">
          {items.map(item => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard/student' &&
                item.href !== '/dashboard/tutor' &&
                item.href !== '/dashboard/admin' &&
                item.href !== '/tuitions' &&
                item.href !== '/pricing' &&
                pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
                }`}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-100 p-5">
          <div className="rounded-xl bg-indigo-50 p-4">
            <p className="text-sm font-semibold text-slate-800">
              Need any help?
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Explore MentorLagbe and make your learning journey easier.
            </p>
            <Link
              href="/"
              onClick={onClose}
              className="mt-3 inline-block text-xs font-semibold text-indigo-600 hover:underline"
            >
              Visit Homepage →
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
