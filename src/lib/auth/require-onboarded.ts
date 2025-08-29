import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { getUser } from '@/features/user/actions';
import { GetUserResult } from '@/features/user/types';

export async function requireOnboarded() {
  // Get current session user from Clerk
  const { userId } = await auth();

  if (!userId) {
    // User not logged in
    redirect('/sign-in');
  }

  // Fetch user from DB
  const result: GetUserResult = await getUser({
    key: 'clerkId',
    value: userId,
  });

  if (!result.success) {
    redirect('/onboarding');
  }

  const user = result.data;

  if (!user) {
    redirect('/onboarding');
  }

  // Check onboarding status
  if (!user.onboardingCompleted) {
    redirect('/onboarding');
  }

  // User is onboarded, return the user object if needed
  return user;
}
