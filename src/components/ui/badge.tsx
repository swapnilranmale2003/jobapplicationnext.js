import type { ReactNode } from "react";
import { cn } from "@/utils";
import styles from "./badge.module.css";

export type BadgeTone = "success" | "warning" | "danger" | "info" | "neutral" | "purple";

type BadgeProps = {
  tone?: BadgeTone;
  dot?: boolean;
  children: ReactNode;
  className?: string;
};

export function Badge({ tone = "neutral", dot, children, className }: BadgeProps) {
  return (
    <span className={cn(styles.badge, styles[tone], className)}>
      {dot && <span className={styles.dot} aria-hidden />}
      {children}
    </span>
  );
}
