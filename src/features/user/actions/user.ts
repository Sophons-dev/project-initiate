'use server';

import { db } from '@/lib/db';

/**
 * Create a new user (minimal data from Auth0)
 * This should be called immediately after Auth0 authentication
 */
export async function createUser(userData: {
  auth0Id: string;
  roleId: string;
  name?: string;
  email?: string;
  image?: string;
}) {
  try {
    const user = await db.user.create({
      data: {
        ...userData,
        // Initialize embedded objects with default values
        profile: {},
        preferences: {
          interests: [],
          preferredOpportunityTypes: [],
          skills: [],
          onboardingCompleted: false,
          preferencesUpdatedAt: new Date(),
        },
        modelData: {
          learningStyle: null,
          availability: null,
          preferredWorkEnv: null,
          remoteFriendly: null,
          updatedAt: new Date(),
        },
      },
    });
    return { success: true, data: user };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, error: 'Failed to create user' };
  }
}

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

/**
 * Get user by ID
 */
export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        role: true,
        opportunities: true,
        questionAnswers: true,
        recommendations: true,
        careerInsights: true,
        careerInsightLogs: true,
      },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    return { success: true, data: user };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { success: false, error: 'Failed to fetch user' };
  }
}

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

/**
 * Delete user
 */
export async function deleteUser(id: string) {
  try {
    await db.user.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, error: 'Failed to delete user' };
  }
}

/**
 * Update user onboarding status
 */
export async function updateOnboardingStatus(id: string, completed: boolean) {
  try {
    const user = await db.user.update({
      where: { id },
      data: {
        preferences: {
          onboardingCompleted: completed,
          preferencesUpdatedAt: new Date(),
        },
      },
    });
    return { success: true, data: user };
  } catch (error) {
    console.error('Error updating onboarding status:', error);
    return { success: false, error: 'Failed to update onboarding status' };
  }
}

/**
 * Update user preferences
 */
export async function updateUserPreferences(
  id: string,
  preferences: {
    interests?: string[];
    goals?: string;
    preferredOpportunityTypes?: string[];
    skills?: string[];
  }
) {
  try {
    const user = await db.user.update({
      where: { id },
      data: {
        preferences: {
          ...preferences,
          preferencesUpdatedAt: new Date(),
        },
      },
    });
    return { success: true, data: user };
  } catch (error) {
    console.error('Error updating user preferences:', error);
    return { success: false, error: 'Failed to update user preferences' };
  }
}

/**
 * Update user model data (learning preferences, availability, etc.)
 */
export async function updateUserModelData(
  id: string,
  modelData: {
    learningStyle?: string;
    availability?: string;
    preferredWorkEnv?: string;
    remoteFriendly?: boolean;
  }
) {
  try {
    const user = await db.user.update({
      where: { id },
      data: {
        modelData: {
          ...modelData,
          updatedAt: new Date(),
        },
      },
    });
    return { success: true, data: user };
  } catch (error) {
    console.error('Error updating user model data:', error);
    return { success: false, error: 'Failed to update user model data' };
  }
}
