import type { AppNotification } from "@/types";

export const MOCK_SEEKER_NOTIFICATIONS: AppNotification[] = [
  {
    id: "n-1",
    type: "shortlist",
    title: "You've been shortlisted",
    message: "Brightpath Labs shortlisted you for Full Stack Developer (Java + React).",
    createdAt: "2026-09-24",
    read: false,
  },
  {
    id: "n-2",
    type: "job",
    title: "New job matches your profile",
    message: "Software Engineer Intern at Orbit Cloud is an 81% match.",
    createdAt: "2026-09-24",
    read: false,
  },
  {
    id: "n-3",
    type: "application",
    title: "Application received",
    message: "Nimbus Technologies received your application for Frontend Developer (React).",
    createdAt: "2026-09-23",
    read: false,
  },
  {
    id: "n-4",
    type: "application",
    title: "Application status updated",
    message: "Quantis Fintech has moved forward with other candidates for Backend Engineer.",
    createdAt: "2026-09-19",
    read: true,
  },
  {
    id: "n-5",
    type: "system",
    title: "Resume analysed",
    message: "Your ATS score is 76%. Review 4 suggestions to improve it.",
    createdAt: "2026-09-15",
    read: true,
  },
];
