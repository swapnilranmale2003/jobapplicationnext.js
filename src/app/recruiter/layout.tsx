import { AppShell } from "@/components/layout";

export default function RecruiterLayout({ children }: LayoutProps<"/recruiter">) {
  return <AppShell role="recruiter">{children}</AppShell>;
}
