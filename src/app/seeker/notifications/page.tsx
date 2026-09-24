import type { Metadata } from "next";
import { NotificationList } from "@/components/features/seeker";
import { PageHeader } from "@/components/ui";
import { MOCK_SEEKER_NOTIFICATIONS } from "@/mocks";

export const metadata: Metadata = {
  title: "Notifications",
};

export default function SeekerNotificationsPage() {
  return (
    <div>
      <PageHeader title="Notifications" description="Updates on your applications and new matches." />
      <NotificationList notifications={MOCK_SEEKER_NOTIFICATIONS} />
    </div>
  );
}
