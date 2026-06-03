import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "@/lib/api/user";

export const userQueryKey = ["me"] as const;

export function useUser() {
  return useQuery({
    queryKey: userQueryKey,
    queryFn: fetchMe,
  });
}
