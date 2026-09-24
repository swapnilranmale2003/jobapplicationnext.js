import type { Metadata } from "next";
import {
  Avatar,
  Badge,
  Card,
  CardHeader,
  LinkButton,
  MatchScore,
  PageHeader,
  ProgressBar,
  StatCard,
} from "@/components/ui";
import type { BadgeTone } from "@/components/ui";
import { ApplicationStatusBadge } from "@/components/features/applications";
import { ROUTES } from "@/constants";
import { MOCK_RECRUITER_APPLICATIONS, MOCK_RECRUITER_JOBS } from "@/mocks";
import type { ApplicationStatus, JobStatus } from "@/types";
import { formatDate } from "@/utils";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Recruiter dashboard",
};

const JOB_STATUS_TONE: Record<JobStatus, BadgeTone> = {
  Active: "success",
  Draft: "neutral",
  Closed: "danger",
  Flagged: "warning",
};

const PIPELINE_STAGES: { status: ApplicationStatus; tone: "blue" | "green" | "purple" | "amber" }[] = [
  { status: "Applied", tone: "blue" },
  { status: "Under Review", tone: "amber" },
  { status: "Shortlisted", tone: "purple" },
  { status: "Hired", tone: "green" },
  { status: "Rejected", tone: "amber" },
];

export default function RecruiterDashboardPage() {
  const activeJobs = MOCK_RECRUITER_JOBS.filter((job) => job.status === "Active").length;
  const totalApplicants = MOCK_RECRUITER_APPLICATIONS.length;
  const shortlisted = MOCK_RECRUITER_APPLICATIONS.filter(
    (application) => application.status === "Shortlisted",
  ).length;
  const avgMatch = Math.round(
    MOCK_RECRUITER_APPLICATIONS.reduce((sum, application) => sum + application.matchScore, 0) /
      (MOCK_RECRUITER_APPLICATIONS.length || 1),
  );

  const topCandidates = [...MOCK_RECRUITER_APPLICATIONS]
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 4);

  const activeJobPostings = [...MOCK_RECRUITER_JOBS]
    .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
    .slice(0, 4);

  const pipelineCounts = PIPELINE_STAGES.map((stage) => ({
    ...stage,
    count: MOCK_RECRUITER_APPLICATIONS.filter((application) => application.status === stage.status)
      .length,
  }));
  const pipelineMax = Math.max(...pipelineCounts.map((stage) => stage.count), 1);

  return (
    <>
      <PageHeader
        title="Recruiter dashboard"
        description="Track your postings, applicants and AI matching performance."
        actions={
          <LinkButton href={ROUTES.RECRUITER.POST_JOB} icon="plusSquare">
            Post new job
          </LinkButton>
        }
      />

      <div className={styles.stats}>
        <StatCard label="Active jobs" value={activeJobs} icon="briefcase" tone="green" />
        <StatCard label="Total applicants" value={totalApplicants} icon="users" tone="blue" />
        <StatCard label="Shortlisted" value={shortlisted} icon="userCheck" tone="purple" />
        <StatCard label="Avg. AI match" value={`${avgMatch}%`} icon="sparkles" tone="green" />
      </div>

      <div className={styles.grid}>
        <Card>
          <CardHeader
            title="Top candidates by AI match"
            description="Highest scoring applicants across all your postings"
          />
          <ul className={styles.candidateList}>
            {topCandidates.map((candidate) => (
              <li key={candidate.id} className={styles.candidateRow}>
                <Avatar name={candidate.candidateName} tone="green" />
                <div className={styles.candidateInfo}>
                  <p className={styles.candidateName}>{candidate.candidateName}</p>
                  <p className={styles.candidateJob}>{candidate.jobTitle}</p>
                </div>
                <MatchScore value={candidate.matchScore} size="sm" />
                <ApplicationStatusBadge status={candidate.status} />
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHeader
            title="Hiring pipeline"
            description="Applicants across every stage"
          />
          <div className={styles.pipeline}>
            {pipelineCounts.map((stage) => (
              <ProgressBar
                key={stage.status}
                label={stage.status}
                value={Math.round((stage.count / pipelineMax) * 100)}
                showValue={false}
                tone={stage.tone}
              />
            ))}
          </div>
        </Card>

        <Card className={styles.jobsCard}>
          <CardHeader
            title="Active job postings"
            description="Your most recently posted roles"
            action={
              <LinkButton href={ROUTES.RECRUITER.JOBS} variant="ghost" size="sm">
                Manage jobs
              </LinkButton>
            }
          />
          <ul className={styles.jobList}>
            {activeJobPostings.map((job) => (
              <li key={job.id} className={styles.jobRow}>
                <div className={styles.jobInfo}>
                  <p className={styles.jobTitle}>{job.title}</p>
                  <p className={styles.jobMeta}>
                    {job.applicantsCount} applicants · Posted {formatDate(job.postedAt)}
                  </p>
                </div>
                <Badge tone={JOB_STATUS_TONE[job.status]}>{job.status}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
