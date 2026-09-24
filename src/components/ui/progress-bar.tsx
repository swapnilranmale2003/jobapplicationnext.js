import { cn } from "@/utils";
import styles from "./progress-bar.module.css";

type ProgressBarProps = {
  value: number;
  label?: string;
  showValue?: boolean;
  tone?: "blue" | "green" | "purple" | "amber";
};

export function ProgressBar({ value, label, showValue = true, tone = "blue" }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={styles.wrapper}>
      {(label || showValue) && (
        <div className={styles.meta}>
          {label && <span>{label}</span>}
          {showValue && <span className={styles.value}>{clamped}%</span>}
        </div>
      )}
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div className={cn(styles.fill, styles[tone])} style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
