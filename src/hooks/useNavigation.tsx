// useNavigationLite.ts
'use client';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function useAppNavigation() {
  const router = useRouter();
  
  const replace = useCallback((to: string) => {
    const base = to.startsWith('/') ? to : `/${to}`;
    router.replace(base);
    router.refresh();
  }, [router]);

  const openNewTab = (url: string) => window.open(url, '_blank');

  return { replace, openNewTab };
}
