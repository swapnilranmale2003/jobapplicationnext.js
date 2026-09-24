"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { ApplyModal } from "./apply-modal";

type ApplyButtonProps = {
  jobTitle: string;
  company: string;
  alreadyApplied?: boolean;
};

/** Apply CTA that opens the confirmation modal and flips to an "Applied" state. */
export function ApplyButton({ jobTitle, company, alreadyApplied = false }: ApplyButtonProps) {
  const [open, setOpen] = useState(false);
  const [applied, setApplied] = useState(alreadyApplied);

  return (
    <>
      <Button
        variant={applied ? "secondary" : "primary"}
        icon={applied ? "checkCircle" : "send"}
        disabled={applied}
        onClick={() => setOpen(true)}
      >
        {applied ? "Applied" : "Apply now"}
      </Button>
      <ApplyModal
        open={open}
        onClose={() => setOpen(false)}
        jobTitle={jobTitle}
        company={company}
        onApplied={() => setApplied(true)}
      />
    </>
  );
}
