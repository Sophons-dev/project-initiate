import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { UserDto } from '@/features/user/dto/user.dto';
import { ResponseDto } from '../dto/response.dto';
import { getUserByClerkId } from '@/features/user/actions';

export async function requireOnboarded() {
  // Get current session user from Clerk
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  // Fetch user from DB
  const result: ResponseDto<UserDto | null> = await getUserByClerkId(userId);

  // 🚨 Redirect to onboarding if no record yet
  if (!result.success || !result.data) {
    redirect('/onboarding');
  }

  const user = result.data;

  // Check onboarding status
  if (!user.onboardingCompleted) {
    redirect('/onboarding');
  }

  // ✅ User is onboarded
  return user;
}
