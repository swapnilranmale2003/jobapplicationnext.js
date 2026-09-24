import { cn } from "@/utils";
import { Icon, type IconName } from "./icon";
import styles from "./stat-card.module.css";

export type StatTone = "blue" | "green" | "purple" | "amber" | "red";

type StatCardProps = {
  label: string;
  value: string | number;
  icon: IconName;
  tone?: StatTone;
  /** Short context line, e.g. "+12% vs last month". */
  meta?: string;
};

export function StatCard({ label, value, icon, tone = "blue", meta }: StatCardProps) {
  return (
    <div className={styles.card}>
      <div className={cn(styles.icon, styles[tone])}>
        <Icon name={icon} size={20} />
      </div>
      <div className={styles.body}>
        <p className={styles.label}>{label}</p>
        <p className={styles.value}>{value}</p>
        {meta && <p className={styles.meta}>{meta}</p>}
      </div>
    </div>
  );
}
