'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '../store/useAuthStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, token } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const publicPaths = ['/login', '/forgot-password'];
    const isPublicPath = publicPaths.includes(pathname);

    if (!isAuthenticated && !isPublicPath) {
      router.replace('/login');
    } else if (isAuthenticated && isPublicPath) {
      router.replace('/');
    }
  }, [isAuthenticated, pathname, router]);

  // Optionally, we could add a loading spinner here while determining auth state
  // if doing server-side checks, but since it's client-side Zustand persist, 
  // it resolves quickly.

  return <>{children}</>;
}
