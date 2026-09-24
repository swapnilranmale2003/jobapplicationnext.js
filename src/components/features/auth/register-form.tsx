"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button, FormField, Input } from "@/components/ui";
import { ROUTES } from "@/constants";
import type { UserRole } from "@/types";
import { RolePicker } from "./role-picker";
import styles from "./auth-form.module.css";

/** Mock registration: no account is created — routes to the selected role's dashboard. */
export function RegisterForm() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>("seeker");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    router.push(role === "seeker" ? ROUTES.SEEKER.RESUME : ROUTES.RECRUITER.COMPANY);
  }

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Create your account</h1>
        <p className={styles.subtitle}>
          {role === "seeker"
            ? "Upload your resume once and let AI match you with the right jobs."
            : "Post jobs and review applicants ranked by AI match score."}
        </p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <RolePicker legend="I am a" roles={["seeker", "recruiter"]} value={role} onChange={setRole} />
        <FormField label="Full name" required>
          {(id) => <Input id={id} autoComplete="name" placeholder="Your full name" required />}
        </FormField>
        {role === "recruiter" && (
          <FormField label="Company name" required>
            {(id) => (
              <Input id={id} autoComplete="organization" placeholder="Company name" required />
            )}
          </FormField>
        )}
        <FormField label={role === "recruiter" ? "Work email" : "Email address"} required>
          {(id) => (
            <Input id={id} type="email" autoComplete="email" placeholder="you@example.com" required />
          )}
        </FormField>
        <FormField label="Password" hint="At least 8 characters." required>
          {(id) => (
            <Input
              id={id}
              type="password"
              autoComplete="new-password"
              minLength={8}
              placeholder="••••••••"
              required
            />
          )}
        </FormField>
        <label className={styles.checkbox}>
          <input type="checkbox" required />
          I agree to the Terms of Service and Privacy Policy
        </label>
        <Button type="submit" size="lg" fullWidth disabled={submitting}>
          {submitting ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <p className={styles.footer}>
        Already have an account?{" "}
        <Link href={ROUTES.LOGIN} className={styles.link}>
          Sign in
        </Link>
      </p>
    </>
  );
}
