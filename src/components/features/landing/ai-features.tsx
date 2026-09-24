import { Icon } from "@/components/ui";
import { AI_FEATURES } from "@/constants";
import { Section } from "./section";
import styles from "./ai-features.module.css";

export function AiFeatures() {
  return (
    <Section
      id="features"
      eyebrow="Artificial intelligence features"
      title="AI that works for candidates and recruiters"
      description="Powered by resume parsing, skill matching and ATS analysis."
    >
      <div className={styles.grid}>
        {AI_FEATURES.map((feature) => (
          <article key={feature.title} className={styles.card}>
            <span className={styles.icon}>
              <Icon name={feature.icon} size={22} />
            </span>
            <h3 className={styles.title}>{feature.title}</h3>
            <p className={styles.description}>{feature.description}</p>
            <ul className={styles.points}>
              {feature.points.map((point) => (
                <li key={point}>
                  <Icon name="check" size={14} strokeWidth={3} />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
