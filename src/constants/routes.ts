/** Single source of truth for app paths. Add new routes here instead of hardcoding strings. */
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  SEEKER: {
    DASHBOARD: "/seeker",
    RESUME: "/seeker/resume",
    JOBS: "/seeker/jobs",
    JOB_DETAIL: (id: string) => `/seeker/jobs/${id}`,
    APPLICATIONS: "/seeker/applications",
    NOTIFICATIONS: "/seeker/notifications",
  },
  RECRUITER: {
    DASHBOARD: "/recruiter",
    COMPANY: "/recruiter/company",
    JOBS: "/recruiter/jobs",
    POST_JOB: "/recruiter/jobs/new",
    APPLICATIONS: "/recruiter/applications",
  },
  ADMIN: {
    DASHBOARD: "/admin",
    USERS: "/admin/users",
    RECRUITERS: "/admin/recruiters",
    JOBS: "/admin/jobs",
    APPLICATIONS: "/admin/applications",
    REPORTS: "/admin/reports",
    SETTINGS: "/admin/settings",
  },
} as const;

export const API_ROUTES = {
  HEALTH: "/health",
} as const;
