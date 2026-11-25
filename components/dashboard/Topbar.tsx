'use client';

import { Menu, Bell, Search } from 'lucide-react';

type TopbarProps = {
  title: string;
  description: string;
  onMenuClick: () => void;
  userName?: string;
  userImage?: string | null;
};

export default function Topbar({
  title,
  description,
  onMenuClick,
  userName,
  userImage,
}: TopbarProps) {
  const firstName = userName?.trim().split(' ')[0] || 'User';

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex min-h-20 items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open dashboard menu"
            className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 lg:hidden"
          >
            <Menu size={21} />
          </button>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
              {title}
            </h1>
            <p className="mt-1 hidden truncate text-xs text-slate-500 sm:block sm:text-sm">
              {description}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            aria-label="Search"
            className="hidden rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-50 sm:block"
          >
            <Search size={19} />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-50"
          >
            <Bell size={19} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
          </button>

          <div className="flex items-center gap-2 border-l border-slate-200 pl-3 sm:gap-3 sm:pl-4">
            {userImage ? (
              <img
                src={userImage}
                alt={firstName}
                className="h-9 w-9 rounded-full border border-slate-200 object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                {firstName.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="hidden sm:block">
              <p className="max-w-32 truncate text-sm font-semibold text-slate-800">
                {firstName}
              </p>
              <p className="text-xs text-slate-500">Dashboard</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
