import { AppShell } from "@/components/layout";

export default function SeekerLayout({ children }: LayoutProps<"/seeker">) {
  return <AppShell role="seeker">{children}</AppShell>;
}
