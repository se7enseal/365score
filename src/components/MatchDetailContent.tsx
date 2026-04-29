'use client';

import { useState } from 'react';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  league: string;
  date: string;
  time: string;
  status: string;
  homeLineup: Array<{ number: number; name: string; position: string }>;
  awayLineup: Array<{ number: number; name: string; position: string }>;
  events: Array<{ time: string; type: string; team: string; player: string; description: string }>;
  stats: {
    home: { possession: number; shots: number; shotsOnTarget: number; corners: number; fouls: number; yellowCards: number; redCards: number; attacks: number; dangerousAttacks: number; penalties: number };
    away: { possession: number; shots: number; shotsOnTarget: number; corners: number; fouls: number; yellowCards: number; redCards: number; attacks: number; dangerousAttacks: number; penalties: number };
  };
  headToHead: Array<{ date: string; home: string; away: string; homeScore: number; awayScore: number; league: string }>;
  homeRecentMatches: Array<{ date: string; opponent: string; homeScore: number; awayScore: number; result: string }>;
  awayRecentMatches: Array<{ date: string; opponent: string; homeScore: number; awayScore: number; result: string }>;
  odds: {
    initial: { home: number; draw: number; away: number };
    closing: { home: number; draw: number; away: number };
    initialDiscrete: { home: number; draw: number; away: number };
    finalDiscrete: { home: number; draw: number; away: number };
  };
}

