import { db } from '@/lib/db';

export async function updateUser(
  id: string,
  updateData: Partial<{
    name: string;
    email: string;
    fullName: string;
    avatarUrl: string;
    bio: string;
    location: string;
    organization: string;
    website: string;
    interests: string[];
    goals: string;
    preferredOpportunityTypes: string[];
    skills: string[];
    onboardingCompleted: boolean;
  }>
) {
  try {
    // Destructure nested fields
    const {
      fullName,
      avatarUrl,
      bio,
      location,
      organization,
      website,
      interests,
      goals,
      preferredOpportunityTypes,
      skills,
      onboardingCompleted,
      ...rootFields
    } = updateData;

    // Build update data for embedded objects
    const updatePayload: Record<string, any> = {
      ...rootFields, // top-level fields like name, email
    };

    // Only include profile if any profile fields are provided
    if (
      fullName !== undefined ||
      avatarUrl !== undefined ||
      bio !== undefined ||
      location !== undefined ||
      organization !== undefined ||
      website !== undefined
    ) {
      updatePayload.profile = {
        fullName,
        avatarUrl,
        bio,
        location,
        organization,
        website,
      };
    }

    // Only include preferences if any preference fields are provided
    if (
      interests !== undefined ||
      goals !== undefined ||
      preferredOpportunityTypes !== undefined ||
      skills !== undefined ||
      onboardingCompleted !== undefined
    ) {
      updatePayload.preferences = {
        interests,
        goals,
        preferredOpportunityTypes,
        skills,
        onboardingCompleted,
        preferencesUpdatedAt: new Date(),
      };
    }

    const user = await db.user.update({
      where: { id },
      data: updatePayload,
    });

    return { success: true, data: user };
  } catch (error) {
    console.error('Error updating user:', error);
    return { success: false, error: 'Failed to update user' };
  }
}
