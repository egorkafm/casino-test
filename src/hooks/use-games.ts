import { useQuery } from "@tanstack/react-query";
import { fetchGames } from "@/lib/api/games";

export const gamesQueryKey = ["games"] as const;

export function useGames() {
  return useQuery({
    queryKey: gamesQueryKey,
    queryFn: fetchGames,
    staleTime: 5 * 60_000,
  });
}
