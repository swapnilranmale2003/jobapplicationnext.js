import { Icon } from "@/components/ui";
import { PROBLEM_STATEMENT, PROPOSED_SOLUTION } from "@/constants";
import { Section } from "./section";
import styles from "./problem-solution.module.css";

export function ProblemSolution() {
  return (
    <Section
      eyebrow="Why it matters"
      title="From repetitive forms to one smart profile"
      muted
    >
      <div className={styles.grid}>
        <article className={styles.card}>
          <span className={styles.iconProblem}>
            <Icon name="alertTriangle" size={20} />
          </span>
          <h3 className={styles.title}>Problem statement</h3>
          <p className={styles.text}>{PROBLEM_STATEMENT}</p>
        </article>
        <article className={styles.card}>
          <span className={styles.iconSolution}>
            <Icon name="checkCircle" size={20} />
          </span>
          <h3 className={styles.title}>Proposed solution</h3>
          <p className={styles.text}>{PROPOSED_SOLUTION}</p>
        </article>
      </div>
    </Section>
  );
}
