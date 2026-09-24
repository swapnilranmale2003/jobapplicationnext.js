/**
 * Centralized, typed access to environment variables.
 * NEXT_PUBLIC_* values must be referenced literally so Next.js can inline them.
 */
export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api",
} as const;
