import { EducationLevel, UserType } from '@prisma/client';

export type UserDto = {
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
    education?: {
      school: string;
      level: EducationLevel;
    };
  };
};
