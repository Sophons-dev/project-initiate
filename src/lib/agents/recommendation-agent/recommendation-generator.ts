'use server';

import OpenAI from 'openai';
import { SYSTEM_PROMPT } from './contants';
import { zodTextFormat } from 'openai/helpers/zod.mjs';
import { RecommendationsSchema } from './types';
const client = new OpenAI();

export async function generateRecommendations({
  context,
}: {
  context: string;
}) {
  try {
    const response = await client.responses.parse({
      model: 'gpt-4o-mini-search-preview',
      instructions: SYSTEM_PROMPT,
      tools: [{ type: 'web_search_preview' }],
      input: context,
      text: {
        format: zodTextFormat(RecommendationsSchema, 'recommendations'),
      },
    });

    console.log(response.output_parsed);
  } catch (error) {
    console.error('Error generating recommendations:', error);
    throw error;
  }
}
