export default function RightSidebar() {
  const liveScores = [
    { id: 1, home: '切尔西', away: '热刺', homeScore: 2, awayScore: 1, minute: '85\'' },
    { id: 2, home: '拜仁', away: '多特', homeScore: 3, awayScore: 2, minute: '72\'' },
    { id: 3, home: '巴黎', away: '里昂', homeScore: 1, awayScore: 1, minute: 'HT' },
    { id: 4, home: 'AC米兰', away: '尤文图斯', homeScore: 0, awayScore: 0, minute: '15\'' },
  ];

  const standings = [
    { rank: 1, team: '曼城', played: 34, points: 89, trend: 'up' },
    { rank: 2, team: '阿森纳', played: 34, points: 82, trend: 'down' },
    { rank: 3, team: '利物浦', played: 34, points: 78, trend: 'up' },
    { rank: 4, team: '热刺', played: 34, points: 72, trend: 'same' },
    { rank: 5, team: '曼联', played: 34, points: 68, trend: 'down' },
  ];

  const topPlayers = [
    { name: '哈兰德', team: '曼城', goals: 36, assists: 8 },
    { name: '萨拉赫', team: '利物浦', goals: 24, assists: 12 },
    { name: '凯恩', team: '热刺', goals: 22, assists: 10 },
    { name: 'Saka', team: '阿森纳', goals: 15, assists: 14 },
  ];

  return (
    <aside className="w-64 flex-shrink-0 space-y-4">
      <div className="bg-gray-800 rounded-xl p-4">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="text-red-400 animate-pulse">⚽</span> 实时比分
        </h3>
        <div className="space-y-2">
          {liveScores.map((match) => (
            <div key={match.id} className="bg-gray-700/50 rounded-lg p-2 hover:bg-gray-700 transition-colors cursor-pointer">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span className="text-red-400 font-medium">{match.minute}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white text-xs font-medium">{match.home}</span>
                <div className="flex items-center gap-1">
                  <span className="text-white font-bold">{match.homeScore}</span>
                  <span className="text-gray-500">:</span>
                  <span className="text-white font-bold">{match.awayScore}</span>
                </div>
                <span className="text-white text-xs font-medium">{match.away}</span>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-3 text-blue-400 hover:text-blue-300 text-xs font-medium">
          查看全部 →
        </button>
      </div>

      <div className="bg-gray-800 rounded-xl p-4">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="text-yellow-400">🏆</span> 英超积分榜
        </h3>
        <div className="space-y-1">
          {standings.map((team) => (
            <div key={team.rank} className="flex items-center gap-2 py-1 hover:bg-gray-700/50 rounded px-1">
              <span className={`w-6 text-center text-xs font-bold ${team.rank <= 3 ? 'text-yellow-400' : 'text-gray-400'}`}>
                {team.rank}
              </span>
              <span className="flex-1 text-white text-sm">{team.team}</span>
              <span className="text-gray-400 text-xs">{team.points}分</span>
              <span className={`text-xs ${team.trend === 'up' ? 'text-green-400' : team.trend === 'down' ? 'text-red-400' : 'text-gray-500'}`}>
                {team.trend === 'up' ? '↑' : team.trend === 'down' ? '↓' : '→'}
              </span>
            </div>
          ))}
        </div>
        <button className="w-full mt-3 text-blue-400 hover:text-blue-300 text-xs font-medium">
          完整积分榜 →
        </button>
      </div>

      <div className="bg-gray-800 rounded-xl p-4">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="text-green-400">⭐</span> 热门球员
        </h3>
        <div className="space-y-2">
          {topPlayers.map((player, idx) => (
            <div key={player.name} className="flex items-center gap-2 bg-gray-700/50 rounded-lg p-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {idx + 1}
              </div>
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{player.name}</div>
                <div className="text-gray-400 text-xs">{player.team}</div>
              </div>
              <div className="text-right">
                <div className="text-yellow-400 text-xs font-bold">{player.goals}球</div>
                <div className="text-blue-400 text-xs">{player.assists}助</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
