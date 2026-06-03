"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2"
        aria-hidden
      />
      <Input
        type="text"
        role="searchbox"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Search your game"}
        className="bg-card/60 border-border/40 h-12 w-full rounded-md pr-10 pl-11 text-sm focus-visible:ring-1 focus-visible:ring-ring/40"
        aria-label="Search games"
      />
      {value.length > 0 && (
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute top-1/2 right-2 size-8 -translate-y-1/2"
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  );
}
