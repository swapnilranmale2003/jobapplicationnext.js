import type { IconName } from "@/components/ui/icon";
import type { UserRole } from "@/types";

/** Copy for the public landing page, taken from the source PPT. */
export const PROBLEM_STATEMENT =
  "Freshers spend excessive time repeatedly filling identical application forms. They struggle to know if their resume fits a role or what improvements are needed — leading to low application efficiency and missed opportunities.";

export const PROPOSED_SOLUTION =
  "A single platform where candidates upload a resume once; AI parses and stores profile data; recruiters post jobs; AI calculates a Match Score and ATS-friendliness; candidates receive suggestions and apply directly. Admin tools manage users, jobs, and platform health.";

export const AI_FEATURES: { icon: IconName; title: string; description: string; points: string[] }[] = [
  {
    icon: "fileText",
    title: "AI Resume Parsing",
    description:
      "Automatically extract key details from uploaded PDF resumes into a structured candidate profile for fast matching.",
    points: ["Name", "Email", "Skills", "Education", "Experience", "Projects"],
  },
  {
    icon: "target",
    title: "AI Job Matching",
    description:
      "Compare candidate skills against job requirements and generate a match percentage for every role.",
    points: ["Skill-by-skill comparison", "Overall match score", "Best-fit job ranking"],
  },
  {
    icon: "shield",
    title: "ATS Resume Analysis",
    description:
      "Evaluate ATS-friendliness and get targeted suggestions to improve your resume before you apply.",
    points: ["Missing keywords", "Better resume summary", "Skill improvements", "Formatting fixes"],
  },
];

export const PANEL_OVERVIEW: {
  role: UserRole;
  title: string;
  icon: IconName;
  items: string[];
}[] = [
  {
    role: "seeker",
    title: "Job Seeker",
    icon: "user",
    items: [
      "Register / Login",
      "Upload Resume",
      "AI Resume Parsing",
      "Search Jobs",
      "View Match Score",
      "Apply for Jobs",
      "Track Applications",
      "Receive Notifications",
    ],
  },
  {
    role: "recruiter",
    title: "Recruiter (HR)",
    icon: "briefcase",
    items: [
      "Login to Dashboard",
      "Company Profile",
      "Post New Jobs",
      "Manage Jobs",
      "View Applications",
      "View AI Match Score",
      "Shortlist Candidates",
      "Reject / Hire Candidates",
    ],
  },
  {
    role: "admin",
    title: "Admin",
    icon: "shield",
    items: [
      "Dashboard Overview",
      "Manage Users",
      "Manage Recruiters",
      "Manage Jobs",
      "View Applications",
      "Reports & Analytics",
      "Remove Fake Jobs",
      "System Settings",
    ],
  },
];

export const WORKFLOW_STEPS: { icon: IconName; title: string; actor: string }[] = [
  { icon: "uploadCloud", title: "Resume Upload", actor: "Job Seeker" },
  { icon: "brain", title: "AI Parsing & Analysis", actor: "Extract skills, info" },
  { icon: "target", title: "AI Job Matching", actor: "Generate match score" },
  { icon: "send", title: "Apply for Job", actor: "Job Seeker" },
  { icon: "users", title: "Recruiter Reviews", actor: "Application" },
  { icon: "clipboardList", title: "Shortlist / Reject / Hire", actor: "Recruiter" },
  { icon: "bell", title: "Status Updated", actor: "Notification sent" },
];
