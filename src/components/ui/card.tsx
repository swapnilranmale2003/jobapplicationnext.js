import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils";
import styles from "./card.module.css";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "div" | "article";
  padded?: boolean;
};

export function Card({ as: Tag = "section", padded = true, className, ...props }: CardProps) {
  return <Tag className={cn(styles.card, padded && styles.padded, className)} {...props} />;
}

type CardHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function CardHeader({ title, description, action, className }: CardHeaderProps) {
  return (
    <header className={cn(styles.header, className)}>
      <div className={styles.headerText}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </header>
  );
}
