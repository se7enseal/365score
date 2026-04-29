'use client';

import { useState } from 'react';

export default function RightSidebar() {
  const [activeLeague, setActiveLeague] = useState('英超');

  const leagues = ['英超', '西甲', '意甲', '法甲', '德甲'];

  const standingsData: Record<string, Array<{ rank: number; team: string; played: number; win: number; draw: number; lose: number; gd: number; points: number }>> = {
    '英超': [
      { rank: 1, team: '曼城', played: 34, win: 28, draw: 5, lose: 1, gd: 72, points: 89 },
      { rank: 2, team: '阿森纳', played: 34, win: 25, draw: 7, lose: 2, gd: 61, points: 82 },
      { rank: 3, team: '利物浦', played: 34, win: 24, draw: 6, lose: 4, gd: 58, points: 78 },
      { rank: 4, team: '热刺', played: 34, win: 22, draw: 6, lose: 6, gd: 40, points: 72 },
      { rank: 5, team: '曼联', played: 34, win: 20, draw: 8, lose: 6, gd: 35, points: 68 },
    ],
    '西甲': [
      { rank: 1, team: '皇马', played: 34, win: 26, draw: 5, lose: 3, gd: 55, points: 83 },
      { rank: 2, team: '巴萨', played: 34, win: 25, draw: 7, lose: 2, gd: 52, points: 82 },
      { rank: 3, team: '马竞', played: 34, win: 21, draw: 8, lose: 5, gd: 38, points: 71 },
      { rank: 4, team: '比利亚雷亚尔', played: 34, win: 18, draw: 8, lose: 8, gd: 20, points: 62 },
      { rank: 5, team: '塞维利亚', played: 34, win: 17, draw: 10, lose: 7, gd: 18, points: 61 },
    ],
    '意甲': [
      { rank: 1, team: '那不勒斯', played: 34, win: 28, draw: 4, lose: 2, gd: 50, points: 88 },
      { rank: 2, team: 'AC米兰', played: 34, win: 22, draw: 8, lose: 4, gd: 36, points: 74 },
      { rank: 3, team: '国际米兰', played: 34, win: 22, draw: 7, lose: 5, gd: 40, points: 73 },
      { rank: 4, team: '尤文图斯', played: 34, win: 21, draw: 8, lose: 5, gd: 35, points: 71 },
      { rank: 5, team: '罗马', played: 34, win: 18, draw: 9, lose: 7, gd: 25, points: 63 },
    ],
    '法甲': [
      { rank: 1, team: '巴黎', played: 34, win: 27, draw: 4, lose: 3, gd: 58, points: 85 },
      { rank: 2, team: '马赛', played: 34, win: 22, draw: 7, lose: 5, gd: 32, points: 73 },
      { rank: 3, team: '里昂', played: 34, win: 20, draw: 6, lose: 8, gd: 28, points: 66 },
      { rank: 4, team: '摩纳哥', played: 34, win: 18, draw: 10, lose: 6, gd: 25, points: 64 },
      { rank: 5, team: '雷恩', played: 34, win: 17, draw: 8, lose: 9, gd: 15, points: 59 },
    ],
    '德甲': [
      { rank: 1, team: '拜仁', played: 34, win: 27, draw: 4, lose: 3, gd: 68, points: 85 },
      { rank: 2, team: '多特', played: 34, win: 24, draw: 5, lose: 5, gd: 48, points: 77 },
      { rank: 3, team: '莱比锡', played: 34, win: 20, draw: 8, lose: 6, gd: 35, points: 68 },
      { rank: 4, team: '勒沃库森', played: 34, win: 19, draw: 8, lose: 7, gd: 28, points: 65 },
      { rank: 5, team: '门兴', played: 34, win: 16, draw: 10, lose: 8, gd: 15, points: 58 },
    ],
  };

  const liveScores = [
    { id: 1, home: '切尔西', away: '热刺', homeScore: 2, awayScore: 1, minute: '85\'' },
    { id: 2, home: '拜仁', away: '多特', homeScore: 3, awayScore: 2, minute: '72\'' },
    { id: 3, home: '巴黎', away: '里昂', homeScore: 1, awayScore: 1, minute: 'HT' },
    { id: 4, home: 'AC米兰', away: '尤文图斯', homeScore: 0, awayScore: 0, minute: '15\'' },
  ];

  const topPlayers = [
    { name: '哈兰德', team: '曼城', goals: 36, assists: 8 },
    { name: '萨拉赫', team: '利物浦', goals: 24, assists: 12 },
    { name: '凯恩', team: '热刺', goals: 22, assists: 10 },
    { name: 'Saka', team: '阿森纳', goals: 15, assists: 14 },
  ];

  const currentStandings = standingsData[activeLeague] || [];

  return (
    <aside className="w-64 flex-shrink-0 space-y-4">
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="text-gray-900 font-semibold mb-3 flex items-center gap-2">
          <span className="text-red-500">⚽</span> 实时比分
        </h3>
        <div className="space-y-2">
          {liveScores.map((match) => (
            <div key={match.id} className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span className="text-red-600 font-medium">{match.minute}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-900 text-xs font-medium">{match.home}</span>
                <div className="flex items-center gap-1">
                  <span className="text-gray-900 font-bold">{match.homeScore}</span>
                  <span className="text-gray-400">:</span>
                  <span className="text-gray-900 font-bold">{match.awayScore}</span>
                </div>
                <span className="text-gray-900 text-xs font-medium">{match.away}</span>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-3 text-red-600 hover:text-red-700 text-xs font-medium">
          查看全部 →
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-900 font-semibold flex items-center gap-2">
            <span className="text-yellow-500">🏆</span> 积分榜
          </h3>
          <a href="/standings" className="text-red-600 hover:text-red-700 text-xs font-medium">
            查看全部
          </a>
        </div>
        <div className="flex gap-1 mb-3 overflow-x-auto pb-1">
          {leagues.map((league) => (
            <button
              key={league}
              onClick={() => setActiveLeague(league)}
              className={`px-2 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeLeague === league
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {league}
            </button>
          ))}
        </div>
        <div className="space-y-1">
          <div className="flex text-xs text-gray-500 px-1 py-1 border-b border-gray-100">
            <span className="w-6 text-center">#</span>
            <span className="flex-1">球队</span>
            <span className="w-8 text-center">胜</span>
            <span className="w-8 text-center">平</span>
            <span className="w-8 text-center">负</span>
            <span className="w-8 text-center">净胜</span>
            <span className="w-8 text-center">积分</span>
          </div>
          {currentStandings.map((team) => (
            <div key={team.rank} className="flex items-center text-xs py-1 hover:bg-gray-50 rounded px-1">
              <span className={`w-6 text-center font-bold ${team.rank <= 3 ? 'text-yellow-600' : 'text-gray-400'}`}>
                {team.rank}
              </span>
              <span className="flex-1 text-gray-900 truncate">{team.team}</span>
              <span className="w-8 text-center text-gray-600">{team.win}</span>
              <span className="w-8 text-center text-gray-600">{team.draw}</span>
              <span className="w-8 text-center text-gray-600">{team.lose}</span>
              <span className={`w-8 text-center ${team.gd >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {team.gd >= 0 ? '+' : ''}{team.gd}
              </span>
              <span className="w-8 text-center font-bold text-gray-900">{team.points}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="text-gray-900 font-semibold mb-3 flex items-center gap-2">
          <span className="text-green-500">⭐</span> 热门球员
        </h3>
        <div className="space-y-2">
          {topPlayers.map((player, idx) => (
            <div key={player.name} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {idx + 1}
              </div>
              <div className="flex-1">
                <div className="text-gray-900 text-sm font-medium">{player.name}</div>
                <div className="text-gray-500 text-xs">{player.team}</div>
              </div>
              <div className="text-right">
                <div className="text-orange-600 text-xs font-bold">{player.goals}球</div>
                <div className="text-blue-600 text-xs">{player.assists}助</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
