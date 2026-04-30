import { Team, Player, League, Match, News, TransferNews, StandingsEntry, TopScorer, TopAssister } from '../types/football';

export const teams: Team[] = [
  {
    id: 'team_001',
    name: '曼彻斯特城',
    shortName: '曼城',
    logo: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Manchester%20City%20FC%20logo%20red%20blue%20modern%20design&image_size=square',
    totalValue: '12.8亿欧元',
    stadium: {
      name: '伊蒂哈德球场',
      capacity: 53400,
      address: '英国曼彻斯特',
    },
    foundedYear: 1880,
    honors: ['英超冠军(2022, 2023, 2024)', '欧冠冠军(2023)', '足总杯冠军(2019, 2023)'],
    manager: {
      name: '佩普·瓜迪奥拉',
      nationality: '西班牙',
      coachingExperience: ['巴塞罗那', '拜仁慕尼黑', '曼城'],
      tacticalStyle: '控球主导型，强调传控与高位压迫',
    },
  },
  {
    id: 'team_002',
    name: '阿森纳',
    shortName: '阿森纳',
    logo: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Arsenal%20FC%20logo%20red%20white%20modern%20design&image_size=square',
    totalValue: '8.5亿欧元',
    stadium: {
      name: '酋长球场',
      capacity: 60704,
      address: '英国伦敦',
    },
    foundedYear: 1886,
    honors: ['英超冠军(2004)', '足总杯冠军(13次)', '联赛杯冠军(2次)'],
    manager: {
      name: '米克尔·阿尔特塔',
      nationality: '西班牙',
      coachingExperience: ['曼城助教', '阿森纳'],
      tacticalStyle: '高位压迫，快速反击，注重年轻球员培养',
    },
  },
  {
    id: 'team_003',
    name: '利物浦',
    shortName: '利物浦',
    logo: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Liverpool%20FC%20logo%20red%20liver%20bird%20modern&image_size=square',
    totalValue: '9.2亿欧元',
    stadium: {
      name: '安菲尔德球场',
      capacity: 61276,
      address: '英国利物浦',
    },
    foundedYear: 1892,
    honors: ['英超冠军(2020)', '欧冠冠军(6次)', '足总杯冠军(8次)'],
    manager: {
      name: '尤尔根·克洛普',
      nationality: '德国',
      coachingExperience: ['美因茨', '多特蒙德', '利物浦'],
      tacticalStyle: '重金属足球，高位逼抢，快速攻防转换',
    },
  },
  {
    id: 'team_004',
    name: '曼联',
    shortName: '曼联',
    logo: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Manchester%20United%20FC%20logo%20red%20devil%20modern&image_size=square',
    totalValue: '7.8亿欧元',
    stadium: {
      name: '老特拉福德球场',
      capacity: 74310,
      address: '英国曼彻斯特',
    },
    foundedYear: 1878,
    honors: ['英超冠军(13次)', '欧冠冠军(3次)', '足总杯冠军(12次)'],
    manager: {
      name: '埃里克·滕哈格',
      nationality: '荷兰',
      coachingExperience: ['阿贾克斯', '曼联'],
      tacticalStyle: '压迫式足球，注重技术与战术纪律',
    },
  },
  {
    id: 'team_005',
    name: '切尔西',
    shortName: '切尔西',
    logo: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chelsea%20FC%20logo%20blue%20lion%20modern&image_size=square',
    totalValue: '7.2亿欧元',
    stadium: {
      name: '斯坦福桥球场',
      capacity: 40343,
      address: '英国伦敦',
    },
    foundedYear: 1905,
    honors: ['英超冠军(5次)', '欧冠冠军(2次)', '欧联杯冠军(2次)'],
    manager: {
      name: '毛里西奥·波切蒂诺',
      nationality: '阿根廷',
      coachingExperience: ['热刺', '巴黎圣日耳曼', '切尔西'],
      tacticalStyle: '高强度压迫，快速转换，技术流足球',
    },
  },
  {
    id: 'team_006',
    name: '托特纳姆热刺',
    shortName: '热刺',
    logo: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Tottenham%20Hotspur%20logo%20cockerel%20modern%20design&image_size=square',
    totalValue: '6.5亿欧元',
    stadium: {
      name: '托特纳姆热刺球场',
      capacity: 62062,
      address: '英国伦敦',
    },
    foundedYear: 1882,
    honors: ['足总杯冠军(8次)', '联赛杯冠军(2次)', '欧洲优胜者杯冠军(1次)'],
    manager: {
      name: '安东尼奥·孔蒂',
      nationality: '意大利',
      coachingExperience: ['尤文图斯', '切尔西', '国际米兰', '热刺'],
      tacticalStyle: '防守反击，坚固防线，注重效率',
    },
  },
];

