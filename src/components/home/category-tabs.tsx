"use client";

import { Flame, type LucideIcon } from "lucide-react";
import { GAME_CATEGORIES, CATEGORY_LABELS, type GameCategory } from "@/lib/types/game";
import { CATEGORY_ICONS } from "@/lib/config/sections";
import { cn } from "@/lib/utils";

export type CategoryFilter = GameCategory | "all";

interface CategoryTabsProps {
  value: CategoryFilter;
  onChange: (next: CategoryFilter) => void;
}

const TABS: ReadonlyArray<{ id: CategoryFilter; label: string; Icon: LucideIcon }> = [
  { id: "all", label: "Lobby", Icon: Flame },
  ...GAME_CATEGORIES.map((c) => ({
    id: c as CategoryFilter,
    label: CATEGORY_LABELS[c],
    Icon: CATEGORY_ICONS[c],
  })),
];

export function CategoryTabs({ value, onChange }: CategoryTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Game categories"
      className="flex w-full items-center gap-1 overflow-x-auto"
    >
      {TABS.map(({ id, label, Icon }) => {
        const active = value === id;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onChange(id)}
            className={cn(
              "inline-flex h-9 shrink-0 items-center gap-2 rounded-md px-3 text-sm font-semibold whitespace-nowrap transition-colors",
              active
                ? "bg-card text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="size-4" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
