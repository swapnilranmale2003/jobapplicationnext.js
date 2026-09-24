"use client";

import { useMemo, useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  DataTable,
  EmptyState,
  SearchInput,
  Tabs,
  type BadgeTone,
  type Column,
  type TabItem,
} from "@/components/ui";
import type { PlatformUser, UserRole } from "@/types";
import { formatDate } from "@/utils";
import { AccountStatusBadge } from "./account-status-badge";
import styles from "./manage-users.module.css";

const ROLE_LABEL: Record<UserRole, string> = {
  seeker: "Job Seeker",
  recruiter: "Recruiter",
  admin: "Admin",
};

const ROLE_BADGE_TONE: Record<UserRole, BadgeTone> = {
  seeker: "info",
  recruiter: "success",
  admin: "purple",
};

type RoleFilter = "all" | UserRole;

type ManageUsersProps = {
  users: PlatformUser[];
};

export function ManageUsers({ users: initialUsers }: ManageUsersProps) {
  const [users, setUsers] = useState(initialUsers);
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [query, setQuery] = useState("");

  const tabs: TabItem<RoleFilter>[] = [
    { value: "all", label: "All", count: users.length },
    { value: "seeker", label: "Job Seekers", count: users.filter((u) => u.role === "seeker").length },
    {
      value: "recruiter",
      label: "Recruiters",
      count: users.filter((u) => u.role === "recruiter").length,
    },
    { value: "admin", label: "Admins", count: users.filter((u) => u.role === "admin").length },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter((user) => {
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesQuery =
        !q || user.name.toLowerCase().includes(q) || user.email.toLowerCase().includes(q);
      return matchesRole && matchesQuery;
    });
  }, [users, roleFilter, query]);

  function toggleStatus(id: string) {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Suspended" ? "Active" : "Suspended" }
          : user,
      ),
    );
  }

  const columns: Column<PlatformUser>[] = [
    {
      key: "user",
      header: "User",
      render: (user) => (
        <div className={styles.userCell}>
          <Avatar name={user.name} size="sm" tone="purple" />
          <div className={styles.userInfo}>
            <p className={styles.userName}>{user.name}</p>
            <p className={styles.userEmail}>{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (user) => <Badge tone={ROLE_BADGE_TONE[user.role]}>{ROLE_LABEL[user.role]}</Badge>,
    },
    {
      key: "status",
      header: "Status",
      render: (user) => <AccountStatusBadge status={user.status} />,
    },
    {
      key: "joined",
      header: "Joined",
      render: (user) => formatDate(user.joinedAt),
    },
    {
      key: "lastActive",
      header: "Last active",
      hideOnMobile: true,
      render: (user) => formatDate(user.lastActiveAt),
    },
    {
      key: "actions",
      header: "Actions",
      align: "end",
      render: (user) => (
        <Button
          variant={user.status === "Suspended" ? "secondary" : "danger"}
          size="sm"
          onClick={() => toggleStatus(user.id)}
        >
          {user.status === "Suspended" ? "Activate" : "Suspend"}
        </Button>
      ),
    },
  ];

  return (
    <>
      <Tabs items={tabs} value={roleFilter} onChange={setRoleFilter} label="Filter users by role" />

      <div className={styles.toolbar}>
        <SearchInput
          className={styles.search}
          placeholder="Search by name or email…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <p className={styles.resultCount}>
        {filtered.length} {filtered.length === 1 ? "user" : "users"}
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          icon="search"
          title="No users found"
          description="Try a different search term or role filter."
        />
      ) : (
        <DataTable
          columns={columns}
          rows={filtered}
          getRowKey={(user) => user.id}
          caption="Platform users"
        />
      )}
    </>
  );
}
