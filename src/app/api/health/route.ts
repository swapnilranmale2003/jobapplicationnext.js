import { successResponse } from "@/lib/api";

export function GET() {
  return successResponse({ status: "ok", timestamp: new Date().toISOString() });
}
