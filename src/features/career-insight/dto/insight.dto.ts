export type CareerInsightDto = {
  id: string;
  userId: string;
  summary: string;
  recommendedPaths?: Record<string, unknown> | null;
  skillsGap?: Record<string, unknown> | null;
  strengths?: Record<string, unknown> | null;
  interests?: Record<string, unknown> | null;
  experienceLevel?: string | null;
  preferredRoles?: Record<string, unknown> | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};
