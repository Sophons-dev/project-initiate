'use server';

import { SYSTEM_PROMPT } from './contants';
import { InsightSchema } from './types';
import { zodTextFormat } from 'openai/helpers/zod';
import OpenAI from 'openai';

const openai = new OpenAI();

/**
 * Generate a structured career insight JSON from a freeform user profile context.
 *
 * Sends the provided context to the OpenAI Responses API using a system prompt and a Zod-based formatter,
 * and returns the model's parsed output validated/structured according to InsightSchema.
 *
 * @param context - Freeform user profile or career context to base the insight on.
 * @returns The parsed career insight object conforming to InsightSchema.
 * @throws Rethrows any errors from the OpenAI API call or response parsing.
 */
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

    return response.output_parsed;
  } catch (error) {
    console.error('Error generating insight:', error);
    throw error;
  }
}
