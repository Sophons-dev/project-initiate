'use server';

import { SYSTEM_PROMPT } from './contants';
import { InsightSchema } from './types';
import { zodTextFormat } from 'openai/helpers/zod';
import OpenAI from 'openai';

const openai = new OpenAI();

export async function generateInsight({ context }: { context: string }) {
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
          content: `Based on the ${context} process the contents and generate insights, output in JSON`,
        },
      ],
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
