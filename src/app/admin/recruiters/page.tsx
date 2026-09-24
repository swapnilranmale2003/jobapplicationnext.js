import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { ManageRecruiters } from "@/components/features/admin";
import { MOCK_RECRUITER_ACCOUNTS } from "@/mocks";

export const metadata: Metadata = {
  title: "Manage Recruiters",
};

export default function AdminRecruitersPage() {
  return (
    <>
      <PageHeader
        title="Manage recruiters"
        description="Verify recruiter accounts and manage access."
      />
      <ManageRecruiters recruiters={MOCK_RECRUITER_ACCOUNTS} />
    </>
  );
}
