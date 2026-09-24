"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Badge,
  Button,
  DataTable,
  EmptyState,
  LinkButton,
  PageHeader,
  SearchInput,
  Tabs,
} from "@/components/ui";
import type { BadgeTone, Column, TabItem } from "@/components/ui";
import { ROUTES } from "@/constants";
import { MOCK_RECRUITER_JOBS } from "@/mocks";
import type { Job, JobStatus } from "@/types";
import { formatDate } from "@/utils";
import styles from "./manage-jobs-view.module.css";

type FilterValue = "All" | JobStatus;

const STATUS_TONE: Record<JobStatus, BadgeTone> = {
  Active: "success",
  Draft: "neutral",
  Closed: "danger",
  Flagged: "warning",
};

export function ManageJobsView() {
  const [jobs, setJobs] = useState<Job[]>(MOCK_RECRUITER_JOBS);
  const [filter, setFilter] = useState<FilterValue>("All");
  const [query, setQuery] = useState("");

  const tabs: TabItem<FilterValue>[] = useMemo(() => {
    const counts: Record<FilterValue, number> = {
      All: jobs.length,
      Active: jobs.filter((job) => job.status === "Active").length,
      Draft: jobs.filter((job) => job.status === "Draft").length,
      Closed: jobs.filter((job) => job.status === "Closed").length,
      Flagged: jobs.filter((job) => job.status === "Flagged").length,
    };
    return [
      { value: "All", label: "All", count: counts.All },
      { value: "Active", label: "Active", count: counts.Active },
      { value: "Draft", label: "Draft", count: counts.Draft },
      { value: "Closed", label: "Closed", count: counts.Closed },
    ];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesFilter = filter === "All" || job.status === filter;
      const matchesQuery =
        !normalizedQuery ||
        job.title.toLowerCase().includes(normalizedQuery) ||
        job.location.toLowerCase().includes(normalizedQuery);
      return matchesFilter && matchesQuery;
    });
  }, [jobs, filter, query]);

  function toggleStatus(jobId: string) {
    setJobs((prev) =>
      prev.map((job) => {
        if (job.id !== jobId) return job;
        if (job.status === "Active") return { ...job, status: "Closed" };
        if (job.status === "Closed") return { ...job, status: "Active" };
        return job;
      }),
    );
  }

  const columns: Column<Job>[] = [
    {
      key: "title",
      header: "Job",
      render: (job) => (
        <div className={styles.jobCell}>
          <span className={styles.jobTitle}>{job.title}</span>
          <span className={styles.jobLocation}>{job.location}</span>
        </div>
      ),
    },
    {
      key: "employmentType",
      header: "Type",
      render: (job) => job.employmentType,
      hideOnMobile: true,
    },
    {
      key: "applicantsCount",
      header: "Applicants",
      render: (job) => job.applicantsCount,
      align: "center",
      hideOnMobile: true,
    },
    {
      key: "postedAt",
      header: "Posted",
      render: (job) => formatDate(job.postedAt),
      hideOnMobile: true,
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
        <div className={styles.actionsCell}>
          <Link href={ROUTES.RECRUITER.APPLICATIONS} className={styles.viewLink}>
            View applicants
          </Link>
          {job.status !== "Draft" && job.status !== "Flagged" && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => toggleStatus(job.id)}
            >
              {job.status === "Active" ? "Close" : "Reopen"}
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Manage jobs"
        description="Review and update the roles you've posted."
        actions={
          <LinkButton href={ROUTES.RECRUITER.POST_JOB} icon="plusSquare">
            Post new job
          </LinkButton>
        }
      />

      <div className={styles.toolbar}>
        <Tabs items={tabs} value={filter} onChange={setFilter} label="Filter jobs by status" />
        <SearchInput
          label="Search jobs"
          placeholder="Search by title or location…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className={styles.search}
        />
      </div>

      {filteredJobs.length === 0 ? (
        <EmptyState
          icon="briefcase"
          title="No jobs match your filters"
          description="Try a different status or search term."
        />
      ) : (
        <DataTable columns={columns} rows={filteredJobs} getRowKey={(job) => job.id} />
      )}
    </>
  );
}
