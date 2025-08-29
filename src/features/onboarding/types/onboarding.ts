import { UserType } from '@prisma/client';

export type OnboardingUserParams = {
  userType: UserType;
  fullName: string;
  contactInfo: string;
  dateOfBirth: string;
  gender: string;
  gradeLevel: string;
  school: string;
  location: string;
  interests: string[];
  answers: Record<string, string | string[]>;
  wantsAdvancedQuestions: boolean;
  agreedToTerms: boolean;
};
