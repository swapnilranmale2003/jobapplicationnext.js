import { Icon } from "@/components/ui";
import { AI_FEATURES } from "@/constants";
import { Section } from "./section";
import styles from "./ai-features.module.css";

export function AiFeatures() {
  return (
    <Section id="features" title="Everything you need to apply smarter">
      <div className={styles.grid}>
        {AI_FEATURES.map((feature) => (
          <article key={feature.title} className={styles.card}>
            <span className={styles.icon}>
              <Icon name={feature.icon} size={22} />
            </span>
            <h3 className={styles.title}>{feature.title}</h3>
            <p className={styles.description}>{feature.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
