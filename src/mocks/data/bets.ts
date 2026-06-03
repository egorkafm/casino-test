import type { Bet, LeaderboardEntry } from "@/lib/types/bet";

const GAME_NAMES = [
  "Blackjack VIP H", "Moles", "Hel's Domain", "Korean Speed Baccarat",
  "Stake Roulette", "Gates of Heaven", "Puppetmaster", "Aviator",
  "Crazy Time", "Sweet Bonanza", "Plinko", "Mines",
  "Gates of Olympus", "Lightning Roulette", "Monopoly Live", "Dice",
];

const USERS = [
  "Hidden", "Hidden", "Hidden", "Hidden",
  "Kikifaze21", "whale_k***", "megawin***", "shadow***",
  "cryptog***", "highro***", "ace_pl***", "vip_us***",
];

function usd(n: number) {
  return parseFloat(n.toFixed(2));
}

export const SEED_BETS: Bet[] = [
  { id: "b-001", game: "Blackjack VIP H",       user: "Hidden",     amount: 2350.00,   multiplier: 1.00,  payout: 2350.00,  time: new Date(Date.now() - 0   * 60000).toISOString() },
  { id: "b-002", game: "Moles",                 user: "Kikifaze21", amount: 2323.58,   multiplier: 0.00,  payout: 0,        time: new Date(Date.now() - 1   * 60000).toISOString() },
  { id: "b-003", game: "Hel's Domain",          user: "Hidden",     amount: 6000.00,   multiplier: 0.00,  payout: 0,        time: new Date(Date.now() - 2   * 60000).toISOString() },
  { id: "b-004", game: "Korean Speed Baccarat", user: "Hidden",     amount: 48343.44,  multiplier: 0.00,  payout: 0,        time: new Date(Date.now() - 3   * 60000).toISOString() },
  { id: "b-005", game: "Hel's Domain",          user: "Hidden",     amount: 6000.00,   multiplier: 0.00,  payout: 0,        time: new Date(Date.now() - 4   * 60000).toISOString() },
  { id: "b-006", game: "Stake Roulette",        user: "Hidden",     amount: 4182.45,   multiplier: 1.00,  payout: 4182.45,  time: new Date(Date.now() - 5   * 60000).toISOString() },
  { id: "b-007", game: "Hel's Domain",          user: "Hidden",     amount: 6000.00,   multiplier: 0.00,  payout: 0,        time: new Date(Date.now() - 6   * 60000).toISOString() },
  { id: "b-008", game: "Hel's Domain",          user: "Hidden",     amount: 6000.00,   multiplier: 0.00,  payout: 0,        time: new Date(Date.now() - 7   * 60000).toISOString() },
  { id: "b-009", game: "Gates of Heaven",       user: "Hidden",     amount: 1595.08,   multiplier: 0.56,  payout: 893.24,   time: new Date(Date.now() - 8   * 60000).toISOString() },
  { id: "b-010", game: "Puppetmaster",          user: "Hidden",     amount: 2165.38,   multiplier: 1.07,  payout: 2317.06,  time: new Date(Date.now() - 9   * 60000).toISOString() },
  { id: "b-011", game: "Aviator",               user: "megawin***", amount: 890.00,    multiplier: 3.20,  payout: 2848.00,  time: new Date(Date.now() - 10  * 60000).toISOString() },
  { id: "b-012", game: "Crazy Time",            user: "whale_k***", amount: 15000.00,  multiplier: 5.00,  payout: 75000.00, time: new Date(Date.now() - 11  * 60000).toISOString() },
  { id: "b-013", game: "Sweet Bonanza",         user: "shadow***",  amount: 500.00,    multiplier: 0.00,  payout: 0,        time: new Date(Date.now() - 12  * 60000).toISOString() },
  { id: "b-014", game: "Plinko",                user: "cryptog***", amount: 1200.00,   multiplier: 2.50,  payout: 3000.00,  time: new Date(Date.now() - 13  * 60000).toISOString() },
  { id: "b-015", game: "Lightning Roulette",    user: "Hidden",     amount: 750.00,    multiplier: 36.00, payout: 27000.00, time: new Date(Date.now() - 14  * 60000).toISOString() },
  { id: "b-016", game: "Mines",                 user: "highro***",  amount: 320.00,    multiplier: 1.94,  payout: 620.80,   time: new Date(Date.now() - 15  * 60000).toISOString() },
  { id: "b-017", game: "Gates of Olympus",      user: "Hidden",     amount: 3400.00,   multiplier: 0.00,  payout: 0,        time: new Date(Date.now() - 16  * 60000).toISOString() },
  { id: "b-018", game: "Monopoly Live",         user: "vip_us***",  amount: 2800.00,   multiplier: 2.00,  payout: 5600.00,  time: new Date(Date.now() - 17  * 60000).toISOString() },
  { id: "b-019", game: "Dice",                  user: "ace_pl***",  amount: 100.00,    multiplier: 1.98,  payout: 198.00,   time: new Date(Date.now() - 18  * 60000).toISOString() },
  { id: "b-020", game: "Stake Roulette",        user: "Hidden",     amount: 9500.00,   multiplier: 0.00,  payout: 0,        time: new Date(Date.now() - 19  * 60000).toISOString() },
];

