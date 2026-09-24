export type ChatbotQuestion = {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
};

export type ChatbotConfig = {
  botName: string;
  greeting: string;
  fallback: string;
  questions: ChatbotQuestion[];
};

export type ChatMessage = {
  id: string;
  role: "bot" | "user";
  text: string;
};
