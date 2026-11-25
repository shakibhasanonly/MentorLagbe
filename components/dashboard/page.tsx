'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function DashboardRedirectPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace('/sign-in');
      return;
    }

    const currentUser = session.user as typeof session.user & {
      role?: string;
    };

    const role = currentUser.role;

    if (role === 'admin') {
      router.replace('/dashboard/admin');
    } else if (role === 'tutor') {
      router.replace('/dashboard/tutor');
    } else if (role === 'student') {
      router.replace('/dashboard/student');
    } else {
      router.replace('/');
    }
  }, [session, isPending, router]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
        <p className="mt-4 text-sm font-medium text-slate-600">
          Redirecting to your dashboard...
        </p>
      </div>
    </main>
  );
}
