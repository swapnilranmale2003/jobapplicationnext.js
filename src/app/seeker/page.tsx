import type { Metadata } from "next";
import Link from "next/link";
import { ApplicationStatusBadge } from "@/components/features/applications";
import {
  Card,
  CardHeader,
  Icon,
  LinkButton,
  MatchScore,
  PageHeader,
  StatCard,
} from "@/components/ui";
import { ROUTES } from "@/constants";
import {
  MOCK_ATS_REPORT,
  MOCK_JOBS,
  MOCK_JOB_MATCHES,
  MOCK_SEEKER_APPLICATIONS,
  MOCK_SEEKER_NOTIFICATIONS,
} from "@/mocks";
import { formatDate } from "@/utils";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function SeekerDashboardPage() {
  const topMatches = [...MOCK_JOB_MATCHES]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((match) => ({
      match,
      job: MOCK_JOBS.find((job) => job.id === match.jobId),
    }))
    .filter((entry) => entry.job);

  const recentApplications = [...MOCK_SEEKER_APPLICATIONS]
    .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime())
    .slice(0, 3);

  const recentNotifications = [...MOCK_SEEKER_NOTIFICATIONS].slice(0, 3);

  const shortlistedCount = MOCK_SEEKER_APPLICATIONS.filter(
    (app) => app.status === "Shortlisted" || app.status === "Hired",
  ).length;

  const avgMatchScore = Math.round(
    MOCK_JOB_MATCHES.reduce((sum, match) => sum + match.score, 0) / MOCK_JOB_MATCHES.length,
  );

  return (
    <div>
      <PageHeader
        title="Welcome back, Aarav"
        description="Here's how your job search is going."
      />

      <div className={styles.stats}>
        <StatCard
          label="Applications"
          value={MOCK_SEEKER_APPLICATIONS.length}
          icon="clipboardList"
          tone="blue"
        />
        <StatCard label="Shortlisted" value={shortlistedCount} icon="userCheck" tone="green" />
        <StatCard
          label="Avg. match score"
          value={`${avgMatchScore}%`}
          icon="target"
          tone="purple"
        />
        <StatCard label="ATS score" value={`${MOCK_ATS_REPORT.score}%`} icon="fileText" tone="amber" />
      </div>

      <div className={styles.columns}>
        <div className={styles.mainCol}>
          <Card>
            <CardHeader
              title="Top job matches"
              description="Jobs best matched to your parsed skills"
              action={
                <LinkButton href={ROUTES.SEEKER.JOBS} variant="ghost" size="sm" icon="arrowRight" iconPosition="end">
                  Search jobs
                </LinkButton>
              }
            />
            <ul className={styles.matchList}>
              {topMatches.map(({ match, job }) => (
                <li key={match.jobId} className={styles.matchRow}>
                  <div className={styles.matchInfo}>
                    <Link href={ROUTES.SEEKER.JOB_DETAIL(match.jobId)} className={styles.matchTitle}>
                      {job!.title}
                    </Link>
                    <p className={styles.matchCompany}>{job!.company}</p>
                  </div>
                  <MatchScore value={match.score} size="sm" />
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader
              title="Recent applications"
              action={
                <LinkButton
                  href={ROUTES.SEEKER.APPLICATIONS}
                  variant="ghost"
                  size="sm"
                  icon="arrowRight"
                  iconPosition="end"
                >
                  My applications
                </LinkButton>
              }
            />
            <ul className={styles.appList}>
              {recentApplications.map((app) => (
                <li key={app.id} className={styles.appRow}>
                  <div className={styles.matchInfo}>
                    <Link href={ROUTES.SEEKER.JOB_DETAIL(app.jobId)} className={styles.matchTitle}>
                      {app.jobTitle}
                    </Link>
                    <p className={styles.matchCompany}>
                      {app.company} · Applied {formatDate(app.appliedAt)}
                    </p>
                  </div>
                  <ApplicationStatusBadge status={app.status} />
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className={styles.sideCol}>
          <Card className={styles.resumeCard}>
            <CardHeader title="Resume health" description="ATS-friendliness of your current resume" />
            <div className={styles.resumeBody}>
              <MatchScore value={MOCK_ATS_REPORT.score} size="lg" label="ATS score" />
              <p className={styles.resumeHint}>
                {MOCK_ATS_REPORT.suggestions.length} suggestions to improve your score.
              </p>
              <LinkButton href={ROUTES.SEEKER.RESUME} variant="secondary" size="sm" fullWidth icon="fileText">
                View my resume
              </LinkButton>
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Recent notifications"
              action={
                <LinkButton
                  href={ROUTES.SEEKER.NOTIFICATIONS}
                  variant="ghost"
                  size="sm"
                  icon="arrowRight"
                  iconPosition="end"
                >
                  All
                </LinkButton>
              }
            />
            <ul className={styles.notifList}>
              {recentNotifications.map((notification) => (
                <li key={notification.id} className={styles.notifRow}>
                  <span className={styles.notifIcon}>
                    <Icon name="bell" size={14} />
                  </span>
                  <div>
                    <p className={styles.notifTitle}>{notification.title}</p>
                    <p className={styles.notifDate}>{formatDate(notification.createdAt)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
