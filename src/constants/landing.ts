import type { IconName } from "@/components/ui/icon";
import type { UserRole } from "@/types";

/** Tooltip for actions that are not open to users yet. */
export const COMING_SOON = "Coming soon";

/** Flip to true to let visitors enter the portals from the homepage. */
export const PORTALS_ENABLED = false;

export const PORTAL_INTRO = {
  title: "Welcome to ApplyWise",
  description: "Choose your portal to continue.",
};

export const PORTALS: {
  role: UserRole;
  icon: IconName;
  title: string;
  description: string;
}[] = [
  {
    role: "seeker",
    icon: "user",
    title: "Job Seeker Portal",
    description: "Upload your resume, find matching jobs and track applications.",
  },
  {
    role: "recruiter",
    icon: "briefcase",
    title: "Recruiter Portal",
    description: "Post jobs, review candidates by match score and hire faster.",
  },
  {
    role: "admin",
    icon: "shield",
    title: "Admin Portal",
    description: "Manage users, recruiters, jobs and platform reports.",
  },
];

/** Short feature list shown on the sign-in pages. */
export const FEATURES: { title: string }[] = [
  { title: "Resume parsing" },
  { title: "Job match score" },
  { title: "ATS resume check" },
];
