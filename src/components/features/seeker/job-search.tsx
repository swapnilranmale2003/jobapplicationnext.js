"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/ui";
import type { Job, JobMatch } from "@/types";
import { JobCard } from "./job-card";
import { JobFilterBar, type JobFilters } from "./job-filter-bar";
import styles from "./job-search.module.css";

type JobSearchProps = {
  jobs: Job[];
  matches: JobMatch[];
};

const DEFAULT_FILTERS: JobFilters = {
  query: "",
  workMode: "",
  employmentType: "",
  sort: "match",
};

/** Client-side search, filter and sort for the Search Jobs page. */
export function JobSearch({ jobs, matches }: JobSearchProps) {
  const [filters, setFilters] = useState<JobFilters>(DEFAULT_FILTERS);

  const matchByJobId = useMemo(() => {
    const map = new Map<string, number>();
    matches.forEach((match) => map.set(match.jobId, match.score));
    return map;
  }, [matches]);

  const results = useMemo(() => {
    const query = filters.query.trim().toLowerCase();

    const filtered = jobs.filter((job) => {
      const matchesQuery =
        !query ||
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.requiredSkills.some((skill) => skill.toLowerCase().includes(query));
      const matchesWorkMode = !filters.workMode || job.workMode === filters.workMode;
      const matchesEmploymentType =
        !filters.employmentType || job.employmentType === filters.employmentType;
      return matchesQuery && matchesWorkMode && matchesEmploymentType;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (filters.sort === "newest") {
        return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
      }
      return (matchByJobId.get(b.id) ?? 0) - (matchByJobId.get(a.id) ?? 0);
    });

    return sorted;
  }, [jobs, filters, matchByJobId]);

  return (
    <div>
      <JobFilterBar filters={filters} onChange={setFilters} />

      <p className={styles.count}>
        {results.length} {results.length === 1 ? "job" : "jobs"} found
      </p>

      {results.length === 0 ? (
        <EmptyState
          icon="search"
          title="No jobs match your filters"
          description="Try broadening your search or clearing a filter."
        />
      ) : (
        <div className={styles.grid}>
          {results.map((job) => (
            <JobCard key={job.id} job={job} matchScore={matchByJobId.get(job.id)} />
          ))}
        </div>
      )}
    </div>
  );
}
