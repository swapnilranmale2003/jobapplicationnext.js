import { Button } from "@/components/ui";
import { COMING_SOON } from "@/constants";
import styles from "./cta-banner.module.css";

export function CtaBanner() {
  return (
    <section className={styles.section}>
      <div className={styles.banner}>
        <div>
          <h2 className={styles.title}>Ready to apply smarter?</h2>
          <p className={styles.text}>Create your free account in under a minute.</p>
        </div>
        <Button size="lg" variant="secondary" disabled title={COMING_SOON}>
          Get started
        </Button>
      </div>
    </section>
  );
}
