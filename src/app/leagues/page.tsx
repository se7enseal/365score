'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const leaguesData = [
  { name: '英超', icon: '⚽', country: '英格兰', teams: 20, matches: 380, level: '顶级', color: 'from-red-500 to-blue-600' },
  { name: '西甲', icon: '🏆', country: '西班牙', teams: 20, matches: 380, level: '顶级', color: 'from-yellow-500 to-red-600' },
  { name: '意甲', icon: '🇮🇹', country: '意大利', teams: 20, matches: 380, level: '顶级', color: 'from-blue-500 to-white' },
  { name: '德甲', icon: '🇩🇪', country: '德国', teams: 18, matches: 306, level: '顶级', color: 'from-red-500 to-yellow-500' },
  { name: '法甲', icon: '🇫🇷', country: '法国', teams: 20, matches: 380, level: '顶级', color: 'from-blue-500 to-red-600' },
  { name: '欧冠', icon: '⭐', country: '欧洲', teams: 32, matches: 125, level: '欧洲', color: 'from-yellow-500 to-purple-600' },
  { name: '欧罗巴', icon: '🥈', country: '欧洲', teams: 32, matches: 141, level: '欧洲', color: 'from-orange-500 to-blue-600' },
  { name: '欧协联', icon: '🥉', country: '欧洲', teams: 32, matches: 141, level: '欧洲', color: 'from-amber-500 to-green-600' },
  { name: '足总杯', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', country: '英格兰', teams: 64, matches: 63, level: '杯赛', color: 'from-white to-blue-600' },
  { name: '国王杯', icon: '👑', country: '西班牙', teams: 82, matches: 81, level: '杯赛', color: 'from-red-500 to-yellow-500' },
  { name: '德国杯', icon: '🏆', country: '德国', teams: 64, matches: 63, level: '杯赛', color: 'from-black to-red-600' },
  { name: '意大利杯', icon: '🏆', country: '意大利', teams: 44, matches: 43, level: '杯赛', color: 'from-blue-600 to-white' },
];

export default function LeaguesPage() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回上一页
        </button>
        
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">🏟️ 联赛资料</h1>
          <p className="text-sm opacity-80">浏览所有足球联赛和杯赛</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leaguesData.map((league) => (
            <a
              key={league.name}
              href={`/league/${league.name}`}
              className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all group`}
            >
              <div className={`bg-gradient-to-r ${league.color} rounded-lg p-4 mb-4`}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{league.icon}</span>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{league.name}</h3>
                    <p className="text-white/80 text-sm">{league.country}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">参赛球队</span>
                  <span className="font-medium text-gray-900">{league.teams} 支</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">总比赛场数</span>
                  <span className="font-medium text-gray-900">{league.matches} 场</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">赛事级别</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    league.level === '顶级' ? 'bg-green-100 text-green-700' :
                    league.level === '欧洲' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {league.level}
                  </span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <span className="text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  查看详情 →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
