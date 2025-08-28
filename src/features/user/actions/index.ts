'use server';

import { db } from '@/lib/db';
import { User, EducationLevel } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';
import { Prisma } from '@prisma/client';

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
        onboardingCompleted: false,
        profile: {
          name: userData.name,
          image: userData.image,
        },
      },
    });
    return { success: true, data: user };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, error: 'Failed to create user' };
  }
}

type UserResult =
  | { success: true; data: User }
  | { success: false; error: string };

export async function getUser(
  key: 'id' | 'clerkId',
  value: string
): Promise<UserResult> {
  try {
    const user = await db.user.findFirst({
      where: { [key]: value },
      include: {
        careerInsight: true,
        careerInsightLogs: true,
        opportunityRecommendations: true,
        userAnswers: true,
        userOpportunities: true,
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

const gradeLevelMap: Record<string, EducationLevel> = {
  primary: EducationLevel.primary,
  secondary: EducationLevel.secondary,
  bachelor: EducationLevel.bachelor,
  master: EducationLevel.master,
  doctorate: EducationLevel.doctorate,
  diploma: EducationLevel.diploma,
  certificate: EducationLevel.certificate,
  other: EducationLevel.other,
};

export async function onboardUser(onboardingData: {
  userType: 'student' | 'professional';
  fullName: string;
  contactInfo: string;
  dateOfBirth: string;
  gender: string;
  gradeLevel?: string;
  school: string;
  location: string;
  interests: string[];
  answers: Record<string, string | string[]>;
  wantsAdvancedQuestions: boolean;
  agreedToTerms: boolean;
}) {
  console.log('Onboarding user with data:', onboardingData);

  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error('User not authenticated');
    }

    // Convert dateOfBirth string to Date object
    const dateOfBirth = new Date(onboardingData.dateOfBirth);

    // Update user profile and basic info
    const level = onboardingData.gradeLevel;

    const updatedUser = await db.user.update({
      where: { clerkId: userId },
      data: {
        userType: onboardingData.userType,
        onboardingCompleted: true,
        profile: {
          name: onboardingData.fullName,
          gender: onboardingData.gender,
          dateOfBirth: dateOfBirth,
          phoneNumber: onboardingData.contactInfo,
          interests: onboardingData.interests,
          location: onboardingData.location,
          education: {
            school: onboardingData.school,
            level:
              gradeLevelMap[onboardingData.gradeLevel] || EducationLevel.other,
          },
        },
        updatedAt: new Date(),
      },
    });

    // Create user answers for each question
    const userAnswers = await Promise.all(
      Object.entries(onboardingData.answers).map(
        async ([questionId, answer]) => {
          const answerValue = Array.isArray(answer)
            ? answer.join(', ')
            : answer;

          // get user id from clerkId
          const user = await db.user.findFirst({
            where: { clerkId: userId },
          });
          if (!user) {
            throw new Error('User not found');
          }

          return await db.userAnswer.create({
            data: {
              userId: user.id,
              questionId: questionId,
              value: answerValue,
              answeredAt: new Date(),
            },
          });
        }
      )
    );

    console.log(`✅ Onboarding completed for user ${userId}`);
    console.log(`📝 Created ${userAnswers.length} user answers`);

    return {
      success: true,
      data: {
        user: updatedUser,
        userAnswers: userAnswers,
      },
    };
  } catch (error) {
    console.error('Error during onboarding:', error);
    return {
      success: false,
      error: 'Failed to complete onboarding',
    };
  }
}

// export async function updateUserProfile(
//   userId: string,
//   profileData: {
//     name?: string;
//     image?: string;
//     location?: string;
//     organization?: string;
//     position?: string;
//     website?: string;
//     gender?: string;
//     dateOfBirth?: Date;
//   }
// ) {
//   try {
//     const updatedUser = await db.user.update({
//       where: { id: userId },
//       data: {
//         profile: profileData,
//       },
//     });
//     return { success: true, data: updatedUser };
//   } catch (error) {
//     console.error('Error updating user profile:', error);
//     return { success: false, error: 'Failed to update user profile' };
//   }
// }

// export async function updateUser(
//   userId: string,
//   updateData: {
//     email?: string;
//     emailVerified?: Date;
//     name?: string;
//     image?: string;
//     location?: string;
//     organization?: string;
//     position?: string;
//     website?: string;
//     gender?: string;
//     dateOfBirth?: Date;
//     interests?: string[];
//     goals?: string;
//     preferredOpportunityTypes?: string[];
//     skills?: string[];
//     learningStyle?: string;
//     availability?: string;
//     preferredWorkEnv?: string;
//     remoteFriendly?: boolean;
//   }
// ) {
//   try {
//     const updatePayload: Prisma.UserUpdateInput = {};

//     // Handle basic fields
//     if (updateData.email !== undefined) updatePayload.email = updateData.email;
//     if (updateData.emailVerified !== undefined)
//       updatePayload.emailVerified = updateData.emailVerified;

//     // Handle profile fields
//     if (
//       Object.keys(updateData).some(key =>
//         [
//           'name',
//           'image',
//           'location',
//           'organization',
//           'position',
//           'website',
//           'gender',
//           'dateOfBirth',
//         ].includes(key)
//       )
//     ) {
//       updatePayload.profile = {};
//       if (updateData.name !== undefined)
//         updatePayload.profile.name = updateData.name;
//       if (updateData.image !== undefined)
//         updatePayload.profile.image = updateData.image;
//       if (updateData.location !== undefined)
//         updatePayload.profile.location = updateData.location;
//       if (updateData.organization !== undefined)
//         updatePayload.profile.organization = updateData.organization;
//       if (updateData.position !== undefined)
//         updatePayload.profile.position = updateData.position;
//       if (updateData.website !== undefined)
//         updatePayload.profile.website = updateData.website;
//       if (updateData.gender !== undefined)
//         updatePayload.profile.gender = updateData.gender;
//       if (updateData.dateOfBirth !== undefined)
//         updatePayload.profile.dateOfBirth = updateData.dateOfBirth;
//     }

//     // Handle preferences fields
//     if (
//       Object.keys(updateData).some(key =>
//         ['interests', 'goals', 'preferredOpportunityTypes', 'skills'].includes(
//           key
//         )
//       )
//     ) {
//       updatePayload.preferences = {};
//       if (updateData.interests !== undefined)
//         updatePayload.preferences.interests = updateData.interests;
//       if (updateData.goals !== undefined)
//         updatePayload.preferences.goals = updateData.goals;
//       if (updateData.preferredOpportunityTypes !== undefined)
//         updatePayload.preferences.preferredOpportunityTypes =
//           updateData.preferredOpportunityTypes;
//       if (updateData.skills !== undefined)
//         updatePayload.preferences.skills = updateData.skills;
//       updatePayload.preferences.preferencesUpdatedAt = new Date();
//     }

//     // Handle model data fields
//     if (
//       Object.keys(updateData).some(key =>
//         [
//           'learningStyle',
//           'availability',
//           'preferredWorkEnv',
//           'remoteFriendly',
//         ].includes(key)
//       )
//     ) {
//       updatePayload.modelData = {};
//       if (updateData.learningStyle !== undefined)
//         updatePayload.modelData.learningStyle = updateData.learningStyle;
//       if (updateData.availability !== undefined)
//         updatePayload.modelData.availability = updateData.availability;
//       if (updateData.preferredWorkEnv !== undefined)
//         updatePayload.modelData.preferredWorkEnv = updateData.preferredWorkEnv;
//       if (updateData.remoteFriendly !== undefined)
//         updatePayload.modelData.remoteFriendly = updateData.remoteFriendly;
//       updatePayload.modelData.updatedAt = new Date();
//     }

//     const updatedUser = await db.user.update({
//       where: { id: userId },
//       data: updatePayload,
//     });
//     return { success: true, data: updatedUser };
//   } catch (error) {
//     console.error('Error updating user:', error);
//     return { success: false, error: 'Failed to update user' };
//   }
// }

// export async function deleteUser(userId: string) {
//   try {
//     const deletedUser = await db.user.delete({
//       where: { id: userId },
//     });
//     return { success: true, data: deletedUser };
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     return { success: false, error: 'Failed to delete user' };
//   }
// }

export async function updateOnboardingStatus() {
  const { userId, isAuthenticated } = await auth();

  if (!userId && !isAuthenticated) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const user = await db.user.update({
      where: { clerkId: userId },
      data: {
        onboardingCompleted: true,
      },
    });
    return { success: true, data: user };
  } catch (error) {
    console.error('Error updating onboarding status:', error);

    return { success: false, error: 'Failed to update onboarding status' };
  }
}

// export async function updateUserPreferences(
//   userId: string,
//   preferencesData: {
//     interests?: string[];
//     goals?: string;
//     preferredOpportunityTypes?: string[];
//     skills?: string[];
//   }
// ) {
//   try {
//     const updatedUser = await db.user.update({
//       where: { id: userId },
//       data: {
//         preferences: {
//           ...preferencesData,
//           preferencesUpdatedAt: new Date(),
//         },
//       },
//     });
//     return { success: true, data: updatedUser };
//   } catch (error) {
//     console.error('Error updating user preferences:', error);
//     return { success: false, error: 'Failed to update user preferences' };
//   }
// }

// export async function updateUserModelData(
//   userId: string,
//   modelData: {
//     learningStyle?: string;
//     availability?: string;
//     preferredWorkEnv?: string;
//     remoteFriendly?: boolean;
//   }
// ) {
//   try {
//     const updatedUser = await db.user.update({
//       where: { id: userId },
//       data: {
//         modelData: {
//           ...modelData,
//           updatedAt: new Date(),
//         },
//       },
//     });
//     return { success: true, data: updatedUser };
//   } catch (error) {
//     console.error('Error updating user model data:', error);
//     return { success: false, error: 'Failed to update user model data' };
//   }
// }

// /**
//  * Update user type (called when onboarding is complete)
//  */
// export async function updateUserType(
//   userId: string,
//   userType: 'student' | 'professional'
// ) {
//   try {
//     const updatedUser = await db.user.update({
//       where: { id: userId },
//       data: {
//         userType,
//       },
//     });
//     return { success: true, data: updatedUser };
//   } catch (error) {
//     console.error('Error updating user type:', error);
//     return { success: false, error: 'Failed to update user type' };
//   }
// }

// export async function getUserByClerkId(id: string) {
//   try {
//     const user = await db.user.findFirst({
//       where: { clerkId: id },
//       include: {
//         opportunities: true,
//         questionAnswers: true,
//         recommendations: true,
//         careerInsights: true,
//         careerInsightLogs: true,
//       },
//     });

//     if (!user) {
//       return { success: false, error: 'User not found' };
//     }

//     return { success: true, data: user };
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     return { success: false, error: 'Failed to fetch user' };
//   }
// }

// export async function getUserById(id: string) {
//   try {
//     const user = await db.user.findUnique({
//       where: { id },
//       include: {
//         opportunities: true,
//         questionAnswers: true,
//         recommendations: true,
//         careerInsights: true,
//         careerInsightLogs: true,
//       },
//     });

//     if (!user) {
//       return { success: false, error: 'User not found' };
//     }

//     return { success: true, data: user };
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     return { success: false, error: 'Failed to fetch user' };
//   }
// }
