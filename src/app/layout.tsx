import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { ChatWidget } from "@/components/features/chatbot";
import { ServiceWorkerRegister } from "@/components/features/pwa";
import { APP_DESCRIPTION, APP_NAME, APP_TAGLINE } from "@/constants";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} – ${APP_TAGLINE}`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1f3a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        {children}
        <ChatWidget />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
