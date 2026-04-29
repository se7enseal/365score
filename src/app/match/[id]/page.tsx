import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import MatchDetailContent from '../../../components/MatchDetailContent';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

const getMatchData = (id: string) => {
  return {
    id,
    homeTeam: '切尔西',
    awayTeam: '托特纳姆热刺',
    homeScore: 2,
    awayScore: 1,
    homeHalfScore: 2,
    awayHalfScore: 0,
    league: '英超联赛',
    date: '2024-04-28',
    time: '22:00',
    status: 'FINISHED',
    homeLineup: [
      { number: 1, name: '门迪', position: '门将' },
      { number: 2, name: '里斯·詹姆斯', position: '右后卫' },
      { number: 4, name: '蒂亚戈·席尔瓦', position: '中后卫' },
      { number: 6, name: '蒂尔尼', position: '左后卫' },
      { number: 5, name: '若日尼奥', position: '中场' },
      { number: 8, name: '科瓦契奇', position: '中场' },
      { number: 10, name: '普利西奇', position: '右边锋' },
      { number: 11, name: '维尔纳', position: '中锋' },
      { number: 19, name: '芒特', position: '前腰' },
      { number: 20, name: '哈弗茨', position: '左边锋' },
      { number: 28, name: '阿斯皮利奎塔', position: '中后卫' },
    ],
    homeSubstitutes: [
      { number: 13, name: '凯帕', position: '门将' },
      { number: 3, name: '马科斯·阿隆索', position: '左后卫' },
      { number: 7, name: '斯特林', position: '前锋' },
      { number: 12, name: '奇克', position: '中场' },
      { number: 14, name: '查洛巴', position: '后卫' },
      { number: 21, name: '齐耶赫', position: '中场' },
      { number: 22, name: '穆德里克', position: '前锋' },
      { number: 24, name: '加拉格尔', position: '中场' },
    ],
    awayLineup: [
      { number: 1, name: '洛里', position: '门将' },
      { number: 3, name: '雷吉隆', position: '左后卫' },
      { number: 4, name: '戴尔', position: '中后卫' },
      { number: 5, name: '霍伊别尔', position: '中场' },
      { number: 7, name: '孙兴慜', position: '左边锋' },
      { number: 10, name: '凯恩', position: '中锋' },
      { number: 11, name: '佩里西奇', position: '右边锋' },
      { number: 15, name: '戴尔', position: '中后卫' },
      { number: 17, name: '塞塞尼翁', position: '左前卫' },
      { number: 23, name: 'B·戴维斯', position: '右后卫' },
      { number: 28, name: '所罗门', position: '前腰' },
    ],
    awaySubstitutes: [
      { number: 20, name: '福斯特', position: '门将' },
      { number: 2, name: '多赫蒂', position: '后卫' },
      { number: 6, name: '桑切斯', position: '后卫' },
      { number: 8, name: '洛塞尔索', position: '中场' },
      { number: 12, name: '埃莫森', position: '后卫' },
      { number: 14, name: '斯基普', position: '中场' },
      { number: 27, name: '库卢塞夫斯基', position: '前锋' },
      { number: 30, name: '本坦库尔', position: '中场' },
    ],
    events: [
      { time: '15\'', type: 'goal', team: 'home', player: '哈弗茨', description: '哈弗茨头球破门' },
      { time: '32\'', type: 'yellow', team: 'away', player: '霍伊别尔', description: '霍伊别尔黄牌' },
      { time: '45+2\'', type: 'goal', team: 'home', player: '维尔纳', description: '维尔纳单刀得分' },
      { time: '67\'', type: 'goal', team: 'away', player: '凯恩', description: '凯恩点球命中' },
      { time: '75\'', type: 'substitution', team: 'home', player: '普利西奇 ↔ 斯特林', description: '换人' },
    ],
    stats: {
      home: { possession: 58, shots: 18, shotsOnTarget: 8, corners: 6, fouls: 12, yellowCards: 2, redCards: 0, attacks: 79, dangerousAttacks: 44, penalties: 1 },
      away: { possession: 42, shots: 12, shotsOnTarget: 4, corners: 4, fouls: 15, yellowCards: 3, redCards: 0, attacks: 54, dangerousAttacks: 31, penalties: 0 },
    },
    headToHead: [
      { date: '2023-11-06', home: '热刺', away: '切尔西', homeScore: 1, awayScore: 4, league: '英超' },
      { date: '2023-08-13', home: '切尔西', away: '热刺', homeScore: 2, awayScore: 2, league: '英超' },
      { date: '2023-04-28', home: '热刺', away: '切尔西', homeScore: 3, awayScore: 1, league: '英超' },
      { date: '2022-12-26', home: '切尔西', away: '热刺', homeScore: 2, awayScore: 0, league: '英超' },
      { date: '2022-08-14', home: '热刺', away: '切尔西', homeScore: 0, awayScore: 1, league: '英超' },
      { date: '2022-05-01', home: '切尔西', away: '热刺', homeScore: 3, awayScore: 2, league: '英超' },
    ],
    homeRecentMatches: [
      { date: '2024-04-25', league: '英超', opponent: '阿森纳', homeScore: 2, awayScore: 1, result: 'W' },
      { date: '2024-04-20', league: '英超', opponent: '利物浦', homeScore: 1, awayScore: 1, result: 'D' },
      { date: '2024-04-15', league: '足总杯', opponent: '曼联', homeScore: 3, awayScore: 0, result: 'W' },
      { date: '2024-04-08', league: '英超', opponent: '纽卡斯尔', homeScore: 2, awayScore: 2, result: 'D' },
      { date: '2024-04-01', league: '英超', opponent: '布莱顿', homeScore: 1, awayScore: 0, result: 'W' },
      { date: '2024-03-25', league: '英超', opponent: '阿斯顿维拉', homeScore: 3, awayScore: 1, result: 'W' },
      { date: '2024-03-18', league: '英超', opponent: '富勒姆', homeScore: 2, awayScore: 2, result: 'D' },
      { date: '2024-03-10', league: '欧冠', opponent: '水晶宫', homeScore: 1, awayScore: 0, result: 'W' },
      { date: '2024-03-03', league: '英超', opponent: '布伦特福德', homeScore: 2, awayScore: 1, result: 'W' },
      { date: '2024-02-24', league: '英超', opponent: '狼队', homeScore: 0, awayScore: 1, result: 'L' },
    ],
    awayRecentMatches: [
      { date: '2024-04-25', league: '英超', opponent: '曼城', homeScore: 1, awayScore: 2, result: 'W' },
      { date: '2024-04-20', league: '英超', opponent: '阿森纳', homeScore: 2, awayScore: 2, result: 'D' },
      { date: '2024-04-15', league: '足总杯', opponent: '利物浦', homeScore: 1, awayScore: 3, result: 'L' },
      { date: '2024-04-08', league: '英超', opponent: '曼联', homeScore: 2, awayScore: 2, result: 'D' },
      { date: '2024-04-01', league: '英超', opponent: '纽卡斯尔', homeScore: 3, awayScore: 1, result: 'W' },
      { date: '2024-03-25', league: '英超', opponent: '布莱顿', homeScore: 1, awayScore: 1, result: 'D' },
      { date: '2024-03-18', league: '欧协联', opponent: '阿斯顿维拉', homeScore: 0, awayScore: 2, result: 'L' },
      { date: '2024-03-10', league: '英超', opponent: '富勒姆', homeScore: 2, awayScore: 0, result: 'W' },
      { date: '2024-03-03', league: '英超', opponent: '水晶宫', homeScore: 1, awayScore: 1, result: 'D' },
      { date: '2024-02-24', league: '英超', opponent: '布伦特福德', homeScore: 3, awayScore: 0, result: 'W' },
    ],
    odds: {
      initial: { home: 2.10, draw: 3.40, away: 3.20 },
      closing: { home: 1.95, draw: 3.60, away: 3.80 },
      initialDiscrete: { home: 42.5, draw: 26.8, away: 30.7 },
      finalDiscrete: { home: 46.2, draw: 25.0, away: 28.8 },
      bookmakers: [
        { name: '竞彩官方', initial: { home: 2.05, draw: 3.30, away: 3.10 }, current: { home: 1.92, draw: 3.50, away: 3.70 } },
        { name: '澳门', initial: { home: 2.10, draw: 3.40, away: 3.20 }, current: { home: 1.95, draw: 3.60, away: 3.80 } },
        { name: '香港', initial: { home: 2.08, draw: 3.35, away: 3.15 }, current: { home: 1.94, draw: 3.55, away: 3.75 } },
        { name: '365', initial: { home: 2.15, draw: 3.45, away: 3.25 }, current: { home: 2.00, draw: 3.65, away: 3.85 } },
        { name: '威廉希尔', initial: { home: 2.12, draw: 3.42, away: 3.22 }, current: { home: 1.97, draw: 3.62, away: 3.82 } },
        { name: '立博', initial: { home: 2.10, draw: 3.40, away: 3.20 }, current: { home: 1.95, draw: 3.60, away: 3.80 } },
        { name: 'Interwetten', initial: { home: 2.08, draw: 3.38, away: 3.18 }, current: { home: 1.93, draw: 3.58, away: 3.78 } },
        { name: 'SNAI', initial: { home: 2.14, draw: 3.44, away: 3.24 }, current: { home: 1.99, draw: 3.64, away: 3.84 } },
        { name: 'Pinnacle', initial: { home: 2.06, draw: 3.32, away: 3.12 }, current: { home: 1.91, draw: 3.52, away: 3.72 } },
        { name: 'Bwin', initial: { home: 2.11, draw: 3.41, away: 3.21 }, current: { home: 1.96, draw: 3.61, away: 3.81 } },
        { name: 'Coral', initial: { home: 2.09, draw: 3.39, away: 3.19 }, current: { home: 1.94, draw: 3.59, away: 3.79 } },
        { name: 'Bet-at-home', initial: { home: 2.13, draw: 3.43, away: 3.23 }, current: { home: 1.98, draw: 3.63, away: 3.83 } },
        { name: 'Parimatch', initial: { home: 2.07, draw: 3.33, away: 3.13 }, current: { home: 1.92, draw: 3.53, away: 3.73 } },
        { name: 'Oddset', initial: { home: 2.16, draw: 3.46, away: 3.26 }, current: { home: 2.01, draw: 3.66, away: 3.86 } },
        { name: 'Betfair', initial: { home: 2.04, draw: 3.28, away: 3.08 }, current: { home: 1.90, draw: 3.48, away: 3.68 } },
      ],
    },
  };
};

export default function MatchDetailPage({ params }: { params: { id: string } }) {
  const match = getMatchData(params.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <MatchDetailContent match={match} />
      </div>

      <Footer />
    </div>
  );
}