import { Icon } from "@/components/ui";
import type { ApplicationStatus } from "@/types";
import { cn } from "@/utils";
import styles from "./status-timeline.module.css";

const STEPS = ["Applied", "Under Review", "Shortlisted", "Decision"] as const;

const STEP_INDEX: Record<ApplicationStatus, number> = {
  Applied: 0,
  "Under Review": 1,
  Shortlisted: 2,
  Rejected: 3,
  Hired: 3,
};

/** Horizontal progress of an application through the recruiter workflow. */
export function StatusTimeline({ status }: { status: ApplicationStatus }) {
  const current = STEP_INDEX[status];
  const rejected = status === "Rejected";

  return (
    <ol className={styles.timeline} aria-label={`Application status: ${status}`}>
      {STEPS.map((step, index) => {
        const done = index < current || (index === current && index === STEPS.length - 1);
        const active = index === current;
        const isDecision = index === STEPS.length - 1;
        const label = isDecision && current === index ? status : step;
        const failed = isDecision && rejected;

        return (
          <li
            key={step}
            className={cn(
              styles.step,
              done && styles.done,
              active && styles.active,
              failed && styles.failed,
            )}
          >
            <span className={styles.marker}>
              {failed ? (
                <Icon name="x" size={12} strokeWidth={3} />
              ) : done ? (
                <Icon name="check" size={12} strokeWidth={3} />
              ) : (
                index + 1
              )}
            </span>
            <span className={styles.label}>{label}</span>
          </li>
        );
      })}
    </ol>
  );
}
