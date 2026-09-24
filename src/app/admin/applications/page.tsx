import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { ViewApplications } from "@/components/features/admin";
import { MOCK_RECRUITER_APPLICATIONS, MOCK_SEEKER_APPLICATIONS } from "@/mocks";
import type { Application } from "@/types";

export const metadata: Metadata = {
  title: "View Applications",
};

function dedupeApplications(...lists: Application[][]): Application[] {
  const seen = new Map<string, Application>();
  for (const list of lists) {
    for (const application of list) {
      seen.set(application.id, application);
    }
  }
  return [...seen.values()];
}

export default function AdminApplicationsPage() {
  const applications = dedupeApplications(MOCK_RECRUITER_APPLICATIONS, MOCK_SEEKER_APPLICATIONS);

  return (
    <>
      <PageHeader
        title="View applications"
        description="Browse every application submitted across the platform."
      />
      <ViewApplications applications={applications} />
    </>
  );
}
