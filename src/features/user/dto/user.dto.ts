import { EducationLevel, UserType } from '@prisma/client';
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
    gender: string;
    dateOfBirth: Date;
    phoneNumber: string;
    location: string;
    education?: {
      school: string;
      level: EducationLevel;
    };
  };
  careerInsight?: CareerInsightDto | null;
  careerInsightLogs?: CareerInsightLogDto[];
  userAnswers?: UserAnswerDto[];
  userOpportunities?: UserOpportunityDto[];
};
