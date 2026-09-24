import type { ReactNode } from "react";
import { cn } from "@/utils";
import styles from "./section.module.css";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  muted?: boolean;
  children: ReactNode;
};

export function Section({ id, eyebrow, title, description, muted, children }: SectionProps) {
  return (
    <section id={id} className={cn(styles.section, muted && styles.muted)}>
      <div className={styles.inner}>
        <header className={styles.header}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h2 className={styles.title}>{title}</h2>
          {description && <p className={styles.description}>{description}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
