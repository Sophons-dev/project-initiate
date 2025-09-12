'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useGetUserByClerkId } from '@/features/user/hooks/useUser';
import { useEffect } from 'react';

interface OnboardingGuardProps {
  children: React.ReactNode;
}

export const OnboardingGuard = ({ children }: OnboardingGuardProps) => {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  const { data: userResponse, isLoading } = useGetUserByClerkId(userId || '');

  useEffect(() => {
    // Wait for auth to load
    if (!isLoaded || !userId) return;

    // Wait for user data to load
    if (isLoading) return;

    const user = userResponse?.data;

    // If no user data or onboarding not completed, redirect to onboarding
    if (!userResponse?.success || !user || !user.onboardingCompleted) {
      router.push('/onboarding');
      return;
    }
  }, [isLoaded, userId, userResponse, isLoading, router]);

  // Show loading while checking auth and user data
  if (!isLoaded || !userId || isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-500'></div>
      </div>
    );
  }

  // If user is not onboarded, don't render children (redirect will happen)
  const user = userResponse?.data;
  if (!userResponse?.success || !user || !user.onboardingCompleted) {
    return null;
  }

  // User is onboarded, render children
  return <>{children}</>;
};
