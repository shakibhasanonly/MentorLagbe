'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('error');

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => setToast(''), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      setToastType('error');
      setToast('Please enter your email and password.');
      return;
    }

    setLoading(true);
    setToast('');

    try {
      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
        callbackURL: '/',
      });

      if (error) {
        setToastType('error');
        setToast(error.message || 'Invalid email or password.');
        return;
      }

      setToastType('success');
      setToast('Login successful! Welcome to MentorLagbe.');

      setTimeout(() => {
        router.push('/');
        router.refresh();
      }, 1000);
    } catch {
      setToastType('error');
      setToast('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F0F5FA] px-4 py-12">
      {toast && (
        <div
          role="status"
          className={`fixed left-1/2 top-5 z-50 -translate-x-1/2 rounded-xl px-5 py-3 text-center text-sm font-medium text-white shadow-lg ${
            toastType === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {toast}
        </div>
      )}

      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#E2EAF1] bg-white shadow-xl">
        <div className="px-7 pb-9 pt-9 sm:px-10">
          {/* Logo and Heading */}
          <div className="mb-8 flex flex-col items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/mentorlagbe-logo.png"
                alt="MentorLagbe Logo"
                width={44}
                height={44}
                priority
                className="h-11 w-11 object-contain"
              />

              <span className="text-2xl font-bold text-[#173B57]">
                MentorLagbe
              </span>
            </Link>

            <h1 className="mt-7 text-2xl font-bold text-[#263746]">
              Welcome Back!
            </h1>

            <p className="mt-2 text-center text-sm text-gray-500">
              Sign in to continue your learning journey.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#263746]"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#173B57] focus:ring-2 focus:ring-[#173B57]/10"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#263746]"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-sm outline-none transition focus:border-[#173B57] focus:ring-2 focus:ring-[#173B57]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-[#173B57]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <span className="text-xs text-gray-400">
                Forgot your password?
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#173B57] py-3 font-semibold text-white transition hover:bg-[#214D6D] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Registration Link */}
          <p className="mt-7 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link
              href="/sign-up"
              className="font-bold text-[#D18A45] hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
