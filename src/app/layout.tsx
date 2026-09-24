import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChatWidget } from "@/components/features/chatbot";
import { APP_DESCRIPTION, APP_NAME, APP_TAGLINE } from "@/constants";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} – ${APP_TAGLINE}`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
