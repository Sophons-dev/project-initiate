import { EducationLevel, UserType, Gender } from '@prisma/client';
import { CareerInsightDto } from '@/features/career-insight/dto/insight.dto';
import { UserAnswerDto } from './userAnswer.dto';
import { CareerInsightLogDto } from './careerInsightLog.dto';
import { UserOpportunityDto } from './userOpportunity.dto';

export type UserDto = {
  id: string;
  clerkId: string;
  email: string;
  userType: UserType;
  onboardingCompleted: boolean;
  profile?: {
    name: string;
    image: string | null;
    gender: Gender | null;
    dateOfBirth: Date | null;
    phoneNumber: string | null;
    location: string | null;
    interests: string[];
    education?: {
      school: string | null;
      degree: string | null;
      level: EducationLevel;
    };
  };
  careerInsight?: CareerInsightDto | null;
  careerInsightLogs?: CareerInsightLogDto[];
  userAnswers?: UserAnswerDto[];
  userOpportunities?: UserOpportunityDto[];
};
