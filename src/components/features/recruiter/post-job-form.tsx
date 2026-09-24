"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardHeader,
  FormField,
  Icon,
  Input,
  LinkButton,
  Select,
  Tag,
  TagList,
  Textarea,
} from "@/components/ui";
import { ROUTES } from "@/constants";
import type { EmploymentType, WorkMode } from "@/types";
import styles from "./post-job-form.module.css";

const EMPLOYMENT_OPTIONS: { label: string; value: EmploymentType }[] = [
  { label: "Full-time", value: "Full-time" },
  { label: "Internship", value: "Internship" },
  { label: "Contract", value: "Contract" },
  { label: "Part-time", value: "Part-time" },
];

const WORK_MODE_OPTIONS: { label: string; value: WorkMode }[] = [
  { label: "On-site", value: "On-site" },
  { label: "Remote", value: "Remote" },
  { label: "Hybrid", value: "Hybrid" },
];

type FormState = {
  title: string;
  employmentType: EmploymentType | "";
  workMode: WorkMode | "";
  location: string;
  experience: string;
  salaryMin: string;
  salaryMax: string;
  description: string;
  responsibilities: string;
};

const INITIAL_STATE: FormState = {
  title: "",
  employmentType: "",
  workMode: "",
  location: "",
  experience: "",
  salaryMin: "",
  salaryMax: "",
  description: "",
  responsibilities: "",
};

type Errors = Partial<Record<keyof FormState | "skills", string>>;

type SuccessKind = "published" | "draft";