export const players: Player[] = [
  { id: 'p1', name: '埃尔林·哈兰德', position: '前锋', jerseyNumber: 9, nationality: '挪威', value: '1.8亿欧元', injuryStatus: 'healthy' },
  { id: 'p2', name: '凯文·德布劳内', position: '中场', jerseyNumber: 17, nationality: '比利时', value: '8000万欧元', injuryStatus: 'healthy' },
  { id: 'p3', name: '菲尔·福登', position: '中场', jerseyNumber: 47, nationality: '英格兰', value: '9000万欧元', injuryStatus: 'healthy' },
  { id: 'p4', name: '鲁本·迪亚斯', position: '后卫', jerseyNumber: 3, nationality: '葡萄牙', value: '7000万欧元', injuryStatus: 'healthy' },
  { id: 'p5', name: '埃德森', position: '门将', jerseyNumber: 31, nationality: '巴西', value: '4000万欧元', injuryStatus: 'healthy' },
  { id: 'p6', name: '布卡约·萨卡', position: '前锋', jerseyNumber: 7, nationality: '英格兰', value: '1.2亿欧元', injuryStatus: 'healthy' },
  { id: 'p7', name: '马丁·厄德高', position: '中场', jerseyNumber: 8, nationality: '挪威', value: '7500万欧元', injuryStatus: 'injured' },
  { id: 'p8', name: '威廉·萨利巴', position: '后卫', jerseyNumber: 2, nationality: '法国', value: '6000万欧元', injuryStatus: 'healthy' },
  { id: 'p9', name: '穆罕默德·萨拉赫', position: '前锋', jerseyNumber: 11, nationality: '埃及', value: '9000万欧元', injuryStatus: 'healthy' },
  { id: 'p10', name: '维吉尔·范戴克', position: '后卫', jerseyNumber: 4, nationality: '荷兰', value: '6500万欧元', injuryStatus: 'healthy' },
  { id: 'p11', name: '布鲁诺·费尔南德斯', position: '中场', jerseyNumber: 8, nationality: '葡萄牙', value: '7000万欧元', injuryStatus: 'healthy' },
  { id: 'p12', name: '哈里·凯恩', position: '前锋', jerseyNumber: 10, nationality: '英格兰', value: '1亿欧元', injuryStatus: 'healthy' },
];

export const leagues: League[] = [
  {
    id: 'league_epl',
    name: '英超联赛',
    country: '英格兰',
    logo: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Premier%20League%20logo%20lion%20red%20blue%20modern&image_size=square',
    level: 1,
    teams: teams.slice(0, 6),
  },
  {
    id: 'league_laliga',
    name: '西甲联赛',
    country: '西班牙',
    logo: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=La%20Liga%20logo%20orange%20modern%20design&image_size=square',
    level: 1,
    teams: [],
  },
  {
    id: 'league_bundesliga',
    name: '德甲联赛',
    country: '德国',
    logo: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Bundesliga%20logo%20yellow%20black%20modern&image_size=square',
    level: 1,
    teams: [],
  },
];

export const standings: StandingsEntry[] = [
  { position: 1, team: teams[0], played: 34, won: 26, drawn: 6, lost: 2, goalsFor: 89, goalsAgainst: 24, goalDifference: 65, points: 84, form: ['W', 'W', 'W', 'D', 'W'] },
  { position: 2, team: teams[1], played: 34, won: 22, drawn: 8, lost: 4, goalsFor: 72, goalsAgainst: 31, goalDifference: 41, points: 74, form: ['W', 'D', 'W', 'W', 'L'] },
  { position: 3, team: teams[2], played: 34, won: 20, drawn: 7, lost: 7, goalsFor: 68, goalsAgainst: 38, goalDifference: 30, points: 67, form: ['W', 'L', 'D', 'W', 'D'] },
  { position: 4, team: teams[5], played: 34, won: 19, drawn: 6, lost: 9, goalsFor: 64, goalsAgainst: 40, goalDifference: 24, points: 63, form: ['L', 'D', 'W', 'L', 'W'] },
  { position: 5, team: teams[4], played: 34, won: 18, drawn: 8, lost: 8, goalsFor: 61, goalsAgainst: 39, goalDifference: 22, points: 62, form: ['D', 'W', 'L', 'D', 'W'] },
  { position: 6, team: teams[3], played: 34, won: 17, drawn: 6, lost: 11, goalsFor: 58, goalsAgainst: 45, goalDifference: 13, points: 57, form: ['L', 'W', 'L', 'W', 'W'] },
];

