"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui";

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
    <main>
      <Container>
        <h1>Something went wrong</h1>
        <Button onClick={() => retry()}>Try again</Button>
      </Container>
    </main>
  );
}
