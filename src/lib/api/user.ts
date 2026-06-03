import { apiRequest } from "./client";
import type { User } from "@/lib/types/user";

export function fetchMe(): Promise<User> {
  return apiRequest<User>("/me");
}
