import type { Metadata } from "next";
import Link from "next/link";
import { BarChart } from "@/components/features/admin";
import { Avatar, Card, CardHeader, Icon, PageHeader, StatCard } from "@/components/ui";
import { ROUTES } from "@/constants";
import {
  MOCK_MONTHLY_ACTIVITY,
  MOCK_PLATFORM_STATS,
  MOCK_PLATFORM_USERS,
} from "@/mocks";
import { cn, formatDate, formatNumber } from "@/utils";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Dashboard Overview",
};

export default function AdminDashboardPage() {
  const stats = MOCK_PLATFORM_STATS;
  const recentSignups = [...MOCK_PLATFORM_USERS]
    .sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime())
    .slice(0, 5);

  const attentionItems = [
    stats.flaggedJobs > 0 && {
      tone: "danger" as const,
      icon: "flag" as const,
      text: `${stats.flaggedJobs} jobs flagged as potentially fake`,
      href: ROUTES.ADMIN.JOBS,
      cta: "Manage jobs",
    },
    stats.pendingRecruiters > 0 && {
      tone: "warning" as const,
      icon: "userCheck" as const,
      text: `${stats.pendingRecruiters} recruiter awaiting verification`,
      href: ROUTES.ADMIN.RECRUITERS,
      cta: "Manage recruiters",
    },
  ].filter(Boolean) as {
    tone: "danger" | "warning";
    icon: "flag" | "userCheck";
    text: string;
    href: string;
    cta: string;
  }[];

  return (
    <>
      <PageHeader
        title="Platform overview"
        description="Monitor users, jobs and overall platform health."
      />

      <div className={styles.stats}>
        <StatCard
          label="Total users"
          value={formatNumber(stats.totalUsers)}
          icon="users"
          tone="purple"
        />
        <StatCard
          label="Recruiters"
          value={formatNumber(stats.recruiters)}
          icon="userSquare"
          tone="blue"
        />
        <StatCard
          label="Active jobs"
          value={formatNumber(stats.activeJobs)}
          icon="briefcase"
          tone="green"
        />
        <StatCard
          label="Applications"
          value={formatNumber(stats.applications)}
          icon="fileText"
          tone="amber"
        />
        <StatCard
          label="Avg. AI match"
          value={`${stats.avgMatchScore}%`}
          icon="sparkles"
          tone="purple"
        />
      </div>

      <div className={styles.grid}>
        <Card>
          <CardHeader
            title="Attention needed"
            description="Items that may require admin action"
          />
          {attentionItems.length === 0 ? (
            <p className={styles.emptyAttention}>Nothing needs your attention right now.</p>
          ) : (
            <div className={styles.attentionList}>
              {attentionItems.map((item) => (
                <Link
                  key={item.text}
                  href={item.href}
                  className={cn(styles.attentionItem, styles[item.tone])}
                >
                  <span className={styles.attentionIcon}>
                    <Icon name={item.icon} size={16} />
                  </span>
                  <span className={styles.attentionText}>{item.text}</span>
                  <Icon name="chevronRight" size={16} />
                </Link>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <CardHeader title="Monthly activity" description="Applications submitted per month" />
          <BarChart
            title="Monthly applications, last 6 months"
            categories={MOCK_MONTHLY_ACTIVITY.map((month) => month.month)}
            series={[
              {
                key: "applications",
                label: "Applications",
                color: "var(--color-admin)",
                values: MOCK_MONTHLY_ACTIVITY.map((month) => month.applications),
              },
            ]}
            valueFormatter={formatNumber}
          />
        </Card>

        <Card className={styles.jobsCard}>
          <CardHeader title="Recent sign-ups" description="Latest users to join the platform" />
          <ul className={styles.signupList}>
            {recentSignups.map((user) => (
              <li key={user.id} className={styles.signupRow}>
                <Avatar name={user.name} tone="purple" />
                <div className={styles.signupInfo}>
                  <p className={styles.signupName}>{user.name}</p>
                  <p className={styles.signupEmail}>{user.email}</p>
                </div>
                <span className={styles.signupMeta}>{formatDate(user.joinedAt)}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
