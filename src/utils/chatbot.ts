import type { ChatbotQuestion } from "@/types";

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Finds the best matching FAQ entry for free-text input.
 * Exact question match wins; otherwise the entry with the most keyword hits (min. 1).
 */
export function findChatbotAnswer(
  input: string,
  questions: ChatbotQuestion[],
): ChatbotQuestion | undefined {
  const text = normalize(input);
  if (!text) return undefined;

  const exact = questions.find((item) => normalize(item.question) === text);
  if (exact) return exact;

  const words = new Set(text.split(" "));
  let best: ChatbotQuestion | undefined;
  let bestScore = 0;

  for (const item of questions) {
    const score = item.keywords.reduce((total, keyword) => {
      const key = normalize(keyword);
      const hit = key.includes(" ") ? text.includes(key) : words.has(key);
      return hit ? total + 1 : total;
    }, 0);
    if (score > bestScore) {
      best = item;
      bestScore = score;
    }
  }

  return best;
}
