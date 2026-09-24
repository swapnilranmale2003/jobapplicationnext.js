import type { Job, JobMatch } from "@/types";

export const MOCK_JOBS: Job[] = [
  {
    id: "job-101",
    title: "Frontend Developer (React)",
    company: "Nimbus Technologies",
    location: "Pune, IN",
    workMode: "Hybrid",
    employmentType: "Full-time",
    experience: "0–1 years",
    salaryMin: 6,
    salaryMax: 9,
    postedAt: "2026-09-22",
    description:
      "Join our product team to build responsive, accessible interfaces for a B2B SaaS platform used by 2,000+ companies.",
    responsibilities: [
      "Build reusable UI components with React and TypeScript",
      "Integrate REST APIs and manage server state",
      "Collaborate with designers to ship pixel-accurate screens",
      "Write unit tests and participate in code reviews",
    ],
    requiredSkills: ["React", "JavaScript", "TypeScript", "HTML/CSS", "REST APIs"],
    status: "Active",
    applicantsCount: 48,
  },
  {
    id: "job-102",
    title: "Full Stack Developer (Java + React)",
    company: "Brightpath Labs",
    location: "Bengaluru, IN",
    workMode: "On-site",
    employmentType: "Full-time",
    experience: "0–2 years",
    salaryMin: 7,
    salaryMax: 11,
    postedAt: "2026-09-20",
    description:
      "Work across the stack on our hiring analytics product, from Spring Boot services to React dashboards.",
    responsibilities: [
      "Develop REST services with Java Spring Boot",
      "Build dashboard features in React",
      "Design MongoDB collections and queries",
      "Containerise services with Docker",
    ],
    requiredSkills: ["React", "Java", "MongoDB", "Docker"],
    status: "Active",
    applicantsCount: 72,
  },
  {
    id: "job-103",
    title: "Backend Engineer – Spring Boot",
    company: "Quantis Fintech",
    location: "Hyderabad, IN",
    workMode: "Hybrid",
    employmentType: "Full-time",
    experience: "1–2 years",
    salaryMin: 8,
    salaryMax: 12,
    postedAt: "2026-09-18",
    description:
      "Build secure, high-throughput payment services for a fast-growing fintech platform.",
    responsibilities: [
      "Design and implement microservices in Spring Boot",
      "Write integration tests and maintain CI pipelines",
      "Optimise database queries for performance",
    ],
    requiredSkills: ["Java", "Spring Boot", "SQL", "Microservices", "Kafka"],
    status: "Active",
    applicantsCount: 35,
  },
  {
    id: "job-104",
    title: "Software Engineer Intern",
    company: "Orbit Cloud",
    location: "Remote",
    workMode: "Remote",
    employmentType: "Internship",
    experience: "Fresher",
    salaryMin: 3,
    salaryMax: 4,
    postedAt: "2026-09-24",
    description:
      "A 6-month internship working with our platform team on internal developer tools.",
    responsibilities: [
      "Build small features end to end with mentorship",
      "Fix bugs and improve documentation",
      "Take part in weekly demos",
    ],
    requiredSkills: ["JavaScript", "Git", "Node.js", "React"],
    status: "Active",
    applicantsCount: 126,
  },
  {
    id: "job-105",
    title: "Data Analyst – Graduate",
    company: "Insightly Analytics",
    location: "Mumbai, IN",
    workMode: "On-site",
    employmentType: "Full-time",
    experience: "Fresher",
    salaryMin: 5,
    salaryMax: 7,
    postedAt: "2026-09-15",
    description: "Turn raw product data into dashboards and insights for business teams.",
    responsibilities: [
      "Write SQL queries and build dashboards",
      "Clean and validate datasets",
      "Present insights to stakeholders",
    ],
    requiredSkills: ["SQL", "Python", "Excel", "Power BI"],
    status: "Active",
    applicantsCount: 64,
  },
  {
    id: "job-106",
    title: "UI Engineer – Design Systems",
    company: "Nimbus Technologies",
    location: "Pune, IN",
    workMode: "Remote",
    employmentType: "Contract",
    experience: "1–3 years",
    salaryMin: 9,
    salaryMax: 13,
    postedAt: "2026-09-10",
    description: "Own and evolve our component library used across five product teams.",
    responsibilities: [
      "Build accessible components with React",
      "Document usage guidelines",
      "Partner with design on tokens and theming",
    ],
    requiredSkills: ["React", "TypeScript", "CSS", "Accessibility", "Storybook"],
    status: "Active",
    applicantsCount: 21,
  },
];

/** AI match results for the signed-in job seeker (mock). */
export const MOCK_JOB_MATCHES: JobMatch[] = [
  {
    jobId: "job-101",
    score: 92,
    skills: [
      { skill: "React", matched: true },
      { skill: "JavaScript", matched: true },
      { skill: "TypeScript", matched: true },
      { skill: "HTML/CSS", matched: true },
      { skill: "REST APIs", matched: false },
    ],
  },
  {
    jobId: "job-102",
    score: 87,
    skills: [
      { skill: "React", matched: true },
      { skill: "Java", matched: true },
      { skill: "MongoDB", matched: true },
      { skill: "Docker", matched: false },
    ],
  },
  {
    jobId: "job-103",
    score: 58,
    skills: [
      { skill: "Java", matched: true },
      { skill: "Spring Boot", matched: true },
      { skill: "SQL", matched: true },
      { skill: "Microservices", matched: false },
      { skill: "Kafka", matched: false },
    ],
  },
  {
    jobId: "job-104",
    score: 81,
    skills: [
      { skill: "JavaScript", matched: true },
      { skill: "Git", matched: true },
      { skill: "Node.js", matched: false },
      { skill: "React", matched: true },
    ],
  },
  {
    jobId: "job-105",
    score: 42,
    skills: [
      { skill: "SQL", matched: true },
      { skill: "Python", matched: false },
      { skill: "Excel", matched: false },
      { skill: "Power BI", matched: false },
    ],
  },
  {
    jobId: "job-106",
    score: 74,
    skills: [
      { skill: "React", matched: true },
      { skill: "TypeScript", matched: true },
      { skill: "CSS", matched: true },
      { skill: "Accessibility", matched: false },
      { skill: "Storybook", matched: false },
    ],
  },
];

export function getJobById(id: string): Job | undefined {
  return MOCK_JOBS.find((job) => job.id === id);
}

export function getJobMatch(jobId: string): JobMatch | undefined {
  return MOCK_JOB_MATCHES.find((match) => match.jobId === jobId);
}
