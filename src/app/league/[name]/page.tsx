import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export async function generateStaticParams() {
  const leagues = ['英超', '西甲', '意甲', '德甲', '法甲', '欧冠', '欧罗巴', '欧协联'];
  return leagues.map((name) => ({ name }));
}

const leagueData: Record<string, {
  name: string;
  country: string;
  founded: string;
  teams: number;
  description: string;
  champions: Array<{ year: string; team: string }>;
  topScorers: Array<{ name: string; team: string; goals: number }>;
}> = {
  '英超': {
    name: '英格兰足球超级联赛',
    country: '英格兰',
    founded: '1992年',
    teams: 20,
    description: '英格兰足球超级联赛（简称英超）是英格兰足球总会属下的最高等级职业足球联赛，成立于1992年，是欧洲五大联赛之一。英超以其快节奏、高对抗和全球广泛的影响力而闻名。',
    champions: [
      { year: '2023-24', team: '曼城' },
      { year: '2022-23', team: '曼城' },
      { year: '2021-22', team: '曼城' },
      { year: '2020-21', team: '曼城' },
      { year: '2019-20', team: '利物浦' },
    ],
    topScorers: [
      { name: '哈兰德', team: '曼城', goals: 36 },
      { name: '萨拉赫', team: '利物浦', goals: 24 },
      { name: '凯恩', team: '热刺', goals: 22 },
    ],
  },
  '西甲': {
    name: '西班牙足球甲级联赛',
    country: '西班牙',
    founded: '1929年',
    teams: 20,
    description: '西班牙足球甲级联赛（简称西甲）是西班牙最高等级的职业足球联赛，成立于1929年。西甲以其技术流打法和巴塞罗那、皇家马德里等豪门俱乐部而闻名于世。',
    champions: [
      { year: '2023-24', team: '皇家马德里' },
      { year: '2022-23', team: '巴塞罗那' },
      { year: '2021-22', team: '皇家马德里' },
      { year: '2020-21', team: '马德里竞技' },
      { year: '2019-20', team: '皇家马德里' },
    ],
    topScorers: [
      { name: '本泽马', team: '皇家马德里', goals: 28 },
      { name: '莱万多夫斯基', team: '巴塞罗那', goals: 23 },
      { name: '维尼修斯', team: '皇家马德里', goals: 18 },
    ],
  },
  '意甲': {
    name: '意大利足球甲级联赛',
    country: '意大利',
    founded: '1929年',
    teams: 20,
    description: '意大利足球甲级联赛（简称意甲）是意大利最高等级的职业足球联赛，成立于1929年。意甲以其出色的防守战术和AC米兰、尤文图斯等传统豪门而著称。',
    champions: [
      { year: '2023-24', team: '那不勒斯' },
      { year: '2022-23', team: '那不勒斯' },
      { year: '2021-22', team: 'AC米兰' },
      { year: '2020-21', team: '国际米兰' },
      { year: '2019-20', team: '尤文图斯' },
    ],
    topScorers: [
      { name: '奥斯梅恩', team: '那不勒斯', goals: 26 },
      { name: '劳塔罗', team: '国际米兰', goals: 22 },
      { name: '吉鲁', team: 'AC米兰', goals: 17 },
    ],
  },
  '德甲': {
    name: '德国足球甲级联赛',
    country: '德国',
    founded: '1963年',
    teams: 18,
    description: '德国足球甲级联赛（简称德甲）是德国最高等级的职业足球联赛，成立于1963年。德甲以其高效的进攻和拜仁慕尼黑的长期统治而闻名。',
    champions: [
      { year: '2023-24', team: '拜仁慕尼黑' },
      { year: '2022-23', team: '拜仁慕尼黑' },
      { year: '2021-22', team: '拜仁慕尼黑' },
      { year: '2020-21', team: '拜仁慕尼黑' },
      { year: '2019-20', team: '拜仁慕尼黑' },
    ],
    topScorers: [
      { name: '凯恩', team: '拜仁慕尼黑', goals: 32 },
      { name: '穆西亚拉', team: '拜仁慕尼黑', goals: 18 },
      { name: '菲尔克鲁格', team: '多特蒙德', goals: 16 },
    ],
  },
  '法甲': {
    name: '法国足球甲级联赛',
    country: '法国',
    founded: '1932年',
    teams: 20,
    description: '法国足球甲级联赛（简称法甲）是法国最高等级的职业足球联赛，成立于1932年。法甲以巴黎圣日耳曼的统治和培养年轻天才球员而闻名。',
    champions: [
      { year: '2023-24', team: '巴黎圣日耳曼' },
      { year: '2022-23', team: '巴黎圣日耳曼' },
      { year: '2021-22', team: '巴黎圣日耳曼' },
      { year: '2020-21', team: '里尔' },
      { year: '2019-20', team: '巴黎圣日耳曼' },
    ],
    topScorers: [
      { name: '姆巴佩', team: '巴黎圣日耳曼', goals: 30 },
      { name: '哈莫马', team: '兰斯', goals: 18 },
      { name: '本耶德尔', team: '摩纳哥', goals: 16 },
    ],
  },
  '欧冠': {
    name: '欧洲冠军联赛',
    country: '欧洲',
    founded: '1955年',
    teams: 32,
    description: '欧洲冠军联赛（简称欧冠）是欧洲足球协会联盟主办的年度足球俱乐部赛事，成立于1955年，是欧洲俱乐部足球最高荣誉和最具影响力的赛事。',
    champions: [
      { year: '2023-24', team: '皇家马德里' },
      { year: '2022-23', team: '曼城' },
      { year: '2021-22', team: '皇家马德里' },
      { year: '2020-21', team: '切尔西' },
      { year: '2019-20', team: '拜仁慕尼黑' },
    ],
    topScorers: [
      { name: '姆巴佩', team: '巴黎圣日耳曼', goals: 12 },
      { name: '哈兰德', team: '曼城', goals: 10 },
      { name: '维尼修斯', team: '皇家马德里', goals: 8 },
    ],
  },
  '欧罗巴': {
    name: '欧足联欧洲联赛',
    country: '欧洲',
    founded: '1971年',
    teams: 32,
    description: '欧足联欧洲联赛（简称欧联杯）是欧洲足球协会联盟主办的仅次于欧冠的俱乐部赛事，成立于1971年，为欧洲各大联赛的中游球队提供了欧洲赛场的机会。',
    champions: [
      { year: '2023-24', team: '塞维利亚' },
      { year: '2022-23', team: '塞维利亚' },
      { year: '2021-22', team: '法兰克福' },
      { year: '2020-21', team: '比利亚雷亚尔' },
      { year: '2019-20', team: '塞维利亚' },
    ],
    topScorers: [
      { name: '拉卡泽特', team: '里昂', goals: 8 },
      { name: '奥尔莫', team: '莱比锡', goals: 7 },
      { name: '萨拉维亚', team: '巴黎圣日耳曼', goals: 6 },
    ],
  },
};

