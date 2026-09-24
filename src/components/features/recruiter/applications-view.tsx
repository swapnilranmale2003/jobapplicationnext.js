"use client";

import { useMemo, useState } from "react";
import {
  Avatar,
  Button,
  DataTable,
  EmptyState,
  MatchScore,
  Modal,
  PageHeader,
  SearchInput,
  Select,
} from "@/components/ui";
import type { Column } from "@/components/ui";
import { ApplicationStatusBadge, StatusTimeline } from "@/components/features/applications";
import { MOCK_RECRUITER_APPLICATIONS, MOCK_RECRUITER_JOBS } from "@/mocks";
import type { Application, ApplicationStatus } from "@/types";
import { formatDate } from "@/utils";
import styles from "./applications-view.module.css";

type StatusFilter = "All" | ApplicationStatus;

const STATUS_OPTIONS: { label: string; value: StatusFilter }[] = [
  { label: "All statuses", value: "All" },
  { label: "Applied", value: "Applied" },
  { label: "Under Review", value: "Under Review" },
  { label: "Shortlisted", value: "Shortlisted" },
  { label: "Hired", value: "Hired" },
  { label: "Rejected", value: "Rejected" },
];

const JOB_OPTIONS = [
  { label: "All jobs", value: "All" },
  ...MOCK_RECRUITER_JOBS.map((job) => ({ label: job.title, value: job.title })),
];

export function ApplicationsView() {
  const [applications, setApplications] = useState<Application[]>(MOCK_RECRUITER_APPLICATIONS);
  const [jobFilter, setJobFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  function updateStatus(id: string, status: ApplicationStatus, candidateName: string) {
    setApplications((prev) =>
      prev.map((application) =>
        application.id === id
          ? { ...application, status, updatedAt: new Date().toISOString().slice(0, 10) }
          : application,
      ),
    );
    const verb =
      status === "Shortlisted" ? "shortlisted" : status === "Rejected" ? "rejected" : "hired";
    setConfirmation(`${candidateName} ${verb}`);
    window.setTimeout(() => setConfirmation(null), 4000);
  }

  const filteredApplications = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return applications
      .filter((application) => {
        const matchesJob = jobFilter === "All" || application.jobTitle === jobFilter;
        const matchesStatus = statusFilter === "All" || application.status === statusFilter;
        const matchesQuery =
          !normalizedQuery || application.candidateName.toLowerCase().includes(normalizedQuery);
        return matchesJob && matchesStatus && matchesQuery;
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [applications, jobFilter, statusFilter, query]);

  const selectedApplication = applications.find((application) => application.id === selectedId) ?? null;

  const columns: Column<Application>[] = [
    {
      key: "candidate",
      header: "Candidate",
      render: (application) => (
        <div className={styles.candidateCell}>
          <Avatar name={application.candidateName} tone="green" size="sm" />
          <div className={styles.candidateInfo}>
            <button
              type="button"
              className={styles.candidateName}
              onClick={() => setSelectedId(application.id)}
            >
              {application.candidateName}
            </button>
            <span className={styles.candidateEmail}>{application.candidateEmail}</span>
          </div>
        </div>
      ),
    },
    {
      key: "job",
      header: "Job",
      render: (application) => application.jobTitle,
      hideOnMobile: true,
    },
    {
      key: "appliedAt",
      header: "Applied",
      render: (application) => formatDate(application.appliedAt),
      hideOnMobile: true,
    },
    {
      key: "match",
      header: "AI match",
      align: "center",
      render: (application) => <MatchScore value={application.matchScore} size="sm" />,
    },
    {
      key: "status",
      header: "Status",
      render: (application) => <ApplicationStatusBadge status={application.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      align: "end",
      render: (application) => (
        <div className={styles.actionsCell}>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={application.status === "Shortlisted"}
            onClick={() => updateStatus(application.id, "Shortlisted", application.candidateName)}
          >
            Shortlist
          </Button>
          <Button
            type="button"
            variant="danger"
            size="sm"
            disabled={application.status === "Rejected"}
            onClick={() => updateStatus(application.id, "Rejected", application.candidateName)}
          >
            Reject
          </Button>
          <Button
            type="button"
            variant="success"
            size="sm"
            disabled={application.status === "Hired"}
            onClick={() => updateStatus(application.id, "Hired", application.candidateName)}
          >
            Hire
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Applications"
        description="Review applicants ranked by AI match score."
      />

      <div className={styles.toolbar}>
        <Select
          options={JOB_OPTIONS}
          value={jobFilter}
          onChange={(event) => setJobFilter(event.target.value)}
          aria-label="Filter by job"
          className={styles.filterSelect}
        />
        <Select
          options={STATUS_OPTIONS}
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
          aria-label="Filter by status"
          className={styles.filterSelect}
        />
        <SearchInput
          label="Search candidates"
          placeholder="Search by candidate name…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className={styles.search}
        />
      </div>

      {confirmation && <div className={styles.confirmation}>{confirmation}</div>}

      {filteredApplications.length === 0 ? (
        <EmptyState
          icon="users"
          title="No applications match your filters"
          description="Try a different job, status, or search term."
        />
      ) : (
        <DataTable
          columns={columns}
          rows={filteredApplications}
          getRowKey={(application) => application.id}
        />
      )}

      <Modal
        open={selectedApplication !== null}
        onClose={() => setSelectedId(null)}
        title="Candidate details"
        description={selectedApplication?.candidateName}
      >
        {selectedApplication && (
          <div className={styles.modalBody}>
            <div className={styles.modalHeader}>
              <Avatar name={selectedApplication.candidateName} tone="green" size="lg" />
              <div>
                <p className={styles.modalName}>{selectedApplication.candidateName}</p>
                <p className={styles.modalEmail}>{selectedApplication.candidateEmail}</p>
              </div>
            </div>

            <dl className={styles.modalMeta}>
              <div>
                <dt>Applied job</dt>
                <dd>{selectedApplication.jobTitle}</dd>
              </div>
              <div>
                <dt>Applied on</dt>
                <dd>{formatDate(selectedApplication.appliedAt)}</dd>
              </div>
            </dl>

            <div className={styles.modalScore}>
              <MatchScore value={selectedApplication.matchScore} size="md" label="AI match score" />
            </div>

            <StatusTimeline status={selectedApplication.status} />

            <div className={styles.modalActions}>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                disabled={selectedApplication.status === "Shortlisted"}
                onClick={() =>
                  updateStatus(selectedApplication.id, "Shortlisted", selectedApplication.candidateName)
                }
              >
                Shortlist
              </Button>
              <Button
                type="button"
                variant="danger"
                size="sm"
                disabled={selectedApplication.status === "Rejected"}
                onClick={() =>
                  updateStatus(selectedApplication.id, "Rejected", selectedApplication.candidateName)
                }
              >
                Reject
              </Button>
              <Button
                type="button"
                variant="success"
                size="sm"
                disabled={selectedApplication.status === "Hired"}
                onClick={() =>
                  updateStatus(selectedApplication.id, "Hired", selectedApplication.candidateName)
                }
              >
                Hire
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
