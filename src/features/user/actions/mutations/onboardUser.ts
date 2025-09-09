'use server';

import { auth } from '@clerk/nextjs/server';
import { OnboardingUserParams } from '@/features/onboarding/types/onboarding';
import { ResponseDto } from '@/lib/dto/response.dto';
import { UserService } from '../../services/user.service';

/**
 * Onboard user
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
