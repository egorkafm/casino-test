"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Monitor, Smartphone, Zap, BarChart2, Play, AlertCircle, Loader2, RotateCw } from "lucide-react";
import { useGames } from "@/hooks/use-games";
import { useStartSession } from "@/hooks/use-start-session";
import { useUser } from "@/hooks/use-user";
import { detectClientType, detectLocale } from "@/lib/client-context";
import { restartMsw } from "@/mocks/control";
import { env } from "@/lib/env";
import { GameCard } from "./game-card";
import { GameThumbnail } from "./game-thumbnail";
import { GameLauncher } from "./game-launcher";
import { BetsTable } from "./bets-table";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/lib/types/game";
import type { Game } from "@/lib/types/game";

interface GamePageProps {
  slug: string;
}

export function GamePage({ slug }: GamePageProps) {
  const games = useGames();
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const router = useRouter();
  const handleBack = useCallback(() => router.back(), [router]);

  const game = useMemo(
    () => games.data?.find((g) => g.slug === slug) ?? null,
    [games.data, slug],
  );

  const related = useMemo(() => {
    if (!game || !games.data) return [];
    return games.data
      .filter((g) => g.category === game.category && g.id !== game.id)
      .slice(0, 8);
  }, [game, games.data]);

  if (games.isLoading) return <GamePageSkeleton />;

  if (games.isError || (!games.isLoading && !game)) {
    return (
      <div className="flex flex-col items-center gap-3 py-20">
        <AlertCircle className="text-muted-foreground size-8" />
        <p className="text-muted-foreground text-sm">
          {games.isError ? "Failed to load games." : `Game "${slug}" not found.`}
        </p>
        <Link href="/" className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}>
          Back to lobby
        </Link>
      </div>
    );
  }

  if (!game) return null;

  return (
    <main className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-6 px-4 py-5 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleBack}
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1.5")}
        >
          <ArrowLeft className="size-3.5" />
          Back
        </button>
        <span className="text-muted-foreground text-xs">/</span>
        <span className="text-muted-foreground text-xs">{CATEGORY_LABELS[game.category]}</span>
        <span className="text-muted-foreground text-xs">/</span>
        <span className="text-foreground text-xs font-medium">{game.name}</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <GameEmbed game={game} />

        <aside className="flex flex-col gap-5">
          <GameMeta game={game} onPlay={() => setActiveGame(game)} />
        </aside>
      </div>

      <BetsTable />

      {related.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-foreground text-base font-bold">
            More from {CATEGORY_LABELS[game.category]}
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3 sm:grid-cols-[repeat(auto-fill,minmax(140px,1fr))]">
            {related.map((g) => (
              <GameCard key={g.id} game={g} onSelect={(g) => router.push(`/casino/games/${g.slug}`)} />
            ))}
          </div>
        </section>
      )}

      <GameLauncher game={activeGame} onClose={() => setActiveGame(null)} />
    </main>
  );
}

