import type { ReactNode } from "react";
import { cn } from "@/utils";
import { Icon } from "./icon";
import styles from "./tag.module.css";

type TagProps = {
  children: string;
  /** matched = skill found, missing = skill required but absent. */
  variant?: "default" | "matched" | "missing";
};

export function Tag({ children, variant = "default" }: TagProps) {
  return (
    <span className={cn(styles.tag, styles[variant])}>
      {variant === "matched" && <Icon name="check" size={12} strokeWidth={3} />}
      {variant === "missing" && <Icon name="x" size={12} strokeWidth={3} />}
      {children}
    </span>
  );
}

export function TagList({ children }: { children: ReactNode }) {
  return <div className={styles.list}>{children}</div>;
}
