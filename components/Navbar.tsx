import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E2EAF1] bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
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
        <div className="hidden items-center gap-8 md:flex">
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

        {/* Authentication Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className="rounded-lg px-4 py-2 font-semibold text-[#173B57] transition hover:bg-[#F0F5FA]"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="rounded-lg bg-[#173B57] px-5 py-2.5 font-semibold text-white transition hover:bg-[#245675]"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
