'use client';

import { useState } from 'react';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  homeHalfScore: number;
  awayHalfScore: number;
  league: string;
  date: string;
  time: string;
  status: string;
  homeLineup: Array<{ number: number; name: string; position: string }>;
  homeSubstitutes: Array<{ number: number; name: string; position: string }>;
  awayLineup: Array<{ number: number; name: string; position: string }>;
  awaySubstitutes: Array<{ number: number; name: string; position: string }>;
  events: Array<{ time: string; type: string; team: string; player: string; description: string }>;
  stats: {
    home: { possession: number; shots: number; shotsOnTarget: number; corners: number; fouls: number; yellowCards: number; redCards: number; attacks: number; dangerousAttacks: number; penalties: number };
    away: { possession: number; shots: number; shotsOnTarget: number; corners: number; fouls: number; yellowCards: number; redCards: number; attacks: number; dangerousAttacks: number; penalties: number };
  };
  headToHead: Array<{ date: string; home: string; away: string; homeScore: number; awayScore: number; league: string }>;
  homeRecentMatches: Array<{ date: string; league: string; opponent: string; homeScore: number; awayScore: number; result: string }>;
  awayRecentMatches: Array<{ date: string; league: string; opponent: string; homeScore: number; awayScore: number; result: string }>;
  odds: {
    initial: { home: number; draw: number; away: number };
    closing: { home: number; draw: number; away: number };
    initialDiscrete: { home: number; draw: number; away: number };
    finalDiscrete: { home: number; draw: number; away: number };
    bookmakers: Array<{ name: string; initial: { home: number; draw: number; away: number }; current: { home: number; draw: number; away: number } }>;
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
        <div className="flex items-center gap-6">
          <div className="text-left">
            <div className="text-lg">{match.date}</div>
            <div className="text-sm opacity-80">{match.time}</div>
          </div>
          
          <div className="flex-1 flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-2">
                <span className="text-2xl font-bold">{match.homeTeam.charAt(0)}</span>
              </div>
              <span className="font-semibold text-lg">{match.homeTeam}</span>
            </div>
            
            <div className="text-center">
              <div className="text-sm opacity-80 mb-1">{match.league}</div>
              <div className="text-5xl font-bold mb-1">{match.homeScore} - {match.awayScore}</div>
              <div className="text-sm opacity-80 mb-2">半场 {match.homeHalfScore}-{match.awayHalfScore}</div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm ${match.status === 'FINISHED' ? 'bg-gray-500' : match.status === 'LIVE' ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}>
                {match.status === 'FINISHED' ? '已结束' : match.status === 'LIVE' ? 'LIVE' : '即将开始'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-2">
                <span className="text-2xl font-bold">{match.awayTeam.charAt(0)}</span>
              </div>
              <span className="font-semibold text-lg">{match.awayTeam}</span>
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

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-3">
                  <div className="text-center font-semibold text-blue-600">{match.homeTeam}</div>
                  <div className="text-center text-gray-600 font-bold">{match.stats.home.corners}</div>
                  <div className="text-center text-gray-600 font-bold">{match.stats.home.redCards}</div>
                  <div className="text-center text-gray-600 font-bold">{match.stats.home.yellowCards}</div>
                  <div className="text-center text-gray-600 font-bold">{match.stats.home.shots}({match.stats.home.shotsOnTarget})</div>
                  <div className="text-center text-gray-600 font-bold">{match.stats.home.attacks}</div>
                  <div className="text-center text-gray-600 font-bold">{match.stats.home.dangerousAttacks}</div>
                  <div className="text-center text-gray-600 font-bold">{match.stats.home.penalties}</div>
                  <div className="text-center text-blue-600 font-bold text-lg">{match.stats.home.possession}%</div>
                </div>
                
                <div className="space-y-3">
                  <div className="text-center font-semibold text-gray-500">统计指标</div>
                  <div className="flex items-center justify-center">
                    <span className="text-gray-500">⛳ 角球</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-gray-500">🟥 红牌</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-gray-500">🟨 黄牌</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-gray-500">⚽ 射门(射正)</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-gray-500">⚡ 进攻</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-gray-500">🔥 危险进攻</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-gray-500">⚽ 点球</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-gray-500">控球率</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="text-center font-semibold text-red-600">{match.awayTeam}</div>
                  <div className="text-center text-gray-600 font-bold">{match.stats.away.corners}</div>
                  <div className="text-center text-gray-600 font-bold">{match.stats.away.redCards}</div>
                  <div className="text-center text-gray-600 font-bold">{match.stats.away.yellowCards}</div>
                  <div className="text-center text-gray-600 font-bold">{match.stats.away.shots}({match.stats.away.shotsOnTarget})</div>
                  <div className="text-center text-gray-600 font-bold">{match.stats.away.attacks}</div>
                  <div className="text-center text-gray-600 font-bold">{match.stats.away.dangerousAttacks}</div>
                  <div className="text-center text-gray-600 font-bold">{match.stats.away.penalties}</div>
                  <div className="text-center text-red-600 font-bold text-lg">{match.stats.away.possession}%</div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span>{match.homeTeam}</span>
                  <span>控球率</span>
                  <span>{match.awayTeam}</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 transition-all" style={{ width: `${match.stats.home.possession}%` }} />
                  <div className="h-full bg-red-500 transition-all" style={{ width: `${match.stats.away.possession}%` }} />
                </div>
              </div>
            </div>

            <div className="mt-4">
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
          <div className="space-y-8">
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">{match.homeTeam} 替补球员</h3>
                <div className="space-y-2">
                  {match.homeSubstitutes.map((player) => (
                    <div key={player.number} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {player.number}
                      </div>
                      <span className="flex-1 font-medium text-gray-700">{player.name}</span>
                      <span className="text-gray-500 text-sm">{player.position}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">{match.awayTeam} 替补球员</h3>
                <div className="space-y-2">
                  {match.awaySubstitutes.map((player) => (
                    <div key={player.number} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {player.number}
                      </div>
                      <span className="flex-1 font-medium text-gray-700">{player.name}</span>
                      <span className="text-gray-500 text-sm">{player.position}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">比赛事件时间轴</h3>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200" />
              
              <div className="mb-4">
                <div className="text-center">
                  <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600">上半场</span>
                </div>
              </div>
              
              {match.events.map((event, idx) => (
                <div key={idx} className={`flex items-start gap-4 pb-4 ${parseInt(event.time) <= 45 ? '' : 'mt-4'}`}>
                  {parseInt(event.time) > 45 && idx === 0 ? (
                    <div className="absolute left-1/2 transform -translate-x-1/2 -top-2">
                      <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600">下半场</span>
                    </div>
                  ) : null}
                  
                  {event.team === 'home' ? (
                    <div className="flex-1 pr-8 text-right">
                      <div className="inline-flex items-center gap-2 bg-blue-50 rounded-lg px-4 py-2">
                        <span className="text-gray-500 font-medium">{event.time}</span>
                        <span className={`text-xl ${event.type === 'goal' ? 'text-green-500' : event.type === 'yellow' ? 'text-yellow-500' : event.type === 'red' ? 'text-red-500' : 'text-blue-500'}`}>
                          {event.type === 'goal' ? '⚽' : event.type === 'yellow' ? '🟨' : event.type === 'red' ? '🟥' : '🔄'}
                        </span>
                      </div>
                      <div className="mt-1 text-gray-600 text-sm">{event.player}</div>
                      <div className="text-gray-400 text-xs">{event.description}</div>
                    </div>
                  ) : (
                    <div className="flex-1 pl-8">
                      <div className="inline-flex items-center gap-2 bg-red-50 rounded-lg px-4 py-2">
                        <span className={`text-xl ${event.type === 'goal' ? 'text-green-500' : event.type === 'yellow' ? 'text-yellow-500' : event.type === 'red' ? 'text-red-500' : 'text-red-500'}`}>
                          {event.type === 'goal' ? '⚽' : event.type === 'yellow' ? '🟨' : event.type === 'red' ? '🟥' : '🔄'}
                        </span>
                        <span className="text-gray-500 font-medium">{event.time}</span>
                      </div>
                      <div className="mt-1 text-gray-600 text-sm">{event.player}</div>
                      <div className="text-gray-400 text-xs">{event.description}</div>
                    </div>
                  )}
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-gray-300" />
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
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm">{item.date}</span>
                        <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded">{item.league}</span>
                      </div>
                      <div className="mt-1 font-medium text-gray-900">
                        {match.homeTeam} {item.homeScore}-{item.awayScore} {item.opponent}
                      </div>
                    </div>
                    <span className={`ml-4 font-bold text-lg ${
                      item.result === 'W' ? 'text-red-600' : 
                      item.result === 'L' ? 'text-green-600' : 
                      'text-gray-600'
                    }`}>
                      {item.result === 'W' ? '胜' : item.result === 'L' ? '负' : '平'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{match.awayTeam} 近期战绩</h3>
              <div className="space-y-2">
                {match.awayRecentMatches.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm">{item.date}</span>
                        <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded">{item.league}</span>
                      </div>
                      <div className="mt-1 font-medium text-gray-900">
                        {match.awayTeam} {item.homeScore}-{item.awayScore} {item.opponent}
                      </div>
                    </div>
                    <span className={`ml-4 font-bold text-lg ${
                      item.result === 'W' ? 'text-red-600' : 
                      item.result === 'L' ? 'text-green-600' : 
                      'text-gray-600'
                    }`}>
                      {item.result === 'W' ? '胜' : item.result === 'L' ? '负' : '平'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'odds' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">赔率数据</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">博彩公司</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">初始 {match.homeTeam}</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">即时 {match.homeTeam}</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">初始 平局</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">即时 平局</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">初始 {match.awayTeam}</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">即时 {match.awayTeam}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {match.odds.bookmakers.map((bookmaker, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{bookmaker.name}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-sm font-medium text-gray-600">{bookmaker.initial.home}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className={`text-sm font-medium ${
                            bookmaker.current.home > bookmaker.initial.home ? 'text-red-600' : 
                            bookmaker.current.home < bookmaker.initial.home ? 'text-green-600' : 'text-gray-600'
                          }`}>
                            {bookmaker.current.home}
                          </span>
                          {bookmaker.current.home > bookmaker.initial.home && (
                            <span className="text-red-500 text-xs">↑</span>
                          )}
                          {bookmaker.current.home < bookmaker.initial.home && (
                            <span className="text-green-500 text-xs">↓</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-sm font-medium text-gray-600">{bookmaker.initial.draw}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className={`text-sm font-medium ${
                            bookmaker.current.draw > bookmaker.initial.draw ? 'text-red-600' : 
                            bookmaker.current.draw < bookmaker.initial.draw ? 'text-green-600' : 'text-gray-600'
                          }`}>
                            {bookmaker.current.draw}
                          </span>
                          {bookmaker.current.draw > bookmaker.initial.draw && (
                            <span className="text-red-500 text-xs">↑</span>
                          )}
                          {bookmaker.current.draw < bookmaker.initial.draw && (
                            <span className="text-green-500 text-xs">↓</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-sm font-medium text-gray-600">{bookmaker.initial.away}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className={`text-sm font-medium ${
                            bookmaker.current.away > bookmaker.initial.away ? 'text-red-600' : 
                            bookmaker.current.away < bookmaker.initial.away ? 'text-green-600' : 'text-gray-600'
                          }`}>
                            {bookmaker.current.away}
                          </span>
                          {bookmaker.current.away > bookmaker.initial.away && (
                            <span className="text-red-500 text-xs">↑</span>
                          )}
                          {bookmaker.current.away < bookmaker.initial.away && (
                            <span className="text-green-500 text-xs">↓</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
