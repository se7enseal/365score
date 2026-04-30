export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
  totalValue: string;
  stadium: Stadium;
  foundedYear: number;
  honors: string[];
  manager: Manager;
}

export interface Stadium {
  name: string;
  capacity: number;
  address: string;
}

export interface Manager {
  name: string;
  photo?: string;
  nationality: string;
  coachingExperience: string[];
  tacticalStyle: string;
}

export interface Player {
  id: string;
  name: string;
  photo?: string;
  position: string;
  jerseyNumber: number;
  nationality: string;
  value: string;
  injuryStatus: 'healthy' | 'injured' | 'suspended';
}

export interface MatchEvent {
  minute: number;
  type: 'GOAL' | 'YELLOW_CARD' | 'RED_CARD' | 'SUBSTITUTION' | 'PENALTY' | 'CORNER';
  team: 'home' | 'away';
  player: string;
  assist?: string;
  description: string;
}

export interface Lineup {
  formation: string;
  starting: Player[];
  substitutes: Player[];
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

export interface RecentMatch {
  date: string;
  opponent: string;
  homeScore: number;
  awayScore: number;
  isHome: boolean;
  result: 'W' | 'D' | 'L';
  odds: Odds;
  matchType: '联赛' | '杯赛' | '欧冠' | '友谊赛' | string;
}

export interface RecentMatches {
  home: RecentMatch[];
  away: RecentMatch[];
}

export interface HeadToHead {
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  venue: string;
  odds: Odds;
  matchType: '联赛' | '杯赛' | '欧冠' | '友谊赛' | string;
}

export interface OddsItem {
  homeWin: number;
  draw: number;
  awayWin: number;
}

export interface AsianHandicap {
  homeHandicap: string;
  homeOdds: number;
  awayHandicap: string;
  awayOdds: number;
}

export interface BookmakerOdds {
  name: string;
  initial: OddsItem;
  live?: OddsItem;
  asianHandicap?: AsianHandicap;
}

export interface Odds {
  bookmakers: BookmakerOdds[];
  initial: Record<string, OddsItem>;
  live?: Record<string, OddsItem>;
  lastUpdate: string;
  average: {
    initial: OddsItem;
    live?: OddsItem;
  };
  deviation: {
    initial: number;
    live?: number;
  };
}

export interface MatchStats {
  possession: number;
  corners: number;
  redCards: number;
  yellowCards: number;
  shots: number;
  shotsOnTarget: number;
  penalties: number;
  attacks: number;
  dangerousAttacks: number;
  offsides: number;
  fouls: number;
  passAccuracy: number;
}

export interface MatchStatsData {
  home: MatchStats;
  away: MatchStats;
}

export type MatchStatus = 
  | 'SCHEDULED'
  | 'LIVE'
  | 'HALFTIME'
  | 'FINISHED'
  | 'POSTPONED'
  | 'CANCELLED';

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
  recentMatches: RecentMatches;
  headToHead: HeadToHead[];
  odds: Odds;
  stats?: MatchStatsData;
}

export interface League {
  id: string;
  name: string;
  country: string;
  logo?: string;
  level: number;
  teams: Team[];
}

export interface StandingsEntry {
  position: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string[];
}

export interface TopScorer {
  rank: number;
  player: Player;
  goals: number;
  assists: number;
  team: Team;
}

export interface TopAssister {
  rank: number;
  player: Player;
  assists: number;
  goals: number;
  team: Team;
}

export interface MatchList {
  matches: Match[];
  total: number;
  dateRange: {
    start: string;
    end: string;
  };
}

export interface News {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: '头条' | '转会' | '赛事' | '评论';
  author: string;
  publishedAt: string;
  imageUrl?: string;
  tags: string[];
}

export interface TransferNews {
  id: string;
  playerName: string;
  fromTeam?: string;
  toTeam?: string;
  transferType: '买入' | '卖出' | '租借' | '传闻';
  fee?: string;
  status: '已完成' | '谈判中' | '传闻';
  news: News;
}

export interface User {
  id: string;
  phone?: string;
  email?: string;
  nickname: string;
  avatar?: string;
  registeredAt: string;
  expPoints: number;
  trialDaysRemaining: number;
  isExpert: boolean;
  expertLevel?: string;
}

export interface ExpertApplication {
  userId: string;
  qualifications: string;
  experience: string;
  portfolio: string[];
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface BetScheme {
  id: string;
  userId: string;
  matchId: string;
  betType: string;
  prediction: string;
  stake: number;
  odds: number;
  potentialWin: number;
  result?: 'won' | 'lost' | 'pending';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  matchId: string;
  userId: string;
  username: string;
  content: string;
  timestamp: string;
}

export interface LeagueStandings {
  league: League;
  standings: StandingsEntry[];
  topScorers: TopScorer[];
  topAssisters: TopAssister[];
}

export interface LiveCommentary {
  minute: number;
  team: 'home' | 'away' | 'neutral';
  event: string;
  description: string;
}

export interface VideoHighlight {
  id: string;
  matchId: string;
  title: string;
  duration: string;
  thumbnailUrl?: string;
  videoUrl: string;
}
