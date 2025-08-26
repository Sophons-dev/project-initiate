import { db } from '@/lib/db';

/**
 * Update user profile during onboarding
 * This should be called when user completes onboarding steps
 */
export async function updateUserProfile(
  userId: string,
  profileData: {
    fullName?: string;
    avatarUrl?: string;
    bio?: string;
    location?: string;
    organization?: string;
    website?: string;
    interests?: string[];
    goals?: string;
    preferredOpportunityTypes?: string[];
    skills?: string[];
  }
) {
  try {
    // Split data into profile and preferences
    const {
      fullName,
      avatarUrl,
      bio,
      location,
      organization,
      website,
      ...preferenceData
    } = profileData;

    const user = await db.user.update({
      where: { id: userId },
      data: {
        profile: {
          fullName,
          avatarUrl,
          bio,
          location,
          organization,
          website,
        },
        preferences: {
          ...preferenceData,
          preferencesUpdatedAt: new Date(),
        },
      },
    });
    return { success: true, data: user };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { success: false, error: 'Failed to update user profile' };
  }
}
