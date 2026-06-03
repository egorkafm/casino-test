import type { ClientType } from "@/lib/types/session";

export function detectLocale(): string {
  if (typeof navigator === "undefined") return "en";
  const raw = navigator.language || "en";
  return raw.slice(0, 2).toLowerCase();
}

export function detectClientType(): ClientType {
  if (typeof window === "undefined") return "desktop";
  const ua = navigator.userAgent?.toLowerCase() ?? "";
  const mobileUa = /mobile|android|iphone|ipad|ipod/.test(ua);
  const coarsePointer = window.matchMedia?.("(pointer: coarse)").matches ?? false;
  return mobileUa || coarsePointer ? "mobile" : "desktop";
}
