import { db } from '@/lib/db';

export async function createUser(userData: {
  clerkId: string;
  name?: string;
  email?: string;
  image?: string;
}) {
  console.log('Creating user with data:', userData);
  try {
    const user = await db.user.create({
      data: {
        clerkId: userData.clerkId,
        email: userData.email,
        // Initialize embedded objects with default values
        profile: {
          name: userData.name,
          image: userData.image,
        },
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

export async function updateUserProfile(
  userId: string,
  profileData: {
    name?: string;
    image?: string;
    location?: string;
    organization?: string;
    position?: string;
    website?: string;
    gender?: string;
    dateOfBirth?: Date;
  }
) {
  try {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        profile: profileData,
      },
    });
    return { success: true, data: updatedUser };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { success: false, error: 'Failed to update user profile' };
  }
}

export async function updateUser(
  userId: string,
  updateData: {
    email?: string;
    emailVerified?: Date;
    name?: string;
    image?: string;
    location?: string;
    organization?: string;
    position?: string;
    website?: string;
    gender?: string;
    dateOfBirth?: Date;
    interests?: string[];
    goals?: string;
    preferredOpportunityTypes?: string[];
    skills?: string[];
    learningStyle?: string;
    availability?: string;
    preferredWorkEnv?: string;
    remoteFriendly?: boolean;
  }
) {
  try {
    const updatePayload: any = {};

    // Handle basic fields
    if (updateData.email !== undefined) updatePayload.email = updateData.email;
    if (updateData.emailVerified !== undefined)
      updatePayload.emailVerified = updateData.emailVerified;

    // Handle profile fields
    if (
      Object.keys(updateData).some(key =>
        [
          'name',
          'image',
          'location',
          'organization',
          'position',
          'website',
          'gender',
          'dateOfBirth',
        ].includes(key)
      )
    ) {
      updatePayload.profile = {};
      if (updateData.name !== undefined)
        updatePayload.profile.name = updateData.name;
      if (updateData.image !== undefined)
        updatePayload.profile.image = updateData.image;
      if (updateData.location !== undefined)
        updatePayload.profile.location = updateData.location;
      if (updateData.organization !== undefined)
        updatePayload.profile.organization = updateData.organization;
      if (updateData.position !== undefined)
        updatePayload.profile.position = updateData.position;
      if (updateData.website !== undefined)
        updatePayload.profile.website = updateData.website;
      if (updateData.gender !== undefined)
        updatePayload.profile.gender = updateData.gender;
      if (updateData.dateOfBirth !== undefined)
        updatePayload.profile.dateOfBirth = updateData.dateOfBirth;
    }

    // Handle preferences fields
    if (
      Object.keys(updateData).some(key =>
        ['interests', 'goals', 'preferredOpportunityTypes', 'skills'].includes(
          key
        )
      )
    ) {
      updatePayload.preferences = {};
      if (updateData.interests !== undefined)
        updatePayload.preferences.interests = updateData.interests;
      if (updateData.goals !== undefined)
        updatePayload.preferences.goals = updateData.goals;
      if (updateData.preferredOpportunityTypes !== undefined)
        updatePayload.preferences.preferredOpportunityTypes =
          updateData.preferredOpportunityTypes;
      if (updateData.skills !== undefined)
        updatePayload.preferences.skills = updateData.skills;
      updatePayload.preferences.preferencesUpdatedAt = new Date();
    }

    // Handle model data fields
    if (
      Object.keys(updateData).some(key =>
        [
          'learningStyle',
          'availability',
          'preferredWorkEnv',
          'remoteFriendly',
        ].includes(key)
      )
    ) {
      updatePayload.modelData = {};
      if (updateData.learningStyle !== undefined)
        updatePayload.modelData.learningStyle = updateData.learningStyle;
      if (updateData.availability !== undefined)
        updatePayload.modelData.availability = updateData.availability;
      if (updateData.preferredWorkEnv !== undefined)
        updatePayload.modelData.preferredWorkEnv = updateData.preferredWorkEnv;
      if (updateData.remoteFriendly !== undefined)
        updatePayload.modelData.remoteFriendly = updateData.remoteFriendly;
      updatePayload.modelData.updatedAt = new Date();
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: updatePayload,
    });
    return { success: true, data: updatedUser };
  } catch (error) {
    console.error('Error updating user:', error);
    return { success: false, error: 'Failed to update user' };
  }
}

export async function deleteUser(userId: string) {
  try {
    const deletedUser = await db.user.delete({
      where: { id: userId },
    });
    return { success: true, data: deletedUser };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, error: 'Failed to delete user' };
  }
}

export async function updateOnboardingStatus() {
  // This function uses Clerk auth and should only be called from server components
  // Implementation depends on your auth setup
  throw new Error(
    'This function should be implemented with proper auth context'
  );
}

export async function updateUserPreferences(
  userId: string,
  preferencesData: {
    interests?: string[];
    goals?: string;
    preferredOpportunityTypes?: string[];
    skills?: string[];
  }
) {
  try {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        preferences: {
          ...preferencesData,
          preferencesUpdatedAt: new Date(),
        },
      },
    });
    return { success: true, data: updatedUser };
  } catch (error) {
    console.error('Error updating user preferences:', error);
    return { success: false, error: 'Failed to update user preferences' };
  }
}

export async function updateUserModelData(
  userId: string,
  modelData: {
    learningStyle?: string;
    availability?: string;
    preferredWorkEnv?: string;
    remoteFriendly?: boolean;
  }
) {
  try {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        modelData: {
          ...modelData,
          updatedAt: new Date(),
        },
      },
    });
    return { success: true, data: updatedUser };
  } catch (error) {
    console.error('Error updating user model data:', error);
    return { success: false, error: 'Failed to update user model data' };
  }
}

/**
 * Update user type (called when onboarding is complete)
 */
export async function updateUserType(
  userId: string,
  userType: 'student' | 'professional'
) {
  try {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        userType,
      },
    });
    return { success: true, data: updatedUser };
  } catch (error) {
    console.error('Error updating user type:', error);
    return { success: false, error: 'Failed to update user type' };
  }
}

export async function getUserByClerkId(id: string) {
  try {
    const user = await db.user.findFirst({
      where: { clerkId: id },
      include: {
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

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: {
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
