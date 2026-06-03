export interface Bet {
  id: string;
  game: string;
  user: string;
  amount: number;
  multiplier: number;
  payout: number;
  time: string;
}

export interface LeaderboardEntry {
  rank: number;
  user: string;
  wagered: number;
  profit: number;
}
