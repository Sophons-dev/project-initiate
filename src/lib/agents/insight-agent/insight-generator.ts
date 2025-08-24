'use server';

import OpenAI from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import { SYSTEM_PROMPT } from './contants';
import { InsightSchema } from './types';

const client = new OpenAI();

export async function generateInsight({ context }: { context: string }) {
  try {
    const response = await client.responses.parse({
      model: 'gpt-4o-mini',
      instructions: SYSTEM_PROMPT,
      input: context,
      text: {
        format: zodTextFormat(InsightSchema, 'insight'),
      },
    });

    return response.output_parsed;
  } catch (error) {
    console.error('Error generating insight:', error);
    throw error;
  }
}
