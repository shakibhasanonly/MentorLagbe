'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => setToast(''), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password || !role) {
      setToast('Please fill in all fields.');
      return;
    }

    if (password.length < 8) {
      setToast('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    setToast('');

    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        role: role as 'student' | 'tutor',
        callbackURL: '/',
      });

      if (error) {
        setToast(error.message || 'Registration failed. Please try again.');
        return;
      }

      setToast('Account created successfully!');

      setTimeout(() => {
        router.push('/');
        router.refresh();
      }, 1000);
    } catch {
      setToast('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F0F5FA] px-4 py-10">
      {toast && (
        <div
          role="status"
          className="fixed left-1/2 top-5 z-50 -translate-x-1/2 rounded-lg bg-[#173B57] px-5 py-3 text-center text-sm font-medium text-white shadow-lg"
        >
          {toast}
        </div>
      )}

      <div className="w-full max-w-md rounded-2xl border border-[#E2EAF1] bg-white p-7 shadow-xl sm:p-10">
        {/* Logo and Heading */}
        <div className="mb-7 flex flex-col items-center">
          <div className="flex items-center gap-2">
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
          </div>

          <h1 className="mt-5 text-2xl font-bold text-[#263746]">
            Create Your Account
          </h1>

          <p className="mt-2 text-center text-sm text-gray-500">
            Join MentorLagbe and start your learning journey.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-[#263746]"
            >
              Full Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#173B57] focus:ring-2 focus:ring-[#173B57]/10"
            />
          </div>

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
                placeholder="Create a password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                minLength={8}
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

            <p className="mt-1 text-xs text-gray-400">
              Password must be at least 8 characters.
            </p>
          </div>

          {/* Role Selection */}
          <div>
            <label
              htmlFor="role"
              className="mb-2 block text-sm font-semibold text-[#263746]"
            >
              I want to join as
            </label>

            <select
              id="role"
              value={role}
              onChange={e => setRole(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-600 outline-none transition focus:border-[#173B57] focus:ring-2 focus:ring-[#173B57]/10"
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#173B57] py-3 font-semibold text-white transition hover:bg-[#214D6D] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Sign In Link */}
        <p className="mt-7 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            href="/sign-in"
            className="font-bold text-[#D18A45] hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
