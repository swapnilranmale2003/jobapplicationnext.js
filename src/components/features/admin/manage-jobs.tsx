"use client";

import { useMemo, useState } from "react";
import {
  Badge,
  Button,
  DataTable,
  EmptyState,
  Icon,
  Modal,
  Tabs,
  type BadgeTone,
  type Column,
  type TabItem,
} from "@/components/ui";
import type { Job, JobStatus } from "@/types";
import { formatDate } from "@/utils";
import styles from "./manage-jobs.module.css";

type JobFilter = "all" | JobStatus;

const STATUS_TONE: Record<JobStatus, BadgeTone> = {
  Active: "success",
  Draft: "neutral",
  Closed: "danger",
  Flagged: "danger",
};

type ManageJobsProps = {
  jobs: Job[];
};

export function ManageJobs({ jobs: initial }: ManageJobsProps) {
  const [jobs, setJobs] = useState(initial);
  const [filter, setFilter] = useState<JobFilter>("all");
  const [pendingRemoval, setPendingRemoval] = useState<Job | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const flaggedCount = jobs.filter((job) => job.status === "Flagged").length;

  const tabs: TabItem<JobFilter>[] = [
    { value: "all", label: "All", count: jobs.length },
    { value: "Active", label: "Active", count: jobs.filter((j) => j.status === "Active").length },
    { value: "Closed", label: "Closed", count: jobs.filter((j) => j.status === "Closed").length },
    {
      value: "Flagged",
      label: "Flagged",
      count: flaggedCount,
    },
  ];

  const filtered = useMemo(
    () => (filter === "all" ? jobs : jobs.filter((job) => job.status === filter)),
    [jobs, filter],
  );

  function dismissFlag(id: string) {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status: "Active" } : job)),
    );
    setConfirmation(null);
  }

  function confirmRemove() {
    if (!pendingRemoval) return;
    setJobs((prev) => prev.filter((job) => job.id !== pendingRemoval.id));
    setConfirmation(`"${pendingRemoval.title}" was removed and the recruiter has been notified.`);
    setPendingRemoval(null);
  }

  const columns: Column<Job>[] = [
    {
      key: "title",
      header: "Title",
      render: (job) => (
        <div className={styles.jobCell}>
          <p className={styles.jobTitle}>{job.title}</p>
        </div>
      ),
    },
    {
      key: "company",
      header: "Company",
      render: (job) => job.company,
    },
    {
      key: "applicants",
      header: "Applicants",
      hideOnMobile: true,
      render: (job) => job.applicantsCount,
    },
    {
      key: "posted",
      header: "Posted",
      hideOnMobile: true,
      render: (job) => formatDate(job.postedAt),
    },
    {
      key: "status",
      header: "Status",
      render: (job) => <Badge tone={STATUS_TONE[job.status]}>{job.status}</Badge>,
    },
    {
      key: "actions",
      header: "Actions",
      align: "end",
      render: (job) => (
        <div className={styles.jobActions}>
          {job.status === "Flagged" && (
            <Button variant="secondary" size="sm" onClick={() => dismissFlag(job.id)}>
              Dismiss flag
            </Button>
          )}
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              setConfirmation(null);
              setPendingRemoval(job);
            }}
          >
            Remove
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Tabs items={tabs} value={filter} onChange={setFilter} label="Filter jobs by status" />

      {flaggedCount > 0 && (
        <div className={styles.banner} role="alert">
          <Icon name="alertTriangle" size={16} />
          {flaggedCount} {flaggedCount === 1 ? "posting was" : "postings were"} flagged by AI as
          potentially fraudulent.
        </div>
      )}

      {confirmation && (
        <div className={styles.confirmBanner} role="status">
          <Icon name="checkCircle" size={16} />
          {confirmation}
        </div>
      )}

      <p className={styles.resultCount}>
        {filtered.length} {filtered.length === 1 ? "job" : "jobs"}
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          icon="briefcase"
          title="No jobs found"
          description="There are no job postings in this view."
        />
      ) : (
        <DataTable
          columns={columns}
          rows={filtered}
          getRowKey={(job) => job.id}
          caption="Job postings"
        />
      )}

      <Modal
        open={pendingRemoval !== null}
        onClose={() => setPendingRemoval(null)}
        title="Remove job posting?"
        description={
          pendingRemoval
            ? `"${pendingRemoval.title}" at ${pendingRemoval.company} will be removed from the platform and the recruiter will be notified.`
            : undefined
        }
        footer={
          <div className={styles.modalActions}>
            <Button variant="secondary" onClick={() => setPendingRemoval(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmRemove}>
              Remove job
            </Button>
          </div>
        }
      >
        <p>This action cannot be undone.</p>
      </Modal>
    </>
  );
}
