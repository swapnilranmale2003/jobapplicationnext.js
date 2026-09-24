"use client";

import { useState } from "react";
import {
  Badge,
  Card,
  CardHeader,
  MatchScore,
  ProgressBar,
  Tabs,
  Tag,
  TagList,
  type BadgeTone,
} from "@/components/ui";
import type { AtsReport, AtsSuggestion, ParsedResume } from "@/types";
import styles from "./resume-view.module.css";

type ResumeViewProps = {
  resume: ParsedResume;
  atsReport: AtsReport;
};

const SEVERITY_TONE: Record<AtsSuggestion["severity"], BadgeTone> = {
  high: "danger",
  medium: "warning",
  low: "neutral",
};

type TabValue = "profile" | "ats";

/** Tabs between the AI-parsed profile and the ATS resume analysis. */
export function ResumeView({ resume, atsReport }: ResumeViewProps) {
  const [tab, setTab] = useState<TabValue>("profile");

  return (
    <div>
      <Tabs
        label="Resume view"
        value={tab}
        onChange={setTab}
        items={[
          { value: "profile", label: "Parsed profile" },
          { value: "ats", label: "ATS analysis" },
        ]}
      />

      <div className={styles.panel}>
        {tab === "profile" ? <ParsedProfile resume={resume} /> : <AtsAnalysis report={atsReport} />}
      </div>
    </div>
  );
}

function ParsedProfile({ resume }: { resume: ParsedResume }) {
  return (
    <div className={styles.profileGrid}>
      <Card>
        <CardHeader title="Personal details" />
        <dl className={styles.detailList}>
          <div>
            <dt>Name</dt>
            <dd>{resume.name}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{resume.email}</dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>{resume.phone}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{resume.location}</dd>
          </div>
        </dl>
      </Card>

      <Card>
        <CardHeader title="Skills" />
        <TagList>
          {resume.skills.map((skill) => (
            <Tag key={skill} variant="matched">
              {skill}
            </Tag>
          ))}
        </TagList>
      </Card>

      <Card className={styles.spanFull}>
        <CardHeader title="Education" />
        <ul className={styles.entryList}>
          {resume.education.map((edu) => (
            <li key={edu.degree} className={styles.entry}>
              <div className={styles.entryHeading}>
                <span className={styles.entryTitle}>{edu.degree}</span>
                <span className={styles.entryMeta}>{edu.year}</span>
              </div>
              <p className={styles.entrySub}>{edu.institution}</p>
              {edu.score && <p className={styles.entryDetail}>{edu.score}</p>}
            </li>
          ))}
        </ul>
      </Card>

      <Card className={styles.spanFull}>
        <CardHeader title="Experience" />
        <ul className={styles.entryList}>
          {resume.experience.map((exp) => (
            <li key={exp.role} className={styles.entry}>
              <div className={styles.entryHeading}>
                <span className={styles.entryTitle}>{exp.role}</span>
                <span className={styles.entryMeta}>{exp.duration}</span>
              </div>
              <p className={styles.entrySub}>{exp.company}</p>
              <p className={styles.entryDetail}>{exp.summary}</p>
            </li>
          ))}
        </ul>
      </Card>

      <Card className={styles.spanFull}>
        <CardHeader title="Projects" />
        <ul className={styles.entryList}>
          {resume.projects.map((project) => (
            <li key={project.name} className={styles.entry}>
              <span className={styles.entryTitle}>{project.name}</span>
              <p className={styles.entryDetail}>{project.summary}</p>
              <TagList>
                {project.tech.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </TagList>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function AtsAnalysis({ report }: { report: AtsReport }) {
  const grouped = report.suggestions.reduce<Record<string, AtsSuggestion[]>>((acc, suggestion) => {
    acc[suggestion.category] = acc[suggestion.category] ?? [];
    acc[suggestion.category].push(suggestion);
    return acc;
  }, {});

  return (
    <div className={styles.atsGrid}>
      <Card className={styles.scoreCard}>
        <MatchScore value={report.score} size="lg" label="ATS score" />
        <div className={styles.checks}>
          {report.checks.map((check) => (
            <ProgressBar key={check.label} label={check.label} value={check.score} />
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader title="Missing keywords" description="Add these where they genuinely apply." />
        <TagList>
          {report.missingKeywords.map((keyword) => (
            <Tag key={keyword} variant="missing">
              {keyword}
            </Tag>
          ))}
        </TagList>
      </Card>

      <Card className={styles.spanFull}>
        <CardHeader title="Suggestions" description="Grouped by category, ordered by impact." />
        <div className={styles.suggestionGroups}>
          {Object.entries(grouped).map(([category, suggestions]) => (
            <div key={category} className={styles.suggestionGroup}>
              <p className={styles.suggestionCategory}>{category}</p>
              <ul className={styles.suggestionList}>
                {suggestions.map((suggestion) => (
                  <li key={suggestion.title} className={styles.suggestionItem}>
                    <div className={styles.suggestionHeading}>
                      <span className={styles.suggestionTitle}>{suggestion.title}</span>
                      <Badge tone={SEVERITY_TONE[suggestion.severity]}>{suggestion.severity}</Badge>
                    </div>
                    <p className={styles.suggestionDetail}>{suggestion.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
