'use server';

import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { SYSTEM_PROMPT } from './contants';
import { RecommendationSchema } from './types';

export async function generateRecommendations({
  context,
  recommendationCount,
}: {
  context: string;
  recommendationCount: number;
}) {
  try {
    const result = await generateObject({
      model: google('gemini-2.5-pro'),
      system: SYSTEM_PROMPT,
      schema: RecommendationSchema,
      prompt: `Based on the ${context} process and generate a list of ${recommendationCount} recommendations.`,
    });

    console.log(result);
  } catch (error) {
    console.error('Error generating recommendations:', error);
    throw error;
  }
}
