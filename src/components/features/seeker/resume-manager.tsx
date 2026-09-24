"use client";

import { useState } from "react";
import { Card, CardHeader } from "@/components/ui";
import type { AtsReport, ParsedResume } from "@/types";
import { ResumeDropzone } from "./resume-dropzone";
import { ResumeView } from "./resume-view";
import styles from "./resume-manager.module.css";

type ResumeManagerProps = {
  initialFileName: string;
  initialUploadedAt: string;
  resume: ParsedResume;
  atsReport: AtsReport;
};

/** Owns the "current resume file" state shared by the dropzone and parsed results. */
export function ResumeManager({
  initialFileName,
  initialUploadedAt,
  resume,
  atsReport,
}: ResumeManagerProps) {
  const [fileName, setFileName] = useState(initialFileName);
  const [uploadedAt, setUploadedAt] = useState(initialUploadedAt);

  const handleReplaced = (newFileName: string) => {
    setFileName(newFileName);
    setUploadedAt(new Date().toISOString().slice(0, 10));
  };

  return (
    <div>
      <Card>
        <CardHeader
          title="Resume on file"
          description="Upload a new PDF to re-run AI parsing and ATS analysis."
        />
        <ResumeDropzone
          currentFileName={fileName}
          uploadedAt={uploadedAt}
          onReplaced={handleReplaced}
        />
      </Card>

      <div className={styles.spacer}>
        <ResumeView resume={resume} atsReport={atsReport} />
      </div>
    </div>
  );
}
