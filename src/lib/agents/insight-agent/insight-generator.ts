'use server';

import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { SYSTEM_PROMPT } from './contants';
import { InsightSchema } from './types';

export async function generateInsight({ context }: { context: string }) {
  try {
    const response = await generateObject({
      model: google('gemini-2.5-flash'),
      system: SYSTEM_PROMPT,
      schema: InsightSchema,
      prompt: `Based on the ${context} process the contents and generate insights`,
    });

    return response;
  } catch (error) {
    console.error('Error generating insight:', error);
    throw error;
  }
}
