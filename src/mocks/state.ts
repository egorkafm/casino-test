import type { Transaction } from "@/lib/types/transaction";
import type { User } from "@/lib/types/user";
import { SEED_GAMES } from "./data/games";
import { SEED_TRANSACTIONS, SEED_USER } from "./data/user";

type Listener = (user: User) => void;

let user: User = { ...SEED_USER };
const transactions: Transaction[] = [...SEED_TRANSACTIONS];
const listeners = new Set<Listener>();

let txCounter = transactions.length;
const nextTxId = () => `t-${String(++txCounter).padStart(3, "0")}`;

function notify() {
  for (const listener of listeners) listener(user);
}

export const mockState = {
  games: SEED_GAMES,

  getUser(): User {
    return { ...user };
  },

  getTransactions(): Transaction[] {
    return [...transactions].sort(
      (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
    );
  },

  debit(amount: number, gameId?: string): Transaction {
    if (amount <= 0) throw new Error("Debit amount must be positive");
    const balanceAfter = Math.max(0, user.balance - amount);
    user = { ...user, balance: balanceAfter };
    const tx: Transaction = {
      id: nextTxId(),
      type: "debit",
      amount,
      balanceAfter,
      gameId,
      createdAt: new Date().toISOString(),
    };
    transactions.push(tx);
    notify();
    return tx;
  },

  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
