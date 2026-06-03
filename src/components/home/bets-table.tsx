"use client";

import { ArrowDownLeft, ArrowUpRight, Medal } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useLiveBets, useLeaderboard } from "@/hooks/use-live-bets";
import { useTransactions } from "@/hooks/use-transactions";
import { useUser } from "@/hooks/use-user";
import type { Bet, LeaderboardEntry } from "@/lib/types/bet";
import type { Transaction } from "@/lib/types/transaction";
import type { Currency } from "@/lib/types/user";
import { cn } from "@/lib/utils";

const COL_BETS = "grid-cols-[2fr_1fr_0.7fr_1.2fr_0.9fr_1.2fr]";
const COL_LEADERBOARD = "grid-cols-[40px_1fr_1fr_1fr]";

function fmtUsd(n: number) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

export function BetsTable() {
  return (
    <section aria-label="Bets activity">
      <Tabs defaultValue="high-rollers">
        <TabsList className="h-9 w-fit gap-1 rounded-lg bg-muted p-1">
          <TabsTrigger value="my-bets" className="rounded-md px-3 text-xs font-semibold">
            My Bets
          </TabsTrigger>
          <TabsTrigger value="all-bets" className="rounded-md px-3 text-xs font-semibold">
            All Bets
          </TabsTrigger>
          <TabsTrigger value="high-rollers" className="rounded-md px-3 text-xs font-semibold">
            High Rollers
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="rounded-md px-3 text-xs font-semibold">
            Race Leaderboard
          </TabsTrigger>
        </TabsList>

        <div className="bg-card border-border/40 mt-2 overflow-hidden rounded-md border">
          <TabsContent value="my-bets">
            <MyBetsPanel />
          </TabsContent>
          <TabsContent value="all-bets">
            <LiveBetsPanel type="all" />
          </TabsContent>
          <TabsContent value="high-rollers">
            <LiveBetsPanel type="highroller" />
          </TabsContent>
          <TabsContent value="leaderboard">
            <LeaderboardPanel />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}

function BetTableHeader({ cols }: { cols: string }) {
  return (
    <div className={cn("grid border-b border-border/40 px-4 py-2.5", cols)}>
      <span className="text-muted-foreground text-xs font-semibold">Game</span>
      <span className="text-muted-foreground text-xs font-semibold">User</span>
      <span className="text-muted-foreground text-right text-xs font-semibold">Time</span>
      <span className="text-muted-foreground text-right text-xs font-semibold">Bet Amount</span>
      <span className="text-muted-foreground text-right text-xs font-semibold">Multiplier</span>
      <span className="text-muted-foreground text-right text-xs font-semibold">Payout</span>
    </div>
  );
}

function LeaderboardHeader({ cols }: { cols: string }) {
  return (
    <div className={cn("grid border-b border-border/40 px-4 py-2.5", cols)}>
      <span className="text-muted-foreground text-xs font-semibold">#</span>
      <span className="text-muted-foreground text-xs font-semibold">Player</span>
      <span className="text-muted-foreground text-right text-xs font-semibold">Wagered</span>
      <span className="text-muted-foreground text-right text-xs font-semibold">Profit</span>
    </div>
  );
}

function MyBetsPanel() {
  const txQuery = useTransactions();
  const userQuery = useUser();
  const currency = userQuery.data?.currency ?? "BTC";

  if (txQuery.isLoading) return <PanelSkeleton />;

  const txs = txQuery.data ?? [];

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[560px]">
        <BetTableHeader cols={COL_BETS} />
        <ScrollArea className="h-[300px]">
          {txs.length === 0 ? (
            <EmptyState label="No bets yet." />
          ) : (
            txs.map((tx) => <MyBetRow key={tx.id} tx={tx} currency={currency} />)
          )}
        </ScrollArea>
      </div>
    </div>
  );
}

