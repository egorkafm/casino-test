"use client";

import { ChevronDown } from "lucide-react";
import { useBalance } from "@/hooks/use-balance";
import { formatBalanceAmount } from "@/lib/format";
import { Skeleton } from "@/components/ui/skeleton";

export function BalancePill() {
  const { balance, currency, isLoading } = useBalance();

  if (isLoading || balance === null || currency === null) {
    return <Skeleton className="h-9 w-36 rounded-md" />;
  }

  return (
    <button
      type="button"
      className="bg-popover/80 hover:bg-popover flex h-9 items-center gap-2 rounded-md pr-2 pl-3 text-sm font-bold tabular-nums"
      aria-label={`Balance ${formatBalanceAmount(balance, currency)} ${currency}`}
    >
      <span className="text-foreground">{formatBalanceAmount(balance, currency)}</span>
      <CurrencyDot currency={currency} />
      <ChevronDown className="text-muted-foreground size-4" />
    </button>
  );
}

function CurrencyDot({ currency }: { currency: string }) {
  const color = currency === "BTC"
    ? "bg-amber-400"
    : currency === "ETH"
    ? "bg-indigo-400"
    : "bg-emerald-500";
  return (
    <span
      aria-hidden
      className={`inline-flex size-4 items-center justify-center rounded-full text-[9px] font-black text-black ${color}`}
    >
      {currency.charAt(0)}
    </span>
  );
}
