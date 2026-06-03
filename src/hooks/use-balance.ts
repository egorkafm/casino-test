"use client";

import { useEffect } from "react";
import { env } from "@/lib/env";
import { createSocketClient } from "@/lib/ws/socket";
import { useBalanceStore } from "@/store/balance-store";
import { useUser } from "./use-user";

export function useBalanceBootstrap(): void {
  const userQuery = useUser();
  const setBalance = useBalanceStore((s) => s.setBalance);

  useEffect(() => {
    if (!userQuery.data) return;
    const { balance, currency } = userQuery.data;
    if (useBalanceStore.getState().balance === null) {
      setBalance(balance, currency);
    }
  }, [userQuery.data, setBalance]);

  useEffect(() => {
    const client = createSocketClient(env.wsUrl);
    const unsubscribe = client.subscribe((event) => {
      if (event.type === "balance.update") {
        setBalance(event.balance, event.currency);
      }
    });
    client.connect();
    return () => {
      unsubscribe();
      client.disconnect();
    };
  }, [setBalance]);
}

export function useBalance() {
  const userQuery = useUser();
  const balance = useBalanceStore((s) => s.balance);
  const currency = useBalanceStore((s) => s.currency);
  return {
    balance,
    currency,
    isLoading: userQuery.isLoading && balance === null,
    isError: userQuery.isError,
  };
}