export const SEED_HIGH_ROLLER_BETS: Bet[] = [
  { id: "hr-001", game: "Crazy Time",           user: "whale_k***", amount: 50000.00,  multiplier: 2.00,  payout: 100000.00, time: new Date(Date.now() - 0  * 60000).toISOString() },
  { id: "hr-002", game: "Lightning Roulette",   user: "megawin***", amount: 25000.00,  multiplier: 36.00, payout: 900000.00, time: new Date(Date.now() - 1  * 60000).toISOString() },
  { id: "hr-003", game: "Gates of Olympus",     user: "highro***",  amount: 18000.00,  multiplier: 0.00,  payout: 0,         time: new Date(Date.now() - 2  * 60000).toISOString() },
  { id: "hr-004", game: "Sweet Bonanza",        user: "vip_us***",  amount: 30000.00,  multiplier: 4.80,  payout: 144000.00, time: new Date(Date.now() - 3  * 60000).toISOString() },
  { id: "hr-005", game: "Monopoly Live",        user: "Hidden",     amount: 22000.00,  multiplier: 10.00, payout: 220000.00, time: new Date(Date.now() - 4  * 60000).toISOString() },
  { id: "hr-006", game: "Aviator",              user: "Hidden",     amount: 15000.00,  multiplier: 3.20,  payout: 48000.00,  time: new Date(Date.now() - 5  * 60000).toISOString() },
  { id: "hr-007", game: "Blackjack VIP H",      user: "star_p***",  amount: 48343.44,  multiplier: 0.00,  payout: 0,         time: new Date(Date.now() - 6  * 60000).toISOString() },
  { id: "hr-008", game: "Blackjack VIP H",      user: "ace_pl***",  amount: 50000.00,  multiplier: 2.00,  payout: 100000.00, time: new Date(Date.now() - 7  * 60000).toISOString() },
  { id: "hr-009", game: "Hel's Domain",         user: "Hidden",     amount: 35000.00,  multiplier: 1.50,  payout: 52500.00,  time: new Date(Date.now() - 8  * 60000).toISOString() },
  { id: "hr-010", game: "Korean Speed Baccarat",user: "cryptog***", amount: 40000.00,  multiplier: 0.00,  payout: 0,         time: new Date(Date.now() - 9  * 60000).toISOString() },
  { id: "hr-011", game: "Stake Roulette",       user: "Hidden",     amount: 12500.00,  multiplier: 6.00,  payout: 75000.00,  time: new Date(Date.now() - 10 * 60000).toISOString() },
  { id: "hr-012", game: "Plinko",               user: "moon_r***",  amount: 8000.00,   multiplier: 0.00,  payout: 0,         time: new Date(Date.now() - 11 * 60000).toISOString() },
];

export const SEED_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1,  user: "whale_k***", wagered: 1523450,  profit:  345210  },
  { rank: 2,  user: "megawin***", wagered: 1210000,  profit:  218870  },
  { rank: 3,  user: "highro***",  wagered: 1056000,  profit:  182340  },
  { rank: 4,  user: "vip_us***",  wagered:  834000,  profit:   91200  },
  { rank: 5,  user: "pro_be***",  wagered:  712000,  profit:   44300  },
  { rank: 6,  user: "dark_h***",  wagered:  600000,  profit:   11200  },
  { rank: 7,  user: "ace_pl***",  wagered:  555000,  profit:  -22000  },
  { rank: 8,  user: "star_p***",  wagered:  490000,  profit:  -45000  },
  { rank: 9,  user: "moon_r***",  wagered:  410000,  profit:  -88000  },
  { rank: 10, user: "cryptog***", wagered:  388000,  profit: -110000  },
];

export function randomBet(id: string, highRoller = false): Bet {
  const amount = highRoller
    ? usd(5000 + Math.random() * 45000)
    : usd(100 + Math.random() * 9900);
  const wins = Math.random() > 0.45;
  const multiplier = wins ? parseFloat((1.05 + Math.random() * 8).toFixed(2)) : 0;
  const payout = wins ? usd(amount * multiplier) : 0;
  return {
    id,
    game: GAME_NAMES[Math.floor(Math.random() * GAME_NAMES.length)],
    user: USERS[Math.floor(Math.random() * USERS.length)],
    amount,
    multiplier,
    payout,
    time: new Date().toISOString(),
  };
}
