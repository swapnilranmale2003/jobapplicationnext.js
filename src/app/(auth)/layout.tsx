import type { ReactNode } from "react";
import { Brand } from "@/components/layout";
import { Icon } from "@/components/ui";
import { FEATURES } from "@/constants";
import styles from "./auth-layout.module.css";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <aside className={styles.aside}>
        <Brand tone="inverse" />
        <div className={styles.asideBody}>
          <h2 className={styles.asideTitle}>Upload once. Apply smarter.</h2>
          <p className={styles.asideText}>
            AI parses your resume, scores your fit for every role and tells you how to improve.
          </p>
          <ul className={styles.features}>
            {FEATURES.map((feature) => (
              <li key={feature.title}>
                <span className={styles.featureIcon}>
                  <Icon name="check" size={18} />
                </span>
                {feature.title}
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <main className={styles.main}>
        <div className={styles.mobileBrand}>
          <Brand />
        </div>
        <div className={styles.card}>{children}</div>
      </main>
    </div>
  );
}
