"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { env } from "@/lib/env";
import { useBalanceBootstrap } from "@/hooks/use-balance";
import { startMsw } from "@/mocks/control";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
}

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(makeQueryClient);
  const [ready, setReady] = useState(!env.useMock);

  useEffect(() => {
    if (!env.useMock) return;
    let cancelled = false;
    startMsw()
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <BalanceBootstrap />
      {children}
    </QueryClientProvider>
  );
}

function BalanceBootstrap() {
  useBalanceBootstrap();
  return null;
}
