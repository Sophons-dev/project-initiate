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

/**
 * Provides user state and controls to descendant components via UserContext.
 *
 * Fetches the current user using `useCurrentUser()` and exposes a context value with:
 * `user` (UserDto | null), `isLoading` (boolean), `error` (Error | null),
 * `isAuthenticated` (boolean), and `refetch` (function). Wraps `children` with `UserContext.Provider`.
 *
 * @param children - React nodes that will receive the user context
 * @returns The provider element that supplies the user context to its children
 */
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

/**
 * Returns the current UserContext value.
 *
 * Retrieves the context created by UserProvider and returns its value object
 * (user, isLoading, error, isAuthenticated, refetch).
 *
 * @returns The current UserContext value.
 * @throws Error if called outside of a UserProvider.
 */
export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}

/**
 * Returns the current user object from the UserContext.
 *
 * @returns The current user (UserDto) if authenticated, otherwise `null`.
 */
export function useUser() {
  const { user } = useUserContext();
  return user;
}

/**
 * Returns whether the current user is authenticated.
 *
 * @returns True if a user is authenticated; otherwise, false.
 */
export function useIsAuthenticated() {
  const { isAuthenticated } = useUserContext();
  return isAuthenticated;
}

/**
 * Returns whether the current user data is still loading.
 *
 * @returns `true` if the current user fetch is in progress; otherwise `false`.
 */
export function useUserLoading() {
  const { isLoading } = useUserContext();
  return isLoading;
}
