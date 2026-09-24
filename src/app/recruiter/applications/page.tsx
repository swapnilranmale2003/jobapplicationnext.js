import type { Metadata } from "next";
import { ApplicationsView } from "@/components/features/recruiter";

export const metadata: Metadata = {
  title: "Applications",
};

export default function RecruiterApplicationsPage() {
  return <ApplicationsView />;
}