function GameEmbed({ game }: { game: Game }) {
  const { mutate, data, error, isPending, reset } = useStartSession();
  const userQuery = useUser();

  const locale = useMemo(() => detectLocale(), []);
  const clientType = useMemo(() => detectClientType(), []);

  const start = useCallback(() => {
    mutate({
      gameId: game.id,
      locale,
      clientType,
      currency: userQuery.data?.currency,
    });
  }, [mutate, game.id, locale, clientType, userQuery.data?.currency]);

  if (!data && !isPending && !error) {
    return (
      <div className="bg-muted/40 relative aspect-video w-full overflow-hidden rounded-xl">
        <GameThumbnail
          gameId={game.id}
          title={game.name}
          sizes="(max-width: 1024px) 100vw, 70vw"
          className="size-full object-cover blur-sm brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div className="text-center">
            <p className="text-xl font-black tracking-wide text-white uppercase drop-shadow-lg sm:text-3xl">
              {game.name}
            </p>
            <p className="mt-1 text-sm font-medium text-white/70">{game.provider}</p>
          </div>
          <button
            type="button"
            onClick={start}
            className="bg-primary text-primary-foreground inline-flex size-16 items-center justify-center rounded-full shadow-xl transition-transform hover:scale-105 active:scale-95"
            aria-label={`Play ${game.name}`}
          >
            <Play className="size-7" fill="currentColor" />
          </button>
        </div>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="bg-muted/40 flex aspect-video w-full items-center justify-center rounded-xl">
        <div className="text-muted-foreground flex flex-col items-center gap-2 text-sm">
          <Loader2 className="size-6 animate-spin" />
          <span>Starting session…</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-muted/40 flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-xl">
        <AlertCircle className="size-6 text-rose-400" />
        <span className="text-foreground text-sm">{error.message}</span>
        <Button
          size="sm"
          variant="secondary"
          onClick={async () => {
            if (env.useMock) await restartMsw().catch(() => undefined);
            reset();
            start();
          }}
          className="gap-2"
        >
          <RotateCw className="size-3.5" />
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
      <iframe
        key={data!.sessionId}
        title={game.name}
        src={data!.launchUrl}
        className="absolute inset-0 size-full"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock allow-popups-to-escape-sandbox"
        allow="autoplay; fullscreen; payment; microphone; camera"
      />
    </div>
  );
}

function GameMeta({ game, onPlay }: { game: Game; onPlay: () => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-foreground text-2xl font-black tracking-tight">{game.name}</h1>
        <p className="text-muted-foreground mt-0.5 text-sm">{game.provider}</p>
      </div>

      {game.badges && game.badges.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {game.badges.map((badge) => (
            <Badge
              key={badge.label}
              variant="secondary"
              className={cn(
                "px-2 py-0.5 text-xs font-bold tracking-wide uppercase",
                badge.tone === "hot" && "bg-rose-500 text-white",
                badge.tone === "new" && "bg-emerald-500 text-white",
                badge.tone === "exclusive" && "bg-amber-500 text-black",
              )}
            >
              {badge.label}
            </Badge>
          ))}
        </div>
      )}

      <Button onClick={onPlay} className="w-full gap-2">
        <Play className="size-4" fill="currentColor" />
        Play Now
      </Button>

      <div className="border-border/40 grid grid-cols-2 gap-px overflow-hidden rounded-lg border">
        {game.rtp !== undefined && (
          <MetaStat
            icon={<Zap className="size-3.5" />}
            label="RTP"
            value={`${game.rtp}%`}
          />
        )}
        {game.volatilityRating && (
          <MetaStat
            icon={<BarChart2 className="size-3.5" />}
            label="Volatility"
            value={game.volatilityRating}
          />
        )}
        <MetaStat
          label="Category"
          value={CATEGORY_LABELS[game.category]}
        />
        {game.devices && game.devices.length > 0 && (
          <MetaStat
            label="Devices"
            value={
              <span className="flex items-center gap-1">
                {game.devices.includes("desktop") && <Monitor className="size-3" />}
                {game.devices.includes("mobile") && <Smartphone className="size-3" />}
              </span>
            }
          />
        )}
      </div>

      {game.description && (
        <p className="text-muted-foreground text-xs leading-relaxed">{game.description}</p>
      )}
    </div>
  );
}

function MetaStat({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="bg-muted/30 flex flex-col gap-0.5 px-3 py-2.5">
      <span className="text-muted-foreground flex items-center gap-1 text-[10px] font-medium tracking-wider uppercase">
        {icon}
        {label}
      </span>
      <span className="text-foreground text-sm font-semibold capitalize">{value}</span>
    </div>
  );
}

function GamePageSkeleton() {
  return (
    <main className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-6 px-4 py-5 sm:px-6">
      <Skeleton className="h-5 w-48" />
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Skeleton className="aspect-video w-full rounded-xl" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-full" />
          <div className="grid grid-cols-2 gap-px">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-14" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
