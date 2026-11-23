import Image from 'next/image';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F0F5FA] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-[#E2EAF1] bg-white p-7 shadow-xl sm:p-10">
        {/* Logo and Heading */}
        <div className="mb-8 flex flex-col items-center">
          <div className="flex items-center gap-1">
            <Image
              src="/mentorlagbe-logo.png"
              alt="MentorLagbe Logo"
              width={75}
              height={75}
              priority
              className="-mr-4"
            />

            <span className="text-2xl font-bold text-[#173B57]">
              MentorLagbe
            </span>
          </div>

          <h1 className="mt-6 text-2xl font-bold text-[#263746]">
            Welcome Back!
          </h1>

          <p className="mt-2 text-center text-sm text-gray-500">
            Sign in to continue your learning journey.
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#263746]">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#173B57] focus:ring-2 focus:ring-[#173B57]/10"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#263746]">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#173B57] focus:ring-2 focus:ring-[#173B57]/10"
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="h-4 w-4 accent-[#173B57]" />
              Remember me
            </label>

            <button
              type="button"
              className="font-semibold text-[#D18A45] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-[#173B57] py-3 font-semibold text-white transition hover:bg-[#214D6D]"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200"></div>
          <span className="text-xs text-gray-400">OR CONTINUE WITH</span>
          <div className="h-px flex-1 bg-gray-200"></div>
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 text-sm font-semibold text-[#263746] transition hover:bg-gray-50"
        >
          <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.24 5.48-4.7 7.18l7.2 5.59c4.2-3.88 7.54-9.59 7.54-17.24Z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.12.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.94-2.13 15.92-6.21l-7.2-5.59c-2 1.35-4.55 2.15-8.72 2.15-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
            />
          </svg>
          Continue with Google
        </button>

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

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-400">
          © 2026 MentorLagbe. All rights reserved.
        </p>
      </div>
    </main>
  );
}
