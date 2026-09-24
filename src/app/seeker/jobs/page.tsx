import type { Metadata } from "next";
import { JobSearch } from "@/components/features/seeker";
import { PageHeader } from "@/components/ui";
import { MOCK_JOBS, MOCK_JOB_MATCHES } from "@/mocks";

export const metadata: Metadata = {
  title: "Search Jobs",
};

export default function SeekerJobsPage() {
  return (
    <div>
      <PageHeader title="Search Jobs" description="Find roles matched to your parsed skills." />
      <JobSearch jobs={MOCK_JOBS} matches={MOCK_JOB_MATCHES} />
    </div>
  );
}
