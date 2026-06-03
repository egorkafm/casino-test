import type { Game, GameCategory } from "@/lib/types/game";

interface GameSeed {
  id: number;
  name: string;
  provider: string;
  category: GameCategory;
  rtp?: number;
  badges?: Game["badges"];
  hasLive?: boolean;
  hd?: boolean;
  devices?: Game["devices"];
}

const seeds: GameSeed[] = [
  { id: 296, name: "Plinko", provider: "BGaming", category: "stake-originals", rtp: 99, badges: [{ label: "Original", tone: "exclusive" }], hd: true, devices: ["mobile", "desktop"] },
  { id: 297, name: "Mines", provider: "BGaming", category: "stake-originals", rtp: 99, hd: true, devices: ["mobile", "desktop"] },
  { id: 295, name: "Dice", provider: "BGaming", category: "stake-originals", rtp: 99, hd: true, devices: ["mobile", "desktop"] },
  { id: 1009, name: "Aviator", provider: "Spribe", category: "stake-originals", rtp: 97, badges: [{ label: "Hot", tone: "hot" }], hd: true, devices: ["mobile", "desktop"] },
  { id: 4280, name: "Crash", provider: "Spribe", category: "stake-originals", rtp: 97, hd: true, devices: ["mobile", "desktop"] },
  { id: 4290, name: "Hilo", provider: "Spribe", category: "stake-originals", rtp: 99, hd: true, devices: ["mobile", "desktop"] },
  { id: 4291, name: "Mini Roulette", provider: "Spribe", category: "stake-originals", rtp: 97, hd: true, devices: ["mobile", "desktop"] },

  { id: 256, name: "Platinum Lightning", provider: "BGaming", category: "slots", rtp: 95, hd: true, devices: ["mobile", "desktop"] },
  { id: 222, name: "Aztec Magic", provider: "BGaming", category: "slots", rtp: 95.0, devices: ["mobile", "desktop"] },
  { id: 254, name: "Aztec Magic Deluxe", provider: "BGaming", category: "slots", rtp: 96.97, hd: true, devices: ["mobile", "desktop"] },
  { id: 252, name: "Mechanical Clover", provider: "BGaming", category: "slots", rtp: 95.0, devices: ["mobile", "desktop"] },
  { id: 263, name: "The Sand Princess", provider: "BGaming", category: "slots", rtp: 95.0, hd: true, devices: ["mobile", "desktop"] },
  { id: 264, name: "Lucky Dama Muerta", provider: "BGaming", category: "slots", rtp: 95.0, hd: true, devices: ["mobile", "desktop"] },
  { id: 268, name: "Domnitor's Treasures", provider: "BGaming", category: "slots", rtp: 96.06, hd: true, devices: ["mobile", "desktop"] },
  { id: 271, name: "Just Jewels Deluxe", provider: "BGaming", category: "slots", rtp: 95.0, devices: ["mobile", "desktop"] },
  { id: 290, name: "Bonanza Billion", provider: "BGaming", category: "slots", rtp: 96.5, badges: [{ label: "Hot", tone: "hot" }], hd: true, devices: ["mobile", "desktop"] },
  { id: 2436, name: "Sweet Bonanza", provider: "Pragmatic Play", category: "slots", rtp: 96.51, badges: [{ label: "Hot", tone: "hot" }], hd: true, devices: ["mobile", "desktop"] },
  { id: 2437, name: "Gates of Olympus", provider: "Pragmatic Play", category: "slots", rtp: 96.5, hd: true, devices: ["mobile", "desktop"] },
  { id: 2438, name: "The Dog House", provider: "Pragmatic Play", category: "slots", rtp: 96.51, devices: ["mobile", "desktop"] },
  { id: 2439, name: "Big Bass Bonanza", provider: "Pragmatic Play", category: "slots", rtp: 96.71, devices: ["mobile", "desktop"] },

  { id: 1085, name: "Casino Malta Roulette", provider: "Evolution", category: "live-casino", hasLive: true, hd: true, devices: ["mobile", "desktop"] },
  { id: 1057, name: "Lightning Roulette", provider: "Evolution", category: "live-casino", hasLive: true, hd: true, badges: [{ label: "Live", tone: "hot" }], devices: ["mobile", "desktop"] },
  { id: 1002, name: "Immersive Roulette", provider: "Evolution", category: "live-casino", hasLive: true, hd: true, devices: ["mobile", "desktop"] },
  { id: 1100, name: "Blackjack VIP A", provider: "Evolution", category: "live-casino", hasLive: true, devices: ["mobile", "desktop"] },
  { id: 1102, name: "Speed Baccarat A", provider: "Evolution", category: "live-casino", hasLive: true, devices: ["mobile", "desktop"] },
  { id: 1110, name: "Auto Roulette", provider: "Evolution", category: "live-casino", hasLive: true, devices: ["mobile", "desktop"] },

  { id: 1129, name: "Crazy Time", provider: "Evolution", category: "game-shows", hasLive: true, hd: true, badges: [{ label: "Live", tone: "hot" }], devices: ["mobile", "desktop"] },
  { id: 1141, name: "Monopoly Live", provider: "Evolution", category: "game-shows", hasLive: true, hd: true, devices: ["mobile", "desktop"] },
  { id: 1170, name: "Funky Time", provider: "Evolution", category: "game-shows", hasLive: true, hd: true, badges: [{ label: "New", tone: "new" }], devices: ["mobile", "desktop"] },
  { id: 1184, name: "Cash or Crash", provider: "Evolution", category: "game-shows", hasLive: true, devices: ["mobile", "desktop"] },
  { id: 1228, name: "Crazy Coin Flip", provider: "Evolution", category: "game-shows", hasLive: true, hd: true, devices: ["mobile", "desktop"] },

  { id: 9001, name: "Stake VIP Roulette", provider: "Custom", category: "stake-exclusives", badges: [{ label: "Exclusive", tone: "exclusive" }], hd: true },
  { id: 9002, name: "Stake Blackjack Pro", provider: "Custom", category: "stake-exclusives", badges: [{ label: "Exclusive", tone: "exclusive" }], hd: true },
  { id: 9003, name: "Stake Limbo Pro", provider: "Custom", category: "stake-exclusives", badges: [{ label: "Exclusive", tone: "exclusive" }] },
  { id: 9004, name: "Stake Crash Royale", provider: "Custom", category: "stake-exclusives", badges: [{ label: "Exclusive", tone: "exclusive" }] },

  { id: 100, name: "Wanted Dead or a Wild", provider: "Hacksaw Gaming", category: "new-releases", rtp: 96.38, badges: [{ label: "New", tone: "new" }], hd: true },
  { id: 7328, name: "Le Bandit", provider: "Hacksaw Gaming", category: "new-releases", rtp: 96.27, badges: [{ label: "New", tone: "new" }], hd: true },
  { id: 5500, name: "Toshi Video Club", provider: "Hacksaw Gaming", category: "new-releases", rtp: 96.27, badges: [{ label: "New", tone: "new" }], hd: true },
  { id: 5501, name: "San Quentin xWays", provider: "Nolimit City", category: "new-releases", rtp: 96.03, badges: [{ label: "New", tone: "new" }] },
  { id: 5502, name: "Tombstone R.I.P.", provider: "Nolimit City", category: "new-releases", rtp: 96.06, badges: [{ label: "New", tone: "new" }] },
  { id: 5503, name: "Fire in the Hole 2", provider: "Nolimit City", category: "new-releases", rtp: 96.07, badges: [{ label: "New", tone: "new" }] },
];

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function thumbnailFor(id: number): string {
  return `https://thumb.all-ingame.com/iv2/${id}.png`;
}

export const SEED_GAMES: Game[] = seeds.map<Game>((seed) => ({
  id: String(seed.id),
  name: seed.name,
  slug: slugify(seed.name),
  provider: seed.provider,
  category: seed.category,
  thumbnailUrl: thumbnailFor(seed.id),
  playingNow:
    250 +
    Math.floor(
      (seed.id * 173 + seed.name.length * 991 + seed.provider.length * 47) %
        7800,
    ),
  rtp: seed.rtp,
  badges: seed.badges,
  hasLive: seed.hasLive,
  hd: seed.hd,
  devices: seed.devices,
}));
