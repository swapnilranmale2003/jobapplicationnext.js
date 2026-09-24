import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MatchBreakdown } from "@/components/features/jobs";
import { ApplyButton } from "@/components/features/seeker";
import { Card, CardHeader, Icon } from "@/components/ui";
import { ROUTES } from "@/constants";
import { MOCK_JOBS, MOCK_SEEKER_APPLICATIONS, getJobById, getJobMatch } from "@/mocks";
import { formatDate, formatSalaryRange } from "@/utils";
import styles from "./page.module.css";

export function generateStaticParams() {
  return MOCK_JOBS.map((job) => ({ id: job.id }));
}

export async function generateMetadata(
  props: PageProps<"/seeker/jobs/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const job = getJobById(id);
  return { title: job ? job.title : "Job not found" };
}

export default async function SeekerJobDetailPage(props: PageProps<"/seeker/jobs/[id]">) {
  const { id } = await props.params;
  const job = getJobById(id);

  if (!job) {
    notFound();
  }

  const match = getJobMatch(job.id);
  const alreadyApplied = MOCK_SEEKER_APPLICATIONS.some((app) => app.jobId === job.id);

  return (
    <div>
      <Link href={ROUTES.SEEKER.JOBS} className={styles.backLink}>
        <Icon name="chevronLeft" size={16} />
        Back to Search Jobs
      </Link>

      <Card className={styles.header}>
        <div className={styles.headerTop}>
          <div>
            <h1 className={styles.title}>{job.title}</h1>
            <p className={styles.company}>{job.company}</p>
          </div>
          <ApplyButton jobTitle={job.title} company={job.company} alreadyApplied={alreadyApplied} />
        </div>

        <div className={styles.metaRow}>
          <span className={styles.metaItem}>
            <Icon name="mapPin" size={15} />
            {job.location}
          </span>
          <span className={styles.metaItem}>
            <Icon name="briefcase" size={15} />
            {job.workMode} · {job.employmentType}
          </span>
          <span className={styles.metaItem}>
            <Icon name="dollar" size={15} />
            {formatSalaryRange(job.salaryMin, job.salaryMax)}
          </span>
          <span className={styles.metaItem}>
            <Icon name="calendar" size={15} />
            Posted {formatDate(job.postedAt)}
          </span>
          <span className={styles.metaItem}>
            <Icon name="users" size={15} />
            {job.applicantsCount} applicants
          </span>
        </div>
      </Card>

      <div className={styles.columns}>
        <div className={styles.mainCol}>
          <Card>
            <CardHeader title="About the role" />
            <p className={styles.description}>{job.description}</p>
          </Card>

          <Card>
            <CardHeader title="Responsibilities" />
            <ul className={styles.list}>
              {job.responsibilities.map((item) => (
                <li key={item} className={styles.listItem}>
                  <Icon name="check" size={14} className={styles.listIcon} />
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader title="Required skills" />
            <ul className={styles.skillList}>
              {job.requiredSkills.map((skill) => (
                <li key={skill} className={styles.skillItem}>
                  {skill}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className={styles.sideCol}>
          {match ? (
            <Card>
              <CardHeader title="AI Match Score" description="How your parsed profile compares" />
              <MatchBreakdown match={match} />
            </Card>
          ) : (
            <Card>
              <CardHeader title="AI Match Score" />
              <p className={styles.description}>Upload your resume to see a match score for this role.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
