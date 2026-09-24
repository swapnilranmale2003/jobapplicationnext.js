import { Icon } from "@/components/ui";
import { WORKFLOW_STEPS } from "@/constants";
import { Section } from "./section";
import styles from "./workflow.module.css";

export function Workflow() {
  return (
    <Section id="workflow" title="How it works">
      <ol className={styles.steps}>
        {WORKFLOW_STEPS.map((step, index) => (
          <li key={step.title} className={styles.step}>
            <span className={styles.icon}>
              <Icon name={step.icon} size={22} />
            </span>
            <span className={styles.title}>
              {index + 1}. {step.title}
            </span>
            <span className={styles.description}>{step.description}</span>
          </li>
        ))}
      </ol>
    </Section>
  );
}
