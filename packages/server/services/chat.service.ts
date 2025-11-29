import { GoogleGenAI } from '@google/genai';
import { getFullConversation } from '../repositories/conversation.repository';
import { string } from 'zod';

// Implementation detail
const client = new GoogleGenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

interface ChatResponse {
   user: string;
   message: string | undefined;
}
// public interface
// Leaky abstraction
export const chatService = {
   async sendMessage(prompt: string, user: string): Promise<ChatResponse> {
      const response = await client.models.generateContent({
         model: 'gemini-2.5-flash',
         contents: getFullConversation(prompt, user),
      });
      return {
         user: user,
         message: response.text,
      };
   },
};
