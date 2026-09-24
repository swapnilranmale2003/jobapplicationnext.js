import type { IconName } from "@/components/ui/icon";

/** Tooltip for homepage actions that are not open to users yet. */
export const COMING_SOON = "Coming soon";

/** Short marketing copy for the public landing page. */
export const HERO = {
  eyebrow: "AI-powered job matching",
  title: "Find jobs that fit your skills",
  description: "Upload your resume once. See your match score, improve your resume and apply in one click.",
};

export const AI_FEATURES: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "fileText",
    title: "Smart resume parsing",
    description: "Upload a PDF and your profile fills itself in.",
  },
  {
    icon: "target",
    title: "Job match score",
    description: "See how well you fit a job before you apply.",
  },
  {
    icon: "shield",
    title: "ATS resume check",
    description: "Get quick tips to make your resume stronger.",
  },
];

export const AUDIENCES: {
  key: "seeker" | "recruiter";
  icon: IconName;
  title: string;
  points: string[];
  cta: string;
}[] = [
  {
    key: "seeker",
    icon: "user",
    title: "For job seekers",
    points: ["One profile for every application", "Jobs ranked by match score", "Track every application"],
    cta: "Find jobs",
  },
  {
    key: "recruiter",
    icon: "briefcase",
    title: "For recruiters",
    points: ["Post jobs in minutes", "Candidates ranked by AI match", "Shortlist or hire in one click"],
    cta: "Start hiring",
  },
];

export const WORKFLOW_STEPS: { icon: IconName; title: string; description: string }[] = [
  { icon: "uploadCloud", title: "Upload resume", description: "Add your PDF once." },
  { icon: "target", title: "Get matched", description: "See jobs that fit you." },
  { icon: "send", title: "Apply", description: "Apply in one click." },
  { icon: "bell", title: "Track status", description: "Get updates instantly." },
];
