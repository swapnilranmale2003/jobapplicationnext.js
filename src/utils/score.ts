export type ScoreTone = "high" | "medium" | "low";

/** Thresholds shared by match score and ATS score visuals. */
export function getScoreTone(score: number): ScoreTone {
  if (score >= 75) return "high";
  if (score >= 50) return "medium";
  return "low";
}
