'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const topScorers = [
  { rank: 1, name: '哈兰德', team: '曼城', league: '英超', goals: 36, assists: 8, games: 32 },
  { rank: 2, name: '姆巴佩', team: '巴黎圣日耳曼', league: '法甲', goals: 30, assists: 12, games: 28 },
  { rank: 3, name: '凯恩', team: '拜仁慕尼黑', league: '德甲', goals: 32, assists: 7, games: 30 },
  { rank: 4, name: '本泽马', team: '皇家马德里', league: '西甲', goals: 28, assists: 5, games: 31 },
  { rank: 5, name: '萨拉赫', team: '利物浦', league: '英超', goals: 24, assists: 12, games: 33 },
  { rank: 6, name: '奥斯梅恩', team: '那不勒斯', league: '意甲', goals: 26, assists: 4, games: 29 },
  { rank: 7, name: '莱万多夫斯基', team: '巴塞罗那', league: '西甲', goals: 23, assists: 6, games: 30 },
  { rank: 8, name: '劳塔罗', team: '国际米兰', league: '意甲', goals: 22, assists: 8, games: 32 },
  { rank: 9, name: '孙兴慜', team: '热刺', league: '英超', goals: 20, assists: 10, games: 34 },
  { rank: 10, name: '穆勒', team: '拜仁慕尼黑', league: '德甲', goals: 18, assists: 15, games: 31 },
];

export default function TopScorersPage() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回上一页
        </button>
        
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">⚽ 欧洲金靴榜</h1>
          <p className="text-sm opacity-80">本赛季欧洲五大联赛射手排名</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 bg-gray-50 px-6 py-4 text-sm font-semibold text-gray-500">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-3">球员</div>
            <div className="col-span-2">球队</div>
            <div className="col-span-2 text-center">联赛</div>
            <div className="col-span-1 text-center">进球</div>
            <div className="col-span-1 text-center">助攻</div>
            <div className="col-span-1 text-center">场次</div>
            <div className="col-span-1 text-center">效率</div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {topScorers.map((player) => (
              <div 
                key={player.rank}
                className={`grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors ${
                  player.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : ''
                }`}
              >
                <div className="col-span-1 text-center">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mx-auto ${
                    player.rank === 1 ? 'bg-yellow-500' : 
                    player.rank === 2 ? 'bg-gray-400' : 
                    player.rank === 3 ? 'bg-amber-600' : 
                    'bg-gray-300 text-gray-700'
                  }`}>
                    {player.rank}
                  </span>
                </div>
                <div className="col-span-3 font-semibold text-gray-900">{player.name}</div>
                <div className="col-span-2 text-gray-600">{player.team}</div>
                <div className="col-span-2 text-center">
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded">{player.league}</span>
                </div>
                <div className="col-span-1 text-center font-bold text-orange-600">{player.goals}</div>
                <div className="col-span-1 text-center text-blue-600">{player.assists}</div>
                <div className="col-span-1 text-center text-gray-500">{player.games}</div>
                <div className="col-span-1 text-center text-green-600">
                  {(player.goals / player.games).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
