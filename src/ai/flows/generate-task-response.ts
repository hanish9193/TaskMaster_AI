// src/ai/flows/generate-task-response.ts
'use server';

/**
 * @fileOverview Generates personalized and humorous responses from the AI companion based on the user's task completion rate.
 *
 * - generateTaskResponse - A function that generates the AI response.
 * - GenerateTaskResponseInput - The input type for the generateTaskResponse function.
 * - GenerateTaskResponseOutput - The return type for the generateTaskResponse function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateTaskResponseInputSchema = z.object({
  respectLevel: z
    .number()
    .describe(
      'The respect level of the user, which determines the AI character’s tone and behavior. Higher values indicate more respect.'
    ),
  taskCompletionRate: z
    .number()
    .describe(
      'The task completion rate of the user, represented as a decimal between 0 and 1.'
    ),
  lastTaskCompleted: z
    .boolean()
    .describe('Indicates whether the last task was completed or not.'),
});
export type GenerateTaskResponseInput = z.infer<typeof GenerateTaskResponseInputSchema>;

const GenerateTaskResponseOutputSchema = z.object({
  response: z.string().describe('The AI companion’s response.'),
});
export type GenerateTaskResponseOutput = z.infer<typeof GenerateTaskResponseOutputSchema>;

export async function generateTaskResponse(input: GenerateTaskResponseInput): Promise<GenerateTaskResponseOutput> {
  return generateTaskResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTaskResponsePrompt',
  input: {
    schema: z.object({
      respectLevel: z
        .number()
        .describe(
          'The respect level of the user, which determines the AI character’s tone and behavior. Higher values indicate more respect.'
        ),
      taskCompletionRate: z
        .number()
        .describe(
          'The task completion rate of the user, represented as a decimal between 0 and 1.'
        ),
      lastTaskCompleted: z
        .boolean()
        .describe('Indicates whether the last task was completed or not.'),
    }),
  },
  output: {
    schema: z.object({
      response: z.string().describe('The AI companion’s response.'),
    }),
  },
  prompt: `
You are an AI companion whose behavior changes based on the user's task completion rate and respect level.

Use the following information to generate a personalized and humorous response. The goal is to create an engaging and emotionally dynamic interaction.

Respect Level: {{{respectLevel}}}
Task Completion Rate: {{{taskCompletionRate}}}
Last Task Completed: {{{lastTaskCompleted}}}

Instructions:

- If the respect level is high (e.g., above 7), be supportive, kind, and encouraging.
- If the respect level is medium (e.g., between 4 and 7), be neutral with a hint of humor.
- If the respect level is low (e.g., below 4), be sarcastic, passive-aggressive, or brutally honest, but always in a humorous way.
- Vary the response based on whether the last task was completed or not. Praise them if they completed it; tease them if they didn't.

Response:
`,
});

const generateTaskResponseFlow = ai.defineFlow<
  typeof GenerateTaskResponseInputSchema,
  typeof GenerateTaskResponseOutputSchema
>(
  {
    name: 'generateTaskResponseFlow',
    inputSchema: GenerateTaskResponseInputSchema,
    outputSchema: GenerateTaskResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
