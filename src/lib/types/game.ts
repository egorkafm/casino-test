export const GAME_CATEGORIES = [
  "stake-originals",
  "slots",
  "live-casino",
  "game-shows",
  "stake-exclusives",
  "new-releases",
] as const;

export type GameCategory = (typeof GAME_CATEGORIES)[number];

export type BadgeTone = "hot" | "new" | "exclusive" | "sale";

export interface GameBadge {
  label: string;
  tone?: BadgeTone;
}

export type GameDevice = "mobile" | "desktop";

export type VolatilityRating =
  | "low"
  | "low-medium"
  | "medium-low"
  | "medium"
  | "medium-high"
  | "high"
  | "very-high";

export type JackpotType = "Network" | "Local" | "In game" | "Not Available";

export interface Game {
  id: string;
  name: string;
  slug: string;
  provider: string;
  category: GameCategory;
  thumbnailUrl: string;
  playingNow: number;
  rtp?: number;
  badges?: GameBadge[];

  hasLive?: boolean;
  hd?: boolean;
  devices?: GameDevice[];

  theme?: string;
  description?: string;
  featureGroup?: string;
  licenses?: string[];

  volatilityRating?: VolatilityRating;
  hitRate?: number;

  lines?: number;
  ways?: number;
  multiplier?: number;

  hasJackpot?: boolean;
  jackpotType?: JackpotType;
  hasFreespins?: boolean;
  bonusBuy?: boolean;
  accumulating?: boolean;
  forbidBonusPlay?: boolean;
  customised?: boolean;

  releasedAt?: string;
  recalledAt?: string;

  restrictions?: Record<string, unknown>;
}

export const CATEGORY_LABELS: Record<GameCategory, string> = {
  "stake-originals": "Stake Originals",
  slots: "Slots",
  "live-casino": "Live Casino",
  "game-shows": "Game Shows",
  "stake-exclusives": "Stake Exclusives",
  "new-releases": "New Releases",
};
