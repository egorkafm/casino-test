import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@/lib/api/client";
import { startSession } from "@/lib/api/sessions";
import { useBalanceStore } from "@/store/balance-store";
import { transactionsQueryKey } from "./use-transactions";
import { userQueryKey } from "./use-user";

export function useStartSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: startSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionsQueryKey });
      queryClient.invalidateQueries({ queryKey: userQueryKey });
    },
    onError: (error) => {
      if (!(error instanceof ApiError) || error.balance === undefined) return;
      const currency = useBalanceStore.getState().currency;
      if (!currency) return;
      useBalanceStore.getState().setBalance(error.balance, currency);
    },
  });
}
