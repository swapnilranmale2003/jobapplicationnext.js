import { env } from "@/config/env";
import type { ApiResponse } from "@/types";
import { ApiError } from "./api-error";

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

/**
 * Thin wrapper around fetch for calling our API.
 * Services (src/services) should use this instead of calling fetch directly.
 */
async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options;

  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const payload = (await response.json().catch(() => null)) as ApiResponse<T> | null;

  if (!response.ok || !payload || !payload.success) {
    const message = payload && !payload.success ? payload.error.message : response.statusText;
    const code = payload && !payload.success ? payload.error.code : undefined;
    throw new ApiError(message || "Request failed", response.status, code);
  }

  return payload.data;
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "POST", body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "PUT", body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "PATCH", body }),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "DELETE" }),
};
