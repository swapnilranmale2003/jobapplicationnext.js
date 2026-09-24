import { LinkButton, MatchScore, Tag, TagList } from "@/components/ui";
import { APP_DESCRIPTION, APP_NAME, ROUTES } from "@/constants";
import styles from "./hero.module.css";

/** The PPT's example: React ✅ · Java ✅ · MongoDB ✅ · Docker ❌ → 87%. */
const SAMPLE_SKILLS = [
  { skill: "React", matched: true },
  { skill: "Java", matched: true },
  { skill: "MongoDB", matched: true },
  { skill: "Docker", matched: false },
];

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>AI-powered recruitment platform</p>
          <h1 className={styles.title}>{APP_NAME}</h1>
          <p className={styles.description}>{APP_DESCRIPTION}</p>
          <div className={styles.actions}>
            <LinkButton href={ROUTES.REGISTER} size="lg" icon="arrowRight" iconPosition="end">
              Get started
            </LinkButton>
            <LinkButton href={ROUTES.LOGIN} size="lg" variant="secondary">
              Sign in
            </LinkButton>
          </div>
        </div>

        <div className={styles.preview} aria-label="Example AI match result">
          <div className={styles.previewHeader}>
            <div>
              <p className={styles.previewLabel}>AI Job Matching</p>
              <p className={styles.previewTitle}>Full Stack Developer (Java + React)</p>
              <p className={styles.previewMeta}>Brightpath Labs · Bengaluru</p>
            </div>
            <MatchScore value={87} size="md" />
          </div>
          <p className={styles.previewSubhead}>Candidate skills vs job requirements</p>
          <TagList>
            {SAMPLE_SKILLS.map((item) => (
              <Tag key={item.skill} variant={item.matched ? "matched" : "missing"}>
                {item.skill}
              </Tag>
            ))}
          </TagList>
          <div className={styles.previewFooter}>
            <span>Overall match</span>
            <strong>87%</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
