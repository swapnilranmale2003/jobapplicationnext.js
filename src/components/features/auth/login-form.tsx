"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button, FormField, Input } from "@/components/ui";
import { ROLE_PANELS, ROUTES } from "@/constants";
import type { UserRole } from "@/types";
import { RolePicker } from "./role-picker";
import styles from "./auth-form.module.css";

/** Mock sign-in: no authentication — routes to the selected role's dashboard. */
export function LoginForm() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>("seeker");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    router.push(ROLE_PANELS[role].nav[0].href);
  }

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Sign in</h1>
        <p className={styles.subtitle}>Welcome back. Sign in to your dashboard.</p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <RolePicker
          legend="Sign in as"
          roles={["seeker", "recruiter", "admin"]}
          value={role}
          onChange={setRole}
        />
        <FormField label="Email address" required>
          {(id) => (
            <Input
              id={id}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              defaultValue={ROLE_PANELS[role].user.email}
              key={role}
              required
            />
          )}
        </FormField>
        <FormField label="Password" required>
          {(id) => (
            <Input
              id={id}
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              defaultValue="password"
              required
            />
          )}
        </FormField>
        <div className={styles.row}>
          <label className={styles.checkbox}>
            <input type="checkbox" defaultChecked />
            Remember me
          </label>
          <button type="button" className={styles.linkButton}>
            Forgot password?
          </button>
        </div>
        <Button type="submit" size="lg" fullWidth disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <p className={styles.footer}>
        New here?{" "}
        <Link href={ROUTES.REGISTER} className={styles.link}>
          Create an account
        </Link>
      </p>
    </>
  );
}
