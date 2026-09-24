"use client";

import { useMemo, useState } from "react";
import {
  DataTable,
  EmptyState,
  MatchScore,
  SearchInput,
  Select,
  type Column,
} from "@/components/ui";
import { ApplicationStatusBadge } from "@/components/features/applications";
import type { Application, ApplicationStatus } from "@/types";
import { formatDate } from "@/utils";
import styles from "./view-applications.module.css";

type StatusFilter = "all" | ApplicationStatus;

const STATUS_OPTIONS = [
  { label: "All statuses", value: "all" },
  { label: "Applied", value: "Applied" },
  { label: "Under Review", value: "Under Review" },
  { label: "Shortlisted", value: "Shortlisted" },
  { label: "Rejected", value: "Rejected" },
  { label: "Hired", value: "Hired" },
];

type ViewApplicationsProps = {
  applications: Application[];
};

export function ViewApplications({ applications }: ViewApplicationsProps) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return applications.filter((application) => {
      const matchesStatus = statusFilter === "all" || application.status === statusFilter;
      const matchesQuery =
        !q ||
        application.candidateName.toLowerCase().includes(q) ||
        application.candidateEmail.toLowerCase().includes(q) ||
        application.jobTitle.toLowerCase().includes(q) ||
        application.company.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [applications, query, statusFilter]);

  const columns: Column<Application>[] = [
    {
      key: "candidate",
      header: "Candidate",
      render: (app) => (
        <div className={styles.candidateCell}>
          <p className={styles.candidateName}>{app.candidateName}</p>
          <p className={styles.candidateEmail}>{app.candidateEmail}</p>
        </div>
      ),
    },
    {
      key: "job",
      header: "Job",
      render: (app) => (
        <div className={styles.jobCell}>
          <p className={styles.jobTitle}>{app.jobTitle}</p>
          <p className={styles.company}>{app.company}</p>
        </div>
      ),
    },
    {
      key: "match",
      header: "Match score",
      render: (app) => <MatchScore value={app.matchScore} size="sm" />,
    },
    {
      key: "status",
      header: "Status",
      render: (app) => <ApplicationStatusBadge status={app.status} />,
    },
    {
      key: "applied",
      header: "Applied",
      hideOnMobile: true,
      render: (app) => formatDate(app.appliedAt),
    },
  ];

  return (
    <>
      <div className={styles.toolbar}>
        <SearchInput
          className={styles.search}
          placeholder="Search by candidate, job or company…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Select
          className={styles.filter}
          options={STATUS_OPTIONS}
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
          aria-label="Filter by status"
        />
      </div>

      <p className={styles.resultCount}>
        {filtered.length} {filtered.length === 1 ? "application" : "applications"}
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          icon="search"
          title="No applications found"
          description="Try a different search term or status filter."
        />
      ) : (
        <DataTable
          columns={columns}
          rows={filtered}
          getRowKey={(app) => app.id}
          caption="Platform applications"
        />
      )}
    </>
  );
}
