export type CareerInsightLogDto = {
  id: string;
  userId: string;
  triggeredBy?: string | null;
  triggerId?: string | null;
  createdAt?: Date | null;
};
