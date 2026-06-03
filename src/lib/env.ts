export const env = {
  useMock: process.env.NEXT_PUBLIC_USE_MOCK === "true",
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api",
  wsUrl: process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:3000/ws",
} as const;
