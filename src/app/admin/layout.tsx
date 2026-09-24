import { AppShell } from "@/components/layout";

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <AppShell role="admin">{children}</AppShell>;
}
