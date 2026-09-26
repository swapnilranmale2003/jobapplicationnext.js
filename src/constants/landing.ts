/** Tooltip for homepage actions that are not open to users yet. */
export const COMING_SOON = "Coming soon";

/** Short marketing copy for the public landing page. */
export const HERO = {
  eyebrow: "Job application platform",
  title: "Find jobs that fit your skills",
  description: "Upload your resume once. See your match score, improve your resume and apply in one click.",
  highlights: ["Resume parsing", "Skill-based matching", "ATS review"],
};

export const FEATURES: { title: string; description: string }[] = [
  {
    title: "Resume parsing",
    description: "Upload a PDF and your profile fills itself in.",
  },
  {
    title: "Job match score",
    description: "See how well you fit a job before you apply.",
  },
  {
    title: "ATS resume check",
    description: "Get quick tips to make your resume stronger.",
  },
];

export const AUDIENCES: {
  key: "seeker" | "recruiter";
  label: string;
  title: string;
  points: string[];
  cta: string;
}[] = [
  {
    key: "seeker",
    label: "Job seekers",
    title: "Apply with confidence",
    points: ["One profile for every application", "Jobs ranked by match score", "Track every application"],
    cta: "Find jobs",
  },
  {
    key: "recruiter",
    label: "Recruiters",
    title: "Hire the right fit, faster",
    points: ["Post jobs in minutes", "Candidates ranked by match", "Shortlist or hire in one click"],
    cta: "Start hiring",
  },
];

export const WORKFLOW_STEPS: { title: string; description: string }[] = [
  { title: "Upload resume", description: "Add your PDF once." },
  { title: "Get matched", description: "See jobs that fit you." },
  { title: "Apply", description: "Apply in one click." },
  { title: "Track status", description: "Get updates instantly." },
];
