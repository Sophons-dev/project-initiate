export type QuestionCategory = 'onboarding' | 'personalization';
export type QuestionType = 'single_choice' | 'multi_choice' | 'text' | 'scale';
export type ProcessingType = 'direct' | 'ai' | 'custom';
export type QuestionStage = 'onboarding' | 'personalization' | 'both';

export interface Question {
  id: string;
  question_text: string;
  question_type: QuestionType;
  category: QuestionCategory;
  options?: string[];
  target_field: string;
  user_types: string[];
  order: number;
  active: boolean;
  processing_type: ProcessingType;
  stage: QuestionStage;
  created_at?: Date;
  updated_at?: Date;
}
