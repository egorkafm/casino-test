import { ws } from "msw";
import { env } from "@/lib/env";
import type { BalanceUpdateEvent } from "@/lib/types/ws";
import { mockState } from "./state";

function balanceEvent(): BalanceUpdateEvent {
  const user = mockState.getUser();
  return { type: "balance.update", balance: user.balance, currency: user.currency };
}

const balanceLink = ws.link(env.wsUrl);

const balanceHandler = balanceLink.addEventListener("connection", ({ client }) => {
  client.send(JSON.stringify(balanceEvent()));
});

mockState.subscribe(() => {
  balanceLink.broadcast(JSON.stringify(balanceEvent()));
});

export const wsHandlers = [balanceHandler];
