"use client";

import { Dices, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export type Segment = "casino" | "sports";

interface SegmentToggleProps {
  value: Segment;
  onChange: (next: Segment) => void;
}

const segments: ReadonlyArray<{
  id: Segment;
  label: string;
  Icon: typeof Dices;
  activeClassName: string;
}> = [
  {
    id: "casino",
    label: "CASINO",
    Icon: Dices,
    activeClassName: "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-md",
  },
  {
    id: "sports",
    label: "SPORTS",
    Icon: Trophy,
    activeClassName: "bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-md",
  },
];

export function SegmentToggle({ value, onChange }: SegmentToggleProps) {
  return (
    <div className="flex items-center gap-1.5">
      {segments.map(({ id, label, Icon, activeClassName }) => {
        const active = value === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={active}
            className={cn(
              "inline-flex h-9 items-center gap-2 rounded-md px-3 text-xs font-extrabold tracking-wider transition-colors",
              active
                ? activeClassName
                : "bg-muted/60 text-muted-foreground hover:bg-muted",
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
