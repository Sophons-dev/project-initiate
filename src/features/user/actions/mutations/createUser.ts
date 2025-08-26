import { db } from '@/lib/db';

/**
 * Create a new user (minimal data from Clerk)
 * This should be called immediately after Clerk authentication
 */
export async function createUser(userData: {
  clerkId: string;
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
