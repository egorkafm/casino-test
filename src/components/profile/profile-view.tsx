"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowLeft, ArrowDownLeft, ArrowUpRight, User } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { useBalance } from "@/hooks/use-balance";
import { useTransactions } from "@/hooks/use-transactions";
import { formatBalanceAmount, formatDateTime } from "@/lib/format";
import type { Transaction } from "@/lib/types/transaction";
import type { Currency } from "@/lib/types/user";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProfileView() {
  const userQuery = useUser();
  const { balance, currency } = useBalance();
  const transactionsQuery = useTransactions();

  const stats = useMemo(
    () => computeStats(transactionsQuery.data ?? []),
    [transactionsQuery.data],
  );

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6">
      <div>
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "text-muted-foreground -ml-2 gap-2 hover:text-white",
          )}
        >
          <ArrowLeft className="size-4" />
          Back to lobby
        </Link>
      </div>

      <ProfileHeader
        username={userQuery.data?.username}
        userId={userQuery.data?.id}
        loading={userQuery.isLoading}
      />

      <BalanceCard
        balance={balance ?? userQuery.data?.balance ?? null}
        currency={currency ?? userQuery.data?.currency ?? null}
      />

      <StatsGrid
        gamesPlayed={stats.gamesPlayed}
        totalWagered={stats.totalWagered}
        totalWon={stats.totalWon}
        lastActivity={stats.lastActivity}
        currency={currency ?? userQuery.data?.currency ?? null}
      />

      <TransactionList
        transactions={transactionsQuery.data}
        currency={currency ?? userQuery.data?.currency ?? null}
        isLoading={transactionsQuery.isLoading}
      />
    </main>
  );
}

function ProfileHeader({
  username,
  userId,
  loading,
}: {
  username?: string;
  userId?: string;
  loading: boolean;
}) {
  return (
    <section className="flex flex-col items-center gap-3 text-center">
      <div
        className="bg-card border-border/60 inline-flex size-24 items-center justify-center rounded-full border shadow-inner"
        aria-hidden
      >
        <User className="text-muted-foreground size-12" strokeWidth={1.5} />
      </div>
      {loading ? (
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-3 w-24" />
        </div>
      ) : (
        <div>
          <h1 className="text-foreground text-2xl font-extrabold">
            {username ?? "—"}
          </h1>
          <p className="text-muted-foreground text-xs tabular-nums">
            ID: {userId ?? "—"}
          </p>
        </div>
      )}
    </section>
  );
}

function BalanceCard({
  balance,
  currency,
}: {
  balance: number | null;
  currency: Currency | null;
}) {
  const ready = balance !== null && currency !== null;
  return (
    <section className="bg-card border-border/40 rounded-md border p-5">
      <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
        Total balance
      </p>
      <div className="mt-2 flex items-baseline gap-2">
        {ready ? (
          <>
            <span className="text-foreground text-3xl font-black tabular-nums">
              {formatBalanceAmount(balance, currency)}
            </span>
            <span className="text-muted-foreground text-sm font-bold tracking-wider">
              {currency}
            </span>
          </>
        ) : (
          <Skeleton className="h-9 w-48" />
        )}
      </div>
    </section>
  );
}

interface StatsGridProps {
  gamesPlayed: number;
  totalWagered: number;
  totalWon: number;
  lastActivity: string | null;
  currency: Currency | null;
}

function StatsGrid({
  gamesPlayed,
  totalWagered,
  totalWon,
  lastActivity,
  currency,
}: StatsGridProps) {
  const items: ReadonlyArray<{ label: string; value: string }> = [
    {
      label: "Games played",
      value: String(gamesPlayed),
    },
    {
      label: "Total wagered",
      value: currency ? formatBalanceAmount(totalWagered, currency) : "—",
    },
    {
      label: "Total won",
      value: currency ? formatBalanceAmount(totalWon, currency) : "—",
    },
    {
      label: "Last activity",
      value: lastActivity ? formatDateTime(lastActivity) : "—",
    },
  ];
  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-card border-border/40 rounded-md border p-3"
        >
          <p className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
            {item.label}
          </p>
          <p className="text-foreground mt-1 truncate text-sm font-bold tabular-nums">
            {item.value}
          </p>
        </div>
      ))}
    </section>
  );
}

function TransactionList({
  transactions,
  currency,
  isLoading,
}: {
  transactions: Transaction[] | undefined;
  currency: Currency | null;
  isLoading: boolean;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-base font-bold">Recent transactions</h2>
        {transactions && (
          <span className="text-muted-foreground text-xs tabular-nums">
            {transactions.length} entries
          </span>
        )}
      </div>

      <div className="bg-card border-border/40 overflow-hidden rounded-md border">
        {isLoading ? (
          <div className="space-y-2 p-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : !transactions || transactions.length === 0 ? (
          <p className="text-muted-foreground p-6 text-center text-sm">
            No transactions yet.
          </p>
        ) : (
          <ul>
            {transactions.map((tx, idx) => (
              <li key={tx.id}>
                {idx > 0 && <Separator className="bg-border/40" />}
                <TransactionRow tx={tx} currency={currency} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function TransactionRow({
  tx,
  currency,
}: {
  tx: Transaction;
  currency: Currency | null;
}) {
  const isCredit = tx.type === "credit";
  const Icon = isCredit ? ArrowDownLeft : ArrowUpRight;
  const sign = isCredit ? "+" : "−";
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span
        className={cn(
          "inline-flex size-9 shrink-0 items-center justify-center rounded-full",
          isCredit ? "bg-emerald-500/15 text-emerald-400" : "bg-rose-500/15 text-rose-400",
        )}
        aria-hidden
      >
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-foreground text-sm font-semibold capitalize">
          {tx.type}
          {tx.gameId && (
            <span className="text-muted-foreground ml-2 text-xs font-normal">
              · game {tx.gameId}
            </span>
          )}
        </p>
        <p className="text-muted-foreground text-xs">
          {formatDateTime(tx.createdAt)}
        </p>
      </div>
      <div className="text-right">
        <p
          className={cn(
            "text-sm font-bold tabular-nums",
            isCredit ? "text-emerald-400" : "text-rose-400",
          )}
        >
          {sign}
          {currency ? formatBalanceAmount(tx.amount, currency) : tx.amount}
        </p>
        <p className="text-muted-foreground text-[10px] tabular-nums">
          bal {currency ? formatBalanceAmount(tx.balanceAfter, currency) : tx.balanceAfter}
        </p>
      </div>
    </div>
  );
}

interface Stats {
  gamesPlayed: number;
  totalWagered: number;
  totalWon: number;
  lastActivity: string | null;
}

function computeStats(transactions: Transaction[]): Stats {
  const gameIds = new Set<string>();
  let totalWagered = 0;
  let totalWon = 0;
  let lastActivity: string | null = null;

  for (const tx of transactions) {
    if (tx.gameId) gameIds.add(tx.gameId);
    if (tx.type === "debit") totalWagered += tx.amount;
    else if (tx.type === "credit" && tx.gameId) totalWon += tx.amount;
    if (!lastActivity || Date.parse(tx.createdAt) > Date.parse(lastActivity)) {
      lastActivity = tx.createdAt;
    }
  }

  return {
    gamesPlayed: gameIds.size,
    totalWagered,
    totalWon,
    lastActivity,
  };
}