export function PostJobForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState<SuccessKind | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function addSkill() {
    const value = skillInput.trim();
    if (!value) return;
    if (!skills.includes(value)) {
      setSkills((prev) => [...prev, value]);
    }
    setSkillInput("");
  }

  function removeSkill(skill: string) {
    setSkills((prev) => prev.filter((item) => item !== skill));
  }

  function handleSkillKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      addSkill();
    }
  }

  function validate(): Errors {
    const next: Errors = {};
    if (!form.title.trim()) next.title = "Job title is required.";
    if (!form.employmentType) next.employmentType = "Select an employment type.";
    if (!form.workMode) next.workMode = "Select a work mode.";
    if (!form.location.trim()) next.location = "Location is required.";
    if (!form.experience.trim()) next.experience = "Experience level is required.";
    if (!form.salaryMin.trim()) next.salaryMin = "Minimum salary is required.";
    if (!form.salaryMax.trim()) next.salaryMax = "Maximum salary is required.";
    if (
      form.salaryMin.trim() &&
      form.salaryMax.trim() &&
      Number(form.salaryMin) > Number(form.salaryMax)
    ) {
      next.salaryMax = "Maximum salary must be greater than minimum.";
    }
    if (skills.length === 0) next.skills = "Add at least one required skill.";
    if (!form.description.trim()) next.description = "Job description is required.";
    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSuccess(null);
      return;
    }
    setSuccess("published");
  }

  function handleSaveDraft() {
    setErrors({});
    setSuccess("draft");
  }

  function handleReset() {
    setForm(INITIAL_STATE);
    setSkills([]);
    setSkillInput("");
    setErrors({});
    setSuccess(null);
  }

  if (success) {
    return (
      <Card className={styles.successCard}>
        <div className={styles.successIcon}>
          <Icon name="checkCircle" size={28} />
        </div>
        <h2 className={styles.successTitle}>
          {success === "published" ? "Job published" : "Draft saved"}
        </h2>
        <p className={styles.successText}>
          {success === "published"
            ? "Your job is now live and visible to candidates."
            : "Your draft was saved. You can publish it later from Manage Jobs."}
        </p>
        <div className={styles.successActions}>
          <LinkButton href={ROUTES.RECRUITER.JOBS} variant="primary">
            Go to Manage Jobs
          </LinkButton>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Post another job
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className={styles.layout}>
      <Card className={styles.formCard}>
        <form onSubmit={handleSubmit}>
        <CardHeader title="Job details" description="Fill in the role requirements" />

        <div className={styles.grid}>
          <FormField label="Job title" required error={errors.title} className={styles.fullWidth}>
            {(id) => (
              <Input
                id={id}
                value={form.title}
                onChange={(event) => update("title", event.target.value)}
                placeholder="e.g. Full Stack Developer (Java + React)"
              />
            )}
          </FormField>

          <FormField label="Employment type" required error={errors.employmentType}>
            {(id) => (
              <Select
                id={id}
                placeholder="Select type"
                options={EMPLOYMENT_OPTIONS}
                value={form.employmentType}
                onChange={(event) => update("employmentType", event.target.value as EmploymentType)}
              />
            )}
          </FormField>

          <FormField label="Work mode" required error={errors.workMode}>
            {(id) => (
              <Select
                id={id}
                placeholder="Select mode"
                options={WORK_MODE_OPTIONS}
                value={form.workMode}
                onChange={(event) => update("workMode", event.target.value as WorkMode)}
              />
            )}
          </FormField>

          <FormField label="Location" required error={errors.location}>
            {(id) => (
              <Input
                id={id}
                value={form.location}
                onChange={(event) => update("location", event.target.value)}
                placeholder="e.g. Bengaluru, IN"
              />
            )}
          </FormField>

          <FormField label="Experience" required error={errors.experience}>
            {(id) => (
              <Input
                id={id}
                value={form.experience}
                onChange={(event) => update("experience", event.target.value)}
                placeholder="e.g. 0–2 years"
              />
            )}
          </FormField>

          <FormField label="Minimum salary (LPA)" required error={errors.salaryMin}>
            {(id) => (
              <Input
                id={id}
                type="number"
                min={0}
                value={form.salaryMin}
                onChange={(event) => update("salaryMin", event.target.value)}
              />
            )}
          </FormField>

          <FormField label="Maximum salary (LPA)" required error={errors.salaryMax}>
            {(id) => (
              <Input
                id={id}
                type="number"
                min={0}
                value={form.salaryMax}
                onChange={(event) => update("salaryMax", event.target.value)}
              />
            )}
          </FormField>

          <FormField
            label="Required skills"
            required
            error={errors.skills}
            className={styles.fullWidth}
            hint="Press Enter or click Add. These skills drive the AI match score."
          >
            {(id) => (
              <div className={styles.skillInputRow}>
                <Input
                  id={id}
                  value={skillInput}
                  onChange={(event) => setSkillInput(event.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  placeholder="e.g. React"
                />
                <Button type="button" variant="secondary" onClick={addSkill}>
                  Add
                </Button>
              </div>
            )}
          </FormField>

          {skills.length > 0 && (
            <div className={styles.fullWidth}>
              <TagList>
                {skills.map((skill) => (
                  <span key={skill} className={styles.removableTag}>
                    <Tag>{skill}</Tag>
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => removeSkill(skill)}
                      aria-label={`Remove ${skill}`}
                    >
                      <Icon name="x" size={12} strokeWidth={3} />
                    </button>
                  </span>
                ))}
              </TagList>
            </div>
          )}

          <FormField
            label="Job description"
            required
            error={errors.description}
            className={styles.fullWidth}
          >
            {(id) => (
              <Textarea
                id={id}
                rows={4}
                value={form.description}
                onChange={(event) => update("description", event.target.value)}
              />
            )}
          </FormField>

          <FormField label="Responsibilities" className={styles.fullWidth} hint="One per line (optional)">
            {(id) => (
              <Textarea
                id={id}
                rows={4}
                value={form.responsibilities}
                onChange={(event) => update("responsibilities", event.target.value)}
              />
            )}
          </FormField>
        </div>

        <div className={styles.actions}>
          <Button type="submit" variant="primary" icon="checkCircle">
            Publish job
          </Button>
          <Button type="button" variant="secondary" onClick={handleSaveDraft}>
            Save as draft
          </Button>
        </div>
        </form>
      </Card>

      <Card className={styles.tipCard}>
        <div className={styles.tipIcon}>
          <Icon name="sparkles" size={20} />
        </div>
        <h3 className={styles.tipTitle}>AI matching tip</h3>
        <p className={styles.tipText}>
          The required skills you list here are compared against each candidate&apos;s resume to
          calculate their AI Match Score. Be specific — listing exact technologies (e.g.
          &quot;React&quot; instead of &quot;frontend&quot;) produces more accurate matches.
        </p>
        <Link href={ROUTES.RECRUITER.JOBS} className={styles.tipLink}>
          View manage jobs
          <Icon name="arrowRight" size={14} />
        </Link>
      </Card>
    </div>
  );
}
