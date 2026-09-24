"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ApplicationStatusBadge, StatusTimeline } from "@/components/features/applications";
import { Card, EmptyState, MatchScore, Tabs, type TabItem } from "@/components/ui";
import { ROUTES } from "@/constants";
import type { Application, ApplicationStatus } from "@/types";
import { formatDate } from "@/utils";
import styles from "./application-list.module.css";

type FilterValue = "All" | ApplicationStatus;

const FILTER_ORDER: FilterValue[] = ["All", "Applied", "Under Review", "Shortlisted", "Hired", "Rejected"];

type ApplicationListProps = {
  applications: Application[];
};

/** Tabs-filtered list of the seeker's applications with status timelines. */
export function ApplicationList({ applications }: ApplicationListProps) {
  const [filter, setFilter] = useState<FilterValue>("All");

  const counts = useMemo(() => {
    const map = new Map<FilterValue, number>();
    map.set("All", applications.length);
    for (const app of applications) {
      map.set(app.status, (map.get(app.status) ?? 0) + 1);
    }
    return map;
  }, [applications]);

  const tabs: TabItem<FilterValue>[] = FILTER_ORDER.map((value) => ({
    value,
    label: value,
    count: counts.get(value) ?? 0,
  }));

  const filtered = filter === "All" ? applications : applications.filter((app) => app.status === filter);

  return (
    <div>
      <Tabs label="Filter applications by status" items={tabs} value={filter} onChange={setFilter} />

      <div className={styles.list}>
        {filtered.length === 0 ? (
          <EmptyState
            icon="clipboardList"
            title="No applications here"
            description="Applications matching this status will show up here."
          />
        ) : (
          filtered.map((app) => (
            <Card key={app.id} className={styles.card}>
              <div className={styles.top}>
                <div className={styles.heading}>
                  <h3 className={styles.title}>
                    <Link href={ROUTES.SEEKER.JOB_DETAIL(app.jobId)}>{app.jobTitle}</Link>
                  </h3>
                  <p className={styles.company}>{app.company}</p>
                  <p className={styles.applied}>Applied {formatDate(app.appliedAt)}</p>
                </div>
                <div className={styles.statusCol}>
                  <MatchScore value={app.matchScore} size="sm" />
                  <ApplicationStatusBadge status={app.status} />
                </div>
              </div>
              <StatusTimeline status={app.status} />
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
