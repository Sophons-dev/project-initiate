import { UserType } from '@prisma/client';

export type GetUserParams = {
  key: 'id' | 'clerkId';
  value: string;
};

export type CreateUserParams = {
  clerkId: string;
  name?: string;
  email?: string;
  image?: string;
};

export type OnboardUserParams = {
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
