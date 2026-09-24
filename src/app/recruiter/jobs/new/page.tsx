import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { PostJobForm } from "@/components/features/recruiter";

export const metadata: Metadata = {
  title: "Post new job",
};

export default function PostNewJobPage() {
  return (
    <>
      <PageHeader
        title="Post a new job"
        description="Describe the role and required skills — these drive the AI match score."
      />
      <PostJobForm />
    </>
  );
}
