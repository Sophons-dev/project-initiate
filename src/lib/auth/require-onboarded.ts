import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { getUserByClerkId } from '@/features/user/actions';

export async function requireOnboarded() {
  // Get current session user from Clerk
  const { userId } = await auth();

  if (!userId) {
    // User not logged in
    redirect('/sign-in');
  }

  // Fetch user from DB
  const { success, data: user } = await getUserByClerkId(userId);

  if (!success || !user) {
    // User not found in DB
    redirect('/onboarding'); // or an error page
  }

  // Check onboarding status
  if (!user.preferences?.onboardingCompleted) {
    redirect('/onboarding');
  }

  // User is onboarded, return the user object if needed
  return user;
}
