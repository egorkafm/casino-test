export type TransactionType = "debit" | "credit";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  balanceAfter: number;
  gameId?: string;
  createdAt: string;
}
