import type { Metadata } from "next";
import { ApplicationList } from "@/components/features/seeker";
import { PageHeader } from "@/components/ui";
import { MOCK_SEEKER_APPLICATIONS } from "@/mocks";

export const metadata: Metadata = {
  title: "My Applications",
};

export default function SeekerApplicationsPage() {
  return (
    <div>
      <PageHeader title="My Applications" description="Track every application you've submitted." />
      <ApplicationList applications={MOCK_SEEKER_APPLICATIONS} />
    </div>
  );
}
