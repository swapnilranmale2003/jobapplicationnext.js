import type { Metadata } from "next";
import { ResumeManager } from "@/components/features/seeker";
import { PageHeader } from "@/components/ui";
import { MOCK_ATS_REPORT, MOCK_PARSED_RESUME } from "@/mocks";

export const metadata: Metadata = {
  title: "My Resume",
};

export default function SeekerResumePage() {
  return (
    <div>
      <PageHeader
        title="My Resume"
        description="Upload your resume once — AI parsing and ATS analysis run automatically."
      />
      <ResumeManager
        initialFileName="Aarav_Sharma_Resume.pdf"
        initialUploadedAt="2026-09-15"
        resume={MOCK_PARSED_RESUME}
        atsReport={MOCK_ATS_REPORT}
      />
    </div>
  );
}
