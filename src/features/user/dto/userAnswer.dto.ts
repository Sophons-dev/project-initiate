export type UserAnswerDto = {
  id: string;
  userId: string;
  questionId: string;
  version: number;
  value: string;
  answeredAt: Date;
};
