import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { ManageUsers } from "@/components/features/admin";
import { MOCK_PLATFORM_USERS } from "@/mocks";

export const metadata: Metadata = {
  title: "Manage Users",
};

export default function AdminUsersPage() {
  return (
    <>
      <PageHeader
        title="Manage users"
        description="View and manage job seeker, recruiter and admin accounts."
      />
      <ManageUsers users={MOCK_PLATFORM_USERS} />
    </>
  );
}
