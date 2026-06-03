import { apiRequest } from "./client";
import type { Game } from "@/lib/types/game";

export function fetchGames(): Promise<Game[]> {
  return apiRequest<Game[]>("/games");
}
