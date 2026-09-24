"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { ROLE_PANELS, ROUTES } from "@/constants";
import type { NavItem } from "@/constants";
import { Avatar, Icon } from "@/components/ui";
import type { UserRole } from "@/types";
import { cn } from "@/utils";
import { Brand } from "./brand";
import styles from "./app-shell.module.css";

const ROLE_TONE = { seeker: "blue", recruiter: "green", admin: "purple" } as const;

function isActive(pathname: string, item: NavItem) {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

type AppShellProps = {
  role: UserRole;
  children: ReactNode;
};

/** Authenticated layout shared by the Job Seeker, Recruiter and Admin panels. */
export function AppShell({ role, children }: AppShellProps) {
  const panel = ROLE_PANELS[role];
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={cn(styles.shell, styles[role])}>
      <aside className={cn(styles.sidebar, menuOpen && styles.sidebarOpen)} aria-label="Main">
        <div className={styles.sidebarHeader}>
          <Brand href={panel.nav[0].href} />
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <Icon name="x" size={20} />
          </button>
        </div>

        <p className={styles.roleLabel}>{panel.label} panel</p>

        <nav>
          <ul className={styles.nav}>
            {panel.nav.map((item) => {
              const active = isActive(pathname, item);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(styles.navLink, active && styles.navLinkActive)}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    <Icon name={item.icon} size={18} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.sidebarFooter}>
          <Link href={ROUTES.LOGIN} className={styles.navLink}>
            <Icon name="logOut" size={18} />
            Sign out
          </Link>
        </div>
      </aside>

      {menuOpen && (
        <button
          type="button"
          className={styles.overlay}
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        />
      )}

      <div className={styles.main}>
        <header className={styles.topbar}>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Icon name="menu" size={20} />
          </button>

          <div className={styles.topbarSpacer} />

          {role === "seeker" && (
            <Link
              href={ROUTES.SEEKER.NOTIFICATIONS}
              className={styles.iconButton}
              aria-label="Notifications"
            >
              <Icon name="bell" size={18} />
              <span className={styles.notificationDot} />
            </Link>
          )}

          <div className={styles.user}>
            <Avatar name={panel.user.name} size="sm" tone={ROLE_TONE[role]} />
            <div className={styles.userText}>
              <span className={styles.userName}>{panel.user.name}</span>
              <span className={styles.userRole}>{panel.label}</span>
            </div>
          </div>
        </header>

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
