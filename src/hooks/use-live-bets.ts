"use client";

import { useEffect, useRef, useState } from "react";
import type { Bet, LeaderboardEntry } from "@/lib/types/bet";
import {
  SEED_BETS,
  SEED_HIGH_ROLLER_BETS,
  SEED_LEADERBOARD,
  randomBet,
} from "@/mocks/data/bets";

export function useLiveBets(type: "all" | "highroller"): Bet[] {
  const seed = type === "highroller" ? SEED_HIGH_ROLLER_BETS : SEED_BETS;
  const [bets, setBets] = useState<Bet[]>(seed);
  const counterRef = useRef(seed.length);
  const intervalMs = type === "highroller" ? 4000 : 2200;

  useEffect(() => {
    const id = setInterval(() => {
      counterRef.current++;
      const next = randomBet(`live-${counterRef.current}`, type === "highroller");
      setBets((prev) => [next, ...prev.slice(0, 19)]);
    }, intervalMs);
    return () => clearInterval(id);
  }, [type, intervalMs]);

  return bets;
}

export function useLeaderboard(): LeaderboardEntry[] {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(SEED_LEADERBOARD);

  useEffect(() => {
    const id = setInterval(() => {
      setEntries((prev) =>
        prev.map((e) => ({
          ...e,
          wagered: Math.round(e.wagered + Math.random() * 500),
          profit: Math.round(e.profit + (Math.random() - 0.4) * 200),
        })),
      );
    }, 10_000);
    return () => clearInterval(id);
  }, []);

  return entries;
}