export default function MatchDetailContent({ match }: { match: Match }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'lineup' | 'events' | 'headToHead' | 'recent' | 'odds'>('overview');

  const tabs = [
    { id: 'overview' as const, label: '比赛概览' },
    { id: 'lineup' as const, label: '首发阵容' },
    { id: 'events' as const, label: '比赛事件' },
    { id: 'headToHead' as const, label: '交锋历史' },
    { id: 'recent' as const, label: '近期战绩' },
    { id: 'odds' as const, label: '赔率数据' },
  ];

  const handleBack = () => {
    window.history.back();
  };

  const getProgressWidth = (home: number, away: number) => {
    const total = home + away;
    if (total === 0) return { home: 50, away: 50 };
    return {
      home: (home / total) * 100,
      away: (away / total) * 100,
    };
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回上一页
        </button>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-2">
                <span className="text-2xl font-bold">{match.homeTeam.charAt(0)}</span>
              </div>
              <span className="font-semibold">{match.homeTeam}</span>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">{match.homeScore} - {match.awayScore}</div>
              <div className="text-sm opacity-80">{match.league}</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-2">
                <span className="text-2xl font-bold">{match.awayTeam.charAt(0)}</span>
              </div>
              <span className="font-semibold">{match.awayTeam}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg">{match.date}</div>
            <div className="text-sm opacity-80">{match.time}</div>
            <div className={`mt-2 px-3 py-1 rounded-full text-sm ${match.status === 'FINISHED' ? 'bg-gray-500' : match.status === 'LIVE' ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}>
              {match.status === 'FINISHED' ? '已结束' : match.status === 'LIVE' ? 'LIVE' : '即将开始'}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-1 mb-6 bg-white rounded-xl p-1 shadow-sm border border-gray-100 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-900">数据统计</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">⛳</span>
                  <span className="text-gray-500 text-sm">{match.stats.home.corners}</span>
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all" 
                    style={{ width: `${getProgressWidth(match.stats.home.corners, match.stats.away.corners).home}%` }} 
                  />
                  <div 
                    className="h-full bg-red-500 transition-all" 
                    style={{ width: `${getProgressWidth(match.stats.home.corners, match.stats.away.corners).away}%` }} 
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm">{match.stats.away.corners}</span>
                  <span className="text-red-500">⛳</span>
                </div>
                <span className="text-gray-500 text-sm w-16 text-center">角球</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-red-500">🟥</span>
                  <span className="text-gray-500 text-sm">{match.stats.home.redCards}</span>
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-600 transition-all" 
                    style={{ width: `${getProgressWidth(match.stats.home.redCards, match.stats.away.redCards).home}%` }} 
                  />
                  <div 
                    className="h-full bg-red-400 transition-all" 
                    style={{ width: `${getProgressWidth(match.stats.home.redCards, match.stats.away.redCards).away}%` }} 
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm">{match.stats.away.redCards}</span>
                  <span className="text-red-500">🟥</span>
                </div>
                <span className="text-gray-500 text-sm w-16 text-center">红牌</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">🟨</span>
                  <span className="text-gray-500 text-sm">{match.stats.home.yellowCards}</span>
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-500 transition-all" 
                    style={{ width: `${getProgressWidth(match.stats.home.yellowCards, match.stats.away.yellowCards).home}%` }} 
                  />
                  <div 
                    className="h-full bg-yellow-400 transition-all" 
                    style={{ width: `${getProgressWidth(match.stats.home.yellowCards, match.stats.away.yellowCards).away}%` }} 
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm">{match.stats.away.yellowCards}</span>
                  <span className="text-yellow-500">🟨</span>
                </div>
                <span className="text-gray-500 text-sm w-16 text-center">黄牌</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">⚽</span>
                  <span className="text-gray-500 text-sm">{match.stats.home.shots}({match.stats.home.shotsOnTarget})</span>
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all" 
                    style={{ width: `${getProgressWidth(match.stats.home.shots, match.stats.away.shots).home}%` }} 
                  />
                  <div 
                    className="h-full bg-orange-500 transition-all" 
                    style={{ width: `${getProgressWidth(match.stats.home.shots, match.stats.away.shots).away}%` }} 
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm">{match.stats.away.shots}({match.stats.away.shotsOnTarget})</span>
                  <span className="text-orange-500">⚽</span>
                </div>
                <span className="text-gray-500 text-sm w-16 text-center">射门(射正)</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-purple-500">⚡</span>
                  <span className="text-gray-500 text-sm">{match.stats.home.attacks}</span>
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 transition-all" 
                    style={{ width: `${getProgressWidth(match.stats.home.attacks, match.stats.away.attacks).home}%` }} 
                  />
                  <div 
                    className="h-full bg-pink-500 transition-all" 
                    style={{ width: `${getProgressWidth(match.stats.home.attacks, match.stats.away.attacks).away}%` }} 
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm">{match.stats.away.attacks}</span>
                  <span className="text-pink-500">⚡</span>
                </div>
                <span className="text-gray-500 text-sm w-16 text-center">进攻</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">🔥</span>
                  <span className="text-gray-500 text-sm">{match.stats.home.dangerousAttacks}</span>
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all" 
                    style={{ width: `${getProgressWidth(match.stats.home.dangerousAttacks, match.stats.away.dangerousAttacks).home}%` }} 
                  />
                  <div 
                    className="h-full bg-orange-500 transition-all" 
                    style={{ width: `${getProgressWidth(match.stats.home.dangerousAttacks, match.stats.away.dangerousAttacks).away}%` }} 
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm">{match.stats.away.dangerousAttacks}</span>
                  <span className="text-orange-500">🔥</span>
                </div>
                <span className="text-gray-500 text-sm w-16 text-center">危险进攻</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">⚽</span>
                  <span className="text-gray-500 text-sm">{match.stats.home.penalties}</span>
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all" 
                    style={{ width: `${getProgressWidth(match.stats.home.penalties, match.stats.away.penalties).home}%` }} 
                  />
                  <div 
                    className="h-full bg-red-500 transition-all" 
                    style={{ width: `${getProgressWidth(match.stats.home.penalties, match.stats.away.penalties).away}%` }} 
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm">{match.stats.away.penalties}</span>
                  <span className="text-red-500">⚽</span>
                </div>
                <span className="text-gray-500 text-sm w-16 text-center">点球</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">{match.stats.home.possession}%</span>
                </div>
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all" 
                    style={{ width: `${match.stats.home.possession}%` }} 
                  />
                  <div 
                    className="h-full bg-red-500 transition-all" 
                    style={{ width: `${match.stats.away.possession}%` }} 
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-600 font-bold">{match.stats.away.possession}%</span>
                </div>
                <span className="text-gray-500 text-sm w-16 text-center">控球率</span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">进球时刻</h3>
              <div className="space-y-2">
                {match.events.filter(e => e.type === 'goal').map((event, idx) => (
                  <div key={idx} className={`flex items-center gap-3 p-3 rounded-lg ${event.team === 'home' ? 'bg-blue-50' : 'bg-red-50'}`}>
                    <span className="text-gray-500 font-medium">{event.time}</span>
                    <span className="text-2xl">⚽</span>
                    <span className="font-medium text-gray-900">{event.player}</span>
                    <span className="text-gray-500 text-sm">- {event.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lineup' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">{match.homeTeam} 首发阵容</h3>
              <div className="space-y-2">
                {match.homeLineup.map((player) => (
                  <div key={player.number} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {player.number}
                    </div>
                    <span className="flex-1 font-medium text-gray-900">{player.name}</span>
                    <span className="text-gray-500 text-sm">{player.position}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">{match.awayTeam} 首发阵容</h3>
              <div className="space-y-2">
                {match.awayLineup.map((player) => (
                  <div key={player.number} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {player.number}
                    </div>
                    <span className="flex-1 font-medium text-gray-900">{player.name}</span>
                    <span className="text-gray-500 text-sm">{player.position}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">比赛事件时间线</h3>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
              {match.events.map((event, idx) => (
                <div key={idx} className="flex items-start gap-4 pb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    event.type === 'goal' ? 'bg-green-100' : 
                    event.type === 'yellow' ? 'bg-yellow-100' : 
                    event.type === 'red' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    <span className="text-xl">
                      {event.type === 'goal' ? '⚽' : event.type === 'yellow' ? '🟨' : event.type === 'red' ? '🟥' : '🔄'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{event.time}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        event.team === 'home' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {event.team === 'home' ? match.homeTeam : match.awayTeam}
                      </span>
                    </div>
                    <div className="text-gray-600 mt-1">{event.player} - {event.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'headToHead' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">双方交锋历史</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">日期</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">联赛</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">主队</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-500">比分</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">客队</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {match.headToHead.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-500">{item.date}</td>
                      <td className="px-4 py-3">
                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">{item.league}</span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.home}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`font-bold ${item.homeScore > item.awayScore ? 'text-blue-600' : item.homeScore < item.awayScore ? 'text-red-600' : 'text-gray-600'}`}>
                          {item.homeScore} - {item.awayScore}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">{item.away}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'recent' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{match.homeTeam} 近期战绩</h3>
              <div className="space-y-2">
                {match.homeRecentMatches.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 text-sm">{item.date}</span>
                      <span className="font-medium text-gray-900">{item.opponent}</span>
                    </div>
                    <div className="text-right">
                      <span className={`font-bold ${item.result === 'W' ? 'text-green-600' : item.result === 'L' ? 'text-red-600' : 'text-gray-600'}`}>
                        {item.homeScore} - {item.awayScore}
                      </span>
                      <span className={`ml-2 text-xs px-2 py-0.5 rounded ${
                        item.result === 'W' ? 'bg-green-100 text-green-700' : 
                        item.result === 'L' ? 'bg-red-100 text-red-700' : 
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {item.result === 'W' ? '胜' : item.result === 'L' ? '负' : '平'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{match.awayTeam} 近期战绩</h3>
              <div className="space-y-2">
                {match.awayRecentMatches.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 text-sm">{item.date}</span>
                      <span className="font-medium text-gray-900">{item.opponent}</span>
                    </div>
                    <div className="text-right">
                      <span className={`font-bold ${item.result === 'W' ? 'text-green-600' : item.result === 'L' ? 'text-red-600' : 'text-gray-600'}`}>
                        {item.homeScore} - {item.awayScore}
                      </span>
                      <span className={`ml-2 text-xs px-2 py-0.5 rounded ${
                        item.result === 'W' ? 'bg-green-100 text-green-700' : 
                        item.result === 'L' ? 'bg-red-100 text-red-700' : 
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {item.result === 'W' ? '胜' : item.result === 'L' ? '负' : '平'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'odds' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">赔率数据</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="text-md font-semibold text-blue-900 mb-4">初始赔率</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{match.homeTeam}</span>
                    <span className="text-xl font-bold text-blue-600">{match.odds.initial.home}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">平局</span>
                    <span className="text-xl font-bold text-blue-600">{match.odds.initial.draw}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{match.awayTeam}</span>
                    <span className="text-xl font-bold text-blue-600">{match.odds.initial.away}</span>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 rounded-xl p-6">
                <h4 className="text-md font-semibold text-red-900 mb-4">封盘赔率</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{match.homeTeam}</span>
                    <span className="text-xl font-bold text-red-600">{match.odds.closing.home}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">平局</span>
                    <span className="text-xl font-bold text-red-600">{match.odds.closing.draw}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{match.awayTeam}</span>
                    <span className="text-xl font-bold text-red-600">{match.odds.closing.away}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-purple-50 rounded-xl p-6">
                <h4 className="text-md font-semibold text-purple-900 mb-4">初始离散值</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{match.homeTeam}</span>
                    <span className="text-xl font-bold text-purple-600">{match.odds.initialDiscrete.home}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">平局</span>
                    <span className="text-xl font-bold text-purple-600">{match.odds.initialDiscrete.draw}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{match.awayTeam}</span>
                    <span className="text-xl font-bold text-purple-600">{match.odds.initialDiscrete.away}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 rounded-xl p-6">
                <h4 className="text-md font-semibold text-orange-900 mb-4">最终离散值</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{match.homeTeam}</span>
                    <span className="text-xl font-bold text-orange-600">{match.odds.finalDiscrete.home}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">平局</span>
                    <span className="text-xl font-bold text-orange-600">{match.odds.finalDiscrete.draw}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{match.awayTeam}</span>
                    <span className="text-xl font-bold text-orange-600">{match.odds.finalDiscrete.away}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
