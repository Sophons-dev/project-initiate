export type QuestionCategory = 'onboarding' | 'personalization';
export type QuestionType = 'single_choice' | 'multi_choice' | 'text' | 'scale';
export type ProcessingType = 'direct' | 'ai' | 'custom';
export type QuestionStage = 'onboarding' | 'personalization' | 'both';

export interface Question {
  id: string;
  questionText: string;
  questionType: QuestionType;
  category: QuestionCategory;
  options: string[];
  targetField: string;
  userTypes: string[];
  order: number;
  active: boolean;
  processingType: ProcessingType;
  stage: QuestionStage;
  createdAt: Date | null;
  updatedAt: Date | null;
}
