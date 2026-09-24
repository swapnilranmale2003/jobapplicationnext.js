"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui";
import chatbotConfig from "@/mocks/chatbot-questions.json";
import type { ChatbotConfig, ChatMessage } from "@/types";
import { cn, findChatbotAnswer } from "@/utils";
import styles from "./chat-widget.module.css";

const config: ChatbotConfig = chatbotConfig;
const REPLY_DELAY_MS = 700;
const SUGGESTION_COUNT = 4;

let messageId = 0;
const createMessage = (role: ChatMessage["role"], text: string): ChatMessage => ({
  id: `msg-${++messageId}`,
  role,
  text,
});

/**
 * Floating AI assistant. UI only: answers come from src/mocks/chatbot-questions.json
 * via keyword matching — no AI service is called.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    createMessage("bot", config.greeting),
  ]);
  const [askedIds, setAskedIds] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const suggestions = config.questions
    .filter((item) => !askedIds.includes(item.id))
    .slice(0, SUGGESTION_COUNT);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  function ask(text: string) {
    const question = text.trim();
    if (!question || typing) return;

    setMessages((current) => [...current, createMessage("user", question)]);
    setInput("");
    setTyping(true);

    const match = findChatbotAnswer(question, config.questions);
    if (match) setAskedIds((current) => [...current, match.id]);

    timerRef.current = setTimeout(() => {
      setMessages((current) => [...current, createMessage("bot", match?.answer ?? config.fallback)]);
      setTyping(false);
    }, REPLY_DELAY_MS);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(input);
  }

  return (
    <div className={styles.root}>
      {open && (
        <section className={styles.panel} aria-label={config.botName} role="dialog">
          <header className={styles.header}>
            <span className={styles.avatar}>
              <Icon name="sparkles" size={18} />
            </span>
            <div className={styles.headerText}>
              <p className={styles.title}>{config.botName}</p>
              <p className={styles.status}>
                <span className={styles.statusDot} /> Online
              </p>
            </div>
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <Icon name="x" size={18} />
            </button>
          </header>

          <div ref={listRef} className={styles.messages} aria-live="polite">
            {messages.map((message) => (
              <p
                key={message.id}
                className={cn(styles.message, message.role === "user" ? styles.user : styles.bot)}
              >
                {message.text}
              </p>
            ))}
            {typing && (
              <p className={cn(styles.message, styles.bot, styles.typing)} aria-label="Assistant is typing">
                <span />
                <span />
                <span />
              </p>
            )}
          </div>

          {suggestions.length > 0 && (
            <div className={styles.suggestions}>
              <p className={styles.suggestionsLabel}>Suggested questions</p>
              <div className={styles.chips}>
                {suggestions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={styles.chip}
                    onClick={() => ask(item.question)}
                    disabled={typing}
                  >
                    {item.question}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              className={styles.input}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your question…"
              aria-label="Your question"
              maxLength={200}
            />
            <button
              type="submit"
              className={styles.send}
              disabled={!input.trim() || typing}
              aria-label="Send"
            >
              <Icon name="send" size={16} />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className={cn(styles.launcher, open && styles.launcherOpen)}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open AI assistant"}
      >
        <Icon name={open ? "x" : "messageCircle"} size={22} />
        {!open && <span className={styles.launcherLabel}>Ask AI</span>}
      </button>
    </div>
  );
}
