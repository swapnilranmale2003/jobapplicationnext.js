import { Button, Icon } from "@/components/ui";
import { AUDIENCES, COMING_SOON } from "@/constants";
import { cn } from "@/utils";
import { Section } from "./section";
import styles from "./audience.module.css";

export function Audience() {
  return (
    <Section id="audience" title="Built for both sides of hiring" muted>
      <div className={styles.grid}>
        {AUDIENCES.map((audience) => (
          <article key={audience.key} className={cn(styles.card, styles[audience.key])}>
            <span className={styles.icon}>
              <Icon name={audience.icon} size={20} />
            </span>
            <h3 className={styles.title}>{audience.title}</h3>
            <ul className={styles.list}>
              {audience.points.map((point) => (
                <li key={point}>
                  <Icon name="checkCircle" size={16} />
                  {point}
                </li>
              ))}
            </ul>
            <Button variant="secondary" icon="arrowRight" iconPosition="end" disabled title={COMING_SOON}>
              {audience.cta}
            </Button>
          </article>
        ))}
      </div>
    </Section>
  );
}
