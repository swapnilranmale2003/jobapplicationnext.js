import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { ManageJobs } from "@/components/features/admin";
import { MOCK_ADMIN_JOBS } from "@/mocks";

export const metadata: Metadata = {
  title: "Manage Jobs",
};

export default function AdminJobsPage() {
  return (
    <>
      <PageHeader
        title="Manage jobs"
        description="Review job postings and remove fraudulent listings."
      />
      <ManageJobs jobs={MOCK_ADMIN_JOBS} />
    </>
  );
}
