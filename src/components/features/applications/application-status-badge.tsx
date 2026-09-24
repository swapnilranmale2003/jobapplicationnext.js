import { Badge, type BadgeTone } from "@/components/ui";
import type { ApplicationStatus } from "@/types";

const STATUS_TONE: Record<ApplicationStatus, BadgeTone> = {
  Applied: "info",
  "Under Review": "warning",
  Shortlisted: "purple",
  Rejected: "danger",
  Hired: "success",
};

export function ApplicationStatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <Badge tone={STATUS_TONE[status]} dot>
      {status}
    </Badge>
  );
}
