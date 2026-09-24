import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { SystemSettings } from "@/components/features/admin";

export const metadata: Metadata = {
  title: "System Settings",
};

export default function AdminSettingsPage() {
  return (
    <>
      <PageHeader
        title="System settings"
        description="Configure AI features, notifications and platform thresholds."
      />
      <SystemSettings />
    </>
  );
}
