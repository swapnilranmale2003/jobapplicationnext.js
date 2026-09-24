import { MatchScore, Tag, TagList } from "@/components/ui";
import { HERO } from "@/constants";
import styles from "./hero.module.css";

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
          <p className={styles.eyebrow}>{HERO.eyebrow}</p>
          <h1 className={styles.title}>{HERO.title}</h1>
          <p className={styles.description}>{HERO.description}</p>
        </div>

        <div className={styles.preview} aria-label="Example job match">
          <div className={styles.previewHeader}>
            <div>
              <p className={styles.previewTitle}>Full Stack Developer</p>
              <p className={styles.previewMeta}>Brightpath Labs · Bengaluru</p>
            </div>
            <MatchScore value={87} size="md" label="Match" />
          </div>
          <TagList>
            {SAMPLE_SKILLS.map((item) => (
              <Tag key={item.skill} variant={item.matched ? "matched" : "missing"}>
                {item.skill}
              </Tag>
            ))}
          </TagList>
        </div>
      </div>
    </section>
  );
}
