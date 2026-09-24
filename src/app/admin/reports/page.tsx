import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { ReportsAnalytics } from "@/components/features/admin";
import { MOCK_APPLICATION_FUNNEL, MOCK_MONTHLY_ACTIVITY, MOCK_TOP_SKILLS } from "@/mocks";

export const metadata: Metadata = {
  title: "Reports & Analytics",
};

export default function AdminReportsPage() {
  return (
    <>
      <PageHeader
        title="Reports & analytics"
        description="Platform-wide trends across sign-ups, applications and skills demand."
      />
      <ReportsAnalytics
        monthlyActivity={MOCK_MONTHLY_ACTIVITY}
        funnel={MOCK_APPLICATION_FUNNEL}
        topSkills={MOCK_TOP_SKILLS}
      />
    </>
  );
}
