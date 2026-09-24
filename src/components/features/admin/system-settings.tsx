"use client";

import { useState } from "react";
import { Button, Card, CardHeader, FormField, Icon, Input, Toggle } from "@/components/ui";
import styles from "./system-settings.module.css";

type ToggleKey =
  | "aiResumeParsing"
  | "aiJobMatching"
  | "atsAnalysis"
  | "autoFlagJobs"
  | "emailApplicationAlerts"
  | "shortlistRejectEmails"
  | "jobUpdateEmails"
  | "systemNotifications";

const AI_TOGGLES: { key: ToggleKey; label: string; description: string }[] = [
  {
    key: "aiResumeParsing",
    label: "AI resume parsing",
    description: "Automatically extract structured data from uploaded resumes.",
  },
  {
    key: "aiJobMatching",
    label: "AI job matching",
    description: "Score candidates against job postings using the AI matching engine.",
  },
  {
    key: "atsAnalysis",
    label: "ATS analysis",
    description: "Run ATS compatibility checks on submitted resumes.",
  },
  {
    key: "autoFlagJobs",
    label: "Auto-flag suspicious jobs",
    description: "Automatically flag postings that look potentially fraudulent.",
  },
];

const NOTIFICATION_TOGGLES: { key: ToggleKey; label: string; description: string }[] = [
  {
    key: "emailApplicationAlerts",
    label: "Email application alerts",
    description: "Notify recruiters by email when a new application is received.",
  },
  {
    key: "shortlistRejectEmails",
    label: "Shortlist/reject emails",
    description: "Send candidates an email when their status changes.",
  },
  {
    key: "jobUpdateEmails",
    label: "Job update emails",
    description: "Notify seekers when a job they applied to is updated.",
  },
  {
    key: "systemNotifications",
    label: "System notifications",
    description: "Show in-app notifications for platform-wide announcements.",
  },
];

const DEFAULT_TOGGLES: Record<ToggleKey, boolean> = {
  aiResumeParsing: true,
  aiJobMatching: true,
  atsAnalysis: true,
  autoFlagJobs: true,
  emailApplicationAlerts: true,
  shortlistRejectEmails: true,
  jobUpdateEmails: false,
  systemNotifications: true,
};

export function SystemSettings() {
  const [toggles, setToggles] = useState(DEFAULT_TOGGLES);
  const [minMatchScore, setMinMatchScore] = useState(75);
  const [maxResumeSize, setMaxResumeSize] = useState(5);
  const [saved, setSaved] = useState(false);

  function setToggle(key: ToggleKey, checked: boolean) {
    setToggles((prev) => ({ ...prev, [key]: checked }));
    setSaved(false);
  }

  function handleSave() {
    setSaved(true);
  }

  return (
    <div className={styles.grid}>
      <Card>
        <CardHeader title="AI features" description="Control which AI capabilities are active" />
        <div className={styles.toggleList}>
          {AI_TOGGLES.map((toggle) => (
            <Toggle
              key={toggle.key}
              label={toggle.label}
              description={toggle.description}
              checked={toggles[toggle.key]}
              onChange={(checked) => setToggle(toggle.key, checked)}
            />
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader title="Notifications" description="Choose which emails and alerts are sent" />
        <div className={styles.toggleList}>
          {NOTIFICATION_TOGGLES.map((toggle) => (
            <Toggle
              key={toggle.key}
              label={toggle.label}
              description={toggle.description}
              checked={toggles[toggle.key]}
              onChange={(checked) => setToggle(toggle.key, checked)}
            />
          ))}
        </div>
      </Card>

      <Card className={styles.fullWidth}>
        <CardHeader title="Platform" description="Thresholds used across matching and uploads" />
        <div className={styles.fieldsRow}>
          <FormField label="Minimum match score to highlight" hint="Applications at or above this score are highlighted for recruiters.">
            {(id) => (
              <Input
                id={id}
                type="number"
                min={0}
                max={100}
                value={minMatchScore}
                onChange={(event) => {
                  setMinMatchScore(Number(event.target.value));
                  setSaved(false);
                }}
              />
            )}
          </FormField>
          <FormField label="Max resume size (MB)" hint="Largest resume file size accepted on upload.">
            {(id) => (
              <Input
                id={id}
                type="number"
                min={1}
                max={20}
                value={maxResumeSize}
                onChange={(event) => {
                  setMaxResumeSize(Number(event.target.value));
                  setSaved(false);
                }}
              />
            )}
          </FormField>
        </div>
        <div className={styles.footer}>
          <Button onClick={handleSave}>Save settings</Button>
          {saved && (
            <span className={styles.successMessage}>
              <Icon name="checkCircle" size={16} />
              Settings saved.
            </span>
          )}
        </div>
      </Card>
    </div>
  );
}