export default function LeaguePage({ params }: { params: { name: string } }) {
  const league = leagueData[params.name] || {
    name: params.name,
    country: '未知',
    founded: '未知',
    teams: 0,
    description: '暂无详细信息',
    champions: [],
    topScorers: [],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">{league.name}</h1>
          <div className="flex items-center gap-4 text-sm opacity-80">
            <span>🏆 {league.country}</span>
            <span>📅 成立于 {league.founded}</span>
            <span>👥 {league.teams} 支球队</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">联赛介绍</h2>
              <p className="text-gray-600 leading-relaxed">{league.description}</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">🏆 历年冠军</h2>
              <div className="space-y-3">
                {league.champions.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <span className="text-gray-500">{item.year}赛季</span>
                    <span className="font-semibold text-gray-900">{item.team}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">⚽ 本赛季射手榜</h2>
              <div className="space-y-4">
                {league.topScorers.map((player, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : idx === 2 ? 'bg-amber-600' : 'bg-blue-500'
                    }`}>
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{player.name}</div>
                      <div className="text-sm text-gray-500">{player.team}</div>
                    </div>
                    <div className="text-orange-600 font-bold">{player.goals}球</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-3">📊 联赛数据</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-80">参赛球队</span>
                  <span className="font-bold">{league.teams} 支</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">成立年份</span>
                  <span className="font-bold">{league.founded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">所属国家</span>
                  <span className="font-bold">{league.country}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
