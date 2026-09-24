import styles from "./bar-chart.module.css";

export type BarChartSeries = {
  key: string;
  label: string;
  color: string;
  values: number[];
};

type BarChartProps = {
  categories: string[];
  series: BarChartSeries[];
  /** Accessible title summarising the chart for screen readers. */
  title: string;
  valueFormatter?: (value: number) => string;
};

/** Minimal grouped bar chart built with plain divs — no chart library. */
export function BarChart({ categories, series, title, valueFormatter }: BarChartProps) {
  const max = Math.max(1, ...series.flatMap((s) => s.values));
  const format = valueFormatter ?? ((value: number) => String(value));

  return (
    <div className={styles.wrapper}>
      <span className="visually-hidden">{title}</span>
      {series.length > 1 && (
        <div className={styles.legend} aria-hidden>
          {series.map((s) => (
            <span key={s.key} className={styles.legendItem}>
              <span className={styles.legendSwatch} style={{ background: s.color }} />
              {s.label}
            </span>
          ))}
        </div>
      )}
      <div className={styles.scroll}>
        <table className="visually-hidden">
          <caption>{title}</caption>
          <thead>
            <tr>
              <th scope="col">Category</th>
              {series.map((s) => (
                <th key={s.key} scope="col">
                  {s.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category}>
                <th scope="row">{category}</th>
                {series.map((s) => (
                  <td key={s.key}>{format(s.values[index] ?? 0)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.chart} aria-hidden>
          {categories.map((category, index) => (
            <div key={category} className={styles.group}>
              <div className={styles.bars}>
                {series.map((s) => {
                  const value = s.values[index] ?? 0;
                  const height = Math.max(2, Math.round((value / max) * 100));
                  return (
                    <div
                      key={s.key}
                      className={styles.bar}
                      style={{ height: `${height}%`, background: s.color }}
                      title={`${s.label} · ${category}: ${format(value)}`}
                    >
                      <span className={styles.barValue}>{format(value)}</span>
                    </div>
                  );
                })}
              </div>
              <span className={styles.groupLabel}>{category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
