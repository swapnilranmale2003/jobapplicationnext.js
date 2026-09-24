import type { Job, PlatformUser, RecruiterAccount } from "@/types";

export const MOCK_PLATFORM_USERS: PlatformUser[] = [
  { id: "u-1", name: "Aarav Sharma", email: "aarav.sharma@example.com", role: "seeker", status: "Active", joinedAt: "2026-08-02", lastActiveAt: "2026-09-25" },
  { id: "u-2", name: "Priya Nair", email: "priya.nair@example.com", role: "seeker", status: "Active", joinedAt: "2026-08-11", lastActiveAt: "2026-09-24" },
  { id: "u-3", name: "Meera Joshi", email: "meera.joshi@brightpath.example.com", role: "recruiter", status: "Active", joinedAt: "2026-07-20", lastActiveAt: "2026-09-25" },
  { id: "u-4", name: "Rohan Mehta", email: "rohan.mehta@example.com", role: "seeker", status: "Suspended", joinedAt: "2026-08-19", lastActiveAt: "2026-09-10" },
  { id: "u-5", name: "Sneha Kulkarni", email: "sneha.k@example.com", role: "seeker", status: "Active", joinedAt: "2026-09-01", lastActiveAt: "2026-09-24" },
  { id: "u-6", name: "Arjun Rao", email: "arjun.rao@quantis.example.com", role: "recruiter", status: "Pending", joinedAt: "2026-09-22", lastActiveAt: "2026-09-22" },
  { id: "u-7", name: "Neha Gupta", email: "neha.gupta@example.com", role: "admin", status: "Active", joinedAt: "2026-06-01", lastActiveAt: "2026-09-25" },
  { id: "u-8", name: "Vikram Singh", email: "vikram.singh@example.com", role: "seeker", status: "Active", joinedAt: "2026-09-05", lastActiveAt: "2026-09-20" },
];

export const MOCK_RECRUITER_ACCOUNTS: RecruiterAccount[] = [
  { id: "r-1", name: "Meera Joshi", email: "meera.joshi@brightpath.example.com", company: "Brightpath Labs", jobsPosted: 4, verified: true, status: "Active", joinedAt: "2026-07-20" },
  { id: "r-2", name: "Arjun Rao", email: "arjun.rao@quantis.example.com", company: "Quantis Fintech", jobsPosted: 1, verified: false, status: "Pending", joinedAt: "2026-09-22" },
  { id: "r-3", name: "Kavya Reddy", email: "kavya@nimbus.example.com", company: "Nimbus Technologies", jobsPosted: 6, verified: true, status: "Active", joinedAt: "2026-06-14" },
  { id: "r-4", name: "Sameer Khan", email: "sameer@orbitcloud.example.com", company: "Orbit Cloud", jobsPosted: 3, verified: true, status: "Active", joinedAt: "2026-07-03" },
  { id: "r-5", name: "Rahul Verma", email: "hr@quickhire-jobs.example.com", company: "QuickHire Jobs", jobsPosted: 12, verified: false, status: "Suspended", joinedAt: "2026-09-12" },
];

/** Includes flagged postings surfaced for "Remove Fake Jobs". */
export const MOCK_ADMIN_JOBS: Job[] = [
  ...[
    ["job-101", "Frontend Developer (React)", "Nimbus Technologies", "Active", 48],
    ["job-102", "Full Stack Developer (Java + React)", "Brightpath Labs", "Active", 72],
    ["job-103", "Backend Engineer – Spring Boot", "Quantis Fintech", "Active", 35],
    ["job-104", "Software Engineer Intern", "Orbit Cloud", "Active", 126],
    ["job-108", "DevOps Engineer", "Brightpath Labs", "Closed", 54],
    ["job-201", "Work From Home Data Entry – ₹50,000/week", "QuickHire Jobs", "Flagged", 212],
    ["job-202", "Instant Joining – Pay Registration Fee", "QuickHire Jobs", "Flagged", 87],
  ].map(([id, title, company, status, applicantsCount]) => ({
    id: id as string,
    title: title as string,
    company: company as string,
    location: "India",
    workMode: "On-site" as const,
    employmentType: "Full-time" as const,
    experience: "0–2 years",
    salaryMin: 0,
    salaryMax: 0,
    postedAt: "2026-09-20",
    description: "",
    responsibilities: [],
    requiredSkills: [],
    status: status as Job["status"],
    applicantsCount: applicantsCount as number,
  })),
];

export const MOCK_PLATFORM_STATS = {
  totalUsers: 12480,
  jobSeekers: 11235,
  recruiters: 1180,
  activeJobs: 1342,
  applications: 38920,
  avgMatchScore: 71,
  flaggedJobs: 2,
  pendingRecruiters: 1,
};

/** Monthly series for Reports & Analytics (last 6 months). */
export const MOCK_MONTHLY_ACTIVITY = [
  { month: "Apr", signups: 820, applications: 3900, jobs: 140 },
  { month: "May", signups: 1040, applications: 4800, jobs: 172 },
  { month: "Jun", signups: 1310, applications: 5600, jobs: 205 },
  { month: "Jul", signups: 1580, applications: 6450, jobs: 238 },
  { month: "Aug", signups: 1920, applications: 7820, jobs: 264 },
  { month: "Sep", signups: 2210, applications: 8950, jobs: 301 },
];

export const MOCK_APPLICATION_FUNNEL = [
  { stage: "Applied", count: 38920 },
  { stage: "Under Review", count: 21400 },
  { stage: "Shortlisted", count: 8650 },
  { stage: "Hired", count: 1930 },
];

export const MOCK_TOP_SKILLS = [
  { skill: "React", demand: 86 },
  { skill: "Java", demand: 78 },
  { skill: "SQL", demand: 71 },
  { skill: "Python", demand: 64 },
  { skill: "Docker", demand: 52 },
];