export const topScorers: TopScorer[] = [
  { rank: 1, player: players[0], goals: 36, assists: 12, team: teams[0] },
  { rank: 2, player: players[11], goals: 28, assists: 15, team: teams[5] },
  { rank: 3, player: players[8], goals: 24, assists: 14, team: teams[2] },
  { rank: 4, player: players[5], goals: 19, assists: 11, team: teams[1] },
  { rank: 5, player: players[2], goals: 18, assists: 10, team: teams[0] },
];

export const topAssisters: TopAssister[] = [
  { rank: 1, player: players[1], assists: 20, goals: 12, team: teams[0] },
  { rank: 2, player: players[10], assists: 16, goals: 14, team: teams[3] },
  { rank: 3, player: players[8], assists: 14, goals: 24, team: teams[2] },
  { rank: 4, player: players[6], assists: 13, goals: 10, team: teams[1] },
  { rank: 5, player: players[5], assists: 11, goals: 19, team: teams[1] },
];

const bookmakerNames = [
  '竞彩官方', '澳门', '威廉希尔', '立博', 'Interwetten', 'SNAI', 'Bet365', '必发', '易胜博', '10Bet',
  'Ladbrokes', 'Coral', 'Paddy Power', 'Sky Bet', 'Unibet', 'Betfair', 'Bwin', '888sport', 'William Hill',
  'MansionBet', 'BetVictor', 'Grosvenor', 'Stan James', 'Sportingbet', 'Betfred', 'Coral', 'Totesport',
  'Betdaq', 'Matchbook', 'Spreadex', 'Betway', 'NetBet', '188Bet', 'Tipico', 'Betstars', 'Pinnacle',
  'Sbobet', 'IBCBet', 'BetAsia', 'Maxbet', 'Expekt', 'NordicBet', 'ComeOn', 'LeoVegas', 'Casumo',
  'Guts', 'Mr Green', 'Dafabet', '12Bet', 'Betsson'
];

function generateBookmakerOdds() {
  const bookmakers = [];
  const initial: Record<string, { homeWin: number; draw: number; awayWin: number }> = {};
  const live: Record<string, { homeWin: number; draw: number; awayWin: number }> = {};
  for (let i = 0; i < 50; i++) {
    const homeWin = 1.2 + Math.random() * 3;
    const draw = 3 + Math.random() * 3;
    const awayWin = 2.5 + Math.random() * 5;
    const initialOdds = {
      homeWin: Math.round(homeWin * 100) / 100,
      draw: Math.round(draw * 100) / 100,
      awayWin: Math.round(awayWin * 100) / 100,
    };
    const liveOdds = Math.random() > 0.3 ? {
      homeWin: Math.round((homeWin + (Math.random() - 0.5) * 0.3) * 100) / 100,
      draw: Math.round((draw + (Math.random() - 0.5) * 0.3) * 100) / 100,
      awayWin: Math.round((awayWin + (Math.random() - 0.5) * 0.3) * 100) / 100,
    } : undefined;
    initial[bookmakerNames[i]] = initialOdds;
    if (liveOdds) {
      live[bookmakerNames[i]] = liveOdds;
    }
    bookmakers.push({
      name: bookmakerNames[i],
      initial: initialOdds,
      live: liveOdds,
      asianHandicap: {
        homeHandicap: Math.random() > 0.5 ? '-0.5' : '-1.0',
        homeOdds: Math.round((1.8 + Math.random() * 0.4) * 100) / 100,
        awayHandicap: Math.random() > 0.5 ? '+0.5' : '+1.0',
        awayOdds: Math.round((1.8 + Math.random() * 0.4) * 100) / 100,
      },
    });
  }
  return { bookmakers, initial, live };
}

