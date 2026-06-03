"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import type { SportEvent } from "@/lib/types/sport";
import { SEED_SPORT_EVENTS } from "@/mocks/data/sports";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SportsBetSection() {
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

  return (
    <section aria-label="Best picks in sports" className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="text-primary size-5" />
          <h2 className="text-foreground text-base font-bold">Best Picks in Sports</h2>
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

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">
          {SEED_SPORT_EVENTS.map((event) => (
            <div key={event.id} className="flex-[0_0_230px]">
              <SportEventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SportEventCard({ event }: { event: SportEvent }) {
  return (
    <div className="bg-card border-border/40 flex flex-col gap-3 rounded-md border p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-muted-foreground min-w-0 truncate text-xs font-semibold">
          {event.sport} · {event.league}
        </span>
        {event.isLive ? (
          <span className="flex shrink-0 items-center gap-1 text-xs font-bold text-rose-400">
            <span className="size-1.5 animate-pulse rounded-full bg-rose-400" />
            {event.liveMinute}&apos;
          </span>
        ) : (
          <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
            {event.kickoff ? formatKickoff(event.kickoff) : ""}
          </span>
        )}
      </div>

      <div className="space-y-0.5 text-center">
        <p className="text-foreground text-sm font-bold">{event.homeTeam}</p>
        <p className="text-muted-foreground text-xs">vs</p>
        <p className="text-foreground text-sm font-bold">{event.awayTeam}</p>
      </div>

      <div className={cn("grid gap-1.5", event.odds.draw !== undefined ? "grid-cols-3" : "grid-cols-2")}>
        <OddsButton label="1" value={event.odds.home} />
        {event.odds.draw !== undefined && <OddsButton label="X" value={event.odds.draw} />}
        <OddsButton label="2" value={event.odds.away} />
      </div>
    </div>
  );
}

function OddsButton({ label, value }: { label: string; value: number }) {
  return (
    <button
      type="button"
      className="bg-secondary hover:bg-accent flex flex-col items-center gap-0.5 rounded px-2 py-1.5 transition-colors"
    >
      <span className="text-muted-foreground text-[10px] font-semibold">{label}</span>
      <span className="text-foreground text-sm font-bold tabular-nums">{value.toFixed(2)}</span>
    </button>
  );
}

function formatKickoff(iso: string): string {
  const d = new Date(iso);
  return (
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" }) +
    " " +
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })
  );
}
