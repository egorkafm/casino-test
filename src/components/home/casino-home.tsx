"use client";

import { useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { RotateCw, Search as SearchIcon } from "lucide-react";
import { PromoCarousel } from "./promo-carousel";
import { SearchBar } from "./search-bar";
import { CategoryTabs, type CategoryFilter } from "./category-tabs";
import { GameSection } from "./game-section";
import { GameGrid } from "./game-grid";
import { SportsBetSection } from "./sports-bet-section";
import { BetsTable } from "./bets-table";
import { SeoBlock } from "./seo-block";
import { SECTION_CONFIG } from "@/lib/config/sections";
import { useGames } from "@/hooks/use-games";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import type { Game } from "@/lib/types/game";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { restartMsw } from "@/mocks/control";
import { env } from "@/lib/env";

export function CasinoHome() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 200);
  const [category, setCategory] = useState<CategoryFilter>("all");
  const router = useRouter();

  const games = useGames();

  const handleGameSelect = useCallback(
    (game: Game) => router.push(`/casino/games/${game.slug}`),
    [router],
  );

  const searchMatches = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    if (!q || !games.data) return [];
    return games.data.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.provider.toLowerCase().includes(q),
    );
  }, [debouncedSearch, games.data]);

  const sections = useMemo(() => {
    if (!games.data) return [];
    const visibleConfig =
      category === "all"
        ? SECTION_CONFIG
        : SECTION_CONFIG.filter((s) => s.category === category);
    return visibleConfig.map((cfg) => ({
      ...cfg,
      games: games.data!.filter((g) => g.category === cfg.category),
    }));
  }, [category, games.data]);

  const isSearching = debouncedSearch.trim().length > 0;

  return (
    <main className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-5 px-4 py-5 sm:px-6">
      <PromoCarousel />

      <div className="flex flex-col gap-3">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryTabs value={category} onChange={setCategory} />
      </div>

      {games.isLoading ? (
        <SectionsSkeleton />
      ) : games.isError ? (
        <LobbyError onRetry={async () => {
          if (env.useMock) await restartMsw().catch(() => undefined);
          games.refetch();
        }} />
      ) : isSearching ? (
        <SearchResults
          query={debouncedSearch}
          results={searchMatches}
          onSelect={handleGameSelect}
        />
      ) : (
        <div className="flex flex-col gap-6">
          {sections.map((s) => (
            <GameSection
              key={s.category}
              title={s.title}
              Icon={s.Icon}
              games={s.games}
              onSelect={handleGameSelect}
            />
          ))}
          <SportsBetSection />
          <BetsTable />
          <SeoBlock />
        </div>
      )}
    </main>
  );
}

function LobbyError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 py-12">
      <p className="text-muted-foreground text-center text-sm">
        Couldn't load the lobby. Please try again.
      </p>
      <Button size="sm" variant="secondary" onClick={onRetry} className="gap-2">
        <RotateCw className="size-3.5" />
        Try again
      </Button>
    </div>
  );
}

function SearchResults({
  query,
  results,
  onSelect,
}: {
  query: string;
  results: Game[];
  onSelect: (game: Game) => void;
}) {
  if (results.length === 0) {
    return (
      <div className="text-muted-foreground flex flex-col items-center gap-2 py-12 text-center text-sm">
        <SearchIcon className="size-6" />
        <p>
          No games match <span className="text-foreground font-semibold">"{query}"</span>.
        </p>
      </div>
    );
  }
  return (
    <section aria-label={`Search results for ${query}`} className="space-y-3">
      <div className="flex min-h-8 items-center justify-between">
        <div className="flex items-center gap-2">
          <SearchIcon className="text-primary size-5" />
          <h2 className="text-foreground text-base font-bold">Search results</h2>
        </div>
        <span className="text-muted-foreground text-xs tabular-nums">
          {results.length} games
        </span>
      </div>
      <GameGrid games={results} onSelect={onSelect} />
    </section>
  );
}

function SectionsSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-5 w-40" />
          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 8 }).map((__, j) => (
              <Skeleton
                key={j}
                className="aspect-[3/4] flex-[0_0_42%] sm:flex-[0_0_28%] md:flex-[0_0_20%] lg:flex-[0_0_14.28%] xl:flex-[0_0_12.5%]"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
