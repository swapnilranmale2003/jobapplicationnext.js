"use client";

import { useState } from "react";
import { Button, Card, CardHeader, ProgressBar, Select } from "@/components/ui";
import type { MOCK_APPLICATION_FUNNEL, MOCK_MONTHLY_ACTIVITY, MOCK_TOP_SKILLS } from "@/mocks";
import { formatNumber } from "@/utils";
import { BarChart } from "./bar-chart";
import { FunnelChart } from "./funnel-chart";
import styles from "./reports-analytics.module.css";

const RANGE_OPTIONS = [
  { label: "Last 6 months", value: "6m" },
  { label: "Last 30 days", value: "30d" },
  { label: "This year", value: "year" },
];

type ReportsAnalyticsProps = {
  monthlyActivity: typeof MOCK_MONTHLY_ACTIVITY;
  funnel: typeof MOCK_APPLICATION_FUNNEL;
  topSkills: typeof MOCK_TOP_SKILLS;
};

export function ReportsAnalytics({ monthlyActivity, funnel, topSkills }: ReportsAnalyticsProps) {
  const [range, setRange] = useState("6m");

  return (
    <>
      <div className={styles.toolbar}>
        <Select
          className={styles.rangeSelect}
          options={RANGE_OPTIONS}
          value={range}
          onChange={(event) => setRange(event.target.value)}
          aria-label="Date range"
        />
        <Button variant="secondary" icon="download">
          Export report
        </Button>
      </div>

      <div className={styles.grid}>
        <Card className={styles.fullWidth}>
          <CardHeader
            title="Monthly sign-ups vs applications"
            description="New user sign-ups compared with applications submitted"
          />
          <BarChart
            title="Monthly sign-ups vs applications"
            categories={monthlyActivity.map((m) => m.month)}
            series={[
              {
                key: "signups",
                label: "Sign-ups",
                color: "var(--color-admin)",
                values: monthlyActivity.map((m) => m.signups),
              },
              {
                key: "applications",
                label: "Applications",
                color: "var(--color-seeker)",
                values: monthlyActivity.map((m) => m.applications),
              },
            ]}
            valueFormatter={formatNumber}
          />
        </Card>

        <Card>
          <CardHeader
            title="Application funnel"
            description="Candidates progressing through each stage"
          />
          <FunnelChart title="Application funnel" stages={funnel} />
        </Card>

        <Card>
          <CardHeader title="Top in-demand skills" description="Most requested skills across job postings" />
          <div className={styles.skillsList}>
            {topSkills.map((skill) => (
              <ProgressBar key={skill.skill} label={skill.skill} value={skill.demand} tone="purple" />
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
