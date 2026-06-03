"use client";

import type { Game } from "@/lib/types/game";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatPlayingCount } from "@/lib/format";
import { GameThumbnail } from "./game-thumbnail";

interface GameCardProps {
  game: Game;
  onSelect: (game: Game) => void;
}

export function GameCard({ game, onSelect }: GameCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(game)}
      className="group focus-visible:ring-ring block w-full cursor-pointer text-left transition-transform duration-200 hover:-translate-y-1 focus-visible:rounded-md focus-visible:ring-2 focus-visible:outline-none"
      aria-label={`Play ${game.name}`}
    >
      <div className="bg-muted relative aspect-[3/4] w-full overflow-hidden rounded-md">
        <GameThumbnail
          gameId={game.id}
          title={game.name}
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 13vw"
          className="size-full object-cover"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black/90" />

        {game.badges && game.badges.length > 0 && (
          <div className="absolute top-1.5 left-1.5 flex flex-wrap gap-1">
            {game.badges.map((badge) => (
              <Badge
                key={badge.label}
                variant="secondary"
                className={cn(
                  "px-1.5 py-0 text-[10px] font-bold tracking-wide uppercase",
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

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-0.5 px-2 pb-3 text-center">
          <span className="line-clamp-2 text-sm font-black tracking-wide text-white uppercase drop-shadow-md sm:text-base">
            {game.name}
          </span>
          <span className="text-[10px] font-semibold tracking-wider text-white/70 uppercase">
            {game.provider}
          </span>
        </div>

      </div>

      <div className="mt-2 flex items-center justify-center gap-1.5 text-xs">
        <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden />
        <span className="text-foreground font-semibold tabular-nums">
          {formatPlayingCount(game.playingNow)}
        </span>
        <span className="text-muted-foreground">playing</span>
      </div>
    </button>
  );
}
