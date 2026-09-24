import type { AtsReport, ParsedResume } from "@/types";

export const MOCK_PARSED_RESUME: ParsedResume = {
  name: "Aarav Sharma",
  email: "aarav.sharma@example.com",
  phone: "+91 98765 43210",
  location: "Pune, Maharashtra",
  headline: "B.E. Computer Engineering graduate · Full stack developer",
  skills: ["React", "JavaScript", "TypeScript", "Java", "MongoDB", "HTML/CSS", "Git", "SQL", "Spring Boot"],
  education: [
    {
      degree: "B.E. Computer Engineering",
      institution: "Savitribai Phule Pune University",
      year: "2022 – 2026",
      score: "CGPA 8.4",
    },
    {
      degree: "Higher Secondary (Science)",
      institution: "Fergusson College, Pune",
      year: "2020 – 2022",
      score: "88%",
    },
  ],
  experience: [
    {
      role: "Software Developer Intern",
      company: "CodeCraft Solutions",
      duration: "Jan 2026 – Jun 2026",
      summary: "Built React dashboards and REST endpoints in Spring Boot for an internal HR tool.",
    },
  ],
  projects: [
    {
      name: "Campus Placement Portal",
      tech: ["React", "Spring Boot", "MongoDB"],
      summary: "Portal for students to browse drives and track application status.",
    },
    {
      name: "Expense Tracker",
      tech: ["React", "TypeScript", "Chart.js"],
      summary: "Personal finance app with category budgets and monthly reports.",
    },
  ],
};

export const MOCK_ATS_REPORT: AtsReport = {
  score: 76,
  checks: [
    { label: "Keyword match", score: 68 },
    { label: "Formatting & structure", score: 84 },
    { label: "Section completeness", score: 90 },
    { label: "Readability", score: 72 },
  ],
  missingKeywords: ["Docker", "REST APIs", "Unit Testing", "CI/CD", "Agile"],
  suggestions: [
    {
      category: "Missing Keywords",
      severity: "high",
      title: "Add in-demand keywords",
      detail:
        "Roles you match often ask for Docker, REST APIs and Unit Testing. Mention them where you have real experience.",
    },
    {
      category: "Resume Summary",
      severity: "medium",
      title: "Write a sharper summary",
      detail:
        "Replace the generic objective with 2–3 lines on your stack, your strongest project and the role you want.",
    },
    {
      category: "Skill Improvements",
      severity: "medium",
      title: "Quantify project impact",
      detail:
        "Add numbers to your projects, e.g. users served, load time reduced, or features shipped.",
    },
    {
      category: "Formatting",
      severity: "low",
      title: "Use a single-column layout",
      detail: "Two-column layouts and tables can confuse ATS parsers. Keep headings standard.",
    },
  ],
};
