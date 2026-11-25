'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronDown,
  LayoutDashboard,
  UserRound,
  LogOut,
  X,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { authClient } from '@/lib/auth-client';

type ToastType = 'success' | 'error';

export default function Navbar() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');
  const [signingOut, setSigningOut] = useState(false);

  const currentUser = session?.user as
    | {
        name?: string;
        email?: string;
        image?: string | null;
        role?: string;
      }
    | undefined;

  const showToast = (message: string, type: ToastType) => {
    setToast(message);
    setToastType(type);

    setTimeout(() => {
      setToast('');
    }, 3000);
  };

  const handleSignOut = async () => {
    if (signingOut) return;

    setSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        showToast(
          result.error.message || 'Sign out failed. Please try again.',
          'error',
        );
        setSigningOut(false);
        return;
      }

      setDropdownOpen(false);
      showToast('Signed out successfully. See you again!', 'success');

      router.refresh();

      setTimeout(() => {
        router.push('/');
        setSigningOut(false);
      }, 1000);
    } catch (error) {
      console.error('Sign out failed:', error);

      showToast('Something went wrong. Please try again.', 'error');
      setSigningOut(false);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <div className="fixed left-1/2 top-5 z-[100] w-[calc(100%-32px)] max-w-md -translate-x-1/2">
          <div
            className={`flex items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-lg ${
              toastType === 'success' ? 'border-green-200' : 'border-red-200'
            }`}
          >
            {toastType === 'success' ? (
              <CheckCircle className="shrink-0 text-green-600" size={21} />
            ) : (
              <AlertCircle className="shrink-0 text-red-600" size={21} />
            )}

            <p
              className={`flex-1 text-sm font-medium ${
                toastType === 'success' ? 'text-green-700' : 'text-red-700'
              }`}
            >
              {toast}
            </p>

            <button
              type="button"
              onClick={() => setToast('')}
              aria-label="Close notification"
              className="text-gray-400 transition hover:text-gray-700"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 border-b border-[#E2EAF1] bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src="/mentorlagbe-logo.png"
              alt="MentorLagbe Logo"
              width={42}
              height={42}
              className="object-contain"
            />

            <span className="text-xl font-bold text-[#173B57]">
              Mentor<span className="text-[#D18A45]">Lagbe</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden items-center gap-5 lg:flex xl:gap-8">
            <Link
              href="/"
              className="font-medium text-[#263746] transition hover:text-[#D18A45]"
            >
              Home
            </Link>

            <Link
              href="/tuitions"
              className="font-medium text-[#263746] transition hover:text-[#D18A45]"
            >
              Browse Tuitions
            </Link>

            <Link
              href="/pricing"
              className="font-medium text-[#263746] transition hover:text-[#D18A45]"
            >
              Pricing
            </Link>

            <Link
              href="/#how-it-works"
              className="font-medium text-[#263746] transition hover:text-[#D18A45]"
            >
              How It Works
            </Link>
          </div>

          {/* Authentication */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isPending ? (
              <div className="h-10 w-24 animate-pulse rounded-lg bg-[#F0F5FA]" />
            ) : currentUser ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-expanded={dropdownOpen}
                  className="flex items-center gap-2 rounded-xl border border-[#E2EAF1] px-2 py-2 transition hover:bg-[#F0F5FA] sm:px-3"
                >
                  {currentUser.image ? (
                    <img
                      src={currentUser.image}
                      alt={currentUser.name || 'User'}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#173B57] font-semibold text-white">
                      {currentUser.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}

                  <div className="hidden text-left sm:block">
                    <p className="max-w-28 truncate text-sm font-semibold text-[#173B57]">
                      {currentUser.name || 'User'}
                    </p>

                    <span className="inline-block rounded-full bg-[#FFF3E5] px-2 py-0.5 text-[10px] font-bold capitalize text-[#B66A24]">
                      {currentUser.role || 'User'}
                    </span>
                  </div>

                  <ChevronDown size={16} className="text-[#173B57]" />
                </button>

                {/* User Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-xl border border-[#E2EAF1] bg-white py-2 shadow-lg">
                    <div className="border-b border-[#E2EAF1] px-4 py-3">
                      <p className="truncate text-sm font-semibold text-[#173B57]">
                        {currentUser.name || 'User'}
                      </p>

                      <p className="truncate text-xs text-gray-500">
                        {currentUser.email}
                      </p>

                      <span className="mt-2 inline-block rounded-full bg-[#FFF3E5] px-2.5 py-1 text-xs font-semibold capitalize text-[#B66A24]">
                        {currentUser.role || 'User'}
                      </span>
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-[#263746] transition hover:bg-[#F0F5FA]"
                    >
                      <LayoutDashboard size={17} />
                      Dashboard
                    </Link>

                    <Link
                      href="/dashboard/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-[#263746] transition hover:bg-[#F0F5FA]"
                    >
                      <UserRound size={17} />
                      Update Profile
                    </Link>

                    <button
                      type="button"
                      onClick={handleSignOut}
                      disabled={signingOut}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <LogOut size={17} />
                      {signingOut ? 'Signing Out...' : 'Sign Out'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-[#173B57] transition hover:bg-[#F0F5FA] sm:px-4 sm:text-base"
                >
                  Sign In
                </Link>

                <Link
                  href="/sign-up"
                  className="rounded-lg bg-[#173B57] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#245675] sm:px-5 sm:text-base"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Navigation Links */}
        <div className="flex items-center justify-center gap-5 border-t border-[#E2EAF1] px-3 py-3 lg:hidden">
          <Link href="/" className="text-xs font-medium text-[#263746]">
            Home
          </Link>

          <Link href="/tuitions" className="text-xs font-medium text-[#263746]">
            Browse Tuitions
          </Link>

          <Link href="/pricing" className="text-xs font-medium text-[#263746]">
            Pricing
          </Link>

          <Link
            href="/#how-it-works"
            className="text-xs font-medium text-[#263746]"
          >
            How It Works
          </Link>
        </div>
      </header>
    </>
  );
}
