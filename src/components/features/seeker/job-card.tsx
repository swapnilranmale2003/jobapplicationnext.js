import Link from "next/link";
import { Card, Icon, LinkButton, MatchScore, Tag, TagList } from "@/components/ui";
import { ROUTES } from "@/constants";
import type { Job } from "@/types";
import { formatDate, formatSalaryRange } from "@/utils";
import styles from "./job-card.module.css";

type JobCardProps = {
  job: Job;
  matchScore?: number;
};

/** Search Jobs result card: role summary, top skills and AI match score. */
export function JobCard({ job, matchScore }: JobCardProps) {
  return (
    <Card className={styles.card}>
      <div className={styles.top}>
        <div className={styles.heading}>
          <h3 className={styles.title}>
            <Link href={ROUTES.SEEKER.JOB_DETAIL(job.id)}>{job.title}</Link>
          </h3>
          <p className={styles.company}>{job.company}</p>
        </div>
        {matchScore !== undefined && <MatchScore value={matchScore} size="sm" />}
      </div>

      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <Icon name="mapPin" size={14} />
          {job.location}
        </span>
        <span className={styles.metaItem}>
          <Icon name="briefcase" size={14} />
          {job.workMode} · {job.employmentType}
        </span>
        <span className={styles.metaItem}>
          <Icon name="dollar" size={14} />
          {formatSalaryRange(job.salaryMin, job.salaryMax)}
        </span>
      </div>

      <TagList>
        {job.requiredSkills.slice(0, 4).map((skill) => (
          <Tag key={skill}>{skill}</Tag>
        ))}
      </TagList>

      <div className={styles.footer}>
        <span className={styles.posted}>
          <Icon name="calendar" size={14} />
          Posted {formatDate(job.postedAt)}
        </span>
        <LinkButton href={ROUTES.SEEKER.JOB_DETAIL(job.id)} variant="secondary" size="sm" icon="arrowRight" iconPosition="end">
          View details
        </LinkButton>
      </div>
    </Card>
  );
}