function calculateAverage(bookmakers: any[]) {
  const homeWins = bookmakers.map(b => b.initial.homeWin);
  const draws = bookmakers.map(b => b.initial.draw);
  const awayWins = bookmakers.map(b => b.initial.awayWin);
  
  return {
    homeWin: Math.round(homeWins.reduce((a, b) => a + b, 0) / homeWins.length * 100) / 100,
    draw: Math.round(draws.reduce((a, b) => a + b, 0) / draws.length * 100) / 100,
    awayWin: Math.round(awayWins.reduce((a, b) => a + b, 0) / awayWins.length * 100) / 100,
  };
}

function calculateDeviation(bookmakers: any[], average: any) {
  const homeWins = bookmakers.map(b => Math.pow(b.initial.homeWin - average.homeWin, 2));
  const draws = bookmakers.map(b => Math.pow(b.initial.draw - average.draw, 2));
  const awayWins = bookmakers.map(b => Math.pow(b.initial.awayWin - average.awayWin, 2));
  
  const variance = (homeWins.reduce((a, b) => a + b, 0) + draws.reduce((a, b) => a + b, 0) + awayWins.reduce((a, b) => a + b, 0)) / (bookmakers.length * 3);
  return Math.round(Math.sqrt(variance) * 100) / 100;
}

