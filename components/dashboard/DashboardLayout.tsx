'use client';

import { useState, type ReactNode } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { authClient } from '@/lib/auth-client';

type UserRole = 'student' | 'tutor' | 'admin';

type DashboardLayoutProps = {
  children: ReactNode;
  role: UserRole;
  title: string;
  description: string;
};

export default function DashboardLayout({
  children,
  role,
  title,
  description,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session } = authClient.useSession();

  const currentUser = session?.user as
    | {
        name?: string;
        image?: string | null;
        role?: string;
      }
    | undefined;

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <Sidebar
        role={role}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-w-0 flex-1">
        <Topbar
          title={title}
          description={description}
          onMenuClick={() => setSidebarOpen(true)}
          userName={currentUser?.name}
          userImage={currentUser?.image}
        />

        <main className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
