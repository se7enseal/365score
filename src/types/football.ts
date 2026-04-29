export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
}

export interface MatchEvent {
  minute: number;
  type: 'GOAL' | 'YELLOW_CARD' | 'RED_CARD';
  team: 'home' | 'away';
  player: string;
  assist?: string;
  description: string;
}

export interface Lineup {
  formation: string;
  starting: string[];
  substitutes: string[];
}

export interface Lineups {
  home: Lineup;
  away: Lineup;
}

export interface AIPrediction {
  result: string;
  confidence: number;
  analysis: string;
}

export interface RecentForm {
  home: string[];
  away: string[];
}

export interface OddsItem {
  homeWin: number;
  draw: number;
  awayWin: number;
}

export interface Odds {
  initial: {
    '竞彩官方': OddsItem;
    '澳门': OddsItem;
    '威廉希尔': OddsItem;
    '立博': OddsItem;
    'Interwetten': OddsItem;
    'SNAI': OddsItem;
  };
  live: {
    '竞彩官方': OddsItem;
    '澳门': OddsItem;
    '威廉希尔': OddsItem;
    '立博': OddsItem;
    'Interwetten': OddsItem;
    'SNAI': OddsItem;
  };
  lastUpdate: string;
}

export interface Match {
  id: string;
  date: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
  matchTime: string;
  league: League;
  venue?: string;
  events: MatchEvent[];
  lineups: Lineups;
  aiPrediction: AIPrediction;
  recentForm: RecentForm;
  odds: Odds;
}

export type MatchStatus = 
  | 'SCHEDULED'
  | 'LIVE'
  | 'HALFTIME'
  | 'FINISHED'
  | 'POSTPONED'
  | 'CANCELLED';

export interface League {
  id: string;
  name: string;
  country: string;
  logo?: string;
}

export interface MatchList {
  matches: Match[];
  total: number;
  dateRange: {
    start: string;
    end: string;
  };
}