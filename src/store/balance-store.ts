import { create } from "zustand";
import type { Currency } from "@/lib/types/user";

interface BalanceState {
  balance: number | null;
  currency: Currency | null;
  setBalance: (balance: number, currency: Currency) => void;
  reset: () => void;
}

export const useBalanceStore = create<BalanceState>((set) => ({
  balance: null,
  currency: null,
  setBalance: (balance, currency) => set({ balance, currency }),
  reset: () => set({ balance: null, currency: null }),
}));
