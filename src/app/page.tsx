import { Container } from "@/components/layout";
import { APP_DESCRIPTION, APP_NAME } from "@/constants";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <Container>
        <h1 className={styles.title}>{APP_NAME}</h1>
        <p className={styles.description}>{APP_DESCRIPTION}</p>
        <p className={styles.status}>Project is set up and running.</p>
      </Container>
    </main>
  );
}
