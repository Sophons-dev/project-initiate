export type QuestionCategory = 'onboarding' | 'personalization';
export type QuestionType = 'single_choice' | 'multi_choice' | 'text' | 'scale';
export type ProcessingType = 'direct' | 'ai' | 'custom';
export type QuestionStage = 'onboarding' | 'personalization' | 'both';
export type UserType = 'student' | 'professional';

export interface Question {
  id: string;
  version: number;
  text: string;
  targetField: string;
  type: QuestionType;
  options: string[];
  isActive: boolean;
  order: number | null;
  stage: QuestionStage;
  userTypes: UserType[];
  createdAt: Date;
  updatedAt: Date;
}
