import { Icon } from "@/components/ui";
import { WORKFLOW_STEPS } from "@/constants";
import { Section } from "./section";
import styles from "./workflow.module.css";

export function Workflow() {
  return (
    <Section
      id="workflow"
      eyebrow="How it works"
      title="End-to-end application workflow"
      description="From a single resume upload to a hiring decision, with real-time match scores along the way."
    >
      <ol className={styles.steps}>
        {WORKFLOW_STEPS.map((step, index) => (
          <li key={step.title} className={styles.step}>
            <span className={styles.icon}>
              <Icon name={step.icon} size={22} />
            </span>
            <span className={styles.number}>Step {index + 1}</span>
            <span className={styles.title}>{step.title}</span>
            <span className={styles.actor}>{step.actor}</span>
          </li>
        ))}
      </ol>
    </Section>
  );
}
