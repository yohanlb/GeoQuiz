'use client';

import { createContext, useMemo } from 'react';
import { useAuth } from '@hooks/useAuth';
import { User } from '@supabase/supabase-js';

export type UserContextType = {
  user: User | null;
  loading: boolean;
};

export const UserContext = createContext({
  user: null,
  loading: true,
} as UserContextType);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  const exposed = useMemo(
    () => ({
      user,
      loading,
    }),
    [user, loading],
  );

  return (
    <UserContext.Provider value={exposed}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
