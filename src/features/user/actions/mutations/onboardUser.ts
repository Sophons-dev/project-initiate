'use server';

import { auth } from '@clerk/nextjs/server';
import { OnboardingUserParams } from '@/features/onboarding/types/onboarding';
import { ResponseDto } from '@/lib/dto/response.dto';
import { UserService } from '../../services/user.service';

/**
 * Performs onboarding for the currently authenticated user.
 *
 * Expects an authenticated session (obtained via Clerk). If no user is authenticated, or onboarding fails,
 * the function returns a failed ResponseDto rather than throwing.
 *
 * @param onboardingData - The onboarding input for the user (see OnboardingUserParams for fields).
 * @returns A ResponseDto whose `data` (on success) contains `{ userId: string; onboardingCompleted: boolean }`.
 *          On failure `success` is false and `error` contains a generic message.
 */
export async function onboardUser(
  onboardingData: OnboardingUserParams
): Promise<ResponseDto<{ userId: string; onboardingCompleted: boolean }>> {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error('User not authenticated');

    const result = await UserService.onboardUser(userId, onboardingData);
    return new ResponseDto({ success: true, data: result });
  } catch (err) {
    console.error('Error during onboarding:', err);
    return new ResponseDto({ success: false, error: 'Failed to complete onboarding' });
  }
}
