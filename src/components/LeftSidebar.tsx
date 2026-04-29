export default function LeftSidebar() {
  const hotMatches = [
    { id: 1, home: '曼城', away: '阿森纳', time: '今天 20:30', league: '英超' },
    { id: 2, home: '利物浦', away: '曼联', time: '明天 03:00', league: '英超' },
    { id: 3, home: '皇马', away: '巴萨', time: '周日 02:00', league: '西甲' },
  ];

  const leagues = [
    { name: '英超', matches: 12, icon: '⚽' },
    { name: '西甲', matches: 10, icon: '🏆' },
    { name: '意甲', matches: 8, icon: '🇮🇹' },
    { name: '德甲', matches: 9, icon: '🇩🇪' },
    { name: '法甲', matches: 7, icon: '🇫🇷' },
    { name: '欧冠', matches: 4, icon: '⭐' },
  ];

  const quickLinks = [
    { label: '积分榜', href: '/standings' },
    { label: '射手榜', href: '/top-scorers' },
    { label: '助攻榜', href: '/assists' },
    { label: '赛程表', href: '/calendar' },
  ];

  return (
    <aside className="w-64 flex-shrink-0 space-y-4">
      <div className="bg-gray-800 rounded-xl p-4">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="text-yellow-400">🔥</span> 热门赛事
        </h3>
        <div className="space-y-3">
          {hotMatches.map((match) => (
            <div key={match.id} className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors cursor-pointer">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>{match.league}</span>
                <span>{match.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white text-sm font-medium">{match.home}</span>
                <span className="text-gray-500">VS</span>
                <span className="text-white text-sm font-medium">{match.away}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-4">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="text-blue-400">🏟️</span> 联赛导航
        </h3>
        <div className="space-y-2">
          {leagues.map((league) => (
            <a
              key={league.name}
              href={`/league/${league.name}`}
              className="flex items-center justify-between text-gray-300 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-gray-700"
            >
              <div className="flex items-center gap-2">
                <span>{league.icon}</span>
                <span className="text-sm">{league.name}</span>
              </div>
              <span className="text-xs bg-gray-700 px-2 py-0.5 rounded-full">{league.matches}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-4">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="text-green-400">⚡</span> 快速链接
        </h3>
        <div className="space-y-2">
          {quickLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-gray-300 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-gray-700 text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
