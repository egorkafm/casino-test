import { apiRequest } from "./client";
import type { Transaction } from "@/lib/types/transaction";

export function fetchTransactions(): Promise<Transaction[]> {
  return apiRequest<Transaction[]>("/transactions");
}
