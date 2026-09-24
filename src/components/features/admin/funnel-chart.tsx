import styles from "./funnel-chart.module.css";

export type FunnelStage = {
  stage: string;
  count: number;
};

type FunnelChartProps = {
  stages: FunnelStage[];
  title: string;
};

/** Horizontal funnel bars with counts and stage-over-stage conversion %. */
export function FunnelChart({ stages, title }: FunnelChartProps) {
  const max = Math.max(1, ...stages.map((s) => s.count));

  return (
    <div className={styles.funnel}>
      <span className="visually-hidden">{title}</span>
      {stages.map((stage, index) => {
        const width = Math.max(2, Math.round((stage.count / max) * 100));
        const conversion =
          index === 0 ? null : Math.round((stage.count / stages[index - 1].count) * 100);
        return (
          <div key={stage.stage} className={styles.row}>
            <span className={styles.stageLabel}>{stage.stage}</span>
            <div
              className={styles.track}
              role="img"
              aria-label={`${stage.stage}: ${stage.count.toLocaleString("en-US")}`}
            >
              <div className={styles.fill} style={{ width: `${width}%` }} />
            </div>
            <span className={styles.meta}>
              <span className={styles.count}>{stage.count.toLocaleString("en-US")}</span>
              {conversion !== null && ` · ${conversion}%`}
            </span>
          </div>
        );
      })}
    </div>
  );
}
