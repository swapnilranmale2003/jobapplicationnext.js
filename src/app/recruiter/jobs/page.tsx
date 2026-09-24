import type { Metadata } from "next";
import { ManageJobsView } from "@/components/features/recruiter";

export const metadata: Metadata = {
  title: "Manage jobs",
};

export default function ManageJobsPage() {
  return <ManageJobsView />;
}
