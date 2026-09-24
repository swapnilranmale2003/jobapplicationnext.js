import { cn } from "@/utils";
import { getScoreTone } from "@/utils/score";
import styles from "./match-score.module.css";

type MatchScoreProps = {
  value: number;
  size?: "sm" | "md" | "lg";
  label?: string;
};

const DIMENSIONS = { sm: 44, md: 64, lg: 104 } as const;
const STROKES = { sm: 4, md: 6, lg: 8 } as const;

/** Circular percentage indicator used for AI Match Score and ATS score. */
export function MatchScore({ value, size = "md", label }: MatchScoreProps) {
  const dimension = DIMENSIONS[size];
  const stroke = STROKES[size];
  const radius = (dimension - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, value));
  const offset = circumference * (1 - clamped / 100);
  const tone = getScoreTone(clamped);

  return (
    <div className={styles.wrapper}>
      <div
        className={cn(styles.ring, styles[size], styles[tone])}
        style={{ width: dimension, height: dimension }}
        role="img"
        aria-label={`${label ?? "Match score"}: ${clamped}%`}
      >
        <svg width={dimension} height={dimension} viewBox={`0 0 ${dimension} ${dimension}`}>
          <circle
            className={styles.track}
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            strokeWidth={stroke}
          />
          <circle
            className={styles.progress}
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <span className={styles.value}>{clamped}%</span>
      </div>
      {label && size !== "sm" && <span className={styles.label}>{label}</span>}
    </div>
  );
}
