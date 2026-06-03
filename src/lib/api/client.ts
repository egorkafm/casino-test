import { env } from "@/lib/env";

export class ApiError extends Error {
  readonly status: number;
  readonly code?: number;
  readonly balance?: number;
  readonly body: unknown;

  constructor(init: {
    message: string;
    status: number;
    code?: number;
    balance?: number;
    body: unknown;
  }) {
    super(init.message);
    this.name = "ApiError";
    this.status = init.status;
    this.code = init.code;
    this.balance = init.balance;
    this.body = init.body;
  }
}

export interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined>;
}

function buildUrl(path: string, query?: RequestOptions["query"]): string {
  const base = env.apiUrl.replace(/\/$/, "");
  const target = path.startsWith("/") ? path : `/${path}`;
  let url = `${base}${target}`;
  if (query) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined) continue;
      params.set(key, String(value));
    }
    const qs = params.toString();
    if (qs) url += `?${qs}`;
  }
  return url;
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { body, query, headers, ...init } = options;

  const requestInit: RequestInit = {
    ...init,
    headers: {
      Accept: "application/json",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(buildUrl(path, query), requestInit);

  const text = await response.text();
  const parsed = text ? (safeParse(text) as unknown) : undefined;

  if (!response.ok) {
    throw new ApiError({
      message:
        pickString(parsed, ["message", "error"]) ??
        `Request failed: ${response.status}`,
      status: response.status,
      code: pickNumber(parsed, ["code"]),
      balance: pickNumber(parsed, ["balance"]),
      body: parsed,
    });
  }

  return parsed as T;
}

function safeParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function pickString(source: unknown, keys: readonly string[]): string | undefined {
  if (!isRecord(source)) return undefined;
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.length > 0) return value;
  }
  return undefined;
}

function pickNumber(source: unknown, keys: readonly string[]): number | undefined {
  if (!isRecord(source)) return undefined;
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
  }
  return undefined;
}
