import type { Transaction } from "@/lib/types/transaction";
import type { User } from "@/lib/types/user";

export const SEED_USER: User = {
  id: "u-001",
  username: "highroller",
  balance: 0.1,
  currency: "BTC",
};

const baseTime = Date.UTC(2025, 4, 18, 12, 0, 0);
const minute = 60_000;

export const SEED_TRANSACTIONS: Transaction[] = [
  {
    id: "t-001",
    type: "credit",
    amount: 0.05,
    balanceAfter: 0.05,
    createdAt: new Date(baseTime).toISOString(),
  },
  {
    id: "t-002",
    type: "debit",
    amount: 0.0001,
    balanceAfter: 0.0499,
    gameId: "296",
    createdAt: new Date(baseTime + 30 * minute).toISOString(),
  },
  {
    id: "t-003",
    type: "credit",
    amount: 0.0002,
    balanceAfter: 0.0501,
    gameId: "296",
    createdAt: new Date(baseTime + 31 * minute).toISOString(),
  },
  {
    id: "t-004",
    type: "credit",
    amount: 0.0499,
    balanceAfter: 0.1,
    createdAt: new Date(baseTime + 120 * minute).toISOString(),
  },
];
