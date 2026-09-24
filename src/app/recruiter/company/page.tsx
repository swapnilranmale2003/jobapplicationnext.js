import type { Metadata } from "next";
import { Card, PageHeader } from "@/components/ui";
import { CompanyProfileForm } from "@/components/features/recruiter";

export const metadata: Metadata = {
  title: "Company profile",
};

export default function RecruiterCompanyPage() {
  return (
    <>
      <PageHeader
        title="Company profile"
        description="Keep your company details up to date for candidates viewing your postings."
      />
      <Card>
        <CompanyProfileForm />
      </Card>
    </>
  );
}
