export type UserRole = "seeker" | "recruiter" | "admin";

export type EmploymentType = "Full-time" | "Internship" | "Contract" | "Part-time";
export type WorkMode = "On-site" | "Remote" | "Hybrid";

export type JobStatus = "Active" | "Draft" | "Closed" | "Flagged";

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  workMode: WorkMode;
  employmentType: EmploymentType;
  experience: string;
  salaryMin: number;
  salaryMax: number;
  postedAt: string;
  description: string;
  responsibilities: string[];
  requiredSkills: string[];
  status: JobStatus;
  applicantsCount: number;
};

/** Candidate skill vs job requirement comparison produced by the AI matching engine. */
export type SkillMatch = {
  skill: string;
  matched: boolean;
};

export type JobMatch = {
  jobId: string;
  score: number;
  skills: SkillMatch[];
};

export type ApplicationStatus =
  | "Applied"
  | "Under Review"
  | "Shortlisted"
  | "Rejected"
  | "Hired";

export type Application = {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  candidateName: string;
  candidateEmail: string;
  matchScore: number;
  status: ApplicationStatus;
  appliedAt: string;
  updatedAt: string;
};

export type Education = {
  degree: string;
  institution: string;
  year: string;
  score?: string;
};

export type Experience = {
  role: string;
  company: string;
  duration: string;
  summary: string;
};

export type Project = {
  name: string;
  tech: string[];
  summary: string;
};

/** Structured profile extracted by AI resume parsing. */
export type ParsedResume = {
  name: string;
  email: string;
  phone: string;
  location: string;
  headline: string;
  skills: string[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
};

export type AtsSuggestionCategory =
  | "Missing Keywords"
  | "Resume Summary"
  | "Skill Improvements"
  | "Formatting";

export type AtsSuggestion = {
  category: AtsSuggestionCategory;
  severity: "high" | "medium" | "low";
  title: string;
  detail: string;
};

export type AtsReport = {
  score: number;
  checks: { label: string; score: number }[];
  missingKeywords: string[];
  suggestions: AtsSuggestion[];
};

export type NotificationType = "application" | "shortlist" | "job" | "system";

export type AppNotification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
};

export type Candidate = {
  id: string;
  name: string;
  email: string;
  headline: string;
  skills: string[];
};

export type Company = {
  name: string;
  industry: string;
  size: string;
  website: string;
  location: string;
  founded: string;
  about: string;
};

export type AccountStatus = "Active" | "Suspended" | "Pending";

export type PlatformUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: AccountStatus;
  joinedAt: string;
  lastActiveAt: string;
};

export type RecruiterAccount = {
  id: string;
  name: string;
  email: string;
  company: string;
  jobsPosted: number;
  verified: boolean;
  status: AccountStatus;
  joinedAt: string;
};
