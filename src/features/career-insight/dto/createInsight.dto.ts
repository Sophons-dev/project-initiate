import { CareerInsightDto } from './insight.dto';

export type CreateCareerInsightDto = Omit<CareerInsightDto, 'id' | 'createdAt' | 'updatedAt'>;
