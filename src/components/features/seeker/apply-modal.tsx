"use client";

import { useState } from "react";
import { Button, Icon, Modal, Textarea } from "@/components/ui";
import { MOCK_PARSED_RESUME } from "@/mocks";
import styles from "./apply-modal.module.css";

type ApplyModalProps = {
  open: boolean;
  onClose: () => void;
  jobTitle: string;
  company: string;
  onApplied: () => void;
};

/** Confirmation modal for applying to a job with the parsed resume on file. */
export function ApplyModal({ open, onClose, jobTitle, company, onApplied }: ApplyModalProps) {
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    onClose();
    // Reset after the close animation-less dialog hides.
    window.setTimeout(() => {
      setSubmitted(false);
      setNote("");
    }, 200);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onApplied();
  };

  if (submitted) {
    return (
      <Modal open={open} onClose={handleClose} title="Application submitted">
        <div className={styles.success}>
          <div className={styles.successIcon}>
            <Icon name="checkCircle" size={28} />
          </div>
          <p className={styles.successTitle}>You&apos;re all set!</p>
          <p className={styles.successBody}>
            Your application for {jobTitle} at {company} has been submitted with your resume on file.
          </p>
          <Button variant="primary" onClick={handleClose}>
            Done
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={`Apply to ${jobTitle}`}
      description={company}
      footer={
        <>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" icon="send" onClick={handleSubmit}>
            Submit application
          </Button>
        </>
      }
    >
      <div className={styles.body}>
        <div className={styles.resume}>
          <div className={styles.resumeIcon}>
            <Icon name="fileText" size={18} />
          </div>
          <div>
            <p className={styles.resumeName}>Aarav_Sharma_Resume.pdf</p>
            <p className={styles.resumeMeta}>Parsed profile: {MOCK_PARSED_RESUME.headline}</p>
          </div>
        </div>

        <label className={styles.label} htmlFor="cover-note">
          Cover note (optional)
        </label>
        <Textarea
          id="cover-note"
          placeholder="Add a short note for the recruiter…"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          rows={4}
        />
      </div>
    </Modal>
  );
}
