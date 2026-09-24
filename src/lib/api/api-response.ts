import type { ApiFailure, ApiSuccess } from "@/types";

/** Helpers for Route Handlers so every endpoint returns the same response shape. */
export function successResponse<T>(data: T, init?: ResponseInit) {
  return Response.json({ success: true, data } satisfies ApiSuccess<T>, init);
}

export function errorResponse(message: string, status = 500, code?: string) {
  return Response.json(
    { success: false, error: { message, code } } satisfies ApiFailure,
    { status },
  );
}
