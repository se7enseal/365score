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
    events: [
      { time: '15\'', type: 'goal', team: 'home', player: '哈弗茨', description: '哈弗茨头球破门' },
      { time: '32\'', type: 'yellow', team: 'away', player: '霍伊别尔', description: '霍伊别尔黄牌' },
      { time: '45+2\'', type: 'goal', team: 'home', player: '维尔纳', description: '维尔纳单刀得分' },
      { time: '67\'', type: 'goal', team: 'away', player: '凯恩', description: '凯恩点球命中' },
      { time: '75\'', type: 'substitution', team: 'home', player: '普利西奇 ↔ 斯特林', description: '换人' },
    ],
    stats: {
      home: { possession: 58, shots: 18, shotsOnTarget: 8, corners: 6, fouls: 12, yellowCards: 2, redCards: 0 },
      away: { possession: 42, shots: 12, shotsOnTarget: 4, corners: 4, fouls: 15, yellowCards: 3, redCards: 0 },
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