export const matches: Match[] = [
  {
    id: 'match_001',
    date: '2026-04-29',
    homeTeam: teams[0],
    awayTeam: teams[1],
    homeScore: 2,
    awayScore: 1,
    status: 'FINISHED',
    matchTime: '2026-04-29T15:00:00Z',
    league: leagues[0],
    venue: '伊蒂哈德球场',
    events: [
      { minute: 12, type: 'GOAL', team: 'home', player: '哈兰德', assist: '德布劳内', description: '哈兰德接德布劳内助攻推射破门' },
      { minute: 28, type: 'YELLOW_CARD', team: 'away', player: '萨利巴', description: '防守犯规' },
      { minute: 45, type: 'GOAL', team: 'away', player: '萨卡', assist: '厄德高', description: '萨卡禁区内抽射扳平比分' },
      { minute: 63, type: 'SUBSTITUTION', team: 'home', player: '阿尔瓦雷斯', description: '替补登场' },
      { minute: 75, type: 'GOAL', team: 'home', player: '福登', assist: '阿尔瓦雷斯', description: '福登禁区边缘远射锁定胜局' },
      { minute: 88, type: 'RED_CARD', team: 'away', player: '托马斯', description: '两黄变一红被罚下' },
    ],
    lineups: {
      home: {
        formation: '4-3-3',
        starting: players.slice(0, 11),
        substitutes: players.slice(11, 14),
      },
      away: {
        formation: '4-3-3',
        starting: players.slice(5, 8).concat(players.slice(9, 12)),
        substitutes: players.slice(11, 14),
      },
    },
    aiPrediction: { result: '主胜', confidence: 68, analysis: '曼城主场作战，近期状态火热，攻防两端表现出色' },
    recentForm: { home: ['W', 'W', 'D', 'W', 'W'], away: ['W', 'L', 'W', 'W', 'D'] },
    recentMatches: {
      home: [
        { date: '2026-04-20', opponent: '利物浦', homeScore: 3, awayScore: 1, isHome: true, result: 'W', matchType: '英超', odds: {} as any },
        { date: '2026-04-13', opponent: '切尔西', homeScore: 2, awayScore: 2, isHome: false, result: 'D', matchType: '英超', odds: {} as any },
        { date: '2026-04-06', opponent: '纽卡斯尔', homeScore: 4, awayScore: 0, isHome: true, result: 'W', matchType: '英超', odds: {} as any },
        { date: '2026-03-30', opponent: '曼联', homeScore: 3, awayScore: 1, isHome: false, result: 'W', matchType: '英超', odds: {} as any },
        { date: '2026-03-23', opponent: '阿斯顿维拉', homeScore: 5, awayScore: 2, isHome: true, result: 'W', matchType: '足总杯', odds: {} as any },
      ],
      away: [
        { date: '2026-04-21', opponent: '热刺', homeScore: 1, awayScore: 2, isHome: false, result: 'W', matchType: '英超', odds: {} as any },
        { date: '2026-04-14', opponent: '利物浦', homeScore: 2, awayScore: 1, isHome: true, result: 'L', matchType: '英超', odds: {} as any },
        { date: '2026-04-07', opponent: '富勒姆', homeScore: 3, awayScore: 0, isHome: false, result: 'W', matchType: '英超', odds: {} as any },
        { date: '2026-03-31', opponent: '伯恩茅斯', homeScore: 4, awayScore: 1, isHome: true, result: 'W', matchType: '英超', odds: {} as any },
        { date: '2026-03-24', opponent: '布莱顿', homeScore: 1, awayScore: 1, isHome: false, result: 'D', matchType: '欧冠', odds: {} as any },
      ],
    },
    headToHead: [
      { date: '2025-12-28', homeTeam: '阿森纳', awayTeam: '曼城', homeScore: 1, awayScore: 3, venue: '酋长球场', matchType: '英超', odds: {} as any },
      { date: '2025-09-15', homeTeam: '曼城', awayTeam: '阿森纳', homeScore: 2, awayScore: 2, venue: '伊蒂哈德球场', matchType: '英超', odds: {} as any },
      { date: '2025-04-20', homeTeam: '阿森纳', awayTeam: '曼城', homeScore: 0, awayScore: 1, venue: '酋长球场', matchType: '足总杯', odds: {} as any },
    ],
    odds: (() => {
      const { bookmakers, initial, live } = generateBookmakerOdds();
      const average = calculateAverage(bookmakers);
      const deviation = calculateDeviation(bookmakers, average);
      return {
        bookmakers,
        initial,
        live: Object.keys(live).length > 0 ? live : undefined,
        lastUpdate: '2026-04-29T14:30:00Z',
        average: { initial: average, live: calculateAverage(bookmakers.filter(b => b.live)) },
        deviation: { initial: deviation, live: deviation * 0.9 },
      };
    })(),
    stats: {
      home: { possession: 62, corners: 8, redCards: 0, yellowCards: 2, shots: 18, shotsOnTarget: 8, penalties: 1, attacks: 98, dangerousAttacks: 45, offsides: 3, fouls: 12, passAccuracy: 89 },
      away: { possession: 38, corners: 4, redCards: 1, yellowCards: 3, shots: 10, shotsOnTarget: 4, penalties: 0, attacks: 52, dangerousAttacks: 22, offsides: 2, fouls: 18, passAccuracy: 76 },
    },
  },
  {
    id: 'match_002',
    date: '2026-04-30',
    homeTeam: teams[2],
    awayTeam: teams[3],
    homeScore: 0,
    awayScore: 0,
    status: 'SCHEDULED',
    matchTime: '2026-04-30T19:30:00Z',
    league: leagues[0],
    venue: '安菲尔德球场',
    events: [],
    lineups: { home: { formation: '4-3-3', starting: [], substitutes: [] }, away: { formation: '4-2-3-1', starting: [], substitutes: [] } },
    aiPrediction: { result: '主胜', confidence: 58, analysis: '利物浦主场优势明显，历史交锋占据上风' },
    recentForm: { home: ['W', 'L', 'D', 'W', 'D'], away: ['L', 'W', 'L', 'W', 'W'] },
    recentMatches: {
      home: [
        { date: '2026-04-22', opponent: '曼城', homeScore: 1, awayScore: 3, isHome: false, result: 'L', matchType: '英超', odds: {} as any },
        { date: '2026-04-15', opponent: '阿森纳', homeScore: 2, awayScore: 1, isHome: true, result: 'W', matchType: '英超', odds: {} as any },
        { date: '2026-04-08', opponent: '切尔西', homeScore: 1, awayScore: 1, isHome: false, result: 'D', matchType: '英超', odds: {} as any },
        { date: '2026-04-01', opponent: '埃弗顿', homeScore: 3, awayScore: 0, isHome: true, result: 'W', matchType: '英超', odds: {} as any },
        { date: '2026-03-25', opponent: '莱斯特城', homeScore: 2, awayScore: 2, isHome: false, result: 'D', matchType: '英超', odds: {} as any },
      ],
      away: [
        { date: '2026-04-23', opponent: '曼城', homeScore: 3, awayScore: 1, isHome: true, result: 'L', matchType: '英超', odds: {} as any },
        { date: '2026-04-16', opponent: '水晶宫', homeScore: 0, awayScore: 2, isHome: false, result: 'W', matchType: '英超', odds: {} as any },
        { date: '2026-04-09', opponent: '纽卡斯尔', homeScore: 2, awayScore: 1, isHome: true, result: 'L', matchType: '英超', odds: {} as any },
        { date: '2026-04-02', opponent: '南安普顿', homeScore: 1, awayScore: 2, isHome: false, result: 'W', matchType: '英超', odds: {} as any },
        { date: '2026-03-26', opponent: '布莱顿', homeScore: 3, awayScore: 0, isHome: true, result: 'W', matchType: '英超', odds: {} as any },
      ],
    },
    headToHead: [
      { date: '2025-12-14', homeTeam: '曼联', awayTeam: '利物浦', homeScore: 1, awayScore: 2, venue: '老特拉福德', matchType: '英超', odds: {} as any },
      { date: '2025-09-01', homeTeam: '利物浦', awayTeam: '曼联', homeScore: 2, awayScore: 0, venue: '安菲尔德球场', matchType: '英超', odds: {} as any },
      { date: '2025-03-15', homeTeam: '曼联', awayTeam: '利物浦', homeScore: 3, awayScore: 3, venue: '老特拉福德', matchType: '英超', odds: {} as any },
    ],
    odds: (() => {
      const { bookmakers, initial, live } = generateBookmakerOdds();
      const average = calculateAverage(bookmakers);
      const deviation = calculateDeviation(bookmakers, average);
      return {
        bookmakers,
        initial,
        live: Object.keys(live).length > 0 ? live : undefined,
        lastUpdate: '2026-04-29T10:00:00Z',
        average: { initial: average },
        deviation: { initial: deviation },
      };
    })(),
  },
  {
    id: 'match_003',
    date: '2026-04-28',
    homeTeam: teams[4],
    awayTeam: teams[5],
    homeScore: 1,
    awayScore: 1,
    status: 'FINISHED',
    matchTime: '2026-04-28T17:30:00Z',
    league: leagues[0],
    venue: '斯坦福桥球场',
    events: [
      { minute: 22, type: 'GOAL', team: 'home', player: '斯特林', assist: '穆德里克', description: '斯特林禁区内接传中头球破门' },
      { minute: 35, type: 'YELLOW_CARD', team: 'home', player: '恩佐', description: '战术犯规' },
      { minute: 55, type: 'GOAL', team: 'away', player: '凯恩', assist: '孙兴慜', description: '凯恩点球扳平比分' },
      { minute: 72, type: 'SUBSTITUTION', team: 'away', player: '理查利森', description: '替补登场' },
      { minute: 85, type: 'YELLOW_CARD', team: 'away', player: '罗梅罗', description: '防守犯规' },
    ],
    lineups: {
      home: {
        formation: '4-2-3-1',
        starting: players.slice(2, 7).concat(players.slice(9, 12)),
        substitutes: players.slice(0, 2).concat(players.slice(12, 14)),
      },
      away: {
        formation: '4-3-3',
        starting: players.slice(4, 9),
        substitutes: players.slice(10, 14),
      },
    },
    aiPrediction: { result: '平局', confidence: 52, analysis: '两队实力接近，近期状态相当' },
    recentForm: { home: ['D', 'W', 'L', 'D', 'W'], away: ['L', 'D', 'W', 'L', 'W'] },
    recentMatches: {
      home: [
        { date: '2026-04-21', opponent: '曼城', homeScore: 2, awayScore: 2, isHome: true, result: 'D', matchType: '英超', odds: {} as any },
        { date: '2026-04-14', opponent: '伯恩茅斯', homeScore: 3, awayScore: 1, isHome: false, result: 'W', matchType: '英超', odds: {} as any },
        { date: '2026-04-07', opponent: '利物浦', homeScore: 1, awayScore: 1, isHome: true, result: 'D', matchType: '英超', odds: {} as any },
        { date: '2026-03-31', opponent: '阿森纳', homeScore: 2, awayScore: 4, isHome: false, result: 'L', matchType: '英超', odds: {} as any },
        { date: '2026-03-24', opponent: '纽卡斯尔', homeScore: 1, awayScore: 0, isHome: true, result: 'W', matchType: '英超', odds: {} as any },
      ],
      away: [
        { date: '2026-04-22', opponent: '阿森纳', homeScore: 1, awayScore: 2, isHome: true, result: 'L', matchType: '英超', odds: {} as any },
        { date: '2026-04-15', opponent: '水晶宫', homeScore: 1, awayScore: 1, isHome: false, result: 'D', matchType: '英超', odds: {} as any },
        { date: '2026-04-08', opponent: '富勒姆', homeScore: 0, awayScore: 2, isHome: true, result: 'W', matchType: '英超', odds: {} as any },
        { date: '2026-04-01', opponent: '曼联', homeScore: 2, awayScore: 0, isHome: false, result: 'L', matchType: '英超', odds: {} as any },
        { date: '2026-03-25', opponent: '阿斯顿维拉', homeScore: 3, awayScore: 1, isHome: true, result: 'W', matchType: '英超', odds: {} as any },
      ],
    },
    headToHead: [
      { date: '2025-11-25', homeTeam: '热刺', awayTeam: '切尔西', homeScore: 2, awayScore: 2, venue: '托特纳姆热刺球场', matchType: '英超', odds: {} as any },
      { date: '2025-08-30', homeTeam: '切尔西', awayTeam: '热刺', homeScore: 1, awayScore: 0, venue: '斯坦福桥球场', matchType: '英超', odds: {} as any },
      { date: '2025-02-12', homeTeam: '热刺', awayTeam: '切尔西', homeScore: 3, awayScore: 1, venue: '托特纳姆热刺球场', matchType: '英超', odds: {} as any },
    ],
    odds: (() => {
      const { bookmakers, initial, live } = generateBookmakerOdds();
      const average = calculateAverage(bookmakers);
      const deviation = calculateDeviation(bookmakers, average);
      return {
        bookmakers,
        initial,
        live: Object.keys(live).length > 0 ? live : undefined,
        lastUpdate: '2026-04-28T17:30:00Z',
        average: { initial: average, live: calculateAverage(bookmakers.filter(b => b.live)) },
        deviation: { initial: deviation, live: deviation * 0.85 },
      };
    })(),
    stats: {
      home: { possession: 55, corners: 6, redCards: 0, yellowCards: 2, shots: 14, shotsOnTarget: 6, penalties: 0, attacks: 78, dangerousAttacks: 35, offsides: 4, fouls: 15, passAccuracy: 82 },
      away: { possession: 45, corners: 5, redCards: 0, yellowCards: 2, shots: 12, shotsOnTarget: 5, penalties: 1, attacks: 62, dangerousAttacks: 28, offsides: 3, fouls: 14, passAccuracy: 78 },
    },
  },
];

