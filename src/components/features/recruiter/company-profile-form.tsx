"use client";

import { useState, type FormEvent } from "react";
import { Button, FormField, Icon, Input, Select, Textarea } from "@/components/ui";
import { MOCK_COMPANY } from "@/mocks";
import { getInitials } from "@/utils/format";
import styles from "./company-profile-form.module.css";

const INDUSTRY_OPTIONS = [
  { label: "HR Technology", value: "HR Technology" },
  { label: "Information Technology", value: "Information Technology" },
  { label: "Financial Services", value: "Financial Services" },
  { label: "E-commerce", value: "E-commerce" },
  { label: "Healthcare", value: "Healthcare" },
  { label: "Manufacturing", value: "Manufacturing" },
];

const SIZE_OPTIONS = [
  { label: "1–50 employees", value: "1–50 employees" },
  { label: "51–200 employees", value: "51–200 employees" },
  { label: "201–500 employees", value: "201–500 employees" },
  { label: "501–1000 employees", value: "501–1000 employees" },
  { label: "1000+ employees", value: "1000+ employees" },
];

export function CompanyProfileForm() {
  const [form, setForm] = useState(MOCK_COMPANY);
  const [saved, setSaved] = useState(false);

  function update<K extends keyof typeof MOCK_COMPANY>(key: K, value: (typeof MOCK_COMPANY)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 4000);
  }

  function handleReset() {
    setForm(MOCK_COMPANY);
    setSaved(false);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.logoRow}>
        <div className={styles.logo} aria-hidden>
          {getInitials(form.name)}
        </div>
        <div>
          <Button type="button" variant="secondary" size="sm" icon="upload">
            Upload logo
          </Button>
          <p className={styles.logoHint}>PNG or JPG. Visual only in this preview.</p>
        </div>
      </div>

      <div className={styles.grid}>
        <FormField label="Company name" required>
          {(id) => (
            <Input
              id={id}
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              required
            />
          )}
        </FormField>

        <FormField label="Industry" required>
          {(id) => (
            <Select
              id={id}
              options={INDUSTRY_OPTIONS}
              value={form.industry}
              onChange={(event) => update("industry", event.target.value)}
              required
            />
          )}
        </FormField>

        <FormField label="Company size" required>
          {(id) => (
            <Select
              id={id}
              options={SIZE_OPTIONS}
              value={form.size}
              onChange={(event) => update("size", event.target.value)}
              required
            />
          )}
        </FormField>

        <FormField label="Website">
          {(id) => (
            <Input
              id={id}
              type="url"
              value={form.website}
              onChange={(event) => update("website", event.target.value)}
            />
          )}
        </FormField>

        <FormField label="Location" required>
          {(id) => (
            <Input
              id={id}
              value={form.location}
              onChange={(event) => update("location", event.target.value)}
              required
            />
          )}
        </FormField>

        <FormField label="Founded">
          {(id) => (
            <Input
              id={id}
              value={form.founded}
              onChange={(event) => update("founded", event.target.value)}
            />
          )}
        </FormField>

        <FormField label="About" className={styles.fullWidth}>
          {(id) => (
            <Textarea
              id={id}
              rows={4}
              value={form.about}
              onChange={(event) => update("about", event.target.value)}
            />
          )}
        </FormField>
      </div>

      <div className={styles.actions}>
        <div className={styles.actionButtons}>
          <Button type="submit" variant="primary" icon="check">
            Save changes
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Cancel
          </Button>
        </div>
        {saved && (
          <p className={styles.success}>
            <Icon name="checkCircle" size={16} />
            Company profile saved
          </p>
        )}
      </div>
    </form>
  );
}
