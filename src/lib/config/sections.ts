import {
  BadgeCheck,
  Flame,
  LayoutGrid,
  Sparkles,
  Tv2,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import type { GameCategory } from "@/lib/types/game";
import { CATEGORY_LABELS } from "@/lib/types/game";

export interface SectionConfig {
  category: GameCategory;
  title: string;
  Icon: LucideIcon;
}

export const CATEGORY_ICONS: Record<GameCategory, LucideIcon> = {
  "stake-originals": Flame,
  slots: LayoutGrid,
  "live-casino": Tv2,
  "game-shows": Wand2,
  "stake-exclusives": BadgeCheck,
  "new-releases": Sparkles,
};

export const SECTION_CONFIG: ReadonlyArray<SectionConfig> = [
  { category: "stake-originals", title: CATEGORY_LABELS["stake-originals"], Icon: CATEGORY_ICONS["stake-originals"] },
  { category: "slots", title: CATEGORY_LABELS.slots, Icon: CATEGORY_ICONS.slots },
  { category: "live-casino", title: CATEGORY_LABELS["live-casino"], Icon: CATEGORY_ICONS["live-casino"] },
  { category: "game-shows", title: CATEGORY_LABELS["game-shows"], Icon: CATEGORY_ICONS["game-shows"] },
  { category: "stake-exclusives", title: CATEGORY_LABELS["stake-exclusives"], Icon: CATEGORY_ICONS["stake-exclusives"] },
  { category: "new-releases", title: CATEGORY_LABELS["new-releases"], Icon: CATEGORY_ICONS["new-releases"] },
];