export const news: News[] = [
  {
    id: 'news_001',
    title: '哈兰德本赛季已进36球，打破英超单赛季进球纪录',
    summary: '曼城前锋哈兰德在本轮比赛中梅开二度，将个人赛季进球数提升至36个，超越了阿兰·希勒和安迪·科尔共同保持的34球纪录。',
    content: '曼城前锋埃尔林·哈兰德在今天的比赛中再次证明了自己的实力。这位挪威球星在对阵阿森纳的比赛中打入两球，帮助球队以2-1获胜。这两个进球使他本赛季的英超进球数达到了36个，打破了由阿兰·希勒和安迪·科尔共同保持的34球纪录。\n\n哈兰德在接受采访时表示："能够打破这样的纪录是一种荣幸。这要归功于我的队友们，没有他们的支持，我不可能取得这样的成就。"\n\n曼城主教练瓜迪奥拉对哈兰德赞不绝口："他是一位非凡的球员，拥有难以置信的进球能力。我们很幸运能够拥有他。"',
    category: '头条',
    author: '体育记者张三',
    publishedAt: '2026-04-29T18:00:00Z',
    imageUrl: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Erling%20Haaland%20celebrating%20goal%20Manchester%20City%20red%20kit&image_size=landscape_16_9',
    tags: ['英超', '曼城', '哈兰德', '纪录'],
  },
  {
    id: 'news_002',
    title: '皇马官方宣布签下贝林厄姆，转会费1.2亿欧元',
    summary: '皇家马德里官方宣布从多特蒙德签下中场球员裘德·贝林厄姆，转会费达到1.2亿欧元，双方签约5年。',
    content: '皇家马德里俱乐部官方宣布，他们已经成功签下了多特蒙德中场球员裘德·贝林厄姆。这位20岁的英格兰国脚将在本赛季结束后正式加盟银河战舰。\n\n据报道，转会费为1.2亿欧元，双方签约5年。贝林厄姆将成为皇马历史上最昂贵的引援之一。\n\n皇马主席弗洛伦蒂诺表示："贝林厄姆是当今足坛最具天赋的年轻球员之一，我们相信他将在皇马取得巨大成功。"',
    category: '转会',
    author: '足球编辑李四',
    publishedAt: '2026-04-29T15:30:00Z',
    imageUrl: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Jude%20Bellingham%20Real%20Madrid%20white%20kit%20celebration&image_size=landscape_16_9',
    tags: ['西甲', '皇马', '转会', '贝林厄姆'],
  },
  {
    id: 'news_003',
    title: '利物浦确认克洛普赛季末离任',
    summary: '利物浦足球俱乐部官方确认，主教练尤尔根·克洛普将在本赛季结束后离开球队，结束长达8年的执教生涯。',
    content: '利物浦足球俱乐部今天正式宣布，主教练尤尔根·克洛普将在本赛季结束后离任。这位德国教练自2015年接手球队以来，带领利物浦赢得了英超冠军、欧冠冠军等多项荣誉。\n\n克洛普在声明中表示："这是我职业生涯中最艰难的决定之一。我热爱这家俱乐部和这里的球迷，但我觉得现在是时候离开了。"\n\n利物浦主席汤姆·沃纳对克洛普的贡献表示感谢："尤尔根为利物浦带来了辉煌的时刻，我们永远感激他所做的一切。"',
    category: '头条',
    author: '资深记者王五',
    publishedAt: '2026-04-28T20:00:00Z',
    imageUrl: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Jurgen%20Klopp%20Liverpool%20manager%20emotional%20press%20conference&image_size=landscape_16_9',
    tags: ['英超', '利物浦', '克洛普', '教练'],
  },
  {
    id: 'news_004',
    title: 'AC米兰重返欧冠四强',
    summary: 'AC米兰在欧冠四分之一决赛中淘汰那不勒斯，时隔16年再次晋级欧冠四强。',
    content: 'AC米兰在今天的欧冠四分之一决赛次回合比赛中以2-0击败那不勒斯，总比分3-1淘汰对手，时隔16年再次晋级欧冠四强。\n\n比赛中，莱奥和吉鲁分别建功，帮助米兰锁定胜局。这支意甲豪门上一次进入欧冠四强还是在2009-10赛季。\n\n主教练皮奥利表示："这是一个历史性的时刻。我们的球员们展现出了非凡的斗志和实力。"',
    category: '赛事',
    author: '足球评论员赵六',
    publishedAt: '2026-04-28T12:00:00Z',
    imageUrl: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=AC%20Milan%20players%20celebrating%20Champions%20League%20quarterfinal%20win&image_size=landscape_16_9',
    tags: ['欧冠', 'AC米兰', '四强'],
  },
  {
    id: 'news_005',
    title: '巴萨计划今夏签下姆巴佩',
    summary: '据西班牙媒体报道，巴塞罗那正在计划在今年夏天签下巴黎圣日耳曼前锋基利安·姆巴佩。',
    content: '据《世界体育报》报道，巴塞罗那俱乐部正在制定计划，准备在今年夏天签下巴黎圣日耳曼前锋基利安·姆巴佩。\n\n报道称，巴萨已经与姆巴佩的团队进行了初步接触，球员本人对加盟巴萨表现出浓厚兴趣。\n\n如果这笔转会能够成功，姆巴佩将与莱万多夫斯基组成强大的锋线组合，帮助巴萨重新夺回西甲冠军。',
    category: '转会',
    author: '西班牙足球专家',
    publishedAt: '2026-04-27T18:30:00Z',
    imageUrl: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Kylian%20Mbappe%20Barcelona%20jersey%20concept%20art&image_size=landscape_16_9',
    tags: ['西甲', '巴萨', '转会', '姆巴佩'],
  },
];

export const transferNews: TransferNews[] = [
  {
    id: 'transfer_001',
    playerName: '裘德·贝林厄姆',
    fromTeam: '多特蒙德',
    toTeam: '皇家马德里',
    transferType: '买入',
    fee: '1.2亿欧元',
    status: '已完成',
    news: news[1],
  },
  {
    id: 'transfer_002',
    playerName: '基利安·姆巴佩',
    fromTeam: '巴黎圣日耳曼',
    toTeam: '巴塞罗那',
    transferType: '买入',
    status: '谈判中',
    news: news[4],
  },
  {
    id: 'transfer_003',
    playerName: '哈里·凯恩',
    fromTeam: '托特纳姆热刺',
    toTeam: '拜仁慕尼黑',
    transferType: '传闻',
    status: '传闻',
    news: news[0],
  },
];
