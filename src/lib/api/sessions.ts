import { apiRequest } from "./client";
import type { GameSession, StartSessionRequest } from "@/lib/types/session";

export function startSession(input: StartSessionRequest): Promise<GameSession> {
  return apiRequest<GameSession>("/games", {
    method: "POST",
    body: input,
  });
}
