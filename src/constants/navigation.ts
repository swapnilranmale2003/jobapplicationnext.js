import type { IconName } from "@/components/ui/icon";
import type { UserRole } from "@/types";
import { ROUTES } from "./routes";

export type NavItem = {
  label: string;
  href: string;
  icon: IconName;
  /** Match only the exact path (used for dashboard roots). */
  exact?: boolean;
};

export type RolePanel = {
  role: UserRole;
  label: string;
  /** Mock signed-in user shown in the shell. */
  user: { name: string; email: string };
  nav: NavItem[];
};

/** Sidebar menus per role, following the PPT's System Architecture & Panel Overview. */
export const ROLE_PANELS: Record<UserRole, RolePanel> = {
  seeker: {
    role: "seeker",
    label: "Job Seeker",
    user: { name: "Aarav Sharma", email: "aarav.sharma@example.com" },
    nav: [
      { label: "Dashboard", href: ROUTES.SEEKER.DASHBOARD, icon: "layoutGrid", exact: true },
      { label: "My Resume", href: ROUTES.SEEKER.RESUME, icon: "fileText" },
      { label: "Search Jobs", href: ROUTES.SEEKER.JOBS, icon: "search" },
      { label: "My Applications", href: ROUTES.SEEKER.APPLICATIONS, icon: "clipboardList" },
      { label: "Notifications", href: ROUTES.SEEKER.NOTIFICATIONS, icon: "bell" },
    ],
  },
  recruiter: {
    role: "recruiter",
    label: "Recruiter",
    user: { name: "Meera Joshi", email: "meera.joshi@brightpath.example.com" },
    nav: [
      { label: "Dashboard", href: ROUTES.RECRUITER.DASHBOARD, icon: "layoutGrid", exact: true },
      { label: "Company Profile", href: ROUTES.RECRUITER.COMPANY, icon: "building" },
      { label: "Post New Job", href: ROUTES.RECRUITER.POST_JOB, icon: "plusSquare", exact: true },
      { label: "Manage Jobs", href: ROUTES.RECRUITER.JOBS, icon: "briefcase", exact: true },
      { label: "Applications", href: ROUTES.RECRUITER.APPLICATIONS, icon: "users" },
    ],
  },
  admin: {
    role: "admin",
    label: "Admin",
    user: { name: "Neha Gupta", email: "neha.gupta@example.com" },
    nav: [
      { label: "Dashboard", href: ROUTES.ADMIN.DASHBOARD, icon: "layoutGrid", exact: true },
      { label: "Manage Users", href: ROUTES.ADMIN.USERS, icon: "users" },
      { label: "Manage Recruiters", href: ROUTES.ADMIN.RECRUITERS, icon: "userSquare" },
      { label: "Manage Jobs", href: ROUTES.ADMIN.JOBS, icon: "briefcase" },
      { label: "Applications", href: ROUTES.ADMIN.APPLICATIONS, icon: "fileText" },
      { label: "Reports & Analytics", href: ROUTES.ADMIN.REPORTS, icon: "barChart" },
      { label: "System Settings", href: ROUTES.ADMIN.SETTINGS, icon: "settings" },
    ],
  },
};
