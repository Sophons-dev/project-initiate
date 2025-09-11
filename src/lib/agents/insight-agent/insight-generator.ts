'use server';

import { SYSTEM_PROMPT } from './contants';
import { InsightSchema } from './types';
import { zodTextFormat } from 'openai/helpers/zod';
import OpenAI from 'openai';
import { z } from 'zod';

const openai = new OpenAI();

export async function generateInsight({ context }: { context: string }): Promise<z.infer<typeof InsightSchema>> {
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
          content: `Process the following user profile context and generate a structured career insight JSON aligned with this schema: ${JSON.stringify(
            InsightSchema.shape
          )}.

          Context: ${context}`,
        },
      ],
      text: {
        format: zodTextFormat(InsightSchema, 'careerInsight'),
      },
    });

    if (!response.output_parsed) {
      throw new Error('Failed to generate insight: No output received');
    }

    return InsightSchema.parse(response.output_parsed);
  } catch (error) {
    console.error('Error generating insight:', error);
    throw error;
  }
}
