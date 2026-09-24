"use client";

import { useState } from "react";
import { Button, EmptyState, Icon, type IconName } from "@/components/ui";
import type { AppNotification, NotificationType } from "@/types";
import { cn, formatDate } from "@/utils";
import styles from "./notification-list.module.css";

const TYPE_ICON: Record<NotificationType, IconName> = {
  shortlist: "userCheck",
  job: "briefcase",
  application: "fileText",
  system: "sparkles",
};

type NotificationListProps = {
  notifications: AppNotification[];
};

/** Notifications feed with client-side read/unread state (mock only). */
export function NotificationList({ notifications: initial }: NotificationListProps) {
  const [notifications, setNotifications] = useState(initial);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  if (notifications.length === 0) {
    return <EmptyState icon="bell" title="No notifications yet" description="We'll let you know when something changes." />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <p className={styles.unread}>
          {unreadCount > 0 ? `${unreadCount} unread` : "You're all caught up"}
        </p>
        <Button variant="secondary" size="sm" onClick={markAllRead} disabled={unreadCount === 0}>
          Mark all as read
        </Button>
      </div>

      <ul className={styles.list}>
        {notifications.map((notification) => (
          <li key={notification.id}>
            <button
              type="button"
              className={cn(styles.item, !notification.read && styles.unreadItem)}
              onClick={() => markRead(notification.id)}
            >
              <span className={cn(styles.icon, styles[notification.type])}>
                <Icon name={TYPE_ICON[notification.type]} size={16} />
              </span>
              <span className={styles.body}>
                <span className={styles.titleRow}>
                  <span className={styles.title}>{notification.title}</span>
                  {!notification.read && <span className={styles.dot} aria-hidden />}
                </span>
                <span className={styles.message}>{notification.message}</span>
                <span className={styles.date}>{formatDate(notification.createdAt)}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
