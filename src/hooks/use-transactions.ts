import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "@/lib/api/transactions";

export const transactionsQueryKey = ["transactions"] as const;

export function useTransactions() {
  return useQuery({
    queryKey: transactionsQueryKey,
    queryFn: fetchTransactions,
  });
}
