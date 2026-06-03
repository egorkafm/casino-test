"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";
import type { Game } from "@/lib/types/game";
import { GameCard } from "./game-card";
import { Button } from "@/components/ui/button";

interface GameSectionProps {
  title: string;
  Icon: LucideIcon;
  games: Game[];
  onSelect: (game: Game) => void;
}

export function GameSection({ title, Icon, games, onSelect }: GameSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    update();
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (games.length === 0) return null;

  return (
    <section aria-label={title} className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="text-primary size-5" />
          <h2 className="text-foreground text-base font-bold">{title}</h2>
        </div>
        <div className="flex gap-1">
          <Button
            size="icon"
            variant="secondary"
            disabled={!canPrev}
            onClick={scrollPrev}
            aria-label="Scroll left"
            className="size-8 rounded-md"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            disabled={!canNext}
            onClick={scrollNext}
            aria-label="Scroll right"
            className="size-8 rounded-md"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
      <div className="overflow-x-hidden overflow-y-visible" ref={emblaRef}>
        <div className="flex gap-3 pb-2 pt-2">
          {games.map((game) => (
            <div
              key={game.id}
              className="min-w-0 flex-[0_0_45%] sm:flex-[0_0_30%] md:flex-[0_0_22%] lg:flex-[0_0_14.28%] xl:flex-[0_0_12.5%]"
            >
              <GameCard game={game} onSelect={onSelect} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
