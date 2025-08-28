import { EducationLevel, UserType } from '@prisma/client';

export type User = {
  id: string;
  clerkId: string;
  email: string;
  userType: UserType;
  onboardingCompleted: boolean;
  profile?: {
    name: string;
    image: string | null;
    gender: string;
    dateOfBirth: Date;
    phoneNumber: string;
    location: string;
    education: {
      school: string;
      level: EducationLevel;
    };
  };
};

export type GetUserResult =
  | { success: true; data: User }
  | { success: false; error: string };

export type CreateUserResult =
  | { success: true; data: { userId: string } }
  | { success: false; error: string };

export type OnboardUserResult =
  | { success: true; data: { userId: string; onboardingCompleted: boolean } }
  | { success: false; error: string };
