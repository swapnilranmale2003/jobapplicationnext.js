"use client";

import { Select, SearchInput } from "@/components/ui";
import type { EmploymentType, WorkMode } from "@/types";
import styles from "./job-filter-bar.module.css";

export type SortOption = "match" | "newest";

export type JobFilters = {
  query: string;
  workMode: WorkMode | "";
  employmentType: EmploymentType | "";
  sort: SortOption;
};

type JobFilterBarProps = {
  filters: JobFilters;
  onChange: (filters: JobFilters) => void;
};

const WORK_MODE_OPTIONS = [
  { label: "On-site", value: "On-site" },
  { label: "Remote", value: "Remote" },
  { label: "Hybrid", value: "Hybrid" },
];

const EMPLOYMENT_TYPE_OPTIONS = [
  { label: "Full-time", value: "Full-time" },
  { label: "Internship", value: "Internship" },
  { label: "Contract", value: "Contract" },
  { label: "Part-time", value: "Part-time" },
];

const SORT_OPTIONS = [
  { label: "Best match", value: "match" },
  { label: "Newest", value: "newest" },
];

/** Client-side filter bar for the Search Jobs page. */
export function JobFilterBar({ filters, onChange }: JobFilterBarProps) {
  return (
    <div className={styles.bar}>
      <SearchInput
        className={styles.search}
        label="Search by title, company or skill"
        placeholder="Search by title, company or skill…"
        value={filters.query}
        onChange={(event) => onChange({ ...filters, query: event.target.value })}
      />
      <Select
        aria-label="Work mode"
        placeholder="All work modes"
        options={WORK_MODE_OPTIONS}
        value={filters.workMode}
        onChange={(event) =>
          onChange({ ...filters, workMode: event.target.value as WorkMode | "" })
        }
      />
      <Select
        aria-label="Employment type"
        placeholder="All employment types"
        options={EMPLOYMENT_TYPE_OPTIONS}
        value={filters.employmentType}
        onChange={(event) =>
          onChange({ ...filters, employmentType: event.target.value as EmploymentType | "" })
        }
      />
      <Select
        aria-label="Sort by"
        options={SORT_OPTIONS}
        value={filters.sort}
        onChange={(event) => onChange({ ...filters, sort: event.target.value as SortOption })}
      />
    </div>
  );
}
