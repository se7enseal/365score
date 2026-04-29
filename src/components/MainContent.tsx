export default function MainContent() {
  const featuredMatch = {
    id: 1,
    homeTeam: '切尔西',
    awayTeam: '托特纳姆热刺',
    homeScore: 2,
    awayScore: 1,
    league: '英超联赛',
    date: '2024-04-28',
    time: '22:00',
    status: 'FINISHED',
    homeLogo: 'https://via.placeholder.com/48',
    awayLogo: 'https://via.placeholder.com/48',
  };

  const upcomingMatches = [
    { id: 1, home: '曼城', away: '阿森纳', time: '今天 20:30', league: '英超', status: 'UPCOMING' },
    { id: 2, home: '利物浦', away: '曼联', time: '明天 03:00', league: '英超', status: 'UPCOMING' },
    { id: 3, home: '皇马', away: '巴萨', time: '周日 02:00', league: '西甲', status: 'UPCOMING' },
    { id: 4, home: '拜仁', away: '多特', time: '周日 00:30', league: '德甲', status: 'UPCOMING' },
    { id: 5, home: '巴黎', away: '马赛', time: '周六 22:00', league: '法甲', status: 'UPCOMING' },
  ];

  const newsHeadlines = [
    { id: 1, title: '哈兰德本赛季已进36球，打破英超纪录', category: '英超', time: '2小时前' },
    { id: 2, title: '皇马宣布签下贝林厄姆，转会费1.2亿欧', category: '西甲', time: '5小时前' },
    { id: 3, title: '利物浦确认克洛普赛季末离任', category: '英超', time: '8小时前' },
    { id: 4, title: 'AC米兰重返欧冠四强', category: '欧冠', time: '昨天' },
  ];

  const aiPredictions = [
    { match: '曼城 vs 阿森纳', prediction: '曼城胜', confidence: 68, odds: '1.85' },
    { match: '利物浦 vs 曼联', prediction: '平局', confidence: 52, odds: '3.20' },
    { match: '皇马 vs 巴萨', prediction: '皇马胜', confidence: 72, odds: '1.75' },
  ];

  return (
    <main className="flex-1 space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm opacity-80 mb-1">{featuredMatch.league}</div>
            <h1 className="text-2xl font-bold mb-4">{featuredMatch.homeTeam} vs {featuredMatch.awayTeam}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="font-bold">{featuredMatch.homeScore}</span>
                </div>
                <span className="text-3xl font-bold">{featuredMatch.homeScore} - {featuredMatch.awayScore}</span>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="font-bold">{featuredMatch.awayScore}</span>
                </div>
              </div>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                {featuredMatch.date} {featuredMatch.time}
              </span>
            </div>
          </div>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            查看详情 →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold flex items-center gap-2">
              <span>📅</span> 今日赛事
            </h2>
            <a href="/calendar" className="text-blue-400 hover:text-blue-300 text-sm">
              查看全部 →
            </a>
          </div>
          <div className="space-y-3">
            {upcomingMatches.map((match) => (
              <div key={match.id} className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-medium">{match.home}</span>
                    <span className="text-gray-500">VS</span>
                    <span className="text-white font-medium">{match.away}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-400 text-xs">{match.league}</div>
                    <div className="text-white text-sm font-medium">{match.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold flex items-center gap-2">
              <span>🤖</span> AI预测
            </h2>
            <a href="/predictions" className="text-blue-400 hover:text-blue-300 text-sm">
              查看全部 →
            </a>
          </div>
          <div className="space-y-3">
            {aiPredictions.map((prediction, idx) => (
              <div key={idx} className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-medium">{prediction.match}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${prediction.confidence > 60 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {prediction.confidence}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-xs">预测:</span>
                    <span className="text-white font-semibold">{prediction.prediction}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-xs">赔率:</span>
                    <span className="text-yellow-400 font-bold">{prediction.odds}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold flex items-center gap-2">
            <span>📰</span> 最新资讯
          </h2>
          <a href="/news" className="text-blue-400 hover:text-blue-300 text-sm">
            查看全部 →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {newsHeadlines.map((news) => (
            <div key={news.id} className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded">{news.category}</span>
                <span className="text-gray-500 text-xs">{news.time}</span>
              </div>
              <h3 className="text-white text-sm font-medium line-clamp-2">{news.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
