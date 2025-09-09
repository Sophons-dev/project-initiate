'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useCurrentUser } from '../hooks/useUser';
import { UserDto } from '../dto/user.dto';

interface UserContextType {
  user: UserDto | null;
  isLoading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
  refetch: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const { data, isLoading, error, refetch } = useCurrentUser();

  const user = data?.success ? (data.data ?? null) : null;
  const isAuthenticated = !!user;

  const value: UserContextType = {
    user,
    isLoading,
    error: error as Error | null,
    isAuthenticated,
    refetch,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}

// Convenience hooks for common use cases
export function useUser() {
  const { user } = useUserContext();
  return user;
}

export function useIsAuthenticated() {
  const { isAuthenticated } = useUserContext();
  return isAuthenticated;
}

export function useUserLoading() {
  const { isLoading } = useUserContext();
  return isLoading;
}
