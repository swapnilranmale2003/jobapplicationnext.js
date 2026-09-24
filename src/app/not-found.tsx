import { EmptyState, LinkButton } from "@/components/ui";
import { ROUTES } from "@/constants";
import styles from "./status-page.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <EmptyState
        icon="search"
        title="Page not found"
        description="The page you're looking for doesn't exist or has been moved."
        action={<LinkButton href={ROUTES.HOME}>Go to home</LinkButton>}
      />
    </main>
  );
}
