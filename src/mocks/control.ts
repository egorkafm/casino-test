import { env } from "@/lib/env";

const startOptions = {
  onUnhandledRequest: "warn" as const,
  serviceWorker: {
    url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/mockServiceWorker.js`,
  },
  quiet: false,
};

let mswReady: Promise<void> | null = null;

export function startMsw(): Promise<void> {
  if (!env.useMock) return Promise.resolve();
  if (mswReady) return mswReady;
  mswReady = import("./browser")
    .then(({ worker }) => worker.start(startOptions))
    .then(() => {
      console.info("[MSW] worker started");
    })
    .catch((error) => {
      console.error("[MSW] failed to start", error);
      mswReady = null;
      throw error;
    });
  return mswReady;
}

export async function restartMsw(): Promise<void> {
  if (!env.useMock) return;
  mswReady = null;
  try {
    const { worker } = await import("./browser");
    worker.stop();
  } catch (error) {
    console.warn("[MSW] stop failed (might not be running)", error);
  }
  return startMsw();
}
