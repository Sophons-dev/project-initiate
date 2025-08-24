import { redirect } from 'next/navigation';

export async function requireOnboarded() {
  // TODO: Replace with actual user data from the database
  const user = {
    isOnboarded: true,
  };

  if (!user.isOnboarded) {
    redirect('/onboarding');
  }
}
