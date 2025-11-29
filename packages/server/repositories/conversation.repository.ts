// Implemenatation detail
interface Content {
   role: string;
   parts: [
      {
         text: string | undefined;
      },
   ];
}

const conversations = new Map<string, Content[]>();

// Export public interface
export function getFullConversation(prompt: string, user: string) {
   let chatHistory = conversations.get(user);
   if (!chatHistory) {
      chatHistory = [];
   }

   const newMsgObject: Content = {
      role: 'user',
      parts: [{ text: prompt }],
   };

   const fullConversation = [...chatHistory, newMsgObject];

   chatHistory.push(newMsgObject);
   chatHistory.push({ role: 'model', parts: [{ text: prompt }] });

   conversations.set(user, chatHistory);

   return fullConversation;
}
