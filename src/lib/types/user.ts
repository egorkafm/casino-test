export const CURRENCIES = ["USD", "EUR", "BTC", "ETH"] as const;
export type Currency = (typeof CURRENCIES)[number];

export interface User {
  id: string;
  username: string;
  balance: number;
  currency: Currency;
}
