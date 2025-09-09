'use server';

import { generateInsight } from '@/lib/agents/insight-agent/insight-generator';

export async function generateInsightsForUser(context: string) {
  return await generateInsight({ context });
}
