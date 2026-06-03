import type { Currency } from "./user";

export interface BalanceUpdateEvent {
  type: "balance.update";
  balance: number;
  currency: Currency;
}

export type WsEvent = BalanceUpdateEvent;
