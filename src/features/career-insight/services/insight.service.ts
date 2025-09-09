'use server';

import { generateInsight } from '@/lib/agents/insight-agent/insight-generator';
import { InsightSchema } from '@/lib/agents/insight-agent/types';
import z from 'zod';

export async function generateInsightsForUser(context: string): Promise<z.infer<typeof InsightSchema>> {
  return await generateInsight({ context });
}
