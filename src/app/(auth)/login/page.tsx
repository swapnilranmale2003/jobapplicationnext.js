import type { Metadata } from "next";
import { LoginForm } from "@/components/features/auth";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return <LoginForm />;
}
