import { MatchScore, Tag, TagList } from "@/components/ui";
import type { JobMatch } from "@/types";
import styles from "./match-breakdown.module.css";

type MatchBreakdownProps = {
  match: JobMatch;
};

/**
 * AI Job Matching result: candidate skills vs job requirements.
 * Mirrors the PPT example — React ✅ · Java ✅ · MongoDB ✅ · Docker ❌ → 87%.
 */
export function MatchBreakdown({ match }: MatchBreakdownProps) {
  const matched = match.skills.filter((skill) => skill.matched);
  const missing = match.skills.filter((skill) => !skill.matched);

  return (
    <div className={styles.breakdown}>
      <MatchScore value={match.score} size="lg" label="Overall match" />
      <div className={styles.groups}>
        <div>
          <p className={styles.groupTitle}>
            Matched skills <span>({matched.length})</span>
          </p>
          <TagList>
            {matched.map((skill) => (
              <Tag key={skill.skill} variant="matched">
                {skill.skill}
              </Tag>
            ))}
          </TagList>
        </div>
        {missing.length > 0 && (
          <div>
            <p className={styles.groupTitle}>
              Missing skills <span>({missing.length})</span>
            </p>
            <TagList>
              {missing.map((skill) => (
                <Tag key={skill.skill} variant="missing">
                  {skill.skill}
                </Tag>
              ))}
            </TagList>
          </div>
        )}
      </div>
    </div>
  );
}
