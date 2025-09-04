'use server';

import { SYSTEM_PROMPT } from './contants';
import { RecommendationsSchema } from './types';
import { zodTextFormat } from 'openai/helpers/zod';
import OpenAI from 'openai';

const openai = new OpenAI();

export async function generateRecommendations({
  context,
  recommendationCount = 10,
}: {
  context: string;
  recommendationCount?: number;
}) {
  try {
    const response = await openai.responses.parse({
      model: 'gpt-5-nano',
      input: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: `Based on the ${context} process and generate a list of ${recommendationCount} recommendations.`,
        },
      ],
      tools: [{ type: 'web_search' }],
      text: {
        format: zodTextFormat(RecommendationsSchema, 'recommendations'),
      },
    });

    if (!response.output_parsed) {
      throw new Error('No recommendations generated');
    }

    return response.output_parsed;
  } catch (error) {
    console.error('Error generating insight:', error);
    throw error;
  }
}
