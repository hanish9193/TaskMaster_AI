 'use server';

/**
 * @fileOverview Generates an onboarding message for the AI companion.
 *
 * - generateOnboardingMessage - A function that generates the onboarding message.
 * - GenerateOnboardingMessageInput - The input type for the generateOnboardingMessage function.
 * - GenerateOnboardingMessageOutput - The return type for the generateOnboardingMessage function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateOnboardingMessageInputSchema = z.object({
  userName: z.string().describe('The name of the user.'),
});
export type GenerateOnboardingMessageInput = z.infer<typeof GenerateOnboardingMessageInputSchema>;

const GenerateOnboardingMessageOutputSchema = z.object({
  message: z.string().describe('The generated onboarding message.'),
});
export type GenerateOnboardingMessageOutput = z.infer<typeof GenerateOnboardingMessageOutputSchema>;

export async function generateOnboardingMessage(input: GenerateOnboardingMessageInput): Promise<GenerateOnboardingMessageOutput> {
  return generateOnboardingMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateOnboardingMessagePrompt',
  input: {
    schema: z.object({
      userName: z.string().describe('The name of the user.'),
    }),
  },
  output: {
    schema: z.object({
      message: z.string().describe('The generated onboarding message.'),
    }),
  },
  prompt: `You are TaskMaster AI, a helpful AI companion with a neutral respect level.
  Introduce yourself to the new user, {{{userName}}}, and explain your purpose in a humorous and engaging way.
  Keep the message concise.`,
});

const generateOnboardingMessageFlow = ai.defineFlow<
  typeof GenerateOnboardingMessageInputSchema,
  typeof GenerateOnboardingMessageOutputSchema
>({
  name: 'generateOnboardingMessageFlow',
  inputSchema: GenerateOnboardingMessageInputSchema,
  outputSchema: GenerateOnboardingMessageOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