function MyBetRow({ tx, currency: _currency }: { tx: Transaction; currency: Currency }) {
  const isCredit = tx.type === "credit";
  const Icon = isCredit ? ArrowDownLeft : ArrowUpRight;

  return (
    <div className={cn("grid items-center border-b border-border/40 px-4 py-2 last:border-0 transition-colors hover:bg-muted/30", COL_BETS)}>
      <div className="flex min-w-0 items-center gap-2">
        <span className={cn("inline-flex size-5 shrink-0 items-center justify-center rounded-full", isCredit ? "bg-emerald-500/15 text-emerald-400" : "bg-rose-500/15 text-rose-400")}>
          <Icon className="size-3" />
        </span>
        <span className="text-foreground truncate text-xs font-semibold">
          {tx.gameId ? `Game ${tx.gameId}` : isCredit ? "Deposit" : "Withdrawal"}
        </span>
      </div>
      <span className="text-muted-foreground truncate text-xs">you</span>
      <span className="text-muted-foreground text-right text-xs tabular-nums">
        {fmtTime(tx.createdAt)}
      </span>
      <span className="text-foreground text-right text-xs tabular-nums">
        {fmtUsd(tx.amount)}
      </span>
      <span className={cn("text-right text-xs tabular-nums font-semibold", isCredit ? "text-emerald-400" : "text-muted-foreground")}>
        {isCredit ? "win" : "—"}
      </span>
      <span className={cn("text-right text-xs tabular-nums", isCredit ? "text-emerald-400" : "text-rose-400")}>
        {isCredit ? fmtUsd(tx.amount) : `−${fmtUsd(tx.amount)}`}
      </span>
    </div>
  );
}

function LiveBetsPanel({ type }: { type: "all" | "highroller" }) {
  const bets = useLiveBets(type);
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[560px]">
        <BetTableHeader cols={COL_BETS} />
        <ScrollArea className="h-[300px]">
          {bets.map((bet) => <BetRow key={bet.id} bet={bet} />)}
        </ScrollArea>
      </div>
    </div>
  );
}

function BetRow({ bet }: { bet: Bet }) {
  const won = bet.multiplier > 0;
  return (
    <div className={cn("grid items-center border-b border-border/40 px-4 py-2 last:border-0 transition-colors hover:bg-muted/30", COL_BETS)}>
      <span className="text-foreground truncate text-xs font-semibold">{bet.game}</span>
      <span className="text-muted-foreground truncate text-xs">{bet.user}</span>
      <span className="text-muted-foreground text-right text-xs tabular-nums">{fmtTime(bet.time)}</span>
      <span className="text-foreground text-right text-xs tabular-nums">{fmtUsd(bet.amount)}</span>
      <span className={cn("text-right text-xs tabular-nums font-bold", won ? "text-emerald-400" : "text-muted-foreground")}>
        {won ? `${bet.multiplier.toFixed(2)}x` : "0.00x"}
      </span>
      <span className={cn("text-right text-xs tabular-nums", won ? "text-emerald-400" : "text-rose-400")}>
        {won ? fmtUsd(bet.payout) : `−${fmtUsd(bet.amount)}`}
      </span>
    </div>
  );
}

function LeaderboardPanel() {
  const entries = useLeaderboard();
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[400px]">
        <LeaderboardHeader cols={COL_LEADERBOARD} />
        <ScrollArea className="h-[300px]">
          {entries.map((entry) => <LeaderboardRow key={entry.rank} entry={entry} />)}
        </ScrollArea>
      </div>
    </div>
  );
}

function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
  const isProfit = entry.profit >= 0;
  return (
    <div className={cn("grid items-center border-b border-border/40 px-4 py-2.5 last:border-0 transition-colors hover:bg-muted/30", COL_LEADERBOARD)}>
      <RankBadge rank={entry.rank} />
      <span className="text-foreground truncate text-xs font-semibold">{entry.user}</span>
      <span className="text-muted-foreground text-right text-xs tabular-nums">{fmtUsd(entry.wagered)}</span>
      <span className={cn("text-right text-xs tabular-nums font-bold", isProfit ? "text-emerald-400" : "text-rose-400")}>
        {isProfit ? "+" : ""}{fmtUsd(entry.profit)}
      </span>
    </div>
  );
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <Medal className="size-4 text-amber-400" />;
  if (rank === 2) return <Medal className="size-4 text-slate-300" />;
  if (rank === 3) return <Medal className="size-4 text-amber-600" />;
  return <span className="text-muted-foreground text-xs tabular-nums">{rank}</span>;
}

function PanelSkeleton() {
  return (
    <div className="space-y-2 p-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-9 w-full" />
      ))}
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <p className="text-muted-foreground py-8 text-center text-sm">{label}</p>
  );
}
