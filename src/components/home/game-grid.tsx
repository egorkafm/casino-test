"use client";

import type { Game } from "@/lib/types/game";
import { GameCard } from "./game-card";

interface GameGridProps {
  games: Game[];
  onSelect: (game: Game) => void;
}

export function GameGrid({ games, onSelect }: GameGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
      {games.map((game) => (
        <GameCard key={game.id} game={game} onSelect={onSelect} />
      ))}
    </div>
  );
}
