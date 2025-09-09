'use server';

import { generateInsight } from '@/lib/agents/insight-agent/insight-generator';

/**
 * Generates insights for a user from the given textual context.
 *
 * @param context - Text describing the user, their resume, goals, or other relevant information used to produce insights.
 * @returns The insights produced by the insight generator (as returned by `generateInsight`).
 */
export async function generateInsightsForUser(context: string) {
  return await generateInsight({ context });
}
