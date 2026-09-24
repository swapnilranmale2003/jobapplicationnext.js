"use client";

import { useMemo, useState } from "react";
import {
  Badge,
  Button,
  DataTable,
  EmptyState,
  SearchInput,
  Select,
  type Column,
} from "@/components/ui";
import type { AccountStatus, RecruiterAccount } from "@/types";
import { formatDate } from "@/utils";
import { AccountStatusBadge } from "./account-status-badge";
import styles from "./manage-recruiters.module.css";

type StatusFilter = "all" | AccountStatus;

const STATUS_OPTIONS = [
  { label: "All statuses", value: "all" },
  { label: "Active", value: "Active" },
  { label: "Pending", value: "Pending" },
  { label: "Suspended", value: "Suspended" },
];

type ManageRecruitersProps = {
  recruiters: RecruiterAccount[];
};

export function ManageRecruiters({ recruiters: initial }: ManageRecruitersProps) {
  const [recruiters, setRecruiters] = useState(initial);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recruiters.filter((recruiter) => {
      const matchesStatus = statusFilter === "all" || recruiter.status === statusFilter;
      const matchesQuery =
        !q ||
        recruiter.name.toLowerCase().includes(q) ||
        recruiter.email.toLowerCase().includes(q) ||
        recruiter.company.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [recruiters, query, statusFilter]);

  function verify(id: string) {
    setRecruiters((prev) =>
      prev.map((r) => (r.id === id ? { ...r, verified: true } : r)),
    );
  }

  function toggleStatus(id: string) {
    setRecruiters((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: r.status === "Suspended" ? "Active" : "Suspended" } : r,
      ),
    );
  }

  const columns: Column<RecruiterAccount>[] = [
    {
      key: "recruiter",
      header: "Recruiter",
      render: (r) => (
        <div className={styles.recruiterCell}>
          <p className={styles.recruiterName}>{r.name}</p>
          <p className={styles.recruiterEmail}>{r.email}</p>
        </div>
      ),
    },
    {
      key: "company",
      header: "Company",
      render: (r) => r.company,
    },
    {
      key: "jobsPosted",
      header: "Jobs posted",
      hideOnMobile: true,
      render: (r) => r.jobsPosted,
    },
    {
      key: "verified",
      header: "Verified",
      render: (r) =>
        r.verified ? (
          <Badge tone="success" dot>
            Verified
          </Badge>
        ) : (
          <Badge tone="warning" dot>
            Unverified
          </Badge>
        ),
    },
    {
      key: "status",
      header: "Status",
      render: (r) => <AccountStatusBadge status={r.status} />,
    },
    {
      key: "joined",
      header: "Joined",
      hideOnMobile: true,
      render: (r) => formatDate(r.joinedAt),
    },
    {
      key: "actions",
      header: "Actions",
      align: "end",
      render: (r) => (
        <div className={styles.actions}>
          {!r.verified && (
            <Button variant="secondary" size="sm" onClick={() => verify(r.id)}>
              Verify
            </Button>
          )}
          <Button
            variant={r.status === "Suspended" ? "secondary" : "danger"}
            size="sm"
            onClick={() => toggleStatus(r.id)}
          >
            {r.status === "Suspended" ? "Activate" : "Suspend"}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className={styles.toolbar}>
        <SearchInput
          className={styles.search}
          placeholder="Search by name, email or company…"
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
        {filtered.length} {filtered.length === 1 ? "recruiter" : "recruiters"}
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          icon="search"
          title="No recruiters found"
          description="Try a different search term or status filter."
        />
      ) : (
        <DataTable
          columns={columns}
          rows={filtered}
          getRowKey={(r) => r.id}
          caption="Recruiter accounts"
        />
      )}
    </>
  );
}
