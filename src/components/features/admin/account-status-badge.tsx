import { Badge, type BadgeTone } from "@/components/ui";
import type { AccountStatus } from "@/types";

const STATUS_TONE: Record<AccountStatus, BadgeTone> = {
  Active: "success",
  Pending: "warning",
  Suspended: "danger",
};

export function AccountStatusBadge({ status }: { status: AccountStatus }) {
  return (
    <Badge tone={STATUS_TONE[status]} dot>
      {status}
    </Badge>
  );
}
