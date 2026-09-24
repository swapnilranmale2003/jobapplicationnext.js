"use client";

import { useEffect } from "react";
import { Button, EmptyState } from "@/components/ui";
import styles from "./status-page.module.css";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.page}>
      <EmptyState
        icon="alertTriangle"
        title="Something went wrong"
        description="An unexpected error occurred. Please try again."
        action={<Button onClick={() => retry()}>Try again</Button>}
      />
    </main>
  );
}
