import type { Currency } from "./user";

export type ClientType = "mobile" | "desktop";

export interface StartSessionRequest {
  gameId: string;
  locale?: string;
  clientType?: ClientType;
  currency?: Currency;
}

export interface GameSession {
  sessionId: string;
  gameId: string;
  launchUrl: string;
}
