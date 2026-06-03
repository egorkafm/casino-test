export type SportType = "Football" | "Basketball" | "Tennis" | "Baseball" | "Hockey";

export interface SportOdds {
  home: number;
  draw?: number;
  away: number;
}

export interface SportEvent {
  id: string;
  sport: SportType;
  league: string;
  homeTeam: string;
  awayTeam: string;
  isLive: boolean;
  liveMinute?: number;
  kickoff?: string;
  odds: SportOdds;
}
