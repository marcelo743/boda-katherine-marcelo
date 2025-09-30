// hooks/useAuth.ts
'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  createClientComponentClient,
  Session,
  User,
} from '@supabase/auth-helpers-nextjs';

/**
 * useAuth
 *
 * - Reads the current Supabase session on mount (auth.getSession).
 * - Subscribes to auth state changes (onAuthStateChange) so your UI stays in sync
 *   when the user signs in/out or when tokens refresh.
 * - Cleans up the subscription on unmount to avoid memory leaks.
 * - Exposes convenient helpers: role, isAuthenticated, hasRole, requireRole.
 *
 * Notes:
 * - Client-side role checks are for UX only. Always enforce authorization on the server
 *   (middleware, route handlers, API endpoints).
 */
type Role = 'admin' | 'user' | 'manager' | string;
  
export function useAuth() {
  const supabase = createClientComponentClient();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Guard against state updates after unmount

    /**
     * 1) Read the current session once on mount.
     * Doing this inside useEffect ensures it runs only once (with correct deps)
     * and prevents creating multiple clients/listeners on re-renders.
     */
    const init = async () => {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) return;
      setSession(session ?? null);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    init();

    /**
     * 2) Subscribe to auth changes.
     * This keeps the hook's state in sync when:
     * - The user signs in / signs out
     * - The session token is refreshed
     * - The user object is updated
     *
     * We keep the unsubscribe reference so we can clean it up on unmount.
     */
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      // _event can be 'SIGNED_IN' | 'SIGNED_OUT' | 'TOKEN_REFRESHED' | 'USER_UPDATED' ...
      setSession(newSession ?? null);
      setUser(newSession?.user ?? null);
    });

    /**
     * 3) Cleanup on unmount.
     * This prevents memory leaks and avoids updating state
     * on a component that is no longer mounted.
     */
    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]); // Only recreate if the supabase client instance changes

  // Derive role from user metadata (optional, adjust to your schema)
  const role: Role | null = useMemo(() => {
    return (user?.user_metadata?.role as Role) ?? null;
  }, [user]);

  // Convenience flags/helpers for components
  const isAuthenticated = !!user;

  const hasRole = (...roles: Role[]) => {
    if (!role) return false;
    return roles.includes(role);
  };

  /**
   * Helper to check auth + role in one go.
   * Example usage in a Client Component:
   *   if (!requireRole('admin')) router.replace('/unauthorized')
   */
  const requireRole = (...roles: Role[]) => {
    return isAuthenticated && hasRole(...roles);
  };

  return {
    user,
    session,
    role,
    loading,
    isAuthenticated,
    hasRole,
    requireRole,
  };
}
