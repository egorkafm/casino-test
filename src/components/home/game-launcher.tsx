"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertCircle, Loader2, RotateCw } from "lucide-react";
import type { Game } from "@/lib/types/game";
import { useStartSession } from "@/hooks/use-start-session";
import { useUser } from "@/hooks/use-user";
import { detectClientType, detectLocale } from "@/lib/client-context";
import { restartMsw } from "@/mocks/control";
import { env } from "@/lib/env";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface GameLauncherProps {
  game: Game | null;
  onClose: () => void;
}

export function GameLauncher({ game, onClose }: GameLauncherProps) {
  const { mutate, data, error, isPending, reset } = useStartSession();
  const userQuery = useUser();
  const [isRetrying, setIsRetrying] = useState(false);

  const hints = useMemo(
    () => ({ locale: detectLocale(), clientType: detectClientType() }),
    [],
  );

  const startSession = useCallback(
    (target: Game) => {
      mutate({
        gameId: target.id,
        locale: hints.locale,
        clientType: hints.clientType,
        currency: userQuery.data?.currency,
      });
    },
    [mutate, hints, userQuery.data?.currency],
  );

  useEffect(() => {
    if (!game) {
      reset();
      return;
    }
    startSession(game);
  }, [game, startSession, reset]);

  const handleRetry = useCallback(async () => {
    if (!game) return;
    setIsRetrying(true);
    try {
      if (env.useMock) await restartMsw().catch(() => undefined);
      reset();
      startSession(game);
    } finally {
      setIsRetrying(false);
    }
  }, [game, reset, startSession]);

  return (
    <Dialog open={game !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="flex max-h-[92dvh] w-full h-full max-w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-5xl">
        <DialogHeader className="shrink-0 space-y-1 border-b p-4">
          <DialogTitle className="text-base font-bold">
            {game?.name ?? "Game"}
          </DialogTitle>
          <DialogDescription className="text-xs">
            {game?.provider}
          </DialogDescription>
        </DialogHeader>
        <div className="relative min-h-0 flex-1 bg-muted/40">
          {(isPending || isRetrying) && (
            <LauncherStatus>
              <Loader2 className="size-5 animate-spin" />
              <span>Starting session…</span>
            </LauncherStatus>
          )}
          {error && !isPending && !isRetrying && (
            <LauncherStatus>
              <AlertCircle className="size-5 text-rose-400" />
              <span className="text-foreground">{error.message}</span>
              <Button
                size="sm"
                variant="secondary"
                onClick={handleRetry}
                className="mt-2 gap-2"
              >
                <RotateCw className="size-3.5" />
                Try again
              </Button>
            </LauncherStatus>
          )}
          {data && !isPending && !isRetrying && !error && (
            <iframe
              key={data.sessionId}
              title={`Game ${game?.name ?? ""}`}
              src={data.launchUrl}
              className="absolute inset-0 size-full bg-black"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock allow-popups-to-escape-sandbox"
              allow="autoplay; fullscreen; payment; microphone; camera"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function LauncherStatus({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2 text-sm">
      {children}
    </div>
  );
}
